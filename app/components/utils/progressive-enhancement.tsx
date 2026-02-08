/**
 * Progressive Enhancement Components
 *
 * Motion-safe component that adapts rendering based on
 * the user's reduced-motion preference.
 */

import * as React from "react";

import { useMotionPreferences } from "~/hooks/use-browser-support";
import { cn } from "~/lib/utils";

/**
 * Props for MotionSafe component
 */
export interface MotionSafeProps extends React.ComponentProps<"div"> {
  /** Animation classes to apply when motion is safe */
  animationClass: string;
  /** Fallback classes when motion should be reduced */
  fallbackClass?: string;
  /** Force disable animations regardless of user preference */
  disabled?: boolean;
}

/**
 * MotionSafe - Wrapper that respects user's motion preferences
 *
 * Applies animations only when safe for the user, respecting prefers-reduced-motion.
 * Critical for pregnancy-safe UX (nausea considerations).
 *
 * Features:
 * - Automatic motion preference detection
 * - Configurable animation and fallback classes
 * - Force disable option
 * - Zero motion when user prefers reduced motion
 *
 * Accessibility:
 * - Respects prefers-reduced-motion media query
 * - WCAG 2.1 Animation from Interactions guideline
 * - Pregnancy-safe (reduces nausea triggers)
 * - Provides non-animated fallback
 *
 * @example
 * ```tsx
 * <MotionSafe
 *   animationClass="animate-fadeIn duration-300"
 *   fallbackClass="opacity-100"
 * >
 *   <Content />
 * </MotionSafe>
 * ```
 */
export const MotionSafe: React.FC<MotionSafeProps> = ({
  children,
  animationClass,
  fallbackClass = "",
  disabled = false,
  className,
  ...props
}) => {
  const { shouldAnimate } = useMotionPreferences();

  const appliedClass =
    disabled || !shouldAnimate ? fallbackClass : animationClass;

  return (
    <div className={cn(appliedClass, className)} {...props}>
      {children}
    </div>
  );
};