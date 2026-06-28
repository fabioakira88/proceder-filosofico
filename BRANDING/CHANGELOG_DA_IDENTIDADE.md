# CHANGELOG DA IDENTIDADE — PROCEDER FILOSÓFICO

> Histórico de decisões sobre identidade, branding, design, UX e conteúdo. Toda alteração à documentação em `BRANDING/`, ou toda decisão relevante de identidade tomada fora dela, deve ser registrada aqui.

## 2026-06-26 — Consolidação da documentação criativa (Fase 2 da AION Studio)

Auditoria completa de toda a documentação de `BRANDING/` e dos arquivos `.md` da raiz dos dois
projetos (delegada a agentes de leitura, síntese e correção feitas pela Diretoria Criativa).
Achados corrigidos nesta consolidação:
- `BACKLOG_OFICIAL.md` do Japão Relativo estava desatualizado em relação à cópia do Proceder
  (Missão 1 com definição e status antigos, Missão 6 sem os três registros de progresso) —
  sincronizado integralmente; correção registrada também no changelog do Japão Relativo.
- `ECOSYSTEM_FINAL_AUDIT.md` citava uma estrutura de pastas (`AION_STUDIO/00_CONSTITUICAO...`)
  que nunca existiu — corrigido com errata no próprio arquivo, apontando para
  `AION_STUDIO_MANUAL.md` e `02_DEPARTAMENTOS/ENGENHARIA.md` como a estrutura real.
- `DOCS/ARQUITETURA.md` (Japão Relativo) continha credencial WordPress exposta em texto puro,
  apesar de já estar registrada como pendência em `BACKLOG_OFICIAL.md` — credencial redigida no
  documento; revogação real da senha de aplicativo permanece pendência operacional separada.
  Documento também marcado como histórico (descreve estado já superado).
- Redundância de métricas entre `ASSET_REGISTRY.md`/`ASSET_AUDIT_REPORT.md` e contagens de
  "referência quebrada" não reconciliadas entre três documentos do Japão Relativo — anotadas
  como recomendação de Engenharia, sem deletar nenhum artefato de outro departamento.

Criados nesta consolidação, compartilhados em cópia idêntica com o Japão Relativo:
- `02_DEPARTAMENTOS/KPI_E_RITUAIS.md` — cadência operacional da Diretoria Criativa (rituais
  diários/mensais, formato de RFC Criativa, integração nomeada com Engenharia, Arquitetura,
  Inteligência e Operações).
- `ÍNDICE_GERAL_CRIATIVO.md` — lista de todo documento de `BRANDING/` com descrição.
- `DOCUMENTATION_MAP.md` — relação de dependência entre todos os documentos (adaptado por
  projeto, não cópia literal, já que a estrutura de arquivos difere entre os dois).
- `ROADMAP_DA_IDENTIDADE.md` — estado atual → 3 meses → 6 meses → 1 ano → 3 anos → 10 anos,
  com horizonte além de 1 ano declarado como direcional, não compromisso de entrega.

`BRANDING/README.md` atualizado com referência aos documentos de empresa/departamento/backlog
e aos três novos documentos de navegação. Nenhuma identidade visual, layout ou conteúdo
editorial de nenhum produto foi alterado nesta consolidação — apenas processo, correção de
divergência e organização documental.

## 2026-06-26 — Consolidação documental da Engenharia

Criados os documentos operacionais `ENGINEERING_STRUCTURE.md`, `TECHNICAL_DEBT.md`,
`DEPLOY_CHECKLIST.md`, `REPOSITORY_STANDARDS.md` e `BACKUP_POLICY.md`, compartilhados com o
Japão Relativo. A missão consolidou a infraestrutura técnica em nível documental: arquitetura
física dos projetos, dívida técnica, critérios de deploy, padrões de repositório e política de
backup. Nenhuma funcionalidade foi criada, nenhum arquivo ativo foi removido, nenhum deploy foi
realizado e nenhuma decisão de identidade, UX, tipografia, paleta ou conteúdo editorial foi
alterada.

## 2026-06-26 — Departamento formalizado: Engenharia

Criado `02_DEPARTAMENTOS/ENGENHARIA.md`, compartilhado em cópia idêntica com o Japão Relativo,
subordinado a `AION_STUDIO_MANUAL.md`. Documenta o funcionamento do departamento já ocupado por
Codex (missão, responsabilidades, Definition of Done, KPIs, processos, auditorias técnicas,
saneamento, assets, SEO técnico, deploy, GitHub, performance, acessibilidade, segurança,
versionamento, backups e critérios de qualidade). Não cria autoridade nova e não altera
identidade, UX, conteúdo editorial ou funcionalidade de nenhum produto. `AION_STUDIO_MANUAL.md`
ganhou referência cruzada a este documento.

## 2026-06-26 — Departamento formalizado: Diretoria Criativa

Criado `02_DEPARTAMENTOS/DIRETORIA_CRIATIVA.md`, compartilhado em cópia idêntica com o Japão
Relativo, subordinado a `AION_STUDIO_MANUAL.md`. Documenta o funcionamento do departamento já
ocupado por Claude (missão, responsabilidades, escopo, autoridade, limites, processos, entradas,
saídas, integração com Manus/ChatGPT/Codex/Beelzebub/Fábio, KPIs, rituais, auditorias, checklist
semanal, boot sequence, RFCs obrigatórias, critérios de aprovação, indicadores de qualidade) —
não cria autoridade nova, formaliza a que já existia em `GOVERNANCE.md` de cada produto.
Nenhuma identidade de projeto foi alterada (DNA, Brand Book, Manifesto, Design System, UX
System, Content System de nenhum produto) — documento de processo, não de conteúdo.
`AION_STUDIO_MANUAL.md` ganhou referência cruzada a este documento.

## 2026-06-26 — Terceiro nível do ecossistema: AION Studio (Manual Operacional)

Criado `AION_STUDIO_MANUAL.md` (v1.0), compartilhado em cópia idêntica com o Japão Relativo.
Formaliza o terceiro nível do ecossistema, acima dos Produtos (Proceder Filosófico, Japão
Relativo, Akira) e da Equipe (Claude, Codex, Manus, ChatGPT, Beelzebub): a AION Studio como
empresa-sistema, com propósito, missão, visão, valores e organograma próprios. Beelzebub
formalizado como "Chief Operating System" (orquestra agentes, monitora indicadores, mantém
continuidade operacional — nunca substitui decisão humana). **Achado de verificação registrado
no próprio manual:** já existe implementação real em `BELZEBU/` (orquestrador editorial,
"MVP 0.5", modos seguros `dry-run`/`generate-only`/`review-only`/`publish-local-jr`, lê Notion,
mas não altera sites nem executa deploy) — bem mais restrita que a visão completa de COS
descrita; o manual distingue explicitamente visão de estado real para não inflar status.
Colisão de nome identificada e resolvida com o usuário: a pasta `DIGITAL_PROJECTS:/AION_Studio/`
já existente contém um projeto não relacionado ("Rocket Design"); por decisão do usuário, o
manual vive em `BRANDING/` de cada produto (mesmo padrão de `BACKLOG_OFICIAL.md`), não numa
pasta própria, até essa colisão ser resolvida na estrutura de pastas. `GOVERNANCE.md` de ambos
os projetos ganhou referência cruzada a este manual.

## 2026-06-26 — Protocolo de decisão para divergência entre agentes

`GOVERNANCE.md` ganhou a seção "Protocolo de decisão do ecossistema": quando há divergência
entre agentes, a questão passa, em ordem fixa, por Inteligência (Manus) → Arquitetura (ChatGPT)
→ Identidade (Claude) → Engenharia (Codex) → Decisão final (Fábio), cada um respondendo só à
pergunta da própria especialidade. A etapa de Identidade é onde o Diretor Criativo pode bloquear
ou exigir alternativa mesmo que inteligência de mercado ou consistência arquitetural já tenham
apontado outra direção — nenhuma das duas sobrepõe identidade. Pular etapa (ex.: implementação
direta a partir de pesquisa do Manus, sem validação de identidade) não produz decisão oficial,
mesmo que produza código funcionando. Replicado de forma idêntica em
`JAPAO_RELATIVO:/BRANDING/GOVERNANCE.md`.

## 2026-06-26 — Governança passa a ser multiagente

`GOVERNANCE.md` atualizado: o ecossistema deixa de ser operado por um agente isolado e passa a
ter papéis fixos — Fábio (Visionário, decisão final), Claude (Diretor Criativo/Guardião da
Marca, autoridade sobre identidade), Codex (Engenheiro, implementação a partir de briefings e
decisões formais), ChatGPT (Arquiteto do Ecossistema — estratégia, auditoria, integração),
Manus (Analista de Inteligência — pesquisa, SEO, monetização, roadmaps). Claude continua sendo a
única autoridade sobre identidade visual, tipografia, paleta e padrão estrutural, mas passa a
receber e traduzir, com julgamento próprio, a inteligência do Manus e a estratégia/auditoria do
ChatGPT em decisões de identidade, UX e governança. Mudança replicada de forma idêntica (mesma
estrutura de papéis, texto adaptado ao projeto) em `JAPAO_RELATIVO:/BRANDING/GOVERNANCE.md`.

## 2026-06-25 — Classificação formal: "Conteúdo Exclusivo" é vitrine sem função, não conteúdo a preservar

Adendo a `DECISAO_HOME_OFICIAL.md`. A seção "Conteúdo Exclusivo" de `SITE/index.html` (9 cards,
6 sem destino real, já documentada) foi classificada formalmente como **COMPONENTE LEGADO /
VITRINE ESTÁTICA SEM FUNÇÃO**: existe visualmente, não funciona como fluxo real, não tem
destino funcional validado. Decisão: não é obrigatória de preservar e não bloqueia a
reconciliação — pode ser arquivada, removida da Home reconciliada, ou recriada no futuro como
hub real, só com especificação editorial e rotas funcionais (Fase 2). Regra geral fixada: nenhuma
seção do tipo "vitrine de cards" pode ser publicada sem que todo card tenha destino real, rota
existente, conteúdo relacionado, UX funcional e SEO coerente. Extensão registrada: a própria
seção `#conteudo` da Home de **produção** (6 cards temáticos, sem link individual, ver
`PRODUCTION_SNAPSHOT.md`) falha o mesmo teste e está sujeita à mesma classificação — "fonte
oficial" protege conteúdo real (os 8 artigos, a Biblioteca), não obriga a herdar uma vitrine
decorativa só por estar publicada.

## 2026-06-25 — Espelhamento factual da produção

Criado `PRODUCTION_SNAPSHOT.md` e preservado o estado real da produção em
`VALIDATION/PRODUCTION_SNAPSHOT/`, sem deploy e sem reconstrução da Home. Foram capturados a
Home publicada, `biblioteca.html`, respostas atuais de `robots.txt`/`sitemap.xml`, 42 assets
referenciados e 8 posts/cards embutidos na Home de produção. Os 8 posts foram extraídos para
`CONTENT/production/production-home-posts-2026-06-25.json`; 7 deles não existiam em
`SITE/posts.js`. Todos os candidatos de permalink testados (`/<slug>/` e `/artigos/<slug>/`)
retornaram 404, confirmando que os conteúdos hoje vivem como overlay/HTML embutido na Home.
Deploy continua bloqueado até reconciliação e definição de rotas estáveis.

## 2026-06-25 — Home reconciliada no repositório

Criada Home reconciliada em `SITE/index.html`, usando produção como fonte factual e respeitando
`DECISAO_HOME_OFICIAL.md`. O antigo `SITE/index.html` foi arquivado em
`SITE/docs/backups/home-prototype-archived-20260625-reconciliacao/`. Os 8 posts/cards visíveis
em produção ganharam páginas estáticas em `/artigos/<slug>/` com SEO completo e JSON-LD
`Article`. A seção local "Conteúdo Exclusivo", a seção temática `#conteudo` da produção e o
overlay `openPost` não foram publicados como funcionalidade ativa, por serem classificados como
vitrine/legado sem destino real. Newsletter herdada por endpoint WordPress foi removida da Home
ativa e substituída por CTA neutro via e-mail. Relatório: `MISSION_HOME_RECONCILIATION_REPORT.md`.

## 2026-06-25 — Backlog oficial: Fase 1 (Saneamento) antes de Fase 2 (Evolução)

Criado `BACKLOG_OFICIAL.md`, compartilhado com o Japão Relativo. Oito Missões definidas: Missão 1 (integridade das fontes — `/filosofos/`, concluída) já feita; Missões 2–5 transversais aos dois projetos (referências quebradas, Open Graph, auditoria de assets, padronização de estrutura); Missão 6 específica do Proceder (consolidar produção × repositório local); Missão 7 específica do Proceder (unificar Design System); Missão 8 específica do Japão Relativo (unificar Design System). Nenhum item de Fase 2 (novos hubs, artigos, funcionalidades) inicia antes da Fase 1 estar concluída em ambos os projetos.

## 2026-06-25 — Decisão oficial: fonte de verdade da Home (Missão 6)

Criado `DECISAO_HOME_OFICIAL.md`. Decisão formal, com achados verificados diretamente (não
assumidos): a Home publicada em `procederfilosofico.com.br` é a fonte oficial de conteúdo e
URLs (confirmado: contém "J.M. Barrie e a Síndrome de Peter Pan" e "A Montanha Contra a
Caverna", nenhum dos dois presente em `SITE/index.html`; sem `og:`/`twitter:card`; rotas
`/artigos/`, `/filosofos/`, `/conteudo/`, `/sobre/` retornam 404; endpoint de newsletter legado
404; `posts.js` responde 200 isoladamente mas não é referenciado por nenhum `<script>` na home
de produção — está órfão, não ausente). Base de reconciliação definida como
`SITE/docs/backups/proceder-fase1-20260601-110542/index.html` — mais próxima da produção atual,
mas não é espelho perfeito (não contém "Montanha Contra a Caverna", que já existe em produção
hoje; precisa ser resgatada da produção viva, não do backup). `SITE/index.html` confirmado como
"snapshot/protótipo local" (própria classificação em `README.md`) — não é base de conteúdo, só
referência de design a arquivar. Bloqueio registrado: nenhum deploy da Home até mapear os
permalinks reais de produção dos dois conteúdos exclusivos, para não destruir indexação
existente. `AUTOMATION/deploy.py` continua bloqueado para a Home até a reconciliação e validação
visual estarem completas.

## 2026-06-25 — Criação da documentação de governança

Auditoria completa do projeto (código, conteúdo, dados, briefings editoriais). Criados os documentos fundadores: `DNA.md`, `BRAND_BOOK.md`, `MANIFESTO.md`, `LEIS_DA_MARCA.md`, `DESIGN_SYSTEM.md`, `UX_SYSTEM.md`, `CONTENT_SYSTEM.md`, `EDITORIAL_GUIDELINES.md`, `GOVERNANCE.md`, `DEFINITION_OF_DONE.md`, `BRIEFING_PARA_CODEX.md`, `README.md`. Estrutura padronizada com o Japão Relativo (pasta `BRANDING/`, mesma convenção de nomes de arquivo).

**Correção de código já aplicada antes desta documentação (registrada aqui por completude):**
- `SITE/filosofos/index.html`: filtro que escondia 22 das 40 figuras cadastradas (só categorias "Filósofos" e "Sofistas" apareciam) foi corrigido. Agora exibe as 40 figuras, agrupadas em 8 seções por categoria. Commit local `a9f1474` — *fix: show all figures on philosophers page*. Ainda não deployado em produção.

**Achados registrados, sem decisão de correção ainda:**
- Quatro variações de paleta coexistem (Home, artigos, filósofos/conteúdo, sobre, biblioteca) — `DESIGN_SYSTEM.md` define o conjunto de `SITE/artigos/<slug>/` como canônico.
- 16 dos 43 artigos publicados são sobre pensadores ausentes de `philosophers.js` (todos os pré-socráticos com artigo, Hegel, Schopenhauer, Espinosa, Confúcio, Mill, Laplace, Einstein, Adorno, Balzac, Camões).
- Aristóteles está cadastrado com retrato mas sem artigo — maior gap de pauta individual do acervo.
- 6 dos 9 cards de "Conteúdo Exclusivo" na Home não têm destino real (decorativos com aparência de clicáveis).
- **Divergência crítica:** a produção (`procederfilosofico.com.br`) roda uma versão estrutural e editorialmente diferente deste repositório — sem as rotas `/artigos/`, `/filosofos/`, `/conteudo/`, `/sobre/`, e com conteúdo próprio que não existe localmente (ex.: "J.M. Barrie e a Síndrome de Peter Pan", "A Montanha Contra a Caverna"). Auditoria de divergência foi iniciada nesta mesma sessão e segue pendente de conclusão e plano de consolidação.
- `AUTOMATION/deploy.py` publica a pasta `SITE/` inteira do disco via FTP, não de forma seletiva por commit — qualquer deploy futuro precisa de revisão explícita do que está pendente em `SITE/` antes de rodar, não só do que se pretendia publicar.

## 2026-06-25 — Regularização de evidências da Missão 1 (integridade das fontes)

A Missão 1 havia sido reportada como concluída (27 fontes `.ttf` oficiais restauradas em
`SITE/wp-content/themes/hostinger-ai-theme/assets/fonts/`, origem Google Fonts/OFL), mas sem
evidência verificável. Auditoria desta regularização encontrou:

- A discrepância "28 arquivos vs. 27 fontes" é apenas `SOURCE_MANIFEST.json` (documentação,
  não fonte) contado junto — não há arquivo extra. As 27 fontes batem exatamente com as 27
  regras `@font-face` de `SITE/index.html`.
- A primeira validação visual (hash SHA-256 idêntico entre captura "antes" e "depois") era
  **inválida**: `SITE/index.html` carrega as fontes por URL absoluta de produção, nunca por
  caminho local, então as duas capturas carregaram o mesmo fallback do navegador independente
  da pasta local ter ou não as fontes.
- Validação real refeita (cópias temporárias fora do repositório, fontes servidas por caminho
  relativo, Playwright) confirma que os 27 arquivos são genuínos e produzem renderização
  diferente do fallback — ver `VALIDATION/MISSION_1/` e `MISSION_1_FONT_RESTORE_MANIFEST.md`
  (tamanho + SHA-256 de cada fonte).
- **As 27 URLs de produção (`procederfilosofico.com.br/wp-content/.../fonts/*.ttf`) retornam
  404 hoje.** A pasta local restaurada nunca foi enviada a produção — nenhum deploy/FTP foi
  executado. Para um visitante real do site, a Missão 1 continua sem efeito.

Status corrigido em `BACKLOG_OFICIAL.md`: de "✅ CONCLUÍDA" para "⚠️ PENDENTE DE EVIDÊNCIA DE
PRODUÇÃO". Nenhuma alteração de identidade, CSS, layout ou tipografia foi feita durante esta
regularização — apenas auditoria, manifesto e validação, todos fora do código de produção.

## 2026-06-25 — Congelamento documental da produção (PRODUCTION_SNAPSHOT.md)

Criado `PRODUCTION_SNAPSHOT.md` — registro completo do estado real de produção antes da
reconciliação da Home (Missão 6). Achado central, verificado diretamente: o HTML de produção
contém a marca `<!-- saved from url=(0014)about:internet -->` e referencia uma pasta
`index_files/` com nomes de arquivo característicos de "Salvar Página Como" do navegador — a
produção é um **snapshot estático de uma página originalmente WordPress**, não uma instância
WordPress respondendo dinamicamente hoje (`/wp-json/`, `/wp-admin/`, `/feed/`, `/sitemap.xml`,
`/wp-login.php`, `/xmlrpc.php` retornam todos o mesmo 404 genérico). Isso resolve o bloqueio
registrado em `DECISAO_HOME_OFICIAL.md`: não há permalink algum para "Peter Pan" ou "Montanha
Contra a Caverna" — os 8 artigos de produção vivem inteiramente como dados num array `POSTS`
embutido em `<script>` na própria Home (2 deles injetados via `POSTS.unshift()` em blocos de
script separados, sinal de adição ad-hoc posterior). Outros achados novos: apenas 2 páginas
reais existem em produção (`/` e `biblioteca.html`); favicon, Open Graph, Twitter Card,
canonical e meta description estão totalmente ausentes nas duas; newsletter usa
`action="mailto:"` (não funcional); duas origens de asset coexistem (`index_files/` renomeado
pelo navegador vs. `Canva - Proceder/...` original); nenhuma referência a PDF foi encontrada em
nenhuma das duas páginas reais. `DECISAO_HOME_OFICIAL.md` atualizado para refletir que a
migração dos 8 artigos é uma migração de dados, não uma preservação de rota.

## 2026-06-25 — Padronização estrutural com o Japão Relativo

Pasta `BRANDING/` confirmada como padrão único de governança documental para todo o ecossistema. Os dois projetos compartilham a mesma estrutura de nomes de arquivo, nunca o conteúdo.

---

*Entradas futuras devem seguir o formato: data — título curto da decisão, seguido de motivo e impacto.*
