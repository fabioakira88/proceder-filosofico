# BRIEFING DE IMPLEMENTAÇÃO — PROCEDER FILOSÓFICO

> Resumo operacional para quem implementa (Codex). A documentação completa e o raciocínio por trás de cada regra vivem em `BRANDING/` (DNA, Brand Book, Manifesto, Leis, Design System, UX System, Content System) e são mantidos pelo Diretor Criativo (Claude). Este briefing não substitui aqueles documentos — qualquer dúvida de "por quê", consultar o original.

## Identidade em uma frase

Biblioteca digital com estética de museu noturno: ensaios longos ancorados em filósofos/conceitos específicos, nunca lista de dicas, nunca autoajuda, nunca rede social.

## Tokens visuais (usar sempre os do template de artigo — não os da Home, que divergem)

- `--azul-profundo: #060D1E` · `--azul-escuro: #061E47` · `--azul-real: #0B3D91`
- `--dourado: #C9A84C` · `--dourado-claro: #E6D28A`
- `--branco: #F7F3EA` · `--branco-suave: #E8E1D2`
- `--cinza-claro: #B8B3A8` · `--cinza-medio: #8A8478`
- `--borda-dourada: rgba(201,168,76,.18)`
- Tipografia: Playfair Display (títulos, peso 700) + Lato (corpo) + Cinzel (labels/caixa-alta).
- Card: borda dourada translúcida, `border-radius` 8–9px, hover `translateY(-6px)` + borda dourada sólida + sombra.

## Regras de UX que não podem ser quebradas

- Card com aparência clicável sempre tem destino real — nunca decorativo (ver os 6 cards mortos já identificados em "Conteúdo Exclusivo" na Home — não replicar esse padrão em nada novo).
- Artigo indexável sempre existe como página estática própria em `/artigos/<slug>/`, nunca só como overlay.
- Qualquer listagem (filósofos, artigos, hub) sempre mostra a contagem real cadastrada nos dados — nunca um filtro invisível reduz o que aparece sem motivo documentado.
- Proibida qualquer gamificação social (ranking, streak, badge).

## Regras de conteúdo que não podem ser quebradas

- Slug sempre kebab-case sem acento.
- Nova figura em `philosophers.js` só entra com retrato e, idealmente, plano de artigo — não criar entrada vazia.
- Nova tag editorial só depois de verificar se uma das 19 existentes já cobre o espaço.
- Precisão histórica é inegociável — verificar data, atribuição e corrente antes de publicar.

## SEO mínimo obrigatório em página nova

Title + meta description + canonical + Open Graph completo + JSON-LD (`Article` em artigo, `CollectionPage`+`ItemList`+`BreadcrumbList` em hub/listagem). Esse é o padrão já maduro nos 43 artigos individuais — replicar sempre, inclusive na Home, que hoje está abaixo desse padrão.

## Atenção: produção ≠ repositório local

Nunca tratar uma tarefa como "publicada" só porque o arquivo local foi alterado. `procederfilosofico.com.br` roda uma versão diferente hoje. Qualquer tarefa que mencione "deploy" exige checagem explícita com o Diretor Criativo antes de qualquer ação em produção — ver `CONTENT_SYSTEM.md` e `GOVERNANCE.md`.

## Antes de implementar qualquer coisa nova

Perguntar: isso já existe em algum padrão documentado? Se sim, copiar o padrão, não criar um novo. Se a tarefa exigir um padrão visual, de UX ou editorial que não está aqui nem nos 7 documentos completos, **parar e perguntar ao Diretor Criativo antes de decidir por conta própria.**
