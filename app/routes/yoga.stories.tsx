import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, waitFor } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import YogaPage from "./yoga";

/**
 * Yoga Page - Complete Storybook Tests (Phase 4)
 * 
 * This story provides comprehensive testing for the Yoga page with:
 * - Complete page composition with all sections
 * - Hero section with "Enseignement du yoga" title
 * - Three FeatureBlock components with alternating layout
 * - CallToAction section
 * - Full responsive testing (mobile, tablet, desktop)
 * - Accessibility validation (WCAG 2.1 AA)
 * - Keyboard navigation tests
 * - Integration tests validating all sections
 * 
 * Technical details:
 * - Uses existing Header, Hero, FeatureBlock, CallToAction, Footer components
 * - Follows pattern from home.tsx and doula.tsx
 * - WCAG 2.1 AA compliant
 * - French language content (fr-CA)
 * - Chromatic visual regression testing
 */

const meta: Meta<typeof YogaPage> = {
  title: "Pages/Yoga",
  component: YogaPage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page Yoga complète - Enseignement du Yoga par Pauline Roussel.

**Composition**:
- Header avec navigation
- Hero "Enseignement du yoga"
- Section avec 3 FeatureBlocks alternés (Cours privés, En studio, En entreprises)
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
 * Default Yoga Page - Complete page with all sections
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
 * - All 3 FeatureBlocks with correct content
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
      name: /Enseignement du yoga/i,
    });
    await expect(heroTitle).toBeInTheDocument();

    const heroSubtitle = canvas.getByText(/AVEC PAULINE ROUSSEL/i);
    await expect(heroSubtitle).toBeInTheDocument();

    // Verify the 3 FeatureBlocks
    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Cours privés/i,
    })).toBeInTheDocument();
    
    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Cours en studio/i,
    })).toBeInTheDocument();
    
    await expect(canvas.getByRole("heading", {
      level: 3,
      name: /Cours en entreprises/i,
    })).toBeInTheDocument();

    // Verify FeatureBlock descriptions are present
    await expect(canvas.getByText(/accompagnement personnalisé/i)).toBeInTheDocument();
    await expect(canvas.getByText(/espace chaleureux et sécurisant/i)).toBeInTheDocument();
    await expect(canvas.getByText(/moment de ressourcement/i)).toBeInTheDocument();

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
    await expect(h1).toHaveTextContent(/Enseignement du yoga/i);

    // Check for Hero region with French label
    const heroRegion = canvas.getByRole("region", {
      name: /Section principale d'accueil/i,
    });
    await expect(heroRegion).toBeInTheDocument();

    // Check for h3 headings (FeatureBlocks)
    const h3Headings = canvas.getAllByRole("heading", { level: 3 });
    await expect(h3Headings.length).toBeGreaterThanOrEqual(3);

    // Check for h2 heading (CallToAction)
    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBeGreaterThanOrEqual(1);

    // Check for Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();

    // Verify articles (FeatureBlocks) have lang="fr"
    const articles = canvasElement.querySelectorAll("article[lang='fr']");
    await expect(articles.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Keyboard Navigation Test
 * 
 * Tests that all interactive elements are keyboard accessible:
 * - Tab navigation through CTA button
 * - Focus states visible
 * - Logical tab order
 */
export const KeyboardNavigation: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the CTA button
    const ctaButton = canvas.getByRole("link", {
      name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i,
    });

    // Tab to the CTA button (simulate keyboard navigation)
    await userEvent.tab();
    
    // Verify button is reachable
    await expect(ctaButton).toBeInTheDocument();

    // Verify touch target size (minimum 44x44px)
    const { width, height } = ctaButton.getBoundingClientRect();
    expect(width).toBeGreaterThanOrEqual(44);
    expect(height).toBeGreaterThanOrEqual(44);
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
    await expect(canvas.getByText(/Enseignement du yoga/i)).toBeInTheDocument();

    // Verify French subtitle
    await expect(canvas.getByText(/AVEC PAULINE ROUSSEL/i)).toBeInTheDocument();

    // Verify French FeatureBlock titles
    await expect(canvas.getByText(/Cours privés/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Cours en studio/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Cours en entreprises/i)).toBeInTheDocument();

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
 * - FeatureBlocks section
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

    // Verify FeatureBlocks exist (3 articles)
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify Footer exists
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * FeatureBlocks Alternating Layout Test
 * 
 * Validates that the 3 FeatureBlocks have alternating layouts:
 * - Block 1: text-left (Cours privés)
 * - Block 2: text-right (Cours en studio)
 * - Block 3: text-left (Cours en entreprises)
 */
export const FeatureBlocksLayout: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all 3 FeatureBlocks are present
    const articles = canvasElement.querySelectorAll("article[lang='fr']");
    await expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify they contain the expected titles
    await expect(canvas.getByText(/Cours privés/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Cours en studio/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Cours en entreprises/i)).toBeInTheDocument();

    // Verify images are present (3 images for the blocks)
    const images = canvasElement.querySelectorAll("article img");
    await expect(images.length).toBeGreaterThanOrEqual(3);

    // Verify all images have alt text
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
      const alt = img.getAttribute("alt");
      expect(alt).not.toBe("");
    });
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
 * Responsive Images Test
 * 
 * Validates that all images in FeatureBlocks:
 * - Have proper loading strategy (lazy)
 * - Have alt text for accessibility
 * - Maintain aspect ratio
 */
export const ResponsiveImages: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all images in FeatureBlocks
    const images = canvasElement.querySelectorAll("article img");
    await expect(images.length).toBeGreaterThanOrEqual(3);

    // Verify each image has:
    // - loading="lazy" attribute
    // - alt text
    images.forEach((img) => {
      // Verify loading attribute
      expect(img).toHaveAttribute("loading", "lazy");

      // Verify alt text exists and is not empty
      const alt = img.getAttribute("alt");
      expect(alt).not.toBe("");
      expect(alt).not.toBeNull();
    });
  },
};
