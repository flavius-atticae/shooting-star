# Shooting Star ✨

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/flavius-atticae/shooting-star/deploy-storybook.yml?label=storybook&logo=github)](https://github.com/flavius-atticae/shooting-star/actions)
[![Storybook](https://img.shields.io/badge/📖_Storybook-Live-FF4785)](https://flavius-atticae.github.io/shooting-star/)
![React Router](https://img.shields.io/badge/React_Router-v7.7.1-CA4245?logo=react-router)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1.4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![GitHub issues](https://img.shields.io/github/issues/flavius-atticae/shooting-star)
![GitHub last commit](https://img.shields.io/github/last-commit/flavius-atticae/shooting-star)

[![Documentation](https://img.shields.io/badge/📚_Documentation-Available-4CAF50)](docs/README.md)
![GitHub code size](https://img.shields.io/github/languages/code-size/flavius-atticae/shooting-star)
![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-green?style=flat-square)

**Professional website for Pauline Roussel - Yoga Prénatal & Accompagnement à la Naissance**

A modern, accessible web application showcasing holistic prenatal yoga, doula services, and birth accompaniment for French-speaking women throughout their motherhood journey.

---

## 🌟 Project Overview

### About Pauline Roussel's Practice

Pauline Roussel is a certified prenatal yoga instructor and birth companion specializing in holistic support for women during pregnancy, birth, and postpartum. Her practice focuses on:

- **Yoga Prénatal** - Specialized prenatal yoga classes adapted for each trimester
- **Accompagnement à la Naissance** - Professional doula services and birth support
- **Consultations Bien-être** - Personalized wellness consultations for expectant mothers
- **Mama Blessings** - Sacred ceremonies celebrating the transition to motherhood

### Target Audience

- **Primary**: French-speaking pregnant women and new mothers
- **Secondary**: Partners seeking supportive birth experiences
- **Tertiary**: Wellness professionals and collaborative practitioners

### Business Values

- **Calming & Nurturing** - Creating safe spaces for vulnerable life transitions
- **Professional & Trustworthy** - Evidence-based practices with certified expertise  
- **Holistic & Mindful** - Integrating physical, emotional, and spiritual well-being
- **Culturally Sensitive** - Honoring French maternal traditions and modern needs

---

## 🚀 Technical Stack

### Core Technologies
- **Framework**: React Router v7.7.1 with Server-Side Rendering
- **Styling**: TailwindCSS v4.1.4 with custom design system
- **Component Development**: Storybook 9.1 with TailwindCSS integration
- **Language**: TypeScript 5.8.3 with strict mode enabled
- **Build Tool**: Vite 6.3.3 with optimized bundling
- **Runtime**: Node.js with React 19.1.0

### Design System Features
- **Typography**: 4 custom font families (Barlow, Moontime, The Seasons, system fonts)
- **Color Palette**: 8 semantic color families with 50-900 shade variants
- **Responsive Design**: Mobile-first approach with accessibility considerations
- **Dark Mode**: Full dark/light theme support with system preference detection
- **Brand Assets**: Professional logo variants optimized for web delivery

---

## 📋 Project Status & Roadmap

### ✅ Completed Milestones

#### Phase 1: Foundation & Infrastructure (COMPLETED)
- [x] React Router v7 with Server-Side Rendering setup
- [x] TailwindCSS v4.1.4 design system integration
- [x] TypeScript configuration with strict mode
- [x] Custom typography integration (The Seasons, Barlow, Moontime)
- [x] Comprehensive color system with semantic naming
- [x] Professional logo implementation with theme variants
- [x] Core component architecture (shadcn/ui)
- [x] Welcome page with brand integration
- [x] SEO optimization with meta tags
- [x] Dark mode support with user preference detection
- [x] **Storybook v9.1** setup with GitHub Pages deployment at https://flavius-atticae.github.io/shooting-star/

### 🚧 Current Development Phase

#### Phase 2: Content Pages & Features (IN PROGRESS)
- [x] **Storybook Infrastructure** ([#38](../../issues/38)) - Foundation setup completed
- [ ] **Domain Components Documentation** ([#39](../../issues/39)) - Yoga-specific components
- [ ] **Brand Theme Customization** ([#40](../../issues/40)) - Final Storybook theming
- [ ] **Home Page Implementation** ([#25](../../issues/25)) - "Épanouir sa féminité" landing page
- [ ] **Service Pages** ([#26](../../issues/26), [#27](../../issues/27), [#28](../../issues/28)) - Doula, Yoga, Sacred Feminine
- [ ] **About Page** ([#29](../../issues/29)) - Pauline Roussel professional profile
- [ ] **Contact Page** ([#30](../../issues/30)) - Contact forms and booking

### 🎯 Upcoming Priorities

#### Phase 3: Quality & Optimization (PLANNED)
- [ ] **Testing Infrastructure** - Visual regression and accessibility testing
- [ ] **Accessibility Compliance** - WCAG 2.1 AA standards for pregnancy users
- [ ] **Security Hardening** - GDPR compliance and data protection
- [ ] **Performance Optimization** - Core Web Vitals improvements
- [ ] **SEO Enhancement** - French-first content optimization

### 📊 Current Status
- **Infrastructure**: Complete (React Router v7 + TailwindCSS v4 + Storybook v9)
- **Design System**: Foundation complete, component documentation in progress
- **Content**: Page implementation phase (7 pages planned)
- **Deployment**: Storybook live on GitHub Pages, main site pending

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
npm run build        # Create optimized production build
npm run start        # Run production server from ./build/server/index.js
npm run build-storybook  # Build static Storybook for GitHub Pages deployment
```

#### Quick Links
- **Local Development**: http://localhost:5173
- **Storybook Dev**: http://localhost:6006
- **Storybook Production**: https://flavius-atticae.github.io/shooting-star/

#### Project Structure
```
shooting-star/
├── app/                    # Application source code
│   ├── root.tsx           # Root layout with HTML structure
│   ├── routes.ts          # Route configuration
│   ├── app.css           # Global styles and TailwindCSS v4
│   ├── routes/           # Page components
│   │   ├── home.tsx      # Homepage route
│   │   ├── health.tsx    # Health check endpoint
│   │   └── components-test.tsx # Component testing route
│   ├── components/       # Reusable UI components (shadcn/ui)
│   │   └── ui/          # Core UI components
│   ├── lib/             # Utility functions
│   └── welcome/         # Welcome component and brand assets
├── .storybook/          # Storybook configuration
├── stories/             # Component stories (if any)
├── public/              # Static assets
│   ├── fonts/          # Custom font files
│   └── favicon.svg     # Brand favicon
├── docs/               # Project documentation
├── .claude/            # Claude Code agent configurations
└── build/              # Production build output (generated)
```

---

## 🎨 Design System Usage

### Typography Hierarchy
```css
/* Headings - The Seasons (elegant serif) */
.heading { font-family: var(--font-heading); }

/* Body Text - Barlow (clean sans-serif) */  
.body-text { font-family: var(--font-body); }

/* Accent Text - Moontime (decorative script) */
.accent-text { font-family: var(--font-accent); }
```

### Color Palette Application
```css
/* Primary Brand Colors - Clouded Pine */
.primary { color: rgb(var(--color-primary-500)); }

/* Accent Colors - Rustling Leaves */  
.accent { color: rgb(var(--color-accent-500)); }

/* Neutral Text - Pitch Mary Brown */
.text-primary { color: rgb(var(--color-neutral-700)); }
```

### Component Guidelines
- Use semantic color names rather than literal values
- Implement dark mode variants for all interactive elements
- Maintain 4.5:1 contrast ratio minimum for accessibility
- Follow mobile-first responsive design patterns

---

## 🤝 Contribution Guidelines

### Development Workflow
1. **Create Feature Branch**: `git checkout -b feature/description`
2. **Follow Conventions**: Use semantic commit messages
3. **Test Changes**: Verify accessibility and performance impact
4. **Submit PR**: Include description of changes and testing notes

### Code Standards
- **TypeScript**: Strict mode enabled, no `any` types without justification
- **Components**: Functional components with proper typing
- **Styling**: TailwindCSS utility classes with custom design system
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Lazy loading, optimized images, minimal bundle size

### Testing Requirements
- **Visual Testing**: Component screenshots for design consistency
- **Accessibility Testing**: WCAG 2.1 AA compliance verification  
- **Performance Testing**: Core Web Vitals monitoring
- **Cross-browser Testing**: Modern browser compatibility

### Design System Maintenance
- Document new color additions in CSS custom properties
- Update typography scale changes in configuration
- Test component variants in both light and dark modes
- Verify responsive behavior across device sizes

---

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build container image
docker build -t shooting-star .

# Run container 
docker run -p 3000:3000 shooting-star
```

### Platform Support
The application can be deployed to any Node.js hosting platform:
- **Cloud Platforms**: AWS ECS, Google Cloud Run, Azure Container Apps
- **Edge Platforms**: Vercel, Netlify, Cloudflare Pages  
- **Container Platforms**: Digital Ocean App Platform, Fly.io, Railway
- **Self-hosted**: Any VPS with Node.js support

### Environment Configuration
- **Production**: Optimized builds with asset compression
- **Staging**: Preview deployments with performance monitoring
- **Development**: Local development with hot reloading

---

## 📈 Monitoring & Analytics

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Analysis**: Asset size and loading optimization
- **Lighthouse Scores**: Automated performance auditing

### User Experience Tracking  
- **Accessibility**: Screen reader compatibility testing
- **Usability**: Pregnancy-specific user journey optimization
- **Conversion**: Service inquiry and booking funnel analysis

---

## 📚 Documentation

For detailed technical documentation, visit our **[Documentation Hub](docs/README.md)**:

### Quick Navigation
- **[Documentation Hub](docs/README.md)** - Complete documentation index
- **[CLAUDE.md](CLAUDE.md)** - Development guidelines and agent instructions
- **[Storybook Documentation](https://flavius-atticae.github.io/shooting-star/)** - Component library and design system
- **[GitHub Issues](../../issues)** - Current tasks and progress tracking
- **[Project Board](../../projects)** - Sprint planning and coordination

---

## 📞 Project Contacts

### Stakeholders
- **Business Owner**: Pauline Roussel (Yoga Instructor & Doula)
- **Technical Lead**: Development team via GitHub issues
- **Project Manager**: Repository maintainer

### Communication Channels
- **Development**: GitHub Issues and Pull Requests
- **Project Planning**: GitHub Project boards
- **Documentation**: Repository Wiki and CLAUDE.md

### Support & Maintenance
For technical issues, feature requests, or business requirements:
1. Check existing [GitHub Issues](../../issues)
2. Review [Project Board](../../projects) for current priorities  
3. Submit new issues with appropriate labels and context

---

**Built with care for the motherhood journey** 🤱  
*Powered by React Router v7, TailwindCSS v4, and modern web standards*