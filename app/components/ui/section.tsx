import { cn } from "~/lib/utils";
import type { ReactNode, HTMLAttributes, ElementType } from "react";

type InsetSize = "none" | "sm" | "md" | "lg";
type RoundedSize = "none" | "sm" | "md" | "lg" | "xl";
type BackgroundVariant =
  | "white"
  | "primary"
  | "accent"
  | "soft"
  | "transparent";
type SpacingVariant = "compact" | "normal" | "spacious";

export interface SectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  children: ReactNode;
  spacing?: SpacingVariant;
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
  as?: ElementType;
}

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

function getSpacingClass(spacing: SpacingVariant): string {
  switch (spacing) {
    case "compact":
      return "py-8";
    case "spacious":
      return "py-16 lg:py-24";
    case "normal":
    default:
      return "py-12 lg:py-16";
  }
}

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
