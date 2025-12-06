import type { Meta, StoryObj } from "@storybook/react";
import { InspirationCard } from "./inspiration-card";

const meta: Meta<typeof InspirationCard> = {
  title: "About Page/1. Inspiration Card",
  component: InspirationCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Carte d'inspiration pour la page À propos.

**Features**:
- Titre en police Moontime (script/cursive)
- Description en Barlow
- Couleur de texte principale (#618462)
- Layout simple et épuré
- Accessibilité WCAG 2.1 AA

**Usage**: Utilisé dans \`InspirationsGrid\` pour afficher les 3 inspirations.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the inspiration",
    },
    title: {
      control: "text",
      description: "Card title (script font)",
    },
    description: {
      control: "text",
      description: "Card description (Barlow font)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Holistique - Default inspiration card
 */
export const Holistique: Story = {
  args: {
    id: "holistique",
    title: "Holistique",
    description:
      "Ma méthode considère la Femme dans sa globalité : corps, mental, émotions et énergie. Chaque pratique et chaque accompagnement vise à favoriser l'équilibre, l'ancrage et le rayonnement de ton énergie féminine.",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Bienveillante - Second inspiration card
 */
export const Bienveillante: Story = {
  args: {
    id: "bienveillante",
    title: "Bienveillante",
    description:
      "Je crée un espace doux, sécurisant et empathique, où tu peux t'écouter, te révéler et t'épanouir en toute confiance, portée par une guidance attentive et réconfortante.",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Engagée - Third inspiration card
 */
export const Engagee: Story = {
  args: {
    id: "engagee",
    title: "Engagée",
    description:
      "Je m'implique pleinement pour t'accompagner à chaque étape, avec des outils, des pratiques et une présence soutenante qui respectent ton parcours et tes besoins uniques.",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Custom Example - Custom content
 */
export const CustomExample: Story = {
  args: {
    id: "custom",
    title: "Personnalisée",
    description:
      "Exemple de carte d'inspiration personnalisée avec un contenu différent.",
  },
};
