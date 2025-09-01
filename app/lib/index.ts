/**
 * Shooting Star Library Exports
 * 
 * Centralized exports for all library utilities and functionality
 */

// Browser Support
export {
  browserSupport,
  getFeatureSupport,
  clearFeatureCache,
  classifyBrowserCapability,
  browserSupportDebug,
  BROWSER_TEST_MATRIX,
  type BrowserCapability
} from './browser-support'

// Utility functions
export { cn } from './utils'