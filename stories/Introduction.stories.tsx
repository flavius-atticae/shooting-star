import type { Meta, StoryObj } from '@storybook/react';

// Introduction component with full documentation
const IntroductionComponent = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-[#5e4530]">Pauline Roussel Yoga Design System</h1>
    
    <p className="text-lg mb-8 text-gray-700">
      Welcome to the Storybook for Pauline Roussel's yoga website. This design system showcases 
      components built for a perinatal yoga instructor specializing in motherhood wellness and birth accompaniment.
    </p>

    <h2 className="text-2xl font-semibold mb-4 text-[#618462]">About the Project</h2>
    <p className="mb-6 text-gray-700">
      This React Router v7 application focuses on providing a serene, accessible, and professional online presence for yoga services. The design emphasizes:
    </p>
    <ul className="list-disc pl-6 mb-8 text-gray-700">
      <li><strong>Gentle aesthetics</strong> with calming colors and typography</li>
      <li><strong>Accessibility</strong> with proper focus states and semantic HTML</li>
      <li><strong>Responsiveness</strong> across all device sizes</li>
      <li><strong>Performance</strong> with modern React patterns and SSR</li>
    </ul>

    <hr className="my-8" />

    <p className="text-center italic text-[#5e4530]">
      "Yoga is a journey of the self, through the self, to the self." - The Bhagavad Gita
    </p>
  </div>
);

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof IntroductionComponent>;

export const Overview: Story = {};