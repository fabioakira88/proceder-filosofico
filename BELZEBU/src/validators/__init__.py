from __future__ import annotations

import re
from typing import Any


REQUIRED_FIELDS = [
    "titulo",
    "projeto",
    "categoria",
    "cluster",
    "palavras_chave",
    "notas_editoriais",
    "slug",
]

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def validate_pauta(pauta: dict[str, Any]) -> None:
    missing = [field for field in REQUIRED_FIELDS if not pauta.get(field)]
    if missing:
        raise ValueError(f"Missing required pauta fields: {', '.join(missing)}")

    if pauta["projeto"] not in {"japao-relativo", "proceder-filosofico"}:
        raise ValueError("projeto must be 'japao-relativo' or 'proceder-filosofico'.")

    if not isinstance(pauta["palavras_chave"], list) or not pauta["palavras_chave"]:
        raise ValueError("palavras_chave must be a non-empty list.")

    if not SLUG_RE.match(pauta["slug"]):
        raise ValueError("slug must be kebab-case with lowercase letters and numbers.")
