# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository contains **CopyHelix.ai** - an AI-powered Creative DNA Analysis Platform built with React, TypeScript, and a modern tech stack. The project includes:

1. **React Landing Page** - A marketing website showcasing DNA-themed AI creative analysis
2. **Agent Ecosystem** - 76+ specialized AI agent personas for business and technical tasks
3. **Express Backend** - API server supporting Supabase database
4. **Demo Forms** - Contact forms and meeting schedulers with database integration

## Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom DNA-themed animations and neon colors
- **Shadcn/ui** component library for consistent UI
- **React Router** for SPA navigation
- **Framer Motion** for advanced animations (performance-optimized)

### Backend Stack
- **Express.js** server with CORS enabled
- **Supabase** (PostgreSQL) with real-time subscriptions
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
├── hooks/              # Custom React hooks (mobile-first responsive)
├── lib/                # Utility functions
└── assets/             # Images and static files

server/
├── server-supabase.cjs # Supabase backend (main)
├── supabase.cjs        # Supabase client and operations
├── setup-database.cjs  # Database initialization scripts
└── migrate-database.cjs # Migration utilities

agents/                 # 76+ AI agent personas organized by category
api/                    # Vercel serverless functions
```

## Development Commands

### Primary Commands
```bash
# Install dependencies (use exact versions for consistency)
npm install

# Start development server (frontend only, auto-port selection starting from 8080)
npm run dev

# Start backend server with Supabase (port 3001)
npm run server

# Start full stack (both frontend and backend concurrently)
npm run dev:full

# Build for production (includes mobile optimization)
npm run build

# Build for development mode
npm run build:dev

# Lint code (ESLint with React hooks rules)
npm run lint

# Preview production build locally
npm run preview
```

### Development Server Behavior
- **Auto-port selection**: If port 8080 is in use, Vite automatically tries 8081, 8082, etc.
- **HMR (Hot Module Reload)**: Instant updates during development
- **Concurrent servers**: `npm run dev:full` runs both frontend (Vite) and backend (Express) simultaneously

### Build Environment
```bash
# Node.js version (specified in .nvmrc)
node --version  # Should be >=18.0.0

# Clean build (removes node_modules and package-lock.json)
npm run build:clean  # Equivalent to Vercel's install command

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

### Database Setup
The project uses Supabase as the database:
- **Production**: Supabase with environment variables in Vercel dashboard
- **Development**: Local Supabase instance with `.env` configuration
- **Tables**: `meetings`, `contacts`, `demos` with standard CRUD operations
- **Real-time**: Supabase real-time subscriptions for live updates

## Key Configuration Files

### Development Configuration
- `vite.config.ts` - Vite configuration with proxy to backend
- `tailwind.config.ts` - Custom Tailwind theme with DNA animations
- `tsconfig.json` - TypeScript configuration with path aliases
- `eslint.config.js` - ESLint rules with React hooks
- `.nvmrc` - Node.js version specification for consistent builds
- `.npmrc` - npm configuration for optimal dependency handling

### Environment Variables
Required environment variables (see `.env.example`):
```bash
# Supabase Configuration - REQUIRED
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend Supabase (for server-side operations)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001

# Analytics (Optional but recommended for production)
VITE_GA_TRACKING_ID=your_google_analytics_id
VITE_FB_PIXEL_ID=your_facebook_pixel_id

# Database Configuration
DB_TYPE=supabase

# Development vs Production
# - Development: Uses .env file
# - Production: Uses Vercel environment variables dashboard
```

## Design System

### Color Scheme
The project uses a DNA/genetics-themed design with neon colors:
- **Primary**: Neon green (`hsl(142 100% 50%)`)
- **Secondary**: Electric blue (`hsl(217 100% 65%)`)
- **Accent**: Bright orange (`hsl(38 92% 50%)`)
- **Background**: Dark theme with gradients

### Custom Animations & Mobile Optimizations
- `dna-rotate` - 15s continuous DNA helix rotation
- `orbit-slow` - 15s slow orbital particle animation with glow effects
- `orbit-medium` - 8s medium orbital animation with 3D transformations
- `orbit-fast` - 4s fast orbital animation with scaling and glow effects
- `float` - 4s floating element animation with rotation
- `glow-pulse` - 3s pulsing glow effects with multiple drop shadows
- `data-stream` - 2s data streaming effect with opacity changes
- `scan-line` - 3s scanning line animation
- `particle-drift` - 6s floating particle animation with scaling
- `mobile-hero-glow` - Mobile-optimized box shadow pulsing
- `mobile-card-shine` - Background gradient movement for mobile cards
- `metric-pulse` - Scale and brightness animations for mobile metrics
- `dna-energy-flow` - Rotating energy indicators for DNA visualizations

## Component Patterns & Architecture

### Page Structure
Each page component follows this pattern:
```tsx
// Import statements with absolute paths
import { ComponentName } from '@/components/ComponentName';
import { useViewportSize, useIsTouchDevice } from '@/hooks/use-mobile';

export default function PageName() {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Mobile-first responsive content */}
    </div>
  );
}
```

### Mobile-First Responsive Design
The project uses custom hooks for responsive behavior:
```tsx
// Mobile detection with Brazilian market breakpoints
const { category } = useViewportSize(); // 'mobile-small' | 'mobile-medium' | 'mobile-large' | 'tablet-small' | 'tablet-large' | 'desktop'
const isTouch = useIsTouchDevice(); // Detects touch capability

// Conditional rendering for mobile optimization
{category?.includes('mobile') && (
  <MobileOptimizedComponent />
)}

// Responsive animations and interactions
<motion.div
  whileHover={isTouch ? {} : { scale: 1.05 }} // No hover on touch devices
  whileTap={{ scale: 0.95 }} // Touch feedback
>
```

### Form Components
Forms use React Hook Form with Zod validation:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  // Zod validation schema
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});
```

### Styling Conventions
- **Mobile-first approach**: Design for mobile, enhance for desktop
- **DNA theme colors**: Primary (neon green), Secondary (electric blue), Accent (orange)
- **Performance**: AOS animations disabled on mobile, custom cursor disabled on touch
- **Accessibility**: Focus states, ARIA labels, semantic HTML
- **Glass-morphism effects**: backdrop-blur with layered transparency
- **Import paths**: Always use `@/` absolute imports, never relative imports

## Backend API Structure

### Database Schema
Three main tables with standard fields:
- `meetings` - Meeting scheduler data
- `contacts` - General contact form submissions  
- `demos` - Demo request submissions

### API Endpoints
```bash
# Form submissions
POST /api/meetings     # Schedule meeting
POST /api/contacts     # Submit contact form  
POST /api/demos        # Request demo

# Dashboard data retrieval
GET /api/meetings      # List meetings (with status/limit params)
GET /api/contacts      # List contacts (with status/limit params) 
GET /api/demos         # List demos (with status/limit params)
GET /api/stats         # Dashboard statistics

# Management
PUT /api/meetings/:id  # Update meeting status
GET /api/health        # Health check endpoint
```

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
- **Build target**: ES2020 for mobile compatibility
- **Code splitting**: 
  - `vendor` chunk: React and React DOM
  - `router` chunk: React Router DOM
  - Manual chunks for optimal loading
- **Optimizations**:
  - ESBuild minification
  - Conservative mobile optimizations
  - Source maps disabled in production
  - Chunk size warning at 1MB
- Optimized for Vercel deployment with SPA routing

### Deployment Configuration
- **Vercel deployment** optimized for SPA with API routes
- **vercel.json** configuration:
  - Custom install command: `rm -rf node_modules package-lock.json && npm install`
  - SPA routing with fallback to `/index.html`
  - API routes proxying (`/api/*` routes)
  - Asset caching (1 year for `/assets/*`)
  - CORS headers for API endpoints
  - Serverless function timeout: 10 seconds
- **Node.js version**: Specified in `.nvmrc` (18.x) for consistent builds
- **Build optimizations**: 
  - Explicit Rollup dependency for Linux environments
  - Regenerated package-lock.json for dependency consistency
  - npm configuration in `.npmrc` for optimal dependency handling
- **Environment variables**: Set in Vercel dashboard, not in code

## Development Workflow

### Starting Development
1. Copy `.env.example` to `.env` and configure variables
2. Run `npm install` to install dependencies  
3. Use `npm run dev:full` for full-stack development
4. Frontend available at `http://localhost:8080` (or next available port)
5. Backend API at `http://localhost:3001`

### Code Style & Best Practices
- **TypeScript**: Pragmatic configuration for rapid development
  - Strict mode disabled for flexibility
  - Unused variable warnings disabled
  - Focus on functionality over strict typing
- **ESLint**: React-focused configuration
  - React hooks rules enabled
  - TypeScript ESLint integration
  - React Refresh plugin for HMR
- **Import conventions**:
  - **Always use absolute imports**: `@/components/Component` not `./Component`
  - **Never use relative imports**: Prevents Vercel build issues
  - **Path aliases**: `@/` maps to `./src/`
- **Mobile Performance Optimizations**: 
  - AOS animations disabled on mobile
  - Custom cursor disabled on touch devices
  - Lazy loading with mobile fallbacks
  - Conservative animation durations (6s+) for smooth performance
  - GPU-accelerated transforms (transform/opacity properties)

### Testing & Quality Assurance
- **Manual testing**: Primary QA method using development servers
- **Cross-device testing**: Responsive breakpoints for Brazilian mobile market
- **Performance monitoring**: Core Web Vitals and mobile performance
- **Build verification**: `npm run build` must succeed before deployment
- **Linting**: `npm run lint` for code quality
- **No formal testing framework**: Rapid development approach without unit tests

## Mobile-First Development

### Brazilian Mobile Market Optimization
The project is specifically optimized for the Brazilian mobile market:
```tsx
// Mobile breakpoints for Brazilian devices
const BREAKPOINTS = {
  MOBILE_SMALL: 320,   // Older/budget Android devices
  MOBILE_MEDIUM: 375,  // iPhone SE, smaller screens  
  MOBILE_LARGE: 414,   // Most common mobile size in Brazil
  TABLET_SMALL: 768,   // Small tablets/large phones
  TABLET_LARGE: 1024,  // Full tablets
}
```

### Mobile-First Component Development
```tsx
// Always check for mobile category first
const { category } = useViewportSize();

// Mobile-specific rendering
{category?.includes('mobile') ? (
  <MobileOptimizedVersion />
) : (
  <DesktopVersion />
)}

// Touch-aware interactions
const isTouch = useIsTouchDevice();
<motion.div
  whileHover={isTouch ? {} : { scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Performance Considerations for Mobile
- **Animation performance**: Use transform and opacity for 60fps
- **Bundle optimization**: Conservative chunking for stability
- **Image optimization**: Responsive images with mobile fallbacks
- **Network optimization**: Minimize API calls, use caching
- **Battery optimization**: Disable heavy animations on mobile

## Troubleshooting

### Common Issues
- **API calls failing**: Check backend server is running on port 3001
- **Database errors**: Verify environment variables and database connection
- **Build errors**: Check for TypeScript errors and missing dependencies
- **Styling issues**: Ensure Tailwind classes match the custom theme configuration

### Database Configuration
**Supabase is the primary database**:
1. Set `DB_TYPE=supabase` in `.env`
2. Configure Supabase credentials (URL, anon key, service key)
3. Use `npm run server` to start the backend on port 3001
4. Backend proxies API calls from frontend to Supabase
5. **Real-time features**: Supabase subscriptions for live updates
6. **Tables**: Standard CRUD operations for meetings, contacts, demos

### Vercel Deployment Notes
- **Clean installs**: Vercel uses `rm -rf node_modules && npm install`
- **Linux environment**: Explicit Rollup dependencies for build success
- **Node.js version**: Fixed to 18.x via `.nvmrc`
- **Build troubleshooting**: Use absolute imports to prevent module resolution issues

### Performance Considerations
- **Mobile-first approach**: Optimized for mobile performance
- **Critical path loading**: Index page loads without lazy loading
- **Suspense boundaries**: Mobile-optimized loading fallbacks  
- **Animation performance**: Custom cursor and AOS disabled on mobile
- **Bundle optimization**: Conservative chunking strategy for stability

### Key Dependencies & Architecture
- **UI Framework**: Shadcn/ui with 40+ pre-built components
- **State Management**: React Query (@tanstack/react-query) for server state
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Validation**: Zod schemas with React Hook Form for type-safe forms
- **Styling**: Tailwind CSS with custom DNA theme and mobile-first approach
- **Animation**: Framer Motion (performance-optimized, selective usage)
- **Charts**: Recharts for data visualization and analytics
- **Development**: 
  - Vite for fast development and optimized builds
  - Concurrently for running frontend + backend simultaneously
  - ESLint for code quality
  - TypeScript for type safety (pragmatic configuration)
- **Mobile Hooks**: Custom responsive hooks for Brazilian mobile market
- **Build Tools**: Rollup (with Linux-specific dependencies for Vercel)

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.