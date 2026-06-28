# AION STUDIO — MANUAL OPERACIONAL DA EMPRESA

### Versão 1.0 — 2026-06-26

> Documento compartilhado, cópia idêntica em `JAPAO_RELATIVO:/BRANDING/AION_STUDIO_MANUAL.md`.
> Este é o nível 3 do ecossistema — a camada que governa os outros dois:
> **Nível 1 (Produtos):** Proceder Filosófico, Japão Relativo, Akira (perfil pessoal de Fábio
> Akira), projetos futuros.
> **Nível 2 (Equipe):** Claude, Codex, Manus, ChatGPT, Beelzebub — já formalizada em
> `GOVERNANCE.md` de cada projeto.
> **Nível 3 (Empresa):** AION Studio — este documento.
>
> A pasta `AION_Studio/` em `DIGITAL_PROJECTS:/` **não é** esta empresa — contém hoje um projeto
> não relacionado ("Rocket Design", site institucional de UX/UI/branding). Por decisão
> registrada em `CHANGELOG_DA_IDENTIDADE.md` (2026-06-26), este manual vive como documento
> compartilhado dentro de `BRANDING/` de cada produto, não numa pasta própria, até que essa
> colisão de nome seja resolvida.

---

## Propósito

A AION Studio existe para construir patrimônio digital de longo prazo. Não desenvolve apenas
sites — constrói ecossistemas digitais sustentáveis, escaláveis e orientados por conhecimento.
Todo projeto deve aumentar o patrimônio intelectual, tecnológico e financeiro do ecossistema.

## Missão

Projetar, construir, documentar, automatizar e evoluir ativos digitais capazes de permanecer
relevantes durante muitos anos.

## Visão

Ser uma empresa que opera como um sistema. Cada projeto deve melhorar continuamente através de
processos, documentação e inteligência artificial.

## Valores

- Clareza acima da complexidade.
- Sistema acima da improvisação.
- Patrimônio acima da viralização.
- Longo prazo acima do imediatismo.
- Documentação acima da memória.
- Automação acima da repetição.
- Conhecimento acima da opinião.
- Qualidade acima da quantidade.

---

## Ecossistema

**Marca institucional:** AION Studio.

**Projetos (Nível 1):**
- Proceder Filosófico
- Japão Relativo
- Akira (perfil pessoal — ainda sem auditoria de identidade/governança própria; precisa do
  mesmo tratamento dado aos outros dois antes de ser tratado como produto maduro do ecossistema)
- Projetos futuros

---

## Organograma

```
                    AION STUDIO (Nível 3 — Empresa)
                            |
        +-------------------+-------------------+
        |                                       |
  EQUIPE (Nível 2)                       PRODUTOS (Nível 1)
        |                                       |
   Fábio Akira (CEO)                  Proceder Filosófico
   Claude (Diretor Criativo)           Japão Relativo
   ChatGPT (Arquiteto do Ecossistema)  Akira
   Codex (Engenheiro)                  Projetos futuros
   Manus (Analista de Inteligência)
   Beelzebub (Chief Operating System)
```

---

## Responsabilidades

### Fábio Akira — CEO
Visão, decisão final, aprovação.

### Claude — Diretor Criativo
Branding, identidade, UX, linguagem, direção criativa. Mantém a documentação de `BRANDING/`
de cada produto e é a única autoridade sobre identidade visual, tipografia, paleta e padrão
estrutural — conforme já formalizado em `GOVERNANCE.md` de cada projeto. Este manual não
substitui aquela governança; é a camada que a contextualiza dentro da empresa. Funcionamento
detalhado do departamento (missão, autoridade, limites, processos, KPIs, rituais, RFCs,
boot sequence) em `02_DEPARTAMENTOS/DIRETORIA_CRIATIVA.md`.

### ChatGPT — Arquiteto do Ecossistema
Arquitetura, estratégia, processos, integração entre projetos e agentes, governança.

### Codex — Engenheiro
Engenharia, implementação, SEO técnico, performance, qualidade. Funcionamento detalhado do
departamento (missão, responsabilidades, DoD, KPIs, auditorias técnicas, saneamento, assets,
SEO técnico, deploy, GitHub, performance, acessibilidade, segurança, versionamento, backups e
critérios de qualidade) em `02_DEPARTAMENTOS/ENGENHARIA.md`.

### Manus — Analista de Inteligência
Inteligência, pesquisa, concorrência, SEO, monetização, tendências.

### Beelzebub — Chief Operating System (COS)

Diferente dos outros papéis: não é um especialista de área, é quem mantém a operação girando.
Enquanto Claude pensa, Manus pesquisa, ChatGPT organiza e Codex constrói, o Beelzebub pergunta
constantemente **"o que está parado?"**.

Funções previstas:
- orquestrar agentes;
- sincronizar calendários;
- integrar APIs;
- executar fluxos;
- atualizar Notion;
- monitorar tarefas;
- distribuir trabalho;
- gerar relatórios;
- iniciar rotinas programadas;
- acompanhar indicadores (Analytics, Search Console, redes sociais, GitHub, calendário
  editorial);
- manter o ecossistema funcionando mesmo quando nenhum projeto específico estiver em
  desenvolvimento ativo;
- garantir continuidade operacional.

**Beelzebub nunca substitui decisão humana — executa os processos definidos pela AION Studio.**

**Estado real verificado vs. visão (2026-06-26):** já existe implementação própria em
`PROCEDER_FILOSOFICO:/BELZEBU/` — um orquestrador editorial real, hoje classificado como
"MVP 0.5", que roda em quatro modos seguros (`dry-run`, `generate-only`, `review-only`,
`publish-local-jr`), lê pautas reais do Notion, mas **explicitamente não altera os sites, não
cria commits automaticamente e não executa deploy** (`BELZEBU/README.md`). Ou seja: a função de
"Chief Operating System" descrita acima é a visão de destino, não o estado atual. Hoje o
Beelzebub real só gera drafts/relatórios locais e lê Notion em modo seguro — orquestração de
todos os outros agentes, monitoramento de indicadores externos (Analytics, Search Console,
redes sociais) e rotinas programadas ainda não existem implementadas. Qualquer relatório futuro
que descreva o Beelzebub como "operacional" precisa especificar qual subconjunto dessas funções
foi de fato implementado e validado — nunca assumir a lista completa como concluída.

---

## Princípio operacional

Toda tarefa deve seguir o fluxo:

```
Pesquisa → Arquitetura → Direção Criativa → Implementação → Validação →
Publicação → Monitoramento → Otimização → Documentação
```

Este fluxo é a versão "ciclo de vida de uma tarefa" do mesmo princípio já formalizado como
"Protocolo de decisão do ecossistema" em `GOVERNANCE.md` (Inteligência → Arquitetura →
Identidade → Engenharia → Decisão final) — um descreve a sequência de etapas de uma entrega, o
outro descreve a ordem de autoridade quando há divergência entre agentes. Os dois coexistem e
não se contradizem: a Direção Criativa (Claude) continua sendo o ponto em que identidade pode
bloquear ou exigir alternativa, em qualquer um dos dois fluxos.

## Processos

Todo projeto deve possuir:
- documentação;
- backlog;
- changelog;
- Definition of Done;
- governança;
- auditorias;
- sistema de assets;
- SEO;
- funil;
- automações.

**Estado real (2026-06-26):** Proceder Filosófico e Japão Relativo já têm documentação,
backlog (`BACKLOG_OFICIAL.md`), changelog, Definition of Done e governança formalizados em
`BRANDING/`. Sistema de assets, SEO, funil e automações têm graus de maturidade desiguais entre
os dois projetos e ainda não foram auditados com o mesmo rigor — não assumir completos só
porque a lista acima existe como processo desejado.

## Melhoria contínua

Cada departamento deve gerar periodicamente um relatório de evolução. Nenhuma melhoria é
implementada sem passar pelo fluxo de decisão (`GOVERNANCE.md`, "Protocolo de decisão do
ecossistema").

## Objetivo final

Transformar a AION Studio em uma empresa orientada por sistemas, onde pessoas e inteligências
artificiais trabalham de forma coordenada para criar ativos digitais cada vez mais valiosos.
