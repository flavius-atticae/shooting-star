export { PageLayout } from "./page-layout";
export type { PageLayoutProps } from "./page-layout";

// Layout sections
export { AboutSection, AboutContent } from "./about-section";
export type { AboutSectionProps, AboutContentProps, MethodItem } from "./about-section";

export { Footer, NewsletterInput, SocialIcons } from "./footer";
export type { FooterProps, NewsletterInputProps, SocialIconsProps, FooterNavLink, SocialLink, SocialPlatform } from "./footer";

// Re-export UI components pour usage avec layout
export { Container, type ContainerSize } from "../ui/container";
export { Section } from "../ui/section";
export type { ContainerProps } from "../ui/container";
export type { SectionProps } from "../ui/section";