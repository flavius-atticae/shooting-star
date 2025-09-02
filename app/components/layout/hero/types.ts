/**
 * TypeScript interfaces and types for Hero component
 */

// Re-export main component interfaces
export type { HeroProps } from "./Hero";
export type { HeroContentProps } from "./hero-content";

/**
 * Hero section configuration
 */
export interface HeroConfig {
  /** Main title text - defaults to "Pauline Roussel" */
  title?: string;
  
  /** Subtitle/tagline text - defaults to services description */
  subtitle?: string;
  
  /** Background image URL (optional for future enhancement) */
  backgroundImage?: string;
  
  /** Custom CSS classes */
  className?: string;
}

/**
 * Hero responsive breakpoints for consistent sizing
 */
export const HERO_BREAKPOINTS = {
  /** Mobile height */
  mobile: 400,
  
  /** Tablet height */
  tablet: 500,
  
  /** Desktop height */
  desktop: 600,
  
  /** Border radius values */
  borderRadius: {
    mobile: 24, // 1.5rem
    tablet: 48,  // 3rem
    desktop: 64, // 4rem
  }
} as const;

/**
 * Typography scale for Hero content
 */
export const HERO_TYPOGRAPHY = {
  title: {
    mobile: "text-4xl",
    tablet: "md:text-5xl",
    desktop: "lg:text-6xl",
    xl: "xl:text-7xl",
  },
  subtitle: {
    mobile: "text-lg",
    tablet: "md:text-xl", 
    desktop: "lg:text-2xl",
  },
} as const;