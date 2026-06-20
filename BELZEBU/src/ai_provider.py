from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from typing import Any, Protocol

from notion_client import load_env_file


class AIProviderConfigError(RuntimeError):
    pass


class AIProviderRequestError(RuntimeError):
    pass


class AIProvider(Protocol):
    name: str

    def generate_json(self, *, system_prompt: str, user_prompt: str) -> dict[str, Any]:
        pass


def get_ai_provider() -> AIProvider:
    load_env_file()
    provider = os.environ.get("AI_PROVIDER", "anthropic").strip().lower()

    if provider == "anthropic":
        api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
        if not api_key:
            raise AIProviderConfigError(
                "ANTHROPIC_API_KEY ausente. Preencha BELZEBU/.env ou use AI_PROVIDER=openai."
            )
        return AnthropicProvider(api_key)

    if provider == "openai":
        api_key = os.environ.get("OPENAI_API_KEY", "").strip()
        if not api_key:
            raise AIProviderConfigError(
                "OPENAI_API_KEY ausente. Preencha BELZEBU/.env ou use AI_PROVIDER=anthropic."
            )
        return OpenAIProvider(api_key)

    raise AIProviderConfigError(
        "AI_PROVIDER invalido. Use AI_PROVIDER=anthropic ou AI_PROVIDER=openai."
    )


class AnthropicProvider:
    name = "anthropic"

    def __init__(self, api_key: str) -> None:
        self.api_key = api_key
        self.model = os.environ.get("ANTHROPIC_MODEL", "claude-3-5-sonnet-20241022")

    def generate_json(self, *, system_prompt: str, user_prompt: str) -> dict[str, Any]:
        payload = {
            "model": self.model,
            "max_tokens": 4096,
            "temperature": 0.4,
            "system": system_prompt,
            "messages": [
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
        }
        response = _request_json(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            payload=payload,
        )
        text = "".join(
            block.get("text", "")
            for block in response.get("content", [])
            if block.get("type") == "text"
        )
        return _parse_json_text(text)


class OpenAIProvider:
    name = "openai"

    def __init__(self, api_key: str) -> None:
        self.api_key = api_key
        self.model = os.environ.get("OPENAI_MODEL", "gpt-4.1")

    def generate_json(self, *, system_prompt: str, user_prompt: str) -> dict[str, Any]:
        payload = {
            "model": self.model,
            "temperature": 0.4,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        }
        response = _request_json(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            payload=payload,
        )
        text = response["choices"][0]["message"]["content"]
        return _parse_json_text(text)


def _request_json(
    url: str,
    *,
    headers: dict[str, str],
    payload: dict[str, Any],
) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise AIProviderRequestError(
            f"AI provider retornou HTTP {exc.code}: {error_body}"
        ) from exc
    except urllib.error.URLError as exc:
        raise AIProviderRequestError(
            f"Falha de rede ao acessar AI provider: {exc.reason}"
        ) from exc


def _parse_json_text(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", cleaned, re.DOTALL)
    if fenced:
        cleaned = fenced.group(1)

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise AIProviderRequestError(
            "AI provider nao retornou JSON valido."
        ) from exc

    if not isinstance(parsed, dict):
        raise AIProviderRequestError("AI provider retornou JSON que nao e objeto.")

    return parsed
