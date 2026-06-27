# TECHNICAL_DEBT.md

Data: 2026-06-26  
Escopo: Proceder Filosófico e Japão Relativo  
Status: dívida técnica documentada sem alteração funcional

## Critério de Classificação

- Crítica: pode impedir deploy seguro, expor dados, quebrar produção ou causar perda de conteúdo.
- Alta: degrada performance, manutenção, SEO técnico ou integridade do acervo.
- Média: aumenta custo operacional, risco futuro ou inconsistência estrutural.
- Baixa: limpeza, padronização ou melhoria incremental sem bloqueio imediato.

## Dívida Crítica

### Possíveis arquivos sensíveis versionados ou preservados localmente

Projetos afetados: Proceder Filosófico  
Evidências: `.env`, `SITE/.env`, `BELZEBU/.env.example`, cópias `.env` em backups.  
Impacto: risco de credenciais acidentais, configuração exposta ou deploy indevido.  
Ação recomendada: auditoria de segurança dedicada; verificar conteúdo sem divulgar segredos no relatório; mover segredos reais para ambiente seguro; manter somente `.env.example` sanitizado.

### Backups dentro ou próximos da superfície publicável

Projetos afetados: Proceder Filosófico  
Evidências: `SITE/docs/backups/` e snapshots de produção.  
Impacto: risco de publicar arquivos históricos, duplicados, sensíveis ou inconsistentes.  
Ação recomendada: definir exclusões de deploy e migrar backups para área não publicável após aprovação.

### Validação real de browser ainda pendente como etapa obrigatória

Projetos afetados: ambos  
Evidências: auditorias estáticas foram executadas, mas a consolidação atual não executou browser real, console e responsividade.  
Impacto: bugs de runtime, overflow, erro de JS e regressão visual podem passar despercebidos.  
Ação recomendada: tornar Playwright/browser validation etapa obrigatória antes de qualquer deploy.

## Dívida Alta

### Imagens grandes em excesso

Projetos afetados: ambos  
Evidências: Proceder com 338 imagens acima de 500 KB; Japão Relativo com 26 imagens acima de 500 KB.  
Impacto: piora de LCP, consumo de banda, ranqueamento e experiência mobile.  
Ação recomendada: missão de otimização com WebP/AVIF quando autorizado, preservando aparência e dimensões perceptíveis.

### Duplicação significativa de imagens

Projetos afetados: ambos  
Evidências: Proceder com 192 grupos duplicados; Japão Relativo com 11 grupos duplicados.  
Impacto: aumenta peso do repositório, risco de divergência editorial e custo de manutenção.  
Ação recomendada: criar mapa de uso e consolidar apenas após confirmar permalinks e referências públicas.

### Possíveis assets órfãos em grande volume

Projetos afetados: ambos  
Evidências: Proceder com 567 possíveis órfãos; Japão Relativo com 210 possíveis órfãos.  
Impacto: acervo difícil de manter e deploys maiores.  
Ação recomendada: missão de asset registry dinâmico, validando uso por HTML, CSS, JS, JSON, sitemap e produção.

### CSS e JS potencialmente mortos

Projetos afetados: ambos  
Evidências: Proceder com 11 CSS e 14 JS potenciais; Japão Relativo com 1 CSS e 2 JS potenciais.  
Impacto: manutenção confusa e risco de carregar legado desnecessário.  
Ação recomendada: confirmar com rastreamento de runtime antes de remover.

### Arquivos exportados e sociais volumosos no Japão Relativo

Projetos afetados: Japão Relativo  
Evidências: `EXPORTS/` com aproximadamente 186.87 MB e `SOCIAL_MEDIA/` com aproximadamente 16.55 MB.  
Impacto: repositório pesado, mistura de fonte, publicação e mídia social.  
Ação recomendada: política de retenção e separação entre assets publicáveis e materiais de produção.

## Dívida Média

### Nomes com acentos, espaços, caixa variada e dois-pontos

Projetos afetados: ambos  
Evidências: pastas e arquivos históricos com acentos, espaços, maiúsculas e `:`.  
Impacto: risco em ambientes Linux, CI, deploy e scripts case-sensitive.  
Ação recomendada: padronizar apenas para novos arquivos; migrar antigos com plano de redirecionamento quando forem públicos.

### Arquivos `.DS_Store`

Projetos afetados: ambos  
Evidências: múltiplos `.DS_Store` em raiz, branding, assets, archive e exports.  
Impacto: ruído de versionamento e deploy.  
Ação recomendada: adicionar regra de ignore e remover em missão de limpeza autorizada.

### PDFs duplicados no Proceder

Projetos afetados: Proceder Filosófico  
Evidências: `SITE/Manual-de-Epicteto-Proceder-Filosofico.pdf` e `SITE/wp-content/uploads/2026/05/manual-epicteto.pdf`.  
Impacto: duplicação de distribuição e possível conflito de canonical/download.  
Ação recomendada: preservar URLs públicas; escolher arquivo canônico e redirecionar quando houver plano.

### Backlog e Asset Registry precisam ser mantidos em ciclo contínuo

Projetos afetados: ambos  
Impacto: decisões técnicas podem se perder entre missões.  
Ação recomendada: atualizar registros a cada saneamento físico, otimização ou alteração de rota.

## Dívida Baixa

### Pastas vazias ou quase vazias

Projetos afetados: ambos  
Impacto: ruído estrutural baixo, mas atrapalha leitura do projeto.  
Ação recomendada: classificar antes de remover.

### Mistura de evidências, backups e conteúdo em áreas próximas

Projetos afetados: ambos  
Impacto: aumenta custo cognitivo.  
Ação recomendada: aplicar padrões de `ARCHIVE/`, `VALIDATION/`, `EXPORTS/` e `CONTENT/`.

### Documentos operacionais distribuídos em múltiplos pontos

Projetos afetados: ambos  
Impacto: localização difícil de normas técnicas.  
Ação recomendada: manter documentos de engenharia na raiz e referências formais em `BRANDING/02_DEPARTAMENTOS/ENGENHARIA.md`.

## Próximas Missões Recomendadas

1. Auditoria de segurança de arquivos sensíveis e exclusões de deploy.
2. Asset Registry dinâmico com confirmação de uso em runtime.
3. Otimização de imagens grandes preservando identidade visual.
4. Consolidação de backups fora da superfície publicável.
5. Limpeza controlada de `.DS_Store`, caches e arquivos gerados.
