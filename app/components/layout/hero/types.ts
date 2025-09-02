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
export type HeroVariant = 'default' | 'compact' | 'full-height' | 'with-image';

/**
 * Background image configuration with pregnancy-safe defaults
 */
export interface HeroBackground {
  /** Image source URL */
  src: string;
  
  /** Accessible alt text description */
  alt: string;
  
  /** Overlay opacity for readability (0-1, pregnancy-safe default: 0.4) */
  overlay?: number;
  
  /** Image positioning */
  position?: 'center' | 'top' | 'bottom';
}

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
  
  /** Background image configuration */
  background?: HeroBackground;
  
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
  compact: {
    mobile: 300,
    tablet: 400,
    desktop: 400,
    classes: "h-[300px] sm:h-[400px]"
  },
  'full-height': {
    mobile: 'calc(100vh - 80px)', // Subtract header height
    tablet: 'calc(100vh - 80px)',
    desktop: 'calc(100vh - 80px)',
    classes: "min-h-[calc(100vh-80px)]"
  },
  'with-image': {
    mobile: 500,
    tablet: 600,
    desktop: 700,
    classes: "h-[500px] md:h-[600px] lg:h-[700px]"
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