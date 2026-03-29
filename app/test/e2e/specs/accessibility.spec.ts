import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/yoga", "/doula", "/a-propos", "/contact", "/feminin-sacre"];

for (const route of routes) {
  test(`accessibility: ${route} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

    expect(results.violations).toEqual([]);
  });
}
