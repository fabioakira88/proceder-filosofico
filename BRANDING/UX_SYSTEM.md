# UX SYSTEM — PROCEDER FILOSÓFICO

> Referência de comportamento e interação, baseada em auditoria factual do JavaScript e da navegação do projeto. Nenhuma alteração de código foi feita para produzir este documento, exceto a correção pontual já registrada em `CHANGELOG_DA_IDENTIDADE.md` (filtro de categoria em `/filosofos/`).

## Leitura: overlay na Home, página estática nos artigos individuais

Dois padrões coexistem, e os dois são intencionais — não confundir um com o outro:

- **Na Home**, `openPost(slug)` abre um overlay (`#postReaderOverlay`) com o conteúdo do artigo, sem recarregar a página, com URL atualizada via `history.pushState`. É o padrão certo para descoberta rápida a partir da Home.
- **Em `/artigos/<slug>/`**, cada artigo é uma página HTML estática própria, pré-renderizada com SEO completo (title, OG, JSON-LD `Article`). É o padrão certo para indexação e compartilhamento — nunca deve depender de JavaScript para existir.

Qualquer nova forma de "abrir" conteúdo deve escolher um desses dois padrões conforme o contexto (descoberta vs. leitura indexável), nunca inventar um terceiro.

## `/filosofos/`: agrupamento por categoria, busca por texto

A página lista as 40 figuras de `philosophers.js` agrupadas por categoria (Filósofos, Sofistas, Poetas, Dramaturgos, Historiadores, Escritores, Sociólogos, Artistas), com um campo de busca que filtra por nome, período, categoria, corrente ou texto da bio. **Histórico relevante:** até a correção registrada nesta documentação, um filtro de categoria escondia 22 das 40 figuras (só "Filósofos" e "Sofistas" apareciam). Está corrigido — todas as 40 aparecem, em 8 seções. Qualquer alteração futura a essa página precisa manter a contagem total visível igual à contagem total cadastrada em `philosophers.js`; isso é testável e deve ser validado a cada mudança.

## Cards "decorativos" vs. cards clicáveis — risco de UX já identificado

Na seção "Conteúdo Exclusivo" da Home, 6 de 9 cards não têm `href` nem `onclick` — são `<div>` puramente decorativos, enquanto os outros 3 abrem um artigo via `openPost()`. Visualmente, os 9 cards parecem igualmente clicáveis (mesmo hover, mesma estrutura). Isso é uma divergência de UX a resolver: ou os 6 cards decorativos ganham destino real, ou perdem a aparência de clicáveis (cursor, hover). Nenhuma página nova deve repetir esse padrão — todo elemento com aparência de card clicável precisa ter destino real.

## Hubs de conteúdo (`/conteudo/`, `pre-socraticos/`, `atenas-classica/`)

Esqueleto: breadcrumb → hero com label/h1/descrição → grade de cards de artigo → "filósofos desta categoria" → categorias relacionadas. Esse esqueleto é a referência correta para qualquer hub novo.

## `biblioteca.html`: filtros e abas

Usa abas (Brasil/EUA) e botões de filtro por categoria, grade com `auto-fill`. É a página com maior divergência visual do site (tema claro, cards com botão de compra inline) — funcionalmente está correta, mas deve ser tratada como prioridade de realinhamento visual, não como referência de padrão para novas páginas.

## Breakpoints

Não há um arquivo único de variáveis de breakpoint — cada página declara os próprios `@media`. Página nova deve seguir os breakpoints já usados pelo template de artigo (mais consistente), não inventar novos valores.

## Regras de UX a preservar

1. Card com aparência clicável sempre tem destino real — nunca decorativo disfarçado de interativo.
2. Contagem exibida de qualquer listagem (filósofos, artigos, hub) sempre é igual à contagem cadastrada nos dados — nunca um filtro invisível reduz silenciosamente o que aparece.
3. Artigo indexável (compartilhável, buscável no Google) sempre existe como página estática própria — nunca só como conteúdo de overlay.
4. Nenhuma forma de gamificação social (ranking de leitura, contador de popularidade) deve ser introduzida em nenhuma página.
