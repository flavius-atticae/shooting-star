import type { Route } from "./+types/feminin-sacre";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { EventList } from "~/components/layout/event-list";
import { CallToAction } from "~/components/layout/call-to-action";
import { Footer } from "~/components/layout/footer/footer";
import type { EventCardProps } from "~/components/layout/event-card";

// Static events data - could be moved to CMS/API in the future
const eventsData: EventCardProps[] = [
  {
    id: "event-1",
    title: "Cercle de femmes",
    date: "7 Juin 2025",
    time: "19:00",
    // imageUrl: undefined, // TODO: Add event image
    imageAlt: "Cercle de femmes du féminin sacré",
    detailsHref: "#", // TODO: Link to event details page when implemented
  },
  {
    id: "event-2",
    title: "Yoga du féminin sacré",
    date: "14 Juin 2025",
    time: "10:00",
    // imageUrl: undefined, // TODO: Add event image
    imageAlt: "Atelier yoga du féminin sacré",
    detailsHref: "#",
  },
  {
    id: "event-3",
    title: "Rituel de la nouvelle lune",
    date: "21 Juin 2025",
    time: "20:00",
    // imageUrl: undefined, // TODO: Add event image
    imageAlt: "Rituel de la nouvelle lune",
    detailsHref: "#",
  },
];

const introText = `Tu ressens l'élan de te reconnecter à ton corps, à ton énergie féminine et à ta puissance intérieure? Les ateliers de Yoga du Féminin Sacré sont un refuge pour toute sa richesse et sa diversité. Dans un espace bienveillant, sacré et sans jugement, tu pourras te déposer, respirer et t'exprimer librement. À travers le mouvement, la méditation et des pratiques inspirées du féminin sacré, ces rencontres te permettront de renouer avec ton cycle, tes émotions et ton intuition profonde. C'est un moment pour toi, pour te redécouvrir et laisser fleurir la beauté unique de ton féminin, soutenue par la sororité et l'énergie du cercle.`;

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
  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - "Le féminin sacré ateliers variés" */}
        <Hero
          variant="default"
          title="Le féminin sacré\nateliers variés"
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/* Events Section - Tous les événements */}
        <EventList
          title="Tous les événements"
          introText={introText}
          events={eventsData}
          containerSize="xl"
        />

        {/* CTA Section - Encouragement à l'accompagnement */}
        <CallToAction
          title="Un accompagnement rempli de douceur et bienveillance"
          subtitle="Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin."
          buttonText="PRENEZ UN APPEL DÉCOUVERTE"
          buttonHref="/contact"
          spacing="normal"
        />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
