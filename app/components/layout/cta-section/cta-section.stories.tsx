import type { Meta, StoryObj } from "@storybook/react";
import { CTASection } from "./cta-section";

const meta: Meta<typeof CTASection> = {
  title: "Layout/5. Call To Action",
  component: CTASection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section d'appel à l'action avec titre, sous-titre et bouton.

**Features**:
- Bloc bg-gris (#f5f4f2) avec coins arrondis
- Typography: Ivyora Display (title) + Barlow (subtitle)
- Bouton accent (#af6868) avec hover
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, contraste élevé, messages rassurants.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    subtitle: {
      control: "text",
    },
    buttonText: {
      control: "text",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Un accompagnement rempli de douceur et bienveillance",
    subtitle:
      "Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin.",
    buttonText: "Réserver un appel découverte",
    onButtonClick: () => alert("Navigation vers réservation"),
  },
};
