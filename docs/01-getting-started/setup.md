# Setup Guide

This guide will help you set up the Shooting Star development environment and get the project running locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22+** (LTS recommended)
- **npm 10+** (included with Node.js)
- **Git** for version control

## Option 1: Dev Container (Recommended)

The easiest way to get started is using a **Dev Container** with VS Code or GitHub Codespaces.

### VS Code + Docker

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Clone the repository and open it in VS Code
4. Click "Reopen in Container" when prompted (or use Command Palette: `Dev Containers: Reopen in Container`)

### GitHub Codespaces

1. Go to the repository on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on main**

The Dev Container automatically:
- Installs Node.js 22 and all dependencies
- Configures VS Code extensions (Tailwind, ESLint, Prettier, Copilot, etc.)
- Sets up Playwright for E2E testing
- Forwards ports 5173 (Vite) and 6006 (Storybook)

## Option 2: Local Setup

If you prefer a local setup without Docker:

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
│   ├── app.css            # Global styles and TailwindCSS v4
│   ├── routes/            # Page components
│   ├── components/        # Reusable UI components (shadcn/ui)
│   │   ├── ui/           # Base UI components
│   │   └── layout/       # Layout components (header, footer, etc.)
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   └── test/             # Application tests
├── .devcontainer/         # Dev Container configuration
├── .github/
│   ├── instructions/     # Copilot AI instructions
│   ├── workflows/        # GitHub Actions
│   └── ISSUE_TEMPLATE/   # Issue templates
├── .storybook/           # Storybook configuration
├── stories/              # Additional Storybook stories
├── public/               # Static assets (fonts, favicon)
├── docs/                 # Project documentation
└── build/                # Production build output (generated)
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

1. **Review the [Tech Stack](../02-architecture/tech-stack.md)** to understand the technologies used
2. **Explore the [TailwindCSS Configuration](../02-architecture/tailwindcss-configuration.md)** for design tokens and styling
3. **Check the [Configuration Files](./configuration-files.md)** to understand project configuration
4. **Review [Copilot Instructions](../../.github/instructions/)** for AI collaboration guidelines

## Troubleshooting

For common issues and solutions, see the [Troubleshooting Guide](../04-reference/troubleshooting.md).

---

**Need help?** Create an issue in the [GitHub repository](../../issues) with detailed information about your setup and the problem you're encountering.