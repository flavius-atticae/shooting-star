import type { Route } from "./+types/yoga";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { Footer } from "~/components/layout/footer/footer";
import { FeatureBlock } from "~/components/layout/feature-block";
import { CallToAction } from "~/components/layout/call-to-action";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";

export function meta(_args: Route.MetaArgs) {
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

        {/* Feature Blocks Section - Cours de yoga */}
        <Section spacing="spacious" background="white">
          <Container size="xl" className="px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 lg:space-y-16">
              {/* Cours privés */}
              <FeatureBlock
                title="Cours privés"
                description="Un accompagnement personnalisé pour répondre à tes besoins spécifiques, à ton rythme et selon tes objectifs. Que ce soit pour approfondir ta pratique, retrouver ton équilibre ou soulager des tensions, chaque séance est conçue pour toi."
                layout="text-left"
                imageAlt="Cours de yoga privés personnalisés"
              />

              {/* Cours en studio */}
              <FeatureBlock
                title="Cours en studio"
                description="Plonge dans un espace chaleureux et sécurisant où chaque séance t'invite à te reconnecter à ton corps et à ton souffle. Des pratiques guidées pour relâcher les tensions, éveiller ton énergie et nourrir ton bien-être au quotidien. Retrouve moi dans un studio près de chez toi."
                layout="text-right"
                imageAlt="Cours de yoga en studio"
              />

              {/* Cours en entreprises */}
              <FeatureBlock
                title="Cours en entreprises"
                description="Offre à ton équipe un moment de ressourcement et de recentrage au cœur de la journée. Séances adaptées pour réduire le stress, améliorer la concentration et favoriser le bien-être collectif dans un cadre professionnel."
                layout="text-left"
                imageAlt="Cours de yoga en entreprises"
              />
            </div>
          </Container>
        </Section>

        {/* Call to Action - Réservez un appel découverte */}
        <CallToAction
          title="Un accompagnement rempli de douceur et bienveillance"
          subtitle="Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin."
          buttonText="RÉSERVEZ UN APPEL DÉCOUVERTE"
          buttonHref="/contact"
        />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
