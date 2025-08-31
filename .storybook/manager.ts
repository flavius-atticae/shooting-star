import { addons } from 'storybook/manager-api';
import customTheme from './theme';

/**
 * Storybook Manager Configuration
 * 
 * Configures the Storybook interface for optimal usability while
 * maintaining default Storybook theming.
 * 
 * Features:
 * - Accessibility optimizations
 * - Enhanced touch targets for mobile/tablet use
 * - Pregnancy-friendly UX considerations (viewport names, reduced motion)
 * - Performance optimizations
 */
addons.setConfig({
  theme: customTheme,
  
  // Panel Configuration
  panelPosition: 'bottom',           // Bottom panel for better mobile experience
  selectedPanel: 'controls',         // Default to controls panel
  
  // Sidebar Configuration (Enhanced for component discovery)
  sidebar: {
    showRoots: false,                // Hide category roots for cleaner navigation
    collapsedRoots: ['foundation'],  // Collapse foundation by default
    renderLabel: ({ name }) => {
      // Custom label rendering for better French-Canadian context
      const labels = {
        'Foundation': 'Fondation',
        'Navigation': 'Navigation', 
        'Content': 'Contenu',
        'Forms': 'Formulaires',
        'Feedback': 'Rétroaction'
      };
      return labels[name] || name;
    },
  },
  
  // Navigation Configuration
  navSize: 280,                      // Optimal sidebar width for component names
  bottomPanelHeight: 300,           // Comfortable panel height for controls
  rightPanelWidth: 400,             // Wide right panel for documentation
  
  // Toolbar Configuration (Pregnancy-specific accommodations)
  toolbar: {
    title: { hidden: false },       // Show title for brand recognition
    zoom: { hidden: false },        // Keep zoom for accessibility
    eject: { hidden: true },        // Hide eject (not needed for this use case)
    copy: { hidden: false },        // Keep copy for developer workflow
    fullscreen: { hidden: false },  // Keep fullscreen for mobile testing
  },
  
  // Initial state configuration for optimal user experience
  initialActive: 'canvas',           // Start with canvas view
  showToolbar: true,                 // Always show toolbar for functionality
  isFullscreen: false,              // Start in windowed mode
  showNav: true,                    // Always show navigation
  showPanel: true,                  // Show panel by default
  
  // Performance and accessibility settings
  enableShortcuts: true,            // Keep keyboard shortcuts for accessibility
  
  // Custom manager head for accessibility and performance features (no brand colors)
  managerHead: (head: string) => `
    ${head}
    <style>
      /* Accessibility and UX improvements without brand colors */
      
      /* Larger touch targets for pregnancy accommodations */
      .sidebar-container button,
      .toolbar-container button {
        min-height: 44px !important;
        min-width: 44px !important;
      }
      
      /* Enhanced focus indicators for accessibility */
      .sidebar-container *:focus,
      .toolbar-container *:focus {
        outline: 3px solid #005fcc !important; /* Standard blue focus indicator */
        outline-offset: 2px !important;
      }
      
      /* Reduced motion support for nausea sensitivity */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .sidebar-container,
        .toolbar-container {
          border: 2px solid #000 !important;
        }
      }
    </style>
    
    <!-- Preload critical fonts for better performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" as="style">
    
    <!-- Meta tags for better SEO -->
    <meta name="description" content="Component library - Interactive Storybook documentation">
    <meta name="keywords" content="design system, components, react, storybook">
    
    <!-- Open Graph tags for social sharing -->
    <meta property="og:title" content="Component Library">
    <meta property="og:description" content="Interactive component library documentation">
    <meta property="og:type" content="website">
    
    <!-- Accessibility enhancements with default theme color -->
    <meta name="color-scheme" content="light">
  `,
});