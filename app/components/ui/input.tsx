import * as React from "react";

import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Input component
 */
export interface InputProps extends React.ComponentProps<"input"> {
  /** Input type */
  type?: React.HTMLInputTypeAttribute;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Input - Form input field component
 *
 * A styled input field with comprehensive form states and accessibility features.
 *
 * Features:
 * - Multiple input types support (text, email, password, file, etc.)
 * - Focus and validation states
 * - Dark mode support
 * - File input styling
 * - Responsive text sizing
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Clear focus indicators with ring
 * - Invalid state with aria-invalid
 * - Disabled state with proper cursor
 * - High contrast placeholders
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="your@email.com" />
 * <Input type="text" aria-invalid={true} />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          // Base styling
          "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1",
          "text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
          // Placeholder and selection styling
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          // File input styling
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent",
          "file:text-sm file:font-medium",
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
);

Input.displayName = "Input";
