# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository contains **CopyHelix.ai** - an AI-powered Creative DNA Analysis Platform built with React, TypeScript, and a modern tech stack. The project includes:

1. **React Landing Page** - A marketing website showcasing DNA-themed AI creative analysis
2. **Agent Ecosystem** - 76+ specialized AI agent personas for business and technical tasks
3. **Express Backend** - API server supporting both Supabase and SQLite databases
4. **Demo Forms** - Contact forms and meeting schedulers with database integration

## Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom DNA-themed animations and neon colors
- **Shadcn/ui** component library for consistent UI
- **React Router** for SPA navigation
- **Framer Motion** for advanced animations

### Backend Stack
- **Express.js** server with CORS enabled
- **Dual Database Support**: Supabase (production) or SQLite (development)
- **Database Tables**: `meetings`, `contacts`, `demos`
- **API Proxy**: `/api/*` routes proxy to localhost:3001

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── blog/           # Blog post components
│   └── legal/          # Legal compliance components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static files

server/
├── server.cjs          # SQLite backend
├── server-supabase.cjs # Supabase backend
└── database/           # SQLite database files

agents/                 # 76+ AI agent personas
claude-code-subagents/  # Duplicate agent structure
```

## Development Commands

### Primary Commands
```bash
# Install dependencies
npm install

# Start development server (frontend only, port 8080)
npm run dev

# Start backend server with Supabase (port 3001)
npm run server

# Start backend server with SQLite (port 3001)
npm run server:sqlite

# Start full stack (both frontend and backend)
npm run dev:full

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Database Setup
The project supports two database configurations:
- **Development**: SQLite database at `server/database/copyhelix.db`
- **Production**: Supabase with environment variables in `.env`

## Key Configuration Files

### Development Configuration
- `vite.config.ts` - Vite configuration with proxy to backend
- `tailwind.config.ts` - Custom Tailwind theme with DNA animations
- `tsconfig.json` - TypeScript configuration with path aliases
- `eslint.config.js` - ESLint rules with React hooks

### Environment Variables
Required environment variables (see `.env.example`):
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
PORT=3001
DB_TYPE=supabase
```

## Design System

### Color Scheme
The project uses a DNA/genetics-themed design with neon colors:
- **Primary**: Neon green (`hsl(142 100% 50%)`)
- **Secondary**: Electric blue (`hsl(217 100% 65%)`)
- **Accent**: Bright orange (`hsl(38 92% 50%)`)
- **Background**: Dark theme with gradients

### Custom Animations
- `dna-rotate` - 15s continuous DNA helix rotation
- `orbit-slow/medium/fast` - Orbital particle animations
- `glow-pulse` - Pulsing glow effects
- `float` - Floating element animations

## Component Patterns

### Page Structure
Each page component follows this pattern:
```tsx
// Import statements
import { ComponentName } from '@/components/ComponentName';

export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Page content with DNA theme styling */}
    </div>
  );
}
```

### Form Components
Forms use React Hook Form with Zod validation:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
```

### Styling Conventions
- Use Tailwind classes with custom DNA theme colors
- Implement responsive design mobile-first
- Add glow effects and neon styling for interactive elements
- Use CSS custom properties for dynamic theming

## Backend API Structure

### Database Schema
Three main tables with standard fields:
- `meetings` - Meeting scheduler data
- `contacts` - General contact form submissions  
- `demos` - Demo request submissions

### API Endpoints
- `POST /api/meetings` - Schedule meeting
- `POST /api/contacts` - Submit contact form
- `POST /api/demos` - Request demo

## Agent System Integration

The project includes 76+ specialized AI agent personas across 13 categories:
- **Core Technical** (14 agents) - Software development lifecycle
- **Business Strategy** (7 agents) - Financial planning, strategy
- **Marketing** (7 agents) - Content creation, social media
- **Operations** (5 agents) - Process optimization, analytics
- And 9 more specialized categories

### Using Agents with Claude Code
Agents are automatically selected based on context keywords or can be explicitly invoked:
```
# Automatic selection
"Debug this slow API endpoint" → code-analyzer-debugger
"Analyze competitor pricing" → pricing-strategist-fs

# Explicit selection  
"Use the financial-analyst-fs to create ROI projections"
```

## Build and Deployment

### Build Process
- Vite builds to `dist/` directory
- Automatic code splitting for vendor, router, and UI libraries
- Optimized for Vercel deployment with SPA routing

### Deployment Configuration
- `vercel.json` configures SPA routing and asset caching
- Environment variables must be set in Vercel dashboard
- Backend can be deployed as Vercel Serverless Functions

## Development Workflow

### Starting Development
1. Copy `.env.example` to `.env` and configure variables
2. Run `npm install` to install dependencies  
3. Use `npm run dev:full` for full-stack development
4. Frontend available at `http://localhost:8080`
5. Backend API at `http://localhost:3001`

### Code Style
- TypeScript strict mode disabled for rapid development
- ESLint configured with React hooks rules
- Unused variables warnings disabled for development speed
- Path aliases configured (`@/` maps to `./src/`)

### Testing
- No formal testing framework currently configured
- Manual testing through development servers
- Component testing through Storybook-style development

## Troubleshooting

### Common Issues
- **API calls failing**: Check backend server is running on port 3001
- **Database errors**: Verify environment variables and database connection
- **Build errors**: Check for TypeScript errors and missing dependencies
- **Styling issues**: Ensure Tailwind classes match the custom theme configuration

### Database Switching
To switch between SQLite and Supabase:
1. Update `DB_TYPE` environment variable
2. Use appropriate server command (`npm run server` vs `npm run server:sqlite`)
3. Ensure corresponding environment variables are set