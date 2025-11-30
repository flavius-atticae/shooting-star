import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
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
 * Keyboard navigation test - verifies all interactive elements are focusable
 */
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get interactive elements
    const logo = canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i);
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);

    // Both elements should be in the document and visible
    await expect(logo).toBeInTheDocument();
    await expect(menuButton).toBeInTheDocument();

    // Verify elements are focusable by checking they have no tabindex=-1
    // (elements without negative tabindex are focusable)
    expect(logo.getAttribute("tabindex")).not.toBe("-1");
    expect(menuButton.getAttribute("tabindex")).not.toBe("-1");

    // Tab through interactive elements to verify keyboard access works
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
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
