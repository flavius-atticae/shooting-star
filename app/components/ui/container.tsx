import * as React from "react";
import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Container size options
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for the Container component
 */
export interface ContainerProps extends React.ComponentProps<"div"> {
  /** Container size variant */
  size?: ContainerSize;
  /** Element to render as */
  as?: React.ElementType;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

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

// ============================================================================
// Component
// ============================================================================

/**
 * Container - Content width constraint component
 *
 * A responsive container component that constrains content width and centers it.
 * Does not apply padding - use Section or add padding separately.
 *
 * Features:
 * - Multiple size variants for different use cases
 * - Automatic horizontal centering (except "full")
 * - Polymorphic component (render as any element)
 * - No padding applied (composition-friendly)
 *
 * Sizes:
 * - `sm`: max-w-2xl - Narrow for focused content (articles, forms)
 * - `md`: max-w-4xl - Standard for most content
 * - `lg`: max-w-6xl - Large for dashboards and complex layouts
 * - `xl`: max-w-7xl - Extra large for very wide content
 * - `full`: w-full - Full viewport width
 *
 * Accessibility:
 * - Semantic HTML through `as` prop
 * - No layout constraints that would affect reading order
 * - Works with all standard HTML attributes
 *
 * @example
 * ```tsx
 * <Container size="md">
 *   <h1>Content goes here</h1>
 * </Container>
 *
 * <Container size="xl" as="section">
 *   <p>Large content area</p>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
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
