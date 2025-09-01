/**
 * Progressive Enhancement Components
 * 
 * Components that adapt their rendering based on browser capabilities
 * to provide optimal UX across all supported browsers.
 */

import * as React from "react"
import { useBrowserFeature, useProgressiveEnhancement, useMotionPreferences } from "~/hooks/use-browser-support"
import { cn } from "~/lib/utils"

/**
 * Props for feature-gated components
 */
interface FeatureGateProps {
  /** Feature to check for support */
  feature: Parameters<typeof useBrowserFeature>[0]
  /** Children to render when feature is supported */
  children: React.ReactNode
  /** Optional fallback to render when feature is not supported */
  fallback?: React.ReactNode
  /** Optional wrapper component */
  as?: React.ElementType
  /** Additional props for wrapper */
  [key: string]: any
}

/**
 * FeatureGate - Conditionally render content based on browser feature support
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
  ...props
}) => {
  const isSupported = useBrowserFeature(feature)
  
  const content = isSupported ? children : fallback
  
  if (Component === React.Fragment) {
    return <>{content}</>
  }
  
  return <Component {...props}>{content}</Component>
}

/**
 * Props for enhanced grid component
 */
interface EnhancedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns for the grid */
  columns?: 2 | 3 | 4
  /** Gap between grid items */
  gap?: string
  /** Enable container query context */
  enableContainerQuery?: boolean
  /** Container name for specific targeting */
  containerName?: string
}

/**
 * EnhancedGrid - Progressive grid that uses Container Queries when available
 * Falls back to responsive media queries on unsupported browsers
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
  const { useModernLayout } = useProgressiveEnhancement()
  const hasContainerQueries = useBrowserFeature('containerQueries')
  
  // Modern approach with container queries
  if (useModernLayout && hasContainerQueries && enableContainerQuery) {
    const containerClass = containerName ? "container-name-content" : "container-query"
    const gridClass = `cq-grid-${columns}`
    
    return (
      <div
        className={cn(containerClass, gridClass, gap, className)}
        style={containerName ? { containerName } as React.CSSProperties : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
  
  // Fallback approach with media queries
  const fallbackGridClasses = {
    2: "grid grid-cols-1 md:grid-cols-2",
    3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }
  
  return (
    <div 
      className={cn(fallbackGridClasses[columns], gap, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Props for motion-safe animation wrapper
 */
interface MotionSafeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation classes to apply when motion is safe */
  animationClass: string
  /** Fallback classes when motion should be reduced */
  fallbackClass?: string
  /** Force disable animations regardless of user preference */
  disabled?: boolean
}

/**
 * MotionSafe - Wrapper that respects user's motion preferences
 * Critical for pregnancy-safe UX (nausea considerations)
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
  const { shouldAnimate } = useMotionPreferences()
  
  const appliedClass = (disabled || !shouldAnimate) ? fallbackClass : animationClass
  
  return (
    <div 
      className={cn(appliedClass, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Props for enhanced image component
 */
interface EnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback for when aspect-ratio CSS property is not supported */
  aspectRatio?: string
  /** Whether to use intersection observer for lazy loading */
  lazy?: boolean
}

/**
 * EnhancedImage - Image component with progressive enhancement
 * Uses modern CSS features when available, graceful fallbacks otherwise
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
  const hasAspectRatio = useBrowserFeature('aspectRatio')
  const { useLazyLoading } = useProgressiveEnhancement()
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [isVisible, setIsVisible] = React.useState(!lazy)
  
  // Intersection Observer for lazy loading
  React.useEffect(() => {
    if (!lazy || !useLazyLoading || isVisible) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )
    
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }
    
    return () => observer.disconnect()
  }, [lazy, useLazyLoading, isVisible])
  
  const appliedStyle = React.useMemo(() => {
    let combinedStyle = { ...style }
    
    // Apply aspect ratio if supported and provided
    if (aspectRatio && hasAspectRatio) {
      combinedStyle.aspectRatio = aspectRatio
    }
    
    return combinedStyle
  }, [style, aspectRatio, hasAspectRatio])
  
  const appliedClassName = React.useMemo(() => {
    let classes = [className]
    
    // Add fallback classes when aspect-ratio is not supported
    if (aspectRatio && !hasAspectRatio) {
      // Common aspect ratios with Tailwind fallbacks
      const ratioClasses: Record<string, string> = {
        '16/9': 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '1/1': 'aspect-square',
        '3/2': 'aspect-[3/2]'
      }
      classes.push(ratioClasses[aspectRatio] || 'aspect-auto')
    }
    
    return cn(...classes)
  }, [className, aspectRatio, hasAspectRatio])
  
  return (
    <img
      ref={imgRef}
      className={appliedClassName}
      style={appliedStyle}
      {...props}
      {...(lazy && !isVisible ? { 'data-lazy': 'true' } : {})}
    />
  )
}

/**
 * Browser capability indicator for development/debugging
 * Only renders in development mode
 */
export const BrowserCapabilityIndicator: React.FC = () => {
  const { capabilities, features } = useProgressiveEnhancement()
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }
  
  const tierColors = {
    modern: 'bg-green-100 text-green-800',
    legacy: 'bg-yellow-100 text-yellow-800', 
    minimal: 'bg-red-100 text-red-800'
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-2 rounded-lg border shadow-lg bg-white text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className={cn('px-2 py-1 rounded text-xs font-medium', tierColors[capabilities.tier])}>
          {capabilities.tier}
        </span>
        <span className="text-gray-600">Browser Tier</span>
      </div>
      
      <div className="text-gray-500 text-xs">
        <div>Grid: {features.cssGrid ? '✅' : '❌'}</div>
        <div>Container Queries: {features.containerQueries ? '✅' : '❌'}</div>
        <div>Intersection Observer: {features.intersectionObserver ? '✅' : '❌'}</div>
      </div>
      
      {capabilities.missingCriticalFeatures.length > 0 && (
        <div className="mt-1 text-xs text-red-600">
          Missing: {capabilities.missingCriticalFeatures.join(', ')}
        </div>
      )}
    </div>
  )
}