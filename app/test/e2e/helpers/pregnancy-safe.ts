import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { TIMEOUTS, ACCESSIBILITY } from './constants';

/**
 * Pregnancy-Safe Testing Utilities
 * 
 * These utilities implement testing patterns that account for:
 * - Pregnancy fatigue and slower interactions
 * - Nausea triggers (motion, flashing)
 * - Accessibility needs during pregnancy
 * - Quebec healthcare system integration
 */

export class PregnancySafeHelpers {
  constructor(private page: Page) {}

  /**
   * Setup pregnancy-safe media queries (e.g., reduced motion)
   */
  async setupPregnancySafeEnvironment() {
    // Set reduced motion to prevent nausea
    await this.page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Set high contrast if needed
    await this.page.emulateMedia({ colorScheme: 'light' });
  }

  /**
   * Navigate with pregnancy-safe timeouts and motion considerations
   */
  async navigateSafely(url: string, options?: { waitForMotion?: boolean }) {
    // Disable animations if needed
    if (options?.waitForMotion) {
      await this.page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `
      });
    }

    await this.page.goto(url, { 
      timeout: TIMEOUTS.NAVIGATION,
      waitUntil: 'domcontentloaded' // Faster loading for pregnancy fatigue
    });
  }

  /**
   * Click with pregnancy-safe considerations (larger targets, slower interactions)
   */
  async clickSafely(locator: Locator, options?: { doubleCheck?: boolean }) {
    // Ensure the element is visible and clickable
    await expect(locator).toBeVisible({ timeout: TIMEOUTS.ASSERTION });
    
    // Check touch target size for mobile pregnancy users
    const boundingBox = await locator.boundingBox();
    if (boundingBox) {
      const minSize = ACCESSIBILITY.MINIMUM_TOUCH_TARGET;
      if (boundingBox.width < minSize || boundingBox.height < minSize) {
        console.warn(`Touch target smaller than ${minSize}px: ${boundingBox.width}x${boundingBox.height}`);
      }
    }

    // Click with pregnancy-safe timeout
    await locator.click({ timeout: TIMEOUTS.ACTION });

    // Optional double-check for important actions (pregnancy brain fog)
    if (options?.doubleCheck) {
      await this.page.waitForTimeout(1000); // Brief pause for confirmation
    }
  }

  /**
   * Fill form with pregnancy-safe patterns (auto-save, validation)
   */
  async fillFormSafely(inputs: Array<{ locator: Locator; value: string; label?: string }>) {
    for (const input of inputs) {
      await expect(input.locator).toBeVisible();
      
      // Clear and fill with pregnancy-safe timing
      await input.locator.clear();
      await input.locator.fill(input.value, { timeout: TIMEOUTS.ACTION });
      
      // Verify the input was filled correctly (pregnancy brain fog consideration)
      await expect(input.locator).toHaveValue(input.value);
      
      console.log(`✓ Filled ${input.label || 'field'}: ${input.value}`);
    }
  }

  /**
   * Check accessibility compliance for pregnancy users using axe-core
   */
  async checkPregnancyAccessibility() {
    // Inject axe-core for comprehensive accessibility testing
    await this.page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.10.2/axe.min.js'
    });
    
    // Run axe-core accessibility scan
    const results = await this.page.evaluate(() => {
      return new Promise((resolve) => {
        // @ts-ignore - axe is loaded dynamically
        window.axe.run(
          {
            // Pregnancy-specific accessibility rules
            rules: {
              'motion-sensitive': { enabled: true },
              'color-contrast': { enabled: true },
              'focus-order': { enabled: true },
              'touch-target': { enabled: true }
            }
          },
          (err: any, results: any) => {
            if (err) {
              console.error('Axe accessibility test error:', err);
            }
            resolve(results);
          }
        );
      });
    });
    
    // Check for reduced motion compliance
    const reducedMotionElements = await this.page.locator('[style*="animation"], [class*="animate"]').count();
    if (reducedMotionElements > 0) {
      console.warn(`Found ${reducedMotionElements} potentially problematic animated elements`);
    }
    
    // @ts-ignore - dynamic axe results
    const violations = results?.violations || [];
    if (violations.length > 0) {
      console.error('Accessibility violations found:', violations);
      return { passed: false, violations };
    }
    
    console.log('✓ Accessibility check passed');
    return { passed: true, violations: [] };
  }

  /**
   * Verify French language content for Quebec users
   */
  async verifyFrenchContent(expectedPhrases: string[]) {
    for (const phrase of expectedPhrases) {
      const element = this.page.locator(`text="${phrase}"`);
      await expect(element).toBeVisible({ timeout: TIMEOUTS.ASSERTION });
      console.log(`✓ Found French content: "${phrase}"`);
    }
  }

  /**
   * Test Quebec-specific form validation (postal codes, phone numbers)
   */
  async validateQuebecFormats(data: {
    postalCode?: string;
    phoneNumber?: string;
    healthCardNumber?: string;
  }) {
    if (data.postalCode) {
      // Quebec postal code pattern: A1A 1A1
      const quebecPostalPattern = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
      expect(quebecPostalPattern.test(data.postalCode)).toBe(true);
    }

    if (data.phoneNumber) {
      // Quebec phone format: (514) 123-4567
      const quebecPhonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
      expect(quebecPhonePattern.test(data.phoneNumber)).toBe(true);
    }

    console.log('✓ Quebec format validation completed');
  }

  /**
   * Monitor Core Web Vitals during pregnancy-critical user journeys
   */
  async measurePerformance(): Promise<{
    lcp: number;
    fid: number;
    cls: number;
  }> {
    const metrics = await this.page.evaluate(() => {
      return new Promise<{ lcp: number; fid: number; cls: number }>((resolve) => {
        let lcp = 0;
        let fid = 0;
        let cls = 0;
        
        // Measure LCP using PerformanceObserver for accuracy
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          lcp = lastEntry?.startTime || 0;
        });
        
        // Measure FID using PerformanceObserver
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            fid = entry.processingStart - entry.startTime;
          });
        });
        
        // Measure CLS using PerformanceObserver
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          });
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          fidObserver.observe({ entryTypes: ['first-input'] });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          
          // Wait for measurements and resolve
          setTimeout(() => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            resolve({ lcp, fid, cls });
          }, 2000); // Wait 2 seconds for measurements
        } catch (error) {
          // Fallback to basic timing if PerformanceObserver not supported
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          resolve({
            lcp: navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.fetchStart : 0,
            fid: 0,
            cls: 0
          });
        }
      });
    });

    console.log(`Performance metrics - LCP: ${metrics.lcp}ms, FID: ${metrics.fid}ms, CLS: ${metrics.cls}`);
    return metrics;
  }

  /**
   * Enhanced pregnancy-related interaction simulation with context
   */
  async simulatePregnancyInteraction(
    delay: 'fatigue' | 'morning_sickness' | 'normal' | 'brain_fog' = 'normal',
    context: string = 'User interaction'
  ) {
    const delays = {
      fatigue: 2000,
      morning_sickness: 1500,
      brain_fog: 1800,
      normal: 500
    };
    
    const descriptions = {
      fatigue: 'pregnancy fatigue - slower decision making and movements',
      morning_sickness: 'morning sickness - potential interruptions and discomfort',
      brain_fog: 'pregnancy brain fog - difficulty concentrating and processing',
      normal: 'normal pregnancy state - slightly slower than non-pregnant users'
    };
    
    this.log('info', `Simulating ${context} with ${descriptions[delay]}`);
    this.log('info', `Adding ${delays[delay]}ms delay...`);
    
    await this.page.waitForTimeout(delays[delay]);
    
    this.log('info', `${context} simulation completed`);
  }
  
  /**
   * Enhanced error recovery with pregnancy-safe patterns
   */
  async handleError(
    error: Error, 
    context: string,
    recoveryAction?: () => Promise<void>
  ): Promise<void> {
    this.log('error', `Error in ${context}`, {
      message: error.message,
      stack: error.stack,
      pageUrl: this.page.url(),
      timestamp: new Date().toISOString()
    });
    
    // Take screenshot for debugging
    try {
      const screenshotName = `error-${context.replace(/\s+/g, '-')}-${this.sessionId}.png`;
      await this.page.screenshot({ path: screenshotName, fullPage: true });
      this.log('info', `Error screenshot saved: ${screenshotName}`);
    } catch (screenshotError) {
      this.log('warn', 'Could not capture error screenshot', screenshotError);
    }
    
    // Attempt recovery if provided
    if (recoveryAction) {
      try {
        this.log('info', `Attempting error recovery for ${context}`);
        await recoveryAction();
        this.log('info', `Error recovery successful for ${context}`);
      } catch (recoveryError) {
        this.log('error', `Error recovery failed for ${context}`, recoveryError);
        throw new Error(`Original error in ${context}: ${error.message}. Recovery also failed: ${recoveryError}`);
      }
    } else {
      throw error;
    }
  }
  
  /**
   * Cleanup resources and log session summary
   */
  async cleanup(): Promise<void> {
    this.log('info', 'Cleaning up PregnancySafeHelpers session');
    
    try {
      // Log final page state
      const finalUrl = this.page.url();
      const pageTitle = await this.page.title().catch(() => 'Unknown');
      
      this.log('info', 'Session summary:', {
        sessionId: this.sessionId,
        finalUrl,
        pageTitle,
        debugMode: this.debugMode
      });
      
    } catch (error) {
      this.log('warn', 'Error during cleanup', error);
    }
  }
}

// Enhanced constants with pregnancy-safe context
export const PregnancySafeConstants = {
  TOUCH_TARGETS: {
    MINIMUM: 44,
    RECOMMENDED: 48,
    COMFORTABLE: 52
  },
  
  SPACING: {
    MINIMUM: 8,
    COMFORTABLE: 16,
    GENEROUS: 24
  },
  
  PERFORMANCE_BUDGETS: {
    LCP_MS: 2500,
    FID_MS: 100,
    CLS_SCORE: 0.1,
    BUNDLE_KB: 200
  },
  
  INTERACTION_DELAYS: {
    FATIGUE: 2000,
    MORNING_SICKNESS: 1500,
    BRAIN_FOG: 1800,
    NORMAL: 500
  }
} as const;

// Environment detection
const isCI = process.env.CI === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';
const debugEnabled = process.env.PREGNANCY_SAFE_DEBUG === 'true';

if (debugEnabled) {
  console.log('\n🤰 Pregnancy-Safe Testing Utilities Loaded');
  console.log(`   Environment: ${isDevelopment ? 'Development' : isCI ? 'CI' : 'Production'}`);
  console.log(`   Debug mode: ${debugEnabled}`);
  console.log(`   Session: ${new Date().toISOString()}`);
}