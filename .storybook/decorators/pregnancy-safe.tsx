import React from 'react';
import type { Decorator } from '@storybook/react';

/**
 * Pregnancy-Safe Decorators for Storybook
 * 
 * These decorators simulate different pregnancy-related contexts and accessibility needs
 * to ensure components work well for our Quebec perinatal market users.
 */

// User persona types matching our E2E test personas
export interface PregnancyPersona {
  name: string;
  stage: 'first_pregnancy' | 'multiple_children' | 'high_risk' | 'postpartum';
  gestationWeeks?: number;
  language: 'fr' | 'en';
  location: 'Montreal' | 'Quebec City' | 'Sherbrooke';
  accessibilityNeeds: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
    extendedTimeouts: boolean;
  };
  preferences: {
    deviceType: 'mobile' | 'tablet' | 'desktop';
    colorScheme: 'light' | 'dark';
    language: 'fr-CA' | 'en-CA';
  };
}

// Our three main personas from E2E tests
export const PREGNANCY_PERSONAS: Record<string, PregnancyPersona> = {
  MARIE: {
    name: 'Marie Dubois',
    stage: 'first_pregnancy',
    gestationWeeks: 20,
    language: 'fr',
    location: 'Montreal',
    accessibilityNeeds: {
      reducedMotion: true,
      highContrast: false,
      largeText: false,
      extendedTimeouts: true,
    },
    preferences: {
      deviceType: 'mobile',
      colorScheme: 'light',
      language: 'fr-CA',
    }
  },
  SOPHIE: {
    name: 'Sophie Tremblay',
    stage: 'multiple_children',
    language: 'fr',
    location: 'Quebec City',
    accessibilityNeeds: {
      reducedMotion: false,
      highContrast: true,
      largeText: false,
      extendedTimeouts: false,
    },
    preferences: {
      deviceType: 'tablet',
      colorScheme: 'light',
      language: 'fr-CA',
    }
  },
  ALEXANDRA: {
    name: 'Alexandra Johnson',
    stage: 'high_risk',
    gestationWeeks: 28,
    language: 'en',
    location: 'Montreal',
    accessibilityNeeds: {
      reducedMotion: true,
      highContrast: true,
      largeText: true,
      extendedTimeouts: true,
    },
    preferences: {
      deviceType: 'desktop',
      colorScheme: 'light',
      language: 'en-CA',
    }
  },
};

/**
 * Decorator for reduced motion (pregnancy nausea prevention)
 */
export const withReducedMotion: Decorator = (Story, context) => {
  React.useEffect(() => {
    // Apply reduced motion CSS
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div data-reduced-motion="true">
      <Story {...context} />
    </div>
  );
};

/**
 * Decorator for high contrast mode (pregnancy vision changes)
 */
export const withHighContrast: Decorator = (Story, context) => {
  return (
    <div 
      className="forced-colors-active"
      style={{ 
        filter: 'contrast(1.5)'
      } as React.CSSProperties}
    >
      <Story {...context} />
    </div>
  );
};

/**
 * Decorator for large text (pregnancy fatigue)
 */
export const withLargeText: Decorator = (Story, context) => {
  return (
    <div style={{ fontSize: '1.2em' }}>
      <Story {...context} />
    </div>
  );
};

/**
 * Decorator for Quebec French context
 */
export const withQuebecFrench: Decorator = (Story, context) => {
  React.useEffect(() => {
    document.documentElement.lang = 'fr-CA';
    
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return (
    <div lang="fr-CA" data-locale="fr-CA">
      <Story {...context} />
    </div>
  );
};

/**
 * Decorator for pregnancy persona simulation
 */
export const withPregnancyPersona = (persona: PregnancyPersona): Decorator => {
  return (Story, context) => {
    const { accessibilityNeeds, preferences } = persona;
    
    React.useEffect(() => {
      // Apply persona-specific settings
      document.documentElement.lang = preferences.language;
      
      if (accessibilityNeeds.reducedMotion) {
        document.documentElement.style.setProperty('--motion-reduce', 'true');
      }
      
      if (accessibilityNeeds.highContrast) {
        document.documentElement.style.setProperty('--contrast-more', 'true');
      }
      
      return () => {
        document.documentElement.style.removeProperty('--motion-reduce');
        document.documentElement.style.removeProperty('--contrast-more');
      };
    }, []);

    // Create wrapper with persona context
    const wrapperStyles: React.CSSProperties = {};
    
    if (accessibilityNeeds.largeText) {
      wrapperStyles.fontSize = '1.2em';
    }
    
    if (accessibilityNeeds.highContrast) {
      wrapperStyles.filter = 'contrast(1.5)';
    }

    return (
      <div 
        style={wrapperStyles}
        data-persona={persona.name}
        data-stage={persona.stage}
        data-gestation-weeks={persona.gestationWeeks}
        data-language={persona.language}
        data-location={persona.location}
        lang={preferences.language}
      >
        <div className="pregnancy-persona-indicator bg-accent/10 p-2 mb-4 rounded text-xs">
          <strong>👩‍🤱 Persona:</strong> {persona.name} • {persona.stage} 
          {persona.gestationWeeks && ` • ${persona.gestationWeeks} semaines`} • {persona.location}
        </div>
        <Story {...context} />
      </div>
    );
  };
};

/**
 * Decorator for touch-friendly interface (pregnancy swelling/coordination)
 */
export const withTouchFriendly: Decorator = (Story, context) => {
  React.useEffect(() => {
    // Ensure all interactive elements meet minimum touch target size
    const style = document.createElement('style');
    style.textContent = `
      [data-touch-friendly] button,
      [data-touch-friendly] a,
      [data-touch-friendly] input,
      [data-touch-friendly] [role="button"],
      [data-touch-friendly] [tabindex="0"] {
        min-height: 44px !important;
        min-width: 44px !important;
        padding: 12px 16px !important;
        touch-action: manipulation;
      }
      
      [data-touch-friendly] input[type="checkbox"],
      [data-touch-friendly] input[type="radio"] {
        transform: scale(1.5);
        margin: 8px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div data-touch-friendly="true">
      <Story {...context} />
    </div>
  );
};

/**
 * Decorator for mobile pregnancy context (most common usage)
 */
export const withMobilePregnancy: Decorator = (Story, context) => {
  return (
    <div className="mobile-pregnancy-context">
      <div className="bg-primary/5 p-3 mb-4 rounded-lg border-l-4 border-primary text-sm">
        📱 <strong>Contexte mobile grossesse:</strong> Interface optimisée pour utilisation mobile 
        pendant la grossesse (fatigue, nausées, coordination réduite)
      </div>
      <div style={{ maxWidth: '390px', margin: '0 auto' }}>
        <Story {...context} />
      </div>
    </div>
  );
};

/**
 * Decorator for pregnancy-safe color testing
 */
export const withPregnancySafeColors: Decorator = (Story, context) => {
  React.useEffect(() => {
    // Add pregnancy-safe color indicators
    const style = document.createElement('style');
    style.textContent = `
      [data-pregnancy-safe-colors] {
        --pregnancy-safe-indicator: "🟢 Colors OK";
      }
      
      [data-pregnancy-safe-colors] *[style*="color: red"],
      [data-pregnancy-safe-colors] *[style*="color: #FF0000"],
      [data-pregnancy-safe-colors] .text-red-500,
      [data-pregnancy-safe-colors] .text-red-600,
      [data-pregnancy-safe-colors] .bg-red-500,
      [data-pregnancy-safe-colors] .bg-red-600 {
        position: relative;
      }
      
      [data-pregnancy-safe-colors] *[style*="color: red"]::after,
      [data-pregnancy-safe-colors] *[style*="color: #FF0000"]::after,
      [data-pregnancy-safe-colors] .text-red-500::after,
      [data-pregnancy-safe-colors] .text-red-600::after,
      [data-pregnancy-safe-colors] .bg-red-500::after,
      [data-pregnancy-safe-colors] .bg-red-600::after {
        content: "⚠️ Rouge médical";
        position: absolute;
        top: -20px;
        left: 0;
        font-size: 10px;
        background: orange;
        color: white;
        padding: 2px 4px;
        border-radius: 2px;
        z-index: 1000;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div data-pregnancy-safe-colors="true">
      <Story {...context} />
    </div>
  );
};

// Utility to help combine decorators (simplified for TypeScript)
export const combinePregnancyDecorators = (...decorators: Decorator[]) => {
  // Return array of decorators to be used in stories
  return decorators;
};