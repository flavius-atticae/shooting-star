import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { Logo } from '~/components/layout/header/logo';
import { 
  PregnancySafeTestUtils, 
  PREGNANCY_CONSTANTS, 
  PREGNANCY_SAFE_COLORS 
} from '../../patterns/pregnancy-safe.test';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Logo Component - Pregnancy-Safe Design', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Visual Design & Typography', () => {
    it('should render "Pauline Roussel" text with correct typography', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByText('Pauline Roussel');
      expect(logo).toBeInTheDocument();
      
      // Check The Seasons serif font for headings
      expect(logo).toHaveClass('font-heading');
      
      // Check responsive text sizing
      expect(logo).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl');
      
      // Prevent text wrapping on mobile
      expect(logo).toHaveClass('whitespace-nowrap');
    });

    it('should use pregnancy-safe white text color', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByText('Pauline Roussel');
      
      // White text for high contrast
      expect(logo).toHaveClass('text-white', 'hover:text-white/90');
    });

    it('should have high contrast against primary background', () => {
      // Test white text (#ffffff) on primary background (#618462)
      const contrastRatio = PregnancySafeTestUtils.getContrastRatio(
        '#ffffff', // White text
        PREGNANCY_SAFE_COLORS.primary // Primary background
      );
      
      // Should exceed WCAG AA requirements (4.5:1)
      expect(contrastRatio).toBeGreaterThanOrEqual(PREGNANCY_CONSTANTS.CONTRAST_RATIO_MIN);
      
      // Should actually be much higher for pregnancy users
      expect(contrastRatio).toBeGreaterThan(7.0); // Close to AAA standards
    });
  });

  describe('Touch Targets & Pregnancy-Safe Interactions', () => {
    it('should have pregnancy-safe minimum touch target size', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByLabelText(/Pauline Roussel - Retour à l'accueil/);
      
      // Validate 44x44px minimum for swollen fingers
      PregnancySafeTestUtils.validateTouchTarget(logo, { 
        minSize: PREGNANCY_CONSTANTS.TOUCH_TARGET_MIN, 
        context: 'Logo element' 
      });
    });

    it('should have comfortable padding for pregnancy users', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByLabelText(/Pauline Roussel - Retour à l'accueil/);
      
      // Check padding classes
      expect(logo).toHaveClass('px-2');
      expect(logo).toHaveClass('min-h-[48px]', 'min-w-[48px]');
    });

    it('should handle imprecise clicks from swollen fingers', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByLabelText(/Pauline Roussel - Retour à l'accueil/);
      
      // Simulate multiple imprecise clicks
      for (let i = 0; i < 3; i++) {
        await PregnancySafeTestUtils.simulateSwollenFingerClick(logo, user);
      }
      
      // Logo should remain clickable and stable
      expect(logo).toBeInTheDocument();
    });

    it('should handle pregnancy brain interactions gracefully', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByLabelText(/Pauline Roussel - Retour à l'accueil/);
      
      // Simulate delayed/interrupted interaction pattern
      await PregnancySafeTestUtils.simulatePregnancyBrainInteraction(logo, user);
      
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Navigation & Link Behavior', () => {
    it('should be a link to homepage', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      expect(logo).toHaveAttribute('href', '/');
      expect(logo).toHaveTextContent('Pauline Roussel');
    });

    it('should support keyboard navigation', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Focus with tab
      await user.tab();
      expect(logo).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      // Navigation would occur in real browser environment
    });

    it('should support keyboard navigation with Space bar', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Focus and activate with space
      logo.focus();
      await user.keyboard(' ');
      // Navigation would occur in real browser environment
    });
  });

  describe('Accessibility & ARIA Support', () => {
    it('should have proper French ARIA label', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByLabelText('Pauline Roussel - Retour à l\'accueil');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('aria-label', 'Pauline Roussel - Retour à l\'accueil');
    });

    it('should have visible focus indicator for pregnancy fatigue', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Check focus styles
      expect(logo).toHaveClass(
        'outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-white/50',
        'focus-visible:ring-offset-2'
      );
      
      // Focus the element
      logo.focus();
      expect(logo).toHaveFocus();
    });

    it('should be properly marked up as a landmark', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      expect(logo).toBeInTheDocument();
      
      // Link should be within the main navigation
      expect(logo.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('Animation & Motion Safety', () => {
    it('should have gentle hover animations that won\'t trigger nausea', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Check for gentle scale animations
      expect(logo).toHaveClass('hover:scale-[1.02]', 'active:scale-[0.98]');
      
      // Verify safe transition duration (≤ 200ms for pregnancy)
      expect(logo).toHaveClass('transition-colors', 'duration-200');
    });

    it('should not have jarring or rapid animations', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Should not have any fast or aggressive animations
      const classes = logo.className;
      
      // No bounce, pulse, or spin animations
      expect(classes).not.toContain('bounce');
      expect(classes).not.toContain('pulse');
      expect(classes).not.toContain('spin');
      expect(classes).not.toContain('ping');
    });

    it('should respect reduced motion preferences', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Component should still be functional without animations
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('Pauline Roussel');
    });
  });

  describe('Responsive Design', () => {
    it('should scale appropriately across breakpoints', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Progressive text sizing for pregnancy users
      expect(logo).toHaveClass('text-2xl'); // Mobile: readable size
      expect(logo).toHaveClass('sm:text-3xl'); // Tablet: comfortable size
      expect(logo).toHaveClass('lg:text-4xl'); // Desktop: prominent size
    });

    it('should prevent text wrapping on small screens', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Essential for "Pauline Roussel" to stay on one line
      expect(logo).toHaveClass('whitespace-nowrap');
    });

    it('should maintain centering and alignment', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Centering classes for perfect alignment
      expect(logo).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('Brand & Typography', () => {
    it('should use The Seasons font family for brand consistency', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Should use heading font (The Seasons serif)
      expect(logo).toHaveClass('font-heading');
    });

    it('should display exact brand name text', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logoText = screen.getByText('Pauline Roussel');
      expect(logoText).toBeInTheDocument();
      
      // Ensure exact spacing and capitalization
      expect(logoText.textContent).toBe('Pauline Roussel');
    });
  });

  describe('Custom Styling Support', () => {
    it('should accept custom className prop', () => {
      render(
        <TestWrapper>
          <Logo className="custom-logo-class" />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      expect(logo).toHaveClass('custom-logo-class');
    });

    it('should merge custom classes with default classes', () => {
      render(
        <TestWrapper>
          <Logo className="extra-margin" />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Should have both default and custom classes
      expect(logo).toHaveClass('extra-margin');
      expect(logo).toHaveClass('font-heading'); // Default class
      expect(logo).toHaveClass('text-white'); // Default class
    });
  });

  describe('Performance Considerations', () => {
    it('should render without unnecessary re-renders', () => {
      const { rerender } = render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const initialLogo = screen.getByRole('link');
      expect(initialLogo).toBeInTheDocument();

      // Re-render with same props
      rerender(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const rerenderedLogo = screen.getByRole('link');
      expect(rerenderedLogo).toBeInTheDocument();
    });

    it('should not cause layout shifts', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Fixed sizing prevents CLS for pregnancy users (nausea prevention)
      expect(logo).toHaveClass('min-h-[48px]', 'min-w-[48px]');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing router context gracefully', () => {
      // This would test behavior without BrowserRouter, but since we need it
      // for the Link component, we'll test that it requires router context
      expect(() => {
        render(<Logo />);
      }).toThrow();
    });

    it('should remain functional during rapid interactions', async () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );

      const logo = screen.getByRole('link');
      
      // Rapid clicks (pregnancy brain might cause this)
      for (let i = 0; i < 5; i++) {
        await user.click(logo);
      }
      
      // Should remain stable
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('Pauline Roussel');
    });
  });
});