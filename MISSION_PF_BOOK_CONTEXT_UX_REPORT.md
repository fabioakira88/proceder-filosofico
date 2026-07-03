# MISSION PF BOOK CONTEXT UX REPORT

## Resumo

Foi criada uma primeira camada contextual de obras relacionadas para o Proceder Filosofico, conectando autores e conceitos a livros ja existentes na Biblioteca.

A solucao evita transformar o site em vitrine: os livros aparecem como continuacao intelectual da leitura, abrem um modal editorial e mantem a Biblioteca como caminho interno principal.

## Arquivos criados

| Arquivo | Status | Observacao |
| --- | --- | --- |
| `SITE/assets/js/book-affiliate-modal.js` | criado | Modal compartilhado para obras relacionadas, sem dependencia externa. |

## Arquivos alterados

| Arquivo | Status | Observacao |
| --- | --- | --- |
| `SITE/assets/css-shared/components.css` | alterado | Adicionados estilos compartilhados para chips, painel de obras e modal responsivo. |
| `SITE/filosofos/index.html` | alterado | Obras relacionadas adicionadas a Socrates, Platao, Aristoteles, Kant, Nietzsche e Dostoievski. |
| `SITE/conceitos/verdade/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/liberdade/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/ser/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/razao/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/fenomenologia/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/justica/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/consciencia/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/alma/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/tempo/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |
| `SITE/conceitos/linguagem/index.html` | alterado | Obras relacionadas adicionadas ao conceito. |

## Decisoes UX/UI

| Decisao | Motivo |
| --- | --- |
| Modal em vez de link direto no texto | Preserva a leitura e reduz aspecto comercial. |
| CTA primario para `/biblioteca.html` | Mantem o usuario dentro do Proceder antes do link afiliado. |
| CTA secundario afiliado com `rel="noopener sponsored"` | Transparencia e seguranca. |
| Chips discretos em Cinzel/dourado | Mantem identidade editorial e evita banner visual. |
| Painel mobile-first | Modal vira folha inferior no mobile, com botoes em largura total. |

## Obras integradas

| Contexto | Obras |
| --- | --- |
| Socrates | Apologia de Socrates, A Republica |
| Platao | A Republica, Fedon, O Banquete |
| Aristoteles | Etica a Nicomaco, Metafisica, Retorica |
| Kant | Critica da Razao Pura |
| Nietzsche | Assim Falou Zaratustra |
| Dostoievski | Crime e Castigo |
| Conceitos | A Republica, Etica a Nicomaco, Critica da Razao Pura, Discurso do Metodo, Fedon, Confissoes, Metafisica, Retorica e obras relacionadas por tema. |

## Validacoes

| Comando | Status |
| --- | --- |
| `node --check SITE/assets/js/book-affiliate-modal.js` | OK |
| `node --check SITE/posts.js` | OK |
| `node --check AUTOMATION/generate_seo.mjs` | OK |
| `node VALIDATION/validate_links.mjs` | OK |
| `node VALIDATION/validate_assets.mjs` | OK |
| `node VALIDATION/validate_sitemap_robots.mjs` | OK |
| `node VALIDATION/validate_editorial_architecture.mjs` | OK |
| `node VALIDATION/validate_editorial_metadata.mjs` | OK |
| `git diff --check` | OK |
| `node VALIDATION/validate_deploy_manifest.mjs` | Pendente ate o novo JS ser versionado. |

## Pendencia tecnica

`validate_deploy_manifest.mjs` falha enquanto `SITE/assets/js/book-affiliate-modal.js` estiver nao rastreado pelo Git. Isso e esperado, porque o manifesto valida apenas arquivos versionados.

Para publicar esta melhoria, o commit deve incluir obrigatoriamente:

- `SITE/assets/js/book-affiliate-modal.js`
- `SITE/assets/css-shared/components.css`
- paginas de conceitos alteradas
- `SITE/filosofos/index.html`

## Riscos

| Risco | Status |
| --- | --- |
| Excesso comercial na experiencia | Mitigado pelo modal e CTA interno para Biblioteca. |
| Associar obra a autor errado | Mitigado removendo uma associacao ambigua em Epicuro. |
| Duplicacao de componente | Baixo: CSS e JS foram compartilhados. |
| Modal sem validacao visual real em mobile | Pendente de QA visual antes do deploy. |

## Proxima recomendacao

Fazer QA visual local em desktop e mobile. Se aprovado, criar commit seletivo e publicar em PR pequeno.

## Regra editorial incorporada

Todo novo artigo, pagina conceitual, biografia ou dossie que utilizar obras academicas, periodicos, sites introdutorios ou material de apoio deve registrar credito de forma clara e proporcional.

| Regra | Aplicacao |
| --- | --- |
| Credito de fonte | Citar periodico, autor, DOI ou URL quando a referencia sustentar informacao editorial. |
| Hierarquia de fonte | Priorizar artigos academicos e periodicos; usar sites introdutorios apenas como apoio. |
| Imagem coerente | A capa/imagem deve dialogar com o titulo e o tema, sem placeholder generico. |
| Afiliado com contexto | Obras da Biblioteca devem aparecer como continuidade de estudo, nao como anuncio solto. |

### Referencias recebidas para filosofia classica

| Referencia | Tipo | Uso recomendado |
| --- | --- | --- |
| Aspectos filosoficos da educacao no periodo classico grego | Artigo academico / Revista Ideacao (UEFS) | Educacao em Socrates, Platao e Aristoteles; logos, formacao e paideia. |
| O conhecimento no periodo classico, Rodolfo Denk Neto | Artigo / EAD IFSC | Episteme, verdade, razao e criterios de conhecimento em Socrates, Platao e Aristoteles. |
| Filosofia Grega - Periodo classico: Socrates, Platao e Aristoteles | Material introdutorio | Apoio para contextualizacao historica. |
| Filosofia grega classica - Periodo classico | Material introdutorio | Apoio para etica, politica e amadurecimento da filosofia estruturada. |
| Formacao da Filosofia Classica | Material introdutorio | Apoio para genese da filosofia classica e principais representantes. |
