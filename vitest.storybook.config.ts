import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(dirname, "app");
const storybookDir = path.join(dirname, ".storybook");

// Vitest configuration dedicated to Storybook-driven visual/browser tests
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    storybookTest({ configDir: storybookDir }),
  ],
  optimizeDeps: {
    include: ["react/jsx-dev-runtime"],
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
    },
    exclude: ["**/node_modules/**", "**/e2e/**", "**/*.e2e.*"],
    globals: true,
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "~": appDir,
    },
  },
});
