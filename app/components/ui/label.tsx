import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "~/lib/utils";

/**
 * Props for the Label component
 */
export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  /** Custom className */
  className?: string;
}

/**
 * Label - Form label component
 *
 * A styled label component built on Radix UI for form fields.
 *
 * Features:
 * - Automatic association with form controls
 * - Disabled state styling
 * - Flexible layout with gap support
 * - Non-selectable text for better UX
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Semantic label element
 * - Proper disabled state handling
 * - Works with peer-disabled utilities
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 */
export function Label({
  className,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
