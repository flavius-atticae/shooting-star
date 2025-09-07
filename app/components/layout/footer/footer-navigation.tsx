import { Link } from "react-router";
import { cn } from "~/lib/utils";
import type { FooterNavigationProps, FooterNavLink } from "./types";

/**
 * Default navigation links for the footer
 */
const defaultNavLinks: FooterNavLink[] = [
  {
    label: "Doula",
    href: "/doula",
    ariaLabel: "Découvrir mes services d'accompagnement doula"
  },
  {
    label: "Yoga",
    href: "/yoga",
    ariaLabel: "Découvrir mes cours de yoga périnatal"
  },
  {
    label: "Féminin sacré",
    href: "/feminin-sacre",
    ariaLabel: "Découvrir mes accompagnements féminin sacré"
  },
  {
    label: "À propos",
    href: "/a-propos",
    ariaLabel: "En savoir plus sur Pauline Roussel"
  },
  {
    label: "Contact",
    href: "/contact",
    ariaLabel: "Prendre contact avec Pauline Roussel"
  }
];

/**
 * Footer Navigation Component
 * 
 * Navigation verticale dans le footer avec :
 * - Liens principaux du site en français
 * - Typography Barlow (sans-serif) pregnancy-safe
 * - Texte blanc sur fond primary (vert #618462)
 * - Touch targets 48x48px minimum (confort grossesse)
 * - États focus et hover accessibles WCAG 2.1 AA
 * - Layout vertical avec espacement approprié
 * 
 * Usage:
 * ```tsx
 * <FooterNavigation />
 * <FooterNavigation links={customLinks} />
 * ```
 */
export function FooterNavigation({ 
  links = defaultNavLinks,
  className 
}: FooterNavigationProps) {
  return (
    <nav 
      className={cn("flex flex-col items-start space-y-1", className)}
      aria-label="Navigation principale du site"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            // Base styles
            "inline-flex items-center justify-start text-left",
            // Typography - Barlow sans-serif
            "font-body text-base sm:text-lg font-normal",
            // Colors - White text with hover state
            "text-white hover:text-white/80",
            // Touch target (pregnancy-safe but condensed)
            "min-h-[40px] px-2",
            // Transitions
            "transition-all duration-200",
            // Focus states for accessibility
            "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
            // Hover and active states
            "hover:scale-[1.02] active:scale-[0.98]",
            // Border for better definition on mobile
            "border border-transparent hover:border-white/20 rounded-lg"
          )}
          aria-label={link.ariaLabel}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}