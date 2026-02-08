# Motion Preference Detection

Lightweight motion preference detection for accessibility in the Shooting Star application.

## Overview

This module provides a single concern: detecting and respecting the user's `prefers-reduced-motion` preference. This is critical for:

- **Pregnancy-safe UX**: Reducing animations that may trigger nausea
- **WCAG 2.1 compliance**: Animation from Interactions guideline
- **Loi 25 du Québec**: Respecting user accessibility preferences

## Usage

### Hook: useMotionPreferences

```tsx
import { useMotionPreferences } from '~/hooks/use-browser-support'

function AnimatedComponent() {
  const { prefersReduced, shouldAnimate, getAnimationClass } = useMotionPreferences()

  const buttonClass = getAnimationClass(
    'transition-all duration-300 hover:scale-105',
    'transition-none'
  )

  return <button className={buttonClass}>Click me</button>
}
```

### Component: MotionSafe

Wraps content and respects the user's motion preferences:

```tsx
import { MotionSafe } from '~/components/utils/progressive-enhancement'

<MotionSafe
  animationClass="animate-fadeIn duration-300"
  fallbackClass="opacity-100"
>
  <Content />
</MotionSafe>
```

### Direct detection

```tsx
import { prefersReducedMotion } from '~/lib/browser-support'

const isReduced = prefersReducedMotion()
```

## API

### `prefersReducedMotion(): boolean`

Detects the `prefers-reduced-motion: reduce` media query. SSR-safe (returns `false` on the server).

### `useMotionPreferences()`

React hook returning:

| Property | Type | Description |
|---|---|---|
| `prefersReduced` | `boolean` | Whether the user prefers reduced motion |
| `shouldAnimate` | `boolean` | Inverse of `prefersReduced` |
| `getAnimationClass(animation, fallback)` | `function` | Returns the appropriate class |
| `getTransitionDuration(normal, reduced)` | `function` | Returns the appropriate duration class |

### `<MotionSafe>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `animationClass` | `string` | required | Classes when motion is safe |
| `fallbackClass` | `string` | `""` | Classes when motion should be reduced |
| `disabled` | `boolean` | `false` | Force disable animations |