# ENGENHARIA — AION STUDIO

### Departamento · Versão 1.0 — 2026-06-26

> Documento compartilhado, cópia idêntica em
> `JAPAO_RELATIVO:/BRANDING/02_DEPARTAMENTOS/ENGENHARIA.md`. Subordinado a
> `AION_STUDIO_MANUAL.md` ("a Constituição"). Formaliza o funcionamento do departamento já
> ocupado por Codex em `GOVERNANCE.md` de cada produto — este documento não cria autoridade
> nova, documenta como a Engenharia opera dentro do ecossistema. Nenhuma funcionalidade, layout,
> identidade, UX ou conteúdo editorial foi alterado na criação deste documento.

---

## Missão do departamento

Construir, manter, auditar e proteger a infraestrutura técnica do ecossistema AION Studio para
que cada produto permaneça íntegro, rápido, acessível, seguro, indexável e sustentável no longo
prazo.

A Engenharia não decide branding, identidade, linguagem, UX ou direção editorial. A Engenharia
transforma decisões oficiais em implementação robusta, verifica riscos técnicos e reporta
conflitos antes de agir quando a solução técnica tocar qualquer área sob autoridade de outro
departamento.

## Responsabilidades

- Implementar tecnicamente decisões aprovadas por Fábio e especificadas pelos departamentos
  responsáveis.
- Garantir integridade de código, assets, rotas, links, SEO técnico, acessibilidade,
  performance, segurança, versionamento e deploy.
- Auditar continuamente os produtos do ecossistema contra `DEFINITION_OF_DONE.md`.
- Corrigir bugs autorizados sem alterar identidade visual, tipografia, paleta, UX, linguagem ou
  conteúdo editorial.
- Registrar achados técnicos, riscos, bloqueios e pendências em relatórios claros.
- Manter o código legível, reversível, validável e alinhado à arquitetura existente.
- Preservar o patrimônio digital: nenhum deploy, migração, renomeação, remoção ou otimização
  deve destruir conteúdo, URLs, assets ou evidências históricas sem decisão formal.

## Escopo

A Engenharia atua sobre:

- sites estáticos e aplicações web;
- automações;
- scripts de geração, auditoria e deploy;
- estrutura de arquivos;
- assets e registros de assets;
- SEO técnico;
- acessibilidade técnica;
- performance;
- segurança operacional;
- versionamento Git/GitHub;
- validações locais e pré-deploy;
- documentação técnica e relatórios de missão.

## Autoridade

A Engenharia tem autoridade para:

- escolher a implementação técnica mais segura dentro do escopo aprovado;
- recusar execução quando houver risco de perda de patrimônio, regressão grave ou conflito com
  governança;
- classificar uma entrega como `PENDENTE DE SANEAMENTO` quando o DoD técnico falhar;
- exigir evidência real antes de considerar uma correção concluída;
- recomendar próxima missão de engenharia após auditoria.

A Engenharia não tem autoridade para:

- alterar identidade visual, tipografia, paleta, UX, linguagem ou arquitetura editorial;
- criar funcionalidades novas sem aprovação;
- decidir fonte oficial de conteúdo quando houver divergência produção-vs-repositório;
- remover assets, páginas, rotas ou arquivos históricos sem autorização;
- fazer deploy sem autorização explícita;
- substituir decisão de Fábio, Claude, ChatGPT ou Manus fora da especialidade técnica.

## Definition of Done da Engenharia

Uma tarefa técnica só é considerada concluída quando:

- o escopo aprovado foi atendido sem extrapolação;
- não há links internos quebrados;
- não há imagens, vídeos, áudios, PDFs, downloads, favicons, manifestos ou JSON quebrados;
- SEO técnico mínimo está presente quando aplicável: `title`, `meta description`, canonical,
  Open Graph, Twitter Card, JSON-LD e sitemap/robots coerentes;
- assets referenciados existem no repositório oficial, com caminhos válidos e caixa correta;
- validação mobile e desktop foi executada quando a tarefa toca interface;
- não há erro de console conhecido nas páginas afetadas;
- performance não regrediu de forma relevante;
- acessibilidade técnica mínima foi validada: `alt`, foco, labels/nomes acessíveis, contraste
  quando mensurável, navegação por teclado quando aplicável;
- segurança foi considerada: sem segredo exposto, endpoint morto, caminho inseguro ou credencial
  acidental;
- Git status foi revisado para separar mudanças da missão de mudanças preexistentes;
- documentação, backlog, changelog e relatórios exigidos foram atualizados;
- riscos e pendências reais foram registrados.

Se qualquer item falhar, o status correto é:

**PENDENTE DE SANEAMENTO**

## KPIs

- Nº de referências quebradas em `SITE/` ativo por produto.
- Nº de páginas com SEO técnico incompleto.
- Nº de assets órfãos, duplicados ou acima do limite de peso definido.
- Tempo médio entre achado crítico e relatório técnico.
- Nº de deploys executados com rollback necessário.
- Nº de regressões pós-deploy por categoria: link, asset, SEO, performance, acessibilidade,
  segurança, UX.
- Percentual de páginas principais validadas em mobile e desktop antes do deploy.
- Percentual de scripts críticos com validação de sintaxe/teste.
- Percentual de missões com relatório, changelog e backlog atualizados.
- Nº de segredos/credenciais encontrados em auditoria.

## Processos

### 1. Boot sequence da Engenharia

Antes de qualquer missão:

1. Ler `AION_STUDIO_MANUAL.md`.
2. Ler `GOVERNANCE.md` do produto.
3. Ler `DEFINITION_OF_DONE.md`.
4. Ler `BACKLOG_OFICIAL.md`.
5. Ler `CHANGELOG_DA_IDENTIDADE.md`.
6. Ler decisões oficiais e relatórios recentes relacionados à missão.
7. Verificar `git status`.
8. Identificar o escopo exato e os limites da autorização.
9. Executar apenas o que foi autorizado.

### 2. Execução de missão

Cada missão técnica segue esta sequência:

1. Auditoria inicial.
2. Identificação de causa raiz.
3. Separação entre correção segura, risco, bloqueio e decisão não técnica.
4. Implementação mínima necessária.
5. Validação objetiva.
6. Relatório final.
7. Recomendação da próxima missão lógica.
8. Parada até nova autorização.

### 3. Regra de conflito

Se uma solução técnica exigir alterar identidade, UX, linguagem, paleta, tipografia, conteúdo
editorial ou arquitetura de marca, a Engenharia deve parar, explicar o conflito e aguardar
decisão do pipeline oficial.

## Auditorias técnicas

Auditorias conduzidas pela Engenharia devem verificar:

- estrutura de pastas;
- código morto;
- CSS/JS não utilizado;
- links internos e externos;
- assets quebrados;
- assets órfãos;
- duplicatas;
- imagens pesadas;
- SEO técnico;
- sitemap e robots;
- Open Graph e Twitter Card;
- JSON-LD;
- acessibilidade;
- responsividade;
- segurança;
- deployability;
- divergência entre produção e repositório;
- estado Git e risco de publicação acidental.

Toda auditoria deve classificar achados por severidade:

- **Crítico:** bloqueia deploy ou ameaça patrimônio, segurança, URLs, conteúdo ou receita.
- **Alto:** impacto relevante em SEO, performance, UX, acessibilidade, manutenção ou confiança.
- **Médio:** dívida técnica real, mas sem bloqueio imediato.
- **Baixo:** limpeza, organização ou melhoria incremental.

## Saneamento

Saneamento tem prioridade sobre evolução quando houver qualquer falha de integridade.

Durante saneamento:

- não criar funcionalidade nova;
- não publicar artigo novo;
- não criar hub novo;
- não redesenhar;
- não remover conteúdo sem autorização;
- corrigir apenas bugs, caminhos, referências, metadados, performance, acessibilidade,
  segurança e documentação relacionados ao escopo aprovado.

## Assets

Regras para assets:

- todo asset ativo deve existir no repositório oficial;
- caminhos devem funcionar em ambiente case-sensitive;
- não usar asset temporário como fonte permanente;
- não mover ou renomear assets sem atualizar todas as referências;
- não apagar órfãos sem plano e aprovação;
- duplicatas devem ser inventariadas antes de consolidação;
- imagens devem ser otimizadas sem perda perceptível de identidade;
- `ASSET_REGISTRY.md` deve refletir o estado real após missões de asset.

## SEO técnico

A Engenharia é responsável pelo SEO técnico, não pelo SEO editorial.

Escopo técnico:

- `title`;
- meta description;
- canonical;
- Open Graph;
- Twitter Card;
- JSON-LD;
- sitemap;
- robots;
- redirects planejados;
- URLs estáveis;
- integridade de imagens sociais;
- performance e Core Web Vitals;
- links internos funcionais.

A Engenharia não decide pauta, título editorial, posicionamento de conteúdo ou estratégia de
palavras-chave sem insumo de Manus/ChatGPT/Claude.

## Deploy

Deploy é uma operação crítica.

Antes de qualquer deploy:

- autorização explícita de Fábio;
- confirmação do escopo;
- revisão do `git status`;
- validação local;
- validação de links/assets;
- validação SEO;
- validação mobile/desktop quando aplicável;
- checagem de console;
- conferência de segredos;
- plano de rollback;
- relatório pré-deploy.

Depois do deploy:

- validar URLs reais;
- validar assets reais;
- validar sitemap/robots;
- validar páginas principais;
- registrar resultado;
- atualizar changelog e relatório.

Nenhum deploy é consequência automática de uma tarefa local.

## GitHub e versionamento

Regras:

- commits devem ser intencionais e pequenos o suficiente para revisão;
- nunca misturar mudanças não relacionadas;
- nunca reverter alterações de terceiros sem autorização;
- branches devem ter nome descritivo;
- PRs devem incluir escopo, validações, riscos e screenshots quando houver interface;
- arquivos gerados, caches e dependências devem respeitar `.gitignore`;
- renomes que mudam apenas caixa devem usar procedimento seguro:
  `nome-atual` → `nome-temporario` → `nome-final`;
- antes de qualquer operação destrutiva, pedir autorização.

## Performance

A Engenharia deve monitorar:

- peso total de páginas;
- tamanho de imagens;
- formatos adequados;
- lazy loading;
- scripts bloqueantes;
- CSS não utilizado;
- cache;
- compressão;
- fontes;
- LCP, CLS e INP quando houver ferramenta disponível.

Performance nunca justifica alterar identidade visual por iniciativa própria. Otimização deve
preservar aparência e intenção editorial.

## Acessibilidade

Critérios mínimos:

- imagens com `alt` adequado;
- controles com nome acessível;
- foco visível;
- navegação por teclado em fluxos interativos;
- sem conteúdo essencial inacessível a leitores de tela;
- feedback visual acompanhado de feedback acessível quando aplicável;
- contraste validado quando a missão tocar cor ou estado visual;
- sem armadilhas de foco;
- sem dependência exclusiva de hover.

## Segurança

A Engenharia deve procurar e reportar:

- credenciais em repositório;
- tokens, chaves, senhas e segredos;
- endpoints mortos ou herdados;
- scripts externos sem necessidade;
- formulários sem destino válido;
- arquivos sensíveis expostos em `SITE/`;
- dependências desatualizadas quando houver stack com pacotes;
- automações com permissão excessiva.

Quando um segredo real for encontrado, o relatório não deve expor o valor. Deve registrar o
arquivo, a linha aproximada e a recomendação de rotação.

## Backups e preservação

Antes de qualquer mudança de alto risco:

- preservar a versão anterior;
- registrar origem e motivo;
- não sobrescrever produção sem evidência;
- não apagar protótipos ou snapshots sem decisão;
- separar backup operacional de código ativo;
- documentar o que foi arquivado e por quê.

Backups não substituem Git, e Git não substitui plano de rollback de produção.

## Critérios de qualidade

Uma entrega de Engenharia é boa quando:

- parece que sempre pertenceu ao projeto;
- resolve a causa raiz, não só o sintoma;
- reduz risco futuro;
- melhora a capacidade de manutenção;
- preserva identidade e conteúdo;
- deixa evidência verificável;
- é reversível quando possível;
- não cria dependência oculta;
- não exige memória humana para ser entendida depois.

## Integração com os demais departamentos

- **Fábio → Engenharia:** aprova objetivos, deploys e decisões finais.
- **Claude → Engenharia:** entrega especificações de identidade, UX e branding; a Engenharia
  implementa sem alterar o sentido visual/editorial.
- **ChatGPT → Engenharia:** entrega arquitetura, estratégia e auditorias complexas; a Engenharia
  executa e reporta viabilidade técnica.
- **Manus → Engenharia:** entrega dados de SEO, mercado e oportunidade; a Engenharia aplica
  apenas o que for aprovado e tecnicamente seguro.
- **Beelzebub → Engenharia:** entrega rotinas, automações e monitoramento; a Engenharia valida,
  integra e corrige falhas técnicas.

## Relatórios

Todo relatório técnico deve conter:

- objetivo;
- escopo autorizado;
- arquivos alterados;
- validações executadas;
- problemas encontrados;
- problemas corrigidos;
- riscos;
- pendências;
- impacto;
- recomendação;
- status: apto, não apto, concluído, pendente de saneamento ou pendente de evidência.

## Indicadores de maturidade

Um produto é tecnicamente maduro quando:

- pode ser auditado por outro agente apenas lendo documentação e código;
- pode ser deployado sem depender de memória informal;
- tem assets rastreáveis;
- tem rotas estáveis;
- tem SEO técnico completo;
- não possui segredos expostos;
- possui plano de rollback;
- possui backlog e changelog vivos;
- possui baixa duplicação;
- possui validação automatizável.

---

Este documento é processo de Engenharia, não identidade. Ele não altera `DNA.md`,
`BRAND_BOOK.md`, `MANIFESTO.md`, `DESIGN_SYSTEM.md`, `UX_SYSTEM.md` ou `CONTENT_SYSTEM.md` de
nenhum produto. Qualquer atualização a ele deve ser registrada em `CHANGELOG_DA_IDENTIDADE.md`
de cada produto, como mudança de governança.
