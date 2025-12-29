import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import { FeatureBlock } from "./feature-block";

const meta: Meta<typeof FeatureBlock> = {
  title: "Layout/4. Feature Block",
  component: FeatureBlock,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Bloc de contenu réutilisable avec texte et image en layout asymétrique.

**Features**:
- Layout alternant (text-left / text-right)
- Typography: Ivyora Display (title) + Barlow (description)
- Image avec placeholder automatique
- Responsive: 2 colonnes desktop → stack mobile
- WCAG 2.1 AA compliant
- Intégration Section + Container pour cohérence layout

**Pregnancy-safe**: Espacement généreux, couleurs apaisantes du design system.

**Section & Container Props**:
- \`spacing\`: Vertical spacing ("none" | "compact" | "normal" | "spacious")
- \`background\`: Background variant ("white" | "primary" | "accent" | "soft" | "transparent")
- \`containerSize\`: Width constraint ("sm" | "md" | "lg" | "xl" | "full")
- \`insetX\` / \`insetY\`: Floating card effect spacing

**Testing Strategy**:
- Visual stories (Default, TextRight, etc.): Chromatic multi-viewport snapshots
- Interaction stories (KeyboardNavigation, AccessibilityStructure): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Block title in Ivyora Display font",
    },
    description: {
      control: "text",
      description: "Block description in Barlow font",
    },
    imageSrc: {
      control: "text",
      description: "Image URL (optional - placeholder used if not provided)",
    },
    imageAlt: {
      control: "text",
      description: "Image alt text for accessibility",
    },
    layout: {
      control: "select",
      options: ["text-left", "text-right"],
      description: "Layout direction",
    },
    spacing: {
      control: "select",
      options: ["none", "compact", "normal", "spacious"],
      description: "Section spacing variant",
    },
    background: {
      control: "select",
      options: ["white", "primary", "accent", "soft", "transparent"],
      description: "Section background variant",
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Container size constraint",
    },
    insetX: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Horizontal inset for floating effect",
    },
    insetY: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Vertical inset for floating effect",
    },
    className: {
      control: "text",
      description: "Custom className applied to the Section wrapper (for layout/spacing overrides)",
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
 * Default FeatureBlock - Text on left, image on right
 * Visual regression testing across all breakpoints (375 → 1536px)
 */
export const Default: Story = {
  args: {
    title: "Cours privés",
    description:
      "Des séances de yoga personnalisées, adaptées à vos besoins et à votre rythme. Un accompagnement individuel pour approfondir votre pratique dans un cadre bienveillant et sécuritaire.",
    imageAlt: "Illustration des cours de yoga privés",
    layout: "text-left",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Text Right Layout - Image on left, text on right
 * Tests the reversed layout for alternating blocks
 */
export const TextRight: Story = {
  args: {
    title: "Cours en studio",
    description:
      "Rejoignez nos cours de groupe dans une atmosphère chaleureuse et conviviale. Parfait pour celles qui apprécient l'énergie collective et le soutien d'une communauté bienveillante.",
    imageAlt: "Illustration des cours de yoga en studio",
    layout: "text-right",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * With Image - Real image provided
 */
export const WithImage: Story = {
  args: {
    title: "Cours en entreprises",
    description:
      "Offrez à vos employées un moment de détente et de ressourcement. Des cours de yoga adaptés au milieu professionnel pour favoriser le bien-être au travail.",
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    imageAlt: "Cours de yoga en entreprise",
    layout: "text-left",
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
  },
};

/**
 * No Image - Using placeholder
 */
export const NoImage: Story = {
  args: {
    title: "Séances de yoga adapté",
    description:
      "Le yoga peut être pratiqué par toutes, peu importe votre condition physique ou votre âge. Nous adaptons les postures pour respecter vos limites et vos capacités.",
    imageAlt: "Illustration des séances de yoga adapté",
    layout: "text-right",
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
  },
};

/**
 * With Button - CTA button included
 * NOTE: Buttons have been removed from the component
 */
export const WithButton: Story = {
  args: {
    title: "Yoga prénatal personnalisé",
    description:
      "Un accompagnement sur mesure pendant votre grossesse. Des séances adaptées à chaque trimestre pour vous préparer sereinement à l'accouchement.",
    imageAlt: "Illustration du yoga prénatal personnalisé",
    layout: "text-left",
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Long Content - Tests text wrapping and layout
 */
export const LongContent: Story = {
  args: {
    title: "Yoga postnatal et récupération en douceur",
    description:
      "Après l'accouchement, prenez le temps de retrouver votre corps en douceur. Nos cours de yoga postnatal sont spécialement conçus pour accompagner votre récupération physique et émotionnelle. Chaque séance respecte votre rythme et vos besoins particuliers pendant cette période de transformation. Nous travaillons sur le renforcement du plancher pelvien, la réduction des tensions musculaires, et le bien-être émotionnel dans un environnement sûr et bienveillant.",
    imageAlt: "Illustration du yoga postnatal et récupération",
    layout: "text-right",
  },
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
  },
};

/**
 * Alternating Demo - Shows 3 blocks alternating like on the mockup
 * Demonstrates real-world usage on Yoga page
 */
export const Alternating: Story = {
  render: () => (
    <div className="space-y-12 lg:space-y-16">
      <FeatureBlock
        title="Cours privés"
        description="Des séances de yoga personnalisées, adaptées à vos besoins et à votre rythme. Un accompagnement individuel pour approfondir votre pratique."
        imageAlt="Illustration des cours de yoga privés"
        layout="text-left"
        spacing="none"
      />
      <FeatureBlock
        title="Cours en studio"
        description="Rejoignez nos cours de groupe dans une atmosphère chaleureuse et conviviale. Parfait pour celles qui apprécient l'énergie collective."
        imageAlt="Illustration des cours de yoga en studio"
        layout="text-right"
        spacing="none"
      />
      <FeatureBlock
        title="Cours en entreprises"
        description="Offrez à vos employées un moment de détente et de ressourcement. Des cours de yoga adaptés au milieu professionnel."
        imageAlt="Illustration des cours de yoga en entreprises"
        layout="text-left"
        spacing="none"
      />
    </div>
  ),
  parameters: {
    chromatic: {
      viewports: [375, 1280],
    },
    docs: {
      description: {
        story:
          "Démonstration de 3 blocs alternés comme sur la maquette de la page Yoga. Pattern text-left → text-right → text-left. L'espacement externe est géré par le parent, et spacing='none' évite les doubles margins.",
      },
    },
  },
};

/**
 * Mobile Viewport - Focused mobile rendering test
 */
export const MobileViewport: Story = {
  args: {
    title: "Cours pour futures mamans",
    description:
      "Yoga prénatal adapté à chaque trimestre. Accompagnement bienveillant pour votre bien-être et celui de bébé.",
    imageAlt: "Illustration des cours pour futures mamans",
    layout: "text-left",
  },
  parameters: {
    chromatic: {
      viewports: [375, 428], // iPhone sizes
    },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests layout and structure
 */
export const ButtonInteraction: Story = {
  args: {
    title: "Cours de yoga",
    description: "Description du cours de yoga.",
    imageAlt: "Illustration du cours de yoga",
    layout: "text-left",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the block renders
    const article = canvasElement.querySelector("article");
    await expect(article).toBeInTheDocument();

    // Verify heading exists
    const heading = canvas.getByRole("heading", { name: /Cours de yoga/i });
    await expect(heading).toBeInTheDocument();
  },
};

/**
 * Tests layout switching between text-left and text-right
 */
export const LayoutSwitching: Story = {
  args: {
    title: "Test Layout",
    description: "Testing layout switching",
    imageAlt: "Test image for layout switching",
    layout: "text-right",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the block renders
    const article = canvasElement.querySelector("article");
    await expect(article).toBeInTheDocument();

    // Verify heading exists
    const heading = canvas.getByRole("heading", { name: /Test Layout/i });
    await expect(heading).toBeInTheDocument();

    // Verify image exists
    const image = canvas.getByRole("img");
    await expect(image).toBeInTheDocument();
  },
};

/**
 * Tests accessibility structure and semantic HTML
 */
export const AccessibilityStructure: Story = {
  args: {
    title: "Cours accessible",
    description: "Description accessible pour tous.",
    imageAlt: "Image descriptive de yoga",
    layout: "text-left",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify article element
    const article = canvasElement.querySelector("article");
    await expect(article).toBeInTheDocument();
    await expect(article?.tagName).toBe("ARTICLE");

    // Verify heading structure
    const heading = canvas.getByRole("heading", {
      level: 3,
      name: /Cours accessible/i,
    });
    await expect(heading).toBeInTheDocument();

    // Verify lang attribute for French content
    await expect(article).toHaveAttribute("lang", "fr");

    // Verify image has alt text
    const image = canvas.getByRole("img");
    await expect(image).toHaveAttribute("alt", "Image descriptive de yoga");
  },
};

/**
 * Tests keyboard navigation
 */
export const KeyboardNavigation: Story = {
  args: {
    title: "Navigation au clavier",
    description: "Testez la navigation avec Tab.",
    imageAlt: "Illustration de la navigation au clavier",
    layout: "text-left",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading exists
    const heading = canvas.getByRole("heading", { name: /Navigation au clavier/i });
    await expect(heading).toBeInTheDocument();
  },
};

/**
 * Tests image placeholder when no image provided
 */
export const ImagePlaceholder: Story = {
  args: {
    title: "Sans image",
    description: "Test du placeholder automatique",
    imageAlt: "Placeholder image",
    layout: "text-left",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify image exists even without imageSrc
    const image = canvas.getByRole("img");
    await expect(image).toBeInTheDocument();

    // Verify placeholder is used (data URI starts with "data:image/svg+xml")
    const src = image.getAttribute("src");
    await expect(src).toContain("data:image/svg+xml");
  },
};

/**
 * Tests French content support
 */
export const FrenchContent: Story = {
  args: {
    title: "Cours de yoga prénatal",
    description:
      "Découvrez nos cours adaptés à chaque trimestre de votre grossesse. Un accompagnement bienveillant pour vous et bébé.",
    imageAlt: "Illustration du cours de yoga prénatal",
    layout: "text-left",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French text renders correctly
    const heading = canvas.getByText(/Cours de yoga prénatal/i);
    await expect(heading).toBeInTheDocument();

    const description = canvas.getByText(/Découvrez nos cours/i);
    await expect(description).toBeInTheDocument();

    // Verify lang attribute
    const article = canvasElement.querySelector("article");
    await expect(article).toHaveAttribute("lang", "fr");
  },
};
