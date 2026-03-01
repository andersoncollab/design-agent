---
name: design-tokens
description: W3C Design Tokens Community Group (DTCG) format for vendor-neutral design systems. Export tokens to CSS, Tailwind, Figma, or any framework. Covers color, spacing, typography, shadows, borders, gradients, and composite types. Trigger: "export design tokens", "design system format", "token interchange", "CSS variables from design", "Figma to Tailwind".
version: 1.0.0
license: MIT
---

## Purpose

You are a design tokens specialist. This skill covers the W3C Design Tokens Community Group (DTCG) format — a platform-agnostic JSON specification for defining design decisions. Unlike CSS variables or Tailwind config, design tokens are the single source of truth that generates platform-specific outputs: CSS custom properties, Tailwind configuration, Figma variables, or any framework.

**Who**: Design system leads, frontend architects, cross-team design/development collaborators.

**When**: Exporting design systems between tools, standardizing token naming, syncing Figma design tokens with code, generating Tailwind config from a design spec, ensuring design consistency across products.

## When to Use

- Building a vendor-neutral design system
- Exporting from Figma to code (design tokens as bridge)
- Standardizing token naming across teams
- Generating multiple outputs (CSS + Tailwind + Figma) from one token source
- Implementing design token versioning and governance
- Migrating design system between tools (Figma → Storybook)

## Key Concepts

### What Are Design Tokens?

Design tokens are named design decisions stored as data. **Not CSS variables** — tokens generate CSS variables. Think of tokens as the design spec, CSS vars as the implementation.

Example: the token `color/primary` has a `$value` of `#3B82F6` and a `$description` that explains when to use it. This single token generates:
- CSS custom property: `--color-primary: #3B82F6;`
- Tailwind class: `text-primary`, `bg-primary`
- Figma variable: `color/primary`

### DTCG Format Specification

All tokens follow this structure:

```json
{
  "tokenName": {
    "$type": "color",
    "$value": "#3B82F6",
    "$description": "Primary action color"
  }
}
```

**Four Required Fields:**
- `$type`: Token data type (color, dimension, fontFamily, etc.)
- `$value`: The actual value in a standardized format
- `$description`: Human-readable explanation
- Nested objects for grouping (e.g., `color.primary.light`, `color.primary.dark`)

### Token Type Reference Table

| Type | Value Format | Example |
|------|---|---|
| `color` | Hex string | `"#1a1a2e"` or `"rgb(26, 26, 46)"` |
| `dimension` | Number + unit | `"16px"`, `"1rem"`, `"2.5em"` |
| `fontFamily` | String or array | `"Inter, sans-serif"` |
| `fontWeight` | Number or keyword | `700`, `"bold"`, `"extra-light"` |
| `fontSize` | Number + unit | `"14px"`, `"1.5rem"` |
| `lineHeight` | Number or ratio | `1.5`, `"24px"` |
| `letterSpacing` | Number + unit | `"0.5px"`, `"0.05em"` |
| `duration` | Number + unit | `"200ms"`, `"0.3s"` |
| `cubicBezier` | Array [x1, y1, x2, y2] | `[0.25, 0.1, 0.25, 1]` |
| `number` | Plain number | `1.5`, `2` |
| `strokeStyle` | String | `"solid"`, `"dashed"`, `"dotted"` |
| `border` | Object | `{color, width, style}` |
| `shadow` | Object | `{color, offsetX, offsetY, blur, spread}` |
| `gradient` | Array of stops | `[{color, position}, ...]` |
| `typography` | Object | `{fontFamily, fontSize, fontWeight, lineHeight}` |
| `transition` | Object | `{duration, delay, timingFunction}` |

### Token Hierarchy

Tokens organize in three layers:

1. **Global (Primitives)**: Raw design values with no semantic meaning
   - `color/blue/50`, `color/blue/500`, `color/blue/900`
   - `space/4px`, `space/8px`, `space/16px`

2. **Semantic**: Purpose-based aliases that reference primitives
   - `color/primary` → `{color.blue.500}`
   - `color/on-primary` → `{color.neutral.0}`

3. **Component**: Scoped to specific UI patterns
   - `button/primary/bg` → `{color.primary}`
   - `button/primary/text` → `{color.on-primary}`

## Instructions

### Step 1: Define Global Color Primitives

Create a color palette with explicit naming for light/mid/dark values:

```json
{
  "color": {
    "blue": {
      "50": { "$type": "color", "$value": "#eff6ff", "$description": "Lightest blue" },
      "100": { "$type": "color", "$value": "#dbeafe" },
      "200": { "$type": "color", "$value": "#bfdbfe" },
      "500": { "$type": "color", "$value": "#3b82f6", "$description": "Primary brand blue" },
      "900": { "$type": "color", "$value": "#1e3a5f", "$description": "Dark blue for text" }
    },
    "neutral": {
      "0": { "$type": "color", "$value": "#ffffff" },
      "50": { "$type": "color", "$value": "#f9fafb" },
      "900": { "$type": "color", "$value": "#111827" }
    }
  }
}
```

**Naming convention:** Use 50-900 scale (Tailwind standard). Shorter names for commonly-used values.

### Step 2: Define Semantic Tokens (Light Mode)

Semantic tokens use **alias references** to point at primitives. Syntax: `{category.name.variant}`.

```json
{
  "color": {
    "primary": { "$type": "color", "$value": "{color.blue.500}", "$description": "Primary action" },
    "on-primary": { "$type": "color", "$value": "{color.neutral.0}", "$description": "Text on primary" },
    "surface": { "$type": "color", "$value": "{color.neutral.0}", "$description": "Page background" },
    "on-surface": { "$type": "color", "$value": "{color.neutral.900}", "$description": "Text on surface" },
    "surface-variant": { "$type": "color", "$value": "{color.neutral.50}" },
    "outline": { "$type": "color", "$value": "{color.neutral.200}", "$description": "Borders, dividers" }
  }
}
```

This layer lets designers change `primary` globally without touching component tokens.

### Step 3: Add Dark Mode Variants

Create parallel semantic tokens for dark:

```json
{
  "color": {
    "primary-dark": { "$type": "color", "$value": "{color.blue.400}", "$description": "Primary in dark mode (lighter)" },
    "on-primary-dark": { "$type": "color", "$value": "{color.neutral.900}", "$description": "Text on primary in dark" },
    "surface-dark": { "$type": "color", "$value": "{color.neutral.900}" },
    "on-surface-dark": { "$type": "color", "$value": "{color.neutral.50}" }
  }
}
```

Later, transformers pick `-dark` variants for dark mode CSS.

### Step 4: Define Spacing System

```json
{
  "space": {
    "0": { "$type": "dimension", "$value": "0px" },
    "xs": { "$type": "dimension", "$value": "4px", "$description": "Tight spacing" },
    "sm": { "$type": "dimension", "$value": "8px" },
    "md": { "$type": "dimension", "$value": "16px", "$description": "Default padding/margin" },
    "lg": { "$type": "dimension", "$value": "24px" },
    "xl": { "$type": "dimension", "$value": "32px" },
    "2xl": { "$type": "dimension", "$value": "48px" }
  }
}
```

### Step 5: Define Typography

```json
{
  "font": {
    "family": {
      "sans": { "$type": "fontFamily", "$value": "Inter, -apple-system, sans-serif" },
      "mono": { "$type": "fontFamily", "$value": "Courier New, monospace" }
    },
    "size": {
      "sm": { "$type": "fontSize", "$value": "12px" },
      "base": { "$type": "fontSize", "$value": "16px" },
      "lg": { "$type": "fontSize", "$value": "18px" },
      "xl": { "$type": "fontSize", "$value": "20px" }
    },
    "weight": {
      "regular": { "$type": "fontWeight", "$value": "400" },
      "semibold": { "$type": "fontWeight", "$value": "600" },
      "bold": { "$type": "fontWeight", "$value": "700" }
    }
  },
  "typography": {
    "heading-1": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.sans}",
        "fontSize": "{font.size.xl}",
        "fontWeight": "{font.weight.bold}",
        "lineHeight": "1.2"
      }
    },
    "body": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.sans}",
        "fontSize": "{font.size.base}",
        "fontWeight": "{font.weight.regular}",
        "lineHeight": "1.6"
      }
    }
  }
}
```

### Step 6: Component-Level Tokens

```json
{
  "button": {
    "primary": {
      "bg": { "$type": "color", "$value": "{color.primary}" },
      "text": { "$type": "color", "$value": "{color.on-primary}" },
      "padding-x": { "$type": "dimension", "$value": "{space.lg}" },
      "padding-y": { "$type": "dimension", "$value": "{space.sm}" },
      "border-radius": { "$type": "dimension", "$value": "8px" },
      "font-size": { "$type": "fontSize", "$value": "{font.size.base}" }
    },
    "secondary": {
      "bg": { "$type": "color", "$value": "{color.surface-variant}" },
      "text": { "$type": "color", "$value": "{color.on-surface}" },
      "border": { "$type": "dimension", "$value": "1px solid {color.outline}" }
    }
  }
}
```

### Step 7: Transform to CSS Custom Properties

Create a transformer (Node.js script or build tool plugin) that flattens the hierarchy into CSS vars:

```javascript
function transformToCss(tokens) {
  const vars = {};

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$type && value.$value) {
        const varName = prefix ? `${prefix}-${key}` : key;
        // Resolve aliases: {color.primary} → actual color value
        let val = value.$value;
        while (val.match(/\{[^}]+\}/)) {
          const alias = val.match(/\{([^}]+)\}/)[1];
          val = val.replace(`{${alias}}`, resolve(tokens, alias));
        }
        vars[`--${varName}`] = val;
      } else if (typeof value === 'object' && value.$value === undefined) {
        flatten(value, prefix ? `${prefix}-${key}` : key);
      }
    }
  }

  flatten(tokens);
  return vars;
}
```

**Output:**
```css
:root {
  --color-primary: #3b82f6;
  --color-on-primary: #ffffff;
  --space-xs: 4px;
  --space-md: 16px;
  --font-family-sans: Inter, -apple-system, sans-serif;
  --button-primary-bg: #3b82f6;
  --button-primary-text: #ffffff;
}
```

### Step 8: Transform to Tailwind Config

```javascript
function transformToTailwind(tokens) {
  return {
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          'on-primary': 'var(--color-on-primary)',
          surface: 'var(--color-surface)',
          'on-surface': 'var(--color-on-surface)',
        },
        spacing: {
          xs: 'var(--space-xs)',
          sm: 'var(--space-sm)',
          md: 'var(--space-md)',
          lg: 'var(--space-lg)',
          xl: 'var(--space-xl)',
        },
        fontFamily: {
          sans: 'var(--font-family-sans)',
        },
        fontSize: {
          sm: 'var(--font-size-sm)',
          base: 'var(--font-size-base)',
          lg: 'var(--font-size-lg)',
        },
      },
    },
  };
}
```

**Usage in HTML:**
```html
<button class="bg-primary text-on-primary px-lg py-sm rounded-lg">
  Click me
</button>
```

### Step 9: Sync with Figma Variables

Use Figma's REST API or plugin to import/export tokens:

```javascript
// Export Figma variables to DTCG JSON
async function exportFigmaTokens(fileId, accessToken) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${fileId}/variables`,
    { headers: { 'X-Figma-Token': accessToken } }
  );
  const data = await response.json();

  const dtcg = {};
  for (const variable of data.variables) {
    const path = variable.name.split('/');
    let obj = dtcg;
    for (let i = 0; i < path.length - 1; i++) {
      obj[path[i]] = obj[path[i]] || {};
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = {
      $type: variable.type === 'COLOR' ? 'color' : 'dimension',
      $value: variable.value,
    };
  }
  return dtcg;
}
```

## Examples

### Example 1: Complete SaaS Design Token File

```json
{
  "color": {
    "neutral": {
      "0": { "$type": "color", "$value": "#ffffff" },
      "50": { "$type": "color", "$value": "#f9fafb" },
      "100": { "$type": "color", "$value": "#f3f4f6" },
      "900": { "$type": "color", "$value": "#111827" }
    },
    "blue": {
      "500": { "$type": "color", "$value": "#3b82f6" },
      "600": { "$type": "color", "$value": "#2563eb" }
    },
    "primary": { "$type": "color", "$value": "{color.blue.500}" },
    "primary-dark": { "$type": "color", "$value": "#60a5fa" },
    "surface": { "$type": "color", "$value": "{color.neutral.0}" },
    "surface-dark": { "$type": "color", "$value": "#1f2937" }
  },
  "space": {
    "md": { "$type": "dimension", "$value": "16px" },
    "lg": { "$type": "dimension", "$value": "24px" }
  },
  "button": {
    "primary": {
      "bg": { "$type": "color", "$value": "{color.primary}" },
      "padding": { "$type": "dimension", "$value": "{space.md}" }
    }
  }
}
```

### Example 2: Transforming to CSS

Input (above) transforms to:

```css
:root {
  --color-primary: #3b82f6;
  --button-primary-bg: #3b82f6;
  --button-primary-padding: 16px;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-surface: #1f2937;
}
```

## Common Pitfalls

### Pitfall 1: Naming Inconsistency

**Problem**: No agreed naming convention. Some tokens use camelCase, others kebab-case. Makes transformers fragile.

**Fix**: Pick one convention and document it. Use **kebab-case for all token names**.

```json
/* Bad */
{ "colorPrimary": { ... }, "color-secondary": { ... } }

/* Good */
{ "color-primary": { ... }, "color-secondary": { ... } }
```

### Pitfall 2: Not Using Semantic Layer

**Problem**: Components reference primitives directly. Changing brand color requires editing 50 component tokens.

**Fix**: Always use three layers: primitives → semantic → component.

```json
/* Bad: component hardcodes primitive */
{ "button-bg": { "$value": "{color.blue.500}" } }

/* Good: component uses semantic */
{ "button-bg": { "$value": "{color-primary}" } }
```

### Pitfall 3: Token Explosion

**Problem**: Too many tokens for every edge case (color-primary-hover-dark-disabled-sm). System becomes unmaintainable.

**Fix**: Use a consistent scale (e.g., 50-900). Only token what varies across components.

```json
/* Bad */
{ "color-primary-sm": {...}, "color-primary-lg": {...}, ... }

/* Good: use semantic + scale */
{ "color-primary": {...}, "space-sm": {...} }
```

### Pitfall 4: Forgetting Dark Mode

**Problem**: Token system works in light mode, breaks in dark mode. No dark variants defined.

**Fix**: For every semantic color, define a `-dark` variant.

```json
{
  "color-primary": { "$value": "#3b82f6" },
  "color-primary-dark": { "$value": "#60a5fa" }
}
```

### Pitfall 5: Broken Alias References

**Problem**: Circular aliases (`{color-primary}` points to `{color-secondary}` points to `{color-primary}`). Transformer breaks.

**Fix**: Validate alias graph is acyclic. Use automated linting.

```bash
# Pseudocode
for each token:
  if $value contains {alias}:
    resolve(alias)  # Error if circular
```

## References

- **W3C Design Tokens Community Group**: https://tr.designtokens.org/format/
- **Figma Design Tokens API**: https://www.figma.com/developers/api#variables
- **Tailwind Theme Configuration**: https://tailwindcss.com/docs/theme
- **Related Skills**: `color-system`, `typography-pairing`, `design-system-generator`, `figma-pipeline`
