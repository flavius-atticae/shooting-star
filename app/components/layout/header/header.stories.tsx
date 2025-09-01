import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { Header } from "./header";
import { Logo } from "./logo";
import { ContactButton } from "./contact-button";
import { MobileMenu } from "./mobile-menu";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Header Component

Le composant Header principal pour le site de Pauline Roussel. Il intègre tous les éléments de navigation et respecte les exigences de pregnancy-safe design.

## Caractéristiques

- **Logo textuel "Pauline Roussel"** avec la police The Seasons (serif)
- **Menu mobile responsive** avec overlay complet
- **Bouton de contact** toujours accessible
- **Touch targets ≥ 44x44px** pour les utilisatrices enceintes
- **WCAG 2.1 AA compliant** avec focus states et ARIA labels
- **Couleurs brand** optimisées pour la grossesse

## Responsive Behavior

- **Mobile**: 56px height (h-14)
- **Desktop**: 64px height (h-16)
- **Menu burger** visible uniquement sur mobile/tablet
- **Logo centré** sur toutes les tailles d'écran

## Accessibility Features

- Navigation au clavier complète
- Fermeture du menu avec Escape
- ARIA labels en français
- Contraste élevé
- Focus visible sur tous les éléments interactifs
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Classes CSS personnalisées",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Histoire par défaut
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Le Header dans son état par défaut avec tous les éléments fonctionnels.",
      },
    },
  },
};

// Test du menu mobile
export const MobileMenuOpen: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        story: "Test du menu mobile sur petits écrans. Cliquez sur le burger pour tester l'ouverture/fermeture.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Attendre que le bouton menu soit visible (mobile seulement)
    const menuButton = canvas.getByRole("button", { name: /ouvrir le menu/i });
    
    // Cliquer pour ouvrir le menu
    await userEvent.click(menuButton);
    
    // Vérifier que le menu est ouvert
    const navigation = canvas.getByRole("navigation", { name: /menu de navigation principal/i });
    await expect(navigation).toBeInTheDocument();
  },
};

// Test d'accessibilité
export const AccessibilityTest: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Test des fonctionnalités d'accessibilité : navigation au clavier, focus states, et ARIA labels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test du focus sur le logo
    const logo = canvas.getByRole("link", { name: /pauline roussel.*retour à l'accueil/i });
    await userEvent.tab(); // Premier tab va au logo
    await expect(logo).toHaveFocus();
    
    // Test du focus sur le bouton contact
    await userEvent.tab(); // Le tab suivant devrait aller au contact
    const contactButton = canvas.getByRole("link", { name: /contactez pauline roussel/i });
    await expect(contactButton).toHaveFocus();
  },
};

// Test responsive
export const ResponsiveDesktop: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "desktop" },
    docs: {
      description: {
        story: "Vue desktop du Header avec hauteur augmentée (64px) et menu burger masqué.",
      },
    },
  },
};

export const ResponsiveTablet: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "tablet" },
    docs: {
      description: {
        story: "Vue tablet du Header - entre mobile et desktop.",
      },
    },
  },
};

// Stories des sous-composants

export const LogoComponent: StoryObj<typeof Logo> = {
  render: () => <Logo />,
  parameters: {
    docs: {
      description: {
        story: `
# Logo Component

Le logo textuel "Pauline Roussel" utilisant la police The Seasons serif. 
Centralisé et cliquable pour retourner à l'accueil.

## Fonctionnalités

- Police The Seasons (serif)
- Couleur brand primary (#618462)
- Touch target minimum 44x44px
- Hover et focus states
- Lien vers la page d'accueil
        `,
      },
    },
  },
};

export const ContactButtonComponent: StoryObj<typeof ContactButton> = {
  render: () => <ContactButton />,
  parameters: {
    docs: {
      description: {
        story: `
# Contact Button Component

Bouton d'appel à l'action permanent dans le Header.

## Fonctionnalités

- Touch target minimum 44x44px
- Couleurs brand primary
- Focus visible pour l'accessibilité
- Lien vers la section contact
        `,
      },
    },
  },
};

export const MobileMenuComponent: StoryObj<typeof MobileMenu> = {
  render: () => (
    <div style={{ position: "relative", height: "400px" }}>
      <MobileMenu isOpen={true} onClose={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
# Mobile Menu Component

Menu de navigation mobile avec overlay complet.

## Fonctionnalités

- Overlay complet avec backdrop
- Navigation complète du site
- Touch targets ≥ 44x44px
- Fermeture avec Escape
- Prévention du scroll du body
- Couleurs pregnancy-safe
        `,
      },
    },
  },
};

// Stories pour les tests de couleurs pregnancy-safe
export const PregnancySafeColors: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
# Pregnancy-Safe Design

Cette story démontre l'utilisation des couleurs pregnancy-safe dans le Header :

## Couleurs utilisées

- **Primary (#618462)** : Vert calme pour le logo et les hovers
- **Neutral (#5e4530)** : Brun pour le texte et les icônes
- **White/Gris (#f5f4f2)** : Arrière-plans apaisants

## Éviter

- ❌ Rouges vifs (anxiété médicale)
- ❌ Contrastes agressifs
- ❌ Animations rapides

## Touch Targets

Tous les éléments interactifs respectent la taille minimum de 44x44px pour les utilisatrices enceintes (doigts possiblement enflés).
        `,
      },
    },
  },
};

// Stories pour performance
export const PerformanceOptimized: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
# Performance Optimization

Le Header est optimisé pour les performances :

## Optimisations

- **Sticky positioning** avec backdrop-blur pour éviter les repaints
- **État du menu mobile** géré localement (pas de props drilling)
- **Touch targets optimaux** sans surcharge CSS
- **Images évitées** : logo en texte seulement
- **Animations légères** : transitions CSS uniquement

## Metrics cibles

- LCP contribution < 0.1s
- CLS = 0 (pas de layout shift)
- Touch responsiveness < 100ms
        `,
      },
    },
  },
};