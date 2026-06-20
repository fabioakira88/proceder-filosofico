from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def append_run(log_path: Path, payload: dict[str, Any]) -> None:
    event = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        **payload,
    }

    with log_path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False) + "\n")
