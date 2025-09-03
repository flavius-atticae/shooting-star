import { CTASection } from "~/components/layout/cta-section";

export function Welcome() {
  return (
    <main className="pt-16">
      <CTASection
        title="Un accompagnement rempli de douceur et bienveillance"
        subtitle="Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin."
        buttonText="Réserver un appel découverte"
        onButtonClick={() => {
          // TODO: Implement navigation to services page
          // For now, placeholder action for call booking
        }}
      />
    </main>
  );
}
