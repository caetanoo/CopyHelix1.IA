# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a React-based landing page for CopyHelix.ai, an AI platform that analyzes the "DNA" of creative content to help infoprodutores and e-commerce businesses optimize their marketing creatives. The site features a modern, scientific-themed design with DNA/genetics metaphors and neon colors.

## Architecture

### Technology Stack
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling with custom design system
- **Shadcn/ui** for UI components
- **Framer Motion** for animations
- **React Router** for navigation (Brazilian Portuguese routes)
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **AOS (Animate On Scroll)** for scroll animations
- **TanStack Query** for server state management

### Backend Architecture
- **Express.js** server with CORS enabled
- **Supabase** for production database and authentication
- **SQLite** for local development (fallback)
- **API endpoints** at `/api/*` proxied from port 3001
- **Meeting and contact form handlers** with validation

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── legal/           # Legal pages (Privacy, Terms, LGPD, Cookies)
│   ├── blog/            # Blog post components
│   ├── CustomCursor.tsx # Custom cursor component
│   ├── DNAHelix.tsx     # DNA animation component
│   ├── FloatingElements.tsx # Orbital animations
│   ├── Header.tsx       # Site header with navigation
│   ├── Footer.tsx       # Site footer
│   ├── ExitIntentPopup.tsx # Lead capture popup
│   └── *Section.tsx     # Landing page sections
├── hooks/               # Custom React hooks (mobile detection, etc.)
├── lib/                # Utility functions (cn, etc.)
├── pages/              # Page components (Index, About, Blog, Help, Dashboard)
├── assets/             # Images and static assets (logos, creative examples)
└── index.css           # Global styles and design system

server/
├── server-supabase.cjs  # Production server with Supabase
├── server.cjs          # Development server with SQLite
├── supabase.cjs        # Database functions and queries
└── database/           # SQLite database file
```

### Design System
- **DNA-themed colors**: Neon green (#00FF00), electric blue (#4DA6FF), orange accent (#FF8C00)
- **Dark theme**: Very dark blue backgrounds (#0A0A0F)
- **Custom animations**: DNA helix rotations, orbital movements, particle effects
- **Responsive**: Mobile-first approach with Brazilian market optimizations
- **Accessibility**: WCAG compliance considerations

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Start development server (localhost:8080)
npm run dev

# Start backend server with Supabase (localhost:3001)
npm run server

# Start backend server with SQLite (localhost:3001)
npm run server:sqlite

# Start full stack (both frontend and backend)
npm run dev:full

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Development Workflow
- Hot module replacement enabled via Vite (port 8080)
- Backend API server runs on port 3001
- TypeScript strict checking enabled
- ESLint configuration for React best practices with unused vars disabled
- Tailwind CSS with custom design tokens and DNA-themed animations
- Proxy configuration for API calls (`/api/*` → `localhost:3001`)
- AOS (Animate On Scroll) initialization on app mount
- Path alias configured: `@/*` maps to `src/*`

### API Architecture
The backend provides REST endpoints for lead capture and data management:
- **POST /api/meetings** - Schedule demo meetings
- **POST /api/contacts** - Save contact form submissions
- **GET /api/stats** - Analytics and statistics
- **GET /api/meetings** - List all meetings (admin)
- **PUT /api/meetings/:id** - Update meeting status

## Key Features

### Landing Page Sections
1. **HeroSection**: Main value proposition with DNA animation
2. **ProblemSection**: Pain points for infoprodutores
3. **SolutionSection**: How CopyHelix.ai solves problems
4. **TechnologySection**: Technical capabilities
5. **TestimonialsSection**: Social proof and statistics
6. **DemoSection**: Headline with CTA button
7. **Footer**: Links and company information

### Interactive Elements
- **Custom Cursor**: Follows mouse with DNA-themed design
- **DNA Helix Animation**: 3D rotating DNA structure
- **Floating Elements**: Orbital animations around DNA
- **Exit Intent Popup**: Lead capture on page exit
- **Scroll Animations**: AOS (Animate On Scroll) integration

### Forms and Lead Capture
- Contact forms with validation
- Email marketing integration ready
- Legal compliance (LGPD, Privacy Policy, Terms of Use)
- Cookie consent management

## Styling Guidelines

### CSS Architecture
- **Global styles**: Defined in `src/index.css`
- **Component styles**: Tailwind utility classes
- **Custom animations**: CSS keyframes for DNA/scientific effects
- **Design tokens**: CSS custom properties for colors and effects

### Color System
```css
:root {
  --primary: 142 100% 50%;     /* Neon Green */
  --secondary: 217 100% 65%;   /* Electric Blue */
  --accent: 38 92% 50%;        /* Orange */
  --background: 222 84% 1%;    /* Dark Blue */
}
```

### Animation Classes
- `.dna-helix`: DNA rotation animation
- `.creative-element`: Floating animations
- `.orbit-*`: Orbital movement patterns
- `.glass-card`: Glassmorphism effect

## Business Context

### Target Audience
- **Primary**: Brazilian infoprodutores (digital product creators)
- **Secondary**: E-commerce businesses
- **Focus**: Performance marketers seeking creative optimization

### Value Proposition
- AI analyzes successful creative "DNA"
- Replicates winning patterns in new variations
- Maintains "genetic" success factors
- Scientific/laboratory positioning

### Conversion Goals
- Lead generation through contact forms (primary)
- Email list building (secondary)
- Brand positioning as premium AI solution

## Component Guidelines

### When adding new components:
1. Follow existing naming conventions (*Section.tsx for page sections)
2. Use TypeScript interfaces for props
3. Implement responsive design with Tailwind
4. Include proper accessibility attributes
5. Maintain DNA/scientific theme consistency

### Form components:
- Use React Hook Form + Zod validation
- Include proper error handling
- Implement loading states
- Follow LGPD compliance requirements

### Animation components:
- Use Framer Motion for complex animations
- CSS keyframes for simple repetitive animations
- Consider performance impact on mobile devices
- Provide reduced-motion alternatives

## Testing and Quality

### Before deployment:
- Test all form submissions
- Verify responsive design on mobile devices
- Check animation performance
- Validate LGPD compliance
- Test contact form flows

### Performance considerations:
- Optimize images in `src/assets/`
- Minimize bundle size
- Use lazy loading for non-critical components
- Monitor Core Web Vitals

## Routing and Internationalization

The application uses Brazilian Portuguese routes to target the local market:
- `/` - Landing page (Index)
- `/sobre` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/ajuda` - Help/Contact page
- `/contato` - Contact (redirects to /ajuda)
- `/dashboard` - Admin dashboard (protected)
- `/privacidade` - Privacy policy (LGPD compliant)
- `/termos` - Terms of use
- `/lgpd` - LGPD compliance information
- `/cookies` - Cookie policy

## Environment Configuration

The application supports multiple deployment environments:
- **Development**: Uses SQLite database via `npm run server:sqlite`
- **Production**: Uses Supabase via `npm run server`
- **Frontend-only**: Static site deployment with API routes in `public/api/`

## Integration Points

The repository also contains a collection of specialized agent personas for Claude Code's Task tool, located in the `agents/` directory. These are separate from the main React application and provide domain-specific expertise for development tasks.

## Important Notes

- ESLint is configured with `@typescript-eslint/no-unused-vars: "off"` to allow development flexibility
- The development server runs on port 8080 with history API fallback enabled
- All API calls are proxied from `/api/*` to `http://localhost:3001`
- The project uses SWC for React compilation via `@vitejs/plugin-react-swc`
- Tailwind includes custom DNA-themed animations like `dna-rotate`, `orbit-*`, and `glow-pulse`