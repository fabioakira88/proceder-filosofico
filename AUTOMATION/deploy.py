#!/usr/bin/env python3
"""
deploy.py — publica SITE/ no Hostinger via FTP com um único comando:

    python3 AUTOMATION/deploy.py

Credenciais no .env (na raiz do projeto):
    FTP_HOST=files.procederfilosofico.com.br  (ou IP do Hostinger)
    FTP_USER=u123456789
    FTP_PASS=sua_senha_ftp
    FTP_REMOTE_DIR=/PROCEDER_FILOSOFICO

Regra de deploy:
    Envia somente o conteúdo de SITE/ para a raiz pública do domínio.
    Nunca envia a raiz do projeto, .env, automações, docs, backups ou branding.
"""

import ftplib
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent   # raiz do projeto
SITE = ROOT / "SITE"

def load_env(path):
    if not path.exists():
        return
    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

load_env(ROOT / ".env")

HOST       = os.getenv("FTP_HOST")
USER       = os.getenv("FTP_USER")
PASS       = os.getenv("FTP_PASS")
REMOTE_DIR = os.getenv("FTP_REMOTE_DIR", "/public_html")
FTP_TIMEOUT = int(os.getenv("FTP_TIMEOUT", "30"))
FILE_TIMEOUT = int(os.getenv("FTP_FILE_TIMEOUT", "45"))

# Arquivos da pasta SITE que devem ser enviados
INCLUDE_EXTENSIONS = {
    ".html", ".js", ".css", ".png", ".jpg", ".jpeg",
    ".svg", ".ico", ".webp", ".gif", ".pdf", ".txt", ".json",
}
EXCLUDE_DIRS = {
    ".git", ".github", "__pycache__", "BACKUP", "EXPORTS", "DOCS",
    "BRANDING", "AUTOMATION",
}
EXCLUDE_FILES = {
    ".env", ".env.example", "README.md",
}

def check_env():
    missing = [v for v in ("FTP_HOST", "FTP_USER", "FTP_PASS") if not os.getenv(v)]
    if missing:
        print(f"[ERRO] Variáveis faltando no .env: {', '.join(missing)}")
        print()
        print("Adicione ao arquivo .env na raiz do projeto:")
        print("  FTP_HOST=files.procederfilosofico.com.br")
        print("  FTP_USER=u123456789")
        print("  FTP_PASS=sua_senha_ftp")
        print("  FTP_REMOTE_DIR=/public_html")
        sys.exit(1)

def ftp_mkdirs(ftp, remote_path):
    """Cria diretórios remotos recursivamente se não existirem."""
    parts = [p for p in remote_path.split("/") if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass  # já existe

def collect_files():
    files = []
    for path in SITE.rglob("*"):
        relative = path.relative_to(SITE)
        if any(part in EXCLUDE_DIRS or part.startswith(".") for part in relative.parts[:-1]):
            continue
        if not path.is_file():
            continue
        if path.name in EXCLUDE_FILES or path.name.startswith("."):
            continue
        if path.suffix.lower() in INCLUDE_EXTENSIONS:
            files.append(path)
    return sorted(files, key=lambda item: str(item.relative_to(SITE)))

def upload(ftp, local_path, remote_path):
    remote_dir = str(Path(remote_path).parent)
    ftp_mkdirs(ftp, remote_dir)
    if ftp.sock:
        ftp.sock.settimeout(FILE_TIMEOUT)
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)

def main():
    check_env()

    files = collect_files()
    if not files:
        print("[AVISO] Nenhum arquivo encontrado em SITE/")
        sys.exit(0)

    print(f"Conectando em {HOST} …", flush=True)
    try:
        ftp = ftplib.FTP(HOST, timeout=FTP_TIMEOUT)
        ftp.login(USER, PASS)
        ftp.set_pasv(True)
    except Exception as e:
        print(f"[ERRO] Falha na conexão FTP: {e}", flush=True)
        sys.exit(1)

    print(f"Conectado. Enviando somente SITE/ ({len(files)} arquivo(s)) para {REMOTE_DIR} …", flush=True)
    print(f"Timeout por arquivo: {FILE_TIMEOUT}s\n", flush=True)

    ok = 0
    errors = []
    for local in files:
        relative = local.relative_to(SITE)
        remote   = REMOTE_DIR.rstrip("/") + "/" + str(relative).replace("\\", "/")
        try:
            print(f"  →  {relative}", flush=True)
            upload(ftp, local, remote)
            print(f"  ✓  {relative}", flush=True)
            ok += 1
        except Exception as e:
            print(f"  ✗  {relative}  [{e}]", flush=True)
            errors.append((str(relative), str(e)))

    ftp.quit()

    print(f"\n{ok}/{len(files)} arquivos enviados com sucesso.", flush=True)
    if errors:
        print(f"{len(errors)} erro(s):", flush=True)
        for name, err in errors:
            print(f"  {name}: {err}", flush=True)
        sys.exit(1)
    else:
        print("Deploy concluído.", flush=True)

if __name__ == "__main__":
    main()
