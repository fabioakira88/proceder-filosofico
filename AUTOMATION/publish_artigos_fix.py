#!/usr/bin/env python3
"""Publica somente os arquivos críticos da correção de artigos."""

import ftplib
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
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

HOST = os.getenv("FTP_HOST")
USER = os.getenv("FTP_USER")
PASS = os.getenv("FTP_PASS")
REMOTE_DIR = os.getenv("FTP_REMOTE_DIR", "/public_html").rstrip("/")

FILES = [
    "index.html",
    "biblioteca.html",
    "posts.js",
    "artigos/index.html",
    "assets/Filósofos/Avicena.png",
    "assets/Filósofos/JohnStuartMill.jpg",
    "assets/Filósofos/Spinoza.jpg",
    "assets/post_cards/existencialismo.jpeg",
    "assets/wallpaper-filosofico.png",
]

def mkdirs(ftp, remote_path):
    current = ""
    for part in [p for p in remote_path.split("/") if p]:
        current += "/" + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass

def main():
    missing_env = [key for key in ("FTP_HOST", "FTP_USER", "FTP_PASS") if not os.getenv(key)]
    if missing_env:
        print("Variaveis faltando: " + ", ".join(missing_env))
        sys.exit(1)

    with ftplib.FTP(HOST, timeout=30) as ftp:
        ftp.login(USER, PASS)
        ftp.set_pasv(True)
        for rel in FILES:
          local = SITE / rel
          if not local.exists():
              print(f"ERRO local ausente: {rel}")
              sys.exit(1)
          remote = f"{REMOTE_DIR}/{rel}"
          mkdirs(ftp, str(Path(remote).parent))
          with local.open("rb") as handle:
              ftp.storbinary(f"STOR {remote}", handle)
          print(f"OK {rel}")

    print("Publicacao critica concluida.")

if __name__ == "__main__":
    main()
