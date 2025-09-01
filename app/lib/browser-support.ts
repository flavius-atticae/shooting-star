/**
 * Browser Support Detection for Shooting Star
 * 
 * This module provides comprehensive browser feature detection
 * specifically tailored for Quebec's perinatal market.
 * 
 * Target browsers prioritized based on Quebec mobile usage:
 * 1. Safari (iOS dominant in Quebec)
 * 2. Chrome (Android + Desktop)  
 * 3. Firefox (Privacy-conscious users)
 * 4. Edge (Windows users)
 */

/**
 * Core browser feature detection functions
 * Returns boolean indicating if feature is supported
 */
export const browserSupport = {
  /**
   * CSS Container Queries (@container)
   * Critical for responsive grid layouts
   */
  containerQueries: (): boolean => {
    if (typeof window === 'undefined') return false
    return 'container' in document.documentElement.style
  },

  /**
   * Intersection Observer API
   * Used for lazy loading and scroll animations
   */
  intersectionObserver: (): boolean => {
    if (typeof window === 'undefined') return false
    return 'IntersectionObserver' in window
  },

  /**
   * CSS scroll-behavior: smooth
   * For smooth anchor scrolling
   */
  scrollBehavior: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('scroll-behavior', 'smooth')
  },

  /**
   * CSS Grid Layout
   * Foundation for modern layouts
   */
  cssGrid: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('display', 'grid')
  },

  /**
   * CSS Flexbox Layout
   * Fallback for grid layouts
   */
  flexbox: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('display', 'flex')
  },

  /**
   * CSS :focus-visible pseudo-class
   * Important for accessible keyboard navigation
   */
  focusVisible: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('selector(:focus-visible)')
  },

  /**
   * CSS backdrop-filter
   * For glassmorphism effects
   */
  backdropFilter: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('backdrop-filter', 'blur(10px)') ||
           CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
  },

  /**
   * CSS aspect-ratio property
   * For maintaining image/video ratios
   */
  aspectRatio: (): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports('aspect-ratio', '16/9')
  },

  /**
   * Web Animations API
   * For performant animations
   */
  webAnimations: (): boolean => {
    if (typeof window === 'undefined') return false
    return 'animate' in document.documentElement
  },

  /**
   * prefers-reduced-motion media query
   * Critical for pregnancy-safe UX (nausea considerations)
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
}

/**
 * Browser test matrix for QA testing
 * Prioritized for Quebec market with pregnancy-focused considerations
 */
export const BROWSER_TEST_MATRIX = {
  /**
   * Priority browsers based on Quebec usage patterns
   * Safari prioritized due to high iOS usage among target demographic
   */
  priority: [
    { 
      name: 'Safari', 
      versions: ['latest', 'latest-1'],
      notes: 'iOS dominant in Quebec, test pregnancy-related touch targets'
    },
    { 
      name: 'Chrome', 
      versions: ['latest', 'latest-1'],
      notes: 'Android + Desktop, test container queries support'
    },
    { 
      name: 'Firefox', 
      versions: ['latest'],
      notes: 'Privacy-conscious users, test strict CSP compliance'
    },
    { 
      name: 'Edge', 
      versions: ['latest'],
      notes: 'Windows users, test high contrast mode support'
    }
  ],

  /**
   * Critical features that must work across all priority browsers
   * Failure in any of these is a blocker for release
   */
  criticalFeatures: [
    'css-container-queries',  // Core responsive system
    'css-grid',               // Layout foundation
    'css-flexbox',            // Layout fallback
    'intersection-observer',  // Performance optimizations
    'focus-visible'           // Accessibility requirements
  ],

  /**
   * Enhanced features that improve UX but have fallbacks
   * Degraded gracefully on unsupported browsers
   */
  enhancedFeatures: [
    'css-backdrop-filter',    // Visual polish
    'css-aspect-ratio',       // Image handling
    'web-animations',         // Smooth interactions
    'scroll-behavior'         // Smooth scrolling
  ],

  /**
   * Accessibility features - MANDATORY for Quebec Law 25 compliance
   */
  accessibilityFeatures: [
    'focus-visible',          // Keyboard navigation
    'prefers-reduced-motion', // Motion sensitivity (pregnancy)
    'prefers-color-scheme',   // Dark mode support
    'prefers-contrast'        // High contrast support
  ]
}

/**
 * Feature detection result cache
 * Prevents repeated DOM queries for performance
 */
let featureCache: Map<string, boolean> | null = null

/**
 * Get cached or fresh feature detection results
 * Optimized for performance on repeated calls
 */
export function getFeatureSupport(): Record<keyof typeof browserSupport, boolean> {
  // Return cached results if available
  if (featureCache) {
    const cached: Record<string, boolean> = {}
    featureCache.forEach((value, key) => {
      cached[key] = value
    })
    return cached as Record<keyof typeof browserSupport, boolean>
  }

  // Initialize cache and run detections
  featureCache = new Map()
  const results: Record<string, boolean> = {}

  Object.entries(browserSupport).forEach(([key, detector]) => {
    const isSupported = detector()
    results[key] = isSupported
    featureCache!.set(key, isSupported)
  })

  return results as Record<keyof typeof browserSupport, boolean>
}

/**
 * Clear feature detection cache
 * Useful for testing or when browser capabilities change
 */
export function clearFeatureCache(): void {
  featureCache = null
}

/**
 * Browser capability classification
 * Helps determine fallback strategies
 */
export interface BrowserCapability {
  tier: 'modern' | 'legacy' | 'minimal'
  supportedFeatures: string[]
  missingCriticalFeatures: string[]
  hasAccessibilitySupport: boolean
}

/**
 * Classify browser capabilities based on feature support
 * Used to determine appropriate fallback strategies
 */
export function classifyBrowserCapability(): BrowserCapability {
  const features = getFeatureSupport()
  const supportedFeatures: string[] = []
  const missingCriticalFeatures: string[] = []

  // Check which features are supported
  Object.entries(features).forEach(([key, supported]) => {
    if (supported) {
      supportedFeatures.push(key)
    } else if (BROWSER_TEST_MATRIX.criticalFeatures.includes(`css-${key}` as any) || 
               BROWSER_TEST_MATRIX.criticalFeatures.includes(key as any)) {
      missingCriticalFeatures.push(key)
    }
  })

  // Determine browser tier
  let tier: BrowserCapability['tier'] = 'modern'
  if (missingCriticalFeatures.length > 2) {
    tier = 'minimal'
  } else if (missingCriticalFeatures.length > 0) {
    tier = 'legacy'
  }

  // Check accessibility support (critical for Quebec Law 25)
  const hasAccessibilitySupport = features.focusVisible && 
                                  !features.prefersReducedMotion // Inverted: false means they CAN handle motion

  return {
    tier,
    supportedFeatures,
    missingCriticalFeatures,
    hasAccessibilitySupport
  }
}

/**
 * Development utilities for testing browser support
 * Only available in development mode
 */
export const browserSupportDebug = {
  /**
   * Log current browser capabilities to console
   * Useful for debugging cross-browser issues
   */
  logCapabilities: (): void => {
    if (process.env.NODE_ENV !== 'development') return
    
    const capabilities = classifyBrowserCapability()
    const features = getFeatureSupport()
    
    console.group('🌟 Shooting Star - Browser Capabilities')
    console.log('Tier:', capabilities.tier)
    console.log('Supported Features:', capabilities.supportedFeatures)
    console.log('Missing Critical Features:', capabilities.missingCriticalFeatures)
    console.log('Accessibility Support:', capabilities.hasAccessibilitySupport)
    console.table(features)
    console.groupEnd()
  },

  /**
   * Force specific feature support for testing
   * Only works in development mode
   */
  mockFeatureSupport: (feature: keyof typeof browserSupport, supported: boolean): void => {
    if (process.env.NODE_ENV !== 'development') return
    
    if (!featureCache) featureCache = new Map()
    featureCache.set(feature, supported)
    console.warn(`🧪 Mocked ${feature} support:`, supported)
  },

  /**
   * Test all features and return detailed report
   */
  generateReport: (): string => {
    if (process.env.NODE_ENV !== 'development') return ''
    
    const capabilities = classifyBrowserCapability()
    const features = getFeatureSupport()
    
    let report = '# Browser Support Report\n\n'
    report += `**Browser Tier**: ${capabilities.tier}\n`
    report += `**Accessibility Support**: ${capabilities.hasAccessibilitySupport ? '✅' : '❌'}\n\n`
    
    report += '## Feature Support\n'
    Object.entries(features).forEach(([feature, supported]) => {
      const status = supported ? '✅' : '❌'
      report += `- ${feature}: ${status}\n`
    })
    
    if (capabilities.missingCriticalFeatures.length > 0) {
      report += '\n## ⚠️ Missing Critical Features\n'
      capabilities.missingCriticalFeatures.forEach(feature => {
        report += `- ${feature}\n`
      })
    }
    
    return report
  }
}