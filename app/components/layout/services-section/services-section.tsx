import * as React from "react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { ServiceCard, type ServiceItem } from "./service-card";

export interface ServicesSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Section title - "Mes services" by default */
  title?: string;
  /** Array of services to display */
  services: ServiceItem[];
  /** Custom section spacing override */
  spacing?: 'compact' | 'normal' | 'spacious';
  /** Custom container size */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * Services Section Component - Section des services pregnancy-safe
 * 
 * Conçu spécifiquement pour le site de Pauline Roussel avec :
 * - Fond transparent avec padding généreux
 * - Titre "Mes services" en vert avec The Seasons
 * - Grid responsive de cartes de service
 * - Layout adaptatif : 3 col desktop, 2 col tablet, 1 col mobile
 * - Cartes vertes avec boutons CTA blancs
 * - Accessibilité WCAG 2.1 AA
 * 
 * Usage:
 * ```tsx
 * <ServicesSection
 *   services={[
 *     {
 *       id: "yoga-prenatal",
 *       title: "Yoga prénatal",
 *       description: "Séances adaptées à chaque trimestre...",
 *       buttonText: "En savoir plus",
 *       buttonHref: "/services/yoga-prenatal"
 *     }
 *   ]}
 * />
 * ```
 */
export function ServicesSection({
  title = "Mes services",
  services,
  spacing = 'normal',
  containerSize = 'lg',
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ServicesSectionProps) {
  return (
    <Section
      background="transparent"
      spacing={spacing}
      className={className}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <Container size={containerSize}>
        {/* Section Title */}
        <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary text-left leading-tight mb-8 sm:mb-12">
          {title}
        </h1>
        
        {/* Services Grid */}
        <div className={cn(
          "grid gap-6 sm:gap-8",
          // Responsive grid layout
          "grid-cols-1",                    // Mobile: 1 column
          "md:grid-cols-2",                 // Tablet: 2 columns
          "lg:grid-cols-3",                 // Desktop: 3 columns
          // Ensure equal height cards
          "auto-rows-fr"
        )}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="h-full"
            />
          ))}
        </div>
        
        {/* Empty state - for development/debugging */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral text-lg">
              Aucun service à afficher pour le moment.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}

// Re-export ServiceItem type for convenience
export type { ServiceItem };