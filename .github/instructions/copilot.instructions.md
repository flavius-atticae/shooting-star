---
description: General Copilot behavior and project guidelines for shooting-star
applyTo: "**"
---

# GitHub Copilot Guide for `shooting-star`

This document describes how GitHub Copilot (in VS Code, on GitHub.com, and in any agent/Space) should work in this repository.

> **Important language rule**
>
> - Explanations and discussion with the user happen in **French (fr-CA)**.
> - All **code, comments, documentation, and commit messages** must be written in **English**.

---

## 1. Project context

- This repository contains the full source code for a website dedicated to a yoga instructor specializing in perinatal yoga, motherhood wellness, and birth accompaniment.
- Target audience:
  - Pregnant women and new mothers in Québec
  - Primarily French-speaking (fr-CA)
- Main goals:
  - Present services (prenatal yoga, postnatal yoga, doula services, mama blessings, etc.).
  - Inspire trust, calm, and a sense of safety.
  - Make it easy to get in touch and book sessions.

Whenever you propose content, keep this audience and tone in mind.

---

## 2. Technical stack (must be respected)

Always assume and respect the existing stack:

- **Language**: TypeScript
- **UI**: React
- **Routing**: React Router v7 **with SSR**
- **Bundler**: Vite
- **Styling**:
  - Tailwind CSS v4
  - shadcn/ui for UI components
- **Content**: MDX for certain content sections
- **Deployment**: planned for Fly.io (server-side rendering)
- **Testing**: existing tests under `app/test`
- **Component documentation**: existing Storybook setup

You MUST:

- Stick to this stack.
- Not suggest switching to another framework or router (no Next.js, no CRA, no alternative router).
- Prefer patterns already used in the repository for components, styling, tests and stories.

---

## 3. Git workflow

Do **not** work directly on `main`.

### 3.1 Branches

For each feature or fix, use a dedicated branch created from `main`. Examples:

- `feature/issue-012-prenatal-yoga-page`
- `feature/issue-023-postnatal-yoga-page`
- `fix/issue-034-contact-form-validation`

When you propose branch names, follow this pattern:

```text
feature/issue-<issue-number>-<short-kebab-description>
fix/issue-<issue-number>-<short-kebab-description>
```

### 3.2 Commit messages

Commit messages MUST start with the related issue number in square brackets, for example:

```text
[ #12 ] Add prenatal yoga page
[ #23 ] Implement postnatal yoga section
[ #34 ] Fix contact form validation
```

If you generate commit messages, always follow this format.

---

## 4. Creating issues

When creating GitHub issues, always use the available templates in `.github/ISSUE_TEMPLATE/`:

- **Feature Request** (`feature.yml`) - For new features or enhancements
- **Bug Report** (`bug.yml`) - For bugs or issues

### 4.1 Issue requirements

When creating issues, agents MUST include:

- **Clear title** with prefix: `[Feature]` or `[Bug]`
- **Description** - What needs to be done or what's broken
- **Objective** - Why this issue matters and what problem it solves
- **Acceptance criteria** - Specific, measurable conditions for completion
- **Type label**: `bug` or `enhancement`

**Note**: Priority (P0-P3) and Size (XS-XL) will be added by the project supervisor during issue triage.

### 4.2 Optional context

Agents may also include when relevant:

- **Affected personas** - Who benefits from this (pregnant women, new mothers, etc.)
- **Browser/environment** - For bugs, specify where the issue occurs
- **Quality labels** - `accessibility`, `performance`, `security` if applicable

When you create issues programmatically, focus on clear description and acceptance criteria. The supervisor will prioritize and estimate during review.

---

## 5. Pull requests

- All PRs must target the `main` branch.
- In the PR body, always include:

```text
Related to #<issue-number>
```

- Recommended PR description structure:
  1. **Context** – what problem or feature this PR addresses.
  2. **Main changes** – bullet list of key code / UX changes.
  3. **Accessibility impact** – how this affects WCAG 2.1 AA compliance.
  4. **Performance impact** – bundle size, LCP, loading strategy.
  5. **Compliance impact** – any effect on personal data handling (GDPR, PIPEDA, Québec Law 25).

When you draft PR descriptions, use this structure.

---

## 6. Language, tone and localization

UI content and marketing text should be written in **French (fr-CA)**, but:

- **Code, comments and documentation remain in English.**

Follow these localization rules:

- **Dates**: `DD/MM/YYYY` (e.g. `24/12/2025`)
- **Currency**: Canadian dollars (CAD)
- **Phone numbers (Montréal)**: `(514) XXX-XXXX`

Tone for UI and content:

- Warm, reassuring, and professional.
- Address pregnant women and new mothers in Québec.
- Avoid overly clinical or cold medical language; emphasize support, safety, and empathy.

When generating text for the site itself (headlines, paragraphs, CTAs), write it in French (fr-CA) but keep code and comments in English.

---

## 7. Accessibility requirements (WCAG 2.1 AA)

All UI work should aim for **WCAG 2.1 AA**. In practice, this means:

- **Keyboard navigation**
  - All interactive elements are reachable with the keyboard.
  - Focus order is logical and predictable.
  - Focus state is clearly visible.

- **Contrast**
  - Text and interactive elements must meet WCAG AA contrast ratios.

- **Touch targets**
  - On mobile, interactive elements should have a minimum touch area of **44x44px**.

- **ARIA and semantics**
  - Use semantic HTML whenever possible.
  - Use ARIA attributes (`role`, `aria-label`, `aria-labelledby`, `aria-describedby`, etc.) only when needed and correctly.

- **Reduced motion**
  - Respect the `prefers-reduced-motion` media query.
  - Provide subtle animations by default.
  - Greatly reduce or disable animations for users who prefer reduced motion.

Whenever you propose components or layouts, incorporate these constraints from the start.

---

## 8. Performance guidelines

The site should feel fast, especially on mobile.

Targets (best effort):

- Good LCP (Largest Contentful Paint) on mobile (aim for < 2.5s in realistic conditions).
- Reasonable initial JavaScript bundle size (keep it as small as reasonably possible).

Recommended practices:

- Use **code splitting** and **lazy loading** for non-critical routes and components.
- Avoid heavy client-side logic where a simpler approach would work.
- Optimize images:
  - Use appropriate formats (WebP or other modern formats when possible).
  - Serve sizes adapted to the layout (no over-sized images).

When you design features or pages, mention potential performance impact and suggest optimizations where relevant.

---

## 9. Compliance: GDPR, PIPEDA, Québec Law 25

The website must comply with:

- **GDPR** (European Union)
- **PIPEDA** (Canada)
- **Law 25** (Québec)

Principles to follow:

- Do not collect more personal data than necessary.
- For any form (contact, booking, newsletter, etc.):
  - Clearly explain:
    - What data is collected.
    - For what purpose.
    - How it is stored and protected (at a high level).
- Do not introduce tracking scripts, analytics, or cookies that are not essential without explicit consent and appropriate UI.

When you generate or modify forms, always consider these constraints and mention any compliance implications in explanations or PR descriptions.

---

## 11. Testing and Storybook

There is an existing test setup and Storybook configuration:

- Tests live under `app/test`.
- Storybook is configured for UI components.

When proposing tests:

- Prefer adding or updating tests under `app/test`, following the existing patterns and framework already used in this directory.
- Focus on realistic user flows and edge cases relevant to pregnant women and new mothers in Québec.
- Keep test names and descriptions in English.

When working on UI components:

- Consider adding or updating Storybook stories for any new or significantly changed components.
- Keep stories:
  - Simple and focused on one concern at a time.
  - Accessible (e.g. with proper labels and states).
  - Representative of real content and use cases for the target audience.

---

## 12. npm scripts

Use and suggest only the existing npm scripts:

- Development server:  
  `npm run dev`
- Production build:  
  `npm run build`
- SSR / preview (if configured):  
  `npm run start`
- Type checking:  
  `npm run typecheck`
- Storybook:
  - Development: `npm run storybook`
  - Build: `npm run build-storybook`

Do not invent new scripts unless explicitly requested and aligned with the project’s tooling.

---

## 13. How Copilot should behave

When working in this repository, Copilot (or any AI agent) should:

1. **Respect this file (`COPILOT.md`) at all times.**
2. Use the existing stack: TypeScript, React, React Router v7 (SSR), Vite, Tailwind v4, shadcn/ui, MDX, with tests under `app/test` and Storybook for components.
3. Explain reasoning and high-level concepts in **French**, but:
   - Write **code, comments, commit messages, and documentation in English**.
4. Consider accessibility, performance, and legal compliance as first-class concerns, not afterthoughts.
5. When the user asks to act as a specific role (e.g. _Technical Lead_, _UX Designer_, _QA tester_), adapt the answers accordingly:
   - **Technical Lead**: architecture, patterns, trade-offs, code quality.
   - **UX Designer**: flows, content hierarchy, clarity, accessibility, tone.
   - **QA tester**: test cases, edge cases, manual test plans, regression risks.

If in doubt, ask clarifying questions before making large changes.

---

## 14. Critical thinking and challenging requests

Copilot should not blindly execute requests. Instead, act as a collaborative partner:

1. **Challenge assumptions** - If a request seems suboptimal, propose alternatives before implementing.
2. **Ask clarifying questions** - Before complex changes, ensure full understanding of intent and context.
3. **Identify risks** - Point out potential issues (performance, accessibility, maintainability, security).
4. **Suggest improvements** - If there's a better approach, explain why and offer it as an option.
5. **Validate against project guidelines** - Ensure requests align with WCAG 2.1 AA, GDPR/PIPEDA/Law 25, and other constraints documented in this file.
6. **Be critical of your own output** - Review generated code, issues, and PRs for completeness and quality before presenting them.

### When to push back

- A proposed solution violates accessibility or compliance requirements
- A change would create technical debt without clear justification
- An issue description is incomplete, contradictory, or lacks acceptance criteria
- A quick fix masks a deeper architectural problem
- A request conflicts with the project's established patterns or stack

### Balance

- Be constructive, not obstructive — offer alternatives, not just objections
- Know when to accept a decision after presenting the trade-offs
- Prioritize unblocking work while maintaining quality standards

The goal is collaborative decision-making, not passive task execution.
