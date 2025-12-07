import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta = {
  title: "UI/Form/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default textarea
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your message here...",
  },
};

/**
 * Textarea with initial value
 */
export const WithValue: Story = {
  args: {
    defaultValue: "This is some initial text in the textarea.",
  },
};

/**
 * Disabled textarea
 */
export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
};

/**
 * Textarea with error state
 */
export const WithError: Story = {
  args: {
    placeholder: "Enter your message",
    "aria-invalid": true,
  },
};

/**
 * Large textarea
 */
export const Large: Story = {
  args: {
    placeholder: "Large textarea with more height",
    className: "min-h-[200px]",
  },
};
