/**
 * E2E Testing Constants
 * 
 * Pregnancy-Safe Testing Configuration
 */

export const STORAGE_STATE = 'playwright/.auth/user.json';

// Test timeouts - adjusted for pregnancy-related slower interactions
export const TIMEOUTS = {
  // Longer timeouts for pregnancy fatigue and slower decision making
  NAVIGATION: 30000,
  ACTION: 15000,
  ASSERTION: 10000,
  // Extra time for morning sickness or fatigue-affected interactions
  PREGNANCY_SAFE_BUFFER: 5000,
} as const;

// Test user personas based on CLAUDE.md requirements
export const TEST_USERS = {
  MARIE: {
    name: 'Marie Dubois',
    language: 'fr',
    stage: 'first_pregnancy',
    gestationWeeks: 20,
    location: 'Montreal',
    preferences: {
      reducedMotion: true,
      highContrast: false,
      language: 'fr-CA',
    }
  },
  SOPHIE: {
    name: 'Sophie Tremblay', 
    language: 'fr',
    stage: 'multiple_children',
    gestationWeeks: null, // Postpartum
    location: 'Quebec City',
    previousBirths: 2,
    preferences: {
      reducedMotion: false,
      highContrast: true,
      language: 'fr-CA',
    }
  },
  ALEXANDRA: {
    name: 'Alexandra Johnson',
    language: 'en', 
    stage: 'high_risk',
    gestationWeeks: 28,
    location: 'Montreal',
    preferences: {
      reducedMotion: true,
      highContrast: true,
      language: 'en-CA',
    }
  }
} as const;

// Quebec-specific testing data
export const QUEBEC_DATA = {
  POSTAL_CODES: ['H1A 0A1', 'G1A 0A1', 'J1A 0A1'],
  PHONE_FORMATS: ['(514) 123-4567', '(418) 123-4567', '(450) 123-4567'],
  HEALTHCARE_NUMBERS: ['DOUM12345678', 'TREM98765432'], // Mock Quebec health card format
  MATERNITY_HOSPITALS: [
    'Hôpital Sainte-Justine',
    'CHUM - Centre hospitalier de l\'Université de Montréal',
    'Hôpital Maisonneuve-Rosemont'
  ]
} as const;

// Accessibility testing constants
export const ACCESSIBILITY = {
  MINIMUM_TOUCH_TARGET: 44, // WCAG 2.1 AA requirement
  MINIMUM_COLOR_CONTRAST: 4.5, // WCAG AA requirement
  PREGNANCY_SAFE_COLORS: {
    // Avoid bright reds (medical anxiety)
    AVOID: ['#FF0000', '#DC2626'],
    // Prefer calming colors
    PREFER: ['#618462', '#517982', '#af6868']
  }
} as const;

// Performance testing thresholds
export const PERFORMANCE = {
  LCP_THRESHOLD: 2500, // ms - Core Web Vital
  FID_THRESHOLD: 100,  // ms - Core Web Vital  
  CLS_THRESHOLD: 0.1,  // score - Core Web Vital
  LIGHTHOUSE_SCORE: 90, // minimum acceptable score
} as const;

// Export alias for backward compatibility
export const PERFORMANCE_THRESHOLDS = PERFORMANCE;