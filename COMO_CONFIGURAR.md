# 🚀 Como Configurar os Agentes no Claude Code

Este guia te ajudará a configurar todos os **76+ agentes especializados** no Claude Code para que ele possa usar automaticamente os subagents corretos para cada tipo de tarefa.

## 📋 Pré-requisitos

1. **Claude Code ativo** - Você precisa ter acesso ao Claude Code (claude.ai/code)
2. **Projeto aberto** - Tenha seu projeto aberto no Claude Code
3. **Arquivos dos agentes** - Todos os arquivos `.md` dos agentes devem estar no projeto

## 🎯 Método 1: Configuração Automática (Recomendado)

### Passo 1: Copiar todos os agentes para o projeto

```bash
# No terminal do Claude Code, execute:
cp -r claude-code-subagents/agents/* ./agents/
cp claude-code-subagents/CLAUDE.md ./
cp claude-code-subagents/README.md ./
```

### Passo 2: Verificar a estrutura

```bash
# Verifique se os agentes foram copiados corretamente
ls -la agents/
find agents/ -name "*.md" | wc -l  # Deve mostrar 75+ arquivos
```

### Passo 3: Ativar no Claude Code

No Claude Code, digite:

```
Olá! Eu tenho uma coleção completa de agentes especializados neste projeto. 
Por favor, analise os arquivos na pasta 'agents/' e configure-se para usar 
automaticamente o agente mais apropriado para cada tipo de tarefa que eu solicitar.

Os agentes estão organizados em 13 categorias:
- Core Technical Excellence (14 agentes)
- AI & Automation Specialists (6 agentes)
- Account Team Excellence (5 agentes)
- Finance & Strategy (7 agentes)
- Growth & Revenue Operations (7 agentes)
- Market Research Intelligence (5 agentes)
- Design Excellence (5 agentes)
- Marketing Mastery (7 agentes)
- Operations Excellence (5 agentes)
- Product Innovation (3 agentes)
- Project Management (3 agentes)
- Testing & Quality (5 agentes)
- Specialized Solutions (4 agentes)

Por favor, leia o arquivo CLAUDE.md para entender como usar esses agentes.
```

## 🎯 Método 2: Configuração Manual por Categoria

Se preferir configurar por partes, você pode copiar apenas as categorias que precisa:

### Para Desenvolvimento Técnico:
```bash
cp -r claude-code-subagents/agents/core ./
cp -r claude-code-subagents/agents/ai-automation-specialists ./
cp -r claude-code-subagents/agents/testing ./
```

### Para Negócios e Estratégia:
```bash
cp -r claude-code-subagents/agents/finance-strategy ./
cp -r claude-code-subagents/agents/market-research-agents ./
cp -r claude-code-subagents/agents/business-strategist ./
```

### Para Marketing e Crescimento:
```bash
cp -r claude-code-subagents/agents/marketing ./
cp -r claude-code-subagents/agents/growth-revenue-operations ./
cp -r claude-code-subagents/agents/design ./
```

## 🧪 Como Testar se Funcionou

### Teste 1: Agente Técnico
```
"Preciso otimizar a performance desta API que está lenta"
```
**Esperado:** Ativa o `performance-optimizer`

### Teste 2: Agente de Negócios
```
"Analise a estratégia de preços dos nossos concorrentes"
```
**Esperado:** Ativa o `pricing-strategist-fs` ou `competitive-intelligence-mx`

### Teste 3: Agente de Marketing
```
"Crie uma estratégia de conteúdo viral para TikTok"
```
**Esperado:** Ativa o `tiktok-strategist`

## 🎯 Uso Avançado com Task Tool

Para usar explicitamente um agente específico:

```python
Task(
  description="Otimizar performance da API",
  prompt="Analise e otimize a performance desta API endpoint que está processando 1000+ requests por minuto",
  subagent_type="performance-optimizer"
)
```

## 📚 Exemplos de Uso por Domínio

### Desenvolvimento Técnico
```
"Debug este erro de autenticação no sistema"
→ Ativa: code-analyzer-debugger

"Crie uma arquitetura escalável para nosso e-commerce"
→ Ativa: systems-architect

"Implemente testes automatizados para esta funcionalidade"
→ Ativa: qa-test-engineer
```

### Análise Financeira
```
"Crie um modelo financeiro para os próximos 3 anos"
→ Ativa: financial-analyst-fs

"Avalie os riscos de expandir para o mercado europeu"
→ Ativa: risk-assessor-fs

"Otimize nossa estratégia de preços SaaS"
→ Ativa: pricing-strategist-fs
```

### Marketing e Crescimento
```
"Desenvolva uma estratégia de aquisição de clientes"
→ Ativa: customer-acquisition-gr

"Crie uma campanha viral para nosso app"
→ Ativa: growth-hacker

"Otimize nossa presença no Instagram"
→ Ativa: instagram-curator
```

### Pesquisa de Mercado
```
"Analise o tamanho do mercado para nossa solução"
→ Ativa: tam-market-sizing-mx

"Pesquise nossos principais concorrentes"
→ Ativa: competitive-intelligence-mx

"Analise tendências do Reddit para nosso nicho"
→ Ativa: reddit-intelligence-mx
```

## 🔧 Solução de Problemas

### Agente não está ativando?
1. **Use palavras-chave específicas** do domínio
2. **Seja específico sobre o contexto** (B2B vs B2C, indústria, estágio)
3. **Mencione entregáveis específicos** que você precisa
4. **Tente ativação explícita**: "Use o agente financial-analyst-fs para..."

### Recebendo conselhos genéricos?
1. **Especifique sua indústria e contexto de mercado**
2. **Mencione métricas ou objetivos específicos**
3. **Referencie frameworks ou metodologias específicas**
4. **Peça pela abordagem especializada ou expertise do domínio**

### Problemas de coordenação multi-agente?
1. **Peça pelo product-manager-orchestrator** para projetos complexos
2. **Divida iniciativas em áreas funcionais claras**
3. **Especifique quais aspectos precisam de diferentes tipos de expertise**
4. **Use frases como** "coordene entre funções de negócio" ou "workflow end-to-end"

## 🎯 Dicas de Uso Eficiente

### 1. Seja Específico sobre o Contexto de Negócio
❌ "Me ajude a crescer meu negócio"
✅ "Crie uma estratégia de aquisição de clientes para nosso SaaS B2B focado em pequenas empresas"

### 2. Forneça Contexto Completo
- **Objetivos de Negócio**: O que você está tentando alcançar
- **Contexto de Mercado**: Indústria, competição, público-alvo
- **Restrições**: Orçamento, prazo, recursos, requisitos regulatórios
- **Métricas de Sucesso**: Como você medirá o sucesso

### 3. Confie na Expertise do Domínio
Cada agente traz conhecimento especializado e metodologias comprovadas. Deixe-os guiar a abordagem enquanto você fornece contexto e requisitos de negócio.

### 4. Aproveite Workflows Multi-Agente
Para iniciativas complexas, coordene múltiplos especialistas de forma mais eficaz do que tentar lidar com tudo com uma abordagem generalista.

## 🚀 Próximos Passos

1. **Configure os agentes** usando um dos métodos acima
2. **Teste com tarefas simples** para verificar se está funcionando
3. **Experimente workflows complexos** envolvendo múltiplos agentes
4. **Personalize e adapte** os agentes para suas necessidades específicas

## 📞 Suporte

Se você encontrar problemas:
1. Verifique se todos os arquivos `.md` dos agentes estão no projeto
2. Confirme que o Claude Code tem acesso aos arquivos
3. Tente reiniciar a sessão do Claude Code
4. Use ativação explícita de agentes com o Task tool

---

**🎉 Parabéns!** Agora você tem acesso a uma equipe completa de especialistas em IA que podem ajudar com qualquer aspecto do seu negócio, desde desenvolvimento técnico até estratégia, marketing, finanças e operações. 