import * as React from "react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { AboutContent } from "./about-content";
import { MethodSection } from "./method-section";

export interface AboutSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
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

export interface MethodItem {
  /** Unique identifier for the method item */
  id: string;
  /** Method title - displayed in The Seasons font */
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
 * - Typography pregnancy-safe (The Seasons + Barlow)
 * - Grid responsive adaptable mobile/desktop
 * - Accessibilité WCAG 2.1 AA
 * 
 * Structure :
 * - Rangée 1 : Texte À propos (2/3) + Photo placeholder (1/3)
 * - Rangée 2 : Ma méthode en 3 colonnes avec séparateurs
 * 
 * Usage:
 * ```tsx
 * <AboutSection />
 * ```
 */
export function AboutSection({
  spacing = 'normal',
  containerSize = 'lg',
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: AboutSectionProps) {
  // Contenu par défaut pour la méthode
  const defaultMethodItems: MethodItem[] = [
    {
      id: "ecoute",
      title: "Écoute",
      description: "Une attention particulière portée à vos besoins, à votre rythme et à votre vécu unique."
    },
    {
      id: "bienveillance",
      title: "Bienveillance",
      description: "Un accompagnement respectueux et sans jugement, dans la douceur et la confiance."
    },
    {
      id: "adaptation",
      title: "Adaptation",
      description: "Des pratiques personnalisées selon votre état, vos capacités et vos envies du moment."
    }
  ];

  return (
    <Section
      background="transparent"
      spacing={spacing}
      className={cn("px-6 sm:px-8 lg:px-12", className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      lang="fr"
      {...props}
    >
      <Container size={containerSize}>
        {/* Container avec background gris et bords arrondis */}
        <div className="bg-gris rounded-2xl p-8 sm:p-10 lg:p-12">
          {/* Row 1: About Content */}
          <AboutContent />
          
          {/* Row 2: Method Section */}
          <MethodSection 
            items={defaultMethodItems}
            className="mt-12 sm:mt-16 lg:mt-20"
          />
        </div>
      </Container>
    </Section>
  );
}