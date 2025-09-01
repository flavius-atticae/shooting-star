import { test, expect } from '@playwright/test';
import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';
import { PERFORMANCE, TEST_USERS } from '../helpers/constants';

/**
 * Performance Tests for Header Component
 * 
 * Tests pregnancy-safe performance patterns including:
 * - Core Web Vitals compliance (LCP, FID, CLS)
 * - Pregnancy fatigue considerations
 * - Mobile performance for swollen fingers
 * - Animation performance for nausea prevention
 * - Network resilience for morning sickness
 * - Bundle size impact
 */

test.describe('Header Performance - Pregnancy-Safe Optimization', () => {
  
  test.beforeEach(async ({ page }) => {
    const helpers = new PregnancySafeHelpers(page);
    await helpers.setupPregnancySafeEnvironment();
  });

  test.describe('Core Web Vitals Compliance', () => {
    
    test('should meet LCP threshold for pregnancy fatigue', async ({ page }) => {
      const helpers = new PregnancySafeHelpers(page);
      
      // Navigate and measure performance
      await page.goto('/');
      
      // Ensure header is visible (critical for LCP)
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Measure Core Web Vitals
      const metrics = await helpers.measurePerformance();
      
      // LCP should be under 2.5s for pregnancy users (may be slower due to fatigue)
      expect(metrics.lcp).toBeLessThan(PERFORMANCE.LCP_THRESHOLD);
      
      console.log(`LCP: ${metrics.lcp}ms (threshold: ${PERFORMANCE.LCP_THRESHOLD}ms)`);
    });

    test('should meet FID threshold for responsive interactions', async ({ page }) => {
      const helpers = new PregnancySafeHelpers(page);
      
      await page.goto('/');
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Measure interaction responsiveness
      const startTime = Date.now();
      
      // Simulate user interaction (logo click)
      await page.getByText('Pauline Roussel').click();
      
      const endTime = Date.now();
      const interactionDelay = endTime - startTime;
      
      // Should respond quickly even with swollen fingers (imprecise clicks)
      expect(interactionDelay).toBeLessThan(PERFORMANCE.FID_THRESHOLD);
      
      console.log(`Interaction delay: ${interactionDelay}ms (threshold: ${PERFORMANCE.FID_THRESHOLD}ms)`);
    });

    test('should meet CLS threshold to prevent nausea', async ({ page }) => {
      const helpers = new PregnancySafeHelpers(page);
      
      await page.goto('/');
      
      // Get initial header position
      const initialPosition = await page.getByRole('banner').boundingBox();
      
      // Wait for any potential layout shifts
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Measure final position
      const finalPosition = await page.getByRole('banner').boundingBox();
      
      if (initialPosition && finalPosition) {
        // Calculate layout shift
        const verticalShift = Math.abs(finalPosition.y - initialPosition.y);
        const horizontalShift = Math.abs(finalPosition.x - initialPosition.x);
        
        // Should have minimal layout shift to prevent nausea
        expect(verticalShift).toBeLessThan(1); // Less than 1px shift
        expect(horizontalShift).toBeLessThan(1);
      }
      
      // Also measure CLS via Performance API
      const metrics = await helpers.measurePerformance();
      expect(metrics.cls).toBeLessThan(PERFORMANCE.CLS_THRESHOLD);
      
      console.log(`CLS: ${metrics.cls} (threshold: ${PERFORMANCE.CLS_THRESHOLD})`);
    });

    test('should maintain performance across viewport changes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1440, height: 900, name: 'desktop' }
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        
        const startTime = Date.now();
        await page.goto('/');
        
        await expect(page.getByRole('banner')).toBeVisible();
        
        const loadTime = Date.now() - startTime;
        
        // Should load quickly on all viewport sizes
        expect(loadTime).toBeLessThan(3000); // 3s max for pregnancy users
        
        console.log(`${viewport.name} load time: ${loadTime}ms`);
      }
    });
  });

  test.describe('Animation Performance for Nausea Prevention', () => {
    
    test('should have smooth logo hover animation under 60fps', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      
      const logo = page.getByText('Pauline Roussel');
      
      // Measure animation performance
      let frameCount = 0;
      
      await page.evaluate(() => {
        (window as any).frameCount = 0;
        
        const measureFrames = () => {
          (window as any).frameCount++;
          requestAnimationFrame(measureFrames);
        };
        
        measureFrames();
      });
      
      // Trigger hover animation
      const startTime = Date.now();
      await logo.hover();
      
      // Wait for animation to complete (should be ~200ms)
      await page.waitForTimeout(250);
      
      const endTime = Date.now();
      const animationDuration = endTime - startTime;
      
      frameCount = await page.evaluate(() => (window as any).frameCount);
      
      const fps = Math.round(frameCount / (animationDuration / 1000));
      
      // Should maintain good framerate for smooth animation
      expect(fps).toBeGreaterThan(30); // Minimum acceptable
      expect(fps).toBeLessThan(120); // Not too aggressive
      
      // Animation should complete quickly to avoid nausea
      expect(animationDuration).toBeLessThan(300);
      
      console.log(`Animation FPS: ${fps}, Duration: ${animationDuration}ms`);
    });

    test('should have smooth menu slide animation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Measure menu animation performance
      const startTime = Date.now();
      await menuButton.click();
      
      // Wait for menu to appear
      await expect(page.getByRole('navigation')).toBeVisible();
      
      const endTime = Date.now();
      const animationTime = endTime - startTime;
      
      // Should animate smoothly and quickly
      expect(animationTime).toBeLessThan(250); // Quick for pregnancy users
      expect(animationTime).toBeGreaterThan(50); // Not instant (jarring)
      
      console.log(`Menu animation time: ${animationTime}ms`);
    });

    test('should respect reduced motion preferences', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/');
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Animation should be much faster or disabled
      const startTime = Date.now();
      await menuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
      const endTime = Date.now();
      
      const animationTime = endTime - startTime;
      
      // Should be nearly instant with reduced motion
      expect(animationTime).toBeLessThan(100);
      
      console.log(`Reduced motion animation time: ${animationTime}ms`);
    });
  });

  test.describe('Mobile Performance for Pregnancy Users', () => {
    
    test('should be responsive to touch on slower devices', async ({ page }) => {
      // Simulate slower mobile device
      const client = await page.context().newCDPSession(page);
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 }); // 4x slower CPU
      
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Should still respond quickly despite CPU throttling
      const startTime = Date.now();
      await menuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
      const responseTime = Date.now() - startTime;
      
      // Allow extra time for throttled device but should still be reasonable
      expect(responseTime).toBeLessThan(1000); // 1s max on slow device
      
      console.log(`Throttled device response time: ${responseTime}ms`);
    });

    test('should handle network throttling gracefully', async ({ page }) => {
      // Simulate slow 3G network
      const client = await page.context().newCDPSession(page);
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5Mbps
        uploadThroughput: 750 * 1024 / 8, // 750Kbps
        latency: 40 // 40ms latency
      });
      
      await page.setViewportSize({ width: 375, height: 667 });
      
      const startTime = Date.now();
      await page.goto('/');
      
      // Header should appear quickly even on slow network (SSR)
      await expect(page.getByRole('banner')).toBeVisible();
      const loadTime = Date.now() - startTime;
      
      // Should load reasonably fast even on 3G for pregnancy users
      expect(loadTime).toBeLessThan(5000); // 5s max on 3G
      
      console.log(`3G network load time: ${loadTime}ms`);
    });

    test('should maintain performance with large touch targets', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Large touch targets shouldn't impact performance
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      const boundingBox = await menuButton.boundingBox();
      
      // Should have pregnancy-safe touch target size
      expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
      
      // Performance should still be good with large targets
      const startTime = Date.now();
      await menuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
      const responseTime = Date.now() - startTime;
      
      expect(responseTime).toBeLessThan(300);
      
      console.log(`Large touch target response time: ${responseTime}ms`);
    });
  });

  test.describe('Memory Performance and Resource Usage', () => {
    
    test('should not cause memory leaks with menu toggling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Get initial memory usage
      const initialMetrics = await page.evaluate(() => {
        return {
          usedJSHeapSize: (performance as any).memory?.usedJSHeapSize || 0,
          totalJSHeapSize: (performance as any).memory?.totalJSHeapSize || 0
        };
      });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Toggle menu multiple times
      for (let i = 0; i < 20; i++) {
        await menuButton.click(); // Open
        await page.keyboard.press('Escape'); // Close
      }
      
      // Force garbage collection if available
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc();
        }
      });
      
      const finalMetrics = await page.evaluate(() => {
        return {
          usedJSHeapSize: (performance as any).memory?.usedJSHeapSize || 0,
          totalJSHeapSize: (performance as any).memory?.totalJSHeapSize || 0
        };
      });
      
      // Memory usage shouldn't grow significantly
      const memoryGrowth = finalMetrics.usedJSHeapSize - initialMetrics.usedJSHeapSize;
      const growthPercentage = (memoryGrowth / initialMetrics.usedJSHeapSize) * 100;
      
      // Allow some growth but not excessive
      expect(growthPercentage).toBeLessThan(50); // Less than 50% growth
      
      console.log(`Memory growth: ${memoryGrowth} bytes (${growthPercentage.toFixed(1)}%)`);
    });

    test('should have efficient event listener management', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Count initial event listeners
      const initialListeners = await page.evaluate(() => {
        return (window as any).getEventListeners ? 
          Object.keys((window as any).getEventListeners(document)).length : 0;
      });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Open menu (adds event listeners)
      await menuButton.click();
      
      // Close menu (should clean up event listeners)
      await page.keyboard.press('Escape');
      
      // Final listener count should be similar to initial
      const finalListeners = await page.evaluate(() => {
        return (window as any).getEventListeners ? 
          Object.keys((window as any).getEventListeners(document)).length : 0;
      });
      
      // Should clean up event listeners properly
      expect(Math.abs(finalListeners - initialListeners)).toBeLessThan(5);
      
      console.log(`Event listeners: ${initialListeners} -> ${finalListeners}`);
    });

    test('should not block main thread during interactions', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Measure main thread blocking
      let longTaskCount = 0;
      
      await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          (window as any).longTaskCount = ((window as any).longTaskCount || 0) + entries.length;
        });
        observer.observe({ entryTypes: ['longtask'] });
      });
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Perform interactions
      await menuButton.click();
      await page.keyboard.press('Escape');
      await menuButton.click();
      await page.keyboard.press('Escape');
      
      // Check for long tasks
      longTaskCount = await page.evaluate(() => (window as any).longTaskCount || 0);
      
      // Should not block main thread for >50ms (long task threshold)
      expect(longTaskCount).toBe(0);
      
      console.log(`Long tasks detected: ${longTaskCount}`);
    });
  });

  test.describe('Bundle Size and Resource Loading', () => {
    
    test('should have optimal JavaScript bundle size impact', async ({ page }) => {
      await page.goto('/');
      
      // Measure JavaScript resources
      const jsResources = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        return resources
          .filter(resource => resource.name.includes('.js'))
          .map(resource => ({
            name: resource.name,
            size: resource.transferSize,
            duration: resource.duration
          }));
      });
      
      const totalJSSize = jsResources.reduce((sum, resource) => sum + resource.size, 0);
      
      // Should keep JavaScript bundle reasonable for pregnancy users (slow networks)
      expect(totalJSSize).toBeLessThan(500 * 1024); // 500KB max total JS
      
      console.log(`Total JS bundle size: ${(totalJSSize / 1024).toFixed(1)}KB`);
    });

    test('should load critical CSS efficiently', async ({ page }) => {
      await page.goto('/');
      
      // Measure CSS resources
      const cssResources = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        return resources
          .filter(resource => resource.name.includes('.css'))
          .map(resource => ({
            name: resource.name,
            size: resource.transferSize,
            duration: resource.duration
          }));
      });
      
      const totalCSSSize = cssResources.reduce((sum, resource) => sum + resource.size, 0);
      
      // CSS should be optimized for pregnancy users
      expect(totalCSSSize).toBeLessThan(100 * 1024); // 100KB max CSS
      
      // Critical CSS should load quickly
      cssResources.forEach(resource => {
        expect(resource.duration).toBeLessThan(1000); // 1s max per CSS file
      });
      
      console.log(`Total CSS size: ${(totalCSSSize / 1024).toFixed(1)}KB`);
    });

    test('should efficiently load custom fonts', async ({ page }) => {
      await page.goto('/');
      
      // Wait for fonts to load
      await page.waitForFunction(() => document.fonts.ready);
      
      // Measure font loading performance
      const fontMetrics = await page.evaluate(() => {
        const fontFaces = Array.from(document.fonts);
        return {
          totalFonts: fontFaces.length,
          loadedFonts: fontFaces.filter(font => font.status === 'loaded').length,
          failedFonts: fontFaces.filter(font => font.status === 'error').length
        };
      });
      
      // All fonts should load successfully
      expect(fontMetrics.failedFonts).toBe(0);
      expect(fontMetrics.loadedFonts).toBeGreaterThan(0);
      
      // Should have reasonable number of fonts (not too many for performance)
      expect(fontMetrics.totalFonts).toBeLessThan(10);
      
      console.log(`Fonts: ${fontMetrics.loadedFonts}/${fontMetrics.totalFonts} loaded`);
    });
  });

  test.describe('Pregnancy Persona Performance Testing', () => {
    
    test('should perform well for Marie (first pregnancy, cautious)', async ({ page }) => {
      const persona = TEST_USERS.MARIE;
      
      // Simulate Marie's careful browsing (slower interactions)
      const helpers = new PregnancySafeHelpers(page);
      await helpers.simulatePregnancyInteraction('fatigue');
      
      await page.goto('/');
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Should load quickly for anxious first-time mothers
      const metrics = await helpers.measurePerformance();
      expect(metrics.lcp).toBeLessThan(2000); // Extra fast for anxiety relief
      
      console.log(`Marie persona - LCP: ${metrics.lcp}ms`);
    });

    test('should perform well for Sophie (experienced, efficient)', async ({ page }) => {
      const persona = TEST_USERS.SOPHIE;
      
      // Sophie browses efficiently on tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Should respond quickly for experienced users
      const startTime = Date.now();
      await menuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
      const responseTime = Date.now() - startTime;
      
      expect(responseTime).toBeLessThan(200); // Fast for experienced users
      
      console.log(`Sophie persona - Menu response: ${responseTime}ms`);
    });

    test('should perform well for Alexandra (high-risk, desktop)', async ({ page }) => {
      const persona = TEST_USERS.ALEXANDRA;
      
      // Alexandra uses desktop with high contrast
      await page.emulateMedia({ forcedColors: 'active' });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      
      // Performance shouldn't degrade with accessibility features
      const helpers = new PregnancySafeHelpers(page);
      const metrics = await helpers.measurePerformance();
      
      expect(metrics.lcp).toBeLessThan(PERFORMANCE.LCP_THRESHOLD);
      expect(metrics.cls).toBeLessThan(PERFORMANCE.CLS_THRESHOLD);
      
      console.log(`Alexandra persona - LCP: ${metrics.lcp}ms, CLS: ${metrics.cls}`);
    });
  });

  test.describe('Edge Case Performance', () => {
    
    test('should handle rapid navigation without performance degradation', async ({ page }) => {
      const helpers = new PregnancySafeHelpers(page);
      
      // Rapid navigation between pages
      const navigationTimes = [];
      
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        await page.goto('/');
        await expect(page.getByRole('banner')).toBeVisible();
        const navTime = Date.now() - startTime;
        navigationTimes.push(navTime);
        
        // Brief pause between navigations
        await page.waitForTimeout(100);
      }
      
      // Performance should remain consistent
      const avgTime = navigationTimes.reduce((sum, time) => sum + time, 0) / navigationTimes.length;
      const maxTime = Math.max(...navigationTimes);
      const minTime = Math.min(...navigationTimes);
      
      // Variance should be reasonable
      expect(maxTime - minTime).toBeLessThan(2000); // Less than 2s variance
      expect(avgTime).toBeLessThan(3000); // Average under 3s
      
      console.log(`Navigation times: avg ${avgTime.toFixed(0)}ms, range ${minTime}-${maxTime}ms`);
    });

    test('should maintain performance during concurrent interactions', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const menuButton = page.getByRole('button', { name: /ouvrir le menu/i });
      
      // Simulate concurrent interactions (pregnancy brain confusion)
      const interactions = [];
      
      for (let i = 0; i < 10; i++) {
        const startTime = Date.now();
        const interaction = menuButton.click().then(() => Date.now() - startTime);
        interactions.push(interaction);
        
        await page.waitForTimeout(50); // Brief delay between clicks
      }
      
      const responseTimes = await Promise.all(interactions);
      
      // All interactions should complete reasonably quickly
      responseTimes.forEach(time => {
        expect(time).toBeLessThan(1000); // 1s max response time
      });
      
      const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
      console.log(`Concurrent interaction average: ${avgResponseTime.toFixed(0)}ms`);
    });

    test('should handle extreme viewport changes efficiently', async ({ page }) => {
      await page.goto('/');
      
      const viewportSizes = [
        { width: 320, height: 568 }, // Very small mobile
        { width: 1920, height: 1080 }, // Large desktop
        { width: 375, height: 812 }, // Standard mobile
        { width: 1440, height: 900 }, // Standard desktop
      ];
      
      const resizeTimes = [];
      
      for (const viewport of viewportSizes) {
        const startTime = Date.now();
        await page.setViewportSize(viewport);
        
        // Wait for layout to settle
        await page.waitForTimeout(100);
        await expect(page.getByRole('banner')).toBeVisible();
        
        const resizeTime = Date.now() - startTime;
        resizeTimes.push(resizeTime);
      }
      
      // Viewport changes should be smooth
      resizeTimes.forEach(time => {
        expect(time).toBeLessThan(500); // 500ms max for viewport change
      });
      
      const avgResizeTime = resizeTimes.reduce((sum, time) => sum + time, 0) / resizeTimes.length;
      console.log(`Average viewport change time: ${avgResizeTime.toFixed(0)}ms`);
    });
  });

  test.describe('Performance Monitoring and Alerts', () => {
    
    test('should not exceed pregnancy-safe performance budgets', async ({ page }) => {
      const helpers = new PregnancySafeHelpers(page);
      
      await page.goto('/');
      await expect(page.getByRole('banner')).toBeVisible();
      
      const metrics = await helpers.measurePerformance();
      
      // Strict budgets for pregnancy users
      const budgets = {
        lcp: 2000, // 2s max (stricter than general web)
        fid: 50, // 50ms max (responsive for swollen fingers)
        cls: 0.05, // Lower threshold (prevent nausea)
      };
      
      expect(metrics.lcp).toBeLessThan(budgets.lcp);
      expect(metrics.fid).toBeLessThan(budgets.fid);
      expect(metrics.cls).toBeLessThan(budgets.cls);
      
      console.log('Performance Budget Check:');
      console.log(`  LCP: ${metrics.lcp}ms / ${budgets.lcp}ms`);
      console.log(`  FID: ${metrics.fid}ms / ${budgets.fid}ms`);
      console.log(`  CLS: ${metrics.cls} / ${budgets.cls}`);
    });

    test('should maintain consistent performance across sessions', async ({ page }) => {
      const sessionMetrics = [];
      
      // Run multiple sessions to check consistency
      for (let session = 0; session < 3; session++) {
        const helpers = new PregnancySafeHelpers(page);
        
        await page.goto('/');
        await expect(page.getByRole('banner')).toBeVisible();
        
        const metrics = await helpers.measurePerformance();
        sessionMetrics.push(metrics);
        
        // Clear cache between sessions
        await page.context().clearCookies();
        await page.evaluate(() => {
          localStorage.clear();
          sessionStorage.clear();
        });
      }
      
      // Calculate consistency metrics
      const lcpValues = sessionMetrics.map(m => m.lcp);
      const lcpAvg = lcpValues.reduce((sum, val) => sum + val, 0) / lcpValues.length;
      const lcpVariance = Math.max(...lcpValues) - Math.min(...lcpValues);
      
      // Performance should be consistent between sessions
      expect(lcpVariance).toBeLessThan(1000); // Less than 1s variance
      expect(lcpAvg).toBeLessThan(PERFORMANCE.LCP_THRESHOLD);
      
      console.log(`Performance consistency: LCP avg ${lcpAvg.toFixed(0)}ms, variance ${lcpVariance}ms`);
    });
  });
});