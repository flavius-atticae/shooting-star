import * as React from "react";
import { cn } from "~/lib/utils";
import { NewsletterInput } from "./newsletter-input";
import { SocialIcons } from "./social-icons";
import type { FooterSocialProps } from "./types";

/**
 * Footer Social Section Component
 * 
 * Section sociale du footer (colonne droite) avec :
 * - Titre "Restons connectés" en The Seasons
 * - Champ d'inscription newsletter (fond blanc)
 * - Icônes de réseaux sociaux (Instagram, LinkedIn, Facebook, YouTube)
 * - Layout vertical avec espacement approprié
 * - Texte blanc sur fond primary (vert #618462)
 * - Accessibilité WCAG 2.1 AA
 * 
 * Usage:
 * ```tsx
 * <FooterSocial />
 * <FooterSocial onNewsletterSignup={handleSignup} />
 * ```
 */
export function FooterSocial({
  socialLinks,
  onNewsletterSignup,
  isNewsletterLoading = false,
  className
}: FooterSocialProps) {
  return (
    <div className={cn("flex flex-col items-start space-y-6", className)}>
      {/* Section Title */}
      <div className="w-full">
        <h3 className={cn(
          "font-heading text-2xl sm:text-3xl lg:text-4xl text-white",
          "mb-6"
        )}>
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
        <p className={cn(
          "text-xs text-white/70 font-body leading-relaxed",
          "max-w-sm"
        )}>
          En vous inscrivant, vous acceptez de recevoir nos communications. 
          Vous pourrez vous désabonner à tout moment.
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
  );
}