from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def read_sample_pauta(sample_path: Path) -> dict[str, Any]:
    path = sample_path
    if not path.is_absolute():
        path = Path.cwd() / path

    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    if not isinstance(data, dict):
        raise ValueError("Sample pauta must be a JSON object.")

    return data
