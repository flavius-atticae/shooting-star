import * as React from "react";

import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";

import type { BackgroundVariant, SpacingVariant } from "~/components/ui/section";

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the PageLayout component
 */
export interface PageLayoutProps {
  /** Content to render within the page */
  children: React.ReactNode;
  /** Background variant */
  background?: Extract<BackgroundVariant, "white" | "accent" | "soft">;
  /** Vertical spacing variant */
  spacing?: SpacingVariant;
  /** Enable container queries for responsive design */
  enableContainerQueries?: boolean;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * PageLayout - Full page wrapper component
 *
 * A complete page layout wrapper with configurable background, spacing, and container.
 * Ensures minimum full viewport height and provides consistent page structure.
 *
 * Features:
 * - Full viewport height (min-h-screen)
 * - Integrated Section and Container components
 * - Flexible background and spacing options
 * - Optional container queries support
 * - Responsive padding
 *
 * Background Options:
 * - `white`: Pure white background
 * - `accent`: Soft beige (gris)
 * - `soft`: Gradient from white to soft beige
 *
 * Spacing Options:
 * - `compact`: Minimal vertical padding
 * - `normal`: Standard vertical padding (default)
 * - `spacious`: Generous vertical padding
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy support
 * - Works with all standard page elements
 *
 * @example
 * ```tsx
 * <PageLayout background="white" spacing="normal">
 *   <h1>Page Title</h1>
 *   <p>Page content goes here</p>
 * </PageLayout>
 * ```
 */
export function PageLayout({
  children,
  background = "white",
  spacing = "normal",
  enableContainerQueries = false,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <Section
        background={background}
        spacing={spacing}
        className="min-h-screen flex flex-col"
      >
        <Container
          className={cn(
            "flex-1 flex flex-col px-4 sm:px-6 lg:px-8",
            enableContainerQueries && "@container"
          )}
        >
          {children}
        </Container>
      </Section>
    </div>
  );
}
