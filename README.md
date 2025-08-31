# Shooting Star ✨

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

#### Phase 1: Brand Identity System (COMPLETED)
- [x] Custom typography integration with web-optimized font loading
- [x] Comprehensive color system with semantic naming conventions
- [x] Professional logo implementation with theme variants
- [x] Core component architecture and welcome page
- [x] SEO optimization with meta tags and structured data
- [x] Dark mode support with user preference detection

### 🚧 Current Development Phase

#### Phase 2: Core Website Features (IN PROGRESS)
- [ ] **Performance Optimization** ([#4](../../issues/4)) - Font subsetting and compression
- [ ] **Testing Infrastructure** ([#5](../../issues/5)) - Visual regression and accessibility testing
- [ ] **Accessibility Compliance** ([#6](../../issues/6)) - WCAG 2.1 AA standards for pregnancy users
- [ ] **Security Hardening** ([#7](../../issues/7)) - Vulnerability remediation and GDPR compliance

### 🎯 Upcoming Priorities

#### Phase 3: Content & Functionality (PLANNED)
- [ ] Service pages with detailed offerings and pricing
- [ ] Online booking system integration
- [ ] Contact forms with pregnancy-specific considerations
- [ ] Blog/resources section for prenatal education
- [ ] Testimonials and client success stories

#### Phase 4: Enhanced User Experience (PLANNED)  
- [ ] Multilingual support (French primary, English secondary)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced performance optimizations
- [ ] Analytics and user behavior tracking (GDPR-compliant)

### 📊 Current Metrics
- **Performance**: Baseline established, optimization in progress
- **Accessibility**: Design system foundation complete
- **SEO**: Basic optimization implemented
- **Security**: Audit completed, remediation in progress

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
npm run dev          # Start development server with HMR
npm run typecheck    # Generate types and run TypeScript compiler
```

#### Production
```bash
npm run build        # Create optimized production build
npm run start        # Run production server from build output
```

#### Project Structure
```
shooting-star/
├── app/                    # Application source code
│   ├── root.tsx           # Root layout with HTML structure
│   ├── routes.ts          # Route configuration
│   ├── app.css           # Global styles and design system
│   ├── routes/           # Page components
│   │   └── home.tsx      # Homepage with meta optimization
│   └── welcome/          # Welcome component and brand assets
│       ├── welcome.tsx   # Main welcome component
│       ├── pauline-logo-light.svg
│       └── pauline-logo-dark.svg
├── public/               # Static assets
│   ├── fonts/           # Custom font files
│   └── favicon.svg      # Brand favicon
├── build/               # Production build output (generated)
│   ├── client/         # Static assets for CDN
│   └── server/         # Server-side rendering code
└── react-router.config.ts  # SSR and build configuration
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

### Essential Guides
- **[Setup Guide](docs/01-getting-started/setup.md)** - Development environment setup
- **[Tech Stack](docs/04-architecture/tech-stack.md)** - Complete technology overview  
- **[Configuration Files](docs/01-getting-started/configuration-files.md)** - Project configuration
- **[Security Guidelines](docs/08-reference/guidelines.md)** - GDPR compliance and security
- **[Troubleshooting](docs/08-reference/troubleshooting.md)** - Common issues and solutions

### Workflows & Team
- **[Agent Coordination](docs/03-agents/agent-coordination.md)** - Multi-agent collaboration
- **[Deployment Guide](docs/06-deployment/fly-io-guide.md)** - Production deployment
- **[Brand Guidelines](docs/05-design-system/brand-guidelines.md)** - Design system usage

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