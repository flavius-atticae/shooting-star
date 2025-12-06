import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";
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
- Logo "Pauline Roussel" (Ivyora Display font)
- Menu mobile avec overlay
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Testing Strategy**:
- Visual stories (Default, MobileMenuOpen): Chromatic multi-viewport snapshots
- Interaction stories (MenuInteraction, KeyboardNavigation, AriaLabels): Test Runner only
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
    defaultOpen: {
      control: "boolean",
      description: "État initial du menu mobile (pour tests visuels)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories have NO play() functions - Chromatic captures static state
// ============================================================

/**
 * Default header state across all breakpoints.
 * Visual regression testing for responsive layout.
 */
export const Default: Story = {
  args: {},
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Mobile menu open state.
 * Uses `defaultOpen` prop to render menu open for Chromatic capture.
 * Only tested on mobile/tablet viewports where the hamburger menu is visible.
 */
export const MobileMenuOpen: Story = {
  args: {
    defaultOpen: true,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768],
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests mobile menu interaction flow:
 * - Opening menu via button click
 * - Closing menu with Escape key
 * - Verifying aria-expanded states
 */
export const MenuInteraction: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open mobile menu
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(menuButton);

    // Verify menu opened
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });
    await waitFor(() => {
      expect(canvas.getByLabelText(/Fermer le menu/i)).toBeInTheDocument();
    });

    // Verify navigation menu is visible
    await waitFor(
      () => {
        const navLabel = canvas.getByLabelText(/menu de navigation principal/i);
        expect(navLabel).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify navigation links are present within mobile menu
    await expect(
      canvas.getByRole("link", { name: /Doula/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: /Yoga/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: /Féminin/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: /À propos/i })
    ).toBeInTheDocument();

    // Test close with Escape
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  },
};

/**
 * Tests keyboard accessibility:
 * - Focusable elements
 * - Proper element types (links, buttons)
 * - Tab order
 */
export const KeyboardNavigation: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logo = canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i);
    const menuButton = canvas.getByLabelText(/Ouvrir le menu/i);

    // Verify elements are focusable
    expect(logo.getAttribute("tabindex")).not.toBe("-1");
    expect(menuButton.getAttribute("tabindex")).not.toBe("-1");

    // Verify proper element types for keyboard accessibility
    expect(logo.tagName.toLowerCase()).toBe("a");
    expect(menuButton.tagName.toLowerCase()).toBe("button");

    // Verify desktop navigation exists and is properly structured
    const desktopNav = canvas.getByLabelText(/Navigation principale du site/i);
    await expect(desktopNav).toBeInTheDocument();
    await expect(desktopNav).toHaveClass("lg:flex");
  },
};

/**
 * Tests French ARIA labels and accessibility attributes:
 * - Logo accessible name
 * - Menu button labels
 * - Navigation landmark
 */
export const AriaLabels: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // French ARIA labels verification
    await expect(
      canvas.getByLabelText(/Pauline Roussel - Retour à l'accueil/i)
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText(/Ouvrir le menu/i)).toBeInTheDocument();
    await expect(canvas.getByRole("banner")).toBeInTheDocument();

    // Verify navigation links
    await expect(
      canvas.getByRole("link", { name: "Doula" })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "Yoga" })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "Féminin" })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "À propos" })
    ).toBeInTheDocument();
  },
};
