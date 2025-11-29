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
Hero principal avec titre multiline, sous-titre et variantes de hauteur.

**Features**:
- Typography impact (The Seasons + Barlow)
- Variants: default, full-height
- Multiline support avec \\n
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
    multiline: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Épanouir\nsa féminité",
    subtitle: "Avec Pauline Roussel",
    multiline: true,
  },
};

