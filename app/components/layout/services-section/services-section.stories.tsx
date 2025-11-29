import type { Meta, StoryObj } from '@storybook/react';
import { ServicesSection } from './services-section';
import type { ServiceItem } from './service-card';

const meta: Meta<typeof ServicesSection> = {
  title: 'Layout/Services Section',
  component: ServicesSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Services Section - Section des services pregnancy-safe

Composant conçu spécifiquement pour le site de Pauline Roussel avec :

## Caractéristiques
- **Fond transparent** avec padding généreux
- **Titre H1** "Mes services" en vert avec The Seasons
- **Grid responsive** : 3 colonnes desktop, 2 colonnes tablet, 1 colonne mobile
- **Cartes vertes** avec texte blanc et boutons CTA blancs
- **Typography pregnancy-safe** (The Seasons + Barlow)
- **Accessibilité WCAG 2.1 AA** complète

## Pregnancy-Safe Design
- Couleurs apaisantes (vert nature #618462)
- Touch targets 44px minimum (mains gonflées)
- Contraste élevé pour fatigue visuelle
- Animations douces respectant \`prefers-reduced-motion\`
- Coins arrondis anti-anxiété

## Usage
\`\`\`tsx
<ServicesSection
  services={serviceData}
  spacing="normal"
  containerSize="lg"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre de la section (H1)',
    },
    services: {
      control: 'object',
      description: 'Array des services à afficher',
    },
    spacing: {
      control: 'select',
      options: ['compact', 'normal', 'spacious'],
      description: 'Espacement de la section',
    },
    containerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Taille du container',
    },
  },
} satisfies Meta<typeof ServicesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample service data for stories
const defaultServices: ServiceItem[] = [
  {
    id: "doula", 
    title: "Doula",
    description: "Chaque naissance est un passage, un tissage unique entre le corps, le cœur et la vie. En tant que doula, je suis à l'écoute et je vous accompagne avec bienveillance à chaque stade de votre parcours, que vous soyez en tout début de grossesse, au seuil de l'accouchement ou dans le tourbillon du postnatal. Chaque étape a sa couleur, ses besoins, ses élans. Ensemble, créons l'espace dont vous avez besoin pour traverser ces moments avec confiance, soutien et sens.",
    buttonText: "En savoir plus",
    buttonHref: "/services/doula"
  },
  {
    id: "yoga",
    title: "Yoga",
    description: "À travers toutes les facettes du yoga, je vous accompagne dans la découverte de votre équilibre entre corps, émotions et esprit. Que ce soit par la pratique de posture physique, par la méditation, par le partage en groupe et toutes autres techniques, je vous guide pour vous aider à développer une connexion profonde avec la femme en vous.",
    buttonText: "En savoir plus",
    buttonHref: "/services/yoga"
  },
  {
    id: "feminin",
    title: "Féminin",
    description: "Au rythme des saisons, j'offre des ateliers, des événements et des cours spécialisés autour de la féminité. Lors de ces événements, je vous guide afin d'ouvrir la porte au partage d'histoires, d'expériences et d'émotions pour créer des moments rassembleurs et s'entourer de support et de bienveillance.",
    buttonText: "En savoir plus",
    buttonHref: "/services/feminin"
  }
];

const singleService: ServiceItem[] = [
  {
    id: "yoga",
    title: "Yoga",
    description: "Séances adaptées à chaque trimestre pour préparer votre corps et apaiser votre esprit.",
    buttonText: "En savoir plus",
    buttonHref: "/services/yoga"
  }
];

const manyServices: ServiceItem[] = [
  ...defaultServices,
  {
    id: "consultations",
    title: "Consultations individuelles",
    description: "Rendez-vous personnalisés pour répondre à vos besoins spécifiques pendant la grossesse.",
    buttonText: "Réserver",
    buttonHref: "/services/consultations"
  },
  {
    id: "ateliers-groupe",
    title: "Ateliers de groupe",
    description: "Rencontres collectives pour partager et apprendre avec d'autres futures mamans.",
    buttonText: "Rejoindre",
    buttonHref: "/services/ateliers"
  },
  {
    id: "formation-partenaire",
    title: "Formation partenaire",
    description: "Accompagnement du partenaire pour mieux soutenir la future maman.",
    buttonText: "Participer",
    buttonHref: "/services/partenaire"
  }
];

// Default Story
export const Default: Story = {
  args: {
    services: defaultServices,
  },
};

// Spacing Variants
export const CompactSpacing: Story = {
  args: {
    services: defaultServices,
    spacing: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version avec espacement compact pour pages avec beaucoup de contenu.',
      },
    },
  },
};

export const SpaciousSpacing: Story = {
  args: {
    services: defaultServices,
    spacing: 'spacious',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version avec espacement généreux pour pages landing.',
      },
    },
  },
};

// Container Size Variants
export const SmallContainer: Story = {
  args: {
    services: defaultServices,
    containerSize: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version avec container étroit pour mise en page compacte.',
      },
    },
  },
};

export const ExtraLargeContainer: Story = {
  args: {
    services: defaultServices,
    containerSize: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version avec container extra-large pour écrans très larges.',
      },
    },
  },
};

// Content Variants
export const SingleService: Story = {
  args: {
    services: singleService,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test edge case avec un seul service (layout 1 colonne).',
      },
    },
  },
};

export const ManyServices: Story = {
  args: {
    services: manyServices,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec 6 services pour valider le comportement avec plus de contenu.',
      },
    },
  },
};

export const EmptyServices: Story = {
  args: {
    services: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'État vide avec message informatif.',
      },
    },
  },
};

// Custom Title
export const CustomTitle: Story = {
  args: {
    title: "Notre accompagnement",
    services: defaultServices,
  },
  parameters: {
    docs: {
      description: {
        story: 'Version avec titre personnalisé au lieu de "Mes services".',
      },
    },
  },
};

// Responsive Testing Stories
export const ResponsiveMobile: Story = {
  args: {
    services: defaultServices,
  },

  parameters: {
    docs: {
      description: {
        story: 'Test responsive mobile (375px) - layout 1 colonne.',
      },
    }
  },

  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  }
};

export const ResponsiveTablet: Story = {
  args: {
    services: defaultServices,
  },

  parameters: {
    docs: {
      description: {
        story: 'Test responsive tablet (768px) - layout 2 colonnes.',
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

export const ResponsiveDesktop: Story = {
  args: {
    services: defaultServices,
  },

  parameters: {
    docs: {
      description: {
        story: 'Test responsive desktop (1024px+) - layout 3 colonnes.',
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

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    services: defaultServices,
    'aria-labelledby': 'services-heading',
    'aria-describedby': 'services-description',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec propriétés ARIA pour validation accessibilité complète.',
      },
    },
  },
  render: (args) => (
    <div>
      <div id="services-description" className="sr-only">
        Section présentant les trois services principaux offerts par Pauline Roussel
      </div>
      <ServicesSection {...args} services={args.services} />
    </div>
  ),
};

// Interaction Testing
export const WithClickHandlers: Story = {
  args: {
    services: defaultServices.map(service => ({
      ...service,
      buttonHref: undefined,
      buttonAction: () => alert(`Navigation vers: ${service.title}`),
      'aria-label': `En savoir plus sur ${service.title}`
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec onClick handlers au lieu de liens pour navigation programmatique.',
      },
    },
  },
};

// Different Button Targets
export const ExternalLinks: Story = {
  args: {
    services: defaultServices.map(service => ({
      ...service,
      buttonHref: `https://external-site.com${service.buttonHref}`,
      buttonTarget: '_blank' as const,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec liens externes s\'ouvrant dans nouveaux onglets.',
      },
    },
  },
};