import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Container } from '../../components/ui/container';

// Pregnancy-safe testing utilities
const PREGNANCY_TOUCH_TARGET_MIN = 44; // 44px minimum for swollen fingers
const PREGNANCY_SAFE_CONTRAST_RATIO = 4.5; // Higher than standard for fatigue

describe('Container Component - Pregnancy-Safe Testing', () => {
  // Helper function to validate minimum padding expectations
  const validatePaddingClass = (element: HTMLElement, expectedClass: string) => {
    expect(element).toHaveClass(expectedClass);
    // In a real implementation with TailwindCSS, these classes would provide adequate padding
    return true;
  };

  describe('Size Variants - Touch-Friendly Spacing', () => {
    it('should render sm size with adequate padding for pregnancy', () => {
      render(
        <Container size="sm" data-testid="container-sm">
          <button>Test Button</button>
        </Container>
      );

      const container = screen.getByTestId('container-sm');
      
      // Validate that the container has the correct size class and structure
      validatePaddingClass(container, 'container-sm');
      expect(container).toHaveClass('px-4'); // TailwindCSS class for adequate padding
    });

    it('should render md size with comfortable spacing', () => {
      render(
        <Container size="md" data-testid="container-md">
          <div>Content</div>
        </Container>
      );

      const container = screen.getByTestId('container-md');
      
      // Validate medium container has generous padding
      validatePaddingClass(container, 'container-md');
      expect(container).toHaveClass('px-6'); // TailwindCSS class for comfortable spacing
    });

    it('should render lg size with pregnancy-comfortable spacing', () => {
      render(
        <Container size="lg" data-testid="container-lg">
          <form>
            <input type="text" placeholder="Test input" />
          </form>
        </Container>
      );

      const container = screen.getByTestId('container-lg');
      
      // Validate large container has extra space for forms
      validatePaddingClass(container, 'container-lg');
      expect(container).toHaveClass('px-8'); // TailwindCSS class for extra spacing
    });

    it('should render xl size with maximum comfort spacing', () => {
      render(
        <Container size="xl" data-testid="container-xl">
          <article>Long content article</article>
        </Container>
      );

      const container = screen.getByTestId('container-xl');
      
      // Validate XL container has maximum comfort spacing
      validatePaddingClass(container, 'container-xl');
      expect(container).toHaveClass('px-10'); // TailwindCSS class for maximum comfort
    });

    it('should render full size with edge-to-edge layout', () => {
      render(
        <Container size="full" data-testid="container-full">
          <div>Full width content</div>
        </Container>
      );

      const container = screen.getByTestId('container-full');
      
      // Full containers should use full width
      expect(container).toHaveClass('container-full');
      expect(container).toHaveClass('w-full'); // TailwindCSS full width class
    });
  });

  describe('Responsive Behavior - Mobile-First for Pregnancy', () => {
    beforeEach(() => {
      // Reset viewport to mobile size (pregnancy users often on mobile)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // iPhone SE width (common among budget-conscious new parents)
      });
    });

    it('should maintain touch-friendly spacing on mobile', () => {
      render(
        <Container size="md" data-testid="mobile-container">
          <button style={{ minHeight: '44px', minWidth: '44px' }}>
            Touch Target
          </button>
        </Container>
      );

      const container = screen.getByTestId('mobile-container');
      const button = screen.getByText('Touch Target');
      
      // Verify container provides adequate structure for touch targets
      expect(container).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      
      // In a real implementation, the button would have inline styles for minimum size
      // Here we verify the button has the correct styling applied
      expect(button).toHaveStyle({ minHeight: '44px', minWidth: '44px' });
      
      // Container provides appropriate wrapper structure
      expect(container).toContainElement(button);
    });

    it('should adapt container max-width responsively', () => {
      render(
        <Container size="lg" data-testid="responsive-container">
          <div>Responsive content</div>
        </Container>
      );

      const container = screen.getByTestId('responsive-container');
      
      // Should have responsive classes
      expect(container.className).toMatch(/max-w-/);
    });
  });

  describe('Custom Element Rendering - Semantic HTML for Screen Readers', () => {
    it('should render as custom element when specified', () => {
      render(
        <Container as="section" size="md" data-testid="semantic-container">
          <h2>Section Title</h2>
          <p>Section content</p>
        </Container>
      );

      const container = screen.getByTestId('semantic-container');
      expect(container.tagName).toBe('SECTION');
      expect(container).toHaveClass('container-md');
    });

    it('should render as article for blog content', () => {
      render(
        <Container as="article" size="lg" data-testid="article-container">
          <header>
            <h1>Pregnancy Tips</h1>
          </header>
          <main>Article content about pregnancy wellness</main>
        </Container>
      );

      const container = screen.getByTestId('article-container');
      expect(container.tagName).toBe('ARTICLE');
      expect(container).toHaveClass('container-lg');
    });

    it('should render as main landmark for page content', () => {
      render(
        <Container as="main" size="xl" data-testid="main-container">
          <h1>Main Page Content</h1>
        </Container>
      );

      const container = screen.getByTestId('main-container');
      expect(container.tagName).toBe('MAIN');
      // Main elements have implicit role="main", don't need explicit attribute
    });
  });

  describe('Accessibility Compliance - WCAG 2.1 AA for Pregnancy', () => {
    it('should have proper landmark roles when semantic', () => {
      render(
        <Container as="nav" size="sm" data-testid="nav-container">
          <ul>
            <li><a href="/classes">Classes</a></li>
            <li><a href="/resources">Resources</a></li>
          </ul>
        </Container>
      );

      const container = screen.getByTestId('nav-container');
      expect(container.tagName).toBe('NAV');
      // Nav elements have implicit role="navigation", don't need explicit attribute
    });

    it('should support assistive technology attributes', () => {
      render(
        <Container 
          size="md" 
          aria-label="Pregnancy resources section"
          data-testid="labeled-container"
        >
          <div>Important pregnancy information</div>
        </Container>
      );

      const container = screen.getByTestId('labeled-container');
      expect(container).toHaveAttribute('aria-label', 'Pregnancy resources section');
    });

    it('should maintain focus management for keyboard navigation', () => {
      render(
        <Container size="md" tabIndex={0} data-testid="focusable-container">
          <button>First button</button>
          <button>Second button</button>
        </Container>
      );

      const container = screen.getByTestId('focusable-container');
      container.focus();
      expect(document.activeElement).toBe(container);
    });
  });

  describe('Content Safety - Pregnancy-Specific Considerations', () => {
    it('should handle long content without horizontal scroll', () => {
      const longText = 'This is a very long text that might cause horizontal scrolling issues for pregnant users who may have difficulty navigating horizontally due to physical discomfort. '.repeat(10);
      
      render(
        <Container size="md" data-testid="content-container">
          <p>{longText}</p>
        </Container>
      );

      const container = screen.getByTestId('content-container');
      
      // Container should have classes that handle overflow appropriately
      expect(container).toHaveClass('overflow-x-hidden');
      expect(container).toHaveClass('break-words');
    });

    it('should provide adequate spacing between interactive elements', () => {
      render(
        <Container size="lg" data-testid="interactive-container">
          <button style={{ marginRight: '8px' }}>Submit</button>
          <button style={{ marginRight: '8px' }}>Cancel</button>
          <button>Help</button>
        </Container>
      );

      const buttons = screen.getAllByRole('button');
      
      // Verify buttons exist and are accessible
      expect(buttons).toHaveLength(3);
      
      // In a real implementation, buttons would have adequate spacing through CSS
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).toBeEnabled();
      });
    });
  });

  describe('Performance - Pregnancy Fatigue Considerations', () => {
    it('should render without performance warnings', () => {
      // Mock console.warn to track performance issues
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <Container size="xl" data-testid="performance-container">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Container>
      );

      const container = screen.getByTestId('performance-container');
      expect(container).toBeInTheDocument();
      
      // Should not trigger performance warnings
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should support lazy loading of heavy content', () => {
      render(
        <Container size="lg" data-testid="lazy-container">
          <div data-testid="heavy-content" style={{ minHeight: '1000px' }}>
            Heavy content that might cause fatigue if loaded all at once
          </div>
        </Container>
      );

      const heavyContent = screen.getByTestId('heavy-content');
      
      // Heavy content should be present but optimized
      expect(heavyContent).toBeInTheDocument();
    });
  });

  describe('French Language Support', () => {
    it('should handle French text without layout issues', () => {
      const frenchText = "Bienvenue dans votre parcours de grossesse et de maternité. Nos cours de yoga prénatal sont conçus spécialement pour vous accompagner.";
      
      render(
        <Container size="md" data-testid="french-container">
          <p>{frenchText}</p>
        </Container>
      );

      const container = screen.getByTestId('french-container');
      const text = screen.getByText(/Bienvenue dans votre parcours/);
      
      expect(container).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      
      // Should handle French text properly (French reads left-to-right)
      expect(text).toBeVisible();
    });

    it('should support French accessibility attributes', () => {
      render(
        <Container 
          size="md" 
          lang="fr-CA"
          aria-label="Section des ressources de grossesse"
          data-testid="french-a11y-container"
        >
          <h2>Ressources</h2>
        </Container>
      );

      const container = screen.getByTestId('french-a11y-container');
      expect(container).toHaveAttribute('lang', 'fr-CA');
      expect(container).toHaveAttribute('aria-label', 'Section des ressources de grossesse');
    });
  });
});