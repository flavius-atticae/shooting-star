/**
 * Hero component barrel exports
 * 
 * Main exports for the Hero section component following
 * the same pattern as Header component structure.
 */

// Main component
export { Hero } from "./Hero";
export type { HeroProps } from "./Hero";

// Sub-components
export { HeroContent } from "./hero-content";
export type { HeroContentProps } from "./hero-content";
export { HeroBackground } from "./hero-background";
export type { HeroBackgroundProps } from "./hero-background";

// Types and configuration
export type { 
  HeroConfig,
  HeroVariant,
  HeroBackground as HeroBackgroundType,
  HeroContentProps as HeroContentInterface,
  HeroProps as HeroInterface
} from "./types";

export { 
  HERO_BREAKPOINTS,
  HERO_TYPOGRAPHY,
  HERO_VARIANTS
} from "./types";

// Default export
export { Hero as default } from "./Hero";