import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "~/lib/utils";
import { Section } from "~/components/ui/section";
import { Container } from "~/components/ui/container";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard, type Testimonial } from "./testimonial-card";

export interface TestimonialsCarouselProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  title?: string;
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  spacing?: "none" | "compact" | "normal" | "spacious";
  containerSize?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Testimonials Carousel Component - Carrousel de témoignages
 *
 * Displays customer testimonials in a horizontal carousel.
 * Built with embla-carousel-react for smooth, accessible navigation.
 *
 * Features:
 * - Responsive layout: 3 cards (desktop), 2 (tablet), 1 (mobile)
 * - Touch/swipe support on mobile
 * - Keyboard navigation (arrow keys)
 * - Navigation arrows and pagination dots
 * - Auto-play with respect for prefers-reduced-motion
 * - WCAG 2.1 AA compliant
 *
 * Usage:
 * ```tsx
 * <TestimonialsCarousel
 *   title="Douce et à l'écoute"
 *   testimonials={testimonials}
 *   showNavigation
 *   showPagination
 * />
 * ```
 */
export function TestimonialsCarousel({
  title = "Témoignages",
  testimonials,
  autoPlay = false,
  autoPlayInterval = 5000,
  showNavigation = true,
  showPagination = true,
  spacing = "normal",
  containerSize = "xl",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: testimonials.length > 3,
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Check for prefers-reduced-motion
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize carousel state
  const onInit = React.useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  // Setup Embla event listeners
  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  // Auto-play functionality
  React.useEffect(() => {
    if (!emblaApi || !autoPlay || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [emblaApi, autoPlay, autoPlayInterval, prefersReducedMotion]);

  // Navigation functions
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Keyboard navigation
  React.useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi, scrollPrev, scrollNext]);

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  // Single testimonial - no carousel needed
  const isSingleTestimonial = testimonials.length === 1;

  return (
    <Section
      background="transparent"
      spacing={spacing}
      className={className}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <Container size={containerSize} className="px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl text-primary text-left leading-tight mb-8 sm:mb-12">
          {title}
        </h2>

        {isSingleTestimonial ? (
          // Single testimonial - no carousel
          <div className="max-w-2xl mx-auto">
            <TestimonialCard testimonial={testimonials[0]} />
          </div>
        ) : (
          // Carousel for multiple testimonials
          <div
            className="relative"
            role="region"
            aria-label="Testimonials carousel"
            aria-roledescription="carousel"
          >
            {/* Carousel viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4 sm:-ml-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={cn(
                      "flex-shrink-0 pl-4 sm:pl-6",
                      // Responsive slide widths
                      "min-w-0", // Reset min-width
                      "w-full", // Mobile: 1 slide
                      "sm:w-1/2", // Tablet: 2 slides
                      "lg:w-1/3" // Desktop: 3 slides
                    )}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${testimonials.indexOf(testimonial) + 1} of ${testimonials.length}`}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            {showNavigation && testimonials.length > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Previous testimonial"
                  className={cn(
                    "rounded-full",
                    !canScrollPrev && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Next testimonial"
                  className={cn(
                    "rounded-full",
                    !canScrollNext && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ChevronRight className="size-6" />
                </Button>
              </div>
            )}

            {/* Pagination dots */}
            {showPagination && scrollSnaps.length > 1 && (
              <div
                className="flex justify-center gap-2 mt-6"
                role="tablist"
                aria-label="Testimonial pagination"
              >
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "size-3 rounded-full transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      index === selectedIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === selectedIndex ? "true" : "false"}
                    role="tab"
                    aria-selected={index === selectedIndex}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

// Re-export Testimonial type for convenience
export type { Testimonial };
