import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 *
 * - Mobile-first and desktop browser testing
 * - Accessibility validation
 * - Performance monitoring
 * - Cross-browser compatibility
 * - French (fr-CA) locale support
 */
export default defineConfig({
  testDir: './app/test/e2e',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-results.json' }],
    ['line'],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for tests */
    baseURL: 'http://localhost:5173',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure for debugging */
    screenshot: 'only-on-failure',
    
    /* Video recording for complex user journey analysis */
    video: 'retain-on-failure',
    
    /* Timeout for user actions and navigation */
    actionTimeout: 15000, // 15s — generous margin for CI variability
    navigationTimeout: 30000, // 30s — accounts for SSR cold starts
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    
    // Desktop browser (primary testing)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },

    // Mobile testing (primary target audience)
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
        geolocation: { longitude: -73.567256, latitude: 45.501689 }, // Montreal
        permissions: ['geolocation'],
      },
      dependencies: ['setup'],
    },

    // Accessibility testing
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    /* Allow extra time for dev server startup in CI */
    timeout: 180 * 1000, // 3 minutes
  },

  /* Global test timeout */
  timeout: 60 * 1000, // 1 minute per test

  /* Expect timeout for individual assertions */
  expect: {
    /* Timeout for expect() assertions */
    timeout: 10 * 1000, // 10 seconds
  },
});