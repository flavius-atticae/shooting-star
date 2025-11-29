import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import type { FooterProps } from "./footer";

const meta = {
  title: "Layout/6. Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Pied de page avec logo, navigation, newsletter et réseaux sociaux.

**Features**:
- Fond primary (#618462) avec texte blanc
- Container avec coins arrondis
- Grid 3 colonnes: 2fr 1fr 2fr (desktop)
- Typography: The Seasons (headings) + Barlow (content)
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, layout clair, espacement confortable.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<FooterProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
};