import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import type { FooterProps } from "./footer";

/**
 * Footer Component Stories
 * 
 * Le Footer component est le pied de page principal du site Pauline Roussel.
 * Il inclut le logo, la navigation, l'inscription newsletter et les réseaux sociaux.
 * 
 * Design pregnancy-safe avec:
 * - Fond primary (vert #618462) avec texte blanc, contenu dans le Container
 * - Container avec coins arrondis pour design moderne
 * - Layout 3 colonnes responsive (2fr 1fr 2fr)
 * - Touch targets 48px minimum
 * - Accessibilité WCAG 2.1 AA
 */

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Footer Component - Pied de page pregnancy-safe

Le Footer est le composant principal du pied de page pour le site de Pauline Roussel. 
Il respecte les standards de design pregnancy-safe et d'accessibilité.

### Fonctionnalités

- **Logo Section**: Logo Pauline Roussel avec sous-titre descriptif
- **Navigation**: Liens principaux verticaux (Doula, Yoga, Féminin sacré, À propos, Contact)
- **Section Sociale**: Newsletter signup + icônes réseaux sociaux
- **Pied de page légal**: Copyright et liens légaux

### Design System

- **Background**: Primary color (#618462) - Vert brand, contenu dans le Container avec coins arrondis
- **Typography**: The Seasons (headings) + Barlow (body)
- **Grid**: 2fr 1fr 2fr sur desktop, empilage sur mobile
- **Touch Targets**: 48px minimum pour confort grossesse
- **Accessibilité**: WCAG 2.1 AA compliant
        `
      }
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light-gray', value: '#f5f4f2' },
      ]
    }
  },
  argTypes: {
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
      description: "Section spacing variant"
    },
    containerSize: {
      control: "select", 
      options: ["sm", "md", "lg", "xl"],
      description: "Container size variant"
    },
    isNewsletterLoading: {
      control: "boolean",
      description: "Newsletter signup loading state"
    },
    onNewsletterSignup: { action: "newsletter-signup" },
    navLinks: {
      control: "object",
      description: "Custom navigation links"
    },
    socialLinks: {
      control: "object", 
      description: "Custom social media links"
    }
  },
  tags: ["autodocs"],
} satisfies Meta<FooterProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Footer
export const Default: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  }
};

// Compact Spacing
export const CompactSpacing: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  }
};

// Spacious Layout
export const Spacious: Story = {
  args: {
    spacing: "spacious",
    containerSize: "xl",
  }
};

// Loading State
export const NewsletterLoading: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
    isNewsletterLoading: true,
  }
};

// Custom Links
export const CustomLinks: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
    navLinks: [
      {
        label: "Services",
        href: "/services",
        ariaLabel: "Découvrir tous nos services"
      },
      {
        label: "Blog",
        href: "/blog", 
        ariaLabel: "Lire le blog de Pauline"
      },
      {
        label: "Témoignages",
        href: "/testimonials",
        ariaLabel: "Lire les témoignages clients"
      },
      {
        label: "Contact",
        href: "/contact",
        ariaLabel: "Prendre contact avec Pauline Roussel"
      }
    ],
    socialLinks: [
      {
        platform: 'instagram' as const,
        url: 'https://instagram.com/paulinerousseldoula',
        label: 'Suivre sur Instagram'
      },
      {
        platform: 'youtube' as const,
        url: 'https://youtube.com/@paulinerousseldoula',
        label: 'Voir nos vidéos YouTube'
      }
    ]
  }
};

// Small Container
export const SmallContainer: Story = {
  args: {
    spacing: "normal",
    containerSize: "sm",
  }
};

// Large Container  
export const LargeContainer: Story = {
  args: {
    spacing: "normal",
    containerSize: "lg",
  }
};

// Mobile View (through viewport controls)
export const MobileView: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};

// Tablet View
export const TabletView: Story = {
  args: {
    spacing: "normal", 
    containerSize: "xl",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  }
};