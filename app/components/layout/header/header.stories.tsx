import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor, screen } from "@storybook/test";
import { Header } from "./header";
import { withReactRouter } from "../../../../.storybook/react-router-decorator";

const meta: Meta<typeof Header> = {
  title: "Layout/1. Header",
  component: Header,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Header principal avec logo, navigation responsive et bouton contact.

**Features**:
- Logo "Pauline Roussel" (The Seasons font)
- Menu mobile avec overlay
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Responsive**: Menu burger (mobile/tablet), bouton contact masqué sur mobile.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Classes CSS personnalisées",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header state - closed menu
 */
export const Default: Story = {
  args: {},
};

/**
 * Mobile viewport with menu interaction
 */
export const MobileMenuInteraction: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the menu button
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await expect(menuButton).toBeInTheDocument();

    // Check initial ARIA state
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Open menu
    await userEvent.click(menuButton);

    // Wait for ARIA state to update (menu opened)
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    // The button label should change to "Fermer le menu"
    await waitFor(() => {
      expect(canvas.getByLabelText(/Fermer le menu/i)).toBeInTheDocument();
    });
  },
};

/**
 * Test closing menu with Escape key
 */
export const CloseMenuWithEscape: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu first
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await userEvent.click(menuButton);

    // Verify menu is open via ARIA state
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    // Press Escape to close
    await userEvent.keyboard("{Escape}");

    // Verify menu is closed via ARIA state
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  },
};

/**
 * Keyboard navigation test - verifies elements are keyboard accessible
 */
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get interactive elements
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    const logo = canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i);

    // Both elements should be in the document
    await expect(logo).toBeInTheDocument();
    await expect(menuButton).toBeInTheDocument();

    // Verify elements are focusable (no negative tabindex)
    expect(logo.getAttribute("tabindex")).not.toBe("-1");
    expect(menuButton.getAttribute("tabindex")).not.toBe("-1");

    // Verify elements have proper focus styles (focus-visible classes)
    expect(logo.className).toContain("focus-visible:");
    expect(menuButton.className).toContain("focus-visible:");

    // Verify button is a proper button element (keyboard accessible by default)
    expect(menuButton.tagName.toLowerCase()).toBe("button");

    // Verify logo is a proper link element (keyboard accessible by default)
    expect(logo.tagName.toLowerCase()).toBe("a");

    // Test click interaction works (as proxy for keyboard Enter)
    await userEvent.click(menuButton);
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });
  },
};

/**
 * Desktop viewport - navigation visible, menu button hidden
 */
export const DesktopView: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Logo should be visible and centered
    const logo = canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i);
    await expect(logo).toBeVisible();
    await expect(logo).toHaveTextContent("Pauline Roussel");

    // Menu button should have lg:hidden class (will be hidden on large screens)
    // Note: Storybook viewport may not trigger actual CSS hiding,
    // so we verify the responsive class is present
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await expect(menuButton).toHaveClass("lg:hidden");

    // Header banner role should be present
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();
  },
};

/**
 * Verify all navigation items are present and accessible when menu is open
 */
export const NavigationItems: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open mobile menu to reveal navigation
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await userEvent.click(menuButton);

    // Wait for menu to open (ARIA state)
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    // The navigation is inside header but fixed positioned
    // It should be queryable via the canvas since it's a child of header
    // Use getAllByRole to find all navigation elements and filter
    await waitFor(
      () => {
        // Get all nav elements from the header component tree
        const header = canvas.getByRole("banner");
        const navElements = header.querySelectorAll('[role="navigation"]');
        expect(navElements.length).toBeGreaterThan(0);
      },
      { timeout: 2000 }
    );

    // Get the navigation and verify links via querySelector
    const header = canvas.getByRole("banner");
    const nav = header.querySelector('[role="navigation"]');
    expect(nav).not.toBeNull();
    // eslint-disable-next-line xss/no-mixed-html -- Safe: querying existing test DOM, not inserting HTML
    const navCanvas = within(nav!);

    // Verify all navigation links are present (French labels)
    // Use getAllByText since labels appear both in link and description
    const doulaLinks = navCanvas.getAllByText(/doula/i);
    const yogaLinks = navCanvas.getAllByText(/yoga/i);
    const femininLinks = navCanvas.getAllByText(/féminin/i);
    const aboutLinks = navCanvas.getAllByText(/à propos/i);

    // Each nav item has the label visible
    expect(doulaLinks.length).toBeGreaterThan(0);
    expect(yogaLinks.length).toBeGreaterThan(0);
    expect(femininLinks.length).toBeGreaterThan(0);
    expect(aboutLinks.length).toBeGreaterThan(0);
  },
};

/**
 * French language and ARIA labels verification
 */
export const FrenchAccessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check French ARIA labels
    await expect(
      canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i)
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText(/Ouvrir le menu/i)).toBeInTheDocument();

    // Check header role
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
  },
};
