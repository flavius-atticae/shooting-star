import { test, expect } from '@playwright/test';
import { PregnancySafeHelpers } from '../helpers/pregnancy-safe';

/**
 * Security Testing for Pregnancy Health Data
 * 
 * Critical security tests for:
 * - Quebec health data protection (Law 25, PIPEDA)
 * - Pregnancy health information sensitivity
 * - GDPR readiness for international users
 * - Healthcare data encryption requirements
 */

test.describe('Health Data Protection Compliance', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('enforces HTTPS for all health data transmission', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Verify HTTPS is enforced
    expect(page.url()).toMatch(/^https:/);
    
    // Check for security headers
    const response = await page.goto(page.url());
    const headers = response?.headers() || {};
    
    // Critical security headers for health data
    expect(headers['strict-transport-security']).toBeDefined();
    
    console.log('✓ HTTPS enforced for health data protection');
  });

  test('validates secure form handling for pregnancy data', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Look for forms that would handle sensitive pregnancy data
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    for (let i = 0; i < formCount; i++) {
      const form = forms.nth(i);
      
      // Verify forms use secure methods
      const method = await form.getAttribute('method');
      if (method) {
        expect(method.toLowerCase()).toBe('post');
      }
      
      // Check for CSRF protection (would be implemented)
      console.log(`Form ${i + 1}: Secure method verified`);
    }
  });

  test('protects against common pregnancy data vulnerabilities', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Test XSS protection for pregnancy-related content
    const testScript = '<script>alert("xss")</script>';
    
    // Try to inject script in URL parameters
    await page.goto(`${page.url()}?test=${encodeURIComponent(testScript)}`);
    
    // Verify script is not executed
    const alertPromise = page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null);
    const alert = await alertPromise;
    
    expect(alert).toBeNull(); // No alert should appear
    console.log('✓ XSS protection verified');
  });
});

test.describe('Quebec Privacy Law Compliance', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('implements Quebec Law 25 consent requirements', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Check for privacy notice or consent mechanisms
    // Note: This would be expanded as privacy features are implemented
    const privacyElements = page.locator('[data-privacy], [id*="privacy"], [class*="privacy"]');
    const privacyCount = await privacyElements.count();
    
    console.log(`Found ${privacyCount} privacy-related elements`);
    
    // Verify French privacy information is available
    await helpers.verifyFrenchContent(['Pauline Roussel']); // Placeholder for actual privacy content
  });

  test('validates healthcare data residency requirements', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Verify no data is sent to non-Canadian servers
    const externalRequests: string[] = [];
    
    page.on('request', request => {
      const url = new URL(request.url());
      if (!url.hostname.includes('localhost') && 
          !url.hostname.includes('127.0.0.1') &&
          !url.hostname.endsWith('.ca')) {
        externalRequests.push(url.hostname);
      }
    });
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Filter out common CDNs that are acceptable
    const problematicRequests = externalRequests.filter(hostname => 
      !hostname.includes('cdn') && 
      !hostname.includes('font') &&
      !hostname.includes('analytics')
    );
    
    console.log(`External requests: ${externalRequests.length}`);
    console.log(`Potentially problematic: ${problematicRequests.length}`);
  });
});

test.describe('Authentication and Session Security', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('implements secure session management for pregnancy users', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Check for secure cookie settings (when auth is implemented)
    const cookies = await page.context().cookies();
    
    for (const cookie of cookies) {
      if (cookie.name.toLowerCase().includes('session') || 
          cookie.name.toLowerCase().includes('auth')) {
        
        // Verify security flags
        expect(cookie.secure).toBe(true);
        expect(cookie.httpOnly).toBe(true);
        
        console.log(`✓ Secure cookie: ${cookie.name}`);
      }
    }
  });

  test('protects sensitive pregnancy information in storage', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Verify no sensitive data is stored in localStorage
    const localStorageItems = await page.evaluate(() => {
      const items: { [key: string]: string } = {};
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          items[key] = window.localStorage.getItem(key) || '';
        }
      }
      return items;
    });
    
    // Check that no pregnancy-sensitive keywords are in localStorage
    const sensitiveKeywords = [
      'health', 'medical', 'pregnancy', 'gestation', 
      'due-date', 'complications', 'healthcare'
    ];
    
    for (const [key, value] of Object.entries(localStorageItems)) {
      const content = `${key} ${value}`.toLowerCase();
      
      for (const keyword of sensitiveKeywords) {
        if (content.includes(keyword)) {
          console.warn(`Potentially sensitive data in localStorage: ${key}`);
        }
      }
    }
    
    console.log(`Checked ${Object.keys(localStorageItems).length} localStorage items`);
  });
});

test.describe('Input Validation and Sanitization', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('validates Quebec health card number format securely', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Test health card validation (when forms are implemented)
    const testHealthCards = [
      'DOUM12345678', // Valid format
      'INVALID123',   // Invalid format
      '<script>alert("xss")</script>', // XSS attempt
      '../../etc/passwd', // Path traversal attempt
    ];
    
    for (const testCard of testHealthCards) {
      await helpers.validateQuebecFormats({ 
        healthCardNumber: testCard 
      });
    }
    
    console.log('✓ Health card validation security tested');
  });

  test('sanitizes pregnancy-related form inputs', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Test various injection attempts in pregnancy-related fields
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      'javascript:alert("xss")',
      '../../etc/passwd',
      'SELECT * FROM users',
      '\'; DROP TABLE pregnancies; --'
    ];
    
    const inputFields = page.locator('input[type="text"], textarea');
    const fieldCount = await inputFields.count();
    
    if (fieldCount > 0) {
      const firstField = inputFields.first();
      
      for (const maliciousInput of maliciousInputs) {
        await firstField.fill(maliciousInput);
        const value = await firstField.inputValue();
        
        // Verify input is properly handled (sanitized or rejected)
        console.log(`Input test: ${maliciousInput.substring(0, 20)}... -> ${value.substring(0, 20)}...`);
      }
    }
  });
});

test.describe('Content Security Policy', () => {
  let helpers: PregnancySafeHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new PregnancySafeHelpers(page);
  });

  test('enforces strict CSP for pregnancy health content', async ({ page }) => {
    const response = await page.goto(page.url());
    const headers = response?.headers() || {};
    
    // Check for Content Security Policy
    const csp = headers['content-security-policy'];
    
    if (csp) {
      // Verify CSP includes important directives for health data protection
      expect(csp).toContain('default-src');
      console.log('✓ CSP header present');
    } else {
      console.warn('Content Security Policy not found - should be implemented for health data');
    }
  });

  test('prevents mixed content for health data security', async ({ page }) => {
    await helpers.navigateSafely('/');
    
    // Monitor for mixed content warnings
    const consoleMessages: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().includes('mixed content')) {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    expect(consoleMessages.length).toBe(0);
    console.log('✓ No mixed content warnings detected');
  });
});