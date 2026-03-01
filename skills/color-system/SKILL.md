---
name: color-system
description: Generate cohesive color palettes using color theory (60-30-10 rule, complementary, analogous, triadic). Output CSS variables, Tailwind configs, light/dark variants, WCAG contrast checks, and gradient recipes. Trigger: "create color palette", "build design system", "color system for".
version: 1.0.0
license: MIT
---

## Purpose

You are a color systems architect. This skill generates production-ready color systems starting from a single base color, applying color theory principles to create cohesive, accessible palettes. You'll produce CSS custom properties, Tailwind config extensions, dark mode variants, WCAG contrast checks, and gradient recipes (mesh gradients, grain overlays, glassmorphism).

**Who uses it**: Product designers, brand designers, design systems leads, frontend developers implementing design tokens.

**When to use it**: Building a design system from scratch, refreshing brand colors, ensuring WCAG accessibility, creating light/dark mode variants.

## When to Use

- **Design system creation**: You're building a complete design system (see `design-system-generator` workflow).
- **Accessibility audit**: Existing colors fail contrast checks. Need to regenerate with guardrails.
- **Dark mode implementation**: Have light palette, need coordinated dark mode.
- **Multi-brand system**: Each brand needs a distinct color system from one base color.
- **Gradient/texture design**: Need production CSS for mesh gradients, grain overlays, aurora effects.
- **Component theming**: Need to theme UI components with semantic color roles (success, error, warning, info).

**Not for**: Logo design. Illustration color selection. Photo editing. Per-pixel color adjustment.

## Key Concepts

### The 60-30-10 Rule

Professional color systems distribute colors by visual weight:

```
60% (Primary) + 30% (Secondary) + 10% (Accent)
```

- **Primary (60%)**: The dominant brand color. Fills backgrounds, large surfaces.
- **Secondary (30%)**: Supporting color. Complements primary. Used for sections, cards, callouts.
- **Accent (10%)**: High-saturation color. CTAs, highlights, emphasis, error/success states.

### Color Harmonies

Generate new colors from a base using proven color theory:

| Harmony | Formula | When to Use |
|---------|---------|-------------|
| **Complementary** | Base + 180° opposite | High contrast, energetic, bold |
| **Analogous** | Base ± 30° neighbors | Harmonious, cohesive, calm |
| **Split-Complementary** | Base + 150° + 210° | Balanced contrast, less aggressive than complementary |
| **Triadic** | Base + 120° + 240° | Vibrant, balanced, three distinct colors |
| **Monochromatic** | Base + lightness/saturation variations | Unified, professional, minimal |

### WCAG Accessibility

Color systems must ensure readable contrast ratios:

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

Where L = 0.299*R + 0.587*G + 0.114*B  (relative luminance, normalized 0-1)
```

**Standards**:
- **WCAG AA**: 4.5:1 for body text, 3:1 for large text (18pt+)
- **WCAG AAA**: 7:1 for body text, 4.5:1 for large text
- **UI components**: 3:1 minimum for borders, focus states

### Color Spaces

Working in different color spaces produces different results:

- **HSL (Hue, Saturation, Lightness)**: Intuitive for designers. Easy to adjust saturation/brightness.
- **HSV (Hue, Saturation, Value)**: Similar to HSL but uses perceived brightness (Value).
- **Lab (CIELab)**: Perceptually uniform. Better for accessible contrast (use for critical work).
- **LCh**: Like Lab but cylindrical. Best for color harmony generation.

---

## Instructions

### Step 1: Choose Your Base Color

Select a single brand color (hex or hsl):

```
Hex: #3B82F6 (blue)
HSL: hsl(217, 91%, 60%)
```

### Step 2: Select Color Harmony

Choose based on brand personality:

- **Complementary**: Energetic, high-contrast (e.g., blue + orange)
- **Analogous**: Calm, cohesive (e.g., blue + cyan + purple)
- **Triadic**: Balanced, vibrant (e.g., blue + red + yellow)
- **Monochromatic**: Professional, unified (e.g., 5 shades of blue)

### Step 3: Generate Palette

Use HSL color space for simplicity:

```javascript
function generateComplementary(hex) {
  const [h, s, l] = hexToHsl(hex);
  return {
    primary: hslToHex(h, s, l),
    secondary: hslToHex((h + 180) % 360, s * 0.8, l),
    accent: hslToHex((h + 180) % 360, s, l * 0.5)
  };
}

function generateAnalogous(hex) {
  const [h, s, l] = hexToHsl(hex);
  return {
    primary: hslToHex(h, s, l),
    secondary: hslToHex((h + 30) % 360, s, l),
    tertiary: hslToHex((h - 30 + 360) % 360, s, l)
  };
}
```

### Step 4: Create Tonal Variants

For each primary color, generate lightness variants:

```javascript
function generateTones(hex, name) {
  const [h, s, l] = hexToHsl(hex);
  return {
    [`${name}-50`]: hslToHex(h, s * 0.15, 95),   // Lightest
    [`${name}-100`]: hslToHex(h, s * 0.25, 90),
    [`${name}-200`]: hslToHex(h, s * 0.35, 80),
    [`${name}-300`]: hslToHex(h, s * 0.5, 70),
    [`${name}-400`]: hslToHex(h, s * 0.7, 60),
    [`${name}-500`]: hslToHex(h, s, l),           // Base
    [`${name}-600`]: hslToHex(h, s, l - 10),
    [`${name}-700`]: hslToHex(h, s, l - 20),
    [`${name}-800`]: hslToHex(h, s, l - 30),
    [`${name}-900`]: hslToHex(h, s * 0.8, 20)    // Darkest
  };
}
```

### Step 5: Check WCAG Contrast

Validate that colors meet accessibility requirements:

```javascript
function checkContrast(hexFg, hexBg) {
  const rgb1 = hexToRgb(hexFg);
  const rgb2 = hexToRgb(hexBg);

  const lum1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 255;
  const lum2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 255;

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: ratio.toFixed(2),
    aaPass: ratio >= 4.5,
    aaaPass: ratio >= 7
  };
}
```

Test all text/background combinations:
- Body text (16px): Need 4.5:1 (AA) or 7:1 (AAA)
- Large text (18pt+): Need 3:1 (AA) or 4.5:1 (AAA)
- UI components: Need 3:1 minimum

### Step 6: Create CSS Variables

Export as scoped custom properties:

```css
:root {
  /* Primary palette (60%) */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* Secondary palette (30%) */
  --color-secondary-50: #F0F4FF;
  --color-secondary-500: #6366F1;
  --color-secondary-900: #312E81;

  /* Accent palette (10%) */
  --color-accent-50: #FEFCE8;
  --color-accent-500: #FBBF24;
  --color-accent-900: #78350F;

  /* Semantic colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #0EA5E9;

  /* Neutrals */
  --color-gray-50: #F9FAFB;
  --color-gray-900: #111827;

  /* Surfaces */
  --color-bg-primary: var(--color-gray-50);
  --color-bg-secondary: var(--color-primary-50);
  --color-bg-tertiary: var(--color-gray-200);

  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-400);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: var(--color-gray-900);
    --color-bg-secondary: var(--color-primary-900);
    --color-bg-tertiary: var(--color-gray-800);

    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-400);
    --color-text-muted: var(--color-gray-600);
  }
}
```

### Step 7: Create Tailwind Extension

Extend Tailwind config with custom colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          50: '#F0F4FF',
          500: '#6366F1',
          900: '#312E81',
        },
        accent: {
          50: '#FEFCE8',
          500: '#FBBF24',
          900: '#78350F',
        },
      },
    },
  },
};
```

### Step 8: Dark Mode Variants

Generate dark mode palette by inverting lightness:

```javascript
function generateDarkVariant(hex) {
  const [h, s, l] = hexToHsl(hex);
  // Invert lightness: light (90%) becomes dark (20%)
  const darkL = 100 - l;
  return hslToHex(h, s, darkL);
}

// Example: Light #3B82F6 (l=60%) → Dark #1E3A8A (l=20%)
```

Apply with CSS media query:

```css
/* Light mode (default) */
:root {
  --color-primary-500: #3B82F6;
  --color-bg: #FFFFFF;
  --color-text: #000000;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: #60A5FA;  /* Lighter shade of blue */
    --color-bg: #0F172A;
    --color-text: #F8FAFC;
  }
}
```

---

## Examples

### Example 1: Complementary Color System (SaaS)

**Base**: Blue (#3B82F6)

```
Primary (60%): Blue #3B82F6
Secondary (30%): Orange #FB923C
Accent (10%): Purple #A855F7
```

**Palette**:
```css
:root {
  /* Blue primary (60%) */
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;

  /* Orange secondary (30%) */
  --color-secondary-500: #FB923C;
  --color-secondary-600: #F97316;

  /* Purple accent (10%) */
  --color-accent-500: #A855F7;
  --color-accent-600: #9333EA;
}
```

**WCAG Check**:
- Blue #3B82F6 on white: 3.96:1 (fails AA 4.5:1 for body text)
  - Solution: Use darker shade #1D4ED8 (9.28:1 for body, #3B82F6 for UI)

---

### Example 2: Analogous System (Editorial)

**Base**: Teal (#06B6D4)

```
Primary (60%): Teal #06B6D4
Secondary (30%): Cyan #0891B2
Tertiary (30%): Green #059669
```

**Palette**:
```css
:root {
  --color-primary: #06B6D4;
  --color-secondary: #0891B2;
  --color-tertiary: #059669;

  /* Tonal variants */
  --color-primary-100: #CFFAFE;
  --color-primary-500: #06B6D4;
  --color-primary-900: #164E63;
}
```

**Why this works**: All three colors sit on same hue spectrum (blue-green). Creates calm, cohesive feel. Perfect for editorial, wellness, nature brands.

> See `references/color-examples.md` for additional examples: dark mode palette, WCAG AAA palette, gradient recipes.

---

## Common Pitfalls

### ❌ Pitfall 1: Too Many Colors in Palette

**Problem**: You create 40 color tokens (primary 10 shades, secondary 10, accent 10, plus neutrals). Design system becomes unmaintainable bloat.

**Fix**: Stick to **three color families max**:
- Primary (8-10 tones for hierarchy)
- Secondary (3-5 tones for support)
- Accent (2-3 tones for CTA/error/success)
- Neutrals (5-7 tones for text/backgrounds)

Total: ~25 tokens. Anything more is clutter.

### ❌ Pitfall 2: Not Checking Dark Mode Contrast

**Problem**: Your light mode palette has 4.5:1 contrast, but in dark mode it fails (primary blue on dark gray).

**Fix**: **Always test dark mode separately**. Darker backgrounds need lighter text and lighter accent colors:

```css
/* Light mode ✓ */
:root {
  --color-primary: #1D4ED8;      /* Dark blue, 9.28:1 on white */
  --color-text: #000000;
  --color-bg: #FFFFFF;
}

/* Dark mode BROKEN ✗ */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #1D4ED8;    /* Too dark on dark bg! */
    --color-text: #FFFFFF;
    --color-bg: #0F172A;
  }
}

/* Dark mode FIXED ✓ */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #60A5FA;    /* Lighter shade of blue */
    --color-text: #FFFFFF;
    --color-bg: #0F172A;
  }
}
```

### ❌ Pitfall 3: Using Colors That Look Totally Different at Different Lightness Levels

**Problem**: You set primary #FF5733 (bright orange, brightness 0.6) and secondary #0066FF (bright blue, brightness 0.4). They feel unbalanced visually.

**Fix**: **Normalize brightness** by adjusting lightness values. When generating tones, keep saturation consistent:

```javascript
// Bad: Different brightnesses
--color-primary: hsl(20, 100%, 60%);   /* Orange, bright */
--color-secondary: hsl(220, 100%, 40%); /* Blue, dark */

// Good: Normalize lightness
--color-primary: hsl(20, 100%, 50%);    /* Orange */
--color-secondary: hsl(220, 100%, 50%); /* Blue, same lightness */
```

> See `references/color-examples.md` for additional pitfalls: color blindness, saturation management, token export.

---

## References

- **Color Harmony Tools**: https://color.adobe.com/, https://www.colorhexa.com/, https://www.colordot.it/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Colorblind Simulator**: https://www.color-blindness.com/coblis-color-blindness-simulator/
- **Gradient Recipes**: See `/references/gradient-recipes.md` for 15+ production-ready CSS recipes
- **Color Space Converter**: https://chir.cat/projects/hsl/, https://www.rapidtables.com/convert/color/hex-to-hsl.html
- **WCAG Color Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- **Related Skills**: See `typography-pairing` for font pairing with color systems
- **Related Skills**: `dark-mode`, `design-tokens`, `accessibility-system`
