# Shooting Star ✨

<!-- CI/CD & Quality Badges -->
[![PR Checks](https://img.shields.io/github/actions/workflow/status/flavius-atticae/shooting-star/pr-checks.yml?label=PR%20checks&logo=github)](https://github.com/flavius-atticae/shooting-star/actions/workflows/pr-checks.yml)
[![Main Monitoring](https://img.shields.io/github/actions/workflow/status/flavius-atticae/shooting-star/main-monitoring.yml?label=E2E%20monitoring&logo=github)](https://github.com/flavius-atticae/shooting-star/actions/workflows/main-monitoring.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/de4d964491334b96b86f423b7b198fc7)](https://app.codacy.com/gh/flavius-atticae/shooting-star/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

<!-- Tech Stack Badges -->
![React Router](https://img.shields.io/badge/React_Router-v7.7.1-CA4245?logo=react-router)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1.4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF?logo=vite)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?logo=shadcnui)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)

<!-- Project Info Badges -->
![GitHub issues](https://img.shields.io/github/issues/flavius-atticae/shooting-star)
![GitHub last commit](https://img.shields.io/github/last-commit/flavius-atticae/shooting-star)
![GitHub code size](https://img.shields.io/github/languages/code-size/flavius-atticae/shooting-star)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<!-- Standards & Docs -->
[![AGENTS.md](https://img.shields.io/badge/🤖_AGENTS.md-Universal-4CAF50)](AGENTS.md)
![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-green?style=flat-square)

**Professional website for Pauline Roussel – Prenatal Yoga & Birth Accompaniment**

A modern, accessible web application showcasing holistic prenatal yoga, doula services, and birth accompaniment for French-speaking women throughout their motherhood journey.

---

## 🌟 Project Overview

### About Pauline Roussel's Practice

Pauline Roussel is a certified prenatal yoga instructor and birth companion specializing in holistic support for women during pregnancy, birth, and postpartum. Her practice focuses on:

- **Yoga Prénatal** – Specialized prenatal yoga classes adapted for each trimester  
- **Accompagnement à la Naissance** – Professional doula services and birth support  
- **Consultations Bien-être** – Personalized wellness consultations for expectant mothers  
- **Mama Blessings** – Ceremonies celebrating the transition to motherhood  

### Target Audience

- **Primary**: French-speaking pregnant women and new mothers in Québec  
- **Secondary**: Partners seeking supportive birth experiences  
- **Tertiary**: Wellness professionals and collaborative practitioners  

### Business Values

- **Calming & Nurturing** – Creating safe spaces for vulnerable life transitions  
- **Professional & Trustworthy** – Evidence-based practices with certified expertise  
- **Holistic & Mindful** – Integrating physical, emotional, and spiritual well-being  
- **Culturally Sensitive** – Honoring French maternal traditions and modern needs  

---

## 🚀 Technical Stack

### Core Technologies

- **Framework**: React Router v7 with Server-Side Rendering  
- **Styling**: TailwindCSS v4 with a custom design system  
- **Language**: TypeScript 5 with strict mode enabled  
- **Build Tool**: Vite with optimized bundling  
- **Runtime**: Node.js with React 19  
- **Linting**: Biome (lint + format)  

### Design System Features

- **Typography**: 3 primary font families (Ivyora Display, Barlow, Moontime) plus system fonts  
- **Color Palette**: Multiple semantic color families with 50–900 shade variants  
- **Responsive Design**: Mobile-first approach with pregnancy-safe accessibility guidelines  
- **Dark Mode**: Full dark/light theme support with system preference detection  
- **Brand Assets**: Professional logo variants optimized for web delivery  

---

## 🛠 Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)  
- npm 9+ (included with Node.js)  
- Git for version control  

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd shooting-star

# Install dependencies
npm install

# Start development server
npm run dev
```

Your application will be available at `http://localhost:5173` with hot module replacement enabled.

### Available Commands

#### Development

```bash
npm run dev          # Start development server with HMR at http://localhost:5173
npm run typecheck    # Generate React Router types and run TypeScript compiler
```

#### Code quality

```bash
npm run lint         # Lint with Biome
npm run lint:fix     # Lint and auto-fix
npm run format       # Format with Biome
npm run format:check # Check formatting (used in CI)
npm run check        # Lint + format check combined
```

#### Tests

```bash
npm run test         # Run Vitest (unit + integration)
npm run test:watch   # Watch mode
npm run test:e2e     # Run Playwright E2E tests (requires running server)
```

#### Production

```bash
npm run build   # Create optimized production build
npm run start   # Run production server from ./build/server/index.js
```

#### Quick Links

- **Local Development**: <http://localhost:5173>  

#### Project Structure

```text
shooting-star/
├── app/                    # Application source code
│   ├── root.tsx           # Root layout with HTML structure
│   ├── routes.ts          # Route configuration
│   ├── app.css            # Global styles and TailwindCSS v4
│   ├── routes/            # Page components
│   ├── components/        # Reusable UI components (shadcn/ui)
│   ├── lib/               # Utility functions and server logic
│   └── test/              # Application tests (unit, integration, e2e)
├── AGENTS.md              # Universal AI agent instructions
├── public/                # Static assets (fonts, favicon, etc.)
└── build/                 # Production build output (generated)
```

### Environment Variables

The application uses environment variables for email delivery via [Resend](https://resend.com). Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | API key from the Resend dashboard | `re_xxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Sender address on the transactional subdomain | `hello@mail.paulineroussel.ca` |
| `RESEND_FROM_NAME` | Display name for outgoing emails | `Pauline Roussel` |
| `CONTACT_REPLY_TO` | Reply-to address (Pauline's personal inbox) | `pauline@paulineroussel.ca` |
| `HONEYPOT_ENCRYPTION_SEED` | Stable seed for honeypot timestamp encryption (required in production) | `openssl rand -hex 32` |

> **Why `mail.paulineroussel.ca`?** Transactional emails are sent from a dedicated subdomain to protect the reputation of the root domain (`paulineroussel.ca`). If deliverability issues arise, only the subdomain is affected.

---

## 🎨 Design System Usage

### Typography Hierarchy

```css
/* Headings – Ivyora Display (elegant serif) */
.heading { font-family: var(--font-heading); }

/* Body Text – Barlow (clean sans-serif) */
.body-text { font-family: var(--font-body); }

/* Accent Text – Moontime (decorative script) */
.accent-text { font-family: var(--font-accent); }
```

### Color Palette Application

```css
/* Primary Brand Colors */
.primary { color: rgb(var(--color-primary-500)); }

/* Accent Colors */
.accent { color: rgb(var(--color-accent-500)); }

/* Neutral Text */
.text-primary { color: rgb(var(--color-neutral-700)); }
```

### Component Guidelines

- Use semantic color names rather than literal values  
- Implement dark mode variants for all interactive elements  
- Maintain a minimum 4.5:1 contrast ratio for accessibility  
- Follow mobile-first responsive design patterns  

---

## 🤝 Contribution Guidelines

> For AI-assisted workflows and coding conventions, see **[AGENTS.md](AGENTS.md)**.

### Development Workflow

1. **Create Feature Branch**:  
   Use issue-based branches, for example:  
   `feature/issue-025-home-page`
2. **Follow Commit Conventions**:  
   Conventional commits with issue scope, e.g. `feat(#25): implement home page hero section`.  
3. **Test Changes**:  
   - Run `npm run test` for unit and integration tests.  
   - Run `npm run check` to validate lint and formatting.  
4. **Submit PR**:  
   - Target `main`.  
   - Include `Related to #<issue-number>` in the PR body.  
   - Describe changes, accessibility impact, performance impact, and any data/privacy considerations.

### Code Standards

- **TypeScript**: Strict mode enabled; avoid `any` without justification  
- **Components**: Functional React components with proper typing  
- **Styling**: TailwindCSS utility classes + project design tokens  
- **Accessibility**: Semantic HTML, ARIA labels where appropriate, keyboard navigation support  
- **Performance**: Lazy loading where appropriate, optimized images, minimal bundle size  

### Testing

- Unit and integration tests live under `app/test/`.
- E2E tests (Playwright) live under `app/test/e2e/` and run on push to `main` via CI.
- Run `npm run test` locally before opening a PR.

---

## 🚀 Deployment

### Application Build

```bash
npm run build
npm run start
```

This generates an optimized production build and starts the server from `./build/server/index.js`.

The main application runs on Node.js and is deployed to Fly.io:

- **Staging**: auto-deployed on push to `main`
- **Production**: manual trigger via GitHub Actions (`deploy-fly.yml`)

---

## 📞 Project Contacts

### Stakeholders

- **Business Owner**: Pauline Roussel (Yoga Instructor & Doula)  
- **Technical Lead**: Repository maintainer (`@flavius-atticae`)  

### Communication Channels

- **Development**: GitHub Issues and Pull Requests  
- **Project Planning**: GitHub Project boards  
- **Documentation**: `AGENTS.md` and `.github/instructions/`  

### Support & Maintenance

For technical issues, feature requests, or business requirements:

1. Check existing [GitHub Issues](../../issues)  
2. Review the [Project Board](../../projects) for current priorities  
3. Submit new issues with appropriate labels and context  

---

**Built with care for the motherhood journey** 🤱  
*Powered by React Router v7, TailwindCSS v4, and modern web standards.*