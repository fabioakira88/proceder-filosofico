# PF-HERO-02 Historical Portraits Report

Date: 2026-07-07

## Scope

- Repository used: `PROCEDER_FILOSOFICO_MAIN_CLEAN`
- Branch: `pf-hero-02-historical-portraits`
- Contaminated folder `PROCEDER_FILOSOFICO:/`: not used
- Japan Relativo: not touched
- Public area changed: only Home Hero image references and Hero CTA hrefs in `SITE/index.html`, plus new Hero image assets

## Initial State

- Branch started from `main`
- `main` was aligned with `origin/main`
- Working tree was clean after administrative report commit `317be63`
- Current Hero used five heavy hash-named PNG files with `.jpg` extensions
- All five Hero CTAs pointed to `/artigos/`

## Old Hero Assets

| Slide | Old file | Old size |
| --- | --- | ---: |
| Socrates | `SITE/assets/FLaneKfrfyGYOgJd.jpg` | 5,390,595 bytes |
| Plato | `SITE/assets/zBmXzIGbgLLlbNyh.jpg` | 8,101,645 bytes |
| Aristotle | `SITE/assets/AJPBTuUJaFhjwjvx.jpg` | 5,644,520 bytes |
| Thomas Aquinas | `SITE/assets/wPdrfjjEMXEymTcc.jpg` | 6,060,262 bytes |
| Friedrich Nietzsche | `SITE/assets/yPCECtiDBKjEdTjP.jpg` | 6,278,574 bytes |

Total old Hero weight: 31,475,596 bytes.

## New Hero Assets

| Slide | New file | Dimensions | New size | Reduction |
| --- | --- | ---: | ---: | ---: |
| Socrates | `SITE/assets/hero/socrates-louvre-bust.webp` | 1920x1080 | 178,894 bytes | 96.7% |
| Plato | `SITE/assets/hero/plato-glyptothek-bust.webp` | 1920x1080 | 140,968 bytes | 98.3% |
| Aristotle | `SITE/assets/hero/aristotle-altemps-bust.webp` | 1920x1080 | 81,100 bytes | 98.6% |
| Thomas Aquinas | `SITE/assets/hero/thomas-aquinas-crivelli.webp` | 1920x1080 | 399,378 bytes | 93.4% |
| Friedrich Nietzsche | `SITE/assets/hero/nietzsche-1882-photograph.webp` | 1920x1080 | 101,474 bytes | 98.4% |

Total new Hero weight: 901,814 bytes.

Total reduction: 30,573,782 bytes, approximately 97.1%.

## Sources And Licenses

Detailed credits are recorded in `ASSET_CREDITS_HERO.md`.

| Slide | Source | License |
| --- | --- | --- |
| Socrates | https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg | Public domain |
| Plato | https://commons.wikimedia.org/wiki/File:Head_Platon_Glyptothek_Munich_548.jpg | Public domain |
| Aristotle | https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg | Public domain |
| Thomas Aquinas | https://commons.wikimedia.org/wiki/File:St-thomas-aquinas.jpg | Public domain |
| Friedrich Nietzsche | https://commons.wikimedia.org/wiki/File:Nietzsche1882.jpg | Public domain |

## Image Processing

- Originals were downloaded from Wikimedia Commons through official file redirects.
- No screenshots were used.
- No hotlinking was added.
- No AI image generation was used.
- No face reconstruction was used.
- No colorization was applied.
- No text, logos, frames, or watermarks were added.
- Each file was cropped from the historical source, resized to 1920x1080, then converted to WebP.
- WebP conversion used portable `cwebp` 1.6.0 from the official libwebp release in `/private/tmp`.
- A Homebrew install attempt for `webp` was started and then terminated because it began compiling `cmake`; no Homebrew-based converter was used for the final assets.

## CTA Changes

| Slide | Old CTA | New CTA |
| --- | --- | --- |
| Socrates | `/artigos/` | `/artigos/socrates-metodo-maieutico/` |
| Plato | `/artigos/` | `/artigos/platao-mundo-das-ideias/` |
| Aristotle | `/artigos/` | `/artigos/aristoteles-eudaimonia-vida-boa/` |
| Thomas Aquinas | `/artigos/` | `/artigos/sao-tomas-fe-razao-explicacao/` |
| Friedrich Nietzsche | `/artigos/` | `/artigos/nietzsche-obras-impacto-revolucionario/` |

## Alt Text Equivalent

The Hero images are CSS backgrounds, so `role="img"` and `aria-label` were added to each `.hero-bg`.

- Socrates: "Busto de Socrates preservado no Museu do Louvre"
- Plato: "Busto romano de Platao preservado na Glyptothek de Munique"
- Aristotle: "Busto de Aristoteles preservado no Palazzo Altemps"
- Thomas Aquinas: "Sao Tomas de Aquino em pintura de Carlo Crivelli"
- Friedrich Nietzsche: "Fotografia de Friedrich Nietzsche realizada em 1882"

Note: the rendered HTML uses Portuguese accents; this report keeps ASCII spelling for repository consistency.

## Files Changed

- `SITE/index.html`
- `SITE/assets/hero/socrates-louvre-bust.webp`
- `SITE/assets/hero/plato-glyptothek-bust.webp`
- `SITE/assets/hero/aristotle-altemps-bust.webp`
- `SITE/assets/hero/thomas-aquinas-crivelli.webp`
- `SITE/assets/hero/nietzsche-1882-photograph.webp`
- `ASSET_CREDITS_HERO.md`
- `PF_HERO_02_HISTORICAL_PORTRAITS_REPORT.md`

## Files Removed

- `SITE/assets/FLaneKfrfyGYOgJd.jpg`
- `SITE/assets/zBmXzIGbgLLlbNyh.jpg`
- `SITE/assets/AJPBTuUJaFhjwjvx.jpg`
- `SITE/assets/wPdrfjjEMXEymTcc.jpg`
- `SITE/assets/yPCECtiDBKjEdTjP.jpg`

The removed files had no remaining functional references after the Home Hero update. Historical mentions remain in audit documents and automation notes only.

## Explicit Non-Changes

- `SITE/filosofos/index.html`: not changed
- `SITE/sitemap.xml`: not changed
- Header: not changed
- Footer: not changed
- Hero layout/classes/animation/order/text: preserved
- "Pensadores e mestres" cards: not changed
- Article pages: not changed
- New individual philosopher pages: not created
- No redesign outside the Hero image references and CTA destinations

## Validation

- `git diff --check`: passed
- Five new assets exist: passed
- Five article destinations exist on disk: passed
- Local HTTP Home `/`: 200
- Local HTTP new assets: 200 for all five files
- Local HTTP article destinations: 200 for all five CTA targets
- Old functional Hero image references in `SITE/index.html`: none
- `SITE/filosofos/index.html`: no diff
- `SITE/sitemap.xml`: no diff
- Static visual inspection of generated 16:9 previews: passed
- Automated browser screenshot validation: not available in this session because the in-app browser control tool did not expose the required `node_repl js` execution interface

## Remaining Publication Steps

- Stage intended files
- Commit
- Push branch
- Open PR
- Merge after review
- Validate GitHub Pages workflow and public URLs
