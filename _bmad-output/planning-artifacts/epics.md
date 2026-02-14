---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: "complete"
completedAt: "2026-02-14"
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# shooting-star - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for shooting-star, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR1:** A visitor can identify the 3 main service categories from the homepage in ≤ 2 interactions.
- **FR2:** A visitor can view the doula page with 9 services and 3 accompaniment phases.
- **FR3:** A visitor can view prenatal, postnatal, and private yoga offerings on a dedicated page.
- **FR4:** A visitor can view féminin sacré events and workshops with their essential information.
- **FR5:** A visitor can view at least 3 client testimonials visible on service pages.
- **FR6:** A visitor can access all main pages via persistent navigation.
- **FR7:** A visitor can use mobile navigation one-handed with 44×44px minimum touch targets.
- **FR8:** A visitor can reach the contact page from every main page via at least one visible call-to-action.
- **FR9:** A visitor can view the About page including biography, training, and accompaniment philosophy.
- **FR10:** A visitor can submit a form with name, email, and message when required fields are valid.
- **FR11:** A visitor can optionally add availability information in the form.
- **FR12:** A visitor receives a reception confirmation within 5 minutes of valid submission.
- **FR13:** Pauline receives a notification with request details within 5 minutes.
- **FR14:** The system automatically rejects spam submissions detected on the contact form.
- **FR15:** The system limits submissions to 3 attempts per 15-minute window per network origin.
- **FR16:** The system validates and sanitizes 100% of user inputs before processing.
- **FR17:** A visitor can see scroll-triggered entrance animations with duration between 150ms and 400ms on key sections.
- **FR18:** A visitor can see visual feedback on buttons in hover, focus, and active states.
- **FR19:** A visitor can see visual feedback on interactive cards on hover or focus.
- **FR20:** A visitor can experience page transitions between 150ms and 300ms without blocking navigation.
- **FR21:** The system reduces or disables animations when user's reduced-motion preference is active.
- **FR22:** The site exposes a title, description, and social sharing metadata on every public page.
- **FR23:** The site publishes local service structured data for search engines.
- **FR24:** The site publishes indexing and crawl directive files for search engines.
- **FR25:** The site remains indexable without client-side JavaScript execution.
- **FR26:** The system exposes a health signal for operational monitoring.
- **FR27:** Flavius can trigger an automated production deployment with pre-flight checks and documented rollback strategy.
- **FR28:** The system reports server and client errors to a centralized monitoring service in Phase 2.
- **FR29:** An AI agent can access required BMAD artifacts (PRD, architecture, epics/stories) with explicit read rights.
- **FR30:** An AI agent can implement a story following documented code and test conventions.
- **FR31:** The quality process can block integration of changes when mandatory tests fail.
- **FR32:** An AI agent can implement a complete story with at most 2 clarification requests on provided artifacts.
- **FR33:** A new contributor (human or AI) can start the project and explain the architecture in ≤ 60 minutes from documentation.

### NonFunctional Requirements

**Performance:**

- **NFR-P1:** LCP < 2.5s on mobile homepage on simulated 4G network (p75)
- **NFR-P2:** INP < 200ms on main interactions (navigation, CTA, form) at p75
- **NFR-P3:** CLS < 0.1 on all public pages
- **NFR-P4:** TTFB ≤ 800ms for 95% of requests from Québec on public pages
- **NFR-P5:** 100% of content images delivered in optimized format and sized to viewport
- **NFR-P6:** 100% of non-critical routes lazy-loaded and initial JS bundle ≤ 250KB gzip (home)

**Security & Compliance:**

- **NFR-S1:** 100% of web connections encrypted with HTTPS in production
- **NFR-S2:** Zero application-level storage of contact messages on the application server
- **NFR-S3:** 100% of user inputs validated and sanitized before processing
- **NFR-S4:** Anti-spam protections maintain abuse rate < 2% of monthly submissions
- **NFR-S5:** Zero non-essential cookies active without explicit consent
- **NFR-S6:** Privacy policy published, versioned, and reviewed at minimum once per year
- **NFR-S7:** Designated personal information officer named with contact details validated every 90 days on the site

**Accessibility:**

- **NFR-A1:** Zero critical WCAG 2.1 AA violations on key pages (home, doula, contact, about)
- **NFR-A2:** 100% of text and interactive components meet AA contrast ratios
- **NFR-A3:** 100% of interactive touch targets are minimum 44×44px on mobile
- **NFR-A4:** 100% of critical flows are keyboard-navigable with visible focus
- **NFR-A5:** 100% of non-essential animations are reduced or disabled with active preference
- **NFR-A6:** `lang="fr-CA"` attribute present on 100% of public pages

**Reliability:**

- **NFR-F1:** Monthly availability ≥ 99.0% on public pages
- **NFR-F2:** On email send failure, alert generated in ≤ 5 minutes and recovery procedure triggered
- **NFR-F3:** Production deployment with perceived interruption ≤ 60 seconds for 95% of releases
- **NFR-F4:** `/health` endpoint responds in < 500ms for 95% of checks and returns an exploitable status

### Additional Requirements

**From Architecture — Animation System (Decision 1):**

- Create 4 reusable animation primitive components: `ScrollReveal`, `PageTransition`, `HoverLift`, `FocusRing`
- Built on `usePregnancySafeAnimation` hook with centralized duration constants in `lib/animation-constants.ts`
- All primitives automatically respect `prefers-reduced-motion` (FR21)
- Install `motion` package (motion.dev) as new dependency
- Place primitives under `app/components/ui/` with corresponding tests in `app/test/components/ui/`

**From Architecture — SEO Technical Foundations (Decision 2):**

- Each data file exports an `seo` object: `{ title, description, ogImage?, keywords? }`
- `lib/seo.ts` exports typed builders: `buildPageMeta()`, `buildLocalBusinessJsonLd()`, `buildServiceJsonLd()`
- `/sitemap.xml` route generates XML from route config
- `/robots.txt` route serves robots directives

**From Architecture — Monitoring & Email Reliability (Decision 3):**

- `@sentry/node` on server only (no client-side SDK, 0KB client impact)
- Initialize in server entry point, capture loader/action errors
- Email retry with exponential backoff (max 2 retries, 1s → 3s)
- On definitive failure: `Sentry.captureException` with full context
- Source maps uploaded during CI build

**From Architecture — Test Organization (Decision 4):**

- Mirror directory structure matching source code paths
- `test/components/` → Unit tests, `test/lib/` → Utility tests, `test/integration/` → Route tests, `test/e2e/` → Playwright
- Stories colocated with routes (Chromatic for visual regression)

**From Architecture — Content Abstraction Layer (Decision 5):**

- Create `lib/content.server.ts` with typed accessor functions
- Functions: `getHomeContent()`, `getDoulaContent()`, `getYogaContent()`, `getAboutContent()`, `getFemininSacreContent()`, `getCallToActionContent()`
- Routes call accessor functions instead of direct data imports
- Enables future CMS migration (Phase 3) without route changes

**From Architecture — Known Anomalies to Fix:**

- `Hero.tsx` → rename to `hero.tsx` (kebab-case convention)
- `rate-limiter.ts` → rename to `rate-limiter.server.ts` (server-only convention)

**From UX — Emotional Design Requirements:**

- Testimonials must appear early in the funnel (not after 9 service cards on Doula page)
- Progressive disclosure for 9 doula services: overview first, details on demand
- CTA language must be invitational ("Parlons-nous"), never transactional ("Réservez")
- Error messages must be warm and pregnancy-safe, not technical (e.g., no "Error 429")
- Confirmation message must be reassuring with emotional warmth ("Pauline te répondra sous 48h 💛")

**From UX — Service Clarity Requirements:**

- Clear distinction between Doula services (birth accompaniment) and Yoga (physical practice)
- Yoga overlapping in Doula à-la-carte services must not create confusion for post-partum users
- Each page answers ONE question at a glance: Home = "Who is Pauline?", Doula = "How does she support me?", Yoga = "What are her classes?"

**From UX — Mobile One-Handed Requirements:**

- Every interaction mentally tested against "can I do this with my thumb, baby in other arm, while exhausted?"
- Reduce information density on Doula page (currently 9 equal cards = too much scrolling on 375px)
- CTA contact visible or accessible at all times (recurring CTA at emotional checkpoints, not intrusive sticky)

**From UX — Visual Design Requirements:**

- Spacing: generous whitespace, "when in doubt, more space" — default `spacious` preset
- Moontime font used sparingly (max 3-4 words per occurrence, never in navigation/labels/paragraphs)
- Ivyora Display Light (300) for large headlines; reserve Medium/Bold for sizes ≤ 24px
- Line height: body text 1.6-1.75, headings 1.2-1.3
- Consider `<link rel="preload">` for Barlow Regular and Ivyora Display Light (critical fonts)

**From UX — Responsive Design Requirements:**

- Mobile (< 640px): 1 column, 16-24px lateral margins, one content per screen
- Tablet (640-1023px): 2 columns, 24px gutters, 32px margins
- Desktop (≥ 1024px): 3-4 columns, 32px gutters, 48-64px margins
- Wide (≥ 1280px): max-width 1200px centered
- Section spacing: 48px mobile (2xl), 64px desktop (3xl), 96px between major blocks (4xl)

**From UX — Component Evolution Requirements:**

- `TestimonialCard` needs a "featured" variant (larger, Ivyora Display quote, positionable in early sections)
- Document CTA micro-copy guidelines in Storybook
- Integrate pregnancy-safe error/success form feedback messages as design system tokens
- Audit spacing usage — favor `spacious` default for breathing room

### FR Coverage Map

FR1: Epic 2 - Identify 3 main service categories from homepage
FR2: Epic 2 - View doula page with 9 services and 3 phases
FR3: Epic 2 - View yoga offerings on dedicated page
FR4: Epic 2 - View féminin sacré events and workshops
FR5: Epic 2 - View at least 3 client testimonials on service pages
FR6: Epic 2 - Access all main pages via persistent navigation
FR7: Epic 2 - Mobile navigation one-handed with 44×44px touch targets
FR8: Epic 2 - Reach contact page from every main page via visible CTA
FR9: Epic 2 - View About page with biography, training, philosophy
FR10: Epic 3 - Submit contact form with name, email, message
FR11: Epic 3 - Optionally add availability in form
FR12: Epic 3 - Receive confirmation within 5 minutes
FR13: Epic 3 - Pauline receives notification with details within 5 minutes
FR14: Epic 3 - System rejects spam submissions
FR15: Epic 3 - System limits to 3 attempts per 15-minute window
FR16: Epic 3 - System validates and sanitizes 100% of inputs
FR17: Epic 4 - Scroll-triggered entrance animations (150-400ms)
FR18: Epic 4 - Visual feedback on buttons (hover, focus, active)
FR19: Epic 4 - Visual feedback on interactive cards (hover, focus)
FR20: Epic 4 - Page transitions (150-300ms) without blocking navigation
FR21: Epic 4 - Reduce/disable animations with reduced-motion preference
FR22: Epic 5 - Title, description, social metadata on every public page
FR23: Epic 5 - Local service structured data for search engines
FR24: Epic 5 - Indexing and crawl directive files
FR25: Epic 5 - Site indexable without client-side JavaScript
FR26: Epic 6 - Health signal for operational monitoring
FR27: Epic 6 - Automated production deployment with rollback
FR28: Epic 6 - Server/client errors reported to monitoring service
FR29: Epic 1 - AI agent can access BMAD artifacts
FR30: Epic 1 - AI agent implements story following conventions
FR31: Epic 7 - Quality process blocks integration on test failure
FR32: Epic 7 - AI agent implements story with ≤ 2 clarification requests
FR33: Epic 1 - New contributor starts project in ≤ 60 minutes

## Epic List

### Epic 1: Content Foundation and Code Conventions

Establish a typed content abstraction layer, normalize file naming conventions, and ensure the codebase is ready for future evolution. Developers and AI agents can work without ambiguity.
**FRs covered:** FR29, FR30, FR33
**Additional:** Architecture Decision 5 (content.server.ts), Decision 4 (test mirror structure), anomaly fixes (Hero.tsx → hero.tsx, rate-limiter.ts → rate-limiter.server.ts)

### Epic 2: Service Presentation and Navigation

A visitor understands in ≤ 30 seconds who Pauline is and what she offers. She can navigate between services, clearly distinguish Doula from Yoga, and explore each offering without confusion — including from a mobile phone with one hand.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9
**Additional:** UX — Doula vs Yoga distinction, progressive disclosure for 9 services, reduced density on /doula, one-handed mobile navigation, generous spacing, TestimonialCard "featured" variant

### Epic 3: Reliable and Secure Contact

A visitor can contact Pauline via a minimal form (Instagram DM-style), receive a warm confirmation, and Pauline reliably receives all inquiries. The form is protected against spam.
**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15, FR16
**Additional:** UX — invitational micro-copy, pregnancy-safe error messages, reassuring confirmation. Architecture — progressive enhancement (works without JS)

### Epic 4: Pregnancy-Safe Visual Effects and Animations (Issue #186)

The site engages visually with subtle scroll animations, micro-interactions on buttons and cards, and smooth page transitions — while strictly respecting reduced-motion preferences.
**FRs covered:** FR17, FR18, FR19, FR20, FR21
**Additional:** Architecture Decision 1 — 4 primitives (ScrollReveal, PageTransition, HoverLift, FocusRing), usePregnancySafeAnimation hook, animation-constants.ts, `motion` dependency

### Epic 5: SEO and Local Discoverability

Pauline appears in search results for "doula Rive-Sud", "doula Montréal" and related queries. Every page has optimized metadata and the site is properly indexable.
**FRs covered:** FR22, FR23, FR24, FR25
**Additional:** Architecture Decision 2 — lib/seo.ts, colocated SEO data, sitemap.xml, robots.txt, JSON-LD LocalBusiness + Service

### Epic 6: Monitoring, Reliability and Operations

The technical team is alerted on issues (server errors, email failures) and can deploy with confidence. No contact request is silently lost.
**FRs covered:** FR26, FR27, FR28
**Additional:** Architecture Decision 3 — Sentry server-only, email retry with backoff, CI source maps, alerts ≤ 5min

### Epic 7: Quality, Testing and Development Workflow

The build breaks if something regresses. An AI agent can implement a complete story with ≤ 2 clarification requests. The BMAD workflow is the source of truth.
**FRs covered:** FR31, FR32
**Additional:** Architecture Decision 4 — test conventions, CI/CD pipeline, Chromatic visual regression

## Epic 1: Content Foundation and Code Conventions

Establish a typed content abstraction layer, normalize file naming conventions, and ensure the codebase is ready for future evolution. Developers and AI agents can work without ambiguity.

### Story 1.1: Create content abstraction layer

As a developer or AI agent,
I want typed accessor functions that abstract the content source from consuming routes,
So that routes are decoupled from the data layer and a future CMS migration (Phase 3) requires changing only one file.

**Acceptance Criteria:**

**Given** the file `lib/content.server.ts` exists
**When** a route calls `getHomeContent()`, `getDoulaContent()`, `getYogaContent()`, `getAboutContent()`, `getFemininSacreContent()`, or `getCallToActionContent()`
**Then** each function returns the complete typed content from the corresponding `app/data/*.ts` file
**And** all existing routes are updated to use accessor functions instead of direct data imports
**And** the return types are explicitly exported interfaces
**And** existing tests pass without modification (behavior unchanged)

### Story 1.2: Normalize file naming conventions

As a developer or AI agent,
I want all files to follow the project's kebab-case and server-suffix conventions,
So that file naming is deterministic and unambiguous for agents implementing new features.

**Acceptance Criteria:**

**Given** the file `Hero.tsx` exists in the components directory
**When** the file is renamed to `hero.tsx`
**Then** all imports referencing `Hero.tsx` are updated accordingly
**And** the barrel export in `index.ts` is updated
**And** the existing tests and stories still pass

**Given** the file `rate-limiter.ts` exists in `app/lib/`
**When** the file is renamed to `rate-limiter.server.ts`
**Then** all imports referencing `rate-limiter.ts` are updated
**And** the module remains excluded from the client bundle
**And** the existing tests still pass

### Story 1.3: Establish test conventions documentation

As a new contributor (human or AI),
I want clear test organization conventions with mirror directory structure,
So that given any source file path, the corresponding test file path is deterministic and I can start contributing in ≤ 60 minutes.

**Acceptance Criteria:**

**Given** a new source file is created at `app/components/ui/scroll-reveal.tsx`
**When** a developer or agent needs to write a test
**Then** the test is placed at `app/test/components/ui/scroll-reveal.test.tsx` following the documented mirror structure
**And** the test conventions document at `app/test/patterns/test-conventions.md` is updated with the complete mapping rules from Architecture Decision 4
**And** the naming convention (kebab-case + `.test.ts(x)`) is documented with examples

## Epic 2: Service Presentation and Navigation

A visitor understands in ≤ 30 seconds who Pauline is and what she offers. She can navigate between services, clearly distinguish Doula from Yoga, and explore each offering without confusion — including from a mobile phone with one hand.

### Story 2.1: Featured testimonial variant and early-funnel placement

As a pregnant visitor (Camille),
I want to see a client testimonial prominently in the first sections of the Doula page and homepage,
So that I feel trust and confidence before reading service details, and can project myself through another mother's experience.

**Acceptance Criteria:**

**Given** a visitor arrives on the Doula page
**When** the page renders
**Then** at least one featured testimonial is visible within the first two sections (before the à-la-carte services list)
**And** the featured testimonial uses a distinct visual variant (larger quote, Ivyora Display font, warm background)
**And** the testimonial is positioned after the approach section but before the services grid

**Given** a visitor is on the homepage
**When** the page renders
**Then** at least one testimonial or trust-building quote is visible within the first scroll on mobile (375px viewport)
**And** the content does not require more than one screen-height of scrolling to reach

### Story 2.2: Progressive disclosure for doula services

As a visitor browsing the Doula page on mobile,
I want to see an overview of the 9 doula services with the option to expand details on demand,
So that I'm not overwhelmed by 9 equal cards on a 375px screen and can focus on what's relevant to me.

**Acceptance Criteria:**

**Given** a visitor loads the Doula page on a 375px mobile viewport
**When** the services section renders
**Then** each service card shows a title and brief summary (1-2 lines)
**And** each card provides an expandable mechanism (accordion, "en savoir plus", or similar) to reveal the full description
**And** the total scroll length of the services section is reduced compared to the current full-card layout
**And** cards are accessible via keyboard (Enter/Space to expand, Escape to collapse)
**And** expanded state is announced by screen readers (aria-expanded)
**And** touch targets remain ≥ 44×44px

### Story 2.3: Doula vs Yoga service clarity

As a postpartum visitor (Isabelle),
I want to clearly understand whether doula services or yoga classes are right for me,
So that I don't confuse birth accompaniment with physical yoga practice and can find the right service quickly, even when tired.

**Acceptance Criteria:**

**Given** a visitor views the Doula page à-la-carte services
**When** services that overlap with Yoga (prenatal yoga, postnatal yoga) are displayed
**Then** each overlapping service card includes a visual cue or brief label indicating it is part of the doula accompaniment package (not the standalone yoga class)
**And** the Doula page intro text clarifies that doula accompaniment is about birth support (prenatal → birth → postnatal)

**Given** a visitor views the Yoga page
**When** the yoga offerings are shown
**Then** each yoga format (private, studio, corporate) stands independently without reference to doula à-la-carte services
**And** the page answers "What are her classes?" at a glance (per UX principle #3)

### Story 2.4: Mobile one-handed navigation optimization

As a visitor navigating with one hand on mobile (baby in other arm),
I want the navigation, CTAs, and page layout to be comfortable for thumb-only use,
So that I can browse the site without frustration despite physical constraints.

**Acceptance Criteria:**

**Given** a visitor uses the site on a 375px viewport
**When** they interact with the navigation menu
**Then** all interactive elements have touch targets ≥ 44×44px
**And** the mobile menu is reachable with a thumb from the bottom or top of the screen (standard mobile hamburger position)

**Given** a visitor scrolls through any service page
**When** they reach an emotional checkpoint (after hero, after services section, before footer)
**Then** a contact CTA is visible and tappable at each of these points
**And** the CTA uses invitational language ("Parlons-nous", "Écris-moi") — never transactional ("Réservez", "Achetez")

**Given** a visitor uses the persistent navigation
**When** they access the menu
**Then** all 5 navigation items are accessible (Doula, Yoga, Féminin Sacré, À propos, Contact)
**And** the navigation is usable with one thumb on standard mobile devices

### Story 2.5: About page with biography, training, and philosophy

As a visitor (Camille) considering Pauline as her doula,
I want to read Pauline's biography, training credentials, and accompaniment philosophy on a dedicated page,
So that I can verify her qualifications and feel confident in her expertise.

**Acceptance Criteria:**

**Given** a visitor navigates to the About page
**When** the page renders
**Then** the page displays Pauline's biography, training/certifications, and accompaniment philosophy
**And** the content is structured with clear heading hierarchy (H1 → H2 → H3)
**And** the page includes an inspiration/methodology section
**And** a contact CTA is visible at the bottom of the page
**And** the page supports the emotional goal of building trust (warm tone, personal content)

## Epic 3: Reliable and Secure Contact

A visitor can contact Pauline via a minimal form (Instagram DM-style), receive a warm confirmation, and Pauline reliably receives all inquiries. The form is protected against spam.

### Story 3.1: Pregnancy-safe form feedback and error messages

As a tired visitor (Isabelle) filling out the contact form,
I want warm, reassuring feedback when something goes wrong or succeeds,
So that I feel supported rather than punished by error messages, and I know my message reached Pauline.

**Acceptance Criteria:**

**Given** a visitor submits the contact form with an invalid email
**When** the validation error is displayed
**Then** the error message is in French (fr-CA) with a warm tone (e.g., "Hmm, vérifie ton courriel — je veux m'assurer de pouvoir te répondre 😊")
**And** the error message does not use technical language (no "Error 400", no "Invalid input")
**And** the error field is visually highlighted without aggressive red (use accent color or warm tones)

**Given** a visitor is rate-limited (3 attempts per 15 minutes)
**When** the rate limit message is displayed
**Then** the message is reassuring (e.g., "Tu as déjà envoyé un message récemment. Pauline va te répondre bientôt. 💛")
**And** the message does not use technical language (no "Error 429", no "Rate limited")

**Given** a visitor successfully submits the form
**When** the success confirmation is displayed
**Then** the message is warm and personal (e.g., "Merci ! Pauline te répondra sous 48h. 💛")
**And** the confirmation appears inline (no page redirect) so the visitor stays in the reassuring site ambiance
**And** the confirmation is announced by screen readers

### Story 3.2: Contact form accessibility and progressive enhancement audit

As a visitor with accessibility needs,
I want the contact form to be fully keyboard-navigable, screen-reader friendly, and functional without JavaScript,
So that I can contact Pauline regardless of my abilities or browser configuration.

**Acceptance Criteria:**

**Given** a visitor navigates the contact form with keyboard only
**When** they tab through all form fields (name, email, message, availability, submit)
**Then** focus order is logical and predictable
**And** focus indicators are clearly visible
**And** all interactive elements have touch targets ≥ 44×44px

**Given** a visitor uses a screen reader
**When** they interact with the contact form
**Then** all fields have associated labels (via `<label>` or `aria-labelledby`)
**And** required fields are indicated via `aria-required="true"`
**And** error messages are associated to fields via `aria-describedby`
**And** form submission status (success/error) is announced via `aria-live` region

**Given** JavaScript is disabled in the browser
**When** a visitor submits the contact form
**Then** the form submits via the server action (progressive enhancement)
**And** validation and feedback still function correctly

### Story 3.3: Email delivery reliability validation

As Pauline (site owner),
I want to be confident that every contact request is delivered to my inbox and the visitor receives a confirmation,
So that I never miss a potential client and visitors know their message was received.

**Acceptance Criteria:**

**Given** a visitor submits a valid contact form
**When** the server processes the submission
**Then** a confirmation email is sent to the visitor within 5 minutes (FR12)
**And** a notification email with full request details is sent to Pauline within 5 minutes (FR13)
**And** both emails are sent in parallel via `Promise.allSettled`

**Given** the Resend API returns a transient error
**When** an email fails to send
**Then** the system does not expose the error to the visitor (fake success for UX)
**And** the failure is logged with full context (IP, timestamp, form data summary)

**Given** the contact form receives a spam submission
**When** the honeypot detects a bot (hidden field filled or timestamp too fast)
**Then** the system returns a fake success response (silent rejection)
**And** no email is sent
**And** the rejection is logged

**Given** a network origin exceeds 3 submissions in 15 minutes
**When** the rate limiter activates
**Then** the system returns a warm rate-limit message (FR15)
**And** no email is sent for the blocked submission
**And** previously sent emails remain unaffected

## Epic 4: Pregnancy-Safe Visual Effects and Animations (Issue #186)

The site engages visually with subtle scroll animations, micro-interactions on buttons and cards, and smooth page transitions — while strictly respecting reduced-motion preferences.

### Story 4.1: Animation infrastructure (constants and hook)

As a developer or AI agent,
I want centralized animation duration constants and a `usePregnancySafeAnimation` hook,
So that all animation primitives share consistent timing, easing, and reduced-motion behavior from a single source of truth.

**Acceptance Criteria:**

**Given** the file `lib/animation-constants.ts` is created
**When** a developer imports animation values
**Then** constants include scroll reveal duration range (150-400ms), page transition range (150-300ms), hover duration, and easing curves
**And** all constants are typed and exported as `UPPER_SNAKE_CASE`

**Given** the hook `hooks/use-pregnancy-safe-animation.ts` exists
**When** a component calls `usePregnancySafeAnimation()`
**Then** the hook returns the user's `prefers-reduced-motion` preference
**And** it provides animation configuration objects that automatically adapt (full animations vs. reduced/disabled)
**And** the hook is tested with both `prefers-reduced-motion: reduce` and `prefers-reduced-motion: no-preference`

**Given** the `motion` package needs to be installed
**When** `npm install motion` is run
**Then** the dependency is added to `package.json`
**And** no security vulnerabilities are introduced (trivy check)

### Story 4.2: ScrollReveal animation primitive

As a visitor scrolling through service pages,
I want content sections to gently fade/slide into view as I scroll,
So that the page feels alive and engaging without overwhelming me.

**Acceptance Criteria:**

**Given** a `ScrollReveal` component is created at `app/components/ui/scroll-reveal.tsx`
**When** a section wrapped in `<ScrollReveal>` enters the viewport
**Then** the section animates in with a fade/slide effect
**And** the animation duration is between 150ms and 400ms (FR17)
**And** the animation uses Intersection Observer for scroll detection

**Given** the user has `prefers-reduced-motion: reduce` active
**When** a `ScrollReveal` section enters the viewport
**Then** the animation is reduced to a simple opacity fade or disabled entirely (FR21)
**And** no translate/slide motion occurs

**Given** the component is rendered
**When** it is inspected for accessibility
**Then** the component does not interfere with screen reader content flow
**And** a corresponding test exists at `app/test/components/ui/scroll-reveal.test.tsx`
**And** a Storybook story demonstrates both normal and reduced-motion states

### Story 4.3: HoverLift and FocusRing interaction primitives

As a visitor hovering over or focusing on interactive cards and buttons,
I want subtle visual feedback on hover, focus, and active states,
So that I know elements are interactive and feel a sense of responsiveness.

**Acceptance Criteria:**

**Given** a `HoverLift` component is created at `app/components/ui/hover-lift.tsx`
**When** a visitor hovers over or focuses on a wrapped card
**Then** the card shows a subtle lift/scale micro-interaction (FR19)
**And** the effect is smooth and within pregnancy-safe parameters

**Given** a `FocusRing` component is created at `app/components/ui/focus-ring.tsx`
**When** a visitor focuses on a button or interactive element via keyboard
**Then** an enhanced focus ring animation is visible (FR18)
**And** the focus ring meets WCAG 2.1 AA visibility requirements

**Given** the user has `prefers-reduced-motion: reduce` active
**When** hover or focus interactions occur
**Then** the visual feedback is simplified to color/opacity changes only (no motion)

**Given** the components are tested
**Then** tests exist at `app/test/components/ui/hover-lift.test.tsx` and `app/test/components/ui/focus-ring.test.tsx`
**And** Storybook stories demonstrate hover, focus, and active states for both motion preferences

### Story 4.4: PageTransition animation primitive

As a visitor navigating between pages,
I want smooth transitions between routes,
So that the navigation feels fluid and connected rather than jarring.

**Acceptance Criteria:**

**Given** a `PageTransition` component is created at `app/components/ui/page-transition.tsx`
**When** a visitor navigates from one route to another
**Then** a transition animation plays with duration between 150ms and 300ms (FR20)
**And** the transition does not block navigation (the new page is interactive immediately after the transition)
**And** the transition works with React Router v7 SSR navigation

**Given** the user has `prefers-reduced-motion: reduce` active
**When** a page transition occurs
**Then** the transition is instant or uses a minimal opacity crossfade (FR21)

**Given** the component is tested
**Then** a test exists at `app/test/components/ui/page-transition.test.tsx`
**And** a Storybook story demonstrates the transition behavior

### Story 4.5: Apply animation primitives to existing routes

As a visitor browsing the site,
I want all service pages, homepage, and content sections to use the animation primitives consistently,
So that the entire site feels polished and cohesive.

**Acceptance Criteria:**

**Given** the animation primitives (ScrollReveal, HoverLift, FocusRing, PageTransition) are implemented
**When** a visitor browses the homepage
**Then** the hero, services cards, about section, and CTA sections use `ScrollReveal` for entrance animations
**And** service cards use `HoverLift` for hover interactions
**And** buttons use `FocusRing` for keyboard focus

**Given** a visitor navigates between any routes
**When** the navigation transition occurs
**Then** `PageTransition` wraps the route content consistently

**Given** the animations are applied
**When** Lighthouse performance is measured on mobile (simulated 4G)
**Then** LCP remains < 2.5s (NFR-P1)
**And** CLS remains < 0.1 (NFR-P3)
**And** animations do not cause layout shifts

## Epic 5: SEO and Local Discoverability

Pauline appears in search results for "doula Rive-Sud", "doula Montréal" and related queries. Every page has optimized metadata and the site is properly indexable.

### Story 5.1: SEO typed builders and colocated data

As a developer or AI agent,
I want typed SEO builder functions and colocated SEO data in each content file,
So that every route has consistent, well-formed meta tags generated from a single source of truth.

**Acceptance Criteria:**

**Given** the file `lib/seo.ts` is created
**When** a developer imports SEO builders
**Then** `buildPageMeta(seoData)` returns a properly typed array for React Router's `meta()` function
**And** it includes `title`, `description`, `og:title`, `og:description`, `og:type`, and `og:image` (if provided)
**And** `buildLocalBusinessJsonLd()` returns a valid JSON-LD script for a LocalBusiness (Pauline's practice)
**And** `buildServiceJsonLd(service)` returns a valid JSON-LD script for a Service schema

**Given** each data file (`home.ts`, `doula.ts`, `yoga.ts`, `about.ts`, `feminin-sacre.ts`) is updated
**When** the file is inspected
**Then** it exports an `seo` object with `{ title, description, ogImage?, keywords? }`
**And** all SEO content is in French (fr-CA)

**Given** all route files are updated
**When** the `meta()` function is called
**Then** it uses `buildPageMeta()` with the corresponding data file's `seo` object
**And** FR22 is satisfied (title, description, social metadata on every public page)

### Story 5.2: Sitemap and robots.txt routes

As a search engine crawler,
I want a valid sitemap.xml and robots.txt,
So that I can discover and index all public pages efficiently.

**Acceptance Criteria:**

**Given** the route `routes/sitemap[.]xml.tsx` is created
**When** a GET request is made to `/sitemap.xml`
**Then** the response is valid XML with `Content-Type: application/xml`
**And** it lists all public routes (/, /accompagnement, /yoga, /feminin-sacre, /a-propos, /contact)
**And** each URL includes `<lastmod>`, `<changefreq>`, and `<priority>` elements
**And** FR24 is satisfied

**Given** the route `routes/robots[.]txt.tsx` is created
**When** a GET request is made to `/robots.txt`
**Then** the response is plain text with `Content-Type: text/plain`
**And** it allows all public pages and references the sitemap URL
**And** it disallows `/health` and any admin-only paths

**Given** the site is rendered with SSR
**When** search engine bots crawl the pages
**Then** all content is indexable without client-side JavaScript execution (FR25)

### Story 5.3: Structured data for local service

As a potential client searching "doula Rive-Sud" or "doula Montréal",
I want Google to understand Pauline's services, location, and contact info,
So that her practice appears in local search results with rich snippets.

**Acceptance Criteria:**

**Given** the homepage renders
**When** the page source is inspected
**Then** a valid JSON-LD `LocalBusiness` script is present with: name, address (Saint-Lambert), geo coordinates, service area (Rive-Sud, Sud-Ouest, Montréal centre), contact info
**And** the structured data passes Google's Rich Results Test

**Given** the Doula page renders
**When** the page source is inspected
**Then** a valid JSON-LD `Service` script is present with: service type (Doula/birth accompaniment), provider (Pauline), area served
**And** FR23 is satisfied

## Epic 6: Monitoring, Reliability and Operations

The technical team is alerted on issues (server errors, email failures) and can deploy with confidence. No contact request is silently lost.

### Story 6.1: Sentry server-side error monitoring

As Flavius (developer),
I want server-side errors captured and reported to Sentry,
So that I'm proactively alerted when something goes wrong in production instead of discovering it through user complaints.

**Acceptance Criteria:**

**Given** the file `lib/sentry.server.ts` is created
**When** the server starts
**Then** Sentry is initialized with the DSN from environment variable `SENTRY_DSN`
**And** initialization happens in the server entry point (not `root.tsx`)
**And** no client-side Sentry SDK is loaded (0KB added to client bundle)

**Given** a loader or action throws an unhandled error
**When** the error reaches the error boundary
**Then** the error is captured by Sentry with full context (route, request URL, timestamp)
**And** Sentry source maps are available for meaningful stack traces

**Given** the CI/CD pipeline runs
**When** a production build is created
**Then** source maps are uploaded to Sentry during the build step
**And** FR28 is satisfied

### Story 6.2: Email retry with exponential backoff

As Pauline (site owner),
I want email sending to automatically retry on transient failures,
So that temporary Resend API issues don't cause me to miss contact requests.

**Acceptance Criteria:**

**Given** `lib/email.server.ts` is updated with retry logic
**When** a Resend API call fails with a transient error (network error, 5xx, rate limit)
**Then** the system retries up to 2 times with exponential backoff (1s, 3s)
**And** the `Promise.allSettled` pattern is preserved for parallel email sends

**Given** all retries are exhausted (definitive failure)
**When** the email cannot be sent
**Then** `Sentry.captureException` is called with full context (recipient, email type, error details)
**And** the visitor still sees a success message (no error exposed to user)
**And** NFR-F2 is satisfied (alert generated in ≤ 5 minutes via Sentry alert rules)

### Story 6.3: Health endpoint and deployment reliability

As the Fly.io platform and operational monitoring,
I want a reliable health endpoint that confirms the application is running,
So that automated health checks can detect failures and trigger restarts.

**Acceptance Criteria:**

**Given** the `/health` endpoint already exists
**When** a GET request is made to `/health`
**Then** the response returns within < 500ms for 95% of checks (NFR-F4)
**And** the response includes an exploitable status (JSON with `status: "ok"`, timestamp)

**Given** a production deployment is triggered
**When** the deployment completes
**Then** perceived interruption is ≤ 60 seconds (NFR-F3)
**And** the rollback strategy is documented in the deployment guide
**And** FR27 is satisfied

## Epic 7: Quality, Testing and Development Workflow

The build breaks if something regresses. An AI agent can implement a complete story with ≤ 2 clarification requests. The BMAD workflow is the source of truth.

### Story 7.1: CI/CD pipeline test enforcement

As Flavius (developer),
I want the CI/CD pipeline to block merging when mandatory tests fail,
So that no regression reaches production silently.

**Acceptance Criteria:**

**Given** a PR is opened against `main`
**When** the GitHub Actions workflow runs
**Then** unit tests (Vitest), integration tests, and type checking must pass before merge is allowed
**And** Chromatic visual regression tests run and flag any visual changes
**And** FR31 is satisfied (quality process blocks integration on test failure)

**Given** a test fails in CI
**When** the developer reviews the PR
**Then** the failing test, file, and line number are clearly reported in the CI output
**And** the PR cannot be merged until the failure is resolved

### Story 7.2: Agent-ready story implementation conventions

As an AI agent implementing a story,
I want unambiguous conventions for code structure, file placement, and testing,
So that I can implement a complete story with ≤ 2 clarification requests on provided artifacts (FR32).

**Acceptance Criteria:**

**Given** the BMAD artifacts (PRD, architecture, epics/stories) exist
**When** an AI agent receives a story to implement
**Then** the architecture document provides deterministic file paths for all new code
**And** the naming conventions (kebab-case, PascalCase exports, cn() usage) are explicit and unambiguous
**And** the test mirror structure allows the agent to place tests without guessing

**Given** an agent implements a story
**When** the implementation is reviewed
**Then** the code follows all 11 implementation patterns from the Architecture document
**And** the code passes all 7 enforcement guidelines
**And** the code avoids all 8 documented anti-patterns
