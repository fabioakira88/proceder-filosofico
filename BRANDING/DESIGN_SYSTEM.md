# DESIGN SYSTEM — PROCEDER FILOSÓFICO

> Referência visual baseada em auditoria factual de `SITE/index.html`, `SITE/filosofos/index.html`, `SITE/artigos/index.html` + artigos individuais, `SITE/conteudo/` (índice e hubs), `SITE/sobre/index.html` e `biblioteca.html`. Registra o estado atual e identifica qual sistema é canônico onde há divergência. Nenhuma alteração de código foi feita.

## Achado central: quatro variações de paleta coexistem

| Página | Nome do azul de fundo | Valor | Nome do branco | Valor |
|---|---|---|---|---|
| Home (`index.html`) | `--azul-profundo` | `#0A1628` | `--branco` | `#FFFFFF` |
| `/artigos/` + artigos individuais | `--azul-profundo` | `#060D1E` | `--branco` | `#F7F3EA` |
| `/filosofos/`, `/conteudo/`, hubs | `--azul` (genérico) | `#060D1E` | `--branco` | `#F7F3EA` |
| `/sobre/` | *(sem variável, hardcoded)* | `#060D1E` | *(hardcoded)* | `#F7F3EA` |
| `biblioteca.html` | `--navy` | `#060D1E` | `--page`/`--card` | `#f4f5f7` / `#ffffff` (tema claro, único do site) |

**Recomendação de governança:** o conjunto de variáveis usado em `SITE/artigos/<slug>/index.html` é o canônico — é o mais completo (inclui `--borda-dourada`, `--branco-suave`, `--cinza-medio`) e é replicado de forma idêntica nos 43 artigos individuais, sem exceção. `--azul-profundo:#060D1E; --azul-escuro:#061E47; --azul-real:#0B3D91; --dourado:#C9A84C; --dourado-claro:#E6D28A; --branco:#F7F3EA; --branco-suave:#E8E1D2; --cinza-claro:#B8B3A8; --cinza-medio:#8A8478; --borda-dourada:rgba(201,168,76,.18)`. Qualquer página nova deve copiar exatamente este conjunto, não o da Home (que diverge em `--branco` e `--azul-profundo`) nem inventar um terceiro.

## Tipografia (100% consistente — não há divergência aqui)

- **Playfair Display** (peso 700) — todos os títulos, nomes de filósofos, títulos de card.
- **Lato** — corpo de texto, parágrafos, excertos.
- **Cinzel** (caixa-alta, letter-spacing largo) — labels, tags, metadados, navegação.
- Mais de 10 famílias são importadas no `<head>` mas nunca usadas (Poppins, Montserrat, Roboto, Manrope, etc.) — peso morto de carregamento, candidato a limpeza técnica, não decisão de identidade.

## Escala de títulos (referência: artigos/home)

`.hero-name` 3.5rem → `.section-title` 2.5rem → `.about-text h2` 2.2rem → `.content-card h3` 1.25rem → `.news-card-title`/`.article-title` ~1.1rem → `.section-label`/`.hero-label`/tags 0.75rem (Cinzel, caixa-alta).

## Borda, raio, sombra, hover

- Borda de card: `1px solid rgba(201,168,76, alpha)` — **dourado, nunca branco**. `/conteudo/` e os hubs (`pre-socraticos`, `atenas-classica`) usam hoje `rgba(255,255,255,.08)` em alguns cards — é divergência a corrigir, não padrão a seguir.
- `border-radius` de card: 8–9px na maioria das páginas. `biblioteca.html` usa 16px — outlier já registrado.
- Hover universal: `translateY` entre -3px e -6px (varia hoje por página, sem padronização — usar -6px, o valor do template de artigo, como referência única) + borda intensifica para dourado sólido + sombra `0 12px–16px 40–46px rgba(0,0,0,.4)`.
- Decoração de assinatura: `.section-divider` (linha–diamante–linha em gradiente dourado) e aspas decorativas gigantes em opacidade muito baixa.

## Navegação

Estrutura canônica: `.navbar > .navbar-inner > .navbar-logo + .navbar-links (ul/li) + .hamburger`, sticky, background `rgba(6,30,71,.98)`, borda inferior `1px solid rgba(201,168,76,.16)`. Links completos: Início, Conteúdo, Filósofos, Sobre, Artigos, Newsletter, Livros, Assinar.

**Divergências hoje (corrigir, não repetir):** `/sobre/` usa uma `<nav>` simples sem `.navbar-inner`, sem logo separado; os hubs (`pre-socraticos/`, `atenas-classica/`) têm navbar reduzida (faltam Newsletter, Livros, Assinar); `/artigos/` não tem navbar nenhuma, só um `.home-link` fixo; `biblioteca.html` usa `position: fixed` em vez de `sticky` e nomeia as classes de forma diferente (`.hamburger` em vez de `.menu-toggle`).

## Padrão de imagem

Quatro convenções coexistem: `assets/Nome.png` (retrato simples), `assets/article_cards/<slug>.png` (capa de artigo), `assets/Filósofos/<nome>.jpg` (subpasta dedicada), arquivos com nome aleatório tipo hash (usados nos slides do hero). Recomenda-se consolidar em apenas as duas primeiras para qualquer conteúdo novo.

## O que preservar sem exceção

A dupla dourado-sobre-azul-profundo (`#C9A84C` sobre tons de `#060D1E`–`#0A1628`), a tríade tipográfica Playfair+Cinzel+Lato, e o card com borda dourada translúcida que vira sólida no hover com elevação — são os três elementos mais reconhecíveis do projeto. Qualquer nova página deve reutilizá-los exatamente.
