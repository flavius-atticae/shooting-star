import type { Route } from "./+types/yoga";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Enseignement du Yoga - Pauline Roussel",
    },
    {
      name: "description",
      content:
        "Cours de yoga adaptés à vos besoins : cours privés, en studio et en entreprise. Enseignement du yoga par Pauline Roussel au Québec.",
    },
    {
      name: "keywords",
      content:
        "yoga, enseignement yoga, cours privés, cours studio, cours entreprise, yoga Québec, Pauline Roussel",
    },
  ];
}

export default function YogaPage() {
  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section - Enseignement du yoga */}
        <Hero
          variant="default"
          title="Enseignement du yoga"
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/*
          Sections à venir (voir issue #149) :
          - FeatureBlock - Cours privés
          - FeatureBlock - Cours en studio
          - FeatureBlock - Cours en entreprises
          - CallToAction
        */}
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
