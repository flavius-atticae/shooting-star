import { addons } from 'storybook/manager-api';
import customTheme from './theme';

/**
 * Storybook Manager Configuration
 * 
 * Applies the comprehensive Pauline Roussel brand theming and
 * configures the Storybook interface for optimal usability.
 * 
 * Features:
 * - Complete brand theme integration
 * - Pregnancy-safe design considerations  
 * - Accessibility optimizations
 * - French-Canadian cultural sensitivity
 * - Professional healthcare-adjacent presentation
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
    renderLabel: ({ name, type }) => {
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
    
    // Custom toolbar items for maternal wellness context
    'storybook/viewport': {
      styles: {
        // Custom viewport labels with pregnancy context
        xs: { name: 'Mobile Portrait (Nursing)', styles: { width: '380px', height: '100%' } },
        sm: { name: 'Mobile Landscape', styles: { width: '640px', height: '100%' } },
        md: { name: 'Tablet (Bedside)', styles: { width: '768px', height: '100%' } },
        lg: { name: 'Desktop', styles: { width: '1024px', height: '100%' } },
        xl: { name: 'Desktop Large', styles: { width: '1280px', height: '100%' } },
      }
    }
  },
  
  // Initial state configuration for optimal user experience
  initialActive: 'canvas',           // Start with canvas view
  showToolbar: true,                 // Always show toolbar for functionality
  isFullscreen: false,              // Start in windowed mode
  showNav: true,                    // Always show navigation
  showPanel: true,                  // Show panel by default
  
  // Performance and accessibility settings
  enableShortcuts: true,            // Keep keyboard shortcuts for accessibility
  
  // Custom manager head for additional assets if needed
  managerHead: (head) => `
    ${head}
    <style>
      /* Custom styles for pregnancy-safe design enhancements */
      
      /* Larger touch targets for pregnancy accommodations */
      .sidebar-container button,
      .toolbar-container button {
        min-height: 44px !important;
        min-width: 44px !important;
      }
      
      /* Enhanced focus indicators for accessibility */
      .sidebar-container *:focus,
      .toolbar-container *:focus {
        outline: 3px solid #2d3f2d !important;
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
      
      /* Custom scrollbar styling for brand consistency */
      .sidebar-container::-webkit-scrollbar {
        width: 8px;
      }
      
      .sidebar-container::-webkit-scrollbar-track {
        background: #f5f4f2;
      }
      
      .sidebar-container::-webkit-scrollbar-thumb {
        background: #9eb49e;
        border-radius: 4px;
      }
      
      .sidebar-container::-webkit-scrollbar-thumb:hover {
        background: #618462;
      }
    </style>
    
    <!-- Preload critical fonts for better performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" as="style">
    
    <!-- Meta tags for better SEO and social sharing -->
    <meta name="description" content="Pauline Roussel Design System - Component library for perinatal yoga and motherhood wellness platform">
    <meta name="keywords" content="design system, components, react, storybook, perinatal yoga, motherhood wellness">
    <meta name="author" content="Pauline Roussel">
    
    <!-- Open Graph tags for social sharing -->
    <meta property="og:title" content="Pauline Roussel Design System">
    <meta property="og:description" content="Interactive component library for perinatal yoga and motherhood wellness">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://flavius-atticae.github.io/shooting-star/">
    
    <!-- Accessibility enhancements -->
    <meta name="theme-color" content="#618462">
    <meta name="color-scheme" content="light">
  `,
});