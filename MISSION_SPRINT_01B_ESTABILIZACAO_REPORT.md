# Proceder Filosofico — Sprint 01B — Estabilizacao P0

Data: 2026-06-27

## Escopo

Sprint tecnica P0, sem expansao editorial, sem deploy, sem criacao de novas secoes e sem remocao de assets legados.

## Snapshot Git

- Branch inicial: `main`
- Branch de seguranca criada: `sprint-01b-estabilizacao`
- Recomendacao: antes de novas sprints, criar commit/snapshot desta estabilizacao e separar alteracoes editoriais de alteracoes de infraestrutura.
- Estado de risco: o repositorio ja estava sujo antes da Sprint 01B, com modificados, deletados e muitos nao rastreados.

## Arquivos modificados

- `SITE/posts.js`
- `SITE/index.html`
- `SITE/conteudo/index.html`
- `SITE/sobre/index.html`
- `README.md`
- `SITE/artigos/index.html` e paginas estaticas em `SITE/artigos/<slug>/` foram tocadas pelo gerador SEO.
- `SITE/conteudo/index.html` e paginas HUB em `SITE/conteudo/<slug>/` foram tocadas pelo gerador SEO.
- `SITE/sitemap.xml`
- `SITE/robots.txt`

## Arquivos criados

- `VALIDATION/validate_links.mjs`
- `VALIDATION/validate_assets.mjs`
- `VALIDATION/validate_editorial_metadata.mjs`
- `VALIDATION/validate_sitemap_robots.mjs`
- `MISSION_SPRINT_01B_ESTABILIZACAO_REPORT.md`

## Correcoes aplicadas

### Modelo editorial

`SITE/posts.js` recebeu normalizacao minima em tempo de carga para todos os 43 artigos:

- `slug`
- `title`
- `description`
- `category`
- `subcategory`
- `tags`
- `period`
- `civilization`
- `philosophers`
- `format`
- `heroImage`
- `date`
- `updated`

Campos sem dado seguro usam valores neutros: `null`, `[]`, `"geral"` ou `"artigo"`.

### SEO estrutural

- Home ajustada para manter apenas um `h1` no hero. Slides secundarios passaram a usar `h2`, preservando o estilo visual.
- JSON-LD adicionado a `/conteudo/` como `CollectionPage`.
- JSON-LD adicionado a `/sobre/` como `AboutPage`.
- Title, description e canonical das paginas principais foram preservados.

### Assets

Foi adotada uma decisao P0 conservadora:

- nao mover assets em massa;
- nao apagar assets legados;
- validar referencias existentes;
- documentar que a pasta canonica futura deve ser `SITE/assets/images/`, com migracao gradual.

Duplicacoes conhecidas entre `SITE/assets/`, `SITE/assets/Filósofos/` e `SITE/public/images/` permanecem como pendencia controlada.

### Validacoes locais

Scripts criados:

- `node VALIDATION/validate_links.mjs`
- `node VALIDATION/validate_assets.mjs`
- `node VALIDATION/validate_editorial_metadata.mjs`
- `node VALIDATION/validate_sitemap_robots.mjs`

## Como testar localmente

```bash
cd /Users/fabiotsugawa/Downloads/DIGITAL_PROJECTS:/PROCEDER_FILOSOFICO:
node --check SITE/posts.js
node --check VALIDATION/validate_links.mjs
node --check VALIDATION/validate_assets.mjs
node --check VALIDATION/validate_editorial_metadata.mjs
node --check VALIDATION/validate_sitemap_robots.mjs
node VALIDATION/validate_editorial_metadata.mjs
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

## Validacoes executadas

- `node --check SITE/posts.js`: OK
- `node --check VALIDATION/validate_links.mjs`: OK
- `node --check VALIDATION/validate_assets.mjs`: OK
- `node --check VALIDATION/validate_editorial_metadata.mjs`: OK
- `node --check VALIDATION/validate_sitemap_robots.mjs`: OK
- `node VALIDATION/validate_editorial_metadata.mjs`: OK, 43 artigos
- `node AUTOMATION/generate_seo.mjs`: OK, 43 paginas de artigo, 3 HUBs, sitemap e robots
- `node VALIDATION/validate_links.mjs`: OK
- `node VALIDATION/validate_assets.mjs`: OK
- `node VALIDATION/validate_sitemap_robots.mjs`: OK
- Checagem estrutural direta: `SITE/index.html`, `SITE/conteudo/index.html` e `SITE/sobre/index.html` com 1 `h1`, JSON-LD presente e canonical presente.

## Pendencias

- Consolidar taxonomia editorial real em sprint propria.
- Migrar imagens para uma arvore canonica sem quebrar URLs publicas.
- Extrair CSS/JS inline para arquivos compartilhados.
- Auditar assets legados WordPress/Elementor antes de qualquer remocao.
- Resolver Git sujo antes de deploy.

## Riscos

- O repositorio ja estava com muitas alteracoes modificadas, deletadas e nao rastreadas antes desta sprint.
- `AUTOMATION/generate_seo.mjs` regrava paginas de artigos, HUBs, `sitemap.xml`, `robots.txt` e a lista de HUBs em `/conteudo/`.
- A migracao de assets exige cuidado porque ha duplicacoes usadas por paginas diferentes.
- Nao foi feito deploy.

## Proxima sprint recomendada

Sprint 01C: consolidacao arquitetural sem conteudo novo.

Prioridades:

- extrair componentes compartilhados de layout;
- separar CSS base/componentes/paginas;
- formalizar taxonomia editorial;
- revisar assets por uso real;
- preparar gerador estatico mais completo.
