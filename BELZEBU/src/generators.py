from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ai_provider import AIProvider


def _keywords(pauta: dict[str, Any]) -> str:
    return ", ".join(pauta.get("palavras_chave", []))


def generate_draft(pauta: dict[str, Any]) -> str:
    title = pauta["titulo"]
    keywords = _keywords(pauta)

    return f"""---
title: "{title}"
project: "{pauta['projeto']}"
category: "{pauta['categoria']}"
cluster: "{pauta['cluster']}"
slug: "{pauta['slug']}"
keywords: "{keywords}"
status: "dry-run"
---

# {title}

## Introducao

Este e um rascunho gerado pelo Belzebu em modo dry-run. Ele simula a estrutura editorial que sera enviada ao publisher no futuro, sem alterar nenhum site.

## Angulo editorial

{pauta['notas_editoriais']}

## Estrutura sugerida

1. Contexto do tema.
2. Explicacao principal.
3. Impacto cultural ou filosofico.
4. Aplicacoes para o publico do projeto.
5. Conclusao.

## SEO preliminar

- Palavra-chave principal: {pauta.get('palavras_chave', [''])[0]}
- Cluster: {pauta['cluster']}
- Slug: {pauta['slug']}

## FAQ preliminar

### Por que este tema importa?

Porque conecta uma pauta editorial aprovada a uma pergunta real do publico.

### Para quem este artigo foi pensado?

Para leitores do projeto {pauta['projeto']} interessados em conteudo claro, contextualizado e publicavel.
"""


def generate_image_prompt(pauta: dict[str, Any]) -> str:
    return f"""# Prompt de imagem

## Pauta

{pauta['titulo']}

## Projeto

{pauta['projeto']}

## Conceito visual

Criar uma capa editorial premium, limpa e contextual, alinhada ao cluster `{pauta['cluster']}`.

## Cena principal

Representar visualmente o tema com atmosfera documental, sem texto dentro da imagem e sem logotipos.

## Palavras-chave visuais

{_keywords(pauta)}

## Alt text sugerido

Imagem editorial para o artigo "{pauta['titulo']}".

## Nome de arquivo sugerido

{pauta['slug']}.webp
"""


def generate_report(
    pauta: dict[str, Any],
    draft_path: Path,
    image_prompt_path: Path,
) -> str:
    return f"""# Relatorio Belzebu - Dry-run

## Status

Sucesso.

## Pauta

- Titulo: {pauta['titulo']}
- Projeto: {pauta['projeto']}
- Categoria: {pauta['categoria']}
- Cluster: {pauta['cluster']}
- Slug: {pauta['slug']}

## Arquivos gerados

- Draft: {draft_path}
- Prompt de imagem: {image_prompt_path}

## Origem

- Notion page ID: {pauta.get('notion_page_id', 'n/a')}
- Prioridade: {pauta.get('prioridade', 'n/a')}
- Data publicacao: {pauta.get('data_publicacao', 'n/a')}

## Acoes nao executadas

- Nenhuma chamada a API de geracao.
- Nenhuma alteracao em Japao Relativo.
- Nenhuma alteracao em Proceder Filosofico.
- Nenhum commit automatico.
- Nenhum deploy.

## Notion

Se a pauta veio do Notion, qualquer atualizacao de status foi simulada, exceto quando o comando usou `--write-notion`.
"""


def generate_article_json(pauta: dict[str, Any], provider: AIProvider) -> dict[str, Any]:
    return provider.generate_json(
        system_prompt=_json_system_prompt(),
        user_prompt=f"""Gere article.json para a pauta abaixo.

Requisitos:
- retornar somente JSON;
- title;
- slug;
- summary;
- body_markdown com pelo menos 900 palavras;
- reading_time em minutos;
- h2_structure como lista de subtitulos.

Pauta:
{_pauta_json(pauta)}
""",
    )


def generate_seo_json(
    pauta: dict[str, Any],
    article: dict[str, Any],
    provider: AIProvider,
) -> dict[str, Any]:
    return provider.generate_json(
        system_prompt=_json_system_prompt(),
        user_prompt=f"""Gere seo.json para a pauta e artigo abaixo.

Requisitos:
- retornar somente JSON;
- meta_title;
- meta_description;
- focus_keyword;
- og_title;
- og_description;
- schema_article como objeto JSON-LD Article.

Pauta:
{_pauta_json(pauta)}

Article:
{json.dumps(article, ensure_ascii=False)}
""",
    )


def generate_faq_json(
    pauta: dict[str, Any],
    article: dict[str, Any],
    provider: AIProvider,
) -> dict[str, Any]:
    return provider.generate_json(
        system_prompt=_json_system_prompt(),
        user_prompt=f"""Gere faq.json para a pauta e artigo abaixo.

Requisitos:
- retornar somente JSON;
- questions: lista com 5 a 8 objetos contendo question e answer;
- schema_faq separado como JSON-LD FAQPage.

Pauta:
{_pauta_json(pauta)}

Article:
{json.dumps(article, ensure_ascii=False)}
""",
    )


def generate_image_prompt_json(
    pauta: dict[str, Any],
    article: dict[str, Any],
    provider: AIProvider,
) -> dict[str, Any]:
    return provider.generate_json(
        system_prompt=_json_system_prompt(),
        user_prompt=f"""Gere image-prompt.json para a pauta e artigo abaixo.

Requisitos:
- retornar somente JSON;
- og_prompt;
- instagram_prompt;
- visual_direction;
- palette;
- style.

Pauta:
{_pauta_json(pauta)}

Article:
{json.dumps(article, ensure_ascii=False)}
""",
    )


def generate_generate_only_report_json(
    *,
    pauta: dict[str, Any],
    provider_name: str,
    output_files: dict[str, str],
    validation_status: str,
) -> dict[str, Any]:
    return {
        "status": "success",
        "mode": "generate-only",
        "provider": provider_name,
        "pauta": {
            "titulo": pauta["titulo"],
            "projeto": pauta["projeto"],
            "categoria": pauta["categoria"],
            "cluster": pauta["cluster"],
            "slug": pauta["slug"],
            "notion_page_id": pauta.get("notion_page_id"),
        },
        "output_files": output_files,
        "validation_status": validation_status,
        "safety": {
            "published": False,
            "site_changed": False,
            "git_commit": False,
            "deploy": False,
        },
    }


def _json_system_prompt() -> str:
    return (
        "Voce e o Belzebu, um orquestrador editorial. "
        "Responda sempre com JSON valido, sem markdown e sem comentarios fora do JSON."
    )


def _pauta_json(pauta: dict[str, Any]) -> str:
    return json.dumps(
        {
            "titulo": pauta.get("titulo"),
            "projeto": pauta.get("projeto"),
            "categoria": pauta.get("categoria"),
            "cluster": pauta.get("cluster"),
            "palavras_chave": pauta.get("palavras_chave"),
            "notas_editoriais": pauta.get("notas_editoriais"),
            "slug": pauta.get("slug"),
        },
        ensure_ascii=False,
    )
