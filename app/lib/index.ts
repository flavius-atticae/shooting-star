/**
 * Shooting Star Library Exports
 *
 * Centralized exports for all library utilities and functionality.
 *
 * @example
 * ```tsx
 * import { cn, prefersReducedMotion, sanitizeInput } from '~/lib';
 * ```
 */

// Browser Support Detection (motion preferences only)
export { prefersReducedMotion } from "~/lib/browser-support";
// Contact Form Schema (shared between client and server)
export {
  type ContactFormData,
  contactFormSchema,
} from "~/lib/contact-form-schema";

// Form Security Utilities
export { sanitizeInput } from "~/lib/form-security";
// CSS Utilities
export { cn } from "~/lib/utils";

// Rate Limiting — import directly from ~/lib/rate-limiter.server
// (server-only module, not re-exported to prevent client bundle leakage)
