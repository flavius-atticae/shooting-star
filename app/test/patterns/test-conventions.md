# Test Conventions

This document defines deterministic test placement and naming rules for all new tests in this repository.

## Goals

- Keep test paths predictable for human and AI contributors.
- Mirror source structure under `app/test/**`.
- Preserve clear test responsibility boundaries (`component-unit`, `integration`, `e2e`) with visual baselines governed separately.

## Operational Model (Kent-aligned)

For day-to-day implementation and PR reviews, this repository uses three primary execution levels:

1. `component-unit` — local UI behavior and isolated deterministic logic
2. `integration` — route/module contracts and framework wiring
3. `e2e` — browser-level critical journeys

`visual` remains required as a separate baseline-governance lane (Storybook/Chromatic), not a replacement for functional assertions.

## Epic Stack-Inspired Practices

Apply the following defaults when writing tests:

1. Test user workflows, not implementation details.
2. Prefer specific assertions over broad selectors.
3. Mock as little as possible; mock external network boundaries when needed.
4. Keep tests independent and avoid order assumptions.
5. Reuse fixtures/helpers for setup and navigation.

### Workflow-First Assertions

- Prefer: role-driven interactions (`getByRole`, `getByLabel`) and user-visible outcomes.
- Avoid: asserting private implementation details (internal class names, internal state flags, hidden API internals).

Example direction:

- Good: user fills form, submits, sees exact validation/success message.
- Avoid: only checking that a generic `.error` node exists.

### E2E Fixture Guidance

- Keep shared fixtures and reusable setup helpers under `app/test/e2e/fixtures/**`.
- Reuse persona-specific fixtures from `app/test/e2e/fixtures/personas.ts` when relevant.
- Prefer fixture/helper reuse over duplicating setup logic inside specs.

## Canonical Mapping Rules

### Components

- Source pattern: `app/components/<path>/<name>.tsx`
- Test pattern: `app/test/components/<path>/<name>.test.tsx`
- Naming: kebab-case only.

Examples:

- `app/components/header.tsx` → `app/test/components/header.test.tsx`
- `app/components/header/mobile-menu.tsx` → `app/test/components/header/mobile-menu.test.tsx`
- `app/components/ui/scroll-reveal.tsx` → `app/test/components/ui/scroll-reveal.test.tsx`

### Library Utilities

- Source pattern: `app/lib/<path>/<name>.ts`
- Test pattern: `app/test/lib/<path>/<name>.test.ts`
- Naming: kebab-case only.

Examples:

- `app/lib/contact-action.ts` → `app/test/lib/contact-action.test.ts`

### Server-only Library Modules

- Source pattern: `app/lib/<path>/<name>.server.ts`
- Test pattern: `app/test/lib/<path>/<name>.test.ts`
- Do not include `.server` in test filenames.
- Keep tests in server-safe contexts; avoid browser-only assumptions.

Examples:

- `app/lib/rate-limiter.server.ts` → `app/test/lib/rate-limiter.test.ts`
- `app/lib/content.server.ts` → `app/test/lib/content.test.ts`
- `app/lib/email/send.server.ts` → `app/test/lib/email/send.test.ts`

### Routes (Integration)

- Source pattern: `app/routes/<route>.tsx`
- Test pattern: `app/test/integration/<route>-route.test.tsx`
- Integration tests validate route behavior in React Router SSR context.

Examples:

- `app/routes/about.tsx` → `app/test/integration/about-route.test.tsx`
- `app/routes/doula.tsx` → `app/test/integration/doula-route.test.tsx`
- `app/routes/yoga.tsx` → `app/test/integration/yoga-route.test.tsx`

### Hooks

- Source pattern: `app/hooks/<path>/<name>.ts` or `app/hooks/<path>/<name>.tsx`
- Test pattern: `app/test/lib/<path>/<name>.test.ts` (or `.test.tsx` if JSX is required)
- Prefer `.test.ts` unless component rendering is needed.

Examples:

- `app/hooks/use-scroll-position.ts` → `app/test/lib/use-scroll-position.test.ts`
- `app/hooks/use-cta-banner.tsx` → `app/test/lib/use-cta-banner.test.tsx`

### End-to-End (Playwright)

- User journeys live under `app/test/e2e/specs/**/*.spec.ts`.
- E2E specs are not mirror-mapped file-by-file from a single source module.
- Keep supporting helpers in:
  - `app/test/e2e/helpers/**`
  - `app/test/e2e/fixtures/**`
  - `app/test/e2e/setup/**`

Examples:

- Journey spec: `app/test/e2e/specs/homepage.spec.ts`
- Security journey: `app/test/e2e/specs/security.spec.ts`

## Naming Rules

- Use kebab-case for test files and folders.
- Use `.test.ts` for non-React tests.
- Use `.test.tsx` for React/component tests.
- Use `.spec.ts` for Playwright e2e specs only.
- Place new tests under `app/test/**` only.

## Test Responsibility Boundaries

- `component-unit`
  - `app/test/components/**`: local UI behavior, accessibility semantics, event handling.
  - `app/test/lib/**`: deterministic utility logic, hooks, and server-safe isolated rules.
- `integration`: `app/test/integration/**` route rendering/composition and SSR route behavior.
- `e2e`: `app/test/e2e/**` browser-level user journeys (Playwright).
- `visual`: Storybook/Chromatic baseline assertions for deterministic visual drift detection.
- `app/test/patterns/**`: Reusable patterns and test conventions docs.
- `app/test/manual/**`: Manual test plans.

Do not duplicate the same behavior checks across multiple levels without clear purpose.

The authoritative ownership, scope, out-of-scope rules, overlap policy, and exception protocol are defined in:

- `docs/development-guide.md` → `Testing Strategy` → `Test Pyramid Responsibilities (Canonical)`

## PR Mapping Rule (Mandatory for New/Changed Tests)

For each PR that adds or changes tests:

1. Map each functional test file to exactly one primary level: `component-unit`, `integration`, or `e2e`.
2. Include one-line rationale per mapped file tied to that level's primary risk.
3. If visual baselines are changed, explicitly mark them as `visual` evidence in the PR.
4. If overlap is intentional, include the exception protocol fields: `reason`, `risk`, `review date`.
5. Avoid prohibited duplication of the same assertion across levels.

Example mapping block for PR descriptions:

```text
Test level mapping:
- app/test/lib/contact-action.test.ts -> component-unit (validator branch and deterministic payload checks)
- app/test/e2e/specs/contact-form.spec.ts -> e2e (critical browser journey from load to submission)
```

## Import Alias Compatibility

Repository alias:

- `~/*` maps to `app/*`

Tests may import with either relative paths or `~/` alias, but path placement must still follow the mapping rules above.

## Current Structure Inventory (Story 1.3 Audit)

Observed folders and representative files:

- `app/test/components/**`
  - `container.test.tsx`
  - `header/mobile-menu.test.tsx`
  - `layout/event-card.test.tsx`
- `app/test/lib/**`
  - `contact-action.test.ts`
  - `rate-limiter.test.ts`
- `app/test/integration/**`
  - `about-route.test.tsx`
  - `doula-route.test.tsx`
  - `router.test.tsx`
- `app/test/e2e/**`
  - `specs/homepage.spec.ts`
  - `helpers/constants.ts`
  - `fixtures/personas.ts`

## Legacy and Exceptions

- Existing files that do not fully mirror a specific source path are considered legacy and may remain unchanged unless touched for related work.
- New tests must follow these canonical mappings.
- Any exception for new tests must be documented in this file with rationale.

## Contributor Quick Checklist

When adding a new source file:

1. Identify source zone (`components`, `lib`, `routes`, `hooks`).
2. Apply the matching deterministic mapping rule.
3. Use kebab-case filename with `.test.ts` or `.test.tsx`.
4. Keep test type responsibilities in the correct directory.
5. For e2e user journeys, create/update `app/test/e2e/specs/*.spec.ts`.
