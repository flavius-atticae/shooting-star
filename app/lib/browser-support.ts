/**
 * Browser Support Detection for Shooting Star
 *
 * Lightweight motion preference detection for accessibility.
 * Critical for pregnancy-safe UX (nausea considerations)
 * and WCAG 2.1 Animation from Interactions compliance.
 */

/**
 * Detect if the user prefers reduced motion.
 * SSR-safe: returns false on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}