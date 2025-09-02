import { Link } from "react-router";
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
      variant="ghost"
      size="sm"
      className={cn(
        // Pregnancy-safe touch target (optimal 48x48px for comfort)
        "min-h-[48px] min-w-[48px]",
        // Custom colors: menthe background + white text for contrast
        "bg-menthe text-primary hover:text-white/90 active:text-white/80",
        // Text styling - Barlow font
        "text-sm font-semibold uppercase font-sans",
        // Additional padding for better touch experience + pill shape
        "px-8 py-2 rounded-full",
        // Focus enhancement for accessibility
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        className
      )}
    >
      <Link 
        to="/contact"
        aria-label="Contactez Pauline Roussel"
      >
        CONTACTEZ-MOI
      </Link>
    </Button>
  );
}