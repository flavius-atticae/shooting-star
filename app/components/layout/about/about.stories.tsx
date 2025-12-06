import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import { About } from "./about";

const meta: Meta<typeof About> = {
  title: "Layout/5. About",
  component: About,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section À propos avec contenu biographique et méthode d'accompagnement.

**Features**:
- Layout 2/3 + 1/3 (row 1) + 3 colonnes (row 2)
- Typography: Ivyora Display (headings) + Barlow (content)
- Séparateurs verticaux entre colonnes (desktop)
- Background gris (#f5f4f2) pregnancy-safe
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes (#517982), contraste élevé, espacement généreux.

**Testing Strategy**:
- Visual stories (Default, SpaciousSpacing): Chromatic multi-viewport snapshots
- Interaction stories (AccessibilityStructure, SemanticHeadings): Test Runner only
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
    overlapNext: {
      control: "select",
      options: ["none", "sm", "md", "lg", "responsive"],
      description: "Overlap amount to extend over the next section (Footer)",
    },
  },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default About - Standard responsive layout
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Spacious Spacing - More padding for prominent placement
 * Tests the spacing prop behavior
 */
export const SpaciousSpacing: Story = {
  args: {
    spacing: "spacious",
    containerSize: "xl",
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
    docs: {
      description: {
        story:
          "Espacement généreux pour les placements importants sur la page.",
      },
    },
  },
};

/**
 * Overlap Footer - Demonstrates the floating effect over Footer
 * Tests the overlapNext prop with responsive behavior
 */
export const OverlapFooter: Story = {
  args: {
    spacing: "none",
    containerSize: "xl",
    overlapNext: "responsive",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
    docs: {
      description: {
        story:
          "Effet de chevauchement où About flotte au-dessus du Footer (tablet+ uniquement).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Story />
        </div>
        <div className="bg-primary text-white p-8 md:pt-24">
          <p className="text-center opacity-70">
            ↑ Footer area (notice the overlap on tablet+)
          </p>
        </div>
      </div>
    ),
  ],
};

// ============================================================
// FEATURE STORIES (Chromatic disabled - tested via Default story)
// These stories demonstrate specific features
// ============================================================

/**
 * Normal Spacing - Default spacing variant
 */
export const NormalSpacing: Story = {
  args: {
    spacing: "normal",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Espacement normal pour un usage standard.",
      },
    },
  },
};

/**
 * Compact Spacing - Minimal spacing
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
        story: "Espacement compact pour densifier le contenu.",
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
        story: "Container étroit pour un focus accru sur le contenu.",
      },
    },
  },
};

/**
 * Large Container - Standard width
 */
export const LargeContainer: Story = {
  args: {
    spacing: "normal",
    containerSize: "lg",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Container large pour un affichage standard.",
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
 * - Section landmark with proper headings
 * - French language attributes
 * - Semantic structure
 */
export const AccessibilityStructure: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section landmark exists
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();

    // Verify French language attribute
    await expect(section).toHaveAttribute("lang", "fr");

    // Verify main "À propos" heading
    const aboutHeading = canvas.getByRole("heading", {
      level: 2,
      name: /À propos/i,
    });
    await expect(aboutHeading).toBeInTheDocument();

    // Verify "Ma méthode" heading
    const methodHeading = canvas.getByRole("heading", {
      level: 2,
      name: /Ma méthode/i,
    });
    await expect(methodHeading).toBeInTheDocument();
  },
};

/**
 * Tests semantic heading hierarchy:
 * - H2 for main sections (À propos, Ma méthode)
 * - H3 for method items (Écoute, Bienveillance, Adaptation)
 */
export const SemanticHeadings: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify H2 headings (section titles)
    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBe(2);

    // Verify H3 headings (method items)
    const h3Headings = canvas.getAllByRole("heading", { level: 3 });
    await expect(h3Headings.length).toBe(3);

    // Verify method item titles
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Écoute/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Bienveillance/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Adaptation/i })
    ).toBeInTheDocument();
  },
};

/**
 * Tests method section structure:
 * - List container with role="list"
 * - Three list items with role="listitem"
 * - Article elements for each method
 */
export const MethodSectionStructure: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify list container
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();

    // Verify three list items
    const listItems = canvas.getAllByRole("listitem");
    await expect(listItems.length).toBe(3);

    // Verify articles inside list items
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(3);
  },
};

/**
 * Tests image placeholder accessibility:
 * - Figure with role="img"
 * - Proper ARIA labels
 * - Caption text
 */
export const ImagePlaceholderAccessibility: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify figure with role="img"
    const figure = canvasElement.querySelector('figure[role="img"]');
    await expect(figure).toBeInTheDocument();

    // Verify caption text is present
    await expect(canvas.getByText("Pauline Roussel")).toBeInTheDocument();
    await expect(
      canvas.getByText("Doula et professeure de yoga")
    ).toBeInTheDocument();

    // Verify screen reader description exists
    const srDescription = canvasElement.querySelector(".sr-only");
    await expect(srDescription).toBeInTheDocument();
  },
};

/**
 * Tests pregnancy-safe design elements:
 * - Background gris color
 * - Rounded corners
 * - Proper text colors
 */
export const PregnancySafeDesign: Story = {
  args: {
    spacing: "compact",
    containerSize: "xl",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Verify rounded container with gris background
    const grisContainer = canvasElement.querySelector(".bg-gris");
    await expect(grisContainer).toBeInTheDocument();
    await expect(grisContainer).toHaveClass("rounded-xl");

    // Verify secondary text color on headings
    const headings = canvasElement.querySelectorAll(".text-secondary");
    await expect(headings.length).toBeGreaterThan(0);

    // Verify image placeholder has secondary background
    const imagePlaceholder = canvasElement.querySelector("figure.bg-secondary");
    await expect(imagePlaceholder).toBeInTheDocument();
  },
};
