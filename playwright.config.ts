import { defineConfig, devices } from '@playwright/test';

/**
 * Pregnancy-Safe Playwright Configuration
 * 
 * This configuration prioritizes:
 * - Mobile-first testing (pregnancy device usage patterns)
 * - Accessibility validation
 * - Performance monitoring
 * - Cross-browser compatibility for diverse user bases
 * - Quebec market considerations (French language support)
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
    // Accessibility reporter for pregnancy-safe compliance
    ['line'],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for tests */
    baseURL: 'http://localhost:5173',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure for pregnancy-safe UI debugging */
    screenshot: 'only-on-failure',
    
    /* Video recording for complex user journey analysis */
    video: 'retain-on-failure',
    
    /* Pregnancy-safe timeout considerations */
    actionTimeout: 15000, // Increased for users with pregnancy fatigue
    navigationTimeout: 30000, // Allow slower network during medical appointments
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    
    // Mobile-first approach (most pregnant users on mobile)
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'], // Popular Android device
        // Pregnancy-specific mobile considerations
        locale: 'fr-CA', // Quebec French
        timezoneId: 'America/Montreal',
        geolocation: { longitude: -73.567256, latitude: 45.501689 }, // Montreal
        permissions: ['geolocation'], // For finding nearby yoga studios
      },
      dependencies: ['setup'],
    },
    
    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12 Pro'], // Popular iOS device for pregnancy apps
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
        geolocation: { longitude: -73.567256, latitude: 45.501689 },
        permissions: ['geolocation'],
      },
      dependencies: ['setup'],
    },

    // Tablet testing (common for pregnancy planning)
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Pro'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },

    // Desktop browsers (medical professionals, partners)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        locale: 'fr-CA',
        timezoneId: 'America/Montreal',
      },
      dependencies: ['setup'],
    },

    // Accessibility testing with specific considerations
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        // Simulate pregnancy-related accessibility needs
        contextOptions: {
          reducedMotion: 'reduce', // Prevent nausea
        },
        colorScheme: 'light', // Better for pregnancy fatigue
        // Force prefers-contrast: more for better readability
        extraHTTPHeaders: {
          'User-Agent': 'Pregnancy-Safe-Testing-Agent',
        },
      },
      dependencies: ['setup'],
    },

    // Performance testing on slower devices (pregnancy brain fog considerations)
    {
      name: 'slow-network',
      use: {
        ...devices['Desktop Chrome'],
        // Simulate slower mobile data during medical appointments
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor'],
        },
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    /* Increased timeout for pregnancy-safe app startup */
    timeout: 180 * 1000, // 3 minutes
  },

  /* Global test timeout - accounting for pregnancy-related slower interactions */
  timeout: 60 * 1000, // 1 minute per test

  /* Expect timeout for individual assertions */
  expect: {
    /* Timeout for expect() assertions - pregnancy-safe */
    timeout: 10 * 1000, // 10 seconds
  },
});