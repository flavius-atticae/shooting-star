import { create } from 'storybook/theming';

/**
 * Minimal Storybook Theme Configuration
 * 
 * Uses default Storybook theming with minimal customization.
 * Maintains only essential branding elements without custom colors.
 */
export default create({
  base: 'light',
  
  // Minimal brand identity - just the title
  brandTitle: 'Component Library',
  brandUrl: undefined,
  brandImage: undefined,
  brandTarget: '_self',
});