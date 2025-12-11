import * as React from "react";

import { cn } from "~/lib/utils";
import { useContainerQueries } from "~/hooks/use-browser-support";

// ============================================================================
// Types
// ============================================================================

/**
 * Grid column count options
 */
export type GridColumns = 2 | 3;

/**
 * Props for the AdaptiveGrid component
 */
export interface AdaptiveGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Target number of columns (2 or 3)
   * Determines which container query class to use
   */
  columns?: GridColumns;

  /**
   * Custom gap (replaces default 1rem gap)
   * Uses Tailwind gap-* classes
   */
  gap?: string;

  /**
   * Enable container query context on this element
   * Default true - element becomes a container query context
   */
  enableContainerQuery?: boolean;

  /**
   * Container name to specifically target this container
   * Uses container-name if provided
   */
  containerName?: string;

  /**
   * HTML component to use as root
   */
  as?: React.ElementType;

  /** Custom className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * AdaptiveGrid - Responsive Grid using Container Queries
 *
 * Creates a grid that adapts based on its parent container size rather than
 * viewport size, enabling more flexible and component-based responsive layouts.
 *
 * Features:
 * - Container queries (@container) for true component responsiveness
 * - Automatic fallback to media queries for non-supporting browsers
 * - Support for 2 and 3 column grids
 * - Configurable gap with Tailwind classes
 * - Polymorphic component (render as any element)
 * - Named container support for nested queries
 *
 * Grid Breakpoints:
 * - 2 columns: Switches from 1 → 2 columns at container width breakpoints
 * - 3 columns: Switches from 1 → 2 → 3 columns at container width breakpoints
 *
 * Browser Support:
 * - Modern browsers: Uses container queries
 * - Legacy browsers: Automatic fallback to media queries
 * - Detection via `useContainerQuerySupport()` hook
 *
 * Accessibility:
 * - Semantic HTML through `as` prop
 * - Works with grid-based layouts
 * - No layout constraints affecting reading order
 *
 * @example
 * ```tsx
 * <AdaptiveGrid columns={2} gap="gap-6">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AdaptiveGrid>
 *
 * <AdaptiveGrid
 *   columns={3}
 *   gap="gap-4"
 *   containerName="my-grid"
 *   as="section"
 * >
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 *   <div>Card 3</div>
 * </AdaptiveGrid>
 * ```
 */
export const AdaptiveGrid = React.forwardRef<HTMLDivElement, AdaptiveGridProps>(
  (
    {
      className,
      children,
      columns = 2,
      gap,
      enableContainerQuery = true,
      containerName,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    // CSS classes construction
    const containerQueryClass = enableContainerQuery
      ? containerName
        ? "container-name-content" // Generic class for named containers
        : "container-query"
      : "";

    const gridClass = columns === 3 ? "cq-grid-3" : "cq-grid-2";

    // Custom gap or default 1rem gap (gap-4)
    const gapClass = gap || "gap-4";

    return (
      <Component
        ref={ref}
        className={cn(containerQueryClass, gridClass, gapClass, className)}
        style={
          containerName
            ? ({ containerName } as React.CSSProperties)
            : undefined
        }
        {...props}
      >
        {children}
      </Component>
    );
  }
);

AdaptiveGrid.displayName = "AdaptiveGrid";

// ============================================================================
// Utilities
// ============================================================================

/**
 * Hook to detect container query support
 *
 * Returns whether the browser supports CSS container queries.
 * Uses the main browser-support detection system.
 *
 * @returns true if container queries are supported, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const hasSupport = useContainerQuerySupport();
 *   return <div>{hasSupport ? 'Modern layout' : 'Fallback layout'}</div>;
 * }
 * ```
 */
export function useContainerQuerySupport(): boolean {
  const { hasSupport } = useContainerQueries();
  return hasSupport;
}

/**
 * AdaptiveGridDemo - Demonstration component
 *
 * Visual demonstration of AdaptiveGrid capabilities.
 * Useful for Storybook and development testing.
 *
 * Features:
 * - Shows container query support status
 * - Demonstrates 2 and 3 column grids
 * - Visual indicators for grid items
 *
 * @example
 * ```tsx
 * // In Storybook
 * export const Demo = () => <AdaptiveGridDemo />;
 * ```
 */
export const AdaptiveGridDemo: React.FC = () => {
  const supportsContainerQueries = useContainerQuerySupport();

  return (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral">
          Container Queries Support:{" "}
          {supportsContainerQueries ? "✅" : "❌ (fallback active)"}
        </h3>
      </div>

      <div>
        <h4 className="text-md font-medium mb-2 text-neutral">
          2 columns Grid
        </h4>
        <div className="border-2 border-dashed border-primary/20 p-4">
          <AdaptiveGrid columns={2} gap="gap-4">
            <div className="bg-primary/10 p-4 rounded text-center">Item 1</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 2</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 3</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 4</div>
          </AdaptiveGrid>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-2 text-neutral">
          3 columns Grid
        </h4>
        <div className="border-2 border-dashed border-secondary/20 p-4">
          <AdaptiveGrid columns={3} gap="gap-6">
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 1
            </div>
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 2
            </div>
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 3
            </div>
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 4
            </div>
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 5
            </div>
            <div className="bg-secondary/10 p-4 rounded text-center">
              Item 6
            </div>
          </AdaptiveGrid>
        </div>
      </div>
    </div>
  );
};