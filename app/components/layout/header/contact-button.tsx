import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export interface ContactButtonProps {
  className?: string;
}

/**
 * Contact Button component for header
 * Pregnancy-safe design with proper touch targets and accessible colors
 * Uses primary brand colors for high contrast
 */
export function ContactButton({ className }: ContactButtonProps) {
  return (
    <Button
      asChild
      variant="default"
      size="sm"
      className={cn(
        // Pregnancy-safe touch target (minimum 44x44px)
        "min-h-[44px] min-w-[44px]",
        // Text styling
        "text-sm font-semibold",
        // Additional padding for better touch experience
        "px-4 py-2",
        // Focus enhancement for accessibility
        "focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
    >
      <a 
        href="#contact"
        aria-label="Contactez Pauline Roussel pour une consultation"
      >
        Contactez-moi
      </a>
    </Button>
  );
}