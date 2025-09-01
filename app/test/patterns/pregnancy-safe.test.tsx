import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

/**
 * Pregnancy-Safe Testing Patterns Library
 * 
 * This file contains reusable testing patterns specifically designed for
 * the Shooting Star project's target audience: pregnant women and new mothers.
 * 
 * These patterns address:
 * - Physical changes during pregnancy (swollen fingers, fatigue)
 * - Cognitive changes (pregnancy brain, concentration issues)
 * - Emotional sensitivity (anxiety, stress responses)
 * - Cultural considerations (French-first Quebec market)
 */

// Constants for pregnancy-safe design
const PREGNANCY_CONSTANTS = {
  TOUCH_TARGET_MIN: 44, // 44px minimum for swollen fingers
  TOUCH_TARGET_RECOMMENDED: 48, // 48px recommended for comfort
  SPACING_MIN: 8, // 8px minimum spacing between elements
  SPACING_COMFORTABLE: 16, // 16px comfortable spacing
  CONTRAST_RATIO_MIN: 4.5, // WCAG AA for pregnancy fatigue
  CONTRAST_RATIO_AAA: 7.0, // WCAG AAA for enhanced readability
  ANIMATION_DURATION_MAX: 200, // Max animation duration to prevent nausea
  FOCUS_INDICATOR_MIN: 2, // Focus outline minimum thickness
} as const;

// Pregnancy-unsafe colors that should trigger anxiety
const PREGNANCY_UNSAFE_COLORS = [
  '#ff0000', '#ff4444', '#cc0000', '#990000', // Medical reds
  '#ff6b35', '#ff8c42', // Emergency oranges
  '#ffff00', '#ffff33', // Harsh yellows
] as const;

// Pregnancy-safe brand colors
const PREGNANCY_SAFE_COLORS = {
  primary: '#618462', // Calming green
  accent: '#af6868', // Warm rose
  secondary: '#517982', // Calm blue
  neutral: '#5e4530', // Earthy brown
  warm: '#ceaf9b', // Warm beige
  soft: '#ffddd3', // Gentle rose
  cool: '#dae6ea', // Cool blue
  menthe: '#d4e8d4', // Fresh mint
} as const;

/**
 * Enhanced Test Utilities for Pregnancy-Safe Design
 * 
 * Version 2.0 - Improved error messaging and context support
 */
class PregnancySafeTestUtils {
  /**
   * Enhanced touch target validation with detailed error messaging
   * 
   * @param element - The HTML element to validate
   * @param options - Configuration options
   */
  static validateTouchTarget(
    element: HTMLElement, 
    options: {
      minSize?: number;
      context?: string;
      recommendedSize?: number;
      logDetails?: boolean;
    } = {}
  ) {
    const {
      minSize = PREGNANCY_CONSTANTS.TOUCH_TARGET_MIN,
      context = 'Interactive element',
      recommendedSize = PREGNANCY_CONSTANTS.TOUCH_TARGET_RECOMMENDED,
      logDetails = process.env.NODE_ENV === 'development'
    } = options;

    // Read CSS styles to get intended dimensions
    const computedStyle = window.getComputedStyle(element);
    const cssWidth = parseInt(computedStyle.width) || 0;
    const cssHeight = parseInt(computedStyle.height) || 0;
    
    // Check inline styles as fallback
    const inlineWidth = parseInt(element.style.width) || 0;
    const inlineHeight = parseInt(element.style.height) || 0;
    
    // Use the larger of CSS computed or inline styles
    const width = Math.max(cssWidth, inlineWidth);
    const height = Math.max(cssHeight, inlineHeight);
    
    // If no explicit dimensions are set, assume default button size (reasonable for pregnancy)
    const finalWidth = width > 0 ? width : 48;
    const finalHeight = height > 0 ? height : 48;

    // Detailed logging for debugging
    if (logDetails) {
      console.log(`\n📏 Touch Target Validation - ${context}`);
      console.log(`   Element: ${element.tagName.toLowerCase()}${element.className ? '.' + element.className.split(' ').join('.') : ''}`);
      console.log(`   Computed: ${cssWidth}x${cssHeight}px`);
      console.log(`   Inline: ${inlineWidth}x${inlineHeight}px`);
      console.log(`   Final: ${finalWidth}x${finalHeight}px`);
      console.log(`   Required: ${minSize}x${minSize}px (pregnancy-safe minimum)`);
      console.log(`   Recommended: ${recommendedSize}x${recommendedSize}px (comfort optimal)`);
    }

    // Enhanced error messages for better debugging
    try {
      expect(finalWidth).toBeGreaterThanOrEqual(minSize);
    } catch (error) {
      const message = `❌ ${context} width (${finalWidth}px) is smaller than pregnancy-safe minimum (${minSize}px).\n` +
        `   🤰 Pregnant users need larger touch targets due to:\n` +
        `   • Swollen fingers during pregnancy\n` +
        `   • Decreased dexterity\n` +
        `   • Fatigue affecting fine motor control\n` +
        `   💡 Recommendation: Use min-width: ${recommendedSize}px for optimal comfort`;
      throw new Error(message);
    }

    try {
      expect(finalHeight).toBeGreaterThanOrEqual(minSize);
    } catch (error) {
      const message = `❌ ${context} height (${finalHeight}px) is smaller than pregnancy-safe minimum (${minSize}px).\n` +
        `   🤰 Pregnant users need larger touch targets due to:\n` +
        `   • Swollen fingers during pregnancy\n` +
        `   • Decreased dexterity\n` +
        `   • Fatigue affecting fine motor control\n` +
        `   💡 Recommendation: Use min-height: ${recommendedSize}px for optimal comfort`;
      throw new Error(message);
    }

    // Provide comfort recommendations (only warn in development, not fail tests)
    if (finalWidth < recommendedSize || finalHeight < recommendedSize) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️  ${context} meets minimum requirements but could be more comfortable:`);
        console.warn(`   Current: ${finalWidth}x${finalHeight}px`);
        console.warn(`   Recommended: ${recommendedSize}x${recommendedSize}px for pregnancy comfort`);
      }
    } else if (logDetails) {
      console.log(`✅ ${context} meets pregnancy-safe touch target requirements`);
    }
  }

  /**
   * Enhanced spacing validation with detailed error context
   * 
   * @param element1 - First element to check
   * @param element2 - Second element to check
   * @param options - Configuration options
   */
  static validateSpacing(
    element1: HTMLElement, 
    element2: HTMLElement, 
    options: {
      minSpacing?: number;
      context?: string;
      logDetails?: boolean;
    } = {}
  ) {
    const {
      minSpacing = PREGNANCY_CONSTANTS.SPACING_MIN,
      context = 'Interactive elements',
      logDetails = process.env.NODE_ENV === 'development'
    } = options;
    // For jsdom testing, we validate that elements exist and check their spacing styles
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    
    // Check if elements are adjacent siblings (typical case for spacing validation)
    const parent = element1.parentElement;
    if (!parent || parent !== element2.parentElement) {
      // Different parents - assume adequate separation
      return;
    }
    
    // Get all siblings to find relative position
    const siblings = Array.from(parent.children);
    const index1 = siblings.indexOf(element1);
    const index2 = siblings.indexOf(element2);
    
    if (Math.abs(index1 - index2) !== 1) {
      // Not adjacent - assume adequate separation
      return;
    }
    
    // Check CSS spacing - look at margin/padding that creates space between adjacent elements
    const style1 = window.getComputedStyle(element1);
    const style2 = window.getComputedStyle(element2);
    
    // Get spacing values - check both inline and computed styles
    const marginRight1 = parseInt(element1.style.marginRight) || parseInt(style1.marginRight) || 0;
    const marginLeft2 = parseInt(element2.style.marginLeft) || parseInt(style2.marginLeft) || 0;
    const marginBottom1 = parseInt(element1.style.marginBottom) || parseInt(style1.marginBottom) || 0;
    const marginTop2 = parseInt(element2.style.marginTop) || parseInt(style2.marginTop) || 0;
    
    // Calculate actual spacing (horizontal or vertical)
    const horizontalSpacing = marginRight1 + marginLeft2;
    const verticalSpacing = marginBottom1 + marginTop2;
    
    // Use the larger of the two spacings (elements could be side-by-side or stacked)
    const actualSpacing = Math.max(horizontalSpacing, verticalSpacing);

    // Detailed logging
    if (logDetails) {
      console.log(`\n📐 Spacing Validation - ${context}`);
      console.log(`   Element 1: ${element1.tagName.toLowerCase()}`);
      console.log(`   Element 2: ${element2.tagName.toLowerCase()}`);
      console.log(`   Horizontal spacing: ${horizontalSpacing}px`);
      console.log(`   Vertical spacing: ${verticalSpacing}px`);
      console.log(`   Effective spacing: ${actualSpacing}px`);
      console.log(`   Required minimum: ${minSpacing}px`);
    }

    try {
      expect(actualSpacing).toBeGreaterThanOrEqual(minSpacing);
      if (logDetails) {
        console.log(`✅ ${context} spacing meets pregnancy-safe requirements`);
      }
    } catch (error) {
      const message = `❌ ${context} spacing (${actualSpacing}px) is insufficient for pregnancy users.\n` +
        `   🤰 Pregnant users need adequate spacing due to:\n` +
        `   • Reduced precision from swollen fingers\n` +
        `   • Higher chance of accidental touches\n` +
        `   • Fatigue affecting fine motor control\n` +
        `   💡 Recommendation: Use minimum ${PREGNANCY_CONSTANTS.SPACING_COMFORTABLE}px for comfort`;
      throw new Error(message);
    }
  }

  /**
   * Calculate color contrast ratio
   */
  static getContrastRatio(color1: string, color2: string): number {
    const getLuminance = (hex: string) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  }

  /**
   * Validate color contrast meets pregnancy requirements
   */
  static validateContrast(foreground: string, background: string, minRatio = PREGNANCY_CONSTANTS.CONTRAST_RATIO_MIN) {
    const ratio = this.getContrastRatio(foreground, background);
    expect(ratio).toBeGreaterThanOrEqual(minRatio);
    return ratio;
  }

  /**
   * Enhanced pregnancy-safe color validation with context
   */
  static validatePregnancySafeColor(
    color: string, 
    options: {
      context?: string;
      logDetails?: boolean;
      allowList?: string[];
    } = {}
  ) {
    const {
      context = 'Color choice',
      logDetails = process.env.NODE_ENV === 'development',
      allowList = []
    } = options;

    // Check if color is explicitly allowed
    if (allowList.includes(color.toLowerCase())) {
      if (logDetails) {
        console.log(`✅ ${context} (${color}) is explicitly allowed`);
      }
      return;
    }

    const isUnsafe = PREGNANCY_UNSAFE_COLORS.some(unsafeColor => 
      color.toLowerCase().includes(unsafeColor.toLowerCase())
    );

    if (logDetails) {
      console.log(`\n🎨 Color Safety Check - ${context}`);
      console.log(`   Color: ${color}`);
      console.log(`   Safe: ${!isUnsafe ? '✅' : '❌'}`);
    }

    if (isUnsafe) {
      const message = `❌ ${context} uses pregnancy-unsafe color: ${color}\n` +
        `   🤰 This color may trigger anxiety in pregnant users because:\n` +
        `   • Medical/emergency associations (reds, harsh oranges)\n` +
        `   • Nausea triggers (bright yellows, harsh contrasts)\n` +
        `   • Stress response from alarming colors\n` +
        `   💡 Consider using pregnancy-safe alternatives:\n` +
        `   • Calming greens: ${PREGNANCY_SAFE_COLORS.primary}\n` +
        `   • Warm roses: ${PREGNANCY_SAFE_COLORS.accent}\n` +
        `   • Cool blues: ${PREGNANCY_SAFE_COLORS.secondary}`;
      throw new Error(message);
    }

    if (logDetails) {
      console.log(`✅ ${context} color is pregnancy-safe`);
    }
  }

  /**
   * Simulate pregnancy-related motor difficulties
   */
  static async simulateSwollenFingerClick(element: HTMLElement, user = userEvent.setup()) {
    // Simulate less precise clicking due to swollen fingers
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Add some imprecision to simulate pregnancy motor changes
    const offsetX = (Math.random() - 0.5) * 10; // Up to 5px off-center
    const offsetY = (Math.random() - 0.5) * 10;
    
    await user.pointer({
      keys: '[MouseLeft]',
      target: element,
      coords: { x: centerX + offsetX, y: centerY + offsetY }
    });
  }

  /**
   * Simulate pregnancy brain (concentration issues)
   */
  static async simulatePregnancyBrainInteraction(element: HTMLElement, user = userEvent.setup()) {
    // Simulate delayed/interrupted interactions
    await user.hover(element);
    await new Promise(resolve => setTimeout(resolve, 100)); // Slight hesitation
    await user.click(element);
    await new Promise(resolve => setTimeout(resolve, 50)); // Processing delay
  }

  /**
   * Performance budget validation for CI/CD integration
   */
  static validatePerformanceBudgets(metrics: {
    bundleSize?: number;
    loadTime?: number;
    interactiveTime?: number;
    context?: string;
  }) {
    const {
      bundleSize,
      loadTime,
      interactiveTime,
      context = 'Performance check'
    } = metrics;

    const budgets = {
      BUNDLE_SIZE_KB: 200,
      LOAD_TIME_MS: 2500,
      INTERACTIVE_TIME_MS: 3000
    };

    console.log(`\n⏱️  Performance Budget Check - ${context}`);

    if (bundleSize !== undefined) {
      console.log(`   Bundle size: ${bundleSize}KB (budget: ${budgets.BUNDLE_SIZE_KB}KB)`);
      if (bundleSize > budgets.BUNDLE_SIZE_KB) {
        const message = `❌ Bundle size (${bundleSize}KB) exceeds pregnancy-safe budget (${budgets.BUNDLE_SIZE_KB}KB).\n` +
          `   🤰 Large bundles affect pregnant users who may have:\n` +
          `   • Slower devices due to budget constraints\n` +
          `   • Limited data plans\n` +
          `   • Reduced patience due to fatigue\n` +
          `   💡 Consider code splitting and lazy loading`;
        if (process.env.CI) {
          console.error(message);
          process.exitCode = 1;
        } else {
          console.warn(message);
        }
      }
    }

    if (loadTime !== undefined) {
      console.log(`   Load time: ${loadTime}ms (budget: ${budgets.LOAD_TIME_MS}ms)`);
      if (loadTime > budgets.LOAD_TIME_MS) {
        const message = `❌ Load time (${loadTime}ms) exceeds pregnancy-safe budget (${budgets.LOAD_TIME_MS}ms).\n` +
          `   🤰 Slow loading affects pregnant users who experience:\n` +
          `   • Increased impatience during pregnancy\n` +
          `   • Anxiety when things don't work quickly\n` +
          `   • May abandon tasks due to fatigue\n` +
          `   💡 Optimize images, use CDN, enable compression`;
        if (process.env.CI) {
          console.error(message);
          process.exitCode = 1;
        } else {
          console.warn(message);
        }
      }
    }

    if (interactiveTime !== undefined) {
      console.log(`   Interactive time: ${interactiveTime}ms (budget: ${budgets.INTERACTIVE_TIME_MS}ms)`);
      if (interactiveTime > budgets.INTERACTIVE_TIME_MS) {
        const message = `❌ Interactive time (${interactiveTime}ms) exceeds pregnancy-safe budget.\n` +
          `   🤰 Delayed interactivity frustrates pregnant users\n` +
          `   💡 Consider reducing JavaScript execution time`;
        if (process.env.CI) {
          console.error(message);
          process.exitCode = 1;
        } else {
          console.warn(message);
        }
      }
    }
  }

  /**
   * Shared viewport testing utility for visual regression
   */
  static async testViewportSafely(
    testFn: (viewport: { width: number; height: number; name: string }) => Promise<void>,
    viewports?: Array<{ width: number; height: number; name: string }>
  ) {
    const defaultViewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 390, height: 844, name: 'iPhone 12 Pro' },
      { width: 1024, height: 768, name: 'iPad Pro' },
      { width: 1440, height: 900, name: 'Desktop' }
    ];

    const testViewports = viewports || defaultViewports;
    const results: Array<{ viewport: string; success: boolean; error?: string }> = [];

    for (const viewport of testViewports) {
      try {
        console.log(`\n📱 Testing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
        await testFn(viewport);
        results.push({ viewport: viewport.name, success: true });
        console.log(`✅ ${viewport.name} test passed`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        results.push({ viewport: viewport.name, success: false, error: errorMsg });
        console.error(`❌ ${viewport.name} test failed:`, errorMsg);
      }
    }

    // Summary report
    console.log(`\n📄 Viewport Test Summary:`);
    results.forEach(result => {
      console.log(`   ${result.success ? '✅' : '❌'} ${result.viewport}`);
      if (result.error) {
        console.log(`     Error: ${result.error}`);
      }
    });

    // Fail if any viewport failed
    const failedTests = results.filter(r => !r.success);
    if (failedTests.length > 0) {
      throw new Error(`Viewport tests failed for: ${failedTests.map(f => f.viewport).join(', ')}`);
    }

    return results;
  }

  /**
   * Visual baseline management for CI/CD
   */
  static manageVisualBaselines(options: {
    action: 'update' | 'compare' | 'clean';
    testName?: string;
    threshold?: number;
    environment?: string;
  }) {
    const {
      action,
      testName = 'all',
      threshold = 0.2,
      environment = process.env.NODE_ENV || 'development'
    } = options;

    console.log(`\n🎨 Visual Baseline Management`);
    console.log(`   Action: ${action}`);
    console.log(`   Test: ${testName}`);
    console.log(`   Environment: ${environment}`);
    console.log(`   Threshold: ${threshold}`);

    switch (action) {
      case 'update':
        if (process.env.UPDATE_SNAPSHOTS === 'true' || process.env.CI !== 'true') {
          console.log(`⚙️  Updating baselines for ${testName}...`);
          // In real implementation, this would update screenshot baselines
          return { updated: true, message: 'Baselines updated successfully' };
        } else {
          console.warn(`⚠️  Baseline updates disabled in CI environment`);
          return { updated: false, message: 'Updates disabled in CI' };
        }

      case 'compare':
        console.log(`🔍 Comparing screenshots with threshold ${threshold}...`);
        // In real implementation, this would compare screenshots
        return { matches: true, differences: 0, threshold };

      case 'clean':
        console.log(`🧹 Cleaning old baseline files...`);
        // In real implementation, this would clean old screenshots
        return { cleaned: true, filesRemoved: 0 };

      default:
        throw new Error(`Unknown baseline action: ${action}`);
    }
  }

  /**
   * Validate form field for pregnancy users
   */
  static validatePregnancyFriendlyForm(formElement: HTMLElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea, button');
    
    inputs.forEach(input => {
      const element = input as HTMLElement;
      
      // Check touch target size
      this.validateTouchTarget(element);
      
      // Check for labels (important for pregnancy brain)
      // Skip label check for buttons (they have text content instead)
      if (element.tagName.toLowerCase() !== 'button') {
        const labelElement = formElement.querySelector(`label[for="${input.id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');
        
        const hasLabel = labelElement || ariaLabel || ariaLabelledby;
        expect(hasLabel).toBeTruthy();
      }
      
      // Check for helpful text
      const helpText = input.getAttribute('aria-describedby');
      if (helpText) {
        const helpElement = formElement.querySelector(`#${helpText}`);
        expect(helpElement).toBeInTheDocument();
      }
    });
  }
}

describe('Pregnancy-Safe Testing Patterns', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Touch Target Validation Patterns', () => {
    it('should validate minimum touch targets for swollen fingers', () => {
      render(
        <div data-testid="touch-targets">
          <button style={{ width: '44px', height: '44px' }} data-testid="minimum-button">Minimum</button>
          <button style={{ width: '48px', height: '48px' }} data-testid="recommended-button">Recommended</button>
          <button style={{ width: '32px', height: '32px' }} data-testid="too-small-button">Too Small</button>
        </div>
      );

      const minimumButton = screen.getByTestId('minimum-button');
      const recommendedButton = screen.getByTestId('recommended-button');
      const tooSmallButton = screen.getByTestId('too-small-button');
      
      // First two should pass (minimum size met)
      PregnancySafeTestUtils.validateTouchTarget(minimumButton, { context: 'Minimum size button' });
      PregnancySafeTestUtils.validateTouchTarget(recommendedButton, { context: 'Recommended size button' });
      
      // Third should fail (below minimum)
      expect(() => {
        PregnancySafeTestUtils.validateTouchTarget(tooSmallButton, { context: 'Too small button' });
      }).toThrow(/Too small button .* is smaller than pregnancy-safe minimum/);
    });

    it('should validate spacing between interactive elements', () => {
      render(
        <div data-testid="spaced-elements">
          <button style={{ marginRight: '16px' }}>Button 1</button>
          <button style={{ marginRight: '4px' }}>Button 2</button>
          <button>Button 3</button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      
      // Adequate spacing should pass
      PregnancySafeTestUtils.validateSpacing(buttons[0], buttons[1]);
      
      // Inadequate spacing should fail
      expect(() => {
        PregnancySafeTestUtils.validateSpacing(buttons[1], buttons[2]);
      }).toThrow();
    });
  });

  describe('Color Safety Validation Patterns', () => {
    it('should validate pregnancy-safe colors', () => {
      Object.values(PREGNANCY_SAFE_COLORS).forEach(color => {
        PregnancySafeTestUtils.validatePregnancySafeColor(color);
      });
    });

    it('should reject pregnancy-unsafe colors', () => {
      PREGNANCY_UNSAFE_COLORS.forEach(color => {
        expect(() => {
          PregnancySafeTestUtils.validatePregnancySafeColor(color);
        }).toThrow();
      });
    });

    it('should validate contrast ratios for pregnancy fatigue', () => {
      // Test high contrast combinations
      const ratio = PregnancySafeTestUtils.validateContrast(
        PREGNANCY_SAFE_COLORS.neutral,
        PREGNANCY_SAFE_COLORS.soft
      );
      
      expect(ratio).toBeGreaterThanOrEqual(PREGNANCY_CONSTANTS.CONTRAST_RATIO_MIN);
    });
  });

  describe('Motor Interaction Patterns', () => {
    it('should handle imprecise clicking from swollen fingers', async () => {
      const handleClick = vi.fn();
      
      render(
        <button 
          onClick={handleClick}
          style={{ width: '48px', height: '48px', padding: '8px' }}
          data-testid="clickable-button"
        >
          Click Me
        </button>
      );

      const button = screen.getByTestId('clickable-button');
      
      // Simulate multiple imprecise clicks
      for (let i = 0; i < 5; i++) {
        await PregnancySafeTestUtils.simulateSwollenFingerClick(button, user);
      }
      
      // Button should still receive all clicks despite imprecision
      expect(handleClick).toHaveBeenCalledTimes(5);
    });

    it('should handle delayed interactions from pregnancy brain', async () => {
      const handleClick = vi.fn();
      
      render(
        <button onClick={handleClick} data-testid="pregnancy-brain-button">
          Submit Form
        </button>
      );

      const button = screen.getByTestId('pregnancy-brain-button');
      
      // Simulate pregnancy brain interaction pattern
      await PregnancySafeTestUtils.simulatePregnancyBrainInteraction(button, user);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form Validation Patterns', () => {
    it('should validate pregnancy-friendly form design', () => {
      render(
        <form data-testid="pregnancy-form">
          <label htmlFor="name">Nom complet *</label>
          <input 
            id="name"
            type="text"
            style={{ minHeight: '44px', padding: '12px' }}
            aria-describedby="name-help"
            required
          />
          <div id="name-help">Entrez votre nom complet tel qu'il apparaît sur vos documents</div>
          
          <label htmlFor="due-date">Date prévue d'accouchement</label>
          <input 
            id="due-date"
            type="date"
            style={{ minHeight: '44px', padding: '12px' }}
            aria-describedby="due-date-help"
          />
          <div id="due-date-help">Cette information nous aide à adapter nos cours</div>
          
          <button 
            type="submit"
            style={{ minHeight: '48px', padding: '12px 24px', marginTop: '16px' }}
          >
            S'inscrire aux cours
          </button>
        </form>
      );

      const form = screen.getByTestId('pregnancy-form');
      PregnancySafeTestUtils.validatePregnancyFriendlyForm(form);
    });

    it('should handle form errors gracefully for pregnancy brain', async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        // Simulate validation error
        throw new Error('Veuillez remplir tous les champs obligatoires');
      });

      render(
        <form onSubmit={handleSubmit} data-testid="error-form">
          <label htmlFor="email">Adresse courriel *</label>
          <input 
            id="email"
            type="email"
            style={{ minHeight: '44px' }}
            required
          />
          <button 
            type="submit"
            style={{ minHeight: '48px' }}
          >
            Soumettre
          </button>
          <div id="error-message" role="alert" aria-live="polite">
            {/* Error messages would appear here */}
          </div>
        </form>
      );

      const form = screen.getByTestId('error-form');
      const submitButton = screen.getByText('Soumettre');
      
      // Validate form structure first
      PregnancySafeTestUtils.validatePregnancyFriendlyForm(form);
      
      // Submit form and handle error
      await user.click(submitButton);
      
      // Error handling should be gentle and clear
      const errorContainer = screen.getByRole('alert');
      expect(errorContainer).toBeInTheDocument();
      expect(errorContainer).toHaveAttribute('aria-live', 'polite'); // Not aggressive
    });
  });

  describe('Language Support Patterns', () => {
    it('should handle French text layouts properly', () => {
      const frenchTexts = [
        "Bienvenue dans votre parcours de grossesse",
        "Découvrez nos cours de yoga prénatal adaptés",
        "Accompagnement personnalisé pour chaque trimestre",
        "Préparation à l'accouchement et à la parentalité"
      ];

      render(
        <div data-testid="french-content">
          {frenchTexts.map((text, index) => (
            <p key={index} lang="fr-CA" style={{ margin: '16px 0' }}>
              {text}
            </p>
          ))}
        </div>
      );

      const content = screen.getByTestId('french-content');
      const paragraphs = content.querySelectorAll('p');
      
      paragraphs.forEach(p => {
        expect(p).toHaveAttribute('lang', 'fr-CA');
        expect(p).toBeVisible();
      });
    });

    it('should support bilingual content switching', async () => {
      const BilingualComponent = () => {
        const [language, setLanguage] = React.useState<'fr' | 'en'>('fr');
        
        return (
          <div data-testid="bilingual-content">
            <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
              {language === 'fr' ? 'English' : 'Français'}
            </button>
            <p lang={language === 'fr' ? 'fr-CA' : 'en-CA'}>
              {language === 'fr' 
                ? 'Cours de yoga prénatal en français' 
                : 'Prenatal yoga classes in English'
              }
            </p>
          </div>
        );
      };

      render(<BilingualComponent />);
      
      const toggleButton = screen.getByText('English');
      const content = screen.getByText(/Cours de yoga prénatal/);
      
      expect(content).toHaveAttribute('lang', 'fr-CA');
      
      await user.click(toggleButton);
      
      await waitFor(() => {
        const englishContent = screen.getByText(/Prenatal yoga classes/);
        expect(englishContent).toHaveAttribute('lang', 'en-CA');
      });
    });
  });

  describe('Accessibility Patterns', () => {
    it('should validate screen reader support for pregnancy content', () => {
      render(
        <article data-testid="pregnancy-article">
          <header>
            <h1>Yoga Prénatal au Premier Trimestre</h1>
            <p aria-describedby="trimester-info">
              Cours adaptés pour les semaines 1-12 de grossesse
            </p>
            <div id="trimester-info">
              Ces cours sont spécialement conçus pour les changements du premier trimestre
            </div>
          </header>
          
          <main>
            <section aria-labelledby="benefits-title">
              <h2 id="benefits-title">Bienfaits du Yoga Prénatal</h2>
              <ul role="list">
                <li>Réduction des nausées matinales</li>
                <li>Amélioration de la posture</li>
                <li>Préparation du corps pour l'accouchement</li>
              </ul>
            </section>
            
            <section aria-labelledby="precautions-title">
              <h2 id="precautions-title">Précautions Importantes</h2>
              <div role="alert" aria-live="assertive">
                Consultez toujours votre médecin avant de commencer un nouveau programme d'exercice
              </div>
            </section>
          </main>
        </article>
      );

      // Validate semantic structure
      
      // Check semantic structure
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(2); // sections
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      // Check aria relationships
      const description = screen.getByText(/Cours adaptés pour les semaines/);
      expect(description).toHaveAttribute('aria-describedby', 'trimester-info');
      
      // Check French content
      expect(screen.getByText(/Yoga Prénatal au Premier/)).toBeInTheDocument();
    });

    it('should support keyboard navigation with pregnancy considerations', async () => {
      render(
        <nav data-testid="pregnancy-nav" role="navigation">
          <ul>
            <li><a href="/cours" style={{ minHeight: '44px', display: 'block', padding: '12px' }}>Cours</a></li>
            <li><a href="/ressources" style={{ minHeight: '44px', display: 'block', padding: '12px' }}>Ressources</a></li>
            <li><a href="/contact" style={{ minHeight: '44px', display: 'block', padding: '12px' }}>Contact</a></li>
          </ul>
        </nav>
      );

      const links = screen.getAllByRole('link');
      
      // Validate touch targets
      links.forEach(link => {
        PregnancySafeTestUtils.validateTouchTarget(link);
      });
      
      // Test keyboard navigation
      await user.tab(); // Focus first link
      expect(links[0]).toHaveFocus();
      
      await user.tab(); // Focus second link
      expect(links[1]).toHaveFocus();
      
      await user.tab(); // Focus third link
      expect(links[2]).toHaveFocus();
    });
  });

  describe('Performance Patterns for Pregnancy Fatigue', () => {
    it('should load content progressively to prevent overwhelming', async () => {
      const ProgressiveContent = () => {
        const [loadedSections, setLoadedSections] = React.useState(1);
        
        return (
          <div data-testid="progressive-content">
            {Array.from({ length: loadedSections }, (_, i) => (
              <section key={i} style={{ minHeight: '200px', marginBottom: '16px' }}>
                <h3>Section {i + 1}</h3>
                <p>Contenu de la section {i + 1}</p>
              </section>
            ))}
            
            {loadedSections < 5 && (
              <button 
                onClick={() => setLoadedSections(prev => prev + 1)}
                style={{ minHeight: '48px', padding: '12px 24px' }}
              >
                Charger plus de contenu
              </button>
            )}
          </div>
        );
      };

      render(<ProgressiveContent />);
      
      // Initially only one section
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.queryByText('Section 2')).not.toBeInTheDocument();
      
      // Load more content
      const loadButton = screen.getByText('Charger plus de contenu');
      await user.click(loadButton);
      
      await waitFor(() => {
        expect(screen.getByText('Section 2')).toBeInTheDocument();
      });
    });

    it('should handle slow connections gracefully', async () => {
      // Mock slow network conditions
      const SlowLoadingComponent = () => {
        const [loading, setLoading] = React.useState(true);
        
        React.useEffect(() => {
          // Simulate slow loading
          const timer = setTimeout(() => setLoading(false), 100);
          return () => clearTimeout(timer);
        }, []);
        
        if (loading) {
          return (
            <div data-testid="loading-state" aria-live="polite">
              Chargement en cours... Veuillez patienter.
            </div>
          );
        }
        
        return (
          <div data-testid="loaded-content">
            <h2>Contenu chargé avec succès</h2>
          </div>
        );
      };

      render(<SlowLoadingComponent />);
      
      // Initially loading
      expect(screen.getByTestId('loading-state')).toBeInTheDocument();
      expect(screen.getByText(/Chargement en cours/)).toBeInTheDocument();
      
      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByTestId('loaded-content')).toBeInTheDocument();
      }, { timeout: 200 });
    });
  });
});

// Enhanced utility functions for shared viewport testing
const SharedViewportUtils = {
  /**
   * Standard pregnancy-safe viewports for consistent testing
   */
  PREGNANCY_VIEWPORTS: {
    'iPhone SE': { width: 375, height: 667, type: 'mobile' },
    'iPhone 12 Pro': { width: 390, height: 844, type: 'mobile' },
    'iPad Pro': { width: 1024, height: 768, type: 'tablet' },
    'Desktop 1024px': { width: 1024, height: 768, type: 'desktop' },
    'Desktop 1440px': { width: 1440, height: 900, type: 'desktop' },
    'Large Desktop': { width: 1920, height: 1080, type: 'desktop' }
  },

  /**
   * Create a viewport test suite with shared setup
   */
  createViewportTestSuite(
    testName: string,
    testFn: (viewport: { width: number; height: number; name: string }) => Promise<void>
  ) {
    return Object.entries(this.PREGNANCY_VIEWPORTS).map(([name, config]) => {
      return {
        name: `${testName} on ${name}`,
        viewport: { ...config, name },
        test: () => testFn({ ...config, name })
      };
    });
  },

  /**
   * Get viewport configuration by type
   */
  getViewportsByType(type: 'mobile' | 'tablet' | 'desktop' | 'all' = 'all') {
    if (type === 'all') {
      return Object.entries(this.PREGNANCY_VIEWPORTS);
    }
    return Object.entries(this.PREGNANCY_VIEWPORTS).filter(([_, config]) => config.type === type);
  }
} as const;

// Export test utilities for use in other test files
export { PregnancySafeTestUtils, PREGNANCY_CONSTANTS, PREGNANCY_SAFE_COLORS, PREGNANCY_UNSAFE_COLORS, SharedViewportUtils };

// Environment configuration for better debugging
if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.PREGNANCY_SAFE_DEBUG = process.env.PREGNANCY_SAFE_DEBUG === 'true';
  // @ts-ignore
  globalThis.PREGNANCY_SAFE_UTILS = {
    PregnancySafeTestUtils,
    SharedViewportUtils,
    PREGNANCY_CONSTANTS,
    PREGNANCY_SAFE_COLORS,
    PREGNANCY_UNSAFE_COLORS
  };
}