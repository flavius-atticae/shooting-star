import * as React from "react";
import { Container } from "~/components/ui/container";
import { cn } from "~/lib/utils";
import { HeroContent } from "./hero-content";

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
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
 * Design:
 * - Background: --color-gris (#f5f4f2) with rounded bottom edges
 * - Typography: The Seasons (title) + Barlow (subtitle) in --color-primary
 * - Responsive height and spacing with container queries
 * 
 * Layout:
 * - Mobile: 400px height with safe area insets
 * - Tablet: 500px height with container-aware spacing
 * - Desktop: 600px height with optimized container layout
 * 
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text (--color-primary on --color-gris)
 * - Pregnancy-safe design patterns and animations
 * - Motion preference detection for reduced motion
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ className, title, subtitle, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Layout and positioning
          "relative w-full",
          
          // Background color - pregnancy-safe light background
          "bg-gris",
          
          // Container queries for better responsive behavior
          "@container",
          
          // Height responsive with safe area insets for mobile
          "h-[400px] md:h-[500px] lg:h-[600px]",
          "min-h-[calc(400px+env(safe-area-inset-bottom))] md:min-h-[500px] lg:min-h-[600px]",
          
          // Rounded bottom edges for visual softness - container-aware
          "rounded-b-3xl @md:rounded-b-[3rem] @lg:rounded-b-[4rem]",
          
          // Flex for content centering
          "flex items-center justify-center",
          
          // Subtle shadow for depth
          "shadow-sm",
          
          // Safe area padding for mobile devices
          "pb-[env(safe-area-inset-bottom)] px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
          
          className
        )}
        role="banner"
        aria-label="Section principale d'accueil"
        {...props}
      >
        <Container 
          size="lg" 
          className={cn(
            "h-full flex items-center justify-center",
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
              "w-full @sm:max-w-3xl @md:max-w-4xl @lg:max-w-5xl @xl:max-w-6xl"
            )}
          >
            <HeroContent 
              title={title}
              subtitle={subtitle}
            />
          </div>
        </Container>
      </section>
    );
  }
);

Hero.displayName = "Hero";