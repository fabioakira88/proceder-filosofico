# ARQUITETURA EDITORIAL — PROCEDER FILOSÓFICO

### Sprint 01 — Diretor Editorial (Claude) · Versão 1.0 — Proposta

> Este documento define a arquitetura intelectual definitiva do Proceder Filosófico como revista
> cultural digital. É um documento de **arquitetura**, não de conteúdo — nenhum artigo foi
> escrito, nenhum código foi alterado, nenhuma tag foi reatribuída no acervo existente. É a base
> permanente sobre a qual o projeto deve crescer a partir desta sprint.

---

## 0. Natureza da mudança — evolução, não pivot

O `DNA.md` atual define o Proceder como tradutor de "2.500 anos de pensamento filosófico" para o
desconforto contemporâneo. Esta sprint **não substitui** essa identidade — amplia o objeto de
estudo de "história da filosofia" para **civilização**, mantendo a filosofia como eixo
estruturante e o tom, o método e as 20 Leis da Marca inteiramente preservados. Nada no
`BRAND_BOOK.md`, no `MANIFESTO.md` ou nas `LEIS_DA_MARCA.md` é contradito por esta arquitetura —
ela é a extensão natural do que já estava em prática: o acervo atual já tem artigos sobre
literatura (Camões, Balzac), ciência (Einstein, Laplace), religião (Agostinho) e psicologia
social (Adorno) classificados, até hoje, como "filosofia" por falta de vocabulário taxonômico
mais preciso. Esta arquitetura dá nome ao que o projeto já estava fazendo, antes de pedir que ele
faça mais.

**Nota de governança:** por ser uma decisão de identidade (Camada 1), a adoção formal desta
arquitetura deve ser registrada em `CHANGELOG_DA_IDENTIDADE.md`, e sua adoção implica revisão
subsequente (fora do escopo desta sprint, que é só de arquitetura) de `DNA.md` (ampliar
"propósito" e "diferenciação"), `CONTENT_SYSTEM.md` (substituir a taxonomia atual por esta) e
`hubs.schema.json` (acomodar os novos campos de classificação). Esta sprint entrega a decisão de
arquitetura; a cascata de atualização dos demais documentos e do código é trabalho de Engenharia
em sprint futura, só depois de aprovação explícita do CEO.

---

## 1. Princípio editorial central

**Objeto de estudo: a civilização — entendida como a evolução das ideias humanas através do
tempo, das culturas e das formas de expressão.**

A filosofia é o eixo central porque é a disciplina que historicamente pergunta "por quê" onde as
outras perguntam "o quê", "quando" ou "como" — mas nenhuma ideia humana relevante nasceu isolada
da história, da fé, da arte ou da ciência do seu tempo. O Proceder trata cada uma das nove
disciplinas vizinhas não como conteúdo equivalente a ser produzido em paralelo, mas como **lente
de leitura de uma mesma matéria-prima**: a pergunta que um ser humano fez, e o que ela revela
sobre a condição humana.

**Regra de não-privilégio geográfico.** Nenhuma civilização, tradição ou país recebe tratamento
de "centro" com as demais como "periferia" ou "exotismo". A Grécia Antiga não é "a Antiguidade" —
é uma das antiguidades, ao lado da China, da Índia, da Pérsia, do Egito, da Mesopotâmia e das
tradições orais africanas e ameríndias. Sempre que houver pensamento documentável de uma
civilização não-ocidental dentro de um eixo cronológico, ele deve ser pautado com o mesmo rigor e
a mesma frequência relativa que o pensamento ocidental do mesmo período — esta é uma Lei de
arquitetura, não uma aspiração, e deve ser citada em qualquer briefing editorial futuro junto às
20 Leis da Marca já existentes.

---

## 2. Categorias principais — Eixos Civilizacionais

A categoria principal de cada conteúdo é **cronológico-civilizacional**, não disciplinar. Isso
preserva a lógica que o acervo já usa (hubs como `pre-socraticos` e `atenas-classica` já são
recortes de período) e evita o erro mais comum de revistas culturais que tentam navegar por
disciplina: disciplina é lente, não lugar — o mesmo artigo sobre o conceito de destino em
Sófocles é, ao mesmo tempo, Filosofia, Literatura e Religião; só tem **um** lugar civilizacional
onde mora.

| # | Categoria | Recorte temporal | Escopo (multi-civilizacional, exemplos não exaustivos) |
|---|---|---|---|
| 1 | **Origens & Mito** | Pré-história até o fim das tradições orais fundadoras | Mitologias de origem, cosmogonias, tradições orais africanas e ameríndias, Epopeia de Gilgamesh, textos egípcios e mesopotâmicos, Vedas |
| 2 | **Idade Axial** | ~800–200 a.C. | Pré-socráticos e Atenas Clássica, Confúcio e Lao Tsé, Buda, profetas hebraicos, Upanixades — o período em que múltiplas civilizações, sem contato entre si, formulam pela primeira vez perguntas sistemáticas sobre ética e existência |
| 3 | **Império & Síntese** | ~200 a.C.–500 d.C. | Roma e o Helenismo (estoicismo, epicurismo), Império Han e o confucionismo de estado, cristianismo primitivo, budismo Mahayana, sincretismos religiosos |
| 4 | **Idade da Fé** | ~500–1400 | Escolástica cristã, Idade de Ouro Islâmica (Avicena, Averróis, Al-Ghazali), neoconfucionismo, filosofia judaica medieval, teologias e místicas comparadas |
| 5 | **Razão & Descoberta** | ~1400–1789 | Renascimento, Reforma, Iluminismo europeu, mas também os impérios Mughal e Otomano, o Japão Edo, as primeiras trocas intelectuais coloniais e suas violências |
| 6 | **Ruptura & Ideologia** | 1789–1945 | Revoluções políticas, romantismo, idealismo alemão, darwinismo social, marxismo, nacionalismos, movimentos anticoloniais nascentes, psicanálise |
| 7 | **Fraturas do Presente** | 1945–hoje | Existencialismo, Escola de Frankfurt, descolonização e pensamento pós-colonial, feminismos, virada linguística, filosofia da tecnologia e da IA, pensamento indígena e africano contemporâneo |

Estas sete categorias substituem, na prática, o que hoje é só uma intuição não-formalizada no
acervo (a divisão entre os 3 hubs existentes e o restante dos 43 artigos sem categoria
estruturada). Elas são a navegação principal do site — o equivalente às "seções" de uma revista
impressa.

---

## 3. Disciplinas — o eixo transversal (as lentes)

Toda peça publicada tem **uma categoria** (onde mora, no tempo) e **uma disciplina primária**
(de que ângulo ela é lida), podendo citar disciplinas secundárias como tags quando relevante.

| Disciplina | Pergunta que formula | Quando é a lente primária |
|---|---|---|
| **Filosofia** | Por que isto é verdadeiro, justo ou bom? | Sempre que o argumento é o protagonista do texto |
| **História** | O que de fato aconteceu, e por quê naquele momento? | Quando o foco é evento, contexto material, biografia factual |
| **Antropologia** | Como esta cultura organiza sentido, parentesco, ritual? | Quando o foco é prática cultural, não doutrina |
| **Sociologia** | Como esta ideia se organiza, ou é organizada, em sociedade? | Quando o foco é estrutura social, classe, instituição |
| **Literatura** | Como esta ideia ganhou forma narrativa ou poética? | Quando o objeto é uma obra literária, não um sistema de pensamento |
| **Arte** | Como esta ideia se tornou imagem, som ou forma? | Quando o objeto é uma obra visual, musical ou arquitetônica |
| **Religião** | Como esta ideia se relaciona com o sagrado e a transcendência? | Quando o foco é doutrina, fé, prática religiosa |
| **Ciência** | Como esta ideia mudou, ou foi mudada por, o método empírico? | Quando o foco é descoberta científica e seu impacto de visão de mundo |
| **Política** | Como esta ideia organiza ou contesta o poder? | Quando o foco é Estado, soberania, ideologia, ação coletiva |
| **Psicologia** | Como esta ideia explica a vida interior humana? | Quando o foco é mente, comportamento, afeto |
| **História das Ideias** | Como este conceito viajou, mudou de forma, atravessou disciplinas? | É a disciplina dos **Ensaios** (§7) — nunca de Artigos isolados; é, por definição, transversal |

**Regra de uso:** disciplina primária é campo obrigatório de metadado, único por peça (Artigo).
Disciplinas secundárias entram como tags, sem limite rígido, mas com a mesma disciplina de
não-fragmentação já registrada em `CONTENT_SYSTEM.md` — não criar disciplina nova fora desta
lista de dez sem decisão formal de Diretoria Criativa/Editorial.

---

## 4. Subcategorias e Hubs

Cada Categoria (eixo civilizacional) se desdobra em **subcategorias**, que são o nível em que os
hubs curados (já existentes na arquitetura técnica, `hubs.json`/`hubs.schema.json`) operam.
Subcategoria é recorte mais específico dentro do mesmo período: escola de pensamento, tradição
geográfico-cultural, ou movimento.

Mapeamento dos 3 hubs hoje existentes para a nova arquitetura (sem nenhuma ação de código nesta
sprint — apenas o registro de onde cada um passa a pertencer):

| Hub atual | Categoria (novo eixo) | Subcategoria |
|---|---|---|
| `pre-socraticos` | Idade Axial | Grécia Pré-clássica |
| `atenas-classica` | Idade Axial | Grécia Clássica |
| `filosofia-da-tecnologia-e-ia` | Fraturas do Presente | Filosofia da Técnica |

Subcategorias propostas para preenchimento futuro (Fase 2 — não criadas nesta sprint, apenas
arquitetadas como espaço de crescimento coerente, para que pauta futura tenha endereço antes de
ser escrita):

- **Idade Axial:** Grécia Pré-clássica, Grécia Clássica, Pensamento Chinês Clássico (Confúcio,
  Lao Tsé, Mêncio), Pensamento Indiano Védico-Upanixádico, Profetismo Hebraico.
- **Idade da Fé:** Escolástica Cristã, Idade de Ouro Islâmica, Neoconfucionismo, Misticismos
  Comparados.
- **Ruptura & Ideologia:** Idealismo Alemão, Pensamento Anticolonial Nascente, Psicanálise
  Fundadora.
- **Fraturas do Presente:** Existencialismo, Escola de Frankfurt, Pensamento Pós-colonial,
  Filosofia da Técnica (já existe), Filosofias Indígenas e Africanas Contemporâneas.

Cada subcategoria, quando ativada, segue o schema já existente de hub (`id`, `slug`, `type`,
`title`, `label`, `description`, `intro`, `metaTitle`, `metaDescription`, `image`, `updatedISO` +
`tag`/`postSlugs`) — não é necessário um schema novo, apenas povoar o existente dentro da nova
hierarquia de Categoria → Subcategoria.

---

## 5. Sistema de tags

Três famílias de tag, nunca misturadas em um campo único (correção de uma fragilidade já
documentada em `CONTENT_SYSTEM.md`, onde 19 tags hoje misturam níveis diferentes de
especificidade):

1. **Conceitos/Temas** — o eixo de sentido que atravessa disciplinas e categorias: Liberdade,
   Tempo, Poder, Linguagem, Técnica, Morte, Justiça, Beleza, Self/Identidade, Sagrado, Corpo,
   Natureza Humana, Memória, Desejo. É a camada que sustenta os **Ensaios** e as futuras
   **Linhas de Pensamento** (§8).
2. **Pensadores/Figuras** — nome próprio, sempre sincronizado com a galeria de figuras
   (`philosophers.js`, hoje restrita a filósofos; nesta arquitetura, deve crescer para incluir
   também historiadores, artistas, cientistas e religiosos relevantes — já existem categorias
   vazias "Cientistas" e "Pensadores Contemporâneos" no array órfão `mestreCategories`,
   identificadas na auditoria de Sprint 0, que podem ser a base de expansão quando essa
   reconciliação técnica acontecer).
3. **Tradição Cultural-Geográfica** — usada com parcimônia, apenas quando o recorte geográfico é
   relevante para a compreensão (ex.: "Grécia", "China Clássica", "Mundo Árabe-Islâmico",
   "África Subsaariana", "Américas Pré-Coloniais"), nunca como navegação principal — existe para
   permitir busca e relacionamento, não para criar hierarquia de "seções por país", o que
   violaria a regra de não-privilégio geográfico do §1.

**Regra permanente:** nenhuma tag nova de Conceito/Tema é criada sem verificar que nenhuma das
já existentes cobre o espaço — mesma disciplina já em vigor para a taxonomia atual.

---

## 6. Estrutura dos artigos

O formato curto-médio já validado pelo acervo (43 textos, ~1.200–2.000 palavras) permanece
**inalterado em forma** — abre com pergunta ou afirmação que provoca, desenvolve com precisão
histórica ancorada em uma figura/conceito específico, devolve a pergunta à vida do leitor no
fechamento (Leis nº 2 e nº 16). O que muda é o metadado obrigatório por trás de cada peça:

```
categoria        → 1 dos 7 eixos civilizacionais (§2)            [obrigatório]
subcategoria      → hub/escola/tradição dentro da categoria (§4)  [opcional, se já existir]
disciplina        → 1 das 10 disciplinas (§3)                     [obrigatório]
disciplinas_secundarias → array, 0–3 disciplinas adicionais        [opcional]
pensadores        → array de figuras citadas como protagonistas    [obrigatório, mín. 1]
conceitos         → array de tags de Conceito/Tema (§5.1)         [obrigatório, mín. 1]
tradicao_cultural → tag geográfico-cultural, se relevante (§5.3)  [opcional]
periodo           → datas/século                                  [obrigatório]
```

Este metadado é o que hoje existe parcialmente (`category` em apenas 8 dos 43 artigos) e deve ser
retroanotado no acervo existente **antes** de qualquer artigo novo ser pautado sob esta
arquitetura — mesma regra já fixada em `CONTENT_SYSTEM.md`, agora com vocabulário definitivo em
vez de provisório.

---

## 7. Estrutura dos ensaios — o novo formato-bandeira

**O Ensaio é o que separa uma revista cultural de um blog.** É um tipo de conteúdo novo,
distinto do Artigo:

| | Artigo | Ensaio |
|---|---|---|
| Extensão | 1.200–2.000 palavras | 3.000–6.000 palavras |
| Protagonista | Um pensador ou conceito | Uma ideia atravessando o tempo |
| Categoria | Uma (eixo civilizacional fixo) | Pode atravessar múltiplas categorias |
| Disciplina | Uma primária | Usa "História das Ideias" como modo, combinando 2+ disciplinas |
| Estrutura | Pergunta → desenvolvimento → devolução | Seções nomeadas, cada uma um "ponto de virada" da ideia no tempo |
| Frequência | Pauta regular | Peça de prestígio, frequência deliberadamente baixa (qualidade sobre quantidade — Valor já fixado em `AION_STUDIO_MANUAL.md`) |
| Função na Home | Card no acervo | Capa / destaque editorial (§10) |

Exemplo de espinha dorsal de Ensaio (ilustrativo, não é pauta encomendada nesta sprint): *"A Ideia
de Liberdade: do Estoicismo Romano ao Existencialismo Francês, passando pelo Conceito Africano de
Ubuntu"* — três categorias (Império & Síntese, Fraturas do Presente, e uma quarta tradição não
datada cronologicamente do mesmo modo, tratada como contraponto), uma disciplina-modo (História
das Ideias), múltiplos pensadores, um conceito-eixo (Liberdade).

Cada Ensaio publicado deve, ao final, linkar para os Artigos do acervo que tocam os mesmos
pensadores/conceitos — é o mecanismo que ativa as Linhas de Pensamento do §8.

---

## 8. Relacionamento entre conteúdos

Quatro camadas de relação, da mais simples à mais editorial:

1. **Categoria → Subcategoria → Hub.** Relação estrutural já existente, agora com hierarquia
   formal (§2–4).
2. **"Ver também" automático.** Artigos que compartilham `pensadores` ou `conceitos` se
   recomendam entre si — relação mecânica, baseada em metadado, sem curadoria manual.
3. **Hubs.** Curadoria estática por subcategoria — já existente, mantida.
4. **Linhas de Pensamento (novo).** Trilha editorial curada manualmente, ancorada em um
   `conceito` do §5.1, atravessando categorias e disciplinas deliberadamente — é a
   materialização navegável da "História das Ideias" como modo de leitura, e o destino natural
   para onde um Ensaio aponta. Diferente do Hub (que é "tudo sobre uma escola/período"), a Linha
   de Pensamento é "a evolução de uma única ideia", podcast-like em estrutura: capítulo 1, 2, 3...
   Tecnicamente, pode reutilizar o mesmo schema de hub (`type: "curated"`) com um `conceito` como
   identificador em vez de `tag` de período — decisão de implementação fica para Engenharia, fora
   do escopo desta sprint.

---

## 9. Fluxo editorial

Aplicação do fluxo universal já fixado em `AION_STUDIO_MANUAL.md`
(Pesquisa → Arquitetura → Direção Criativa → Implementação → Validação → Publicação →
Monitoramento → Otimização → Documentação) à unidade de trabalho "peça editorial":

1. **Pauta.** Toda pauta nova declara, antes de ser escrita: categoria, disciplina primária,
   pensador(es)-âncora, conceito-âncora, e se é Artigo ou Ensaio. Pauta sem essa declaração não
   é aceita — elimina retrabalho de classificação posterior.
2. **Apuração.** Precisão histórica é inegociável (Lei nº 17) — checagem de datas, atribuições e
   correntes antes da escrita, com atenção redobrada a tradições não-ocidentais, onde o risco de
   generalização rasa é maior por menor familiaridade do redator médio.
3. **Escrita.** Segue a estrutura do §6 (Artigo) ou §7 (Ensaio).
4. **Classificação.** Metadado completo do §6 preenchido — não pode ficar parcial como hoje
   ocorre com `category` em apenas 8 dos 43 artigos atuais.
5. **Revisão de identidade.** Checklist de 5 perguntas já existente em `GOVERNANCE.md` (DNA,
   Brand Book, Design System, UX System, Content System) — Content System, a partir da adoção
   desta arquitetura, passa a ser este documento.
6. **Publicação.**
7. **Relacionamento.** Vínculo manual a Hub e/ou Linha de Pensamento relevante — nunca publicar
   peça nova "solta", sem ao menos uma conexão estrutural ativada.
8. **Monitoramento e Otimização.** Conforme já praticado (SEO, Core Web Vitals).
9. **Documentação.** Toda peça nova que inaugura uma subcategoria, Linha de Pensamento ou
   tradição cultural ainda não presente no acervo deve gerar uma linha de atualização neste
   documento — ele é vivo, não congelado na data de hoje.

---

## 10. Organização da Home — revista, não blog

O padrão que sinaliza "blog" é a grade cronológica reversa como elemento dominante da página
inicial. O padrão que sinaliza "revista cultural internacional" é hierarquia editorial deliberada
— alguém decidiu o que importa mais esta semana, o algoritmo não decidiu por ordem de data.
Proposta de estrutura, de cima para baixo:

1. **Capa.** Um único destaque em tela cheia — Ensaio ou Artigo escolhido editorialmente, com
   imagem de página inteira, título grande (escala `.hero-name`, já no Design System), sem
   competir visualmente com mais nada. Nunca um carrossel de "últimos artigos" nesta posição —
   é o erro mais comum que faz um site parecer blog.
2. **Em Pauta.** 3 a 5 peças selecionadas manualmente (não as "mais recentes" automaticamente) —
   o equivalente ao sumário de uma edição impressa. Pode misturar categorias diferentes de
   propósito, para comunicar amplitude civilizacional desde a primeira rolagem.
3. **Seções (os 7 Eixos Civilizacionais).** Navegação primária do masthead — substitui a atual
   estrutura de menu (Início/Artigos/Filósofos/Sobre) por uma lógica de seções de revista. Cada
   seção, ao ser clicada, abre um índice cronológico-temático daquele eixo, não uma lista plana.
4. **Linha de Pensamento em destaque.** Uma trilha por vez, com sua narrativa visual própria
   (capítulo 1 de N, com indicação clara de progressão) — é o elemento que mais comunica
   "pensamento contínuo" em vez de "posts soltos".
5. **Hubs/Subcategorias em exploração.** Vitrine dos hubs ativos, com a regra já fixada em
   `DECISAO_HOME_OFICIAL.md`: nenhum card sem destino real — toda esta seção responde ao próprio
   teste de 5 critérios já documentado (destino real, rota existente, conteúdo relacionado, UX
   funcional, coerência de SEO).
6. **Biblioteca.** Acesso à biblioteca de livros, hoje já existente — mantém-se como seção
   própria, mas sob revisão de identidade visual já apontada na auditoria de Sprint 0 (tema claro
   e cards de loja contradizem a Lei nº 13; fora do escopo desta sprint, registrado para a
   Missão 7 do `BACKLOG_OFICIAL.md`).
7. **Newsletter.** CTA discreto, nunca interrupção (Lei nº 13), ao final, não como pop-up.

**O que esta Home deliberadamente não tem:** contador de visualizações, "mais lidos da semana"
como ranking social (Lei nº 18), grade infinita de cards idênticos, qualquer elemento de urgência
(Lei nº 4). A sensação-alvo é a mesma já fixada no Brand Book — "atravessar a porta de uma
biblioteca fechada à noite" — aplicada agora a uma redação de revista, não a um blog de posts.

---

## 11. Migração do acervo atual — princípio, não execução

Esta sprint não reclassifica os 43 artigos existentes — é decisão de arquitetura, a execução é
trabalho de Engenharia/Conteúdo em sprint futura. O princípio de migração, para quando ela
ocorrer:

1. Nenhum artigo perde URL, slug ou conteúdo nesta migração — é apenas adição de metadado.
2. Os 8 artigos hoje com `category` estruturado servem de modelo-piloto de classificação no novo
   vocabulário antes de estender aos outros 35.
3. Os 16 artigos hoje órfãos de `philosophers.js` (pré-socráticos com artigo próprio, Hegel,
   Schopenhauer, Espinosa, Confúcio, Mill, Laplace, Einstein, Adorno, Balzac, Camões — já
   identificados na auditoria de Sprint 0) são, sob esta arquitetura, o primeiro teste real da
   multi-disciplinaridade: Camões e Balzac migram para disciplina primária Literatura; Einstein e
   Laplace para Ciência; Confúcio abre a subcategoria "Pensamento Chinês Clássico" dentro de
   Idade Axial — nenhum deles precisa mais ser forçado a caber em "filosofia" para ter lugar no
   acervo.
4. Aristóteles (cadastrado com retrato, sem artigo próprio — maior gap individual já identificado)
   permanece prioridade de pauta, agora também classificável como ponte entre Idade Axial
   (categoria) e Ciência + Política como disciplinas secundárias — um ângulo de pauta que esta
   arquitetura torna mais evidente do que a taxonomia anterior permitia ver.

---

## 12. Próximos passos e governança

Esta arquitetura é uma **proposta de Diretoria Editorial**, não uma decisão final — segue o
Protocolo de Decisão do Ecossistema já fixado em `GOVERNANCE.md`: passou pela etapa de Identidade
(este documento); falta validação de Arquitetura (ChatGPT, se aplicável à integração com outros
produtos do ecossistema), Engenharia (Codex, viabilidade de schema/dados) e decisão final de
Fábio. Até essa decisão final:

- Nenhum artigo novo deve ser pautado fora da taxonomia atual sem aviso explícito de que está
  testando o vocabulário novo.
- Nenhuma alteração de `DNA.md`, `BRAND_BOOK.md`, `CONTENT_SYSTEM.md` ou `hubs.schema.json` deve
  ser feita a partir deste documento sem essa aprovação — ele é a base, não o gatilho automático
  de reescrita dos demais.
- Após aprovação, a ordem recomendada de cascata é: `CONTENT_SYSTEM.md` (substituir taxonomia) →
  `DNA.md`/`BRAND_BOOK.md` (ampliar propósito e diferenciação, preservando texto fundador onde
  possível) → `hubs.schema.json` (acomodar `categoria`/`disciplina` como campos formais) →
  retroanotação do acervo (§11) → execução visual da nova Home (§10), nesta ordem, nunca a
  última etapa antes das anteriores.
