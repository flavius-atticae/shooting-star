import * as React from "react"
import { cn } from "~/lib/utils"

// Container variants pour différentes tailles maximales
export const containerVariants = {
  size: {
    // Contrainte étroite pour contenu focused (articles, forms)
    sm: "max-w-2xl mx-auto px-4 sm:px-6",
    
    // Taille standard pour la plupart du contenu
    md: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Large pour dashboards et layouts complexes
    lg: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Extra large pour contenu très large
    xl: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // Full width avec padding uniquement
    full: "w-full px-4 sm:px-6 lg:px-8",
  },
} as const

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerVariants.size
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "md", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants.size[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }