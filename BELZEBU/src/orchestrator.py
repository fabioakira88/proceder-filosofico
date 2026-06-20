from __future__ import annotations

from pathlib import Path

from generators import generate_draft, generate_image_prompt, generate_report
from logger import append_run
from notion_client import read_sample_pauta
from validators import validate_pauta


BASE_DIR = Path(__file__).resolve().parents[1]


def run_dry_run(sample_path: Path) -> dict[str, str]:
    pauta = read_sample_pauta(sample_path)
    validate_pauta(pauta)

    slug = pauta["slug"]
    draft_path = BASE_DIR / "output" / "drafts" / f"{slug}.md"
    image_prompt_path = BASE_DIR / "output" / "image-prompts" / f"{slug}.md"
    report_path = BASE_DIR / "output" / "reports" / f"{slug}-report.md"

    draft_path.write_text(generate_draft(pauta), encoding="utf-8")
    image_prompt_path.write_text(generate_image_prompt(pauta), encoding="utf-8")
    report_path.write_text(
        generate_report(pauta, draft_path, image_prompt_path),
        encoding="utf-8",
    )

    append_run(
        BASE_DIR / "data" / "runs.jsonl",
        {
            "mode": "dry-run",
            "project": pauta["projeto"],
            "slug": slug,
            "status": "success",
            "draft": str(draft_path.relative_to(BASE_DIR)),
            "image_prompt": str(image_prompt_path.relative_to(BASE_DIR)),
            "report": str(report_path.relative_to(BASE_DIR)),
        },
    )

    return {
        "draft": str(draft_path),
        "image_prompt": str(image_prompt_path),
        "report": str(report_path),
    }
