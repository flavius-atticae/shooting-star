import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Layout/2. Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Hero principal avec titre, sous-titre et variantes de hauteur.

**Features**:
- Typography impact (Ivyora Display + Barlow)
- Variants: default, full-height
- Automatic line break detection (\\n in title)
- Uses shared Container component (xl size)
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, mouvement réduit, contraste élevé.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "full-height"],
    },
    title: {
      control: "text",
    },
    subtitle: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: `Épanouir
sa féminité`,
    subtitle: "Avec Pauline Roussel",
  },
};
