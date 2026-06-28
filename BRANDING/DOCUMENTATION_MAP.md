# DOCUMENTATION MAP — Proceder Filosófico

### Versão 1.0 — 2026-06-26

> Mapa relacional de toda a documentação do projeto — não repete o conteúdo de cada documento,
> mostra como eles dependem uns dos outros. Equivalente adaptado em
> `JAPAO_RELATIVO:/BRANDING/DOCUMENTATION_MAP.md` (estrutura igual, arquivos próprios de cada
> projeto). Para ordem de leitura linear, ver `BRANDING/README.md`; para lista com descrição de
> cada arquivo, ver `ÍNDICE_GERAL_CRIATIVO.md`. Este documento responde "o que depende do quê",
> não "o que ler primeiro" nem "o que cada um diz".

---

## Camada 1 — Identidade (fundadora, tudo depende dela)

```
DNA.md
  └─ por que o projeto existe
       ├─ BRAND_BOOK.md (o que é / não é, a partir do DNA)
       ├─ MANIFESTO.md (voz do DNA, em primeira pessoa da marca)
       └─ LEIS_DA_MARCA.md (20 regras que operacionalizam o DNA + Brand Book)
                ├─ DESIGN_SYSTEM.md (tokens visuais que cumprem as Leis)
                ├─ UX_SYSTEM.md (padrões de interação que cumprem as Leis)
                ├─ CONTENT_SYSTEM.md (taxonomia/acervo que cumpre as Leis)
                └─ EDITORIAL_GUIDELINES.md (voz frase-a-frase, deriva do Manifesto + Leis)
```

Nenhum documento desta camada depende de algo fora dela. Toda mudança aqui é, por definição,
uma decisão de identidade — passa pelo checklist de 5 perguntas (`GOVERNANCE.md`) e é registrada
em `CHANGELOG_DA_IDENTIDADE.md`.

## Camada 2 — Governança (regula como a Camada 1 é aplicada)

```
GOVERNANCE.md
  ├─ define os papéis (Fábio, Claude, Codex, ChatGPT, Manus, Beelzebub)
  ├─ define o Protocolo de Decisão (Inteligência→Arquitetura→Identidade→Engenharia→Fábio)
  └─ define o checklist de 5 perguntas usado por toda a Camada 1

DEFINITION_OF_DONE.md
  └─ critério para classificar qualquer entrega como CONCLUÍDA vs. PENDENTE

BRIEFING_PARA_CODEX.md
  └─ resumo operacional da Camada 1, para quem implementa sem ler todos os 8 documentos

CHANGELOG_DA_IDENTIDADE.md
  └─ histórico de toda decisão tomada nas Camadas 1 e 2 (fonte de verdade cronológica)
```

`GOVERNANCE.md` é o único documento que referencia diretamente todos os outros sete da Camada 1
— qualquer documento novo de identidade precisa ser adicionado também à ordem de leitura de
`BRANDING/README.md`.

## Camada 3 — Empresa (Nível 3, acima deste produto)

```
AION_STUDIO_MANUAL.md
  └─ contextualiza GOVERNANCE.md dentro da empresa (Nível 3 → Nível 2 → Nível 1)
       ├─ 02_DEPARTAMENTOS/DIRETORIA_CRIATIVA.md (formaliza o papel "Claude" de GOVERNANCE.md)
       │     └─ 02_DEPARTAMENTOS/KPI_E_RITUAIS.md (cadência operacional da Diretoria Criativa)
       └─ 02_DEPARTAMENTOS/ENGENHARIA.md (formaliza o papel "Codex" de GOVERNANCE.md)
```

Estes quatro documentos são **compartilhados, cópia idêntica** com o Japão Relativo — qualquer
edição em um precisa ser replicada no outro projeto no mesmo ciclo (ver "Risco de divergência"
abaixo).

## Camada 4 — Backlog e decisões pontuais (aplicação prática da Camada 1+2)

```
BACKLOG_OFICIAL.md  (compartilhado, cópia idêntica com o Japão Relativo)
  ├─ Missão 1 → MISSION_1_FONT_RESTORE_MANIFEST.md, VALIDATION/MISSION_1/
  ├─ Missão 2 → MISSION_1_SANEAMENTO_REPORT.md, MISSION_2_SANEAMENTO_REPORT.md
  ├─ Missão 3 → MISSION_3_SANEAMENTO_REPORT.md
  ├─ Missão 4/5 → ASSET_REGISTRY.md, ASSET_AUDIT_REPORT.md
  └─ Missão 6 (específica deste projeto) → DECISAO_HOME_OFICIAL.md
        ├─ PRODUCTION_SNAPSHOT.md (espelhamento que sustenta a decisão)
        ├─ MISSION_ESPELHAMENTO_PRODUCAO_REPORT.md (relatório de execução do espelhamento)
        ├─ MISSION_3_5_HOME_AUDIT_REPORT.md (auditoria comparativa que motivou a decisão)
        └─ MISSION_HOME_RECONCILIATION_REPORT.md (relatório de execução da reconciliação)
```

`DECISAO_HOME_OFICIAL.md` é o único documento desta camada que **não existe** no Japão Relativo
— é específico da Missão 6 (consolidar produção × repositório local), que só se aplica ao
Proceder (o JR não tem CMS intermediário). `02_DEPARTAMENTOS/DIRETORIA_CRIATIVA.md`
(compartilhado) cita `DECISAO_HOME_OFICIAL.md` apenas como **formato de referência** para RFCs
futuras — não pressupõe que o arquivo exista fisicamente nos dois projetos.

## Camada 5 — Engenharia técnica (paralela, cruza com a Camada 4 nas Missões 2, 4 e 5)

```
ENGINEERING_STRUCTURE.md ─┐
TECHNICAL_DEBT.md         ├─ operacionais, compartilhados (cópia idêntica) com o Japão Relativo
DEPLOY_CHECKLIST.md       │  Formalizados em 02_DEPARTAMENTOS/ENGENHARIA.md (que os referencia
REPOSITORY_STANDARDS.md   │  como artefatos do departamento, sem repetir o conteúdo deles)
BACKUP_POLICY.md         ─┘

ECOSYSTEM_FINAL_AUDIT.md
  └─ auditoria de engenharia cobrindo os DOIS projetos; vive como arquivo único aqui
     (não duplicado no Japão Relativo — ver nota de correção dentro do próprio arquivo,
     2026-06-26, sobre uma referência de boot sequence que apontava para pasta inexistente)
```

## Camada 6 — Planejamento de futuro (este ciclo de consolidação)

```
ÍNDICE_GERAL_CRIATIVO.md   — lista com descrição de cada documento
DOCUMENTATION_MAP.md        — este arquivo, relações entre documentos
ROADMAP_DA_IDENTIDADE.md    — estado atual → 3m → 6m → 1a → 3a → 10a
```

---

## Riscos estruturais já identificados (auditoria de 2026-06-26)

1. **Risco de divergência silenciosa em documentos "compartilhados".** Já ocorreu uma vez:
   `BACKLOG_OFICIAL.md` divergiu entre as cópias de Proceder e Japão Relativo por pelo menos um
   ciclo antes de ser detectado e corrigido nesta mesma auditoria. Mitigação: auditoria mensal
   (`02_DEPARTAMENTOS/KPI_E_RITUAIS.md`) compara as duas cópias byte a byte, não assume
   identidade.
2. **Risco de acúmulo de relatórios históricos na raiz sem pasta dedicada.** Os relatórios de
   missão (Camada 4) e os relatórios técnicos (Camada 5) crescem a cada nova missão e não estão
   sob nenhuma pasta própria (ex.: `BRANDING/HISTORICO/`) — ficam misturados com documentos
   ativos como `README.md`. Recomendação registrada (não executada nesta consolidação, para não
   arriscar quebrar as muitas referências cruzadas já existentes a esses caminhos): mover para
   uma pasta de histórico numa próxima missão de Engenharia, atualizando todas as referências no
   mesmo commit.
3. **Risco de duplicação de relatórios de asset.** `ASSET_REGISTRY.md` e `ASSET_AUDIT_REPORT.md`
   carregam as mesmas métricas, gerados no mesmo timestamp — ver nota dentro do próprio
   `ASSET_AUDIT_REPORT.md`.
4. **Risco de referência fantasma em auditoria de terceiro.** `ECOSYSTEM_FINAL_AUDIT.md` citou
   uma estrutura de pastas que nunca existiu — corrigido nesta consolidação com errata no próprio
   arquivo. Lição registrada em `DIRETORIA_CRIATIVA.md`: nenhuma referência a estrutura externa
   deve ser citada como "lida" sem verificação direta de existência.
