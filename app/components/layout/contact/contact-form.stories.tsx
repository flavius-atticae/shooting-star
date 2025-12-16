import type { Meta, StoryObj } from "@storybook/react";
import { ContactForm } from "./contact-form";

const meta = {
  title: "Components/Contact/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default contact form state
 */
export const Default: Story = {
  args: {},
};

/**
 * Contact form in loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Contact form with custom submit handler
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
