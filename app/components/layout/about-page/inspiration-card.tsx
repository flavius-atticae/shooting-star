import * as React from "react";
import { cn } from "~/lib/utils";

export interface InspirationCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Unique identifier for the inspiration */
  id: string;
  /** Card title - displayed in script/cursive font */
  title: string;
  /** Card description - displayed in Barlow font */
  description: string;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * InspirationCard Component - Carte d'inspiration pregnancy-safe
 *
 * Conçu spécifiquement pour la page À propos avec :
 * - Titre en police Moontime (script/cursive)
 * - Description en Barlow
 * - Couleur de texte principale (#618462)
 * - Layout simple et épuré
 * - Accessibilité WCAG 2.1 AA
 *
 * Usage:
 * ```tsx
 * <InspirationCard
 *   id="holistique"
 *   title="Holistique"
 *   description="Ma méthode considère la Femme..."
 * />
 * ```
 */
export function InspirationCard({
  id,
  title,
  description,
  className,
  ...props
}: InspirationCardProps) {
  return (
    <article
      className={cn("space-y-3 sm:space-y-4", className)}
      lang="fr"
      aria-labelledby={`inspiration-${id}-title`}
      {...props}
    >
      {/* Card Title - Moontime font (script/cursive) */}
      <h3
        id={`inspiration-${id}-title`}
        className="font-accent text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight"
      >
        {title}
      </h3>

      {/* Card Description - Barlow font */}
      <p
        className="font-sans text-base sm:text-lg text-primary leading-relaxed"
        aria-describedby={`inspiration-${id}-title`}
      >
        {description}
      </p>
    </article>
  );
}
