import { cn } from "~/lib/utils";
import type { ReactNode, HTMLAttributes, ElementType } from "react";

export interface SectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  children: ReactNode;
  spacing?: "compact" | "normal" | "spacious";
  background?: "white" | "primary" | "accent" | "soft" | "transparent";
  /**
   * Horizontal inset - adds wrapper padding so the background
   * doesn't touch viewport edges. Creates the "floating card" effect.
   */
  insetX?: "none" | "sm" | "md" | "lg";
  /**
   * Vertical inset - adds wrapper padding for vertical spacing
   * around the section background.
   */
  insetY?: "none" | "sm" | "md" | "lg";
  /** Border radius for rounded corners */
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  as?: ElementType;
}

const insetXClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-6 sm:px-8 lg:px-12",
  lg: "px-8 sm:px-12 lg:px-16",
};

const insetYClasses = {
  none: "",
  sm: "py-4 sm:py-6",
  md: "py-6 sm:py-8 lg:py-12",
  lg: "py-8 sm:py-12 lg:py-16",
};

const roundedClasses = {
  none: "",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

const backgroundClasses = {
  white: "bg-white",
  primary: "bg-primary",
  accent: "bg-gris",
  soft: "bg-gradient-to-br from-white to-gris/30",
  transparent: "bg-transparent",
};

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
  const spacingClass = {
    compact: "py-8",
    normal: "py-12 lg:py-16",
    spacious: "py-16 lg:py-24",
  }[spacing];

  const sectionContent = (
    <Component
      className={cn(
        "w-full",
        spacingClass,
        roundedClasses[rounded],
        backgroundClasses[background],
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
        className={cn("w-full", insetXClasses[insetX], insetYClasses[insetY])}
      >
        {sectionContent}
      </div>
    );
  }

  return sectionContent;
}
