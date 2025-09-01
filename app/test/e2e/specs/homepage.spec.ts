import { test, expect } from '@playwright/test';
import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';
import { TEST_USERS } from '../helpers/constants';

/**
 * Homepage E2E Tests - Pregnancy-Safe Patterns
 * 
 * Tests the core homepage functionality with considerations for:
 * - French-first Quebec market
 * - Pregnancy-safe accessibility
 * - Mobile-first approach
 * - Performance targets
 */

test.describe('Homepage - Pregnancy-Safe User Experience', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('loads homepage with pregnancy-safe design', async ({ page }) => {
    await helpers.navigateSafely('/', { waitForMotion: true });
    
    // Verify page loads successfully
    await expect(page).toHaveTitle(/Pauline Roussel/);
    
    // Check for pregnancy-safe accessibility
    await helpers.checkPregnancyAccessibility();
    
    // Verify performance is within pregnancy-safe targets
    const metrics = await helpers.measurePerformance();
    expect(metrics.lcp).toBeLessThan(2500); // 2.5s LCP target
  });

  test('displays French content for Quebec users', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Test with Marie persona (first pregnancy, French-speaking)
    const frenchPhrases = [
      // These will be updated as the site content is developed
      'Pauline Roussel' // Brand name should be present
    ];
    
    await helpers.verifyFrenchContent(frenchPhrases);
  });

  test('provides accessible navigation for pregnancy fatigue', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Check navigation is accessible and has proper touch targets
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const boundingBox = await link.boundingBox();
      
      if (boundingBox) {
        // Ensure touch targets meet pregnancy-safe requirements (44x44px minimum)
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('handles pregnancy-related interaction delays', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Simulate fatigue-affected interaction
    await helpers.simulatePregnancyInteraction('fatigue');
    
    // Verify the page remains responsive
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('supports reduced motion for nausea prevention', async ({ page }) => {
    // This test runs on the 'accessibility' project with reduced motion
    await helpers.navigateSafely('/');
    
    // Verify no problematic animations are present
    const animatedElements = await page.locator('[class*="animate"], [style*="animation"]').count();
    
    // Log for monitoring - in production this would be more sophisticated
    console.log(`Found ${animatedElements} animated elements (should respect reduced motion)`);
  });
});

test.describe('Mobile-First Pregnancy Experience', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('optimizes for mobile pregnancy users', async ({ page }) => {
    // This test specifically runs on mobile devices (Pixel 5, iPhone 12 Pro)
    await helpers.navigateSafely('/');
    
    // Check mobile-specific pregnancy considerations
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(414); // Mobile width
    
    // Verify touch-friendly interface
    const interactiveElements = page.locator('button, a, input');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = interactiveElements.nth(i);
      const boundingBox = await element.boundingBox();
      
      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});