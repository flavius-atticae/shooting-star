# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 application for a yoga instructor website specializing in perinatal yoga, motherhood wellness, and birth accompaniment. The site uses server-side rendering and is built with modern React patterns.

## Development Commands

### Core Development
- `npm run dev` - Start development server with HMR at http://localhost:5173
- `npm run build` - Create production build
- `npm run start` - Run production server from ./build/server/index.js
- `npm run typecheck` - Generate React Router types and run TypeScript compiler

### Storybook Development
- `npm run storybook` - Start Storybook development server at http://localhost:6006
- `npm run build-storybook` - Build static Storybook (requires temporary config changes)

The Storybook setup provides component development, testing, and documentation with full TailwindCSS v4.1.4 integration and Pauline Roussel brand theming.

### Testing and Linting
No test framework or linting tools are currently configured in this project.

## Architecture

### Tech Stack
- **Framework**: React Router v7 with SSR enabled
- **Styling**: TailwindCSS v4.1.4 
- **TypeScript**: Full TypeScript support with strict mode
- **Build Tool**: Vite with React Router plugin
- **Fonts**: Google Fonts (Inter)

### File Structure
- `app/` - Main application code
  - `root.tsx` - Root layout component with HTML structure and error boundary
  - `routes.ts` - Route configuration using React Router's file-based routing
  - `routes/` - Route components (currently just home.tsx)
  - `welcome/` - Welcome component and assets
  - `app.css` - Global styles
- `react-router.config.ts` - React Router configuration (SSR enabled)
- `vite.config.ts` - Vite configuration with TailwindCSS and tsconfigPaths plugins

### Key Patterns
- Server-side rendering is enabled by default
- Routes are configured in `app/routes.ts` using React Router's config approach
- Path aliases: `~/*` maps to `./app/*` 
- Type generation: React Router automatically generates types in `.react-router/types/`

### Deployment
The application supports Docker deployment and includes a Dockerfile. The build outputs to `build/client/` (static assets) and `build/server/` (server code).

## Documentation

All project documentation is centralized in the `docs/` directory with a comprehensive structure. Start with the **[Documentation Hub](docs/README.md)** which provides:

### Key Documentation Areas
- **[Getting Started](docs/getting-started/)** - Setup, configuration, and environment guides
- **[Architecture](docs/architecture/)** - Tech stack, system design, and technical decisions
- **[Deployment](docs/deployment/)** - Fly.io deployment guides and rollback procedures
- **[Security](docs/security/)** - Security guidelines, GDPR compliance, and best practices
- **[Workflows](docs/workflows/)** - Agent coordination, GitHub automation, and project management
- **[Design System](docs/design-system/)** - Brand guidelines and design standards
- **[Reference](docs/reference/)** - Troubleshooting guides and technical references

### Navigation
The **[docs/README.md](docs/README.md)** serves as the central navigation hub with detailed descriptions and links to all documentation sections. Always refer to this index when looking for specific information.

## Agent Coordination
- **MANDATORY**: Follow protocols defined in [Agent Coordination](docs/workflows/agent-coordination.md) for all GitHub issue collaboration
- Use appropriate handoff templates and validation checklists when working with specialized agents
- Apply role-specific workflows based on issue type (bug, feature, technical debt, security)
- Maintain transparent communication via GitHub issue comments during agent handoffs

## Agent-Specific Requirements

### Tech Lead Agent
**MANDATORY workflow for all development work:**
- **Branch Creation**: MUST create a branch for EVERY issue using format `feature/issue-XXX-description`
- **PR Linking**: MUST use `Related to #XXX` in PR descriptions (NEVER use Closes/Fixes/Resolves)
- **Commit Format**: MUST reference issues in commits: `[#XXX] Description`
- **Testing Flow**: Issues go to Testing after PR merge, not Done
- **Full Instructions**: See `/docs/agents/tech-lead-workflow.md`

### Perinatal Market Analyst Agent
**MANDATORY for all feature requests:**
- **Feature Description**: MUST include market context and user needs
- **Business Objectives**: MUST define impact and ROI
- **Personas**: MUST identify with demographic insights
- **Template Sections**: Responsible for first 3 sections of feature request template

### UI/UX Designer Agent
**Required for user-facing features:**
- Wireframes/mockups for all UI changes
- WCAG 2.1 AA accessibility compliance
- Responsive design specifications
- Interaction patterns documentation

### Project Manager Agent
**Issue management requirements:**
- Assign priority labels (P0-P3) based on business impact
- Assign size labels (XS-XL) based on effort estimation
- Coordinate agent handoffs using templates
- Track milestones and dependencies

### Security Advisor Agent
**Security review triggers:**
- Features handling user data
- Authentication/authorization changes
- External API integrations
- Payment or sensitive information processing

## Workflow Enforcement

**CRITICAL**: The Tech Lead workflow is NOT optional. Every issue MUST follow this process:

1. Issue created → Assigned → Branch created
2. Development → Commits with `[#XXX]` references
3. PR created with `Related to #XXX` → Code review
4. PR merged → Issue moves to Testing (stays OPEN)
5. QA validation → Manual issue closure → Done
6. Release → Status: Released

**Detailed workflows**: `/docs/agents/` directory contains complete instructions for each agent role.

---