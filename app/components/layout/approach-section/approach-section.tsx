import * as React from "react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";

export interface ApproachItem {
  /** Unique identifier for the approach item */
  id: string;
  /** Decorative title - displayed in cursive/script font (Moontime) */
  title: string;
  /** Description paragraph - displayed in Barlow font */
  description: string;
}

export interface ApproachSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Section title - "Mon approche" by default */
  title?: string;
  /** Array of approach items to display */
  items: ApproachItem[];
  /** Custom section spacing override */
  spacing?: "none" | "compact" | "normal" | "spacious";
  /** Custom container size */
  containerSize?: "sm" | "md" | "lg" | "xl";
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * ApproachSection Component - Section "Mon approche" for doula page
 *
 * Designed specifically for Pauline Roussel's website with:
 * - Main title in Ivyora Display (dark green)
 * - Decorative titles in Moontime (cursive/script font)
 * - Descriptions in Barlow (justified or centered)
 * - 5 thematic subsections about the maternal journey
 * - Generous vertical spacing between subsections
 * - Responsive layout (mobile, tablet, desktop)
 * - WCAG 2.1 AA accessibility
 *
 * Usage:
 * ```tsx
 * <ApproachSection
 *   items={[
 *     {
 *       id: "pregnancy",
 *       title: "Pendant la grossesse",
 *       description: "Accompagnement douceur et écoute..."
 *     }
 *   ]}
 * />
 * ```
 */
export function ApproachSection({
  title = "Mon approche",
  items,
  spacing = "normal",
  containerSize = "lg",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ApproachSectionProps) {
  return (
    <Section
      background="transparent"
      spacing={spacing}
      className={className}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      lang="fr"
      {...props}
    >
      <Container size={containerSize} className="px-4 sm:px-6">
        {/* Main Section Title */}
        <h2
          id="approach-heading"
          className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-center leading-tight mb-12 sm:mb-16 lg:mb-20"
        >
          {title}
        </h2>

        {/* Approach Items */}
        <div
          className="space-y-12 sm:space-y-16 lg:space-y-20"
          role="list"
          aria-labelledby="approach-heading"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="space-y-4 sm:space-y-6"
              role="listitem"
              lang="fr"
              aria-labelledby={`approach-${item.id}-title`}
            >
              {/* Decorative Title - Cursive/Script font */}
              <h3
                id={`approach-${item.id}-title`}
                className="font-accent font-normal text-3xl sm:text-4xl lg:text-5xl text-secondary text-center leading-relaxed"
              >
                {item.title}
              </h3>

              {/* Description Paragraph */}
              <p
                className="font-sans text-base sm:text-lg text-neutral text-center max-w-3xl mx-auto leading-relaxed"
                aria-describedby={`approach-${item.id}-title`}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Empty state - for development/debugging */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral text-lg">
              Aucun élément d'approche à afficher pour le moment.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
