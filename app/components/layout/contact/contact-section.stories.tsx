import type { Meta, StoryObj } from "@storybook/react";
import { ContactSection } from "./contact-section";

const meta = {
  title: "Components/Contact/ContactSection",
  component: ContactSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default contact section with two-column layout
 */
export const Default: Story = {
  args: {},
};

/**
 * Contact section in loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Contact section with custom submit handler
 */
export const WithSubmitHandler: Story = {
  args: {
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
      alert(
        `Form submitted!\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
      );
    },
  },
};

/**
 * Contact section with compact spacing
 */
export const CompactSpacing: Story = {
  args: {
    spacing: "compact",
  },
};

/**
 * Contact section with spacious layout
 */
export const SpaciousSpacing: Story = {
  args: {
    spacing: "spacious",
  },
};
