# PROCEDER FILOSOFICO — SPRINT 05

## Escopo

Implementacao do modelo canonico do sistema de dossies, sem criar artigos, sem escrever conteudo editorial novo, sem alterar identidade visual, sem criar imagens e sem deploy.

## Estrutura implementada

- `SITE/data/dossiers.schema.json` passa a ser o contrato canonico dos dossies.
- `SITE/data/dossiers.json` passa a conter um unico dossie-modelo:
  - `a-questao-da-beleza`
  - status: `planned`
  - `isCanonicalModel: true`
- `AUTOMATION/generate_seo.mjs` gera:
  - indice `/dossies/`;
  - pagina individual `/dossies/a-questao-da-beleza/`;
  - sitemap com rotas de dossies;
  - JSON-LD `CollectionPage` para a pagina do dossie.
- `VALIDATION/validate_editorial_architecture.mjs` valida campos obrigatorios e referencias para artigos existentes.

## Arquivos criados

- `SITE/dossies/a-questao-da-beleza/index.html`
- `MISSION_SPRINT_05_REPORT.md`

## Arquivos modificados

- `SITE/data/dossiers.schema.json`
- `SITE/data/dossiers.json`
- `AUTOMATION/generate_seo.mjs`
- `VALIDATION/validate_editorial_architecture.mjs`
- `SITE/dossies/index.html`
- `SITE/sitemap.xml`
- `README.md`

## Campos obrigatorios do modelo

- `id`
- `slug`
- `title`
- `subtitle`
- `category`
- `status`
- `isCanonicalModel`
- `editorialIntroduction`
- `intellectualObjective`
- `mainArticle`
- `relatedArticles`
- `recommendedArticles`
- `relatedBooks`
- `relatedPhilosophers`
- `relatedAuthors`
- `relatedArtworks`
- `historicalPeriods`
- `civilizations`
- `timeline`
- `bibliography`
- `futureReadings`
- `continueStudying`

## Como cadastrar novos dossies

1. Adicionar um novo objeto em `SITE/data/dossiers.json`.
2. Usar `id` e `slug` em kebab-case.
3. Usar `category` existente na taxonomia oficial.
4. Usar apenas slugs reais de artigos existentes em:
   - `mainArticle`;
   - `relatedArticles`;
   - `recommendedArticles`;
   - `continueStudying`.
5. Usar arrays vazios quando nao houver relacao segura.
6. Rodar validacoes e geracao estatica antes de qualquer deploy.

## Recomendacoes de consistencia

- Nao publicar dossie sem `mainArticle` definido, salvo quando ele for explicitamente um modelo canonico ou rascunho planejado.
- Manter `status: "planned"` enquanto o dossie usar placeholders.
- Preencher `bibliography`, `timeline` e `futureReadings` somente com curadoria confirmada.
- Evitar criar dossies que tenham menos de tres artigos relacionados.
- Reutilizar o mesmo contrato para todos os dossies futuros, sem campos improvisados por caso.

## Validacoes executadas

```bash
node --check AUTOMATION/generate_seo.mjs
node --check VALIDATION/validate_editorial_architecture.mjs
node --check SITE/posts.js
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_editorial_metadata.mjs
node VALIDATION/validate_editorial_architecture.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

Resultado: todas as validacoes passaram.

## Pendencias

- Substituir placeholders do modelo quando o dossie for aprovado editorialmente.
- Definir artigo principal real para `A Questao da Beleza`.
- Preencher bibliografia, linha do tempo, obras de arte relacionadas e leituras futuras com curadoria confirmada.

## Proxima sprint recomendada

Sprint 06 — Primeiro dossie real: transformar o modelo `A Questao da Beleza` em um dossie editorial completo, ainda sem criar artigos novos, usando apenas acervo existente e curadoria bibliografica aprovada.
