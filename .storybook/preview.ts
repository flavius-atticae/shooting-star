import type { Preview } from '@storybook/react-vite';
import '../app/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // Enhanced control configurations for pregnancy-safe design
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      toc: true,
      // Enhanced documentation for maternal wellness context
      source: {
        state: 'open',
        format: 'dedent',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    // Accessibility testing parameters
    a11y: {
      context: '#storybook-root',
      config: {
        rules: [
          // Pregnancy-specific accessibility rules
          {
            id: 'color-contrast',
            options: { level: 'AA' },
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
      manual: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff', // Default white background
        },
        {
          name: 'dark',
          value: '#333333', // Standard dark background
        },
        {
          name: 'gray',
          value: '#f8f8f8', // Light gray background
        },
      ],
    },
    viewport: {
      // Pregnancy and motherhood context-specific viewports
      viewports: {
        xs: {
          name: 'Mobile Portrait (Nursing/Feeding)',
          styles: { width: '380px', height: '100%' },
          type: 'mobile',
        },
        sm: {
          name: 'Mobile Landscape (Bedside)', 
          styles: { width: '640px', height: '100%' },
          type: 'mobile',
        },
        md: {
          name: 'Tablet (Hospital/Clinic)',
          styles: { width: '768px', height: '100%' },
          type: 'tablet',
        },
        lg: {
          name: 'Desktop (Home Office)',
          styles: { width: '1024px', height: '100%' },
          type: 'desktop',
        },
        xl: {
          name: 'Desktop Large (Professional)',
          styles: { width: '1280px', height: '100%' },
          type: 'desktop',
        },
        '2xl': {
          name: '2XL (Accessibility)',
          styles: { width: '1536px', height: '100%' },
          type: 'desktop',
        },
        // Additional pregnancy-specific viewport for testing
        nursing: {
          name: 'One-Handed Mobile (320px)',
          styles: { width: '320px', height: '568px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'lg', // Start with desktop view for better component overview
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