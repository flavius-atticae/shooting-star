import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

/**
 * Button variant styles using class-variance-authority
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent/50 active:bg-accent/95 rounded-full text-base font-medium transition-all duration-200 min-h-[48px]",
        "service-card":
          "bg-white text-primary hover:bg-white/90 focus-visible:ring-white/50 active:bg-white/95 rounded-full text-base font-medium transition-all duration-200 min-h-[48px]",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3", // 44px - WCAG 2.1 AA minimum
        sm: "h-11 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", // 44px - WCAG 2.1 AA minimum
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4", // 48px - comfortable/pregnancy-safe
        cta: "px-8 py-3 has-[>svg]:px-6",
        icon: "size-12", // 48px - optimal for pregnancy-safe touch targets
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as child component using Radix UI Slot */
  asChild?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Button - Interactive button component
 *
 * A versatile button component with multiple variants and sizes.
 * Built with Radix UI Slot for composition and class-variance-authority for variants.
 *
 * Features:
 * - Multiple style variants (default, destructive, outline, ghost, link, CTA)
 * - Multiple sizes (sm, default, lg, icon, cta)
 * - Slot composition for rendering as any element
 * - SVG icon support with automatic sizing
 * - Full keyboard and focus management
 *
 * Variants:
 * - `default`: Primary brand button with shadow
 * - `destructive`: Warning/danger actions
 * - `outline`: Secondary actions with border
 * - `secondary`: Alternative secondary style
 * - `ghost`: Minimal button for tertiary actions
 * - `link`: Link-styled button
 * - `cta`: Call-to-action with rounded-full shape (48px height)
 * - `service-card`: White button for service cards
 *
 * Sizes:
 * - `sm` / `default`: 44px height (WCAG 2.1 AA minimum)
 * - `lg`: 48px height (pregnancy-safe comfortable size)
 * - `icon`: 48x48px for icon-only buttons
 * - `cta`: Custom padding for call-to-action buttons
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant touch targets (minimum 44x44px)
 * - Clear focus indicators with ring
 * - Disabled state with proper cursor and opacity
 * - Invalid state support with aria-invalid
 * - SVG icons are pointer-events-none for better click handling
 *
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * <Button variant="destructive" size="lg">Delete</Button>
 * <Button variant="cta" asChild>
 *   <a href="/contact">Contact Us</a>
 * </Button>
 * ```
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
