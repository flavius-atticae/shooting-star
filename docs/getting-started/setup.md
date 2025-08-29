# Setup Guide

This guide will help you set up the Shooting Star development environment and get the project running locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** (LTS recommended)
- **npm 9+** (included with Node.js)
- **Git** for version control

## Quick Start

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

## Available Commands

### Development Commands

```bash
npm run dev          # Start development server with HMR
npm run typecheck    # Generate types and run TypeScript compiler
```

### Production Commands

```bash
npm run build        # Create optimized production build
npm run start        # Run production server from build output
```

## Project Structure

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

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/description
```

### 2. Follow Conventions
- Use semantic commit messages
- Follow TypeScript strict mode guidelines
- Implement accessibility best practices

### 3. Test Changes
- Verify accessibility compliance
- Check performance impact
- Test responsive behavior

### 4. Submit Pull Request
Include:
- Description of changes
- Testing notes
- Screenshots if UI changes

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types without justification
- Proper type definitions for all components

### Components
- Functional components with proper typing
- React 19.1.0 patterns and best practices

### Styling
- TailwindCSS utility classes
- Custom design system integration
- Mobile-first responsive design

### Accessibility
- ARIA labels for interactive elements
- Semantic HTML structure
- Keyboard navigation support
- 4.5:1 contrast ratio minimum

### Performance
- Lazy loading for optimal performance
- Optimized images and assets
- Minimal bundle size
- Core Web Vitals optimization

## Next Steps

Once you have the project running:

1. **Review the [Tech Stack](../architecture/tech-stack.md)** to understand the technologies used
2. **Explore the [Brand Guidelines](../design-system/brand-guidelines.md)** for design system usage
3. **Check the [Configuration Files](./configuration-files.md)** to understand project configuration
4. **Review [Agent Coordination](../workflows/agent-coordination.md)** if working with specialized agents

## Troubleshooting

For common issues and solutions, see the [Troubleshooting Guide](../reference/troubleshooting.md).

---

**Need help?** Create an issue in the [GitHub repository](../../issues) with detailed information about your setup and the problem you're encountering.