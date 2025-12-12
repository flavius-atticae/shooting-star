# Component Template

This document defines the standard structure for React components in the Shooting Star project.

## Table of Contents

- [Overview](#overview)
- [Component Structure](#component-structure)
- [Import Order](#import-order)
- [Type Definitions](#type-definitions)
- [JSDoc Documentation](#jsdoc-documentation)
- [Component Implementation](#component-implementation)
- [Export Pattern](#export-pattern)
- [Complete Examples](#complete-examples)

## Overview

All React components in this project should follow a consistent structure to improve:

- **Readability**: Developers can quickly understand component structure
- **Maintainability**: Consistent patterns make updates easier
- **Type Safety**: Explicit interfaces improve TypeScript support
- **Documentation**: JSDoc provides inline documentation for IDE support
- **Accessibility**: Standard patterns encourage WCAG 2.1 AA compliance

## Component Structure

Every component file should follow this order:

1. **Imports** (grouped and ordered)
2. **Type Definitions** (interfaces, types, constants)
3. **Component Implementation** (the main component function)
4. **Exports** (named exports at the bottom)

## Import Order

Imports should be grouped in the following order, with blank lines between groups:

```typescript
// 1. React imports (always first)
import * as React from "react";

// 2. Third-party library imports (alphabetically sorted)
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 3. Internal utility imports
import { cn } from "~/lib/utils";

// 4. Component imports (ordered: ui, layout, other)
import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
import { Hero } from "~/components/layout/hero";

// 5. Type-only imports (last)
import type { CustomType } from "./types";
```

### Import Guidelines

- Use named imports for React: `import * as React from "react"`
- Group related imports together
- Sort alphabetically within each group
- Use `type` keyword for type-only imports
- Use `~/` path alias for absolute imports

## Type Definitions

### Props Interface

Every component should have an explicit props interface:

```typescript
/**
 * Props for the ComponentName component
 */
export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main title text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Custom styling className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}
```

### Props Interface Guidelines

- Name: `ComponentNameProps` (PascalCase + "Props" suffix)
- Always export the interface
- Extend appropriate React HTML attributes when applicable:
  - `React.HTMLAttributes<HTMLDivElement>` for divs
  - `React.HTMLAttributes<HTMLElement>` for semantic elements
  - `React.ComponentProps<"button">` for buttons
- Document each prop with JSDoc comments
- Mark optional props with `?`
- Use `Omit<>` to exclude conflicting props when needed

### Additional Types

Constants and helper types should be defined before the component:

```typescript
/**
 * Supported size variants
 */
export type SizeVariant = "sm" | "md" | "lg" | "xl";

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  size: "md" as SizeVariant,
  spacing: 16,
} as const;
```

## JSDoc Documentation

Every exported component must have comprehensive JSDoc documentation:

```typescript
/**
 * ComponentName - Brief one-line description
 *
 * Detailed description explaining:
 * - What the component does
 * - Key features and behavior
 * - Design considerations
 * - Accessibility features (WCAG 2.1 AA compliance)
 *
 * Design:
 * - Color scheme and typography choices
 * - Responsive behavior
 * - Pregnancy-safe considerations (where applicable)
 *
 * Accessibility:
 * - Keyboard navigation support
 * - ARIA attributes used
 * - Touch target sizes (minimum 44x44px, optimal 48x48px)
 * - Screen reader support
 * - Reduced motion support
 *
 * @example
 * ```tsx
 * <ComponentName
 *   title="Example Title"
 *   subtitle="Optional subtitle"
 *   onClick={() => console.log("clicked")}
 * />
 * ```
 */
export function ComponentName({ ... }: ComponentNameProps) {
  // ...
}
```

### JSDoc Guidelines

- First line: Component name and brief description
- Detailed description block with key features
- Include design considerations when relevant
- **Always** include accessibility information
- Provide at least one usage example
- Use code blocks (```tsx) for examples
- Keep examples realistic and practical

## Component Implementation

### Function Declaration

Use named function declarations (not arrow functions):

```typescript
export function ComponentName({
  title,
  subtitle,
  className,
  ...props
}: ComponentNameProps) {
  // Component implementation
}
```

### Display Name

For components using `React.forwardRef`, set a display name:

```typescript
export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ title, className, ...props }, ref) => {
    // Component implementation
  }
);

ComponentName.displayName = "ComponentName";
```

### Props Destructuring

- Destructure props in the function signature
- Group related props together
- Put `className` and `...props` last
- Keep destructuring readable (max ~6 props per line)

```typescript
export function ComponentName({
  // Required props first
  title,
  content,
  // Optional props
  subtitle,
  variant = "default",
  size = "md",
  // HTML attributes last
  className,
  ...props
}: ComponentNameProps) {
  // ...
}
```

### Component Body

- Use `cn()` utility for className composition
- Include data attributes for testing/styling: `data-slot="component-name"`
  - Used for component identification in tests
  - Provides stable selectors that don't change with styling
  - Convention inherited from shadcn/ui component library
- Spread remaining props: `{...props}`
- Add comments for complex logic sections
- Extract complex logic into helper functions

```typescript
export function ComponentName({
  title,
  variant = "default",
  className,
  ...props
}: ComponentNameProps) {
  return (
    <div
      data-slot="component-name"
      className={cn(
        // Base styles
        "rounded-lg border p-4",
        // Variant styles
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" && "bg-secondary text-gray-900",
        // Custom className
        className
      )}
      {...props}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
```

## Export Pattern

### Named Exports Only

Use **named exports** for all components (no default exports):

```typescript
// ✅ Correct
export function ComponentName({ ... }: ComponentNameProps) {
  // ...
}

// ❌ Avoid
export default function ComponentName({ ... }: ComponentNameProps) {
  // ...
}
```

### Re-exports in Index Files

Use index files to re-export components from directories:

```typescript
// components/layout/hero/index.ts
export { Hero, HeroContent } from "./Hero";
export type { HeroProps, HeroContentProps, HeroVariant } from "./Hero";
```

### Export Organization

At the end of the file, you may optionally re-export types and utilities:

```typescript
// Main component export
export function ComponentName({ ... }: ComponentNameProps) {
  // ...
}

// Re-export related types for convenience
export type { SizeVariant, ColorScheme };
```

## Complete Examples

### Simple UI Component

```typescript
import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * Props for the Badge component
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: "default" | "success" | "warning" | "error";
  /** Custom className */
  className?: string;
}

/**
 * Badge - Display status or category labels
 *
 * A small, inline component for displaying labels, statuses, or categories.
 *
 * Features:
 * - Multiple color variants for different contexts
 * - Rounded corners for visual softness
 * - Responsive text sizing
 *
 * Accessibility:
 * - Semantic HTML with appropriate ARIA roles
 * - High contrast colors (WCAG 2.1 AA compliant)
 * - Clear, readable typography
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * ```
 */
export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        // Base styles
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        // Variant styles
        variant === "default" && "bg-gray-100 text-gray-800",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800",
        variant === "error" && "bg-red-100 text-red-800",
        // Custom className
        className
      )}
      {...props}
    />
  );
}
```

### Complex Layout Component with ForwardRef

```typescript
import * as React from "react";
import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/container";

/**
 * Hero variant types
 */
export type HeroVariant = "default" | "full-height";

/**
 * Props for the Hero component
 */
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Main title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Hero variant */
  variant?: HeroVariant;
  /** Custom className */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Hero - Main hero section for landing pages
 *
 * A full-width hero section with title, subtitle, and optional children.
 * Designed for pregnancy-safe visual hierarchy and calming aesthetics.
 *
 * Features:
 * - Responsive height based on viewport
 * - Typography using Ivyora Display (title) and Barlow (subtitle)
 * - Pregnancy-safe color palette (#618462 primary)
 * - Rounded bottom edges for modern look
 *
 * Variants:
 * - `default`: Responsive height (400px → 600px)
 * - `full-height`: 100vh minus header height
 *
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text for readability
 * - Reduced motion support for animations
 * - Safe area padding for mobile devices
 *
 * @example
 * ```tsx
 * <Hero
 *   title="Épanouir sa féminité"
 *   subtitle="AVEC PAULINE ROUSSEL"
 *   variant="default"
 * />
 * ```
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      title,
      subtitle,
      variant = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Layout
          "relative w-full overflow-hidden",
          // Background
          "bg-gris",
          // Height variants
          variant === "default" && "h-[400px] md:h-[500px] lg:h-[600px]",
          variant === "full-height" && "min-h-[calc(100vh-80px)]",
          // Rounded corners (skip for full-height)
          variant !== "full-height" && "rounded-b-xl",
          className
        )}
        role="region"
        aria-label="Section principale d'accueil"
        {...props}
      >
        <Container size="xl" className="h-full flex items-center px-4 sm:px-8">
          {children || (
            <div className="flex flex-col items-start">
              <h1 className="font-heading text-5xl md:text-8xl text-primary font-medium">
                {title}
              </h1>
              <p className="font-sans text-sm md:text-xl text-primary font-bold uppercase mt-2">
                {subtitle}
              </p>
            </div>
          )}
        </Container>
      </section>
    );
  }
);

Hero.displayName = "Hero";
```

### Component with Multiple Exports

```typescript
import * as React from "react";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Card size variants
 */
export type CardSize = "sm" | "md" | "lg";

/**
 * Props for the Card component
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card size variant */
  size?: CardSize;
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardHeader component
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardContent component
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className */
  className?: string;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Card - Container component for content grouping
 *
 * A flexible card component with header and content sections.
 *
 * Accessibility:
 * - Semantic HTML structure
 * - WCAG 2.1 AA compliant styling
 * - Keyboard navigation support
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export function Card({
  size = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        size === "sm" && "p-4",
        size === "md" && "p-6",
        size === "lg" && "p-8",
        className
      )}
      {...props}
    />
  );
}

/**
 * CardHeader - Header section for Card component
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <h3>Card Title</h3>
 * </CardHeader>
 * ```
 */
export function CardHeader({
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn("mb-4", className)}
      {...props}
    />
  );
}

/**
 * CardContent - Content section for Card component
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Content</p>
 * </CardContent>
 * ```
 */
export function CardContent({
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(className)}
      {...props}
    />
  );
}
```

## Checklist

When creating or updating a component, ensure:

- [ ] Imports are ordered correctly (React, third-party, internal, types)
- [ ] Props interface is exported with JSDoc for each prop
- [ ] Component has comprehensive JSDoc documentation
- [ ] Component uses named export (not default)
- [ ] Component follows the standard structure
- [ ] Accessibility considerations are documented
- [ ] At least one usage example is provided
- [ ] `className` uses `cn()` utility for composition
- [ ] Remaining props are spread with `{...props}`
- [ ] Display name is set for forwarded ref components
- [ ] Type-safe prop destructuring with defaults

## Related Documentation

- [Testing Strategy](../02-architecture/testing-strategy.md)
- [Storybook Setup](../02-architecture/storybook-setup.md)
- [Security Guidelines](./guidelines.md)

## Testing Components

### Test File Naming

Test files should follow this naming convention:
- Unit tests: `component-name.test.tsx`
- Integration tests: `feature-name.test.tsx`
- E2E tests: Use Playwright in `app/test/e2e/`

### Test Location

- Component tests: `app/test/components/`
- Integration tests: `app/test/integration/`
- Pattern tests: `app/test/patterns/`

### Example Test Structure

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentName } from "~/components/ui/component-name";

describe("ComponentName", () => {
  it("renders with default props", () => {
    render(<ComponentName title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ComponentName title="Test" className="custom-class" />);
    const element = screen.getByTestId("component-name"); // or use data-slot
    expect(element).toHaveClass("custom-class");
  });

  it("meets accessibility requirements", () => {
    const { container } = render(<ComponentName title="Test" />);
    // Add accessibility assertions
  });
});
```

See [Testing Strategy](../02-architecture/testing-strategy.md) for complete guidelines.

## Storybook Stories

### Story File Naming

Story files should be colocated with components:
- Pattern: `component-name.stories.tsx`
- Location: Same directory as the component

### Example Story Structure

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Example Title",
  },
};

export const Primary: Story = {
  args: {
    title: "Primary Variant",
    variant: "primary",
  },
};
```

See [Storybook Setup](../02-architecture/storybook-setup.md) for complete guidelines.

---

**Note**: This template should be applied to all new components and gradually adopted for existing components during refactoring efforts.
