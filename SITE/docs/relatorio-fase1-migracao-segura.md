# Relatorio Fase 1 - Migracao Segura

Data de execucao: 2026-06-01  
Projeto: Proceder Filosofico  
Escopo: criar base organizada sem alterar logica, HTML, CSS ou JS existentes.

## Backup criado

Backup completo criado em:

`docs/backups/proceder-fase1-20260601-110542/`

Conteudo copiado para o backup:

- `index.html`
- `biblioteca.html`
- `posts.js`
- `.env`
- `assets/`

Tamanho aproximado do backup: `186M`  
Total de arquivos no backup: `208`

Validacao de integridade dos arquivos principais:

- `index.html`: hash atual igual ao hash do backup.
- `biblioteca.html`: hash atual igual ao hash do backup.
- `posts.js`: hash atual igual ao hash do backup.

## Pastas criadas

- `public/`
- `public/images/`
- `public/images/hero/`
- `public/images/philosophers/`
- `public/images/quotes/`
- `public/images/posts/`
- `public/images/portraits/`
- `public/images/misc/`
- `public/branding/`
- `src/`
- `src/styles/`
- `src/data/`
- `src/components/`
- `src/sections/`
- `src/layouts/`
- `src/utils/`
- `src/services/`
- `docs/`
- `docs/backups/`

## Arquivos copiados

Nenhum arquivo critico foi movido. Todos os assets organizados foram copiados, preservando os originais em `assets/`.

Copias por categoria:

- Branding:
  - `assets/LQHqVnilFspwfHEy.png` -> `public/branding/`

- Hero:
  - `assets/AJPBTuUJaFhjwjvx.jpg`
  - `assets/FLaneKfrfyGYOgJd.jpg`
  - `assets/wPdrfjjEMXEymTcc.jpg`
  - `assets/yPCECtiDBKjEdTjP.jpg`
  - `assets/zBmXzIGbgLLlbNyh.jpg`
  - destino: `public/images/hero/`

- Filosofos:
  - conteudo de `assets/Filósofos/`
  - destino: `public/images/philosophers/`

- Frases e citacoes:
  - arquivos `assets/frase-*.png`
  - `assets/(Lote 1) Citação.png`
  - destino: `public/images/quotes/`

- Posts/artigos:
  - imagens de posts soltas em `assets/`, incluindo `post2.png`, `metafisica-post.png`, `descartes-post.png`, `bernini-proserpina.jpeg`, `laplace.jpeg`, `soren-kierkegaard.jpeg`, entre outras.
  - destino: `public/images/posts/`

- Retratos usados em cards/secoes:
  - `epicteto.png`
  - `seneca.png`
  - `marco-aurelio.JPG`
  - `platao-mestre.jpeg`
  - `aristoteles-mestre.jpeg`
  - `nietzsche-mestre.jpg`
  - `hannah-arendt.jpg`
  - destino: `public/images/portraits/`

- Misc:
  - emojis SVG
  - arquivos `css`, `css(1)`, `css(2)`, `css2`
  - destino: `public/images/misc/`

Total de arquivos copiados para `public/`: `189`  
Tamanho aproximado de `public/`: `185M`

## Arquivos mantidos

Mantidos intactos no local original:

- `index.html`
- `biblioteca.html`
- `posts.js`
- `assets/`
- arquivos WordPress/Elementor/Hostinger:
  - `assets/style.min.css`
  - `assets/frontend.min.css`
  - `assets/post-5.css`
  - `assets/post-68.css`
  - `assets/base-desktop.css`
  - `assets/front-scripts.min.js`
  - `assets/hooks.min.js`
  - `assets/i18n.min.js`
  - `assets/jquery.min.js`
  - `assets/jquery-migrate.min.js`
  - `assets/subscription-view.js`
  - `assets/subscription.css`
  - `assets/wp-emoji-release.min.js`

## Arquivos suspeitos

Arquivos/padroes que devem ser revisados em fase posterior, sem remocao nesta fase:

- `.DS_Store` na raiz e em `assets/`.
- Arquivos `IMG_*` em `assets/Filósofos/`, pois nao possuem nome semantico.
- Arquivos com acentos, espacos, caixa alta ou nomes gerados em `assets/Filósofos/`.
- Imagens muito pesadas, especialmente hero JPGs acima de 5 MB.
- CSS/JS WordPress, Elementor e Hostinger possivelmente residuais.
- Arquivos de fonte proxy `assets/css`, `assets/css(1)`, `assets/css(2)`, `assets/css2`.

## Referencias quebradas detectadas

Referencias locais presentes no codigo, mas sem arquivo correspondente em `assets/`:

- `assets/fonts/Catamaran-Variable.ttf`
- `assets/fonts/Caudex-Regular.ttf`
- `assets/fonts/Cormorant-Regular.ttf`
- `assets/fonts/DMSans-Bold.ttf`
- `assets/fonts/DMSans-BoldItalic.ttf`
- `assets/fonts/DMSans-Italic.ttf`
- `assets/fonts/DMSans-Medium.ttf`
- `assets/fonts/DMSans-MediumItalic.ttf`
- `assets/fonts/DMSans-Regular.ttf`
- `assets/fonts/DMSerifDisplay-Regular.ttf`
- `assets/fonts/FiraSans-Regular.ttf`
- `assets/fonts/Gruppo-Regular.ttf`
- `assets/fonts/IBMPlexMono-Regular.ttf`
- `assets/fonts/Junge-Regular.ttf`
- `assets/fonts/Lato-Regular.ttf`
- `assets/fonts/Manrope-Variable.ttf`
- `assets/fonts/Montserrat-Regular.ttf`
- `assets/fonts/NunitoSans-Variable.ttf`
- `assets/fonts/OpenSans-Variable.ttf`
- `assets/fonts/PlayfairDisplay-Regular.ttf`
- `assets/fonts/Poppins-Regular.ttf`
- `assets/fonts/Prata-Regular.ttf`
- `assets/fonts/Prompt-Regular.ttf`
- `assets/fonts/ProstoOne-Regular.ttf`
- `assets/fonts/Roboto-Regular.ttf`
- `assets/fonts/TitilliumWeb-Regular.ttf`
- `assets/fonts/Trirong-Regular.ttf`
- `assets/post_cards/aristoteles.jpeg`
- `assets/post_cards/existencialismo.jpeg`
- `assets/post_cards/kant.jpeg`
- `assets/post_cards/peter-pan.jpeg`
- `assets/post_cards/religiao-e-filosofia.jpeg`
- `assets/post_cards/siegfried.jpeg`
- `assets/post_cards/sto-agostinho.jpeg`

Observacao: `assets/css(1)` e `assets/css(2)` existem; aparicoes truncadas como `assets/css(1` e `assets/css(2` sao artefato da varredura automatica por causa do caractere `)`.

## Proximos passos seguros

1. Criar uma Fase 2 apenas para documentar mapa de dependencias entre secoes, scripts e assets.
2. Criar `src/data/` com copias dos dados, sem alterar ainda os arquivos em producao.
3. Corrigir ou criar a pasta `assets/post_cards/`, pois ha referencias reais para ela em `index.html`.
4. Decidir se as fontes devem ser baixadas para `assets/fonts/` ou removidas das regras antigas do WordPress.
5. Converter imagens grandes para WebP/AVIF em uma pasta nova, mantendo originais preservados.
6. Somente depois iniciar refatoracao de HTML/CSS/JS.

## Resultado

Fase 1 concluida sem apagar arquivos, sem alterar logica e sem modularizar componentes. O site atual continua dependendo dos arquivos originais em `assets/`, `index.html`, `biblioteca.html` e `posts.js`, que foram preservados.
