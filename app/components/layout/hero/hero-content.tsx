import * as React from "react";
import { cn } from "~/lib/utils";

export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Hero content wrapper for typography and content structure
 * 
 * Typography:
 * - Title: The Seasons font (serif) for elegant branding
 * - Subtitle: Barlow font (sans-serif) for readability
 * - Colors: --color-primary for all text
 * 
 * Layout:
 * - Responsive text sizes
 * - Optimal spacing for pregnancy-safe reading
 * - Center-aligned content
 * 
 * Accessibility:
 * - Proper heading hierarchy (h1 for title)
 * - High contrast text colors
 * - Readable font sizes across devices
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
        <h1
          className={cn(
            // Typography - The Seasons font
            "font-serif text-primary",
            
            // Responsive sizing - larger on bigger screens
            "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
            
            // Line height for readability
            "leading-tight",
            
            // Weight and letter spacing
            "font-normal tracking-wide",
            
            // Animation ready (for future phases)
            "transition-all duration-300"
          )}
        >
          {title || defaultTitle}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            // Typography - Barlow font
            "font-sans text-primary/90",
            
            // Responsive sizing
            "text-lg md:text-xl lg:text-2xl",
            
            // Line height for comfortable reading
            "leading-relaxed",
            
            // Max width for optimal reading length
            "max-w-3xl",
            
            // Weight and spacing
            "font-light tracking-wide",
            
            // Center alignment and text transform
            "text-center uppercase",
            
            // Animation ready (for future phases)
            "transition-all duration-300"
          )}
        >
          {subtitle || defaultSubtitle}
        </p>
      </div>
    );
  }
);

HeroContent.displayName = "HeroContent";