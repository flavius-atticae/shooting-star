import type { Route } from "./+types/doula";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";
import { ApproachSection, type ApproachItem } from "~/components/layout/approach-section";

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
