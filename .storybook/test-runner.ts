import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe, configureAxe } from 'axe-playwright';

/**
 * Storybook Test Runner Configuration for Pregnancy-Safe Testing
 * 
 * Runs automated accessibility and pregnancy-specific tests on all stories
 */

const config: TestRunnerConfig = {
  setup() {
    // Global setup for pregnancy-safe testing
    console.log('🤰 Setting up pregnancy-safe test environment...');
  },

  async preRender(page) {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
    
    // Configure axe for pregnancy-specific requirements
    await configureAxe(page, {
      rules: {
        // Enhanced color contrast for pregnancy vision changes
        'color-contrast-enhanced': { enabled: true },
        
        // Touch target size validation
        'target-size': { enabled: true },
        
        // Motion sensitivity rules
        'motion': { enabled: true },
        
        // French language support
        'lang': { enabled: true },
        
        // Focus management for fatigue
        'focus-order-semantics': { enabled: true },
        
        // Screen reader support
        'label': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-required-children': { enabled: true },
      },
      tags: ['wcag21aa', 'wcag21aaa', 'best-practice'],
    });

    // Add pregnancy-safe CSS for testing
    await page.addStyleTag({
      content: `
        /* Pregnancy-safe testing indicators */
        .pregnancy-test-indicator {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #618462;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 10000;
        }
        
        /* Highlight elements that don't meet touch target size */
        [data-touch-target-too-small] {
          outline: 2px solid orange !important;
          outline-offset: 2px;
        }
        
        /* Highlight problematic colors */
        [data-pregnancy-unsafe-color] {
          box-shadow: 0 0 0 2px red !important;
        }
      `
    });
  },

  async postRender(page, context) {
    const storyId = context.id;
    const isPersonaStory = storyId.includes('pregnancy-personas');
    
    // Basic accessibility check for all stories
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      axeOptions: {
        rules: {
          // Pregnancy-specific accessibility rules
          'color-contrast': { enabled: true },
          'target-size': { enabled: true },
          'focus-visible': { enabled: true },
        },
      },
    });

    // Additional pregnancy-safe tests for persona stories
    if (isPersonaStory) {
      await page.addScriptTag({
        content: `
          window.runPregnancySafeTests = async function() {
            const results = {
              touchTargets: [],
              colors: { warnings: [] },
              motion: { warnings: [] },
              french: { warnings: [] }
            };
            
            // Test touch targets
            const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
            interactiveElements.forEach((element) => {
              const rect = element.getBoundingClientRect();
              if (rect.width < 44 || rect.height < 44) {
                element.setAttribute('data-touch-target-too-small', 'true');
                results.touchTargets.push({
                  element: element.tagName,
                  width: rect.width,
                  height: rect.height,
                  text: element.textContent?.substring(0, 50) || ''
                });
              }
            });
            
            // Test for pregnancy-unsafe colors (bright reds)
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element) => {
              const style = getComputedStyle(element);
              const bgColor = style.backgroundColor;
              const color = style.color;
              
              // Check for problematic red colors
              if (bgColor.includes('rgb(255, 0, 0)') || color.includes('rgb(255, 0, 0)') ||
                  bgColor.includes('#FF0000') || color.includes('#FF0000')) {
                element.setAttribute('data-pregnancy-unsafe-color', 'true');
                results.colors.warnings.push('Problematic red color detected');
              }
            });
            
            // Test motion safety
            allElements.forEach((element) => {
              const style = getComputedStyle(element);
              if (style.animationIterationCount === 'infinite') {
                results.motion.warnings.push('Infinite animation detected (may trigger nausea)');
              }
            });
            
            return results;
          };
        `
      });

      // Run pregnancy-safe tests
      const pregnancyTestResults = await page.evaluate(() => {
        // @ts-ignore
        return window.runPregnancySafeTests();
      });

      // Log pregnancy-safe test results
      if (pregnancyTestResults.touchTargets.length > 0) {
        console.warn(`❌ Touch target issues in ${storyId}:`, pregnancyTestResults.touchTargets);
      } else {
        console.log(`✅ Touch targets OK for ${storyId}`);
      }

      if (pregnancyTestResults.colors.warnings.length > 0) {
        console.warn(`❌ Color issues in ${storyId}:`, pregnancyTestResults.colors.warnings);
      } else {
        console.log(`✅ Colors pregnancy-safe for ${storyId}`);
      }

      if (pregnancyTestResults.motion.warnings.length > 0) {
        console.warn(`❌ Motion issues in ${storyId}:`, pregnancyTestResults.motion.warnings);
      } else {
        console.log(`✅ Motion pregnancy-safe for ${storyId}`);
      }

      // Test French content if persona is Marie or Sophie
      if (storyId.includes('marie') || storyId.includes('sophie')) {
        const frenchContent = await page.evaluate(() => {
          const textElements = document.querySelectorAll('h1, h2, h3, p, button, a');
          const frenchTexts = [];
          const frenchIndicators = ['le ', 'la ', 'les ', 'du ', 'des ', 'et ', 'pour ', 'avec'];
          
          textElements.forEach((el) => {
            const text = el.textContent?.toLowerCase() || '';
            if (frenchIndicators.some(indicator => text.includes(indicator))) {
              frenchTexts.push(el.textContent?.substring(0, 50));
            }
          });
          
          return {
            hasFrenchContent: frenchTexts.length > 0,
            samples: frenchTexts.slice(0, 3)
          };
        });

        if (!frenchContent.hasFrenchContent) {
          console.warn(`❌ No French content detected in ${storyId}`);
        } else {
          console.log(`✅ French content detected in ${storyId}:`, frenchContent.samples);
        }
      }

      // Performance tests for pregnancy users (slower devices/connections)
      const performanceMetrics = await page.evaluate(() => {
        const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
          loadComplete: timing.loadEventEnd - timing.loadEventStart,
          renderTime: timing.loadEventEnd - timing.fetchStart
        };
      });

      // Log performance for pregnancy users (should be faster due to fatigue)
      if (performanceMetrics.renderTime > 3000) {
        console.warn(`⚠️ Slow render time for pregnancy users: ${performanceMetrics.renderTime}ms`);
      } else {
        console.log(`✅ Performance OK for pregnancy users: ${performanceMetrics.renderTime}ms`);
      }
    }
  },

  // Tags to include/exclude in testing
  tags: {
    include: ['pregnancy-safe', 'accessibility', 'quebec-market'],
    exclude: ['skip-pregnancy-tests'],
  },
};

export default config;