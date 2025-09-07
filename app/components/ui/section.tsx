import { cn } from "~/lib/utils";
import type { ReactNode, HTMLAttributes, ElementType } from "react";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode;
  spacing?: 'compact' | 'normal' | 'spacious';
  background?: 'white' | 'primary' | 'accent' | 'soft' | 'transparent';
  as?: ElementType;
}

export function Section({
  children,
  spacing = 'normal',
  background = 'white',
  as: Component = 'section',
  className,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "w-full",
        // Spacing variants
        {
          compact: "py-8",
          normal: "py-12 lg:py-16",
          spacious: "py-16 lg:py-24"
        }[spacing],
        // Background variants
        {
          white: "bg-white",
          primary: "bg-primary",
          accent: "bg-gris",
          soft: "bg-gradient-to-br from-white to-gris/30",
          transparent: "bg-transparent"
        }[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}