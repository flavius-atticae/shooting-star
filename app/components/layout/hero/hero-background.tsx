import * as React from "react";
import { cn } from "~/lib/utils";
import type { HeroBackground } from "./types";

export interface HeroBackgroundProps {
  /** Background configuration */
  background: HeroBackground;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero background image component with pregnancy-safe patterns
 * 
 * Features:
 * - Lazy loading for performance optimization
 * - Pregnancy-safe overlay defaults (0.4 opacity)
 * - Proper alt text for accessibility
 * - Responsive image handling
 * - Loading state with subtle animation
 * 
 * Performance:
 * - Uses lazy loading for above-the-fold optimization
 * - Optimized for LCP (Largest Contentful Paint)
 * - Progressive image enhancement
 */
export const HeroBackgroundComponent = React.forwardRef<HTMLDivElement, HeroBackgroundProps>(
  ({ background, className, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    
    // Pregnancy-safe overlay default
    const overlayOpacity = background.overlay ?? 0.4;
    
    // Image position classes
    const positionClasses = {
      center: "object-center",
      top: "object-top", 
      bottom: "object-bottom"
    };
    
    const positionClass = positionClasses[background.position || 'center'];
    
    const handleLoad = React.useCallback(() => {
      setIsLoaded(true);
    }, []);
    
    const handleError = React.useCallback(() => {
      setHasError(true);
    }, []);
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 overflow-hidden rounded-inherit",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        {!hasError && (
          <img
            src={background.src}
            alt={background.alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              positionClass,
              // Loading state with reduced motion support
              "opacity-0",
              isLoaded && "opacity-100",
              // Reduced motion preference
              "motion-reduce:transition-none motion-reduce:opacity-100"
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
          />
        )}
        
        {/* Loading placeholder */}
        {!isLoaded && !hasError && (
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-gris to-menthe/20",
              "animate-pulse motion-reduce:animate-none"
            )}
            aria-hidden="true"
          />
        )}
        
        {/* Error fallback */}
        {hasError && (
          <div 
            className="absolute inset-0 bg-gris"
            aria-hidden="true"
          />
        )}
        
        {/* Pregnancy-safe overlay for text readability */}
        <div
          className="absolute inset-0 bg-neutral transition-opacity duration-500"
          style={{ 
            opacity: Math.max(overlayOpacity, 0.2) // Ensure minimum readability
          }}
          aria-hidden="true"
        />
        
        {/* Screen reader description */}
        <div className="sr-only">
          Image d'arrière-plan: {background.alt}
        </div>
      </div>
    );
  }
);

HeroBackgroundComponent.displayName = "HeroBackground";

// Export with a clear name to avoid conflicts
export { HeroBackgroundComponent as HeroBackground };