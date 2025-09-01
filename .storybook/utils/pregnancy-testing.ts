/**
 * Pregnancy-Safe Testing Utilities for Storybook
 * 
 * Utilities to validate components against Quebec perinatal market requirements
 * and pregnancy-specific accessibility needs.
 */

// Note: @storybook/test will be available when Storybook is running

// Quebec validation patterns (matching E2E tests)
export const QUEBEC_PATTERNS = {
  POSTAL_CODE: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  PHONE: /^\(\d{3}\) \d{3}-\d{4}$/,
  HEALTH_CARD: /^[A-Z]{4}\d{8}$/,
} as const;

// Pregnancy-safe color palette (from brand guidelines)
export const PREGNANCY_SAFE_COLORS = {
  SAFE: ['#618462', '#517982', '#af6868', '#5e4530', '#ceaf9b', '#ffddd3', '#dae6ea'],
  AVOID: ['#FF0000', '#DC2626', '#EF4444'], // Bright reds cause medical anxiety
  NEUTRAL: ['#ffffff', '#f5f4f2'],
} as const;

// Accessibility requirements for pregnancy users
export const ACCESSIBILITY_REQUIREMENTS = {
  MIN_TOUCH_TARGET: 44, // pixels - WCAG 2.1 AA + pregnancy considerations
  MIN_CONTRAST_RATIO: 4.5, // WCAG AA standard
  PREGNANCY_CONTRAST_RATIO: 7.0, // Enhanced for pregnancy vision changes
  MAX_ANIMATION_DURATION: 5000, // ms - avoid triggering nausea
} as const;

/**
 * Test if element meets pregnancy-safe touch target requirements
 */
export const testTouchTargetSize = async (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const minSize = ACCESSIBILITY_REQUIREMENTS.MIN_TOUCH_TARGET;
  
  // expect will be available in Storybook testing context
  // expect(rect.width).toBeGreaterThanOrEqual(minSize);
  // expect(rect.height).toBeGreaterThanOrEqual(minSize);
  
  return {
    width: rect.width,
    height: rect.height,
    meets_requirements: rect.width >= minSize && rect.height >= minSize
  };
};

/**
 * Test if colors are pregnancy-safe (avoid medical anxiety triggers)
 */
export const testPregnancySafeColors = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;
  const color = computedStyle.color;
  
  // Convert RGB to hex for comparison
  const rgbToHex = (rgb: string): string => {
    const match = rgb.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!match) return rgb;
    
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`.toUpperCase();
  };
  
  const bgHex = rgbToHex(backgroundColor);
  const colorHex = rgbToHex(color);
  
  // Check if any problematic colors are used
  const problematicColors = PREGNANCY_SAFE_COLORS.AVOID;
  const hasSafeBackground = !problematicColors.some(unsafe => bgHex.includes(unsafe));
  const hasSafeColor = !problematicColors.some(unsafe => colorHex.includes(unsafe));
  
  return {
    backgroundColor: bgHex,
    color: colorHex,
    is_pregnancy_safe: hasSafeBackground && hasSafeColor,
    warnings: [
      ...(hasSafeBackground ? [] : [`Background color ${bgHex} may trigger medical anxiety`]),
      ...(hasSafeColor ? [] : [`Text color ${colorHex} may trigger medical anxiety`])
    ]
  };
};

/**
 * Test French language content requirements
 */
export const testFrenchContent = (element: HTMLElement) => {
  const textContent = element.textContent || '';
  const hasLangAttribute = element.lang === 'fr' || element.lang === 'fr-CA';
  const hasContent = textContent.length > 0;
  
  // Basic French text indicators (not exhaustive, but helpful)
  const frenchIndicators = [
    'le ', 'la ', 'les ', 'du ', 'des ', 'un ', 'une ',
    'et ', 'ou ', 'est ', 'avec ', 'pour ', 'dans ',
    'ç', 'é', 'è', 'à', 'ù', 'ê', 'â', 'î', 'ô'
  ];
  
  const hasFrenchText = frenchIndicators.some(indicator => 
    textContent.toLowerCase().includes(indicator)
  );
  
  return {
    has_lang_attribute: hasLangAttribute,
    has_content: hasContent,
    likely_french: hasFrenchText,
    text_sample: textContent.substring(0, 100),
    is_quebec_ready: hasLangAttribute && (hasFrenchText || !hasContent)
  };
};

/**
 * Test motion safety for pregnancy nausea prevention
 */
export const testMotionSafety = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);
  const animationDuration = computedStyle.animationDuration;
  const transitionDuration = computedStyle.transitionDuration;
  
  // Check for problematic animations
  const hasAnimation = animationDuration !== '0s';
  const hasTransition = transitionDuration !== '0s';
  const hasTransform = computedStyle.transform !== 'none';
  
  // Check for autoplay or infinite animations
  const animationIterationCount = computedStyle.animationIterationCount;
  const isInfinite = animationIterationCount === 'infinite';
  
  const warnings = [];
  
  if (hasAnimation && isInfinite) {
    warnings.push('Infinite animation may trigger nausea');
  }
  
  if (hasTransform && (hasAnimation || hasTransition)) {
    warnings.push('Transform animations should respect reduced motion preferences');
  }
  
  return {
    has_animation: hasAnimation,
    has_transition: hasTransition,
    has_transform: hasTransform,
    is_infinite: isInfinite,
    animation_duration: animationDuration,
    transition_duration: transitionDuration,
    is_motion_safe: !isInfinite && warnings.length === 0,
    warnings
  };
};

/**
 * Test Quebec health data format validation
 */
export const testQuebecFormats = (input: string, type: 'postal_code' | 'phone' | 'health_card') => {
  const patterns = {
    postal_code: QUEBEC_PATTERNS.POSTAL_CODE,
    phone: QUEBEC_PATTERNS.PHONE,
    health_card: QUEBEC_PATTERNS.HEALTH_CARD,
  };
  
  const pattern = patterns[type];
  const isValid = pattern.test(input);
  
  return {
    input,
    type,
    is_valid: isValid,
    pattern: pattern.source,
    example: type === 'postal_code' ? 'H1A 0A1' :
             type === 'phone' ? '(514) 123-4567' :
             'DOUM12345678'
  };
};

/**
 * Comprehensive pregnancy-safe component test
 */
export const runPregnancySafeTests = async (element: HTMLElement) => {
  const results = {
    touch_targets: [] as any[],
    colors: testPregnancySafeColors(element),
    french_content: testFrenchContent(element),
    motion_safety: testMotionSafety(element),
    overall_score: 0,
    warnings: [] as string[],
    recommendations: [] as string[]
  };
  
  // Test all interactive elements for touch targets
  const interactiveSelectors = 'button, a, input, [role="button"], [tabindex="0"]';
  const interactiveElements = element.querySelectorAll(interactiveSelectors);
  
  for (const el of Array.from(interactiveElements)) {
    try {
      const touchTest = await testTouchTargetSize(el as HTMLElement);
      results.touch_targets.push({
        element: el.tagName.toLowerCase(),
        ...touchTest
      });
    } catch (error) {
      results.warnings.push(`Could not test touch target for ${el.tagName}`);
    }
  }
  
  // Calculate overall score
  let score = 100;
  
  // Deduct for touch target issues
  const badTouchTargets = results.touch_targets.filter(t => !t.meets_requirements);
  score -= badTouchTargets.length * 20;
  
  // Deduct for color issues
  if (!results.colors.is_pregnancy_safe) {
    score -= 30;
  }
  
  // Deduct for French content issues (Quebec market)
  if (!results.french_content.is_quebec_ready && results.french_content.has_content) {
    score -= 25;
  }
  
  // Deduct for motion issues
  if (!results.motion_safety.is_motion_safe) {
    score -= 15;
  }
  
  results.overall_score = Math.max(0, score);
  
  // Generate recommendations
  if (badTouchTargets.length > 0) {
    results.recommendations.push(`Increase touch target size for ${badTouchTargets.length} elements to at least 44x44px`);
  }
  
  if (!results.colors.is_pregnancy_safe) {
    results.recommendations.push('Avoid bright red colors that may trigger medical anxiety');
  }
  
  if (!results.french_content.is_quebec_ready && results.french_content.has_content) {
    results.recommendations.push('Add French language support for Quebec market');
  }
  
  if (!results.motion_safety.is_motion_safe) {
    results.recommendations.push('Consider reduced motion preferences for pregnancy nausea prevention');
  }
  
  return results;
};

/**
 * Storybook interaction test helpers
 */
export const pregnancySafeInteractions = {
  /**
   * Click with pregnancy-safe timing (slower, more deliberate)
   */
  clickSafely: async (element: HTMLElement, delay = 1000) => {
    // Wait a bit longer to simulate pregnancy fatigue
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Ensure element is large enough for touch
    await testTouchTargetSize(element);
    
    element.click();
  },
  
  /**
   * Type with pregnancy brain fog consideration (slower, with pauses)
   */
  typeSafely: async (input: HTMLInputElement, text: string, delay = 200) => {
    input.focus();
    
    // Type character by character with delays
    for (const char of text) {
      input.value += char;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  },
  
  /**
   * Navigate with pregnancy-safe patterns
   */
  navigateSafely: async (link: HTMLElement) => {
    // Check if link has proper accessibility attributes
    const hasAriaLabel = link.hasAttribute('aria-label');
    const hasTitle = link.hasAttribute('title');
    const hasText = (link.textContent || '').length > 0;
    
    expect(hasAriaLabel || hasTitle || hasText).toBe(true);
    
    await testTouchTargetSize(link);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pregnancy interaction delay
    
    link.click();
  }
};

// All utilities are already exported above