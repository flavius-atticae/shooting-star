import * as React from "react";
import { cn } from "~/lib/utils";
import { FadeInTitle, FadeInSubtitle } from "./hero-animations";
import type { HeroVariant } from "./types";

export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
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
 * Phase 2B Enhancements:
 * - Variant-aware typography scaling
 * - Adaptive content size for different Hero variants
 * - Enhanced contrast for background image variants
 * 
 * Typography:
 * - Title: The Seasons font (serif) for elegant branding
 * - Subtitle: Barlow font (sans-serif) for readability
 * - Colors: --color-primary for all text (adaptive for backgrounds)
 * - Container-aware responsive scaling
 * 
 * Layout:
 * - Enhanced responsive text sizes with container queries
 * - Variant-specific spacing and sizing
 * - Center-aligned content with better proportions
 * 
 * Accessibility:
 * - Proper heading hierarchy (h1 for title)
 * - High contrast text colors (5.2:1 ratio minimum)
 * - Readable font sizes across all devices
 * - Motion preference detection for animations
 */
export const HeroContent = React.forwardRef<HTMLDivElement, HeroContentProps>(
  ({ title, subtitle, variant = 'default', className, ...props }, ref) => {
    const defaultTitle = "Épanouir sa féminité";
    const defaultSubtitle = "AVEC PAULINE ROUSSEL";
    
    // Variant-specific typography scaling
    const getTypographyClasses = (variant: HeroVariant) => {
      switch (variant) {
        case 'compact':
          return {
            title: "text-2xl @xs:text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl",
            subtitle: "text-sm @xs:text-base @sm:text-lg @md:text-xl @lg:text-2xl"
          };
        case 'full-height':
          return {
            title: "text-4xl @xs:text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl @xl:text-9xl",
            subtitle: "text-lg @xs:text-xl @sm:text-2xl @md:text-3xl @lg:text-4xl"
          };
        case 'with-image':
          return {
            title: "text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl @xl:text-8xl",
            subtitle: "text-base @xs:text-lg @sm:text-xl @md:text-2xl @lg:text-3xl"
          };
        default:
          return {
            title: "text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl @xl:text-8xl",
            subtitle: "text-base @xs:text-lg @sm:text-xl @md:text-2xl @lg:text-3xl"
          };
      }
    };
    
    const typography = getTypographyClasses(variant);

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
              "font-serif",
              
              // Variant-specific responsive sizing
              typography.title,
              
              // Improved line height for better readability
              "leading-[0.9] @sm:leading-[0.95] @md:leading-tight",
              
              // Weight and letter spacing
              "font-normal tracking-wide @md:tracking-wider",
              
              // Enhanced contrast and text shadow
              "text-shadow-sm",
              
              // Better responsive margins with variant adjustment
              variant === 'compact' ? "mb-1 @sm:mb-2 @md:mb-3" : "mb-2 @sm:mb-3 @md:mb-4"
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
              "font-sans",
              
              // Variant-specific responsive sizing
              typography.subtitle,
              
              // Improved line height for comfortable reading
              "leading-relaxed @md:leading-loose",
              
              // Container-aware max width for optimal reading length
              variant === 'compact' ? "max-w-lg @sm:max-w-xl @md:max-w-2xl" : "max-w-2xl @sm:max-w-3xl @md:max-w-4xl @lg:max-w-5xl",
              
              // Weight and spacing with container awareness
              "font-light tracking-wide @md:tracking-wider",
              
              // Center alignment and text transform
              "text-center uppercase",
              
              // Better responsive margins with variant adjustment
              variant === 'compact' ? "mt-2 @sm:mt-3 @md:mt-4" : "mt-4 @sm:mt-6 @md:mt-8",
              
              // Enhanced contrast and text shadow
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