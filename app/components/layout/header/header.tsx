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
        // Background - white with subtle border
        "bg-white/95 backdrop-blur-sm border-b border-gris/50",
        // Height responsive
        "h-14 sm:h-16", // 56px mobile, 64px desktop
        className
      )}
      role="banner"
    >
      <Container size="full" className="h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Mobile Menu Trigger - Left side on mobile */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className={cn(
                // Pregnancy-safe touch target
                "min-h-[44px] min-w-[44px]",
                // Show only on mobile/tablet
                "sm:hidden",
                // Colors
                "text-neutral hover:text-primary hover:bg-primary/5",
                // Focus
                "focus-visible:ring-2 focus-visible:ring-primary/50"
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
                  // Close icon
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  // Hamburger icon
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                  />
                )}
              </svg>
            </Button>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center">
            <Logo />
          </div>

          {/* Contact Button - Right side */}
          <div className="flex items-center">
            <ContactButton />
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