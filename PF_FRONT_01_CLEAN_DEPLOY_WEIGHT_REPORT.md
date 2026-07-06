# PF-FRONT-01 — Saneamento de Peso Morto e Arquitetura Órfã

**Data:** 2026-07-07
**Branch:** `pf-front-01-clean-deploy-weight` (criada a partir de `main` em `b30dff1`)
**Commit/push:** não realizados nesta missão — aguardando autorização explícita (ver §7).

---

## 1. Branch Usada

```
git checkout -b pf-front-01-clean-deploy-weight
```

Base: `main` @ `b30dff1` (idêntico a `origin/main` no início da missão). `git status` inicial confirmado limpo, exceto `FRONTEND_REPOSITORY_AUDIT_REPORT.md` (untracked, herdado da missão de auditoria anterior).

---

## 2. Varredura de Referências (antes de remover)

Busca por referências reais em `.html`, `.css`, `.js`, `.mjs`, `.json`, `.xml`, `.yml`, `.py` (excluindo a própria pasta-alvo e o relatório de auditoria):

| Alvo | Referências encontradas | Decisão |
|---|---|---|
| `SITE/public/` | Zero em código vivo. Mencionado apenas em `.md` de auditorias anteriores (`ASSET_REGISTRY.md` já rotulava os mesmos arquivos como `ORPHAN`; `ECOSYSTEM_FINAL_AUDIT.md` já documentava a duplicação como "pendência controlada"). | **Remover do rastreamento** |
| `SITE/src/` | Zero em código vivo, zero em `.github/workflows/*.yml`, zero em `AUTOMATION/deploy.py`. | **Remover do rastreamento** |
| `SITE/assets/Filósofos/` | Referenciado **apenas** por `SITE/src/data/philosophers.js` — que por sua vez não é importado por nenhuma página (verificado por busca de `import`/`from`/`<script src=`). | **Remover do rastreamento** |
| `SITE/assets/filosofos/` (minúscula) | Referenciado ativamente por `filosofos/index.html`. | **Preservada, não tocada** |
| `data/home-editorial.json` continha a string "Filósofos" | Confirmado ser apenas o título de exibição de uma seção (`"title": "Filósofos"`), não um caminho de arquivo. Falso positivo, descartado. | N/A |

Também confirmado: nenhum workflow (`.github/workflows/*.yml`) ou script de deploy (`AUTOMATION/deploy.py`) trata `public/`, `src/` ou `Filósofos/` de forma especial além do rsync/exclude genérico já existente.

---

## 3. Execução

### Removido do rastreamento git (`git rm -r --cached`, arquivos preservados localmente em disco)
- `SITE/public/` — 185 MB, 147 arquivos
- `SITE/src/` — 76 KB, 19 arquivos (`components/`, `layouts/`, `sections/`, `services/`, `utils/` só continham `.gitkeep`; conteúdo real só em `data/*.js` e `styles/*.css`, ambos confirmados órfãos)
- `SITE/assets/Filósofos/` — 116 MB, 133 arquivos

**Nenhum arquivo foi apagado do disco.** Todos continuam presentes localmente (verificado após a operação: `SITE/public/images/hero/` ainda tem 5 arquivos, `SITE/assets/Filósofos/` ainda tem 133, `SITE/src/data/` ainda tem 6) — apenas deixaram de ser rastreados/publicados, mesmo tratamento já dado a `SITE/docs/backups/`.

### `.gitignore` atualizado
Adicionadas duas regras específicas e estreitas (mesmo padrão já usado para `SITE/public/`), sem regra ampla:
```gitignore
# src/ was scaffolding for a component architecture never wired into any
# page (zero consumers confirmed in PF-FRONT-01 audit) — kept locally only
SITE/src/**/*
!SITE/src/**/.gitkeep

# raw/unsorted philosopher portrait dump, referenced only by the orphaned
# src/data/philosophers.js removed above — kept locally only
SITE/assets/Filósofos/
```

### Sitemap corrigido
- Confirmado: `SITE/biblioteca.html` existe, tem `<title>`/`meta description`/`canonical` próprios, e é linkada no header/footer de praticamente todas as páginas do site.
- `AUTOMATION/generate_seo.mjs`: adicionada uma entrada em `staticUrls` para `${SITE_URL}/biblioteca.html` (mesmo padrão das demais URLs estáticas da lista).
- `node AUTOMATION/generate_seo.mjs` executado: **o único arquivo alterado como resultado foi `SITE/sitemap.xml`** (nenhuma página de artigo, categoria ou a Home mudou de conteúdo).
- **Achado adicional, fora de escopo desta missão, registrado para a PF-FRONT-03:** a mesma lista `staticUrls` também não inclui as 8 páginas de conceito criadas na missão PF-03A (`ontologia`, `existencialismo`, `estoicismo`, `dialetica`, `ceticismo`, `hermeneutica`, `estetica`, `logica`). Não corrigido agora para não misturar escopo — apenas documentado.

---

## 4. Peso Antes / Depois

Medido via `git ls-tree -r -l` (soma exata de bytes dos blobs rastreados, comparação justa entre antes e depois):

| Momento | Tamanho rastreado |
|---|---|
| Antes (commit `b30dff1`, `main`) | **496.486.647 bytes (~473,5 MB)** |
| Depois (working tree desta missão) | **181.750.727 bytes (~173,3 MB)** |
| **Redução** | **~314,7 MB (~300 MB), –63,4%** |

Arquivos `>800 KB` ainda rastreados após a limpeza: **49** — todos em uso real (capas de artigo, PDFs de biblioteca etc.), fora do escopo desta missão (ver Fase 4 do relatório de auditoria original).

---

## 5. Validações Executadas

| Comando | Resultado |
|---|---|
| `git status --short` | 347 remoções (D), 3 modificações (.gitignore, generate_seo.mjs, sitemap.xml), 1 untracked (relatório de auditoria anterior) |
| `git diff --check` | exit 0, sem problemas |
| `find SITE -type f -size +800k` | 49 arquivos, todos fora do escopo desta missão |
| `find SITE -type d -maxdepth 3` | Estrutura confirmada sem `public/`, `src/` nem `assets/Filósofos/` |
| Busca final por referências residuais | Zero em código vivo (apenas nos próprios `.gitignore`/relatórios, que citam os caminhos como documentação) |
| `node --check` nos `.js` **rastreados** (14 arquivos: `AUTOMATION/generate_seo.mjs` + todo `SITE/*.js`) | **Todos OK** |
| `node --check` nos `.js` remanescentes em disco (não rastreados, `src/data/*.js`) | 6 "erros" — **falso positivo confirmado**: são módulos ES (`export const ...`) e `node --check` simples assume CommonJS por padrão nesse Node. Testado com `node --input-type=module --check`: sintaticamente válidos. Sem impacto, pois esses arquivos não são mais publicados. |
| 6 validadores oficiais do projeto (`validate_editorial_metadata/architecture/links/deploy_manifest/assets/sitemap_robots.mjs`) | **Todos OK**, incluindo `validate_deploy_manifest.mjs` (confirma que nada rastreado ficou órfão) |

---

## 6. Confirmações Explícitas

- ✅ `SITE/assets/filosofos/` (minúscula, curada) **não foi alterada** — 15 arquivos intactos, zero diff.
- ✅ Header, footer, layout, CSS global, páginas de conceito e componentes visuais **não foram tocados** — `git diff --name-only` confirma zero mudança em `SITE/index.html`, `SITE/assets/css-shared/`, `SITE/conceitos/`, `SITE/filosofos/index.html`.
- ✅ Nenhuma imagem funcional foi removida — apenas as três pastas comprovadamente órfãs.
- ✅ `biblioteca.html` agora presente em `sitemap.xml`.
- ✅ `git status` final: limpo além das mudanças intencionais desta missão.
- ✅ Nenhum commit, push ou deploy realizado.

---

## 7. Riscos Pendentes

- **Segunda cópia local do repositório:** `PROCEDER_FILOSOFICO:/` (repo "pai" do worktree) pode ter seu próprio estado divergente das pastas removidas aqui — esta missão não tocou nele. Se alguém commitar a partir de lá, `public/`/`src/`/`Filósofos/` podem reaparecer.
- **8 páginas de conceito ausentes do sitemap** (achado durante esta missão, não corrigido — ver §3) — recomendado para PF-FRONT-03.
- Esta missão está em **branch separada, não mesclada e não commitada**. Enquanto isso, `main` continua exatamente como estava (`b30dff1`), com os ~300 MB ainda rastreados e publicados a cada deploy — a redução só terá efeito real após commit + merge + push.

---

## 8. Próxima Missão Recomendada

Conforme a ordem definida: **PF-FRONT-02 — Normalização da pasta de imagens de filósofos** (já facilitada por esta missão, já que a pasta órfã `Filósofos/` saiu do caminho — resta só confirmar que `assets/filosofos/` cobre todos os filósofos necessários).

**Decisão pendente do usuário antes de prosseguir:** autorizar `git add` + commit desta branch, e depois decidir entre manter em branch separada, abrir PR, ou mesclar direto em `main` (nenhuma dessas ações foi feita — aguardando instrução explícita, conforme a regra 11/12 da missão).
