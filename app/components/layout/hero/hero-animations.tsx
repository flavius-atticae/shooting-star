import * as React from "react";
import { cn } from "~/lib/utils";

export interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Animation type - all are pregnancy-safe with gentle motions
   */
  animation?: "fade-in" | "fade-up" | "scale-in";
}

/**
 * Pregnancy-safe animation hook that respects user preferences
 * 
 * Features:
 * - Respects `prefers-reduced-motion: reduce`
 * - Gentle easing functions (no jarring movements)
 * - 800ms duration for comfortable viewing
 * - Optional delays for staggered animations
 * 
 * Accessibility:
 * - Automatically disabled if user prefers reduced motion
 * - Uses transform-based animations for performance
 * - No rapid flashing or sudden movements
 */
export const usePregnancySafeAnimation = (
  animation: AnimatedElementProps["animation"] = "fade-in",
  delay: number = 0
) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Trigger animation after mount + delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Return appropriate classes based on animation type and preferences
  const getAnimationClasses = () => {
    if (prefersReducedMotion) {
      // No animation classes if user prefers reduced motion
      return "opacity-100 transform-none";
    }

    const baseClasses = "transition-all duration-[800ms] ease-out";
    
    switch (animation) {
      case "fade-up":
        return cn(
          baseClasses,
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        );
      
      case "scale-in":
        return cn(
          baseClasses,
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        );
      
      case "fade-in":
      default:
        return cn(
          baseClasses,
          isVisible
            ? "opacity-100"
            : "opacity-0"
        );
    }
  };

  return {
    isVisible,
    prefersReducedMotion,
    animationClasses: getAnimationClasses()
  };
};

/**
 * Animated wrapper component for pregnancy-safe animations
 * 
 * Usage:
 * ```tsx
 * <AnimatedElement animation="fade-up" delay={200}>
 *   <h1>Content to animate</h1>
 * </AnimatedElement>
 * ```
 * 
 * Features:
 * - Automatically respects motion preferences
 * - Gentle, comfortable animations (800ms duration)
 * - Staggered delays for sequential reveals
 * - Performance-optimized with transform/opacity
 */
export const AnimatedElement = React.forwardRef<HTMLDivElement, AnimatedElementProps>(
  ({ children, className, delay = 0, animation = "fade-in", ...props }, ref) => {
    const { animationClasses } = usePregnancySafeAnimation(animation, delay);

    return (
      <div
        ref={ref}
        className={cn(animationClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedElement.displayName = "AnimatedElement";

/**
 * Pre-configured animation components for common Hero patterns
 */

export const FadeInTitle = React.forwardRef<HTMLDivElement, Omit<AnimatedElementProps, "animation">>(
  (props, ref) => (
    <AnimatedElement ref={ref} animation="fade-up" {...props} />
  )
);

FadeInTitle.displayName = "FadeInTitle";

export const FadeInSubtitle = React.forwardRef<HTMLDivElement, Omit<AnimatedElementProps, "animation">>(
  (props, ref) => (
    <AnimatedElement ref={ref} animation="fade-up" delay={200} {...props} />
  )
);

FadeInSubtitle.displayName = "FadeInSubtitle";

export const FadeInContainer = React.forwardRef<HTMLDivElement, Omit<AnimatedElementProps, "animation">>(
  (props, ref) => (
    <AnimatedElement ref={ref} animation="fade-in" {...props} />
  )
);

FadeInContainer.displayName = "FadeInContainer";