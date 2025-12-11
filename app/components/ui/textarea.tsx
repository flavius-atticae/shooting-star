import * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Props for the Textarea component
 */
export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Custom className */
  className?: string;
}

/**
 * Textarea - Multi-line text input component
 *
 * A styled textarea field with comprehensive form states and accessibility features.
 *
 * Features:
 * - Minimum height of 80px for usability
 * - Vertical resizing enabled
 * - Focus and validation states
 * - Dark mode support
 * - Responsive text sizing
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Clear focus indicators with ring
 * - Invalid state with aria-invalid
 * - Disabled state with proper cursor
 * - High contrast placeholders
 * - Resizable for user control
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 * <Textarea rows={5} aria-invalid={true} />
 * ```
 */
export function Textarea({
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styling
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2",
        "text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        // Placeholder and selection styling
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // Dark mode and disabled states
        "dark:bg-input/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Resize behavior
        "resize-y",
        className
      )}
      {...props}
    />
  );
}
