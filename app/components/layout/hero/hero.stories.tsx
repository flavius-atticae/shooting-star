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

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default Hero - Standard responsive height
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    variant: "default",
    title: `Épanouir
sa féminité`,
    subtitle: "Avec Pauline Roussel",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Full Height Hero - For landing pages
 * Takes full viewport height minus header (100vh - 80px)
 */
export const FullHeight: Story = {
  args: {
    variant: "full-height",
    title: `Épanouir
sa féminité`,
    subtitle: "Avec Pauline Roussel",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
    docs: {
      description: {
        story:
          "Variante pleine hauteur pour les pages d'atterrissage. Occupe toute la hauteur du viewport moins le header.",
      },
    },
  },
};

// ============================================================
// FEATURE STORIES (Chromatic disabled - tested via Default story)
// These stories demonstrate specific features
// ============================================================

/**
 * Single Line Title - No automatic line break
 * When title doesn't contain \n, it renders as single line
 */
export const SingleLineTitle: Story = {
  args: {
    variant: "default",
    title: "Yoga prénatal",
    subtitle: "Accompagnement personnalisé",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Titre sur une seule ligne. La détection automatique de `\\n` n'ajoute pas de saut de ligne.",
      },
    },
  },
};

/**
 * Multiline Title - Automatic line break detection
 * When title contains \n, it automatically splits into multiple lines
 */
export const MultilineTitle: Story = {
  args: {
    variant: "default",
    title: `Accompagner
les mamans
avec douceur`,
    subtitle: "Yoga & Bien-être périnatal",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Titre sur plusieurs lignes. Les `\\n` dans le titre sont automatiquement convertis en `<br />`.",
      },
    },
  },
};

/**
 * Custom Content - Using children prop
 * For custom hero content instead of default title/subtitle
 */
export const CustomContent: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Hero {...args}>
      <div className="flex flex-col items-start gap-4">
        <span className="text-sm font-sans uppercase tracking-wider text-primary/70">
          Nouveau
        </span>
        <h1 className="font-heading text-5xl md:text-7xl text-primary font-medium">
          Ateliers de groupe
        </h1>
        <p className="font-sans text-lg text-primary max-w-md">
          Rejoignez notre communauté de futures mamans pour des séances de yoga
          en groupe.
        </p>
        <button className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-sans font-bold uppercase text-sm">
          Découvrir
        </button>
      </div>
    </Hero>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Contenu personnalisé via la prop `children`. Remplace le titre et sous-titre par défaut.",
      },
    },
  },
};
