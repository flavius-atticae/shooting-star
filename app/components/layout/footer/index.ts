/**
 * Footer Component Exports
 * 
 * Barrel export file for the Footer component system following established patterns.
 * Exports all components, types, and utilities for the Footer section.
 */

// Main Footer Component
export { Footer } from "./footer";

// Sub-components
export { FooterLogo } from "./footer-logo";
export { FooterNavigation } from "./footer-navigation";
export { FooterSocial } from "./footer-social";
export { NewsletterInput } from "./newsletter-input";
export { SocialIcons } from "./social-icons";

// Types and Interfaces
export type {
  FooterProps,
  FooterLogoProps,
  FooterNavigationProps,
  FooterSocialProps,
  NewsletterInputProps,
  SocialIconsProps,
  FooterNavLink,
  SocialLink,
  SocialPlatform
} from "./types";