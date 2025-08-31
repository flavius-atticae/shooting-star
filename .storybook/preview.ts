import type { Preview } from '@storybook/react-vite';
import '../app/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f5f4f2', // Brand gris color
        },
        {
          name: 'dark',
          value: '#030201', // Brand dark neutral
        },
        {
          name: 'soft',
          value: '#ffddd3', // Brand soft rose
        },
        {
          name: 'cool',
          value: '#dae6ea', // Brand cool blue
        },
      ],
    },
    viewport: {
      viewports: {
        xs: {
          name: 'XS (380px)',
          styles: { width: '380px', height: '100%' },
        },
        sm: {
          name: 'SM (640px)', 
          styles: { width: '640px', height: '100%' },
        },
        md: {
          name: 'MD (768px)',
          styles: { width: '768px', height: '100%' },
        },
        lg: {
          name: 'LG (1024px)',
          styles: { width: '1024px', height: '100%' },
        },
        xl: {
          name: 'XL (1280px)',
          styles: { width: '1280px', height: '100%' },
        },
        '2xl': {
          name: '2XL (1536px)',
          styles: { width: '1536px', height: '100%' },
        },
      },
    },
    // Actions configured in individual stories using fn() from @storybook/test
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', left: '🌞' },
          { value: 'dark', title: 'Dark', left: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;