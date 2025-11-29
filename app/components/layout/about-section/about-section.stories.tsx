import type { Meta, StoryObj } from '@storybook/react';
import { AboutSection } from './about-section';

const meta = {
  title: 'Layout/3. About',
  component: AboutSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Section À propos avec contenu biographique et méthode d'accompagnement.

**Features**:
- Layout 2/3 + 1/3 (row 1) + 3 colonnes (row 2)
- Typography: The Seasons (headings) + Barlow (content)
- Séparateurs verticaux entre colonnes (desktop)
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes (#517982), contraste élevé, espacement généreux.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['compact', 'normal', 'spacious'],
    },
    containerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: 'normal',
    containerSize: 'lg',
  },
};