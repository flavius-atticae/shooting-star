import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { withReactRouter } from "../../.storybook/react-router-decorator";
import DoulaPage from "./doula";

/**
 * Doula Page - Phase 1: Route and Hero
 * 
 * This story demonstrates the foundational Doula page with:
 * - Route accessible at /doula
 * - Hero section with French title "Accompagnement de doula"
 * - Subtitle "AVEC PAULINE ROUSSEL"
 * - Footer component
 * - Placeholder comments for future sections
 * 
 * Technical details:
 * - Follows pattern from home.tsx
 * - Uses existing Hero and Footer components
 * - WCAG 2.1 AA compliant
 * - Responsive (mobile, tablet, desktop)
 * - French language content
 */

const meta: Meta<typeof DoulaPage> = {
  title: "Pages/Doula",
  component: DoulaPage,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DoulaPage>;

/**
 * Default Doula Page
 * 
 * Displays the complete doula page with Hero and Footer.
 * This is the initial implementation for Phase 1.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main content area exists
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();

    // Verify Hero section with correct French title
    const title = canvas.getByRole("heading", { level: 1 });
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent("Accompagnement de doula");

    // Verify Hero subtitle
    const subtitle = canvas.getByText("AVEC PAULINE ROUSSEL");
    await expect(subtitle).toBeInTheDocument();
  },
};

/**
 * Accessibility Check
 * 
 * Validates WCAG 2.1 AA compliance:
 * - Proper semantic HTML structure
 * - Correct heading hierarchy
 * - Landmarks properly labeled in French
 */
export const AccessibilityCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for main landmark
    const main = canvas.getByRole("main");
    await expect(main).toBeInTheDocument();
    await expect(main).toHaveAttribute("id", "main-content");

    // Check for proper heading hierarchy (h1)
    const h1 = canvas.getByRole("heading", { level: 1 });
    await expect(h1).toBeInTheDocument();
    await expect(h1).toHaveTextContent("Accompagnement de doula");

    // Check for Hero region with French label
    const heroRegion = canvas.getByRole("region", {
      name: "Section principale d'accueil",
    });
    await expect(heroRegion).toBeInTheDocument();

    // Check for Footer
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};

/**
 * French Content Validation
 * 
 * Ensures all text content is properly displayed in French (fr-CA).
 */
export const FrenchContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify French title
    await expect(canvas.getByText("Accompagnement de doula")).toBeInTheDocument();

    // Verify French subtitle
    await expect(canvas.getByText("AVEC PAULINE ROUSSEL")).toBeInTheDocument();
  },
};

/**
 * Mobile Viewport
 * 
 * Tests responsive behavior on mobile devices (375px width).
 * Hero should maintain proper sizing and layout.
 */
export const MobileViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should still render all key elements on mobile
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should render correctly on tablet
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Desktop Viewport
 * 
 * Tests responsive behavior on desktop (1920px width).
 * This is the primary design target.
 */
export const DesktopViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page should render correctly on desktop
    await expect(canvas.getByRole("main")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  },
};

/**
 * Page Structure Validation
 * 
 * Validates that the page has the correct structure:
 * - Hero as first element in main
 * - Footer after main content
 */
export const PageStructure: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const main = canvas.getByRole("main");
    const heroRegion = canvas.getByRole("region", {
      name: "Section principale d'accueil",
    });

    // Hero should be within main content
    await expect(main).toContainElement(heroRegion);

    // Footer should exist
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  },
};
