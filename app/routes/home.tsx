import type { Route } from "./+types/home";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { CallToAction } from "~/components/layout/call-to-action";
import { Services } from "~/components/layout/services";
import { About } from "~/components/layout/about";
import { Footer } from "~/components/layout/footer/footer";
import { getHomeContent } from "~/lib/content.server";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Pauline Roussel - Yoga Prénatal & Accompagnement à la Naissance",
    },
    {
      name: "description",
      content:
        "Accompagnement holistique pour les femmes enceintes : yoga prénatal, doula, consultations bien-être et mama blessings. Spécialiste en maternité et naissance respectée.",
    },
    {
      name: "keywords",
      content:
        "yoga prénatal, doula, accompagnement naissance, maternité, grossesse, postnatal, mama blessing, bien-être femme enceinte",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - "Épanouir sa féminité" */}
        <Hero
          variant="default"
          title={"Épanouir\nsa féminité"}
          subtitle="Avec Pauline Roussel"
        />

        {/* CTA Section - Placement stratégique après Hero */}
        <CallToAction
          title="Réservez votre accompagnement"
          subtitle="Ensemble, créons l'espace dont vous avez besoin"
          buttonText="Contactez-moi"
          buttonHref="/contact"
          spacing="compact"
        />

        {/* Services Section - Doula, Yoga, Féminin */}
        <Services services={getHomeContent().services} containerSize="xl" />

        {/* About Section - Présentation + Méthode (overlaps Footer on tablet+) */}
        <About spacing="none" containerSize="xl" overlapNext="sm" />
      </main>

      {/* Footer - Navigation et contact (compensates for About overlap) */}
      <Footer hasOverlap="sm" />
    </>
  );
}
