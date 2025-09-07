import * as React from "react";

/**
 * Social media platforms supported in the footer
 */
export type SocialPlatform = 'instagram' | 'linkedin' | 'facebook' | 'youtube';

/**
 * Social media link configuration
 */
export interface SocialLink {
  /** Platform identifier */
  platform: SocialPlatform;
  /** Social media profile URL */
  url: string;
  /** Accessible label in French */
  label: string;
}

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
export interface FooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Custom section spacing override */
  spacing?: 'compact' | 'normal' | 'spacious';
  /** Custom container size */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Navigation links configuration */
  navLinks?: FooterNavLink[];
  /** Social media links configuration */
  socialLinks?: SocialLink[];
  /** Newsletter signup handler */
  onNewsletterSignup?: (email: string) => void | Promise<void>;
  /** Whether newsletter signup is loading */
  isNewsletterLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Accessibility props */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * Props for Footer Logo component
 */
export interface FooterLogoProps {
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Props for Footer Navigation component
 */
export interface FooterNavigationProps {
  /** Navigation links */
  links?: FooterNavLink[];
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Props for Newsletter Input component
 */
export interface NewsletterInputProps {
  /** Newsletter signup handler */
  onSubmit?: (email: string) => void | Promise<void>;
  /** Whether signup is loading */
  isLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Accessible label */
  ariaLabel?: string;
}

/**
 * Props for Social Icons component
 */
export interface SocialIconsProps {
  /** Social media links */
  links?: SocialLink[];
  /** Custom className for additional styling */
  className?: string;
  /** Icon size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Props for Footer Social section
 */
export interface FooterSocialProps {
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Newsletter signup handler */
  onNewsletterSignup?: (email: string) => void | Promise<void>;
  /** Whether newsletter signup is loading */
  isNewsletterLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
}