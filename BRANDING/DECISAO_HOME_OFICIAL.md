# DECISÃO OFICIAL DA HOME DO PROCEDER FILOSÓFICO

> Decisão formal do Diretor Criativo (Claude), referente à Missão 6 do `BACKLOG_OFICIAL.md`
> ("Consolidar Produção × Repositório Local"). Esta decisão não implementa nada — define a
> base de reconciliação e os limites que `Codex` deve respeitar em qualquer trabalho futuro
> na Home. Todos os achados abaixo foram verificados diretamente (curl em produção, leitura de
> arquivos), não assumidos por enunciado. Data: 2026-06-25.

## Fonte oficial

**A Home publicada em `procederfilosofico.com.br` é a fonte oficial de conteúdo e de URLs.**
É o que o leitor real, o Google e qualquer link externo já indexado veem hoje. Nenhuma decisão
de reconstrução pode tratar o que está publicado como descartável só porque o código por trás
é antigo, desorganizado ou tecnicamente inferior ao repositório local.

Isso **não** significa que a arquitetura atual da produção deva ser copiada ou preservada como
está — o próprio achado de origem confirma Home "quebrada, desalinhada, com seções misturadas".
Fonte oficial = o conteúdo e as URLs que não podem ser perdidos. A apresentação pode e deve ser
saneada.

## Arquivo base

**Base de reconciliação: `SITE/docs/backups/proceder-fase1-20260601-110542/index.html`.**

Confirmado como o mais próximo da produção atual (3.605 linhas vs. 3.628 da produção hoje,
mesma ordem de grandeza; contém "Peter Pan", ausente de `SITE/index.html`). **Mas não é um
espelho perfeito**: não contém "A Montanha Contra a Caverna", que já existe em produção hoje —
ou seja, a produção evoluiu desde a captura do backup (31/05–01/06/2026). Qualquer trabalho de
reconciliação que parta deste backup precisa primeiro re-sincronizar contra a produção viva,
não tratar o backup como cópia atual.

`SITE/index.html` **não é a base** — é autoclassificado em `README.md` como "snapshot/protótipo
local", nunca foi a fonte de verdade, e não contém nenhum dos dois conteúdos exclusivos de
produção confirmados.

## Conteúdo a preservar (obrigatório)

- "J.M. Barrie e a Síndrome de Peter Pan" — confirmado em produção e no backup.
- "A Montanha Contra a Caverna" — confirmado em produção (ausente do backup; precisa ser
  resgatado direto da produção viva, não do backup).
- Qualquer outro conteúdo hoje visível em `procederfilosofico.com.br` que não exista no backup
  nem em `SITE/index.html` — antes de qualquer reconciliação, é necessário um novo crawl
  completo da produção viva (não apenas a Home) para garantir que nada além desses dois itens
  já identificados ficou de fora.
- Todas as URLs de produção hoje indexadas (mesmo as sem rota equivalente local).

## Conteúdo a descartar

Nenhum conteúdo de produção deve ser descartado nesta etapa. O que pode ser descartado é
**apresentação**, não conteúdo:
- Qualquer seção de `SITE/index.html` que seja puramente decorativa sem destino real (ver os
  6 de 9 cards mortos de "Conteúdo Exclusivo" já documentados em `CHANGELOG_DA_IDENTIDADE.md`)
  — não devem ser replicados na Home reconciliada, nem na produção nem localmente.

### Adendo — Classificação formal de "Conteúdo Exclusivo"

A seção "Conteúdo Exclusivo" (`SITE/index.html` local, 9 cards, 6 sem destino real) é
classificada como **COMPONENTE LEGADO / VITRINE ESTÁTICA SEM FUNÇÃO**.

Status verificado:
- Existe visualmente.
- Não funciona como fluxo real (a maioria dos cards não tem destino).
- Não possui destino funcional validado.

Decisão: **não é conteúdo obrigatório a preservar** e **não bloqueia a reconciliação**. Não é
"o que está publicado" no sentido protegido por esta decisão (seção "Fonte oficial") — é
apresentação quebrada, exatamente o tipo de coisa que esta missão existe para sanear, não para
herdar.

Tratamento recomendado (qualquer um dos três, decisão de implementação fica fora desta
governança):
1. Arquivar junto com `SITE/index.html` (ver "Conteúdo a arquivar").
2. Remover da Home reconciliada.
3. Recriar como hub real no futuro — **somente** com especificação editorial própria e rotas
   funcionais (já é Fase 2, não esta reconciliação).

**Regra geral, aplicável a qualquer seção candidata da Home reconciliada, não só esta:** não
publicar nenhuma seção do tipo "vitrine de cards" sem que todos os cards tenham
simultaneamente: destino real, rota existente, conteúdo relacionado de fato, UX funcional e
coerência de SEO. Uma seção que falha em qualquer um desses cinco pontos é "vitrine estática
sem função", não conteúdo a preservar — mesmo que esteja hoje em produção.

**Nota de extensão:** a própria seção `#conteudo` da Home de **produção** (6 cards temáticos —
"Filosofia Antiga", "Filosofia Medieval" etc., documentados em `PRODUCTION_SNAPSHOT.md`) também
não tem link individual por card — falha o mesmo teste. Está sujeita à mesma classificação e ao
mesmo tratamento, apesar de estar em produção: "fonte oficial" protege conteúdo real (os 8
artigos, a Biblioteca), não obriga a herdar uma vitrine decorativa só porque ela está publicada.

## Conteúdo a arquivar

- `SITE/index.html` deve ser movido para `SITE/docs/backups/` (ou pasta de arquivo equivalente,
  com timestamp), e o `README.md` atualizado para deixar claro que não é mais o protótipo ativo
  de trabalho — é referência histórica de design (estrutura visual, tokens, agrupamento de
  filósofos por categoria já corrigido). Não apagar: pode informar decisões futuras de
  arquitetura de seção, mesmo não sendo a base de conteúdo.

## Seções obrigatórias (Home reconciliada)

1. Identificação/hero da marca (Proceder Filosófico).
2. Acesso aos dois conteúdos exclusivos de produção confirmados (Peter Pan, Montanha Contra a
   Caverna) — com link funcional, não card decorativo.
3. Vitrine de artigos/filósofos real, com contagem verdadeira (sem filtro invisível — mesmo
   princípio que corrigiu `/filosofos/` na Missão 1 original).
4. Acesso à Biblioteca (`biblioteca.html` existe tanto em produção quanto localmente).
5. Open Graph + Twitter Card completos — ausentes hoje em produção; é lacuna real, não
   modernização.

## Seções proibidas

- Qualquer card com aparência clicável sem destino real (regra já registrada em
  `BRIEFING_PARA_CODEX.md` — não pode se repetir na Home reconciliada).
- "Conteúdo Exclusivo" (local) e a seção `#conteudo` de produção, na forma atual — ver Adendo
  em "Conteúdo a descartar". Classificadas como componente legado/vitrine sem função; só podem
  retornar se forem refeitas com destino real em todos os cards.
- Qualquer seção nova que não exista hoje nem em produção nem no backup nem em
  `SITE/index.html` — esta missão é reconciliação, não criação (Fase 1, não Fase 2).
- Qualquer gamificação social, ranking ou elemento fora do que já está documentado em
  `BRAND_BOOK.md`/`LEIS_DA_MARCA.md`.

## Rotas obrigatórias antes de qualquer deploy

**Atualização (`PRODUCTION_SNAPSHOT.md`, 2026-06-25): o bloqueio original abaixo foi
verificado e está resolvido.** A produção é um snapshot estático salvo de navegador (marca
`<!-- saved from url=(0014)about:internet -->` no HTML), não uma instância WordPress ao vivo —
`/wp-json/`, `/wp-admin/`, `/feed/` e todo o resto retornam 404. "Peter Pan" e "Montanha Contra
a Caverna" **não têm permalink algum, em WordPress ou fora dele** — existem somente como dados
dentro de um array `POSTS` embutido em `<script>` na própria Home, abertos por overlay
(`?post=slug`). Não há URL externa indexada separadamente para mapear ou preservar por
redirecionamento — preservar esses dois itens significa migrar os dados do array (slug, título,
tag, data, excerpt, content, thumb quando houver), não proteger uma rota.

- `/` (Home reconciliada) — única rota que precisa existir com o conteúdo completo,
  incluindo os 8 artigos hoje embutidos no array `POSTS` de produção.
- `biblioteca.html` — única outra página real de produção; preservar.
- `/filosofos/`, `/artigos/`, `/sobre/`, `/conteudo/` — hoje **não existem em produção como
  rota nem como permalink de nada** (confirmado 404; no menu de produção são apenas âncoras
  `#filosofos`, `#artigos` etc. dentro da própria Home). Podem ser introduzidas como rotas novas
  sem risco de conflito com algo que já exista — mas isso já é decisão de arquitetura
  (Missão 7), não requisito desta reconciliação.

## Critérios de aceite

- Nenhum conteúdo hoje visível em produção deixa de existir (mesmo URL ou com redirecionamento
  301 documentado).
- Home reconciliada não introduz nenhuma seção, card ou rota que não esteja nesta decisão.
- Open Graph/Twitter Card presentes e válidos.
- Nenhuma referência a endpoint legado de newsletter (`wp-json/hostinger-reach/v1/contact`)
  tratada como funcional — é gap conhecido, não bug a esconder.
- Validação visual (screenshot real, metodologia igual à usada na regularização da Missão 1 —
  nunca comparação que carregue o mesmo fallback nos dois lados) antes de qualquer deploy.

## Bloqueios

- ~~Não deployar nada desta reconciliação até identificar a estrutura real de permalinks da
  produção WordPress~~ — **resolvido.** `PRODUCTION_SNAPSHOT.md` confirma que não existem
  permalinks (produção é snapshot estático, sem backend WordPress ativo). Os 8 artigos, com
  todos os campos (`slug`, `title`, `tag`, `date`, `excerpt`, `content`, `thumb` quando houver),
  estão documentados em `PRODUCTION_SNAPSHOT.md` e devem ser migrados como dados, não como rota.
- **Não rodar `AUTOMATION/deploy.py`** até a Home reconciliada existir e ter sido validada —
  ele publica `SITE/` inteira por FTP, sem seletividade por commit.
- **Não usar `SITE/index.html` como arquivo a publicar.** Pode ser consultado como referência
  de design, nunca enviado a produção como está.

## Riscos

- Risco de SEO altíssimo e irreversível se a Home for substituída sem mapear e preservar
  permalinks já indexados — é a mesma advertência já registrada em `BACKLOG_OFICIAL.md` para a
  Missão 6.
- Risco de o backup, por não ser um espelho perfeito (falta "Montanha Contra a Caverna"),
  induzir reconciliação incompleta se tratado como fonte única — deve ser cruzado com um novo
  crawl da produção viva.
- Risco político: decidir "fonte oficial" aqui não decide a arquitetura técnica futura — só
  estabelece o que não pode ser perdido. A escolha de stack/arquitetura final é assunto da
  Missão 7 (Design System), só depois desta reconciliação.

## Definition of Done específica da Home

A Home só é "CONCLUÍDA" (não apenas "funciona") quando:
1. Todo conteúdo de produção confirmado nesta decisão está acessível por URL estável (própria
   ou redirecionada).
2. Nenhuma seção ou card sem destino real existe.
3. Open Graph/Twitter Card completos e validados.
4. Validação visual real (metodologia com diferença de hash genuína, não comparação que sempre
   produz o mesmo fallback) documentada em `VALIDATION/`.
5. `Codex` confirma, antes do deploy, que nenhum permalink de produção hoje indexado foi
   removido ou alterado sem redirecionamento 301 documentado.

Até estes cinco pontos serem satisfeitos, o status correto é **PENDENTE DE EVIDÊNCIA**, nunca
"concluída".
