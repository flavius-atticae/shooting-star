import type { Meta, StoryObj } from "@storybook/react";
import { AboutSection } from "./about-section";

const meta: Meta<typeof AboutSection> = {
  title: "About Page/3. About Section",
  component: AboutSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section "À propos de moi" avec layout deux colonnes pour la page À propos.

**Features**:
- Layout deux colonnes sur desktop (texte à gauche, photo à droite)
- Layout empilé sur mobile (texte puis photo)
- Quatre sous-sections : Qui suis-je?, Mon parcours, Ce qui m'inspire, Ma méthode
- Photo placeholder de Pauline avec légende
- Typography: Ivyora Display (titres) + Barlow (contenu)
- Accessibilité WCAG 2.1 AA

**Structure**: 
- Colonne gauche (2/3) : Contenu textuel en 4 sous-sections
- Colonne droite (1/3) : Photo de Pauline
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default - Standard two-column layout with all content
 */
export const Default: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Mobile View - Focus on stacked layout
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    chromatic: {
      viewports: [375],
    },
  },
};

/**
 * Tablet View - Intermediate responsive state
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    chromatic: {
      viewports: [768],
    },
  },
};

/**
 * Desktop View - Focus on two-column layout
 */
export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    chromatic: {
      viewports: [1280],
    },
  },
};
