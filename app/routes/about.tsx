import type { Route } from "./+types/about";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { CallToAction } from "~/components/layout/call-to-action";
import { Footer } from "~/components/layout/footer/footer";
import { AboutSection } from "~/components/layout/about-page/about-section";
import { InspirationsGrid } from "~/components/layout/about-page/inspirations-grid";

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

export default function About() {
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

        {/* About Section - À propos de moi */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSection />
          </div>
        </section>

        {/* Inspirations Section - Mes inspirations */}
        <section className="bg-gris py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InspirationsGrid />
          </div>
        </section>

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
