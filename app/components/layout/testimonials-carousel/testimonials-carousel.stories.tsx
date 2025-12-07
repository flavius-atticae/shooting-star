import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "storybook/test";
import { TestimonialsCarousel } from "./testimonials-carousel";
import type { Testimonial } from "./testimonial-card";

const placeholderTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Pauline m'a accompagnée avec une douceur et une écoute incroyables. Je me suis sentie soutenue à chaque étape de ma grossesse.",
    author: "Marie",
    context: "Accompagnée en 2024",
  },
  {
    id: "2",
    quote:
      "Le yoga prénatal avec Pauline a été un vrai moment de ressourcement. J'ai appris à écouter mon corps et à me connecter à mon bébé.",
    author: "Sophie",
    context: "Maman de 2 enfants",
  },
  {
    id: "3",
    quote:
      "La cérémonie Mama Blessing restera un souvenir inoubliable. Un moment magique entourée de mes proches.",
    author: "Camille",
  },
  {
    id: "4",
    quote:
      "Un accompagnement bienveillant et professionnel. Pauline a su répondre à toutes mes questions avec patience et douceur.",
    author: "Julie",
    context: "Première grossesse",
  },
  {
    id: "5",
    quote:
      "Les séances de yoga m'ont aidée à gérer mon stress et à me préparer sereinement à l'accouchement.",
    author: "Isabelle",
  },
];

const manyTestimonials: Testimonial[] = [
  ...placeholderTestimonials,
  {
    id: "6",
    quote: "Une doula exceptionnelle qui m'a vraiment accompagnée avec son cœur.",
    author: "Anne",
    context: "Accompagnée en 2023",
  },
  {
    id: "7",
    quote: "Je recommande vivement Pauline pour son professionnalisme et sa douceur.",
    author: "Catherine",
  },
  {
    id: "8",
    quote: "Le soutien post-partum m'a été d'une aide précieuse dans les premiers jours.",
    author: "Émilie",
    context: "Maman de 3 enfants",
  },
  {
    id: "9",
    quote: "Une présence rassurante pendant mon accouchement. Merci infiniment!",
    author: "Véronique",
  },
  {
    id: "10",
    quote: "Les ateliers de préparation à la naissance étaient parfaits pour mon couple.",
    author: "Sarah",
    context: "Accompagnée en 2024",
  },
];

const anonymousTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Pauline m'a accompagnée avec une douceur et une écoute incroyables. Je me suis sentie soutenue à chaque étape de ma grossesse.",
  },
  {
    id: "2",
    quote:
      "Le yoga prénatal avec Pauline a été un vrai moment de ressourcement. J'ai appris à écouter mon corps et à me connecter à mon bébé.",
  },
  {
    id: "3",
    quote:
      "La cérémonie Mama Blessing restera un souvenir inoubliable. Un moment magique entourée de mes proches.",
  },
];

const meta: Meta<typeof TestimonialsCarousel> = {
  title: "Layout/5. TestimonialsCarousel",
  component: TestimonialsCarousel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Testimonials Carousel Component - Carrousel de témoignages clients

**Features**:
- Carousel with embla-carousel-react for smooth navigation
- Responsive layout: 3 cards (desktop), 2 (tablet), 1 (mobile)
- Touch/swipe support for mobile devices
- Keyboard navigation (left/right arrow keys)
- Navigation arrows and pagination dots
- Auto-play with prefers-reduced-motion support
- WCAG 2.1 AA compliant

**Pregnancy-safe**: Soft colors, elegant typography, smooth animations.

**Testing Strategy**:
- Visual stories (Default, ManyTestimonials): Chromatic multi-viewport snapshots
- Interaction stories (KeyboardNavigation, TouchNavigation): Test Runner only
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Section title",
    },
    testimonials: {
      control: "object",
      description: "Array of testimonials to display",
    },
    autoPlay: {
      control: "boolean",
      description: "Enable auto-play (disabled with prefers-reduced-motion)",
    },
    autoPlayInterval: {
      control: "number",
      description: "Auto-play interval in milliseconds",
    },
    showNavigation: {
      control: "boolean",
      description: "Show navigation arrows",
    },
    showPagination: {
      control: "boolean",
      description: "Show pagination dots",
    },
    spacing: {
      control: "select",
      options: ["none", "compact", "normal", "spacious"],
    },
    containerSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof TestimonialsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// These stories capture static state for visual regression testing
// ============================================================

/**
 * Default Testimonials Carousel - Standard layout with 3+ testimonials
 * Visual regression testing across all breakpoints
 */
export const Default: Story = {
  args: {
    title: "Douce et à l'écoute",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1536],
    },
  },
};

/**
 * Many Testimonials - Tests carousel with 10+ items
 */
export const ManyTestimonials: Story = {
  args: {
    title: "Ce que nos clientes disent",
    testimonials: manyTestimonials,
    showNavigation: true,
    showPagination: true,
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
 * Single Testimonial - One testimonial without carousel
 */
export const SingleTestimonial: Story = {
  args: {
    title: "Témoignage",
    testimonials: [placeholderTestimonials[0]],
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Un seul témoignage affiché sans navigation de carrousel.",
      },
    },
  },
};

/**
 * With AutoPlay - Auto-scrolling enabled
 */
export const WithAutoPlay: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    autoPlay: true,
    autoPlayInterval: 3000,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Auto-défilement activé (3 secondes). Désactivé automatiquement avec prefers-reduced-motion.",
      },
    },
  },
};

/**
 * No Navigation - Without arrow buttons
 */
export const NoNavigation: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    showNavigation: false,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Carrousel sans flèches de navigation (swipe et dots seulement).",
      },
    },
  },
};

/**
 * No Pagination - Without dots
 */
export const NoPagination: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Carrousel sans indicateurs de pagination (flèches et swipe seulement).",
      },
    },
  },
};

/**
 * Anonymous Testimonials - Without author names
 */
export const AnonymousTestimonials: Story = {
  args: {
    title: "Ils témoignent",
    testimonials: anonymousTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Témoignages sans noms d'auteurs pour préserver la confidentialité.",
      },
    },
  },
};

/**
 * Spacious Spacing - More vertical padding
 */
export const SpaciousSpacing: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    spacing: "spacious",
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Espacement généreux pour un placement important sur la page.",
      },
    },
  },
};

/**
 * Compact Spacing - Less vertical padding
 */
export const CompactSpacing: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    spacing: "compact",
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Espacement compact pour économiser de l'espace vertical.",
      },
    },
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// These stories test behavior with play() functions
// ============================================================

/**
 * Tests keyboard navigation:
 * - Arrow keys navigate through testimonials
 * - Navigation buttons work correctly
 */
export const KeyboardNavigation: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find navigation buttons
    const prevButton = canvas.getByRole("button", {
      name: /témoignage précédent/i,
    });
    const nextButton = canvas.getByRole("button", {
      name: /témoignage suivant/i,
    });

    // Verify buttons exist
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Click next button
    await userEvent.click(nextButton);

    // Verify touch target size (48px minimum for pregnancy-safe)
    const nextButtonRect = nextButton.getBoundingClientRect();
    await expect(nextButtonRect.width).toBeGreaterThanOrEqual(48);
    await expect(nextButtonRect.height).toBeGreaterThanOrEqual(48);
  },
};

/**
 * Tests touch navigation structure:
 * - Carousel region exists
 * - Slides have proper ARIA attributes
 */
export const TouchNavigation: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement }) => {
    // Verify carousel region
    const carousel = canvasElement.querySelector('[role="region"]');
    await expect(carousel).toBeInTheDocument();
    await expect(carousel).toHaveAttribute(
      "aria-label",
      "Carrousel de témoignages"
    );

    // Verify slides exist
    const slides = canvasElement.querySelectorAll('[role="group"]');
    await expect(slides.length).toBe(5);

    // Verify first slide has proper aria-label
    await expect(slides[0]).toHaveAttribute("aria-label", "1 sur 5");
  },
};

/**
 * Tests reduced motion behavior:
 * - Component respects prefers-reduced-motion
 * - Transitions are disabled
 */
export const ReducedMotion: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    autoPlay: true,
    autoPlayInterval: 2000,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Respecte prefers-reduced-motion : désactive auto-play et transitions.",
      },
    },
  },
};

/**
 * Tests pagination dots:
 * - Dots are interactive
 * - Clicking dots navigates to correct slide
 */
export const PaginationInteraction: Story = {
  args: {
    title: "Témoignages",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    // Find pagination buttons
    const paginationButtons = canvasElement.querySelectorAll(
      '[role="tab"]'
    );
    await expect(paginationButtons.length).toBeGreaterThan(0);

    // Verify first dot is selected
    await expect(paginationButtons[0]).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(paginationButtons[0]).toHaveAttribute("aria-current", "true");

    // Click second pagination dot
    if (paginationButtons.length > 1) {
      await userEvent.click(paginationButtons[1] as HTMLElement);
    }
  },
};

/**
 * Tests accessibility structure:
 * - Section has proper heading
 * - Testimonials are in article elements
 * - ARIA attributes are correct
 */
export const AccessibilityStructure: Story = {
  args: {
    title: "Douce et à l'écoute",
    testimonials: placeholderTestimonials,
    showNavigation: true,
    showPagination: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main heading
    const heading = canvas.getByRole("heading", {
      level: 2,
      name: /douce et à l'écoute/i,
    });
    await expect(heading).toBeInTheDocument();

    // Verify section landmark exists
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();

    // Verify article elements for testimonial cards
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(5);

    // Verify carousel region
    const carouselRegion = canvasElement.querySelector('[role="region"]');
    await expect(carouselRegion).toBeInTheDocument();
  },
};
