/**
 * React hooks for browser feature detection
 * 
 * Provides reactive access to browser capabilities with proper
 * SSR handling and performance optimizations.
 */

import { useState, useEffect, useMemo } from 'react'
import { 
  browserSupport, 
  getFeatureSupport, 
  classifyBrowserCapability, 
  type BrowserCapability 
} from '~/lib/browser-support'

/**
 * Hook for detecting specific browser features
 * Handles SSR gracefully and caches results
 * 
 * @param feature - The feature to detect
 * @returns boolean indicating if feature is supported
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const hasGrid = useBrowserFeature('cssGrid')
 *   
 *   return (
 *     <div className={hasGrid ? 'grid grid-cols-2' : 'flex flex-wrap'}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export function useBrowserFeature(feature: keyof typeof browserSupport): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const supported = browserSupport[feature]()
      setIsSupported(supported)
    }
  }, [feature])
  
  return isSupported
}

/**
 * Hook for getting all browser feature support at once
 * More efficient than calling useBrowserFeature multiple times
 * 
 * @returns Object with all feature support flags
 * 
 * @example
 * ```tsx
 * function FeatureAwareComponent() {
 *   const features = useBrowserFeatures()
 *   
 *   if (!features.cssGrid) {
 *     return <LegacyLayout />
 *   }
 *   
 *   return <ModernLayout />
 * }
 * ```
 */
export function useBrowserFeatures(): Record<keyof typeof browserSupport, boolean> {
  const [features, setFeatures] = useState<Record<keyof typeof browserSupport, boolean>>(
    () => {
      // Initialize with "false" values for SSR
      const initialState: Record<string, boolean> = {}
      Object.keys(browserSupport).forEach(key => {
        initialState[key] = false
      })
      return initialState as Record<keyof typeof browserSupport, boolean>
    }
  )
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectedFeatures = getFeatureSupport()
      setFeatures(detectedFeatures)
    }
  }, [])
  
  return features
}

/**
 * Hook for browser capability classification
 * Provides high-level information about browser tier and capabilities
 * 
 * @returns BrowserCapability object with tier, features, and accessibility info
 * 
 * @example
 * ```tsx
 * function AdaptiveApp() {
 *   const capabilities = useBrowserCapabilities()
 *   
 *   return (
 *     <div className={`app app--${capabilities.tier}`}>
 *       {capabilities.tier === 'minimal' && <UpgradeBrowserNotice />}
 *       <MainContent />
 *     </div>
 *   )
 * }
 * ```
 */
export function useBrowserCapabilities(): BrowserCapability {
  const [capabilities, setCapabilities] = useState<BrowserCapability>({
    tier: 'minimal', // Conservative default for SSR
    supportedFeatures: [],
    missingCriticalFeatures: [],
    hasAccessibilitySupport: false
  })
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectedCapabilities = classifyBrowserCapability()
      setCapabilities(detectedCapabilities)
    }
  }, [])
  
  return capabilities
}

/**
 * Hook for Container Query support with enhanced functionality
 * Extends the existing useContainerQuerySupport hook with additional features
 * 
 * @returns Object with support flag and helper functions
 */
export function useContainerQueries() {
  const hasSupport = useBrowserFeature('containerQueries')
  
  const helpers = useMemo(() => ({
    /**
     * Get appropriate CSS class for container query context
     * @deprecated Container query CSS classes have been removed. Always returns empty string.
     * @param _enabled - Ignored parameter kept for backward compatibility
     */
    getContainerClass: (_enabled: boolean = true) => {
      return ''
    },
    
    /**
     * Get appropriate grid class with responsive Tailwind classes
     */
    getGridClass: (columns: 2 | 3 | 4 = 2) => {
      switch (columns) {
        case 4:
          return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        case 3:
          return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        default:
          return 'grid grid-cols-1 md:grid-cols-2'
      }
    }
  }), [])
  
  return {
    hasSupport,
    ...helpers
  }
}

/**
 * Simple hook to detect container query support
 * 
 * Returns whether the browser supports CSS container queries.
 * Uses the main browser-support detection system.
 * 
 * @returns true if container queries are supported, false otherwise
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const hasSupport = useContainerQuerySupport();
 *   return <div>{hasSupport ? 'Modern layout' : 'Fallback layout'}</div>;
 * }
 * ```
 */
export function useContainerQuerySupport(): boolean {
  const { hasSupport } = useContainerQueries();
  return hasSupport;
}

/**
 * Hook for motion preferences (pregnancy-safe UX)
 * Critical for users experiencing nausea or motion sensitivity
 * 
 * @returns Object with motion preference and helper functions
 */
export function useMotionPreferences() {
  const prefersReduced = useBrowserFeature('prefersReducedMotion')
  
  const helpers = useMemo(() => ({
    /**
     * Should animations be enabled?
     * Respects user's motion preferences
     */
    shouldAnimate: !prefersReduced,
    
    /**
     * Get appropriate animation class based on preferences
     */
    getAnimationClass: (animationClass: string, fallbackClass: string = '') => {
      return prefersReduced ? fallbackClass : animationClass
    },
    
    /**
     * Get transition duration based on preferences
     * Shorter durations for motion-sensitive users
     */
    getTransitionDuration: (normal: string = 'duration-300', reduced: string = 'duration-150') => {
      return prefersReduced ? reduced : normal
    }
  }), [prefersReduced])
  
  return {
    prefersReduced,
    ...helpers
  }
}

/**
 * Hook for progressive enhancement strategies
 * Helps implement graceful degradation based on browser capabilities
 * 
 * @returns Object with enhancement strategies
 */
export function useProgressiveEnhancement() {
  const capabilities = useBrowserCapabilities()
  const features = useBrowserFeatures()
  
  const strategies = useMemo(() => ({
    /**
     * Should use modern layout features?
     */
    useModernLayout: capabilities.tier === 'modern' && features.cssGrid,
    
    /**
     * Should use advanced visual effects?
     */
    useAdvancedEffects: capabilities.tier === 'modern' && features.backdropFilter,
    
    /**
     * Should use smooth scrolling?
     */
    useSmoothScrolling: features.scrollBehavior,
    
    /**
     * Should use intersection observer for lazy loading?
     */
    useLazyLoading: features.intersectionObserver,
    
    /**
     * Get appropriate component strategy
     */
    getComponentStrategy: (feature: keyof typeof browserSupport) => {
      return features[feature] ? 'enhanced' : 'fallback'
    }
  }), [capabilities, features])
  
  return {
    capabilities,
    features,
    ...strategies
  }
}

/**
 * Custom hook for debugging browser support in development
 * Only active in development mode
 */
export function useBrowserSupportDebug() {
  const capabilities = useBrowserCapabilities()
  const features = useBrowserFeatures()
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // Log to console on mount
      console.group('🌟 Browser Support Debug')
      console.log('Capabilities:', capabilities)
      console.log('Features:', features)
      console.groupEnd()
      
      // Add to window for manual inspection
      ;(window as any).__SHOOTING_STAR_BROWSER_SUPPORT__ = {
        capabilities,
        features
      }
    }
  }, [capabilities, features])
  
  return { capabilities, features }
}