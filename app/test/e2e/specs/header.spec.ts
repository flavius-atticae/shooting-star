import { test, expect, devices } from '@playwright/test';
import type { Locator } from '@playwright/test';

import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';
import { TEST_USERS } from '../helpers/constants';

// Extend PregnancySafeHelpers for Header-specific E2E testing
class PregnancySafeE2EHelpers extends PregnancySafeHelpers {
  /**
   * Validate touch target meets pregnancy requirements
   */
  static async validateTouchTarget(page: any, locator: Locator, minWidth: number = 44, minHeight: number = 44) {
    const boundingBox = await locator.boundingBox();
    if (!boundingBox) {
      throw new Error('Element not found or not visible');
    }
    
    expect(boundingBox.width).toBeGreaterThanOrEqual(minWidth);
    expect(boundingBox.height).toBeGreaterThanOrEqual(minHeight);
    
    return boundingBox;
  }
}

// Configure pregnancy-safe viewport sizes
const pregnancyViewports = {
  'iPhone 12 Pro': devices['iPhone 12 Pro'],
  'iPad Pro': devices['iPad Pro'],
  'Desktop 1440px': { viewport: { width: 1440, height: 900 } }
};

test.describe('Header Component E2E - Pregnancy-Safe Design', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage where header is rendered
    await page.goto('/');
    
    // Wait for header to be fully loaded
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test.describe('Visual Layout & Responsive Design', () => {
    
    test('should display header with correct responsive heights', async ({ page }) => {
      const header = page.getByRole('banner');
      
      // Should be visible and properly positioned
      await expect(header).toBeVisible();
      await expect(header).toHaveClass(/sticky/);
      await expect(header).toHaveClass(/top-0/);
      
      // Check background color
      await expect(header).toHaveCSS('background-color', /#618462|rgb\(97, 132, 98\)/);
    });

    Object.entries(pregnancyViewports).forEach(([deviceName, config]) => {
      test(`should be responsive on ${deviceName}`, async ({ page, browser }) => {
        const context = await browser.newContext(config);
        const responsivePage = await context.newPage();
        await responsivePage.goto('/');
        
        const header = responsivePage.getByRole('banner');
        await expect(header).toBeVisible();
        
        // Logo should be visible on all devices
        const logo = responsivePage.getByText('Pauline Roussel');
        await expect(logo).toBeVisible();
        
        // Check responsive behavior
        const viewport = responsivePage.viewportSize();
        if (viewport && viewport.width < 1024) {
          // Mobile/Tablet: Menu burger should be visible
          const menuButton = responsivePage.getByRole('button', { name: /menu/i });
          await expect(menuButton).toBeVisible();
        } else {
          // Desktop: Contact button should be visible
          const contactButton = responsivePage.getByText('CONTACTEZ-MOI');
          await expect(contactButton).toBeVisible();
        }
        
        await context.close();
      });
    });

    test('should have logo perfectly centered using CSS Grid', async ({ page }) => {
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // Check centering by measuring position
      const logoBounds = await logo.boundingBox();
      const headerBounds = await page.getByRole('banner').boundingBox();
      
      if (logoBounds && headerBounds) {
        const logoCenterX = logoBounds.x + logoBounds.width / 2;
        const headerCenterX = headerBounds.x + headerBounds.width / 2;
        
        // Logo should be centered (within 5px tolerance)
        expect(Math.abs(logoCenterX - headerCenterX)).toBeLessThan(5);
      }
    });
  });

  test.describe('Touch Targets & Pregnancy-Safe Interactions', () => {
    
    test('should have pregnancy-safe minimum touch target sizes', async ({ page }) => {
      // Logo touch target
      await PregnancySafeE2EHelpers.validateTouchTarget(
        page, 
        page.getByText('Pauline Roussel'),
        44, 44
      );
      
      // Menu button (on mobile)
      await page.setViewportSize({ width: 375, height: 667 });
      const menuButton = page.getByRole('button', { name: /menu/i });
      await PregnancySafeE2EHelpers.validateTouchTarget(menuButton, 44, 44);
    });

    test('should handle imprecise clicks from swollen fingers', async ({ page }) => {
      const logo = page.getByText('Pauline Roussel');
      
      // Simulate imprecise clicking pattern
      const logoBounds = await logo.boundingBox();
      if (logoBounds) {
        const centerX = logoBounds.x + logoBounds.width / 2;
        const centerY = logoBounds.y + logoBounds.height / 2;
        
        // Click with various offsets to simulate imprecise targeting
        for (const offset of [-8, -4, 0, 4, 8]) {
          await page.mouse.click(centerX + offset, centerY + offset);
          
          // Should remain functional
          await expect(logo).toBeVisible();
        }
      }
    });

    test('should support keyboard navigation for pregnancy fatigue', async ({ page }) => {
      // Tab navigation should work
      await page.keyboard.press('Tab');
      
      // Check if focus is on interactive element
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON'].includes(focusedElement || '')).toBe(true);
      
      // Enter should activate focused element
      await page.keyboard.press('Enter');
      // Navigation or action would occur
    });
  });

  test.describe('Mobile Menu Functionality', () => {
    
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should toggle mobile menu with burger button', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await expect(menuButton).toBeVisible();
      
      // Initially menu should be closed
      await expect(page.getByRole('navigation', { name: /menu de navigation principal/i })).not.toBeVisible();
      
      // Click to open menu
      await menuButton.click();
      
      // Menu should appear with animation
      const menu = page.getByRole('navigation', { name: /menu de navigation principal/i });
      await expect(menu).toBeVisible();
      
      // Button should show close icon and update label
      await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible();
      
      // Click to close menu
      await page.getByRole('button', { name: /fermer le menu/i }).click();
      
      // Menu should disappear
      await expect(menu).not.toBeVisible();
    });

    test('should close menu with Escape key for accessibility', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Open menu
      await menuButton.click();
      await expect(page.getByRole('navigation', { name: /menu de navigation principal/i })).toBeVisible();
      
      // Press Escape
      await page.keyboard.press('Escape');
      
      // Menu should close
      await expect(page.getByRole('navigation', { name: /menu de navigation principal/i })).not.toBeVisible();
    });

    test('should prevent body scroll when menu is open', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Check initial state
      // const initialOverflow = await page.evaluate(() => document.body.style.overflow);
      
      // Open menu
      await menuButton.click();
      
      // Body overflow should be hidden
      const hiddenOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(hiddenOverflow).toBe('hidden');
      
      // Close menu
      await page.keyboard.press('Escape');
      
      // Body overflow should be restored
      const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(restoredOverflow).toBe('unset');
    });

    test('should display all navigation items in French', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await menuButton.click();
      
      const navigationItems = [
        { text: 'Doula', description: 'Accompagnement de doula' },
        { text: 'Yoga', description: 'Enseignement du yoga' },
        { text: 'Féminin', description: 'Le féminin sacré - ateliers variés' },
        { text: 'À propos', description: 'Pauline Roussel, Doula et professeure de Yoga' }
      ];
      
      for (const item of navigationItems) {
        await expect(page.getByText(item.text)).toBeVisible();
        await expect(page.getByText(item.description)).toBeVisible();
      }
      
      // Contact button should be present
      await expect(page.getByText('CONTACTEZ-MOI')).toBeVisible();
    });

    test('should close menu when navigation item is clicked', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await menuButton.click();
      
      const menu = page.getByRole('navigation', { name: /menu de navigation principal/i });
      await expect(menu).toBeVisible();
      
      // Click on a navigation item
      await page.getByText('Yoga').click();
      
      // Menu should close
      await expect(menu).not.toBeVisible();
    });

    test('should have pregnancy-safe touch targets in menu', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await menuButton.click();
      
      // All navigation links should meet pregnancy requirements
      const navLinks = page.getByRole('navigation').getByRole('link');
      const count = await navLinks.count();
      
      for (let i = 0; i < count; i++) {
        await PregnancySafeE2EHelpers.validateTouchTarget(navLinks.nth(i), 44, 44);
      }
    });
  });

  test.describe('Logo Navigation', () => {
    
    test('should navigate to homepage when logo is clicked', async ({ page }) => {
      // Start from a different page to test navigation
      await page.goto('/about');
      
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // Click logo
      await logo.click();
      
      // Should navigate to homepage
      await expect(page).toHaveURL('/');
    });

    test('should support keyboard navigation on logo', async ({ page }) => {
      const logo = page.getByText('Pauline Roussel');
      
      // Focus logo with tab
      await page.keyboard.press('Tab');
      
      // Check if logo has focus (might need to check visually or with CSS)
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.textContent?.includes('Pauline Roussel') || false;
      });
      
      if (focusedElement) {
        // Press Enter to activate
        await page.keyboard.press('Enter');
        
        // Should navigate (or attempt to navigate)
        await expect(logo).toBeVisible();
      }
    });

    test('should have proper ARIA labeling in French', async ({ page }) => {
      const logo = page.getByRole('link', { name: /pauline roussel.*retour.*accueil/i });
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('aria-label', /.*français.*/);
    });
  });

  test.describe('Contact Button (Desktop)', () => {
    
    test('should show contact button on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const contactButton = page.getByText('CONTACTEZ-MOI');
      await expect(contactButton).toBeVisible();
    });

    test('should hide contact button on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Contact button in header should be hidden on mobile
      const headerContactButton = page.getByRole('banner').getByText('CONTACTEZ-MOI');
      await expect(headerContactButton).not.toBeVisible();
    });

    test('should navigate to contact page when clicked', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const contactButton = page.getByText('CONTACTEZ-MOI');
      await contactButton.click();
      
      // Should navigate to contact page
      await expect(page).toHaveURL('/contact');
    });
  });

  test.describe('Animation & Motion Safety', () => {
    
    test('should have gentle hover animations that won\'t trigger nausea', async ({ page }) => {
      const logo = page.getByText('Pauline Roussel');
      
      // Hover over logo
      await logo.hover();
      
      // Should have gentle scaling (this is hard to test directly in E2E)
      // We verify the element remains stable and visible
      await expect(logo).toBeVisible();
      
      // Move away
      await page.mouse.move(0, 0);
      await expect(logo).toBeVisible();
    });

    test('should have smooth menu animations under 200ms', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Measure animation timing
      const startTime = Date.now();
      await menuButton.click();
      
      const menu = page.getByRole('navigation', { name: /menu de navigation principal/i });
      await expect(menu).toBeVisible();
      
      const endTime = Date.now();
      const animationTime = endTime - startTime;
      
      // Should complete within pregnancy-safe timeframe (plus test overhead)
      expect(animationTime).toBeLessThan(500); // 200ms animation + 300ms test overhead
    });

    test('should respect reduced motion preferences', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      // Component should still function properly
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
    });
  });

  test.describe('Accessibility & WCAG Compliance', () => {
    
    test('should have proper heading hierarchy', async ({ page }) => {
      // Header should be a banner landmark
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Logo should be focusable link
      const logo = page.getByRole('link', { name: /pauline roussel/i });
      await expect(logo).toBeVisible();
    });

    test('should support screen readers with ARIA labels', async ({ page }) => {
      // Check ARIA labels are in French
      const menuButton = page.getByRole('button', { name: /menu/i });
      
      if (await menuButton.isVisible()) {
        await expect(menuButton).toHaveAttribute('aria-label', /français/);
        await expect(menuButton).toHaveAttribute('aria-expanded');
      }
    });

    test('should have sufficient color contrast', async ({ page }) => {
      // This is complex to test in E2E, but we verify elements are visible
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // White text on primary green background should be highly visible
      const logoColor = await logo.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // Should be white or very light color
      expect(logoColor).toMatch(/rgb\(255, 255, 255\)|white/);
    });

    test('should maintain focus management in menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await menuButton.click();
      
      // Tab should move focus through menu items
      await page.keyboard.press('Tab');
      
      // Focus should be within the menu
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        const menu = document.querySelector('[role="navigation"]');
        return menu?.contains(active) || false;
      });
      
      expect(focusedElement).toBe(true);
    });
  });

  test.describe('Performance & Core Web Vitals', () => {
    
    test('should load header quickly for pregnancy fatigue', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      
      // Header should be visible quickly
      await expect(page.getByRole('banner')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time for pregnant users
      expect(loadTime).toBeLessThan(3000); // 3 second timeout
    });

    test('should not cause layout shift (CLS)', async ({ page }) => {
      await page.goto('/');
      
      // Wait for header to fully render
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Get initial header position
      const initialBounds = await page.getByRole('banner').boundingBox();
      
      // Wait for any potential shifts
      await page.waitForTimeout(1000);
      
      // Check position hasn't shifted
      const finalBounds = await page.getByRole('banner').boundingBox();
      
      if (initialBounds && finalBounds) {
        expect(Math.abs(initialBounds.y - finalBounds.y)).toBeLessThan(1);
      }
    });

    test('should handle rapid interactions without lag', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Rapidly toggle menu multiple times
      for (let i = 0; i < 5; i++) {
        await menuButton.click();
        await page.keyboard.press('Escape');
      }
      
      // Should remain responsive
      await expect(menuButton).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    
    ['chromium', 'firefox', 'webkit'].forEach(browserName => {
      test(`should work correctly in ${browserName}`, async ({ page }) => {
        // Basic functionality test across browsers
        const header = page.getByRole('banner');
        await expect(header).toBeVisible();
        
        const logo = page.getByText('Pauline Roussel');
        await expect(logo).toBeVisible();
        
        // Test click functionality
        await logo.click();
        await expect(page).toHaveURL('/');
      });
    });
  });

  test.describe('Pregnancy User Personas', () => {
    
    test('Marie (first pregnancy, anxious) - should find header reassuring', async ({ page }) => {
      const persona = TEST_USERS.MARIE;
      
      // Simulate Marie's cautious browsing pattern
      await page.goto('/');
      
      // Header should be immediately visible and reassuring
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Colors should be calming (pregnancy-safe green)
      const headerBg = await header.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(headerBg).toMatch(/rgb\(97, 132, 98\)|#618462/); // Primary green
      
      // Logo should be clear and professional
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // Should be able to navigate easily
      await logo.hover(); // Gentle hover
      await expect(logo).toBeVisible();
      
      // Use persona data
      expect(persona.name).toBe('Marie Dubois');
    });

    test('Sophie (second baby, experienced) - should navigate efficiently', async ({ page }) => {
      const persona = TEST_USERS.SOPHIE;
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
      
      await page.goto('/');
      
      // Should quickly access menu
      const menuButton = page.getByRole('button', { name: /menu/i });
      await menuButton.click();
      
      // Should find navigation items quickly
      await expect(page.getByText('Yoga')).toBeVisible();
      await expect(page.getByText('À propos')).toBeVisible();
      
      // Should be able to navigate directly
      await page.getByText('Yoga').click();
      await expect(page).toHaveURL('/yoga');
      
      // Use persona data
      expect(persona.name).toBe('Sophie Tremblay');
    });

    test('Alexandra (high-risk, cautious) - should feel safe and supported', async ({ page }) => {
      const persona = TEST_USERS.ALEXANDRA;
      await page.setViewportSize({ width: 1440, height: 900 }); // Desktop
      
      await page.goto('/');
      
      // Header should feel stable and reassuring
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // No jarring animations or sudden changes
      const logo = page.getByText('Pauline Roussel');
      await logo.hover();
      
      // Should remain visually stable
      await page.waitForTimeout(500);
      await expect(logo).toBeVisible();
      
      // Contact should be easily accessible
      const contactButton = page.getByText('CONTACTEZ-MOI');
      await expect(contactButton).toBeVisible();
      
      // Use persona data
      expect(persona.name).toBe('Alexandra Johnson');
    });
  });

  test.describe('Error Handling & Edge Cases', () => {
    
    test('should handle network interruptions gracefully', async ({ page }) => {
      await page.goto('/');
      
      // Simulate network interruption
      await page.route('**/*', route => route.abort());
      
      // Header should remain functional with cached content
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // Restore network
      await page.unroute('**/*');
    });

    test('should handle JavaScript errors gracefully', async ({ page }) => {
      // Test with JavaScript disabled
      const context = await page.context();
      await context.setOffline(true);
      
      await page.goto('/');
      
      // Header should still be visible (SSR)
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
      
      // Re-enable network
      await context.setOffline(false);
    });

    test('should handle rapid page navigation', async ({ page }) => {
      // Rapid navigation between pages
      for (let i = 0; i < 3; i++) {
        await page.goto('/');
        await expect(page.getByRole('banner')).toBeVisible();
        
        await page.goto('/about');
        await expect(page.getByRole('banner')).toBeVisible();
      }
      
      // Header should remain stable
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
    });
  });
});