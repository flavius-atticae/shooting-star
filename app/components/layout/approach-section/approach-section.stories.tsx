import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import { ApproachSection } from "./approach-section";
import type { ApproachItem } from "./approach-section";

// Default 5 approach items based on requirements
const defaultApproachItems: ApproachItem[] = [
  {
    id: "pregnancy",
    title: "Pendant la grossesse",
    description:
      "Accompagnement en douceur et à l'écoute, je crée un espace sécurisant où vous pouvez explorer votre grossesse avec confiance. Ensemble, nous découvrons des outils concrets comme la respiration, le mouvement et la relaxation pour vous accompagner au quotidien.",
  },
  {
    id: "mama-blessing",
    title: "Mama Blessing",
    description:
      "Une cérémonie intime et sacrée pour honorer le passage vers la maternité. À travers des rituels et des gestes symboliques, je vous accompagne dans une connexion profonde à votre force intérieure et à la communauté qui vous entoure.",
  },
  {
    id: "birth",
    title: "L'accouchement",
    description:
      "Une présence calme et rassurante à vos côtés pendant la naissance. Je vous accompagne avec le souffle, le mouvement et les postures, tout en offrant un soutien émotionnel, physique et énergétique pour vous et votre partenaire.",
  },
  {
    id: "fourth-trimester",
    title: "4e trimestre",
    description:
      "Cette période précieuse mais souvent exigeante mérite toute notre attention. Avec écoute, présence et gestes de réconfort, j'offre des rituels postnataux pour vous aider à trouver votre nouvel équilibre dans la maternité.",
  },
  {
    id: "custom",
    title: "Sur mesure",
    description:
      "Chaque histoire est différente, chaque parcours est unique. Que vous ayez besoin d'un accompagnement ponctuel ou complet, je m'adapte à vos besoins et à votre réalité pour créer un soutien qui vous ressemble.",
  },
];

const meta: Meta<typeof ApproachSection> = {
  title: "Layout/6. ApproachSection",
  component: ApproachSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Section "Mon approche" pour la page Doula avec 5 sous-sections thématiques.

**Features**:
- Titre principal en Ivyora Display (vert foncé)
- Titres décoratifs en Moontime (cursive/script)
- Descriptions en Barlow (centré)
- Espacement vertical généreux entre sous-sections
- Layout responsive (mobile, tablet, desktop)
- Touch targets ≥ 44px
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Couleurs apaisantes, espacement généreux, typographie douce.

**Testing Strategy**:
- Visual stories (Default, SingleItem): Chromatic multi-viewport snapshots
- Interaction stories (AccessibilityStructure, SemanticHeadings): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main section title",
    },
    items: {
      control: "object",
      description: "Array of approach items",
    },
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
  },
} satisfies Meta<typeof ApproachSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default ApproachSection - Standard layout with 5 items
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Custom Title - Override default "Mon approche" title
 */
export const CustomTitle: Story = {
  args: {
    title: "Ma philosophie",
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
    docs: {
      description: {
        story: "Titre personnalisé au lieu du défaut 'Mon approche'.",
      },
    },
  },
};

/**
 * Single Item - Edge case with only one approach item
 */
export const SingleItem: Story = {
  args: {
    items: [defaultApproachItems[0]],
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
    docs: {
      description: {
        story: "Cas limite avec un seul élément d'approche.",
      },
    },
  },
};

/**
 * Many Items - More than 5 items to test scalability
 */
export const ManyItems: Story = {
  args: {
    items: [
      ...defaultApproachItems,
      {
        id: "extra-1",
        title: "Soutien continu",
        description:
          "Un accompagnement qui s'adapte à toutes les étapes de votre parcours maternel, avec flexibilité et bienveillance.",
      },
      {
        id: "extra-2",
        title: "Cercles de femmes",
        description:
          "Des moments de partage et de connexion avec d'autres femmes, dans un espace sécuritaire et bienveillant.",
      },
    ],
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
    docs: {
      description: {
        story: "Test avec plus de 5 éléments pour vérifier l'évolutivité.",
      },
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
    items: defaultApproachItems,
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
 * Compact Spacing - Minimal spacing
 */
export const CompactSpacing: Story = {
  args: {
    items: defaultApproachItems,
    spacing: "compact",
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
    items: defaultApproachItems,
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
 * Empty State - No items provided
 */
export const EmptyState: Story = {
  args: {
    items: [],
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "État vide quand aucun élément n'est fourni.",
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
 * - Section landmark with proper heading
 * - French language attribute
 * - Semantic structure with role="list"
 */
export const AccessibilityStructure: Story = {
  args: {
    items: defaultApproachItems,
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

    // Verify main "Mon approche" heading
    const mainHeading = canvas.getByRole("heading", {
      level: 2,
      name: /Mon approche/i,
    });
    await expect(mainHeading).toBeInTheDocument();

    // Verify list container
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();

    // Verify 5 list items
    const listItems = canvas.getAllByRole("listitem");
    await expect(listItems.length).toBe(5);
  },
};

/**
 * Tests semantic heading hierarchy:
 * - H2 for main section (Mon approche)
 * - H3 for each approach item title
 */
export const SemanticHeadings: Story = {
  args: {
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify H2 heading (section title)
    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBe(1);
    await expect(h2Headings[0]).toHaveTextContent("Mon approche");

    // Verify H3 headings (approach item titles)
    const h3Headings = canvas.getAllByRole("heading", { level: 3 });
    await expect(h3Headings.length).toBe(5);

    // Verify specific approach titles
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Pendant la grossesse/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Mama Blessing/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /L'accouchement/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /4e trimestre/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 3, name: /Sur mesure/i })
    ).toBeInTheDocument();
  },
};

/**
 * Tests approach items structure:
 * - Article elements for each item
 * - Proper aria-labelledby connections
 * - Description paragraphs
 */
export const ApproachItemsStructure: Story = {
  args: {
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify articles inside list items
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(5);

    // Verify each article has lang="fr"
    articles.forEach((article) => {
      expect(article).toHaveAttribute("lang", "fr");
    });

    // Verify first item structure
    const firstArticle = articles[0];
    await expect(firstArticle).toHaveAttribute(
      "aria-labelledby",
      "approach-pregnancy-title"
    );

    // Verify title exists with correct ID
    const firstTitle = canvasElement.querySelector(
      "#approach-pregnancy-title"
    );
    await expect(firstTitle).toBeInTheDocument();
    await expect(firstTitle?.tagName).toBe("H3");

    // Verify description paragraph exists
    const descriptions = canvasElement.querySelectorAll("p");
    await expect(descriptions.length).toBeGreaterThanOrEqual(5);
  },
};

/**
 * Tests responsive layout viewports:
 * - Mobile (375px)
 * - Tablet (768px)
 * - Desktop (1280px)
 */
export const ResponsiveLayout: Story = {
  args: {
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
    docs: {
      description: {
        story:
          "Test du layout responsive sur mobile, tablette et desktop pour Chromatic.",
      },
    },
  },
};

/**
 * Tests typography classes:
 * - Main title uses font-heading
 * - Decorative titles use font-accent
 * - Descriptions use font-sans
 */
export const TypographyStructure: Story = {
  args: {
    items: defaultApproachItems,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Verify main title uses font-heading
    const mainTitle = canvasElement.querySelector("h2");
    await expect(mainTitle).toHaveClass("font-heading");
    await expect(mainTitle).toHaveClass("text-primary");

    // Verify decorative titles use font-accent
    const decorativeTitles = canvasElement.querySelectorAll("h3");
    decorativeTitles.forEach((title) => {
      expect(title).toHaveClass("font-accent");
      expect(title).toHaveClass("text-secondary");
    });

    // Verify descriptions use font-sans
    const descriptions = canvasElement.querySelectorAll("article p");
    descriptions.forEach((description) => {
      expect(description).toHaveClass("font-sans");
      expect(description).toHaveClass("text-neutral");
    });
  },
};
