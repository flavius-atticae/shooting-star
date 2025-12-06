import type { Meta, StoryObj } from "@storybook/react";
import { InspirationsGrid } from "./inspirations-grid";

const meta: Meta<typeof InspirationsGrid> = {
  title: "About Page/2. Inspirations Grid",
  component: InspirationsGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Grille responsive des 3 cartes d'inspiration pour la page À propos.

**Features**:
- Grille responsive : 1 colonne (mobile) → 2 colonnes (tablet) → 3 colonnes (desktop)
- Espacement généreux entre les cartes
- Section title centrée
- Accessibilité WCAG 2.1 AA

**Content**: Affiche les 3 inspirations principales : Holistique, Bienveillante, Engagée.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    inspirations: {
      control: "object",
      description: "Array of inspiration items to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default - Standard 3-column grid with default inspirations
 */
export const Default: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Custom Inspirations - Grid with custom content
 */
export const CustomInspirations: Story = {
  args: {
    inspirations: [
      {
        id: "custom-1",
        title: "Première",
        description: "Description personnalisée pour la première inspiration.",
      },
      {
        id: "custom-2",
        title: "Deuxième",
        description: "Description personnalisée pour la deuxième inspiration.",
      },
      {
        id: "custom-3",
        title: "Troisième",
        description: "Description personnalisée pour la troisième inspiration.",
      },
    ],
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Mobile View - Focus on mobile layout
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
 * Tablet View - Focus on 2-column layout
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
 * Desktop View - Focus on 3-column layout
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
