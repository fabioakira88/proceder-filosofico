# FRONTEND REPOSITORY AUDIT REPORT — Proceder Filosófico

**Data:** 2026-07-07
**Tipo:** Auditoria somente-leitura. Nenhum arquivo foi alterado, commitado ou publicado nesta missão.
**Escopo:** Repositório completo, com foco na pasta publicável `SITE/`.

---

## 1. Veredito Geral

O site está **estruturalmente saudável e no ar sem erros** (SEO básico, landmarks HTML, contraste de cor e pipeline de validação automatizada estão bem resolvidos). O problema real não é o que está publicado — é o que está **junto** do que está publicado: cerca de **300 MB de imagens duplicadas/brutas** e uma camada inteira de código (`src/`) órfã convivem dentro da mesma pasta que o GitHub Actions publica. Nenhum desses achados quebra o site hoje; todos aumentam custo de deploy, risco de confusão futura e peso de repositório.

Não há **risco crítico de segurança ou de disponibilidade**. Os riscos críticos encontrados são de **higiene/performance/arquitetura**, não de funcionamento.

---

## 2. Estado do Git

```
Branch atual: main
Remote: https://github.com/fabioakira88/proceder-filosofico.git
Working tree: limpo (nothing to commit)
```

- `.git` deste diretório é um **ponteiro de worktree** (`gitdir: .../PROCEDER_FILOSOFICO:/.git/worktrees/PROCEDER_FILOSOFICO_MAIN_CLEAN`), não um repositório independente. Existe uma segunda cópia de trabalho local em `PROCEDER_FILOSOFICO:/` (repo "pai"), que em auditorias anteriores desta sessão estava em branch `sprint-01b-estabilizacao` com dezenas de arquivos modificados não commitados. **Risco de confusão:** editar a pasta errada não reflete no site publicado.
- `.gitignore` está correto e já tenta excluir `SITE/public/**/*` e `SITE/docs/backups/` — mas isso **não retroage** sobre arquivos já rastreados (ver seção 5).
- Nenhum `.DS_Store` rastreado.
- Arquivos com nome suspeito rastreados no git: `SITE/assets/css(1)` e `SITE/public/images/misc/css(1)` — texto CSS real (22 KB) salvo com nome de artefato de download duplicado ("Save As" que gerou "(1)"), não um nome semântico.
- `BACKUP_POLICY.md` é apenas documentação de política (falso positivo ao buscar por "backup") — conteúdo legítimo, não é um backup de dados.
- 22 arquivos `MISSION_*.md` na raiz do repositório (documentação histórica de missões) — convenção intencional do projeto, não é duplicação, mas é volume alto de arquivos na raiz.

---

## 3. Estado do Deploy

Workflow ativo: `.github/workflows/proceder-pages-deploy.yml` (GitHub Pages, dispara em push para `main`/`production`).

```yaml
rsync -a --exclude='docs' --exclude='wp-content' --exclude='wp-includes' SITE/ PAGES_BUILD/
```

- Publica **toda a pasta `SITE/`**, exceto `docs/`, `wp-content/`, `wp-includes/`.
- **Risco confirmado:** o rsync **não exclui `SITE/public/`** (185 MB, duplicata integral de `SITE/assets/`, sem nenhuma página do site referenciando esses caminhos) nem `SITE/src/` (código órfão). Ambos são publicados no GitHub Pages a cada deploy sem necessidade.
- Workflow de fallback `proceder-deploy.yml` (FTP) está corretamente desativado como automático (`workflow_dispatch` apenas), com comentário explicando o motivo (Hostinger bloqueia FTP de runners do GitHub Actions). `AUTOMATION/deploy.py` (usado só se esse fallback for disparado manualmente) tem a mesma lacuna: `EXCLUDE_DIRS` não inclui `public/` nem `src/`.
- Pipeline de validação pré-deploy (`validate_editorial_metadata/architecture/links/deploy_manifest/assets/sitemap_robots.mjs`) está presente, é executado no workflow antes do build, e passou em todas as verificações desta sessão — **ponto forte real do projeto**.

---

## 4. Mapa de Pastas (SITE/)

```
SITE/
├── artigos/        62 arquivos (61 artigos + index)      publicado, em uso
├── assets/        314 arquivos (imagens, css-shared, js)  publicado, em uso PARCIAL (ver §5)
├── categoria/       10 arquivos (10 categorias)            publicado, em uso
├── conceitos/       19 arquivos (18 conceitos + index)     publicado, em uso
├── conteudo/         5 arquivos (hubs editoriais)          publicado, em uso
├── data/             8 arquivos (JSON de taxonomia/dossiês) publicado, em uso
├── docs/             4 arquivos (relatórios internos)      NÃO publicado (excluído do rsync)
├── dossies/          2 arquivos                            publicado, em uso
├── enciclopedia/     11 arquivos (10 períodos + index)     publicado, em uso
├── filosofos/         1 arquivo                            publicado, em uso
├── public/          195 arquivos                           publicado, ÓRFÃO (ver §5)
├── sobre/             1 arquivo                            publicado, em uso
└── src/              19 arquivos                           publicado, ÓRFÃO (ver §5)
```

Estrutura ideal (sem mover nada ainda): `public/` deveria existir só localmente (fora do git, como já diz o comentário do `.gitignore`) ou ser removida do rastreamento; `src/` deveria ser removida ou finalmente conectada a alguma página; `assets/Filósofos/` (acervo bruto) deveria sair de dentro de `assets/` publicável e virar um diretório de origem fora de `SITE/`.

---

## 5. Problemas Críticos

### C1 — ~300 MB de peso morto publicado a cada deploy
- `SITE/public/` (185 MB): duplicata pixel-a-pixel de imagens já existentes em `SITE/assets/`. **Zero páginas HTML/JS referenciam qualquer caminho `/public/...`** (busca exaustiva, zero ocorrências). O `.gitignore` já documenta a intenção de que isso não deveria estar no git — mas os arquivos foram commitados antes da regra existir, então ela não tem efeito retroativo.
- `SITE/assets/Filósofos/` (116 MB): acervo bruto e desorganizado — mais de 100 arquivos com nomes como `IMG_7533.JPG` (fotos de iPhone), `Søren Kierkegaard — Wikipédia.jpeg` (nome de print de busca), e arquivos gerados por IA com nome de UUID (`fabioakira_Augustine_Aloysius_Joyce_..._a62a3af7-....png`). É referenciado **apenas** por `src/data/philosophers.js`, que por sua vez não é importado por nenhuma página (ver C2). Ou seja: 116 MB publicados para alimentar um arquivo que ninguém carrega.
- **Impacto real:** tempo de deploy maior, tamanho de artefato do GitHub Pages maior, clonagem do repositório mais lenta, risco de confusão para quem for editar imagens (duas pastas de "filósofos" com nomes quase idênticos — ver C3).

### C2 — Camada inteira `src/` órfã (arquitetura abandonada)
`SITE/src/` foi montada como uma arquitetura de componentes (`components/`, `layouts/`, `sections/`, `services/`, `utils/` — todas vazias, só com `.gitkeep`) mas apenas duas partes têm conteúdo real, e **nenhuma delas é usada**:
- `src/data/*.js` (6 arquivos, 938 linhas: `books-br.js`, `books-usa.js`, `content-areas.js`, `hero-slides.js`, `philosophers.js`, `quote-slides.js`) — confirmado via busca por `import`/`from`/`<script src=`: **zero consumidores** para todos os 6 arquivos.
- `src/styles/*.css` (5 arquivos: `biblioteca.css`, `home.css`, `area-estudo.css`, `mestres.css`, `sabedoria-foco.css`) — **zero páginas** referenciam qualquer um deles.

Isso é dívida técnica de uma migração/refatoração que nunca foi concluída (provavelmente uma tentativa anterior de mover para uma arquitetura de componentes, revertida em favor do pipeline atual `posts.js` → `generate_seo.mjs`). Baixo peso em bytes, mas **alto risco de confusão**: qualquer pessoa que edite `src/data/philosophers.js` esperando refletir mudanças no site vai ser surpreendida.

### C3 — Duas pastas de imagens de filósofos com nomes quase idênticos
`assets/Filósofos/` (maiúscula, acentuada, 116 MB, bruta, órfã) vs. `assets/filosofos/` (minúscula, 2,3 MB, curada, referenciada de fato por `filosofos/index.html`). Em servidores case-sensitive (Linux, como o GitHub Pages), isso não colide tecnicamente, mas é uma armadilha de manutenção: é fácil editar/referenciar a pasta errada por engano. **Este é exatamente o tipo de confusão que já causou 8 imagens ausentes em `philosophers.js`**, encontrado em auditoria anterior desta mesma sessão.

---

## 6. Problemas Médios

### M1 — `!important` concentrado e sintoma de guerra de especificidade
187 ocorrências de `!important` no repositório, sendo **149 só em `assets/css-shared/components.css`**, quase todas dentro de uma única regra `.navbar` comentada como *"Single official header component."* — ou seja, o `!important` foi usado para forçar o header compartilhado a vencer estilos conflitantes vindos de `<style>` inline por página (ver M2). É sintoma, não causa.

### M2 — Bloco `<style>` inline duplicado em 18 páginas de conceito
Todas as 18 páginas em `conceitos/*/index.html` carregam um bloco `<style>` idêntico de ~33 linhas (`.concept-hero`, `.philosophers-grid`, `.diff-table`, `.summary-list`, `.related-links`, `.back-link` etc.) em vez de um CSS compartilhado único. É o mesmo padrão que `conceitos/index.html` já resolve corretamente via `<link rel="stylesheet" href="/assets/css-shared/pages/editorial-index.css">` — só não foi replicado para as páginas de verbete individual.

### M3 — Lógica de busca/filtro duplicada + utilitário não usado
`filosofos/index.html` e `conceitos/index.html` têm cada um sua própria cópia inline da mesma função `normalize()` + filtro de busca. Ao mesmo tempo, `assets/js/filters.js` já implementa essencialmente essa mesma lógica de forma reutilizável — mas **não é referenciado por nenhuma página** (`grep` confirma zero `<script src=".../filters.js">` no projeto). Parece um utilitário criado para substituir as duas cópias inline, mas nunca finalizado.

### M4 — `assets/js/navigation.js` não referenciado
Arquivo com boa prática de acessibilidade (`aria-expanded`, `aria-controls`, `aria-label`) mas **sem nenhuma página incluindo-o**. Ou é código morto, ou a navegação mobile real está implementada de outra forma (não verificado nesta auditoria) e este arquivo é uma versão alternativa abandonada.

### M5 — Componente "card" fragmentado em variantes ad-hoc
Pelo menos 4 nomes de classe diferentes implementam o mesmo padrão conceitual (título + descrição + meta + link): `.card` (usado com significados diferentes em `filosofos/` e `conceitos/`), `.article-card`, `.category-card`, `.concept-card`, `.hero-ed-card`. Nenhum deles compartilha uma base comum (`.pf-card`) com modificadores — cada um foi escrito do zero.

### M6 — `biblioteca.html` ausente do sitemap
Página real, com `<title>`/`meta description`/`canonical` corretos, **linkada em 113 das ~112 páginas do site** (todo header/footer), mas **não aparece em `sitemap.xml`**. Gap concreto e barato de corrigir.

### M7 — `<h1>` duplicado (oculto) em `artigos/index.html`
A página tem `<h1>Artigos</h1>` (visível) e um segundo `<h1 id="readerTitle"></h1>` vazio, parte de um componente de leitura inline ativado via JS ao clicar num card (funcional, não é código morto — populado por `document.getElementById('readerTitle').textContent = post.title` em runtime). Tecnicamente dois `<h1>` co-existem no DOM; o segundo fica vazio até ativação.

### M8 — Imagens de capa muito pesadas em formato legado
46 arquivos em `assets/` (fora de `Filósofos/`) passam de 800 KB; o maior é `article_cards/sao-tomas-fe-razao-explicacao.png` com **5,9 MB** (inspecionado visualmente — é um retrato pintado de boa qualidade e coerente com o tema, o problema é só o formato/compressão). Proporção geral de formato: **111 arquivos JPG/PNG vs. apenas 24 WebP** em `assets/` (excluindo o acervo bruto).

---

## 7. Problemas Leves

- Media query `max-width:640px` (ou equivalente) redeclarada 19 vezes em blocos inline diferentes, em vez de uma escala responsiva compartilhada — consequência direta de M2.
- `<img>` de logo (header/footer, presente em toda página) e os cards de artigo gerados dinamicamente não têm `width`/`height` explícitos — risco pequeno de layout shift (CLS), mitigado pelo fato de logo e cards terem dimensão controlada via CSS, mas ainda assim não é a prática ideal para Core Web Vitals.
- Nomenclatura de arquivo de imagem inconsistente em `assets/` (nomes de hash tipo `zBmXzIGbgLLlbNyh.jpg` misturados com nomes descritivos `frase-seneca.png`) — dificulta localizar/auditar assets por nome.

---

## 8. Duplicações Encontradas (resumo)

| Duplicação | Onde | Peso/Escala |
|---|---|---|
| Imagens inteiras | `SITE/public/` vs `SITE/assets/` | 185 MB |
| Pasta de retratos de filósofos | `assets/Filósofos/` (bruta) vs `assets/filosofos/` (curada) | 116 MB vs 2,3 MB |
| Bloco `<style>` de página de conceito | 18 arquivos em `conceitos/*/index.html` | ~594 linhas de CSS repetidas |
| Função de busca/normalização | `filosofos/index.html`, `conceitos/index.html`, e (não usado) `assets/js/filters.js` | 3 implementações da mesma lógica |
| Nome de classe de "card" | `.card`, `.article-card`, `.category-card`, `.concept-card`, `.hero-ed-card` | 5 variantes sem base comum |

---

## 9. Componentes Candidatos a Reaproveitamento

| Componente | Estado atual | Sugestão de nome de classe reutilizável |
|---|---|---|
| Cartão de conteúdo (artigo/conceito/categoria) | 5 implementações separadas | `.pf-card` + modificadores (`.pf-card--article`, `.pf-card--concept`) |
| Bloco de estilo de página de verbete | Inline em 18 arquivos | `assets/css-shared/pages/concept.css` (extrair de `conceitos/razao/index.html`, já é o padrão usado por `editorial-index.css`) |
| Busca/filtro client-side | 2 cópias inline + 1 utilitário órfão | Ativar `assets/js/filters.js` nas duas páginas, remover os inlines |
| Header/nav mobile | `assets/js/navigation.js` (não usado) | Investigar se substitui a implementação ativa antes de decidir manter ou remover |
| Book affiliate chip | `assets/js/book-affiliate-modal.js` | Já reutilizável e bem escrito — usar como referência de padrão para os demais |

---

## 10. CSS/Tokens Recomendados

O projeto **já tem** um sistema de tokens real em `assets/css-shared/tokens.css` (cor, tipografia, radius, sombra, foco) — não é necessário criar do zero. Pontos de atenção:
- Existem dois conjuntos de nomes de variável coexistindo (`--pf-azul-profundo` canônico + alias legado `--azul-profundo` "usado por estilos inline atuais", conforme o próprio comentário do arquivo). Isso confirma que a inconsistência inline (M2) é conhecida e parcialmente contornada, não corrigida.
- Não há token dedicado para breakpoints (cada página redeclara `@media (max-width: ...)` com valores levemente diferentes: 980, 900, 768, 720, 650, 420).
- `:focus-visible` com `box-shadow: var(--pf-focus-ring)` está implementado corretamente (não é um problema — é boa prática, citado aqui só para registro positivo).

---

## 11. Performance/Assets

- **CSS compartilhado:** 36 KB total (`assets/css-shared/`) — leve, não é gargalo.
- **JS externo:** 20 KB total (`assets/js/`) — leve, não é gargalo.
- **`posts.js`:** 360 KB, mas é consumido só em build-time pelo `generate_seo.mjs` (Node) — **não é enviado ao navegador** (zero `<script src="/posts.js">` encontrado). Não conta como peso de página.
- **`loading="lazy"`:** 55 de 64 `<img>` em `artigos/index.html` já usam lazy loading, com estratégia deliberada (`index < 6 ? 'eager' : 'lazy'` — primeiras imagens acima da dobra carregam eager). Boa prática já implementada.
- **Maiores ofensores de peso (fora do acervo bruto):** `zBmXzIGbgLLlbNyh.jpg` (7,9 MB), `yPCECtiDBKjEdTjP.jpg` (6,0 MB), `wPdrfjjEMXEymTcc.jpg` (5,9 MB), `sao-tomas-fe-razao-explicacao.png` (5,9 MB) — todos candidatos diretos a WebP/compressão.
- **Assets não usados identificados (sem apagar):** `SITE/public/*` (185 MB), `SITE/src/*` (938 linhas JS + 5 CSS), `assets/Filósofos/*` (116 MB, exceto pelo consumo órfão via `philosophers.js`).

---

## 12. Acessibilidade

**Pontos fortes confirmados:**
- Contraste de cor calculado (WCAG): texto principal `#F7F3EA` sobre fundo `#060D1E` = **17,5:1** (AAA); texto "muted" (52% opacidade) ≈ **6,6:1** (ainda acima do mínimo AA de 4,5:1); label dourado `#C9A84C` ≈ **8,5:1**. Sistema de cor é solidamente acessível.
- `outline: none` só aparece dentro de `:focus-visible`, sempre substituído por `box-shadow` de foco customizado e visível — implementação correta, não é regressão.
- Menu mobile (`navigation.js`, quando/se usado) implementa `aria-expanded`, `aria-controls`, `aria-label` corretamente.
- Cobertura de `alt` em `<img>` nas páginas amostradas: **100%** (index, artigos, filosofos, conceitos, enciclopedia, sobre, dossies).
- Nenhum link genérico ("clique aqui", "saiba mais") encontrado na amostra checada.

**Pontos de atenção:**
- Nenhum modal/diálogo real foi encontrado no JS auditado (o "book-affiliate-modal.js" na verdade só abre link externo em nova aba — não há foco a prender nem Escape a tratar; nome do arquivo é enganoso, mas o comportamento é seguro).
- `<h1 id="readerTitle">` vazio duplicado (ver M7) é uma fragilidade semântica menor para leitores de tela quando o "reader" está fechado.

---

## 13. SEO Técnico

- Todas as 7 páginas principais amostradas (`index`, `artigos`, `filosofos`, `conceitos`, `enciclopedia`, `sobre`, `dossies`) têm `<title>`, `meta description`, `canonical` e Open Graph completos.
- `sitemap.xml`: 104 URLs, formato válido (`validate_sitemap_robots.mjs` passa).
- `robots.txt`: `Allow: /` + referência correta ao sitemap.
- **Gap confirmado:** `biblioteca.html` fora do sitemap apesar de linkada globalmente (ver M6).
- Slugs em `posts.js`/`conceitos/` seguem padrão limpo (`kebab-case`, sem acentos/espaços) de forma consistente.
- Não foi encontrada página órfã (sem link de entrada) entre as amostradas; a diferença entre 112 páginas físicas e 104 URLs no sitemap não foi totalmente reconciliada nesta auditoria — recomenda-se checagem item a item na próxima missão.

---

## 14. Auditoria Visual/Editorial

- Capas inspecionadas (amostra): `article_cards/sao-tomas-fe-razao-explicacao.png` — retrato pintado coerente com o tema (fé e razão, monge escrevendo), sem texto embutido, sem logo, sem figura pública reconhecível. **Bom exemplo editorial**, só pesado demais (5,9 MB).
- `assets/frase-seneca.png` (e a família `frase-*.png`) **contêm texto embutido, citação completa e um logo/medalhão "P"** — mas confirmei que são consumidos por `src/data/quote-slides.js`, que por sua vez está **órfão** (zero consumidores reais, ver C2). Ou seja: não estão violando a regra de "sem texto embutido" na prática, porque não estão sendo exibidos em lugar nenhum do site publicado hoje. Se `quote-slides` for reativado no futuro, essas imagens precisarão ser revistas sob a mesma regra aplicada aos artigos.
- Não foi identificada, na amostra verificada, nenhuma capa com pessoa pública viva/política real, logo de terceiros ou material com aparência de cópia de franquia.
- Acervo bruto `assets/Filósofos/` contém retratos de figuras históricas (domínio público, ok) misturados com gerações de IA nomeadas com UUID e capturas de tela de sites de terceiros (nome de arquivo cita a fonte, ex. "Mundo Educação") — como não é publicado como conteúdo do site (é órfão), não há risco editorial ativo, mas os nomes de arquivo sugerem proveniência não documentada, o que merece checagem de licenciamento **se qualquer uma dessas imagens vier a ser usada** futuramente.

---

## 15. Plano de Correção por Fases (sugestão, não executado)

**Fase 1 — Higiene de baixo risco (reversível, sem tocar em conteúdo publicado):**
1. Remover do rastreamento git (`git rm --cached`, mantendo local se desejado) `SITE/public/*`.
2. Renomear `SITE/assets/css(1)` para um nome semântico.
3. Adicionar `biblioteca.html` ao gerador de sitemap.

**Fase 2 — Consolidação de CSS:**
4. Extrair o bloco `<style>` duplicado das 18 páginas de conceito para `assets/css-shared/pages/concept.css`, seguindo o padrão já usado por `editorial-index.css`.
5. Reavaliar a necessidade dos 149 `!important` em `components.css` após a Fase 2 remover a causa raiz (conflito com inline).

**Fase 3 — Decisão sobre código órfão (requer decisão do responsável do produto, não só técnica):**
6. Decidir sobre `SITE/src/*` (938 linhas + 5 CSS): reativar, documentar como debt intencional, ou remover.
7. Decidir sobre `assets/Filósofos/` (116 MB): mover para fora da pasta publicável (repositório separado de acervo bruto) ou curar e reduzir.
8. Decidir sobre `assets/js/filters.js` e `navigation.js`: ativar (removendo as cópias inline duplicadas) ou remover como código morto.

**Fase 4 — Performance de imagem:**
9. Converter os 46 arquivos >800 KB para WebP/JPEG otimizado, começando pelos 4 maiores.

---

## 16. Arquivos que Podem Ser Alterados na Próxima Missão

- `SITE/conceitos/*/index.html` (para extrair CSS inline — Fase 2)
- `SITE/assets/css-shared/pages/concept.css` (novo arquivo, Fase 2)
- `SITE/assets/css-shared/components.css` (redução de `!important`, Fase 2)
- `AUTOMATION/generate_seo.mjs` (para incluir `biblioteca.html` no sitemap)
- `.gitignore` / índice do git (para desfazer rastreamento de `SITE/public/`)
- `SITE/assets/css(1)` (rename)

## 17. Arquivos que NÃO Devem Ser Tocados

- Qualquer arquivo dentro de `JAPAO_RELATIVO*/` (fora de escopo desta auditoria).
- `SITE/posts.js`, páginas de artigo/conceito já publicadas (conteúdo editorial — fora do escopo desta missão, que é estrutural/técnica).
- `SITE/data/*.json` (taxonomia, dossiês, hubs — validados e em uso).
- `assets/Filósofos/` e `SITE/src/*` **até decisão explícita do responsável** (Fase 3 é decisão de produto, não só técnica — não remover unilateralmente).
- Workflows em `.github/workflows/` (qualquer mudança de deploy deve ser missão própria, com plano de rollback).

## 18. Critérios de Sucesso para a Próxima Etapa

- `git ls-files` deixa de listar qualquer caminho sob `SITE/public/`.
- Nenhuma página duplica o bloco `<style>` de conceito — todas usam `<link>` para um CSS compartilhado.
- Contagem de `!important` em `components.css` cai de 149 para um número justificável (idealmente próximo de zero).
- `sitemap.xml` inclui `biblioteca.html`.
- `validate_*.mjs` (os 6 validadores oficiais) continuam passando após qualquer mudança.
- Nenhuma capa, artigo ou conceito publicado muda de conteúdo/URL como efeito colateral da limpeza.
