# Proceder Filosófico

Portal de filosofia, leitura e formação intelectual. O projeto reúne site local, base de artigos, biblioteca, assets de marca, PDFs e scripts de automação para publicação no WordPress.

URL: `procederfilosofico.com.br`

## Estrutura

| Pasta/arquivo | Função |
|---|---|
| `SITE/index.html` | Snapshot/protótipo local da homepage. |
| `SITE/posts.js` | Banco local de artigos do Proceder. Atualmente contém 25 artigos. |
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

- WordPress no site público
- Snapshot local em HTML/CSS/JS
- Base de artigos em JavaScript (`SITE/posts.js`)
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
3. Use campos consistentes:

```js
{
  id: "slug-do-artigo",
  tag: "FILOSOFIA CLÁSSICA",
  title: "Título da matéria",
  excerpt: "Resumo curto para o card.",
  date: "30 de Maio de 2026",
  thumb: "../CONTENT/posts/nome-da-imagem.png",
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

## Como publicar no WordPress

Consulte `DOCS/COMO_PUBLICAR.md`.

Fluxo geral:

```bash
export WP_USER="procederfilosofico@gmail.com"
export WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
python3 AUTOMATION/publicar_[nome].py
```

## Cuidados

- Revogue App Passwords antigas caso tenham sido expostas.
- Não publique sem conferir duplicatas no WordPress.
- Prefira adicionar conteúdo primeiro em `SITE/posts.js` e depois publicar.
- Rode `git status` antes e depois de cada mudança.
- Não use arquivos de `BACKUP/` como fonte principal.

## Documentação relacionada

- `DOCS/COMO_PUBLICAR.md`
- `.env.example`
- `AUTOMATION/wp_auth.py`
