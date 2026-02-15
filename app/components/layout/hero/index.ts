/**
 * Hero component barrel exports
 *
 * Simplified structure:
 * - hero.tsx: Main component with inline content
 * - hero-animations.tsx: Reusable animation components
 */

// Main component and content
export { Hero, HeroContent } from "./hero";
export type { HeroProps, HeroContentProps, HeroVariant } from "./hero";

// Configuration constants
export { HERO_BREAKPOINTS, HERO_VARIANTS } from "./hero";

// Animation components (reusable)
export {
  AnimatedElement,
  FadeInTitle,
  FadeInSubtitle,
  FadeInContainer,
  usePregnancySafeAnimation,
} from "./hero-animations";
export type { AnimatedElementProps } from "./hero-animations";

// Default export
export { Hero as default } from "./hero";
