import { cn } from "~/lib/utils";
import type { ReactNode, HTMLAttributes, ElementType } from "react";

export interface BackgroundProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode;
  variant?: 'white' | 'accent' | 'soft' | 'gradient-soft' | 'gradient-warm';
  as?: ElementType;
}

/**
 * Background component for creating pregnancy-safe background patterns
 * with the Pauline Roussel color palette
 */
export function Background({
  children,
  variant = 'white',
  as: Component = 'div',
  className,
  ...props
}: BackgroundProps) {
  return (
    <Component
      className={cn(
        "w-full",
        // Background variants using Pauline Roussel colors
        {
          // Primary backgrounds
          white: "bg-white",
          accent: "bg-gris",
          
          // Soft gradient backgrounds for gentle transitions
          soft: "bg-gradient-to-br from-white to-gris/30",
          
          // Advanced gradient variants pregnancy-safe  
          'gradient-soft': "bg-gradient-to-br from-white via-soft/20 to-gris/40",
          'gradient-warm': "bg-gradient-to-br from-white via-warm/15 to-gris/25"
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Hook to get background CSS classes
 * Useful for applying backgrounds directly via className
 */
export function useBackgroundClasses() {
  return {
    white: "bg-white",
    accent: "bg-gris", 
    soft: "bg-gradient-to-br from-white to-gris/30",
    'gradient-soft': "bg-gradient-to-br from-white via-soft/20 to-gris/40",
    'gradient-warm': "bg-gradient-to-br from-white via-warm/15 to-gris/25"
  } as const;
}

/**
 * Pattern component for creating subtle background patterns
 * Pregnancy-safe with soft colors
 */
export function BackgroundPattern({
  pattern = 'dots',
  intensity = 'subtle',
  className,
  ...props
}: {
  pattern?: 'dots' | 'lines' | 'grid';
  intensity?: 'subtle' | 'light';
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const patternClasses = {
    dots: {
      subtle: "bg-[radial-gradient(circle_at_1px_1px,theme(colors.gris)_1px,transparent_0)]",
      light: "bg-[radial-gradient(circle_at_2px_2px,theme(colors.gris)_1px,transparent_0)]"
    },
    lines: {
      subtle: "bg-[linear-gradient(90deg,theme(colors.gris)_1px,transparent_1px)]",
      light: "bg-[linear-gradient(90deg,theme(colors.gris)_2px,transparent_2px)]"
    },
    grid: {
      subtle: "bg-[linear-gradient(theme(colors.gris)_1px,transparent_1px),linear-gradient(90deg,theme(colors.gris)_1px,transparent_1px)]",
      light: "bg-[linear-gradient(theme(colors.gris)_2px,transparent_2px),linear-gradient(90deg,theme(colors.gris)_2px,transparent_2px)]"
    }
  };

  const sizeClasses = {
    dots: {
      subtle: "bg-[size:20px_20px]",
      light: "bg-[size:24px_24px]"
    },
    lines: {
      subtle: "bg-[size:20px_20px]", 
      light: "bg-[size:24px_24px]"
    },
    grid: {
      subtle: "bg-[size:20px_20px]",
      light: "bg-[size:24px_24px]"
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        patternClasses[pattern][intensity],
        sizeClasses[pattern][intensity],
        className
      )}
      {...props}
    />
  );
}