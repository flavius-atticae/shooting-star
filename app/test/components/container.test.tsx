import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '../../components/ui/container';

describe('Container Component - Pregnancy-Safe Testing', () => {
  describe('Size Variants - Real TailwindCSS Classes', () => {
    it('should render sm size with correct TailwindCSS classes', () => {
      render(
        <Container size="sm" data-testid="container-sm">
          <button>Test Button</button>
        </Container>
      );

      const container = screen.getByTestId('container-sm');
      
      // Validate actual TailwindCSS classes for sm size
      expect(container).toHaveClass('max-w-2xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('px-4');
    });

    it('should render md size with correct TailwindCSS classes', () => {
      render(
        <Container size="md" data-testid="container-md">
          <div>Content</div>
        </Container>
      );

      const container = screen.getByTestId('container-md');
      
      // Validate actual TailwindCSS classes for md size
      expect(container).toHaveClass('max-w-4xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('px-4');
    });

    it('should render lg size with correct TailwindCSS classes', () => {
      render(
        <Container size="lg" data-testid="container-lg">
          <div>Large content area</div>
        </Container>
      );

      const container = screen.getByTestId('container-lg');
      
      // Validate actual TailwindCSS classes for lg size
      expect(container).toHaveClass('max-w-6xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('px-4');
    });

    it('should render xl size with correct TailwindCSS classes', () => {
      render(
        <Container size="xl" data-testid="container-xl">
          <div>Extra large content</div>
        </Container>
      );

      const container = screen.getByTestId('container-xl');
      
      // Validate actual TailwindCSS classes for xl size
      expect(container).toHaveClass('max-w-7xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('px-4');
    });

    it('should render full width with correct TailwindCSS classes', () => {
      render(
        <Container size="full" data-testid="container-full">
          <div>Full width content</div>
        </Container>
      );

      const container = screen.getByTestId('container-full');
      
      // Validate actual TailwindCSS classes for full size
      expect(container).toHaveClass('w-full');
      expect(container).toHaveClass('px-4');
    });

    it('should default to md size when no size specified', () => {
      render(
        <Container data-testid="container-default">
          <div>Default content</div>
        </Container>
      );

      const container = screen.getByTestId('container-default');
      
      // Should have md size classes by default
      expect(container).toHaveClass('max-w-4xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('px-4');
    });
  });

  describe('Custom Element and Props', () => {
    it('should render as custom element type', () => {
      render(
        <Container as="section" size="md" data-testid="section-container">
          <div>Section content</div>
        </Container>
      );

      const container = screen.getByTestId('section-container');
      expect(container.tagName).toBe('SECTION');
      expect(container).toHaveClass('max-w-4xl');
    });

    it('should accept custom className alongside size classes', () => {
      render(
        <Container 
          size="sm" 
          className="custom-class" 
          data-testid="custom-container"
        >
          <div>Custom content</div>
        </Container>
      );

      const container = screen.getByTestId('custom-container');
      expect(container).toHaveClass('max-w-2xl'); // Size class
      expect(container).toHaveClass('custom-class'); // Custom class
    });

    it('should forward other HTML attributes', () => {
      render(
        <Container 
          size="md" 
          data-testid="attributed-container"
          role="main"
          aria-label="Main content area"
        >
          <div>Content with attributes</div>
        </Container>
      );

      const container = screen.getByTestId('attributed-container');
      expect(container).toHaveAttribute('role', 'main');
      expect(container).toHaveAttribute('aria-label', 'Main content area');
    });
  });

  describe('Pregnancy-Safe Design Validation', () => {
    it('should provide adequate spacing for touch targets', () => {
      render(
        <Container size="md" data-testid="touch-container">
          <button style={{ minHeight: '44px', margin: '8px' }}>
            Pregnancy-friendly button
          </button>
        </Container>
      );

      const container = screen.getByTestId('touch-container');
      const button = screen.getByRole('button');
      
      // Container should have adequate padding for pregnancy users
      expect(container).toHaveClass('px-4'); // TailwindCSS padding
      expect(button).toBeInTheDocument();
    });

    it('should support responsive design for different pregnancy contexts', () => {
      render(
        <Container size="lg" data-testid="responsive-container">
          <div>Responsive content for tablet/desktop when lying down</div>
        </Container>
      );

      const container = screen.getByTestId('responsive-container');
      
      // Should have responsive padding classes
      expect(container).toHaveClass('px-4'); // Base mobile padding
      expect(container).toHaveClass('sm:px-6'); // Small screen padding
      expect(container).toHaveClass('lg:px-8'); // Large screen padding
    });

    it('should maintain readability with proper content constraints', () => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
      
      render(
        <Container size="sm" data-testid="readable-container">
          <p data-testid="long-text">{longText}</p>
        </Container>
      );

      const container = screen.getByTestId('readable-container');
      const text = screen.getByTestId('long-text');
      
      // sm size should constrain width for optimal reading during pregnancy
      expect(container).toHaveClass('max-w-2xl');
      expect(text).toBeInTheDocument();
    });
  });

  describe('French Content Support', () => {
    it('should handle French text without layout issues', () => {
      const frenchContent = "Découvrez nos cours de yoga prénatal adaptés à chaque trimestre de votre grossesse. Nos séances sont conçues pour votre bien-être et celui de votre bébé.";
      
      render(
        <Container size="md" data-testid="french-container">
          <div lang="fr-CA">{frenchContent}</div>
        </Container>
      );

      const container = screen.getByTestId('french-container');
      const content = screen.getByText(/Découvrez nos cours/);
      
      expect(container).toHaveClass('max-w-4xl');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('lang', 'fr-CA');
    });
  });

  describe('Accessibility Features', () => {
    it('should provide proper semantic structure', () => {
      render(
        <Container as="main" size="md" data-testid="semantic-container">
          <h1>Main Content</h1>
          <p>Accessible content structure</p>
        </Container>
      );

      const container = screen.getByTestId('semantic-container');
      const heading = screen.getByRole('heading');
      
      expect(container.tagName).toBe('MAIN');
      expect(heading).toBeInTheDocument();
    });

    it('should support screen reader navigation', () => {
      render(
        <Container 
          as="section" 
          size="lg" 
          data-testid="sr-container"
          aria-label="Pregnancy resources"
        >
          <div role="region" aria-label="Helpful pregnancy information" data-testid="inner-region">
            <p>Content optimized for screen readers during pregnancy</p>
          </div>
        </Container>
      );

      const container = screen.getByTestId('sr-container');
      const region = screen.getByTestId('inner-region');
      
      expect(container).toHaveAttribute('aria-label', 'Pregnancy resources');
      expect(region).toHaveAttribute('aria-label', 'Helpful pregnancy information');
    });
  });
});