from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parents[1]
NOTION_API_BASE = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"


class NotionConfigError(RuntimeError):
    pass


class NotionRequestError(RuntimeError):
    pass


def read_sample_pauta(sample_path: Path) -> dict[str, Any]:
    path = sample_path
    if not path.is_absolute():
        path = Path.cwd() / path

    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    if not isinstance(data, dict):
        raise ValueError("Sample pauta must be a JSON object.")

    return data


def load_env_file(env_path: Path | None = None) -> None:
    path = env_path or BASE_DIR / ".env"
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def get_notion_credentials() -> tuple[str, str]:
    load_env_file()
    token = os.environ.get("NOTION_TOKEN", "").strip()
    database_id = os.environ.get("NOTION_DATABASE_ID", "").strip()

    missing = []
    if not token:
        missing.append("NOTION_TOKEN")
    if not database_id:
        missing.append("NOTION_DATABASE_ID")

    if missing:
        raise NotionConfigError(
            "Credenciais do Notion ausentes. Crie BELZEBU/.env com: "
            + ", ".join(missing)
        )

    return token, database_id


def fetch_notion_pautas(
    *,
    site: str | None = None,
    prioridade: str | None = None,
    limit: int = 1,
) -> list[dict[str, Any]]:
    token, database_id = get_notion_credentials()
    filters: list[dict[str, Any]] = [
        {
            "property": "Status",
            "status": {
                "equals": "Backlog",
            },
        }
    ]

    if site:
        filters.append(
            {
                "property": "Site",
                "select": {
                    "equals": _site_to_notion_label(site),
                },
            }
        )

    if prioridade:
        filters.append(
            {
                "property": "Prioridade",
                "select": {
                    "equals": prioridade,
                },
            }
        )

    payload: dict[str, Any] = {
        "page_size": max(1, min(limit, 100)),
        "filter": {"and": filters},
    }

    response = _notion_request(
        token,
        f"/databases/{database_id}/query",
        method="POST",
        payload=payload,
    )

    pages = response.get("results", [])
    return [notion_page_to_pauta(page) for page in pages[:limit]]


def update_notion_status(
    page_id: str,
    status: str,
    *,
    log_error: str | None = None,
    run_id: str | None = None,
    write: bool = False,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "properties": {
            "Status": {
                "status": {
                    "name": status,
                },
            }
        }
    }

    if log_error is not None:
        payload["properties"]["Log de erro"] = {
            "rich_text": [{"text": {"content": log_error[:1900]}}]
        }

    if run_id is not None:
        payload["properties"]["Run ID"] = {
            "rich_text": [{"text": {"content": run_id}}]
        }

    if not write:
        return {
            "simulated": True,
            "page_id": page_id,
            "status": status,
            "payload": payload,
        }

    token, _database_id = get_notion_credentials()
    response = _notion_request(
        token,
        f"/pages/{page_id}",
        method="PATCH",
        payload=payload,
    )
    return {
        "simulated": False,
        "page_id": page_id,
        "status": status,
        "response": response,
    }


def mark_em_producao(page_id: str, *, write: bool = False, run_id: str | None = None) -> dict[str, Any]:
    return update_notion_status(page_id, "Em Produção", write=write, run_id=run_id)


def mark_publicado(page_id: str, *, write: bool = False, run_id: str | None = None) -> dict[str, Any]:
    return update_notion_status(page_id, "Publicado", write=write, run_id=run_id)


def mark_erro(
    page_id: str,
    error: str,
    *,
    write: bool = False,
    run_id: str | None = None,
) -> dict[str, Any]:
    return update_notion_status(page_id, "Erro", log_error=error, write=write, run_id=run_id)


def notion_page_to_pauta(page: dict[str, Any]) -> dict[str, Any]:
    props = page.get("properties", {})
    site_label = _read_select(props.get("Site"))

    return {
        "notion_page_id": page.get("id"),
        "titulo": _read_title(props.get("Título")),
        "projeto": _notion_label_to_site(site_label),
        "categoria": _read_select(props.get("Categoria")),
        "cluster": _read_rich_text(props.get("Cluster/Hub")),
        "palavras_chave": _read_multi_select_or_csv(props.get("Palavras-chave")),
        "notas_editoriais": _read_rich_text(props.get("Notas editoriais")),
        "slug": _read_rich_text(props.get("Slug")),
        "prioridade": _read_select(props.get("Prioridade")),
        "data_publicacao": _read_date(props.get("Data publicação")),
    }


def _notion_request(
    token: str,
    path: str,
    *,
    method: str,
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    body = None
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }

    if payload is not None:
        body = json.dumps(payload).encode("utf-8")

    request = urllib.request.Request(
        NOTION_API_BASE + path,
        data=body,
        headers=headers,
        method=method,
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise NotionRequestError(
            f"Notion API retornou HTTP {exc.code}: {error_body}"
        ) from exc
    except urllib.error.URLError as exc:
        raise NotionRequestError(f"Falha de rede ao acessar Notion API: {exc.reason}") from exc


def _read_title(prop: dict[str, Any] | None) -> str:
    if not prop:
        return ""
    return "".join(part.get("plain_text", "") for part in prop.get("title", []))


def _read_rich_text(prop: dict[str, Any] | None) -> str:
    if not prop:
        return ""
    return "".join(part.get("plain_text", "") for part in prop.get("rich_text", []))


def _read_select(prop: dict[str, Any] | None) -> str:
    if not prop or not prop.get("select"):
        return ""
    return prop["select"].get("name", "")


def _read_multi_select_or_csv(prop: dict[str, Any] | None) -> list[str]:
    if not prop:
        return []
    if prop.get("multi_select"):
        return [item.get("name", "") for item in prop["multi_select"] if item.get("name")]
    text = _read_rich_text(prop)
    return [item.strip() for item in text.split(",") if item.strip()]


def _read_date(prop: dict[str, Any] | None) -> str:
    if not prop or not prop.get("date"):
        return ""
    return prop["date"].get("start", "")


def _site_to_notion_label(site: str) -> str:
    labels = {
        "japao-relativo": "Japão Relativo",
        "proceder-filosofico": "Proceder Filosófico",
    }
    return labels.get(site, site)


def _notion_label_to_site(label: str) -> str:
    normalized = label.strip().lower()
    if normalized in {"japão relativo", "japao relativo", "japao-relativo"}:
        return "japao-relativo"
    if normalized in {
        "proceder filosófico",
        "proceder filosofico",
        "proceder-filosofico",
    }:
        return "proceder-filosofico"
    return normalized.replace(" ", "-")
