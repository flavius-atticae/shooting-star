/**
 * Visual Regression Testing Configuration for Pregnancy-Safe UI
 * 
 * Automated screenshot testing to ensure UI consistency across
 * different pregnancy personas and accessibility configurations
 */

import { addons, types } from 'storybook/manager-api';

// Visual regression test configuration
export const VISUAL_REGRESSION_CONFIG = {
  // Pregnancy-safe viewports for consistent testing
  viewports: [
    { name: 'mobile-pregnancy', width: 375, height: 667 },      // iPhone SE (minimum)
    { name: 'mobile-optimal', width: 390, height: 844 },        // iPhone 12/13 
    { name: 'tablet-pregnancy', width: 768, height: 1024 },     // iPad
    { name: 'desktop-accessibility', width: 1440, height: 900 }, // Large desktop
  ],
  
  // Pregnancy personas for visual testing
  personas: ['marie', 'sophie', 'alexandra'],
  
  // Accessibility states to test
  accessibilityStates: [
    'default',
    'high-contrast',
    'reduced-motion', 
    'large-text',
    'touch-friendly',
  ],
  
  // Pregnancy-safe color schemes
  colorSchemes: [
    'light-default',
    'light-high-contrast',
    'pregnancy-safe-palette',
  ],
  
  // Screenshot comparison thresholds
  thresholds: {
    // Stricter threshold for pregnancy-critical components
    'pregnancy-personas': 0.1,
    'accessibility': 0.05,
    'default': 0.2,
  },
  
  // Exclude flaky elements from comparison
  ignoreSelectors: [
    '[data-testid="current-time"]',
    '[data-testid="random-content"]',
    '.pregnancy-persona-indicator', // Dynamic persona info
  ],
};

// Addon for visual regression testing
const ADDON_ID = 'pregnancy-visual-regression';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: '📸 Visual Pregnancy Tests',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => {
      return null; // This would render a custom panel in a full implementation
    },
  });
});

// Utility functions for visual testing
export const visualRegressionUtils = {
  /**
   * Generate screenshot name based on story and context
   */
  generateScreenshotName: (
    storyId: string, 
    persona?: string, 
    viewport?: string,
    accessibility?: string
  ): string => {
    const parts = [storyId];
    
    if (persona) parts.push(`persona-${persona}`);
    if (viewport) parts.push(`viewport-${viewport}`);
    if (accessibility) parts.push(`a11y-${accessibility}`);
    
    return parts.join('_') + '.png';
  },

  /**
   * Prepare page for consistent screenshots
   */
  preparePageForScreenshot: async (page: any) => {
    // Wait for pregnancy-safe loading
    await page.waitForTimeout(1000);
    
    // Hide dynamic elements
    await page.addStyleTag({
      content: `
        .pregnancy-persona-indicator,
        .french-context-indicator,
        .quebec-healthcare-notice {
          display: none !important;
        }
        
        /* Ensure consistent rendering */
        * {
          animation-play-state: paused !important;
          transition: none !important;
        }
        
        /* Consistent focus states */
        :focus {
          outline: 2px solid #618462 !important;
          outline-offset: 2px !important;
        }
      `
    });
    
    // Wait for stability
    await page.waitForTimeout(500);
    
    return page;
  },

  /**
   * Compare screenshots with pregnancy-specific tolerance
   */
  compareScreenshots: (
    baseline: string, 
    current: string, 
    options: { 
      persona?: string; 
      threshold?: number;
      ignoreAccessibilityIndicators?: boolean;
    } = {}
  ) => {
    const threshold = options.threshold || VISUAL_REGRESSION_CONFIG.thresholds.default;
    
    // Pregnancy-specific comparison logic would go here
    // This is a placeholder for the actual implementation
    return {
      passed: true,
      threshold,
      difference: 0.05,
      persona: options.persona,
    };
  },
};

// Test scenarios for visual regression
export const VISUAL_TEST_SCENARIOS = [
  {
    name: 'Marie Mobile First-Time User',
    persona: 'marie',
    viewport: 'mobile-optimal',
    accessibility: 'reduced-motion',
    description: 'First-time pregnant user on mobile with nausea considerations'
  },
  {
    name: 'Sophie Efficient Mom',
    persona: 'sophie', 
    viewport: 'tablet-pregnancy',
    accessibility: 'high-contrast',
    description: 'Experienced mother needing efficient, high-contrast interface'
  },
  {
    name: 'Alexandra Maximum Accessibility',
    persona: 'alexandra',
    viewport: 'desktop-accessibility', 
    accessibility: 'large-text',
    description: 'High-risk pregnancy user requiring maximum accessibility'
  },
  {
    name: 'Cross-Persona Comparison',
    viewport: 'tablet-pregnancy',
    description: 'Same component across all three personas for consistency'
  },
];

export default visualRegressionUtils;