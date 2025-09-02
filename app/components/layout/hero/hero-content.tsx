import * as React from "react";
import { cn } from "~/lib/utils";
import { FadeInTitle, FadeInSubtitle } from "./hero-animations";

export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Hero content wrapper for typography and content structure
 * 
 * Phase 2A Enhancements:
 * - Enhanced responsive typography with container queries
 * - Improved scaling for better readability
 * - Pregnancy-safe animation integration
 * - Motion preference detection
 * 
 * Typography:
 * - Title: The Seasons font (serif) for elegant branding
 * - Subtitle: Barlow font (sans-serif) for readability
 * - Colors: --color-primary for all text
 * - Container-aware responsive scaling
 * 
 * Layout:
 * - Enhanced responsive text sizes with container queries
 * - Optimal spacing for pregnancy-safe reading
 * - Center-aligned content with better proportions
 * 
 * Accessibility:
 * - Proper heading hierarchy (h1 for title)
 * - High contrast text colors (5.2:1 ratio minimum)
 * - Readable font sizes across all devices
 * - Motion preference detection for animations
 */
export const HeroContent = React.forwardRef<HTMLDivElement, HeroContentProps>(
  ({ title, subtitle, className, ...props }, ref) => {
    const defaultTitle = "Épanouir sa féminité";
    const defaultSubtitle = "AVEC PAULINE ROUSSEL";

    return (
      <div
        ref={ref}
        className={cn(
          // Layout
          "flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8",
          className
        )}
        {...props}
      >
        {/* Main Title */}
        <FadeInTitle>
          <h1
            className={cn(
              // Typography - The Seasons font
              "font-serif text-primary",
              
              // Enhanced responsive sizing with container queries
              "text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl @xl:text-8xl",
              "md:text-4xl md:@sm:text-5xl md:@md:text-6xl md:@lg:text-7xl md:@xl:text-8xl",
              "lg:text-5xl lg:@sm:text-6xl lg:@md:text-7xl lg:@lg:text-8xl",
              
              // Improved line height for better readability
              "leading-[0.9] @sm:leading-[0.95] @md:leading-tight",
              
              // Weight and letter spacing
              "font-normal tracking-wide @md:tracking-wider",
              
              // Pregnancy-safe text shadow for better contrast
              "text-shadow-sm",
              
              // Better responsive margins
              "mb-2 @sm:mb-3 @md:mb-4"
            )}
          >
            {title || defaultTitle}
          </h1>
        </FadeInTitle>

        {/* Subtitle */}
        <FadeInSubtitle>
          <p
            className={cn(
              // Typography - Barlow font
              "font-sans text-primary/90",
              
              // Enhanced responsive sizing with container queries
              "text-base @xs:text-lg @sm:text-xl @md:text-2xl @lg:text-3xl",
              "md:text-lg md:@sm:text-xl md:@md:text-2xl md:@lg:text-3xl",
              "lg:text-xl lg:@sm:text-2xl lg:@md:text-3xl",
              
              // Improved line height for comfortable reading
              "leading-relaxed @md:leading-loose",
              
              // Container-aware max width for optimal reading length
              "max-w-2xl @sm:max-w-3xl @md:max-w-4xl @lg:max-w-5xl",
              
              // Weight and spacing with container awareness
              "font-light tracking-wide @md:tracking-wider",
              
              // Center alignment and text transform
              "text-center uppercase",
              
              // Better responsive margins
              "mt-4 @sm:mt-6 @md:mt-8",
              
              // Pregnancy-safe text shadow for better contrast
              "text-shadow-sm"
            )}
          >
            {subtitle || defaultSubtitle}
          </p>
        </FadeInSubtitle>
      </div>
    );
  }
);

HeroContent.displayName = "HeroContent";