/**
 * Form Security Utilities
 *
 * Anti-spam utilities for the contact form. These provide transparent
 * bot protection without requiring a CAPTCHA, preserving the user
 * experience for pregnant women and new mothers.
 *
 * Techniques:
 * - Honeypot field detection (bots fill hidden fields)
 * - Time-based submission check (bots submit too fast)
 * - Input sanitization (strip HTML/angle brackets)
 */

/** Default minimum submission time in milliseconds (3 seconds) */
const DEFAULT_MIN_SUBMISSION_MS = 3000;

/**
 * Sanitize user input by stripping HTML tags and angle brackets.
 *
 * @param input - The raw user input string
 * @returns The sanitized string with HTML tags and angle brackets removed
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
}

/**
 * Check whether the honeypot field was filled in.
 * A filled honeypot indicates a bot submission.
 *
 * @param value - The value of the honeypot field
 * @returns `true` if the honeypot was filled (likely a bot)
 */
export function isHoneypotFilled(value: string | undefined | null): boolean {
  return typeof value === "string" && value.length > 0;
}

/**
 * Check whether a form submission happened too fast.
 * Submissions faster than `minMs` are likely from bots.
 *
 * @param timestamp - The timestamp (ms since epoch) when the form was mounted
 * @param minMs - Minimum allowed time in ms (defaults to 3000)
 * @returns `true` if the submission was too fast (likely a bot)
 */
export function isSubmissionTooFast(
  timestamp: number,
  minMs: number = DEFAULT_MIN_SUBMISSION_MS,
): boolean {
  const elapsed = Date.now() - timestamp;
  return elapsed < minMs;
}
