import * as React from "react";
import { cn } from "~/lib/utils";

export interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Custom className for additional styling */
  className?: string;
}

/**
 * AboutSection Component - Section "À propos de moi" avec layout deux colonnes
 *
 * Conçu spécifiquement pour la page À propos avec :
 * - Layout deux colonnes sur desktop (texte à gauche, photo à droite)
 * - Layout empilé sur mobile (texte puis photo)
 * - Quatre sous-sections : Qui suis-je?, Mon parcours, Ce qui m'inspire, Ma méthode
 * - Photo de Pauline avec légende
 * - Couleur de texte principale (#618462)
 * - Typography Ivyora Display pour titres + Barlow pour contenu
 * - Accessibilité WCAG 2.1 AA
 *
 * Usage:
 * ```tsx
 * <AboutSection />
 * ```
 */
export function AboutSection({ className, ...props }: AboutSectionProps) {
  return (
    <section
      className={cn("space-y-8 sm:space-y-10 lg:space-y-12", className)}
      lang="fr"
      aria-labelledby="about-section-heading"
      {...props}
    >
      {/* Section Title */}
      <h2
        id="about-section-heading"
        className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-center leading-tight"
      >
        À propos de moi
      </h2>

      {/* Two-column layout: Text (left) + Photo (right) */}
      <div
        className={cn(
          "grid gap-8 sm:gap-10 lg:gap-12",
          // Responsive grid layout
          "grid-cols-1", // Mobile: 1 column (stacked)
          "lg:grid-cols-3" // Desktop: 3 columns (2+1)
        )}
      >
        {/* Left Column - Text Content (2/3 on desktop) */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10">
          {/* Qui suis-je? */}
          <article className="space-y-4" aria-labelledby="qui-suis-je-title">
            <h3
              id="qui-suis-je-title"
              className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight"
            >
              Qui suis-je?
            </h3>
            <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
              Curieuse et ouverte, j'aime apprendre encore et encore pour mieux
              servir. Passionnée par la Femme, sa complexité et les multiples
              rites de passage qui jalonnent sa vie, je me nourris de toutes
              celles que je rencontre et de leurs innombrables facettes. Maman
              d'une petite fille, j'ai découvert à travers ma propre maternité
              la puissance et la vulnérabilité de ces transitions, et le besoin
              vital de revenir à soi pour retrouver équilibre et énergie. On dit
              de moi que je suis douce et bienveillante – deux qualités qui
              m'accompagnent dans ma mission.
            </p>
          </article>

          {/* Mon parcours */}
          <article className="space-y-4" aria-labelledby="mon-parcours-title">
            <h3
              id="mon-parcours-title"
              className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight"
            >
              Mon parcours
            </h3>
            <div className="space-y-4">
              <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
                Danseuse classique et contemporaine de formation, le mouvement a
                toujours été mon langage. Après avoir exploré le fitness et
                l'entraînement, c'est le yoga qui m'a permis de ralentir, de
                relier le corps, le mental et l'émotionnel. J'ai alors senti
                l'élan de partager cette pratique, d'en faire un outil
                holistique de soin et d'expression. Ma fascination pour le
                féminin, enrichie par ma propre maternité, m'a naturellement
                conduite vers le yoga pré- et postnatal, puis vers le yoga de la
                femme, un espace pour se reconnecter à son énergie féminine, à
                ses cycles et à son identité profonde.
              </p>
              <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
                Devenir doula s'est imposé comme la suite logique : soutenir les
                parents dans leur cheminement, les outiller et leur offrir une
                présence rassurante et humaine pour accueillir bébé avec
                confiance et sérénité.
              </p>
            </div>
          </article>

          {/* Ce qui m'inspire */}
          <article
            className="space-y-4"
            aria-labelledby="ce-qui-inspire-title"
          >
            <h3
              id="ce-qui-inspire-title"
              className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight"
            >
              Ce qui m'inspire
            </h3>
            <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
              La puissance et la résilience des femmes. La nature et ses cycles.
              La capacité du corps humain à traverser, s'adapter et rayonner.
              J'entretiens cette inspiration en me formant sans cesse, en
              travaillant main dans la main avec des professionnelles de
              confiance, et en me laissant toucher par les retours des personnes
              que j'accompagne – véritables preuves que cette démarche a un
              impact réel et profond.
            </p>
          </article>

          {/* Ma méthode */}
          <article className="space-y-4" aria-labelledby="ma-methode-title">
            <h3
              id="ma-methode-title"
              className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight"
            >
              Ma méthode
            </h3>
            <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
              Holistique et personnalisée, ancrée dans le respect et l'écoute.
              Je propose un accompagnement qui invite les femmes à se révéler, à
              s'écouter et à s'épanouir. C'est un chemin d'ancrage et de
              rayonnement, où l'on se sent soutenue, entourée et pleinement
              honorée.
            </p>
          </article>
        </div>

        {/* Right Column - Photo (1/3 on desktop) */}
        <div className="lg:col-span-1">
          <figure
            className={cn(
              "w-full aspect-[4/5] rounded-2xl",
              "bg-primary",
              "flex items-end justify-start",
              "transition-colors duration-200",
              "p-6",
              // Ensure minimum height on mobile
              "min-h-[350px] sm:min-h-[450px] lg:min-h-0"
            )}
            role="img"
            aria-labelledby="pauline-photo-caption"
            aria-describedby="pauline-photo-description"
          >
            {/* Caption text in bottom left */}
            <figcaption className="text-left">
              <div
                className="font-sans font-bold text-white text-lg sm:text-xl"
                id="pauline-photo-caption"
              >
                Pauline Roussel
              </div>
              <div className="font-sans font-normal text-white text-sm sm:text-base">
                Doula et professeure de yoga
              </div>
            </figcaption>

            {/* Hidden description for accessibility */}
            <div id="pauline-photo-description" className="sr-only">
              Photo de Pauline Roussel, doula et professeure de yoga spécialisée
              en périnatal et accompagnement de la femme.
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
