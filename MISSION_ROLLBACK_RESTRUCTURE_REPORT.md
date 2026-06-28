# Proceder Filosofico - Rollback + Reestruturacao

Data: 2026-06-27

## Resumo

Foi aplicada uma correcao controlada para devolver a Home ao papel de capa-hub editorial, sem redesign, sem deploy e sem commit.

A identidade visual existente foi preservada: hero, paleta, tipografia, cards, grids, bordas, sombras e linguagem institucional continuam derivados do sistema ja usado no site.

## Arquivos alterados nesta intervencao

- `SITE/data/home-editorial.json`
- `SITE/index.html`
- `SITE/artigos/index.html`
- `SITE/filosofos/index.html`
- `SITE/biblioteca.html`
- `SITE/sobre/index.html`
- `AUTOMATION/generate_seo.mjs`
- `AUTOMATION/templates/hub.html`
- `VALIDATION/validate_editorial_architecture.mjs`
- paginas estaticas regeneradas em `SITE/artigos/`, `SITE/categoria/`, `SITE/dossies/` e `SITE/conteudo/`
- `SITE/sitemap.xml`

## Correcoes aplicadas

- Home reduzida para o fluxo pedido: Hero, Destaques, Categorias, Filosofos, Dossies, Biblioteca, Newsletter e Footer.
- Bloco "Projetos conectados" removido da Home.
- Rail "Ecossistema" removido dos dados editoriais da Home.
- Bloco "Continue estudando" removido da Home; permanece apenas nos artigos, onde funciona como continuidade editorial.
- Marcadores internos renomeados de `HOME_V2` para `HOME_HUB`.
- Navbar institucional padronizada nas paginas principais: Inicio, Artigos, Categorias, Filosofos, Dossies, Livros, Sobre e Newsletter.
- Template de HUB atualizado para propagar a mesma navegacao em categorias, dossies e hubs.
- Pagina de artigos passou a usar navegacao institucional com logo, propagada para os 43 artigos estaticos.
- Footer da Home alinhado aos destinos editoriais principais.

## Decisoes tecnicas

- Nao foi criado novo conteudo editorial.
- Nao foram criados novos artigos.
- Nao foram criadas novas imagens.
- Nao houve redesign da Home.
- A geracao estatica foi mantida como fonte de verdade para artigos, categorias, dossies, hubs, sitemap e robots.
- O modelo de Home agora e dirigido por `SITE/data/home-editorial.json`, evitando conteudo duplicado no HTML.

## Validacoes executadas

- `node --check AUTOMATION/generate_seo.mjs` - OK
- `node --check SITE/posts.js` - OK
- `node AUTOMATION/generate_seo.mjs` - OK, 43 artigos, 10 categorias, 1 dossie, 3 HUBs, sitemap e robots gerados
- `node VALIDATION/validate_editorial_metadata.mjs` - OK
- `node VALIDATION/validate_editorial_architecture.mjs` - OK
- `node VALIDATION/validate_links.mjs` - OK
- `node VALIDATION/validate_assets.mjs` - OK
- `node VALIDATION/validate_sitemap_robots.mjs` - OK

## Verificacoes especificas

- Home sem "Projetos conectados".
- Home sem "Ecossistema".
- Home sem "Ultimos Artigos".
- Home sem "Continue estudando".
- Artigo amostral gerado com nova navegacao institucional.
- `sitemap.xml` inclui artigos, categorias, dossies, filosofos e sobre.
- `robots.txt` aponta para o sitemap oficial.

## Pendencias estruturais

- Paginas completas individuais de filosofos ainda nao foram implementadas.
- Paginas completas individuais de livros ainda nao foram implementadas.
- Busca global ainda nao foi implementada.
- Direcao de arte por categoria ainda precisa ser planejada em sprint propria.
- A pagina de dossie canonico ainda e infraestrutura/modelo; conteudo real deve ser tratado em sprint editorial futura.

## Riscos

- O repositorio permanece com Git muito sujo por alteracoes acumuladas de sprints anteriores e arquivos nao rastreados.
- Ha arquivos deletados anteriores no status Git que nao foram restaurados nem removidos nesta intervencao.
- Ha assets e diretorios grandes nao rastreados que precisam de uma organizacao de commit/snapshot antes de qualquer deploy.

## Recomendacao

Nao fazer deploy ainda.

Antes de publicar, criar um snapshot/commit organizado das sprints ja aceitas ou uma branch de seguranca. Depois disso, executar uma auditoria visual local da Home, artigos, categorias, dossies, filosofos, biblioteca e sobre em desktop e mobile.
