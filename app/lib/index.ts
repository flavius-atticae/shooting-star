/**
 * Shooting Star Library Exports
 *
 * Centralized exports for all library utilities and functionality.
 * Import utilities from this file for consistent API access.
 *
 * @example
 * ```tsx
 * import { cn, prefersReducedMotion, PERFORMANCE_THRESHOLDS } from '~/lib';
 * ```
 */

// Browser Support Detection (motion preferences only)
export { prefersReducedMotion } from "~/lib/browser-support";

// CSS Utilities
export { cn } from "~/lib/utils";

// Form Security Utilities
export {
  sanitizeInput,
  isHoneypotFilled,
  isSubmissionTooFast,
} from "~/lib/form-security";

// Contact Form Schema (shared between client and server)
export {
  contactFormSchema,
  type ContactFormData,
} from "~/lib/contact-form-schema";

// Rate Limiting
export { isRateLimited, resetRateLimiter } from "~/lib/rate-limiter";

// Performance Thresholds
export {
  CORE_WEB_VITALS,
  PREGNANCY_PERFORMANCE,
  PERFORMANCE_THRESHOLDS,
  type CoreWebVitals,
  type PregnancyPerformance,
  type PerformanceThresholds,
} from "~/lib/performance-thresholds";
