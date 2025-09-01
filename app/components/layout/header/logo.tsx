import { Link } from "react-router";
import { cn } from "~/lib/utils";

export interface LogoProps {
  className?: string;
}

/**
 * Logo component using "Pauline Roussel" text with The Seasons serif font
 * Centered, clickable, returns to homepage
 * Pregnancy-safe design with proper touch targets
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link 
      to="/"
      className={cn(
        // Base styles
        "inline-flex items-center justify-center",
        // Typography - The Seasons serif font
        "font-heading text-xl sm:text-2xl",
        // Colors - Primary brand green
        "text-primary hover:text-primary/90",
        // Touch target (pregnancy-safe: minimum 44x44px)
        "min-h-[44px] min-w-[44px] px-2",
        // Transitions
        "transition-colors duration-200",
        // Focus states for accessibility
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        // Hover state
        "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      aria-label="Pauline Roussel - Retour à l'accueil"
    >
      Pauline Roussel
    </Link>
  );
}