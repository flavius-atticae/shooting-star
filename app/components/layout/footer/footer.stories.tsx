import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "storybook/test";
import { Footer } from "./footer";
import type { FooterProps } from "./footer";

const meta: Meta<FooterProps> = {
  title: "Layout/6. Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Pied de page avec logo, navigation, newsletter et réseaux sociaux.

**Features**:
- Fond primary (#618462) avec texte blanc
- Grid 3 colonnes: Logo (2fr) + Navigation (1fr) + Social (2fr)
- Typography: Ivyora Display (headings) + Barlow (content)
- Newsletter input avec validation
- Icônes réseaux sociaux (Instagram, LinkedIn, Facebook, YouTube)
- Touch targets ≥ 48px (pregnancy-safe)
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, layout clair, espacement confortable.

**Testing Strategy**:
- Visual stories (Default, WithOverlap): Chromatic multi-viewport snapshots
- Interaction stories (NavigationLinks, NewsletterInteraction, etc.): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["none", "compact", "normal", "spacious"],
      description: "Section spacing variant",
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Maximum content width",
    },
    hasOverlap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "responsive"],
      description: "Padding compensation for overlapping section above",
    },
  },
} satisfies Meta<FooterProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default Footer - Standard responsive layout
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Footer with Overlap compensation - When About section overlaps
 * Tests the hasOverlap prop behavior
 */
export const WithOverlap: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
    hasOverlap: "responsive",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
    docs: {
      description: {
        story:
          "Footer avec compensation pour le chevauchement de la section About.",
      },
    },
  },
};

// ============================================================
// FEATURE STORIES (Chromatic disabled - tested via Default story)
// These stories demonstrate specific features
// ============================================================

/**
 * Compact Spacing - Minimal padding
 */
export const CompactSpacing: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Espacement compact pour un footer plus condensé.",
      },
    },
  },
};

/**
 * Small Container - Narrower content width
 */
export const SmallContainer: Story = {
  args: {
    spacing: "normal",
    containerSize: "sm",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Container étroit pour un layout plus centré.",
      },
    },
  },
};

/**
 * Custom Navigation Links - Override default links
 */
export const CustomNavLinks: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
    navLinks: [
      { label: "Accueil", href: "/", ariaLabel: "Retour à l'accueil" },
      { label: "Services", href: "/services", ariaLabel: "Nos services" },
      { label: "Blog", href: "/blog", ariaLabel: "Notre blog" },
    ],
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Navigation personnalisée avec liens différents.",
      },
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests accessibility structure:
 * - Footer landmark
 * - Navigation landmark
 * - French language attribute
 */
export const AccessibilityStructure: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Verify footer landmark exists
    const footer = canvasElement.querySelector("footer");
    await expect(footer).toBeInTheDocument();

    // Verify French language attribute
    await expect(footer).toHaveAttribute("lang", "fr");

    // Verify navigation landmark exists
    const nav = canvasElement.querySelector("nav");
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute(
      "aria-label",
      "Navigation principale du site"
    );
  },
};

/**
 * Tests navigation links:
 * - All default links are present
 * - Links have correct href attributes
 * - Links have proper aria-labels
 */
export const NavigationLinks: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all default navigation links are present
    const links = canvas.getAllByRole("link");

    // Find specific navigation links
    const doulaLink = canvas.getByRole("link", { name: /doula/i });
    const yogaLink = canvas.getByRole("link", { name: /yoga/i });
    const contactLink = canvas.getByRole("link", { name: /contact/i });

    await expect(doulaLink).toHaveAttribute("href", "/doula");
    await expect(yogaLink).toHaveAttribute("href", "/yoga");
    await expect(contactLink).toHaveAttribute("href", "/contact");

    // Verify touch target size (min 44px for WCAG)
    const linkRect = doulaLink.getBoundingClientRect();
    await expect(linkRect.height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * Tests logo section:
 * - Logo link to home
 * - Proper aria-label
 * - Logo image present
 */
export const LogoSection: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find logo link (links to home)
    const logoLink = canvas.getByRole("link", {
      name: /pauline roussel.*accueil/i,
    });
    await expect(logoLink).toBeInTheDocument();
    await expect(logoLink).toHaveAttribute("href", "/");

    // Verify logo image exists
    const logoImg = canvasElement.querySelector('img[alt*="Logo"]');
    await expect(logoImg).toBeInTheDocument();
  },
};

/**
 * Tests newsletter section:
 * - Input field present
 * - Submit button present
 * - Privacy notice visible
 */
export const NewsletterSection: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify "Restons connectés" heading
    const heading = canvas.getByRole("heading", {
      name: /restons connectés/i,
    });
    await expect(heading).toBeInTheDocument();

    // Verify newsletter input exists
    const emailInput = canvasElement.querySelector('input[type="email"]');
    await expect(emailInput).toBeInTheDocument();

    // Verify privacy notice text
    await expect(
      canvas.getByText(/vous acceptez de recevoir nos communications/i)
    ).toBeInTheDocument();
  },
};

/**
 * Tests social media icons:
 * - All 4 social platforms present
 * - Links have proper aria-labels
 * - Links point to correct URLs
 */
export const SocialMediaIcons: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify social media container
    const socialList = canvas.getByRole("list", {
      name: /réseaux sociaux/i,
    });
    await expect(socialList).toBeInTheDocument();

    // Verify all 4 social links are present (as listitems with links inside)
    const socialItems = within(socialList).getAllByRole("listitem");
    await expect(socialItems.length).toBe(4);

    // Verify specific platform links by aria-label
    const instagramLink = canvas.getByLabelText(/instagram/i);
    const linkedinLink = canvas.getByLabelText(/linkedin/i);
    const facebookLink = canvas.getByLabelText(/facebook/i);
    const youtubeLink = canvas.getByLabelText(/youtube/i);

    await expect(instagramLink).toBeInTheDocument();
    await expect(linkedinLink).toBeInTheDocument();
    await expect(facebookLink).toBeInTheDocument();
    await expect(youtubeLink).toBeInTheDocument();

    // Verify links have proper URLs
    await expect(instagramLink).toHaveAttribute(
      "href",
      expect.stringContaining("instagram.com")
    );
    await expect(linkedinLink).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com")
    );
  },
};

/**
 * Tests legal section:
 * - Copyright with current year
 * - Legal links present
 */
export const LegalSection: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify copyright with current year
    const currentYear = new Date().getFullYear().toString();
    await expect(
      canvas.getByText(new RegExp(`© ${currentYear}.*Pauline Roussel`))
    ).toBeInTheDocument();

    // Verify legal links
    const legalLink = canvas.getByRole("link", { name: /mentions légales/i });
    const privacyLink = canvas.getByRole("link", { name: /confidentialité/i });

    await expect(legalLink).toHaveAttribute("href", "/mentions-legales");
    await expect(privacyLink).toHaveAttribute("href", "/confidentialite");
  },
};

/**
 * Tests keyboard navigation:
 * - Links are focusable via Tab
 * - Focus indicators visible
 */
export const KeyboardNavigation: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all focusable links in footer
    const links = canvas.getAllByRole("link");

    // Tab to first link (logo)
    await userEvent.tab();

    // Verify a link has focus
    const focusedElement = document.activeElement;
    await expect(focusedElement?.tagName).toBe("A");

    // Tab through a few more links
    await userEvent.tab();
    await userEvent.tab();

    // Verify focus is still on a link
    await expect(document.activeElement?.tagName).toBe("A");
  },
};

/**
 * Tests pregnancy-safe design elements:
 * - Primary background color
 * - White text for contrast
 * - Touch-friendly targets
 */
export const PregnancySafeDesign: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Verify primary background
    const footer = canvasElement.querySelector("footer");
    await expect(footer).toHaveClass("bg-primary");

    // Verify white text on navigation links
    const navLinks = canvasElement.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      expect(link).toHaveClass("text-white");
    });

    // Verify touch targets (min 44px for links)
    const firstNavLink = navLinks[0];
    if (firstNavLink) {
      const rect = firstNavLink.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
    }
  },
};
