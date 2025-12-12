import * as React from "react";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Inset size options for horizontal and vertical spacing
 */
export type InsetSize = "none" | "sm" | "md" | "lg";

/**
 * Rounded corner size options
 */
export type RoundedSize = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Background variant options
 */
export type BackgroundVariant =
  | "white"
  | "primary"
  | "accent"
  | "soft"
  | "transparent";

/**
 * Spacing variant options
 */
export type SpacingVariant = "none" | "compact" | "normal" | "spacious";

/**
 * Props for the Section component
 */
export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Content to render within the section */
  children: React.ReactNode;
  /** Vertical spacing variant */
  spacing?: SpacingVariant;
  /** Background variant */
  background?: BackgroundVariant;
  /**
   * Horizontal inset - adds wrapper padding so the background
   * doesn't touch viewport edges. Creates the "floating card" effect.
   */
  insetX?: InsetSize;
  /**
   * Vertical inset - adds wrapper padding for vertical spacing
   * around the section background.
   */
  insetY?: InsetSize;
  /** Border radius for rounded corners */
  rounded?: RoundedSize;
  /** Element to render as */
  as?: React.ElementType;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get horizontal inset classes
 */
function getInsetXClass(insetX: InsetSize): string {
  switch (insetX) {
    case "sm":
      return "px-4 sm:px-6";
    case "md":
      return "px-6 sm:px-8 lg:px-12";
    case "lg":
      return "px-8 sm:px-12 lg:px-16";
    case "none":
    default:
      return "";
  }
}

/**
 * Get vertical inset classes
 */
function getInsetYClass(insetY: InsetSize): string {
  switch (insetY) {
    case "sm":
      return "py-4 sm:py-6";
    case "md":
      return "py-6 sm:py-8 lg:py-12";
    case "lg":
      return "py-8 sm:py-12 lg:py-16";
    case "none":
    default:
      return "";
  }
}

/**
 * Get rounded corner classes
 */
function getRoundedClass(rounded: RoundedSize): string {
  switch (rounded) {
    case "sm":
      return "rounded-lg";
    case "md":
      return "rounded-xl";
    case "lg":
      return "rounded-2xl";
    case "xl":
      return "rounded-3xl";
    case "none":
    default:
      return "";
  }
}

/**
 * Get background color classes
 */
function getBackgroundClass(background: BackgroundVariant): string {
  switch (background) {
    case "white":
      return "bg-white";
    case "primary":
      return "bg-primary";
    case "accent":
      return "bg-gris";
    case "soft":
      return "bg-gradient-to-br from-white to-gris/30";
    case "transparent":
    default:
      return "bg-transparent";
  }
}

/**
 * Get spacing classes
 */
function getSpacingClass(spacing: SpacingVariant): string {
  switch (spacing) {
    case "none":
      return "";
    case "compact":
      return "py-8";
    case "spacious":
      return "py-16 lg:py-24";
    case "normal":
    default:
      return "py-12 lg:py-16";
  }
}

// ============================================================================
// Component
// ============================================================================

/**
 * Section - Flexible section wrapper component
 *
 * A versatile section component with configurable spacing, background, and insets.
 * Designed for creating consistent layouts throughout the application.
 *
 * Features:
 * - Multiple background variants (white, primary, accent, soft gradient, transparent)
 * - Configurable vertical spacing (none, compact, normal, spacious)
 * - Horizontal and vertical insets for "floating card" effect
 * - Rounded corners support
 * - Polymorphic component (render as any element)
 *
 * Background Variants:
 * - `white`: Pure white background
 * - `primary`: Primary brand color (#618462)
 * - `accent`: Soft beige (gris)
 * - `soft`: Gradient from white to soft beige
 * - `transparent`: No background (default)
 *
 * Spacing Variants:
 * - `none`: No vertical padding
 * - `compact`: py-8
 * - `normal`: py-12 lg:py-16 (default)
 * - `spacious`: py-16 lg:py-24
 *
 * Inset System:
 * When insetX or insetY is set, the section is wrapped in a div with padding,
 * creating a "floating card" effect where the background doesn't touch the edges.
 *
 * Accessibility:
 * - Semantic HTML through `as` prop
 * - Works with all standard HTML attributes
 * - No layout constraints affecting reading order
 *
 * @example
 * ```tsx
 * <Section background="white" spacing="normal">
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 *
 * <Section
 *   background="accent"
 *   spacing="compact"
 *   insetX="md"
 *   insetY="sm"
 *   rounded="lg"
 * >
 *   <p>Floating card with rounded corners</p>
 * </Section>
 * ```
 */
export function Section({
  children,
  spacing = "normal",
  background = "white",
  insetX = "none",
  insetY = "none",
  rounded = "none",
  as: Component = "section",
  className,
  ...props
}: SectionProps) {
  const sectionContent = (
    <Component
      className={cn(
        "w-full",
        getSpacingClass(spacing),
        getRoundedClass(rounded),
        getBackgroundClass(background),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );

  // If any inset is set, wrap in a div with padding for the "floating" effect
  const hasInset = insetX !== "none" || insetY !== "none";
  if (hasInset) {
    return (
      <div
        className={cn("w-full", getInsetXClass(insetX), getInsetYClass(insetY))}
      >
        {sectionContent}
      </div>
    );
  }

  return sectionContent;
}
