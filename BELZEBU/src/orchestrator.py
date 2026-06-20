from __future__ import annotations

from pathlib import Path

from generators import generate_draft, generate_image_prompt, generate_report
from logger import append_run
from notion_client import (
    fetch_notion_pautas,
    mark_em_producao,
    read_sample_pauta,
)
from validators import validate_pauta


BASE_DIR = Path(__file__).resolve().parents[1]


def run_dry_run(
    *,
    source: str,
    sample_path: Path | None = None,
    site: str | None = None,
    prioridade: str | None = None,
    limit: int = 1,
    write_notion: bool = False,
) -> list[dict[str, str]]:
    if source == "sample":
        if sample_path is None:
            raise ValueError("--sample is required when --source sample.")
        pautas = [read_sample_pauta(sample_path)]
    elif source == "notion":
        pautas = fetch_notion_pautas(site=site, prioridade=prioridade, limit=limit)
    else:
        raise ValueError("source must be 'sample' or 'notion'.")

    results = []
    for pauta in pautas:
        results.append(_process_pauta(pauta, source=source, write_notion=write_notion))

    return results


def _process_pauta(
    pauta: dict[str, object],
    *,
    source: str,
    write_notion: bool,
) -> dict[str, str]:
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

    run_event = {
        "mode": "dry-run",
        "source": source,
        "project": pauta["projeto"],
        "slug": slug,
        "status": "success",
        "draft": str(draft_path.relative_to(BASE_DIR)),
        "image_prompt": str(image_prompt_path.relative_to(BASE_DIR)),
        "report": str(report_path.relative_to(BASE_DIR)),
    }

    notion_page_id = pauta.get("notion_page_id")
    if notion_page_id:
        status_result = mark_em_producao(
            str(notion_page_id),
            write=write_notion,
            run_id=str(slug),
        )
        run_event["notion_status_update"] = status_result

    append_run(
        BASE_DIR / "data" / "runs.jsonl",
        run_event,
    )

    return {
        "draft": str(draft_path),
        "image_prompt": str(image_prompt_path),
        "report": str(report_path),
    }
