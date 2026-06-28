# KPI E RITUAIS — DIRETORIA CRIATIVA

### Sob a ótica criativa · Versão 1.0 — 2026-06-26

> Documento compartilhado, cópia idêntica em
> `JAPAO_RELATIVO:/BRANDING/02_DEPARTAMENTOS/KPI_E_RITUAIS.md`. Complementa
> `DIRETORIA_CRIATIVA.md` — não repete o que já está lá (KPIs gerais, checklist semanal,
> auditorias). Este documento aprofunda a **cadência operacional** do departamento: rituais
> diários (ausentes do documento original), auditorias mensais (vs. o checklist semanal já
> existente), o formato concreto de uma RFC Criativa, e a integração nomeada com cada um dos
> outros três departamentos/funções do ecossistema. Ver `DOCUMENTATION_MAP.md` para a relação
> completa entre todos os documentos.

---

## Missão (recorte deste documento)

Onde `DIRETORIA_CRIATIVA.md` define **o que** o departamento é e pode decidir,
`KPI_E_RITUAIS.md` define **quando** e **com que frequência** ele verifica se está cumprindo
essa missão — e o que fazer quando a verificação falha.

## Responsabilidades específicas deste documento

- Definir a cadência (diária, semanal, mensal) de cada tipo de verificação.
- Definir o formato obrigatório de uma RFC Criativa, para que toda decisão de alto impacto
  produza o mesmo tipo de evidência, independentemente de quem a escreve.
- Nomear explicitamise como a Diretoria Criativa se integra a cada outro departamento/função:
  Engenharia (Codex), Arquitetura (ChatGPT), Inteligência (Manus), Operações (Beelzebub).

## KPIs (complementares aos já listados em `DIRETORIA_CRIATIVA.md`)

- **Tempo de resposta a bloqueio de identidade:** quanto tempo entre a Diretoria Criativa
  bloquear uma proposta na etapa "Identidade" do Protocolo de Decisão e a entrega de uma
  alternativa alinhada (meta: não deixar uma proposta bloqueada sem caminho de avanço).
- **Cobertura de RFC:** % de decisões que deveriam ter gerado RFC (ver lista de gatilhos em
  `DIRETORIA_CRIATIVA.md`, seção "RFCs obrigatórias") que de fato geraram o documento, antes de
  serem implementadas.
- **Densidade de achados por auditoria:** nº de inconsistências (duplicação, contradição,
  referência quebrada) encontradas por rodada de auditoria mensal — uma tendência de queda
  indica que a documentação está convergindo, não divergindo a cada nova missão.

## Rituais diários

- Checar se algum departamento (Engenharia, Arquitetura, Inteligência, Operações) entregou algo
  novo que dependa de validação de identidade antes de avançar — não deixar proposta represada
  por falta de checagem do dia.
- Checar se algum relato de "concluído" foi feito nas últimas 24h por qualquer fonte (Codex,
  Beelzebub, processo automatizado) — se sim, aplicar a verificação direta descrita em
  `DIRETORIA_CRIATIVA.md` ("Verificação direta antes de aceitar relato de terceiro") antes do
  fim do dia, não acumular para depois.

## Rituais semanais

Ver `DIRETORIA_CRIATIVA.md`, seção "Checklist semanal" — não duplicado aqui.

## Auditorias mensais

Distinta do checklist semanal (que é operacional/de acompanhamento): a auditoria mensal é
estrutural, cobrindo toda a documentação, não apenas a semana corrente.

1. Reler `BRANDING/README.md` de cada produto e confirmar que a ordem de leitura ainda reflete
   os documentos que de fato existem (nenhum arquivo novo fora do índice, nenhum arquivo do
   índice que não existe mais).
2. Para cada documento marcado como "compartilhado, cópia idêntica" entre Proceder e Japão
   Relativo, comparar as duas cópias de fato (não assumir que permaneceram idênticas desde a
   última sincronização) — precedente: `BACKLOG_OFICIAL.md` divergiu silenciosamente entre as
   duas cópias por pelo menos um ciclo antes de ser detectado (2026-06-26).
3. Procurar duplicação de dados entre relatórios técnicos gerados na mesma janela de tempo
   (mesmo timestamp, métricas iguais) — sinal de auditoria automática fatiada em múltiplos
   arquivos sem necessidade.
4. Revisar `CHANGELOG_DA_IDENTIDADE.md` do mês e confirmar que toda entrada tem motivo e impacto
   claros, não apenas "o que foi feito".
5. Atualizar `ROADMAP_DA_IDENTIDADE.md` se o estado atual já não corresponder ao que está
   escrito como "Estado Atual".

## RFC Criativa — formato obrigatório

Toda RFC Criativa (gatilhos definidos em `DIRETORIA_CRIATIVA.md`) deve conter, nesta ordem,
sem omitir seção:

1. **Achados verificados diretamente** — nunca assumidos por enunciado de terceiro (arquivo
   lido, URL testada, hash comparado, captura de tela real).
2. **Decisão** — uma frase declarativa, sem ambiguidade.
3. **O que preservar / o que descartar / o que arquivar.**
4. **Critérios de aceite** — verificáveis, não subjetivos.
5. **Bloqueios** — o que impede a decisão de ser executada hoje.
6. **Riscos**, incluindo o risco de SEO/identidade se a decisão for revertida depois de
   implementada.
7. **Definition of Done específica** da decisão — quando ela deixa de ser "PENDENTE DE
   EVIDÊNCIA"/"PENDENTE DE SANEAMENTO" e passa a ser "CONCLUÍDA".

Precedente de formato: `BRANDING/DECISAO_HOME_OFICIAL.md` (Proceder Filosófico).

## Integração nomeada com os demais departamentos

### Com a Engenharia (Codex)

A Diretoria Criativa entrega briefing e decisões formais; recebe de volta relatório de
execução. Toda métrica técnica que mencione identidade, UX ou conteúdo editorial (ex.: scores
de "saúde" de um relatório de auditoria) é lida pela Diretoria Criativa antes de ser tratada
como avaliação de qualidade do produto — uma métrica puramente técnica (performance, peso de
imagem) não decide identidade por conta própria.

### Com a Arquitetura (ChatGPT)

A Diretoria Criativa recebe auditorias estruturais e propostas de integração entre projetos;
aplica o checklist de 5 perguntas (`GOVERNANCE.md`) antes de qualquer proposta de arquitetura
avançar para implementação. Arquitetura nunca decide identidade — só estrutura.

### Com a Inteligência (Manus)

A Diretoria Criativa recebe pesquisa, benchmark e dados de mercado; funciona como o filtro entre
"o que o mercado pede" e "o que a marca pode ceder sem deixar de ser ela mesma". Toda proposta
de monetização ou tendência de mercado passa por esse filtro antes de chegar à Arquitetura ou à
Engenharia.

### Com as Operações (Beelzebub)

A Diretoria Criativa define **o que** precisa ser monitorado em termos de identidade (status de
missão, divergência produção-vs-local, cobertura de SEO mínimo) e **não opera** as ferramentas
do Beelzebub diretamente — quem executa o monitoramento operacional é o próprio Beelzebub,
dentro do que já está descrito como seu estado real (MVP 0.5) em `AION_STUDIO_MANUAL.md`. A
Diretoria Criativa não deve assumir que um indicador está sendo monitorado só porque está
descrito como função do Beelzebub na visão — confirmar o que de fato está implementado antes de
depender do dado.

## Critérios de aprovação específicos deste documento

Um ritual ou KPI só é considerado ativo (não apenas "documentado") quando:
- Tem responsável claro (mesmo que o responsável seja a própria Diretoria Criativa).
- Tem cadência definida (diária/semanal/mensal) — não "quando der".
- Tem registro verificável de execução (entrada em `CHANGELOG_DA_IDENTIDADE.md`, ou item
  marcado em auditoria) — ritual sem registro é indistinguível de ritual que não aconteceu.

## Indicadores de qualidade específicos deste documento

- Zero divergência não detectada por mais de um ciclo mensal entre cópias de documentos
  "compartilhados".
- Zero RFC obrigatória (pelos gatilhos de `DIRETORIA_CRIATIVA.md`) implementada sem o formato
  completo de 7 seções acima.
- 100% dos achados de auditoria mensal com ação registrada (corrigido, ou explicitamente
  classificado como recomendação para outro departamento, nunca apenas listado e esquecido).
