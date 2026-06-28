# REPOSITORY_STANDARDS.md

Data: 2026-06-26  
Escopo: padrões técnicos para Proceder Filosófico e Japão Relativo  
Status: padrão documental, sem migração automática

## Princípio

O repositório deve ser previsível, portátil, seguro e sustentável. A padronização técnica nunca pode alterar identidade visual, UX, tipografia, paleta, linguagem ou arquitetura editorial sem decisão oficial.

## Convenção Geral

- Novos arquivos devem usar `lowercase-kebab-case`.
- Evitar espaços, acentos, caracteres especiais e dois-pontos em novos caminhos.
- Evitar diferenças apenas de caixa entre pastas ou arquivos.
- Usar extensões em minúsculas para novos arquivos.
- Preservar URLs públicas antigas até existir plano de redirecionamento.
- Não mover arquivos públicos sem mapear referências, SEO e backlinks.

## Estrutura Recomendada de Alto Nível

```text
PROJECT_ROOT/
  BRANDING/
  SITE/
  CONTENT/
  AUTOMATION/
  VALIDATION/
  ARCHIVE/
  EXPORTS/
  DOCS/
  ENGINEERING_STRUCTURE.md
  TECHNICAL_DEBT.md
  DEPLOY_CHECKLIST.md
  REPOSITORY_STANDARDS.md
  BACKUP_POLICY.md
```

Nem todos os projetos precisam ter todas as pastas imediatamente. A criação deve acontecer conforme necessidade real e autorização.

## Superfície Publicável

- `SITE/` é a superfície ativa de publicação.
- Backups, snapshots, exports brutos, testes e evidências não devem ficar dentro de `SITE/` sem regra explícita de exclusão.
- Arquivos dentro de `SITE/` devem ser tratados como potencialmente publicáveis.

## Assets

Padrão preferencial para novos ativos:

```text
SITE/assets/
  images/
    articles/
    cards/
    heroes/
    backgrounds/
    social/
    og/
  icons/
  logos/
  audio/
  video/
  pdf/
  data/
  css/
  js/
```

Observação: a estrutura existente não deve ser migrada automaticamente. Este padrão vale para novos assets e futuras missões de reorganização aprovadas.

## Imagens

- Usar formatos modernos quando autorizado e sem perda perceptível indevida.
- Manter imagem original em área fonte quando necessário.
- Usar `alt` em imagens informativas.
- Usar `loading="lazy"` em imagens abaixo da dobra quando aplicável.
- Definir dimensões ou proporção para evitar layout shift.
- Toda imagem OG deve existir localmente, ter caminho estável e ser validada antes de deploy.

## PDFs e Downloads

- PDFs públicos devem ter caminho estável.
- Não duplicar PDFs sem justificativa de URL ou compatibilidade.
- Downloads devem ser auditados como assets publicáveis.
- Mudança de permalink de PDF exige plano de redirecionamento.

## Áudio e Vídeo

- Áudios publicáveis devem ficar sob `SITE/assets/audio/` ou subpasta funcional equivalente.
- Vídeos publicáveis devem ter poster, fallback e compressão adequada.
- Survival deve preservar MP3 normal e lento quando especificado.
- Referências de áudio/vídeo entram no checklist de links quebrados.

## CSS e JavaScript

- CSS/JS novo deve ser criado somente quando houver necessidade real.
- Preferir reutilização de padrões existentes.
- Evitar bibliotecas novas sem justificativa técnica.
- Scripts legados só devem ser removidos após validação de runtime.
- CSS potencialmente morto precisa de missão dedicada antes de exclusão.

## SEO Técnico

- Toda página publicável relevante deve possuir `title`, description, canonical, OG e Twitter Card.
- JSON-LD deve ser válido e compatível com o tipo de página.
- Sitemap deve refletir rotas reais.
- Robots deve ser coerente com a estratégia de indexação.
- Nenhum link interno quebrado pode ser aceito em página nova ou deploy.

## Favicons e Manifest

- Favicons devem existir nos caminhos declarados.
- Manifest deve apontar apenas para ícones existentes.
- Ícones não devem ser trocados por iniciativa técnica quando isso impactar identidade.
- Padronização de favicon é saneamento técnico, não redesign.

## Backups e Arquivos Históricos

- Backups não devem ser editados como fonte ativa.
- Arquivos experimentais devem ser classificados antes de uso.
- Snapshots de produção devem ser preservados como evidência, mas não misturados com deploy.
- Remoção física exige autorização explícita e plano de rollback.

## Git e Versionamento

- Mudanças devem ser pequenas, rastreáveis e com escopo claro.
- Nunca reverter alterações do usuário sem autorização.
- Renomes case-sensitive devem usar etapa intermediária quando necessário.
- Arquivos gerados, caches e `.DS_Store` devem ser ignorados quando possível.

## Documentação Obrigatória

Para missões estruturais, atualizar quando aplicável:

- `BACKLOG_OFICIAL.md`
- `CHANGELOG_DA_IDENTIDADE.md`
- `ASSET_REGISTRY.md`
- relatórios de missão
- documentos de engenharia na raiz
