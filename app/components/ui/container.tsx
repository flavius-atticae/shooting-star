import * as React from "react";
import { cn } from "~/lib/utils";

// Container size options
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Get container size classes using switch statement to avoid object injection warnings.
 */
function getContainerSizeClass(size: ContainerSize): string {
  switch (size) {
    case "sm":
      // Narrow constraint for focused content (articles, forms)
      return "max-w-2xl mx-auto px-4 sm:px-6";
    case "md":
      // Standard size for most content
      return "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8";
    case "lg":
      // Large for dashboards and complex layouts
      return "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
    case "xl":
      // Extra large for very wide content
      return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-10";
    case "full":
      // Full width with padding only
      return "w-full px-4 sm:px-6 lg:px-8";
  }
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "md", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(getContainerSizeClass(size), className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
