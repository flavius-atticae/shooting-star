import type { Route } from "./+types/feminin-sacre";
import { useLoaderData } from "react-router";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { EventList } from "~/components/layout/event-list";
import { DefaultCallToAction } from "~/components/layout/call-to-action";
import { Footer } from "~/components/layout/footer/footer";
import { getFemininSacreContent } from "~/lib/content.server";

export function loader() {
  return {
    femininSacreContent: getFemininSacreContent(),
  };
}

export function meta(_args: Route.MetaArgs) {
  return [
    {
      title: "Féminin Sacré - Ateliers Variés | Pauline Roussel",
    },
    {
      name: "description",
      content:
        "Découvrez les ateliers et événements du féminin sacré : cercles de femmes, rituels, yoga du féminin sacré. Reconnectez-vous à votre puissance intérieure dans un espace bienveillant.",
    },
    {
      name: "keywords",
      content:
        "féminin sacré, atelier féminin, cercle de femmes, yoga féminin sacré, rituel féminin, sororité, reconnexion féminine",
    },
  ];
}

export default function FemininSacre() {
  const { femininSacreContent } = useLoaderData<typeof loader>();
  const { events, introText } = femininSacreContent;

  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - "Le féminin sacré ateliers variés" */}
        <Hero
          variant="default"
          title={"Le féminin sacré\nateliers variés"}
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/* Events Section - Tous les événements */}
        <EventList
          title="Tous les événements"
          introText={introText}
          events={events}
          containerSize="xl"
        />

        {/* CTA Section - Encouragement à l'accompagnement */}
        <DefaultCallToAction spacing="normal" />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
