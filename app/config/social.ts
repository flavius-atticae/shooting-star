export type SocialPlatform = "instagram" | "linkedin" | "facebook" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

/** Shared social media links used by Footer and SocialIcons. */
export const SOCIAL_LINKS: SocialLink[] = [
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
