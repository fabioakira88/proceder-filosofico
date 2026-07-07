# PF-HERO-02 Publication Report

Date: 2026-07-07

## Publication

- Repository: `PROCEDER_FILOSOFICO_MAIN_CLEAN`
- Pull request: https://github.com/fabioakira88/proceder-filosofico/pull/40
- Feature commit: `6c2cbf4` (`PF-HERO-02: replace artificial portraits with historical sources`)
- Merge commit: `2273f5b` (`Merge pull request #40 from fabioakira88/pf-hero-02-historical-portraits`)
- Target branch: `main`
- Branch after merge: deleted remotely by `gh pr merge --delete-branch`
- Workflow: `Proceder Filosofico Deploy (GitHub Pages)`
- Workflow run: https://github.com/fabioakira88/proceder-filosofico/actions/runs/28852241973
- Deploy result: success

## Public URLs Tested

- https://procederfilosofico.com.br/ — 200
- https://procederfilosofico.com.br/filosofos/ — 200
- https://procederfilosofico.com.br/sitemap.xml — 200

## Public Hero Assets Tested

- https://procederfilosofico.com.br/assets/hero/socrates-louvre-bust.webp — 200
- https://procederfilosofico.com.br/assets/hero/plato-glyptothek-bust.webp — 200
- https://procederfilosofico.com.br/assets/hero/aristotle-altemps-bust.webp — 200
- https://procederfilosofico.com.br/assets/hero/thomas-aquinas-crivelli.webp — 200
- https://procederfilosofico.com.br/assets/hero/nietzsche-1882-photograph.webp — 200

## Public CTA Targets Tested

- https://procederfilosofico.com.br/artigos/socrates-metodo-maieutico/ — 200
- https://procederfilosofico.com.br/artigos/platao-mundo-das-ideias/ — 200
- https://procederfilosofico.com.br/artigos/aristoteles-eudaimonia-vida-boa/ — 200
- https://procederfilosofico.com.br/artigos/sao-tomas-fe-razao-explicacao/ — 200
- https://procederfilosofico.com.br/artigos/nietzsche-obras-impacto-revolucionario/ — 200

## Public HTML Validation

- Home HTML contains the five new `assets/hero/*.webp` references.
- Home HTML no longer contains the old Hero asset references:
  - `assets/FLaneKfrfyGYOgJd.jpg`
  - `assets/zBmXzIGbgLLlbNyh.jpg`
  - `assets/AJPBTuUJaFhjwjvx.jpg`
  - `assets/wPdrfjjEMXEymTcc.jpg`
  - `assets/yPCECtiDBKjEdTjP.jpg`

## Result

- Five historical Hero portraits published.
- Zero artificial Hero portrait references remain in the public Home HTML.
- Zero watermark Hero asset remains in the public Home HTML.
- Five Hero CTAs point to individual existing articles.
- `/filosofos/` remains published and unchanged by this mission.
- `sitemap.xml` remains published and unchanged by this mission.

## Notes

- Automated browser screenshot validation was not available in this Codex session because the in-app browser control tool did not expose the required execution interface.
- Static visual inspection of generated 16:9 crops was completed before merge.
- Public HTTP validation was completed after deploy.
