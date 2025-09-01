# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 application for Pauline Roussel's yoga instructor website specializing in perinatal yoga, motherhood wellness, and birth accompaniment. The site uses server-side rendering and is built with modern React patterns.

**Target Market**: French-speaking pregnant women and new mothers in Quebec
**Primary Language**: French (85%), English (15%)
**Compliance**: GDPR, PIPEDA, Quebec Law 25

## Development Commands

### Core Development
- `npm run dev` - Start development server with HMR at http://localhost:5173
- `npm run build` - Create production build
- `npm run start` - Run production server from ./build/server/index.js
- `npm run typecheck` - Generate React Router types and run TypeScript compiler

### Testing and Linting
No test framework or linting tools are currently configured in this project.

## Architecture

### Tech Stack
- **Framework**: React Router v7 with SSR enabled
- **Styling**: TailwindCSS v4.1.4 
- **TypeScript**: Full TypeScript support with strict mode
- **Build Tool**: Vite with React Router plugin
- **Components**: shadcn/ui
- **Deployment**: Fly.io
- **Package Manager**: npm (not yarn/pnpm)

### File Structure
- `app/` - Main application code
  - `root.tsx` - Root layout component with HTML structure and error boundary
  - `routes.ts` - Route configuration using React Router's file-based routing
  - `routes/` - Route components
  - `components/` - Reusable components
  - `hooks/` - Custom hooks
  - `utils/` - Helper functions
  - `types/` - TypeScript types
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

## Agent System

### Available Specialized Agents

All specialized agents are defined in `.claude/agents/` directory with specific instructions for the Shooting Star project:

1. **[Technical Lead](.claude/agents/technical-lead.md)** - Architecture, code review, implementation
2. **[UI/UX Designer](.claude/agents/ui-ux-designer.md)** - Design, accessibility, user experience
3. **[QA Post Merge Tester](.claude/agents/qa-post-merge-tester.md)** - Quality assurance, testing, validation
4. **[Project Manager](.claude/agents/project-manager.md)** - Planning, coordination, delivery
5. **[Security Advisor](.claude/agents/security-advisor.md)** - Security, compliance, privacy
6. **[Perinatal Market Analyst](.claude/agents/perinatal-market-analyst.md)** - Market research, user insights

### Agent Coordination

Agents work together following the workflow defined in [Agent Coordination](docs/workflows/agent-coordination.md). Each agent has specific responsibilities and handoff protocols.

## Critical Workflow Rules

### Git Workflow (MANDATORY)

**NEVER work directly on main branch**

1. **Branch Creation**: Always create from issue
   ```bash
   git checkout -b feature/issue-XXX-description
   ```

2. **Commit Format**: Always reference issue
   ```bash
   git commit -m "[#XXX] Description"
   ```

3. **PR Linking**: Use `Related to` (NOT Closes)
   ```markdown
   Related to #XXX
   <!-- Issues go to Testing, not Done -->
   ```

### Development Flow

```
Issue Created → Assigned → Branch → Development → PR → Review → Merge → TESTING → Done
                                                                              ↑
                                                                        QA Gate (Critical)
```

**Important**: Only the QA Post Merge Tester can close issues (move to Done). They have veto power to send issues back to En Cours if quality standards aren't met.

## Project-Specific Requirements

### Accessibility (MANDATORY)
- WCAG 2.1 AA compliance minimum
- Pregnancy-specific adaptations:
  - Larger touch targets (44x44px minimum)
  - High contrast options
  - Reduced motion support
  - Session save/resume capability

### Language Requirements
- French-first development
- All UI text must be available in French
- Error messages in French
- Date format: DD/MM/YYYY
- Currency: CAD
- Phone format: (514) XXX-XXXX

### Performance Targets
- LCP < 2.5s
- FID < 100ms  
- CLS < 0.1
- Initial JS bundle < 200KB
- Lighthouse score > 90

### Security & Compliance
- PIPEDA compliance (Canadian federal)
- Quebec Law 25 compliance
- GDPR ready (if EU users)
- Health data encryption required
- Consent tracking mandatory

## Design System

### Brand Colors (Complete Palette)

#### Core Brand Colors
```css
/* Primary - Vert (Main Brand Green) */
--color-primary: #618462

/* Accent - Rose (Warm Rose Accent) */
--color-accent: #af6868

/* Secondary - Bleu (Calm Blue) */
--color-secondary: #517982

/* Neutral - Brun (Brown for Text) */
--color-neutral: #5e4530
```

#### Supporting Colors
```css
/* Additional Brand Colors */
--color-warm: #ceaf9b      /* Beige - Warm tones */
--color-soft: #ffddd3      /* Rose Pale - Soft backgrounds */
--color-cool: #dae6ea      /* Bleu Pale - Cool accents */
--color-menthe: #d4e8d4    /* Menthe - Fresh mint accent */
--color-white: #ffffff     /* Pure white */
--color-gris: #f5f4f2      /* Light gray background */
```

#### Usage Guidelines
- **Primary (Vert)**: Main brand identity, headers, CTAs
- **Accent (Rose)**: Highlights, links, important elements  
- **Secondary (Bleu)**: Supporting content, calm sections
- **Neutral (Brun)**: Body text, readable content
- **AVOID**: Bright reds (medical anxiety), harsh contrasts

### Typography
- **Headings**: The Seasons (elegant serif)
- **Body**: Barlow (clean sans-serif)
- **Subtitles**: Barlow SemiBold (600)
- **Accent**: Moontime (decorative script, use sparingly)

## Documentation Structure

### Main Documentation Hub
The project documentation is organized in the `docs/` directory:

- **[Documentation Hub](docs/README.md)** - Central navigation
- **[Getting Started](docs/01-getting-started/)** - Setup and configuration
- **[Development](docs/02-development/)** - Workflows and standards
- **[Agents](docs/03-agents/)** - Points to `.claude/agents/` for details
- **[Architecture](docs/04-architecture/)** - Technical decisions
- **[Design System](docs/05-design-system/)** - Brand and components
- **[Deployment](docs/06-deployment/)** - Production deployment
- **[Automation](docs/07-automation/)** - GitHub Actions and CI/CD
- **[Reference](docs/08-reference/)** - Troubleshooting and resources

### Key Resources
- **GitHub Issues**: Use templates in `.github/ISSUE_TEMPLATE/`
- **PR Template**: `.github/pull_request_template.md`
- **Contributing**: `.github/CONTRIBUTING.md`
- **Project Board**: [GitHub Project #5](https://github.com/flavius-atticae/shooting-star/projects/5)

## Issue and PR Management

### Issue Templates
- **Feature Request**: For new functionality
- **Bug Report**: For problems
- **Technical Debt**: For refactoring
- **Security Issue**: For vulnerabilities

### Label System
- **Priority**: P0 (Critical), P1 (High), P2 (Medium), P3 (Low)
- **Size**: XS (<2h), S (4h), M (1-2d), L (3-5d), XL (5+d)
- **Status**: Backlog → À Faire → En Cours → Review → Testing → Done → Released
- **Quality**: Code Quality, Performance, Security, Accessibility (auto-applied by PR checks)

### Automation
The project uses extensive GitHub Actions automation:
- Status transitions based on PR events
- Priority and size label syncing
- Quality gates on PRs
- Automated deployment to Fly.io

## Testing Requirements

### Post-Merge Testing Protocol
After PR merge, issues move to Testing status where the QA Post Merge Tester validates:

1. **Functional Testing**: All acceptance criteria met
2. **Cross-Browser**: 8+ browsers tested
3. **Language Testing**: French and English verified
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Performance**: Core Web Vitals targets met
6. **Security**: No vulnerabilities introduced

### Test Data
Test accounts are available for different user personas:
- Marie (first pregnancy, French)
- Sophie (multiple children, bilingual)
- Alexandra (high-risk, English)

## Communication Templates

### Starting Work
```markdown
## 🚀 Starting Implementation
- **Branch created**: `feature/issue-XXX-description`
- **Approach**: [Technical approach]
- **ETA**: [Estimate]
```

### Handoff Between Agents
```markdown
## 🔄 Handoff to @[agent]
**Context**: [What's done]
**Need**: [What's required]
**Artifacts**: [Links]
/cc @[next-agent]
```

## Important Reminders

1. **Every issue needs a branch** - No exceptions
2. **Use `Related to #XXX` in PRs** - Never use Closes/Fixes
3. **French comes first** - All features must work in French
4. **Test with real devices** - Especially mobile
5. **Consider pregnancy context** - Users may have physical/cognitive limitations
6. **Security is critical** - Health data requires extra protection
7. **QA has final say** - Respect the testing phase
8. **Document decisions** - Future agents need context

## Quick Reference

- **Local dev**: `npm run dev`
- **Type check**: `npm run typecheck`
- **Build**: `npm run build`
- **Branch format**: `feature/issue-XXX-description`
- **Commit format**: `[#XXX] Description`
- **PR format**: `Related to #XXX`

---

**Remember**: You're building for vulnerable users (pregnant women) in Quebec. Every decision should prioritize their safety, accessibility, and cultural needs.