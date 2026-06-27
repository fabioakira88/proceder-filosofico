# BACKUP_POLICY.md

Data: 2026-06-26  
Escopo: Proceder Filosófico e Japão Relativo  
Status: política documental, sem movimentação automática de arquivos

## Objetivo

Garantir que o patrimônio digital da AION Studio possa ser restaurado com segurança, sem misturar backups com produção ativa e sem risco de perda editorial, visual ou técnica.

## Princípios

- Nenhum backup substitui versionamento Git.
- Nenhum backup deve ser publicado por acidente.
- Nenhum arquivo ativo deve ser removido sem backup verificável.
- Snapshots de produção são evidência histórica e devem ser preservados.
- Backups devem ter data, origem, escopo e motivo.

## Tipos de Backup

| Tipo | Uso | Local recomendado |
|---|---|---|
| Snapshot de produção | Evidência de estado publicado | `VALIDATION/production-snapshots/` |
| Backup pré-missão | Segurança antes de alteração estrutural | `ARCHIVE/backups/YYYY-MM-DD-missao/` |
| Backup de reconciliação | Preservar versão substituída | `ARCHIVE/reconciliations/YYYY-MM-DD/` |
| Export bruto | Saída de ferramenta ou mídia social | `EXPORTS/YYYY-MM-DD/` |
| Evidência de auditoria | Logs, relatórios, screenshots | `VALIDATION/YYYY-MM-DD/` |
| Conteúdo fonte | Materiais editoriais ou dados mestres | `CONTENT/` |

A estrutura deve ser adotada progressivamente. Backups existentes não devem ser movidos sem plano aprovado.

## Nomenclatura

Padrão recomendado para novos backups:

```text
YYYY-MM-DD-projeto-escopo-origem/
```

Exemplos:

```text
2026-06-26-proceder-home-pre-reconciliacao/
2026-06-26-japao-relativo-assets-pre-otimizacao/
```

## Retenção

- Backups críticos de reconciliação e produção: retenção permanente enquanto houver valor histórico.
- Evidências de auditoria: manter enquanto a missão correspondente estiver ativa e arquivar após consolidação.
- Exports brutos: revisar periodicamente e manter somente o que tiver uso editorial, legal ou operacional.
- Caches e arquivos de sistema: não reter, salvo quando necessários para perícia técnica.

## Procedimento Antes de Alteração Estrutural

1. Definir escopo exato.
2. Identificar arquivos afetados.
3. Criar backup ou confirmar cobertura por Git.
4. Registrar motivo da alteração.
5. Validar que o backup abre e contém os arquivos esperados.
6. Executar alteração.
7. Validar links, assets, SEO e runtime.
8. Registrar resultado no relatório da missão.

## Procedimento de Restauração

1. Parar alterações em andamento.
2. Identificar ponto de restauração.
3. Comparar backup, Git e produção quando disponível.
4. Restaurar em área temporária primeiro.
5. Validar integridade antes de substituir arquivos ativos.
6. Registrar arquivos restaurados e motivo.
7. Executar checklist completo antes de qualquer deploy.

## O Que Não Deve Ir Para Backup Publicável

- `.env` com valores reais.
- Tokens, credenciais, chaves privadas ou dumps sensíveis.
- Caches locais.
- `.DS_Store`.
- `node_modules/`.
- Arquivos temporários de editor.
- Artefatos que possam expor dados não destinados ao público.

## Relação Com `SITE/`

`SITE/` deve ser tratado como publicável. Backups dentro de `SITE/` são exceção histórica e devem ser saneados em missão própria. Até lá, deploys precisam garantir que backups internos não sejam publicados indevidamente.

## Relação Com Git

- Git é a primeira linha de histórico técnico.
- Backups existem para preservar estados externos, produção viva, arquivos antes de migração e evidências.
- Renomes, especialmente case-sensitive, devem ser feitos com cuidado e registrados.
- Remoção destrutiva exige autorização explícita.

## Auditoria Periódica

Revisar trimestralmente:

- backups dentro de superfícies publicáveis;
- snapshots duplicados;
- exports sem uso;
- arquivos sensíveis em backups;
- tamanho total de `ARCHIVE/`, `VALIDATION/` e `EXPORTS/`;
- capacidade real de restauração.

## Status Atual

- Proceder Filosófico possui backups e snapshots relevantes, inclusive dentro de `SITE/docs/backups/`, que devem ser tratados como prioridade técnica antes de deploy estrutural.
- Japão Relativo possui `ARCHIVE/` e `EXPORTS/` volumosos que precisam de classificação antes de limpeza.
- Nenhuma movimentação foi realizada nesta missão.
