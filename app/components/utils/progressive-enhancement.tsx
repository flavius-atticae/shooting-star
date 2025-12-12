/**
 * Progressive Enhancement Components
 *
 * Components that adapt their rendering based on browser capabilities
 * to provide optimal UX across all supported browsers.
 */

import * as React from "react";

import {
  useBrowserFeature,
  useProgressiveEnhancement,
  useMotionPreferences,
} from "~/hooks/use-browser-support";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Props for FeatureGate component
 */
export interface FeatureGateProps {
  /** Feature to check for support */
  feature: Parameters<typeof useBrowserFeature>[0];
  /** Children to render when feature is supported */
  children: React.ReactNode;
  /** Optional fallback to render when feature is not supported */
  fallback?: React.ReactNode;
  /** Optional wrapper component */
  as?: React.ElementType;
  /** Custom className */
  className?: string;
  /** Additional props for wrapper */
  [key: string]: unknown;
}

/**
 * Props for EnhancedGrid component
 */
export interface EnhancedGridProps
  extends React.ComponentProps<"div"> {
  /** Number of columns for the grid */
  columns?: 2 | 3 | 4;
  /** Gap between grid items */
  gap?: string;
  /** Enable container query context */
  enableContainerQuery?: boolean;
  /** Container name for specific targeting */
  containerName?: string;
  /** Custom className */
  className?: string;
}

/**
 * Props for MotionSafe component
 */
export interface MotionSafeProps extends React.ComponentProps<"div"> {
  /** Animation classes to apply when motion is safe */
  animationClass: string;
  /** Fallback classes when motion should be reduced */
  fallbackClass?: string;
  /** Force disable animations regardless of user preference */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Props for EnhancedImage component
 */
export interface EnhancedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback for when aspect-ratio CSS property is not supported */
  aspectRatio?: string;
  /** Whether to use intersection observer for lazy loading */
  lazy?: boolean;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Components
// ============================================================================

/**
 * FeatureGate - Conditionally render content based on browser feature support
 *
 * Renders different content based on whether a specific browser feature is supported.
 * Uses the browser-support detection system to determine capabilities.
 *
 * Features:
 * - Feature detection for modern browser APIs
 * - Graceful fallback rendering
 * - Optional wrapper component
 * - Zero-dependency on feature availability
 *
 * Supported Features:
 * - containerQueries
 * - cssGrid
 * - intersectionObserver
 * - aspectRatio
 * - And more from useBrowserFeature hook
 *
 * Accessibility:
 * - Content parity between feature and fallback
 * - No layout shift when feature not supported
 *
 * @example
 * ```tsx
 * <FeatureGate
 *   feature="containerQueries"
 *   fallback={<LegacyGrid />}
 * >
 *   <ModernContainerGrid />
 * </FeatureGate>
 * ```
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback = null,
  as: Component = React.Fragment,
  className,
  ...props
}) => {
  const isSupported = useBrowserFeature(feature);

  const content = isSupported ? children : fallback;

  if (Component === React.Fragment) {
    return <>{content}</>;
  }

  return (
    <Component className={className} {...props}>
      {content}
    </Component>
  );
};

/**
 * EnhancedGrid - Progressive grid with Container Queries
 *
 * Grid component that uses Container Queries when available, falling back to
 * responsive media queries on unsupported browsers.
 *
 * Features:
 * - Container Queries for modern browsers
 * - Media query fallback for legacy browsers
 * - Configurable column count (2, 3, or 4)
 * - Custom gap support
 * - Named container support
 *
 * Accessibility:
 * - Semantic HTML
 * - Consistent layout across browsers
 * - No layout shift between feature levels
 *
 * @example
 * ```tsx
 * <EnhancedGrid columns={3} gap="gap-6">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </EnhancedGrid>
 * ```
 */
export const EnhancedGrid: React.FC<EnhancedGridProps> = ({
  children,
  columns = 2,
  gap = "gap-4",
  enableContainerQuery = true,
  containerName,
  className,
  ...props
}) => {
  const { useModernLayout } = useProgressiveEnhancement();
  const hasContainerQueries = useBrowserFeature("containerQueries");

  // Modern approach with container queries
  if (useModernLayout && hasContainerQueries && enableContainerQuery) {
    const containerClass = containerName
      ? "container-name-content"
      : "container-query";
    const gridClass = `cq-grid-${columns}`;

    return (
      <div
        className={cn(containerClass, gridClass, gap, className)}
        style={
          containerName
            ? ({ containerName } as React.CSSProperties)
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }

  // Fallback approach with media queries
  // Safe grid class selection based on column count
  const getGridClass = (cols: 2 | 3 | 4): string => {
    switch (cols) {
      case 2:
        return "grid grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={cn(getGridClass(columns), gap, className)} {...props}>
      {children}
    </div>
  );
};

/**
 * MotionSafe - Wrapper that respects user's motion preferences
 *
 * Applies animations only when safe for the user, respecting prefers-reduced-motion.
 * Critical for pregnancy-safe UX (nausea considerations).
 *
 * Features:
 * - Automatic motion preference detection
 * - Configurable animation and fallback classes
 * - Force disable option
 * - Zero motion when user prefers reduced motion
 *
 * Accessibility:
 * - Respects prefers-reduced-motion media query
 * - WCAG 2.1 Animation from Interactions guideline
 * - Pregnancy-safe (reduces nausea triggers)
 * - Provides non-animated fallback
 *
 * @example
 * ```tsx
 * <MotionSafe
 *   animationClass="animate-fadeIn duration-300"
 *   fallbackClass="opacity-100"
 * >
 *   <Content />
 * </MotionSafe>
 * ```
 */
export const MotionSafe: React.FC<MotionSafeProps> = ({
  children,
  animationClass,
  fallbackClass = "",
  disabled = false,
  className,
  ...props
}) => {
  const { shouldAnimate } = useMotionPreferences();

  const appliedClass =
    disabled || !shouldAnimate ? fallbackClass : animationClass;

  return (
    <div className={cn(appliedClass, className)} {...props}>
      {children}
    </div>
  );
};

/**
 * EnhancedImage - Image component with progressive enhancement
 *
 * Image component that uses modern CSS features when available with graceful fallbacks.
 * Supports aspect ratio CSS property with Tailwind fallbacks and lazy loading.
 *
 * Features:
 * - aspect-ratio CSS property support
 * - Tailwind class fallbacks for unsupported browsers
 * - Intersection Observer lazy loading
 * - Graceful degradation
 *
 * Accessibility:
 * - Requires alt text (inherited from img)
 * - Lazy loading with intersection observer
 * - No layout shift with aspect ratio
 *
 * @example
 * ```tsx
 * <EnhancedImage
 *   src="/image.jpg"
 *   alt="Description"
 *   aspectRatio="16/9"
 *   lazy
 * />
 * ```
 */
export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  aspectRatio,
  lazy = false,
  className,
  style,
  ...props
}) => {
  const hasAspectRatio = useBrowserFeature("aspectRatio");
  const { useLazyLoading } = useProgressiveEnhancement();
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = React.useState(!lazy);

  // Intersection Observer for lazy loading
  React.useEffect(() => {
    if (!lazy || !useLazyLoading || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, useLazyLoading, isVisible]);

  const appliedStyle = React.useMemo(() => {
    let combinedStyle = { ...style };

    // Apply aspect ratio if supported and provided
    if (aspectRatio && hasAspectRatio) {
      combinedStyle.aspectRatio = aspectRatio;
    }

    return combinedStyle;
  }, [style, aspectRatio, hasAspectRatio]);

  const appliedClassName = React.useMemo(() => {
    let classes = [className];

    // Add fallback classes when aspect-ratio is not supported
    if (aspectRatio && !hasAspectRatio) {
      // Safe aspect ratio class selection
      const getRatioClass = (ratio: string): string => {
        switch (ratio) {
          case "16/9":
            return "aspect-video";
          case "4/3":
            return "aspect-[4/3]";
          case "1/1":
            return "aspect-square";
          case "3/2":
            return "aspect-[3/2]";
          default:
            return "aspect-auto";
        }
      };
      classes.push(getRatioClass(aspectRatio));
    }

    return cn(...classes);
  }, [className, aspectRatio, hasAspectRatio]);

  return (
    <img
      ref={imgRef}
      className={appliedClassName}
      style={appliedStyle}
      {...props}
      {...(lazy && !isVisible ? { "data-lazy": "true" } : {})}
    />
  );
};

/**
 * BrowserCapabilityIndicator - Development debugging tool
 *
 * Visual indicator showing browser capabilities and support tier.
 * Only renders in development mode.
 *
 * Features:
 * - Shows browser tier (modern/legacy/minimal)
 * - Lists supported features
 * - Indicates missing critical features
 * - Color-coded by tier level
 *
 * @example
 * ```tsx
 * // In development layout
 * <BrowserCapabilityIndicator />
 * ```
 */
export const BrowserCapabilityIndicator: React.FC = () => {
  const { capabilities, features } = useProgressiveEnhancement();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const tierColors = {
    modern: "bg-green-100 text-green-800",
    legacy: "bg-yellow-100 text-yellow-800",
    minimal: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 p-2 rounded-lg border shadow-lg bg-white text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            tierColors[capabilities.tier]
          )}
        >
          {capabilities.tier}
        </span>
        <span className="text-gray-600">Browser Tier</span>
      </div>

      <div className="text-gray-500 text-xs">
        <div>Grid: {features.cssGrid ? "✅" : "❌"}</div>
        <div>Container Queries: {features.containerQueries ? "✅" : "❌"}</div>
        <div>
          Intersection Observer: {features.intersectionObserver ? "✅" : "❌"}
        </div>
      </div>

      {capabilities.missingCriticalFeatures.length > 0 && (
        <div className="mt-1 text-xs text-red-600">
          Missing: {capabilities.missingCriticalFeatures.join(", ")}
        </div>
      )}
    </div>
  );
};