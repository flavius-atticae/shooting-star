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
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const navigation = page.getByRole("navigation").first();
    await expect(navigation).toBeVisible();

    const navLinks = navigation.getByRole("link");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    const focusedHrefs = new Set<string>();

    // Tab repeatedly and record which nav links receive focus
    for (let i = 0; i < count * 10 && focusedHrefs.size < count; i += 1) {
      await page.keyboard.press("Tab");
      const focusedInNav = navigation.locator(":focus");
      if ((await focusedInNav.count()) > 0) {
        const href = await focusedInNav.getAttribute("href");
        if (href) {
          focusedHrefs.add(href);
        }
      }
    }

    expect(focusedHrefs.size).toBe(count);
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    await expect(menuButton).toBeVisible();

    const initialExpanded = await menuButton.getAttribute("aria-expanded");
    await menuButton.click();
    await expect(
      page.getByRole("navigation", { name: /menu de navigation principal/i }),
    ).toBeVisible();
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
