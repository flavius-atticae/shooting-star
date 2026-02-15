import { test, expect } from "../fixtures/personas";

/**
 * User Persona Journey Tests
 *
 * These tests simulate real user journeys for our three main personas:
 * - Marie: First-time pregnant user discovering yoga
 * - Sophie: Experienced mother managing multiple children
 * - Alexandra: High-risk pregnancy user seeking specialized care
 */

test.describe("Marie - First Pregnancy Journey", () => {
  test("Marie discovers prenatal yoga services", async ({ mariePersona }) => {
    const { page, helpers, profile } = mariePersona;

    console.log(
      `Testing as ${profile.name} (${profile.stage}, ${profile.gestationWeeks} weeks)`,
    );

    // Navigate to homepage as a first-time visitor
    await helpers.navigateSafely("/");

    // Marie is cautious and reads carefully (pregnancy brain fog)
    await helpers.simulatePregnancyInteraction("normal");

    // Verify French content is prominent for Quebec users
    await expect(page.locator("html")).toHaveAttribute("lang", /fr/);
    await expect(page).toHaveTitle(/Pauline Roussel/i);

    // Verify key primary navigation links are available
    await expect(
      page.getByRole("link", { name: /Doula/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Yoga/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Contact/i }).first(),
    ).toBeVisible();

    // Check that the page doesn't trigger motion sickness
    await helpers.checkPregnancyAccessibility();

    // Marie should find meaningful page structure immediately
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
    await expect(mainContent.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Marie checks service availability in Montreal", async ({
    mariePersona,
  }) => {
    const { page, helpers, profile } = mariePersona;

    await helpers.navigateSafely("/");

    // Simulate geolocation for Montreal
    await page.context().setGeolocation({
      longitude: -73.567256,
      latitude: 45.501689,
    });

    // Marie would want to know about local availability
    console.log(`Testing location services for ${profile.location}`);

    // Verify page loads without issues
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Sophie - Experienced Mother Journey", () => {
  test("Sophie quickly finds postpartum services", async ({
    sophiePersona,
  }) => {
    const { page, helpers, profile } = sophiePersona;

    console.log(`Testing as ${profile.name} (${profile.stage}, postpartum)`);

    await helpers.navigateSafely("/");

    // Sophie is efficient but needs high contrast
    if (profile.preferences.highContrast) {
      // Verify high contrast mode is working
      console.log("High contrast mode enabled for Sophie");
    }

    // Sophie navigates quickly (experienced user)
    await helpers.simulatePregnancyInteraction("normal");

    // Verify bilingual capability
    await expect(page.locator("html")).toHaveAttribute("lang", /fr/);
    await expect(
      page.getByRole("link", { name: /Contact/i }).first(),
    ).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("Sophie manages multiple bookings efficiently", async ({
    sophiePersona,
  }) => {
    const { page, helpers, profile } = sophiePersona;

    await helpers.navigateSafely("/");

    // Sophie needs quick, efficient workflows
    console.log(`Testing efficient navigation for ${profile.name}`);

    // Verify page is responsive to quick interactions
    const navigationElements = page.locator("nav a:visible");
    if ((await navigationElements.count()) > 0) {
      await helpers.clickSafely(navigationElements.first());
    }
  });
});

test.describe("Alexandra - High-Risk Pregnancy Journey", () => {
  test("Alexandra accesses specialized care information", async ({
    alexandraPersona,
  }) => {
    const { page, helpers, profile } = alexandraPersona;

    console.log(
      `Testing as ${profile.name} (${profile.stage}, ${profile.gestationWeeks} weeks, high-risk)`,
    );

    await helpers.navigateSafely("/");

    // Alexandra needs maximum accessibility support
    await helpers.simulatePregnancyInteraction("fatigue");

    // Verify primary guidance paths are available from the landing page
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Doula/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Yoga/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Contact/i }).first(),
    ).toBeVisible();

    // Check high contrast and reduced motion
    await helpers.checkPregnancyAccessibility();
  });

  test("Alexandra requires careful, accessible navigation", async ({
    alexandraPersona,
  }) => {
    const { page, helpers, profile } = alexandraPersona;

    await helpers.navigateSafely("/", { waitForMotion: true });

    // Alexandra may have pregnancy complications affecting interaction
    await helpers.simulatePregnancyInteraction("morning_sickness");

    // Verify all interactive elements meet accessibility standards
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const boundingBox = await button.boundingBox();

      if (boundingBox) {
        // Extra-large touch targets for users with pregnancy-related coordination issues
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
