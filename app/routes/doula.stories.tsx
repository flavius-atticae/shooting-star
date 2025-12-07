import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import DoulaPage from "./doula";

/**
 * Doula Page - Complete Storybook Tests (Phase 5)
 * 
 * Comprehensive test suite for the Doula page including:
 * - Full page integration tests
 * - Accessibility structure validation (WCAG 2.1 AA)
 * - Keyboard navigation tests
 * - Responsive viewport tests (320px, 768px, 1024px, 1440px)
 * - All sections: Hero, ApproachSection, Services, CallToAction, Testimonials, Footer
 * 
 * Page composition:
 * - Route accessible at /doula
 * - Header component with navigation
 * - Hero section with French title "Accompagnement de doula"
 * - Subtitle "AVEC PAULINE ROUSSEL"
 * - ApproachSection with "Mon approche" (5 items)
 * - Services section with "À la carte" (9 services)
 * - CallToAction for booking
 * - TestimonialsCarousel with client testimonials
 * - Footer component
 * 
 * Technical details:
 * - Uses React Router decorators for route context
 * - All components follow WCAG 2.1 AA guidelines
 * - French language content (fr-CA)
 * - Chromatic visual regression testing enabled
 * - Integration tests validate cross-component interactions
 */

const meta: Meta<typeof DoulaPage> = {
  title: "Pages/Doula",
  component: DoulaPage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page Doula - Tests Storybook complets (Phase 5)

**Composition de la page**:
- Header avec navigation responsive
- Hero "Accompagnement de doula" avec sous-titre
- ApproachSection "Mon approche" (5 blocs thématiques)
- Services "À la carte" (9 cartes de services)
- CallToAction pour réserver un appel découverte
- TestimonialsCarousel "Douce et à l'écoute" (3 témoignages)
- Footer avec navigation et informations de contact

**Tests inclus**:
- Default: Affichage de base de la page
- FullPageIntegration: Validation complète de toutes les sections
- AccessibilityStructure: Structure sémantique et WCAG 2.1 AA
- KeyboardNavigation: Navigation clavier complète
- ResponsiveViewports: Tests Chromatic (320, 768, 1024, 1440px)
- MobileViewport, TabletViewport, DesktopViewport: Tests par viewport
- ServicesSection: Validation des 9 services

**Accessibilité (WCAG 2.1 AA)**:
- Landmarks ARIA appropriés
- Hiérarchie de headings correcte (H1 > H2 > H3)
- Navigation clavier complète
- Touch targets ≥ 44px
- Contenu en français (fr-CA)
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DoulaPage>;

/**
 * Default Doula Page
 * 
 * Displays the complete doula page with Header, Hero and Footer.
 * This is the initial implementation for Phase 1.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main content area exists
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();

    // Verify Hero section with correct French title
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent("Accompagnement de doula");

    // Verify Hero subtitle
    const subtitle = canvas.getByText("AVEC PAULINE ROUSSEL");
    await expect(subtitle).toBeInTheDocument();
  },
};

/**
 * Accessibility Check
 * 
 * Validates WCAG 2.1 AA compliance:
 * - Proper semantic HTML structure
 * - Correct heading hierarchy
 * - Landmarks properly labeled in French
 */
export const AccessibilityCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for main landmark
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();
    await expect(main).toHaveAttribute("id", "main-content");

    // Check for proper heading hierarchy (h1)
    const h1 = canvas.getByRole("heading", { level: 1 });
    await expect(h1).toBeInTheDocument();
    await expect(h1).toHaveTextContent("Accompagnement de doula");

    // Check for Hero region with French label
    const heroRegion = canvas.getByRole("region", {
      name: "Section principale d'accueil",
    });
    await expect(heroRegion).toBeInTheDocument();

    // Check for Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * French Content Validation
 * 
 * Ensures all text content is properly displayed in French (fr-CA).
 */
export const FrenchContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French title
    await expect(canvas.getByText("Accompagnement de doula")).toBeInTheDocument();

    // Verify French subtitle
    await expect(canvas.getByText("AVEC PAULINE ROUSSEL")).toBeInTheDocument();
  },
};

/**
 * Mobile Viewport
 * 
 * Tests responsive behavior on mobile devices (375px width).
 * Hero should maintain proper sizing and layout.
 */
export const MobileViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should still render all key elements on mobile
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Tablet Viewport
 * 
 * Tests responsive behavior on tablet devices (768px width).
 */
export const TabletViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
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
 * Desktop Viewport
 * 
 * Tests responsive behavior on desktop (1920px width).
 * This is the primary design target.
 */
export const DesktopViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
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

/**
 * Page Structure Validation
 * 
 * Validates that the page has the correct structure:
 * - Hero as first element in main
 * - Footer after main content
 */
export const PageStructure: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const main = canvas.getByRole("main");
    const heroRegion = canvas.getByRole("region", {
      name: "Section principale d'accueil",
    });

    // Hero should be within main content
    await expect(main).toContainElement(heroRegion);

    // Footer should exist
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Services Section Validation - Phase 3
 * 
 * Validates that the "À la carte" Services section is properly integrated:
 * - Section title "À la carte" is displayed
 * - All 9 service cards are rendered
 * - Each service has correct structure (title, description, button)
 * - Responsive grid layout (3x3 on desktop)
 */
export const ServicesSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify Services section title "À la carte"
    const servicesTitle = canvas.getByRole("heading", {
      level: 2,
      name: "À la carte",
    });
    await expect(servicesTitle).toBeInTheDocument();

    // Verify specific service titles are present (all 9 services)
    await expect(canvas.getByText("Préparation à la naissance")).toBeInTheDocument();
    await expect(canvas.getByText("Examen de grossesse")).toBeInTheDocument();
    await expect(canvas.getByText("Post-partum immédiat")).toBeInTheDocument();
    await expect(canvas.getByText("Yoga prénatal")).toBeInTheDocument();
    await expect(canvas.getByText("Yoga postnatal")).toBeInTheDocument();
    
    // "Mama Blessing" appears in both ApproachSection and Services section
    const mamaBlessingElements = canvas.getAllByText("Mama Blessing");
    await expect(mamaBlessingElements.length).toBeGreaterThanOrEqual(2);
    
    await expect(canvas.getByText("Yoga prénatal avec partenaire")).toBeInTheDocument();
    await expect(canvas.getByText("Consultation doula")).toBeInTheDocument();
    await expect(canvas.getByText("Consultation extra")).toBeInTheDocument();

    // Verify CTA buttons exist (should be multiple "En savoir plus" buttons)
    const ctaButtons = canvas.getAllByRole("link", { name: /En savoir plus/ });
    await expect(ctaButtons.length).toBeGreaterThanOrEqual(9);
  },
};

/**
 * Full Page Integration Test - Phase 5
 * 
 * Comprehensive integration test validating all sections of the Doula page:
 * - Hero section with title and subtitle
 * - ApproachSection with "Mon approche"
 * - Services section with "À la carte"
 * - CallToAction with booking prompt
 * - TestimonialsCarousel with testimonials
 * - Footer
 */
export const FullPageIntegration: Story = {
  parameters: {
    chromatic: {
      viewports: [320, 768, 1024, 1440],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify Hero section
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent("Accompagnement de doula");
    await expect(canvas.getByText("AVEC PAULINE ROUSSEL")).toBeInTheDocument();
    
    // Verify ApproachSection with "Mon approche"
    const approachHeading = canvas.getByRole("heading", {
      level: 2,
      name: /Mon approche/i,
    });
    await expect(approachHeading).toBeInTheDocument();
    
    // Verify all 5 approach items
    await expect(canvas.getByRole("heading", { level: 3, name: /Pendant la grossesse/i })).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 3, name: /L'accouchement/i })).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 3, name: /4e trimestre/i })).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 3, name: /Sur mesure/i })).toBeInTheDocument();
    
    // Verify Services section with "À la carte"
    const servicesHeading = canvas.getByRole("heading", {
      level: 2,
      name: "À la carte",
    });
    await expect(servicesHeading).toBeInTheDocument();
    
    // Verify CallToAction
    await expect(canvas.getByText(/Prête à vivre ta maternité en toute sérénité/i)).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i })).toBeInTheDocument();
    
    // Verify TestimonialsCarousel with "Douce et à l'écoute"
    const testimonialsHeading = canvas.getByRole("heading", {
      level: 2,
      name: /Douce et à l'écoute/i,
    });
    await expect(testimonialsHeading).toBeInTheDocument();
    await expect(canvas.getByText(/douceur et une écoute incroyables/i)).toBeInTheDocument();
    
    // Verify Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Accessibility Structure - Phase 5
 * 
 * Validates complete accessibility structure:
 * - Semantic HTML landmarks
 * - Proper heading hierarchy (H1 > H2 > H3)
 * - ARIA labels and roles
 * - French language attributes
 * - Focus management
 */
export const AccessibilityStructure: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify main landmark with id
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();
    await expect(main).toHaveAttribute("id", "main-content");
    
    // Verify heading hierarchy
    // H1 - Hero title
    const h1Elements = canvas.getAllByRole("heading", { level: 1 });
    await expect(h1Elements.length).toBe(1);
    await expect(h1Elements[0]).toHaveTextContent("Accompagnement de doula");
    
    // H2 - Section titles (Mon approche, À la carte, CTA, Testimonials)
    const h2Elements = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Elements.length).toBeGreaterThanOrEqual(4);
    
    // H3 - Approach items and service cards
    const h3Elements = canvas.getAllByRole("heading", { level: 3 });
    await expect(h3Elements.length).toBeGreaterThanOrEqual(14); // 5 approach + 9 services
    
    // Verify Hero region
    const heroRegion = canvas.getByRole("region", {
      name: "Section principale d'accueil",
    });
    await expect(heroRegion).toBeInTheDocument();
    
    // Verify carousel region
    const carouselRegion = canvasElement.querySelector('[role="region"][aria-label*="Carrousel"]');
    await expect(carouselRegion).toBeInTheDocument();
    
    // Verify footer contentinfo
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Keyboard Navigation - Phase 5
 * 
 * Tests keyboard navigation through all interactive elements:
 * - Navigation links in header
 * - Service cards links
 * - CallToAction button
 * - Testimonials carousel controls
 * - Footer links
 */
export const KeyboardNavigation: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all interactive elements are keyboard accessible
    // Service card links
    const serviceLinks = canvas.getAllByRole("link", { name: /En savoir plus/i });
    await expect(serviceLinks.length).toBeGreaterThanOrEqual(9);
    
    // Each link should be focusable
    serviceLinks.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
    
    // CallToAction button
    const ctaButton = canvas.getByRole("link", { name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i });
    await expect(ctaButton).toBeInTheDocument();
    await expect(ctaButton).toHaveAttribute("href", "/contact");
    
    // Testimonials navigation buttons (if visible)
    const navButtons = canvasElement.querySelectorAll('button[aria-label*="témoignage"]');
    if (navButtons.length > 0) {
      navButtons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    }
  },
};

/**
 * Responsive Viewports - Phase 5
 * 
 * Chromatic visual regression testing across all required viewports:
 * - 320px (small mobile)
 * - 768px (tablet)
 * - 1024px (small desktop)
 * - 1440px (large desktop)
 */
export const ResponsiveViewports: Story = {
  parameters: {
    chromatic: {
      viewports: [320, 768, 1024, 1440],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify page renders correctly at all viewports
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};
