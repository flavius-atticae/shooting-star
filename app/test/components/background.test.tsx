import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Background } from "~/components/ui";

describe('Background Component - Pregnancy-Safe Testing', () => {
  describe('Pregnancy-Safe Variants', () => {
    it('should render white variant safely', () => {
      render(
        <Background variant="white" data-testid="white-bg">
          <div>White background content</div>
        </Background>
      );

      const background = screen.getByTestId('white-bg');
      expect(background).toHaveClass('bg-white');
      expect(background).toBeInTheDocument();
    });

    it('should render accent variant safely', () => {
      render(
        <Background variant="accent" data-testid="accent-bg">
          <div>Accent background content</div>
        </Background>
      );

      const background = screen.getByTestId('accent-bg');
      expect(background).toHaveClass('bg-gris');
      expect(background).toBeInTheDocument();
    });

    it('should render soft gradient variant', () => {
      render(
        <Background variant="soft" data-testid="soft-bg">
          <div>Soft gradient content</div>
        </Background>
      );

      const background = screen.getByTestId('soft-bg');
      expect(background).toHaveClass('bg-gradient-to-br');
      expect(background).toBeInTheDocument();
    });

    it('should render gradient-soft variant', () => {
      render(
        <Background variant="gradient-soft" data-testid="gradient-soft-bg">
          <div>Gradient soft content</div>
        </Background>
      );

      const background = screen.getByTestId('gradient-soft-bg');
      expect(background).toHaveClass('bg-gradient-to-br');
      expect(background).toBeInTheDocument();
    });

    it('should render gradient-warm variant', () => {
      render(
        <Background variant="gradient-warm" data-testid="gradient-warm-bg">
          <div>Gradient warm content</div>
        </Background>
      );

      const background = screen.getByTestId('gradient-warm-bg');
      expect(background).toHaveClass('bg-gradient-to-br');
      expect(background).toBeInTheDocument();
    });

    it('should use default white variant when no variant specified', () => {
      render(
        <Background data-testid="default-bg">
          <div>Default content</div>
        </Background>
      );

      const background = screen.getByTestId('default-bg');
      expect(background).toHaveClass('bg-white');
      expect(background).toBeInTheDocument();
    });
  });

  describe('Custom Element Rendering', () => {
    it('should render as custom element type', () => {
      render(
        <Background as="section" variant="white" data-testid="section-bg">
          <div>Section content</div>
        </Background>
      );

      const background = screen.getByTestId('section-bg');
      expect(background.tagName).toBe('SECTION');
      expect(background).toHaveClass('bg-white');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className alongside variant styles', () => {
      render(
        <Background 
          variant="accent" 
          className="custom-class"
          data-testid="custom-bg"
        >
          <div>Custom styled content</div>
        </Background>
      );

      const background = screen.getByTestId('custom-bg');
      expect(background).toHaveClass('bg-gris');
      expect(background).toHaveClass('custom-class');
    });
  });

  describe('Pregnancy-Safe Color Testing', () => {
    it('should avoid anxiety-inducing red colors', () => {
      // All our variants should use calming colors
      const variants = ['white', 'accent', 'soft', 'gradient-soft', 'gradient-warm'];
      
      variants.forEach((variant) => {
        render(
          <Background variant={variant as any} data-testid={`${variant}-test`}>
            <div>Content for {variant}</div>
          </Background>
        );
        
        const background = screen.getByTestId(`${variant}-test`);
        expect(background).toBeInTheDocument();
        
        // Should not have red-based class names
        expect(background.className).not.toMatch(/red|danger|error/i);
      });
    });

    it('should provide adequate contrast for pregnancy fatigue', () => {
      render(
        <Background variant="white" data-testid="contrast-bg">
          <div style={{ color: '#000000' }}>
            High contrast text for easier reading during pregnancy fatigue
          </div>
        </Background>
      );

      const background = screen.getByTestId('contrast-bg');
      const text = screen.getByText(/High contrast text/);
      
      expect(background).toHaveClass('bg-white');
      expect(text).toBeInTheDocument();
      expect(text).toBeVisible();
    });
  });

  describe('French Content Support', () => {
    it('should handle French text without issues', () => {
      const frenchText = "Découvrez nos cours de yoga prénatal adaptés à chaque trimestre de votre grossesse.";
      
      render(
        <Background variant="gradient-soft" data-testid="french-bg">
          <div lang="fr-CA">{frenchText}</div>
        </Background>
      );

      const background = screen.getByTestId('french-bg');
      const text = screen.getByText(/Découvrez nos cours/);
      
      expect(background).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      expect(text).toHaveAttribute('lang', 'fr-CA');
    });
  });

  describe('Accessibility Features', () => {
    it('should support proper semantic structure', () => {
      render(
        <Background as="main" variant="white" data-testid="semantic-bg">
          <h1>Main Content</h1>
          <p>Accessible content structure</p>
        </Background>
      );

      const background = screen.getByTestId('semantic-bg');
      expect(background.tagName).toBe('MAIN');
      
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    it('should maintain readability with screen readers', () => {
      render(
        <Background variant="accent" data-testid="accessible-bg">
          <div role="region" aria-label="Pregnancy-safe content area">
            <p>This content is optimized for screen readers</p>
          </div>
        </Background>
      );

      const background = screen.getByTestId('accessible-bg');
      const region = screen.getByRole('region');
      
      expect(background).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-label', 'Pregnancy-safe content area');
    });
  });
});
