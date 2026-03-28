import { expect, test } from "@playwright/test";

const routes = ["/", "/yoga", "/doula", "/about", "/contact", "/feminin-sacre"];

test.describe("Navigation", () => {
  test("header is visible on all routes", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("header")).toBeVisible();
    }
  });

  test("footer is visible on all routes", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("footer")).toBeVisible();
    }
  });

  test("desktop nav links are reachable by keyboard", async ({ page }) => {
    await page.goto("/");

    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    // Tab through nav links and verify focus is visible
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Nav should now be expanded
      await expect(page.locator("nav")).toBeVisible();
      await menuButton.click();
    }
  });

  test("all route pages load with 200 status", async ({ page }) => {
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    }
  });
});
