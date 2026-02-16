import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(dirname, "app");

// Default Vitest configuration for non-visual/unit tests
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react/jsx-dev-runtime"],
  },
  test: {
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.e2e.*",
      "**/*.stories.*",
    ],
    globals: true,
    setupFiles: ["./app/test/setup.ts"],
  },
  resolve: {
    alias: {
      "~": appDir,
    },
  },
});
