---
name: typography-pairing
description: Curated Fontshare font pairings by mood and category. Six ready-made pairing systems (Editorial, Tech/Modern, Playful, Luxury, Minimal, Bold/Impact). Trigger: "pick fonts for", "typography recommendation", "what fonts go with". Includes type scales and CSS imports.
version: 1.0.0
license: MIT
---

## Purpose

You are a typography strategist. This skill provides six opinionated, production-ready font pairings using free commercial fonts from Fontshare. Each pairing includes a display font + body font, type scale recommendations, CSS imports, and usage guidance. Use this to rapidly establish cohesive typography systems without the friction of font selection paralysis.

**Who uses it**: Product designers, brand designers, frontend developers implementing design systems, design systems architects.

**When to use it**: When you need to pair fonts for a new project, rebrand typography, or establish hierarchy in a design system.

## When to Use

- **Kickoff meeting**: Client asks "what fonts should we use?" Pick a pairing in 30 seconds.
- **Design system creation**: You're building a design system from scratch (see `design-system-generator` workflow).
- **Brand refresh**: Existing typography feels dated. Replace with a pairing that modernizes.
- **Website redesign**: Moving from default system fonts to a curated system.
- **Multi-platform consistency**: Same fonts across web, email, marketing materials.

**Not for**: Custom font selection or commissioning. Expert typography criticism. License negotiation.

## Key Concepts

### The Six Pairings

Each pairing follows a pattern:
- **Display font**: High personality, used for H1, H2, page titles, hero text
- **Body font**: High readability, used for paragraph text, labels, UI copy (16px default)
- **Type scale**: Consistent sizing ratio (major third 1.25 or perfect fourth 1.333)
- **Weights**: Minimal set (regular, medium, bold) to reduce file size
- **Line height**: Paired with font to maximize readability

### Fontshare CDN Pattern

```
https://api.fontshare.com/v2/css?f[]={fontname}@{weights}&display=swap
```

Example:
```
https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=general-sans@400,500,700&display=swap
```

**Parameters**:
- `f[]`: Array of font names (kebab-case)
- `@{weights}`: Comma-separated weight list (400, 500, 700, 800, 900)
- `display=swap`: Use system font while custom font loads (best performance)

### Type Scale Ratios

**Major Third (1.25)**: Warm, editorial, friendly
```
12px → 15px → 18.75px → 23.44px → 29.3px → 36.6px
```

**Perfect Fourth (1.333)**: Tech, modern, structured
```
12px → 16px → 21.3px → 28.4px → 37.9px → 50.5px
```

**Recommended defaults**:
- Display: Use perfect fourth (tech-forward)
- Body: Base 16px, line-height 1.5-1.6 for print; 1.4 for UI

## The Six Pairings

### Pairing 1: Editorial (Warm, Approachable)

**Use for**: Marketing sites, blogs, agencies, lifestyle brands, content platforms

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap');

:root {
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Major Third 1.25)**:
```
H1: 36.6px (bold 700)
H2: 29.3px (bold 700)
H3: 23.44px (medium 500)
H4: 18.75px (medium 500)
Body: 16px (regular 400)
Small: 12.8px (regular 400)
```

**Line Heights**:
- Display: 1.1
- Body: 1.6

**When to use**: You need personality + readability. Clash Display is friendly (rounded terminals), General Sans is modern but warm. Pair them when brand voice is accessible, not corporate.

---

### Pairing 2: Tech/Modern (Clean, Minimal)

**Use for**: SaaS products, developer tools, fintech, data platforms

```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,800&f[]=inter@400,500,700&display=swap');

:root {
  --font-display: 'Satoshi', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Perfect Fourth 1.333)**:
```
H1: 50.5px (bold 800)
H2: 37.9px (bold 700)
H3: 28.4px (medium 500)
H4: 21.3px (medium 500)
Body: 16px (regular 400)
Small: 12px (regular 400)
```

**Line Heights**:
- Display: 1.15
- Body: 1.5

**When to use**: Brand is serious, minimal, tech-forward. Satoshi is geometric + modern, Inter is hyper-legible (designed for screens). Perfect for dashboards, developer documentation, fintech.

---

### Pairing 3: Playful (Bold, Energetic)

**Use for**: Startups, design tools, creative agencies, entertainment, games

```css
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=switzer@400,500,700&display=swap');

:root {
  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body: 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Major Third 1.25)**:
```
H1: 41.4px (bold 800)
H2: 33.1px (bold 700)
H3: 26.49px (medium 500)
H4: 21.2px (medium 500)
Body: 16px (regular 400)
Small: 12.8px (regular 400)
```

**Line Heights**:
- Display: 1.1
- Body: 1.6

**When to use**: Brand should feel young, bold, experimental. Cabinet Grotesk has tight spacing + aggressive personality. Switzer is friendly but structured. Great for D2C, gaming, design agencies.

---

### Pairing 4: Luxury (Elegant, Refined)

**Use for**: High-end brands, luxury goods, editorial, design studios, real estate

```css
@import url('https://api.fontshare.com/v2/css?f[]=boska@700&f[]=erode@400,500&display=swap');

:root {
  --font-display: 'Boska', serif;
  --font-body: 'Erode', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Perfect Fourth 1.333)**:
```
H1: 50.5px (bold 700)
H2: 37.9px (bold 700)
H3: 28.4px (medium 500)
H4: 21.3px (medium 500)
Body: 16px (regular 400)
Small: 12px (regular 400)
```

**Line Heights**:
- Display: 1.2
- Body: 1.5

**When to use**: Brand is premium, refined, sophisticated. Boska (serif) brings tradition + elegance. Erode (sans) is minimal + sophisticated. Rare serif + sans combination that works at scale. Perfect for luxury, editorial, architecture, jewelry.

---

### Pairing 5: Minimal (Timeless, Focused)

**Use for**: Tech products, B2B SaaS, photography portfolios, content platforms

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@600,700&f[]=general-sans@400,500,700&display=swap');

:root {
  --font-display: 'Clash Grotesk', sans-serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Perfect Fourth 1.333)**:
```
H1: 50.5px (bold 700)
H2: 37.9px (bold 600)
H3: 28.4px (medium 500)
H4: 21.3px (medium 500)
Body: 16px (regular 400)
Small: 12px (regular 400)
```

**Line Heights**:
- Display: 1.15
- Body: 1.5

**When to use**: Simplicity + clarity matter most. Same family (both grotesks) for unified feel. Clash Grotesk slightly geometric, General Sans more neutral. Boring is a feature here. Best for portfolios, minimal SaaS, photography sites.

---

### Pairing 6: Bold/Impact (High Energy, Statement)

**Use for**: Startups, e-commerce, media outlets, event sites, podcasts

```css
@import url('https://api.fontshare.com/v2/css?f[]=zodiak@700,800,900&f[]=panchang@400,500,700&display=swap');

:root {
  --font-display: 'Zodiak', serif;
  --font-body: 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Type Scale (Major Third 1.25)**:
```
H1: 46.6px (bold 900)
H2: 37.3px (bold 800)
H3: 29.84px (bold 700)
H4: 23.9px (medium 500)
Body: 16px (regular 400)
Small: 12.8px (regular 400)
```

**Line Heights**:
- Display: 1.05
- Body: 1.6

**When to use**: Make a statement. Zodiak is a high-contrast serif with brutal geometric forms. Switzer brings warmth + structure as the body font. Creates maximum visual impact. Use sparingly — this is the loudest pairing. Best for headlines, hero sections, CTAs.

> **Note**: Zodiak is a serif font (it has distinct serifs). The CSS fallback is `serif`, not `sans-serif`. Previous versions of this pairing used Panchang for body — Switzer is a safer choice at body sizes due to better readability at 16px.

---

## Instructions

### Step 1: Choose Your Pairing

Answer three questions:
1. **Brand personality**: Cold/minimal or warm/playful?
2. **Industry**: Tech (use Tech/Modern), Luxury, SaaS, Marketing, Entertainment?
3. **Content type**: Long-form writing (Editorial, Minimal), visual-focused (Luxury, Playful)?

**Quick selector**:
- **SaaS dashboard**: Tech/Modern
- **Agency website**: Editorial or Playful
- **Luxury brand**: Luxury
- **Portfolio site**: Minimal
- **Startup homepage**: Bold/Impact

### Step 2: Add CSS Import

Copy the `@import` URL into your CSS file (or `<link>` in HTML):

```html
<head>
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap" rel="stylesheet">
</head>
```

Or for performance, import in CSS:

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap');
```

### Step 3: Set CSS Variables

```css
:root {
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Type scale */
  --text-xs: 12.8px;
  --text-sm: 16px;
  --text-base: 16px;
  --text-lg: 18.75px;
  --text-xl: 23.44px;
  --text-2xl: 29.3px;
  --text-3xl: 36.6px;
}
```

### Step 4: Apply to HTML

```html
<h1 style="font-family: var(--font-display); font-size: var(--text-3xl);">
  Welcome
</h1>

<p style="font-family: var(--font-body); font-size: var(--text-base); line-height: 1.6;">
  Body text goes here...
</p>
```

### Step 5: Tailwind Integration (Optional)

Extend your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    fontFamily: {
      display: ['Clash Display', 'sans-serif'],
      body: ['General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    },
    fontSize: {
      xs: '12.8px',
      sm: '16px',
      base: '16px',
      lg: '18.75px',
      xl: '23.44px',
      '2xl': '29.3px',
      '3xl': '36.6px',
    },
  },
};
```

Then use in JSX: `<h1 className="font-display text-3xl">...</h1>`

## Examples

### Example 1: Marketing Site (Editorial Pairing)

```html
<head>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-display: 'Clash Display', sans-serif;
      --font-body: 'General Sans', -apple-system, sans-serif;
    }
  </style>
</head>

<body>
  <!-- Hero -->
  <h1 style="font: 700 36.6px var(--font-display); line-height: 1.1;">
    Bring Your Ideas to Life
  </h1>

  <!-- Subheading -->
  <h2 style="font: 500 23.44px var(--font-display); color: #666;">
    Fast, simple, powerful tools
  </h2>

  <!-- Body -->
  <p style="font: 400 16px var(--font-body); line-height: 1.6; max-width: 600px;">
    We've built the perfect platform for teams that want to collaborate seamlessly...
  </p>
</body>
```

Result: Warm, approachable feel. Clash Display personality catches attention, General Sans keeps copy scannable.

---

### Example 2: SaaS Product (Tech/Modern Pairing)

```css
/* app.css */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,800&f[]=inter@400,500,700&display=swap');

:root {
  --font-display: 'Satoshi', sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}

h1 { font: 800 50.5px var(--font-display); }
h2 { font: 700 37.9px var(--font-display); }
h3 { font: 500 28.4px var(--font-display); }
p { font: 400 16px var(--font-body); line-height: 1.5; }
button { font: 500 16px var(--font-body); }
```

Result: Clean, professional. Inter's neutral personality works perfectly for buttons, labels, UI text. Satoshi adds geometric interest to headers without personality.

---

### Example 3: Luxury Brand (Luxury Pairing)

```html
<style>
  @import url('https://api.fontshare.com/v2/css?f[]=boska@700&f[]=erode@400,500&display=swap');

  .hero__title {
    font-family: 'Boska', serif;
    font-size: 50.5px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .hero__subtitle {
    font-family: 'Erode', sans-serif;
    font-size: 21.3px;
    font-weight: 500;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .text {
    font-family: 'Erode', sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }
</style>

<h1 class="hero__title">Crafted Perfection</h1>
<p class="hero__subtitle">Est. 1987</p>
<p class="text">Our collection represents decades of...</p>
```

Result: Boska (serif) creates refinement and tradition. Erode (geometric sans) modernizes while maintaining elegance. Together = premium luxury.

## Common Pitfalls

### ❌ Pitfall 1: Using Inter + Roboto Defaults

**Problem**: Most popular Google Fonts = every SaaS site looks identical.

**Fix**: Use curated pairings. If you must use Inter, pair with something distinct (Satoshi + Inter, or Clash Display + Inter). At least one font should have character.

### ❌ Pitfall 2: Ignoring Line Height

**Problem**: Setting font-family without line-height. 36.6px at line-height 1.0 = cramped.

**Fix**: Display fonts: 1.1-1.2. Body fonts: 1.5-1.6. Always set both together.

### ❌ Pitfall 3: Too Many Weights

**Problem**: Loading 6+ weights. File size explodes (~20-30KB per weight).

**Fix**: 2-3 weights max. Display: 700, 800. Body: 400, 500, 700.

### ❌ Pitfall 4: Wrong Scale Ratio

**Problem**: Using perfect fourth (1.333) when editorial feel needs major third (1.25).

**Fix**: Major Third (1.25) → Editorial, Playful, Bold/Impact. Perfect Fourth (1.333) → Tech/Modern, Luxury, Minimal.

### ❌ Pitfall 5: Not Preloading Font CDN

**Problem**: No preconnect = 200ms+ FOUT on first load.

**Fix**: Add `<link rel="preconnect" href="https://api.fontshare.com">` before the stylesheet link. Use `display=swap`.

### ❌ Pitfall 6: No Font Contrast

**Problem**: Two fonts from same category with no visual contrast.

**Fix**: Pair for contrast: Serif + Sans, Geometric + Humanist, Heavy + Light.

---

## References

- **Fontshare Catalog**: See `/references/fontshare-catalog.md`
- **Type Scale**: https://www.typescale.com/
- **Inspiration**: https://www.typewolf.com/
- **Related Skill**: `color-system` for pairing typography with color palettes
- **Related Skills**: `aesthetic-direction`, `design-tokens`, `responsive-patterns`
