---
description: Architecture rules for React components in this project
applyTo: "app/components/**"
---

# Component Architecture

## File & directory conventions

- One component per file, file name in **kebab-case** matching the component name: `service-card.tsx` → `ServiceCard`
- Each component directory has an `index.ts` barrel that re-exports everything consumers need
- Co-locate sub-components, types, and helpers in the same directory

## Props interface

Always define a **named, exported** interface named `ComponentNameProps`:

```tsx
export interface ServiceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  service: ServiceItem;
  className?: string;
}
```

**Extending HTML props — two patterns, pick the right one:**

| Use case | Pattern |
|---|---|
| UI primitive that passes all attributes through (input, button…) | `extends React.ComponentProps<"input">` |
| Layout/section component that manages its own children | `extends Omit<React.HTMLAttributes<HTMLElement>, "children">` |

Never extend both or mix them.

**`children`** — always typed as `React.ReactNode` when accepted. If the component does not accept children, omit it from props (via `Omit<..., "children">`).

## className merging

Always use `cn()` from `~/lib/utils`. Never use template literals or string concatenation for classNames:

```tsx
// ✅
className={cn("base-class", variant === "cta" && "cta-class", className)}

// ❌
className={`base-class ${className}`}
className={"base-class " + className}
```

The last argument to `cn()` must always be the `className` prop so consumers can override.

## forwardRef

Use `React.forwardRef` for **UI primitive components** (`Button`, `Input`, `Container`, `Textarea`, `Select`) — not for layout/section components (`Footer`, `Services`, `Hero`).

Every `forwardRef` component must set `displayName`:

```tsx
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("...", className)} {...props} />
  ),
);
Input.displayName = "Input";
```

## Barrel exports (`index.ts`)

Export types first, then implementations. Named exports only — no default exports from barrels:

```ts
// index.ts
export type { ServiceCardProps, ServiceItem } from "./service-card";
export { ServiceCard } from "./service-card";
```

## Component composition

**Children vs props** — choose based on content nature:

- **Children** for layout wrappers (`Section`, `Container`, `Background`)
- **Props** for data-driven cards (`ServiceCard`, `EventCard`, `TestimonialCard`)
- **Hybrid** when content is optional or replaceable (`Hero` accepts `title` prop or `children`)

**`asChild` / Radix Slot** for polymorphic triggers:

```tsx
// Button can render as a link
<Button asChild>
  <a href="/contact">Contactez-moi</a>
</Button>
```

Only `Button` and form primitives use `asChild`. Do not add Slot to layout components.

## Animations

Always use `useReducedMotion` from `~/hooks/use-reduced-motion` — never inline the `matchMedia` logic:

```tsx
const prefersReducedMotion = useReducedMotion();
```

For CSS-only animations, use the `motion-safe:` Tailwind modifier:

```tsx
className="motion-safe:transition-transform motion-safe:duration-200"
```

Never animate with JavaScript timers in ways that bypass reduced-motion detection.

## Naming

| Thing | Convention | Example |
|---|---|---|
| File | kebab-case | `event-card.tsx` |
| Directory | kebab-case | `testimonials-carousel/` |
| Component | PascalCase | `EventCard` |
| Props interface | `ComponentNameProps` | `EventCardProps` |
| Data interface | PascalCase noun | `ServiceItem`, `Testimonial` |
| Hook | `useXxx` camelCase | `useReducedMotion` |
| Constant | `SCREAMING_SNAKE_CASE` | `NAVIGATION_LINKS` |

## Shared config

Navigation links and social links live in `app/config/` — never hardcode them inside a component:

```tsx
import { NAVIGATION_LINKS } from "~/config/navigation";
import { SOCIAL_LINKS } from "~/config/social";
```

## Accessibility requirements

Every interactive element needs a keyboard-accessible state and an ARIA label when the visual label is insufficient. Touch targets must be ≥ 44×44 px. Use semantic HTML (`<nav>`, `<main>`, `<footer>`, `<header>`, `<section>`, `<article>`) before reaching for `role=`.
