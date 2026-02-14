# Story 1.1: Create content abstraction layer

Status: ready-for-dev

## Story

As a developer or AI agent,
I want typed accessor functions that abstract the content source from consuming routes,
so that routes are decoupled from the data layer and a future CMS migration requires changing only one file.

## Acceptance Criteria

1. Given `app/lib/content.server.ts` exists, when a route calls `getHomeContent()`, `getDoulaContent()`, `getYogaContent()`, `getAboutContent()`, `getFemininSacreContent()`, or `getCallToActionContent()`, then each function returns complete typed content from `app/data/*.ts`.
2. All existing routes/components that directly import from `~/data/*` are updated to use accessor functions.
3. Return types are explicitly exported interfaces.
4. Existing behavior remains unchanged and existing tests pass.

## Tasks / Subtasks

- [ ] Create content service module in `app/lib/content.server.ts` (AC: 1, 3)
  - [ ] Export explicit interfaces for each content accessor return value.
  - [ ] Implement `getHomeContent()`, `getDoulaContent()`, `getYogaContent()`, `getAboutContent()`, `getFemininSacreContent()`, `getCallToActionContent()`.
  - [ ] Ensure functions are pure and return deterministic values.
- [ ] Refactor route/component consumers to use service functions (AC: 2, 4)
  - [ ] `app/routes/home.tsx` currently imports `servicesData` from `~/data/home`.
  - [ ] `app/routes/doula.tsx` currently imports `doulaServices`, `doulaTestimonials`, `approachItems` from `~/data/doula`.
  - [ ] `app/routes/about.tsx` currently imports `inspirationItems` from `~/data/about`.
  - [ ] `app/routes/feminin-sacre.tsx` currently imports `eventsData`, `introText` from `~/data/feminin-sacre`.
  - [ ] `app/components/layout/call-to-action/default-call-to-action.tsx` currently imports `defaultCtaContent` from `~/data/call-to-action`.
- [ ] Validate no runtime behavior changes (AC: 4)
  - [ ] Run targeted tests for modified routes/components and impacted lib utilities.
  - [ ] Run typecheck to ensure interface/export correctness.

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
- `app/routes/yoga.tsx` currently has static inline content and no `~/data/*` import. For this story, still provide `getYogaContent()` as an exported accessor contract for forward compatibility.

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

GPT-5.3-Codex

### Debug Log References

- Source import scan completed for `~/data/*` consumers.
- Story target selected from sprint status in order.

### Completion Notes List

- Story is implementation-ready.
- No previous-story intelligence applicable (story 1.1).
- Git-history intelligence not required for first story in epic.

### File List

- \_bmad-output/implementation-artifacts/1-1-create-content-abstraction-layer.md
