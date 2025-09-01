import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../app'),
      // Use our compatibility shim for React Router v7 in Storybook
      'react-router': path.resolve(__dirname, './mocks/react-router.ts'),
    },
  },
});