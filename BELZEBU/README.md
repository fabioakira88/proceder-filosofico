# Belzebu

Belzebu e um orquestrador editorial externo para operar a producao de conteudo do Japao Relativo e do Proceder Filosofico.

Este MVP 0.1 roda apenas em modo `dry-run`. Ele nao conecta com Notion real, nao chama APIs de IA, nao altera os sites, nao cria commits automaticamente e nao executa deploy.

## Objetivo do MVP 0.1

- Ler uma pauta local simulada.
- Gerar um draft editorial em Markdown.
- Gerar um prompt de imagem em Markdown.
- Gerar um relatorio local.
- Registrar a execucao em `data/runs.jsonl`.

## Comando de teste

Execute a partir da pasta `BELZEBU/`:

```bash
python3 src/main.py --dry-run --sample data/sample_pauta.json
```

Saidas esperadas:

```text
output/drafts/[slug].md
output/image-prompts/[slug].md
output/reports/[slug]-report.md
data/runs.jsonl
```

## Limites atuais

- Notion real ainda nao conectado.
- Geracao por API ainda nao conectada.
- Publicacao nos sites ainda nao implementada.
- Commit, push e deploy automaticos ainda nao implementados.

## Proximos passos

1. Conectar leitura real do Notion.
2. Adicionar gerador editorial com API configuravel.
3. Implementar validadores por projeto.
4. Implementar publishers separados para Japao Relativo e Proceder Filosofico.
5. Adicionar modo de publicacao com aprovacao explicita.
