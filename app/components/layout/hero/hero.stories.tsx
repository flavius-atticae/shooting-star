import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from 'storybook/test';
import { Hero } from "./Hero";
import { 
  withReducedMotion,
  withPregnancySafeColors
} from "../../../../.storybook/decorators/pregnancy-safe";

/**
 * Hero Component Stories - Composant central de la page d'accueil
 * 
 * Le composant Hero de Pauline Roussel est le premier élément que voient les utilisatrices enceintes.
 * Tous les variants sont conçus avec des patterns pregnancy-safe pour réduire l'anxiété et 
 * améliorer l'accessibilité.
 */

const meta: Meta<typeof Hero> = {
  title: "Layout/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Hero Component - Première impression pregnancy-safe

Le composant Hero principal pour le site de Pauline Roussel. Conçu spécifiquement pour les femmes enceintes et nouvelles mères du Québec, il combine impact typographique moderne et tranquillité d'esprit.

## Variants Disponibles

### 🌟 Default (Par défaut)
L'hero standard avec typography très grande et alignement à gauche. Message principal "Épanouir sa féminité" avec impact visuel maximal.

### 📦 Compact  
Version condensée pour les pages de contenu intérieur. Garde l'impact typographique tout en économisant l'espace vertical.

### 🖼️ Full-Height
Version pleine hauteur pour les pages de destination. Typography géante pour un impact immersif sans être accablante.

## Pregnancy-Safe Features

### 🤱 Adaptations pour la grossesse
- **Couleurs apaisantes**: Palette pregnancy-safe évitant les rouges médicaux
- **Contraste optimisé**: Ratios de contraste WCAG 2.1 AA minimum (4.5:1)
- **Mouvement réduit**: Animations douces et optionnelles
- **Touch targets**: Boutons ≥ 44x44px pour doigts possiblement enflés

### 🧠 Considérations "Pregnancy Brain"
- **Hiérarchie claire**: Information principale évidente
- **Messages rassurants**: Ton chaleureux et bienveillant
- **Actions évidentes**: Boutons CTA clairs et directs

### 🇫🇷 Spécificités Québécoises
- **Français-first**: Contenu prioritairement en français
- **Expressions locales**: "Épanouir sa féminité", "Accompagnement bienveillant"
- **Contexte culturel**: Références à la maternité québécoise

## Performance & Accessibilité

- **Lazy loading**: Images chargées uniquement si visibles
- **Optimisations mobile**: Performance sur 3G et iPhone plus anciens  
- **Screen readers**: Structure sémantique avec H1 approprié
- **Keyboard navigation**: Navigation complète au clavier
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "full-height"],
      description: "Variant du hero adaptés aux différents contextes",
    },
    title: {
      control: "text",
      description: "Titre principal (H1 sémantique)",
    },
    subtitle: {
      control: "text", 
      description: "Sous-titre descriptif",
    },
    multiline: {
      control: "boolean",
      description: "Afficher le titre sur plusieurs lignes (utiliser \\n dans le titre)",
    },
    className: {
      control: "text",
      description: "Classes CSS personnalisées",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Hero par défaut - Message principal du site
 * 
 * C'est le hero que voient la plupart des utilisatrices en arrivant sur le site.
 * Message d'empowerment féminin adapté aux femmes enceintes.
 */
export const Default: Story = {
  args: {
    variant: "default",
    title: "Épanouir\nsa féminité",
    subtitle: "Avec Pauline Roussel",
    multiline: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Le Hero dans son état par défaut pour la page d'accueil. Utilise le message principal 
"Épanouir sa féminité" qui résonne avec les femmes enceintes et nouvelles mères québécoises.

**Caractéristiques:**
- Message d'empowerment féminin non culpabilisant
- Couleurs apaisantes de la palette brand
- Responsive design mobile-first
- Typography sémantique avec The Seasons et Barlow
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test structure sémantique avec titre multiline
    const mainHeading = canvas.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Épanouir/i);
    expect(mainHeading).toHaveTextContent(/sa féminité/i);
    
    // Test contenu principal
    const subtitle = canvas.getByText(/Avec Pauline Roussel/i);
    expect(subtitle).toBeInTheDocument();
  },
};

/**
 * Hero avec titre sur plusieurs lignes
 * 
 * Démontre la capacité d'afficher le titre principal sur plusieurs lignes
 * pour un impact visuel plus fort et une meilleure lisibilité.
 */
export const Multiline: Story = {
  args: {
    variant: "default",
    title: "Pauline\nRoussel",
    subtitle: "Doula et professeure de Yoga",
    multiline: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Exemple de Hero avec titre sur plusieurs lignes. Utilisez \\n dans le titre 
et activez la prop \`multiline\` pour créer des sauts de ligne visuels.

**Avantages du multiline:**
- Impact visuel plus fort
- Meilleur contrôle typographique  
- Hiérarchie visuelle claire
- Adaptable selon le contenu

**Usage:** Idéal pour les titres courts mais impactants
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test titre multiline
    const title = canvas.getByRole('heading', { level: 1 });
    expect(title.innerHTML).toContain('<br>');
    expect(title).toHaveTextContent(/Pauline/i);
    expect(title).toHaveTextContent(/Roussel/i);
    
    // Test contenu présent
    const subtitle = canvas.getByText(/Doula et professeure/i);
    expect(subtitle).toBeInTheDocument();
  },
};


/**
 * Hero pleine hauteur - Impact maximum
 * 
 * Version immersive pour les pages de destination ou campagnes spéciales.
 */
export const FullHeight: Story = {
  args: {
    variant: "full-height",
    title: "Le féminin sacré\nateliers variés",
    subtitle: "Avec Pauline Roussel",
    multiline: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Hero pleine hauteur pour créer un impact maximum. Idéal pour les pages de destination 
ou les campagnes marketing spéciales.

**Utilisation appropriée:**
- Pages de destination (landing pages)
- Campagnes publicitaires
- Promotions spéciales
- Lancement de nouveaux services
        `,
      },
    },
  },
};


/**
 * Tests responsifs - Mobile (375px) 
 * 
 * Validation du comportement sur iPhone SE et petits mobiles.
 */
export const ResponsiveMobile: Story = {
  args: {
    variant: "default",
    title: "Enseignement\ndu Yoga",
    subtitle: "Avec Pauline Roussel",
    multiline: true,
  },

  parameters: {
    docs: {
      description: {
        story: `
Hero optimisé pour mobile (375px). Tests sur iPhone SE et petits écrans.

**Adaptations mobiles:**
- Titres plus courts pour éviter la coupure
- Description condensée mais informative
- Mise en page verticale optimisée
- Espacement réduit mais aéré
- Typography adaptée aux petits écrans
        `,
      },
    }
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test adaptations mobiles - titre multiline
    const title = canvas.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent(/Enseignement/i);
    expect(title).toHaveTextContent(/Yoga/i);
    
    // Test présence du contenu principal
    const subtitle = canvas.getByText(/Avec Pauline Roussel/i);
    expect(subtitle).toBeInTheDocument();
  },

  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  }
};

/**
 * Tests responsifs - Tablette (768px)
 * 
 * Validation sur iPad et tablettes Android.
 */
export const ResponsiveTablet: Story = {
  args: {
    variant: "default",
    title: "Épanouir sa féminité",
    subtitle: "Accompagnement bienveillant pour votre maternité"
  },

  parameters: {
    docs: {
      description: {
        story: `
Hero sur tablette (768px). Équilibre entre mobile et desktop.

**Adaptations tablettes:**
- Layout hybride conservant l'efficacité
- Contenu équilibré entre mobile et desktop
- Images plus grandes mais optimisées
- Touch targets maintenues pour accessibilité
        `,
      },
    }
  },

  globals: {
    viewport: {
      value: 'tablet',
      isRotated: false
    }
  }
};

/**
 * Tests responsifs - Desktop (1024px+)
 * 
 * Validation sur écrans larges et ordinateurs de bureau.
 */
export const ResponsiveDesktop: Story = {
  args: {
    variant: "default",
    title: "Épanouir sa féminité",
    subtitle: "Accompagnement bienveillant pour votre maternité"
  },

  parameters: {
    docs: {
      description: {
        story: `
Hero sur desktop (1024px+). Version complète avec impact typographique maximum.

**Avantages desktop:**
- Typography très grande pour impact visuel
- Présentation complète du contenu
- Description étendue possible
- Layout left-aligned pour modernité
        `,
      },
    }
  },

  globals: {
    viewport: {
      value: 'desktop',
      isRotated: false
    }
  }
};

/**
 * Test couleurs pregnancy-safe
 * 
 * Validation de la palette de couleurs pour femmes enceintes.
 */
export const PregnancySafeColors: Story = {
  args: {
    variant: "default",
    title: "Épanouir sa féminité",
    subtitle: "Accompagnement bienveillant pour votre maternité"
  },
  decorators: [withPregnancySafeColors, withReducedMotion],
  parameters: {
    docs: {
      description: {
        story: `
# Test Couleurs Pregnancy-Safe

Validation de la palette de couleurs spécialement adaptée aux femmes enceintes :

## ✅ Couleurs Utilisées (Conformes)

- **Primary (#618462)**: Vert apaisant pour titre et CTA principal
- **Accent (#af6868)**: Rose chaleureux pour éléments secondaires  
- **Secondary (#517982)**: Bleu calme pour boutons secondaires
- **Neutral (#5e4530)**: Brun doux pour le texte de description
- **Overlay soft**: Transparence douce pour lisibilité

## ❌ Couleurs Évitées (Problématiques)

- **Rouges vifs**: Évoquent médical/urgence/danger
- **Contrastes agressifs**: Fatigue visuelle grossesse
- **Jaune/Orange vifs**: Peuvent accentuer nausées
- **Noir pur**: Trop harsh, préférer brun neutral

## 🎨 Guidelines Pregnancy-Safe

- Privilégier tons naturels et chaleureux
- Maintenir contraste WCAG AA (4.5:1 minimum) 
- Tester avec fatigue visuelle et nausées
- Éviter stimulation visuelle excessive
        `,
      },
    },
  },
};

/**
 * Test réduction de mouvement
 * 
 * Mode pour utilisatrices sensibles aux animations (nausées).
 */
export const ReducedMotion: Story = {
  args: {
    variant: "default",
    title: "Épanouir sa féminité",
    subtitle: "Accompagnement bienveillant pour votre maternité"
  },
  decorators: [withReducedMotion],
  parameters: {
    docs: {
      description: {
        story: `
# Test Mouvement Réduit (Préfers-Reduced-Motion)

Mode essentiel pour les utilisatrices enceintes souffrant de nausées ou sensibles 
au mouvement. Toutes les animations sont désactivées ou considérablement réduites.

**Adaptations appliquées:**
- Transitions instantanées (0.01ms)
- Scroll behavior: auto (pas de smooth scroll)
- Animations désactivées
- Parallax désactivé
- Auto-play vidéos désactivé

**Déclenchement:**
- Paramètre OS "Réduire les mouvements"
- Bouton toggle dans interface
- Détection automatique nausées matinales
- Préférence utilisateur sauvegardée
        `,
      },
    },
  },
};