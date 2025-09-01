import { Link } from "react-router";
import { useEffect } from "react";
import { cn } from "~/lib/utils";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// Navigation items for the mobile menu
const navigationItems = [
  {
    label: "Accueil",
    href: "/",
    description: "Retour à la page d'accueil"
  },
  {
    label: "Services",
    href: "/services",
    description: "Yoga prénatal, postnatal et accompagnement"
  },
  {
    label: "À propos",
    href: "/about",
    description: "Mon parcours et ma philosophie"
  },
  {
    label: "Témoignages",
    href: "/testimonials",
    description: "Expériences de mes clientes"
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Conseils et ressources"
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Prendre rendez-vous"
  }
];

/**
 * Mobile Menu overlay component
 * 
 * Features:
 * - Full-screen overlay on mobile
 * - Smooth animations
 * - Touch-friendly navigation
 * - Pregnancy-safe design (large targets, calming colors)
 * - Accessible with proper ARIA attributes
 * - French-first content
 */
export function MobileMenu({ isOpen, onClose, className }: MobileMenuProps) {
  // Close menu with Escape key for accessibility
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-neutral/20 backdrop-blur-sm z-40 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu content */}
      <div 
        className={cn(
          // Positioning
          "fixed inset-x-0 top-14 z-50", // top-14 = 56px mobile header height
          // Show only on mobile
          "sm:hidden",
          // Background
          "bg-white/98 backdrop-blur-md",
          // Border and shadow
          "border-b border-gris/30 shadow-xl",
          // Animation (slide down)
          "animate-in slide-in-from-top-2 duration-200",
          className
        )}
        role="navigation"
        aria-label="Menu de navigation principal"
      >
        <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="px-4 py-6">
            
            {/* Navigation Links */}
            <ul className="space-y-1" role="list">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      // Layout
                      "flex flex-col gap-1 w-full",
                      // Padding for pregnancy-safe touch targets (min 44px height)
                      "px-4 py-3",
                      // Colors
                      "text-neutral hover:text-primary",
                      "hover:bg-primary/5 active:bg-primary/10",
                      // Border radius
                      "rounded-lg",
                      // Transitions
                      "transition-all duration-200",
                      // Focus states
                      "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1"
                    )}
                    aria-describedby={`menu-item-${item.href.slice(1)}-desc`}
                  >
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                    <span 
                      id={`menu-item-${item.href.slice(1)}-desc`}
                      className="text-sm text-neutral/70"
                    >
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Separator */}
            <hr className="my-6 border-gris" />

            {/* Contact CTA in menu */}
            <div className="px-4">
              <Link
                to="/contact"
                onClick={onClose}
                className={cn(
                  // Layout
                  "flex items-center justify-center gap-2 w-full",
                  // Pregnancy-safe touch target
                  "min-h-[48px] px-6 py-3",
                  // Background and colors - Primary brand
                  "bg-primary text-white",
                  "hover:bg-primary/90 active:bg-primary/80",
                  // Border radius
                  "rounded-lg",
                  // Typography
                  "font-semibold text-base",
                  // Transitions
                  "transition-all duration-200",
                  // Focus states
                  "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
              >
                <span>Prendre rendez-vous</span>
                <svg 
                  className="size-4" 
                  fill="none" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" 
                  />
                </svg>
              </Link>
            </div>

            {/* Footer info */}
            <div className="mt-6 px-4 text-center text-sm text-neutral/60">
              <p className="font-heading">Pauline Roussel</p>
              <p>Yoga prénatal • Accompagnement à la naissance</p>
              <p className="mt-2">Québec, Canada</p>
            </div>

          </nav>
        </div>
      </div>
    </>
  );
}