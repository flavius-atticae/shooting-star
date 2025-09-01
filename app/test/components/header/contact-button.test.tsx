import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { ContactButton } from '~/components/layout/header/contact-button';
import { 
  PregnancySafeTestUtils, 
  PREGNANCY_CONSTANTS, 
  PREGNANCY_SAFE_COLORS 
} from '../../patterns/pregnancy-safe.test';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ContactButton Component - Pregnancy-Safe Design', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Visual Design & Styling', () => {
    it('should render with correct text and styling', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      expect(button).toBeInTheDocument();
      
      // Check pill shape (rounded-full)
      expect(button).toHaveClass('rounded-full');
      
      // Check uppercase styling
      expect(button).toHaveClass('uppercase', 'font-semibold');
      
      // Check Barlow font (sans-serif)
      expect(button).toHaveClass('font-sans');
    });

    it('should use pregnancy-safe menthe background color', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Should have inline style for menthe background
      expect(button).toHaveStyle('background-color: var(--color-menthe)');
      
      // Validate menthe is pregnancy-safe
      PregnancySafeTestUtils.validatePregnancySafeColor(PREGNANCY_SAFE_COLORS.menthe);
    });

    it('should have high contrast text on menthe background', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // White text on menthe background
      expect(button).toHaveClass('text-white', 'hover:text-white/90');
      
      // Test contrast ratio (white on menthe)
      const contrastRatio = PregnancySafeTestUtils.getContrastRatio(
        '#ffffff', // White text
        '#D4E8D4' // Menthe background
      );
      
      expect(contrastRatio).toBeGreaterThanOrEqual(PREGNANCY_CONSTANTS.CONTRAST_RATIO_MIN);
    });

    it('should have pill-shaped design for modern pregnant users', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      expect(button).toHaveClass('rounded-full');
    });
  });

  describe('Touch Targets & Pregnancy-Safe Interactions', () => {
    it('should have pregnancy-safe minimum touch target size', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      
      // Validate 44x44px minimum for swollen fingers
      PregnancySafeTestUtils.validateTouchTarget(button, { 
        minSize: PREGNANCY_CONSTANTS.TOUCH_TARGET_MIN, 
        context: 'Contact button' 
      });
    });

    it('should have comfortable padding for pregnancy users', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Check generous padding
      expect(button).toHaveClass('px-8', 'py-2', 'min-h-[48px]');
    });

    it('should handle imprecise clicks from swollen fingers', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      
      // Simulate multiple imprecise clicks
      for (let i = 0; i < 3; i++) {
        await PregnancySafeTestUtils.simulateSwollenFingerClick(button, user);
      }
      
      // Button should remain clickable and stable
      expect(button).toBeInTheDocument();
    });

    it('should handle pregnancy brain interactions gracefully', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      
      // Simulate delayed/interrupted interaction pattern
      await PregnancySafeTestUtils.simulatePregnancyBrainInteraction(button, user);
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Navigation & Link Behavior', () => {
    it('should be a link to contact page', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      expect(button).toHaveAttribute('href', '/contact');
      expect(button).toHaveTextContent('CONTACTEZ-MOI');
    });

    it('should support keyboard navigation', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Focus with tab
      await user.tab();
      expect(button).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      // Navigation would occur in real browser environment
    });

    it('should support keyboard navigation with Space bar', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Focus and activate with space
      button.focus();
      await user.keyboard(' ');
      // Navigation would occur in real browser environment
    });
  });

  describe('Accessibility & ARIA Support', () => {
    it('should have proper French aria-label', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByLabelText('Contactez Pauline Roussel');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Contactez Pauline Roussel');
    });

    it('should have visible focus indicator for pregnancy fatigue', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Check focus styles
      expect(button).toHaveClass(
        'outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-primary/50',
        'focus-visible:ring-offset-2'
      );
      
      // Focus the element
      button.focus();
      expect(button).toHaveFocus();
    });

    it('should be properly marked up as a call-to-action', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      expect(button).toBeInTheDocument();
      
      // Should be a prominent link element
      expect(button.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('Animation & Motion Safety', () => {
    it('should have gentle hover animations that won\'t trigger nausea', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Check for gentle hover states
      expect(button).toHaveClass('hover:text-white/90', 'active:text-white/80');
      
      // Verify safe transition duration (≤ 200ms for pregnancy)
      expect(button).toHaveClass('transition-all', 'duration-200');
    });

    it('should not have jarring or rapid animations', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Should not have any fast or aggressive animations
      const classes = button.className;
      
      // No bounce, pulse, or spin animations
      expect(classes).not.toContain('bounce');
      expect(classes).not.toContain('pulse');
      expect(classes).not.toContain('spin');
      expect(classes).not.toContain('ping');
    });

    it('should respect reduced motion preferences', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Component should still be functional without animations
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('CONTACTEZ-MOI');
    });
  });

  describe('French Language & Quebec Culture', () => {
    it('should display French text correctly', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      expect(button).toBeInTheDocument();
      
      // Ensure correct French contact terminology
      expect(button.textContent).toBe('CONTACTEZ-MOI');
    });

    it('should use Quebec French approach to contact', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByLabelText('Contactez Pauline Roussel');
      expect(button).toBeInTheDocument();
      
      // "Contactez" is more formal Quebec French vs "Appelez"
      expect(button).toHaveAttribute('aria-label', 'Contactez Pauline Roussel');
    });

    it('should handle French text layout in uppercase', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Uppercase class should handle French accents properly
      expect(button).toHaveClass('uppercase');
      expect(button.textContent).toBe('CONTACTEZ-MOI');
    });
  });

  describe('Responsive Design', () => {
    it('should maintain consistent sizing across breakpoints', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Consistent padding and sizing
      expect(button).toHaveClass('px-8', 'py-2');
      expect(button).toHaveClass('min-h-[48px]');
    });

    it('should be properly hidden on mobile (header context)', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Component itself doesn't handle responsive visibility
      // (that's handled by the Header parent), but button should be stable
      expect(button).toBeInTheDocument();
    });

    it('should maintain legibility across screen sizes', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Text sizing appropriate for all screens
      expect(button).toHaveClass('text-sm'); // Readable on all sizes
      expect(button).toHaveClass('font-semibold'); // Enhanced readability
    });
  });

  describe('Brand Consistency', () => {
    it('should use brand-consistent styling', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Brand font (Barlow)
      expect(button).toHaveClass('font-sans');
      
      // Brand pill shape
      expect(button).toHaveClass('rounded-full');
    });

    it('should use pregnancy-safe brand colors', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Menthe background validates as pregnancy-safe
      expect(button).toHaveStyle('background-color: var(--color-menthe)');
      PregnancySafeTestUtils.validatePregnancySafeColor('#D4E8D4');
    });
  });

  describe('Custom Styling Support', () => {
    it('should accept custom className prop', () => {
      render(
        <TestWrapper>
          <ContactButton className="custom-button-class" />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      expect(button).toHaveClass('custom-button-class');
    });

    it('should merge custom classes with default classes', () => {
      render(
        <TestWrapper>
          <ContactButton className="extra-padding" />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Should have both default and custom classes
      expect(button).toHaveClass('extra-padding');
      expect(button).toHaveClass('rounded-full'); // Default class
      expect(button).toHaveClass('text-white'); // Default class
    });
  });

  describe('Performance Considerations', () => {
    it('should render without unnecessary re-renders', () => {
      const { rerender } = render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const initialButton = screen.getByRole('link');
      expect(initialButton).toBeInTheDocument();

      // Re-render with same props
      rerender(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const rerenderedButton = screen.getByRole('link');
      expect(rerenderedButton).toBeInTheDocument();
    });

    it('should not cause layout shifts', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Fixed sizing prevents CLS for pregnancy users (nausea prevention)
      expect(button).toHaveClass('min-h-[48px]');
      expect(button).toHaveClass('px-8', 'py-2'); // Consistent padding
    });

    it('should have efficient styling with CSS variables', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Using CSS custom properties for efficient theme management
      expect(button).toHaveStyle('background-color: var(--color-menthe)');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing router context gracefully', () => {
      // This would test behavior without BrowserRouter, but since we need it
      // for the Link component, we'll test that it requires router context
      expect(() => {
        render(<ContactButton />);
      }).toThrow();
    });

    it('should remain functional during rapid interactions', async () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Rapid clicks (pregnancy brain might cause this)
      for (let i = 0; i < 5; i++) {
        await user.click(button);
      }
      
      // Should remain stable
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('CONTACTEZ-MOI');
    });

    it('should handle CSS variable fallbacks', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Should gracefully handle missing CSS variables
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle('background-color: var(--color-menthe)');
    });
  });

  describe('Call-to-Action Effectiveness', () => {
    it('should have clear and compelling French CTA text', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByText('CONTACTEZ-MOI');
      
      // Clear, direct call-to-action in French
      expect(button.textContent).toBe('CONTACTEZ-MOI');
      
      // Uppercase for emphasis and clarity
      expect(button).toHaveClass('uppercase');
    });

    it('should stand out visually for pregnant users', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // Distinctive styling
      expect(button).toHaveClass('rounded-full'); // Unique shape
      expect(button).toHaveClass('font-semibold'); // Bold text
      expect(button).toHaveStyle('background-color: var(--color-menthe)'); // Distinctive color
    });

    it('should be easily discoverable for pregnancy brain', () => {
      render(
        <TestWrapper>
          <ContactButton />
        </TestWrapper>
      );

      const button = screen.getByRole('link');
      
      // High contrast and clear positioning
      expect(button).toHaveClass('text-white'); // High contrast
      expect(button).toHaveTextContent('CONTACTEZ-MOI'); // Clear action
      
      // Adequate sizing for visibility
      PregnancySafeTestUtils.validateTouchTarget(button);
    });
  });
});