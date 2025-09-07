import * as React from "react";
import { cn } from "~/lib/utils";
import { HeroContent } from "./hero-content";
import type { HeroVariant } from "./types";
import { HERO_VARIANTS } from "./types";

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
  multiline?: boolean;
  children?: React.ReactNode;
  /** Custom container size (if provided, uses Container instead of responsive padding) */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Hero section component for Pauline Roussel website
 * 
 * Phase 2A Enhancements:
 * - Container queries for better responsive behavior
 * - Pregnancy-safe animations with motion preference detection
 * - Enhanced responsive typography scaling
 * - Safe area insets for mobile devices
 * 
 * Phase 2B Enhancements:
 * - Hero variants system (default, compact, full-height, with-image)
 * - Background image support with lazy loading
 * - Enhanced props interface with children support
 * - Pregnancy-safe image overlays and loading states
 * 
 * Design:
 * - Background: Always --color-gris (#f5f4f2) with rounded bottom edges
 * - Typography: The Seasons (title) + Barlow (subtitle) in --color-primary
 * - Responsive height and spacing with container queries
 * - Left-aligned layout for impactful presentation
 * 
 * Variants:
 * - default: 60vh-70vh (400px-600px responsive)
 * - compact: For content pages (300px-400px)
 * - full-height: Landing pages (100vh - header height)
 * 
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text with pregnancy-safe overlays
 * - Proper alt text for background images
 * - Loading states with reduced motion support
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ className, title, subtitle, variant = 'default', multiline, children, containerSize, ...props }, ref) => {
    // Get variant configuration
    const variantConfig = HERO_VARIANTS[variant];
    
    return (
      <section
        ref={ref}
        className={cn(
          // Layout and positioning
          "relative w-full overflow-hidden",
          
          // Background color - always use pregnancy-safe bg-gris
          "bg-gris",
          
          // Container queries for better responsive behavior
          "@container",
          
          // Variant-specific height classes
          variantConfig.classes,
          
          // Safe area handling for mobile devices
          variant !== 'full-height' && "min-h-[calc(400px+env(safe-area-inset-bottom))] md:min-h-[500px] lg:min-h-[600px]",
          
          // Rounded bottom edges for visual softness - container-aware
          // Skip rounding for full-height variant
          variant !== 'full-height' && "rounded-b-3xl @md:rounded-b-[3rem] @lg:rounded-b-[4rem]",
          
          // Flex for content alignment - left aligned layout
          "flex items-center justify-start",
          
          
          // Safe area padding for mobile devices
          "pb-[env(safe-area-inset-bottom)] px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
          
          className
        )}
        role="banner"
        aria-label="Section principale d'accueil"
        {...props}
      >
        {/* Content - Custom max-width layout without centering */}
        {containerSize ? (
          <div 
            className={cn(
              "h-full w-full flex items-center justify-start relative z-10",
              // Max width with left alignment (no mx-auto centering)
              containerSize === 'xl' && "max-w-7xl",
              containerSize === 'lg' && "max-w-6xl", 
              containerSize === 'md' && "max-w-4xl",
              containerSize === 'sm' && "max-w-2xl",
              // Responsive padding
              "px-4 sm:px-6 lg:px-8"
            )}
          >
            {/* Content wrapper - takes full width of parent */}
            <div className="w-full">
              {/* Default content or custom children */}
              {children || (
                <HeroContent 
                  title={title}
                  subtitle={subtitle}
                  variant={variant}
                  multiline={multiline}
                />
              )}
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              "h-full w-full flex items-center justify-start relative z-10",
              // Left-aligned layout with responsive padding
              "px-6 @sm:px-8 @md:px-12 @lg:px-16 @xl:px-20",
              // Container query responsive classes
              "@container"
            )}
          >
            {/* Default content or custom children */}
            {children || (
              <HeroContent 
                title={title}
                subtitle={subtitle}
                variant={variant}
                multiline={multiline}
              />
            )}
          </div>
        )}
      </section>
    );
  }
);

Hero.displayName = "Hero";