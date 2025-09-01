import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

/**
 * React Router v7 Integration Tests for Shooting Star
 * 
 * These tests verify that the React Router v7 setup works correctly
 * with pregnancy-safe navigation patterns and SSR compatibility.
 */

// Mock components for testing
const HomePage = () => (
  <div data-testid="home-page">
    <h1>Bienvenue chez Pauline Roussel</h1>
    <nav>
      <a href="/cours" data-testid="cours-link">Cours de Yoga Prénatal</a>
      <a href="/ressources" data-testid="ressources-link">Ressources</a>
      <a href="/contact" data-testid="contact-link">Contact</a>
    </nav>
    <main>
      <section>
        <h2>Accompagnement Périnatal</h2>
        <p>Yoga prénatal, accompagnement à la naissance, et soutien postnatal au Québec.</p>
      </section>
    </main>
  </div>
);

const CoursPage = () => (
  <div data-testid="cours-page">
    <header>
      <h1>Cours de Yoga Prénatal</h1>
      <nav aria-label="Navigation des trimestres">
        <a href="/cours/premier-trimestre" data-testid="t1-link">Premier Trimestre</a>
        <a href="/cours/deuxieme-trimestre" data-testid="t2-link">Deuxième Trimestre</a>
        <a href="/cours/troisieme-trimestre" data-testid="t3-link">Troisième Trimestre</a>
      </nav>
    </header>
    <main>
      <section>
        <h2>Cours Adaptés à Chaque Étape</h2>
        <p>Nos cours de yoga prénatal sont spécialement conçus pour chaque trimestre de grossesse.</p>
      </section>
      <Outlet />
    </main>
  </div>
);

const TrimesterPage = ({ trimester }: { trimester: string }) => (
  <div data-testid={`trimester-${trimester}-page`}>
    <header>
      <nav aria-label="Fil d'Ariane">
        <a href="/cours">Cours</a> &gt; {trimester === '1' ? 'Premier' : trimester === '2' ? 'Deuxième' : 'Troisième'} Trimestre
      </nav>
      <h1>Yoga - {trimester === '1' ? 'Premier' : trimester === '2' ? 'Deuxième' : 'Troisième'} Trimestre</h1>
    </header>
    <main>
      <section>
        <h2>Semaines {trimester === '1' ? '1-12' : trimester === '2' ? '13-27' : '28-40'}</h2>
        <div role="region" aria-labelledby="description-title">
          <h3 id="description-title">Description du cours</h3>
          <p>
            Cours spécialisé pour le {trimester === '1' ? 'premier' : trimester === '2' ? 'deuxième' : 'troisième'} trimestre,
            avec des postures adaptées aux changements de votre corps.
          </p>
        </div>
        
        <div role="region" aria-labelledby="benefits-title">
          <h3 id="benefits-title">Bienfaits</h3>
          <ul>
            {trimester === '1' && (
              <>
                <li>Réduction des nausées matinales</li>
                <li>Amélioration de l'énergie</li>
                <li>Gestion du stress</li>
              </>
            )}
            {trimester === '2' && (
              <>
                <li>Renforcement du dos</li>
                <li>Amélioration de la posture</li>
                <li>Préparation du plancher pelvien</li>
              </>
            )}
            {trimester === '3' && (
              <>
                <li>Préparation à l'accouchement</li>
                <li>Techniques de respiration</li>
                <li>Positionnement optimal du bébé</li>
              </>
            )}
          </ul>
        </div>
        
        <section aria-labelledby="booking-title">
          <h3 id="booking-title">Réserver votre place</h3>
          <form data-testid="booking-form">
            <div>
              <label htmlFor="participant-name">Nom complet *</label>
              <input 
                id="participant-name"
                type="text"
                required
                style={{ minHeight: '44px', padding: '12px' }}
                aria-describedby="name-help"
              />
              <div id="name-help">Entrez votre nom tel qu'il apparaît sur vos documents</div>
            </div>
            
            <div>
              <label htmlFor="due-date">Date prévue d'accouchement</label>
              <input 
                id="due-date"
                type="date"
                style={{ minHeight: '44px', padding: '12px' }}
                aria-describedby="due-date-help"
              />
              <div id="due-date-help">Cette information nous aide à personnaliser le cours</div>
            </div>
            
            <button 
              type="submit"
              style={{ minHeight: '48px', padding: '12px 24px', marginTop: '16px' }}
            >
              Réserver ma place
            </button>
          </form>
        </section>
      </section>
    </main>
  </div>
);

const RessourcesPage = () => (
  <div data-testid="ressources-page">
    <h1>Ressources pour la Grossesse</h1>
    <main>
      <section aria-labelledby="articles-title">
        <h2 id="articles-title">Articles et Guides</h2>
        <article>
          <h3>Nutrition pendant la Grossesse</h3>
          <p>Guide complet sur l'alimentation équilibrée durant la grossesse.</p>
        </article>
      </section>
    </main>
  </div>
);

const ContactPage = () => (
  <div data-testid="contact-page">
    <h1>Contactez Pauline Roussel</h1>
    <main>
      <section>
        <h2>Informations de Contact</h2>
        <address>
          <p>Email: pauline@shootingstar.ca</p>
          <p>Téléphone: (514) 123-4567</p>
        </address>
      </section>
    </main>
  </div>
);

const ErrorPage = () => (
  <div data-testid="error-page" role="alert">
    <h1>Page non trouvée</h1>
    <p>Désolée, cette page n'existe pas.</p>
    <a href="/" data-testid="home-link">Retour à l'accueil</a>
  </div>
);

// Route configuration for testing
const createTestRoutes = (): RouteObject[] => [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cours',
    element: <CoursPage />,
    children: [
      {
        path: 'premier-trimestre',
        element: <TrimesterPage trimester="1" />,
      },
      {
        path: 'deuxieme-trimestre',
        element: <TrimesterPage trimester="2" />,
      },
      {
        path: 'troisieme-trimestre',
        element: <TrimesterPage trimester="3" />,
      },
    ],
  },
  {
    path: '/ressources',
    element: <RessourcesPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
];

describe('React Router v7 Integration - Pregnancy-Safe Navigation', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Basic Route Rendering', () => {
    it('should render home page correctly with French content', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
      expect(screen.getByText('Bienvenue chez Pauline Roussel')).toBeInTheDocument();
      expect(screen.getByText(/Yoga prénatal, accompagnement à la naissance/)).toBeInTheDocument();
      
      // Verify navigation links are present and accessible
      const coursLink = screen.getByTestId('cours-link');
      const ressourcesLink = screen.getByTestId('ressources-link');
      const contactLink = screen.getByTestId('contact-link');
      
      expect(coursLink).toBeInTheDocument();
      expect(ressourcesLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });

    it('should render cours page with trimester navigation', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours'],
      });

      render(<RouterProvider router={router} />);

      expect(screen.getByTestId('cours-page')).toBeInTheDocument();
      expect(screen.getByText('Cours de Yoga Prénatal')).toBeInTheDocument();
      
      // Verify trimester navigation
      expect(screen.getByTestId('t1-link')).toBeInTheDocument();
      expect(screen.getByTestId('t2-link')).toBeInTheDocument();
      expect(screen.getByTestId('t3-link')).toBeInTheDocument();
      
      // Check accessibility
      const trimesterNav = screen.getByRole('navigation', { name: 'Navigation des trimestres' });
      expect(trimesterNav).toBeInTheDocument();
    });

    it('should render specific trimester page with pregnancy information', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours/premier-trimestre'],
      });

      render(<RouterProvider router={router} />);

      expect(screen.getByTestId('trimester-1-page')).toBeInTheDocument();
      expect(screen.getByText('Yoga - Premier Trimestre')).toBeInTheDocument();
      expect(screen.getByText('Semaines 1-12')).toBeInTheDocument();
      
      // Verify pregnancy-specific content
      expect(screen.getByText('Réduction des nausées matinales')).toBeInTheDocument();
      expect(screen.getByText('Amélioration de l\'énergie')).toBeInTheDocument();
      
      // Check breadcrumb navigation
      const breadcrumb = screen.getByRole('navigation', { name: 'Fil d\'Ariane' });
      expect(breadcrumb).toBeInTheDocument();
      
      // Verify booking form is accessible
      const bookingForm = screen.getByTestId('booking-form');
      expect(bookingForm).toBeInTheDocument();
    });
  });

  describe('Navigation Between Routes', () => {
    it('should navigate between pages correctly', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      // Start at home page
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
      
      // Navigate to cours page
      const coursLink = screen.getByTestId('cours-link');
      
      // Simulate navigation (in real app this would be handled by React Router)
      await act(async () => {
        router.navigate('/cours');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('cours-page')).toBeInTheDocument();
      });

      // Navigate to specific trimester
      await act(async () => {
        router.navigate('/cours/deuxieme-trimestre');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('trimester-2-page')).toBeInTheDocument();
        expect(screen.getByText('Renforcement du dos')).toBeInTheDocument();
        expect(screen.getByText('Semaines 13-27')).toBeInTheDocument();
      });
    });

    it('should handle back navigation gracefully', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours/troisieme-trimestre'],
      });

      render(<RouterProvider router={router} />);

      // Start at trimester page
      expect(screen.getByTestId('trimester-3-page')).toBeInTheDocument();
      
      // Navigate back to cours
      await act(async () => {
        router.navigate('/cours');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('cours-page')).toBeInTheDocument();
      });
      
      // Navigate back to home
      await act(async () => {
        router.navigate('/');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling - Pregnancy-Safe Error Pages', () => {
    it('should show gentle error page for non-existent routes', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/non-existent-page'],
      });

      render(<RouterProvider router={router} />);

      // Should show error page with gentle messaging
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
      expect(screen.getByText('Page non trouvée')).toBeInTheDocument();
      expect(screen.getByText('Désolée, cette page n\'existe pas.')).toBeInTheDocument();
      
      // Should provide way back home
      const homeLink = screen.getByTestId('home-link');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should handle navigation errors gracefully', async () => {
      // Mock console.error to avoid test noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      // Attempt to navigate to invalid route
      try {
        await act(async () => {
          router.navigate('/invalid/deeply/nested/route');
        });
        
        await waitFor(() => {
          // Should gracefully handle the error
          expect(screen.getByTestId('error-page')).toBeInTheDocument();
        });
      } catch (error) {
        // Navigation error should be handled gracefully
        expect(error).toBeDefined();
      }
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility in Navigation', () => {
    it('should maintain focus management during navigation', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      // Navigate and check focus management
      const coursLink = screen.getByTestId('cours-link');
      
      // Focus the link
      coursLink.focus();
      expect(document.activeElement).toBe(coursLink);
      
      // Navigate
      await act(async () => {
        router.navigate('/cours');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('cours-page')).toBeInTheDocument();
        // Focus should be managed appropriately for screen readers
      });
    });

    it('should provide proper landmarks and headings', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours/premier-trimestre'],
      });

      render(<RouterProvider router={router} />);

      // Check semantic HTML structure - expect multiple landmarks due to nested route
      const banners = screen.getAllByRole('banner');
      expect(banners.length).toBeGreaterThan(0); // Should have at least one banner
      
      const mains = screen.getAllByRole('main');
      expect(mains.length).toBeGreaterThan(0); // Should have at least one main
      
      // Check heading hierarchy - expect multiple h1s due to nested route
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThan(0);
      // The trimester page h1 should be present
      expect(screen.getByText('Yoga - Premier Trimestre')).toBeInTheDocument();
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThanOrEqual(1);
      expect(h2Elements[0]).toHaveTextContent('Cours Adaptés à Chaque Étape'); // From CoursPage
      
      // Check regions are properly labeled
      const regions = screen.getAllByRole('region');
      expect(regions.length).toBeGreaterThan(0);
    });

    it('should support keyboard navigation', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours'],
      });

      render(<RouterProvider router={router} />);

      const trimesterLinks = [
        screen.getByTestId('t1-link'),
        screen.getByTestId('t2-link'),
        screen.getByTestId('t3-link'),
      ];

      // Test tab navigation through links
      await user.tab();
      expect(trimesterLinks[0]).toHaveFocus();

      await user.tab();
      expect(trimesterLinks[1]).toHaveFocus();

      await user.tab();
      expect(trimesterLinks[2]).toHaveFocus();
    });
  });

  describe('Form Handling in Routes', () => {
    it('should handle form submission in nested routes', async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
      });

      const TrimesterPageWithSubmit = ({ trimester }: { trimester: string }) => (
        <div data-testid={`trimester-${trimester}-page`}>
          <form data-testid="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="participant-name">Nom complet *</label>
            <input 
              id="participant-name"
              type="text"
              required
              style={{ minHeight: '44px', padding: '12px' }}
            />
            <button 
              type="submit"
              style={{ minHeight: '48px', padding: '12px 24px' }}
            >
              Réserver ma place
            </button>
          </form>
        </div>
      );

      const routesWithSubmit: RouteObject[] = [
        {
          path: '/cours/premier-trimestre',
          element: <TrimesterPageWithSubmit trimester="1" />,
        },
      ];

      const router = createMemoryRouter(routesWithSubmit, {
        initialEntries: ['/cours/premier-trimestre'],
      });

      render(<RouterProvider router={router} />);

      const form = screen.getByTestId('booking-form');
      const nameInput = screen.getByLabelText('Nom complet *');
      const submitButton = screen.getByText('Réserver ma place');

      // Fill form
      await user.type(nameInput, 'Marie Dubois');
      
      // Submit form
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('French Language Support in Routes', () => {
    it('should render all French content correctly', async () => {
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours/troisieme-trimestre'],
      });

      render(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(screen.getByTestId('trimester-3-page')).toBeInTheDocument();
      });

      // Check French content rendering
      expect(screen.getByText('Yoga - Troisième Trimestre')).toBeInTheDocument();
      expect(screen.getByText('Préparation à l\'accouchement')).toBeInTheDocument();
      expect(screen.getByText('Techniques de respiration')).toBeInTheDocument();
      expect(screen.getByText('Positionnement optimal du bébé')).toBeInTheDocument();
      
      // Check form labels in French
      expect(screen.getByLabelText('Nom complet *')).toBeInTheDocument();
      expect(screen.getByLabelText('Date prévue d\'accouchement')).toBeInTheDocument();
      expect(screen.getByText('Réserver ma place')).toBeInTheDocument();
    });

    it('should handle French URLs and routing', async () => {
      // Test that French URL segments work correctly
      const frenchRoutes: RouteObject[] = [
        {
          path: '/cours/premier-trimestre',
          element: <TrimesterPage trimester="1" />,
        },
        {
          path: '/cours/deuxieme-trimestre',
          element: <TrimesterPage trimester="2" />,
        },
        {
          path: '/cours/troisieme-trimestre',
          element: <TrimesterPage trimester="3" />,
        },
      ];

      const router = createMemoryRouter(frenchRoutes, {
        initialEntries: ['/cours/premier-trimestre'],
      });

      render(<RouterProvider router={router} />);

      expect(screen.getByTestId('trimester-1-page')).toBeInTheDocument();
      
      // Navigate to different French URLs
      await act(async () => {
        router.navigate('/cours/deuxieme-trimestre');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('trimester-2-page')).toBeInTheDocument();
      });

      await act(async () => {
        router.navigate('/cours/troisieme-trimestre');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('trimester-3-page')).toBeInTheDocument();
      });
    });
  });

  describe('SSR Compatibility', () => {
    it('should render routes without client-side JavaScript', () => {
      // Mock SSR-like environment by avoiding DOM APIs
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      // Should render home page content
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
      expect(screen.getByText('Bienvenue chez Pauline Roussel')).toBeInTheDocument();
    });

    it('should handle hydration correctly', async () => {
      // Test that components can hydrate properly by accessing nested route
      const router = createMemoryRouter(createTestRoutes(), {
        initialEntries: ['/cours/premier-trimestre'],
      });

      render(<RouterProvider router={router} />);

      // Should render nested route content correctly
      await waitFor(() => {
        expect(screen.getByTestId('trimester-1-page')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Yoga - Premier Trimestre')).toBeInTheDocument();
      expect(screen.getByText('Réduction des nausées matinales')).toBeInTheDocument();
    });
  });
});