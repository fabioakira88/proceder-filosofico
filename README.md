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
| `SITE/data/hubs.json` | Registro curatorial dos HUBs, com referências aos slugs oficiais de `SITE/posts.js`. |
| `AUTOMATION/templates/hub.html` | Template usado para gerar páginas HUB sob `/conteudo/<slug>/`. |
| `AUTOMATION/generate_seo.mjs` | Gera páginas estáticas por slug, `SITE/sitemap.xml` e `SITE/robots.txt` a partir da fonte editorial única. |
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
node --check VALIDATION/validate_sitemap_robots.mjs
node VALIDATION/validate_editorial_metadata.mjs
node AUTOMATION/generate_seo.mjs
node VALIDATION/validate_links.mjs
node VALIDATION/validate_assets.mjs
node VALIDATION/validate_sitemap_robots.mjs
```

Esses scripts validam links internos, presença de assets referenciados, metadados mínimos dos 43 artigos e consistência básica de `sitemap.xml`/`robots.txt`.

## Como gerar SEO técnico

As páginas SEO por slug, os HUBs, o sitemap e o robots são derivados de `SITE/posts.js` e `SITE/data/hubs.json`; não devem ser mantidos manualmente.

```bash
node AUTOMATION/generate_seo.mjs
```

O fluxo oficial de deploy FTP executa esse gerador automaticamente antes de publicar:

```bash
python3 AUTOMATION/deploy.py
```

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
