import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(dirname, 'app');
const storybookDir = path.join(dirname, '.storybook');

// Vitest configuration with Storybook integration
// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    storybookTest({ configDir: storybookDir })
  ],
  optimizeDeps: {
    include: ['react/jsx-dev-runtime']
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: 'chromium' }]
    },
    exclude: [
      '**/node_modules/**',
      '**/e2e/**',
      '**/*.e2e.*',
      '**/*.spec.ts'
    ],
    globals: true,
    setupFiles: ['./.storybook/vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '~': appDir
    }
  }
});