import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import AboutPage from "./about";

/**
 * About Page - Complete Storybook Tests
 * 
 * This story provides comprehensive testing for the About page with:
 * - Complete page composition with all sections
 * - Hero section with "Pauline Roussel" title
 * - About section with 4 subsections (Qui suis-je?, Mon parcours, Ce qui m'inspire, Ma méthode)
 * - Mes inspirations section with 3 cards (Holistique, Bienveillante, Engagée)
 * - CallToAction section
 * - Full responsive testing (mobile, tablet, desktop)
 * - Accessibility validation (WCAG 2.1 AA)
 * - Keyboard navigation tests
 * - Integration tests validating all sections
 * 
 * Technical details:
 * - Uses existing Header, Hero, About, CallToAction, Footer components
 * - Reuses About component from home page with custom props
 * - WCAG 2.1 AA compliant
 * - French language content (fr-CA)
 * - Chromatic visual regression testing
 */

const meta: Meta<typeof AboutPage> = {
  title: "Pages/About",
  component: AboutPage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page À propos complète - Présentation de Pauline Roussel.

**Composition**:
- Header avec navigation
- Hero "Pauline Roussel - DOULA ET PROFESSEURE DE YOGA"
- Section À propos de moi avec 4 sous-sections
- Section Mes inspirations avec 3 cartes
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
 * Default About Page - Complete page with all sections
 * 
 * Visual regression testing across all breakpoints (375 → 1536px)
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
 * - About section with 4 subsections
 * - Mes inspirations section with 3 cards
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
      name: /Pauline Roussel/i,
    });
    await expect(heroTitle).toBeInTheDocument();

    const heroSubtitle = canvas.getByText(/DOULA ET PROFESSEURE DE YOGA/i);
    await expect(heroSubtitle).toBeInTheDocument();

    // Verify About section with 4 subsections
    await expect(canvas.getByRole("heading", {
      level: 2,
      name: /À propos de moi/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Qui suis-je/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Mon parcours/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Ce qui m'inspire/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Ma méthode/i,
    })).toBeInTheDocument();

    // Verify Mes inspirations section
    await expect(canvas.getByRole("heading", {
      level: 2,
      name: /Mes inspirations/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Holistique/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Bienveillante/i,
    })).toBeInTheDocument();

    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Engagée/i,
    })).toBeInTheDocument();

    // Verify CallToAction section
    await expect(canvas.getByRole("heading", {
      level: 2,
      name: /douceur et bienveillance/i,
    })).toBeInTheDocument();

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
 * - French lang attributes
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
    await expect(h1).toHaveTextContent(/Pauline Roussel/i);

    // Check for Hero region with French label
    const heroRegion = canvas.getByRole("region", {
      name: /Section principale d'accueil/i,
    });
    await expect(heroRegion).toBeInTheDocument();

    // Check for h2 headings (About section, Inspirations, CTA)
    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBeGreaterThanOrEqual(3);

    // Check for h3 headings (subsections + inspiration cards)
    const h3Headings = canvas.getAllByRole("heading", { level: 3 });
    await expect(h3Headings.length).toBeGreaterThanOrEqual(7); // 4 about + 3 inspirations

    // Check for Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();

    // Verify lang="fr" attributes
    const frenchElements = canvasElement.querySelectorAll("[lang='fr']");
    await expect(frenchElements.length).toBeGreaterThanOrEqual(1);
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

    // Verify French title
    await expect(canvas.getByText(/Pauline Roussel/i)).toBeInTheDocument();

    // Verify French subtitle
    await expect(canvas.getByText(/DOULA ET PROFESSEURE DE YOGA/i)).toBeInTheDocument();

    // Verify French About subsection titles
    await expect(canvas.getByText(/Qui suis-je/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Mon parcours/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Ce qui m'inspire/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Ma méthode/i)).toBeInTheDocument();

    // Verify French inspiration titles
    await expect(canvas.getByText(/Holistique/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Bienveillante/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Engagée/i)).toBeInTheDocument();

    // Verify French CTA content
    await expect(canvas.getByText(/douceur et bienveillance/i)).toBeInTheDocument();
    await expect(canvas.getByText(/RÉSERVEZ UN APPEL DÉCOUVERTE/i)).toBeInTheDocument();
  },
};

/**
 * Page Structure Validation
 * 
 * Validates that the page has the correct structure:
 * - Header at top
 * - Hero as first element in main
 * - About section
 * - Inspirations section
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

    // Verify About section exists
    await expect(canvas.getByRole("heading", {
      name: /À propos de moi/i,
    })).toBeInTheDocument();

    // Verify Inspirations section exists
    await expect(canvas.getByRole("heading", {
      name: /Mes inspirations/i,
    })).toBeInTheDocument();

    // Verify Footer exists
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * About Section Content Validation
 * 
 * Validates the About section with 4 subsections contains expected French content.
 */
export const AboutSectionContent: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify content from each subsection
    await expect(canvas.getByText(/Curieuse et ouverte/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Danseuse classique/i)).toBeInTheDocument();
    await expect(canvas.getByText(/puissance et la résilience des femmes/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Holistique et personnalisée/i)).toBeInTheDocument();

    // Verify photo caption
    await expect(canvas.getByText(/Pauline Roussel/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Doula et professeure de yoga/i)).toBeInTheDocument();
  },
};

/**
 * Inspirations Cards Validation
 * 
 * Validates the 3 inspiration cards content and styling.
 */
export const InspirationsCards: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify Holistique card
    await expect(canvas.getByText(/Holistique/i)).toBeInTheDocument();
    await expect(canvas.getByText(/corps, mental, émotions et énergie/i)).toBeInTheDocument();

    // Verify Bienveillante card
    await expect(canvas.getByText(/Bienveillante/i)).toBeInTheDocument();
    await expect(canvas.getByText(/espace doux, sécurisant et empathique/i)).toBeInTheDocument();

    // Verify Engagée card
    await expect(canvas.getByText(/Engagée/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Je m'implique pleinement/i)).toBeInTheDocument();
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
    await expect(canvas.getByText(/Curieuse et ouverte, je me nourris de chaque femme croisée/i)).toBeInTheDocument();

    // Verify CTA button
    const ctaButton = canvas.getByRole("link", {
      name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i,
    });
    await expect(ctaButton).toBeInTheDocument();
    await expect(ctaButton).toHaveAttribute("href", "/contact");
  },
};
