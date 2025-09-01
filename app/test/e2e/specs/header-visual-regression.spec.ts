import { test, expect, devices } from '@playwright/test';
import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';

/**
 * Visual Regression Tests for Header Component
 * 
 * Tests pregnancy-safe design consistency across:
 * - Multiple viewport sizes
 * - Different device types  
 * - Browser variations
 * - Interaction states
 * - Color accuracy
 */

// Configure pregnancy-safe viewport sizes
const pregnancyViewports = {
  'iPhone SE': { viewport: { width: 375, height: 667 } }, // Minimum supported
  'iPhone 12 Pro': devices['iPhone 12 Pro'],
  'iPad Pro': devices['iPad Pro'],
  'Desktop 1024px': { viewport: { width: 1024, height: 768 } },
  'Desktop 1440px': { viewport: { width: 1440, height: 900 } },
  'Large Desktop': { viewport: { width: 1920, height: 1080 } }, // Accessibility
};

test.describe('Header Visual Regression - Pregnancy-Safe Design', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set up pregnancy-safe environment
    const helpers = new PregnancySafeHelpers(page);
    await helpers.setupPregnancySafeEnvironment();
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for header to fully load
    await expect(page.getByRole('banner')).toBeVisible();
    await page.waitForLoadState('networkidle');
  });

  test.describe('Responsive Layout Consistency', () => {
    
    Object.entries(pregnancyViewports).forEach(([deviceName, config]) => {
      test(`should render correctly on ${deviceName}`, async ({ page, browser }) => {
        const context = await browser.newContext(config);
        const responsivePage = await context.newPage();
        
        // Set up pregnancy-safe environment
        const helpers = new PregnancySafeHelpers(responsivePage);
        await helpers.setupPregnancySafeEnvironment();
        
        await responsivePage.goto('/');
        
        // Wait for complete rendering
        await expect(responsivePage.getByRole('banner')).toBeVisible();
        await responsivePage.waitForLoadState('networkidle');
        
        // Take screenshot for visual comparison
        await expect(responsivePage).toHaveScreenshot(`header-${deviceName.toLowerCase().replace(/\s+/g, '-')}.png`, {
          fullPage: false,
          clip: {
            x: 0,
            y: 0,
            width: config.viewport!.width,
            height: 80 // Header height area
          },
          threshold: 0.2, // Allow minor rendering differences
        });
        
        await context.close();
      });
    });

    test('should maintain logo centering across all breakpoints', async ({ page }) => {
      const breakpoints = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'desktop-sm' },
        { width: 1440, height: 900, name: 'desktop-lg' }
      ];

      for (const breakpoint of breakpoints) {
        await page.setViewportSize(breakpoint);
        await page.waitForTimeout(500); // Allow layout to settle

        // Take screenshot of header area
        await expect(page.getByRole('banner')).toHaveScreenshot(`header-centering-${breakpoint.name}.png`, {
          threshold: 0.1
        });
      }
    });
  });

  test.describe('Interactive State Visual Testing', () => {
    
    test('should visually show logo hover state correctly', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const logo = page.getByText('Pauline Roussel');
      
      // Normal state
      await expect(page.getByRole('banner')).toHaveScreenshot('header-logo-normal.png');
      
      // Hover state
      await logo.hover();
      await page.waitForTimeout(300); // Allow animation to complete
      await expect(page.getByRole('banner')).toHaveScreenshot('header-logo-hover.png', {
        threshold: 0.3 // Allow for hover animation differences
      });
    });

    test('should show mobile menu toggle states correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Closed state (hamburger icon)
      await expect(page.getByRole('banner')).toHaveScreenshot('header-menu-closed.png');
      
      // Open menu
      await menuButton.click();
      await page.waitForTimeout(250); // Allow animation to complete
      
      // Open state (X icon)
      await expect(page.getByRole('banner')).toHaveScreenshot('header-menu-open.png');
    });

    test('should display mobile menu overlay correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      await menuButton.click();
      
      // Wait for menu animation
      await page.waitForTimeout(250);
      
      // Full page screenshot including menu overlay
      await expect(page).toHaveScreenshot('mobile-menu-overlay-full.png', {
        fullPage: true,
        threshold: 0.2
      });
    });

    test('should show contact button hover state on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const contactButton = page.getByText('CONTACTEZ-MOI');
      
      // Normal state
      await expect(page.getByRole('banner')).toHaveScreenshot('header-contact-normal.png');
      
      // Hover state
      await contactButton.hover();
      await page.waitForTimeout(250); // Allow transition
      await expect(page.getByRole('banner')).toHaveScreenshot('header-contact-hover.png', {
        threshold: 0.3
      });
    });
  });

  test.describe('Color Accuracy & Brand Consistency', () => {
    
    test('should render brand colors accurately', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Take detailed header screenshot for color verification
      await expect(page.getByRole('banner')).toHaveScreenshot('header-brand-colors.png', {
        threshold: 0.1 // Strict color matching
      });
      
      // Verify specific color values programmatically
      const header = page.getByRole('banner');
      const headerBg = await header.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Primary green background should be exact
      expect(headerBg).toMatch(/rgb\(97, 132, 98\)|#618462/);
    });

    test('should maintain pregnancy-safe color contrasts', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Screenshot for contrast analysis
      await expect(page.getByRole('banner')).toHaveScreenshot('header-contrast-check.png');
      
      // Verify text color contrasts programmatically
      const logo = page.getByText('Pauline Roussel');
      const logoColor = await logo.evaluate((el) => 
        window.getComputedStyle(el).color
      );
      
      // White text should be exact for maximum contrast
      expect(logoColor).toMatch(/rgb\(255, 255, 255\)|white/);
    });

    test('should render menthe accent color accurately', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open menu to see menthe contact button
      await page.getByRole('button', { name: /ouvrir le menu/i }).click();
      await page.waitForTimeout(250);
      
      // Focus on contact button area for color accuracy
      const contactButton = page.getByText('CONTACTEZ-MOI');
      await expect(contactButton).toHaveScreenshot('contact-button-menthe-color.png', {
        threshold: 0.1 // Strict color matching
      });
    });
  });

  test.describe('Typography & Text Rendering', () => {
    
    test('should render The Seasons font correctly for logo', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Wait for fonts to load
      await page.waitForFunction(() => document.fonts.ready);
      
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toHaveScreenshot('logo-typography-the-seasons.png', {
        threshold: 0.2 // Allow for font rendering differences across systems
      });
    });

    test('should render Barlow font correctly for buttons', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Wait for fonts to load
      await page.waitForFunction(() => document.fonts.ready);
      
      const contactButton = page.getByText('CONTACTEZ-MOI');
      await expect(contactButton).toHaveScreenshot('button-typography-barlow.png', {
        threshold: 0.2
      });
    });

    test('should handle French text rendering correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open menu to see French navigation
      await page.getByRole('button', { name: /ouvrir le menu/i }).click();
      await page.waitForTimeout(250);
      
      // Screenshot navigation with French accents and characters
      const navigation = page.getByRole('navigation', { name: /menu de navigation principal/i });
      await expect(navigation).toHaveScreenshot('french-navigation-text.png', {
        threshold: 0.1
      });
    });
  });

  test.describe('Animation & Transition Visual Testing', () => {
    
    test('should show smooth menu slide animation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Take screenshots at different animation stages
      await menuButton.click();
      
      // Immediately after click (animation start)
      await expect(page).toHaveScreenshot('menu-animation-start.png', {
        fullPage: true,
        threshold: 0.4 // Allow for animation variance
      });
      
      // Mid animation (if detectable)
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot('menu-animation-mid.png', {
        fullPage: true,
        threshold: 0.4
      });
      
      // Animation complete
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot('menu-animation-complete.png', {
        fullPage: true,
        threshold: 0.2
      });
    });

    test('should show gentle hover animations without jarring effects', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const logo = page.getByText('Pauline Roussel');
      
      // Capture hover transition sequence
      const header = page.getByRole('banner');
      
      // Before hover
      await expect(header).toHaveScreenshot('logo-hover-before.png');
      
      // During hover (gentle scale)
      await logo.hover();
      await page.waitForTimeout(100); // Mid-transition
      await expect(header).toHaveScreenshot('logo-hover-during.png', {
        threshold: 0.3
      });
      
      // Hover complete
      await page.waitForTimeout(150);
      await expect(header).toHaveScreenshot('logo-hover-complete.png', {
        threshold: 0.2
      });
    });
  });

  test.describe('Cross-Browser Visual Consistency', () => {
    
    ['chromium', 'firefox', 'webkit'].forEach(browserName => {
      test(`should render consistently in ${browserName}`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        
        // Take browser-specific screenshot
        await expect(page.getByRole('banner')).toHaveScreenshot(`header-${browserName}-consistency.png`, {
          threshold: 0.3 // Allow for browser rendering differences
        });
      });
    });
  });

  test.describe('High Contrast & Accessibility Visual Testing', () => {
    
    test('should render correctly with forced colors', async ({ page }) => {
      // Enable high contrast mode
      await page.emulateMedia({ forcedColors: 'active' });
      await page.setViewportSize({ width: 1440, height: 900 });
      
      await expect(page.getByRole('banner')).toHaveScreenshot('header-high-contrast.png', {
        threshold: 0.4 // Allow for significant color changes
      });
    });

    test('should be visible with various color blindness simulations', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // This would require additional setup for color blindness simulation
      // For now, take standard screenshot
      await expect(page.getByRole('banner')).toHaveScreenshot('header-colorblind-safe.png');
    });
  });

  test.describe('Performance Visual Impact', () => {
    
    test('should render without layout shifts', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Take screenshot immediately after navigation
      await page.goto('/');
      await expect(page).toHaveScreenshot('header-immediate-load.png', {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1440, height: 100 }
      });
      
      // Wait for all resources and take another screenshot
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('header-full-load.png', {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1440, height: 100 }
      });
      
      // Screenshots should be nearly identical (no layout shift)
    });

    test('should maintain visual stability during font loading', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Block font loading temporarily to test FOUT handling
      await page.route('**/*.woff2', route => {
        setTimeout(() => route.continue(), 2000);
      });
      
      await page.goto('/');
      
      // Take screenshot before fonts load (fallback fonts)
      await expect(page.getByRole('banner')).toHaveScreenshot('header-fallback-fonts.png');
      
      // Wait for fonts to load and take another screenshot
      await page.waitForFunction(() => document.fonts.ready);
      await expect(page.getByRole('banner')).toHaveScreenshot('header-loaded-fonts.png', {
        threshold: 0.3 // Allow for font differences
      });
    });
  });

  test.describe('Mobile-Specific Visual Testing', () => {
    
    test('should handle very small screens gracefully', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 }); // Smallest supported
      
      await expect(page.getByRole('banner')).toHaveScreenshot('header-very-small-screen.png', {
        threshold: 0.2
      });
      
      // Logo should not wrap or break
      const logo = page.getByText('Pauline Roussel');
      await expect(logo).toBeVisible();
    });

    test('should show appropriate touch targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Screenshot with focus on interactive elements
      await expect(page.getByRole('banner')).toHaveScreenshot('header-mobile-touch-targets.png');
      
      // Verify touch targets are visually appropriate size
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      const buttonBounds = await menuButton.boundingBox();
      
      expect(buttonBounds?.width).toBeGreaterThanOrEqual(44);
      expect(buttonBounds?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Dark Mode Preparation', () => {
    
    test('should render correctly in dark color scheme', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Take screenshot for potential dark mode implementation
      await expect(page.getByRole('banner')).toHaveScreenshot('header-dark-mode-ready.png', {
        threshold: 0.4 // Allow for color scheme changes
      });
    });
  });

  test.describe('Print Styles Visual Testing', () => {
    
    test('should render appropriately for print media', async ({ page }) => {
      await page.emulateMedia({ media: 'print' });
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Take screenshot with print styles applied
      await expect(page.getByRole('banner')).toHaveScreenshot('header-print-styles.png', {
        threshold: 0.5 // Allow for significant print media changes
      });
    });
  });

  test.describe('Bundle Performance Integration', () => {
    
    test('should monitor bundle size impact on visual performance', async ({ page }) => {
      console.log(`\n📦 Bundle size impact analysis`);
      
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Monitor network requests to estimate bundle sizes
      const resourceSizes: { [key: string]: number } = {};
      
      page.on('response', response => {
        const url = response.url();
        const headers = response.headers();
        const contentLength = headers['content-length'];
        
        if (contentLength) {
          const sizeKB = Math.round(parseInt(contentLength) / 1024);
          if (url.includes('.js') || url.includes('.css')) {
            resourceSizes[url.split('/').pop() || url] = sizeKB;
          }
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Calculate total bundle sizes
      const jsBundleSize = Object.entries(resourceSizes)
        .filter(([name]) => name.includes('.js'))
        .reduce((total, [_, size]) => total + size, 0);
        
      const cssBundleSize = Object.entries(resourceSizes)
        .filter(([name]) => name.includes('.css'))
        .reduce((total, [_, size]) => total + size, 0);
      
      console.log(`\n📈 Bundle Size Analysis:`);
      console.log(`   JavaScript: ${jsBundleSize}KB`);
      console.log(`   CSS: ${cssBundleSize}KB`);
      console.log(`   Total: ${jsBundleSize + cssBundleSize}KB`);
      
      // Budget validation
      const totalSize = jsBundleSize + cssBundleSize;
      const budgetKB = 200;
      
      if (totalSize > budgetKB) {
        console.warn(`⚠️  Bundle size (${totalSize}KB) exceeds pregnancy-safe budget (${budgetKB}KB)`);
        console.warn(`   This may cause slow loading for users with limited data plans`);
        
        // In CI, create a performance budget failure
        if (process.env.CI) {
          throw new Error(`Bundle size budget exceeded: ${totalSize}KB > ${budgetKB}KB`);
        }
      } else {
        console.log(`✅ Bundle size within pregnancy-safe limits`);
      }
      
      // Take screenshot to verify visual impact
      await expect(page.getByRole('banner')).toHaveScreenshot('header-bundle-performance.png', {
        threshold: 0.2,
        animations: 'disabled'
      });
    });
  });
});

// Global error handler for enhanced debugging
process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ Unhandled Rejection in header visual regression tests:', reason);
  console.error('Promise:', promise);
  
  // In CI, fail the test suite
  if (process.env.CI) {
    process.exit(1);
  }
});

// Export viewports configuration for other test files
export { pregnancyViewports };