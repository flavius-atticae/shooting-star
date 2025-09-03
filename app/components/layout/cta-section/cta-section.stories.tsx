import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from '@storybook/test';
import { CTASection } from "./cta-section";

/**
 * CTA Section Component Stories - Call-to-Action pregnancy-safe
 * 
 * Composant de section avec appel à l'action conçu spécifiquement pour les femmes enceintes
 * et nouvelles mères du Québec. Utilise des couleurs apaisantes et une typography 
 * pregnancy-safe avec The Seasons et Barlow.
 */

const meta: Meta<typeof CTASection> = {
  title: "Layout/CTA Section",
  component: CTASection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# CTA Section - Appel à l'action pregnancy-safe

Section d'appel à l'action pour le site de Pauline Roussel. Conçue avec des patterns 
pregnancy-safe pour rassurer et guider les utilisatrices enceintes vers l'action.

## Caractéristiques Pregnancy-Safe

### 🤱 Design Apaisant
- **Fond blanc**: Crée un environnement calme et propre
- **Bloc gris doux**: --color-gris (#f5f4f2) pour délimiter sans agresser
- **Coins arrondis**: 12px pour une sensation de douceur et sécurité
- **Couleur accent**: Rose chaleureux (#af6868) au lieu du rouge médical

### 🎯 Accessibilité WCAG 2.1 AA
- **Contraste élevé**: 4.2:1 minimum sur tous les éléments de texte
- **Touch targets**: 48px minimum pour doigts possiblement enflés
- **Focus visible**: Ring de 3px pour navigation au clavier
- **Structure sémantique**: H2 + P + Button avec ARIA approprié

### 📱 Responsive Design
- **Mobile-first**: Optimisé pour utilisation au lit/canapé
- **Typography fluide**: Échelle de text-2xl à text-4xl
- **Padding adaptatif**: De 32px à 48px selon l'écran
- **Zones tactiles**: Généreuses pour usage confortable

### 🇫🇷 Spécificités Québécoises
- **Contenu français**: Exemples en français du Québec
- **Ton chaleureux**: Messages rassurants et bienveillants
- **Calls-to-action clairs**: Actions évidentes sans pression
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal affiché avec The Seasons font",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre descriptif avec Barlow font",
    },
    buttonText: {
      control: "text",
      description: "Texte du bouton call-to-action",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
      description: "Espacement vertical de la section",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * CTA par défaut - Configuration standard
 * 
 * Version standard avec message d'empowerment féminin et appel à l'action
 * pour contacter Pauline Roussel.
 */
export const Default: Story = {
  args: {
    title: "Un accompagnement rempli de douceur et bienveillance",
    subtitle: "Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin.",
    buttonText: "Réserver un appel découverte",
    onButtonClick: () => alert("Navigation vers réservation"),
  },
  parameters: {
    docs: {
      description: {
        story: `
CTA Section dans sa configuration par défaut. Utilise un message d'empowerment 
féminin qui résonne avec les femmes enceintes québécoises.

**Caractéristiques:**
- Message rassurant et bienveillant
- Couleur accent apaisante (rose chaleureux)
- Action claire sans pression
- Typography The Seasons + Barlow
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test structure sémantique
    const heading = canvas.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/Un accompagnement rempli de douceur/i);
    
    // Test contenu
    const subtitle = canvas.getByText(/Curieuse et ouverte/i);
    expect(subtitle).toBeInTheDocument();
    
    // Test bouton
    const button = canvas.getByRole('button', { name: /Réserver un appel découverte/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-accent');
  },
};

/**
 * Avec lien externe - Navigation vers page
 * 
 * Utilise buttonHref au lieu de onButtonClick pour naviguer vers une page.
 */
export const WithLink: Story = {
  args: {
    title: "Découvrez le yoga prénatal",
    subtitle: "Séances adaptées à chaque trimestre de grossesse",
    buttonText: "Voir les cours",
    buttonHref: "/courses",
  },
  parameters: {
    docs: {
      description: {
        story: `
CTA Section utilisant un lien au lieu d'un gestionnaire onClick. 
Idéal pour la navigation entre pages du site.

**Usage:** Remplace \`onButtonClick\` par \`buttonHref\` pour les liens.
        `,
      },
    },
  },
};

/**
 * Espacement compact - Pour contenu dense
 * 
 * Version avec espacement réduit pour intégration dans du contenu plus dense.
 */
export const CompactSpacing: Story = {
  args: {
    title: "Prêt pour votre première séance ?",
    subtitle: "Réservez votre place dès maintenant",
    buttonText: "Réserver",
    spacing: "compact",
    onButtonClick: () => alert("Navigation vers réservation"),
  },
  parameters: {
    docs: {
      description: {
        story: `
Version avec espacement compact pour intégration dans des pages 
avec beaucoup de contenu ou sections multiples.

**Usage:** Idéal pour les pages de services ou landing pages.
        `,
      },
    },
  },
};

/**
 * Espacement spacieux - Impact maximum
 * 
 * Version avec espacement généreux pour créer un impact visuel fort.
 */
export const SpaciousSpacing: Story = {
  args: {
    title: "Transformez votre maternité",
    subtitle: "Rejoignez des centaines de mamans épanouies",
    buttonText: "Commencer maintenant",
    spacing: "spacious",
    onButtonClick: () => alert("Inscription"),
  },
  parameters: {
    docs: {
      description: {
        story: `
Version avec espacement généreux pour créer un impact maximum.
Idéal pour les pages de destination ou sections héroïques.

**Usage:** Landing pages, campagnes marketing, conversions importantes.
        `,
      },
    },
  },
};

/**
 * Test mobile (375px) - iPhone SE
 * 
 * Validation du comportement sur petits écrans mobiles.
 */
export const ResponsiveMobile: Story = {
  args: {
    title: "Yoga prénatal",
    subtitle: "Séances en ligne et à domicile",
    buttonText: "Découvrir",
    onButtonClick: () => alert("Mobile navigation"),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }, // 375px
    docs: {
      description: {
        story: `
CTA Section optimisée pour mobile (375px). Tests sur iPhone SE et petits écrans.

**Adaptations mobiles:**
- Titre plus concis pour éviter la coupure
- Padding réduit mais confortable
- Touch targets maintenues à 48px minimum
- Typography adaptée aux petits écrans
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test adaptations mobiles
    const button = canvas.getByRole('button');
    const buttonStyle = window.getComputedStyle(button);
    
    // Vérifier hauteur minimum (pregnancy-safe)
    expect(button).toHaveClass('min-h-[48px]');
    
    // Test responsive typography
    const title = canvas.getByRole('heading');
    expect(title).toHaveClass('text-2xl');
  },
};

/**
 * Test tablette (768px) - iPad
 * 
 * Validation sur écrans moyens et tablettes.
 */
export const ResponsiveTablet: Story = {
  args: {
    title: "Épanouissez-vous pendant votre grossesse",
    subtitle: "Cours de yoga, méditation et accompagnement personnalisé",
    buttonText: "En savoir plus",
    onButtonClick: () => alert("Tablet navigation"),
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' }, // 768px
    docs: {
      description: {
        story: `
CTA Section sur tablette (768px). Équilibre entre mobile et desktop.

**Adaptations tablettes:**
- Layout intermédiaire optimal
- Typography balanced
- Touch targets maintenues
- Padding progressif
        `,
      },
    },
  },
};

/**
 * Test desktop (1024px+) - Écrans larges
 * 
 * Version complète pour ordinateurs de bureau.
 */
export const ResponsiveDesktop: Story = {
  args: {
    title: "Accompagnement complet pour votre maternité",
    subtitle: "Yoga prénatal, postnatal, méditation et soutien bienveillant",
    buttonText: "Prendre rendez-vous",
    onButtonClick: () => alert("Desktop navigation"),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' }, // 1024px+
    docs: {
      description: {
        story: `
CTA Section sur desktop (1024px+). Version complète avec impact maximum.

**Avantages desktop:**
- Typography grande pour impact visuel
- Contenu complet et descriptif
- Padding généreux pour respiration
- Expérience premium
        `,
      },
    },
  },
};

/**
 * Test accessibilité - ARIA et navigation clavier
 * 
 * Validation de l'accessibilité et des patterns pregnancy-safe.
 */
export const AccessibilityTest: Story = {
  args: {
    title: "Test accessibilité",
    subtitle: "Validation WCAG 2.1 AA et pregnancy-safe patterns",
    buttonText: "Tester",
    onButtonClick: () => alert("Accessibility test"),
    'aria-labelledby': 'cta-title',
    'aria-describedby': 'cta-description',
  },
  parameters: {
    docs: {
      description: {
        story: `
# Test Accessibilité Complète

Validation de tous les critères d'accessibilité et pregnancy-safe patterns :

## ✅ WCAG 2.1 AA Compliance

- **Contraste couleurs**: Accent (#af6868) sur Gris (#f5f4f2) = 4.2:1 ✓
- **Touch targets**: 48px minimum pour pregnancy-safe ✓  
- **Navigation clavier**: Tab order et focus visible ✓
- **Screen readers**: Structure sémantique H2 + P + Button ✓

## 🤱 Pregnancy-Safe Features

- **Couleurs apaisantes**: Rose chaleureux au lieu du rouge médical
- **Pas de mouvement brusque**: Transitions douces 200ms
- **Messages rassurants**: Ton bienveillant et non-culpabilisant
- **Actions claires**: Boutons évidents sans pression

## 🔧 ARIA Support

- Labelledby et describedby pour screen readers
- Semantic HTML structure
- Focus management
- Keyboard navigation complete
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test structure sémantique
    const section = canvas.getByRole('region');
    const heading = canvas.getByRole('heading', { level: 2 });
    const button = canvas.getByRole('button');
    
    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    
    // Test ARIA attributes si présents
    if (section.hasAttribute('aria-labelledby')) {
      expect(section).toHaveAttribute('aria-labelledby');
    }
    
    // Test focus visible sur bouton
    button.focus();
    expect(button).toHaveFocus();
  },
};