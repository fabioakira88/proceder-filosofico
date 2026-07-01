# MISSION PF COVER P1 CANONICAL REPORT

## Resumo

Lote P1 de canonizacao visual das capas do Proceder Filosofico.

Objetivo: substituir tres imagens nao canonicas de artigos importantes por capas editoriais ASCII-safe em `SITE/assets/article_cards/`, preservando shell, layout, textos, taxonomia e identidade visual.

## Artigos tratados

| Artigo | Antes | Depois | Status |
| --- | --- | --- | --- |
| Poetas, Dramaturgos e a Educacao da Grecia Antiga | `assets/homero2.png` | `assets/article_cards/poetas-dramaturgos-educacao-grecia-antiga.webp` | OK |
| Os Sofistas: Os Primeiros Mestres da Persuasao | `assets/Escola-athenas.jpg` | `assets/article_cards/sofistas-primeiros-mestres-persuasao.webp` | OK |
| A Vida Como um Pendulo: A Visao de Schopenhauer Sobre o Desejo Humano | `assets/Arthur-schopenhauer.jpg` | `assets/article_cards/vida-pendulo-schopenhauer-desejo-humano.webp` | OK |

## Imagens criadas

| Arquivo | Peso aproximado | Observacao |
| --- | ---: | --- |
| `SITE/assets/article_cards/poetas-dramaturgos-educacao-grecia-antiga.webp` | 143 KB | Teatro, paideia e educacao grega em linguagem editorial historica. |
| `SITE/assets/article_cards/sofistas-primeiros-mestres-persuasao.webp` | 139 KB | Agora ateniense, retorica e debate publico. |
| `SITE/assets/article_cards/vida-pendulo-schopenhauer-desejo-humano.webp` | 79 KB | Pendulo, estudo europeu e atmosfera metafisica. |

## Arquivos alterados

- `SITE/posts.js`
- `SITE/index.html`
- `SITE/artigos/index.html`
- `SITE/artigos/poetas-dramaturgos-educacao-grecia-antiga/index.html`
- `SITE/artigos/sofistas-primeiros-mestres-persuasao/index.html`
- `SITE/artigos/vida-pendulo-schopenhauer-desejo-humano/index.html`
- `SITE/categoria/filosofia/index.html`
- `SITE/categoria/literatura/index.html`
- `SITE/conteudo/atenas-classica/index.html`
- `SITE/dossies/a-questao-da-beleza/index.html`

## Arquivos criados

- `SITE/assets/article_cards/poetas-dramaturgos-educacao-grecia-antiga.webp`
- `SITE/assets/article_cards/sofistas-primeiros-mestres-persuasao.webp`
- `SITE/assets/article_cards/vida-pendulo-schopenhauer-desejo-humano.webp`

## Validacoes

| Comando | Status | Observacao |
| --- | --- | --- |
| `node --check SITE/posts.js` | OK | Sintaxe valida. |
| `node AUTOMATION/generate_seo.mjs` | OK | 43 artigos, 10 categorias, 1 dossie, 3 HUBs, sitemap e robots regenerados. |
| `node VALIDATION/validate_assets.mjs` | OK | Assets referenciados encontrados. |
| `node VALIDATION/validate_links.mjs` | OK | Links internos locais validos. |
| `node VALIDATION/validate_editorial_metadata.mjs` | OK | Metadados minimos validados em 43 artigos. |
| `node VALIDATION/validate_sitemap_robots.mjs` | OK | Sitemap e robots validos. |
| `node VALIDATION/validate_deploy_manifest.mjs` | OK | Apos stage seletivo, o manifesto confirmou uso somente de assets versionados. |
| `git diff --check` | OK | Sem erro de whitespace. |

## Escopo preservado

- Header nao alterado.
- Nav nao alterada.
- Footer nao alterado.
- CSS global nao alterado.
- Conteudo editorial nao reescrito.
- Taxonomia nao alterada.
- Nenhum asset bruto antigo removido.

## Proxima acao recomendada

Commitar, abrir PR, mergear e validar as tres capas em producao.
