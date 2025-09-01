import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        ".react-router/",
        "build/",
        "coverage/",
        "storybook-static/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
        "**/*.stories.{js,ts,jsx,tsx}",
        "app/test/",
      ],
      // Pregnancy-safe coverage thresholds - realistic for healthcare context
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 85,
          statements: 85,
        },
      },
    },
    // Pregnancy-consideration: Reduce test timeout for users with fatigue
    testTimeout: 10000,
    hookTimeout: 5000,
    // Accessibility testing considerations
    reporters: ["default", "html"],
    outputFile: {
      html: "./coverage/vitest-report.html",
    },
  },
  // Resolve configuration to match main app
  resolve: {
    alias: {
      "~": "/app",
    },
  },
});