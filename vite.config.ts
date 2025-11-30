import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Detect if running in Storybook context
// The React Router Vite plugin is incompatible with Storybook's build process
const isStorybook = process.argv[1]?.includes('storybook') || process.env.STORYBOOK === 'true';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !isStorybook && reactRouter(),
    tsconfigPaths()
  ].filter(Boolean),
});
