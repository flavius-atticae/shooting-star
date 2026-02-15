# Test Conventions

This document defines deterministic test placement and naming rules for all new tests in this repository.

## Goals

- Keep test paths predictable for human and AI contributors.
- Mirror source structure under `app/test/**`.
- Preserve clear test responsibility boundaries (unit, integration, e2e).

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
- `app/lib/content/content.server.ts` → `app/test/lib/content/content.test.ts`
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

- `app/test/components/**`: Unit/component behavior.
- `app/test/lib/**`: Utility logic, hooks, and server-safe units.
- `app/test/integration/**`: Route rendering/composition and SSR route behavior.
- `app/test/e2e/**`: Browser-level user journeys (Playwright).
- `app/test/patterns/**`: Reusable patterns and test conventions docs.
- `app/test/manual/**`: Manual test plans.

Do not duplicate the same behavior checks across multiple levels without clear purpose.

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
