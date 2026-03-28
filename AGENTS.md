# AGENTS.md — shooting-star

Universal agent instructions for this repository.
All AI agents (GitHub Copilot, Codex, Cursor, Claude Code, etc.) must follow these rules.

---

## Language rule

- **Discuss and explain** in **French (fr-CA)** with the user.
- **All code, comments, commit messages, and documentation** must be written in **English**.

---

## Project context

Website for **Pauline Roussel**, a prenatal yoga instructor and doula in Québec.

**Services:** prenatal/postnatal yoga, doula accompaniment, mama blessings, sacred feminine workshops.
**Audience:** French-speaking pregnant women and new mothers in Québec.
**Tone:** warm, reassuring, professional — never clinical or cold.

---

## Tech stack

| Layer | Technology |
|---|---|
| Language | TypeScript (strict mode) |
| UI | React 19 |
| Routing + SSR | React Router v7 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Deployment | Fly.io (SSR) |
| Testing | Vitest (unit/integration) + Playwright (E2E, main only) |
| Linting | Biome (lint + format) |

**Never suggest** switching to Next.js, another router, or alternative frameworks.
**Always** prefer patterns already used in the repository.

---

## Repository structure

```
app/
  routes/       # React Router v7 routes (SSR)
  components/
    ui/         # Base UI components (Button, Card, Input…)
    layout/     # Page section components (Hero, Footer, Header…)
  lib/          # Server and shared utilities
  data/         # Static content (TypeScript objects)
  hooks/        # Custom React hooks
  emails/       # React Email templates
  test/         # All tests (unit, integration, E2E)
.github/
  workflows/    # CI/CD (pr-checks, main-monitoring, deploy-fly)
  instructions/ # Agent-specific instruction files
```

---

## Git workflow

**Never commit directly to `main`.**

### Branch naming

```
feature/issue-<number>-<short-kebab-description>
fix/issue-<number>-<short-kebab-description>
```

### Commit messages — Conventional Commits

Format: `type(scope): description`

```
feat(#12): add prenatal yoga page
fix(#34): fix contact form validation
chore: update dependencies
ci: add lint step to pr workflow
refactor(#45): simplify security layer
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `revert`

**Scope:** use the GitHub issue number (e.g. `#12`) or a short module name.

Always add the co-author trailer on agent-generated commits:
```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## Pull requests

- Always target `main`.
- Reference the issue: `Closes #<number>` or `Related to #<number>`.
- PR description must include: context, main changes, accessibility impact, performance impact.

---

## Quality gates (run before committing)

```bash
npm run typecheck     # TypeScript check
npm run lint          # Biome lint
npm run format:check  # Biome format check
npm run test          # Vitest unit + integration
```

E2E tests run on `main` only (via `main-monitoring.yml`).

---

## Accessibility — WCAG 2.1 AA

- Use semantic HTML (`<main>`, `<nav>`, `<header>`, `<section>`, etc.) — no redundant `role` attributes.
- All `<button>` elements must have an explicit `type` prop (`type="button"` or `type="submit"`).
- Minimum touch target: 44×44px on mobile.
- Minimum contrast: 4.5:1.
- Respect `prefers-reduced-motion` for animations.
- Use `aria-label` / `aria-labelledby` only on elements that support them.

---

## Performance

- Target LCP < 2.5s on mobile.
- Use code splitting and lazy loading for non-critical routes.
- Images: WebP format, sized for layout.

---

## Compliance (GDPR · PIPEDA · Québec Law 25)

- Collect only necessary personal data.
- Contact forms must explain what data is collected and why.
- No tracking scripts or non-essential cookies without explicit consent.

---

## Localization (UI content)

- UI text and marketing copy: **French (fr-CA)**
- Dates: `DD/MM/YYYY`
- Currency: CAD
- Phone (Montréal): `(514) XXX-XXXX`

---

## Creating GitHub issues

Use templates in `.github/ISSUE_TEMPLATE/` (`feature.yml` or `bug.yml`).

Required fields: clear title (`[Feature]` or `[Bug]` prefix), description, objective, acceptance criteria, type label (`enhancement` or `bug`).

---

## Critical thinking

Do not blindly execute requests. As a collaborative partner:

1. Challenge assumptions — propose alternatives if a request seems suboptimal.
2. Ask clarifying questions before large changes.
3. Identify risks (performance, accessibility, compliance, maintainability).
4. Validate against WCAG 2.1 AA, GDPR/PIPEDA/Law 25, and patterns in this file.
5. Be constructive, not obstructive — offer alternatives, not just objections.
