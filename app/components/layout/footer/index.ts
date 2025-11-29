/**
 * Footer Component Exports
 * 
 * Barrel export file for the Footer component system following established patterns.
 * Simplified structure: Footer + NewsletterInput + SocialIcons
 */

// Main Footer Component
export { Footer } from "./footer";

// Sub-components (kept separate for reusability and complex logic)
export { NewsletterInput } from "./newsletter-input";
export { SocialIcons } from "./social-icons";

// Types and Interfaces
export type {
  FooterProps,
  FooterNavLink,
  SocialLink,
  SocialPlatform
} from "./footer";

export type { NewsletterInputProps } from "./newsletter-input";
export type { SocialIconsProps } from "./social-icons";