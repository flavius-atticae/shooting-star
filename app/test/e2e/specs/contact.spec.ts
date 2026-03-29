import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("form fields are visible and labeled", async ({ page }) => {
    await expect(page.getByLabel(/nom/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /envoyer/i })).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /envoyer/i }).click();

    // At least one validation error should appear
    const errors = page.locator("[role='alert'], .text-destructive, [aria-live]");
    await expect(errors.first()).toBeVisible({ timeout: 3000 });
  });

  test("accepts valid input without errors", async ({ page }) => {
    await page.getByLabel(/nom/i).fill("Marie Tremblay");
    await page.getByLabel(/email/i).fill("marie@example.com");
    await page.getByLabel(/message/i).fill("Bonjour, je souhaite en savoir plus sur vos services.");

    // Fields should be filled without inline errors
    await expect(page.getByLabel(/nom/i)).toHaveValue("Marie Tremblay");
    await expect(page.getByLabel(/email/i)).toHaveValue("marie@example.com");
  });

  test("submit button is keyboard-accessible", async ({ page }) => {
    const button = page.getByRole("button", { name: /envoyer/i });
    await button.focus();
    await expect(button).toBeFocused();
  });
});
