import type { Meta, StoryObj } from "@storybook/react";
import { ServicesSection } from "./services-section";
import type { ServiceItem } from "./service-card";

const defaultServices: ServiceItem[] = [
  {
    id: "doula",
    title: "Doula",
    description:
      "Chaque naissance est un passage, un tissage unique entre le corps, le cœur et la vie. En tant que doula, je suis à l'écoute et je vous accompagne avec bienveillance à chaque stade de votre parcours.",
    buttonText: "En savoir plus",
    buttonHref: "/services/doula",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "À travers toutes les facettes du yoga, je vous accompagne dans la découverte de votre équilibre entre corps, émotions et esprit.",
    buttonText: "En savoir plus",
    buttonHref: "/services/yoga",
  },
  {
    id: "feminin",
    title: "Féminin",
    description:
      "Au rythme des saisons, j'offre des ateliers, des événements et des cours spécialisés autour de la féminité.",
    buttonText: "En savoir plus",
    buttonHref: "/services/feminin",
  },
];

const meta: Meta<typeof ServicesSection> = {
  title: "Layout/5. Services",
  component: ServicesSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section des services avec titre et grille de cartes.

**Features**:
- Grid responsive: 1→2→3 colonnes (mobile→tablet→desktop)
- Cartes bg-primary (#618462) avec texte blanc
- Typography: Ivyora Display (headings) + Barlow (content)
- Boutons CTA blancs avec hover
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, coins arrondis, animations douces.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    services: {
      control: "object",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof ServicesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    services: defaultServices,
  },
};
