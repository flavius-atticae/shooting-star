# Style Guide - Pauline Roussel

This style guide defines the visual identity for Pauline Roussel's yoga instructor website specializing in perinatal yoga, motherhood wellness, and birth accompaniment.

## Brand Identity

**Name**: Pauline Roussel  
**Theme**: Perinatal yoga, motherhood wellness, and birth accompaniment  
**Tone**: Calming, nurturing, professional, holistic  
**Visual Elements**: Organic botanical illustrations, feminine silhouettes, natural colors

## Color Palette

### Core Brand Colors

The color system is implemented using CSS custom properties in `app/app.css` and follows a semantic naming convention with light/dark variations.

#### **Primary - Vert (Main Brand Green)**
- **Base**: `--color-primary` (#618462)
- **Light**: `--color-primary-light` (#9eb49e)
- **Dark**: `--color-primary-dark` (#2d3f2d)

#### **Accent - Rose (Warm Rose Accent)**
- **Base**: `--color-accent` (#af6868)
- **Light**: `--color-accent-light` (#d1a3a2) 
- **Dark**: `--color-accent-dark` (#563030)

#### **Secondary - Bleu (Calm Blue)**
- **Base**: `--color-secondary` (#517982)
- **Light**: `--color-secondary-light` (#94adb2)
- **Dark**: `--color-secondary-dark` (#24393e)

#### **Neutral - Brun (Brown for Text)**
- **Base**: `--color-neutral` (#5e4530)
- **Light**: `--color-neutral-light` (#9c8b7d)
- **Dark**: `--color-neutral-dark` (#2b1e13)

#### **Supporting Colors**
- **Warm (Beige)**: `--color-warm` (#ceaf9b)
- **Soft (Rose Pale)**: `--color-soft` (#ffddd3)
- **Cool (Bleu Pale)**: `--color-cool` (#dae6ea)
- **Menthe**: `--color-menthe` (#3d4e8d)
- **White**: `--color-white` (#ffffff)
- **Gris**: `--color-gris` (#f5f4f2)

### TailwindCSS Usage

The colors are accessible through TailwindCSS classes using the simplified color names:

#### **Primary Colors (Green)**
```css
bg-primary        /* #618462 */
bg-primary-light  /* #9eb49e */  
bg-primary-dark   /* #2d3f2d */
text-primary      /* Same color options */
border-primary    /* Same color options */
```

#### **Accent Colors (Rose)**
```css
bg-accent        /* #af6868 */
bg-accent-light  /* #d1a3a2 */
bg-accent-dark   /* #563030 */
text-accent      /* Same color options */
border-accent    /* Same color options */
```

#### **Neutral Colors (Brown)**
```css
bg-neutral        /* #5e4530 */
bg-neutral-light  /* #9c8b7d */
bg-neutral-dark   /* #2b1e13 */
text-neutral      /* Same color options */
border-neutral    /* Same color options */
```

#### **Supporting Colors**
```css
bg-secondary      /* #517982 - Bleu */
bg-warm           /* #ceaf9b - Beige */
bg-soft           /* #ffddd3 - Rose pale */
bg-cool           /* #dae6ea - Bleu pale */
bg-menthe         /* #3d4e8d - Menthe */
bg-white          /* #ffffff - White */
bg-gris           /* #f5f4f2 - Gris */
```

#### **Legacy Support**
For existing components, legacy color names are mapped to the new system:
```css
bg-primary-500    /* Maps to --color-primary */
bg-accent-400     /* Maps to --color-accent-light */
bg-neutral-700    /* Maps to --color-neutral-dark */
bg-soft-50        /* Maps to --color-gris */
```

#### **Current Page Implementation**
- **Background**: `bg-soft-50` (light), `bg-neutral-900` (dark)
- **Text Primary**: `text-neutral-700` (light), `text-neutral-200` (dark)
- **Text Secondary**: `text-neutral-500` (light), `text-neutral-300` (dark)
- **Links**: `text-accent-500` (light), `text-accent-400` (dark)
- **Borders**: `border-primary-200` (light), `border-neutral-700` (dark)

## Typography

### Font Families

#### **Barlow** (Texte Courant & Sous-titres)
- **Body Text**: `font-body` - Barlow Regular (400)
- **Subtitles**: `font-subtitle` + `font-semibold` - Barlow SemiBold (600)
- Usage: Texte principal, navigation, sous-titres
- Caractère: Moderne, lisible, accessible

#### **The Seasons** (Titres)
- **Headings**: `font-heading` - The Seasons Regular
- Usage: Titres principaux (H1, H2)
- Caractère: Élégant, féminin, script décoratif

#### **Moontime** (Accents)
- **Accent Text**: `font-accent` - Moontime Regular
- Usage: Citations, éléments décoratifs, mise en valeur
- Caractère: Artistique, organique, distinctif

### Tailwind Classes
```css
/* Font Families */
font-body      → Barlow Regular
font-subtitle  → Barlow (use with font-semibold)
font-heading   → The Seasons
font-accent    → Moontime

/* Weights */
font-normal    → 400 (Regular)
font-semibold  → 600 (SemiBold)
```

### Implementation
- All fonts loaded via `@font-face` from `/public/fonts/`
- `font-display: swap` for optimal loading
- Fallback fonts included for accessibility

## Logo Assets

### Available Formats
- **SVG**: Best for web use (`../.claude/commands/assets/logos/Logos - SVG/`)
- **PNG**: High-resolution for various uses (`../.claude/commands/assets/logos/Logos - PNG/`)

### Logo Variations

**Full Logo** (Icon + Text)
- `Pauline_Logo-couleurs_Logo-full-[color].svg`
- Colors: bleu, brun, rose, vert
- Use for: Main branding, headers

**Icon Only**
- `Pauline_Logo-couleurs_Logo-icon-[color].svg`
- Botanical illustration with feminine silhouette
- Use for: Favicons, social media, compact spaces

**Text Variations**
- **Square text**: `Logo-texte-carre-[color].svg`
- **Long text**: `Logo-texte-long-[color].svg`
- Use for: Different layout requirements

### Logo Color Usage
- **Green (vert)**: Primary brand color, use most frequently
- **Brown (brun)**: Earth tone variation for warm contexts
- **Blue (bleu)**: Calming variation for wellness content
- **Pink/Rose (rose)**: Feminine variation for motherhood content

## Visual Elements

### Botanical Illustrations
- Organic leaf and branch motifs
- Hand-drawn style with flowing lines
- Represents growth, nature, and nurturing

### Feminine Silhouettes
- Pregnant woman profile in logo
- Represents the perinatal focus
- Subtle and elegant implementation

## Layout & Spacing

### Current Implementation
```css
.container: mx-auto (centered)
.main-padding: pt-16 pb-4
.section-padding: p-4, p-6
.content-width: max-w-[300px], max-w-[100vw]
```

### Component Patterns
- **Cards**: `rounded-3xl border p-6` with brand color borders
- **Navigation**: Centered flex layouts with consistent spacing
- **Buttons**: Use brand colors with proper contrast

## Dark Mode Support

### Current Implementation
- Uses `prefers-color-scheme: dark` media query
- Will need adaptation for brand colors

### Recommendations
- Use darker versions of Clouded Pine for dark mode
- Maintain accessibility with sufficient contrast
- Test all brand colors in dark contexts

## Asset References

### Color Swatches
- Visual color references: `../.claude/commands/assets/colors/`
- Each color family has detailed swatches with hex codes
- Use these for accurate color matching

### Logo Library
- Complete logo collection: `../.claude/commands/assets/logos/`
- Organized by format and color variation
- Source file: `Pauline_Logo-couleurs.ai`

## Implementation Guidelines

### Priority Order
1. Replace React Router placeholder logos with Pauline's brand logos
2. Update color scheme to use Clouded Pine as primary
3. Implement brand colors in TailwindCSS config
4. Update typography to match brand feel
5. Add botanical visual elements where appropriate

### Accessibility
- Ensure all brand colors meet WCAG contrast requirements
- Provide alternative text for botanical illustrations
- Maintain semantic HTML structure
- Test with screen readers

## Future Development

- Custom TailwindCSS color extensions for brand palette
- Botanical pattern backgrounds and decorative elements
- Photography style guide for yoga/pregnancy imagery
- Animation guidelines for gentle, calming interactions