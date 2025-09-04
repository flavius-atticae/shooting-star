import * as React from "react";
import { cn } from "~/lib/utils";
import { MethodColumn } from "./method-column";
import { type MethodItem } from "./about-section";

export interface MethodSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of method items to display */
  items: MethodItem[];
  /** Section title - "Ma méthode" by default */
  title?: string;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Method Section Component - Section "Ma méthode" 
 * 
 * Layout 3 colonnes égales avec séparateurs verticaux :
 * - Titre "Ma méthode" en The Seasons font
 * - 3 colonnes égales avec MethodColumn components
 * - Séparateurs verticaux bleus entre colonnes (desktop seulement)
 * - Layout responsive : stack vertical sur mobile
 * 
 * Features pregnancy-safe :
 * - Couleurs apaisantes (#517982)
 * - Séparateurs subtils pour structure visuelle
 * - Espacement généreux pour confort
 * - Layout adaptatif mobile/desktop
 * 
 * Usage:
 * ```tsx
 * <MethodSection 
 *   items={[
 *     { id: "ecoute", title: "Écoute", description: "..." },
 *     { id: "bienveillance", title: "Bienveillance", description: "..." },
 *     { id: "adaptation", title: "Adaptation", description: "..." }
 *   ]} 
 * />
 * ```
 */
export function MethodSection({
  items,
  title = "Ma méthode",
  className,
  ...props
}: MethodSectionProps) {
  return (
    <section
      className={cn("space-y-8 sm:space-y-10 lg:space-y-12", className)}
      lang="fr"
      aria-labelledby="method-heading"
      {...props}
    >
      {/* Section Title */}
      <h2 
        id="method-heading"
        className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-secondary text-left leading-tight"
      >
        {title}
      </h2>
      
      {/* Method Columns Grid */}
      <div 
        className={cn(
          "grid gap-8 sm:gap-10 lg:gap-0",
          // Responsive grid layout
          "grid-cols-1",                    // Mobile: 1 column (stacked)
          "lg:grid-cols-3",                 // Desktop: 3 columns
          // Desktop layout with separators
          "lg:divide-x lg:divide-secondary/20"
        )}
        role="list"
        aria-labelledby="method-heading"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              // Desktop padding for separator spacing
              "lg:px-8",
              // First column: no left padding
              index === 0 && "lg:pl-0",
              // Last column: no right padding  
              index === items.length - 1 && "lg:pr-0"
            )}
            role="listitem"
          >
            <MethodColumn item={item} />
          </div>
        ))}
      </div>
      
      {/* Empty state - for development/debugging */}
      {items.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <p className="text-secondary/60 text-lg font-sans">
            Aucune méthode à afficher pour le moment.
          </p>
        </div>
      )}
    </section>
  );
}