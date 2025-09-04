import * as React from "react";
import { cn } from "~/lib/utils";
import { type MethodItem } from "./about-section";

export interface MethodColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Method item data */
  item: MethodItem;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Method Column Component - Colonne individuelle de méthode
 * 
 * Représente une colonne unique dans la section "Ma méthode" :
 * - Titre en The Seasons font, couleur secondaire
 * - Description en Barlow font, couleur secondaire
 * - Espacement vertical optimisé
 * - Design pregnancy-safe avec couleurs apaisantes
 * 
 * Features :
 * - Typography hiérarchisée pour lisibilité
 * - Couleurs pregnancy-safe (#517982)
 * - Espacement généreux pour confort de lecture
 * - Structure sémantique pour accessibilité
 * 
 * Usage:
 * ```tsx
 * <MethodColumn 
 *   item={{
 *     id: "ecoute",
 *     title: "Écoute", 
 *     description: "Une attention particulière..."
 *   }} 
 * />
 * ```
 */
export function MethodColumn({
  item,
  className,
  ...props
}: MethodColumnProps) {
  return (
    <article
      className={cn(
        "space-y-3 sm:space-y-4",
        className
      )}
      lang="fr"
      aria-labelledby={`method-${item.id}-title`}
      {...props}
    >
      {/* Method Title */}
      <h3 
        id={`method-${item.id}-title`}
        className="font-heading font-bold text-xl sm:text-2xl text-secondary leading-tight"
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
  );
}