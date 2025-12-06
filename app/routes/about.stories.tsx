import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import About from "./about";

// Wrapper component to provide Router context
const AboutWithRouter = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
);

const meta: Meta<typeof AboutWithRouter> = {
  title: "Pages/About Page",
  component: AboutWithRouter,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page À propos complète avec toutes les sections.

**Sections**:
1. Hero - "Pauline Roussel" avec sous-titre
2. About Section - À propos de moi avec 4 sous-sections et photo
3. Inspirations Grid - 3 cartes d'inspiration
4. Call to Action - Appel découverte
5. Footer - Navigation et contact

**Features**:
- Design responsive (mobile, tablet, desktop)
- Accessibilité WCAG 2.1 AA
- Typography pregnancy-safe
- Couleurs apaisantes
- Touch targets ≥ 48px
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete About Page - All sections rendered together
 */
export const CompletePage: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Mobile View - Full page on mobile
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
 * Tablet View - Full page on tablet
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
 * Desktop View - Full page on desktop
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
