import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta = {
  title: "UI/Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default select dropdown
 */
export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

/**
 * Select with default value
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

/**
 * Select with error state
 */
export const WithError: Story = {
  render: () => (
    <Select aria-invalid={true}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

/**
 * Time slot select (from contact form)
 */
export const TimeSlots: Story = {
  render: () => (
    <Select>
      <option value="">Flexible</option>
      <option value="morning">Matin (9h-12h)</option>
      <option value="afternoon">Après-midi (12h-17h)</option>
      <option value="evening">Soir (17h-20h)</option>
    </Select>
  ),
};
