# Belzebu

Belzebu e um orquestrador editorial externo para operar a producao de conteudo do Japao Relativo e do Proceder Filosofico.

Este MVP 0.3 roda em dois modos seguros:

- `dry-run`: simula a esteira e gera Markdown local.
- `generate-only`: usa um provider de IA para gerar JSON editorial estruturado.

Ele pode ler pautas reais do Notion, mas nao altera os sites, nao cria commits automaticamente e nao executa deploy.

## Objetivo do MVP 0.1

- Ler uma pauta local simulada.
- Gerar um draft editorial em Markdown.
- Gerar um prompt de imagem em Markdown.
- Gerar um relatorio local.
- Registrar a execucao em `data/runs.jsonl`.

## Comando de teste

Execute a partir da pasta `BELZEBU/`:

```bash
python3 src/main.py --source sample --dry-run --sample data/sample_pauta.json
```

Saidas esperadas:

```text
output/drafts/[slug].md
output/image-prompts/[slug].md
output/reports/[slug]-report.md
data/runs.jsonl
```

## Notion em modo seguro

Copie o exemplo de ambiente:

```bash
cp .env.example .env
```

Preencha:

```text
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

Comando de leitura real:

```bash
python3 src/main.py --source notion --site japao-relativo --limit 1 --dry-run
```

Sem `--write-notion`, qualquer mudanca de status e apenas simulada e registrada no relatorio/log.

Para permitir atualizacao real de status no Notion:

```bash
python3 src/main.py --source notion --site japao-relativo --limit 1 --dry-run --write-notion
```

## Como criar a integracao no Notion

1. Acesse as configuracoes de integracoes do Notion.
2. Crie uma integracao interna.
3. Copie o token secreto para `NOTION_TOKEN`.
4. Abra o database editorial no Notion.
5. Compartilhe o database com a integracao.
6. Copie o ID do database para `NOTION_DATABASE_ID`.

## Propriedades esperadas no database

| Propriedade | Tipo esperado |
| --- | --- |
| Título | Title |
| Site | Select |
| Status | Status |
| Categoria | Select |
| Cluster/Hub | Rich text |
| Slug | Rich text |
| Prioridade | Select |
| Palavras-chave | Multi-select ou Rich text CSV |
| Notas editoriais | Rich text |
| Data publicação | Date |
| Log de erro | Rich text |
| Run ID | Rich text |

Valores esperados:

```text
Status: Backlog, Em Produção, Publicado, Erro
Site: Japão Relativo, Proceder Filosófico
```

## AI Provider

O modo `generate-only` suporta:

- Anthropic Claude
- OpenAI

Configure em `.env`:

```text
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
OPENAI_MODEL=gpt-4.1
```

Exemplo com sample local:

```bash
python3 src/main.py --source sample --sample data/sample_pauta.json --generate-only
```

Exemplo com Notion:

```bash
python3 src/main.py --source notion --site japao-relativo --limit 1 --generate-only
```

Saidas do `generate-only`:

```text
output/generated/[slug]/article.json
output/generated/[slug]/seo.json
output/generated/[slug]/faq.json
output/generated/[slug]/image-prompt.json
output/generated/[slug]/report.json
```

## Estrutura dos JSONs

`article.json`:

```json
{
  "title": "...",
  "slug": "...",
  "summary": "...",
  "body_markdown": "...",
  "reading_time": 8,
  "h2_structure": ["..."]
}
```

`seo.json`:

```json
{
  "meta_title": "...",
  "meta_description": "...",
  "focus_keyword": "...",
  "og_title": "...",
  "og_description": "...",
  "schema_article": {}
}
```

`faq.json`:

```json
{
  "questions": [
    {
      "question": "...",
      "answer": "..."
    }
  ],
  "schema_faq": {}
}
```

`image-prompt.json`:

```json
{
  "og_prompt": "...",
  "instagram_prompt": "...",
  "visual_direction": "...",
  "palette": "...",
  "style": "..."
}
```

## Limites atuais

- Notion esta conectado apenas para leitura e atualizacao opcional de status.
- Geracao por API esta conectada apenas ao modo `generate-only`.
- Publicacao nos sites ainda nao implementada.
- Commit, push e deploy automaticos ainda nao implementados.

## Proximos passos

1. Conectar leitura real do Notion.
2. Adicionar gerador editorial com API configuravel.
3. Implementar validadores por projeto.
4. Implementar publishers separados para Japao Relativo e Proceder Filosofico.
5. Adicionar modo de publicacao com aprovacao explicita.
