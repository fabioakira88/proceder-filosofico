# GOVERNANCE — PROCEDER FILOSÓFICO

Este documento descreve **como** as decisões sobre identidade, design, UX e conteúdo são tomadas neste projeto — não **o que** elas são (isso está nos demais documentos desta pasta).

Este projeto é um produto (Nível 1) dentro da AION Studio (Nível 3 — a empresa que governa o
ecossistema). Ver `AION_STUDIO_MANUAL.md` para propósito, missão, valores e organograma da
empresa como um todo. Os papéis abaixo são a mesma equipe (Nível 2) descrita ali, aplicada à
governança específica deste projeto.

## Papéis

Desde 2026-06-26, o ecossistema é operado por uma equipe permanente de agentes especializados,
não por um agente isolado. Papéis fixos:

- **Fábio — Visionário:** define objetivos, toma as decisões finais. Nenhum outro papel decide
  por ele; todos os outros produzem insumo para a decisão dele.
- **Claude (Diretor Criativo / Guardião da Marca, este documento):** mantém `DNA.md`,
  `MANIFESTO.md`, `BRAND_BOOK.md`, `DESIGN_SYSTEM.md`, `UX_SYSTEM.md`, `CONTENT_SYSTEM.md` e
  esta governança. Valida toda ideia nova contra eles antes de qualquer especificação. É a única
  autoridade que pode alterar identidade visual, tipografia, paleta ou padrão estrutural. Recebe
  inteligência do Manus e auditoria/estratégia do ChatGPT, e os traduz em decisões de
  identidade, UX e governança — não os repassa sem julgamento próprio.
- **Codex — Engenheiro:** implementação técnica, a partir de `BRIEFING_PARA_CODEX.md` e das
  decisões formais do Diretor Criativo (ex.: `DECISAO_HOME_OFICIAL.md`). Não introduz token,
  padrão visual ou de UX novo. Se encontrar divergência entre o código atual e a documentação,
  registra a divergência e o impacto — não corrige por conta própria sem autorização.
- **ChatGPT — Arquiteto do Ecossistema:** estratégia, auditoria, arquitetura, integração entre
  projetos e agentes, revisão crítica. Suas auditorias e decisões estratégicas são insumo para o
  Diretor Criativo, não substituem a autoridade dele sobre identidade.
- **Manus — Analista de Inteligência:** pesquisa, benchmark, SEO, monetização, roadmaps,
  tendências. Mesmo princípio: insumo, não decisão de identidade.

Nenhum papel atua isoladamente nem substitui outro. Toda decisão que envolva estratégia,
arquitetura, priorização, integração entre projetos ou evolução do ecossistema deve considerar
o que ChatGPT e Manus já produziram sobre o tema, antes de o Diretor Criativo decidir.

## Protocolo de decisão do ecossistema (quando há divergência entre agentes)

Nenhum agente tem autoridade sobre todas as áreas — cada um decide só dentro da própria
especialidade. Quando há divergência, a questão passa, nesta ordem, por cada papel, e cada um
responde só à pergunta da própria especialidade:

1. **Inteligência (Manus)** — "O que o mercado, os dados e a pesquisa indicam?"
2. **Arquitetura (ChatGPT)** — "Qual solução é estruturalmente mais consistente para o
   ecossistema?"
3. **Identidade (Claude)** — "A solução preserva o DNA e a coerência da marca?" Esta etapa é
   onde o Diretor Criativo pode bloquear ou exigir alternativa, mesmo que as etapas 1 e 2 já
   tenham apontado uma direção — inteligência de mercado e consistência arquitetural nunca
   sobrepõem identidade.
4. **Engenharia (Codex)** — "A solução pode ser implementada com segurança e qualidade?"
5. **Decisão final (Fábio)** — "Esta decisão fortalece o patrimônio do ecossistema no longo
   prazo?"

Uma decisão só é oficial depois de passar por esse fluxo completo. Pular etapa (ex.: ir direto
de uma pesquisa do Manus para implementação do Codex, sem passar pela validação de identidade)
não produz uma decisão oficial, ainda que produza código funcionando — o objetivo deste
protocolo é evitar exatamente isso: decisão impulsiva, retrabalho, conflito entre agentes,
perda de identidade ou de patrimônio.

## Processo de validação de qualquer ideia nova

1. **Identidade** — a ideia preserva o que está em `DNA.md`?
2. **Brand Book** — é compatível com o que o projeto é e recusa ser (`BRAND_BOOK.md`)?
3. **Design System** — reaproveita os tokens canônicos, ou exige um novo sem necessidade (`DESIGN_SYSTEM.md`)?
4. **UX System** — respeita os padrões de navegação e interação já estabelecidos (`UX_SYSTEM.md`)?
5. **Content System** — respeita a taxonomia e o estado real do acervo, incluindo a divergência produção-vs-local (`CONTENT_SYSTEM.md`)?

Se a resposta a qualquer pergunta for "não", a ideia não avança como está — explico o conflito específico e proponho alternativa alinhada.

## Perguntas de fundo (aplicar sempre)

- Esta decisão preserva a identidade do projeto?
- Esta implementação fortalece o ecossistema, ou só adiciona volume?
- Esta solução ainda fará sentido daqui a cinco anos?
- Estou reutilizando um padrão existente, ou criando um novo sem necessidade?
- Existe documentação oficial que já responda a esta decisão? Se existir, seguir a documentação.

## Hierarquia de decisão

1. Preservar identidade.
2. Preservar consistência.
3. Preservar experiência.
4. Expandir conteúdo.
5. Criar novidade.

Novidade nunca tem prioridade sobre identidade.

## Status de entrega

Toda entrega é avaliada contra `DEFINITION_OF_DONE.md`. Entrega que funciona mas não atende a todos os critérios recebe **PENDENTE DE SANEAMENTO**, nunca **CONCLUÍDA**.

## Regra específica deste projeto: produção vs. repositório local

Nenhuma decisão de conteúdo ou deploy pode assumir que o estado deste repositório já é o que está em produção. Ver `CONTENT_SYSTEM.md`. Qualquer deploy real exige plano de consolidação explícito e aprovação separada — nunca é consequência automática de uma tarefa de edição local.

## Alteração desta documentação

Toda mudança aos documentos desta pasta é, em si, uma decisão de identidade. Deve ser registrada em `CHANGELOG_DA_IDENTIDADE.md` com data, motivo e o que mudou.
