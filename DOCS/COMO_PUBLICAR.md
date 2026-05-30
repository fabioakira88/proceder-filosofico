# Como publicar — Proceder Filosófico

## Arquivos ativos

| Arquivo | Função |
|---|---|
| `SITE/posts.js` | Array POSTS com 25 artigos |
| `SITE/index.html` | Homepage local |
| `SITE/biblioteca.html` | Página de biblioteca |
| `AUTOMATION/publicar_agostinho.py` | Template base para publicação |

## Configurar credenciais

Revogue qualquer App Password antiga exposta no WordPress e crie uma nova em:
`wp-admin` → Usuários → Perfil → Senhas de aplicação.

Antes de publicar, exporte as credenciais no terminal:

```bash
export WP_USER="procederfilosofico@gmail.com"
export WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
```

Nunca salve a senha real em arquivos do projeto. Use `.env.example` apenas como modelo.

## Adicionar novo artigo

**Passo 1** — Copie o script template:
```bash
cp AUTOMATION/publicar_agostinho.py AUTOMATION/publicar_[filosofo].py
```

**Passo 2** — Edite os campos no novo script:
- `slug`, `title`, `tag`, `date`, `excerpt`, `content`
- Coloque a imagem editorial em `CONTENT/posts/` ou uma arte de marca em `BRANDING/assets/`
- Referencie a imagem em `SITE/posts.js` com caminho relativo a partir da pasta `SITE/`, por exemplo: `../CONTENT/posts/nome-da-imagem.jpeg`

**Passo 3** — Publique:
```bash
python3 AUTOMATION/publicar_[filosofo].py
```

O script verifica duplicatas automaticamente.

## Tags disponíveis

`FILOSOFIA CLÁSSICA` | `FILOSOFIA MEDIEVAL` | `FILOSOFIA MODERNA` | `EXISTENCIALISMO` | `FILOSOFIA ORIENTAL` | `FILOSOFIA CRÍTICA` | `METAFÍSICA`
