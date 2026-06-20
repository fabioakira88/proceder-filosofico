from __future__ import annotations

import argparse
from pathlib import Path

from ai_provider import AIProviderConfigError, AIProviderRequestError
from orchestrator import run_dry_run, run_generate_only
from notion_client import NotionConfigError, NotionRequestError


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="belzebu",
        description="Belzebu editorial orchestrator MVP 0.3",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run without touching external services or publishing sites.",
    )
    parser.add_argument(
        "--generate-only",
        action="store_true",
        help="Generate editorial JSON outputs without publishing, committing, or deploying.",
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

    if args.dry_run == args.generate_only:
        parser.error("Choose exactly one mode: --dry-run or --generate-only.")

    if args.source == "sample" and not args.sample:
        parser.error("--sample is required when --source sample.")

    try:
        if args.generate_only:
            results = run_generate_only(
                source=args.source,
                sample_path=args.sample,
                site=args.site,
                prioridade=args.prioridade,
                limit=args.limit,
                write_notion=args.write_notion,
            )
            mode_label = "generate-only"
        else:
            results = run_dry_run(
                source=args.source,
                sample_path=args.sample,
                site=args.site,
                prioridade=args.prioridade,
                limit=args.limit,
                write_notion=args.write_notion,
            )
            mode_label = "dry-run"
    except NotionConfigError as exc:
        print(f"Erro de configuracao: {exc}")
        print("Copie .env.example para .env e preencha NOTION_TOKEN e NOTION_DATABASE_ID.")
        return 2
    except NotionRequestError as exc:
        print(f"Erro ao acessar Notion: {exc}")
        return 3
    except AIProviderConfigError as exc:
        print(f"Erro de configuracao do AI provider: {exc}")
        print("Configure AI_PROVIDER e a chave correspondente em BELZEBU/.env.")
        return 5
    except AIProviderRequestError as exc:
        print(f"Erro ao gerar conteudo com AI provider: {exc}")
        return 6
    except ValueError as exc:
        print(f"Erro de validacao: {exc}")
        return 4

    if not results:
        print(f"Belzebu {mode_label} completed. Nenhuma pauta encontrada.")
        return 0

    print(f"Belzebu {mode_label} completed. Pautas processadas: {len(results)}")
    for result in results:
        if "output_dir" in result:
            print(f"Output: {result['output_dir']}")
            print(f"Article: {result['article']}")
            print(f"SEO: {result['seo']}")
            print(f"FAQ: {result['faq']}")
        else:
            print(f"Draft: {result['draft']}")
        print(f"Image prompt: {result['image_prompt']}")
        print(f"Report: {result['report']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
