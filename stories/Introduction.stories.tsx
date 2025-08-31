import type { Meta, StoryObj } from '@storybook/react';

// Composant Introduction avec documentation complète
const IntroductionComponent = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="font-heading text-3xl mb-6 text-neutral">
      Système de Design Pauline Roussel
    </h1>
    
    <p className="font-body text-lg mb-8 text-neutral-light">
      Bienvenue dans le Storybook de Pauline Roussel, instructrice de yoga périnatal 
      spécialisée dans le bien-être maternel et l'accompagnement à la naissance.
    </p>

    <h2 className="font-heading text-2xl mb-4 text-primary">À propos du projet</h2>
    <p className="font-body mb-6 text-neutral-light">
      Cette application React Router v7 vise à offrir une présence en ligne sereine, 
      accessible et professionnelle pour les services de yoga. Le design met l'accent sur :
    </p>
    <ul className="list-disc pl-6 mb-8 font-body text-neutral-light">
      <li><strong>Esthétique douce</strong> avec des couleurs et typographies apaisantes</li>
      <li><strong>Accessibilité</strong> avec états de focus appropriés et HTML sémantique</li>
      <li><strong>Réactivité</strong> sur toutes les tailles d'écran</li>
      <li><strong>Performance</strong> avec patterns React modernes et SSR</li>
    </ul>

    <hr className="my-8 border-primary-200" />

    <p className="text-center font-accent italic text-neutral">
      « Le yoga est un voyage de soi, par soi, vers soi. » - La Bhagavad Gita
    </p>
  </div>
);

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof IntroductionComponent>;

export const Overview: Story = {};