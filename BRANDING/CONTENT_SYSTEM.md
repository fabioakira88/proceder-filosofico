# CONTENT SYSTEM — PROCEDER FILOSÓFICO

> Referência editorial baseada em auditoria factual de `posts.js` (43 artigos), `philosophers.js` (40 figuras), `hubs.json`/`hubs.schema.json`, os 3 hubs em `CONTENT/hubs/` e os 7 briefings em `CONTENT/briefings/`. Nenhuma alteração de conteúdo foi feita.

## Taxonomia atual (19 tags, 43 artigos)

19 tags distintas, com forte fragmentação: 11 das 19 têm apenas 1 artigo. As mais usadas são Filosofia Clássica (10), Filosofia Moderna (7) e Filosofia da Tecnologia (4). O campo `category` estruturado só existe em 8 dos 43 artigos (os mais recentes) — não é sistemático ainda. Campos `subcategory`, `philosophers`, `period` e `format`, propostos nos briefings de arquitetura, não existem em nenhum artigo. Qualquer expansão de conteúdo deve retroanotar esses campos nos artigos antigos antes de criar mais tags novas — criar tag nova sem isso aumenta a fragmentação, não resolve.

## Divergência crítica entre `philosophers.js` e o acervo de artigos

16 dos 43 artigos publicados são sobre pessoas que **não constam** em `philosophers.js`: todos os pré-socráticos com artigo próprio (Tales, Heráclito, Demócrito, Leucipo, Zenão, Empédocles), além de Hegel, Schopenhauer, Espinosa, Confúcio, John Stuart Mill, Laplace, Einstein, Adorno, Balzac, Camões. Esses pensadores têm retrato disponível no banco de imagens em pelo menos 13 dos 16 casos (ver auditoria anterior) — a ausência não é falta de material, é falta de sincronização do arquivo de dados.

**Caso inverso:** Aristóteles está cadastrado em `philosophers.js` com retrato, mas não tem artigo — é citado em 11 outros artigos sem nunca ser o protagonista de um texto próprio. É hoje o maior gap individual de pauta do acervo.

## `philosophers.js`: estrutura e cobertura

40 figuras, 8 categorias (Filósofos, Sofistas, Poetas, Dramaturgos, Historiadores, Artistas, Escritores, Sociólogos). 23 das 40 têm retrato definido; 17 estão sem imagem. O array `mestreCategories` (30 figuras, usado por uma versão duplicada e hoje órfã de código na Home) e o array `philosophers` (40 figuras, usado por `/filosofos/`) divergem em tamanho — qualquer nova figura adicionada precisa entrar no array `philosophers`, que é o canônico e completo.

## Hubs (`hubs.json`)

3 hubs publicados: `pre-socraticos` (curated), `atenas-classica` (curated), `filosofia-da-tecnologia-e-ia` (category). Schema exige `id`, `slug`, `type`, `title`, `label`, `description`, `intro`, `metaTitle`, `metaDescription`, `image`, `updatedISO`, mais `tag` ou `postSlugs` conforme o tipo. Qualquer hub novo deve seguir exatamente esse schema — não criar campo novo sem atualizar `hubs.schema.json` antes.

## Slugs

100% kebab-case, sem acento, nos 43 artigos atuais — manter sem exceção.

## Método editorial já em prática (briefings)

Os briefings de `CONTENT/briefings/` já demonstram método maduro: diagnóstico do estado atual antes de propor mudança, mapeamento de filósofo→escola→período→artigo, identificação explícita de artigos órfãos (sem link de entrada) e risco de canibalização de SEO entre artigos próximos. Esse método — diagnosticar antes de propor — deve ser o padrão de qualquer briefing futuro, não só dos já escritos.

## Divergência produção vs. repositório local (risco maior que qualquer detalhe de taxonomia)

A arquitetura de três eixos (Artigos/Filósofos/Conteúdo) descrita aqui e nos briefings existe hoje **apenas localmente**. A produção (`procederfilosofico.com.br`) roda uma versão anterior, estruturalmente diferente: artigos e cards diferentes dos 43 atuais, sem as rotas `/artigos/`, `/filosofos/`, `/conteudo/`, `/sobre/` (todas retornam 404 em produção hoje), com conteúdo (ex.: "J.M. Barrie e a Síndrome de Peter Pan", "A Montanha Contra a Caverna") que não existe em nenhum arquivo deste repositório. Nenhuma decisão de conteúdo deve assumir que o que está aqui já é o que o leitor real vê — isso só será verdade depois de um deploy deliberado e auditado, com plano de consolidação do conteúdo hoje exclusivo de produção.

## O que fortalece a marca

- Retroanotar metadados estruturados (`category`, `philosophers`, `period`) nos artigos antigos antes de criar conteúdo novo.
- Sincronizar `philosophers.js` com o acervo real de artigos antes de expandir qualquer galeria.
- Pautar Aristóteles como prioridade — maior gap de visibilidade do acervo.

## O que enfraquece a marca

- Criar tag nova quando uma existente (ainda que fragmentada) já cobre o espaço.
- Adicionar filósofo a `philosophers.js` sem retrato e sem plano de artigo, perpetuando a divergência hoje existente.
- Tratar o estado do repositório local como equivalente ao estado real de produção.
