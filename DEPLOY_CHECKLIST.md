# DEPLOY_CHECKLIST.md

Data: 2026-06-26  
Escopo: Proceder Filosófico e Japão Relativo  
Status: checklist obrigatório antes de qualquer deploy autorizado

## Regra Absoluta

Nenhum deploy pode ocorrer sem autorização explícita. Este checklist não autoriza publicação; ele define critérios mínimos para quando um deploy for solicitado.

## 1. Aprovação e Escopo

- Objetivo do deploy documentado.
- Projeto identificado: Proceder Filosófico, Japão Relativo ou ambos.
- Decisão de identidade/UX validada quando houver impacto visual.
- Nenhuma alteração de identidade, tipografia, paleta, linguagem ou arquitetura editorial fora de especificação oficial.
- Backlog atualizado com a tarefa correspondente.
- Changelog atualizado com impacto técnico e editorial quando aplicável.

## 2. Estado do Repositório

- `git status` revisado.
- Alterações não relacionadas identificadas e preservadas.
- Nenhum arquivo sensível novo incluído.
- Nenhum arquivo gerado, cache ou `.DS_Store` novo incluído.
- Nenhum backup dentro da superfície publicável sem justificativa.
- Branch, commit e pacote de deploy rastreáveis.

## 3. Integridade de Arquivos

- Todas as referências internas resolvem em ambiente case-sensitive.
- Imagens referenciadas existem.
- PDFs/downloads referenciados existem.
- Áudios e vídeos referenciados existem.
- Manifest existe e aponta para ícones válidos.
- Favicons existem e carregam.
- Nenhuma URL interna retorna 404 no pacote de deploy.

## 4. SEO Técnico

- Cada página publicável possui `title`.
- Cada página relevante possui meta description.
- Canonical presente e correto.
- Open Graph completo.
- Twitter Card completo.
- Imagem OG existente e válida.
- JSON-LD válido quando aplicável.
- `sitemap.xml` atualizado.
- `robots.txt` atualizado.
- URLs indexadas preservadas ou redirecionadas conforme plano.

## 5. Performance

- Imagens críticas otimizadas sem alteração perceptível indevida.
- Imagens não críticas com `loading="lazy"` quando aplicável.
- CSS e JS carregados sem duplicação óbvia.
- Scripts não bloqueiam conteúdo principal sem necessidade.
- Páginas principais verificadas em conexão simulada ou ambiente local equivalente.

## 6. Acessibilidade

- Imagens informativas possuem `alt`.
- Botões e links possuem nome acessível.
- Navegação por teclado preservada.
- Estados de foco visíveis.
- Contraste preservado conforme identidade oficial.
- Feedback de formulários/quiz é perceptível e acessível.

## 7. UX e Responsividade

- Mobile validado em 390px, 430px e 768px quando a página for responsiva.
- Desktop validado em largura comum.
- Sem overflow horizontal indevido.
- Sem sobreposição incoerente de texto, cards, navegação ou mídia.
- Nenhuma seção aparece quebrada, órfã ou sem função.

## 8. JavaScript e Console

- Console sem `console.error` nas páginas principais.
- Eventos principais funcionando.
- Formulários sem chamadas para endpoints mortos.
- Fallbacks funcionando quando recursos externos falham.

## 9. Segurança

- Nenhuma credencial, token ou segredo exposto.
- `.env` não incluído no deploy.
- Endpoints legados mortos removidos ou classificados como backlog.
- Downloads e links externos revisados.
- Arquivos de backup, snapshots e validação não expostos publicamente salvo decisão explícita.

## 10. Proceder Filosófico — Critérios Específicos

- Home reconciliada preservada.
- Artigos recuperados mantidos.
- Rotas publicadas preservadas.
- PDFs oficiais carregando.
- Assets legados usados por produção preservados.
- `SITE/wp-content/` mantido apenas quando necessário para compatibilidade.

## 11. Japão Relativo — Critérios Específicos

- Convenção `SITE/assets/` em minúsculas preservada.
- Survival validado.
- Quiz JLPT validado.
- Quiz Partículas validado.
- MP3s do Survival carregando.
- Manifest e favicons válidos.
- Nenhuma referência `ASSETS/` reintroduzida.

## 12. Validação Final

- Auditoria de links internos executada.
- Auditoria de assets executada.
- Auditoria SEO executada.
- Teste em servidor local executado quando aplicável.
- Browser real validado quando houver UI interativa.
- Relatório final gerado.
- Status explícito: apto ou não apto para deploy.

## 13. Pós-Deploy Quando Autorizado

- Verificar URLs principais em produção.
- Verificar sitemap e robots publicados.
- Verificar OG/Twitter Card em produção.
- Conferir console em produção.
- Registrar resultado no changelog.
- Registrar incidentes ou rollback, se houver.
