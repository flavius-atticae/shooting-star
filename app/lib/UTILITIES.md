# Utilities Documentation

This document provides an overview of all available utilities in the Shooting Star application.

## Import Path

All utilities can be imported from centralized locations:

```typescript
// Library utilities
import { cn, browserSupport, PERFORMANCE_THRESHOLDS } from '~/lib';

// React hooks
import {
  useBrowserFeature,
  useContainerQuerySupport,
  useMotionPreferences,
} from '~/hooks';
```

---

## CSS Utilities

### `cn(...inputs)`

Utility function for merging Tailwind CSS classes. Uses `clsx` and `tailwind-merge` under the hood.

**Location:** `~/lib/utils.ts`

```typescript
import { cn } from '~/lib/utils';

cn('px-4 py-2', 'bg-blue-500', condition && 'text-white');
// => 'px-4 py-2 bg-blue-500 text-white' (when condition is true)
```

---

## Browser Support Detection

### `browserSupport`

Object containing functions to detect browser feature support.

**Location:** `~/lib/browser-support.ts`

```typescript
import { browserSupport } from '~/lib';

// Check specific features
browserSupport.containerQueries(); // => boolean
browserSupport.intersectionObserver(); // => boolean
browserSupport.prefersReducedMotion(); // => boolean
```

**Available features:**
- `containerQueries` - CSS Container Queries support
- `intersectionObserver` - Intersection Observer API
- `scrollBehavior` - CSS smooth scrolling
- `cssGrid` - CSS Grid Layout
- `flexbox` - CSS Flexbox
- `focusVisible` - CSS :focus-visible pseudo-class
- `backdropFilter` - CSS backdrop-filter
- `aspectRatio` - CSS aspect-ratio property
- `webAnimations` - Web Animations API
- `prefersReducedMotion` - User's motion preference

### `getFeatureSupport()`

Returns cached feature detection results.

```typescript
import { getFeatureSupport } from '~/lib';

const features = getFeatureSupport();
// => { containerQueries: true, cssGrid: true, ... }
```

### `classifyBrowserCapability()`

Classifies browser into tiers based on feature support.

```typescript
import { classifyBrowserCapability } from '~/lib';

const capability = classifyBrowserCapability();
// => { tier: 'modern' | 'legacy' | 'minimal', ... }
```

### `BROWSER_TEST_MATRIX`

Configuration for browser testing priorities.

```typescript
import { BROWSER_TEST_MATRIX } from '~/lib';

BROWSER_TEST_MATRIX.priority; // Browser priority list
BROWSER_TEST_MATRIX.criticalFeatures; // Must-have features
BROWSER_TEST_MATRIX.accessibilityFeatures; // A11y features
```

---

## Performance Thresholds

### `PERFORMANCE_THRESHOLDS`

Centralized performance constants for testing.

**Location:** `~/lib/performance-thresholds.ts`

```typescript
import { PERFORMANCE_THRESHOLDS } from '~/lib';

// Core Web Vitals
PERFORMANCE_THRESHOLDS.LCP_THRESHOLD; // 2500ms
PERFORMANCE_THRESHOLDS.FID_THRESHOLD; // 100ms
PERFORMANCE_THRESHOLDS.CLS_THRESHOLD; // 0.1

// Pregnancy-specific
PERFORMANCE_THRESHOLDS.TIME_TO_INTERACTIVE; // 3500ms
PERFORMANCE_THRESHOLDS.BUNDLE_SIZE_LIMIT; // 200KB
```

### `CORE_WEB_VITALS`

Core Web Vitals thresholds only.

```typescript
import { CORE_WEB_VITALS } from '~/lib';

CORE_WEB_VITALS.LCP_THRESHOLD; // 2500ms
CORE_WEB_VITALS.FID_THRESHOLD; // 100ms
CORE_WEB_VITALS.CLS_THRESHOLD; // 0.1
CORE_WEB_VITALS.LIGHTHOUSE_SCORE; // 90
```

---

## React Hooks

### `useBrowserFeature(feature)`

Hook to detect a specific browser feature.

**Location:** `~/hooks/use-browser-support.ts`

```typescript
import { useBrowserFeature } from '~/hooks';

function Component() {
  const hasContainerQueries = useBrowserFeature('containerQueries');
  return hasContainerQueries ? <ModernLayout /> : <FallbackLayout />;
}
```

### `useContainerQuerySupport()`

Simple hook to check container query support.

```typescript
import { useContainerQuerySupport } from '~/hooks';

function Component() {
  const hasSupport = useContainerQuerySupport();
  return <div>{hasSupport ? 'Modern' : 'Fallback'}</div>;
}
```

### `useContainerQueries()`

Extended container query hook with helpers.

```typescript
import { useContainerQueries } from '~/hooks';

function Component() {
  const { hasSupport, getGridClass } = useContainerQueries();
  
  return (
    <div>
      <div className={getGridClass(3)}>...</div>
    </div>
  );
}
```

### `useMotionPreferences()`

Hook for respecting user's motion preferences.

```typescript
import { useMotionPreferences } from '~/hooks';

function Component() {
  const { prefersReduced, shouldAnimate, getAnimationClass } = useMotionPreferences();
  
  return (
    <div className={getAnimationClass('animate-fadeIn', '')}>
      Content
    </div>
  );
}
```

### `useBrowserCapabilities()`

Hook for browser capability classification.

```typescript
import { useBrowserCapabilities } from '~/hooks';

function Component() {
  const { tier, supportedFeatures, missingCriticalFeatures } = useBrowserCapabilities();
  
  if (tier === 'minimal') {
    return <UpgradeBrowserNotice />;
  }
  return <MainContent />;
}
```

### `useProgressiveEnhancement()`

Hook for progressive enhancement strategies.

```typescript
import { useProgressiveEnhancement } from '~/hooks';

function Component() {
  const {
    useModernLayout,
    useAdvancedEffects,
    useSmoothScrolling,
    useLazyLoading,
  } = useProgressiveEnhancement();
  
  // Apply features based on browser support
}
```

---

## Progressive Enhancement Components

Located in `~/components/utils/progressive-enhancement.tsx`:

### `<FeatureGate>`

Conditionally render content based on feature support.

```tsx
<FeatureGate
  feature="containerQueries"
  fallback={<LegacyGrid />}
>
  <ModernContainerGrid />
</FeatureGate>
```

### `<EnhancedGrid>`

Grid with container query support and fallbacks.

```tsx
<EnhancedGrid columns={3} gap="gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</EnhancedGrid>
```

### `<MotionSafe>`

Wrapper respecting motion preferences.

```tsx
<MotionSafe
  animationClass="animate-fadeIn duration-300"
  fallbackClass="opacity-100"
>
  <Content />
</MotionSafe>
```

### `<EnhancedImage>`

Image with progressive enhancement.

```tsx
<EnhancedImage
  src="/image.jpg"
  alt="Description"
  aspectRatio="16/9"
  lazy
/>
```

---

## Test Utilities

Located in `~/test/utils.tsx`:

### `createUser()`

Creates a pregnancy-safe user event instance with slower interactions.

```typescript
const user = createUser();
await user.click(button);
```

### `checkAccessibility(container)`

Runs accessibility checks on a container.

```typescript
await checkAccessibility(container);
```

### `testResponsive`

Helpers for responsive testing.

```typescript
testResponsive.mobile(); // Sets viewport to 375x667
testResponsive.tablet(); // Sets viewport to 768x1024
testResponsive.desktop(); // Sets viewport to 1024x768
```

### `simulatePregnancyConditions`

Helpers for simulating pregnancy-specific conditions.

```typescript
simulatePregnancyConditions.reducedMotion();
simulatePregnancyConditions.highContrast();
const user = simulatePregnancyConditions.fatigue();
```
