import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { withReactRouter } from "../../../../.storybook/react-router-decorator";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  decorators: [withReactRouter],
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
- **Touch targets ≥ 48x48px** pour les utilisatrices enceintes
- **WCAG 2.1 AA compliant** avec focus states et ARIA labels
- **Couleurs brand** optimisées pour la grossesse

## Responsive Behavior

- **Mobile**: 56px height (h-14)
- **Desktop**: 64px height (h-16)
- **Menu burger** visible uniquement sur mobile/tablet
- **Logo centré** sur toutes les tailles d'écran

## Pregnancy-Safe Design

### Couleurs utilisées

- **Background Header**: Primary (#618462) - Vert calme et rassurant
- **Logo "Pauline Roussel"**: White (#ffffff) - Contraste optimal sur fond vert
- **Menu Burger**: Background blanc avec traits Primary - Visibilité maximale
- **Bouton CTA**: Background Menthe (#D4E8D4) + texte White - Contraste WCAG AA

### Éviter

- ❌ Rouges vifs (anxiété médicale)
- ❌ Contrastes agressifs
- ❌ Animations rapides

### Touch Targets

Tous les éléments interactifs respectent la taille minimum de 48×48px pour les utilisatrices enceintes (doigts possiblement enflés).

## Accessibility Features

- Navigation au clavier complète
- Fermeture du menu avec Escape
- ARIA labels en français
- Contraste élevé (4.5:1 minimum)
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

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Le Header dans son état par défaut avec tous les éléments fonctionnels. Responsive : menu burger visible sur mobile/tablet, bouton contact masqué sur mobile.",
      },
    },
  },
};