# Foundation Components

This document describes the foundation components architecture and their recommended usage patterns in the Shooting Star project.

## Table of Contents

- [Overview](#overview)
- [Foundation Components](#foundation-components)
  - [Section](#section)
  - [Container](#container)
- [Recommended Patterns](#recommended-patterns)
- [Discouraged Patterns](#discouraged-patterns)
- [Container Queries vs Media Queries](#container-queries-vs-media-queries)
- [Complete Examples](#complete-examples)

## Overview

Foundation components are the low-level building blocks for page layouts. They provide:

- **Semantic structure** - Proper HTML semantics
- **Consistent spacing** - Standardized vertical and horizontal spacing
- **Layout constraints** - Maximum widths and centering
- **Visual styling** - Backgrounds, rounded corners, insets

These components are designed to be composed together, not to replace Tailwind CSS utility classes.

## Foundation Components

### Section

**Purpose**: Semantic wrapper with background, spacing, and insets.

**When to use**: For each major section of a page that needs visual separation or a specific background.

**Key features**:
- Configurable background colors (white, primary, accent, soft gradient, transparent)
- Vertical spacing variants (none, compact, normal, spacious)
- Horizontal and vertical insets for "floating card" effect
- Rounded corners support
- Polymorphic (can render as any HTML element)

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `BackgroundVariant` | `"white"` | Background color variant |
| `spacing` | `SpacingVariant` | `"normal"` | Vertical spacing (py-12 lg:py-16) |
| `insetX` | `InsetSize` | `"none"` | Horizontal wrapper padding |
| `insetY` | `InsetSize` | `"none"` | Vertical wrapper padding |
| `rounded` | `RoundedSize` | `"none"` | Border radius size |
| `as` | `React.ElementType` | `"section"` | HTML element to render |
| `className` | `string` | - | Additional CSS classes |

**Background variants**:
- `white` - Pure white background (default)
- `primary` - Primary brand color (#618462)
- `accent` - Soft beige (gris)
- `soft` - Gradient from white to soft beige
- `transparent` - No background

**Spacing variants**:
- `none` - No vertical padding
- `compact` - py-8
- `normal` - py-12 lg:py-16 (default)
- `spacious` - py-16 lg:py-24

### Container

**Purpose**: Content width constraint with automatic centering.

**When to use**: Inside Section components to constrain content width and maintain readability.

**Key features**:
- Multiple size variants for different use cases
- Automatic horizontal centering (except "full")
- No padding applied (composition-friendly)
- Polymorphic (can render as any HTML element)

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ContainerSize` | `"md"` | Maximum width variant |
| `as` | `React.ElementType` | `"div"` | HTML element to render |
| `className` | `string` | - | Additional CSS classes |

**Size variants**:
- `sm` - max-w-2xl - Narrow for focused content (articles, forms)
- `md` - max-w-4xl - Standard for most content
- `lg` - max-w-6xl - Large for dashboards and complex layouts
- `xl` - max-w-7xl - Extra large for very wide content
- `full` - w-full - Full available width of the parent element

## Recommended Patterns

### Standard Section Structure

The standard pattern for creating a page section:

```tsx
// ✅ Recommended: Standard section with white background
<Section background="white" spacing="normal">
  <Container size="lg">
    <h2>Section Title</h2>
    <p>Section content goes here</p>
  </Container>
</Section>
```

### Floating Card Effect

Use insets to create a "floating card" effect:

```tsx
// ✅ Recommended: Floating card with rounded corners
<Section
  background="accent"
  spacing="compact"
  insetX="md"
  insetY="sm"
  rounded="lg"
>
  <Container size="md">
    <p>This content appears as a floating card</p>
  </Container>
</Section>
```

### Multiple Sections with Different Backgrounds

```tsx
// ✅ Recommended: Alternating backgrounds for visual separation
<>
  <Section background="white" spacing="normal">
    <Container size="lg">
      <h2>First Section</h2>
    </Container>
  </Section>

  <Section background="accent" spacing="normal">
    <Container size="lg">
      <h2>Second Section</h2>
    </Container>
  </Section>

  <Section background="primary" spacing="spacious">
    <Container size="lg" className="text-white">
      <h2>Call to Action</h2>
    </Container>
  </Section>
</>
```

### Responsive Grid with Tailwind

Use native Tailwind classes for responsive grids:

```tsx
// ✅ Recommended: Native Tailwind grid
<Section background="white" spacing="normal">
  <Container size="lg">
    <h2 className="text-3xl font-bold mb-8">Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  </Container>
</Section>
```

### Responsive Layout with Flexbox

```tsx
// ✅ Recommended: Native Tailwind flexbox
<Section background="accent" spacing="normal">
  <Container size="lg">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <h2>Content on the left</h2>
        <p>Description text</p>
      </div>
      <div className="flex-1">
        <img src="/image.jpg" alt="Description" />
      </div>
    </div>
  </Container>
</Section>
```

### Adding Padding to Container

Container doesn't apply padding by default. Add it when needed:

```tsx
// ✅ Recommended: Add padding via className
<Section background="white" spacing="normal">
  <Container size="lg" className="px-4 sm:px-6">
    <h2>Content with horizontal padding</h2>
  </Container>
</Section>
```

## Discouraged Patterns

**Note**: The following examples use hypothetical component names to illustrate anti-patterns. These components don't exist in the codebase - they represent patterns to avoid.

### Don't Create Abstractions for Simple Tailwind Patterns

```tsx
// ❌ Discouraged: Over-engineering with custom components
// (Hypothetical example - AdaptiveGrid doesn't exist)
<AdaptiveGrid columns={3} gap="md">
  {items.map(item => <Card key={item.id} />)}
</AdaptiveGrid>

// ✅ Recommended: Use native Tailwind
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Don't Wrap Everything in Unnecessary Components

```tsx
// ❌ Discouraged: Too many wrappers
// (Hypothetical example - these wrapper components don't exist)
<PageLayout>
  <ContentWrapper>
    <SectionWrapper>
      <Container>
        <h1>Title</h1>
      </Container>
    </SectionWrapper>
  </ContentWrapper>
</PageLayout>

// ✅ Recommended: Use only what you need
<Section background="white" spacing="normal">
  <Container size="lg">
    <h1>Title</h1>
  </Container>
</Section>
```

### Don't Create Custom Spacing Components

```tsx
// ❌ Discouraged: Custom spacing components
<VerticalSpace size="large" />
<HorizontalSpace size="medium" />

// ✅ Recommended: Use Tailwind classes directly
<div className="mb-12" />
<div className="mx-8" />
```

### Don't Abstract Flexbox/Grid Layouts Unnecessarily

```tsx
// ❌ Discouraged: Custom layout components
<FlexContainer direction="row" justify="between" align="center">
  <FlexItem>Left</FlexItem>
  <FlexItem>Right</FlexItem>
</FlexContainer>

// ✅ Recommended: Use Tailwind utilities
<div className="flex flex-row justify-between items-center">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Don't Use Section Without Container

```tsx
// ❌ Discouraged: Section without Container (content may be too wide)
<Section background="white" spacing="normal">
  <h2>This might be too wide on large screens</h2>
  <p>Content without width constraint</p>
</Section>

// ✅ Recommended: Always use Container inside Section
<Section background="white" spacing="normal">
  <Container size="lg">
    <h2>This has proper width constraint</h2>
    <p>Content with optimal reading width</p>
  </Container>
</Section>
```

## Container Queries vs Media Queries

### When to Use Media Queries (Tailwind)

**Use media queries when you can predict the container width at design time.**

Most layouts fall into this category:

```tsx
// ✅ Use media queries for predictable layouts
<Section background="white">
  <Container size="lg">
    {/* We know this container is max-w-6xl, so we can use breakpoints */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => <Card key={item.id} />)}
    </div>
  </Container>
</Section>
```

**Advantages**:
- Simpler mental model
- Better browser support
- No need for JavaScript fallbacks
- Matches Tailwind's design philosophy

### When to Use Container Queries

**Use container queries when the same component must adapt to unpredictable container widths.**

Examples:
- A widget that can be placed in a sidebar or main content area
- A component used in a collapsible panel
- A reusable card that appears in various layout contexts

```tsx
// ✅ Use container queries for truly unpredictable contexts
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    {/* Adapts based on container width, not viewport */}
  </div>
</div>
```

### Decision Guide

Ask yourself: **"Do I know how wide this container will be when I design the layout?"**

- **YES** → Use media queries (Tailwind breakpoints: `md:`, `lg:`, etc.)
- **NO** → Consider container queries (`@container`, `@md:`, etc.)

In practice, **90% of layouts should use media queries** because they're simpler and more predictable.

## Complete Examples

**Note**: The following examples contain French text (fr-CA) as they represent realistic UI content for the target audience (pregnant women and new mothers in Québec). While code and documentation are written in English, UI content is in French per the project's language requirements.

### Home Page Hero Section

```tsx
import { Link } from "react-router";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export function HomeHero() {
  return (
    <Section
      background="accent"
      spacing="spacious"
      className="min-h-[500px] flex items-center"
    >
      <Container size="xl" className="px-4 sm:px-6">
        <div className="flex flex-col items-start">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary font-medium">
            Épanouir sa féminité
          </h1>
          <p className="font-sans text-lg md:text-xl text-primary font-bold uppercase mt-4">
            Avec Pauline Roussel
          </p>
          <Link
            to="/contact"
            className="mt-8 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </Container>
    </Section>
  );
}
```

### Services Grid Section

```tsx
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export function ServicesSection() {
  const services = [
    { id: 1, title: "Yoga prénatal", description: "..." },
    { id: 2, title: "Yoga postnatal", description: "..." },
    { id: 3, title: "Accompagnement à la naissance", description: "..." },
  ];

  return (
    <Section background="white" spacing="normal">
      <Container size="lg" className="px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
          Services
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Accompagnement personnalisé pour chaque étape
        </p>
        
        {/* Native Tailwind grid - no custom abstraction needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

### Content Section with Floating Card

```tsx
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export function AboutSection() {
  return (
    <Section
      background="primary"
      spacing="normal"
      insetX="md"
      insetY="sm"
      rounded="xl"
    >
      <Container size="md" className="px-6 py-8 text-white">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">
          À propos
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Professeure de yoga certifiée, spécialisée en périnatalité...
          </p>
        </div>
      </Container>
    </Section>
  );
}
```

### Two-Column Layout

```tsx
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export function ApproachSection() {
  return (
    <Section background="white" spacing="normal">
      <Container size="lg" className="px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
          Mon approche
        </h2>
        
        {/* Native Tailwind flex layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-semibold">Philosophie</h3>
            <p className="text-gray-700 leading-relaxed">
              Une approche holistique et bienveillante...
            </p>
          </div>
          
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-semibold">Méthodes</h3>
            <p className="text-gray-700 leading-relaxed">
              Des techniques adaptées à chaque femme...
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

## Best Practices Summary

1. **Always pair Section with Container** - Section provides background and spacing, Container constrains width
2. **Use Tailwind utilities directly** - Don't create abstractions for simple layouts
3. **Prefer media queries over container queries** - Use container queries only for truly unpredictable contexts
4. **Add padding to Container via className** - Container is deliberately padding-free for composition
5. **Use semantic HTML** - Leverage the `as` prop for proper semantic structure
6. **Keep it simple** - Don't over-engineer with unnecessary wrapper components

## Related Documentation

- [Component Template](../04-reference/component-template.md) - Standard component structure
- [TailwindCSS Configuration](./tailwindcss-configuration.md) - Tailwind setup and customization
- [Testing Strategy](./testing-strategy.md) - How to test layout components

---

**Note**: This architecture is part of the ongoing simplification effort (issue #182). The goal is to maintain a small set of flexible foundation components while leveraging Tailwind CSS for most layout needs.
