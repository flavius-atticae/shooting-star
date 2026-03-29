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

## React 19 patterns

### ref as prop

In React 19, `ref` is a regular prop — no `forwardRef` needed for new components. Only keep `forwardRef` on **existing** primitives to avoid a breaking change:

```tsx
// ✅ new components
export function Input({ ref, className, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} className={cn("...", className)} {...props} />;
}

// ✅ existing forwardRef — keep to avoid breaking consumers
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("...", className)} {...props} />
));
Button.displayName = "Button";
```

### Context without `.Provider`

```tsx
// ✅ React 19
const ThemeContext = createContext("light");
<ThemeContext value="dark"> … </ThemeContext>

// ❌ legacy
<ThemeContext.Provider value="dark"> … </ThemeContext.Provider>
```

### Form patterns (contact form)

Use `useActionState` + `useFormStatus` for the contact form — no need for manual loading state:

```tsx
// form-action.ts (server action or route action)
export async function contactAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const result = await sendEmail(formData);
  return result.ok ? { success: true } : { error: "Erreur lors de l'envoi." };
}

// contact-form.tsx
import { useActionState } from "react";
import { contactAction } from "./form-action";

export function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, null);

  return (
    <form action={action}>
      <SubmitButton />
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

// submit-button.tsx — reads pending state from nearest form
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Envoi en cours…" : "Envoyer"}
    </button>
  );
}
```

Use `useOptimistic` when you need to update UI immediately before the server responds (e.g., inline confirmation message):

```tsx
const [optimisticState, setOptimistic] = useOptimistic(state);
```

## forwardRef

Keep `React.forwardRef` only for **existing UI primitives** (`Button`, `Input`, `Container`, `Textarea`, `Select`) — do not add it to new components (use the React 19 `ref` prop pattern above).

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

### Skip link

Every page layout must include a skip link as the **first focusable element** in `<header>`:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4">
  Passer au contenu principal
</a>
// ...
<main id="main-content" tabIndex={-1}>
```

`tabIndex={-1}` on `<main>` allows programmatic focus without making it part of the tab order.

### SVG icons

Always use `currentColor` for SVG fills and strokes — icons adapt automatically to forced-colors mode and theme changes:

```tsx
// ✅
<svg fill="currentColor" stroke="currentColor" aria-hidden="true">

// ❌
<svg fill="#618462">
```

### Focus styles in forced-colors mode

When using `box-shadow` for focus rings, add a transparent `outline` fallback so it renders in Windows High Contrast / forced-colors mode:

```tsx
// ✅ — box-shadow is suppressed in forced-colors; outline takes over
className="focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline focus-visible:outline-transparent"
```

### Reflow at 320px (WCAG 1.4.10)

Flex children must be able to shrink and wrap — never use fixed widths that force horizontal scrolling at narrow viewports:

```tsx
// ✅
className="flex flex-wrap gap-4 min-w-0"

// ❌ — breaks reflow
className="flex w-[400px] overflow-hidden"
```

Never use `overflow: hidden` on text containers at narrow widths without verifying the content is still accessible.
