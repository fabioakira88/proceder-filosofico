from __future__ import annotations

from pathlib import Path
from typing import Any


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

## Acoes nao executadas

- Nenhuma chamada ao Notion real.
- Nenhuma chamada a API de geracao.
- Nenhuma alteracao em Japao Relativo.
- Nenhuma alteracao em Proceder Filosofico.
- Nenhum commit automatico.
- Nenhum deploy.
"""
