import * as React from "react";

import { cn } from "~/lib/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Card component
 */
export interface CardProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardHeader component
 */
export interface CardHeaderProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardTitle component
 */
export interface CardTitleProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardDescription component
 */
export interface CardDescriptionProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardAction component
 */
export interface CardActionProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardContent component
 */
export interface CardContentProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the CardFooter component
 */
export interface CardFooterProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Card - Container component for grouped content
 *
 * A versatile card component with multiple sub-components for flexible layouts.
 * Uses container queries for responsive internal layouts.
 *
 * Features:
 * - Flexible gap-based layout (6 spacing units)
 * - Border and shadow for depth
 * - Rounded corners for modern aesthetic
 * - Sub-components for structured content
 *
 * Sub-components:
 * - `CardHeader`: Header section with grid layout support
 * - `CardTitle`: Title text with semibold weight
 * - `CardDescription`: Muted description text
 * - `CardAction`: Action buttons aligned to header
 * - `CardContent`: Main content area with padding
 * - `CardFooter`: Footer section with flex layout
 *
 * Accessibility:
 * - Semantic HTML structure
 * - WCAG 2.1 AA compliant colors
 * - Clear visual hierarchy
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here</CardDescription>
 *     <CardAction>
 *       <Button>Action</Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Main card content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Footer Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

/**
 * CardHeader - Header section for Card
 *
 * Grid-based layout supporting title, description, and action buttons.
 * Uses container queries for responsive behavior.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardDescription>Description</CardDescription>
 * </CardHeader>
 * ```
 */
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

/**
 * CardTitle - Title text for Card
 *
 * @example
 * ```tsx
 * <CardTitle>My Card Title</CardTitle>
 * ```
 */
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * CardDescription - Description text for Card
 *
 * @example
 * ```tsx
 * <CardDescription>Card description text</CardDescription>
 * ```
 */
export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * CardAction - Action button section for CardHeader
 *
 * Positioned in the top-right of the header using grid.
 *
 * @example
 * ```tsx
 * <CardAction>
 *   <Button size="sm">Edit</Button>
 * </CardAction>
 * ```
 */
export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

/**
 * CardContent - Main content section for Card
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Main content goes here</p>
 * </CardContent>
 * ```
 */
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

/**
 * CardFooter - Footer section for Card
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Submit</Button>
 * </CardFooter>
 * ```
 */
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}
