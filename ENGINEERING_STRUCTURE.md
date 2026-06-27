# ENGINEERING_STRUCTURE.md

Data: 2026-06-26  
Escopo: Proceder Filosófico e Japão Relativo  
Tipo: auditoria documental e consolidação de arquitetura física  
Status: documentação criada sem alteração funcional

## Princípio Operacional

A estrutura técnica deve preservar o patrimônio digital da AION Studio por longo prazo. Toda mudança estrutural futura precisa passar pelo Decision Pipeline, respeitando a Constituição da Empresa, Governança, Definition of Done, Design System e decisões criativas oficiais.

Esta documentação não autoriza remoções, redesign, migração automática ou deploy. Ela registra o estado atual, classifica áreas do repositório e define uma base técnica para próximas missões.

## Raízes dos Projetos

| Projeto | Raiz local | Superfície ativa principal |
|---|---|---|
| Proceder Filosófico | `/Users/fabiotsugawa/Downloads/DIGITAL_PROJECTS:/PROCEDER_FILOSOFICO:` | `SITE/` |
| Japão Relativo | `/Users/fabiotsugawa/Downloads/DIGITAL_PROJECTS:/JAPAO_RELATIVO:` | `SITE/` |

## Métricas Estáticas da Auditoria

| Métrica | Proceder Filosófico | Japão Relativo |
|---|---:|---:|
| Arquivos totais auditados | 1250 | 527 |
| Pastas auditadas | 145 | 108 |
| Arquivos dentro de `SITE/` | 897 | 263 |
| Páginas HTML ativas | 59 | 24 |
| Assets estáticos | 794 | 235 |
| Imagens | 719 | 159 |
| PDFs | 2 | 0 |
| CSS | 17 | 4 |
| JS | 24 | 10 |
| Referências internas analisadas | 559 | 287 |
| Referências quebradas encontradas | 0 | 0 |
| Possíveis assets órfãos | 567 | 210 |
| Grupos de duplicação por hash | 192 | 11 |
| Imagens acima de 500 KB | 338 | 26 |
| CSS potencialmente morto | 11 | 1 |
| JS potencialmente morto | 14 | 2 |

Observação: órfãos, CSS morto e JS morto são classificados como potenciais porque a auditoria foi estática. Antes de remover qualquer arquivo, uma missão específica deve validar uso dinâmico por JavaScript, dados embutidos, templates, automações e produção.

## Proceder Filosófico — Arquitetura Física Atual

### Superfície Ativa

- `SITE/`: raiz publicável atual.
- `SITE/index.html`: Home reconciliada após espelhamento da produção.
- `SITE/artigos/`: páginas estáticas recuperadas da produção.
- `SITE/filosofos/`, `SITE/conteudo/`, `SITE/biblioteca.html`: rotas estruturais existentes.
- `SITE/assets/`: imagens, CSS, JS, PDFs, Open Graph e arquivos auxiliares usados pelo site.
- `SITE/wp-content/`: legado WordPress preservado por compatibilidade de URLs e assets.
- `SITE/sitemap.xml`, `SITE/robots.txt`: SEO técnico ativo.

### Governança e Documentação

- `BRANDING/`: Constituição, governança, backlog, changelog, Definition of Done, decisões oficiais e departamentos.
- `DOCS/`: documentação complementar.
- Arquivos raiz de engenharia: documentação operacional transversal criada para o departamento.

### Conteúdo e Dados

- `CONTENT/`: materiais editoriais, produção recuperada, PDFs e dados de apoio.
- `CONTENT/production/`: dados extraídos ou preservados da produção.

### Automação e Validação

- `AUTOMATION/`: scripts técnicos, deploy, validações e templates operacionais.
- `VALIDATION/`: snapshots, evidências e auditorias de produção.

### Backups, Legados e Experimentos

- `BACKUP/`: área histórica de backup.
- `SITE/docs/backups/`: backups dentro da superfície do site; deve ser tratado como risco estrutural até existir regra de exclusão clara no deploy.
- `BELZEBU/`: subsistema separado com outputs e drafts; classificar formalmente antes de qualquer limpeza.
- `EXPORTS/`: área de exportações, atualmente sem arquivos ativos relevantes na amostra auditada.

## Japão Relativo — Arquitetura Física Atual

### Superfície Ativa

- `SITE/`: raiz publicável atual.
- `SITE/index.html`: Home ativa.
- `SITE/assets/`: convenção técnica adotada em minúsculas após saneamento case-sensitive.
- `SITE/survival/`: aplicação Survival.
- `SITE/quiz-jlpt.html` e `SITE/quiz-particulas.html`: quizzes ativos.
- `SITE/cursos/`, `SITE/guia/`, `SITE/news/`, `SITE/articles/`: rotas e conteúdos ativos conforme auditoria estática.
- `SITE/sitemap.xml`, `SITE/robots.txt`, `SITE/manifest.webmanifest`: SEO técnico e metadados de instalação.

### Governança e Documentação

- `BRANDING/`: governança, backlog, changelog, Definition of Done, decisões e departamentos.
- `DOCS/`: documentação complementar.

### Conteúdo, Exportações e Social

- `AION_CONTENT_ENGINE/`: motor/apoio de conteúdo e testes.
- `EXPORTS/`: exportações de imagens e carrosséis; alto volume e não deve ser publicado sem política clara.
- `SOCIAL_MEDIA/`: materiais para redes sociais.
- `VIDEO/`: estrutura de vídeo.

### Arquivo e Histórico

- `ARCHIVE/`: versões antigas, testes, backups, IA e Vite antigo.
- `ARCHIVE/VERSOES_ANTIGAS:`, `ARCHIVE/TESTES:`, `ARCHIVE/BACKUPS:`, `ARCHIVE/BACKUP_IA:`, `ARCHIVE/VITE-ANTIGO:`: nomes com dois-pontos e caixa variada; candidatos a padronização futura, sem remoção automática.

## Classificação de Pastas

| Classe | Definição | Exemplos atuais |
|---|---|---|
| Ativo publicável | Arquivos que podem ir para produção | `SITE/` |
| Governança | Constituição, brand, decisões e DoD | `BRANDING/` |
| Conteúdo fonte | Dados editoriais, PDFs, produção recuperada | `CONTENT/`, `AION_CONTENT_ENGINE/` |
| Automação | Scripts de validação, deploy e auditoria | `AUTOMATION/` |
| Validação | Evidências, snapshots, relatórios | `VALIDATION/` |
| Arquivo | Itens históricos não ativos | `ARCHIVE/`, `BACKUP/` |
| Exportação | Saídas geradas, social, mídia auxiliar | `EXPORTS/`, `SOCIAL_MEDIA/`, `VIDEO/` |
| Legado compatível | Mantido por URLs, migração ou compatibilidade | `SITE/wp-content/`, backups de produção |

## Achados Estruturais Principais

### Proceder Filosófico

- Não foram encontradas referências internas quebradas na auditoria estática.
- Existe volume alto de imagens grandes e duplicadas.
- Existem PDFs duplicados com o mesmo conteúdo em caminhos distintos.
- Existem assets legados de WordPress preservados dentro de `SITE/assets/` e `SITE/wp-content/`.
- Existem backups e snapshots dentro ou próximos da superfície ativa, exigindo política de deploy rigorosa.
- Existem arquivos `.env` e `.DS_Store` que precisam ser avaliados em missão de segurança e limpeza.

### Japão Relativo

- O saneamento case-sensitive deixou a superfície ativa usando `SITE/assets/` em minúsculas.
- Não foram encontradas referências internas quebradas na auditoria estática.
- Existem assets grandes em `hero`, `covers` e `footer`.
- Existem duplicações de imagens de notícias/artigos.
- Existem arquivos de cursos potencialmente órfãos em `SITE/assets/cursos/`.
- `ARCHIVE/`, `EXPORTS/` e `SOCIAL_MEDIA/` concentram materiais históricos e gerados que precisam de regras de retenção.

## Diretriz de Evolução

A próxima etapa técnica recomendada é uma missão de classificação e limpeza planejada, sem remoção imediata: confirmar uso dinâmico, mapear assets de produção, aprovar política de exclusão e só então executar saneamento físico com backup e rollback.
