import * as React from "react";
import { cn } from "~/lib/utils";
import { FadeInTitle, FadeInSubtitle } from "./hero-animations";
import type { HeroVariant } from "./types";

export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
  multiline?: boolean;
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
 * - Variant-aware typography scaling with very large sizes
 * - Adaptive content size for different Hero variants
 * - Left-aligned layout for modern design impact
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
 * - Left-aligned content for impactful presentation
 * 
 * Accessibility:
 * - Proper heading hierarchy (h1 for title)
 * - High contrast text colors (5.2:1 ratio minimum)
 * - Readable font sizes across all devices
 * - Motion preference detection for animations
 */
export const HeroContent = React.forwardRef<HTMLDivElement, HeroContentProps>(
  ({ title, subtitle, variant = 'default', multiline = false, className, ...props }, ref) => {
    const defaultTitle = "Épanouir sa féminité";
    const defaultSubtitle = "AVEC PAULINE ROUSSEL";
    
    // Function to render title with line breaks support
    const renderTitle = (titleText: string, isMultiline: boolean) => {
      if (isMultiline && titleText.includes('\n')) {
        return titleText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < titleText.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return titleText;
    };
    
    // Variant-specific typography scaling - New very large scale for left-aligned design
    const getTypographyClasses = () => {
      // All variants use the same typography scale now
      return {
        title: "text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl @xl:text-8xl",
        subtitle: "text-base @xs:text-lg @sm:text-xl @md:text-2xl @lg:text-3xl"
      };
    };
    
    const typography = getTypographyClasses();

    return (
      <div
        ref={ref}
        className={cn(
          // Layout - Left-aligned with strong negative spacing to bring subtitle much closer
          "flex flex-col items-start -space-y-6 md:-space-y-8 lg:-space-y-10",
          className
        )}
        {...props}
      >
        {/* Main Title */}
        <FadeInTitle>
          <h1
            className={cn(
              // Typography - The Seasons font (custom)
              "font-heading",
              
              // Color - Primary green
              "text-primary",
              
              // Variant-specific responsive sizing
              typography.title,
              
              // Improved line height for very large typography - Maximum space between lines
              "leading-[1.3] @sm:leading-[1.3] @md:leading-[1.3]",
              
              // Weight and letter spacing - Bold for stronger impact
              "font-bold tracking-wide @md:tracking-wider",
              
              // Better responsive margins
              "mb-2 @sm:mb-3 @md:mb-4"
            )}
          >
            {renderTitle(title || defaultTitle, multiline)}
          </h1>
        </FadeInTitle>

        {/* Subtitle */}
        <FadeInSubtitle>
          <p
            className={cn(
              // Typography - Barlow font
              "font-sans",
              
              // Color - Primary green
              "text-primary",
              
              // Variant-specific responsive sizing
              typography.subtitle,
              
              // Improved line height for comfortable reading
              "leading-relaxed @md:leading-loose",
              
              // Container-aware max width for optimal reading length
              "max-w-2xl @sm:max-w-3xl @md:max-w-4xl @lg:max-w-5xl",
              
              // Weight and spacing with container awareness - Bold for stronger impact
              "font-bold tracking-wide @md:tracking-wider",
              
              // Left alignment and text transform
              "text-left uppercase",
              
              // Better responsive margins
              "mt-4 @sm:mt-6 @md:mt-8"
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