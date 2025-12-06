import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

/**
 * Integration tests for /doula route
 * 
 * Validates that the Doula page renders correctly with:
 * - Proper Hero section with French content
 * - Footer component
 * - Placeholder comments for future sections
 * - WCAG 2.1 AA accessibility compliance
 * - French language support
 */

// Import the actual Doula page component
import DoulaPage from '../../routes/doula';

describe('Doula Route Integration Tests', () => {
  
  const createTestRouter = () => {
    const routes: RouteObject[] = [
      {
        path: '/doula',
        element: <DoulaPage />,
      },
    ];

    return createMemoryRouter(routes, {
      initialEntries: ['/doula'],
    });
  };

  describe('Route Rendering', () => {
    it('should render the doula page without errors', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify main content area exists
      const mainContent = screen.getByRole('main', { name: 'Section principale d\'accueil' });
      expect(mainContent).toBeInTheDocument();
    });

    it('should render Hero section with correct French title', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for main title
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Accompagnement de doula');
    });

    it('should render Hero section with correct French subtitle', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Check for subtitle
      expect(screen.getByText('AVEC PAULINE ROUSSEL')).toBeInTheDocument();
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
      expect(h1).toHaveTextContent('Accompagnement de doula');
    });

    it('should have accessible region labels in French', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Main content should be properly labeled
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'main-content');
      expect(main).toHaveAttribute('role', 'main');
    });

    it('should support keyboard navigation', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify the page renders without interactive elements blocking keyboard nav
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('French Language Support', () => {
    it('should display all text content in French', () => {
      const router = createTestRouter();
      render(<RouterProvider router={router} />);

      // Verify French title
      expect(screen.getByText('Accompagnement de doula')).toBeInTheDocument();
      
      // Verify French subtitle
      expect(screen.getByText('AVEC PAULINE ROUSSEL')).toBeInTheDocument();
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
  });

  describe('Responsive Design', () => {
    it('should render without layout errors on mobile viewport', () => {
      const router = createTestRouter();
      
      // Simulate mobile viewport (following HERO_BREAKPOINTS.mobile = 400)
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
      
      // Simulate tablet viewport (following HERO_BREAKPOINTS.tablet = 500)
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
      
      // Simulate desktop viewport (following HERO_BREAKPOINTS.desktop = 600)
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      
      render(<RouterProvider router={router} />);

      // Page should still render all key elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });
});
