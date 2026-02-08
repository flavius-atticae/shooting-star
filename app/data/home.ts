import type { ServiceItem } from "~/components/layout/services/service-card";

// Configuration des services pour la landing page
export const servicesData: ServiceItem[] = [
  {
    id: "doula",
    title: "Doula",
    description:
      "Chaque naissance est un passage, un tissage unique entre le corps, le cœur et la vie. En tant que doula, je suis à l'écoute et je vous accompagne avec bienveillance à chaque stade de votre parcours, que vous soyez en tout début de grossesse, au seuil de l'accouchement ou dans le tourbillon du postnatal. Chaque étape a sa couleur, ses besoins, ses élans. Ensemble, créons l'espace dont vous avez besoin pour traverser ces moments avec confiance, soutien et sens.",
    buttonText: "En savoir plus",
    buttonHref: "/services/doula",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "À travers toutes les facettes du yoga, je vous accompagne dans la découverte de votre équilibre entre corps, émotions et esprit. Que ce soit par la pratique de posture physique, par la méditation, par le partage en groupe et toutes autres techniques, je vous guide pour vous aider à développer une connexion profonde avec la femme en vous.",
    buttonText: "En savoir plus",
    buttonHref: "/services/yoga",
  },
  {
    id: "feminin",
    title: "Féminin",
    description:
      "Au rythme des saisons, j'offre des ateliers, des événements et des cours spécialisés autour de la féminité. Lors de ces événements, je vous guide afin d'ouvrir la porte au partage d'histoires, d'expériences et d'émotions pour créer des moments rassembleurs et s'entourer de support et de bienveillance.",
    buttonText: "En savoir plus",
    buttonHref: "/services/feminin",
  },
];
