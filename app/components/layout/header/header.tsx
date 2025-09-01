import { useState } from "react";
import { Container } from "~/components/ui/container";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Logo } from "./logo";
import { ContactButton } from "./contact-button";
import { MobileMenu } from "./mobile-menu";

export interface HeaderProps {
  className?: string;
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
export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        // Layout
        "sticky top-0 z-50 w-full",
        // Background - primary brand color
        "bg-primary backdrop-blur-sm border-b border-primary/20",
        // Height responsive
        "h-14 sm:h-16", // 56px mobile, 64px desktop
        className
      )}
      role="banner"
    >
      <Container size="full" className="h-full">
        <div className="grid grid-cols-3 items-center h-full">
          
          {/* Mobile Menu Trigger - Left side on mobile */}
          <div className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className={cn(
                // Pregnancy-safe touch target + round shape (48px for optimal comfort)
                "min-h-[48px] min-w-[48px] rounded-full",
                // Show on mobile and tablet, hide on desktop
                "lg:hidden",
                // Colors - menthe background with primary icons
                "bg-menthe text-primary hover:text-primary/90",
                // Focus
                "focus-visible:ring-2 focus-visible:ring-white/50"
              )}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
          </div>

          {/* Logo - Center (perfect centering with grid) */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Contact Button - Right side (hidden on mobile) */}
          <div className="flex items-center justify-end">
            <div className="hidden sm:block">
              <ContactButton />
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