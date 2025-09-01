import type { Meta, StoryObj } from '@storybook/react'
import { AdaptiveGrid, AdaptiveGridDemo, useContainerQuerySupport } from './responsive-grid'
import React, { useState } from 'react'

const meta: Meta<typeof AdaptiveGrid> = {
  title: 'Foundation/AdaptiveGrid',
  component: AdaptiveGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Le composant AdaptiveGrid utilise les Container Queries pour créer des layouts 
responsives basés sur la taille du container parent plutôt que sur la taille de l'écran. 
Cette approche est particulièrement adaptée aux femmes enceintes qui utilisent 
différents appareils selon leur confort physique.

**Avantages pregnancy-friendly :**
- Layouts flexibles qui s'adaptent au contexte d'utilisation
- Fallback automatique pour les navigateurs non supportés
- Optimisation pour tablettes (souvent préférées pendant la grossesse)
- Touch-friendly avec espacement généreux

**Features techniques :**
- Container Queries (@container) avec fallback media queries
- Support 2 et 3 colonnes avec breakpoints adaptatifs
- Gap configurable avec classes Tailwind
- TypeScript strict et hooks de détection de support
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3],
      description: 'Nombre de colonnes cible (2 ou 3)',
      table: {
        type: { summary: '2 | 3' },
        defaultValue: { summary: '2' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap personnalisé utilisant les classes Tailwind (ex: gap-4, gap-6)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'gap par défaut de la classe cq-grid' },
      },
    },
    enableContainerQuery: {
      control: 'boolean',
      description: 'Activer le container query context sur cet élément',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    containerName: {
      control: 'text',
      description: 'Nom du container pour cibler spécifiquement ce container',
      table: {
        type: { summary: 'string' },
      },
    },
    as: {
      control: 'text',
      description: 'Élément HTML à utiliser comme racine',
      table: {
        type: { summary: 'React.ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
    children: {
      description: 'Éléments enfants à disposer dans la grille',
    },
    className: {
      control: 'text',
      description: 'Classes CSS supplémentaires',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AdaptiveGrid>

// Composants d'aide pour les démos
const GridItem = ({ 
  index, 
  variant = 'primary' 
}: { 
  index: number
  variant?: 'primary' | 'secondary' | 'accent' 
}) => {
  const variants = {
    primary: 'bg-primary/10 border-primary/20 text-primary',
    secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
    accent: 'bg-accent/10 border-accent/20 text-accent',
  }

  return (
    <div className={`
      ${variants[variant]} 
      p-6 rounded-lg border-2 min-h-[120px] 
      flex flex-col items-center justify-center text-center
      hover:scale-105 transition-transform cursor-pointer
      min-h-[44px] touch-manipulation
    `}>
      <div className="font-semibold text-lg">Item {index}</div>
      <div className="text-sm opacity-70 mt-1">Touch-friendly</div>
    </div>
  )
}

const ContainerSizeIndicator = () => {
  const supportsContainerQueries = useContainerQuerySupport()
  
  return (
    <div className="mb-4 p-3 bg-gris rounded-lg text-sm">
      <div className="font-medium text-neutral mb-1">
        Support Container Queries: {supportsContainerQueries ? '✅ Natif' : '❌ Fallback Media Queries'}
      </div>
      <div className="text-neutral/70 text-xs">
        {supportsContainerQueries 
          ? 'Le navigateur utilise @container pour la responsivité' 
          : 'Fallback avec @media queries pour assurer la compatibilité'}
      </div>
    </div>
  )
}

/**
 * Grid adaptatif 2 colonnes par défaut.
 * Configuration standard pour la plupart des cas d'usage.
 */
export const TwoColumns: Story = {
  args: {
    columns: 2,

    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i} index={i} variant="primary" />
        ))}
      </>
    ),

    gap: "gap-6"
  },
  decorators: [
    (Story) => (
      <div>
        <ContainerSizeIndicator />
        <div className="border-2 border-dashed border-primary/20 p-4 rounded">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Container parent (redimensionnable)
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Grid 2 colonnes idéal pour :
- Cartes de services/produits
- Articles et témoignages
- Navigation et contenu secondaire

Responsive : 1 colonne sur mobile, 2 colonnes sur desktop.
Touch targets optimisés (min 44px) pour l'usage pendant la grossesse.
        `,
      },
    },
  },
}

/**
 * Grid adaptatif 3 colonnes.
 * Pour affichage dense sur écrans larges.
 */
export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <GridItem key={i} index={i} variant="secondary" />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <ContainerSizeIndicator />
        <div className="border-2 border-dashed border-secondary/20 p-4 rounded">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Container parent (3 colonnes)
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Grid 3 colonnes pour :
- Galeries d'images
- Grilles de catégories
- Interfaces riches sur grand écran

Responsive : 1 colonne mobile → 2 colonnes tablette → 3 colonnes desktop.
Attention à l'espacement touch-friendly sur mobile.
        `,
      },
    },
  },
}

/**
 * Grid avec gap personnalisé.
 * Contrôle de l'espacement entre éléments.
 */
export const CustomGap: Story = {
  args: {
    columns: 2,
    gap: 'gap-8',
    children: (
      <>
        {[1, 2, 3, 4].map((i) => (
          <GridItem key={i} index={i} variant="accent" />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <ContainerSizeIndicator />
        <div className="border-2 border-dashed border-accent/20 p-4 rounded">
          <h3 className="text-lg font-semibold text-accent mb-4">
            Gap personnalisé (gap-8)
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Le gap peut être personnalisé avec les classes Tailwind :
- \`gap-2\` : 0.5rem (8px)
- \`gap-4\` : 1rem (16px)  
- \`gap-6\` : 1.5rem (24px)
- \`gap-8\` : 2rem (32px)

Espacement généreux recommandé pour le confort tactile pendant la grossesse.
        `,
      },
    },
  },
}

/**
 * Grid avec container query nommé.
 * Pour cibler spécifiquement ce container dans le CSS.
 */
export const NamedContainer: Story = {
  args: {
    columns: 2,
    containerName: 'featured-grid',
    children: (
      <>
        {[1, 2, 3, 4].map((i) => (
          <GridItem key={i} index={i} variant="primary" />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <ContainerSizeIndicator />
        <div className="border-2 border-dashed border-primary/20 p-4 rounded">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Container nommé "featured-grid"
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Un container nommé peut être ciblé dans le CSS pour des styles spécifiques :

\`\`\`css
@container featured-grid (min-width: 500px) {
  .custom-styles { ... }
}
\`\`\`

Utile pour des grids avec comportements particuliers.
        `,
      },
    },
  },
}

/**
 * Grid sans container query context.
 * Utilise uniquement les media queries classiques.
 */
export const NoContainerQuery: Story = {
  args: {
    columns: 2,
    enableContainerQuery: false,
    children: (
      <>
        {[1, 2, 3, 4].map((i) => (
          <GridItem key={i} index={i} variant="secondary" />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <div className="mb-4 p-3 bg-gris rounded-lg text-sm">
          <div className="font-medium text-neutral mb-1">
            ⚠️ Container Query désactivé
          </div>
          <div className="text-neutral/70 text-xs">
            Ce grid utilise uniquement les media queries classiques (@media)
          </div>
        </div>
        <div className="border-2 border-dashed border-secondary/20 p-4 rounded">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Grid sans Container Queries
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Quand \`enableContainerQuery={false}\`, le grid utilise uniquement 
les media queries classiques. Peut être utile pour :
- Compatibility avec des systèmes legacy
- Contrôle précis du responsive behavior
- Debug des fallbacks

Moins flexible que les container queries mais plus prévisible.
        `,
      },
    },
  },
}

/**
 * Grid avec élément HTML personnalisé.
 * Utilise une section pour la sémantique.
 */
export const CustomElement: Story = {
  args: {
    columns: 3,
    as: 'section',
    className: 'bg-gris/50 p-4 rounded-xl',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i} index={i} variant="primary" />
        ))}
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <ContainerSizeIndicator />
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
Le grid peut utiliser différents éléments HTML comme racine 
(\`section\`, \`aside\`, \`main\`, etc.) pour une sémantique appropriée.

Classes personnalisées ajoutées pour styling additionnel.
        `,
      },
    },
  },
}

/**
 * Démonstration interactive avec redimensionnement.
 * Permet de tester le comportement responsive en temps réel.
 */
export const InteractiveResize: Story = {
  render: () => {
    const [containerWidth, setContainerWidth] = useState(400)
    
    return (
      <div>
        <ContainerSizeIndicator />
        
        <div className="mb-6 space-y-4">
          <label className="block text-sm font-medium text-neutral">
            Largeur du container : {containerWidth}px
          </label>
          <input
            type="range"
            min={200}
            max={800}
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="w-full h-2 bg-gris rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary"
          />
          <div className="text-xs text-neutral/70">
            Glissez pour voir l'adaptation du grid en temps réel
          </div>
        </div>

        <div 
          className="border-2 border-dashed border-primary/20 p-4 rounded transition-all duration-300"
          style={{ width: `${containerWidth}px` }}
        >
          <h3 className="text-lg font-semibold text-primary mb-4">
            Container redimensionnable ({containerWidth}px)
          </h3>
          
          <AdaptiveGrid columns={2} gap="gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GridItem key={i} index={i} variant="primary" />
            ))}
          </AdaptiveGrid>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Démonstration interactive permettant de tester le comportement 
du grid adaptatif avec différentes tailles de container.

Particulièrement utile pour :
- Comprendre les breakpoints
- Tester l'UX sur différents devices
- Valider le comportement responsive

Observez comment le grid s'adapte selon la largeur disponible.
        `,
      },
    },
  },
}

/**
 * Comparaison 2 vs 3 colonnes côte à côte.
 * Vue comparative pour choisir la configuration optimale.
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-8">
      <ContainerSizeIndicator />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            Grid 2 colonnes
          </h3>
          <div className="border-2 border-dashed border-primary/20 p-4 rounded">
            <AdaptiveGrid columns={2} gap="gap-4">
              {[1, 2, 3, 4].map((i) => (
                <GridItem key={i} index={i} variant="primary" />
              ))}
            </AdaptiveGrid>
          </div>
          <p className="text-sm text-neutral/70 mt-2">
            Plus lisible, adapté au contenu texte et services
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Grid 3 colonnes
          </h3>
          <div className="border-2 border-dashed border-secondary/20 p-4 rounded">
            <AdaptiveGrid columns={3} gap="gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <GridItem key={i} index={i} variant="secondary" />
              ))}
            </AdaptiveGrid>
          </div>
          <p className="text-sm text-neutral/70 mt-2">
            Plus dense, adapté aux galeries et catégories
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Comparaison visuelle pour choisir entre 2 et 3 colonnes selon :

**2 colonnes :**
- Meilleur pour la lisibilité
- Touch-friendly sur mobile
- Idéal pour texte et services
- Moins de fatigue visuelle

**3 colonnes :**
- Plus d'informations visibles
- Adapté aux écrans larges
- Parfait pour images/catégories
- Attention au mobile touch-friendly
        `,
      },
    },
  },
}

/**
 * Composant de démonstration complet avec hooks.
 * Utilise AdaptiveGridDemo pour une présentation complète.
 */
export const CompleteDemo: Story = {
  render: () => <AdaptiveGridDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
Démonstration complète utilisant le composant \`AdaptiveGridDemo\` 
qui inclut :
- Détection du support des Container Queries
- Grids 2 et 3 colonnes avec styling
- Indicateurs visuels du statut responsive
- Exemples d'usage typiques

Ce composant est également utilisable dans l'application principale 
pour des pages de démonstration ou documentation.
        `,
      },
    },
  },
}

/**
 * Cas d'usage réel - Galerie de services.
 * Exemple concret d'utilisation du grid.
 */
export const ServicesGallery: Story = {
  render: () => {
    const services = [
      {
        title: "Yoga Prénatal",
        description: "Cours adaptés à chaque trimestre de grossesse",
        icon: "🧘‍♀️",
        color: "primary"
      },
      {
        title: "Accompagnement Naissance",
        description: "Support personnalisé pendant l'accouchement",
        icon: "🤱",
        color: "secondary"
      },
      {
        title: "Yoga Postnatal",
        description: "Récupération et bien-être après l'accouchement",
        icon: "💆‍♀️",
        color: "accent"
      },
      {
        title: "Méditation",
        description: "Techniques de relaxation et gestion du stress",
        icon: "🧘",
        color: "primary"
      },
      {
        title: "Massage Femme Enceinte",
        description: "Détente et soulagement des tensions",
        icon: "💅",
        color: "secondary"
      },
      {
        title: "Préparation Parentale",
        description: "Ateliers pour futurs parents",
        icon: "👨‍👩‍👧‍👦",
        color: "accent"
      },
    ]

    const colorVariants = {
      primary: 'bg-primary/10 border-primary/20 text-primary',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
      accent: 'bg-accent/10 border-accent/20 text-accent',
    }

    return (
      <div>
        <ContainerSizeIndicator />
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Nos Services Périnataux
          </h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Accompagnement complet pour votre voyage de la grossesse à la maternité
          </p>
        </div>

        <AdaptiveGrid columns={3} gap="gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                ${colorVariants[service.color as keyof typeof colorVariants]}
                p-6 rounded-xl border-2 text-center
                hover:scale-105 transition-all duration-200
                cursor-pointer min-h-[200px]
                flex flex-col justify-between
                min-h-[44px] touch-manipulation
              `}
            >
              <div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-sm opacity-80">{service.description}</p>
              </div>
              <button className="mt-4 bg-white/50 hover:bg-white/70 
                               px-4 py-2 rounded-lg font-medium
                               min-h-[44px] transition-colors">
                En savoir plus
              </button>
            </div>
          ))}
        </AdaptiveGrid>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Exemple réel d'une galerie de services utilisant AdaptiveGrid.
Démontre :
- Contenu pregnancy-specific authentique
- Touch targets appropriés (min 44px)
- Couleurs apaisantes de la palette Pauline Roussel
- Interactions hover/focus adaptées
- Responsive design optimal pour tous devices

Configuration : 3 colonnes avec fallback intelligent sur mobile.
        `,
      },
    },
  },
}