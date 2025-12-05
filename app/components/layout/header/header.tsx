import { useState } from "react";
import { Link } from "react-router";
import { Container } from "~/components/ui/container";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { MobileMenu } from "./mobile-menu";

/**
 * Desktop navigation links configuration
 */
const desktopNavLinks = [
  { label: "Doula", href: "/doula" },
  { label: "Yoga", href: "/yoga" },
  { label: "Féminin", href: "/feminin-sacre" },
  { label: "À propos", href: "/a-propos" },
] as const;

export interface HeaderProps {
  className?: string;
  /** For Storybook visual testing only - renders menu in open state */
  defaultOpen?: boolean;
}

/**
 * Main Header component for Pauline Roussel website
 *
 * Layout:
 * - Mobile: Burger menu (left) | Logo (center) | Contact button (right)
 * - Desktop: Logo (center) | Contact button (right) | Menu trigger (left, hidden when not needed)
 *
 * Responsive:
 * - Mobile: 56px height
 * - Desktop: 64px height
 *
 * Accessibility:
 * - All touch targets minimum 44x44px (pregnancy-safe)
 * - High contrast colors
 * - Proper focus states
 * - ARIA labels in French
 */
export function Header({ className, defaultOpen = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(defaultOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        // Layout
        "sticky top-0 z-50 w-full",
        // Background - primary brand color with backdrop blur
        "bg-primary backdrop-blur-[15px] border-b border-primary/20",
        // Height responsive
        "h-14 sm:h-16", // 56px mobile, 64px desktop
        className
      )}
      role="banner"
    >
      <Container size="xl" className="h-full">
        <div className="grid grid-cols-3 items-center h-full">
          {/* Mobile Menu Trigger - Left side on mobile */}
          <div className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className={cn(
                // Pregnancy-safe touch target + round shape (48px for optimal comfort)
                "min-h-12 min-w-12 rounded-full",
                // Show on mobile and tablet, hide on desktop
                "lg:hidden",
                // Colors - white background with primary icons (Figma mockup)
                "bg-white text-primary hover:text-primary/90",
                // Focus
                "focus-visible:ring-2 focus-visible:ring-white/50"
              )}
              aria-label={
                isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="size-6"
                fill="none"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  // Close icon (X)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                ) : (
                  // Hamburger icon - 2 traits seulement
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </Button>

            {/* Desktop Navigation Links - Hidden on mobile/tablet */}
            <nav
              className="hidden lg:flex items-center gap-4 ml-4"
              aria-label="Navigation principale du site"
            >
              {desktopNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    // Typography - Barlow font
                    "font-sans text-sm font-medium whitespace-nowrap",
                    // Colors - White text on primary background
                    "text-white hover:text-white/80",
                    // Touch target (pregnancy-safe: 44x44px minimum)
                    "min-h-11 min-w-11 px-3 inline-flex items-center justify-center",
                    // Transitions
                    "transition-colors duration-200",
                    // Focus states for accessibility
                    "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logo - Center (perfect centering with grid) */}
          <div className="flex justify-center">
            <Link
              to="/"
              className={cn(
                // Base styles
                "inline-flex items-center justify-center",
                // Typography - Ivyora Display serif font (responsive sizing for mobile)
                "font-heading text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap",
                // Colors - White text on primary background
                "text-white hover:text-white/90",
                // Touch target (pregnancy-safe: optimal 48x48px for comfort)
                "min-h-12 min-w-12 px-2",
                // Transitions
                "transition-colors duration-200",
                // Focus states for accessibility
                "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2",
                // Hover state
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
              aria-label="Pauline Roussel - Retour à l'accueil"
            >
              Pauline Roussel
            </Link>
          </div>

          {/* Contact Button - Right side (hidden on mobile) */}
          <div className="flex items-center justify-end">
            <div className="hidden sm:block">
              <Link
                to="/contact"
                className={cn(
                  // Base button styles
                  "inline-flex items-center justify-center",
                  // Pregnancy-safe touch target (optimal 48x48px for comfort)
                  "min-h-12 min-w-12",
                  // Custom colors: menthe background + primary text for contrast (WCAG AA)
                  "bg-menthe text-primary hover:text-primary/90 active:text-primary/80",
                  // Text styling - Barlow font
                  "text-sm font-semibold uppercase font-sans",
                  // Additional padding for better touch experience + pill shape
                  "px-8 py-2 rounded-full",
                  // Focus enhancement for accessibility
                  "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  // Transitions
                  "transition-all duration-200"
                )}
                aria-label="Contactez Pauline Roussel"
              >
                CONTACTEZ-MOI
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
