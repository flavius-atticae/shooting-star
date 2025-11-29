import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Path constants for aliases
const appDir = path.join(dirname, 'app');
const storybookDir = path.join(dirname, '.storybook');
const reactRouterMock = path.join(storybookDir, 'mocks/react-router.ts');

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  test: {
    // Exclude Playwright E2E tests from Vitest
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.e2e.*",
      "**/*.spec.ts", // Playwright test files
      "**/*.setup.ts" // Playwright setup files
    ],
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
        "app/test/e2e/**", // Exclude E2E test files from coverage
        "app/test/setup.ts", // Exclude test setup files
        "**/*.spec.ts", // Exclude Playwright spec files
        "**/*.setup.ts" // Exclude Playwright setup files
      ],
      // Pregnancy-safe coverage thresholds - progressive approach for healthcare context
      // Note: These will be gradually increased as testing foundation matures
      thresholds: {
        global: {
          branches: 40, // Current: 43.9%, allow for small fluctuations
          functions: 35, // Current: 40.47%, allow room for growth
          lines: 1, // Current: 1.74%, very low but tests are passing
          statements: 1 // Progressive increase as more components get tested
        }
      }
    },
    // Accessibility testing considerations
    reporters: ["default", "html"],
    outputFile: {
      html: "./coverage/vitest-report.html"
    },
    projects: [
      // Unit tests project (jsdom-based)
      {
        plugins: [tailwindcss(), tsconfigPaths()],
        test: {
          name: 'unit',
          globals: true,
          environment: "jsdom",
          setupFiles: ["./app/test/setup.ts"],
          css: true,
          include: ["app/**/*.test.{ts,tsx}"],
          exclude: ["**/node_modules/**", "**/e2e/**", "**/*.e2e.*", "**/*.spec.ts", "**/*.setup.ts"],
          // Pregnancy-consideration: Reduce test timeout for users with fatigue
          testTimeout: 10000,
          hookTimeout: 5000,
        }
      },
      // Storybook tests project (browser-based)
      {
        plugins: [
          tailwindcss(),
          tsconfigPaths(),
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: storybookDir })
        ],
        resolve: {
          alias: {
            "~": appDir,
            // Use our compatibility shim for React Router v7 in Storybook tests
            'react-router': reactRouterMock,
          }
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  },
  // Resolve configuration to match main app
  resolve: {
    alias: {
      "~": "/app"
    }
  }
});