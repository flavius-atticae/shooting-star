/**
 * Test Data for Pregnancy-Safe E2E Testing
 * 
 * Comprehensive test data sets for Quebec perinatal market
 * Based on real pregnancy and postpartum user scenarios
 */

// Import centralized performance thresholds
import { PERFORMANCE_THRESHOLDS as PerformanceThresholdsImport } from "~/lib/performance-thresholds";

// Re-export for external use
export { PERFORMANCE_THRESHOLDS } from "~/lib/performance-thresholds";

// Quebec healthcare system integration data
export const QUEBEC_HEALTHCARE = {
  HEALTH_CARDS: {
    VALID: ['DOUM12345678', 'TREM98765432', 'ALEX65432109'],
    INVALID: ['123456', 'INVALID123', '']
  },
  MATERNITY_WARDS: [
    {
      name: 'Hôpital Sainte-Justine',
      location: 'Montreal',
      postalCode: 'H3T 1C5',
      phone: '(514) 345-4931',
      specialties: ['high-risk', 'nicu']
    },
    {
      name: 'CHUM',
      location: 'Montreal', 
      postalCode: 'H2X 0C1',
      phone: '(514) 890-8000',
      specialties: ['general', 'emergency']
    }
  ],
  INSURANCE_NUMBERS: {
    RAMQ: ['DOUM12345678', 'TREM98765432'],
    PRIVATE: ['SUNLIFE123456', 'DESJARDINS789']
  }
} as const;

// Pregnancy-specific form data
export const PREGNANCY_FORMS = {
  MARIE_FIRST_PREGNANCY: {
    personalInfo: {
      firstName: 'Marie',
      lastName: 'Dubois', 
      email: 'marie.dubois@example.com',
      phone: '(514) 123-4567',
      postalCode: 'H1A 0A1',
      preferredLanguage: 'fr'
    },
    pregnancyInfo: {
      gestationWeeks: 20,
      dueDate: '2025-06-15',
      isFirstPregnancy: true,
      complications: [],
      previousBirths: 0
    },
    preferences: {
      reducedMotion: true,
      highContrast: false,
      emailNotifications: true,
      smsNotifications: false,
      preferredContactTime: 'morning'
    }
  },

  SOPHIE_EXPERIENCED: {
    personalInfo: {
      firstName: 'Sophie',
      lastName: 'Tremblay',
      email: 'sophie.tremblay@example.com', 
      phone: '(418) 555-0123',
      postalCode: 'G1A 0A1',
      preferredLanguage: 'fr'
    },
    pregnancyInfo: {
      gestationWeeks: null, // Postpartum
      deliveryDate: '2024-12-01',
      isFirstPregnancy: false,
      complications: [],
      previousBirths: 2
    },
    preferences: {
      reducedMotion: false,
      highContrast: true,
      emailNotifications: true,
      smsNotifications: true,
      preferredContactTime: 'evening'
    }
  },

  ALEXANDRA_HIGH_RISK: {
    personalInfo: {
      firstName: 'Alexandra',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '(514) 987-6543', 
      postalCode: 'H3A 0A1',
      preferredLanguage: 'en'
    },
    pregnancyInfo: {
      gestationWeeks: 28,
      dueDate: '2025-04-20',
      isFirstPregnancy: false,
      complications: ['gestational-diabetes', 'high-blood-pressure'],
      previousBirths: 1
    },
    preferences: {
      reducedMotion: true,
      highContrast: true,
      emailNotifications: true,
      smsNotifications: true,
      preferredContactTime: 'afternoon'
    }
  }
} as const;

// Booking and scheduling test data
export const BOOKING_SCENARIOS = {
  PRENATAL_YOGA: {
    className: 'Yoga Prénatal Débutant',
    duration: 60,
    capacity: 8,
    price: 25.00,
    currency: 'CAD',
    location: 'Studio Pauline - Montreal',
    requirements: ['medical-clearance', 'second-trimester-plus'],
    modifications: ['pregnancy-safe-poses', 'reduced-intensity']
  },

  POSTNATAL_RECOVERY: {
    className: 'Récupération Postnatale',
    duration: 45,
    capacity: 6,
    price: 30.00,
    currency: 'CAD',
    location: 'Online/Virtual',
    requirements: ['6-weeks-post-delivery'],
    modifications: ['diastasis-recti-safe', 'pelvic-floor-focus']
  },

  BIRTH_PREPARATION: {
    className: 'Préparation à l\'Accouchement',
    duration: 90,
    capacity: 10,
    price: 45.00,
    currency: 'CAD',
    location: 'Centre de Naissance',
    requirements: ['third-trimester', 'partner-recommended'],
    modifications: ['breathing-techniques', 'pain-management']
  }
} as const;

// Quebec-specific validation patterns
export const VALIDATION_PATTERNS = {
  POSTAL_CODE: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i, // Case-insensitive for user flexibility
  QUEBEC_PHONE: /^\(\d{3}\) \d{3}-\d{4}$/,
  HEALTH_CARD: /^[A-Z]{4}\d{8}$/i, // Case-insensitive for Quebec health cards
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, // Case-insensitive for emails
  SIN: /^\d{3} \d{3} \d{3}$/ // Social Insurance Number format
} as const;

// Accessibility test scenarios
export const ACCESSIBILITY_SCENARIOS = {
  REDUCED_MOTION: {
    description: 'Testing with reduced motion for nausea prevention',
    settings: { reducedMotion: 'reduce' },
    expectedBehavior: 'No autoplay animations, minimal transitions'
  },
  
  HIGH_CONTRAST: {
    description: 'High contrast for pregnancy vision changes',
    settings: { forcedColors: 'active' },
    expectedBehavior: 'Clear text/background contrast ratios'
  },
  
  LARGE_TOUCH_TARGETS: {
    description: 'Large touch targets for pregnancy coordination',
    requirements: { minWidth: 44, minHeight: 44 },
    expectedBehavior: 'All interactive elements meet minimum size'
  },
  
  SCREEN_READER: {
    description: 'Screen reader support for pregnancy fatigue',
    requirements: ['alt-text', 'aria-labels', 'semantic-html'],
    expectedBehavior: 'Full content accessible via screen reader'
  }
} as const;

// Error scenarios and recovery testing
export const ERROR_SCENARIOS = {
  FORM_VALIDATION: {
    description: 'Pregnancy brain fog - common form errors',
    errors: [
      { field: 'email', value: 'invalid-email', expected: 'Email format validation' },
      { field: 'phone', value: '123-456', expected: 'Quebec phone format required' },
      { field: 'postalCode', value: 'invalid', expected: 'Quebec postal code format' },
      { field: 'gestationWeeks', value: '50', expected: 'Valid gestation range (1-42)' }
    ]
  },
  
  NETWORK_ISSUES: {
    description: 'Connection issues during medical appointments',
    scenarios: [
      { type: 'slow-3g', timeout: 30000, expected: 'Graceful degradation' },
      { type: 'offline', timeout: 10000, expected: 'Offline messaging' },
      { type: 'intermittent', timeout: 15000, expected: 'Auto-retry logic' }
    ]
  }
} as const;

export const TEST_DATA = {
  QUEBEC_HEALTHCARE,
  PREGNANCY_FORMS,
  BOOKING_SCENARIOS,
  VALIDATION_PATTERNS,
  ACCESSIBILITY_SCENARIOS,
  PERFORMANCE_THRESHOLDS: PerformanceThresholdsImport,
  ERROR_SCENARIOS
} as const;