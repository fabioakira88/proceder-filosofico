# Auditoria de Capas — Proceder Filosófico

Data: 2026-07-02
Modo: local, controlado, sem commit e sem deploy

## Resumo Executivo

O Proceder Filosófico possui 43 artigos cadastrados em `SITE/posts.js`.

Todos os artigos possuem algum asset válido, mas nem todos possuem capa editorial adequada ao título.

Achados principais:

- 43 artigos auditados.
- 43 imagens referenciadas existem localmente.
- 2 artigos usavam `assets/default-article.jpg`.
- 3 artigos usam imagens fora da pasta canônica `assets/article_cards/`.
- 2 pares de arquivos duplicados existem em `SITE/assets/article_cards/`.
- 2 novas capas foram geradas para substituir o fallback genérico.

## Direção Visual Recomendada

O Proceder deve usar capas com aparência de revista intelectual e acervo cultural:

- composição 16:9;
- sem texto na imagem;
- sem watermark;
- sem aparência genérica de banco de imagem;
- atmosfera contemplativa;
- referências a biblioteca, arquivo, manuscrito, escultura, cidade histórica, símbolos filosóficos e memória cultural;
- paleta sóbria: carvão, pergaminho, marfim, azul acinzentado, dourado discreto;
- alternância controlada entre realismo editorial e ilustração/pintura histórica.

## P0 Corrigido Localmente

| Artigo | Antes | Depois | Status |
| --- | --- | --- | --- |
| Luís de Camões: Por Que Sua Morte Ainda Importa para a Língua Portuguesa? | `assets/default-article.jpg` | `assets/article_cards/luis-de-camoes-morte-lingua-portuguesa.webp` | Corrigido localmente |
| A Nostalgia É uma Forma de Consciência Histórica | `assets/default-article.jpg` | `assets/article_cards/nostalgia-forma-consciencia-historica.webp` | Corrigido localmente |

## Novas Imagens Criadas

| Arquivo | Origem | Observação |
| --- | --- | --- |
| `SITE/assets/article_cards/luis-de-camoes-morte-lingua-portuguesa.webp` | imagem gerada | estudo renascentista português, manuscrito, mapa náutico, atmosfera camoniana |
| `SITE/assets/article_cards/nostalgia-forma-consciencia-historica.webp` | imagem gerada | arquivo histórico, fotografias antigas, memória e consciência histórica |

## P1 — Capas Que Devem Ser Canonizadas

Estes artigos não estão quebrados, mas usam imagens fora da pasta canônica de cards.

| Artigo | Imagem atual | Recomendação |
| --- | --- | --- |
| Poetas, Dramaturgos e a Educação da Grécia Antiga | `assets/homero2.png` | criar `assets/article_cards/poetas-dramaturgos-educacao-grecia-antiga.png` com teatro grego, aedo, máscaras e escola arcaica |
| Os Sofistas: Os Primeiros Mestres da Persuasão | `assets/Escola-athenas.jpg` | criar `assets/article_cards/sofistas-primeiros-mestres-persuasao.png` com ágora, retórica, mestre e discípulos |
| A Vida Como um Pêndulo: A Visão de Schopenhauer Sobre o Desejo Humano | `assets/Arthur-schopenhauer.jpg` | criar `assets/article_cards/vida-pendulo-schopenhauer-desejo-humano.png` com pêndulo, sombra, gabinete e tensão entre desejo/tédio |

## Duplicados Encontrados

| Base | Arquivos |
| --- | --- |
| `formigas-diante-do-universo` | `formigas-diante-do-universo.png`, `formigas-diante-do-universo.webp` |
| `hegel-fenomenologia-inteligencias-artificiais` | `hegel-fenomenologia-inteligencias-artificiais.png`, `hegel-fenomenologia-inteligencias-artificiais.webp` |

Não remover nesta missão. Apenas documentado.

## Inventário por Status

| Status | Quantidade | Observação |
| --- | ---: | --- |
| OK canônico | 38 | Imagens em `assets/article_cards/` e referenciadas corretamente |
| Corrigido localmente | 2 | Eram fallback genérico e agora têm capas novas |
| Revisar/canonizar | 3 | Usam assets fora de `assets/article_cards/` |
| Quebrado | 0 | Nenhum asset ausente |

## Política de Capas Recomendada

Pasta canônica:

```text
SITE/assets/article_cards/
```

Formato recomendado:

```text
slug-do-artigo.webp
```

Permitido temporariamente:

```text
slug-do-artigo.png
slug-do-artigo.jpg
```

Evitar:

- fallback genérico em artigo publicado;
- retrato simples quando o título pede conceito;
- imagem fora de `article_cards/`;
- nomes com acento, espaço ou caracteres especiais;
- capas repetidas em artigos próximos.

## Validações Executadas

| Comando | Resultado |
| --- | --- |
| `node --check SITE/posts.js` | OK |
| `node AUTOMATION/generate_seo.mjs` | OK, gerou 43 artigos, 10 categorias, 1 dossiê, 3 hubs, sitemap e robots |
| `node VALIDATION/validate_assets.mjs` | OK |
| `node VALIDATION/validate_links.mjs` | OK |
| `node VALIDATION/validate_editorial_metadata.mjs` | OK |
| `node VALIDATION/validate_sitemap_robots.mjs` | OK |
| `git diff --check` | OK |
| `node VALIDATION/validate_deploy_manifest.mjs` | Falha esperada enquanto as duas novas imagens não estiverem versionadas |

## Manifesto de Deploy

O manifesto bloqueia corretamente porque as novas imagens ainda estão não rastreadas:

```text
SITE/assets/article_cards/luis-de-camoes-morte-lingua-portuguesa.webp
SITE/assets/article_cards/nostalgia-forma-consciencia-historica.webp
```

Para publicar, esses dois arquivos precisam entrar no commit junto com os HTMLs e `posts.js`.

## Arquivos Alterados Localmente

```text
SITE/posts.js
SITE/artigos/index.html
SITE/artigos/luis-de-camoes-morte-lingua-portuguesa/index.html
SITE/artigos/nostalgia-forma-consciencia-historica/index.html
SITE/categoria/historia-da-civilizacao/index.html
SITE/categoria/literatura/index.html
SITE/assets/article_cards/luis-de-camoes-morte-lingua-portuguesa.webp
SITE/assets/article_cards/nostalgia-forma-consciencia-historica.webp
MISSION_PF_COVER_AUDIT_REPORT.md
```

## Próximo Lote Recomendado

Antes de mexer nas 38 capas restantes, fazer um lote pequeno com os 3 P1:

1. `poetas-dramaturgos-educacao-grecia-antiga`
2. `sofistas-primeiros-mestres-persuasao`
3. `vida-pendulo-schopenhauer-desejo-humano`

Depois validar visualmente `/artigos/`, categorias e páginas individuais.

## Veredito

Sim, é totalmente possível deixar o Proceder Filosófico com aparência mais intelectual e dinâmica sem redesenhar o site.

O caminho seguro é:

1. manter `SITE/assets/article_cards/` como pasta canônica;
2. trocar capas por lotes de 2 a 5 artigos;
3. nunca usar fallback genérico em artigo publicado;
4. validar assets, links, sitemap, manifesto e visual antes de commit/deploy;
5. preservar a identidade contemplativa do Proceder.
