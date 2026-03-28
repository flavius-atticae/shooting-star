/**
 * Footer Component Exports
 *
 * Barrel export file for the Footer component system following established patterns.
 * Simplified structure: Footer + NewsletterInput + SocialIcons
 */

// Types and Interfaces
export type {
  FooterNavLink,
  FooterProps,
  SocialLink,
  SocialPlatform,
} from "./footer";
// Main Footer Component
export { Footer } from "./footer";
export type { NewsletterInputProps } from "./newsletter-input";
// Sub-components (kept separate for reusability and complex logic)
export { NewsletterInput } from "./newsletter-input";
export type { SocialIconsProps } from "./social-icons";
export { SocialIcons } from "./social-icons";
