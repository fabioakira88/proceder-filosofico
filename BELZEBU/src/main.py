from __future__ import annotations

import argparse
from pathlib import Path

from orchestrator import run_dry_run


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="belzebu",
        description="Belzebu editorial orchestrator MVP 0.1",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run without touching external services or publishing sites.",
    )
    parser.add_argument(
        "--sample",
        type=Path,
        help="Path to a local sample pauta JSON file.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if not args.dry_run:
        parser.error("MVP 0.1 only supports --dry-run.")

    if not args.sample:
        parser.error("--sample is required in dry-run mode.")

    result = run_dry_run(args.sample)
    print("Belzebu dry-run completed.")
    print(f"Draft: {result['draft']}")
    print(f"Image prompt: {result['image_prompt']}")
    print(f"Report: {result['report']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
