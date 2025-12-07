import type { Route } from "./+types/doula";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";
import { ApproachSection, type ApproachItem } from "~/components/layout/approach-section";
import { Services, type ServiceItem } from "~/components/layout/services";
import { TestimonialsCarousel, type Testimonial } from "~/components/layout/testimonials-carousel";

// Configuration des services pour la page doula - "À la carte"
const doulaServices: ServiceItem[] = [
  {
    id: "preparation-naissance",
    title: "Préparation à la naissance",
    description:
      "Accompagnement ciblé pour se préparer à l'accouchement à son rythme. Approche des techniques de respiration, de relaxation, de visualisation de la naissance avec confort et sérénité.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/preparation-naissance",
  },
  {
    id: "examen-grossesse",
    title: "Examen de grossesse",
    description:
      "Consultation dédiée pour soulager les inconforts, douleurs et petits soucis de grossesse. Conseils personnalisés et solutions naturelles pour se sentir mieux au quotidien.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/examen-grossesse",
  },
  {
    id: "post-partum-immediat",
    title: "Post-partum immédiat",
    description:
      "Soutien précieux après la naissance pour traverser les premiers jours avec plus de confort et de sérénité. Accompagnement physique, émotionnel et énergétique selon les besoins.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/post-partum-immediat",
  },
  {
    id: "yoga-prenatal",
    title: "Yoga prénatal",
    description:
      "Séances de yoga adaptées à chaque trimestre pour renforcer les muscles, optimiser le souffle et cultiver un état de détente idéal pour vivre sa grossesse en complément de son suivi avec son·a aîné·e.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/yoga-prenatal",
  },
  {
    id: "yoga-postnatal",
    title: "Yoga postnatal",
    description:
      "Pratique douce pour soutenir la récupération après l'accouchement, reconnecter son corps et son énergie, et tisser le lien avec son bébé.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/yoga-postnatal",
  },
  {
    id: "mama-blessing",
    title: "Mama Blessing",
    description:
      "Cérémonie sur mesure pour honorer la future maman, célébrer sa vie qui grandit en elle, et la sentir soutenue et entourée pour sa naissance.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/mama-blessing",
  },
  {
    id: "yoga-prenatal-partenaire",
    title: "Yoga prénatal avec partenaire",
    description:
      "Moment partagé pour préparer l'arrivée de bébé ensemble. Exercices de respiration et écoute mutuelle pour renforcer la complicité et la confiance.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/yoga-prenatal-partenaire",
  },
  {
    id: "consultation-doula",
    title: "Consultation doula",
    description:
      "Rencontre personnalisée pour répondre à vos questions, écouter et se guider selon son parcours et ses besoins spécifiques, et préparer n'importe quel moment de la maternité.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/consultation-doula",
  },
  {
    id: "consultation-extra",
    title: "Consultation extra",
    description:
      "Rendez-vous ponctuel à ajouter à un forfait complet pour approfondir un sujet précis. Répond à des nouvelles questions ou de nouveaux besoins. Flexible et personnalisable selon les besoins.",
    buttonText: "En savoir plus",
    buttonHref: "/doula/consultation-extra",
  },
];

// Testimonials for the doula page
const doulaTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Pauline m'a accompagnée avec une douceur et une écoute incroyables. Je me suis sentie soutenue à chaque étape de ma grossesse.",
    author: "Marie",
    context: "Accompagnée en 2024",
  },
  {
    id: "2",
    quote:
      "Le yoga prénatal avec Pauline a été un vrai moment de ressourcement. J'ai appris à écouter mon corps et à me connecter à mon bébé.",
    author: "Sophie",
    context: "Maman de 2 enfants",
  },
  {
    id: "3",
    quote:
      "La cérémonie Mama Blessing restera un souvenir inoubliable. Un moment magique entourée de mes proches.",
    author: "Camille",
  },
];

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
  // Approach items for "Mon approche" section
  const approachItems: ApproachItem[] = [
    {
      id: "pregnancy",
      title: "Pendant la grossesse",
      description:
        "Accompagnement en douceur et à l'écoute, je crée un espace sécurisant où vous pouvez explorer votre grossesse avec confiance. Ensemble, nous découvrons des outils concrets comme la respiration, le mouvement et la relaxation pour vous accompagner au quotidien.",
    },
    {
      id: "mama-blessing",
      title: "Mama Blessing",
      description:
        "Une cérémonie intime et sacrée pour honorer le passage vers la maternité. À travers des rituels et des gestes symboliques, je vous accompagne dans une connexion profonde à votre force intérieure et à la communauté qui vous entoure.",
    },
    {
      id: "birth",
      title: "L'accouchement",
      description:
        "Une présence calme et rassurante à vos côtés pendant la naissance. Je vous accompagne avec le souffle, le mouvement et les postures, tout en offrant un soutien émotionnel, physique et énergétique pour vous et votre partenaire.",
    },
    {
      id: "fourth-trimester",
      title: "4e trimestre",
      description:
        "Cette période précieuse mais souvent exigeante mérite toute notre attention. Avec écoute, présence et gestes de réconfort, j'offre des rituels postnataux pour vous aider à trouver votre nouvel équilibre dans la maternité.",
    },
    {
      id: "custom",
      title: "Sur mesure",
      description:
        "Chaque histoire est différente, chaque parcours est unique. Que vous ayez besoin d'un accompagnement ponctuel ou complet, je m'adapte à vos besoins et à votre réalité pour créer un soutien qui vous ressemble.",
    },
  ];

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
        <ApproachSection items={approachItems} spacing="spacious" />

        {/* Services - À la carte */}
        <Services
          title="À la carte"
          services={doulaServices}
          spacing="normal"
        />

        {/* CallToAction - Réservez un appel découverte */}
        {/* TODO: Add CallToAction component */}

        {/* TestimonialsCarousel - Témoignages */}
        <TestimonialsCarousel
          title="Douce et à l'écoute"
          testimonials={doulaTestimonials}
          showNavigation
          showPagination
          spacing="spacious"
        />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
