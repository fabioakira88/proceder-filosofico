# PF-FRONT-01B — Publicação da Limpeza de Peso Morto

**Data:** 2026-07-07

---

## 1. Branch Publicada

`pf-front-01-clean-deploy-weight` (commit `aa3e498`), enviada ao remoto:
```
git push -u origin pf-front-01-clean-deploy-weight
```

## 2. Pull Request

- **URL:** https://github.com/fabioakira88/proceder-filosofico/pull/38
- **Título:** PF-FRONT-01: remove peso morto publicado e corrige sitemap da biblioteca
- **Descrição:** peso antes/depois, pastas removidas, confirmações de header/footer/CSS intactos, risco pendente das 8 páginas de conceito — tudo incluído no corpo do PR.

## 3. Resultado dos Checks

Este repositório **não tem workflow de CI configurado para rodar em eventos `pull_request`** (o único workflow de deploy dispara só em `push` para `main`/`production` — confirmado em `.github/workflows/proceder-pages-deploy.yml`). `gh pr checks 38` não reportou nenhum check pendente ou configurado. Por isso, a validação real do projeto (os 6 `VALIDATION/*.mjs`) já havia sido rodada localmente antes de abrir o PR (documentado na PF-FRONT-01) e roda novamente, de forma automática, dentro do próprio workflow de deploy após o merge.

## 4. Método de Merge

```
gh pr merge 38 --merge --delete-branch=false
```
Merge commit criado, branch de trabalho preservada (não deletada).

## 5. Hash Final na Main

```
7cad847d15416e40131fb6fec589dfc7c2e17d69
```
`git pull origin main` local confirmou fast-forward de `b30dff1` → `7cad847`, sem conflito.

## 6. Status do Deploy

Workflow `Proceder Filosofico Deploy (GitHub Pages)` disparado automaticamente pelo push do merge. Monitorado via `gh run list` até completar:
```
{"conclusion":"success","headSha":"7cad847...","status":"completed"}
```
**Deploy bem-sucedido.** Nenhum deploy manual paralelo foi executado.

## 7. Páginas Públicas Testadas (HTTP status real, via `curl`)

| URL | Status |
|---|---|
| `/` (home) | 200 |
| `/filosofos/` | 200 |
| `/artigos/` | 200 |
| `/conceitos/` | 200 |
| `/enciclopedia/` | 200 |
| `/sobre/` | 200 |
| `/dossies/` | 200 |
| `/biblioteca.html` | 200 |

## 8. Confirmação: Imagens dos Filósofos Continuam Funcionando

Testado diretamente (`curl -o /dev/null -w "%{http_code}"`) contra a produção:
- `https://procederfilosofico.com.br/assets/filosofos/aristoteles.webp` → **200**
- `https://procederfilosofico.com.br/assets/filosofos/camus.jpg` → **200**

A pasta curada `assets/filosofos/` (usada de fato por `filosofos/index.html`) segue publicada e servindo normalmente.

## 9. Confirmação: Pastas Removidas Não São Mais Publicadas

Testado diretamente contra a produção — as três pastas removidas do rastreamento agora retornam **404** (esperado, e prova de que a redução de peso realmente entrou em produção):
- `/assets/Filósofos/Sócrates.png` → 404
- `/public/images/hero/AJPBTuUJaFhjwjvx.jpg` → 404
- `/src/data/philosophers.js` → 404

## 10. Confirmação: Redução de Peso na Main

`biblioteca.html` confirmado presente no `sitemap.xml` **público** (`curl https://procederfilosofico.com.br/sitemap.xml | grep biblioteca.html` → 1 ocorrência). A redução de ~300 MB (473,5 MB → 173,3 MB de peso rastreado) está agora em `main` e refletida no deploy publicado.

## 11. Header/Footer/Layout

Nenhuma regressão visual detectada nas páginas testadas (header com navegação, footer com links institucionais e newsletter presentes na home, conforme fetch de conteúdo). Nenhum arquivo de header/footer/CSS global foi alterado nesta missão nem na anterior (zero diff já confirmado na PF-FRONT-01).

## 12. Pendências para Próxima Missão

- **PF-FRONT-03** — as 8 páginas de conceito da PF-03A (`ontologia`, `existencialismo`, `estoicismo`, `dialetica`, `ceticismo`, `hermeneutica`, `estetica`, `logica`) continuam ausentes de `staticUrls` em `AUTOMATION/generate_seo.mjs` e, portanto, do `sitemap.xml` — mesma causa raiz do problema da `biblioteca.html`, não corrigida aqui por estar fora do escopo desta missão.
- Segunda cópia local do repositório (`PROCEDER_FILOSOFICO:/`, branch `sprint-01b-estabilizacao`, "ahead 3" de `origin`) continua existindo e não foi tocada — risco de reintrodução das pastas removidas se alguém commitar a partir de lá.
- Guerra de especificidade (149 `!important` em `components.css`) e componentização visual seguem como dívida documentada, deliberadamente não atacadas nesta missão.

---

## Critérios de Sucesso — Checklist Final

- [x] Branch enviada ao remoto
- [x] PR criado e mergeado (#38)
- [x] CI: nenhum check configurado para PR neste repo (confirmado, não é falha) — validação real ocorre no workflow de deploy pós-merge
- [x] GitHub Pages publicado (`completed` / `success`)
- [x] Site público funcionando (8/8 páginas testadas em 200)
- [x] Nenhuma regressão visual detectada
- [x] Redução de peso aplicada na `main` e confirmada em produção
- [x] Relatório `PF_FRONT_01B_PUBLICATION_REPORT.md` criado
