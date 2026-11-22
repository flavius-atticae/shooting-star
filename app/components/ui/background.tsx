import type * as React from "react";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Background variant types
 */
export type BackgroundVariant = "white" | "accent" | "soft" | "gradient-soft" | "gradient-warm";

/**
 * Props for the Background component
 */
export interface BackgroundProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Content to render within the background */
  children: React.ReactNode;
  /** Background variant using Pauline Roussel color palette */
  variant?: BackgroundVariant;
  /** Element to render as */
  as?: React.ElementType;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Background - Pregnancy-safe background wrapper
 *
 * A component for creating calming background wrappers using the Pauline Roussel
 * color palette. All variants are designed to be pregnancy-safe with soft,
 * non-jarring colors.
 *
 * @example
 * ```tsx
 * <Background variant="white">
 *   <p>Content on white background</p>
 * </Background>
 *
 * <Background variant="gradient-soft" as="section">
 *   <h2>Content with gradient background</h2>
 * </Background>
 * ```
 */
export function Background({
  children,
  variant = "white",
  as: Component = "div",
  className,
  ...props
}: BackgroundProps) {
  return (
    <Component
      className={cn(
        "w-full",
        {
          white: "bg-white",
          accent: "bg-gris",
          soft: "bg-gradient-to-br from-white to-gris/30",
          "gradient-soft": "bg-gradient-to-br from-white via-soft/20 to-gris/40",
          "gradient-warm": "bg-gradient-to-br from-white via-warm/15 to-gris/25",
        }[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
