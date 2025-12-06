import type { Route } from "./+types/yoga";
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
      <main id="main-content" role="main">
        {/* Hero Section - Enseignement du yoga */}
        <Hero
          variant="default"
          title="Enseignement du yoga"
          subtitle="AVEC PAULINE ROUSSEL"
        />

        {/* FeatureBlock - Cours privés */}
        {/* TODO: Add FeatureBlock component when available */}

        {/* FeatureBlock - Cours en studio */}
        {/* TODO: Add FeatureBlock component when available */}

        {/* FeatureBlock - Cours en entreprises */}
        {/* TODO: Add FeatureBlock component when available */}

        {/* CallToAction */}
        {/* TODO: Add CallToAction component when available */}
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
