/**
 * Shooting Star Library Exports
 *
 * Centralized exports for all library utilities and functionality.
 * Import utilities from this file for consistent API access.
 *
 * @example
 * ```tsx
 * import { cn, browserSupport, PERFORMANCE_THRESHOLDS } from '~/lib';
 * ```
 */

// Browser Support Detection
export {
  browserSupport,
  getFeatureSupport,
  clearFeatureCache,
  classifyBrowserCapability,
  browserSupportDebug,
  BROWSER_TEST_MATRIX,
  type BrowserCapability,
} from "~/lib/browser-support";

// CSS Utilities
export { cn } from "~/lib/utils";

// Performance Thresholds
export {
  CORE_WEB_VITALS,
  PREGNANCY_PERFORMANCE,
  PERFORMANCE_THRESHOLDS,
  type CoreWebVitals,
  type PregnancyPerformance,
  type PerformanceThresholds,
} from "~/lib/performance-thresholds";
