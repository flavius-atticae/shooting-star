import { expect, test } from "@playwright/test";

const routes = ["/", "/yoga", "/doula", "/a-propos", "/contact", "/feminin-sacre"];

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

    // Tab through nav links and verify each one receives focus in order
    for (let i = 0; i < count; i += 1) {
      await page.keyboard.press("Tab");
      await expect(navLinks.nth(i)).toBeFocused();
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    await expect(menuButton).toBeVisible();

    const initialExpanded = await menuButton.getAttribute("aria-expanded");
    await menuButton.click();
    await expect(page.locator("nav")).toBeVisible();
    const expanded = await menuButton.getAttribute("aria-expanded");
    expect(expanded).not.toBe(initialExpanded);

    await menuButton.click();
    const collapsedAgain = await menuButton.getAttribute("aria-expanded");
    expect(collapsedAgain).toBe(initialExpanded);
  });

  test("all route pages load with 200 status", async ({ page }) => {
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    }
  });
});
