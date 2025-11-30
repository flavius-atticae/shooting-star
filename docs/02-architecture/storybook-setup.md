# Storybook Setup

## Overview

Storybook v10 is integrated into the project for component development, testing, and documentation.

## Configuration

### Core Setup

- **Storybook Version**: 10.1.2
- **Framework**: React + Vite
- **Integration**: React Router v7 + TailwindCSS v4
- **Port**: 6006 (development server)

### File Structure

```
.storybook/
├── main.ts           # Main configuration with addons and framework setup
├── preview.tsx       # Global parameters, decorators, and theme configuration
├── vite.config.ts    # Vite config for Storybook (TailwindCSS + path aliases)
├── mocks/            # React Router mock for Storybook context
│   └── react-router.ts
├── decorators/       # Custom story decorators
├── docs/             # Documentation utilities
├── i18n/             # Internationalization setup
└── utils/            # Helper utilities
```

### Stories Location

Stories are located in two places:
- `stories/` - MDX documentation and standalone stories
- `app/components/**/*.stories.tsx` - Component stories alongside components

## Addons

| Addon | Purpose |
|-------|---------|
| `@chromatic-com/storybook` | Visual regression testing |
| `@storybook/addon-docs` | Automatic documentation |
| `@storybook/addon-a11y` | Accessibility testing |
| `@storybook/addon-vitest` | Test integration |

Built-in addons (v10):
- Controls - Interactive prop editing
- Actions - Event logging
- Viewport - Responsive testing
- Backgrounds - Theme testing

## React Router Integration

React Router v7 is incompatible with Storybook's build process. The project uses a **mock approach**:

### How It Works

1. **Alias in Vite config** - Redirects `react-router` imports to a mock
2. **StorybookRouterProvider** - Provides router context for components using `Link`, `useNavigate`, etc.
3. **No addon required** - Clean solution without external dependencies

**`.storybook/vite.config.ts`:**
```typescript
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../app'),
      'react-router': path.resolve(__dirname, './mocks/react-router.ts'),
    },
  },
});
```

**`.storybook/main.ts`:**
```typescript
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: { strictMode: true }
  },
  // ...
};
```

## Usage

### Development

```bash
# Start Storybook development server
npm run storybook

# Visit http://localhost:6006
```

### Static Build

```bash
# Build static Storybook for deployment
npm run build-storybook

# Output: storybook-static/ directory
```

## Creating Stories

### Basic Component Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### Component Using React Router

Components using `Link` or `useNavigate` work automatically thanks to the `StorybookRouterProvider` decorator in `preview.tsx`:

```typescript
decorators: [
  (Story) => (
    <StorybookRouterProvider>
      <Story />
    </StorybookRouterProvider>
  ),
],
```

## Pregnancy-Safe Testing

The configuration includes pregnancy-focused accessibility and viewport settings:

### Viewports

| Viewport | Size | Purpose |
|----------|------|---------|
| iPhone SE | 375×667 | Minimum supported |
| iPhone 12/13 | 390×844 | Optimal mobile |
| iPad | 768×1024 | Pregnancy-friendly tablet |
| Desktop | 1024×768 | Standard desktop |
| Large Desktop | 1920×1080 | Accessibility testing |

### Backgrounds

- White (default)
- Gris (light background) - `#f5f4f2`
- Soft gradient - White to `#ffddd3`
- Warm gradient - White to `#ceaf9b`

### Accessibility

WCAG 2.1 AA compliance with pregnancy-specific rules:
- Enhanced color contrast for fatigue
- Larger touch targets for swelling
- Keyboard navigation for physical discomfort
- Screen reader support for concentration issues

## Deployment

Storybook is automatically deployed to GitHub Pages:
- **Workflow**: `.github/workflows/deploy-storybook.yml`
- **Live URL**: https://flavius-atticae.github.io/shooting-star/
