import type { Meta, StoryObj } from "@storybook/react";
import { ContactInfo } from "./contact-info";

const meta = {
  title: "Components/Contact/ContactInfo",
  component: ContactInfo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default contact information display
 */
export const Default: Story = {
  args: {},
};

/**
 * Contact info with custom styling
 */
export const CustomStyle: Story = {
  args: {
    className: "shadow-lg",
  },
};
