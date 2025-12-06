import * as React from "react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { AboutContent } from "./about-content";

export interface AboutProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Custom section spacing override */
  spacing?: "none" | "compact" | "normal" | "spacious";
  /** Custom container size */
  containerSize?: "sm" | "md" | "lg" | "xl";
  /**
   * Overlap amount to extend over the next section (typically Footer)
   * Creates a floating effect with the rounded corners visible above Footer
   * - "none": No overlap (default)
   * - "sm": Small overlap (32px mobile, 48px desktop)
   * - "md": Medium overlap (48px mobile, 64px desktop)
   * - "lg": Large overlap (64px mobile, 80px desktop)
   * - "responsive": Only applies on tablet+ (no overlap on mobile)
   */
  overlapNext?: "none" | "sm" | "md" | "lg" | "responsive";
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export interface MethodItem {
  /** Unique identifier for the method item */
  id: string;
  /** Method title - displayed in Ivyora Display font */
  title: string;
  /** Method description - displayed in Barlow font */
  description: string;
}

/**
 * About Section Component - Section À propos pregnancy-safe
 *
 * Conçu spécifiquement pour le site de Pauline Roussel avec :
 * - Fond gris clair (#f5f4f2) pour douceur visuelle
 * - Couleur de texte secondaire (#517982) pour confort de lecture
 * - Layout 2 rangées : About content + Method section
 * - Typography pregnancy-safe (Ivyora Display + Barlow)
 * - Grid responsive adaptable mobile/desktop
 * - Accessibilité WCAG 2.1 AA
 *
 * Structure :
 * - Rangée 1 : Texte À propos (2/3) + Photo placeholder (1/3)
 * - Rangée 2 : Ma méthode en 3 colonnes avec séparateurs
 *
 * Usage:
 * ```tsx
 * <About />
 * ```
 */
// Overlap class mapping for negative margin effect
const overlapClasses = {
  none: "",
  sm: "-mb-8 md:-mb-12 relative z-10",
  md: "-mb-12 md:-mb-16 relative z-10",
  lg: "-mb-16 md:-mb-20 relative z-10",
  responsive: "md:-mb-16 relative z-10", // Only applies on tablet+
} as const;

export function About({
  spacing = "compact",
  containerSize = "xl",
  overlapNext = "none",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: AboutProps) {
  // Contenu par défaut pour la méthode
  const defaultMethodItems: MethodItem[] = [
    {
      id: "ecoute",
      title: "Écoute",
      description:
        "Une attention particulière portée à vos besoins, à votre rythme et à votre vécu unique.",
    },
    {
      id: "bienveillance",
      title: "Bienveillance",
      description:
        "Un accompagnement respectueux et sans jugement, dans la douceur et la confiance.",
    },
    {
      id: "adaptation",
      title: "Adaptation",
      description:
        "Des pratiques personnalisées selon votre état, vos capacités et vos envies du moment.",
    },
  ];

  return (
    <Section
      background="accent"
      spacing={spacing}
      insetY="sm"
      rounded="md"
      className={cn(overlapClasses[overlapNext], className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      lang="fr"
      {...props}
    >
      <Container size={containerSize}>
        {/* Container avec background gris et bords arrondis */}
        <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
          {/* Row 1: About Content */}
          <AboutContent />

          {/* Row 2: Method Section - Integrated directly */}
          <section
            className="space-y-8 sm:space-y-10 lg:space-y-12 mt-12 sm:mt-16 lg:mt-20"
            lang="fr"
            aria-labelledby="method-heading"
          >
            {/* Section Title */}
            <h2
              id="method-heading"
              className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-secondary text-left leading-tight"
            >
              Ma méthode
            </h2>

            {/* Method Columns Grid */}
            <div
              className={cn(
                "grid gap-8 sm:gap-10 lg:gap-0",
                // Responsive grid layout
                "grid-cols-1", // Mobile: 1 column (stacked)
                "lg:grid-cols-3", // Desktop: 3 columns
                // Desktop layout with separators
                "lg:divide-x lg:divide-secondary/20"
              )}
              role="list"
              aria-labelledby="method-heading"
            >
              {defaultMethodItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    // Desktop padding for separator spacing
                    "lg:px-8",
                    // First column: no left padding
                    index === 0 && "lg:pl-0",
                    // Last column: no right padding
                    index === defaultMethodItems.length - 1 && "lg:pr-0"
                  )}
                  role="listitem"
                >
                  {/* Method Column - Inline */}
                  <article
                    className="space-y-3 sm:space-y-4"
                    lang="fr"
                    aria-labelledby={`method-${item.id}-title`}
                  >
                    {/* Method Title */}
                    <h3
                      id={`method-${item.id}-title`}
                      className="font-heading font-medium text-2xl sm:text-4xl text-secondary leading-tight"
                    >
                      {item.title}
                    </h3>

                    {/* Method Description */}
                    <p
                      className="font-sans text-base sm:text-lg text-secondary leading-relaxed"
                      aria-describedby={`method-${item.id}-title`}
                    >
                      {item.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </Section>
  );
}
