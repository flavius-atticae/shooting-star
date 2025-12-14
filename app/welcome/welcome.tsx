import { CallToAction } from "~/components/layout/call-to-action";

export function Welcome() {
  return (
    <main className="pt-16">
      <CallToAction
        title="Un accompagnement rempli de douceur et bienveillance"
        subtitle="Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin."
        buttonText="Réserver un appel découverte"
        buttonHref="/contact"
      />
    </main>
  );
}
