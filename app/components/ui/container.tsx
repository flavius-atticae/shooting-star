import * as React from "react";
import { cn } from "~/lib/utils";

// Container size options
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Get container size classes using switch statement to avoid object injection warnings.
 * Container only handles max-width and centering, not padding.
 */
function getContainerSizeClass(size: ContainerSize): string {
  switch (size) {
    case "sm":
      // Narrow constraint for focused content (articles, forms)
      return "max-w-2xl mx-auto";
    case "md":
      // Standard size for most content
      return "max-w-4xl mx-auto";
    case "lg":
      // Large for dashboards and complex layouts
      return "max-w-6xl mx-auto";
    case "xl":
      // Extra large for very wide content
      return "max-w-7xl mx-auto";
    case "full":
      // Full width
      return "w-full";
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
