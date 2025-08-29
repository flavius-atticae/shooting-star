# Tech Stack

This document outlines the core technologies, frameworks, and tools used in the Shooting Star project.

## Core Technologies

### Framework & Runtime
- **React Router v7.7.1** - Modern React framework with file-based routing
- **React 19.1.0** - Latest React version with concurrent features
- **Node.js** - Server-side JavaScript runtime
- **Server-Side Rendering (SSR)** - Enabled by default for optimal performance

### Styling & Design
- **TailwindCSS v4.1.4** - Utility-first CSS framework with custom design system
- **Custom Font System** - 4 specialized font families optimized for web
- **Dark Mode Support** - Full theme system with user preference detection
- **Responsive Design** - Mobile-first approach with accessibility considerations

### Build & Development Tools
- **Vite 6.3.3** - Fast build tool with optimized bundling
- **TypeScript 5.8.3** - Type-safe JavaScript with strict mode enabled
- **Hot Module Replacement (HMR)** - Real-time development updates
- **React Router Build Plugin** - Integrated build optimization

## Design System Features

### Typography Hierarchy
The project uses 4 carefully selected font families:

- **The Seasons** (Headings) - Elegant serif for headings and titles
- **Barlow** (Body Text) - Clean sans-serif for readable body content
- **Moontime** (Accent Text) - Decorative script for special elements
- **System Fonts** - Fallback fonts for optimal performance

### Color Palette
8 semantic color families with 50-900 shade variants:

- **Clouded Pine** - Primary brand colors (greens)
- **Rustling Leaves** - Accent colors (earth tones)
- **Pitch Mary Brown** - Neutral text colors
- **Frappé** - Warm accent tones
- **Glazed Sugar** - Light neutrals
- **Splashdown** - Blue accent colors
- **Submerged** - Deep blue tones
- **Smoke & Mirrors** - Gray neutrals

### Component Architecture
- **Functional Components** - React hooks-based architecture
- **TypeScript Integration** - Strict typing for all components
- **CSS Custom Properties** - Theme system with semantic naming
- **Accessibility First** - WCAG 2.1 AA compliance built-in

## File Structure & Configuration

### Key Configuration Files

#### `react-router.config.ts`
- SSR configuration
- Build optimization settings
- Route generation rules

#### `vite.config.ts`
- Build tool configuration
- TailwindCSS integration
- TypeScript path aliases (`~/*` → `./app/*`)

#### `tsconfig.json`
- TypeScript compiler settings
- Strict mode configuration
- Path mapping for imports

#### `tailwind.config.js` (Generated)
- Custom design system tokens
- Color palette definitions
- Typography scale configuration

### Build Output Structure

```
build/
├── client/          # Static assets for CDN delivery
│   ├── assets/     # Bundled CSS and JS files
│   └── favicon.svg # Static assets
└── server/         # Server-side rendering code
    └── index.js    # Production server entry point
```

## Development Architecture

### React Router v7 Features
- **File-based Routing** - Automatic route generation from file structure
- **Server-Side Rendering** - Built-in SSR for better SEO and performance
- **Type Generation** - Automatic TypeScript types in `.react-router/types/`
- **Meta Functions** - SEO optimization with route-level metadata

### Performance Optimizations
- **Font Subsetting** - Custom font optimization for faster loading
- **Asset Compression** - Automatic asset optimization in production builds
- **Bundle Splitting** - Code splitting for optimal loading performance
- **Core Web Vitals** - Designed to meet Google's performance standards

### Development Experience
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Strict Mode** - Enhanced type safety and error catching
- **Path Aliases** - Clean import statements with `~/` prefix
- **Automatic Type Generation** - React Router generates route types

## Deployment Architecture

### Container Support
- **Dockerfile** - Multi-stage build for production optimization
- **Docker Compose** - Local development container orchestration

### Platform Compatibility
The application can be deployed to:
- **Cloud Platforms** - AWS ECS, Google Cloud Run, Azure Container Apps
- **Edge Platforms** - Vercel, Netlify, Cloudflare Pages
- **Container Platforms** - Digital Ocean App Platform, Fly.io, Railway
- **Self-hosted** - Any VPS with Node.js support

### Environment Configurations
- **Production** - Optimized builds with asset compression and caching
- **Staging** - Preview deployments with performance monitoring
- **Development** - Local development with debugging tools enabled

## Future Architecture Considerations

### Planned Enhancements
- **Progressive Web App (PWA)** - Offline functionality and app-like experience
- **Multilingual Support** - i18n integration for French/English content
- **Advanced Analytics** - GDPR-compliant user behavior tracking
- **Content Management** - Headless CMS integration for dynamic content

### Performance Roadmap
- **Image Optimization** - Next-gen image formats and lazy loading
- **Bundle Analysis** - Continuous monitoring of bundle size and performance
- **Edge Caching** - CDN optimization for global content delivery
- **Service Workers** - Advanced caching strategies and offline functionality

---

**Next Steps**: Review the [Setup Guide](../getting-started/setup.md) to get started with development, or explore the [Brand Guidelines](../design-system/brand-guidelines.md) to understand the design system implementation.