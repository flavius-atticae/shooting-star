import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { 
  withReducedMotion,
  withPregnancySafeColors
} from "../../../../.storybook/decorators/pregnancy-safe";

// Note: within and expect from @storybook/test available in Storybook context
declare const within: any;
declare const expect: any;

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

Le composant Hero principal pour le site de Pauline Roussel. Conçu spécifiquement pour les femmes enceintes et nouvelles mères du Québec, il combine impact visuel et tranquillité d'esprit.

## Variants Disponibles

### 🌟 Default (Par défaut)
L'hero standard avec le message principal "Épanouir sa féminité". Parfait pour la page d'accueil avec un équilibre entre impact et sérénité.

### 📦 Compact  
Version condensée pour les pages de contenu intérieur. Garde l'identité visuelle tout en économisant l'espace vertical.

### 🖼️ Full-Height
Version pleine hauteur pour les pages de destination. Crée une immersion maximale sans être accablante.

### 🌄 With-Image
Hero avec image d'arrière-plan et overlay pregnancy-safe. Les overlays assurent la lisibilité même avec des images complexes.

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
      options: ["default", "compact", "full-height", "with-image"],
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
    background: {
      control: "object",
      description: "Configuration de l'image d'arrière-plan",
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
    title: "Épanouir sa féminité",
    subtitle: "Accompagnement bienveillant pour votre maternité",
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
    
    // Test structure sémantique
    const mainHeading = canvas.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Épanouir sa féminité/i);
    
    // Test contenu principal
    const subtitle = canvas.getByText(/Accompagnement bienveillant/i);
    expect(subtitle).toBeInTheDocument();
  },
};

/**
 * Hero compact - Pour pages de contenu
 * 
 * Version réduite pour les pages intérieures gardant l'identité visuelle
 * sans prendre trop d'espace vertical.
 */
export const Compact: Story = {
  args: {
    variant: "compact",
    title: "Services de yoga prénatal",
    subtitle: "Accompagnement personnalisé à Montréal",
  },
  parameters: {
    docs: {
      description: {
        story: `
Hero compact pour les pages de services ou de contenu. Maintient l'identité visuelle 
tout en économisant l'espace vertical précieux sur mobile.

**Usage recommandé:**
- Pages de services (/services)  
- Pages de blog (/articles)
- Pages informatives (/about)
- Toute page non-landing
        `,
      },
    },
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
    title: "Votre grossesse, votre pouvoir",
    subtitle: "Accompagnement holistique pour futures mamans québécoises",
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
 * Hero avec image d'arrière-plan
 * 
 * Intègre une image pregnancy-safe avec overlay pour maintenir la lisibilité.
 */
export const WithImage: Story = {
  args: {
    variant: "with-image",
    title: "Sérénité et connexion",
    subtitle: "Yoga prénatal à Montréal",
    background: {
      src: "/images/hero/yoga-prenatal-montreal.jpg",
      alt: "Femme enceinte pratiquant le yoga prénatal dans un studio lumineux",
      overlay: 0.3,
      position: "center"
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Hero avec image d'arrière-plan pregnancy-safe. L'overlay assure la lisibilité du texte 
même avec des images complexes.

**Options d'overlay:**
- **Soft**: Overlay léger (20% opacity) pour images claires
- **Medium**: Overlay modéré (40% opacity) usage standard  
- **Strong**: Overlay fort (60% opacity) pour images très contrastées
- **None**: Aucun overlay (images déjà optimisées)

**Bonnes pratiques images:**
- Images de yoga/maternité positives
- Éviter les images médicales stressantes
- Préférer les tons chauds et naturels
- Tester le contraste avec le texte
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
    title: "Yoga prénatal",
    subtitle: "Accompagnement bienveillant"
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }, // 375px
    docs: {
      description: {
        story: `
Hero optimisé pour mobile (375px). Tests sur iPhone SE et petits écrans.

**Adaptations mobiles:**
- Titres plus courts pour éviter la coupure
- Description condensée mais informative
- Boutons empilés verticalement
- Touch targets 44x44px minimum
- Espacement réduit mais aéré
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test adaptations mobiles
    const title = canvas.getByRole('heading', { level: 1 });
    expect(title.textContent!.length).toBeLessThan(20); // Titre court mobile
    
    // Test boutons empilés
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    
    // Test touch targets
    buttons.forEach((button: HTMLElement) => {
      const rect = button.getBoundingClientRect();
      expect(rect.height).toBeGreaterThanOrEqual(44);
    });
  },
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
    viewport: { defaultViewport: 'tablet' }, // 768px  
    docs: {
      description: {
        story: `
Hero sur tablette (768px). Équilibre entre mobile et desktop.

**Adaptations tablettes:**
- Layout hybride conservant l'efficacité
- Boutons côte à côte si espace suffisant
- Images plus grandes mais optimisées
- Touch targets maintenues
        `,
      },
    },
  },
};

/**
 * Tests responsifs - Desktop (1024px+)
 * 
 * Validation sur écrans larges et ordinateurs de bureau.
 */
export const ResponsiveDesktop: Story = {
  args: {
    variant: "with-image",
    title: "Sérénité et connexion",
    subtitle: "Yoga prénatal à Montréal",
    background: {
      src: "/images/hero/yoga-prenatal-montreal.jpg",
      alt: "Femme enceinte pratiquant le yoga prénatal dans un studio lumineux",
      overlay: 0.3,
      position: "center"
    }
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' }, // 1024px+
    docs: {
      description: {
        story: `
Hero sur desktop (1024px+). Version complète avec tous les éléments.

**Avantages desktop:**
- Espace pour image d'arrière-plan complète
- Actions multiples visibles simultanément
- Description étendue possible
- Typography plus généreuse
        `,
      },
    },
  },
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
    variant: "with-image",
    title: "Sérénité et connexion",
    subtitle: "Yoga prénatal à Montréal",
    background: {
      src: "/images/hero/yoga-prenatal-montreal.jpg",
      alt: "Femme enceinte pratiquant le yoga prénatal dans un studio lumineux",
      overlay: 0.3,
      position: "center"
    }
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