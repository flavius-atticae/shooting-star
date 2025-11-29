import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './container'

const meta: Meta<typeof Container> = {
  title: 'Foundation/1. Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Le composant Container fournit une largeur maximale cohérente et un padding responsive pour le contenu. 
Il est optimisé pour l'expérience utilisateur des femmes enceintes avec des tailles de container adaptées 
aux différents contextes d'utilisation (lecture, formulaires, navigation).

**Considérations grossesse :**
- Tailles généreuses pour réduire la fatigue visuelle
- Espacement confortable pour une navigation tactile facile
- Responsive design adapté aux préférences d'écran pendant la grossesse
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Taille du container déterminant la largeur maximale',
      table: {
        type: { summary: 'sm | md | lg | xl | full' },
        defaultValue: { summary: 'md' },
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
      control: 'text',
      description: 'Contenu du container',
    },
    className: {
      control: 'text',
      description: 'Classes CSS supplémentaires',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Container>

// Content de démonstration pregnancy-friendly
const SampleContent = ({ title = "Contenu d'exemple" }: { title?: string }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-primary">{title}</h2>
    <p className="text-neutral leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris.
    </p>
    <div className="flex gap-4">
      <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 
                         min-h-[44px] min-w-[44px] font-medium">
        Action Primaire
      </button>
      <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90
                         min-h-[44px] min-w-[44px] font-medium">
        Action Secondaire
      </button>
    </div>
  </div>
)

/**
 * Container par défaut avec taille médium.
 * Idéal pour la plupart du contenu du site.
 */
export const Default: Story = {
  args: {
    size: 'md',
    children: <SampleContent title="Container par défaut (md)" />,
  },
}

/**
 * Container petit pour contenu focused comme les articles et formulaires.
 * Optimisé pour la lecture et la concentration pendant la grossesse.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: <SampleContent title="Container petit (sm) - Contenu focused" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Container étroit idéal pour :
- Articles de blog et contenu éditorial
- Formulaires de contact et d'inscription
- Contenu nécessitant une concentration soutenue

Largeur optimisée pour réduire la fatigue oculaire pendant la grossesse.
        `,
      },
    },
  },
}

/**
 * Container médium pour usage général.
 * Équilibre optimal entre lisibilité et utilisation de l'espace.
 */
export const Medium: Story = {
  args: {
    size: 'md',
    children: <SampleContent title="Container médium (md) - Usage général" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Container standard pour :
- Pages principales du site
- Présentation de services
- Contenu mixte (texte + images)

Taille par défaut recommandée pour l'expérience utilisateur optimale.
        `,
      },
    },
  },
}

/**
 * Container large pour dashboards et layouts complexes.
 * Adapté aux écrans plus grands et contenu riche.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gris p-6 rounded-lg">
            <SampleContent title={`Section ${i}`} />
          </div>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
Container large pour :
- Dashboards utilisateur
- Galeries d'images
- Layouts complexes multi-colonnes

Idéal pour les écrans desktop et tablettes.
        `,
      },
    },
  },
}

/**
 * Container extra large pour contenu très étendu.
 * Usage spécialisé pour des besoins spécifiques.
 */
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-soft p-4 rounded-lg min-h-[120px] 
                                 flex items-center justify-center">
            <span className="text-neutral font-medium">Élément {i}</span>
          </div>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
Container extra large pour :
- Interfaces d'administration
- Affichage de données étendues
- Layouts nécessitant beaucoup d'espace

À utiliser avec précaution sur mobile.
        `,
      },
    },
  },
}

/**
 * Container pleine largeur avec padding uniquement.
 * Pour contenu qui doit s'étendre sur toute la largeur.
 */
export const FullWidth: Story = {
  args: {
    size: 'full',
    children: (
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-lg">
        <SampleContent title="Container pleine largeur (full)" />
        <div className="mt-8 text-sm text-neutral/70">
          Ce container s'étend sur toute la largeur disponible avec padding uniquement.
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
Container pleine largeur pour :
- Héros sections
- Backgrounds colorés
- Contenu qui doit toucher les bords

Conserve le padding pour maintenir la lisibilité.
        `,
      },
    },
  },
}

/**
 * Démonstration des différentes tailles côte à côte.
 * Visualisation comparative des containers.
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Comparaison des tailles de Container
      </h2>
      
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <div key={size} className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral">
            Container {size}
          </h3>
          <div className="border-2 border-dashed border-primary/20">
            <Container size={size}>
              <div className="bg-gris p-4 rounded">
                <p className="text-neutral">
                  Container taille "{size}" - Largeur maximale et padding adaptatif
                </p>
                <div className="mt-2 text-xs text-neutral/60">
                  Classes appliquées : {size === 'sm' && 'max-w-2xl mx-auto px-4 sm:px-6'}
                  {size === 'md' && 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}
                  {size === 'lg' && 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'}
                  {size === 'xl' && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
                  {size === 'full' && 'w-full px-4 sm:px-6 lg:px-8'}
                </div>
              </div>
            </Container>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Vue comparative des différentes tailles de containers pour aider 
au choix de la taille appropriée selon le contexte d'utilisation.
        `,
      },
    },
  },
}

/**
 * Container avec élément HTML personnalisé (section).
 * Démontre la flexibilité du prop 'as'.
 */
export const CustomElement: Story = {
  args: {
    size: 'md',
    as: 'section',
    children: <SampleContent title="Container comme élément <section>" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Le container peut utiliser n'importe quel élément HTML comme racine 
grâce au prop 'as'. Utile pour la sémantique HTML correcte.
        `,
      },
    },
  },
}

/**
 * Container avec classes personnalisées.
 * Démontre l'extension avec des styles supplémentaires.
 */
export const WithCustomStyles: Story = {
  args: {
    size: 'md',
    className: 'bg-gradient-to-br from-white to-soft/30 border border-primary/10 rounded-xl shadow-lg',
    children: <SampleContent title="Container avec styles personnalisés" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Le container peut être étendu avec des classes CSS personnalisées 
pour créer des variations visuelles spécifiques.
        `,
      },
    },
  },
}