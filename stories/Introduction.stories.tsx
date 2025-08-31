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

    <h2 className="text-2xl font-semibold mb-4 text-[#618462]">Brand Identity</h2>
    
    <h3 className="text-xl font-semibold mb-3 text-[#af6868]">Color Palette</h3>
    <p className="mb-4 text-gray-700">Our color system reflects the natural, nurturing environment of yoga practice:</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#618462]"></div>
        <span><strong>Primary Green (#618462)</strong> - Main brand color representing growth and balance</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#af6868]"></div>
        <span><strong>Accent Rose (#af6868)</strong> - Warm accent for highlights and interactive elements</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#517982]"></div>
        <span><strong>Secondary Blue (#517982)</strong> - Calm supporting color</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5e4530]"></div>
        <span><strong>Neutral Brown (#5e4530)</strong> - Text and grounding elements</span>
      </div>
    </div>

    <h3 className="text-xl font-semibold mb-3 text-[#af6868]">Typography</h3>
    <ul className="list-disc pl-6 mb-6 text-gray-700">
      <li><strong>Headings</strong>: "The Seasons" - Elegant serif for major headings</li>
      <li><strong>Body Text</strong>: "Barlow" - Clean, readable sans-serif</li>
      <li><strong>Accent</strong>: "Moontime" - Script font for special elements</li>
    </ul>

    <h3 className="text-xl font-semibold mb-3 text-[#af6868]">Design Principles</h3>
    <ol className="list-decimal pl-6 mb-8 text-gray-700">
      <li><strong>Accessibility First</strong> - All components meet WCAG standards</li>
      <li><strong>Mobile-First</strong> - Responsive design starting from 380px</li>
      <li><strong>Performance</strong> - Optimized assets and efficient rendering</li>
      <li><strong>Consistency</strong> - Unified spacing, colors, and interactions</li>
      <li><strong>Calm & Professional</strong> - Reflecting the yoga practice values</li>
    </ol>

    <h2 className="text-2xl font-semibold mb-4 text-[#618462]">Component Categories</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[#af6868]">UI Components</h3>
        <ul className="text-sm text-gray-700">
          <li>• Button - Various styles and sizes for actions</li>
          <li>• Card - Content containers for services and testimonials</li>
          <li>• Form - Contact and booking forms with validation</li>
          <li>• Input - Text inputs with proper styling and states</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[#af6868]">Layout Components</h3>
        <ul className="text-sm text-gray-700">
          <li>• Navigation and page structure components</li>
          <li>• Responsive grid systems</li>
          <li>• Container and spacing utilities</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[#af6868]">Content Components</h3>
        <ul className="text-sm text-gray-700">
          <li>• Service descriptions and pricing</li>
          <li>• Testimonials and reviews</li>
          <li>• Class schedules and booking</li>
        </ul>
      </div>
    </div>

    <h2 className="text-2xl font-semibold mb-4 text-[#618462]">Development Notes</h2>
    <p className="mb-4 text-gray-700">This Storybook is integrated with:</p>
    <ul className="list-disc pl-6 mb-8 text-gray-700">
      <li><strong>React Router v7</strong> with SSR support</li>
      <li><strong>TailwindCSS v4.1.4</strong> for styling</li>
      <li><strong>TypeScript</strong> for type safety</li>
      <li><strong>React Hook Form & Zod</strong> for form validation</li>
      <li><strong>Radix UI</strong> for accessible primitives</li>
    </ul>

    <h2 className="text-2xl font-semibold mb-4 text-[#618462]">Getting Started</h2>
    <p className="mb-6 text-gray-700">
      Navigate through the stories to explore components, their variations, and usage examples. Each story includes:
    </p>
    <ul className="list-disc pl-6 mb-8 text-gray-700">
      <li>Interactive controls for testing different props</li>
      <li>Documentation with usage examples</li>
      <li>Accessibility information</li>
      <li>Mobile responsiveness testing</li>
    </ul>

    <p className="text-gray-700 mb-8">
      The components are designed to work seamlessly together, creating a cohesive user experience 
      that supports the goals of the yoga practice.
    </p>

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