/**
 * Centralized Performance Thresholds
 *
 * Performance constants for Shooting Star application.
 * Calibrated for pregnancy-safe user experience in Quebec.
 *
 * These thresholds account for:
 * - Pregnancy fatigue (slower device interactions)
 * - Mobile-first usage patterns
 * - Quebec healthcare network conditions
 * - Core Web Vitals compliance
 */

// Core Web Vitals thresholds (used by E2E tests)
export const CORE_WEB_VITALS = {
  /** Largest Contentful Paint threshold (ms) - Core Web Vital */
  LCP_THRESHOLD: 2500,
  /** First Input Delay threshold (ms) - Core Web Vital */
  FID_THRESHOLD: 100,
  /** Cumulative Layout Shift score - Core Web Vital */
  CLS_THRESHOLD: 0.1,
  /** Minimum Lighthouse score */
  LIGHTHOUSE_SCORE: 90,
} as const;

// Extended performance thresholds for pregnancy-specific testing
export const PREGNANCY_PERFORMANCE = {
  /** Time to Interactive (ms) - allow more time for fatigue */
  TIME_TO_INTERACTIVE: 3500,
  /** Bundle size limit (KB) - keep initial load small */
  BUNDLE_SIZE_LIMIT: 200,
  /** Image optimization settings */
  IMAGE_OPTIMIZATION: {
    maxSize: 500, // KB per image
    formats: ["webp", "avif"], // modern efficient formats
    lazy: true, // lazy loading for slower connections
  },
} as const;

/**
 * Combined performance thresholds
 * Use this for comprehensive performance testing
 */
export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals
  LCP_THRESHOLD: CORE_WEB_VITALS.LCP_THRESHOLD,
  FID_THRESHOLD: CORE_WEB_VITALS.FID_THRESHOLD,
  CLS_THRESHOLD: CORE_WEB_VITALS.CLS_THRESHOLD,
  LIGHTHOUSE_SCORE: CORE_WEB_VITALS.LIGHTHOUSE_SCORE,

  // Aliases for test-data.ts compatibility
  LCP_TARGET: CORE_WEB_VITALS.LCP_THRESHOLD,
  FID_TARGET: CORE_WEB_VITALS.FID_THRESHOLD,
  CLS_TARGET: CORE_WEB_VITALS.CLS_THRESHOLD,

  // Pregnancy-specific metrics
  TIME_TO_INTERACTIVE: PREGNANCY_PERFORMANCE.TIME_TO_INTERACTIVE,
  BUNDLE_SIZE_LIMIT: PREGNANCY_PERFORMANCE.BUNDLE_SIZE_LIMIT,
  IMAGE_OPTIMIZATION: PREGNANCY_PERFORMANCE.IMAGE_OPTIMIZATION,
} as const;

// Export types for external use
export type CoreWebVitals = typeof CORE_WEB_VITALS;
export type PregnancyPerformance = typeof PREGNANCY_PERFORMANCE;
export type PerformanceThresholds = typeof PERFORMANCE_THRESHOLDS;
