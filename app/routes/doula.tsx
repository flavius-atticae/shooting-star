import type { Route } from "./+types/doula";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Accompagnement de doula - Pauline Roussel",
    },
    {
      name: "description",
      content:
        "Accompagnement personnalisé par une doula certifiée. Soutien émotionnel et physique durant la grossesse, l'accouchement et le postnatal.",
    },
    {
      name: "keywords",
      content:
        "doula, accompagnement naissance, grossesse, accouchement, postnatal, soutien périnatal, doula Québec",
    },
  ];
}

export default function DoulaPage() {
  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - Accompagnement de doula */}
        <Hero
          variant="default"
          title="Accompagnement de doula"
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/* ApproachSection - Mon approche */}
        {/* TODO: Add ApproachSection component when available */}

        {/* Services - À la carte */}
        {/* TODO: Add Services component for doula offerings */}

        {/* CallToAction - Réservez un appel découverte */}
        {/* TODO: Add CallToAction component */}

        {/* TestimonialsCarousel - Témoignages */}
        {/* TODO: Add TestimonialsCarousel component */}
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
