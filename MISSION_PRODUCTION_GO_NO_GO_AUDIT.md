# PROCEDER FILOSOFICO — AUDITORIA FINAL DE PRODUCAO

## Pergunta

Se publicar hoje, o que pode quebrar?

## Veredito

GO condicionado.

O site local esta consistente para publicacao estatica, mas o deploy so deve acontecer com o filtro atualizado de `AUTOMATION/deploy.py`, que agora exclui `wp-content` e `wp-includes`.

## Bloqueador encontrado e corrigido

### WordPress legado dentro de `SITE/`

Antes da correcao, `AUTOMATION/deploy.py` enviaria arquivos permitidos dentro de:

- `SITE/wp-content/`
- `SITE/wp-includes/`

Impacto possivel:

- publicar residuos WordPress junto com o site estatico;
- aumentar superficie de arquivos desnecessarios em producao;
- confundir auditorias futuras;
- enviar PDF/JSON/JS que nao fazem parte do build canonico.

Acao aplicada:

- `AUTOMATION/deploy.py` passou a excluir `wp-content` e `wp-includes`.

Resultado do pacote apos correcao:

- arquivos que entrariam no deploy: 643;
- `wp-content` incluido: nao;
- `wp-includes` incluido: nao.

## Validacoes locais

Todas passaram:

```bash
node --check AUTOMATION/generate_seo.mjs
node --check SITE/posts.js
python3 -m py_compile AUTOMATION/deploy.py
node VALIDATION/validate_editorial_metadata.mjs
node VALIDATION/validate_editorial_architecture.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

## Estrutura local verificada

- Artigos: 43 paginas estaticas + indice `/artigos/`.
- Categorias: 10 paginas em `/categoria/<slug>/`.
- Dossies: indice `/dossies/` + modelo `/dossies/a-questao-da-beleza/`.
- Sitemap local: 63 URLs.
- Robots local: valido.
- `.env` dentro de `SITE/`: nao encontrado.
- `.DS_Store` dentro de `SITE/`: nao encontrado.

Distribuicao do sitemap local:

- `/artigos/`: 44 URLs.
- `/categoria/`: 10 URLs.
- `/dossies/`: 2 URLs.
- `/conteudo/`: 4 URLs.

## Producao atual

Checagem em 27 de junho de 2026:

- `https://www.procederfilosofico.com.br/`: 200.
- `https://www.procederfilosofico.com.br/artigos/sociedade-moderna-destruiu-silencio/`: 404.
- `https://www.procederfilosofico.com.br/categoria/filosofia/`: 404.
- `https://www.procederfilosofico.com.br/dossies/a-questao-da-beleza/`: 404.
- `https://procederfilosofico.com.br/sitemap.xml`: 404.
- `https://procederfilosofico.com.br/assets/LQHqVnilFspwfHEy.png`: 404.

Leitura:

- producao esta atrasada em relacao ao ambiente local;
- as novas rotas so devem passar a responder depois do deploy;
- o pos-deploy precisa validar rotas novas e asset critico de branding.

## Links

Resultado local:

- links internos validos;
- Home aponta para artigos e categorias existentes localmente;
- dossie aponta para artigos existentes localmente;
- categorias apontam para artigos existentes localmente.

Observacao:

- `/dossies/` ainda nao esta no menu principal da Home. Isso nao quebra deploy, mas reduz descoberta publica.

## Assets e imagens

Resultado local:

- assets referenciados encontrados;
- logo local `SITE/assets/LQHqVnilFspwfHEy.png` existe;
- `SITE/assets/` tem aproximadamente 345 MB.

Risco:

- upload pode ser grande;
- se a conexao FTP oscilar, o deploy pode ficar parcial. O script ja tenta reconectar por arquivo.

## Arquivos deletados

Deletados no Git:

- `BELZEBU/src/publishers.py`
- `CONTENT/posts/(Lote 1) Citação.png`
- `CONTENT/posts/balzac.jpeg`
- `CONTENT/posts/laplace.jpeg`
- `CONTENT/posts/santo_agostinho.jpeg`
- `SITE/assets/Filósofos/Eça_de_Queirós_c._1882.jpg`
- `SITE/public/images/philosophers/Eça_de_Queirós_c._1882.jpg`
- `SITE/src/data/posts.js`
- `SITE/src/data/study-categories.js`
- `SITE/src/data/study-static-cards.js`

Impacto no site estatico:

- nao ha referencia ativa quebrada em `SITE/` segundo `validate_assets` e `validate_links`;
- referencias encontradas aparecem em documentos, briefings, backups ou scripts antigos.

Risco:

- nao apagar nem commitar deletados sem revisao separada;
- `AUTOMATION/publicar_proceder.py` ainda referencia `CONTENT/posts/santo_agostinho.jpeg`, mas esse script nao faz parte do fluxo canonico de deploy atual.

## Menu e navegacao

Status:

- menu principal da Home funciona para rotas atuais;
- paginas de categoria e dossie usam navegacao simples para Inicio, Conteudo, Filosofos e Artigos;
- breadcrumbs funcionam localmente.

Pendencia nao bloqueante:

- incluir `/dossies/` no menu principal somente quando houver decisao editorial.

## Go / No-Go

GO para deploy controlado, desde que:

1. Nao publicar a raiz do projeto; publicar apenas `SITE/` via `AUTOMATION/deploy.py`.
2. Usar a versao corrigida de `deploy.py`.
3. Nao commitar nem resolver deletados durante o deploy.
4. Validar producao imediatamente depois.

## Checklist pos-deploy obrigatorio

Verificar em producao:

- `/`
- `/artigos/`
- `/artigos/sociedade-moderna-destruiu-silencio/`
- `/categoria/filosofia/`
- `/categoria/antropologia/`
- `/dossies/`
- `/dossies/a-questao-da-beleza/`
- `/sitemap.xml`
- `/robots.txt`
- `/assets/LQHqVnilFspwfHEy.png`

Se qualquer rota acima retornar 404 apos deploy, interromper e investigar antes de seguir para novas sprints.
