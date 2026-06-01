# FASE 1 — Relatório de Migração Segura
**Data:** 2026-06-01  
**Projeto:** Proceder Filosófico — SITE/

---

## 1. Backup Criado

**Localização:** `docs/backups/proceder-fase1-20260601-110542/`  
**Conteúdo:** 208 arquivos (index.html, biblioteca.html, posts.js, .env, assets/ completo incluindo Filósofos/)  
**Método:** cópia direta (não destrutiva — originais intactos em assets/)

---

## 2. Estrutura de Pastas Criada

```
SITE/
├── public/
│   ├── images/
│   │   ├── philosophers/   ← imagens dos filósofos
│   │   ├── quotes/         ← frases/citações (frase-*.png)
│   │   ├── posts/          ← thumbnails dos artigos
│   │   ├── hero/           ← imagens de fundo/hero (hash WP)
│   │   ├── portraits/      ← retratos usados nos cards mestres
│   │   └── misc/           ← SVGs de emoji + CSS sem extensão (WP)
│   └── branding/           ← logomarca
├── src/
│   ├── styles/
│   ├── data/
│   ├── components/
│   ├── sections/
│   ├── layouts/
│   ├── utils/
│   └── services/
└── docs/
    └── backups/
```

---

## 3. Arquivos Copiados (por destino)

| Destino | Arquivos |
|---|---|
| `public/images/philosophers/` | 131 |
| `public/images/quotes/` | 16 |
| `public/images/posts/` | 18 |
| `public/images/hero/` | 5 |
| `public/images/portraits/` | 7 |
| `public/images/misc/` | 10 |
| `public/branding/` | 1 |
| `assets/post_cards/` (correção) | 7 |

> Todos os arquivos foram **copiados**, nunca movidos. Os originais em `assets/` permanecem intactos.

---

## 4. Arquivos Mantidos (não tocados)

- `index.html` — página principal (sem alteração)
- `biblioteca.html` — biblioteca de artigos (sem alteração)
- `posts.js` — 25 artigos hardcoded (sem alteração)
- `assets/*.min.js` — jQuery, hooks, front-scripts, wp-emoji (WordPress/Elementor)
- `assets/*.min.css` — frontend, style (WordPress/Elementor)
- `assets/subscription.*` — formulário de inscrição
- `assets/post-5.css`, `assets/post-68.css` — CSS de posts WP
- `assets/base-desktop.css`, `assets/css`, `assets/css(1)`, `assets/css(2)`, `assets/css2`
- `assets/Filósofos/` — pasta original com 131 imagens (intacta)
- `src/` — pastas criadas, sem conteúdo (aguardando FASE 2)

---

## 5. Arquivos Suspeitos

| Arquivo | Observação |
|---|---|
| `assets/css`, `assets/css(1)`, `assets/css(2)`, `assets/css2` | Arquivos CSS sem extensão exportados pelo WordPress. Funcionais, mas com nomes não-convencionais. |
| `assets/(Lote 1) Citação.png` | Arquivo com espaços e caracteres especiais no nome. Não referenciado diretamente no HTML atual. |
| `assets/AJPBTuUJaFhjwjvx.jpg`, `FLaneKfrfyGYOgJd.jpg`, etc. | Imagens com nomes hash do WordPress. Propósito desconhecido sem inspecionar o conteúdo. |
| `assets/Filósofos/IMG_*.JPG` | Fotos pessoais/câmera (12 arquivos). Verificar se são realmente usadas no site. |
| `.env` | Arquivo de credenciais presente em SITE/ — não deve entrar no git. Já está no .gitignore. |

---

## 6. Referências Quebradas Encontradas e Corrigidas

| Referência no HTML | Status | Ação |
|---|---|---|
| `assets/post_cards/` (7 imagens) | **Quebrada → Corrigida** | Criada a pasta e copiados os 7 arquivos de `assets/` para `assets/post_cards/` |
| `assets/fonts/` (fontes @font-face) | **URL externa** (não local) | Aponta para `https://procederfilosofico.com.br/...` — funciona quando WP está no ar. Sem ação necessária nesta fase. |

---

## 7. Referências Verificadas — 39 OK

Todas as referências diretas de `index.html` e `biblioteca.html` para `assets/` foram verificadas e os arquivos existem no disco.

---

## 8. Próximos Passos Seguros (FASE 2)

1. **Copiar `posts.js` para `src/data/posts.js`** — deixar a cópia lá para futura refatoração.
2. **Copiar CSS inline de index.html para `src/styles/`** — sem remover do HTML ainda.
3. **Criar `src/data/posts.schema.json`** — documentar a estrutura do array de posts.
4. **Normalizar nomes de arquivos** em `assets/post_cards/` e `public/images/` (remover espaços, caracteres especiais).
5. **Avaliar fontes** — baixar as TTFs do servidor WP e guardar em `assets/fonts/` para funcionamento offline.
6. **Não modularizar HTML ainda** — aguardar decisão sobre framework (Vite / vanilla / outro).

---

*Relatório gerado após FASE 1 completa. Nenhum arquivo foi apagado. index.html e biblioteca.html funcionando normalmente.*
