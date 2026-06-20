from __future__ import annotations

import argparse
from pathlib import Path

from orchestrator import run_dry_run
from notion_client import NotionConfigError, NotionRequestError


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="belzebu",
        description="Belzebu editorial orchestrator MVP 0.2",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run without touching external services or publishing sites.",
    )
    parser.add_argument(
        "--source",
        choices=["sample", "notion"],
        default="sample",
        help="Pauta source. Use 'sample' for local JSON or 'notion' for Notion API.",
    )
    parser.add_argument(
        "--sample",
        type=Path,
        help="Path to a local sample pauta JSON file.",
    )
    parser.add_argument(
        "--site",
        choices=["japao-relativo", "proceder-filosofico"],
        help="Filter Notion pautas by site.",
    )
    parser.add_argument(
        "--prioridade",
        help="Filter Notion pautas by priority label.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=1,
        help="Maximum number of pautas to process.",
    )
    parser.add_argument(
        "--write-notion",
        action="store_true",
        help="Actually update Notion status. Without this flag, updates are simulated.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if not args.dry_run:
        parser.error("MVP 0.1 only supports --dry-run.")

    if args.source == "sample" and not args.sample:
        parser.error("--sample is required when --source sample.")

    try:
        results = run_dry_run(
            source=args.source,
            sample_path=args.sample,
            site=args.site,
            prioridade=args.prioridade,
            limit=args.limit,
            write_notion=args.write_notion,
        )
    except NotionConfigError as exc:
        print(f"Erro de configuracao: {exc}")
        print("Copie .env.example para .env e preencha NOTION_TOKEN e NOTION_DATABASE_ID.")
        return 2
    except NotionRequestError as exc:
        print(f"Erro ao acessar Notion: {exc}")
        return 3
    except ValueError as exc:
        print(f"Erro de validacao: {exc}")
        return 4

    if not results:
        print("Belzebu dry-run completed. Nenhuma pauta encontrada.")
        return 0

    print(f"Belzebu dry-run completed. Pautas processadas: {len(results)}")
    for result in results:
        print(f"Draft: {result['draft']}")
        print(f"Image prompt: {result['image_prompt']}")
        print(f"Report: {result['report']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
