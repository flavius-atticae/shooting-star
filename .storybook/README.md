# Storybook Configuration - Shooting Star

## Phase 1 Implementation Complete ✅

This Storybook configuration is optimized for developing **pregnancy-safe** components in the Shooting Star project by Pauline Roussel.

### 🚀 Quick Start

```bash
# Start Storybook in development
npm run storybook

# Build Storybook for production  
npm run build-storybook
```

Storybook will be available at: **http://localhost:6006**

## 📁 Structure

```
.storybook/
├── main.ts              # Main Storybook configuration
├── preview.tsx          # Global configuration and decorators
├── vite.config.ts       # Vite configuration for Storybook
├── vitest.setup.ts      # Setup for running tests from Storybook UI
└── README.md            # This documentation

stories/
├── foundation/
│   ├── Introduction.mdx              # Welcome documentation
│   └── Pregnancy-Safe-Guidelines.mdx # Specialized UX guidelines

app/components/
├── ui/
│   ├── container.stories.tsx         # Container Stories
│   └── background.stories.tsx        # Background Stories
└── layout/
    └── responsive-grid.stories.tsx   # AdaptiveGrid Stories
```

## 🔧 Configuration

### Installed Addons

- **@storybook/addon-essentials**: Controls, actions, docs, viewport, backgrounds
- **@storybook/addon-a11y**: WCAG 2.1 AA accessibility testing
- **@storybook/addon-docs**: Automatic documentation with MDX
- **@chromatic-com/storybook**: Visual testing

### Pregnancy-Safe Settings

#### Optimized Viewports
- **iPhone SE (375px)**: Minimum supported  
- **iPhone 12/13 (390px)**: Optimal mobile
- **iPad (768px)**: Pregnancy-friendly tablet  
- **Desktop (1024px+)**: Extended interfaces

#### Pauline Roussel Color Palette
- **White**: Neutral base
- **Grey**: Soft background (#f5f4f2)
- **Soft Gradient**: White → pale pink transition
- **Warm Gradient**: White → beige transition

#### Enhanced Accessibility
- Automatic tests on each story
- Color contrast validation
- Touch target verification (≥44px)
- Keyboard navigation support

## 📋 Implemented Stories

### Foundation/Container
- **5 sizes**: sm, md, lg, xl, full
- **Responsive padding** adaptive
- **Touch-friendly** for pregnancy use
- **Semantic HTML** configurable

**Available stories:**
- Default, Small, Medium, Large, ExtraLarge
- FullWidth, Comparison, CustomElement, WithCustomStyles

### Foundation/Background  
- **5 pregnancy-safe variants**
- **Pauline Roussel palette** integrated
- **Soft gradients** without visual aggression
- **Subtle patterns** optional

**Available stories:**
- White, Accent, SoftGradient, ComplexGradient, WarmGradient
- AllVariants, WithPatterns, UseBackgroundClasses

### Foundation/AdaptiveGrid
- **Container Queries** with media query fallback  
- **2 and 3 columns** adaptive
- **Generous touch targets** (≥44px)
- **Optimized performance** for all devices

**Available stories:**
- TwoColumns, ThreeColumns, CustomGap, InteractiveResize
- Comparison, CompleteDemo, ServicesGallery

## 🎨 Design System Integration

### Pregnancy-Safe Colors
```css
/* Primary */
--primary: #618462    /* Soothing green */
--secondary: #517982  /* Calm blue */
--accent: #af6868     /* Soft pink */
--neutral: #5e4530    /* Readable brown */

/* Support */
--soft: #ffddd3       /* Pale pink */
--warm: #ceaf9b       /* Warm beige */  
--gris: #f5f4f2       /* Neutral grey */
```

### Typography
- **Base**: 16px minimum on mobile
- **Line Height**: 1.6+ for easier reading
- **Font Weight**: Medium recommended for visibility

## 🧪 Testing and Validation

### Running Tests

#### From Terminal (CLI)
```bash
# Run all Storybook tests
npm run test

# Watch mode during development
npm run test:watch

# With Vitest UI
npm run test:ui
```

#### From Storybook UI
Thanks to the `@storybook/addon-vitest` integration, you can run tests directly from Storybook:

1. **Start Storybook**: `npm run storybook`
2. **Open the "Test" panel** in the Storybook toolbar (▶️ icon)
3. **Run tests**: 
   - Click "Run tests" to execute all tests
   - Or click the play button next to an individual story

**Required configuration** (`.storybook/vitest.setup.ts`):
```typescript
// Expose annotations globally for Storybook's internal setup-file.js
// This is required for running tests from the Storybook UI
globalThis.globalProjectAnnotations = annotations;
```

This line exposes project annotations globally, allowing Storybook to execute play functions as tests directly in the interface.

### Accessibility Checklist (WCAG 2.1 AA)
Each story automatically validates:

- [ ] **Contrast**: ≥4.5:1 (normal text), ≥3:1 (large)
- [ ] **Touch Targets**: ≥44x44px with 8px spacing
- [ ] **Keyboard Navigation**: Tab, Enter, Space functional
- [ ] **Screen Readers**: Appropriate labels and descriptions
- [ ] **Motion**: Respects prefers-reduced-motion

### Pregnancy-Specific Tests
- [ ] **Non-triggering colors**: No medical red
- [ ] **Gentle animations**: ≤300ms, easeOut curves
- [ ] **Fatigue readability**: Generous contrasts
- [ ] **Touch comfort**: Enlarged zones, visual feedback

## 🔄 Development Workflow

### Adding a New Story

1. **Create the file** `component.stories.tsx` alongside the component
2. **Follow the template** from existing stories
3. **Include MDX documentation** if needed
4. **Validate accessibility** with a11y addon
5. **Test pregnancy-safe** according to guidelines

### Type-Safe Story Template
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './component'

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Pregnancy-friendly description'
      }
    }
  },
  argTypes: {
    // Props configuration
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: {
    // Default props
  }
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build-storybook
```

### GitHub Pages (automatic)
- Automatic build on `main` push
- Deployment to `https://flavius-atticae.github.io/shooting-star/`
- CDN cache for optimal performance

### Continuous Integration
- **TypeScript check**: Strict type validation
- **Accessibility tests**: Fails if WCAG not met  
- **Visual regression**: Visual change detection
- **Performance**: Bundle size monitoring

## 📚 Resources

### Internal Documentation
- [Foundation Introduction](http://localhost:6006/?path=/docs/foundation-introduction--docs)
- [Pregnancy-Safe Guidelines](http://localhost:6006/?path=/docs/foundation-guidelines-pregnancy-safe--docs)

### External Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)
- [Quebec Law 25 Compliance](https://www.cai.gouv.qc.ca/loi-25/)

---

**This Phase 1 configuration provides a solid foundation for developing the entire Shooting Star design system with a pregnancy-safe focus as the priority.** 🤱✨