import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("displays Pauline Roussel branding and key CTAs", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Pauline Roussel/i);
    await expect(page.locator("h1")).toBeVisible();

    // Key service links visible
    await expect(page.getByRole("link", { name: /yoga/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /doula/i }).first()).toBeVisible();
  });

  test("page is in French (fr-CA)", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", /fr/);
  });

  test("main landmark is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
  });
});
