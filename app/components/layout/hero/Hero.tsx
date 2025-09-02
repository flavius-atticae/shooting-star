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
 * Design:
 * - Background: --color-gris (#f5f4f2) with rounded bottom edges
 * - Typography: The Seasons (title) + Barlow (subtitle) in --color-primary
 * - Responsive height and spacing
 * 
 * Layout:
 * - Mobile: 400px height with centered content
 * - Tablet: 500px height 
 * - Desktop: 600px height
 * 
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text (--color-primary on --color-gris)
 * - Pregnancy-safe design patterns
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
          
          // Height responsive - comfortable viewing without scrolling
          "h-[400px] md:h-[500px] lg:h-[600px]",
          
          // Rounded bottom edges for visual softness
          "rounded-b-3xl md:rounded-b-[3rem] lg:rounded-b-[4rem]",
          
          // Flex for content centering
          "flex items-center justify-center",
          
          // Subtle shadow for depth
          "shadow-sm",
          
          className
        )}
        role="banner"
        aria-label="Section principale d'accueil"
        {...props}
      >
        <Container size="lg" className="h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
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