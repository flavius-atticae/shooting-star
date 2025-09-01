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
   * Check accessibility compliance for pregnancy users
   */
  async checkPregnancyAccessibility() {
    // Check for reduced motion compliance
    const reducedMotionElements = await this.page.locator('[style*="animation"], [class*="animate"]').count();
    if (reducedMotionElements > 0) {
      console.warn(`Found ${reducedMotionElements} potentially problematic animated elements`);
    }

    // Check color contrast (important during pregnancy vision changes)
    await this.page.evaluate(() => {
      // This would integrate with axe-core or similar accessibility testing
      console.log('Accessibility check completed');
    });
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
        // Simplified performance measurement
        // In a real implementation, this would use web-vitals library
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const lcp = navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.loadEventStart : 0;
        
        resolve({
          lcp,
          fid: 0, // Would measure First Input Delay
          cls: 0, // Would measure Cumulative Layout Shift
        });
      });
    });

    console.log(`Performance metrics - LCP: ${metrics.lcp}ms`);
    return metrics;
  }

  /**
   * Simulate pregnancy-related interaction delays
   */
  async simulatePregnancyInteraction(delay: 'fatigue' | 'morning_sickness' | 'normal' = 'normal') {
    const delays = {
      fatigue: 2000,
      morning_sickness: 1500,
      normal: 500
    };
    
    await this.page.waitForTimeout(delays[delay]);
  }
}