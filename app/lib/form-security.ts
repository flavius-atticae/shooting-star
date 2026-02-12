/**
 * Form Security Utilities
 *
 * Input sanitization for the contact form. Provides transparent
 * protection against XSS without requiring a CAPTCHA.
 *
 * Anti-spam (honeypot + timestamp) is now handled by remix-utils.
 * @see ~/lib/honeypot.server.ts
 *
 * Techniques:
 * - Input sanitization (strip HTML/angle brackets)
 */

/**
 * Sanitize user input by stripping HTML tags and angle brackets.
 *
 * @param input - The raw user input string
 * @returns The sanitized string with HTML tags and angle brackets removed
 */
export function sanitizeInput(input: string): string {
  let result = input;
  let previous = "";
  // Iteratively strip HTML-like tags to handle nested constructs.
  // Note: split-tag obfuscation (e.g. <scr<script>ipt>) may leave
  // harmless text fragments, but all tags and angle brackets are removed.
  while (result !== previous) {
    previous = result;
    result = result.replace(/<[\/A-Za-z][^>]*>/g, "");
  }
  return result.replace(/[<>]/g, "");
}
