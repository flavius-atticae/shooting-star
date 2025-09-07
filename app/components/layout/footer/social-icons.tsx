import * as React from "react";
import { cn } from "~/lib/utils";
import type { SocialIconsProps, SocialLink, SocialPlatform } from "./types";

/**
 * Social media icon components
 */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12.017 0C8.396 0 7.989.016 6.76.073 5.533.132 4.73.333 4.044.63c-.7.3-1.3.7-1.9 1.3-.6.6-1 1.2-1.3 1.9-.3.686-.5 1.489-.558 2.715C.058 7.989.042 8.396.042 12.017s.016 4.028.073 5.257c.058 1.226.258 2.03.558 2.715.3.7.7 1.3 1.3 1.9.6.6 1.2 1 1.9 1.3.686.3 1.489.5 2.715.558 1.23.058 1.637.073 5.258.073s4.028-.015 5.258-.073c1.226-.058 2.03-.258 2.715-.558.7-.3 1.3-.7 1.9-1.3.6-.6 1-1.2 1.3-1.9.3-.686.5-1.489.558-2.715.058-1.229.073-1.636.073-5.257s-.015-4.028-.073-5.257c-.058-1.226-.258-2.03-.558-2.715-.3-.7-.7-1.3-1.3-1.9-.6-.6-1.2-1-1.9-1.3-.686-.3-1.489-.5-2.715-.558C16.045.016 15.638 0 12.017 0zm0 5.838a6.18 6.18 0 110 12.359 6.18 6.18 0 010-12.36zm0 10.188a4.009 4.009 0 100-8.018 4.009 4.009 0 000 8.018zm7.846-10.405a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/**
 * Icon mapping for social platforms
 */
const socialIconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

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
 * Social Icons Component
 * 
 * Icônes de réseaux sociaux dans le footer avec :
 * - Icônes blanches circulaires sur fond primary (vert #618462)
 * - Touch targets 48x48px minimum (confort grossesse)
 * - États hover avec animation subtle
 * - Accessibilité WCAG 2.1 AA avec labels français
 * - Support Instagram, LinkedIn, Facebook, YouTube
 * - Layout horizontal avec espacement approprié
 * 
 * Usage:
 * ```tsx
 * <SocialIcons />
 * <SocialIcons links={customLinks} size="lg" />
 * ```
 */
export function SocialIcons({
  links = defaultSocialLinks,
  className,
  size = 'md'
}: SocialIconsProps) {
  // Size variants
  const sizeClasses = {
    sm: "h-8 w-8 min-h-[40px] min-w-[40px]",
    md: "h-10 w-10 min-h-[48px] min-w-[48px]",
    lg: "h-12 w-12 min-h-[56px] min-w-[56px]"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 sm:gap-4",
        className
      )}
      role="list"
      aria-label="Réseaux sociaux de Pauline Roussel"
    >
      {links.map((link) => {
        const IconComponent = socialIconMap[link.platform];
        
        if (!IconComponent) {
          console.warn(`Social icon for platform "${link.platform}" not found`);
          return null;
        }

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={link.label}
            className={cn(
              // Base layout
              "inline-flex items-center",
              // Sizing based on variant
              sizeClasses[size],
              // Colors - simple white icons, no background
              "text-white/70 hover:text-white",
              // Focus states for accessibility
              "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary",
              // Hover and active states
              "hover:scale-110 active:scale-95",
              // Transitions
              "transition-all duration-200"
            )}
          >
            <IconComponent 
              className={cn("text-current", iconSizes[size])}
            />
          </a>
        );
      })}
    </div>
  );
}