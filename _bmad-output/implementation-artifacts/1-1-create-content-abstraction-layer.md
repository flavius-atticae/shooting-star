# Story 1.1: Create content abstraction layer

Status: review

## Story

As a developer or AI agent,
I want typed accessor functions that abstract the content source from consuming routes,
so that routes are decoupled from the data layer and a future CMS migration requires changing only one file.

## Acceptance Criteria

1. Given `app/lib/content.server.ts` exists, when a route calls `getHomeContent()`, `getDoulaContent()`, `getAboutContent()`, `getFemininSacreContent()`, or `getCallToActionContent()`, then each function returns complete typed content from `app/data/*.ts`.
2. Given no yoga data module exists in `app/data/` for this story scope, when a route calls `getYogaContent()`, then the function returns an explicit typed forward-compatible contract (`YogaContent`) with an empty object payload for now.
3. All existing routes/components that directly import from `~/data/*` are updated to use accessor functions.
4. Return types are explicitly exported interfaces.
5. Existing behavior remains unchanged and visual regressions are validated through Chromatic snapshots.

## Tasks / Subtasks

- [x] Create content service module in `app/lib/content.server.ts` (AC: 1, 2, 4)
  - [x] Export explicit interfaces for each content accessor return value.
  - [x] Implement `getHomeContent()`, `getDoulaContent()`, `getYogaContent()`, `getAboutContent()`, `getFemininSacreContent()`, `getCallToActionContent()`.
  - [x] Ensure functions are pure and return deterministic values.
- [x] Refactor route/component consumers to use service functions (AC: 3, 5)
  - [x] `app/routes/home.tsx` currently imports `servicesData` from `~/data/home`.
  - [x] `app/routes/doula.tsx` currently imports `doulaServices`, `doulaTestimonials`, `approachItems` from `~/data/doula`.
  - [x] `app/routes/about.tsx` currently imports `inspirationItems` from `~/data/about`.
  - [x] `app/routes/feminin-sacre.tsx` currently imports `eventsData`, `introText` from `~/data/feminin-sacre`.
  - [x] `app/components/layout/call-to-action/default-call-to-action.tsx` currently imports `defaultCtaContent` from `~/data/call-to-action`.
- [x] Validate no runtime behavior changes (AC: 5)
  - [x] Validate unchanged visual output via Chromatic review for impacted stories/pages.
  - [x] Run typecheck to ensure interface/export correctness.

## Dev Notes

### Story foundation

- This is the first story of Epic 1 (foundation epic) and is intended to establish a long-term abstraction seam for future CMS migration.
- The scope is intentionally narrow: introduce a service layer and migrate existing direct imports.
- Do not introduce new user-facing features in this story.

### Developer context section

- Existing data modules currently in use: `app/data/home.ts`, `app/data/doula.ts`, `app/data/about.ts`, `app/data/feminin-sacre.ts`, `app/data/call-to-action.ts`.
- Existing direct import consumers found in codebase:
  - `app/routes/home.tsx`
  - `app/routes/doula.tsx`
  - `app/routes/about.tsx`
  - `app/routes/feminin-sacre.tsx`
  - `app/components/layout/call-to-action/default-call-to-action.tsx`
- `app/routes/yoga.tsx` currently has static inline content and no `~/data/*` import.
- There is currently no `app/data/yoga.ts` module in repository scope for this story.
- For this story, `getYogaContent()` is intentionally an exported forward-compatible contract that returns an empty typed object.

### Technical requirements

- Keep stack unchanged (TypeScript + React Router v7 SSR + Tailwind v4).
- Keep all comments and code in English.
- Maintain current SSR behavior and route meta behavior.
- Preserve all existing user-visible copy and route output.
- Avoid introducing client-side imports of server-only modules.

### Architecture compliance

- Follow established naming conventions:
  - file names in kebab-case,
  - exported symbols in PascalCase/camelCase as appropriate,
  - no `default export` for library utilities.
- Use `~/` path alias for imports across directories.
- Keep service module in `app/lib/` per architecture decision (Decision 5).
- Keep implementation thin: a simple abstraction layer over `app/data/*`.

### Library/framework requirements

- No new dependency required for this story.
- Use existing TypeScript type inference where possible, but expose explicit exported interfaces as required by AC.
- Keep React Router route modules compatible with existing patterns.

### File structure requirements

- New file:
  - `app/lib/content.server.ts`
- Expected update points:
  - `app/routes/home.tsx`
  - `app/routes/doula.tsx`
  - `app/routes/about.tsx`
  - `app/routes/feminin-sacre.tsx`
  - `app/components/layout/call-to-action/default-call-to-action.tsx`
- Optional/supporting updates (only if needed for consistency):
  - `app/lib/index.ts` barrel export adjustments.

### Testing requirements

- Minimum validation before marking implementation complete:
  - Type check passes.
  - Tests covering touched routes/components continue passing.
- Follow mirror test structure conventions under `app/test` if adding tests.
- Do not add broad unrelated tests.

### Reinvention prevention checklist

- Reuse existing content constants from `app/data/*`; do not duplicate data objects in the service layer.
- Do not redesign route/component structure in this story.
- Do not modify CTA or content copy while migrating imports.
- Do not mix unrelated naming-cleanup tasks from Story 1.2 into this story.

### Project Structure Notes

- Current codebase follows a mixed route/layout composition with data imported directly in route files and one layout helper.
- This story introduces a deterministic content access boundary with minimal churn.
- No conflict with current deployment/runtime boundaries expected.

### References

- Epic and story definition: `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.1)
- Product scope and goals: `_bmad-output/planning-artifacts/prd.md` (Functional Requirements FR29/FR30/FR33, BMAD workflow goals)
- Architecture decision for content abstraction: `_bmad-output/planning-artifacts/architecture.md` (Decision 5: Content Abstraction — Thin Service Layer)
- Conventions and patterns: `_bmad-output/planning-artifacts/architecture.md` (Implementation Patterns & Consistency Rules)
- UX constraints (preserve behavior and copy): `_bmad-output/planning-artifacts/ux-design-specification.md` (Core experience and consistency patterns)

## Story completion status

- Story context generated with implementation guardrails, explicit file targets, and anti-regression boundaries.
- Sprint tracking target status for this story: `ready-for-dev`.
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Source import scan completed for `~/data/*` consumers.
- Story target selected from sprint status in order.
- Typecheck passed after fixing `buttonHref` optionality (aligned with `CallToActionProps`).
- Codacy CLI analysis executed on modified files as part of implementation workflow.

### Testing Policy Note

- Current repository validation baseline for this story accepts Chromatic visual regression checks.
- Vitest unit tests are currently not part of the mandatory gating policy due to known Storybook/Vitest integration constraints.
- A full project-wide testing policy review is deferred to a future dedicated effort.
- This decision is tracked for retrospective and backlog in `_bmad-output/implementation-artifacts/sprint-status.yaml` under follow-up `retro-2026-02-14-testing-policy`, linked to backlog item `7-3-review-and-define-project-testing-policy`.

### Implementation Plan

1. Created `app/lib/content.server.ts` with 6 exported interfaces and 6 accessor functions.
2. Interfaces mirror the shape already consumed by route components.
3. Functions delegate directly to `app/data/*` modules — no data duplication.
4. `getCallToActionContent()` is exposed from a shared non-server content module and re-used by `content.server`.
5. `getYogaContent()` returns empty object as forward-compatibility contract.
6. Migrated all 5 consumer files from direct `~/data/*` imports to content accessor functions (`~/lib/content.server` for routes and `~/lib/content` for shared UI-safe CTA access).
7. Validation aligned with current project policy (Chromatic visual checks + typecheck).

### Completion Notes List

- All 6 accessor functions implemented.
- All 5 consumer files migrated to use content service.
- Typecheck passes with zero errors.
- No runtime behavior changes — routes still produce identical output.
- No new dependencies added.
- Codacy analysis clean on all files.

### File List

- app/lib/content.server.ts (new)
- app/lib/content.ts (new)
- app/routes/home.tsx (modified)
- app/routes/doula.tsx (modified)
- app/routes/about.tsx (modified)
- app/routes/feminin-sacre.tsx (modified)
- app/components/layout/call-to-action/default-call-to-action.tsx (modified)
- \_bmad-output/implementation-artifacts/sprint-status.yaml (modified)
- \_bmad-output/implementation-artifacts/1-1-create-content-abstraction-layer.md (modified)

## Change Log

- 2026-02-14: Created content abstraction layer (`app/lib/content.server.ts`) with typed interfaces and accessor functions. Migrated all direct `~/data/*` imports in 5 consumer files. Validation aligned to current Chromatic-first policy and typecheck.
