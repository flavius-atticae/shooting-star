import type { Meta, StoryObj } from '@storybook/react'
import { Background, BackgroundPattern, useBackgroundClasses } from './background'

const meta: Meta<typeof Background> = {
  title: 'Foundation/3. Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Le composant Background fournit des arrière-plans pregnancy-safe utilisant la palette 
de couleurs Pauline Roussel. Il est conçu pour créer des expériences visuelles douces 
et rassurantes, évitant les couleurs agressives qui peuvent déclencher l'anxiété ou 
les nausées pendant la grossesse.

**Couleurs pregnancy-safe :**
- Pas de rouge vif (évite l'anxiété médicale)
- Gradients doux pour les transitions visuelles
- Couleurs apaisantes issues de la palette brand

**Variantes disponibles :**
- \`white\` : Arrière-plan blanc pur
- \`accent\` : Gris clair apaisant
- \`soft\` : Gradient doux blanc vers gris
- \`gradient-soft\` : Gradient complexe avec rose pâle
- \`gradient-warm\` : Gradient chaleureux avec beige
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['white', 'accent', 'soft', 'gradient-soft', 'gradient-warm'],
      description: 'Variante de l\'arrière-plan',
      table: {
        type: { summary: 'white | accent | soft | gradient-soft | gradient-warm' },
        defaultValue: { summary: 'white' },
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
      description: 'Contenu à afficher sur l\'arrière-plan',
    },
    className: {
      control: 'text',
      description: 'Classes CSS supplémentaires',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Background>

// Contenu de démonstration pour tester la lisibilité
const SampleContent = ({ title = "Contenu d'exemple" }: { title?: string }) => (
  <div className="p-8 max-w-2xl mx-auto">
    <h2 className="text-3xl font-semibold text-primary mb-6">{title}</h2>
    <div className="space-y-4 text-neutral">
      <p className="leading-relaxed text-lg">
        Ce contenu démontre la lisibilité sur l'arrière-plan sélectionné. 
        Les couleurs sont optimisées pour le confort visuel pendant la grossesse.
      </p>
      <p className="text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris.
      </p>
      <div className="flex gap-4 pt-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 
                           min-h-[44px] font-medium transition-colors">
          Action Primaire
        </button>
        <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90
                           min-h-[44px] font-medium transition-colors">
          Action Secondaire
        </button>
      </div>
    </div>
  </div>
)

/**
 * Arrière-plan blanc par défaut.
 * Base neutre pour la majorité du contenu.
 */
export const White: Story = {
  args: {
    variant: 'white',
    children: <SampleContent title="Arrière-plan Blanc (par défaut)" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Arrière-plan blanc pur, idéal pour :
- Contenu principal
- Lisibilité maximale
- Contraste optimal avec le texte

C'est la base neutre recommandée pour la plupart des sections.
        `,
      },
    },
  },
}

/**
 * Arrière-plan accent avec le gris clair de la palette.
 * Crée une distinction visuelle douce.
 */
export const Accent: Story = {
  args: {
    variant: 'accent',
    children: <SampleContent title="Arrière-plan Accent (gris clair)" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Arrière-plan gris clair (#f5f4f2) pour :
- Sections alternées
- Mise en évidence douce
- Distinction visuelle sans agressivité

Couleur apaisante issue de la palette Pauline Roussel.
        `,
      },
    },
  },
}

/**
 * Gradient doux blanc vers gris.
 * Transition subtile pour créer de la profondeur.
 */
export const SoftGradient: Story = {
  args: {
    variant: 'soft',
    children: <SampleContent title="Gradient Doux (blanc → gris)" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Gradient subtil de blanc vers gris clair pour :
- Héros sections
- Transitions visuelles douces
- Ajout de profondeur sans distraction

Particulièrement adapté pour les interfaces pregnancy-friendly.
        `,
      },
    },
  },
}

/**
 * Gradient complexe avec rose pâle.
 * Ajoute une nuance chaleureuse pregnancy-safe.
 */
export const ComplexGradient: Story = {
  args: {
    variant: 'gradient-soft',
    children: <SampleContent title="Gradient Complexe (avec rose pâle)" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Gradient sophistiqué blanc → rose pâle → gris pour :
- Sections spéciales
- Mise en évidence premium
- Expérience visuelle enrichie

Utilise la couleur "soft" (#ffddd3) de la palette Pauline Roussel.
        `,
      },
    },
  },
}

/**
 * Gradient chaleureux avec beige.
 * Nuances chaudes et rassurantes.
 */
export const WarmGradient: Story = {
  args: {
    variant: 'gradient-warm',
    children: <SampleContent title="Gradient Chaleureux (avec beige)" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Gradient chaleureux blanc → beige → gris pour :
- Sections accueillantes
- Tonalités rassurantes
- Ambiance cocooning

Utilise la couleur "warm" (#ceaf9b) pour une sensation de chaleur.
        `,
      },
    },
  },
}

/**
 * Comparaison de toutes les variantes d'arrière-plan.
 * Vue d'ensemble pour choisir la variante appropriée.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold text-primary p-6 bg-white">
        Comparaison des variantes Background
      </h2>
      
      {(['white', 'accent', 'soft', 'gradient-soft', 'gradient-warm'] as const).map((variant) => (
        <Background key={variant} variant={variant}>
          <div className="p-6 min-h-[200px] flex items-center">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Variante "{variant}"
              </h3>
              <p className="text-neutral mb-4">
                Démonstration de lisibilité et de confort visuel sur cette variante d'arrière-plan.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded min-h-[44px] 
                               hover:bg-primary/90 transition-colors">
                Bouton test
              </button>
            </div>
          </div>
        </Background>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Vue comparative de toutes les variantes d'arrière-plan pour évaluer :
- La lisibilité du contenu
- L'harmonie des couleurs
- Le confort visuel pendant la grossesse
        `,
      },
    },
  },
}

/**
 * Background avec élément HTML personnalisé (section).
 * Utilisation du prop 'as' pour la sémantique HTML.
 */
export const CustomElement: Story = {
  args: {
    variant: 'soft',
    as: 'section',
    children: <SampleContent title="Background comme élément <section>" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Le composant Background peut utiliser différents éléments HTML 
comme racine pour respecter la sémantique (section, aside, header, etc.).
        `,
      },
    },
  },
}

/**
 * Background avec classes CSS personnalisées.
 * Extension avec styles additionnels.
 */
export const WithCustomStyles: Story = {
  args: {
    variant: 'gradient-warm',
    className: 'border-t-4 border-primary shadow-inner',
    children: <SampleContent title="Background avec styles personnalisés" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
Le Background peut être étendu avec des classes CSS personnalisées 
pour des effets visuels spéciaux (bordures, ombres, etc.).
        `,
      },
    },
  },
}

/**
 * Démonstration du composant BackgroundPattern.
 * Motifs subtils pregnancy-safe pour enrichir l'arrière-plan.
 */
export const WithPatterns: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary p-6 bg-white">
        Background avec motifs subtils
      </h2>
      
      {(['dots', 'lines', 'grid'] as const).map((pattern) => (
        <div key={pattern} className="relative min-h-[300px]">
          <Background variant="accent">
            <BackgroundPattern 
              pattern={pattern} 
              intensity="subtle" 
              className="opacity-50" 
            />
            <div className="relative z-10 p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Motif "{pattern}" subtil
              </h3>
              <p className="text-neutral max-w-2xl">
                Les motifs de fond sont conçus pour être pregnancy-safe : 
                très subtils pour éviter la fatigue visuelle et les nausées, 
                tout en ajoutant une texture délicate à l'interface.
              </p>
              <div className="mt-6">
                <button className="bg-secondary text-white px-6 py-3 rounded-lg 
                                 hover:bg-secondary/90 min-h-[44px] font-medium">
                  Test de lisibilité
                </button>
              </div>
            </div>
          </Background>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Le composant BackgroundPattern ajoute des motifs subtils :
- Points, lignes ou grille
- Intensité contrôlée (subtle/light)  
- Opacité réduite pour le confort visuel
- Pregnancy-safe (pas de motifs agressifs)

Idéal pour enrichir visuellement sans compromettre la lisibilité.
        `,
      },
    },
  },
}

/**
 * Démonstration du hook useBackgroundClasses.
 * Utilisation des classes CSS directement.
 */
export const UseBackgroundClasses: Story = {
  render: () => {
    const backgroundClasses = useBackgroundClasses()
    
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Hook useBackgroundClasses
        </h2>
        <p className="text-neutral mb-6">
          Ce hook permet d'obtenir les classes CSS des backgrounds pour 
          une utilisation directe dans les composants.
        </p>
        
        {Object.entries(backgroundClasses).map(([key, classes]) => (
          <div key={key} className="space-y-2">
            <h4 className="font-semibold text-neutral">Variante "{key}":</h4>
            <code className="block bg-neutral text-white p-3 rounded text-sm font-mono">
              className="{classes}"
            </code>
            <div className={`${classes} p-4 rounded border`}>
              <span className="text-neutral">Aperçu de la classe</span>
            </div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Le hook \`useBackgroundClasses()\` retourne un objet avec toutes 
les classes CSS des variantes de background. Pratique pour :
- Application conditionnelle de classes
- Construction dynamique de composants
- Réutilisation des styles sans composant wrapper
        `,
      },
    },
  },
}