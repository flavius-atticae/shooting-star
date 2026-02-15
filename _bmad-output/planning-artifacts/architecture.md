---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
status: "complete"
lastStep: 8
completedAt: "2026-02-14"
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/prd-validation-report.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/api-contracts.md
  - docs/data-models.md
  - docs/component-inventory.md
  - docs/source-tree-analysis.md
  - docs/development-guide.md
  - docs/deployment-guide.md
workflowType: "architecture"
project_name: "shooting-star"
user_name: "Flavius"
date: "2026-02-14"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

38 functional requirements organized into 9 categories:

| Category                                 | FRs       | Status                         |
| ---------------------------------------- | --------- | ------------------------------ |
| Service Presentation                     | FR1–FR5   | Existing ✅                    |
| Discovery & Navigation                   | FR6–FR9   | Existing ✅                    |
| Contact                                  | FR10–FR13 | Existing ✅                    |
| Protection & Security                    | FR14–FR16 | Existing ✅                    |
| Visual Effects & Animations (Issue #186) | FR17–FR21 | To build 🔨                    |
| SEO & Discoverability                    | FR22–FR25 | Phase 2 📋                     |
| Monitoring & Operations                  | FR26–FR28 | Partial (health ✅, Sentry ❌) |
| BMAD Development Workflow                | FR29–FR33 | In progress                    |
| Test Strategy Modernization              | FR34–FR38 | To operationalize 🔨           |

The core user-facing functionality (service pages, navigation, contact form) is already implemented and stable. The primary new work is visual polish (Issue #186), test strategy modernization (FR34–FR38), and SEO foundations (Phase 2).

**Non-Functional Requirements:**

27 NFRs across 5 categories:

- **Performance (6 NFRs):** LCP < 2.5s, INP < 200ms, CLS < 0.1, TTFB ≤ 800ms, optimized images, initial JS bundle ≤ 250KB gzip
- **Security & Compliance (7 NFRs):** HTTPS, zero data persistence, input sanitization, anti-spam < 2% abuse, no non-essential cookies without consent, privacy policy, designated privacy officer
- **Accessibility (6 NFRs):** WCAG 2.1 AA zero critical violations, AA contrast ratios, 44×44px touch targets, keyboard navigable with visible focus, reduced motion support, `lang="fr-CA"`
- **Reliability (4 NFRs):** ≥ 99.0% monthly uptime, email failure alerts ≤ 5min, deploy interruption ≤ 60s, health endpoint < 500ms
- **Test Platform Quality (4 NFRs):** flakiness ≤ 2%, PR feedback median ≤ 12 min, visual false positives ≤ 5%, deterministic visual rendering for critical checks

**Scale & Complexity:**

- Primary domain: SSR web application, mobile-first professional showcase
- Complexity level: Medium — 33 components, 7 routes, 1 server-side flow, static content
- No real-time features, no multi-tenancy, single external integration (Resend API)
- High regulatory compliance surface (WCAG 2.1 AA + GDPR + PIPEDA + Québec Law 25)
- High emotional UX complexity, moderate technical complexity

### Technical Constraints & Dependencies

- **Stack locked:** React Router v7 SSR, Tailwind CSS v4, shadcn/ui, Vite 6, TypeScript 5.8 — no changes planned or desired
- **Infrastructure fixed:** Fly.io (Toronto/yyz), Docker multi-stage (Node 20 Alpine), GitHub Actions CI/CD
- **Single external dependency:** Resend API for transactional emails (contact confirmation + business notification)
- **Progressive enhancement mandatory:** Contact form must work without client-side JavaScript (server actions)
- **Server-only isolation:** Email, honeypot, rate limiter modules use `.server.ts` suffix — no client bundle leakage
- **Content-as-code:** All page content in `app/data/` TypeScript files — type-safe, versioned, no CMS
- **Brownfield context:** Site is already in production on Fly.io — architecture decisions must respect existing patterns

### Cross-Cutting Concerns Identified

1. **Pregnancy-safe UX** — Impacts ALL components: animations, touch targets, contrast, motion preferences. Must be systemic via centralized hooks/patterns (`usePregnancySafeAnimation`), not per-component ad hoc implementation.

2. **Legal compliance (GDPR/PIPEDA/Law 25)** — Impacts contact form, email templates, future analytics. Integrated as a baseline constraint, not a separate feature. Zero data persistence architecture is a deliberate compliance decision.

3. **WCAG 2.1 AA accessibility** — Impacts every UI component, every route, every interaction. Enforced via axe-core automation (Playwright + Storybook) and manual audits.

4. **Local SEO foundations** — Phase 2 feature, but architectural decisions about meta tag management, structured data patterns, and sitemap generation should be considered now to avoid retrofitting.

5. **AI agent testability (BMAD)** — The architecture document itself is part of the product. It must be explicit, unambiguous, and readable by AI agents to enable consistent implementation with ≤ 2 clarification requests per story.

6. **Content management evolution** — Current content-as-code pattern works for Phase 1 but creates developer dependency for content changes. Architecture should not preclude future CMS integration (Phase 3 vision) but should not over-engineer for it now.

## Starter Template Evaluation

### Primary Technology Domain

SSR web application (brownfield) — professional showcase site already in production.

### Starter Evaluation: Not Applicable (Brownfield)

This is a brownfield project with an established, production-deployed codebase. No starter template evaluation is needed. The existing stack serves as the architectural foundation.

### Existing Stack (Architectural Foundation)

| Layer       | Technology                       | Version      | Status    |
| ----------- | -------------------------------- | ------------ | --------- |
| Language    | TypeScript (strict)              | 5.8          | Locked ✅ |
| UI          | React                            | 19           | Locked ✅ |
| Routing/SSR | React Router                     | 7            | Locked ✅ |
| Bundler     | Vite                             | 6            | Locked ✅ |
| Styling     | Tailwind CSS + shadcn/ui         | 4 / new-york | Locked ✅ |
| Forms       | react-hook-form + Zod            | 7.62 / 4.1   | Locked ✅ |
| Email       | Resend + React Email             | 6.9 / 1.0    | Locked ✅ |
| Testing     | Vitest + Playwright + Chromatic  | Latest       | Locked ✅ |
| Docs        | Storybook                        | 10           | Locked ✅ |
| Deploy      | Fly.io + Docker + GitHub Actions | —            | Locked ✅ |

### Architectural Patterns Established

- **SSR-first** with client hydration (React Router v7)
- **Progressive enhancement** — forms work without JavaScript
- **Two-tier components** — UI primitives (shadcn/ui) + layout compositions
- **Content-as-code** — typed TypeScript data files in `app/data/`
- **Server isolation** — `.server.ts` suffix for email, honeypot, rate limiting
- **Colocation** — components, stories, and data grouped by feature
- **Barrel exports** — `index.ts` for clean imports
- **Pregnancy-safe UX** — centralized via hooks and design tokens

### Rationale: No Change

The current stack is coherent, proportionate, modern, and battle-tested in production. The PRD mandates consolidation, not refoundation. Architectural decisions in subsequent sections focus on new capabilities (animations, SEO, monitoring) within this established foundation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

1. Animation system architecture (Issue #186)
2. Test organization conventions (agent consistency)

**Important Decisions (Shape Architecture):** 3. SEO technical foundations (Phase 2 preparation) 4. Monitoring & email reliability (Phase 2 preparation) 5. Content abstraction layer (Phase 3 preparation)

**Deferred Decisions (Post-MVP):**

- Analytics provider selection (Phase 2, requires Loi 25 consent mechanism)
- CMS selection (Phase 3, if content autonomy need confirmed)
- B2B section architecture (Phase 3)

### Decision 1: Animation System — Reusable Primitives

**Decision:** Create a system of 3-4 reusable animation primitive components that encapsulate Framer Motion + `prefers-reduced-motion` handling.

**Components to create:**

- `ScrollReveal` — Fade/slide-in on scroll intersection (FR17: 150-400ms)
- `PageTransition` — Route transition wrapper (FR20: 150-300ms)
- `HoverLift` — Card/button hover micro-interaction (FR19)
- `FocusRing` — Enhanced focus state animation (FR18)

**Implementation details:**

- Built on top of existing `usePregnancySafeAnimation` hook
- Centralized duration constants in `lib/animation-constants.ts`
- All primitives automatically respect `prefers-reduced-motion` (FR21)
- Agents use `<ScrollReveal>` instead of raw Framer Motion API

**Rationale:** Provides a clear vocabulary for AI agents. Instead of each agent learning Framer Motion, they compose with named primitives. The existing `usePregnancySafeAnimation` hook becomes the internal engine.

**Affects:** All layout components, all routes, Storybook stories

### Decision 2: SEO Technical Foundations — Colocated Data + Helpers

**Decision:** SEO metadata colocated in `app/data/` files + typed helpers in `lib/seo.ts` + server routes for sitemap/robots.

**Implementation details:**

- Each data file (`home.ts`, `doula.ts`, etc.) exports an `seo` object:
  `{ title, description, ogImage?, keywords? }`
- `lib/seo.ts` exports typed builders:
  - `buildPageMeta(seoData)` → React Router `meta()` return type
  - `buildLocalBusinessJsonLd()` → JSON-LD script content
  - `buildServiceJsonLd(service)` → Service schema
- `/sitemap.xml` route → loader generates XML from route config
- `/robots.txt` route → loader serves robots directives

**Rationale:** Follows existing content-as-code pattern. When content changes, SEO updates in the same file. Helpers ensure consistent output format across all routes. Typed builders prevent malformed meta tags.

**Affects:** All route files, `app/data/*`, new `lib/seo.ts`

### Decision 3: Monitoring & Email Reliability

#### 3a. Error Monitoring — Sentry Server-Only

**Decision:** `@sentry/node` on server only. No client-side SDK.

**Implementation details:**

- Initialize in server entry point (not `root.tsx`)
- Capture loader/action errors, unhandled rejections
- Source maps uploaded during CI build
- No client bundle impact (~0KB added to client)
- No GDPR/Loi 25 consent needed (no user tracking)

**Rationale:** The critical flow (Resend email) is 100% server-side. Client errors on a static showcase site are rare and non-critical. Avoids bundle bloat and consent complexity. Client SDK can be added later if needed.

#### 3b. Email Reliability — Retry + Sentry Alerts

**Decision:** Automatic retry with exponential backoff + Sentry error capture for definitive failures.

**Implementation details:**

- `lib/email.server.ts` wraps Resend calls with retry logic:
  - Max 2 retries, exponential backoff (1s, 3s)
  - On definitive failure: Sentry.captureException with full context
- Sentry alert rule: notify on email send failure (NFR-F2: ≤ 5min)
- `Promise.allSettled` pattern preserved for parallel send

**Rationale:** Covers transient Resend API errors (network, rate limits) automatically. Sentry provides proactive alerting for permanent failures. No need for a secondary email channel — proportionate to project scale.

**Affects:** `lib/email.server.ts`, server entry point, Sentry project config

### Decision 4: Test Organization — Mirror Structure

**Decision:** Centralized `app/test/` with mirror directory structure matching source code paths. Strict naming conventions for agent consistency.

**Convention:**

```
Source: app/components/layout/hero/Hero.tsx
Test:   app/test/components/layout/hero/hero.test.tsx

Source: app/lib/contact-form-schema.ts
Test:   app/test/lib/contact-form-schema.test.ts

Source: app/routes/doula.tsx
Test:   app/test/integration/doula.test.tsx (integration)
        app/test/e2e/doula.spec.ts (E2E/Playwright)
```

**Test type placement:**

- `test/components/` → Unit tests (Vitest, mirror structure)
- `test/lib/` → Utility unit tests (Vitest, mirror structure)
- `test/integration/` → Route rendering tests (Vitest)
- `test/e2e/` → User journey tests (Playwright)
- `test/patterns/` → Reusable test patterns and helpers
- `test/manual/` → Manual test plans

**Stories:** Remain colocated with routes (`routes/doula.stories.tsx`). Chromatic handles visual regression from stories.

**Rationale:** Java-style mirror structure. No ambiguity for agents: given a source file path, the test file path is deterministic.

**Affects:** All new test files, agent implementation instructions

#### 4a. Test Strategy Modernization and Governance (FR34–FR38)

**Decision:** Formalize test-strategy architecture as a first-class capability, with deterministic visual execution, vendor decoupling, blocking gates, baseline governance, and release telemetry.

**Implementation details:**

- Deterministic visual rendering in CI for critical checks (pinned runtime/container, fonts, viewport, timezone, locale)
- Vendor decoupling via a CI-level adapter boundary (workflow orchestration independent from visual provider)
- Branch-protection aligned required checks for test-strategy gates (merge blocked on failure)
- Baseline governance through PR-only updates with explicit approver ownership and audit trail
- Release telemetry artifact including flakiness, median mandatory-check duration, and visual false-positive ratio

**Rationale:** FR34–FR38 and NFR-T1..NFR-T4 require operational governance, not only test implementation. This decision makes quality signals reproducible, auditable, and sustainable over time.

**Affects:** `.github/workflows/*`, branch protection configuration, test strategy documentation, visual baseline review process, release-quality reporting

### Decision 5: Content Abstraction — Thin Service Layer

**Decision:** Create `lib/content.server.ts` with typed accessor functions that abstract the content source from consuming routes.

**Implementation details:**

- `lib/content.server.ts` exports:
  - `getHomeContent()` → HomeContent type
  - `getDoulaContent()` → DoulaContent type
  - `getYogaContent()` → YogaContent type (if needed)
  - `getAboutContent()` → AboutContent type
  - `getFemininSacreContent()` → FemininSacreContent type
  - `getCallToActionContent()` → CTAContent type
- Currently: functions import from `app/data/*.ts` and return
- Future (Phase 3): functions can fetch from CMS API instead
- Routes call `getDoulaContent()` instead of `import from '~/data/doula'`

**Rationale:** "Program to an interface, not an implementation." One file to change when/if content source migrates to CMS. Routes remain untouched. Minimal overhead now, maximum flexibility later.

**Affects:** All route files, new `lib/content.server.ts`, `app/data/*`

### Decision Impact Analysis

**Implementation Sequence:**

1. Content abstraction layer (Decision 5) — Foundation, unblocks clean route structure
2. Animation primitives (Decision 1) — Unblocks Issue #186 implementation
3. Test conventions (Decision 4) — Convention, applied incrementally with new code
4. SEO foundations (Decision 2) — Phase 2, but data structure decisions affect Phase 1 data files
5. Monitoring (Decision 3) — Phase 2, independent of other decisions

**Cross-Component Dependencies:**

- Decision 1 (animations) + Decision 4 (tests): Each animation primitive needs corresponding tests in `test/components/ui/` with reduced-motion variants
- Decision 2 (SEO) + Decision 5 (content): SEO data lives in content files, served through content service layer
- Decision 3 (Sentry) + Decision 3b (email retry): Sentry initialization must happen before email module loads

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**11 conflict zones identified** where AI agents could make different choices. Each pattern below is derived from existing codebase conventions and formalized for agent consistency.

### Naming Patterns

| Element               | Convention                    | Example                              |
| --------------------- | ----------------------------- | ------------------------------------ |
| Component folder      | kebab-case                    | `approach-section/`                  |
| Component file        | kebab-case                    | `approach-section.tsx`               |
| Component export      | PascalCase                    | `export function ApproachSection`    |
| Utility file          | kebab-case                    | `contact-form-schema.ts`             |
| Server module         | kebab-case + `.server.ts`     | `email.server.ts`                    |
| Data file             | kebab-case                    | `call-to-action.ts`                  |
| Test file             | kebab-case + `.test.ts(x)`    | `approach-section.test.tsx`          |
| Story file            | kebab-case + `.stories.tsx`   | `doula.stories.tsx`                  |
| Hook file             | kebab-case with `use-` prefix | `use-browser-support.ts`             |
| Constants             | UPPER_SNAKE_CASE              | `HERO_VARIANTS`, `CORE_WEB_VITALS`   |
| Variables/functions   | camelCase                     | `doulaServices`, `sendContactEmails` |
| Types/interfaces      | PascalCase                    | `ServiceItem`, `ContactFormData`     |
| CSS custom properties | kebab-case                    | `--color-primary`                    |

**Known anomaly:** `Hero.tsx` uses PascalCase — to be renamed to `hero.tsx` when the file is next modified. New files MUST use kebab-case.

### Component Structure Patterns

**Layout component directory structure:**

```
app/components/layout/<component-name>/
├── <component-name>.tsx    # Main component (named export)
├── <sub-component>.tsx     # Sub-components if needed
└── index.ts                # Barrel export (types + components)
```

**Component file organization (sections):**

1. Imports
2. Types (interfaces, type aliases)
3. Constants (variants, config objects)
4. Component implementation
5. Sub-components (if small, otherwise separate file)

**Component rules:**

- Named exports only — never `export default` (exception: route page components)
- Props typed with exported interface: `export interface ComponentProps`
- `forwardRef` only when DOM ref access is needed by parent
- `cn()` for all Tailwind class composition — never manual string concatenation
- CVA (`class-variance-authority`) for components with style variants

### Route Structure Patterns

**Route file organization (strict order):**

```tsx
// 1. Imports (type → react-router → components → data → lib)
import type { Route } from "./+types/<route>";
import { Header } from "~/components/layout/header/header";

// 2. Meta function
export function meta(_args: Route.MetaArgs) { ... }

// 3. Loader (if needed — data fetching)
export async function loader({ request }: Route.LoaderArgs) { ... }

// 4. Action (if needed — form handling)
export async function action({ request }: Route.ActionArgs) { ... }

// 5. Page component (export default — ONLY exception to named export rule)
export default function PageName() { ... }
```

**Route rules:**

- Header and Footer included in each route (not in root.tsx)
- `<main id="main-content" role="main">` wraps page content
- Stories colocated: `doula.stories.tsx` next to `doula.tsx`

### Error Handling Patterns

| Error Type                   | Response                        | Status | Language                |
| ---------------------------- | ------------------------------- | ------ | ----------------------- |
| Validation errors            | `data({ errors: fieldErrors })` | 400    | French (fr-CA) messages |
| Business errors (rate limit) | `data({ error: "message" })`    | 429    | French (fr-CA) messages |
| Unexpected errors            | `throw` → ErrorBoundary         | 500    | French (fr-CA) UI       |
| Server logs                  | Structured log with context     | —      | English                 |

**Rules:**

- User-facing error messages in French (fr-CA), warm tone
- Never expose technical details to users
- Server logs in English with context (IP, timestamp, operation)
- Use React Router ErrorBoundary for unrecoverable errors

### Data File Patterns

**Rules:**

- Named typed exports only — no `export default`
- Types defined in the same file or imported from consuming components
- Content in French (fr-CA) — this is the site's content
- Pure data only — no logic, no side effects
- Each data file will export an `seo` object (Decision 2, Phase 2)

### Server Module Patterns

**Rules:**

- `.server.ts` suffix mandatory for server-only code
- Never import `.server.ts` from client code — Vite will fail at build
- Export pure functions, no classes, no global state (rate limiter is intentional exception)
- Resend API calls wrapped with retry logic (Decision 3b)

### Styling Patterns

**Rules:**

- `cn()` for all class composition — import from `~/lib/utils`
- CVA for variant-based components (Button, Section, Background)
- Design tokens in `app.css` via CSS custom properties
- No inline `style={{}}` — use Tailwind classes or CSS custom properties
- Responsive: mobile-first (`base` → `md:` → `lg:` → `xl:`)
- Touch targets: `min-h-[44px] min-w-[44px]` on all interactive elements
- Reduced motion: `motion-safe:` prefix for Tailwind animations, or `usePregnancySafeAnimation` hook for Framer Motion

### Accessibility Patterns (WCAG 2.1 AA)

**Every component MUST:**

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`)
- Provide `aria-label` or `aria-labelledby` on non-textual interactive elements
- Support keyboard navigation with visible focus indicators
- Respect heading hierarchy (`h1` → `h2` → `h3`, no skipping)
- Provide `alt` on images (descriptive or `alt=""` if decorative)
- Use `role` only when semantic HTML is insufficient

### Import Patterns

**Rules:**

- `~/` alias for all imports from `app/` — never relative paths (`../../`)
- Exception: relative imports within the same component folder (`./hero-animations`)
- Import order: React/external libs → React Router → Components → Data → Lib → Types
- Use `import type { ... }` for type-only imports

### Code Documentation Patterns

**Rules:**

- Code and comments in English
- JSDoc on exported functions and public interfaces
- Section separators (`// ============`) for files > 100 lines
- No obvious comments — code should be self-explanatory
- TODO/FIXME with context: `// TODO(#186): Add scroll reveal animation`

### Git Workflow Patterns

**Rules:**

- Branches: `feature/issue-<N>-<description>` or `fix/issue-<N>-<description>`
- Commits: `[ #N ] Description in English`
- PRs: target `main`, include `Related to #N`
- Logical commit granularity (one component or one concern per commit)

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow naming conventions exactly — kebab-case files, PascalCase exports
2. Use `cn()` for class composition — never concatenate strings
3. Include `aria-*` attributes and semantic HTML in every component
4. Place tests in mirror structure under `app/test/`
5. Write code and comments in English, content in French (fr-CA)
6. Use `~/` import alias — never relative paths across directories
7. Add JSDoc to all exported functions and interfaces

**Anti-Patterns (FORBIDDEN):**

- `export default` on components (except route page components)
- Inline styles (`style={{}}`)
- Relative imports across directories (`../../lib/utils`)
- Skipping heading levels (`h1` → `h3`)
- Interactive elements smaller than 44×44px
- Animations without `prefers-reduced-motion` support
- French in code comments or variable names
- English in user-facing content

## Project Structure & Boundaries

### Complete Project Tree

```
shooting-star/
├── .github/
│   ├── instructions/
│   │   ├── codacy.instructions.md
│   │   └── copilot.instructions.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug.yml
│   │   └── feature.yml
│   └── workflows/
│       ├── chromatic.yml
│       ├── deploy-fly.yml
│       ├── deploy-storybook.yml
│       └── pr-checks.yml
├── _bmad/                          # BMAD framework (excluded from app)
├── _bmad-output/
│   ├── implementation-artifacts/
│   └── planning-artifacts/
│       ├── prd.md
│       ├── prd-validation-report.md
│       ├── ux-design-specification.md
│       ├── ux-design-directions.html
│       └── research/
├── app/
│   ├── app.css                     # Global styles + Tailwind v4 imports
│   ├── root.tsx                    # App shell, meta, links, error boundary
│   ├── routes.ts                   # Route config (flat-file routing)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.ts            # Barrel export
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── header.stories.tsx
│   │   │   └── navigation.tsx
│   │   └── ui/
│   │       ├── index.ts            # Barrel export
│   │       ├── background.tsx
│   │       ├── background.stories.tsx
│   │       ├── button.tsx
│   │       ├── button.stories.tsx
│   │       ├── card.tsx
│   │       ├── container.tsx
│   │       ├── container.stories.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── section.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   ├── data/                       # Content-as-code (pure typed data)
│   │   ├── about.ts
│   │   ├── call-to-action.ts
│   │   ├── doula.ts
│   │   ├── feminin-sacre.ts
│   │   ├── home.ts
│   │   ├── yoga.ts                 🆕 Content for yoga route
│   │   └── contact.ts             🆕 Content for contact route
│   ├── emails/                     # React Email templates
│   │   ├── contact-confirmation.tsx
│   │   └── contact-notification.tsx
│   ├── hooks/
│   │   ├── index.ts                # Barrel export
│   │   ├── use-browser-support.ts
│   │   └── use-pregnancy-safe-animation.ts  🆕 Animation hook (Decision 1)
│   ├── lib/
│   │   ├── index.ts                # Barrel export
│   │   ├── browser-support.ts
│   │   ├── contact-form-schema.ts
│   │   ├── email.server.ts         # Resend integration (server-only)
│   │   ├── form-security.ts
│   │   ├── honeypot.server.ts      # Bot protection (server-only)
│   │   ├── performance-thresholds.ts
│   │   ├── rate-limiter.ts
│   │   ├── utils.ts                # cn() helper
│   │   ├── seo.ts                  🆕 SEO typed builders (Decision 2)
│   │   ├── content.server.ts       🆕 Content service layer (Decision 5)
│   │   ├── sentry.server.ts        🆕 Sentry init (Decision 3a)
│   │   └── animation-constants.ts  🆕 Duration/easing constants (Decision 1)
│   ├── routes/
│   │   ├── home.tsx
│   │   ├── home.stories.tsx
│   │   ├── about.tsx
│   │   ├── about.stories.tsx
│   │   ├── yoga.tsx
│   │   ├── yoga.stories.tsx
│   │   ├── doula.tsx
│   │   ├── doula.stories.tsx
│   │   ├── feminin-sacre.tsx
│   │   ├── feminin-sacre.stories.tsx
│   │   ├── contact.tsx
│   │   ├── contact.stories.tsx
│   │   ├── health.tsx
│   │   ├── sitemap[.]xml.tsx       🆕 Dynamic sitemap (Decision 2)
│   │   └── robots[.]txt.tsx        🆕 Dynamic robots.txt (Decision 2)
│   ├── test/
│   │   ├── setup.ts                # Vitest setup
│   │   ├── setup.test.ts
│   │   ├── utils.tsx               # Test utilities (renderWithRouter, etc.)
│   │   ├── components/
│   │   │   ├── background.test.tsx
│   │   │   ├── container.test.tsx
│   │   │   ├── error-boundary.test.tsx
│   │   │   ├── contact/
│   │   │   │   ├── contact-form.test.tsx
│   │   │   │   └── confirmation-message.test.tsx
│   │   │   ├── header/
│   │   │   │   ├── header.test.tsx
│   │   │   │   └── navigation.test.tsx
│   │   │   └── layout/
│   │   │       ├── footer.test.tsx
│   │   │       └── header.test.tsx
│   │   ├── e2e/
│   │   │   ├── global-setup.ts
│   │   │   └── specs/
│   │   │       ├── comprehensive-scenarios.spec.ts
│   │   │       ├── homepage.spec.ts
│   │   │       ├── performance.spec.ts
│   │   │       ├── persona-journeys.spec.ts
│   │   │       └── security.spec.ts
│   │   ├── integration/
│   │   │   ├── about-route.test.tsx
│   │   │   ├── doula-route.test.tsx
│   │   │   ├── router.test.tsx
│   │   │   └── yoga-route.test.tsx
│   │   ├── lib/
│   │   │   ├── contact-action.test.ts
│   │   │   ├── form-security.test.ts
│   │   │   ├── hooks.test.tsx
│   │   │   ├── rate-limiter.test.ts
│   │   │   └── utils.test.ts
│   │   ├── manual/
│   │   │   └── animation-testing-guide.md
│   │   └── patterns/
│   │       └── test-conventions.md
│   └── welcome/
│       └── welcome.tsx             # Default RR7 welcome (to remove)
├── build/                          # Production build output (gitignored)
│   ├── client/
│   │   ├── assets/
│   │   └── fonts/
│   └── server/
│       └── index.js
├── design/                         # Design assets (source files)
│   ├── logos/
│   │   ├── Logos - PNG/
│   │   └── Logos - SVG/
│   └── mockups/
├── docs/                           # Technical documentation
│   ├── index.md
│   ├── project-overview.md
│   ├── architecture.md
│   ├── api-contracts.md
│   ├── data-models.md
│   ├── component-inventory.md
│   ├── source-tree-analysis.md
│   ├── development-guide.md
│   └── deployment-guide.md
├── public/
│   └── fonts/                      # Self-hosted web fonts
├── stories/                        # Global Storybook docs (MDX)
│   ├── Introduction.mdx
│   └── Guidelines-Pregnancy-Safe.mdx
├── chromatic.config.json
├── components.json                 # shadcn/ui config
├── Dockerfile                      # Multi-stage Node 20 Alpine
├── fly.toml                        # Fly.io deployment config (yyz)
├── package.json
├── playwright.config.ts
├── react-router.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

### Architectural Boundaries

```
┌─────────────────────────────────────────────┐
│                 CLIENT SIDE                  │
│                                              │
│  routes/*.tsx        → Page components (SSR + hydration)
│  components/ui/*     → UI primitives (Button, Card, etc.)
│  components/layout/* → Layout compositions (Header, Footer)
│  hooks/*             → Client-side React hooks
│  lib/utils.ts        → cn() utility
│  lib/browser-support.ts
│  lib/form-security.ts
│  lib/performance-thresholds.ts
│  lib/animation-constants.ts 🆕
│  lib/seo.ts 🆕         (runs on server for meta(), available to both)
│  data/*.ts              (imported at build time, tree-shaken)
│                                              │
├──────────────── SERVER BOUNDARY ─────────────┤
│                                              │
│                 SERVER SIDE                   │
│                                              │
│  lib/email.server.ts      → Resend API calls
│  lib/honeypot.server.ts   → Bot detection
│  lib/rate-limiter.ts      → IP-based rate limiting
│  lib/content.server.ts 🆕 → Content service layer
│  lib/sentry.server.ts 🆕  → Sentry initialization
│  routes/sitemap[.]xml.tsx 🆕 → Server-only loader
│  routes/robots[.]txt.tsx 🆕  → Server-only loader
│  root.tsx (loader)        → Server-side data loading
│  routes/contact.tsx (action) → Form processing
│  routes/health.tsx (loader)  → Health check
│                                              │
└─────────────────────────────────────────────┘
```

**Boundary Rules:**

- Files ending in `.server.ts` are NEVER bundled for the client (enforced by React Router v7)
- `data/*.ts` files are pure data — no side effects, no server dependencies — safe for both contexts
- Route `loader` and `action` functions run on the server; the default export component runs on both (SSR + hydration)
- `lib/seo.ts` exports pure builder functions used in route `meta()` functions (server context)
- Hooks run client-side only (after hydration)

### Data Flow

```
┌──────────┐    GET     ┌───────────┐   loader()   ┌──────────────┐
│  Browser  │ ────────→ │  React    │ ───────────→ │ data/*.ts     │
│           │           │  Router   │              │ content.server│
│           │ ←──────── │  v7 SSR   │ ←─────────── │              │
│           │   HTML    │           │   typed data  └──────────────┘
└──────────┘            └───────────┘
                              │
     POST (contact form)      │ action()
                              ▼
                        ┌───────────┐
                        │ Validation│ → Zod schema
                        │ Security  │ → honeypot + rate limit
                        │ Email     │ → Resend API (retry × 2)
                        │ Monitoring│ → Sentry on failure
                        └───────────┘
```

### FR-to-Structure Mapping

| FR Category                  | Primary Files                                              | New Files (🆕)                                                         |
| ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| FR1–FR5 Service Presentation | `routes/{about,yoga,doula,feminin-sacre}.tsx`, `data/*.ts` | `data/yoga.ts`, `data/contact.ts`, `lib/content.server.ts`             |
| FR6–FR9 Navigation           | `components/layout/{header,navigation,footer}.tsx`         | —                                                                      |
| FR10–FR13 Contact            | `routes/contact.tsx`, `lib/email.server.ts`, `emails/*`    | —                                                                      |
| FR14–FR16 Security           | `lib/{form-security,honeypot.server,rate-limiter}.ts`      | —                                                                      |
| FR17–FR21 Animations         | `hooks/use-browser-support.ts`                             | `hooks/use-pregnancy-safe-animation.ts`, `lib/animation-constants.ts`  |
| FR22–FR25 SEO                | —                                                          | `lib/seo.ts`, `routes/sitemap[.]xml.tsx`, `routes/robots[.]txt.tsx`    |
| FR26–FR28 Monitoring         | `routes/health.tsx`                                        | `lib/sentry.server.ts`                                                 |
| FR29–FR33 BMAD               | `_bmad/`, `_bmad-output/`                                  | —                                                                      |
| FR34–FR38 Test Strategy      | `.github/workflows/*`, branch protections, QA artifacts    | Test-strategy docs, release stability reports, baseline governance log |

### External Integration Points

| Service                    | Protocol           | File                          | Sensitivity                     |
| -------------------------- | ------------------ | ----------------------------- | ------------------------------- |
| Resend (email)             | HTTPS REST         | `lib/email.server.ts`         | API key (env: `RESEND_API_KEY`) |
| Sentry (monitoring)        | HTTPS SDK          | `lib/sentry.server.ts` 🆕     | DSN (env: `SENTRY_DSN`)         |
| Fly.io (hosting)           | Docker deploy      | `Dockerfile`, `fly.toml`      | Deploy token (CI secret)        |
| Chromatic (visual testing) | HTTPS SDK          | `chromatic.config.json`       | Project token (CI secret)       |
| GitHub Actions (CI/CD)     | YAML workflows     | `.github/workflows/*`         | Various secrets                 |
| Google (SEO)               | Sitemap/robots.txt | `routes/sitemap[.]xml.tsx` 🆕 | Public (no secrets)             |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All 5 architectural decisions operate without conflicts. Decisions 1 (animations) and 3a (Sentry) target different tiers (client vs server) with no overlap. Decisions 2 (SEO) and 5 (content service) are synergistic — colocated SEO data in `data/` flows through `content.server.ts`. Decision 3b (email retry) depends on Decision 3a (Sentry) — designed as a cohesive pair. Decision 4 (mirror tests) is orthogonal and applies uniformly to all new code. The implementation sequence (5 → 1 → 4 → 2 → 3) respects dependency order.

**Pattern Consistency:**
All 11 implementation patterns are internally consistent and aligned with the 5 decisions. Naming conventions (kebab-case files, PascalCase exports) are applied uniformly across component, route, test, and data file patterns. No contradictions found between error handling patterns and the Sentry integration decision. Styling patterns (cn(), CVA, mobile-first) support all component decisions without conflict.

**Structure Alignment:**
The project tree (Step 6) fully supports all architectural decisions. Client/server boundaries are well-defined. `.server.ts` suffixed modules are correctly isolated. New files (🆕) are placed in locations consistent with existing patterns. Integration points are properly structured with clear sensitivity levels.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage (38/38):**

| Category                | FRs       | Architectural Support                                 | Status  |
| ----------------------- | --------- | ----------------------------------------------------- | ------- |
| Service Presentation    | FR1–FR5   | Routes + data + content.server.ts                     | ✅ Full |
| Discovery & Navigation  | FR6–FR9   | Layout components (header, navigation, footer)        | ✅ Full |
| Contact                 | FR10–FR13 | Action route + email.server + retry + Sentry alerts   | ✅ Full |
| Protection & Security   | FR14–FR16 | Honeypot + rate limiter + sanitization                | ✅ Full |
| Animations              | FR17–FR21 | 4 primitives + usePregnancySafeAnimation + constants  | ✅ Full |
| SEO & Discoverability   | FR22–FR25 | seo.ts builders + sitemap.xml + robots.txt routes     | ✅ Full |
| Monitoring & Operations | FR26–FR28 | Health endpoint + Sentry server-only                  | ✅ Full |
| BMAD Workflow           | FR29–FR33 | This document + \_bmad framework                      | ✅ Full |
| Test Strategy           | FR34–FR38 | Deterministic visual CI + gate governance + telemetry | ✅ Full |

**Non-Functional Requirements Coverage (27/27):**

| Category              | Count | Architectural Support                                                              | Status  |
| --------------------- | ----- | ---------------------------------------------------------------------------------- | ------- |
| Performance           | 6     | SSR + code splitting + Sentry server-only (0KB client) + performance-thresholds.ts | ✅ Full |
| Security & Compliance | 7     | Zero data persistence + .server.ts isolation + honeypot + no non-essential cookies | ✅ Full |
| Accessibility         | 6     | WCAG 2.1 AA pattern category + 44px touch targets + reduced motion + lang="fr-CA"  | ✅ Full |
| Reliability           | 4     | Sentry alerts (≤5min) + email retry + health endpoint (<500ms) + rolling deploy    | ✅ Full |
| Test Platform         | 4     | Flakiness/latency/false-positive telemetry + deterministic visual execution        | ✅ Full |

### Implementation Readiness Validation ✅

**Decision Completeness:**
All 5 critical decisions are documented with specific technology choices and versions. Implementation patterns are comprehensive enough for agents to follow without ambiguity. The 7 enforcement guidelines + 8 anti-patterns provide clear agent guardrails. Route structure example (Step 5) gives a concrete code template.

**Structure Completeness:**
Project tree covers all existing files and all new files (🆕) from decisions. Directory structure is specific with exact file names. Integration points are mapped with protocol, file location, and sensitivity level. Component boundaries (layout vs ui) are well-defined.

**Pattern Completeness:**
All 11 potential conflict zones are addressed with explicit conventions. Naming conventions cover all file types (components, tests, stories, hooks, data, server modules). Import patterns, error handling, and accessibility rules are comprehensive. No ambiguity zones remain.

### Gap Analysis Results

**Important Gaps Identified & Resolved:**

1. **Animation library dependency not in package.json**
   - _Issue:_ Decision 1 references "Framer Motion" but no animation library exists in `package.json`
   - _Resolution:_ The `motion` package (motion.dev, successor to framer-motion) should be added as a new dependency when implementing Decision 1. This is an implementation-time addition, not a pre-existing dependency. The implementing agent must run `npm install motion` before creating animation primitives.

2. **Animation primitive components missing from project tree**
   - _Issue:_ Decision 1 defines 4 primitives (ScrollReveal, PageTransition, HoverLift, FocusRing) but the project tree does not show their file locations
   - _Resolution:_ These files should be created under `app/components/ui/`:
     - `app/components/ui/scroll-reveal.tsx`
     - `app/components/ui/page-transition.tsx`
     - `app/components/ui/hover-lift.tsx`
     - `app/components/ui/focus-ring.tsx`
   - Corresponding tests at `app/test/components/ui/scroll-reveal.test.tsx`, etc.

**Minor Observations (Non-Blocking):**

3. **`rate-limiter.ts` missing `.server.ts` suffix**
   - _Issue:_ Pattern rules state ".server.ts suffix mandatory for server-only code" but `rate-limiter.ts` is server-only and lacks the suffix
   - _Resolution:_ Documented as known anomaly (like `Hero.tsx` PascalCase). To be renamed to `rate-limiter.server.ts` opportunistically. Not blocking — React Router tree-shaking handles it correctly.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed (38 FRs, 27 NFRs)
- [x] Scale and complexity assessed (medium — 33 components, 7 routes)
- [x] Technical constraints identified (stack locked, brownfield, Fly.io)
- [x] Cross-cutting concerns mapped (6 concerns: pregnancy-safe UX, compliance, a11y, SEO, BMAD, content evolution)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions (5 decisions)
- [x] Technology stack fully specified (12 technologies, all version-locked)
- [x] Integration patterns defined (Resend, Sentry, Fly.io, Chromatic, GitHub Actions)
- [x] Performance considerations addressed (SSR + 0KB client Sentry + code splitting)

**✅ Implementation Patterns**

- [x] Naming conventions established (11 element types covered)
- [x] Structure patterns defined (component, route, data file patterns)
- [x] Communication patterns specified (import order, barrel exports, ~/ alias)
- [x] Process patterns documented (error handling, git workflow, accessibility)

**✅ Project Structure**

- [x] Complete directory structure defined (full tree with 🆕 markers)
- [x] Component boundaries established (UI primitives vs layout compositions)
- [x] Integration points mapped (6 external services with sensitivity levels)
- [x] Requirements to structure mapping complete (8 FR categories → files)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION ✅

**Confidence Level:** HIGH — based on validation results

**Key Strengths:**

- Brownfield project with stable production codebase — low architectural risk
- All decisions are proportionate to project scale (SSR showcase site, 1 developer + agents)
- Clear separation of concerns with explicit client/server boundary
- Implementation patterns derived from existing code conventions — no paradigm shifts
- Every FR and NFR has traceable architectural support
- Deterministic file paths enable AI agents to work without clarification

**Areas for Future Enhancement:**

- Analytics integration (Phase 2) — will require Loi 25 consent mechanism decision
- CMS migration path (Phase 3) — content.server.ts abstraction layer is ready
- Client-side error monitoring — can add @sentry/browser if client-side issues become frequent
- B2B section architecture (Phase 3) — may require additional route structure decisions
- `rate-limiter.ts` → `rate-limiter.server.ts` rename when touching that module
- `Hero.tsx` → `hero.tsx` rename when touching that component

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all 5 architectural decisions exactly as documented
- Use all 11 implementation patterns consistently across all components
- Respect project structure and client/server boundaries
- Refer to this document for all architectural questions
- Target ≤ 2 clarification requests per story (NFR from BMAD)

**Implementation Priority Order:**

1. `lib/content.server.ts` — Content abstraction layer (Decision 5, foundation)
2. `lib/animation-constants.ts` + `hooks/use-pregnancy-safe-animation.ts` — Animation infrastructure (Decision 1)
3. Animation primitives in `components/ui/` — ScrollReveal, PageTransition, HoverLift, FocusRing (Decision 1)
4. Apply animation primitives to existing routes (Issue #186)
5. `lib/seo.ts` + SEO data in `app/data/` files (Decision 2, Phase 2)
6. `routes/sitemap[.]xml.tsx` + `routes/robots[.]txt.tsx` (Decision 2, Phase 2)
7. `lib/sentry.server.ts` + email retry logic in `lib/email.server.ts` (Decision 3, Phase 2)

**New Dependencies to Install:**

- `motion` (motion.dev) — For animation primitives (Decision 1)
- `@sentry/node` — For server-side monitoring (Decision 3a, Phase 2)
