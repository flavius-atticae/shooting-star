import { test, expect } from '@playwright/test';

/**
 * Simplified Header E2E Tests
 * 
 * Focus: Essential functionality and pregnancy-safe design
 * Coverage: 10 core tests covering critical user journeys
 * Projects: Runs on chromium, mobile-chrome, and accessibility only
 */

test.describe('Header - Essential Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('should display header with sticky positioning and brand color', async ({ page }) => {
    const header = page.getByRole('banner');
    
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/sticky/);
    await expect(header).toHaveClass(/top-0/);
    
    // Primary green background (#618462)
    const bgColor = await header.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe('rgb(97, 132, 98)');
  });

  test('should have centered logo that navigates to homepage', async ({ page }) => {
    const header = page.getByRole('banner');
    const logo = header.getByRole('link', { name: /pauline roussel/i }).first();
    await expect(logo).toBeVisible();
    
    // Verify centering
    const logoBounds = await logo.boundingBox();
    const headerBounds = await header.boundingBox();
    
    if (logoBounds && headerBounds) {
      const logoCenterX = logoBounds.x + logoBounds.width / 2;
      const headerCenterX = headerBounds.x + headerBounds.width / 2;
      // Use 8px tolerance for centering to account for cross-browser rendering differences
      // and reduce test flakiness. Visually, <8px difference is considered "centered".
      expect(Math.abs(logoCenterX - headerCenterX)).toBeLessThan(8);
    }
    
    // Test navigation by clicking logo (stay on home since we're already there)
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('should show/hide elements based on viewport size', async ({ page }) => {
    // Desktop: contact button visible, menu hidden
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByText('CONTACTEZ-MOI').first()).toBeVisible();
    
    // Mobile: menu button visible, contact button hidden in header
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    const headerContactBtn = page.getByRole('banner').getByText('CONTACTEZ-MOI');
    await expect(headerContactBtn).not.toBeVisible();
  });

  test('should toggle mobile menu with proper animations and accessibility', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
    const navigation = page.getByRole('navigation', { name: /menu de navigation principal/i });
    
    // Initially closed
    await expect(navigation).not.toBeVisible();
    
    // Open menu
    await menuButton.click();
    await expect(navigation).toBeVisible();
    await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible();
    
    // Verify body scroll lock
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
    
    // Close with Escape key
    await page.keyboard.press('Escape');
    await expect(navigation).not.toBeVisible();
    
    // Verify scroll restored
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('unset');
  });

  test('should display all navigation items in French', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();
    
    const nav = page.getByRole('navigation', { name: /menu de navigation principal/i });
    
    // Verify all nav items present in mobile menu
    await expect(nav.getByRole('link', { name: /doula.*accompagnement/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /yoga.*enseignement/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /féminin/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /à propos/i })).toBeVisible();
  });

  test('should have pregnancy-safe touch targets (48x48px)', async ({ page }) => {
    const header = page.getByRole('banner');
    
    // Test logo
    const logo = header.getByRole('link', { name: /pauline roussel/i }).first();
    const logoBounds = await logo.boundingBox();
    expect(logoBounds?.width).toBeGreaterThanOrEqual(48);
    expect(logoBounds?.height).toBeGreaterThanOrEqual(48);
    
    // Test contact button on desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    const contactButton = page.getByText('CONTACTEZ-MOI').first();
    const contactBounds = await contactButton.boundingBox();
    expect(contactBounds?.width).toBeGreaterThanOrEqual(48);
    expect(contactBounds?.height).toBeGreaterThanOrEqual(48);
    
    // Test mobile menu button
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = header.getByRole('button', { name: /menu/i });
    const menuBounds = await menuButton.boundingBox();
    expect(menuBounds?.width).toBeGreaterThanOrEqual(48);
    expect(menuBounds?.height).toBeGreaterThanOrEqual(48);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      return {
        tag: active?.tagName,
        text: active?.textContent,
      };
    });
    
    // Should focus on interactive element (link or button)
    expect(['A', 'BUTTON']).toContain(focusedElement.tag);
    
    // Enter should activate
    await page.keyboard.press('Enter');
    // Navigation or action occurs (already tested in other tests)
  });

  test('should have proper ARIA labels and color contrast', async ({ page }) => {
    const header = page.getByRole('banner');
    
    // Logo ARIA label in French
    const logo = header.getByRole('link', { name: /pauline roussel/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('aria-label', /retour.*accueil/i);
    
    // White text on green background (high contrast)
    const logoColor = await logo.evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(logoColor).toBe('rgb(255, 255, 255)');
    
    // Mobile menu button ARIA
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = header.getByRole('button', { name: /menu/i });
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    await menuButton.click();
    await expect(header.getByRole('button', { name: /fermer le menu/i }))
      .toHaveAttribute('aria-expanded', 'true');
  });

  test('should load quickly without layout shift', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds max
    
    // Check no layout shift
    const initialBounds = await page.getByRole('banner').boundingBox();
    await page.waitForLoadState('networkidle');
    const finalBounds = await page.getByRole('banner').boundingBox();
    
    if (initialBounds && finalBounds) {
      expect(Math.abs(initialBounds.y - finalBounds.y)).toBeLessThan(1);
    }
  });

  test('should navigate to contact page from desktop button', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const contactButton = page.getByText('CONTACTEZ-MOI').first();
    await expect(contactButton).toBeVisible();
    
    await contactButton.click();
    await expect(page).toHaveURL('/contact');
  });
});
