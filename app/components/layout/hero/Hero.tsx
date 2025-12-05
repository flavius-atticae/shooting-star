import * as React from "react";
import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/container";
import { FadeInTitle, FadeInSubtitle } from "./hero-animations";

/**
 * Hero variant types for different use cases
 */
export type HeroVariant = "default" | "full-height";

/**
 * Hero variant height configurations
 */
export const HERO_VARIANTS = {
  default: {
    mobile: 400,
    tablet: 500,
    desktop: 600,
    classes: "h-[400px] md:h-[500px] lg:h-[600px]",
  },
  "full-height": {
    mobile: "calc(100vh - 80px)",
    tablet: "calc(100vh - 80px)",
    desktop: "calc(100vh - 80px)",
    classes: "min-h-[calc(100vh-80px)]",
  },
} as const;

/**
 * Hero responsive breakpoints for consistent sizing
 */
export const HERO_BREAKPOINTS = {
  mobile: 400,
  tablet: 500,
  desktop: 600,
  borderRadius: 12, // rounded-xl, consistent with CTA section
} as const;

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
  children?: React.ReactNode;
}

/**
 * Hero content props - inline interface
 */
export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Hero section component for Pauline Roussel website
 *
 * Simplified structure with inline content (title/subtitle).
 *
 * Design:
 * - Background: Always --color-gris (#f5f4f2) with rounded bottom edges
 * - Typography: Ivyora Display (title) + Barlow (subtitle) in --color-primary
 * - Mobile-first responsive sizing with Figma specs at lg breakpoint
 * - Left-aligned layout for impactful presentation
 *
 * Figma specs (desktop lg+):
 * - Title: Ivyora Display Bold, 136px, tracking-[-0.02em]
 * - Subtitle: Barlow Bold, 36px, max-width 530px
 *
 * Variants:
 * - default: Responsive height (400px → 600px)
 * - full-height: Landing pages (100vh - header height)
 *
 * Accessibility:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA landmarks for screen readers
 * - High contrast text with pregnancy-safe colors
 * - Pregnancy-safe animations with reduced motion support
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    { className, title, subtitle, variant = "default", children, ...props },
    ref
  ) => {
    const variantConfig = HERO_VARIANTS[variant];

    return (
      <section
        ref={ref}
        className={cn(
          // Layout and positioning
          "relative w-full overflow-hidden",

          // Background color - pregnancy-safe bg-gris
          "bg-gris",

          // Variant-specific height classes
          variantConfig.classes,

          // Safe area handling for mobile devices
          variant !== "full-height" &&
            "min-h-[calc(400px+env(safe-area-inset-bottom))] md:min-h-[500px] lg:min-h-[600px]",

          // Rounded bottom edges - skip for full-height variant
          variant !== "full-height" && "rounded-b-xl",

          className
        )}
        role="region"
        aria-label="Section principale d'accueil"
        {...props}
      >
        <Container
          size="xl"
          className={cn(
            "h-full flex items-center",
            // Safe area padding for mobile devices
            "pb-[env(safe-area-inset-bottom)]"
          )}
        >
          {children || <HeroContent title={title} subtitle={subtitle} />}
        </Container>
      </section>
    );
  }
);

Hero.displayName = "Hero";

/**
 * Hero content component - inline title and subtitle
 *
 * Typography (mobile-first with Figma specs at lg):
 * - Title: text-4xl → lg:text-[136px], tracking-tight → lg:tracking-[-0.02em]
 * - Subtitle: text-base → lg:text-[36px], max-w-[530px]
 */
export const HeroContent = React.forwardRef<HTMLDivElement, HeroContentProps>(
  ({ title, subtitle, className, ...props }, ref) => {
    const defaultTitle = "Épanouir sa féminité";
    const defaultSubtitle = "AVEC PAULINE ROUSSEL";

    /**
     * Renders title with automatic line break detection.
     * If title contains \n, splits into multiple lines with <br /> tags.
     */
    const renderTitle = (titleText: string) => {
      if (titleText.includes("\n")) {
        const lines = titleText.split("\n");
        return lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return titleText;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start space-y-2 md:space-y-4",
          className
        )}
        {...props}
      >
        {/* Main Title - Mobile-first with Figma desktop specs */}
        <FadeInTitle>
          <h1
            className={cn(
              // Typography - Ivyora Display font
              "font-heading",

              // Color - Primary green
              "text-primary",

              // Mobile-first responsive sizing (Figma: 136px at desktop)
              "text-4xl sm:text-6xl md:text-7xl lg:text-[136px]",

              // Line height
              "leading-[1.3] lg:leading-normal",

              // Letter spacing (Figma: -2.72px ≈ -0.02em at desktop)
              "tracking-tight lg:tracking-[-0.02em]",

              // Weight
              "font-bold",

              // Margin
              "mb-2 sm:mb-3 md:mb-4"
            )}
          >
            {renderTitle(title || defaultTitle)}
          </h1>
        </FadeInTitle>

        {/* Subtitle - Mobile-first with Figma desktop specs */}
        <FadeInSubtitle>
          <p
            className={cn(
              // Typography - Barlow font
              "font-sans",

              // Color - Primary green
              "text-primary",

              // Mobile-first responsive sizing (Figma: 36px at desktop)
              "text-base sm:text-xl md:text-2xl lg:text-[36px]",

              // Line height
              "leading-relaxed",

              // Max width (Figma: 530px)
              "max-w-[530px]",

              // Weight and text transform
              "font-bold uppercase",

              // Letter spacing (Figma: normal)
              "tracking-normal",

              // Alignment
              "text-left",

              // Margin
              "mt-4 sm:mt-6 md:mt-8"
            )}
          >
            {subtitle || defaultSubtitle}
          </p>
        </FadeInSubtitle>
      </div>
    );
  }
);

HeroContent.displayName = "HeroContent";
