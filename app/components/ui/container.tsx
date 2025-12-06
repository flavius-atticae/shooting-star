import * as React from "react";
import { cn } from "~/lib/utils";

// Container variants for different maximum sizes
export const containerVariants = {
  size: {
    // Narrow constraint for focused content (articles, forms)
    sm: "max-w-2xl mx-auto px-4 sm:px-6",

    // Standard size for most content
    md: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",

    // Large for dashboards and complex layouts
    lg: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",

    // Extra large for very wide content
    xl: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-10",

    // Full width with padding only
    full: "w-full px-4 sm:px-6 lg:px-8",
  },
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerVariants.size;
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "md", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants.size[size], className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
