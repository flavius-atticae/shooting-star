import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { withReactRouter } from "../../../../.storybook/react-router-decorator";

const meta: Meta<typeof Header> = {
  title: "Layout/1. Header",
  component: Header,
  decorators: [withReactRouter],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Header principal avec logo, navigation responsive et bouton contact.

**Features**:
- Logo "Pauline Roussel" (The Seasons font)
- Menu mobile avec overlay
- Touch targets ≥ 48px
- WCAG 2.1 AA compliant

**Responsive**: Menu burger (mobile/tablet), bouton contact masqué sur mobile.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Classes CSS personnalisées",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};