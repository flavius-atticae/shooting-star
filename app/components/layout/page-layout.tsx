import type { ReactNode } from "react";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";
import { cn } from "~/lib/utils";

export interface PageLayoutProps {
  children: ReactNode;
  background?: "white" | "accent" | "soft";
  spacing?: "compact" | "normal" | "spacious";
  enableContainerQueries?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  background = "white",
  spacing = "normal",
  enableContainerQueries = false,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <Section
        background={background}
        spacing={spacing}
        className="min-h-screen flex flex-col"
      >
        <Container
          className={cn(
            "flex-1 flex flex-col px-4 sm:px-6 lg:px-8",
            enableContainerQueries && "@container"
          )}
        >
          {children}
        </Container>
      </Section>
    </div>
  );
}
