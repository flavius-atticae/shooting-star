import { Link } from "react-router";
import { cn } from "~/lib/utils";
import type { FooterLogoProps } from "./types";

/**
 * Footer Logo Component
 * 
 * Logo Pauline Roussel dans le footer avec :
 * - Typography The Seasons (serif) pregnancy-safe
 * - Texte blanc sur fond primary (vert #618462)
 * - Taille responsive optimisée pour footer
 * - Touch target 48x48px minimum (confort grossesse)
 * - États focus accessibles WCAG 2.1 AA
 * - Navigation vers homepage accessible
 * 
 * Usage:
 * ```tsx
 * <FooterLogo />
 * ```
 */
export function FooterLogo({ className }: FooterLogoProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      {/* Logo Link */}
      <Link 
        to="/"
        className={cn(
          // Base styles
          "inline-flex items-center justify-start",
          // Touch target (pregnancy-safe: optimal 48x48px minimum)
          "min-h-[48px] p-2",
          // Transitions
          "transition-all duration-200",
          // Focus states for accessibility
          "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
          // Hover state (subtle animation)
          "hover:scale-[1.05] active:scale-[0.95]"
        )}
        aria-label="Pauline Roussel - Retour à l'accueil"
      >
        {/* Logo SVG from public/white-logo.svg */}
        <img 
          src="/white-logo.svg"
          alt="Logo Pauline Roussel"
          className="w-[90%] sm:w-[80%] lg:w-[80%]"
        />
      </Link>
    </div>
  );
}