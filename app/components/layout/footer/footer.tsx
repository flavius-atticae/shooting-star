import * as React from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { NewsletterInput } from "./newsletter-input";
import { SocialIcons } from "./social-icons";
import type { SocialLink, SocialPlatform } from "./social-icons";

// Re-export social types for consumers
export type { SocialLink, SocialPlatform } from "./social-icons";

// ============================================================================
// Types
// ============================================================================

/**
 * Footer navigation link configuration
 */
export interface FooterNavLink {
  /** Link text in French */
  label: string;
  /** Navigation target */
  href: string;
  /** Accessible description */
  ariaLabel?: string;
}

/**
 * Props for the main Footer component
 */
export interface FooterProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Custom section spacing override */
  spacing?: "none" | "compact" | "normal" | "spacious";
  /** Custom container size */
  containerSize?: "sm" | "md" | "lg" | "xl";
  /** Navigation links configuration */
  navLinks?: FooterNavLink[];
  /** Social media links configuration */
  socialLinks?: SocialLink[];
  /** Newsletter signup handler */
  onNewsletterSignup?: (email: string) => void | Promise<void>;
  /** Whether newsletter signup is loading */
  isNewsletterLoading?: boolean;
  /**
   * Compensate for overlap from previous section (e.g., About with overlapNext)
   * Adds padding-top to create space for the overlapping section
   * - "none": No compensation (default)
   * - "sm": Small compensation (matches About overlapNext="sm")
   * - "md": Medium compensation (matches About overlapNext="md")
   * - "lg": Large compensation (matches About overlapNext="lg")
   * - "responsive": Only applies on tablet+ (matches About overlapNext="responsive")
   */
  hasOverlap?: "none" | "sm" | "md" | "lg" | "responsive";
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

// ============================================================================
// Default Data
// ============================================================================

/**
 * Default navigation links for the footer
 */
const defaultNavLinks: FooterNavLink[] = [
  {
    label: "Doula",
    href: "/doula",
    ariaLabel: "Découvrir mes services d'accompagnement doula",
  },
  {
    label: "Yoga",
    href: "/yoga",
    ariaLabel: "Découvrir mes cours de yoga périnatal",
  },
  {
    label: "Féminin sacré",
    href: "/feminin-sacre",
    ariaLabel: "Découvrir mes accompagnements féminin sacré",
  },
  {
    label: "À propos",
    href: "/a-propos",
    ariaLabel: "En savoir plus sur Pauline Roussel",
  },
  {
    label: "Contact",
    href: "/contact",
    ariaLabel: "Prendre contact avec Pauline Roussel",
  },
];

/**
 * Default social media links
 */
const defaultSocialLinks: SocialLink[] = [
  {
    platform: "instagram",
    url: "https://instagram.com/paulinerousseldoula",
    label: "Suivre Pauline Roussel sur Instagram",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/pauline-roussel-doula",
    label: "Contacter Pauline Roussel sur LinkedIn",
  },
  {
    platform: "facebook",
    url: "https://facebook.com/paulinerousseldoula",
    label: "Suivre Pauline Roussel sur Facebook",
  },
  {
    platform: "youtube",
    url: "https://youtube.com/@paulinerousseldoula",
    label: "Voir les vidéos de Pauline Roussel sur YouTube",
  },
];

// ============================================================================
// Footer Component
// ============================================================================

/**
 * Footer Component - Pied de page pregnancy-safe
 *
 * Footer complet pour le site de Pauline Roussel avec :
 * - Fond primary (vert #618462) avec texte blanc, contenu dans le Container
 * - Layout 3 colonnes : Logo (2fr) + Navigation (1fr) + Social (2fr)
 * - Responsive : empilage vertical sur mobile
 * - Section Logo avec sous-titre descriptif
 * - Navigation verticale avec liens principaux
 * - Section sociale avec newsletter + réseaux sociaux
 * - Touch targets 48px minimum (confort grossesse)
 * - Accessibilité WCAG 2.1 AA complète
 * - Container avec coins arrondis pour design moderne
 *
 * Architecture:
 * - Section transparente avec Container bg-primary arrondi
 * - Grid CSS avec ratio 2fr 1fr 2fr desktop
 * - Gap approprié entre colonnes
 * - Typography pregnancy-safe (Ivyora Display + Barlow)
 *
 * Usage:
 * ```tsx
 * <Footer />
 * <Footer
 *   onNewsletterSignup={handleSignup}
 *   navLinks={customLinks}
 *   socialLinks={customSocial}
 * />
 * ```
 */
export function Footer({
  spacing = "compact",
  containerSize = "xl",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  onNewsletterSignup,
  isNewsletterLoading = false,
  hasOverlap = "none",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: FooterProps) {
  // Safe getter using switch to avoid object injection vulnerability
  const getOverlapCompensation = (): string => {
    switch (hasOverlap) {
      case "sm":
        return "pt-8 md:pt-12";
      case "md":
        return "pt-12 md:pt-16";
      case "lg":
        return "pt-16 md:pt-20";
      case "responsive":
        return "md:pt-16"; // Only applies on tablet+
      case "none":
      default:
        return "";
    }
  };

  return (
    <Section
      background="transparent"
      spacing="normal"
      as="footer"
      className={cn(
        "bg-primary w-full pb-0",
        getOverlapCompensation(),
        className
      )}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      lang="fr"
      {...props}
    >
      <Container size={containerSize}>
        {/* Main Footer Grid - Simple 3-column approach */}
        <div
          className={cn(
            // Basic grid - 1 column mobile, 3 columns tablet+
            "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8",
            // Vertical and horizontal alignment - top aligned for Figma conformance
            "items-start justify-items-start md:justify-items-center",
            // Padding for rounded container - Progressive Enhancement (48px → 64px → 80px)
            "px-6 py-6 sm:px-8 md:py-8"
          )}
        >
          {/* Column 1: Logo Section (inline) */}
          <div className="flex flex-col items-start justify-start">
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

          {/* Column 2: Navigation (inline) */}
          <div className="flex flex-col items-center">
            <nav
              className="flex flex-col items-start space-y-1"
              aria-label="Navigation principale du site"
            >
              {navLinks.map((link) => (
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
                    // Touch target (pregnancy-safe: WCAG 2.1 AA requires 44px minimum)
                    "min-h-[44px] px-2",
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
          </div>

          {/* Column 3: Social Section (inline) */}
          <div className="flex flex-col items-start space-y-6">
            {/* Section Title - Adjusted for Figma (30px → 36px → 40px) */}
            <div className="w-full">
              <h3
                className={cn(
                  "font-heading text-3xl sm:text-4xl lg:text-[40px] text-white",
                  "mb-6"
                )}
              >
                Restons connectés
              </h3>
            </div>

            {/* Newsletter Section */}
            <div className="w-full">
              <NewsletterInput
                onSubmit={onNewsletterSignup}
                isLoading={isNewsletterLoading}
                placeholder="Adresse courriel"
                ariaLabel="Saisir votre adresse courriel pour recevoir la newsletter"
                className="w-full max-w-sm"
              />
            </div>

            {/* Privacy Notice */}
            <div className="w-full">
              <p
                className={cn(
                  "text-xs text-white/70 font-body leading-relaxed",
                  "max-w-sm"
                )}
              >
                En vous inscrivant, vous acceptez de recevoir nos
                communications. Vous pourrez vous désabonner à tout moment.
              </p>
            </div>

            {/* Social Media Section */}
            <div className="w-full">
              <SocialIcons
                links={socialLinks}
                size="sm"
                className="!justify-start"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom - Legal/Copyright */}
        <div
          className={cn(
            "mx-6 sm:mx-8 pt-6 pb-2",
            "flex flex-col sm:flex-row items-center justify-between",
            "gap-4 text-center sm:text-left"
          )}
        >
          {/* Copyright */}
          <p className="text-sm text-white/80 font-body">
            © {new Date().getFullYear()} Pauline Roussel. Tous droits réservés.
          </p>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            <a
              href="/mentions-legales"
              className={cn(
                "text-sm text-white/80 hover:text-white font-body",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary",
                "min-h-[44px] flex items-center px-2"
              )}
            >
              Mentions légales
            </a>
            <a
              href="/confidentialite"
              className={cn(
                "text-sm text-white/80 hover:text-white font-body",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary",
                "min-h-[44px] flex items-center px-2"
              )}
            >
              Confidentialité
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
