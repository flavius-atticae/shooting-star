import { test as baseTest } from '@playwright/test';
import type { Page } from '@playwright/test';
import { TEST_USERS } from '../helpers/constants';
import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';

/**
 * Test Fixtures for Pregnancy User Personas
 * 
 * Based on CLAUDE.md requirements:
 * - Marie: First pregnancy, French-speaking
 * - Sophie: Multiple children, bilingual  
 * - Alexandra: High-risk pregnancy, English-speaking
 */

type PersonaFixtures = {
  mariePersona: { page: Page; helpers: PregnancySafeHelpers; profile: typeof TEST_USERS.MARIE };
  sophiePersona: { page: Page; helpers: PregnancySafeHelpers; profile: typeof TEST_USERS.SOPHIE };
  alexandraPersona: { page: Page; helpers: PregnancySafeHelpers; profile: typeof TEST_USERS.ALEXANDRA };
};

export const test = baseTest.extend<PersonaFixtures>({
  mariePersona: async ({ page }, use) => {
    // Configure page for Marie's preferences
    await page.emulateMedia({ 
      reducedMotion: TEST_USERS.MARIE.preferences.reducedMotion ? 'reduce' : 'no-preference'
    });
    
    // Set Quebec French locale
    await page.setExtraHTTPHeaders({
      'Accept-Language': TEST_USERS.MARIE.preferences.language
    });

    const helpers = new PregnancySafeHelpers(page);
    
    await use({
      page,
      helpers,
      profile: TEST_USERS.MARIE
    });
  },

  sophiePersona: async ({ page }, use) => {
    // Configure page for Sophie's preferences (high contrast)
    await page.emulateMedia({ 
      reducedMotion: TEST_USERS.SOPHIE.preferences.reducedMotion ? 'reduce' : 'no-preference',
      forcedColors: TEST_USERS.SOPHIE.preferences.highContrast ? 'active' : 'none'
    });
    
    await page.setExtraHTTPHeaders({
      'Accept-Language': TEST_USERS.SOPHIE.preferences.language
    });

    const helpers = new PregnancySafeHelpers(page);
    
    await use({
      page,
      helpers,
      profile: TEST_USERS.SOPHIE
    });
  },

  alexandraPersona: async ({ page }, use) => {
    // Configure page for Alexandra's preferences (high-risk, accessibility needs)
    await page.emulateMedia({ 
      reducedMotion: TEST_USERS.ALEXANDRA.preferences.reducedMotion ? 'reduce' : 'no-preference',
      forcedColors: TEST_USERS.ALEXANDRA.preferences.highContrast ? 'active' : 'none'
    });
    
    // English-Canadian locale
    await page.setExtraHTTPHeaders({
      'Accept-Language': TEST_USERS.ALEXANDRA.preferences.language
    });

    const helpers = new PregnancySafeHelpers(page);
    
    await use({
      page,
      helpers,
      profile: TEST_USERS.ALEXANDRA
    });
  },
});

export { expect } from '@playwright/test';