# MISSION PF — Biblioteca Taxonomica de Pensadores

## Resumo

A antiga pagina visual de `Filósofos` foi reorganizada como **Biblioteca de Pensadores**, preservando a URL publica `/filosofos/` para nao quebrar links, SEO, sitemap ou referencias existentes.

O shell global foi preservado. A mudanca no header/footer/nav foi apenas textual: o item visivel passou de `Filósofos` para `Pensadores`.

## Arquivos alterados

| Arquivo | Alteracao |
| --- | --- |
| `SITE/filosofos/index.html` | Titulo, metadados, filtros, subfiltros filosoficos, acordeoes responsivos, busca ampliada e taxonomia nos cards. |
| `AUTOMATION/generate_seo.mjs` | Label do shell gerado alterado para `Pensadores`, evitando regressao em artigos/categorias/Home. |
| HTMLs gerados em `SITE/` | Regenerados/ajustados para refletir `Pensadores` no nav/footer quando apontam para `/filosofos/`. |

## O que foi implementado

| Item | Status | Observacao |
| --- | --- | --- |
| Renomeacao visual para Pensadores | OK | URL mantida como `/filosofos/` por compatibilidade. |
| Cabecalho editorial | OK | Agora usa `Biblioteca de Pensadores`. |
| Busca global | OK | Pesquisa nome, categoria, periodo, tradicao, tags, bio e ideias centrais. |
| Filtros de categoria | OK | Todos, Filosofos, Sociologos, Historiadores, Escritores, Poetas, Dramaturgos, Artistas, Cientistas, Teologos/Misticos, Criticos culturais e Outros. |
| Subfiltros de Filosofos | OK | Sofistas, classicos, helenisticos, medievais, modernos, iluministas, idealistas, contemporaneos, filosofia politica, moral e existencial. |
| Acordeoes responsivos | OK | Secoes clicaveis/teclado; no mobile podem ficar recolhidas para reduzir scroll. |
| Cards atuais preservados | OK | Nenhum card foi removido. |
| Identidade visual | OK | Paleta, tipografia e shell preservados. |

## Pendencias editoriais

| Pendencia | Recomendacao |
| --- | --- |
| `Pré-socráticos`, `Filosofia oriental` e `Outros pensadores` | Existem como filtros preparados, mas dependem de novos cards/perfis para ficarem ricos. |
| Paginas individuais de pensadores | Estrutura dos cards esta pronta, mas perfis completos devem entrar em lote proprio. |
| URL canonica futura `/pensadores/` | Pode ser considerada depois, com redirect/canonical cuidadoso. Nesta missao foi evitada para nao quebrar rotas. |

## Como testar no navegador

1. Abrir `/filosofos/`.
2. Confirmar titulo `Pensadores` e label `Biblioteca de Pensadores`.
3. Clicar em `Poetas`, `Sociólogos`, `Historiadores` e `Artistas`.
4. Clicar em `Filósofos` e testar subfiltros como `Clássicos`, `Medievais`, `Idealistas` e `Filosofia moral`.
5. Buscar por termos como `Nietzsche`, `dialética`, `tragédia`, `burocracia`, `renascimento` e `vontade`.
6. No mobile, confirmar que filtros aparecem no topo e reduzem a necessidade de scroll longo.

## Veredito

A pagina agora funciona como uma biblioteca intelectual escalavel, nao apenas como lista longa de cards.
