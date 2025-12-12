import * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Props for the Select component
 */
export interface SelectProps extends React.ComponentProps<"select"> {
  /** Custom className */
  className?: string;
}

/**
 * Select - Dropdown selection component
 *
 * A styled select element with custom arrow indicator and form states.
 *
 * Features:
 * - Custom dropdown arrow in primary color (#618462)
 * - Focus and validation states
 * - Dark mode support
 * - Responsive text sizing
 * - Native select behavior for maximum compatibility
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Native select element for keyboard navigation
 * - Clear focus indicators with ring
 * - Invalid state with aria-invalid
 * - Disabled state with proper cursor
 *
 * @example
 * ```tsx
 * <Select>
 *   <option value="">Choose an option</option>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 * </Select>
 * ```
 */
export function Select({
  className,
  ...props
}: SelectProps) {
  return (
    <select
      data-slot="select"
      className={cn(
        // Base styling
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1",
        "text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        // Appearance - arrow with primary color (#618462)
        "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23618462%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10",
        // Selection styling
        "selection:bg-primary selection:text-primary-foreground",
        // Dark mode and disabled states
        "dark:bg-input/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}
