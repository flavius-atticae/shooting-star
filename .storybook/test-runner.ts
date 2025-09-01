import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe, configureAxe } from 'axe-playwright';

/**
 * Simplified Storybook Test Runner for Pregnancy-Safe Testing
 */

const config: TestRunnerConfig = {
  async preVisit(page) {
    // Inject axe for accessibility testing
    await injectAxe(page);
    console.log('🤰 Running pregnancy-safe accessibility tests...');
  },

  async postVisit(page, context) {
    // Run accessibility tests on all stories
    await checkA11y(page, '#storybook-root', {
      axeOptions: {
        tags: ['wcag21aa', 'best-practice'],
      },
    });
    
    console.log(`✅ Accessibility test completed for: ${context.id}`);
  },
};

export default config;