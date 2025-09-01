import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { MobileMenu } from '~/components/layout/header/mobile-menu';
import { 
  PregnancySafeTestUtils, 
  PREGNANCY_CONSTANTS, 
  PREGNANCY_SAFE_COLORS 
} from '../../patterns/pregnancy-safe.test';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('MobileMenu Component - Pregnancy-Safe Design', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let mockOnClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnClose = vi.fn();
    // Reset body overflow styles
    document.body.style.overflow = 'unset';
    
    // Mock addEventListener and removeEventListener for keyboard events
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    
    // Clear previous calls
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  afterEach(() => {
    // Clean up body styles
    document.body.style.overflow = 'unset';
    vi.restoreAllMocks();
  });

  describe('Visibility & Rendering', () => {
    it('should not render when closed', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={false} onClose={mockOnClose} />
        </TestWrapper>
      );

      expect(screen.queryByRole('navigation', { name: /Menu de navigation principal/ })).not.toBeInTheDocument();
    });

    it('should render when open with proper structure', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Check main navigation
      const navigation = screen.getByRole('navigation', { name: /Menu de navigation principal/ });
      expect(navigation).toBeInTheDocument();

      // Check backdrop
      const backdrop = navigation.parentElement?.querySelector('.bg-neutral\\/20');
      expect(backdrop).toBeInTheDocument();
    });

    it('should have proper positioning relative to header', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContent = screen.getByRole('navigation').parentElement;
      
      // Should position below header
      expect(menuContent).toHaveClass('fixed', 'inset-x-0', 'top-14', 'sm:top-16', 'z-50');
      expect(menuContent).toHaveClass('lg:hidden'); // Hidden on desktop
    });
  });

  describe('Navigation Items & French Content', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );
    });

    it('should display all navigation items in French', () => {
      const navItems = [
        { text: 'Doula', description: 'Accompagnement de doula' },
        { text: 'Yoga', description: 'Enseignement du yoga' },
        { text: 'Féminin', description: 'Le féminin sacré - ateliers variés' },
        { text: 'À propos', description: 'Pauline Roussel, Doula et professeure de Yoga' }
      ];

      navItems.forEach(item => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
        expect(screen.getByText(item.description)).toBeInTheDocument();
      });
    });

    it('should have proper navigation links with correct hrefs', () => {
      const expectedLinks = [
        { text: 'Doula', href: '/doula' },
        { text: 'Yoga', href: '/yoga' },
        { text: 'Féminin', href: '/feminin' },
        { text: 'À propos', href: '/about' }
      ];

      expectedLinks.forEach(link => {
        const linkElement = screen.getByText(link.text).closest('a');
        expect(linkElement).toHaveAttribute('href', link.href);
      });
    });

    it('should have contact button with proper French text', () => {
      const contactButton = screen.getByText('Contactez-moi');
      expect(contactButton).toBeInTheDocument();
      expect(contactButton.tagName.toLowerCase()).toBe('span');
      expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');
    });
  });

  describe('Touch Targets & Pregnancy-Safe Interactions', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );
    });

    it('should have pregnancy-safe touch targets for all navigation items', () => {
      const navLinks = screen.getAllByRole('link');
      
      navLinks.forEach(link => {
        PregnancySafeTestUtils.validateTouchTarget(link, { 
          minSize: PREGNANCY_CONSTANTS.TOUCH_TARGET_MIN, 
          context: 'Mobile menu navigation link' 
        });
      });
    });

    it('should have comfortable spacing between navigation items', () => {
      const navItems = screen.getAllByRole('listitem');
      
      // Check spacing between adjacent items
      if (navItems.length > 1) {
        PregnancySafeTestUtils.validateSpacing(navItems[0], navItems[1]);
      }
    });

    it('should handle imprecise clicks from swollen fingers', async () => {
      const firstNavLink = screen.getByText('Doula').closest('a')!;
      
      // Simulate multiple imprecise clicks
      for (let i = 0; i < 3; i++) {
        await PregnancySafeTestUtils.simulateSwollenFingerClick(firstNavLink, user);
      }
      
      // Navigation should remain stable
      expect(firstNavLink).toBeInTheDocument();
    });

    it('should handle pregnancy brain interactions gracefully', async () => {
      const contactButton = screen.getByText('Contactez-moi').closest('a')!;
      
      // Simulate delayed/interrupted interaction pattern
      await PregnancySafeTestUtils.simulatePregnancyBrainInteraction(contactButton, user);
      
      expect(contactButton).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation & Accessibility', () => {
    it('should close menu with Escape key', async () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Simulate Escape key press
      fireEvent.keyDown(document, { key: 'Escape' });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should set up and clean up keyboard event listeners', () => {
      const { unmount } = render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should add event listener when open
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

      // Should clean up on unmount
      unmount();
      expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should support tab navigation through menu items', async () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const navLinks = screen.getAllByRole('link');
      
      // Tab through navigation items
      await user.tab();
      expect(navLinks[0]).toHaveFocus();
      
      await user.tab();
      expect(navLinks[1]).toHaveFocus();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveAttribute('aria-label', 'Menu de navigation principal');

      const navList = screen.getByRole('list');
      expect(navList).toBeInTheDocument();
    });

    it('should have proper aria-describedby relationships', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const doulaLink = screen.getByText('Doula').closest('a');
      expect(doulaLink).toHaveAttribute('aria-describedby', 'menu-item-doula-desc');

      const doulaDesc = screen.getByText('Accompagnement de doula');
      expect(doulaDesc).toHaveAttribute('id', 'menu-item-doula-desc');
    });
  });

  describe('Body Scroll Management', () => {
    it('should prevent body scroll when menu is open', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should set body overflow to hidden
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when menu closes', () => {
      const { rerender } = render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      expect(document.body.style.overflow).toBe('hidden');

      // Close menu
      rerender(
        <TestWrapper>
          <MobileMenu isOpen={false} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should restore scroll
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should clean up body scroll on unmount', () => {
      const { unmount } = render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      // Should restore scroll
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('Backdrop Interaction', () => {
    it('should close menu when backdrop is clicked', async () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const backdrop = document.querySelector('.bg-neutral\\/20');
      expect(backdrop).toBeInTheDocument();

      // Click backdrop
      if (backdrop) {
        await user.click(backdrop as HTMLElement);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('should have proper backdrop styling', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const backdrop = document.querySelector('.bg-neutral\\/20');
      expect(backdrop).toHaveClass(
        'fixed', 'inset-x-0', 'top-14', 'sm:top-16', 'bottom-0',
        'bg-neutral/20', 'z-40', 'lg:hidden'
      );
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Navigation Link Interactions', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );
    });

    it('should close menu when navigation link is clicked', async () => {
      const doulaLink = screen.getByText('Doula');
      
      await user.click(doulaLink);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should close menu when contact button is clicked', async () => {
      const contactButton = screen.getByText('Contactez-moi');
      
      await user.click(contactButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should handle Enter key on navigation links', async () => {
      const doulaLink = screen.getByText('Doula').closest('a')!;
      
      doulaLink.focus();
      await user.keyboard('{Enter}');
      
      // Should close menu
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visual Design & Pregnancy-Safe Styling', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );
    });

    it('should use pregnancy-safe colors and styling', () => {
      const navigation = screen.getByRole('navigation');
      const menuContainer = navigation.parentElement;
      
      // White background for calm feeling
      expect(menuContainer).toHaveClass('bg-white');
      
      // Gentle border and shadow
      expect(menuContainer).toHaveClass('border-b', 'border-gris/30', 'shadow-xl');
    });

    it('should have gentle slide-in animation', () => {
      const navigation = screen.getByRole('navigation');
      const menuContainer = navigation.parentElement;
      
      // Gentle slide-in animation (≤ 200ms for pregnancy)
      expect(menuContainer).toHaveClass('animate-in', 'slide-in-from-top-2', 'duration-200');
    });

    it('should use pregnancy-safe contact button styling', () => {
      const contactButton = screen.getByText('Contactez-moi').closest('a');
      
      // Primary background with white text
      expect(contactButton).toHaveClass('bg-primary', 'text-white');
      expect(contactButton).toHaveClass('rounded-full');
      
      // Validate colors are pregnancy-safe
      PregnancySafeTestUtils.validatePregnancySafeColor(PREGNANCY_SAFE_COLORS.primary);
    });

    it('should have high contrast for pregnancy fatigue', () => {
      const navLinks = screen.getAllByRole('link');
      
      navLinks.forEach(link => {
        // Should use high contrast text colors
        expect(link).toHaveClass('text-neutral');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should be hidden on desktop screens', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContainer = screen.getByRole('navigation').parentElement;
      expect(menuContainer).toHaveClass('lg:hidden');
    });

    it('should adapt to different header heights', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContainer = screen.getByRole('navigation').parentElement;
      const backdrop = document.querySelector('.bg-neutral\\/20');
      
      // Both should adapt to responsive header heights
      expect(menuContainer).toHaveClass('top-14', 'sm:top-16');
      expect(backdrop).toHaveClass('top-14', 'sm:top-16');
    });

    it('should handle content overflow appropriately', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const scrollContainer = screen.getByRole('navigation').parentElement?.querySelector('.max-h-\\[calc\\(100vh-3\\.5rem\\)\\]');
      expect(scrollContainer).toHaveClass('max-h-[calc(100vh-3.5rem)]', 'overflow-y-auto');
    });
  });

  describe('Footer Information', () => {
    it('should display footer info in French', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      expect(screen.getByText('Pauline Roussel')).toBeInTheDocument();
      expect(screen.getByText('Yoga prénatal • Accompagnement à la naissance')).toBeInTheDocument();
      expect(screen.getByText('Québec, Canada')).toBeInTheDocument();
    });

    it('should use proper typography for footer', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const paulineText = screen.getByText('Pauline Roussel');
      expect(paulineText).toHaveClass('font-heading'); // The Seasons font
      
      const footer = paulineText.closest('.text-sm');
      expect(footer).toHaveClass('text-sm', 'text-neutral/60');
    });
  });

  describe('Animation & Motion Safety', () => {
    it('should have pregnancy-safe animation duration', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContainer = screen.getByRole('navigation').parentElement;
      
      // 200ms duration is safe for pregnancy (no nausea)
      expect(menuContainer).toHaveClass('duration-200');
    });

    it('should not have jarring animations', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContainer = screen.getByRole('navigation').parentElement;
      const classes = menuContainer?.className || '';
      
      // No bounce, pulse, or spin animations
      expect(classes).not.toContain('bounce');
      expect(classes).not.toContain('pulse');
      expect(classes).not.toContain('spin');
      expect(classes).not.toContain('ping');
    });

    it('should use gentle slide animation', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const menuContainer = screen.getByRole('navigation').parentElement;
      
      // Gentle slide from top
      expect(menuContainer).toHaveClass('slide-in-from-top-2');
    });
  });

  describe('Error Handling & Edge Cases', () => {
    it('should handle rapid open/close toggles gracefully', async () => {
      const { rerender } = render(
        <TestWrapper>
          <MobileMenu isOpen={false} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Rapidly toggle multiple times
      for (let i = 0; i < 5; i++) {
        rerender(
          <TestWrapper>
            <MobileMenu isOpen={true} onClose={mockOnClose} />
          </TestWrapper>
        );
        
        rerender(
          <TestWrapper>
            <MobileMenu isOpen={false} onClose={mockOnClose} />
          </TestWrapper>
        );
      }
      
      // Body scroll should be properly restored
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should handle missing onClose prop gracefully', () => {
      // This tests defensive programming
      expect(() => {
        render(
          <TestWrapper>
            <MobileMenu isOpen={true} onClose={undefined as any} />
          </TestWrapper>
        );
      }).not.toThrow();
    });

    it('should handle missing router context', () => {
      // Links require router context
      expect(() => {
        render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
      }).toThrow();
    });
  });

  describe('Performance Considerations', () => {
    it('should not render DOM elements when closed', () => {
      render(
        <TestWrapper>
          <MobileMenu isOpen={false} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should render null and not pollute DOM
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(document.querySelector('.bg-neutral\\/20')).not.toBeInTheDocument();
    });

    it('should clean up event listeners properly', () => {
      const { unmount } = render(
        <TestWrapper>
          <MobileMenu isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should clean up on unmount
      unmount();
      
      expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should not cause memory leaks with rapid mounting/unmounting', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(
          <TestWrapper>
            <MobileMenu isOpen={true} onClose={mockOnClose} />
          </TestWrapper>
        );
        
        unmount();
      }
      
      // Body overflow should be properly restored
      expect(document.body.style.overflow).toBe('unset');
    });
  });
});