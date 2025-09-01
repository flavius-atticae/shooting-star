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
  menthe: '#3d4e8d', // Fresh mint
} as const;

/**
 * Test Utilities for Pregnancy-Safe Design
 */
class PregnancySafeTestUtils {
  /**
   * Validate touch target size meets pregnancy requirements
   */
  static validateTouchTarget(element: HTMLElement, minSize = PREGNANCY_CONSTANTS.TOUCH_TARGET_MIN) {
    const rect = element.getBoundingClientRect();
    expect(rect.width).toBeGreaterThanOrEqual(minSize);
    expect(rect.height).toBeGreaterThanOrEqual(minSize);
  }

  /**
   * Validate spacing between interactive elements
   */
  static validateSpacing(element1: HTMLElement, element2: HTMLElement, minSpacing = PREGNANCY_CONSTANTS.SPACING_MIN) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    const horizontalSpacing = Math.abs(rect1.right - rect2.left);
    const verticalSpacing = Math.abs(rect1.bottom - rect2.top);
    
    const actualSpacing = Math.min(horizontalSpacing, verticalSpacing);
    expect(actualSpacing).toBeGreaterThanOrEqual(minSpacing);
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
   * Check if color is pregnancy-safe (not anxiety-inducing)
   */
  static validatePregnancySafeColor(color: string) {
    const isUnsafe = PREGNANCY_UNSAFE_COLORS.some(unsafeColor => 
      color.toLowerCase().includes(unsafeColor.toLowerCase())
    );
    expect(isUnsafe).toBeFalsy();
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
   * Validate form field for pregnancy users
   */
  static validatePregnancyFriendlyForm(formElement: HTMLElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea, button');
    
    inputs.forEach(input => {
      const element = input as HTMLElement;
      
      // Check touch target size
      this.validateTouchTarget(element);
      
      // Check for labels (important for pregnancy brain)
      const label = formElement.querySelector(`label[for="${input.id}"]`) || 
                   input.getAttribute('aria-label') ||
                   input.getAttribute('aria-labelledby');
      expect(label).toBeTruthy();
      
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
          <button style={{ width: '44px', height: '44px' }}>Minimum</button>
          <button style={{ width: '48px', height: '48px' }}>Recommended</button>
          <button style={{ width: '32px', height: '32px' }}>Too Small</button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      
      // First two should pass
      PregnancySafeTestUtils.validateTouchTarget(buttons[0]);
      PregnancySafeTestUtils.validateTouchTarget(buttons[1]);
      
      // Third should fail
      expect(() => {
        PregnancySafeTestUtils.validateTouchTarget(buttons[2]);
      }).toThrow();
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

// Export test utilities for use in other test files
export { PregnancySafeTestUtils, PREGNANCY_CONSTANTS, PREGNANCY_SAFE_COLORS, PREGNANCY_UNSAFE_COLORS };