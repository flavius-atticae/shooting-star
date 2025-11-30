# 🧪 Testing Strategy

This document describes the centralized testing strategy for the Shooting Star project, built around **Storybook as the primary testing hub**.

---

## 📐 Architecture Overview

```
                    ┌─────────────────────────────┐
                    │   Playwright E2E (thin)     │  ← Multi-page journeys, perf, security
                    └─────────────────────────────┘
                                 │
        ┌────────────────────────┴────────────────────────┐
        │              STORYBOOK (CENTER)                 │
        │  • Play functions (interactions)                │
        │  • Addon a11y (accessibility)                   │
        │  • Vitest integration (assertions)              │
        │  • Chromatic (visual regression)                │
        └─────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │   Unit tests (Vitest)   │  ← Utils, hooks, pure logic
                    └─────────────────────────┘
```

---

## 🎯 Separation Rules

| Scope | Tool | Examples |
|-------|------|----------|
| Pure logic (no UI) | Vitest | `utils.ts`, `browser-support.ts`, hooks |
| Single component | Storybook (play functions) | Header, Footer, Hero, ContactForm |
| Single page (isolated) | Storybook (play functions) | Homepage, ContactPage |
| Multi-page journey | Playwright E2E | Homepage → Contact → Confirmation |
| Performance metrics | Playwright E2E | Core Web Vitals, LCP |
| Security checks | Playwright E2E | Headers, CSP, HTTPS |

---

## 🛠️ NPM Scripts

```bash
# Unit tests (Vitest only)
npm run test
# Note: Storybook play functions run in CI via vitest-addon integration

# Watch mode for unit tests (Vitest)
npm run test:watch

# Visual test UI (Vitest)
npm run test:ui

# E2E tests only (Playwright, multi-page journeys)
npm run test:e2e

# All tests (Vitest + Playwright)
npm run test:all
```

> **Tip:** To run Storybook tests interactively, use `npm run storybook` and enable the "Interactions" addon panel.

---

## 📁 File Organization

### Unit Tests (Vitest)

Location: `app/test/` or co-located with source files

```
app/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts          # Co-located unit test
├── hooks/
│   ├── use-browser-support.ts
│   └── use-browser-support.test.ts
└── test/
    ├── setup.ts               # Vitest setup
    ├── setup.test.ts          # Setup validation
    ├── patterns/              # Reusable test patterns
    │   └── pregnancy-safe.test.tsx
    └── integration/           # Integration tests
        └── router.test.tsx
```

### Component Tests (Storybook)

Location: Co-located with components in `*.stories.tsx`

```
app/components/
├── layout/
│   └── header/
│       ├── header.tsx
│       └── header.stories.tsx  # Play functions (replaces Playwright E2E specs)
├── ui/
│   ├── container.tsx
│   └── container.stories.tsx   # Play functions (replaces Playwright E2E specs)
```

> **Migration Note:** Component-level Playwright E2E specs (`header.spec.ts`, `header-accessibility.spec.ts`, etc.) have been migrated to Storybook play functions. Core interaction tests (menu open/close, keyboard navigation, ARIA states) are now in `*.stories.tsx` files. Visual regression testing will be handled by Chromatic (see #125).

### E2E Tests (Playwright)

Location: `app/test/e2e/specs/`

```
app/test/e2e/
├── specs/
│   ├── persona-journeys.spec.ts    # Multi-page user flows
│   ├── comprehensive-scenarios.spec.ts
│   ├── performance.spec.ts         # Core Web Vitals
│   └── security.spec.ts            # Security headers
└── fixtures/                       # Shared test data
```

---

## ✍️ Writing Play Functions

Play functions turn stories into interactive tests. They run in the browser and can assert on component behavior.

### Basic Example

```tsx
// header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Layout/Header',
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const MobileMenuInteraction: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the mobile menu button
    const menuButton = canvas.getByRole('button', { name: /menu/i });
    await userEvent.click(menuButton);
    
    // Assert menu is visible
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Assert all navigation links are present (matches actual site navigation)
    await expect(canvas.getByRole('link', { name: /doula/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /yoga/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /féminin/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /à propos/i })).toBeVisible();
  },
};
```

### Accessibility Testing

```tsx
export const AccessibilityCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Focus management - toHaveFocus() from @storybook/test works reliably
    // Alternatively, use document.activeElement for explicit verification
    const menuButton = canvas.getByRole('button', { name: /menu/i });
    
    // ✅ Recommended: Use toHaveFocus() from @storybook/test
    await userEvent.tab(); // Focus first interactive element
    await expect(menuButton).toHaveFocus();
    
    // ✅ Alternative: Check ARIA attributes for state verification
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(menuButton);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  },
};
```

### Form Validation

```tsx
export const FormValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Submit empty form
    const submitButton = canvas.getByRole('button', { name: /envoyer/i });
    await userEvent.click(submitButton);
    
    // Check error messages
    await expect(canvas.getByText(/ce champ est requis/i)).toBeVisible();
    
    // Fill form correctly
    const emailInput = canvas.getByLabelText(/courriel/i);
    await userEvent.type(emailInput, 'test@example.com');
    
    // Error should disappear
    await expect(canvas.queryByText(/ce champ est requis/i)).not.toBeInTheDocument();
  },
};
```

---

## 🎯 Pregnancy-Safe Testing Patterns

Given our target audience (pregnant women and new mothers), tests should verify:

### Touch Targets

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  
  // Minimum 44x44px for swollen fingers
  const { width, height } = button.getBoundingClientRect();
  await expect(width).toBeGreaterThanOrEqual(44);
  await expect(height).toBeGreaterThanOrEqual(44);
}
```

### Reduced Motion

```tsx
// Test with prefers-reduced-motion
export const ReducedMotion: Story = {
  parameters: {
    chromatic: { prefersReducedMotion: 'reduce' },
  },
  play: async ({ canvasElement }) => {
    // Verify no jarring animations
  },
};
```

### Color Contrast

Use the `@storybook/addon-a11y` panel to verify WCAG AA compliance (4.5:1 minimum contrast ratio).

> **Implementation Note:** Touch target validation (44x44px) and reduced motion testing are documented as patterns here. They will be implemented in component stories as we migrate each component. The `@storybook/addon-a11y` addon already provides automated accessibility checks including contrast ratio validation.

---

## ✅ Acceptance Criteria

### Phase 1 (Current PR)
- [x] Header component has play functions testing core interactions:
  - Mobile menu open/close
  - Escape key to close menu
  - Navigation items verification
  - ARIA states (`aria-expanded`)
  - French accessibility labels
- [x] Component-level Playwright specs migrated to Storybook
- [x] CI runs Vitest including Storybook play functions
- [x] This documentation is created
- [x] Page-level stories (Homepage) with play functions:
  - Mobile/Desktop view verification
  - Mobile navigation interaction
  - CTA button verification (touch targets)
  - Services section verification
  - Page accessibility landmarks
  - French content verification

### Future Phases
- [x] Visual regression testing via Chromatic (see #125)
- [ ] All components have play functions testing their interactions
- [ ] Additional page-level stories (ContactPage, etc.)
- [ ] Playwright only tests multi-page journeys
- [ ] No duplication between Storybook and Playwright

> **Note:** This is a phased rollout. Phase 1 covers the Header component and Homepage.

---

## 🎨 Visual Regression Testing (Chromatic)

[Chromatic](https://www.chromatic.com/) provides automated visual regression testing for Storybook stories. It captures screenshots of every story and compares them against baselines to detect unintended visual changes.

### Why Chromatic?

- **CSS Changes Detection**: Catches layout shifts, color changes, spacing issues
- **Cross-browser Testing**: Tests across multiple browsers automatically
- **Review Workflow**: Visual diffs with approve/reject workflow in PRs
- **Storybook Integration**: Native integration via `@chromatic-com/storybook`

### Running Chromatic

```bash
# Local (requires CHROMATIC_PROJECT_TOKEN environment variable)
npm run chromatic

# CI runs automatically on PRs via .github/workflows/chromatic.yml
```

### Configuration

Chromatic is configured in `.github/workflows/chromatic.yml`:

- **`exitZeroOnChanges: true`**: Don't fail CI when visual changes are detected (review workflow)
- **`exitOnceUploaded: true`**: Exit after upload, don't wait for build completion
- **`onlyChanged: true`**: Only test stories that changed (faster builds)
- **`autoAcceptChanges: main`**: Auto-accept baselines on main branch merges

### Story Parameters for Chromatic

```tsx
// Skip visual testing for a story
export const InteractiveDemo: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

// Test with reduced motion preference
export const ReducedMotion: Story = {
  parameters: {
    chromatic: { prefersReducedMotion: 'reduce' },
  },
};

// Test at specific viewports
export const Mobile: Story = {
  parameters: {
    chromatic: { viewports: [375] },
  },
};
```

### Setup Requirements

1. Create a Chromatic account at [chromatic.com](https://www.chromatic.com/)
2. Add the project and get the project token
3. Add `CHROMATIC_PROJECT_TOKEN` secret to GitHub repository settings

---

## 📚 References

- [Storybook: Play Functions](https://storybook.js.org/docs/writing-stories/play-function)
- [Storybook: Vitest Addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
- [Storybook: Stories in E2E Tests](https://storybook.js.org/docs/writing-tests/integrations/stories-in-end-to-end-tests)
- [Storybook: Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
