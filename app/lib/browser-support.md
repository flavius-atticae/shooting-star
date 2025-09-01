# Browser Support Detection System

Ce système fournit une détection complète des features navigateur avec progressive enhancement pour l'application Shooting Star.

## Vue d'ensemble

Le système de détection de features est conçu spécifiquement pour les besoins du marché périnatal québécois, avec une attention particulière pour :

- **Navigateurs prioritaires** : Safari (iOS dominant au Québec), Chrome, Firefox, Edge
- **Accessibilité** : Conformité WCAG 2.1 AA et Loi 25 du Québec
- **UX pregnancy-safe** : Respect des préférences de mouvement (nausées)
- **Performance** : Cache des détections pour éviter les queries répétées

## Utilisation de base

### Détection d'une feature spécifique

```tsx
import { useBrowserFeature } from '~/hooks/use-browser-support'

function MyComponent() {
  const hasContainerQueries = useBrowserFeature('containerQueries')
  
  return (
    <div className={hasContainerQueries ? 'cq-grid-2' : 'grid grid-cols-1 md:grid-cols-2'}>
      {/* Content */}
    </div>
  )
}
```

### Détection de toutes les features

```tsx
import { useBrowserFeatures } from '~/hooks/use-browser-support'

function FeatureAwareComponent() {
  const features = useBrowserFeatures()
  
  if (!features.cssGrid) {
    return <LegacyLayout />
  }
  
  return <ModernLayout />
}
```

### Classification du navigateur

```tsx
import { useBrowserCapabilities } from '~/hooks/use-browser-support'

function AdaptiveApp() {
  const capabilities = useBrowserCapabilities()
  
  return (
    <div className={`app app--${capabilities.tier}`}>
      {capabilities.tier === 'minimal' && <UpgradeBrowserNotice />}
      <MainContent />
    </div>
  )
}
```

## Components avec Progressive Enhancement

### FeatureGate

Rend du contenu conditionnel basé sur le support de features :

```tsx
import { FeatureGate } from '~/components/utils/progressive-enhancement'

<FeatureGate 
  feature="containerQueries"
  fallback={<LegacyGrid />}
>
  <ModernContainerGrid />
</FeatureGate>
```

### EnhancedGrid

Grid qui utilise Container Queries quand disponible :

```tsx
import { EnhancedGrid } from '~/components/utils/progressive-enhancement'

<EnhancedGrid columns={3} gap="gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</EnhancedGrid>
```

### MotionSafe

Respecte les préférences de mouvement de l'utilisateur (critiques pour les utilisatrices enceintes) :

```tsx
import { MotionSafe } from '~/components/utils/progressive-enhancement'

<MotionSafe 
  animationClass="animate-fadeIn duration-300"
  fallbackClass="opacity-100"
>
  <Content />
</MotionSafe>
```

### EnhancedImage

Image avec support aspect-ratio et lazy loading :

```tsx
import { EnhancedImage } from '~/components/utils/progressive-enhancement'

<EnhancedImage 
  src="/image.jpg"
  alt="Description"
  aspectRatio="16/9"
  lazy
/>
```

## Hooks spécialisés

### useContainerQueries

Hook avancé pour Container Queries avec helpers :

```tsx
import { useContainerQueries } from '~/hooks/use-browser-support'

function ResponsiveComponent() {
  const { hasSupport, getContainerClass, getGridClass } = useContainerQueries()
  
  return (
    <div className={getContainerClass()}>
      <div className={getGridClass(3)}>
        {/* Content */}
      </div>
    </div>
  )
}
```

### useMotionPreferences

Détection des préférences de mouvement avec helpers :

```tsx
import { useMotionPreferences } from '~/hooks/use-browser-support'

function AnimatedComponent() {
  const { prefersReduced, shouldAnimate, getAnimationClass } = useMotionPreferences()
  
  const buttonClass = getAnimationClass(
    'transition-all duration-300 hover:scale-105',
    'transition-none'
  )
  
  return <button className={buttonClass}>Click me</button>
}
```

### useProgressiveEnhancement

Stratégies d'amélioration progressive :

```tsx
import { useProgressiveEnhancement } from '~/hooks/use-browser-support'

function AdvancedComponent() {
  const { useModernLayout, useAdvancedEffects, capabilities } = useProgressiveEnhancement()
  
  if (capabilities.tier === 'minimal') {
    return <BasicComponent />
  }
  
  return useAdvancedEffects ? <PremiumComponent /> : <StandardComponent />
}
```

## Features détectées

| Feature | Description | Utilisation |
|---------|-------------|-------------|
| `containerQueries` | Container Queries CSS (@container) | Layouts responsifs basés sur le container |
| `intersectionObserver` | Intersection Observer API | Lazy loading, scroll animations |
| `scrollBehavior` | CSS scroll-behavior: smooth | Défilement fluide |
| `cssGrid` | CSS Grid Layout | Layouts modernes |
| `flexbox` | CSS Flexbox | Alignements et fallbacks |
| `focusVisible` | :focus-visible pseudo-class | Navigation clavier accessible |
| `backdropFilter` | backdrop-filter CSS | Effets visuels |
| `aspectRatio` | aspect-ratio CSS | Ratios d'images/vidéos |
| `webAnimations` | Web Animations API | Animations performantes |
| `prefersReducedMotion` | prefers-reduced-motion | UX pregnancy-safe |

## Matrice de test

Le système inclut une matrice de test complète pour le QA :

```typescript
import { BROWSER_TEST_MATRIX } from '~/lib/browser-support'

// Navigateurs prioritaires
BROWSER_TEST_MATRIX.priority
// Features critiques
BROWSER_TEST_MATRIX.criticalFeatures
// Features d'accessibilité
BROWSER_TEST_MATRIX.accessibilityFeatures
```

## Outils de développement

### Debug des capacités

```typescript
import { browserSupportDebug } from '~/lib/browser-support'

// Log des capacités dans la console
browserSupportDebug.logCapabilities()

// Génération d'un rapport complet
const report = browserSupportDebug.generateReport()

// Mock d'une feature pour les tests
browserSupportDebug.mockFeatureSupport('containerQueries', false)
```

### Hook de debug

```tsx
import { useBrowserSupportDebug } from '~/hooks/use-browser-support'

function DebugComponent() {
  const { capabilities, features } = useBrowserSupportDebug()
  
  // Les données sont automatiquement loggées et ajoutées à window.__SHOOTING_STAR_BROWSER_SUPPORT__
  return <div>Check console for debug info</div>
}
```

## Indicateur de capacité

En mode développement, un indicateur visuel des capacités navigateur s'affiche :

```tsx
import { BrowserCapabilityIndicator } from '~/components/utils/progressive-enhancement'

function App() {
  return (
    <div>
      <MainContent />
      <BrowserCapabilityIndicator /> {/* Only in development */}
    </div>
  )
}
```

## Stratégies de fallback

### Tier Modern
- Toutes les features modernes disponibles
- CSS Container Queries, Grid, animations avancées
- UX optimisée avec tous les effets visuels

### Tier Legacy  
- Features de base disponibles mais quelques manquantes
- Fallbacks avec media queries
- Animations réduites ou désactivées

### Tier Minimal
- Support minimal des features modernes
- Layouts basiques avec flexbox/float
- Interface simplifiée mais fonctionnelle

## Performance

- **Cache des résultats** : Les détections sont mises en cache pour éviter les queries DOM répétées
- **Détection lazy** : Les features ne sont détectées qu'au besoin
- **SSR-safe** : Tous les hooks gèrent correctement le rendu côté serveur
- **Optimisations** : Batching des détections multiples

## Accessibilité & Conformité

Le système respecte automatiquement :

- **WCAG 2.1 AA** : Focus visible, contraste, navigation clavier
- **Loi 25 Québec** : Protection des données, préférences utilisateur
- **Pregnancy-safe UX** : Respect des préférences de mouvement pour éviter les nausées
- **Progressive enhancement** : Tous les utilisateurs ont accès au contenu de base

## Tests

Pour tester le système dans différents navigateurs :

1. **Chrome DevTools** : Utiliser le mode device/network throttling
2. **Firefox Developer Tools** : Tester les préférences d'accessibilité  
3. **Safari** : Tester sur vrais appareils iOS
4. **Feature flags** : Utiliser les outils de debug pour simuler des capabilities différentes

## Exemple complet

Voici un exemple complet d'utilisation du système :

```tsx
import { 
  useBrowserCapabilities, 
  useMotionPreferences,
  useContainerQueries 
} from '~/hooks/use-browser-support'
import { 
  FeatureGate, 
  EnhancedGrid, 
  MotionSafe 
} from '~/components/utils/progressive-enhancement'

function YogaClassGrid({ classes }: { classes: YogaClass[] }) {
  const capabilities = useBrowserCapabilities()
  const { prefersReduced } = useMotionPreferences()
  const { hasSupport: hasContainerQueries } = useContainerQueries()
  
  // Adapter l'expérience selon les capacités
  if (capabilities.tier === 'minimal') {
    return <SimpleClassList classes={classes} />
  }
  
  return (
    <div className="yoga-classes">
      {/* Indicateur de capacités pour l'utilisatrice */}
      {!capabilities.hasAccessibilitySupport && (
        <div className="accessibility-notice">
          Pour une meilleure expérience, activez les options d'accessibilité de votre navigateur.
        </div>
      )}
      
      {/* Grid adaptatif avec container queries ou media queries */}
      <EnhancedGrid 
        columns={3} 
        gap="gap-6"
        enableContainerQuery={hasContainerQueries}
      >
        {classes.map((yogaClass) => (
          <MotionSafe
            key={yogaClass.id}
            animationClass="hover:scale-105 transition-transform duration-200"
            fallbackClass="hover:shadow-lg transition-shadow duration-200"
          >
            <YogaClassCard 
              class={yogaClass}
              reducedMotion={prefersReduced}
            />
          </MotionSafe>
        ))}
      </EnhancedGrid>
      
      {/* Features avancées seulement pour navigateurs modernes */}
      <FeatureGate 
        feature="backdropFilter"
        fallback={<RegularModal />}
      >
        <GlassmorphicModal />
      </FeatureGate>
    </div>
  )
}
```

Ce système garantit que toutes les utilisatrices, quel que soit leur navigateur, ont accès au contenu essentiel tout en offrant une expérience optimisée aux navigateurs modernes.