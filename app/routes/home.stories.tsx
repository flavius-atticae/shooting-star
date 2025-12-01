import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import Home from "./home";
import { withReactRouter } from "../../.storybook/react-router-decorator";

/**
 * Page-level story for the Homepage
 * Tests the complete page composition and cross-component interactions
 */
const meta: Meta<typeof Home> = {
  title: "Pages/Home",
  component: Home,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page d'accueil complète du site Pauline Roussel.

**Composition**:
- Header avec navigation responsive
- Hero "Épanouir sa féminité"
- CTA Section avec bouton contact
- Services Section (Doula, Yoga, Féminin)
- About Section
- Footer

**Tests de niveau page**:
- Navigation entre sections
- Interactions cross-composants
- Parcours utilisateur complet
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default page view - all sections visible
 */
export const Default: Story = {};

/**
 * Mobile view of the complete homepage
 */
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify header is present
    await expect(canvas.getByRole("banner")).toBeInTheDocument();

    // Verify hero content
    await expect(canvas.getByText(/Épanouir/i)).toBeInTheDocument();

    // Verify CTA section
    await expect(
      canvas.getByText(/Réservez votre accompagnement/i)
    ).toBeInTheDocument();

    // Verify services are present (use getAllByText since text appears in multiple places)
    expect(canvas.getAllByText(/Doula/i).length).toBeGreaterThan(0);
    expect(canvas.getAllByText(/Yoga/i).length).toBeGreaterThan(0);
    expect(canvas.getAllByText(/Féminin/i).length).toBeGreaterThan(0);

    // Verify footer is present
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Test header navigation on mobile - open menu and verify links
 */
export const MobileNavigation: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open mobile menu
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await userEvent.click(menuButton);

    // Wait for menu to open
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    // Verify navigation links are accessible
    const nav = canvas.getByRole("navigation");
    const navCanvas = within(nav);

    // All main navigation items should be present
    expect(navCanvas.getAllByText(/doula/i).length).toBeGreaterThan(0);
    expect(navCanvas.getAllByText(/yoga/i).length).toBeGreaterThan(0);
    expect(navCanvas.getAllByText(/féminin/i).length).toBeGreaterThan(0);
    expect(navCanvas.getAllByText(/à propos/i).length).toBeGreaterThan(0);

    // Close menu with Escape
    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  },
};

/**
 * Test CTA button interaction
 */
export const CTAInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find CTA button
    const ctaButton = canvas.getByRole("link", { name: /Contactez-moi/i });

    // Verify CTA button is present and has correct href
    await expect(ctaButton).toBeInTheDocument();
    await expect(ctaButton).toHaveAttribute("href", "/contact");

    // Verify touch target size (minimum 44x44px for pregnancy-safe)
    const { width, height } = ctaButton.getBoundingClientRect();
    expect(width).toBeGreaterThanOrEqual(44);
    expect(height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * Test services section - verify all three services are displayed
 */
export const ServicesSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the services section by heading
    await expect(canvas.getByText(/Mes services/i)).toBeInTheDocument();

    // Find service cards by their aria-label (more specific than link text)
    const serviceCards = canvasElement.querySelectorAll(
      'article[aria-label^="Service:"]'
    );
    expect(serviceCards.length).toBe(3);

    // Verify each service card exists with correct content
    const expectedServices = ["Doula", "Yoga", "Féminin"];
    expectedServices.forEach((service) => {
      const card = canvasElement.querySelector(
        `article[aria-label="Service: ${service}"]`
      );
      expect(card).not.toBeNull();
    });

    // Verify service links have correct hrefs
    const serviceLinks = canvas.getAllByRole("link", {
      name: /En savoir plus/i,
    });
    // Should have at least 3 "En savoir plus" links (services)
    expect(serviceLinks.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Test page accessibility - verify landmarks and structure
 */
export const PageAccessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify landmark regions are present
    await expect(canvas.getByRole("banner")).toBeInTheDocument(); // Header
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument(); // Footer

    // Verify heading hierarchy (multiple headings expected)
    const headings = canvas.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);

    // Verify hero title is present (main visual heading)
    const heroTitle = canvas.getByText(/Épanouir/i);
    expect(heroTitle).toBeInTheDocument();

    // Verify sections are present by their content
    await expect(
      canvas.getByText(/Réservez votre accompagnement/i)
    ).toBeInTheDocument();

    // Services section heading
    await expect(canvas.getByText(/Mes services/i)).toBeInTheDocument();
  },
};

/**
 * Desktop view with all sections
 */
export const DesktopView: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // On desktop, menu button should be hidden (has lg:hidden class)
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await expect(menuButton).toHaveClass("lg:hidden");

    // Header and Footer should be visible
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();

    // All main content sections should be present
    await expect(canvas.getByText(/Épanouir/i)).toBeInTheDocument();
    await expect(
      canvas.getByText(/Réservez votre accompagnement/i)
    ).toBeInTheDocument();
    await expect(canvas.getByText(/Mes services/i)).toBeInTheDocument();
  },
};

/**
 * French language verification - ensure all UI text is in French
 */
export const FrenchContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French content throughout the page
    // Hero
    await expect(canvas.getByText(/Épanouir/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Avec Pauline Roussel/i)).toBeInTheDocument();

    // CTA
    await expect(
      canvas.getByText(/Réservez votre accompagnement/i)
    ).toBeInTheDocument();
    // Use getAllByText since "Contactez-moi" appears in header and CTA
    expect(canvas.getAllByText(/Contactez-moi/i).length).toBeGreaterThan(0);

    // Services section
    await expect(canvas.getByText(/Mes services/i)).toBeInTheDocument();
    expect(canvas.getAllByText(/En savoir plus/i).length).toBeGreaterThan(0);

    // Header logo
    expect(canvas.getAllByText(/Pauline Roussel/i).length).toBeGreaterThan(0);
  },
};
