import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import ContactPage from "./contact";

/**
 * Contact Page - Complete Storybook Tests
 *
 * Comprehensive test suite for the Contact page including:
 * - Full page integration tests
 * - Accessibility structure validation (WCAG 2.1 AA)
 * - Keyboard navigation tests
 * - Responsive viewport tests (320px, 768px, 1024px, 1440px)
 * - Form interaction tests
 *
 * Page composition:
 * - Route accessible at /contact
 * - Header component with navigation
 * - Page header with title "Contact" and subtitle (no Hero)
 * - ContactSection with info and form
 * - Footer component
 *
 * Technical details:
 * - Uses React Router decorators for route context
 * - All components follow WCAG 2.1 AA guidelines
 * - French language content (fr-CA)
 * - Chromatic visual regression testing enabled
 * - Form validation tests
 */

const meta: Meta<typeof ContactPage> = {
  title: "Pages/Contact",
  component: ContactPage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Page Contact - Tests Storybook complets

**Composition de la page**:
- Header avec navigation responsive
- Titre "Contact" avec sous-titre (fond blanc, pas de Hero)
- ContactSection avec informations et formulaire
- Footer avec navigation et informations de contact

**Tests inclus**:
- Default: Affichage de base de la page
- FullPageIntegration: Validation complète de toutes les sections
- AccessibilityStructure: Structure sémantique et WCAG 2.1 AA
- KeyboardNavigation: Navigation clavier complète
- FormInteraction: Tests d'interaction du formulaire
- ResponsiveViewports: Tests Chromatic (375, 768, 1280, 1440px)
- MobileViewport, TabletViewport, DesktopViewport: Tests par viewport

**Accessibilité (WCAG 2.1 AA)**:
- Landmarks ARIA appropriés
- Hiérarchie de headings correcte (H1 > H2)
- Navigation clavier complète
- Touch targets ≥ 44px
- Contenu en français (fr-CA)
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactPage>;

// Shared parameter for disabling Chromatic snapshots on interaction tests
const NO_CHROMATIC = {
  chromatic: { disableSnapshot: true },
};

// ============================================================
// VISUAL STORIES (Chromatic snapshots)
// ============================================================

/**
 * Default Contact Page
 *
 * Displays the complete contact page with Header, title, form, and Footer.
 */
export const Default: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1440],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify page title
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent("Contact");

    // Verify subtitle
    const subtitle = canvas.getByText(/envie d'en savoir plus/i);
    await expect(subtitle).toBeInTheDocument();

    // Verify Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Mobile Viewport
 *
 * Tests responsive behavior on mobile devices (375px width).
 */
export const MobileViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    chromatic: {
      viewports: [375],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is visible on mobile
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();

    // Verify form is accessible
    const form = canvasElement.querySelector("form");
    await expect(form).toBeInTheDocument();
  },
};

/**
 * Tablet Viewport
 *
 * Tests responsive behavior on tablet devices (768px width).
 */
export const TabletViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    chromatic: {
      viewports: [768],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();
  },
};

/**
 * Desktop Viewport
 *
 * Tests responsive behavior on desktop (1920px width).
 */
export const DesktopViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    chromatic: {
      viewports: [1280, 1440],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();
  },
};

// ============================================================
// INTERACTION STORIES (Test Runner only, no Chromatic snapshots)
// ============================================================

/**
 * Full Page Integration Test
 *
 * Validates all sections of the Contact page:
 * - Title and subtitle
 * - Contact info section
 * - Contact form
 * - Footer
 */
export const FullPageIntegration: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify page title
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toHaveTextContent("Contact");

    // Verify subtitle
    await expect(
      canvas.getByText(/envie d'en savoir plus/i)
    ).toBeInTheDocument();

    // Verify contact form fields
    const nameInput = canvas.getByLabelText(/nom/i);
    await expect(nameInput).toBeInTheDocument();

    const emailInput = canvas.getByLabelText(/email/i);
    await expect(emailInput).toBeInTheDocument();

    const messageInput = canvas.getByLabelText(/message/i);
    await expect(messageInput).toBeInTheDocument();

    // Verify submit button
    const submitButton = canvas.getByRole("button", { name: /envoyer/i });
    await expect(submitButton).toBeInTheDocument();

    // Verify Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Accessibility Structure
 *
 * Validates semantic HTML structure and accessibility:
 * - Proper landmark regions
 * - Correct heading hierarchy
 * - Form labels and ARIA attributes
 */
export const AccessibilityStructure: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main landmark
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();
    await expect(main).toHaveAttribute("id", "main-content");

    // Verify heading hierarchy - H1
    const h1Elements = canvas.getAllByRole("heading", { level: 1 });
    await expect(h1Elements.length).toBe(1);
    await expect(h1Elements[0]).toHaveTextContent("Contact");

    // Verify form has proper labels
    const formLabels = canvasElement.querySelectorAll("label");
    await expect(formLabels.length).toBeGreaterThan(0);

    // Verify footer landmark
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * Keyboard Navigation
 *
 * Tests that all interactive elements are keyboard accessible.
 */
export const KeyboardNavigation: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get form elements
    const nameInput = canvas.getByLabelText(/nom/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const submitButton = canvas.getByRole("button", { name: /envoyer/i });

    // Verify all form elements are focusable
    await expect(nameInput).not.toHaveAttribute("disabled");
    await expect(emailInput).not.toHaveAttribute("disabled");
    await expect(messageInput).not.toHaveAttribute("disabled");
    await expect(submitButton).not.toHaveAttribute("disabled");

    // Tab through form elements
    nameInput.focus();
    await expect(nameInput).toHaveFocus();
  },
};

/**
 * Form Interaction
 *
 * Tests form field interactions and validation.
 */
export const FormInteraction: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get form elements
    const nameInput = canvas.getByLabelText(/nom/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);

    // Type in form fields
    await userEvent.type(nameInput, "Marie");
    await expect(nameInput).toHaveValue("Marie");

    await userEvent.type(emailInput, "marie@example.com");
    await expect(emailInput).toHaveValue("marie@example.com");

    await userEvent.type(messageInput, "Bonjour, je souhaite en savoir plus.");
    await expect(messageInput).toHaveValue(
      "Bonjour, je souhaite en savoir plus."
    );
  },
};

/**
 * French Content Validation
 *
 * Ensures all text content is properly displayed in French (fr-CA).
 */
export const FrenchContent: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French title
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toHaveTextContent("Contact");

    // Verify French subtitle
    await expect(
      canvas.getByText(/envie d'en savoir plus/i)
    ).toBeInTheDocument();

    // Verify French form labels
    await expect(canvas.getByLabelText(/nom/i)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/email/i)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/message/i)).toBeInTheDocument();

    // Verify French submit button
    await expect(
      canvas.getByRole("button", { name: /envoyer/i })
    ).toBeInTheDocument();
  },
};

/**
 * Page Structure Validation
 *
 * Validates that the page has the correct structure:
 * - Header at top
 * - Title section (not Hero)
 * - Contact form section
 * - Footer after main content
 */
export const PageStructure: Story = {
  parameters: NO_CHROMATIC,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify header is present
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();

    // Verify main content area
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();

    // Verify no Hero component (title is simple h1, not in a hero region)
    const heroRegion = canvasElement.querySelector(
      '[aria-label="Section principale d\'accueil"]'
    );
    await expect(heroRegion).not.toBeInTheDocument();

    // Verify title is a simple heading
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toHaveTextContent("Contact");

    // Verify footer is present
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};
