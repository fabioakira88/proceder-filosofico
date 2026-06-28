# Proceder Filosofico — Sprint 01C — Consolidacao de Arquitetura Compartilhada

Data: 2026-06-27

## Escopo

Consolidacao estrutural sem deploy, sem criacao de artigos, sem novas secoes editoriais e sem redesenho visual.

## Estado Git inicial

- Branch atual: `sprint-01b-estabilizacao`
- Sprint 01B: ainda nao commitada no inicio da Sprint 01C.
- Risco documentado: as alteracoes da 01C foram feitas sobre uma arvore ja suja, com modificados, deletados e muitos nao rastreados herdados de sprints anteriores.

## Bloqueio de caminho solicitado

O caminho pedido `SITE/assets/css/` nao pode ser criado diretamente porque `SITE/assets/css` ja existe como arquivo legado sem extensao, documentado em relatorios anteriores como asset exportado do WordPress.

Decisao conservadora:

- nao mover;
- nao renomear;
- nao apagar;
- criar camada transitoria em `SITE/assets/css-shared/`;
- registrar migracao do asset legado como pendencia de sprint propria.

## Arquivos criados

- `SITE/assets/css-shared/tokens.css`
- `SITE/assets/css-shared/base.css`
- `SITE/assets/css-shared/components.css`
- `SITE/assets/css-shared/pages/editorial-index.css`
- `SITE/assets/js/navigation.js`
- `SITE/assets/js/article-list.js`
- `SITE/assets/js/filters.js`
- `SITE/assets/js/reader.js`
- `MISSION_SPRINT_01C_ARCHITECTURE_CONSOLIDATION_REPORT.md`

## Arquivos alterados

- `README.md`
- `AUTOMATION/templates/hub.html`
- `SITE/index.html`
- `SITE/artigos/index.html`
- `SITE/conteudo/index.html`
- `SITE/filosofos/index.html`
- `SITE/biblioteca.html`
- `SITE/sobre/index.html`
- paginas geradas em `SITE/artigos/<slug>/`
- paginas geradas em `SITE/conteudo/<slug>/`
- `SITE/sitemap.xml`
- `SITE/robots.txt`

## CSS extraido/consolidado

Extraido como camada aditiva, carregada antes dos estilos locais:

- tokens de cor canonicos;
- aliases para variaveis atuais;
- tipografia base;
- container compartilhado;
- primitivas de label, botao, card e grid;
- responsividade comum para grids;
- helpers editoriais de page head, area, period e counts.

CSS especifico demais permaneceu local:

- hero da Home;
- reader de artigos;
- layout de cards da Biblioteca;
- retratos de filosofos;
- estilos de HUBs e listagens com detalhes proprios.

## JS extraido/consolidado

- `navigation.js`: menu mobile para `menuToggle/libraryNav`, `hamburger/navLinks` e seletores declarativos.
- `article-list.js`: rota de artigo, imagem de artigo e slug de ancora por tag.
- `reader.js`: reescrita segura de links/conteudo de artigo para rotas estaticas.
- `filters.js`: normalizacao textual e matching basico para filtros futuros.

JS mantido local por ser especifico demais:

- renderizacao da Biblioteca e seus dados inline;
- renderizacao completa da pagina de filosofos;
- overlay de leitura da pagina de artigos;
- hero rotativo da Home;
- agrupamento de categorias em `/conteudo/`, exceto helpers reutilizados.

## Validacoes executadas

```bash
node --check SITE/posts.js
node --check SITE/assets/js/navigation.js
node --check SITE/assets/js/article-list.js
node --check SITE/assets/js/filters.js
node --check SITE/assets/js/reader.js
node VALIDATION/validate_editorial_metadata.mjs
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

Resultados:

- posts.js: OK
- JS compartilhado: OK
- metadados editoriais: OK, 43 artigos
- links internos: OK
- assets referenciados: OK
- sitemap/robots: OK
- gerador SEO: OK, 43 paginas de artigo e 3 HUBs

## Riscos

- A arvore Git segue suja e a Sprint 01B nao estava commitada.
- `generate_seo.mjs` regrava paginas de artigos, HUBs, sitemap e robots.
- `SITE/assets/css` bloqueia o caminho canonico solicitado para CSS.
- A Biblioteca ainda possui grande bloco JS local e dados inline.

## Pendencias

- Migrar ou preservar formalmente `SITE/assets/css` antes de usar `SITE/assets/css/`.
- Mover dados da Biblioteca para `SITE/src/data/` ou `SITE/data/` em sprint propria.
- Reduzir CSS inline por pagina de forma gradual.
- Extrair overlay de leitura e renderizacao de cards apos testes visuais.
- Criar teste visual local para garantir preservacao de layout desktop/mobile.

## Proxima sprint recomendada

Sprint 01D: separacao controlada de dados e templates.

Prioridades:

- consolidar dados da Biblioteca;
- criar templates menores para listagens;
- reduzir inline CSS sem alterar aparencia;
- adicionar validacao visual com servidor local e screenshots;
- decidir, com aprovacao, o destino do asset legado `SITE/assets/css`.
