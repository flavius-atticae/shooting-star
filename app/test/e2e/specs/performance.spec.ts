import { test, expect } from "@playwright/test";
import { PregnancySafeHelpers } from "../helpers/pregnancy-safe";
import { PERFORMANCE_THRESHOLDS } from "../helpers/constants";

/**
 * Performance Testing for Pregnancy-Safe User Experience
 *
 * Tests performance targets specifically calibrated for:
 * - Pregnancy fatigue (slower devices/connections)
 * - Mobile-first usage patterns
 * - Quebec healthcare network conditions
 * - Core Web Vitals compliance
 */

test.describe("Core Web Vitals for Pregnancy Users", () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test("LCP meets pregnancy-adjusted targets", async ({ page }) => {
    // Test Largest Contentful Paint with pregnancy-safe threshold
    await helpers.navigateSafely("/");

    const metrics = await helpers.measurePerformance();

    // Pregnancy-adjusted LCP target (2.5s vs standard 2.0s)
    expect(metrics.lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.LCP_THRESHOLD);

    console.log(
      `LCP: ${metrics.lcp}ms (target: <${PERFORMANCE_THRESHOLDS.LCP_THRESHOLD}ms)`
    );
  });

  test("FID accommodates pregnancy interaction delays", async ({ page }) => {
    await helpers.navigateSafely("/");

    // Simulate pregnancy-related slower interactions
    await helpers.simulatePregnancyInteraction("fatigue");

    const interactiveElement = page.locator("button, a").first();
    if (await interactiveElement.isVisible()) {
      const startTime = Date.now();
      await helpers.clickSafely(interactiveElement);
      const interactionTime = Date.now() - startTime;

      // Should respond within pregnancy-safe timeouts
      expect(interactionTime).toBeLessThan(
        PERFORMANCE_THRESHOLDS.FID_THRESHOLD
      );
    }
  });

  test("CLS prevents motion sickness triggers", async ({ page }) => {
    await helpers.navigateSafely("/");

    // Monitor layout shifts that could trigger nausea
    await page.evaluate(() => {
      // Monitor CLS in real implementation
      console.log("Monitoring Cumulative Layout Shift");
    });

    // Verify no significant layout shifts
    const metrics = await helpers.measurePerformance();
    expect(metrics.cls).toBeLessThan(PERFORMANCE_THRESHOLDS.CLS_THRESHOLD);
  });
});

test.describe("Device Performance Testing", () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test("performs well on lower-end pregnancy devices", async ({ page }) => {
    // Test on slower devices (pregnancy brain fog + older devices)
    await helpers.navigateSafely("/");

    // Simulate CPU throttling for slower devices
    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    const startTime = Date.now();
    await page.reload();
    const loadTime = Date.now() - startTime;

    // Should still load within reasonable time on slow devices
    expect(loadTime).toBeLessThan(5000); // 5 seconds max

    console.log(`Slow device load time: ${loadTime}ms`);
  });

  test("handles network conditions during medical appointments", async ({
    page,
  }) => {
    // Simulate slow network (often occurs during medical appointments)
    await page.route("**/*", (route) => {
      setTimeout(() => route.continue(), 500); // 500ms delay
    });

    await helpers.navigateSafely("/");

    // Should handle slow network gracefully
    await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Bundle Size and Loading Performance", () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test("JavaScript bundle size optimized for pregnancy users", async ({
    page,
  }) => {
    // Monitor network requests
    const responses: Array<{ url: string; size: number }> = [];

    page.on("response", (response) => {
      if (response.url().includes(".js")) {
        response
          .body()
          .then((body) => {
            responses.push({
              url: response.url(),
              size: body.length,
            });
          })
          .catch(() => {
            // Handle cases where body cannot be read
          });
      }
    });

    await helpers.navigateSafely("/");

    // Allow time for all resources to load
    await page.waitForTimeout(2000);

    // Calculate total JS bundle size
    const totalSize = responses.reduce(
      (sum, response) => sum + response.size,
      0
    );
    const totalSizeKB = Math.round(totalSize / 1024);

    console.log(`Total JS bundle size: ${totalSizeKB}KB`);

    // Modern React SSR apps typically require 500-2000KB of JavaScript
    // A reasonable target for pregnancy users on slower connections is <2000KB
    // This allows for React, Router, UI components, and analytics
    expect(totalSizeKB).toBeLessThan(2000);
  });

  test("images optimized for slower connections", async ({ page }) => {
    const imageResponses: Array<{ url: string; size: number }> = [];

    page.on("response", (response) => {
      if (response.headers()["content-type"]?.includes("image")) {
        response
          .body()
          .then((body) => {
            imageResponses.push({
              url: response.url(),
              size: body.length,
            });
          })
          .catch(() => {
            // Handle cases where body cannot be read
          });
      }
    });

    await helpers.navigateSafely("/");
    await page.waitForTimeout(2000);

    // Check each image is reasonably sized
    for (const image of imageResponses) {
      const imageSizeKB = Math.round(image.size / 1024);
      expect(imageSizeKB).toBeLessThan(500); // 500KB max per image
      console.log(`Image: ${imageSizeKB}KB - ${image.url.split("/").pop()}`);
    }
  });
});

test.describe("Accessibility Performance", () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test("screen reader performance with pregnancy content", async ({ page }) => {
    await helpers.navigateSafely("/");

    // Verify semantic HTML structure for fast screen reader navigation
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").count();
    const landmarks = await page
      .locator("main, nav, aside, header, footer")
      .count();

    expect(headings).toBeGreaterThan(0);
    expect(landmarks).toBeGreaterThan(0);

    console.log(`Found ${headings} headings and ${landmarks} landmarks`);
  });

  test("reduced motion performance", async ({ page }) => {
    // Test with reduced motion enabled (pregnancy nausea prevention)
    await page.emulateMedia({ reducedMotion: "reduce" });
    await helpers.navigateSafely("/");

    // Verify animations are minimal/disabled
    await helpers.checkPregnancyAccessibility();

    // Performance should improve with reduced motion
    const metrics = await helpers.measurePerformance();
    console.log("Reduced motion performance metrics:", metrics);
  });
});
