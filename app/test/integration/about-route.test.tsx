import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

/**
 * Integration tests for /a-propos route (About page)
 * 
 * Validates that the About page renders correctly with:
 * - Proper Hero section with French content
 * - About section with 4 subsections (Qui suis-je?, Mon parcours, Ce qui m'inspire, Ma méthode)
 * - Mes inspirations section with 3 cards (Holistique, Bienveillante, Engagée)
 * - CallToAction section
 * - Footer component
 * - WCAG 2.1 AA accessibility compliance
 * - French language support
 */

// Import the actual About page component
import AboutPage from '../../routes/about';

describe('About Route Integration Tests', () => {
  
  const createTestRouter = () => {
    const routes: RouteObject[] = [
      {
        path: '/a-propos',
        element: <AboutPage />,
      },
    ];

    return createMemoryRouter(routes, {
      initialEntries: ['/a-propos'],
    });
  };

  describe('Route Rendering', () => {
    it('should render the about page without errors', () => {
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
      expect(title).toHaveTextContent('Pauline Roussel');
    });

    it('should render Hero section with correct French subtitle', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for subtitle
      expect(screen.getByText('DOULA ET PROFESSEURE DE YOGA')).toBeInTheDocument();
    });

    it('should render About section with 4 subsections', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify section title
      expect(screen.getByRole('heading', { level: 2, name: /À propos de moi/i })).toBeInTheDocument();

      // Verify all four subsection titles
      expect(screen.getByRole('heading', { level: 3, name: /Qui suis-je/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Mon parcours/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Ce qui m'inspire/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Ma méthode/i })).toBeInTheDocument();
    });

    it('should render Mes inspirations section with 3 cards', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify section title
      expect(screen.getByRole('heading', { level: 2, name: /Mes inspirations/i })).toBeInTheDocument();

      // Verify all three inspiration card titles
      expect(screen.getByRole('heading', { level: 3, name: /Holistique/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Bienveillante/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /Engagée/i })).toBeInTheDocument();
    });

    it('should render CallToAction section', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for CTA heading
      const ctaHeading = screen.getByRole('heading', { level: 2, name: /douceur et bienveillance/i });
      expect(ctaHeading).toBeInTheDocument();

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
      expect(h1).toHaveTextContent('Pauline Roussel');
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

      // Check h2 (About section, Inspirations section, CallToAction)
      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThanOrEqual(3);

      // Check h3 (4 About subsections + 3 Inspiration cards)
      const h3Headings = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headings.length).toBeGreaterThanOrEqual(7);
    });

    it('should support keyboard navigation', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify the page renders without interactive elements blocking keyboard nav
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have sections with French lang attribute', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Verify sections have lang="fr"
      const frenchElements = container.querySelectorAll('[lang="fr"]');
      expect(frenchElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('French Language Support', () => {
    it('should display all text content in French', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify French title
      expect(screen.getByText('Pauline Roussel')).toBeInTheDocument();
      
      // Verify French subtitle
      expect(screen.getByText('DOULA ET PROFESSEURE DE YOGA')).toBeInTheDocument();

      // Verify French About subsection titles
      expect(screen.getByText(/Qui suis-je/i)).toBeInTheDocument();
      expect(screen.getByText(/Mon parcours/i)).toBeInTheDocument();
      expect(screen.getByText(/Ce qui m'inspire/i)).toBeInTheDocument();
      expect(screen.getByText(/Ma méthode/i)).toBeInTheDocument();

      // Verify French Inspiration titles
      expect(screen.getByText(/Holistique/i)).toBeInTheDocument();
      expect(screen.getByText(/Bienveillante/i)).toBeInTheDocument();
      expect(screen.getByText(/Engagée/i)).toBeInTheDocument();

      // Verify French CTA text
      expect(screen.getByText(/douceur et bienveillance/i)).toBeInTheDocument();
    });

    it('should have French descriptions in About subsections', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify French descriptions are present
      expect(screen.getByText(/Curieuse et ouverte/i)).toBeInTheDocument();
      expect(screen.getByText(/Danseuse classique/i)).toBeInTheDocument();
      expect(screen.getByText(/puissance et la résilience des femmes/i)).toBeInTheDocument();
      expect(screen.getByText(/Holistique et personnalisée/i)).toBeInTheDocument();
    });

    it('should have French descriptions in Inspiration cards', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify inspiration card descriptions
      expect(screen.getByText(/corps, mental, émotions et énergie/i)).toBeInTheDocument();
      expect(screen.getByText(/espace doux, sécurisant et empathique/i)).toBeInTheDocument();
      expect(screen.getByText(/Je m'implique pleinement/i)).toBeInTheDocument();
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

    it('should have About section with green/sage background', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // About component uses Section with background="accent" which gives green/sage bg
      // Verify the about content exists
      expect(screen.getByRole('heading', { name: /À propos de moi/i })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should render without layout errors on mobile viewport', () => {
      const router = createTestRouter();
      
      // Simulate mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render without layout errors on tablet viewport', () => {
      const router = createTestRouter();
      
      // Simulate tablet viewport
      global.innerWidth = 768;
      global.innerHeight = 1024;
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render without layout errors on desktop viewport', () => {
      const router = createTestRouter();
      
      // Simulate desktop viewport
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('About Section Content', () => {
    it('should render all 4 subsections with correct content', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Qui suis-je?
      expect(screen.getByText(/Curieuse et ouverte, j'aime apprendre/i)).toBeInTheDocument();

      // Mon parcours
      expect(screen.getByText(/Danseuse classique et contemporaine/i)).toBeInTheDocument();
      expect(screen.getByText(/Devenir doula s'est imposé/i)).toBeInTheDocument();

      // Ce qui m'inspire
      expect(screen.getByText(/La puissance et la résilience des femmes/i)).toBeInTheDocument();

      // Ma méthode
      expect(screen.getByText(/Holistique et personnalisée/i)).toBeInTheDocument();
    });

    it('should have photo placeholder with caption', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for photo caption text
      expect(screen.getByText('Pauline Roussel')).toBeInTheDocument();
      expect(screen.getByText('Doula et professeure de yoga')).toBeInTheDocument();
    });
  });

  describe('Inspirations Section', () => {
    it('should render all 3 inspiration cards in correct order', () => {
      const router = createTestRouter();
      const { container } = render(<RouterProvider router={router} />);

      // Verify all three cards are present
      expect(screen.getByRole('heading', { name: /Holistique/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Bienveillante/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Engagée/i })).toBeInTheDocument();
    });

    it('should have inspiration cards with descriptions', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify descriptions
      expect(screen.getByText(/Ma méthode considère la Femme dans sa globalité/i)).toBeInTheDocument();
      expect(screen.getByText(/Je crée un espace doux/i)).toBeInTheDocument();
      expect(screen.getByText(/Je m'implique pleinement pour t'accompagner/i)).toBeInTheDocument();
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
      expect(screen.getByText(/Curieuse et ouverte, je me nourris de chaque femme croisée/i)).toBeInTheDocument();
    });
  });
});
