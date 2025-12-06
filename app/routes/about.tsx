import type { Route } from "./+types/about";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { CallToAction } from "~/components/layout/call-to-action";
import { Footer } from "~/components/layout/footer/footer";
import { AboutContent } from "~/components/layout/about/about-content";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import type { MethodItem } from "~/components/layout/about";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "À propos - Pauline Roussel | Doula et Professeure de Yoga",
    },
    {
      name: "description",
      content:
        "Découvrez Pauline Roussel, doula et professeure de yoga spécialisée en périnatal. Son parcours, sa philosophie et ses inspirations pour un accompagnement holistique et bienveillant.",
    },
    {
      name: "keywords",
      content:
        "Pauline Roussel, doula, professeure de yoga, à propos, parcours, formation, yoga prénatal, yoga postnatal, accompagnement périnatal",
    },
  ];
}

export default function AboutPage() {
  // Custom inspirations using the same pattern as method items
  const inspirationItems: MethodItem[] = [
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

  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - "Pauline Roussel" */}
        <Hero
          variant="default"
          title="Pauline Roussel"
          subtitle="DOULA ET PROFESSEURE DE YOGA"
        />

        {/* About Section - À propos de moi with custom content */}
        <Section background="white" spacing="normal">
          <Container size="xl" className="px-4 sm:px-6 lg:px-8">
            <AboutContentWithSections />
          </Container>
        </Section>

        {/* Inspirations Section - Mes inspirations using method pattern */}
        <Section background="gris" spacing="normal">
          <Container size="xl" className="px-4 sm:px-6 lg:px-8">
            <InspirationsSection items={inspirationItems} />
          </Container>
        </Section>

        {/* Call-to-Action Section */}
        <CallToAction
          title="Un accompagnement rempli de douceur et bienveillance"
          subtitle="Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin."
          buttonText="RÉSERVEZ UN APPEL DÉCOUVERTE"
          buttonHref="/contact"
          spacing="compact"
        />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}

/**
 * AboutContentWithSections - Extends AboutContent pattern for the About page
 * Uses the same layout as AboutContent but with multiple subsections
 */
function AboutContentWithSections() {
  return (
    <section className="space-y-8 sm:space-y-10 lg:space-y-12" lang="fr" aria-labelledby="about-section-heading">
      {/* Section Title */}
      <h2
        id="about-section-heading"
        className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-center leading-tight"
      >
        À propos de moi
      </h2>

      {/* Two-column layout: Text (left) + Photo (right) - same pattern as AboutContent */}
      <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-3">
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

        {/* Right Column - Photo (1/3 on desktop) - same pattern as AboutContent */}
        <div className="lg:col-span-1">
          <figure
            className="w-full aspect-[4/5] rounded-2xl bg-primary flex items-end justify-start transition-colors duration-200 p-6 min-h-[350px] sm:min-h-[450px] lg:min-h-0"
            role="img"
            aria-labelledby="pauline-photo-caption"
            aria-describedby="pauline-photo-description"
          >
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

/**
 * InspirationsSection - Uses the same pattern as the About component's method section
 * for consistency across the site
 */
function InspirationsSection({ items }: { items: MethodItem[] }) {
  return (
    <section
      className="space-y-8 sm:space-y-10 lg:space-y-12"
      lang="fr"
      aria-labelledby="inspirations-heading"
    >
      {/* Section Title */}
      <h2
        id="inspirations-heading"
        className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-center leading-tight"
      >
        Mes inspirations
      </h2>

      {/* Grid of Inspiration Cards - using same pattern as method section */}
      <div
        className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <article
              className="space-y-3 sm:space-y-4"
              lang="fr"
              aria-labelledby={`inspiration-${item.id}-title`}
            >
              {/* Card Title - using accent font like in mockup */}
              <h3
                id={`inspiration-${item.id}-title`}
                className="font-accent text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight"
              >
                {item.title}
              </h3>

              {/* Card Description */}
              <p
                className="font-sans text-base sm:text-lg text-primary leading-relaxed"
                aria-describedby={`inspiration-${item.id}-title`}
              >
                {item.description}
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
