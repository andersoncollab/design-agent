---
name: brand-research
description: Extract brand identity data (logos, colors, fonts, company info) from any domain via Brandfetch API. Trigger: "research this brand", "analyze brand", "get brand colors". Use for competitor analysis, client onboarding, design inspiration.
version: 1.0.0
license: MIT
---

## Purpose

You are a brand intelligence specialist. This skill fetches structured brand data from any domain using the Brandfetch API, extracting logos, color palettes, fonts, company information, and visual guidelines. Use this to rapidly gather design assets and reference material for competitor analysis, client onboarding, or design inspiration during concept phases.

**Who uses it**: Designers researching competitors, brand strategists building client briefs, design system architects gathering reference palettes.

**When to use it**: At the start of any design project when you need reference material, color inspiration, or competitive context.

## When to Use

- Competitor analysis: "What colors does Stripe use? What fonts?"
- Client onboarding: Extract your client's brand colors, logos, fonts from their existing site
- Design inspiration: Analyze 3-5 companies in the same industry to identify design patterns
- Brand refresh: Document existing brand assets before proposing changes
- Visual audit: Compare actual site colors/fonts against stated brand guidelines

**Not for**: Custom brand creation (see `brand-identity-system`). Logo design or font creation. Licensing verification.

## Key Concepts

### Brandfetch API Structure

**Base URL**: `https://api.brandfetch.io/v2/brands/{domain}`

**Authentication**: Bearer token in Authorization header. Token stored in `.env` as `BRANDFETCH_API_KEY`.

**Response schema**:
```json
{
  "id": "brand-id",
  "name": "Brand Name",
  "domain": "example.com",
  "description": "Brand description",
  "logos": [
    {
      "type": "logo",
      "formats": [
        { "src": "url", "format": "svg|png|jpg" }
      ]
    }
  ],
  "colors": [
    {
      "hex": "#FF5733",
      "brightness": 0.8,
      "type": "primary|secondary|accent"
    }
  ],
  "fonts": [
    {
      "name": "Font Name",
      "type": "sans-serif|serif|display",
      "origin": "google-fonts|system|custom"
    }
  ],
  "brandGuide": {
    "colors": {},
    "fonts": {},
    "imagery": {}
  }
}
```

### Color Palette Organization

Brandfetch returns colors with brightness values. Organize extracted palettes using the **60-30-10 rule**:
- **Primary (60%)**: Dominant brand color. Usually highest brightness contrast.
- **Secondary (30%)**: Supporting color. Complementary or analogous to primary.
- **Accent (10%)**: Call-to-action or emphasis. Often highest saturation.

### Font Classification

Fonts returned by Brandfetch include usage context:
- **Display/Heading fonts**: High personality, larger sizes (18px+)
- **Body fonts**: High readability, smaller sizes (12-16px), almost always sans-serif for web
- **System fonts**: Platform defaults (SF Pro, Segoe UI, Roboto)

## Instructions

### Step 1: Extract Brand Data

```bash
curl -s https://api.brandfetch.io/v2/brands/{domain} \
  -H "Authorization: Bearer $BRANDFETCH_API_KEY" | jq '.'
```

Replace `{domain}` with target domain (e.g., `stripe.com`, `figma.com`).

### Step 2: Parse Colors

Extract hex codes and organize by brightness:

```javascript
const colors = response.colors
  .sort((a, b) => b.brightness - a.brightness)
  .slice(0, 5); // Top 5 colors

const palette = {
  primary: colors[0],      // Brightest/most saturated
  secondary: colors[1],
  accent: colors[2],
  neutral_light: colors[colors.length - 1],
  neutral_dark: colors[colors.length - 2]
};
```

### Step 3: Extract Fonts

Group fonts by type and list with fallbacks:

```javascript
const fonts = response.fonts.reduce((acc, font) => {
  if (font.type === 'display') acc.display.push(font.name);
  if (font.type === 'sans-serif') acc.body.push(font.name);
  return acc;
}, { display: [], body: [], serif: [] });

// Output: Font stack with system fallbacks
const fontStack = {
  display: `${fonts.display[0]}, sans-serif`,
  body: `${fonts.body[0]}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`
};
```

### Step 4: Document Results

Create a brand snapshot file:

```markdown
# Brand: [Company Name]

## Colors
| Role | Hex | RGB | Brightness |
|------|-----|-----|-----------|
| Primary | #FF5733 | 255, 87, 51 | 0.45 |
| Secondary | #2196F3 | 33, 150, 243 | 0.58 |
| Accent | #FFC107 | 255, 193, 7 | 0.84 |

## Fonts
| Usage | Font | Origin | Fallback |
|-------|------|--------|----------|
| Display | Clash Display | Custom | sans-serif |
| Body | Inter | Google Fonts | -apple-system, BlinkMacSystemFont |

## Assets
- Logo (SVG): [url]
- Logo (PNG): [url]
- Brand Guide: [url if available]
```

### Step 5: Validate WCAG Contrast

For text usage, check contrast ratios:

```javascript
function getContrastRatio(hexColor1, hexColor2) {
  const rgb1 = hexToRgb(hexColor1);
  const rgb2 = hexToRgb(hexColor2);
  const lum1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 255;
  const lum2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 255;
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG AA: 4.5:1 for body text, 3:1 for large text
const ratio = getContrastRatio('#FF5733', '#FFFFFF');
console.log(ratio >= 4.5 ? '✓ WCAG AA' : '✗ Fails');
```

## Examples

### Example 1: Stripe Brand Research

Request:
```bash
curl -s https://api.brandfetch.io/v2/brands/stripe.com \
  -H "Authorization: Bearer $BRANDFETCH_API_KEY"
```

Output:
```json
{
  "name": "Stripe",
  "colors": [
    { "hex": "#635BFF", "brightness": 0.42, "type": "primary" },
    { "hex": "#0A2540", "brightness": 0.15, "type": "secondary" },
    { "hex": "#FFFFFF", "brightness": 1.0, "type": "background" }
  ],
  "fonts": [
    { "name": "Inter", "type": "sans-serif" },
    { "name": "Söhne", "type": "display", "origin": "custom" }
  ]
}
```

**Brand snapshot**:
```css
/* Stripe color system */
:root {
  --stripe-primary: #635BFF;
  --stripe-secondary: #0A2540;
  --stripe-bg: #FFFFFF;
}

/* Stripe typography — NOTE: Söhne is a paid Klim Type Foundry font.
   For projects without a Söhne license, substitute Satoshi from Fontshare. */
--stripe-display: 'Söhne', 'Satoshi', 'Helvetica Neue', sans-serif;
--stripe-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Example 2: Competitor Analysis (SaaS)

Research 3 competitors in your space:

```
1. Figma (figma.com)
   - Colors: Blue (#5B4CF0), Purple, Green
   - Fonts: Roboto, Inter (modern, minimal)

2. Adobe XD (adobe.com)
   - Colors: Red (#FF0000), Gray
   - Fonts: Adobe Clean, system fonts

3. Sketch (sketch.com)
   - Colors: Yellow (#FDCC4D), Black
   - Fonts: -apple-system (Mac-native look)

Pattern: All use blue/purple + minimal typography. Your brand should either own a distinct color (avoid blue) or differentiate through typography warmth.
```

### Example 3: Client Onboarding

Request client's website brand data:

```bash
# Get brand data
curl -s https://api.brandfetch.io/v2/brands/client-website.com \
  -H "Authorization: Bearer $BRANDFETCH_API_KEY" > client_brand.json

# Extract to brief
cat > CLIENT_BRAND_AUDIT.md << 'EOF'
# [Client] Brand Audit

## Current Assets
- Logo: [extracted]
- Colors: [organized by role]
- Fonts: [with fallbacks]
- Asset CDN: [if available]

## Observations
- [List any deviations from stated brand guidelines]
- [Highlight outdated fonts or colors]
- [Note accessibility gaps (contrast, readability)]

## Recommendations
1. [Prioritized brand refresh items]
2. [Technology updates (e.g., "Upgrade to variable fonts")]
EOF
```

## Common Pitfalls

### ❌ Pitfall 1: Using Single Competitor's Colors

**Problem**: You research only Stripe and copy their blue + purple palette. Now you look like a Stripe clone.

**Fix**: Research 3-5 companies in the **same industry and market segment**. Look for:
- Color patterns (Do they all use blue? What about accent colors?)
- Font personality (Tech = minimal sans-serif. Luxury = serif + display font.)
- Gaps you can own (Is there an underused color? A typography opportunity?)

### ❌ Pitfall 2: Ignoring Brightness and Saturation

**Problem**: You extract colors as hex codes only, ignoring brightness. You use primary color for body text and create accessibility issues.

**Fix**: Always check WCAG contrast ratios before assigning colors to text elements.
```javascript
// Bad: Using primary color (#635BFF brightness 0.42) for body text
// Ratio against white: 3.9:1 (fails WCAG AA for normal text)

// Good: Use primary only for headlines/CTAs. Use gray (#666) for body.
// Ratio against white: 5.7:1 (passes WCAG AA)
```

### ❌ Pitfall 3: Trusting Brandfetch Over Official Guidelines

**Problem**: Brandfetch returns 8 colors when the brand actually uses 2. You create a bloated palette.

**Fix**: Use Brandfetch as inspiration, not truth. Cross-check with:
- Official brand guidelines PDF (if available)
- Actual site color usage (sample 10 pages, use eyedropper)
- LinkedIn company page + brand announcements

### ❌ Pitfall 4: Not Accounting for Display vs. Body Fonts

**Problem**: You extract "Clash Display" and apply it to body copy. Text becomes illegible.

**Fix**: Always pair fonts intentionally:
- **Display font**: Headings (18px+), maximum 2-3 weights
- **Body font**: Paragraphs, always sans-serif for web, 2-3 weights (regular, medium, bold)
- **Mono font**: Code blocks only, never body text

### ❌ Pitfall 5: Extracting Fonts Without Fallbacks

**Problem**: You set `font-family: 'Clash Display';` without fallbacks. If CDN fails, users see Times New Roman.

**Fix**: Always build font stacks:
```css
/* Good font stack */
font-family: 'Clash Display', 'Helvetica Neue', Arial, sans-serif;
           /* Brand */ /* System */ /* Backup */ /* Generic */
```

### When Brandfetch Returns Incomplete Data

Brandfetch covers 44M+ domains but data quality varies. When API returns sparse results:

1. **No colors returned**: Use browser DevTools → Computed Styles on hero section. Extract `background-color` and prominent text colors from 3-5 pages.
2. **No fonts returned**: Check `document.fonts` in browser console, or inspect `font-family` in DevTools. Cross-reference with [WhatFont](https://chrome.google.com/webstore/detail/whatfont/) extension.
3. **No logo returned**: Check `/favicon.ico`, `/apple-touch-icon.png`, or `og:image` meta tag. These are reliable logo sources.
4. **Domain not found**: Try alternate domains (e.g., `company.io` vs `company.com`). Use Brandfetch search endpoint: `GET https://api.brandfetch.io/v2/search/{query}`.
5. **API rate limited**: Cache responses locally. One call per domain is usually sufficient — brand data rarely changes.

## References

- **Brandfetch API Docs**: https://brandfetch.com/developers
- **WCAG Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Typography Pairing Skill**: See `typography-pairing` for font selection
- **Color System Skill**: See `color-system` for palette generation and CSS variables
- **Font Fallbacks Guide**: https://systemfontstack.com/
- **Brand Guidelines Audit**: Cross-reference extracted data with official brand PDFs
- **Related Skills**: `color-system`, `typography-pairing`, `competitive-design-intel`
