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
