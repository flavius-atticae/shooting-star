export { PageLayout } from "./page-layout";
export type { PageLayoutProps } from "./page-layout";

// Layout sections
export { AboutSection, AboutContent, MethodSection, MethodColumn } from "./about-section";
export type { AboutSectionProps, AboutContentProps, MethodSectionProps, MethodColumnProps, MethodItem } from "./about-section";

export { Footer, FooterLogo, FooterNavigation, FooterSocial, NewsletterInput, SocialIcons } from "./footer";
export type { FooterProps, FooterLogoProps, FooterNavigationProps, FooterSocialProps, NewsletterInputProps, SocialIconsProps, FooterNavLink, SocialLink, SocialPlatform } from "./footer";

// Re-export UI components pour usage avec layout
export { Container, containerVariants } from "../ui/container";
export { Section } from "../ui/section";
export type { ContainerProps } from "../ui/container";
export type { SectionProps } from "../ui/section";