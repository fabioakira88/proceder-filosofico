# BACKLOG OFICIAL — ECOSSISTEMA DIGITAL

> Governança permanente, compartilhada com o Japão Relativo (cópia idêntica em `JAPAO_RELATIVO:/BRANDING/BACKLOG_OFICIAL.md`). Esta numeração é oficial para toda documentação futura. Nenhuma Fase 2 (Evolução) começa antes da Fase 1 (Saneamento) estar concluída em ambos os projetos.

## Princípio da fase atual

O objetivo não é crescer. O objetivo é consolidar o patrimônio digital. Até a Missão 8 ser concluída: nenhum hub novo, nenhum artigo novo, nenhuma funcionalidade nova, nenhum módulo novo, nenhuma mudança de identidade visual além de eliminar divergência já documentada.

---

# FASE 1 — SANEAMENTO

## Missão 1 — Integridade das fontes ⚠️ PENDENTE DE EVIDÊNCIA DE PRODUÇÃO

**Objetivo:** restaurar a integridade das 27 fontes oficiais do Proceder Filosófico
(`SITE/index.html`, regras `@font-face`), sem nenhuma alteração perceptível de layout,
identidade visual ou tipografia.

**Escopo executado até aqui:** as 27 fontes `.ttf` oficiais (Catamaran, Caudex, Cormorant,
DM Sans ×6, DM Serif Display, Fira Sans, Gruppo, IBM Plex Mono, Junge, Lato, Manrope,
Montserrat, Nunito Sans, Open Sans, Playfair Display, Poppins, Prata, Prompt, Prosto One,
Roboto, Titillium Web, Trirong) foram obtidas do repositório oficial Google Fonts (OFL) e
colocadas em `SITE/wp-content/themes/hostinger-ai-theme/assets/fonts/`, com manifesto de
origem em `SOURCE_MANIFEST.json` e verificação de integridade (tamanho + SHA-256) registrada
em `MISSION_1_FONT_RESTORE_MANIFEST.md`. Validação visual local real (Playwright, com/sem as
27 fontes) confirmou que os arquivos são genuínos e produzem renderização diferente do
fallback do sistema — ver `VALIDATION/MISSION_1/`.

**Por que não está concluída:** `SITE/index.html` carrega as 27 fontes por URL absoluta de
produção (`https://procederfilosofico.com.br/wp-content/...`), nunca por caminho local. Na
data desta verificação, **as 27 URLs de produção retornam 404** — a pasta local restaurada
ainda não foi enviada a produção (nenhum deploy/FTP foi executado) e, portanto, não tem efeito
algum para quem visita o site real. A primeira tentativa de validação visual feita antes desta
regularização (hash idêntico entre "antes" e "depois") era inválida — comparava duas capturas
que, por essa mesma razão estrutural, carregavam o mesmo fallback nos dois casos.

**Para concluir:** decisão explícita de deploy (envio das 27 fontes a produção via FTP, mesmo
mecanismo de `AUTOMATION/deploy.py`) + nova verificação das 27 URLs de produção retornando 200
+ nova captura visual da produção real antes/depois. Nenhuma dessas três etapas foi autorizada
ou executada ainda.

**Nota separada, registrada apenas por completude histórica:** o filtro de categoria em
`/filosofos/` (commit local `a9f1474`) foi uma correção distinta, já concluída e já registrada
em `CHANGELOG_DA_IDENTIDADE.md` — não faz parte do escopo desta Missão 1.

## Missão 2 — Eliminar referências quebradas restantes ✅ CONCLUÍDA

**Objetivo:** zero referência quebrada em qualquer um dos dois projetos — links internos, assets, PDFs, downloads, favicon, manifest, referências a material legado/`ARCHIVE/`.

**Critérios de sucesso:**
- Crawl interno completo de cada site sem 404 nem erro de carregamento.
- Toda imagem, PDF e link de download referenciado no código responde 200.
- Favicon e manifest carregam sem erro de console em desktop e mobile.
- Nenhuma referência ativa a arquivo de `ARCHIVE/` (JR) ou pasta legada equivalente no Proceder.

**Riscos:**
- Um "link quebrado" no Proceder pode, na verdade, apontar para conteúdo que só existe em produção (ver Missão 6) — corrigir cegamente mascara a causa real em vez de resolvê-la.
- Risco de remover referência a algo que é "em breve" por design (ex.: módulos do Survival com status `soon`), confundindo incompletude planejada com referência quebrada.

**Impacto em SEO:** alto e direto. Link/asset quebrado é penalizado por crawlers e prejudica Core Web Vitals (imagem 404 conta como recurso falho); experiência de navegação quebrada é fator indireto de ranqueamento.

**Impacto na identidade:** nenhum, se a correção for fiel ao Design System de cada projeto. Risco identitário só aparece se a correção usar um asset de fallback fora do padrão documentado (cor, estilo ou proporção fora do canônico).

**Ordem ideal de execução:** primeira tarefa prática da Fase 1, mas o levantamento de inventário que a sustenta é o mesmo da Missão 4 — recomenda-se rodar o mapeamento de assets uma única vez e usá-lo tanto para corrigir (Missão 2) quanto para auditar (Missão 4), mesmo mantendo a numeração oficial separada.

---

## Missão 3 — Padronizar Open Graph e Social Metadata ✅ CONCLUÍDA

**Objetivo:** toda página de ambos os projetos com `og:image`, `og:title`, `og:description`, `twitter:card`, todos apontando para recurso existente.

**Critérios de sucesso:**
- Validação (ferramenta de depuração de compartilhamento ou script equivalente) sem erro em 100% das páginas.
- Nenhuma imagem de Open Graph quebrada ou ausente.
- Página individual (artigo) usa imagem de capa real; página de listagem/hub usa imagem representativa documentada.

**Riscos:**
- Depende de Missão 2 estar resolvida — `og:image` não pode apontar para asset já identificado como quebrado.
- Risco de gerar imagem de fallback genérica que não respeita o Design System de cada projeto (ex.: usar uma capa de artigo errada ou um placeholder sem identidade visual).

**Impacto em SEO:** alto para CTR em compartilhamento social (não é fator direto de ranqueamento do Google, mas afeta diretamente a taxa de clique vinda de redes sociais e apps de mensagem). JSON-LD, tratado nos respectivos `CONTENT_SYSTEM.md`, é o que afeta rich snippets — não confundir os dois.

**Impacto na identidade:** baixo, mas real — a imagem de Open Graph é a "capa pública" da marca em qualquer compartilhamento externo; precisa seguir exatamente o padrão de capa já documentado.

**Ordem ideal de execução:** depois da Missão 2.

---

## Missão 4 — Auditoria completa de assets

**Objetivo:** mapear órfãos, duplicatas, imagens pesadas e estado de organização das pastas de asset nos dois projetos. Esta missão é só de auditoria — **nada é apagado sem aprovação explícita**.

**Critérios de sucesso:**
- Relatório com lista completa de: arquivos órfãos (não referenciados em nenhum código), duplicatas (mesmo conteúdo, nomes diferentes), arquivos acima de um limite de peso definido para imagem web, e proposta de ação por categoria.
- Nenhuma exclusão executada nesta missão — só recomendação, com aprovação pendente.

**Riscos:**
- Um "órfão" no Proceder pode não ser órfão de verdade se houver referência em produção que o repositório local não tem — mesmo risco de causa raiz da Missão 2, ligado à Missão 6.
- Uma "duplicata" pode ser intencional (ex.: mesmo retrato usado em dois caminhos por decisão de design anterior) — auditoria reporta, não decide sozinha.

**Impacto em SEO:** indireto, mas relevante — imagem pesada não otimizada prejudica tempo de carregamento (LCP), que é fator de ranqueamento.

**Impacto na identidade:** nenhum nesta etapa — é levantamento, não execução.

**Ordem ideal de execução:** tecnicamente compartilha a base de dados da Missão 2 (idealmente executadas juntas, na prática); precede formalmente a Missão 5.

---

## Missão 5 — Padronização definitiva da estrutura de assets

**Objetivo:** estrutura única de pastas para imagem, áudio, vídeo, PDF, ícone, logo e background nos dois projetos. Atualizar o Asset Registry (a ser formalizado como artefato nesta missão, caso ainda não exista como documento próprio em algum dos dois repositórios).

**Critérios de sucesso:**
- Convenção de pastas documentada e seguida em 100% dos assets ativos.
- Asset Registry reflete o estado real de cada repositório.
- Nenhum asset ativo fora da estrutura definida.

**Riscos:** esta é a missão de maior risco técnico da Fase 1 — mover um arquivo de pasta exige atualizar toda referência a ele simultaneamente, sob risco de recriar exatamente o problema da Missão 2, em maior escala.

**Impacto em SEO:** indireto — URL de imagem que muda pode gerar 404 temporário se mal sequenciado, ou perda de indexação de imagem já posicionada no Google Imagens. Toda movimentação de asset indexado deveria manter redirecionamento ou caminho estável.

**Impacto na identidade:** nenhum diretamente, mas é a infraestrutura prática que sustenta as Missões 7 e 8 — Design System unificado exige organização de asset unificada por baixo.

**Ordem ideal de execução:** depende do inventário da Missão 4.

---

## Missão 6 — Consolidar Produção × Repositório Local *(específica do Proceder Filosófico)*

**Objetivo:** eliminar a divergência entre a produção (`procederfilosofico.com.br`, hoje WordPress, com conteúdo próprio incluindo artigos que não existem no repositório local) e o repositório local (43 artigos, arquitetura modular). Definir qual é a fonte oficial daqui para frente.

**Decisão de fonte oficial já registrada:** ver `BRANDING/DECISAO_HOME_OFICIAL.md`. Produção =
fonte oficial de conteúdo/URLs. Base de reconciliação = `SITE/docs/backups/proceder-fase1-20260601-110542/index.html`
(mais próxima da produção, mas não é espelho perfeito). `SITE/index.html` = arquivar como
referência de design, nunca deployar. Bloqueio ativo: nenhum deploy da Home até mapear os
permalinks reais de produção dos conteúdos exclusivos ("Peter Pan", "Montanha Contra a
Caverna") — isso ainda não foi feito, então esta missão permanece em andamento, não concluída.

**Espelhamento factual executado em 2026-06-25:** ver `PRODUCTION_SNAPSHOT.md` e
`MISSION_ESPELHAMENTO_PRODUCAO_REPORT.md`. A Home viva, biblioteca, assets referenciados e os 8
posts/cards embutidos em produção foram preservados no repositório. Os candidatos de permalink
`/<slug>/` e `/artigos/<slug>/` para os 8 cards retornaram 404; portanto, a etapa de
reconciliação ainda precisa criar rotas estáveis ou plano de redirecionamento antes de qualquer
deploy.

**Reconciliacao executada em 2026-06-25:** ver `MISSION_HOME_RECONCILIATION_REPORT.md`.
`SITE/index.html` foi substituido por Home reconciliada, o prototipo local foi arquivado em
`SITE/docs/backups/home-prototype-archived-20260625-reconciliacao/` e os 8 posts/cards de
producao passaram a existir como paginas estaticas em `/artigos/<slug>/`. Validacao estatica:
54 paginas verificadas, 0 referencias quebradas, 0 pendencias de SEO, 0 erros de JSON-LD.
Status: apta tecnicamente para revisao pre-deploy; deploy ainda exige autorizacao explicita.

**Critérios de sucesso:**
- Inventário completo do que existe só em produção vs. só localmente (retomar e concluir a auditoria de divergência iniciada nesta mesma sessão).
- Decisão explícita e registrada: qual é a fonte oficial.
- Plano de migração ou descarte para cada item divergente, aprovado antes de qualquer execução.
- Credencial de WordPress hoje exposta em texto puro (`DOCS/ARQUITETURA.md` do Japão Relativo e script já publicado em produção do Proceder) revogada e substituída.

**Riscos:** a missão de maior risco político e técnico do backlog. Decidir "fonte oficial" pode significar descartar conteúdo publicado com tráfego e posição de busca próprios (ex.: o artigo sobre J.M. Barrie/Peter Pan). Decisão apressada aqui é irreversível para SEO se feita sem redirecionamento.

**Impacto em SEO:** altíssimo — produção tem páginas indexadas hoje. Qualquer migração de fonte sem redirecionamento 301 entre URLs antigas e novas destrói posições de busca já conquistadas.

**Impacto na identidade:** alto — esta missão decide, na prática, qual versão do Proceder o leitor real encontra. Toda a documentação de Design/UX/Content System em `BRANDING/` só vale de verdade depois desta decisão.

**Ordem ideal de execução:** deve vir antes da Missão 7 — não é possível unificar definitivamente o Design System sem saber qual fonte está sendo unificada.

---

## Missão 7 — Unificar Design System do Proceder Filosófico

**Objetivo:** eliminar as quatro variações de paleta/tipografia hoje documentadas em `DESIGN_SYSTEM.md` (Home, artigos, filósofos/conteúdo, sobre, biblioteca), convergindo para o conjunto canônico (`SITE/artigos/<slug>/`). Resolver apenas após o saneamento. Nenhuma mudança de identidade — somente eliminar divergência.

**Critérios de sucesso:** todas as páginas usam exatamente as mesmas variáveis CSS, mesmos valores hexadecimais, mesma tipografia (Playfair Display + Lato + Cinzel). Nenhuma cor ou fonte fora do conjunto já documentado.

**Riscos:** `biblioteca.html` tem hoje tema claro — convergir para o padrão escuro é uma mudança visual real, mesmo que classificada como correção de divergência. Risco de regressão visual se a migração não for validada página por página (mesmo tipo de falha que originou a Missão 1).

**Impacto em SEO:** baixo/neutro — é mudança de CSS, não de URL ou conteúdo. Risco indireto só se alguma alteração de marcação quebrar algo de que o SEO dependa (ex.: `alt` de imagem dentro de um componente reescrito).

**Impacto na identidade:** ponto central desta missão — bem-feita, fortalece a identidade ao eliminar ruído visual; mal-feita (criando token novo em vez de usar o canônico já documentado), ela mesma se torna uma violação da governança que a originou.

**Ordem ideal de execução:** depende da Missão 6 e idealmente das Missões 2, 4 e 5 já concluídas (não há por que unificar tipografia/paleta de páginas que ainda têm asset quebrado por baixo).

---

## Missão 8 — Unificar Design System do Japão Relativo

**Objetivo:** eliminar os três sistemas visuais hoje documentados em `DESIGN_SYSTEM.md` (editorial Cormorant Garamond + `#C1121F` na home/quiz vs. Georgia + vermelhos divergentes `#a51f2b`/`#a91e29` nos hubs práticos e no Survival), convergindo para o canônico. Mesmo princípio da Missão 7: nunca reinventar identidade, somente eliminar divergência.

**Critérios de sucesso:** `assets/finance/finance.css` e `assets/survival/survival.css` realinhados para Cormorant Garamond + Inter + `#B08A57` + `#C1121F` + `#F5F1EA`. Nenhum `:root` divergente restante no código.

**Riscos:** o módulo Survival é produto pago em produção (checkout Stripe ativo, ¥980 por módulo) — qualquer regressão visual ali tem custo direto de conversão e confiança de quem já comprou. Exige QA mais cuidadoso do que uma página editorial comum.

**Impacto em SEO:** baixo/neutro, mesma lógica da Missão 7.

**Impacto na identidade:** mesma lógica da Missão 7 — esta é simplesmente a aplicação prática do que `DESIGN_SYSTEM.md` do Japão Relativo já recomenda.

**Ordem ideal de execução:** não depende da Missão 6 (o Japão Relativo não tem o mesmo tipo de divergência produção/local — o deploy é direto do repositório via GitHub Actions, sem CMS intermediário). Pode, em princípio, ser executada em paralelo às Missões 6–7 do Proceder, desde que as Missões 2–5 já estejam concluídas no repositório do Japão Relativo.

---

# FASE 2 — EVOLUÇÃO

Só começa após as oito Missões da Fase 1 estarem concluídas em ambos os projetos. Inclui: novos hubs, novos artigos, novas funcionalidades, novos módulos, novas experiências. Nenhum item de Fase 2 deve ser iniciado antes disso.

## Backlog de Funcionalidades — Implementação de Newsletter

**Origem:** reclassificação da Missão 2 de Saneamento.

**Escopo:** substituir a funcionalidade herdada do WordPress/Hostinger por uma implementação de newsletter compatível com a arquitetura atual.

**Observação:** esta tarefa não pertence à Fase 1 — Saneamento. O endpoint legado `wp-json/hostinger-reach/v1/contact` não deve ser tratado como referência quebrada ativa.

---

# Nota de escopo

As Missões 2–5 são transversais: aplicam-se aos dois repositórios, executadas separadamente em cada um (não existe um Asset Registry ou crawl único compartilhado entre Proceder e Japão Relativo — são codebases independentes). As Missões 6, 7 e 8 são específicas de um projeto cada, conforme indicado em cada título.
