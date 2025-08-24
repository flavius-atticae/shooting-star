# Style Guide - Pauline Roussel

This style guide defines the visual identity for Pauline Roussel's yoga instructor website specializing in perinatal yoga, motherhood wellness, and birth accompaniment.

## Brand Identity

**Name**: Pauline Roussel  
**Theme**: Perinatal yoga, motherhood wellness, and birth accompaniment  
**Tone**: Calming, nurturing, professional, holistic  
**Visual Elements**: Organic botanical illustrations, feminine silhouettes, natural colors

## Color Palette

### Primary Colors

**Clouded Pine** (#618462)
- Primary brand color
- Muted, dark green evoking stability and balance
- Use for: Headers, primary buttons, main branding elements
- TailwindCSS equivalent: `text-gray-600` (closest match)

**Rustling Leaves** (#AF6868)
- Accent color for warmth and energy
- Muted red/rose conveying passion and nurturing
- Use for: Call-to-action buttons, highlights, emphasis
- TailwindCSS equivalent: `text-rose-400` (closest match)

### Supporting Colors

**Pitch Mary Brown** (#5E4530 - brown-600)
- Earth tone for grounding and stability
- Use for: Text, secondary elements

**Submerged** (#517982 - blue-gray)
- Calming blue-gray for tranquility
- Use for: Secondary buttons, borders

**Frappé** (#CEAF9B - warm beige)
- Warm neutral for balance
- Use for: Backgrounds, cards

**Glazed Sugar** (#FFDDD3 - soft peach)
- Light, warm accent
- Use for: Subtle highlights, hover states

**Smoke & Mirrors** (#DAE6EA - light gray-blue)
- Neutral background color
- Use for: Section backgrounds

**Splashdown** (#D4E8D4 - light sage)
- Light green for harmony with primary
- Use for: Success states, gentle backgrounds

### Current Implementation (to be updated)
- **Background**: `bg-white` (light mode), `bg-gray-950` (dark mode)
- **Text Primary**: Default text, `text-gray-700` (light), `text-gray-200` (dark)
- **Text Secondary**: `text-gray-600` (light), `text-gray-300` (dark)
- **Links**: `text-blue-700` (light), `text-blue-500` (dark) with `hover:underline`
- **Borders**: `border-gray-200` (light), `border-gray-700` (dark)

## Typography

### Font Stack
```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

### Usage
- **Body Text**: Inter 400 (regular)
- **Headings**: Inter 500-600 (medium-semibold)  
- **Logo Text**: Custom serif or script font (as seen in logo designs)
- **Line Height**: `leading-6` for body, `leading-normal` for links

## Logo Assets

### Available Formats
- **SVG**: Best for web use (`.claude/commands/assets/logos/Logos - SVG/`)
- **PNG**: High-resolution for various uses (`.claude/commands/assets/logos/Logos - PNG/`)
- **JPEG**: Photography/print contexts (`.claude/commands/assets/logos/Logos - JPEG/`)

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
- Visual color references: `.claude/commands/assets/colors/`
- Each color family has detailed swatches with hex codes
- Use these for accurate color matching

### Logo Library
- Complete logo collection: `.claude/commands/assets/logos/`
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