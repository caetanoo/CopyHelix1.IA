# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository contains the **Claude Code Agent Team** - a comprehensive ecosystem of 76+ specialized AI agent personas designed to work seamlessly with Claude Code's Task tool. The project provides expert-level assistance across the complete spectrum of business and technical challenges, from software development to strategic planning, marketing campaigns to financial analysis.

The repository also includes a React-based demo/landing page showcasing the agent capabilities with a modern, scientific-themed design featuring DNA/genetics metaphors and neon colors.

## Architecture

### Core Structure
**Main Repository Components:**
- **agents/**: 76+ specialized agent personas across 13+ categories
- **claude-code-subagents/**: Duplicate agent structure (for compatibility)
- **src/**: React demo application showcasing agent capabilities
- **server/**: Express.js backend for demo forms and database

### Agent Ecosystem
**13 Specialized Categories:**
- **core/**: Core technical development (14 agents)
- **ai-automation-specialists/**: AI and automation experts (6 agents)
- **account-team-agents/**: Client relationship management (5 agents)
- **finance-strategy/**: Financial analysis and strategy (7 agents)
- **growth-revenue-operations/**: Revenue and growth (7 agents)
- **market-research-agents/**: Market intelligence (5 agents)
- **design/**: Design and UX specialists (5 agents)
- **marketing/**: Marketing and content experts (7 agents)
- **operations/**: Operations excellence (5 agents)
- **product/**: Product innovation (3 agents)
- **project-management/**: Project coordination (3 agents)
- **testing/**: Quality assurance and testing (5 agents)
- **specialized-agents/**: Cross-functional specialists (4 agents)

### Demo Application Stack
- **React 18** with TypeScript for agent showcase
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling with DNA-themed design
- **Shadcn/ui** for UI components
- **Express.js** backend with Supabase/SQLite database
- **API proxy** from `/api/*` to localhost:3001

### Agent Integration
- **Automatic agent selection** based on context and keywords
- **Task tool integration** with Claude Code for seamless workflow
- **Multi-agent coordination** for complex business initiatives
- **Domain-specific expertise** across technical and business functions
- **Evidence-based approaches** with industry best practices

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Start demo application (localhost:8080)
npm run dev

# Start backend server with Supabase (localhost:3001)
npm run server

# Start backend server with SQLite (localhost:3001)
npm run server:sqlite

# Start full stack demo (both frontend and backend)
npm run dev:full

# Build demo application
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Setup agents (bash script)
./setup-agents.sh
```

### Agent Usage Workflow
1. **Describe your challenge** to Claude Code in natural language
2. **Agent selection** happens automatically based on context keywords
3. **Specialized assistance** delivered with domain-specific expertise
4. **Multi-agent coordination** for complex cross-functional initiatives
5. **Evidence-based solutions** with industry best practices

### Task Tool Integration
```python
# Explicit agent selection
Task(
  description="Analyze market opportunity",
  prompt="Conduct TAM analysis for our AI accounting software",
  subagent_type="tam-market-sizing-mx"
)

# Multi-agent coordination
Task(
  description="Complete product launch",
  prompt="Launch new SaaS product from concept to market",
  subagent_type="product-manager-orchestrator"
)
```

## Key Agent Categories

### Technical Excellence (14 agents)
- **systems-architect**: Enterprise architecture, scalability planning
- **senior-software-engineer**: Complex feature implementation
- **frontend-ux-specialist**: User experience and accessibility
- **backend-reliability-engineer**: APIs, databases, infrastructure
- **security-threat-analyst**: Cybersecurity and compliance
- **performance-optimizer**: Speed optimization and efficiency
- **code-analyzer-debugger**: Bug investigation and troubleshooting

### Business Strategy & Finance (14 agents)
- **business-strategist-fs**: Strategic planning and development
- **financial-analyst-fs**: Financial modeling and ROI analysis
- **pricing-strategist-fs**: Revenue optimization and pricing
- **competitive-intelligence-mx**: Market research and analysis
- **investment-analyst-fs**: Investment strategy and evaluation
- **risk-assessor-fs**: Risk management and mitigation
- **tam-market-sizing-mx**: Market opportunity assessment

### Marketing & Growth (14 agents)
- **growth-hacker-gr**: Viral growth and rapid scaling
- **content-creator**: Content strategy and creation
- **brand-guardian**: Brand strategy and consistency
- **customer-acquisition-gr**: Lead generation and conversion
- **tiktok-strategist**: Platform-specific social media
- **partnership-strategist-gr**: Strategic partnerships
- **retention-specialist-gr**: Customer retention and loyalty

## Agent Selection Guidelines

### Automatic Agent Matching
Agents are selected based on context keywords and domain expertise:

**Technical Keywords → Technical Agents**
- "performance", "optimize" → performance-optimizer
- "security", "vulnerability" → security-threat-analyst  
- "component", "UI", "responsive" → frontend-ux-specialist
- "API", "server", "database" → backend-reliability-engineer

**Business Keywords → Business Agents**
- "market", "competitor" → competitive-intelligence-mx
- "pricing", "revenue" → pricing-strategist-fs
- "growth", "scaling" → growth-hacker-gr
- "financial", "ROI" → financial-analyst-fs

**Marketing Keywords → Marketing Agents**
- "content", "blog" → content-creator
- "brand", "identity" → brand-guardian
- "social media", "viral" → platform specialists
- "acquisition", "leads" → customer-acquisition-gr

## Usage Patterns

### Single Agent Tasks
**Technical Development:**
```
"Create a responsive checkout component with accessibility features"
→ Activates: frontend-ux-specialist
```

**Business Strategy:**
```
"Analyze the SaaS market opportunity for our AI tool"
→ Activates: tam-market-sizing-mx
```

**Financial Planning:**
```
"Create a 3-year financial model with scenario planning"
→ Activates: financial-analyst-fs
```

### Multi-Agent Workflows
**Complete Product Launch:**
```
"Launch a new SaaS product from concept to market"
→ Orchestrates: tam-market-sizing-mx → business-strategist-fs → 
                prd-writer → systems-architect → content-creator
```

## Agent Best Practices

### Getting the Right Agent
1. **Be specific about domain** (technical vs business vs marketing)
2. **Use relevant keywords** (see Agent Selection Guidelines)
3. **Mention specific deliverables** (financial model, marketing strategy, etc.)
4. **Provide business context** (industry, stage, goals)

### Multi-Agent Coordination
1. **Request product-manager-orchestrator** for complex initiatives
2. **Break down into functional areas** (strategy, finance, marketing, ops)
3. **Use phrases like** "coordinate across teams" or "end-to-end workflow"
4. **Specify both technical and business requirements**

### Explicit Agent Selection
```
"Use the financial-analyst-fs to create ROI projections"
"Have the brand-guardian review our marketing materials"
"Use the competitive-intelligence-mx to analyze market position"
```

## Agent Quality Standards

### All agents follow:
- **Domain-specific expertise** with proven methodologies
- **Evidence-based recommendations** backed by data
- **Industry best practices** and frameworks
- **Cross-functional awareness** of how domains interconnect
- **Scalable solutions** from startup to enterprise
- **ROI consciousness** with business impact focus

### Quality indicators:
- Agent uses industry-specific terminology
- Provides evidence-based insights
- Demonstrates domain expertise depth
- Offers actionable, specific recommendations

## Agent Decision Matrix

### Technical Domains
| Keywords | Agent | Expertise |
|----------|-------|----------|
| "performance", "optimize" | performance-optimizer | Technical bottleneck analysis |
| "security", "vulnerability" | security-threat-analyst | Cybersecurity and compliance |
| "component", "UI" | frontend-ux-specialist | User experience and design |
| "API", "server" | backend-reliability-engineer | Server systems and infrastructure |
| "debug", "error" | code-analyzer-debugger | Systematic troubleshooting |

### Business Strategy Domains  
| Keywords | Agent | Expertise |
|----------|-------|----------|
| "market", "competitor" | competitive-intelligence-mx | Market research and analysis |
| "pricing", "revenue" | pricing-strategist-fs | Revenue optimization |
| "growth", "scaling" | growth-hacker-gr | Rapid growth strategies |
| "financial", "ROI" | financial-analyst-fs | Financial modeling |
| "risk", "compliance" | risk-assessor-fs | Risk management |

## Troubleshooting

### Agent Not Activating
- Use domain-specific keywords (see decision matrix)
- Be specific about business context and deliverables
- Try explicit activation: "Use the [agent-name] to..."
- Mention specific frameworks or methodologies

### Getting Generic Advice
- Specify industry and market context
- Mention specific business metrics or goals
- Reference particular frameworks or methodologies
- Ask for specialized approach or domain expertise

### Multi-Agent Coordination Issues
- Request product-manager-orchestrator for complex projects
- Break initiatives into clear functional areas
- Be explicit about both technical and business requirements
- Use phrases like "coordinate across business functions"

## Quick Start

### First Agent Interaction (5 minutes)
1. **Verify Claude Code access**: "Hello, can you see my project files?"
2. **Try different domains**:
   - Technical: "Debug this slow API endpoint"
   - Business: "Analyze competitor pricing strategy"
   - Marketing: "Create viral TikTok content strategy"
3. **Validate specialization**: Did agent use domain-specific expertise?

### Demo Application (Optional)
- The React app showcases agent capabilities with DNA-themed design
- Use `npm run dev:full` to start both frontend (8080) and backend (3001)
- Demo forms integrate with Supabase/SQLite for testing

### Agent Repository Structure
- Each agent is defined in markdown files under `agents/[category]/`
- Duplicate structure in `claude-code-subagents/` for compatibility
- 76+ agents across 13+ specialized categories
- Use `./setup-agents.sh` for automated setup