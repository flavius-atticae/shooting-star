import * as React from "react"
import { cn } from "~/lib/utils"
import { useContainerQueries } from "~/hooks/use-browser-support"

// Types pour les props du grid adaptatif
export interface AdaptiveGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nombre de colonnes cible (2 ou 3)
   * Détermine quelle classe container query utiliser
   */
  columns?: 2 | 3
  
  /**
   * Gap personnalisé (remplace le gap par défaut de 1rem)
   * Utilise les classes Tailwind gap-*
   */
  gap?: string
  
  /**
   * Activer le container query context sur cet élément
   * Par défaut true - l'élément devient un container query context
   */
  enableContainerQuery?: boolean
  
  /**
   * Nom du container pour cibler spécifiquement ce container
   * Utilise container-name si fourni
   */
  containerName?: string
  
  /**
   * Component HTML à utiliser comme racine
   */
  as?: React.ElementType
}

/**
 * AdaptiveGrid - Grid responsive utilisant les Container Queries
 * 
 * Ce component crée une grille qui s'adapte selon la taille de son container parent,
 * pas selon la taille de l'écran. Cela permet des layouts plus flexibles.
 * 
 * Features:
 * - Utilise container queries (@container) pour la responsivité
 * - Fallback automatique avec media queries pour les navigateurs non-compatibles
 * - Support pour grilles 2 et 3 colonnes
 * - Gap configurable avec classes Tailwind
 * - TypeScript strict
 * 
 * @example
 * ```tsx
 * <AdaptiveGrid columns={2} gap="gap-6">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AdaptiveGrid>
 * ```
 */
const AdaptiveGrid = React.forwardRef<HTMLDivElement, AdaptiveGridProps>(
  ({ 
    className, 
    children,
    columns = 2,
    gap,
    enableContainerQuery = true,
    containerName,
    as: Component = "div",
    ...props 
  }, ref) => {
    
    // Construction des classes CSS
    const containerQueryClass = enableContainerQuery 
      ? containerName 
        ? "container-name-content" // Classe générique pour containers nommés
        : "container-query"
      : ""
    
    const gridClass = columns === 3 ? "cq-grid-3" : "cq-grid-2"
    
    // Gap personnalisé remplace le gap par défaut des classes cq-grid
    const gapClass = gap || ""
    
    return (
      <Component
        ref={ref}
        className={cn(
          containerQueryClass,
          gridClass,
          gapClass,
          className
        )}
        style={
          containerName 
            ? { containerName } as React.CSSProperties
            : undefined
        }
        {...props}
      >
        {children}
      </Component>
    )
  }
)

AdaptiveGrid.displayName = "AdaptiveGrid"

/**
 * Hook pour détecter si les container queries sont supportées
 * Utilise le hook principal du système browser-support
 */
export function useContainerQuerySupport(): boolean {
  const { hasSupport } = useContainerQueries()
  return hasSupport
}

/**
 * Component de démonstration du grid adaptatif
 * Utile pour Storybook et les tests visuels
 */
export const AdaptiveGridDemo: React.FC = () => {
  const supportsContainerQueries = useContainerQuerySupport()
  
  return (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral">
          Support Container Queries: {supportsContainerQueries ? '✅' : '❌ (fallback actif)'}
        </h3>
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2 text-neutral">Grid 2 colonnes</h4>
        <div className="border-2 border-dashed border-primary/20 p-4">
          <AdaptiveGrid columns={2} gap="gap-4">
            <div className="bg-primary/10 p-4 rounded text-center">Item 1</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 2</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 3</div>
            <div className="bg-primary/10 p-4 rounded text-center">Item 4</div>
          </AdaptiveGrid>
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2 text-neutral">Grid 3 colonnes</h4>
        <div className="border-2 border-dashed border-secondary/20 p-4">
          <AdaptiveGrid columns={3} gap="gap-6">
            <div className="bg-secondary/10 p-4 rounded text-center">Item 1</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 2</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 3</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 4</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 5</div>
            <div className="bg-secondary/10 p-4 rounded text-center">Item 6</div>
          </AdaptiveGrid>
        </div>
      </div>
    </div>
  )
}

export { AdaptiveGrid }