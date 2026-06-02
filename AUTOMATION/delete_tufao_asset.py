#!/usr/bin/env python3
"""Remove do FTP o asset de tufao que nao pertence ao Proceder."""

import ftplib
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

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

remote = os.getenv("FTP_REMOTE_DIR", "/public_html").rstrip("/") + "/assets/post_cards/tufao-jangmi-okinawa.png"

with ftplib.FTP(os.environ["FTP_HOST"], timeout=30) as ftp:
    ftp.login(os.environ["FTP_USER"], os.environ["FTP_PASS"])
    ftp.set_pasv(True)
    try:
        ftp.delete(remote)
        print("REMOVIDO " + remote)
    except ftplib.error_perm as exc:
        print("JA AUSENTE OU SEM PERMISSAO: " + str(exc))
