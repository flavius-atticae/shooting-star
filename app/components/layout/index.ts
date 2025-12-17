// Layout sections
export { About, AboutContent } from "./about";
export type { AboutProps, AboutContentProps, MethodItem } from "./about";

export { Footer, NewsletterInput, SocialIcons } from "./footer";
export type {
  FooterProps,
  NewsletterInputProps,
  SocialIconsProps,
  FooterNavLink,
  SocialLink,
  SocialPlatform,
} from "./footer";

export { TestimonialsCarousel, TestimonialCard } from "./testimonials-carousel";
export type {
  TestimonialsCarouselProps,
  TestimonialCardProps,
  Testimonial,
} from "./testimonials-carousel";
export { FeatureBlock } from "./feature-block";
export type { FeatureBlockProps } from "./feature-block";

export { ContactInfo, ContactForm, ContactSection } from "./contact";
export type {
  ContactInfoProps,
  ContactFormProps,
  ContactFormData,
  ContactSectionProps,
} from "./contact";

// Re-export UI components pour usage avec layout
export { Container, type ContainerSize } from "~/components/ui/container";
export { Section } from "~/components/ui/section";
export type { ContainerProps } from "~/components/ui/container";
export type { SectionProps } from "~/components/ui/section";
