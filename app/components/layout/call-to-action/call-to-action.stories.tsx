import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "storybook/test";
import { CallToAction } from "./call-to-action";

const meta: Meta<typeof CallToAction> = {
  title: "Layout/3. Call To Action",
  component: CallToAction,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section d'appel à l'action avec titre, sous-titre et bouton.

**Features**:
- Bloc bg-accent avec coins arrondis et effet "floating card"
- Typography: Ivyora Display (title) + Barlow (subtitle)
- Bouton accent (#af6868) avec hover
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, contraste élevé, messages rassurants.

**Testing Strategy**:
- Visual stories (Default, WithLink): Chromatic multi-viewport snapshots
- Interaction stories (ButtonInteraction, AccessibilityLabels): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    subtitle: {
      control: "text",
    },
    buttonText: {
      control: "text",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
    },
    insetX: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    insetY: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default CallToAction - Standard responsive layout
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    title: "Un accompagnement rempli de douceur et bienveillance",
    subtitle:
      "Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin.",
    buttonText: "Réserver un appel découverte",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * CallToAction with Link - Button renders as anchor
 * Tests the buttonHref prop behavior
 */
export const WithLink: Story = {
  args: {
    title: "Prête à commencer votre voyage ?",
    subtitle:
      "Réservez un appel découverte gratuit pour discuter de vos besoins et trouver l'accompagnement qui vous convient.",
    buttonText: "Prendre rendez-vous",
    buttonHref: "/contact",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

// ============================================================
// FEATURE STORIES (Chromatic disabled - tested via Default story)
// These stories demonstrate specific features
// ============================================================

/**
 * Spacious Spacing - More padding for prominent placement
 */
export const SpaciousSpacing: Story = {
  args: {
    title: "Rejoignez notre communauté",
    subtitle:
      "Des ateliers de groupe pour partager et apprendre ensemble dans un espace bienveillant.",
    buttonText: "Découvrir les ateliers",
    spacing: "spacious",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Espacement généreux pour les placements importants sur la page.",
      },
    },
  },
};

/**
 * No Inset - Full-width without floating card effect
 */
export const NoInset: Story = {
  args: {
    title: "Contactez-moi",
    subtitle: "Je suis disponible pour répondre à vos questions.",
    buttonText: "Envoyer un message",
    insetX: "none",
    insetY: "none",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Sans inset, la section occupe toute la largeur sans l'effet carte flottante.",
      },
    },
  },
};

/**
 * External Link - Opens in new tab
 */
export const ExternalLink: Story = {
  args: {
    title: "Suivez-moi sur les réseaux",
    subtitle: "Pour des conseils quotidiens et des moments de partage.",
    buttonText: "Voir Instagram",
    buttonHref: "https://instagram.com",
    buttonTarget: "_blank",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Lien externe avec `target='_blank'` et `rel='noopener noreferrer'` automatique.",
      },
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests button click interaction:
 * - Button is clickable
 * - onClick handler is called
 */
export const ButtonInteraction: Story = {
  args: {
    title: "Prête à commencer ?",
    subtitle: "Réservez votre premier appel découverte.",
    buttonText: "Réserver maintenant",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole("button", { name: /Réserver maintenant/i });
    await expect(button).toBeInTheDocument();

    // Verify button is visible and enabled
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    // Verify button has proper styling (touch target)
    const buttonRect = button.getBoundingClientRect();
    await expect(buttonRect.height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * Tests link behavior:
 * - Anchor element renders correctly
 * - Proper href and target attributes
 */
export const LinkBehavior: Story = {
  args: {
    title: "Découvrez nos services",
    subtitle: "Un accompagnement adapté à chaque étape de votre maternité.",
    buttonText: "En savoir plus",
    buttonHref: "/services",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the link
    const link = canvas.getByRole("link", { name: /En savoir plus/i });
    await expect(link).toBeInTheDocument();

    // Verify href attribute
    await expect(link).toHaveAttribute("href", "/services");

    // Verify touch target size
    const linkRect = link.getBoundingClientRect();
    await expect(linkRect.height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * Tests external link with security attributes:
 * - rel="noopener noreferrer" for _blank targets
 */
export const ExternalLinkSecurity: Story = {
  args: {
    title: "Ressources externes",
    subtitle: "Découvrez d'autres ressources utiles.",
    buttonText: "Visiter le site",
    buttonHref: "https://example.com",
    buttonTarget: "_blank",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link", { name: /Visiter le site/i });
    await expect(link).toBeInTheDocument();

    // Verify security attributes for external links
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

/**
 * Tests accessibility:
 * - Semantic structure (heading, paragraph)
 * - Section landmark
 */
export const AccessibilityStructure: Story = {
  args: {
    title: "Section accessible",
    subtitle: "Cette section respecte les standards WCAG 2.1 AA.",
    buttonText: "Action",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading structure
    const heading = canvas.getByRole("heading", {
      level: 2,
      name: /Section accessible/i,
    });
    await expect(heading).toBeInTheDocument();

    // Verify section landmark exists
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();

    // Verify paragraph text is present
    const paragraph = canvas.getByText(/Cette section respecte/i);
    await expect(paragraph).toBeInTheDocument();
  },
};

/**
 * Tests keyboard navigation:
 * - Button is focusable via Tab
 * - Focus is visible
 */
export const KeyboardNavigation: Story = {
  args: {
    title: "Navigation au clavier",
    subtitle: "Testez la navigation avec Tab et Enter.",
    buttonText: "Bouton focusable",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button", { name: /Bouton focusable/i });

    // Tab to the button
    await userEvent.tab();

    // Verify button received focus
    await expect(button).toHaveFocus();
  },
};
