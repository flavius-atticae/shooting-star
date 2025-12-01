import * as React from "react";
import { cn } from "~/lib/utils";

export interface AboutContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className for additional styling */
  className?: string;
  /** Optional custom about text content */
  content?: string;
  /** Optional accessibility label for the image placeholder */
  imageAlt?: string;
}

/**
 * About Content Component - Contenu de la section À propos
 *
 * Layout en 2 colonnes responsive :
 * - Colonne gauche (2/3) : Titre "À propos" + texte descriptif
 * - Colonne droite (1/3) : Placeholder bleu pour future photo
 *
 * Features pregnancy-safe :
 * - Couleur de texte secondaire (#3d5a62) apaisante
 * - Typography Ivyora Display pour titre + Barlow pour contenu
 * - Layout responsive qui stack verticalement sur mobile
 * - Placeholder photo avec coins arrondis et couleur douce
 *
 * Usage:
 * ```tsx
 * <AboutContent />
 * <AboutContent content="Texte personnalisé..." />
 * ```
 */
export function AboutContent({
  className,
  content,
  imageAlt = "Photo de Pauline Roussel - À venir",
  ...props
}: AboutContentProps) {
  const defaultContent =
    "Je suis Pauline, femme, maman, doula, professeure de yoga et grande curieuse du vivant. Depuis toujours, j'apprends et je cherche à comprendre pour mieux accompagner. Mon parcours m'a guidé, du monde de la danse et du mouvement vers l'univers du féminin, de la maternité, de la transformation. Je suis profondément touchée par la puissance, la complexité et la beauté des femmes. Douce et bienveillante, je vous accompagne avec respect, écoute et sensibilité, dans toutes les transitions de la vie.";

  return (
    <div
      className={cn(
        "grid gap-6 sm:gap-8 lg:gap-12",
        // Responsive grid layout
        "grid-cols-1", // Mobile: 1 column (stacked)
        "lg:grid-cols-3", // Desktop: 3 columns (2+1)
        className
      )}
      lang="fr"
      {...props}
    >
      {/* Text Content - Takes first 2 columns on desktop */}
      <div className="lg:col-span-2">
        {/* Title */}
        <h2
          className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-secondary text-left leading-tight mb-6 sm:mb-8"
          id="about-heading"
        >
          À propos
        </h2>

        {/* Content Text */}
        <div className="space-y-4 sm:space-y-6" aria-labelledby="about-heading">
          <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed">
            {content || defaultContent}
          </p>
        </div>
      </div>

      {/* Image Placeholder - Takes 3rd column on desktop (aligns with method section separators) */}
      <div className="lg:col-span-1">
        <figure
          className={cn(
            "w-full aspect-[4/5] rounded-2xl",
            "bg-secondary",
            "flex items-end justify-start",
            "transition-colors duration-200",
            "p-6",
            // Ensure minimum height on mobile
            "min-h-[350px] sm:min-h-[450px] lg:min-h-0"
          )}
          role="img"
          aria-labelledby="image-placeholder-caption"
          aria-describedby="image-placeholder-description"
        >
          {/* Text content in bottom left */}
          <div className="text-left">
            <div
              className="font-sans font-bold text-white text-lg sm:text-xl"
              id="image-placeholder-caption"
            >
              Pauline Roussel
            </div>
            <div className="font-sans font-normal text-white text-sm sm:text-base">
              Doula et professeure de yoga
            </div>
          </div>

          {/* Hidden description for accessibility */}
          <div id="image-placeholder-description" className="sr-only">
            Emplacement réservé pour la photo de Pauline Roussel, instructrice
            de yoga périnatal et doula. Photo prochainement disponible.
          </div>
        </figure>
      </div>
    </div>
  );
}
