import * as React from "react";
import { Container } from "~/components/ui/container";
import { cn } from "~/lib/utils";
import { HeroContent } from "./hero-content";
import { HeroBackground } from "./hero-background";
import type { HeroVariant, HeroBackground as HeroBackgroundType } from "./types";
import { HERO_VARIANTS } from "./types";

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
  background?: HeroBackgroundType;
  children?: React.ReactNode;
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
 * - Background: --color-gris (#f5f4f2) with rounded bottom edges
 * - Typography: The Seasons (title) + Barlow (subtitle) in --color-primary
 * - Responsive height and spacing with container queries
 * - Optional background images with pregnancy-safe overlays
 * 
 * Variants:
 * - default: 60vh-70vh (400px-600px responsive)
 * - compact: For content pages (300px-400px)
 * - full-height: Landing pages (100vh - header height)
 * - with-image: Background image support (500px-700px)
 * 
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text with pregnancy-safe overlays
 * - Proper alt text for background images
 * - Loading states with reduced motion support
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ className, title, subtitle, variant = 'default', background, children, ...props }, ref) => {
    // Get variant configuration
    const variantConfig = HERO_VARIANTS[variant];
    
    // Determine if this is a background image variant
    const hasBackground = variant === 'with-image' && background;
    
    return (
      <section
        ref={ref}
        className={cn(
          // Layout and positioning
          "relative w-full overflow-hidden",
          
          // Background color - pregnancy-safe light background
          !hasBackground && "bg-gris",
          
          // Container queries for better responsive behavior
          "@container",
          
          // Variant-specific height classes
          variantConfig.classes,
          
          // Safe area handling for mobile devices
          variant !== 'full-height' && "min-h-[calc(400px+env(safe-area-inset-bottom))] md:min-h-[500px] lg:min-h-[600px]",
          
          // Rounded bottom edges for visual softness - container-aware
          // Skip rounding for full-height variant
          variant !== 'full-height' && "rounded-b-3xl @md:rounded-b-[3rem] @lg:rounded-b-[4rem]",
          
          // Flex for content centering
          "flex items-center justify-center",
          
          // Subtle shadow for depth
          !hasBackground && "shadow-sm",
          
          // Safe area padding for mobile devices
          "pb-[env(safe-area-inset-bottom)] px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
          
          className
        )}
        role="banner"
        aria-label="Section principale d'accueil"
        {...props}
      >
        {/* Background Image (if provided) */}
        {hasBackground && (
          <HeroBackground 
            background={background}
            className="z-0"
          />
        )}
        
        {/* Content Container */}
        <Container 
          size="lg" 
          className={cn(
            "h-full flex items-center justify-center relative z-10",
            // Container query responsive classes
            "@container"
          )}
        >
          <div 
            className={cn(
              "text-center mx-auto",
              // Container-aware max width and padding
              "max-w-4xl px-4 @sm:px-6 @md:px-8 @lg:px-12",
              // Container-aware width constraints
              "w-full @sm:max-w-3xl @md:max-w-4xl @lg:max-w-5xl @xl:max-w-6xl",
              // Enhanced text contrast for background images
              hasBackground && "text-white drop-shadow-lg"
            )}
          >
            {/* Default content or custom children */}
            {children || (
              <HeroContent 
                title={title}
                subtitle={subtitle}
                variant={variant}
              />
            )}
          </div>
        </Container>
      </section>
    );
  }
);

Hero.displayName = "Hero";