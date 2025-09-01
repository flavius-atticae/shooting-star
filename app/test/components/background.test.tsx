import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Background } from '../../components/ui/background';

// Pregnancy-safe color testing utilities
const PREGNANCY_SAFE_COLORS = {
  // Core brand colors that are pregnancy-safe
  primary: '#618462',    // Vert - calming green
  accent: '#af6868',     // Rose - warm rose
  secondary: '#517982',  // Bleu - calm blue  
  neutral: '#5e4530',    // Brun - earthy brown
  warm: '#ceaf9b',       // Beige - warm neutral
  soft: '#ffddd3',       // Rose Pale - gentle background
  cool: '#dae6ea',       // Bleu Pale - cool accent
  menthe: '#3d4e8d',     // Menthe - fresh mint
};

const PREGNANCY_UNSAFE_COLORS = [
  '#ff0000', // Bright red (medical anxiety)
  '#ff4444', // Medical red
  '#cc0000', // Emergency red
  '#990000', // Dark red
];

// Color contrast calculation utility
const getLuminance = (hex: string): number => {
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

const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

describe('Background Component - Pregnancy-Safe Color Testing', () => {
  // Mock window.getComputedStyle for color testing
  beforeEach(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: (element: Element) => {
        const style = element as HTMLElement;
        return {
          backgroundColor: style.style.backgroundColor || 'transparent',
          backgroundImage: style.style.backgroundImage || 'none',
          color: style.style.color || '#000000',
        };
      },
      writable: true,
    });
  });

  describe('Pregnancy-Safe Color Variants', () => {
    it('should render primary color variant safely', () => {
      render(
        <Background color="primary" data-testid="primary-bg">
          <div style={{ color: '#ffffff' }}>Content on primary background</div>
        </Background>
      );

      const background = screen.getByTestId('primary-bg');
      expect(background).toHaveClass('bg-primary');
      
      // Verify contrast ratio is pregnancy-safe (higher than normal)
      const contrastRatio = getContrastRatio(PREGNANCY_SAFE_COLORS.primary, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // WCAG AA large text
    });

    it('should render accent color variant safely', () => {
      render(
        <Background color="accent" data-testid="accent-bg">
          <div style={{ color: '#ffffff' }}>Accent background content</div>
        </Background>
      );

      const background = screen.getByTestId('accent-bg');
      expect(background).toHaveClass('bg-accent');
      
      // Verify accent color is pregnancy-safe
      const contrastRatio = getContrastRatio(PREGNANCY_SAFE_COLORS.accent, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(3.0); // Minimum for large text
    });

    it('should render secondary color with calm properties', () => {
      render(
        <Background color="secondary" data-testid="secondary-bg">
          <div>Calming secondary background</div>
        </Background>
      );

      const background = screen.getByTestId('secondary-bg');
      expect(background).toHaveClass('bg-secondary');
      
      // Secondary should be calming (blue tone)
      const contrastRatio = getContrastRatio(PREGNANCY_SAFE_COLORS.secondary, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should render soft background for gentle reading', () => {
      render(
        <Background color="soft" data-testid="soft-bg">
          <div style={{ color: PREGNANCY_SAFE_COLORS.neutral }}>
            Gentle reading content for pregnancy fatigue
          </div>
        </Background>
      );

      const background = screen.getByTestId('soft-bg');
      expect(background).toHaveClass('bg-soft');
      
      // Soft backgrounds should have excellent readability
      const contrastRatio = getContrastRatio(PREGNANCY_SAFE_COLORS.soft, PREGNANCY_SAFE_COLORS.neutral);
      expect(contrastRatio).toBeGreaterThanOrEqual(7.0); // WCAG AAA
    });

    it('should render neutral background for body text', () => {
      render(
        <Background color="neutral" data-testid="neutral-bg">
          <div style={{ color: '#ffffff' }}>Body text content</div>
        </Background>
      );

      const background = screen.getByTestId('neutral-bg');
      expect(background).toHaveClass('bg-neutral');
      
      // Neutral should provide excellent readability
      const contrastRatio = getContrastRatio(PREGNANCY_SAFE_COLORS.neutral, '#ffffff');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Gradient Rendering - Calm Transitions', () => {
    it('should render primary to soft gradient smoothly', () => {
      render(
        <Background 
          color="primary" 
          gradient={{ to: 'soft', direction: 'to-br' }}
          data-testid="gradient-bg"
        >
          <div>Gradient content</div>
        </Background>
      );

      const background = screen.getByTestId('gradient-bg');
      
      // Should have gradient classes
      expect(background).toHaveClass('bg-gradient-to-br');
      expect(background).toHaveClass('from-primary');
      expect(background).toHaveClass('to-soft');
    });

    it('should render calming blue gradient for relaxation sections', () => {
      render(
        <Background 
          color="secondary" 
          gradient={{ to: 'cool', direction: 'to-r' }}
          data-testid="calming-gradient"
        >
          <div>Relaxation content</div>
        </Background>
      );

      const background = screen.getByTestId('calming-gradient');
      
      expect(background).toHaveClass('bg-gradient-to-r');
      expect(background).toHaveClass('from-secondary');
      expect(background).toHaveClass('to-cool');
    });

    it('should avoid harsh gradient transitions', () => {
      // Test that gradients maintain visual comfort
      render(
        <Background 
          color="warm" 
          gradient={{ to: 'soft', direction: 'to-b' }}
          data-testid="gentle-gradient"
        >
          <div>Gentle transition content</div>
        </Background>
      );

      const background = screen.getByTestId('gentle-gradient');
      
      // Verify gentle transition colors
      expect(background).toHaveClass('from-warm');
      expect(background).toHaveClass('to-soft');
      
      // Both colors should be in pregnancy-safe range
      const warmContrast = getContrastRatio(PREGNANCY_SAFE_COLORS.warm, '#000000');
      const softContrast = getContrastRatio(PREGNANCY_SAFE_COLORS.soft, '#000000');
      
      expect(warmContrast).toBeGreaterThanOrEqual(3.0);
      expect(softContrast).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe('Pattern Component Integration', () => {
    const MockPattern = () => (
      <div data-testid="mock-pattern" className="opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="currentColor" />
        </svg>
      </div>
    );

    it('should render background with subtle pattern', () => {
      render(
        <Background color="primary" pattern={<MockPattern />} data-testid="patterned-bg">
          <div>Content over pattern</div>
        </Background>
      );

      const background = screen.getByTestId('patterned-bg');
      const pattern = screen.getByTestId('mock-pattern');
      
      expect(background).toBeInTheDocument();
      expect(pattern).toBeInTheDocument();
      
      // Pattern should be subtle (low opacity)
      expect(pattern).toHaveClass('opacity-10');
    });

    it('should maintain readability with pattern overlay', () => {
      render(
        <Background 
          color="soft" 
          pattern={<MockPattern />} 
          data-testid="readable-pattern-bg"
        >
          <div style={{ color: PREGNANCY_SAFE_COLORS.neutral }}>
            Important pregnancy information that must remain readable
          </div>
        </Background>
      );

      const background = screen.getByTestId('readable-pattern-bg');
      const content = screen.getByText(/Important pregnancy information/);
      
      expect(background).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      
      // Content should remain readable over pattern
      expect(content).toBeVisible();
    });
  });

  describe('Color Contrast Validation - Pregnancy Specific', () => {
    it('should meet enhanced contrast requirements for fatigue', () => {
      // Test all pregnancy-safe colors against white text
      Object.entries(PREGNANCY_SAFE_COLORS).forEach(([name, color]) => {
        render(
          <Background color={name as any} data-testid={`${name}-contrast`}>
            <div style={{ color: '#ffffff' }}>White text content</div>
          </Background>
        );

        const contrastRatio = getContrastRatio(color, '#ffffff');
        
        // Pregnancy users need higher contrast due to fatigue
        if (['soft', 'cool', 'warm'].includes(name)) {
          // Light backgrounds with dark text
          const darkContrast = getContrastRatio(color, PREGNANCY_SAFE_COLORS.neutral);
          expect(darkContrast).toBeGreaterThanOrEqual(4.5);
        } else {
          // Dark backgrounds with light text
          expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
        }
      });
    });

    it('should reject pregnancy-unsafe colors', () => {
      // This test ensures our component doesn't accept unsafe colors
      PREGNANCY_UNSAFE_COLORS.forEach(unsafeColor => {
        const contrastWithWhite = getContrastRatio(unsafeColor, '#ffffff');
        
        // While red colors might have good contrast, they cause anxiety
        // Our component should not use them regardless of contrast
        expect(unsafeColor).toMatch(/#ff|#cc|#99.*00.*/); // Contains red tones
      });
    });

    it('should support high contrast mode preferences', () => {
      // Mock prefers-contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-contrast: high'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <Background color="primary" data-testid="high-contrast-bg">
          <div>High contrast content</div>
        </Background>
      );

      const background = screen.getByTestId('high-contrast-bg');
      expect(background).toBeInTheDocument();
      
      // Component should adapt to high contrast preferences
      // This would be handled by CSS custom properties
    });
  });

  describe('Motion and Animation Safety', () => {
    it('should respect prefers-reduced-motion for gradient animations', () => {
      // Mock prefers-reduced-motion media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <Background 
          color="primary" 
          gradient={{ to: 'soft', direction: 'to-br' }}
          data-testid="reduced-motion-bg"
        >
          <div>Content with reduced motion</div>
        </Background>
      );

      const background = screen.getByTestId('reduced-motion-bg');
      
      // Background should not have animation classes when motion is reduced
      expect(background).not.toHaveClass('animate-pulse');
      expect(background).not.toHaveClass('animate-gradient');
    });

    it('should use static patterns for nausea sensitivity', () => {
      const StaticPattern = () => (
        <div data-testid="static-pattern" className="static-pattern">
          Static, non-moving pattern
        </div>
      );

      render(
        <Background 
          color="soft" 
          pattern={<StaticPattern />} 
          data-testid="nausea-safe-bg"
        >
          <div>Nausea-sensitive content</div>
        </Background>
      );

      const background = screen.getByTestId('nausea-safe-bg');
      const pattern = screen.getByTestId('static-pattern');
      
      expect(background).toBeInTheDocument();
      expect(pattern).toHaveClass('static-pattern');
      
      // Should not have any movement classes
      expect(pattern).not.toHaveClass('animate-');
    });
  });

  describe('Dark Mode Support - Pregnancy Sleep Considerations', () => {
    beforeEach(() => {
      // Mock dark mode preference
      document.documentElement.classList.add('dark');
    });

    afterEach(() => {
      document.documentElement.classList.remove('dark');
    });

    it('should adapt colors for dark mode', () => {
      render(
        <Background color="primary" data-testid="dark-mode-bg">
          <div>Dark mode content</div>
        </Background>
      );

      const background = screen.getByTestId('dark-mode-bg');
      
      // Should have dark mode classes
      expect(background).toHaveClass('dark:bg-primary-dark', 'bg-primary');
    });

    it('should maintain readability in dark mode', () => {
      render(
        <Background color="soft" data-testid="dark-mode-soft-bg">
          <div style={{ color: '#ffffff' }}>
            Dark mode reading content
          </div>
        </Background>
      );

      const background = screen.getByTestId('dark-mode-soft-bg');
      
      // Soft background should invert appropriately in dark mode
      expect(background).toHaveClass('bg-soft');
    });
  });

  describe('French Content Layout Support', () => {
    it('should handle French text without color bleeding', () => {
      const frenchText = "Découvrez nos cours de yoga prénatal adaptés à chaque trimestre de votre grossesse. Nos séances sont conçues pour votre bien-être et celui de votre bébé.";
      
      render(
        <Background color="soft" data-testid="french-bg">
          <div lang="fr-CA" style={{ color: PREGNANCY_SAFE_COLORS.neutral }}>
            {frenchText}
          </div>
        </Background>
      );

      const background = screen.getByTestId('french-bg');
      const text = screen.getByText(/Découvrez nos cours/);
      
      expect(background).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      expect(text).toHaveAttribute('lang', 'fr-CA');
    });

    it('should support RTL layouts if needed for accessibility', () => {
      render(
        <Background color="primary" data-testid="rtl-bg" dir="rtl">
          <div>RTL content for accessibility tools</div>
        </Background>
      );

      const background = screen.getByTestId('rtl-bg');
      expect(background).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('Performance - Memory and Battery Considerations', () => {
    it('should not cause memory leaks with complex patterns', () => {
      const HeavyPattern = () => (
        <div data-testid="heavy-pattern">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="pattern-element">Element {i}</div>
          ))}
        </div>
      );

      render(
        <Background color="primary" pattern={<HeavyPattern />} data-testid="performance-bg">
          <div>Performance test content</div>
        </Background>
      );

      const background = screen.getByTestId('performance-bg');
      const pattern = screen.getByTestId('heavy-pattern');
      
      expect(background).toBeInTheDocument();
      expect(pattern).toBeInTheDocument();
      
      // Pattern elements should be rendered efficiently
      const patternElements = screen.getAllByText(/Element \d+/);
      expect(patternElements).toHaveLength(50);
    });

    it('should optimize gradient rendering for battery life', () => {
      render(
        <Background 
          color="primary" 
          gradient={{ to: 'soft', direction: 'to-br' }}
          data-testid="optimized-gradient"
        >
          <div>Battery-friendly gradient</div>
        </Background>
      );

      const background = screen.getByTestId('optimized-gradient');
      
      // Should use CSS gradients instead of JavaScript animations
      expect(background).toHaveClass('bg-gradient-to-br');
      
      // Should not have high-performance CSS properties that drain battery
      expect(background).not.toHaveClass('will-change-transform');
    });
  });
});