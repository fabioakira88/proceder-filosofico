# PRODUCTION_SNAPSHOT.md — Proceder Filosofico

Data: 2026-06-25  
Fonte: `https://procederfilosofico.com.br/`  
Escopo: espelhamento tecnico da producao viva, sem deploy e sem reconstruir a Home.

## Local do snapshot

- HTML bruto: `VALIDATION/PRODUCTION_SNAPSHOT/raw/`
- Assets baixados: `VALIDATION/PRODUCTION_SNAPSHOT/assets/`
- Resumo tecnico: `VALIDATION/PRODUCTION_SNAPSHOT/snapshot-summary.json`
- Probes de permalink: `VALIDATION/PRODUCTION_SNAPSHOT/permalink_probes.json`
- Comparacao de conteudo: `VALIDATION/PRODUCTION_SNAPSHOT/content_comparison.json`
- Classificacao: `VALIDATION/PRODUCTION_SNAPSHOT/content-classification.json`
- Posts extraidos da Home de producao: `CONTENT/production/production-home-posts-2026-06-25.json`

## Arquivos brutos preservados

| Origem | Arquivo local | Status |
|---|---|---|
| `/` | `VALIDATION/PRODUCTION_SNAPSHOT/raw/home.html` | Capturado |
| `/biblioteca.html` | `VALIDATION/PRODUCTION_SNAPSHOT/raw/biblioteca.html` | Capturado |
| `/robots.txt` | `VALIDATION/PRODUCTION_SNAPSHOT/raw/robots.txt` | Capturado como resposta de producao |
| `/sitemap.xml` | `VALIDATION/PRODUCTION_SNAPSHOT/raw/sitemap.xml` | Capturado como resposta de producao |

Observacao: `robots.txt` e `sitemap.xml` retornaram o mesmo corpo de 404 HTML da hospedagem, preservado no snapshot para representar fielmente a producao no momento da captura.

## Conteudo de producao preservado

Foram extraidos 8 posts/cards da Home publicada:

1. `peter-pan-sindrome-amadurecimento`
2. `confissoes-santo-agostinho`
3. `a-montanha-contra-a-caverna`
4. `somos-livres-por-completo`
5. `ser-so-religioso-pode-te-tornar-ignorante`
6. `a-etica-da-virtude-segundo-aristoteles`
7. `critica-da-razao-pura`
8. `licoes-de-siegfried`

Resultado da comparacao com `SITE/posts.js`:

- Presentes em producao e ausentes do acervo local: 7
- Presente em producao e tambem no acervo local: 1 (`confissoes-santo-agostinho`)
- Presentes apenas no acervo local: 42

## Assets preservados

Foram preservados 42 assets internos referenciados pela Home/Biblioteca de producao, incluindo:

- `index_files/*.css`
- `index_files/*.js`
- imagens do hero em `index_files/`
- retratos da galeria em `index_files/` e `Canva_-_Proceder/`
- imagens de frases em `Canva_-_Proceder/frases/`

O registro detalhado esta em `VALIDATION/PRODUCTION_SNAPSHOT/snapshot-summary.json`.

## URLs e permalinks

URLs confirmadas em producao:

- `/` — 200
- `/biblioteca.html` — 200

Rotas/candidatos testados para os 8 cards da Home:

- `/<slug>/`
- `/artigos/<slug>/`

Resultado: 16 de 16 retornaram 404.

Interpretacao tecnica: na producao atual, os artigos da Home estao publicados como conteudo embutido/overlay dentro da propria Home, nao como paginas estaticas acessiveis por permalink nos candidatos testados.

## Classificacao do acervo local

- Conteudo ativo de producao: os 8 posts extraidos da Home publicada.
- Conteudo local tambem presente em producao: `confissoes-santo-agostinho`.
- Conteudo local ainda nao confirmado em producao: 42 slugs classificados como `experimental-local` ate decisao de reconciliacao.
- `SITE/index.html`: referencia historica de design pendente de arquivamento formal, conforme `BRANDING/DECISAO_HOME_OFICIAL.md`.
- `SITE/docs/backups/proceder-fase1-20260601-110542/index.html`: backup mais proximo da producao, mas nao espelho perfeito.

## Limitacoes

- Este snapshot nao faz deploy.
- Este snapshot nao reconstrói a Home.
- Este snapshot nao altera identidade visual, tipografia, paleta ou UX.
- A estrutura real de WordPress/permalinks continua bloqueada: os candidatos publicos testados retornam 404.

## Status

Snapshot criado e preservado no repositorio.  
Status da reconciliacao da Home: pendente.  
Recomendacao: nao executar deploy ate que a Home reconciliada seja criada a partir deste snapshot e validada contra a decisao oficial.
