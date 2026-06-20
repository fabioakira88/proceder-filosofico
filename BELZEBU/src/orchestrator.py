from __future__ import annotations

import json
from pathlib import Path

from ai_provider import get_ai_provider
from generators import (
    generate_article_json,
    generate_draft,
    generate_faq_json,
    generate_generate_only_report_json,
    generate_image_prompt,
    generate_image_prompt_json,
    generate_report,
    generate_seo_json,
)
from logger import append_run
from notion_client import (
    fetch_notion_pautas,
    mark_em_producao,
    read_sample_pauta,
)
from validators import validate_pauta
from validators.editorial import validate_generated_package


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


def run_generate_only(
    *,
    source: str,
    sample_path: Path | None = None,
    site: str | None = None,
    prioridade: str | None = None,
    limit: int = 1,
    write_notion: bool = False,
) -> list[dict[str, str]]:
    pautas = _load_pautas(
        source=source,
        sample_path=sample_path,
        site=site,
        prioridade=prioridade,
        limit=limit,
    )
    provider = get_ai_provider()

    results = []
    for pauta in pautas:
        validate_pauta(pauta)
        results.append(
            _generate_pauta_package(
                pauta,
                source=source,
                provider=provider,
                write_notion=write_notion,
            )
        )

    return results


def _load_pautas(
    *,
    source: str,
    sample_path: Path | None,
    site: str | None,
    prioridade: str | None,
    limit: int,
) -> list[dict[str, object]]:
    if source == "sample":
        if sample_path is None:
            raise ValueError("--sample is required when --source sample.")
        return [read_sample_pauta(sample_path)]
    if source == "notion":
        return fetch_notion_pautas(site=site, prioridade=prioridade, limit=limit)
    raise ValueError("source must be 'sample' or 'notion'.")


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


def _generate_pauta_package(
    pauta: dict[str, object],
    *,
    source: str,
    provider: object,
    write_notion: bool,
) -> dict[str, str]:
    slug = str(pauta["slug"])
    output_dir = BASE_DIR / "output" / "generated" / slug
    output_dir.mkdir(parents=True, exist_ok=True)

    article = generate_article_json(pauta, provider)
    seo = generate_seo_json(pauta, article, provider)
    faq = generate_faq_json(pauta, article, provider)
    image_prompt = generate_image_prompt_json(pauta, article, provider)

    package = {
        "article": article,
        "seo": seo,
        "faq": faq,
        "image_prompt": image_prompt,
    }
    validate_generated_package(package)

    files = {
        "article": "article.json",
        "seo": "seo.json",
        "faq": "faq.json",
        "image_prompt": "image-prompt.json",
        "report": "report.json",
    }

    _write_json(output_dir / files["article"], article)
    _write_json(output_dir / files["seo"], seo)
    _write_json(output_dir / files["faq"], faq)
    _write_json(output_dir / files["image_prompt"], image_prompt)

    relative_files = {
        key: str((output_dir / filename).relative_to(BASE_DIR))
        for key, filename in files.items()
    }
    report = generate_generate_only_report_json(
        pauta=pauta,
        provider_name=getattr(provider, "name", "unknown"),
        output_files=relative_files,
        validation_status="passed",
    )
    _write_json(output_dir / files["report"], report)

    run_event = {
        "mode": "generate-only",
        "source": source,
        "provider": getattr(provider, "name", "unknown"),
        "project": pauta["projeto"],
        "slug": slug,
        "status": "success",
        "output_dir": str(output_dir.relative_to(BASE_DIR)),
        "files": relative_files,
    }

    notion_page_id = pauta.get("notion_page_id")
    if notion_page_id:
        status_result = mark_em_producao(
            str(notion_page_id),
            write=write_notion,
            run_id=slug,
        )
        run_event["notion_status_update"] = status_result

    append_run(BASE_DIR / "data" / "runs.jsonl", run_event)

    return {
        "output_dir": str(output_dir),
        "article": str(output_dir / files["article"]),
        "seo": str(output_dir / files["seo"]),
        "faq": str(output_dir / files["faq"]),
        "image_prompt": str(output_dir / files["image_prompt"]),
        "report": str(output_dir / files["report"]),
    }


def _write_json(path: Path, payload: dict[str, object]) -> None:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
