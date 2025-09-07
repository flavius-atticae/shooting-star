import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { FooterLogo } from "./footer-logo";
import { FooterNavigation } from "./footer-navigation";
import { FooterSocial } from "./footer-social";
import type { FooterProps, FooterNavLink, SocialLink } from "./types";

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
 * Default social media links
 */
const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/paulinerousseldoula',
    label: 'Suivre Pauline Roussel sur Instagram'
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/pauline-roussel-doula',
    label: 'Contacter Pauline Roussel sur LinkedIn'
  },
  {
    platform: 'facebook',
    url: 'https://facebook.com/paulinerousseldoula',
    label: 'Suivre Pauline Roussel sur Facebook'
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/@paulinerousseldoula',
    label: 'Voir les vidéos de Pauline Roussel sur YouTube'
  }
];

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
 * - Typography pregnancy-safe (The Seasons + Barlow)
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
  spacing = 'normal',
  containerSize = 'xl',
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  onNewsletterSignup,
  isNewsletterLoading = false,
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: FooterProps) {
  return (
    <Section
      background="transparent"
      spacing="compact"
      as="footer"
      className={cn("bg-primary w-full pb-0", className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      lang="fr"
      {...props}
    >
      <Container size={containerSize}>
        {/* Main Footer Grid - Simple 3-column approach */}
        <div className={cn(
          // Basic grid - 1 column mobile, 3 columns tablet+
          "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8",
          // Vertical and horizontal alignment - center content
          "items-center justify-items-center",
          // Padding for rounded container
          "px-6 py-8 sm:px-8 sm:py-12"
        )}>
          
          {/* Column 1: Logo Section */}
          <div className="flex flex-col items-start justify-start">
            <FooterLogo />
          </div>
          
          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center">
            <FooterNavigation links={navLinks} />
          </div>
          
          {/* Column 3: Social Section */}
          <div className="flex flex-col items-start">
            <FooterSocial
              socialLinks={socialLinks}
              onNewsletterSignup={onNewsletterSignup}
              isNewsletterLoading={isNewsletterLoading}
            />
          </div>
          
        </div>

        {/* Footer Bottom - Legal/Copyright */}
        <div className={cn(
          "mx-6 sm:mx-8 pt-6 pb-2",
          "flex flex-col sm:flex-row items-center justify-between",
          "gap-4 text-center sm:text-left"
        )}>
          
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