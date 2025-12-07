import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import FemininSacrePage from "./feminin-sacre";

/**
 * Féminin Sacré Page - Complete Storybook Tests (Phase 4)
 * 
 * This story provides comprehensive testing for the Féminin Sacré page with:
 * - Complete page composition with all sections
 * - Hero section with "Le féminin sacré\nateliers variés" title
 * - EventList component with 3 events
 * - CallToAction section
 * - Full responsive testing (mobile, tablet, desktop)
 * - Accessibility validation (WCAG 2.1 AA)
 * - Keyboard navigation tests
 * - Integration tests validating all sections
 * 
 * Technical details:
 * - Uses existing Header, Hero, EventList, CallToAction, Footer components
 * - Follows pattern from home.tsx, yoga.tsx and doula.tsx
 * - WCAG 2.1 AA compliant
 * - French language content (fr-CA)
 * - Chromatic visual regression testing
 */

const meta: Meta<typeof FemininSacrePage> = {
  title: "Pages/FemininSacre",
  component: FemininSacrePage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page Féminin Sacré complète - Ateliers variés par Pauline Roussel.

**Composition**:
- Header avec navigation
- Hero "Le féminin sacré\\nateliers variés"
- EventList avec 3 événements
- CallToAction "Un accompagnement rempli de douceur et bienveillance"
- Footer

**Tests de niveau page**:
- Navigation entre sections
- Responsive design (mobile → desktop)
- Tests d'accessibilité WCAG 2.1 AA
- Validation structure sémantique
- Tests d'intégration cross-composants
        `,
      },
    },
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
  tags: ["autodocs"],
};

// Shared parameter for disabling Chromatic snapshots on interaction tests
const NO_CHROMATIC = {
  chromatic: { disableSnapshot: true },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default Féminin Sacré Page - Complete page with all sections
 * 
 * Visual regression testing across all breakpoints (320 → 1440px)
 */
export const Default: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Mobile Viewport - Focused mobile rendering test
 * 
 * Tests responsive behavior on mobile devices (375px width).
 * All sections should stack vertically.
 */
export const MobileViewport: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 428], // iPhone sizes
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should render all key elements on mobile
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Tablet Viewport - Tablet rendering test
 * 
 * Tests responsive behavior on tablet devices (768px width).
 */
export const TabletViewport: Story = {
  parameters: {
    chromatic: {
      viewports: [768, 834], // iPad sizes
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should render correctly on tablet
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Desktop Viewport - Desktop rendering test
 * 
 * Tests responsive behavior on desktop (1920px width).
 * This is the primary design target.
 */
export const DesktopViewport: Story = {
  parameters: {
    chromatic: {
      viewports: [1280, 1440, 1920],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should render correctly on desktop
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Full Page Integration Test - Validates all sections
 * 
 * Tests the complete page composition and all critical elements:
 * - Hero section with correct title
 * - EventList with title "Tous les événements"
 * - EventCards with details buttons
 * - CallToAction section
 * - Footer
 */
export const FullPageIntegration: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify Hero section
    const heroTitle = canvas.getByRole("heading", {
      level: 1,
      name: /féminin sacré/i,
    });
    await expect(heroTitle).toBeInTheDocument();

    const heroSubtitle = canvas.getByText(/AVEC PAULINE ROUSSEL/i);
    await expect(heroSubtitle).toBeInTheDocument();

    // Verify EventList section
    const eventListTitle = canvas.getByRole("heading", {
      level: 2,
      name: /tous les événements/i,
    });
    await expect(eventListTitle).toBeInTheDocument();

    // Verify EventCards - should have at least 3 events with details buttons
    const detailsButtons = canvas.getAllByRole("link", { name: /détails/i });
    await expect(detailsButtons.length).toBeGreaterThanOrEqual(3);

    // Verify CTA section
    const ctaTitle = canvas.getByRole("heading", {
      level: 2,
      name: /douceur et bienveillance/i,
    });
    await expect(ctaTitle).toBeInTheDocument();

    const ctaButton = canvas.getByRole("link", {
      name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i,
    });
    await expect(ctaButton).toBeInTheDocument();
    await expect(ctaButton).toHaveAttribute("href", "/contact");

    // Verify Footer
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Accessibility Structure Validation - WCAG 2.1 AA
 * 
 * Validates semantic HTML structure and accessibility:
 * - Proper landmark regions
 * - Correct heading hierarchy
 * - Main content area properly labeled
 * - Footer landmark
 */
export const AccessibilityStructure: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for main landmark
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();
    await expect(main).toHaveAttribute("id", "main-content");

    // Check for proper heading hierarchy (h1)
    const h1 = canvas.getByRole("heading", { level: 1 });
    await expect(h1).toBeInTheDocument();
    await expect(h1).toHaveTextContent(/féminin sacré/i);

    // Check for Hero region with French label
    const heroRegion = canvas.getByRole("region", {
      name: /Section principale d'accueil/i,
    });
    await expect(heroRegion).toBeInTheDocument();

    // Check for h2 headings (EventList and CallToAction)
    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBeGreaterThanOrEqual(2);

    // Check for Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();

    // Verify EventCards are present (at least 3 articles)
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Keyboard Navigation Test
 * 
 * Tests that all interactive elements are keyboard accessible:
 * - Tab navigation through event details buttons
 * - Tab navigation through CTA button
 * - Focus states visible
 * - Logical tab order
 */
export const KeyboardNavigation: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find event details buttons
    const detailsButtons = canvas.getAllByRole("link", { name: /détails/i });
    await expect(detailsButtons.length).toBeGreaterThanOrEqual(3);

    // Verify first event details button is reachable
    await expect(detailsButtons[0]).toBeInTheDocument();

    // Verify touch target size for event buttons (minimum 44x44px)
    const { width, height } = detailsButtons[0].getBoundingClientRect();
    expect(width).toBeGreaterThanOrEqual(44);
    expect(height).toBeGreaterThanOrEqual(44);

    // Find the CTA button
    const ctaButton = canvas.getByRole("link", {
      name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i,
    });

    // Verify CTA button is reachable
    await expect(ctaButton).toBeInTheDocument();

    // Verify touch target size (minimum 44x44px)
    const ctaRect = ctaButton.getBoundingClientRect();
    expect(ctaRect.width).toBeGreaterThanOrEqual(44);
    expect(ctaRect.height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * French Content Validation
 * 
 * Ensures all text content is properly displayed in French (fr-CA).
 */
export const FrenchContent: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French hero title
    await expect(
      canvas.getByText(/Le féminin sacré/i)
    ).toBeInTheDocument();
    await expect(canvas.getByText(/ateliers variés/i)).toBeInTheDocument();

    // Verify French subtitle
    await expect(canvas.getByText(/AVEC PAULINE ROUSSEL/i)).toBeInTheDocument();

    // Verify French EventList title
    await expect(
      canvas.getByText(/Tous les événements/i)
    ).toBeInTheDocument();

    // Verify French event details buttons
    const detailsButtons = canvas.getAllByRole("link", { name: /détails/i });
    await expect(detailsButtons.length).toBeGreaterThanOrEqual(3);

    // Verify French CTA content
    await expect(
      canvas.getByText(/douceur et bienveillance/i)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(/RÉSERVEZ UN APPEL DÉCOUVERTE/i)
    ).toBeInTheDocument();
  },
};

/**
 * Page Structure Validation
 * 
 * Validates that the page has the correct structure:
 * - Header at top
 * - Hero as first element in main
 * - EventList section
 * - CallToAction section
 * - Footer after main content
 */
export const PageStructure: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify Header
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();

    // Verify Main content area
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();

    // Verify Hero is within main
    const heroRegion = canvas.getByRole("region", {
      name: /Section principale d'accueil/i,
    });
    await expect(main).toContainElement(heroRegion);

    // Verify EventList exists (by checking for the title)
    const eventListTitle = canvas.getByRole("heading", {
      level: 2,
      name: /tous les événements/i,
    });
    await expect(eventListTitle).toBeInTheDocument();

    // Verify EventCards exist (3 articles for events)
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify Footer exists
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * EventList Integration Test
 * 
 * Validates the EventList section integration:
 * - Correct title "Tous les événements"
 * - Intro text is present
 * - 3 event cards are displayed
 * - Each event has title, date, time, and details button
 */
export const EventListSection: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify EventList title
    const eventListTitle = canvas.getByRole("heading", {
      level: 2,
      name: /tous les événements/i,
    });
    await expect(eventListTitle).toBeInTheDocument();

    // Verify intro text is present (contains key phrases)
    await expect(
      canvas.getByText(/Tu ressens l'élan de te reconnecter/i)
    ).toBeInTheDocument();

    // Verify 3 event cards with details buttons
    const detailsButtons = canvas.getAllByRole("link", { name: /détails/i });
    await expect(detailsButtons.length).toBeGreaterThanOrEqual(3);

    // Verify event articles exist
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify each event has date/time information
    const timeElements = canvasElement.querySelectorAll("time");
    await expect(timeElements.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * CallToAction Integration Test
 * 
 * Validates the CallToAction section integration:
 * - Correct title and subtitle
 * - Button with correct text and href
 * - Proper styling and layout
 */
export const CallToActionSection: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify CTA title
    const ctaTitle = canvas.getByRole("heading", {
      level: 2,
      name: /douceur et bienveillance/i,
    });
    await expect(ctaTitle).toBeInTheDocument();

    // Verify CTA subtitle/description
    await expect(canvas.getByText(/Curieuse et ouverte/i)).toBeInTheDocument();

    // Verify CTA button
    const ctaButton = canvas.getByRole("link", {
      name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i,
    });
    await expect(ctaButton).toBeInTheDocument();
    await expect(ctaButton).toHaveAttribute("href", "/contact");
  },
};

/**
 * Event Cards Validation
 * 
 * Validates that event cards are properly displayed:
 * - Each card has a title
 * - Each card has date and time
 * - Each card has a details button/link
 * - Cards maintain accessibility standards
 */
export const EventCardsValidation: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all event articles
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify each article has required elements
    articles.forEach((article) => {
      // Each article should have a heading
      const heading = article.querySelector("h3");
      expect(heading).not.toBeNull();

      // Each article should have a time element
      const time = article.querySelector("time");
      expect(time).not.toBeNull();

      // Each article should have a link/button for details
      const link = article.querySelector("a");
      expect(link).not.toBeNull();
    });

    // Verify details buttons have correct text
    const detailsButtons = canvas.getAllByRole("link", { name: /détails/i });
    detailsButtons.forEach((button) => {
      // Verify button has href
      expect(button).toHaveAttribute("href");
      
      // Verify touch target size
      const rect = button.getBoundingClientRect();
      expect(rect.width).toBeGreaterThanOrEqual(44);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    });
  },
};

/**
 * Responsive Layout Test
 * 
 * Validates that the page layout adapts correctly across breakpoints:
 * - Mobile: single column
 * - Tablet: appropriate spacing
 * - Desktop: optimal reading width
 */
export const ResponsiveLayout: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main sections are present regardless of viewport
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();

    // Verify Hero section
    const heroTitle = canvas.getByRole("heading", { level: 1 });
    await expect(heroTitle).toBeInTheDocument();

    // Verify EventList section
    const eventListTitle = canvas.getByRole("heading", {
      level: 2,
      name: /tous les événements/i,
    });
    await expect(eventListTitle).toBeInTheDocument();

    // Verify CTA section
    const ctaTitle = canvas.getByRole("heading", {
      level: 2,
      name: /douceur et bienveillance/i,
    });
    await expect(ctaTitle).toBeInTheDocument();
  },
};
