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
        // Typography - The Seasons serif font (responsive sizing for mobile)
        "font-heading text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap",
        // Colors - White text on primary background
        "text-white hover:text-white/90",
        // Touch target (pregnancy-safe: optimal 48x48px for comfort)
        "min-h-[48px] min-w-[48px] px-2",
        // Transitions
        "transition-colors duration-200",
        // Focus states for accessibility
        "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2",
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