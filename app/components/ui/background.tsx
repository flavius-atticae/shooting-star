import * as React from "react";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Background variant types
 */
export type BackgroundVariant =
  | "white"
  | "accent"
  | "soft"
  | "gradient-soft"
  | "gradient-warm";

/**
 * Background pattern types
 */
export type BackgroundPatternType = "dots" | "lines" | "grid";

/**
 * Background pattern intensity levels
 */
export type BackgroundPatternIntensity = "subtle" | "light";

/**
 * Props for the Background component
 */
export interface BackgroundProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Content to render within the background */
  children: React.ReactNode;
  /** Background variant using Pauline Roussel color palette */
  variant?: BackgroundVariant;
  /** Element to render as */
  as?: React.ElementType;
  /** Custom className */
  className?: string;
}

/**
 * Props for the BackgroundPattern component
 */
export interface BackgroundPatternProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Pattern type */
  pattern?: BackgroundPatternType;
  /** Pattern intensity */
  intensity?: BackgroundPatternIntensity;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Background - Pregnancy-safe background wrapper
 *
 * A component for creating calming background patterns using the Pauline Roussel
 * color palette. All variants are designed to be pregnancy-safe with soft,
 * non-jarring colors.
 *
 * Features:
 * - Multiple background variants with brand colors
 * - Gradient options for gentle transitions
 * - Polymorphic component (render as any element)
 * - Full-width by default
 *
 * Variants:
 * - `white`: Pure white background
 * - `accent`: Soft beige background (gris color)
 * - `soft`: Gradient from white to soft beige
 * - `gradient-soft`: Multi-stop gradient with soft intermediate color
 * - `gradient-warm`: Multi-stop gradient with warm intermediate color
 *
 * Color Palette:
 * - White: #FFFFFF
 * - Gris (beige): Soft neutral beige
 * - Soft/Warm: Intermediate accent colors
 *
 * Accessibility:
 * - Pregnancy-safe colors (non-jarring, calming)
 * - Sufficient contrast for text readability
 * - Works with semantic HTML elements
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
        // Background variants using Pauline Roussel colors
        {
          // Primary backgrounds
          white: "bg-white",
          accent: "bg-gris",

          // Soft gradient backgrounds for gentle transitions
          soft: "bg-gradient-to-br from-white to-gris/30",

          // Advanced gradient variants pregnancy-safe
          "gradient-soft":
            "bg-gradient-to-br from-white via-soft/20 to-gris/40",
          "gradient-warm":
            "bg-gradient-to-br from-white via-warm/15 to-gris/25",
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * BackgroundPattern - Subtle background pattern overlay
 *
 * Creates pregnancy-safe decorative background patterns using soft colors.
 * Should be used as an absolute overlay within a parent container.
 *
 * Features:
 * - Multiple pattern types (dots, lines, grid)
 * - Adjustable intensity levels
 * - Pointer-events disabled for click-through
 * - Absolute positioning for overlay effect
 *
 * Patterns:
 * - `dots`: Radial dot pattern
 * - `lines`: Vertical line pattern
 * - `grid`: Grid pattern (vertical + horizontal lines)
 *
 * Intensity:
 * - `subtle`: 1px elements, 20px spacing
 * - `light`: 2px elements, 24px spacing
 *
 * Accessibility:
 * - Non-interactive (pointer-events-none)
 * - Decorative only (does not convey information)
 * - Soft colors to avoid visual fatigue
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <BackgroundPattern pattern="dots" intensity="subtle" />
 *   <div className="relative z-10">
 *     <p>Content appears above the pattern</p>
 *   </div>
 * </div>
 * ```
 */
export function BackgroundPattern({
  pattern = "dots",
  intensity = "subtle",
  className,
  ...props
}: BackgroundPatternProps) {
  const patternClasses = {
    dots: {
      subtle:
        "bg-[radial-gradient(circle_at_1px_1px,theme(colors.gris)_1px,transparent_0)]",
      light:
        "bg-[radial-gradient(circle_at_2px_2px,theme(colors.gris)_1px,transparent_0)]",
    },
    lines: {
      subtle:
        "bg-[linear-gradient(90deg,theme(colors.gris)_1px,transparent_1px)]",
      light:
        "bg-[linear-gradient(90deg,theme(colors.gris)_2px,transparent_2px)]",
    },
    grid: {
      subtle:
        "bg-[linear-gradient(theme(colors.gris)_1px,transparent_1px),linear-gradient(90deg,theme(colors.gris)_1px,transparent_1px)]",
      light:
        "bg-[linear-gradient(theme(colors.gris)_2px,transparent_2px),linear-gradient(90deg,theme(colors.gris)_2px,transparent_2px)]",
    },
  };

  const sizeClasses = {
    dots: {
      subtle: "bg-[size:20px_20px]",
      light: "bg-[size:24px_24px]",
    },
    lines: {
      subtle: "bg-[size:20px_20px]",
      light: "bg-[size:24px_24px]",
    },
    grid: {
      subtle: "bg-[size:20px_20px]",
      light: "bg-[size:24px_24px]",
    },
  };

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        patternClasses[pattern][intensity],
        sizeClasses[pattern][intensity],
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Hook to get background CSS classes
 *
 * Useful for applying backgrounds directly via className prop.
 * Returns an object with all background variant classes.
 *
 * @example
 * ```tsx
 * const backgrounds = useBackgroundClasses();
 * <div className={backgrounds.white}>Content</div>
 * ```
 */
export function useBackgroundClasses() {
  return {
    white: "bg-white",
    accent: "bg-gris",
    soft: "bg-gradient-to-br from-white to-gris/30",
    "gradient-soft": "bg-gradient-to-br from-white via-soft/20 to-gris/40",
    "gradient-warm": "bg-gradient-to-br from-white via-warm/15 to-gris/25",
  } as const;
}