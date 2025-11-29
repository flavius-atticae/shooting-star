import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../app/app.css'

const preview: Preview = {
  parameters: {
    // Actions addon - capture events
    // Note: argTypesRegex removed for Chromatic visual test compatibility
    // Use fn() from @storybook/test in individual stories for actions
    actions: {},
    
    // Controls addon - automatic prop detection
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },

    // Docs addon - automated documentation
    docs: {
      extractComponentDescription: (_component: any, { notes }: any) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },

    // Backgrounds addon - pregnancy-safe backgrounds from Pauline Roussel palette
    backgrounds: {
      options: {
        white: {
          name: 'white',
          value: '#ffffff',
        },

        "gris (light background)": {
          name: 'gris (light background)',
          value: '#f5f4f2',
        },

        soft_gradient: {
          name: 'soft gradient',
          value: 'linear-gradient(135deg, #ffffff 0%, #ffddd3 100%)',
        },

        warm_gradient: {
          name: 'warm gradient', 
          value: 'linear-gradient(135deg, #ffffff 0%, #ceaf9b 100%)',
        }
      }
    },

    // Viewport addon - pregnancy-focused device testing
    viewport: {
      options: {
        // Standard mobile (pregnancy fatigue - prefer larger screens)
        mobile1: {
          name: 'iPhone SE (minimum supported)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobile2: {
          name: 'iPhone 12/13 (optimal mobile)',
          styles: {
            width: '390px', 
            height: '844px',
          },
        },
        // Tablet (ideal for pregnancy use - comfortable viewing)
        tablet: {
          name: 'iPad (pregnancy-friendly)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        // Desktop variations
        desktop: {
          name: 'Desktop 1024px',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        large: {
          name: 'Desktop 1440px',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        // Large for accessibility (vision issues during pregnancy)
        xlarge: {
          name: 'Large Desktop (accessibility)',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      }
    },

    // Accessibility addon - WCAG 2.1 AA compliance for pregnancy context
    a11y: {
      config: {
        rules: [
          {
            // Enhanced color contrast requirements for pregnancy fatigue
            id: 'color-contrast-enhanced',
            enabled: true,
          },
          {
            // Larger touch targets for pregnancy-related swelling
            id: 'target-size',
            enabled: true,
          },
          {
            // Keyboard navigation essential during physical discomfort
            id: 'keyboard',
            enabled: true,
          },
          {
            // Screen reader support for fatigue/concentration issues
            id: 'label',
            enabled: true,
          },
        ],
      },
      // Show violations as warnings during development
      context: '#storybook-root',
      manual: false,
    },

    // Layout configuration for consistent component presentation
    layout: 'padded',
    
    // Options for consistent story presentation
    options: {
      storySort: {
        order: [
          'Introduction',
          'Guidelines Pregnancy-Safe',
          'Foundation',
          ['1. Container', '2. Adaptive Grid', '3. Background'],
          'Layout',
          ['1. Header', '2. Hero', '3. About', '4. Services', '5. Call To Action', '6. Footer'],
          'Design System',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          ['UI', 'Layout', 'Forms'],
          'Templates',
          'Pages',
        ],
      },
    },
  },

  // Global decorators for consistent theming
  decorators: [
    (Story) => (
      <div className="antialiased text-neutral bg-white">
        <Story />
      </div>
    ),
  ],

  // Global arg types for consistent prop controls
  // Global parameters applied to all stories
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
  },

  initialGlobals: {
    viewport: {
      value: 'responsive',
      isRotated: false
    },

    backgrounds: {
      value: 'white'
    }
  }
};

export default preview;