/**
 * TypeScript interfaces and types for Hero component
 * Phase 2B: Enhanced with variant system and background image support
 */

// Re-export main component interfaces
export type { HeroProps } from "./Hero";
export type { HeroContentProps } from "./hero-content";

/**
 * Hero variant types for different use cases
 */
export type HeroVariant = 'default' | 'full-height';


/**
 * Enhanced Hero section configuration
 */
export interface HeroConfig {
  /** Main title text - defaults to "Pauline Roussel" */
  title?: string;
  
  /** Subtitle/tagline text - defaults to services description */
  subtitle?: string;
  
  /** Hero variant type */
  variant?: HeroVariant;
  
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
 * Hero variant height configurations
 */
export const HERO_VARIANTS = {
  default: {
    mobile: 400,
    tablet: 500,
    desktop: 600,
    classes: "h-[400px] md:h-[500px] lg:h-[600px]"
  },
  'full-height': {
    mobile: 'calc(100vh - 80px)', // Subtract header height
    tablet: 'calc(100vh - 80px)',
    desktop: 'calc(100vh - 80px)',
    classes: "min-h-[calc(100vh-80px)]"
  },
} as const;

/**
 * Typography scale for Hero content - New very large scale for left-aligned design
 */
export const HERO_TYPOGRAPHY = {
  title: {
    mobile: "text-5xl",
    tablet: "@xs:text-6xl @sm:text-7xl",
    desktop: "@md:text-8xl @lg:text-9xl",
    xl: "@xl:text-[10rem]",
  },
  subtitle: {
    mobile: "text-lg",
    tablet: "@xs:text-xl @sm:text-2xl",
    desktop: "@md:text-3xl @lg:text-4xl",
  },
} as const;