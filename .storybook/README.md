# Storybook Configuration - Shooting Star

## Phase 1 Implementation Complete ✅

Cette configuration Storybook est optimisée pour le développement de composants **pregnancy-safe** dans le projet Shooting Star de Pauline Roussel.

### 🚀 Démarrage Rapide

```bash
# Démarrer Storybook en développement
npm run storybook

# Builder Storybook pour production  
npm run build-storybook
```

Storybook sera disponible à : **http://localhost:6006**

## 📁 Structure

```
.storybook/
├── main.ts              # Configuration principale
├── preview.tsx          # Configuration globale et decorators
├── vite.config.ts       # Configuration Vite pour Storybook
└── README.md           # Cette documentation

stories/
├── foundation/
│   ├── Introduction.mdx              # Documentation d'accueil
│   └── Pregnancy-Safe-Guidelines.mdx # Guidelines UX spécialisées

app/components/
├── ui/
│   ├── container.stories.tsx         # Stories Container
│   └── background.stories.tsx        # Stories Background
└── layout/
    └── responsive-grid.stories.tsx   # Stories AdaptiveGrid
```

## 🔧 Configuration

### Addons Installés

- **@storybook/addon-essentials** : Contrôles, actions, docs, viewport, backgrounds
- **@storybook/addon-a11y** : Tests d'accessibilité WCAG 2.1 AA
- **@storybook/addon-docs** : Documentation automatique avec MDX
- **@chromatic-com/storybook** : Tests visuels

### Paramètres Pregnancy-Safe

#### Viewports Optimisés
- **iPhone SE (375px)** : Minimum supporté  
- **iPhone 12/13 (390px)** : Mobile optimal
- **iPad (768px)** : Tablet pregnancy-friendly  
- **Desktop (1024px+)** : Interfaces étendues

#### Backgrounds Palette Pauline Roussel
- **White** : Base neutre
- **Gris** : Arrière-plan doux (#f5f4f2)
- **Soft Gradient** : Transition blanc → rose pâle
- **Warm Gradient** : Transition blanc → beige

#### Accessibilité Renforcée
- Tests automatiques sur chaque story
- Validation contraste couleurs
- Vérification touch targets (≥44px)
- Support navigation clavier

## 📋 Stories Implémentées

### Foundation/Container
- **5 tailles** : sm, md, lg, xl, full
- **Responsive padding** adaptatif
- **Touch-friendly** pour usage grossesse
- **Semantic HTML** configurable

**Stories disponibles :**
- Default, Small, Medium, Large, ExtraLarge
- FullWidth, Comparison, CustomElement, WithCustomStyles

### Foundation/Background  
- **5 variantes** pregnancy-safe
- **Palette Pauline Roussel** intégrée
- **Gradients doux** sans agressivité visuelle
- **Patterns subtils** optionnels

**Stories disponibles :**
- White, Accent, SoftGradient, ComplexGradient, WarmGradient
- AllVariants, WithPatterns, UseBackgroundClasses

### Foundation/AdaptiveGrid
- **Container Queries** avec fallback média queries  
- **2 et 3 colonnes** adaptatifs
- **Touch targets généreux** (≥44px)
- **Performance optimisée** pour tous devices

**Stories disponibles :**
- TwoColumns, ThreeColumns, CustomGap, InteractiveResize
- Comparison, CompleteDemo, ServicesGallery

## 🎨 Design System Integration

### Couleurs Pregnancy-Safe
```css
/* Principales */
--primary: #618462    /* Vert apaisant */
--secondary: #517982  /* Bleu calme */
--accent: #af6868     /* Rose doux */
--neutral: #5e4530    /* Brun lisible */

/* Support */
--soft: #ffddd3       /* Rose pâle */
--warm: #ceaf9b       /* Beige chaleureux */  
--gris: #f5f4f2       /* Gris neutre */
```

### Typography
- **Base** : 16px minimum sur mobile
- **Line Height** : 1.6+ pour faciliter lecture
- **Font Weight** : Medium recommandé pour visibilité

## 🧪 Tests et Validation

### Checklist Accessibility (WCAG 2.1 AA)
Chaque story valide automatiquement :

- [ ] **Contraste** : ≥4.5:1 (texte normal), ≥3:1 (large)
- [ ] **Touch Targets** : ≥44x44px avec 8px espacement
- [ ] **Navigation Clavier** : Tab, Enter, Espace fonctionnels
- [ ] **Screen Readers** : Labels et descriptions appropriés
- [ ] **Motion** : Respecte prefers-reduced-motion

### Tests Pregnancy-Specific
- [ ] **Couleurs non-déclencheuses** : Pas de rouge médical
- [ ] **Animations douces** : ≤300ms, courbes easeOut
- [ ] **Lisibilité fatigue** : Contrastes généreux
- [ ] **Touch comfort** : Zones élargies, feedback visuel

## 🔄 Workflow Développement

### Ajouter une Nouvelle Story

1. **Créer le fichier** `component.stories.tsx` à côté du composant
2. **Suivre le template** des stories existantes
3. **Inclure documentation** MDX si nécessaire
4. **Valider accessibility** avec addon a11y
5. **Tester pregnancy-safe** selon guidelines

### Template Story Type-Safe
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './component'

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Description pregnancy-friendly'
      }
    }
  },
  argTypes: {
    // Props configuration
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: {
    // Default props
  }
}
```

## 🚀 Déploiement

### Build Production
```bash
npm run build-storybook
```

### GitHub Pages (automatique)
- Build automatique sur push `main`
- Déploiement sur `https://flavius-atticae.github.io/shooting-star/`
- Cache CDN pour performance optimale

### Intégration Continue
- **TypeScript check** : Validation types stricte
- **Accessibility tests** : Échec si WCAG non-respecté  
- **Visual regression** : Détection changements visuels
- **Performance** : Bundle size monitoring

## 📚 Resources

### Documentation Interne
- [Foundation Introduction](http://localhost:6006/?path=/docs/foundation-introduction--docs)
- [Pregnancy-Safe Guidelines](http://localhost:6006/?path=/docs/foundation-guidelines-pregnancy-safe--docs)

### Guidelines Externes
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)
- [Quebec Law 25 Compliance](https://www.cai.gouv.qc.ca/loi-25/)

---

**Cette configuration Phase 1 fournit une base solide pour développer l'ensemble du design system Shooting Star avec un focus pregnancy-safe prioritaire.** 🤱✨