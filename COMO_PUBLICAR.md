# Como publicar — Proceder Filosófico

## Arquivos ativos

| Arquivo | Função |
|---|---|
| `posts.js` | Array POSTS com 18 artigos |
| `index.html` | Protótipo local (dark navy) |
| `SCRIPTS_AUTOMAÇÃO/publicar_agostinho.py` | Template base para publicação |

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
cp SCRIPTS_AUTOMAÇÃO/publicar_agostinho.py SCRIPTS_AUTOMAÇÃO/publicar_[filosofo].py
```

**Passo 2** — Edite os campos no novo script:
- `slug`, `title`, `tag`, `date`, `excerpt`, `content`
- Coloque a imagem em `Canva - Proceder/Filósofos/`

**Passo 3** — Publique:
```bash
python3 SCRIPTS_AUTOMAÇÃO/publicar_[filosofo].py
```

O script verifica duplicatas automaticamente.

## Tags disponíveis

`FILOSOFIA CLÁSSICA` | `FILOSOFIA MEDIEVAL` | `FILOSOFIA MODERNA` | `EXISTENCIALISMO` | `FILOSOFIA ORIENTAL` | `FILOSOFIA CRÍTICA` | `METAFÍSICA`
