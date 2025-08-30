# TailwindCSS Configuration

This document outlines the TailwindCSS configuration for the Pauline Roussel yoga website, including brand color integration, typography system, and shadcn/ui compatibility.

## Overview

The project uses TailwindCSS v4 with a comprehensive brand color system that integrates seamlessly with shadcn/ui components. All colors, fonts, and design tokens from the [Brand Guidelines](../design-system/brand-guidelines.md) have been implemented as CSS custom properties.

## Configuration Files

### Primary Configuration: `/app/app.css`
- **TailwindCSS v4 @theme syntax** for defining custom properties
- **Brand color palettes** with 50-900 shade variations
- **Typography system** with custom font families
- **Light and dark mode** color mappings for shadcn/ui
- **Custom breakpoints** and spacing system

### Secondary Configuration: `/tailwind.config.js`
- **Extended theme settings** for better IDE support
- **Custom animations** for gentle, calming interactions
- **Typography scale** optimized for yoga/wellness content
- **Responsive breakpoints** tailored for the website

### Component Configuration: `/components.json`
- **shadcn/ui integration** settings
- **Path aliases** for component imports
- **Base color** set to "neutral" for consistent styling

## Brand Color System

### Color Palettes Implemented

All colors from the brand guidelines are implemented with full 50-900 shade ranges:

#### Primary Colors
- **Primary (Clouded Pine)** - `#618462` - Main brand color
- **Accent (Rustling Leaves)** - `#AF6868` - Warm accent color
- **Neutral (Pitch Mary Brown)** - `#5E4530` - Text and neutral tones

#### Supporting Colors
- **Secondary (Submerged)** - `#517982` - Cool blue-gray
- **Warm (Frappé)** - `#CEAF9B` - Warm beige tones  
- **Soft (Glazed Sugar)** - `#FFDDD3` - Soft peach backgrounds
- **Cool (Smoke & Mirrors)** - `#DAE6EA` - Light gray-blue
- **Success (Splashdown)** - `#7DBB7D` - Success states
- **Menthe** - `#3D4E8D` - Fresh mint accent (newly implemented)

### Usage Examples

```css
/* Brand colors available as utilities */
bg-primary-500    /* Main brand background */
text-accent-600   /* Accent text */
border-secondary-200  /* Subtle borders */
bg-menthe-100     /* Light mint background */

/* Responsive usage */
bg-primary-500 md:bg-accent-500 lg:bg-secondary-500
```

## Typography System

### Font Families

#### Barlow (Body Text & Subtitles)
```css
font-body      /* Barlow Regular (400) */
font-subtitle  /* Barlow SemiBold (600) */
```

#### The Seasons (Headings)
```css  
font-heading   /* The Seasons Regular */
```

#### Moontime (Accents)
```css
font-accent    /* Moontime Regular */
```

### Font Loading
- All fonts loaded via `@font-face` from `/public/fonts/`
- `font-display: swap` for optimal loading performance
- Comprehensive fallback fonts for accessibility

### Usage Examples

```tsx
<h1 className="font-heading text-3xl text-primary-600">
  Main Heading
</h1>

<p className="font-body text-neutral-700 leading-relaxed">
  Body text content
</p>

<span className="font-accent text-accent-500">
  Decorative accent text
</span>
```

## shadcn/ui Integration

### Color Mapping

The configuration maps shadcn/ui semantic colors to brand colors:

#### Light Mode
```css
--background: var(--color-soft-50)           /* Soft peach background */
--primary: var(--color-primary-500)          /* Clouded Pine primary */
--accent: var(--color-accent-500)            /* Rustling Leaves accent */
--border: var(--color-primary-200)           /* Subtle green borders */
```

#### Dark Mode  
```css
--background: var(--color-neutral-900)       /* Dark brown background */
--primary: var(--color-primary-400)          /* Lighter green for contrast */
--accent: var(--color-accent-400)            /* Lighter rose for contrast */
--border: var(--color-neutral-700)           /* Neutral borders */
```

### Component Compatibility

All existing shadcn/ui components automatically use the brand colors:

```tsx
<Button>Primary Button</Button>              {/* Uses brand green */}
<Button variant="secondary">Secondary</Button> {/* Uses brand blue */}
<Card className="border-primary-200">         {/* Subtle green border */}
  <CardContent>Brand-colored content</CardContent>
</Card>
```

## Custom Breakpoints

### Responsive System

```css
xs:   380px   /* Extra small mobile devices */
sm:   640px   /* Small mobile devices */  
md:   768px   /* Tablets */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large desktop */
2xl:  1536px  /* Extra large desktop */
```

### Usage Examples

```tsx
<div className="w-full xs:w-80 md:w-96 lg:w-[500px]">
  Responsive width scaling
</div>

<section className="p-4 md:p-8 lg:p-12">
  Progressive padding enhancement  
</section>
```

## Custom Animations

### Available Animations

```css
animate-fade-in        /* Gentle fade in (0.5s ease-in-out) */
animate-slide-up       /* Slide up from bottom (0.3s ease-out) */  
animate-gentle-bounce  /* Subtle bounce effect (2s infinite) */
```

### Usage Examples

```tsx
<div className="animate-fade-in">
  Content that fades in smoothly
</div>

<button className="hover:animate-gentle-bounce">
  Gently animated button
</button>
```

## Best Practices

### Color Usage Guidelines

1. **Primary colors** - Use for main brand elements, CTAs, navigation
2. **Accent colors** - Use for highlights, hover states, secondary actions
3. **Neutral colors** - Use for text, borders, subtle backgrounds
4. **Supporting colors** - Use for specific contexts (success, warnings, etc.)

### Accessibility Considerations

- All color combinations meet WCAG AA contrast requirements
- Dark mode provides sufficient contrast ratios
- Semantic color names make intent clear to developers
- Fallback fonts ensure readability across devices

### Performance Optimizations

- CSS custom properties enable efficient color changes
- Font loading optimized with `font-display: swap`
- Minimal JavaScript required for theme switching
- Tree-shaking compatible with TailwindCSS purging

## Troubleshooting

### Common Issues

#### Colors not appearing
- Ensure content paths in `tailwind.config.js` include your components
- Verify CSS custom properties are properly defined in `app.css`
- Check browser DevTools for CSS variable resolution

#### Font loading issues  
- Confirm font files exist in `/public/fonts/`
- Verify `@font-face` declarations match font file names
- Check Network tab for failed font requests

#### Dark mode not working
- Ensure `.dark` class is applied to `<html>` or `<body>`
- Verify dark mode color mappings in CSS
- Test with `prefers-color-scheme: dark` media query

### Development Commands

```bash
# Type checking with updated configuration
npm run typecheck

# Development server with HMR
npm run dev

# Production build
npm run build
```

## Next Steps

1. **Logo Integration** - Replace placeholder logos with brand assets
2. **Component Updates** - Update existing components to use brand colors  
3. **Page Implementation** - Apply design system to pages (issues #25-30)
4. **Animation Enhancement** - Add more subtle animations for better UX
5. **Accessibility Audit** - Verify all color combinations meet WCAG standards

## Related Documentation

- [Brand Guidelines](../design-system/brand-guidelines.md) - Complete visual identity guide
- [Getting Started](../getting-started/local-development.md) - Development setup
- [Architecture Overview](../architecture/technical-stack.md) - Tech stack details
- [Agent Coordination](../workflows/agent-coordination.md) - Collaboration protocols