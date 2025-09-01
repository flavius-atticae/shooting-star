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
        // Custom colors: menthe background + primary text for contrast
        "text-primary hover:text-primary/90",
        // Text styling - Barlow font
        "text-sm font-semibold uppercase font-sans",
        // Additional padding for better touch experience + pill shape
        "px-8 py-2 rounded-full",
        // Focus enhancement for accessibility - white ring on menthe background
        "focus-visible:ring-2 focus-visible:ring-white/50",
        className
      )}
      style={{ 
        backgroundColor: 'var(--color-menthe)'
      } as React.CSSProperties}
    >
      <a 
        href="#contact"
        aria-label="Contactez Pauline Roussel pour une consultation"
        style={{ color: 'var(--color-primary)' }}
      >
        Contactez-moi
      </a>
    </Button>
  );
}