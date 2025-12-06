import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "storybook/test";
import { Services } from "./services";
import type { ServiceItem } from "./service-card";

const defaultServices: ServiceItem[] = [
  {
    id: "doula",
    title: "Doula",
    description:
      "Chaque naissance est un passage, un tissage unique entre le corps, le cœur et la vie. En tant que doula, je suis à l'écoute et je vous accompagne avec bienveillance à chaque stade de votre parcours.",
    buttonText: "En savoir plus",
    buttonHref: "/services/doula",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "À travers toutes les facettes du yoga, je vous accompagne dans la découverte de votre équilibre entre corps, émotions et esprit.",
    buttonText: "En savoir plus",
    buttonHref: "/services/yoga",
  },
  {
    id: "feminin",
    title: "Féminin",
    description:
      "Au rythme des saisons, j'offre des ateliers, des événements et des cours spécialisés autour de la féminité.",
    buttonText: "En savoir plus",
    buttonHref: "/services/feminin",
  },
];

const meta: Meta<typeof Services> = {
  title: "Layout/4. Services",
  component: Services,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section des services avec titre et grille de cartes.

**Features**:
- Grid responsive: 1→2→3 colonnes (mobile→tablet→desktop)
- Cartes bg-primary (#618462) avec texte blanc
- Typography: Ivyora Display (headings) + Barlow (content)
- Boutons CTA blancs avec hover
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, coins arrondis, animations douces.

**Testing Strategy**:
- Visual stories (Default, WithInset): Chromatic multi-viewport snapshots
- Interaction stories (CardInteraction, AccessibilityStructure): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    services: {
      control: "object",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "spacious"],
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    insetX: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Horizontal inset for floating effect",
    },
    insetY: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Vertical inset for spacing above/below",
    },
  },
} satisfies Meta<typeof Services>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default Services - Standard responsive layout
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    services: defaultServices,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Services with Inset - Floating card effect
 * Tests the insetX/insetY props behavior
 */
export const WithInset: Story = {
  args: {
    services: defaultServices,
    insetX: "sm",
    insetY: "sm",
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
    services: defaultServices,
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
 * Two Services - Tests 2-column layout
 */
export const TwoServices: Story = {
  args: {
    services: defaultServices.slice(0, 2),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Layout avec deux services pour tester la grille à 2 colonnes.",
      },
    },
  },
};

/**
 * Custom Title - Override default title
 */
export const CustomTitle: Story = {
  args: {
    title: "Ce que je propose",
    services: defaultServices,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Titre personnalisé au lieu du défaut 'Mes services'.",
      },
    },
  },
};

/**
 * Empty State - No services provided
 */
export const EmptyState: Story = {
  args: {
    services: [],
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "État vide quand aucun service n'est fourni.",
      },
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests card link interaction:
 * - Service cards have clickable links
 * - Links have proper href attributes
 */
export const CardInteraction: Story = {
  args: {
    services: defaultServices,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all service card links
    const links = canvas.getAllByRole("link", { name: /En savoir plus/i });
    await expect(links.length).toBe(3);

    // Verify first link has correct href
    await expect(links[0]).toHaveAttribute("href", "/services/doula");

    // Verify touch target size
    const linkRect = links[0].getBoundingClientRect();
    await expect(linkRect.height).toBeGreaterThanOrEqual(44);
  },
};

/**
 * Tests accessibility:
 * - Section landmark with proper heading
 * - Article elements for each card
 * - Semantic structure
 */
export const AccessibilityStructure: Story = {
  args: {
    services: defaultServices,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main heading
    const heading = canvas.getByRole("heading", {
      level: 2,
      name: /Mes services/i,
    });
    await expect(heading).toBeInTheDocument();

    // Verify section landmark exists
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();

    // Verify article elements for each service card
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(3);

    // Verify each card has a heading
    const cardHeadings = canvas.getAllByRole("heading", { level: 3 });
    await expect(cardHeadings.length).toBe(3);
  },
};

/**
 * Tests keyboard navigation:
 * - Links are focusable via Tab
 * - Can navigate through all cards
 */
export const KeyboardNavigation: Story = {
  args: {
    services: defaultServices,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const links = canvas.getAllByRole("link", { name: /En savoir plus/i });

    // Tab to first link
    await userEvent.tab();
    await expect(links[0]).toHaveFocus();

    // Tab to second link
    await userEvent.tab();
    await expect(links[1]).toHaveFocus();

    // Tab to third link
    await userEvent.tab();
    await expect(links[2]).toHaveFocus();
  },
};

/**
 * Tests grid responsiveness structure:
 * - Grid container exists
 * - All cards are rendered
 */
export const GridStructure: Story = {
  args: {
    services: defaultServices,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Verify grid container
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).toBeInTheDocument();

    // Verify all cards are in the grid
    const cards = grid?.querySelectorAll("article");
    await expect(cards?.length).toBe(3);

    // Verify cards have equal height class
    cards?.forEach((card) => {
      expect(card).toHaveClass("h-full");
    });
  },
};
