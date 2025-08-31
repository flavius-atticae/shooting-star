# Storybook Infrastructure Setup

## Overview

Storybook v9.1.3 has been successfully integrated into the Pauline Roussel yoga website project to provide component development, testing, and documentation capabilities.

## Configuration

### Core Setup

- **Storybook Version**: 9.1.3
- **Framework**: React + Vite
- **Integration**: React Router v7 + TailwindCSS v4.1.4
- **React Router Addon**: storybook-addon-remix-react-router@5
- **Port**: 6006 (development server)

### File Structure

```
.storybook/
├── main.ts           # Main configuration with addons and framework setup
├── preview.ts        # Global parameters, decorators, and theme configuration
├── vite.config.ts    # Separate Vite config for Storybook (TailwindCSS + paths)
└── (manager.js removed - not needed)
```

```
stories/
└── Introduction.stories.tsx  # Design system documentation page
```

### Key Features

1. **TailwindCSS v4.1.4 Integration**
   - Full brand color palette support
   - Custom breakpoints and responsive testing
   - Brand typography (Barlow, The Seasons, Moontime fonts)

2. **Component Stories**
   - Simplified to Introduction page only (component stories removed)
   - Focus on design system documentation and configuration
   - Ready for future component development when needed

3. **Addons Configured**
   - **Controls** - Interactive component testing (built-in with v9)
   - **Actions** - Event handling visualization (built-in with v9)
   - **Docs** - Automatic documentation generation (built-in with v9)
   - **Viewport** - Responsive design testing (built-in with v9)
   - **Backgrounds** - Brand color background testing (built-in with v9)
   - **A11y** - Accessibility testing (`@storybook/addon-a11y`)
   - **Vitest** - Testing integration (`@storybook/addon-vitest`)
   - **React Router** - Native routing support (`storybook-addon-remix-react-router`)

4. **Brand Integration**
   - Custom viewport sizes matching project breakpoints
   - Brand color backgrounds for testing
   - Complete design system documentation
   - Accessibility-first approach

## React Router v7 Integration

### Current Status

- **Dev Server**: ✅ Working perfectly
- **Build Process**: ✅ Working perfectly
- **React Router Support**: ✅ Native addon integration

### Technical Solution

The project now uses the official React Router addon for seamless integration:

1. **React Router Addon**: `storybook-addon-remix-react-router@5` provides native React Router v7 support
2. **Simplified Configuration**: No manual plugin filtering required
3. **Clean Vite Config**: Minimal `.storybook/vite.config.ts` with only essential plugins
4. **Stable Builds**: Both dev server and static builds work reliably

### Configuration Details

**Main Configuration (`.storybook/main.ts`):**
```typescript
export default {
  stories: ['../stories/Introduction.stories.tsx'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    'storybook-addon-remix-react-router',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: path.resolve(__dirname, './vite.config.ts'),
      },
    },
  },
};
```

**Vite Configuration (`.storybook/vite.config.ts`):**
```typescript
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../app'),
    },
  },
});
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

### Creating Future Stories

When adding component stories, use this pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { ComponentName } from './component-name';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  decorators: [withRouter], // For components using React Router
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component description with yoga context.',
      },
    },
    reactRouter: {
      location: { pathParams: { id: '123' } },
      routing: { path: '/yoga/:id' },
    },
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

## Brand Implementation

### Color Palette in Stories

The Introduction page showcases the complete Pauline Roussel brand palette:

- **Primary Green**: `#618462` - Main brand actions
- **Accent Rose**: `#af6868` - Highlights and CTAs  
- **Secondary Blue**: `#517982` - Supporting elements
- **Neutral Brown**: `#5e4530` - Text and grounding
- **Soft Colors**: Gentle backgrounds and subtle contrasts

### Typography

- **Headings**: "The Seasons" serif font
- **Body**: "Barlow" sans-serif font  
- **Accent**: "Moontime" script font

### Design System Documentation

The Introduction story provides comprehensive documentation including:
- Complete brand identity guidelines
- Color palette with visual swatches
- Typography hierarchy and examples
- Design principles and component categories
- Development notes and technical stack details

## Migration History

### Storybook v9 Migration (August 2025)

1. **Essential Addons Migration**
   - **Issue**: Multiple essential addons (`@storybook/addon-controls`, `@storybook/addon-actions`, etc.) deprecated in v9
   - **Solution**: Removed all deprecated addons - now built into core
   - **Result**: Cleaner configuration with maintained functionality

2. **React Router Integration**
   - **Issue**: Complex manual plugin filtering workarounds
   - **Solution**: Added `storybook-addon-remix-react-router@5` for native support
   - **Result**: Simplified configuration without custom viteFinal modifications

3. **Configuration Cleanup**
   - **Removed**: All component stories and example files (31 files deleted)
   - **Simplified**: Single Introduction story with design system documentation
   - **Cleaned**: Removed problematic MDX files and deprecated imports

### Verification Status
- ✅ Storybook dev server starts successfully on port 6006
- ✅ All built-in addons functioning correctly
- ✅ React Router addon integrated and ready
- ✅ Static builds work perfectly (build time: ~2s)
- ✅ Clean configuration without workarounds

## Future Development

### When Adding Components

1. **Install Location**: Add stories in `app/components/ui/*.stories.tsx`
2. **Router Context**: Use `withRouter` decorator for routing-dependent components
3. **Brand Integration**: Follow established yoga-themed examples
4. **Accessibility**: Include a11y testing in all stories

### Potential Enhancements

1. **Visual Testing**: Chromatic integration for visual regression testing
2. **Component Library**: Gradual expansion with yoga website components
3. **Performance Testing**: Component performance monitoring
4. **Advanced Routing**: Complex routing scenarios with the React Router addon

## Development Notes

- Storybook runs independently with native React Router support
- All TailwindCSS v4.1.4 features are fully supported
- Component isolation ensures reliable testing and documentation
- Accessibility testing is integrated and ready for all future components
- Mobile-first responsive design testing capabilities included
- Clean, minimal configuration optimized for maintainability

This streamlined setup provides a robust foundation for component development and design system documentation while maintaining the yoga website's brand identity and accessibility standards.