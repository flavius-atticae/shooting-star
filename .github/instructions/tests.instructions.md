---
description: Testing conventions for unit, integration, and E2E tests
applyTo: "app/test/**"
---

# Testing Architecture

## Test types and their location

| Type | Location | Runner | Purpose |
|---|---|---|---|
| Unit / component | `app/test/components/`, `app/test/lib/` | Vitest | Component rendering, logic, accessibility roles |
| E2E / integration | `app/test/e2e/specs/` | Playwright | Full user flows in a real browser |

## Unit & component tests

### Toolchain

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
```

Never use `@testing-library/jest-dom` directly — it is already loaded globally in `app/test/setup.ts`.

### Router wrapper

Any component that uses `<Link>` or `useNavigate` must be wrapped in `BrowserRouter`:

```tsx
import { BrowserRouter } from "react-router";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

render(<Header />, { wrapper: TestWrapper });
```

Alternatively, use the `customRender` utility from `~/test/utils` which includes a default wrapper.

### Querying

Prefer queries in this order (most semantic → least):

1. `getByRole` with accessible name
2. `getByLabelText`
3. `getByText`
4. `getByTestId` (last resort — only when no semantic query works)

```tsx
// ✅
screen.getByRole("button", { name: /envoyer/i });
screen.getByRole("navigation");
screen.getByLabelText(/nom/i);

// ❌ (fragile, couples to implementation)
screen.getByTestId("submit-btn");
container.querySelector(".submit-button");
```

### User interactions

Use `userEvent` for all interactions — never `fireEvent` for clicks/typing (it skips browser event bubbling):

```tsx
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: /menu/i }));
await user.type(screen.getByLabelText(/nom/i), "Marie Tremblay");
```

`fireEvent` is acceptable only for low-level events that `userEvent` cannot simulate (e.g., `scroll`, `resize`).

### Accessibility assertions

Do not assert CSS class names. Assert semantic behaviour and ARIA state:

```tsx
// ✅
expect(screen.getByRole("navigation")).toBeInTheDocument();
expect(screen.getByRole("button", { name: /fermer/i })).toHaveFocus();
expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");

// ❌
expect(element).toHaveClass("bg-primary");
expect(element).toHaveClass("hidden");
```

For deeper a11y scanning in unit tests, use `checkAccessibility` from `~/test/utils`:

```tsx
import { render } from "@testing-library/react";
import { checkAccessibility } from "~/test/utils";

it("has no accessibility violations", async () => {
  const { container } = render(<ContactForm />);
  await checkAccessibility(container);
});
```

### Mocking

All browser API mocks (`IntersectionObserver`, `ResizeObserver`, `matchMedia`, `Intl.DateTimeFormat`) are set up globally in `app/test/setup.ts` using **class syntax** — never arrow functions (Biome will break them):

```tsx
// ✅ (in setup.ts)
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// ❌ (arrow function — cannot be used as constructor)
const MockResizeObserver = vi.fn(() => ({...}));
```

If a new browser API needs mocking, add it to `setup.ts` using the class pattern.

For module mocks:

```tsx
vi.mock("~/lib/email.server", () => ({
  sendContactEmail: vi.fn().mockResolvedValue({ success: true }),
}));
```

### Test structure

```tsx
describe("ComponentName", () => {
  describe("feature group", () => {
    it("does something specific", () => { ... });
    it("handles edge case", () => { ... });
  });
});
```

One `describe` per component or module. Nest `describe` blocks for logical groupings. Test names describe observable behaviour, not implementation (`"shows error when field is empty"`, not `"calls setError"`).

## E2E tests (Playwright)

### Location & config

Specs live in `app/test/e2e/specs/`. Playwright config is `playwright.config.ts` at project root. Two projects run: `chromium` (desktop) and `mobile-chrome` (Pixel 5), both with `fr-CA` locale.

### E2E test structure

Group related interactions with `test.step()` for readable reports. Use `beforeEach` for shared navigation:

```ts
test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("user can submit the form", async ({ page }) => {
    await test.step("fill in fields", async () => {
      await page.getByLabel(/nom/i).fill("Marie Tremblay");
      await page.getByLabel(/email/i).fill("marie@example.com");
    });

    await test.step("submit and verify success", async () => {
      await page.getByRole("button", { name: /envoyer/i }).click();
      await expect(page.getByRole("alert")).toBeVisible();
    });
  });
});
```

### Aria snapshot assertions

Use `toMatchAriaSnapshot` to assert the accessibility tree of a component rather than its visual structure:

```ts
await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
  - navigation:
    - link "Doula"
    - link "Yoga"
    - link "Féminin sacré"
    - link "À propos"
`);
```

Prefer this over counting elements or asserting text when the test intent is about accessible structure.

### Accessibility scans

Use `@axe-core/playwright` for WCAG 2.1 AA scans — already present in `accessibility.spec.ts`. Add new routes to the routes array there; do not duplicate axe setup in other spec files:

```ts
import AxeBuilder from "@axe-core/playwright";

const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa"])
  .analyze();

expect(results.violations).toEqual([]);
```

### Selectors

Same priority as unit tests: prefer role-based selectors over CSS or data-testid:

```ts
// ✅
page.getByRole("button", { name: /envoyer/i });
page.getByLabel(/email/i);

// ❌
page.locator(".contact-form button[type=submit]");
```

### No shared helper files

Do not recreate BMAD-style helper classes (`PregnancySafeHelpers`, persona fixtures, etc.). Each spec is self-contained. If a utility is needed across specs, add a simple exported function to a dedicated `helpers.ts` file — keep it under 50 lines.
