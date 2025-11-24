# Shooting Star ✨

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/flavius-atticae/shooting-star/deploy-storybook.yml?label=storybook&logo=github)](https://github.com/flavius-atticae/shooting-star/actions/workflows/deploy-storybook.yml)
[![Storybook](https://img.shields.io/badge/📖_Storybook-Live-FF4785)](https://flavius-atticae.github.io/shooting-star/)
![React Router](https://img.shields.io/badge/React_Router-v7.7.1-CA4245?logo=react-router)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1.4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![GitHub issues](https://img.shields.io/github/issues/flavius-atticae/shooting-star)
![GitHub last commit](https://img.shields.io/github/last-commit/flavius-atticae/shooting-star)

[![Documentation](https://img.shields.io/badge/📚_Documentation-Available-4CAF50)](docs/README.md)
![GitHub code size](https://img.shields.io/github/languages/code-size/flavius-atticae/shooting-star)
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

- **Framework**: React Router v7.7.1 with Server-Side Rendering  
- **Styling**: TailwindCSS v4.1.4 with a custom design system  
- **Component Development**: Storybook 9.1 with TailwindCSS integration  
- **Language**: TypeScript 5.8.3 with strict mode enabled  
- **Build Tool**: Vite 6.3.3 with optimized bundling  
- **Runtime**: Node.js with React 19.1.0  

### Design System Features

- **Typography**: 3 primary font families (The Seasons, Barlow, Moontime) plus system fonts  
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
npm run storybook    # Start Storybook development server at http://localhost:6006
```

#### Production

```bash
npm run build            # Create optimized production build
npm run start            # Run production server from ./build/server/index.js
npm run build-storybook  # Build static Storybook for GitHub Pages deployment
```

#### Quick Links

- **Local Development**: <http://localhost:5173>  
- **Storybook Dev**: <http://localhost:6006>  
- **Storybook Production**: <https://flavius-atticae.github.io/shooting-star/>  

#### Project Structure

```text
shooting-star/
├── app/                    # Application source code
│   ├── root.tsx           # Root layout with HTML structure
│   ├── routes.ts          # Route configuration
│   ├── app.css            # Global styles and TailwindCSS v4
│   ├── routes/            # Page components
│   ├── components/        # Reusable UI components (shadcn/ui)
│   ├── lib/               # Utility functions
│   └── test/              # Application tests
├── .storybook/            # Storybook configuration
├── stories/               # Additional Storybook stories
├── public/                # Static assets (fonts, favicon, etc.)
├── docs/                  # Project documentation
└── build/                 # Production build output (generated)
```

---

## 🎨 Design System Usage

### Typography Hierarchy

```css
/* Headings – The Seasons (elegant serif) */
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

> For AI-assisted workflows and coding conventions, see **[`COPILOT.md`](COPILOT.md)**.

### Development Workflow

1. **Create Feature Branch**:  
   Use issue-based branches, for example:  
   `feature/issue-025-home-page`  
2. **Follow Commit Conventions**:  
   Prefix commit messages with issue numbers, e.g. `[ #25 ] Implement home page hero section`.  
3. **Test Changes**:  
   - Run relevant tests under `app/test` when available.  
   - Validate accessibility and visual changes via Storybook.  
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

### Testing & Storybook

- Tests live under `app/test`.  
- Use Storybook for:
  - Visual documentation of components  
  - Accessibility checks (WCAG 2.1 AA)  
  - Pregnancy-safe UX validation (touch targets, motion, contrast)

---

## 🚀 Deployment

### Application Build

```bash
npm run build
npm run start
```

This generates an optimized production build and starts the server from `./build/server/index.js`.

### Storybook Deployment

Storybook is deployed automatically to GitHub Pages via CI:

- Workflow: [deploy-storybook.yml](.github/workflows/deploy-storybook.yml)  
- Live URL: <https://flavius-atticae.github.io/shooting-star/>

The main application is designed to run on a Node.js environment and can be deployed to platforms such as Fly.io or other Node/container platforms.

---

## 📚 Documentation

For detailed technical and product documentation, visit the **[Documentation Hub](docs/README.md)**.

### Quick Navigation

- **[Documentation Hub](docs/README.md)** – Complete documentation index  
- **[`COPILOT.md`](COPILOT.md)** – GitHub Copilot and AI collaboration guide  
- **[Storybook Documentation](https://flavius-atticae.github.io/shooting-star/)** – Component library and design system  
- **[GitHub Issues](../../issues)** – Current tasks and progress tracking  
- **[Project Board](../../projects)** – Planning and coordination  

---

## 📞 Project Contacts

### Stakeholders

- **Business Owner**: Pauline Roussel (Yoga Instructor & Doula)  
- **Technical Lead**: Repository maintainer (`@flavius-atticae`)  

### Communication Channels

- **Development**: GitHub Issues and Pull Requests  
- **Project Planning**: GitHub Project boards  
- **Documentation**: Markdown files under `docs/` and `COPILOT.md`  

### Support & Maintenance

For technical issues, feature requests, or business requirements:

1. Check existing [GitHub Issues](../../issues)  
2. Review the [Project Board](../../projects) for current priorities  
3. Submit new issues with appropriate labels and context  

---

**Built with care for the motherhood journey** 🤱  
*Powered by React Router v7, TailwindCSS v4, and modern web standards.*