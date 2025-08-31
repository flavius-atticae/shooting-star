import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Pauline Roussel | Yoga & Motherhood',
  brandUrl: 'https://paulineroussel.ca',
  brandImage: undefined,
  brandTarget: '_self',
  
  // Colors - Using Pauline Roussel brand palette
  colorPrimary: '#618462', // Primary green
  colorSecondary: '#517982', // Secondary blue
  
  // UI colors
  appBg: '#f5f4f2', // Gris background
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#9eb49e', // Primary light
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#5e4530', // Neutral brown
  textInverseColor: '#ffffff',
  
  // Toolbar default and active colors
  barTextColor: '#5e4530',
  barSelectedColor: '#618462', // Primary green
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#9eb49e',
  inputTextColor: '#5e4530',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
});