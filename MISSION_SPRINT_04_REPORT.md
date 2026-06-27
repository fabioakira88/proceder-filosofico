# PROCEDER FILOSOFICO — SPRINT 04

## Escopo

Ativacao da arquitetura editorial na experiencia de navegacao, sem criacao de novos artigos, sem alteracao dos textos publicados, sem redesign, sem criacao de imagens e sem deploy.

## Arquivos modificados

- `AUTOMATION/generate_seo.mjs`
- `SITE/artigos/index.html`
- `SITE/index.html`
- `SITE/sitemap.xml`
- `README.md`

## Estrutura criada

- `SITE/categoria/`
- `SITE/dossies/`

## Arquivos gerados

- 43 paginas de artigo regeneradas com navegacao editorial.
- 10 paginas de categoria em `/categoria/<slug>/`.
- 1 pagina base de dossies em `/dossies/`.
- `SITE/sitemap.xml` atualizado com categorias e dossies.

## Ativacoes por artigo

Cada pagina estatica de artigo passou a exibir, quando houver metadado seguro:

- categoria;
- subcategoria;
- periodo historico;
- civilizacao;
- temas relacionados;
- livros relacionados;
- autores relacionados;
- proximo estudo recomendado;
- artigos relacionados.

## Ativacoes na Home

A Home recebeu bloco editorial gerado automaticamente para:

- Filosofia;
- Historia da Civilizacao;
- Literatura;
- Ciencia;
- Religiao;
- Atualidade Filosofica.

O bloco usa apenas artigos existentes e metadados ja curados.

## Paginas de categoria

Foram geradas paginas para todas as categorias oficiais:

- `/categoria/filosofia/`
- `/categoria/historia-da-civilizacao/`
- `/categoria/antropologia/`
- `/categoria/sociologia/`
- `/categoria/literatura/`
- `/categoria/arte/`
- `/categoria/religiao/`
- `/categoria/ciencia/`
- `/categoria/politica/`
- `/categoria/atualidade-filosofica/`

A categoria Antropologia permanece sem artigos, refletindo a lacuna real do acervo.

## Dossies

Criada a pagina base `/dossies/`.

Como `SITE/data/dossiers.json` ainda nao possui dossies oficiais, a pagina exibe estado vazio controlado. Nenhum dossie novo foi criado.

## Validacoes executadas

```bash
node --check AUTOMATION/generate_seo.mjs
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

- Criar os primeiros dossies oficiais em `SITE/data/dossiers.json`.
- Definir se categorias sem artigos devem permanecer publicas ou ficar fora do sitemap ate receberem conteudo.
- Avaliar uma pagina indice `/categoria/` em sprint futura.
- Conectar a pagina `/dossies/` ao menu principal quando houver dossies reais.

## Proxima sprint recomendada

Sprint 05 — Dossies oficiais: cadastrar os primeiros dossies reais usando os artigos ja curados, definir artigo principal, artigos relacionados, livros, filosofos, linha do tempo e bibliografia.
