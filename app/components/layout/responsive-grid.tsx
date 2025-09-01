import * as React from "react"
import { cn } from "~/lib/utils"
import { useContainerQueries } from "~/hooks/use-browser-support"

// Types for adaptive grid props
export interface AdaptiveGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Target number of columns (2 or 3)
   * Determines which container query class to use
   */
  columns?: 2 | 3
  
  /**
   * Custom gap (replaces default 1rem gap)
   * Uses Tailwind gap-* classes
   */
  gap?: string
  
  /**
   * Enable container query context on this element
   * Default true - element becomes a container query context
   */
  enableContainerQuery?: boolean
  
  /**
   * Container name to specifically target this container
   * Uses container-name if provided
   */
  containerName?: string
  
  /**
   * HTML component to use as root
   */
  as?: React.ElementType
}

/**
 * AdaptiveGrid - Responsive Grid using Container Queries
 * 
 * This component creates a grid that adapts according to its parent container size,
 * not according to screen size. This allows for more flexible layouts.
 * 
 * Features:
 * - Uses container queries (@container) for responsiveness
 * - Automatic fallback with media queries for non-compatible browsers
 * - Support for 2 and 3 column grids
 * - Configurable gap with Tailwind classes
 * - Strict TypeScript
 * 
 * @example
 * ```tsx
 * <AdaptiveGrid columns={2} gap="gap-6">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AdaptiveGrid>
 * ```
 */
const AdaptiveGrid = React.forwardRef<HTMLDivElement, AdaptiveGridProps>(
  ({ 
    className, 
    children,
    columns = 2,
    gap,
    enableContainerQuery = true,
    containerName,
    as: Component = "div",
    ...props 
  }, ref) => {
    
    // CSS classes construction
    const containerQueryClass = enableContainerQuery 
      ? containerName 
        ? "container-name-content" // Generic class for named containers
        : "container-query"
      : ""
    
    const gridClass = columns === 3 ? "cq-grid-3" : "cq-grid-2"
    
    // Custom gap or default 1rem gap (gap-4)
    const gapClass = gap || "gap-4"
    
    return (
      <Component
        ref={ref}
        className={cn(
          containerQueryClass,
          gridClass,
          gapClass,
          className
        )}
        style={
          containerName 
            ? { containerName } as React.CSSProperties
            : undefined
        }
        {...props}
      >
        {children}
      </Component>
    )
  }
)

AdaptiveGrid.displayName = "AdaptiveGrid"

/**
 * Hook to detect if container queries are supported
 * Uses the main hook from the browser-support system
 */
export function useContainerQuerySupport(): boolean {
  const { hasSupport } = useContainerQueries()
  return hasSupport
}

/**
 * Adaptive grid demonstration component
 * Useful for Storybook and visual tests
 */
export const AdaptiveGridDemo: React.FC = () => {
  const supportsContainerQueries = useContainerQuerySupport()
  
  return (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral">
          Container Queries Support: {supportsContainerQueries ? '✅' : '❌ (fallback active)'}
        </h3>
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2 text-neutral">2 columns Grid</h4>
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
        <h4 className="text-md font-medium mb-2 text-neutral">3 columns Grid</h4>
        <div className="border-2 border-dashed border-secondary/20 p-4">
          <AdaptiveGrid columns={3} gap="gap-6">
            <div className="bg-secondary/10 p-4 rounded text-center">Item 1</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 2</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 3</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 4</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 5</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 6</div>
          </AdaptiveGrid>
        </div>
      </div>
    </div>
  )
}

export { AdaptiveGrid }