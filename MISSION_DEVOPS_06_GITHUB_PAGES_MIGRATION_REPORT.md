# MISSÃO DEVOPS 06 — Migração do Proceder para GitHub Pages

**Autor:** Claude — Diretor de DevOps
**Data:** 2026-06-28
**Branch de trabalho:** `sprint-01b-estabilizacao` (nada commitado ainda — ver "Status" no final)

---

## 1. O site publicado é 100% estático?

**Sim**, com uma ressalva de baixo risco já neutralizada no novo workflow.

Verificações feitas (somente leitura):
- Nenhum arquivo `.php` ou `.htaccess`/`web.config` em `SITE/` ou no resto do repositório.
- `grep` por `fetch(`, `XMLHttpRequest`, `wp-json`, `/api/`, `wp-admin`, `admin-ajax` em todo `SITE/*.html` e `SITE/**/*.js` só retornou:
  - `SITE/assets/jquery.min.js` — biblioteca jQuery genérica; o `XMLHttpRequest` é interno ao `$.ajax`, não é uma chamada de backend nossa.
  - `SITE/assets/subscription-view.js` — widget de newsletter do plugin "Hostinger Reach" (WordPress). Faz `fetch()` para `hostinger_reach_subscription_block_data.endpoint` com header `X-WP-Nonce` — **isso é uma dependência real de backend WordPress**, mas:
- Apenas **2 arquivos HTML em todo o repositório** referenciam esse script ou o seu markup (`hostinger-reach-block-subscription-form`), e ambos vivem em `SITE/docs/backups/` — snapshots arquivados (`proceder-fase1-20260601-110542` e `home-prototype-archived-20260625-reconciliacao`), não páginas ativas do site, não linkadas pela navegação.
- `SITE/docs/` já é excluído do deploy hoje (`AUTOMATION/deploy.py`, `EXCLUDE_DIRS` contém `"docs"`) — essas páginas nunca foram publicadas no Hostinger via FTP.
- Nenhuma página real do site (Home, `/filosofos/`, `/artigos/`, hubs, dossiês, categorias) faz qualquer chamada de rede dinâmica.

**Conclusão:** o site ativo é 100% estático. O único resquício de dependência dinâmica está isolado em backups arquivados que já não eram publicados. Para não criar uma exposição nova que não existia no Hostinger, o novo workflow de Pages exclui `docs/` explicitamente (ver seção 3).

## 2. `SITE/` é a pasta publicável?

**Sim, confirmado** — é a mesma premissa que `AUTOMATION/deploy.py` já usa hoje (`SITE = ROOT / "SITE"`, raiz pública do domínio = conteúdo de `SITE/`, nunca a raiz do projeto). O novo workflow de Pages publica exatamente essa mesma pasta, só excluindo `docs/`, `wp-content/` e `wp-includes/` (os dois últimos nem chegam a existir no checkout do CI, pois não estão versionados pelo Git).

## 3. Workflow criado

**Arquivo novo:** [`.github/workflows/proceder-pages-deploy.yml`](.github/workflows/proceder-pages-deploy.yml)

O que ele faz, no mesmo padrão de qualidade do workflow de FTP (nada foi relaxado):
1. Checkout, Node 20, Python 3.11 — idêntico ao workflow original.
2. **Static checks** — idêntico (`node --check` nos dois scripts + `py_compile` do `deploy.py`, que continua existindo no repositório).
3. **Geração de SEO** — `node AUTOMATION/generate_seo.mjs`, idêntico.
4. **As 6 validações** — `validate_editorial_metadata`, `validate_editorial_architecture`, `validate_links`, `validate_deploy_manifest`, `validate_assets`, `validate_sitemap_robots` — todas, na mesma ordem.
5. **Bloqueio de drift** — idêntico ao original (falha se a geração de SEO mudou algo que não estava commitado).
6. **Stage publishable content** (novo) — copia `SITE/` para `PAGES_BUILD/` via `rsync`, excluindo `docs/`, `wp-content/`, `wp-includes/`, espelhando o que `deploy.py` já faz para o FTP.
7. `actions/configure-pages@v5` → `actions/upload-pages-artifact@v3` (path: `PAGES_BUILD`) → `actions/deploy-pages@v4`, no padrão oficial de duas jobs (`build` e `deploy`) recomendado pelo GitHub.

Dispara em `push` para `main`/`production` e por `workflow_dispatch`, mesmo padrão do workflow original.

## 4. Arquivo `CNAME`

**Arquivo novo:** [`SITE/CNAME`](SITE/CNAME) — conteúdo exatamente `procederfilosofico.com.br`.

Como `deploy.py` filtra por `git ls-files SITE` quando `DEPLOY_TRACKED_ONLY=1`, depois de commitado o `CNAME` passará a existir também no fallback de FTP — inofensivo lá (o Hostinger simplesmente ignora esse arquivo); ele só tem efeito especial no GitHub Pages.

## 5. Registros de DNS necessários no Hostinger

Para o domínio apex `procederfilosofico.com.br` apontar para o GitHub Pages, sem perder o `www`:

| Tipo | Nome/Host | Valor | Observação |
|---|---|---|---|
| A | `@` (raiz) | `185.199.108.153` | Os 4 IPs do GitHub Pages — cadastrar **todos os 4** como registros A separados |
| A | `@` (raiz) | `185.199.109.153` | |
| A | `@` (raiz) | `185.199.110.153` | |
| A | `@` (raiz) | `185.199.111.153` | |
| CNAME | `www` | `fabioakira88.github.io` | Sem `https://`, sem barra final |

Remover (não apenas adicionar) qualquer registro A/CNAME antigo que hoje aponte para a infraestrutura do Hostinger para esses mesmos nomes — DNS não faz merge automático entre registros conflitantes do mesmo tipo/nome, e ter os dois ao mesmo tempo causa comportamento imprevisível (depende de qual resolver responde primeiro).

## 6. Como testar antes de trocar o DNS

Nenhuma troca de DNS é necessária para validar que a publicação funciona:

1. **Habilitar o GitHub Pages no repositório** (Settings → Pages → Source: "GitHub Actions") — isso por si só já gera uma URL pública temporária em `https://fabioakira88.github.io/proceder-filosofico/` (sem custom domain ainda, sem precisar tocar no `CNAME` nem no DNS).
2. Rodar o novo workflow (`workflow_dispatch` ou um push) e abrir essa URL — navegar pelas páginas principais (Home, `/filosofos/`, `/artigos/`, um hub, um dossiê) e comparar visualmente com `procederfilosofico.com.br` ao vivo.
3. Só depois de confirmar visualmente que está tudo certo nessa URL temporária é que faz sentido configurar o domínio customizado no painel do GitHub (Settings → Pages → Custom domain) e then ajustar o DNS no Hostinger.
4. Alternativa sem esperar propagação de DNS: testar localmente sobrepondo a resolução do domínio via `/etc/hosts` apontando `procederfilosofico.com.br` para um dos 4 IPs do GitHub Pages, validar no navegador, depois desfazer — isso evita qualquer mudança real até a decisão final estar tomada.

## 7. Rollback

Dois níveis, do mais simples ao mais radical, ambos reversíveis em minutos:

1. **Sem tocar em DNS**: desabilitar o GitHub Pages em Settings → Pages → Source: "None" — a URL `fabioakira88.github.io/...` para de responder, o domínio `procederfilosofico.com.br` continua resolvendo para o Hostinger (que nunca foi desligado), nada muda para quem visita o site.
2. **Se o DNS já tiver sido trocado**: reverter os registros A/CNAME no Hostinger para os valores originais (IP do Hostinger nos registros A da raiz, CNAME de `www` apontando como estava antes da migração — **anotar esses valores originais antes de qualquer alteração**, eles não estão documentados em nenhum arquivo deste repositório). Propagação de DNS costuma levar de minutos a algumas horas; o site não cai durante isso, apenas alguns visitantes podem ver a versão antiga (Hostinger) e outros a nova (Pages) até o cache de DNS expirar globalmente.

Em nenhum dos dois cenários o FTP/Hostinger é desligado — ele continua existindo como destino de rollback até uma decisão definitiva de descontinuá-lo.

## 8. FTP desativado como deploy automático (sem apagar `deploy.py`)

`.github/workflows/proceder-deploy.yml` — editado, não apagado:
- Trigger automático (`push` para `main`/`production`) **removido**; o workflow só dispara por `workflow_dispatch` (manual) agora.
- Renomeado para `Proceder Filosofico Deploy (FTP - Fallback Manual)`.
- Comentário no topo do arquivo documenta o motivo (bloqueio de rede confirmado na MISSÃO DEVOPS 04) e aponta para o novo workflow.
- O passo "Deploy to Hostinger via FTP" e `AUTOMATION/deploy.py` continuam intactos, disponíveis para um deploy manual via FTP se algum dia for necessário.

## 9. Nenhuma ação de publicação foi tomada

Confirmando explicitamente:
- **GitHub Pages não foi habilitado** no repositório (`gh api repos/fabioakira88/proceder-filosofico/pages` → `404 Not Found`, confirmando que a feature está desligada).
- **Nenhum registro de DNS foi alterado** no Hostinger — essa mudança não pode ser feita por mim, exige acesso ao painel do Hostinger, que é seu.
- **Nada foi commitado nem enviado ao GitHub ainda** — os três arquivos abaixo existem apenas no working tree local, aguardando sua autorização para commit/push:
  - `.github/workflows/proceder-pages-deploy.yml` (novo)
  - `.github/workflows/proceder-deploy.yml` (editado)
  - `SITE/CNAME` (novo)

Nenhuma alteração de UX, UI, CSS, conteúdo, taxonomia ou arquitetura editorial foi feita — confirmado por `git status`, que mostra essas três entradas isoladas das demais mudanças não relacionadas já presentes no working tree (governança em `BRANDING/`, `BELZEBU/`, ativos de imagem, etc., todas fora do escopo desta missão e deliberadamente não tocadas).

## 10. Riscos

| Risco | Severidade | Nota |
|---|---|---|
| `SITE/docs/backups/` contém 2 páginas com referência a um endpoint WordPress inexistente fora do Hostinger | Baixo | Já excluído explicitamente do novo workflow (`rsync --exclude=docs`); nunca foi publicado via FTP de qualquer forma |
| Período de transição de DNS pode mostrar versões diferentes do site a visitantes distintos | Baixo, temporário | Inerente a qualquer troca de DNS; mitigado testando na URL temporária do Pages antes de tocar no DNS |
| HTTPS do domínio customizado no GitHub Pages pode levar alguns minutos para emitir certificado após a primeira configuração do `CNAME` no painel do GitHub | Baixo | Esperado, documentado pelo próprio GitHub; não bloqueia o teste na URL temporária |
| Histórico do repositório (~300MB) já tornava pushes lentos (risco preexistente, não criado por esta missão) | Médio | Mesmo risco já registrado nas Release Notes da Sprint UX/UI 03 |
| Workflow de FTP, agora manual, pode ser esquecido e nunca mais executado mesmo como fallback intencional | Baixo | Mitigado por este relatório e pelo comentário deixado no próprio arquivo do workflow |

## 11. Veredito

**GO — para criar e testar a infraestrutura de Pages na URL temporária do GitHub.**
**NO-GO — para trocar o DNS do domínio em produção agora.**

Faltam três decisões que só você pode tomar, em ordem:
1. Autorizar o commit/push dos três arquivos desta missão.
2. Habilitar "GitHub Actions" como Source em Settings → Pages do repositório, e validar visualmente na URL temporária (`fabioakira88.github.io/proceder-filosofico/`).
3. Só depois da validação visual: configurar o custom domain no painel do GitHub e trocar os registros DNS no Hostinger.

Nenhuma dessas três ações foi executada nesta missão.
