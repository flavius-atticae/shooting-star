import type { Route } from "./+types/doula";
import { useLoaderData } from "react-router";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";
import { ApproachSection } from "~/components/layout/approach-section";
import { Services } from "~/components/layout/services";
import type { ServiceItem } from "~/components/layout/services";
import { CallToAction } from "~/components/layout/call-to-action";
import { TestimonialsCarousel } from "~/components/layout/testimonials-carousel";
import { getDoulaContent } from "~/lib/content.server";

export async function loader() {
  return {
    doulaContent: getDoulaContent(),
  };
}

export function meta(_args: Route.MetaArgs) {
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
  const { doulaContent } = useLoaderData<typeof loader>();
  const { services, testimonials, approachItems } = doulaContent;

  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - Accompagnement de doula */}
        <Hero
          variant="default"
          title={"Accompagnement\nde doula"}
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/* ApproachSection - Mon approche */}
        <ApproachSection items={approachItems} spacing="spacious" />

        {/* Services - À la carte */}
        <Services
          title="À la carte"
          services={services as ServiceItem[]}
          spacing="normal"
        />

        {/* CallToAction - Réservez un appel découverte */}
        <CallToAction
          title="Prête à vivre ta maternité en toute sérénité ?"
          subtitle="Que ce soit pour préparer la naissance, soulager les inconforts de grossesse ou traverser le post-partum avec douceur, je t'accompagne avec écoute et bienveillance. Ensemble, créons un espace de confiance pour honorer ton parcours unique."
          buttonText="RÉSERVEZ UN APPEL DÉCOUVERTE"
          buttonHref="/contact"
          spacing="normal"
        />

        {/* TestimonialsCarousel - Témoignages */}
        <TestimonialsCarousel
          testimonials={testimonials}
          showNavigation
          showPagination
          showTitle={false}
          spacing="spacious"
        />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
