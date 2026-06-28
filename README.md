# Proceder Filosófico

Portal de filosofia, leitura e formação intelectual. O projeto reúne site local estático, base de artigos, biblioteca, assets de marca, PDFs e scripts de automação.

URL: `procederfilosofico.com.br`

## Estrutura

| Pasta/arquivo | Função |
|---|---|
| `SITE/index.html` | Home reconciliada a partir da produção viva. |
| `SITE/docs/backups/home-prototype-archived-20260625-reconciliacao/` | Snapshot/protótipo local arquivado; referência histórica, nunca fonte de deploy. |
| `SITE/posts.js` | Fonte editorial única consumida pela Home, página de artigos, Área de Estudos e gerador de SEO. |
| `SITE/assets/site-seo.js` | SEO dinâmico dos artigos: title, description, canonical, Open Graph, Twitter Card e JSON-LD. |
| `SITE/assets/css-shared/` | Camada compartilhada temporária de tokens, base, componentes e helpers de páginas. |
| `SITE/assets/js/` | Utilitários compartilhados de navegação, filtros, lista de artigos e leitura. |
| `SITE/data/editorial-taxonomy.json` | Taxonomia editorial oficial da revista cultural digital. |
| `SITE/data/dossiers.json` | Registro estrutural de dossiês editoriais; nasce vazio até curadoria aprovada. |
| `SITE/data/home-editorial.json` | Base dos trilhos editoriais futuros da Home. |
| `SITE/categoria/` | Páginas estáticas geradas para a taxonomia oficial. |
| `SITE/dossies/` | Página base gerada para dossiês editoriais. |
| `SITE/data/hubs.json` | Registro curatorial dos HUBs, com referências aos slugs oficiais de `SITE/posts.js`. |
| `AUTOMATION/templates/hub.html` | Template usado para gerar páginas HUB sob `/conteudo/<slug>/`. |
| `AUTOMATION/generate_seo.mjs` | Gera páginas estáticas de artigos, categorias, HUBs, Home editorial, `SITE/sitemap.xml` e `SITE/robots.txt` a partir da fonte editorial única. |
| `SITE/biblioteca.html` | Página de biblioteca/livros. |
| `SITE/assets/` | Assets capturados do site/WordPress e usados pelo snapshot local. |
| `CONTENT/posts/` | Imagens editoriais usadas nos artigos. |
| `CONTENT/pdfs/` | PDFs, provas, lead magnets e materiais de estudo. |
| `BRANDING/` | Logos, peças de marca e artes visuais. |
| `AUTOMATION/` | Scripts Python para publicar, injetar seções e corrigir conteúdo no WordPress. |
| `DOCS/` | Documentação operacional, incluindo guia de publicação. |
| `EXPORTS/` | Arquivos finais exportados. |
| `BACKUP/` | Backups e material legado. |

## Stack

- Snapshot local em HTML/CSS/JS
- Base de artigos em JavaScript (`SITE/posts.js`)
- Geração estática de artigos, HUBs, sitemap e robots por Node.js
- Scripts Python com `requests`
- Autenticação WordPress via App Password em variável de ambiente

## Segurança

Credenciais reais não devem ser salvas no repositório.

Use variáveis de ambiente antes de rodar scripts de automação:

```bash
export WP_USER="procederfilosofico@gmail.com"
export WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
```

Existe um modelo em `.env.example`. O arquivo `.env` real deve permanecer local e ignorado pelo Git.

## Instalação para automações

```bash
cd /Users/fabiotsugawa/Downloads/DIGITAL_PROJECTS:/PROCEDER_FILOSOFICO:
python3 -m venv .venv
source .venv/bin/activate
pip install -r AUTOMATION/requirements.txt
```

## Como adicionar artigo no banco local

1. Abra `SITE/posts.js`.
2. Adicione uma nova entrada no topo do array `POSTS`.
3. Use campos consistentes. A Sprint 01B normaliza lacunas em tempo de carga, mas novos artigos devem nascer com metadados explícitos:

```js
{
  id: "slug-do-artigo",
  slug: "slug-do-artigo",
  tag: "FILOSOFIA CLÁSSICA",
  category: "Filosofia clássica",
  subcategory: "geral",
  title: "Título da matéria",
  description: "Descrição editorial e SEO curta.",
  excerpt: "Resumo curto para o card.",
  date: "30 de Maio de 2026",
  dateISO: "2026-05-30",
  updated: null,
  thumb: "../CONTENT/posts/nome-da-imagem.png",
  heroImage: "../CONTENT/posts/nome-da-imagem.png",
  tags: ["filosofia clássica"],
  period: null,
  civilization: null,
  philosophers: [],
  dossier: null,
  books: [],
  themes: [],
  civilizations: [],
  historicalPeriods: [],
  relatedArticles: [],
  editorialPriority: "P2",
  format: "artigo",
  featured: false,
  content: `
    <p>Conteúdo em HTML...</p>
  `
}
```

4. Valide a sintaxe:

```bash
node --check SITE/posts.js
```

## Validações locais obrigatórias

Execute antes de qualquer deploy ou expansão editorial:

```bash
node --check SITE/posts.js
node --check VALIDATION/validate_links.mjs
node --check VALIDATION/validate_assets.mjs
node --check VALIDATION/validate_editorial_metadata.mjs
node --check VALIDATION/validate_editorial_architecture.mjs
node --check VALIDATION/validate_sitemap_robots.mjs
node VALIDATION/validate_editorial_metadata.mjs
node VALIDATION/validate_editorial_architecture.mjs
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
node VALIDATION/validate_deploy_manifest.mjs
```

Esses scripts validam links internos, presença de assets referenciados, metadados mínimos dos 43 artigos, arquitetura editorial oficial, consistência básica de `sitemap.xml`/`robots.txt` e se o deploy tracked-only não apontará para assets não versionados.

## Arquitetura editorial

A taxonomia oficial da Sprint 02 vive em `SITE/data/editorial-taxonomy.json`.

Categorias oficiais:

- Filosofia
- História da Civilização
- Antropologia
- Sociologia
- Literatura
- Arte
- Religião
- Ciência
- Política
- Atualidade Filosófica

Cada categoria está preparada para receber artigos, ensaios, dossiês, bibliografia e autores relacionados. As páginas públicas de categoria são geradas em `/categoria/<slug>/` por `node AUTOMATION/generate_seo.mjs`.

A Home já possui um bloco editorial gerado para Filosofia, História da Civilização, Literatura, Ciência, Religião e Atualidade Filosófica. Dossiês futuros devem ser registrados em `SITE/data/dossiers.json`; a página base `/dossies/` permanece vazia enquanto não houver dossiês oficiais.

### Sistema de dossiês

O modelo canônico de dossiês é definido por `SITE/data/dossiers.schema.json` e instanciado em `SITE/data/dossiers.json`.

Campos obrigatórios de cada dossiê:

- `id`, `slug`, `title`, `subtitle`, `category`, `status`, `isCanonicalModel`.
- `editorialIntroduction`, `intellectualObjective`.
- `mainArticle`, `relatedArticles`, `recommendedArticles`, `continueStudying`.
- `relatedPhilosophers`, `relatedAuthors`, `relatedBooks`, `relatedArtworks`.
- `historicalPeriods`, `civilizations`, `timeline`, `bibliography`, `futureReadings`.

Para cadastrar um novo dossiê, adicione um objeto em `SITE/data/dossiers.json`, use apenas slugs reais de artigos existentes nos campos relacionais e rode:

```bash
node VALIDATION/validate_editorial_architecture.mjs
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

### Curadoria dos artigos

A curadoria oficial do acervo existente fica em `ARTICLE_CURATION`, dentro de `SITE/posts.js`, separada do corpo dos textos publicados. Ela define categoria principal, subcategoria, dossiê, filósofos, livros, civilização, período, temas, artigos relacionados e prioridade editorial.

Campos neutros aceitos:

- `dossier: null`, quando ainda não há dossiê oficial cadastrado.
- `books: []`, quando não há livro seguro relacionado.
- `philosophers: []`, quando o artigo não trata diretamente de um autor.
- `civilization: null` e `period: null`, quando a associação histórica seria especulativa.

## Como gerar SEO técnico

As páginas SEO por slug, os HUBs, o sitemap e o robots são derivados de `SITE/posts.js` e `SITE/data/hubs.json`; não devem ser mantidos manualmente.

```bash
node AUTOMATION/generate_seo.mjs
```

O deploy de produção deve ser feito pelo GitHub Actions após push em `main` ou `production`.
O workflow valida o site, gera SEO, bloqueia drift de arquivos gerados e publica via FTP usando somente arquivos versionados pelo Git.

Secrets necessários no GitHub:

- `PROCEDER_FTP_HOST`
- `PROCEDER_FTP_USER`
- `PROCEDER_FTP_PASS`
- `PROCEDER_FTP_REMOTE_DIR`

Variáveis opcionais:

- `PROCEDER_FTP_TIMEOUT`
- `PROCEDER_FTP_FILE_TIMEOUT`

O deploy manual continua existindo como fallback operacional:

```bash
python3 AUTOMATION/deploy.py
```

Por padrão, o deploy manual também publica somente arquivos versionados pelo Git. Para uma emergência local conscientemente revisada, é possível desativar isso com `DEPLOY_TRACKED_ONLY=0`, mas esse modo não deve ser usado em produção contínua.

## Cuidados

- Nunca crie espelhos de `SITE/posts.js`.
- Não mantenha categorias de estudo manualmente; elas são derivadas das tags dos artigos.
- Não mova assets em massa durante a estabilização P0. O padrão canônico proposto é preservar referências atuais e migrar gradualmente para `SITE/assets/images/` em sprint própria.
- `SITE/assets/css` é um arquivo legado sem extensão, não um diretório. Por isso, a camada compartilhada da Sprint 01C foi criada em `SITE/assets/css-shared/` até uma migração segura desse asset.
- Não remova assets legados sem validação de uso local e produção.
- Rode as validações locais e `node AUTOMATION/generate_seo.mjs` antes de publicar.
- Rode `git status` antes e depois de cada mudança.
- Não use arquivos de `BACKUP/` como fonte principal.

## Documentação relacionada

- `DOCS/COMO_PUBLICAR.md`
- `.env.example`
- `AUTOMATION/wp_auth.py`
