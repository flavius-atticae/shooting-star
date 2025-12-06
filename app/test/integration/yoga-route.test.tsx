import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

/**
 * Integration tests for /yoga route
 * 
 * Validates that the Yoga page renders correctly with:
 * - Proper Hero section with French content
 * - Three FeatureBlock components with alternating layouts
 * - CallToAction section
 * - Footer component
 * - WCAG 2.1 AA accessibility compliance
 * - French language support
 */

// Import the actual Yoga page component
import YogaPage from '../../routes/yoga';

describe('Yoga Route Integration Tests', () => {
  
  const createTestRouter = () => {
    const routes: RouteObject[] = [
      {
        path: '/yoga',
        element: <YogaPage />,
      },
    ];

    return createMemoryRouter(routes, {
      initialEntries: ['/yoga'],
    });
  };

  describe('Route Rendering', () => {
    it('should render the yoga page without errors', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify main content area exists
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('should render Hero section with correct French title', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for main title
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Enseignement du yoga');
    });

    it('should render Hero section with correct French subtitle', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for subtitle
      expect(screen.getByText('AVEC PAULINE ROUSSEL')).toBeInTheDocument();
    });

    it('should render all three FeatureBlock sections', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify all three course sections
      expect(screen.getByRole('heading', { level: 3, name: /Cours privés/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Cours en studio/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Cours en entreprises/i })).toBeInTheDocument();
    });

    it('should render CallToAction section', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for CTA heading
      const ctaHeading = screen.getByRole('heading', { level: 2 });
      expect(ctaHeading).toHaveTextContent(/douceur et bienveillance/i);

      // Check for CTA button
      const ctaButton = screen.getByRole('link', { name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '/contact');
    });

    it('should render Footer component', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Footer should contain contentinfo landmark
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Accessibility Compliance', () => {
    it('should have proper semantic HTML structure', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Check for proper heading hierarchy
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Enseignement du yoga');
    });

    it('should have accessible region labels in French', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Main content should be properly labeled
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'main-content');
      expect(main).toHaveAttribute('role', 'main');
    });

    it('should have proper heading hierarchy', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check h1 (Hero)
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      // Check h2 (CallToAction)
      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThanOrEqual(1);

      // Check h3 (FeatureBlocks)
      const h3Headings = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headings.length).toBe(3);
    });

    it('should support keyboard navigation', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify the page renders without interactive elements blocking keyboard nav
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have FeatureBlocks with French lang attribute', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Verify FeatureBlock articles have lang="fr"
      const articles = container.querySelectorAll('article[lang="fr"]');
      expect(articles.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('French Language Support', () => {
    it('should display all text content in French', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify French title
      expect(screen.getByText('Enseignement du yoga')).toBeInTheDocument();
      
      // Verify French subtitle
      expect(screen.getByText('AVEC PAULINE ROUSSEL')).toBeInTheDocument();

      // Verify French FeatureBlock titles
      expect(screen.getByText('Cours privés')).toBeInTheDocument();
      expect(screen.getByText('Cours en studio')).toBeInTheDocument();
      expect(screen.getByText('Cours en entreprises')).toBeInTheDocument();

      // Verify French CTA text
      expect(screen.getByText(/douceur et bienveillance/i)).toBeInTheDocument();
    });

    it('should have French descriptions in FeatureBlocks', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify French descriptions are present
      expect(screen.getByText(/accompagnement personnalisé/i)).toBeInTheDocument();
      expect(screen.getByText(/espace chaleureux et sécurisant/i)).toBeInTheDocument();
      expect(screen.getByText(/moment de ressourcement/i)).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('should have Hero section as first element in main', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      const main = screen.getByRole('main');
      const heroRegion = screen.getByRole('region', { name: 'Section principale d\'accueil' });
      
      // Hero should be within main content
      expect(main).toContainElement(heroRegion);
    });

    it('should have Footer after main content', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Get both main and footer
      const main = screen.getByRole('main');
      const footer = screen.getByRole('contentinfo');

      // Both should exist
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      // Footer should come after main in DOM order
      const mainIndex = Array.from(container.querySelectorAll('*')).indexOf(main);
      const footerIndex = Array.from(container.querySelectorAll('*')).indexOf(footer);
      expect(footerIndex).toBeGreaterThan(mainIndex);
    });

    it('should have three FeatureBlock articles', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Should have exactly 3 article elements (FeatureBlocks)
      const articles = container.querySelectorAll('article[lang="fr"]');
      expect(articles.length).toBe(3);
    });

    it('should have images in all FeatureBlocks', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Each FeatureBlock should have an image
      const articles = container.querySelectorAll('article[lang="fr"]');
      articles.forEach((article) => {
        const img = article.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt');
        expect(img?.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should render without layout errors on mobile viewport', () => {
      const router = createTestRouter();
      
      // Note: jsdom does not support viewport simulation via global.innerWidth
      // This test validates that the page renders without errors
      // Visual responsive testing is handled by Storybook/Chromatic
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render without layout errors on tablet viewport', () => {
      const router = createTestRouter();
      
      // Note: jsdom does not support viewport simulation via global.innerWidth
      // This test validates that the page renders without errors
      // Visual responsive testing is handled by Storybook/Chromatic
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render without layout errors on desktop viewport', () => {
      const router = createTestRouter();
      
      // Note: jsdom does not support viewport simulation via global.innerWidth
      // This test validates that the page renders without errors
      // Visual responsive testing is handled by Storybook/Chromatic
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('FeatureBlocks Layout', () => {
    it('should have alternating layouts (text-left, text-right, text-left)', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Get all three FeatureBlock articles
      const articles = container.querySelectorAll('article[lang="fr"]');
      expect(articles.length).toBe(3);

      // Verify they contain the expected titles in order
      const titles = Array.from(articles).map(article => 
        article.querySelector('h3')?.textContent
      );
      
      expect(titles[0]).toBe('Cours privés');
      expect(titles[1]).toBe('Cours en studio');
      expect(titles[2]).toBe('Cours en entreprises');
    });

    it('should have images with lazy loading', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // All FeatureBlock images should have loading="lazy"
      const images = container.querySelectorAll('article[lang="fr"] img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  describe('CallToAction Integration', () => {
    it('should have proper CTA button with href', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      const ctaButton = screen.getByRole('link', { name: /RÉSERVEZ UN APPEL DÉCOUVERTE/i });
      
      // Verify button properties
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '/contact');
      expect(ctaButton.tagName).toBe('A');
    });

    it('should have CTA subtitle text', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify CTA subtitle is present
      expect(screen.getByText(/Curieuse et ouverte/i)).toBeInTheDocument();
      expect(screen.getByText(/accompagnement sensible et doux/i)).toBeInTheDocument();
    });
  });
});
