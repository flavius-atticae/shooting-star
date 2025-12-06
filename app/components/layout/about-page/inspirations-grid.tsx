import * as React from "react";
import { cn } from "~/lib/utils";
import { InspirationCard } from "./inspiration-card";
import type { InspirationCardProps } from "./inspiration-card";

export interface InspirationsGridProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Array of inspiration items to display */
  inspirations?: Omit<InspirationCardProps, "className">[];
  /** Custom className for additional styling */
  className?: string;
}

/**
 * InspirationsGrid Component - Grille des inspirations
 *
 * Affiche une grille responsive de 3 cartes d'inspiration :
 * - Mobile : 1 colonne empilée
 * - Tablet : 2 colonnes
 * - Desktop : 3 colonnes
 *
 * Features pregnancy-safe :
 * - Espacement généreux entre les cartes
 * - Layout responsive adaptatif
 * - Accessibilité WCAG 2.1 AA
 *
 * Usage:
 * ```tsx
 * <InspirationsGrid />
 * <InspirationsGrid inspirations={customInspirations} />
 * ```
 */
export function InspirationsGrid({
  inspirations,
  className,
  ...props
}: InspirationsGridProps) {
  const defaultInspirations: Omit<InspirationCardProps, "className">[] = [
    {
      id: "holistique",
      title: "Holistique",
      description:
        "Ma méthode considère la Femme dans sa globalité : corps, mental, émotions et énergie. Chaque pratique et chaque accompagnement vise à favoriser l'équilibre, l'ancrage et le rayonnement de ton énergie féminine.",
    },
    {
      id: "bienveillante",
      title: "Bienveillante",
      description:
        "Je crée un espace doux, sécurisant et empathique, où tu peux t'écouter, te révéler et t'épanouir en toute confiance, portée par une guidance attentive et réconfortante.",
    },
    {
      id: "engagee",
      title: "Engagée",
      description:
        "Je m'implique pleinement pour t'accompagner à chaque étape, avec des outils, des pratiques et une présence soutenante qui respectent ton parcours et tes besoins uniques.",
    },
  ];

  const items = inspirations || defaultInspirations;

  return (
    <section
      className={cn("space-y-8 sm:space-y-10 lg:space-y-12", className)}
      lang="fr"
      aria-labelledby="inspirations-heading"
      {...props}
    >
      {/* Section Title */}
      <h2
        id="inspirations-heading"
        className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-center leading-tight"
      >
        Mes inspirations
      </h2>

      {/* Grid of Inspiration Cards */}
      <div
        className={cn(
          "grid gap-8 sm:gap-10 lg:gap-12",
          // Responsive grid layout
          "grid-cols-1", // Mobile: 1 column (stacked)
          "md:grid-cols-2", // Tablet: 2 columns
          "lg:grid-cols-3" // Desktop: 3 columns
        )}
        role="list"
        aria-labelledby="inspirations-heading"
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <InspirationCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}
