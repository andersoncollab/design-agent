---
name: white-label-systems
description: Multi-tenant theming and white-label design patterns — CSS custom property architecture, tenant-specific branding, dynamic theme loading, logo/color/font swapping, and SaaS reseller customization layers. Trigger: "white label", "multi-tenant theme", "tenant branding", "reseller customization", "theme switching".
version: 1.0.0
license: MIT
---

# White-Label Systems Skill

## Purpose

White-label systems enable a single codebase to serve multiple brands simultaneously. This skill covers the complete architecture for CSS custom property theming, tenant configuration management, dynamic brand switching, and multi-tenant SaaS customization without code changes.

The goal: Ship one product, serve fifty clients, each with their own logo, colors, and typography.

## Key Concepts

### Theme Architecture

Separate the constant from the variable:

- **Base Design System**: Spacing scale (4px, 8px, 12px...), border radius (2px, 4px, 8px), shadows (sm, md, lg), animation timing. Identical across all tenants.
- **Brand Layer**: Primary/secondary/accent colors, font families, logo URLs, custom spacing overrides. Tenant-specific.

The base is immutable. The brand layer swaps per tenant via CSS custom properties.

### CSS Custom Property Layers

Structure variables in inheritance hierarchy:

```css
/* Layer 1: Global defaults */
:root {
  --color-primary: #0066cc;
  --color-secondary: #0044aa;
  --color-accent: #ff8c00;
  --color-surface: #ffffff;
  --color-background: #f9f9f9;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-border: #e0e0e0;

  --font-heading: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;

  --logo-light: url('/logos/default-light.svg');
  --logo-dark: url('/logos/default-dark.svg');

  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
}

/* Layer 2: Tenant overrides */
[data-tenant="acme"] {
  --color-primary: #d4001f;
  --color-secondary: #8b0000;
  --color-accent: #ffd700;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --logo-light: url('/logos/acme-light.svg');
  --logo-dark: url('/logos/acme-dark.svg');
}

[data-tenant="techstart"] {
  --color-primary: #00d9ff;
  --color-secondary: #0099cc;
  --color-accent: #7c3aed;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --logo-light: url('/logos/techstart-light.svg');
  --logo-dark: url('/logos/techstart-dark.svg');
}

/* Layer 3: Dark mode per tenant */
[data-tenant="acme"][data-theme="dark"] {
  --color-surface: #1a1a1a;
  --color-background: #0d0d0d;
  --color-text: #ffffff;
  --color-text-muted: #b0b0b0;
  --color-border: #333333;
}

[data-tenant="techstart"][data-theme="dark"] {
  --color-surface: #0a0e27;
  --color-background: #050812;
  --color-text: #e0f0ff;
  --color-text-muted: #7eb3ff;
  --color-border: #1a3a5c;
}
```

### Theme Token Schema

All tenant configurations must include:

```typescript
interface TenantTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    background: string;
    text: string;
    textMuted: string;
    border: string;
  };
  dark?: {
    surface: string;
    background: string;
    text: string;
    textMuted: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  logos: {
    lightUrl: string;
    darkUrl: string;
    monochrome?: string;
    favicon?: string;
  };
  typography?: {
    headingSize?: string;
    bodySize?: string;
    lineHeight?: string;
  };
}
```

### Dynamic Theme Loading

Never hardcode tenant themes. Fetch from API at runtime:

```javascript
async function loadTenantTheme(tenantId) {
  try {
    const response = await fetch(`/api/tenants/${tenantId}/theme`);
    const theme = await response.json();

    // Validate against schema
    validateThemeSchema(theme);

    // Apply to DOM
    applyTheme(theme);

    // Cache for session
    sessionStorage.setItem(`tenant-theme-${tenantId}`, JSON.stringify(theme));
  } catch (error) {
    console.error('Theme load failed, using defaults:', error);
    applyDefaultTheme();
  }
}

function applyTheme(theme) {
  // Set tenant attribute
  document.documentElement.setAttribute('data-tenant', theme.id);

  // Inject CSS variables
  const root = document.documentElement.style;
  root.setProperty('--color-primary', theme.colors.primary);
  root.setProperty('--color-secondary', theme.colors.secondary);
  root.setProperty('--color-accent', theme.colors.accent);
  root.setProperty('--color-surface', theme.colors.surface);
  root.setProperty('--color-background', theme.colors.background);
  root.setProperty('--color-text', theme.colors.text);
  root.setProperty('--color-text-muted', theme.colors.textMuted);
  root.setProperty('--color-border', theme.colors.border);

  root.setProperty('--font-heading', theme.fonts.heading);
  root.setProperty('--font-body', theme.fonts.body);

  root.setProperty('--logo-light', theme.logos.lightUrl);
  root.setProperty('--logo-dark', theme.logos.darkUrl);

  // Preload fonts
  preloadFonts(theme.fonts);
}
```

### Component Theming

All components must use CSS variables exclusively:

```jsx
// Button.jsx
export default function Button({ children, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

```css
/* Button.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  border: none;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--color-secondary);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--color-border);
  color: var(--color-text);
}

.btn-secondary:hover {
  background: var(--color-text-muted);
}
```

Components automatically adapt to tenant branding with zero changes.

### Logo System

SVG is required for white-label:

- **Primary logo**: Full wordmark (light variant)
- **Monochrome logo**: Black/white version for tight spaces
- **Favicon**: 32x32 at minimum
- **OG image**: 1200x630 for social sharing

Provide both light and dark variants. Store as URLs in theme config. Swap via CSS:

```jsx
export function Logo() {
  return (
    <img
      src="var(--logo-light)"
      srcSet={`var(--logo-dark) (prefers-color-scheme: dark)`}
      alt="Brand Logo"
      className="h-8"
    />
  );
}
```

Or use CSS background images for more control:

```css
.navbar-logo {
  width: 120px;
  height: 32px;
  background: url('var(--logo-light)') no-repeat center / contain;
  background-color: transparent;
}

[data-theme="dark"] .navbar-logo {
  background-image: url('var(--logo-dark)');
}
```

### Font Loading

Load tenant fonts efficiently:

```javascript
function preloadFonts(fonts) {
  // Parse font family names from config
  const fontStack = [fonts.heading, fonts.body];

  fontStack.forEach(fontFamily => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = getFontCDN(fontFamily);
    document.head.appendChild(link);
  });

  // Inject @font-face rules
  const style = document.createElement('style');
  style.textContent = generateFontFaceRules(fonts);
  document.head.appendChild(style);
}

function getFontCDN(fontFamily) {
  const fontMap = {
    'Montserrat': 'https://fonts.googleapis.com',
    'Open Sans': 'https://fonts.googleapis.com',
    'Inter': 'https://rsms.me',
  };
  return fontMap[fontFamily] || 'https://fonts.googleapis.com';
}

function generateFontFaceRules(fonts) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=${fonts.heading.replace(/ /g, '+')}:wght@400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=${fonts.body.replace(/ /g, '+')}:wght@400;500&display=swap');
  `;
}
```

### Dark Mode Per Tenant

Not all brands should have the same dark palette. Each tenant defines their own:

```json
{
  "id": "acme",
  "colors": { /* light mode */ },
  "dark": {
    "surface": "#1a1a1a",
    "background": "#0d0d0d",
    "text": "#ffffff",
    "textMuted": "#b0b0b0",
    "border": "#333333"
  }
}
```

Apply with theme switcher:

```javascript
function toggleDarkMode(tenantId, isDark) {
  const attr = isDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', attr);
  localStorage.setItem(`${tenantId}-theme-preference`, attr);
}

// Respect system preference on first load
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

### Tenant Configuration Management

Store tenant themes in a config file or API:

```json
// /api/tenants/{id}/theme
{
  "id": "acme",
  "name": "ACME Corporation",
  "colors": {
    "primary": "#d4001f",
    "secondary": "#8b0000",
    "accent": "#ffd700",
    "surface": "#ffffff",
    "background": "#f9f9f9",
    "text": "#1a1a1a",
    "textMuted": "#666666",
    "border": "#e0e0e0"
  },
  "dark": {
    "surface": "#1a1a1a",
    "background": "#0d0d0d",
    "text": "#ffffff",
    "textMuted": "#b0b0b0",
    "border": "#333333"
  },
  "fonts": {
    "heading": "Montserrat, sans-serif",
    "body": "Open Sans, sans-serif"
  },
  "logos": {
    "lightUrl": "https://cdn.example.com/logos/acme-light.svg",
    "darkUrl": "https://cdn.example.com/logos/acme-dark.svg",
    "monochrome": "https://cdn.example.com/logos/acme-mono.svg",
    "favicon": "https://cdn.example.com/logos/acme-favicon.png"
  }
}
```

Validate all incoming configs:

```javascript
function validateThemeSchema(theme) {
  const required = ['id', 'name', 'colors', 'fonts', 'logos'];
  const colorRequired = ['primary', 'secondary', 'accent', 'surface', 'background', 'text', 'textMuted', 'border'];

  for (const field of required) {
    if (!theme[field]) throw new Error(`Missing required field: ${field}`);
  }

  for (const color of colorRequired) {
    if (!theme.colors[color]) throw new Error(`Missing required color: ${color}`);
    if (!isValidColor(theme.colors[color])) throw new Error(`Invalid color value: ${theme.colors[color]}`);
  }

  return true;
}

function isValidColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}
```

### Email Template Branding

Tenant branding extends to email. Use template variables (`{{color_primary}}`, `{{logo_url}}`, `{{font_body}}`) in HTML email templates, rendered server-side per tenant:

```javascript
function renderEmailTemplate(templateId, tenantId, data) {
  const theme = getTenantTheme(tenantId);
  const template = getTemplate(templateId);
  const vars = {
    font_body: theme.fonts.body, color_primary: theme.colors.primary,
    color_accent: theme.colors.accent, color_surface: theme.colors.surface,
    color_text: theme.colors.text, logo_url: theme.logos.lightUrl,
    ...data
  };
  return Object.entries(vars).reduce((t, [k, v]) => t.replace(new RegExp(`{{${k}}}`, 'g'), v), template);
}
```

## Instructions

1. **Define base design system** in CSS custom properties (spacing, shadows, radius). These never change.
2. **Create tenant config schema** (colors, fonts, logos, dark mode). Validate on load.
3. **Build dynamic loader** that fetches tenant config and applies CSS variables to `:root` or `[data-tenant]`.
4. **Theme all components** using CSS variables. No hardcoded colors anywhere.
5. **Load fonts dynamically** with preconnect. Support multiple font families per tenant.
6. **Implement logo system** (light/dark variants, monochrome fallback).
7. **Add dark mode toggle** per tenant. Each brand gets its own dark palette.
8. **Generate email templates** with tenant variables. No hardcoded brand colors.
9. **Cache themes** in sessionStorage to avoid repeated API calls.
10. **Fallback gracefully** when tenant config fails to load (use defaults).

## Common Pitfalls

1. **Hardcoding colors in components**: Every color must be a CSS variable. Search codebase for `#`, `rgb(`, `hsl(`. Replace with variables.

2. **Missing dark mode per tenant**: Assume not all brands want the same dark palette. Let each tenant define their own dark colors.

3. **Using raster logos**: PNG/JPG logos don't scale and can't be recolored. Require SVG. Provide fallback PNG for email.

4. **Loading all tenant themes upfront**: Load only the active tenant's theme. Lazy-load others on demand.

5. **No fallback when theme config fails**: Network failures happen. Always have defaults. Apply gracefully degraded UI.

6. **Forgetting email templates**: Emails are part of the brand. Generate HTML emails with tenant colors, fonts, logos.

7. **Not validating tenant config schema**: Missing colors will crash the UI. Validate every incoming config against schema before applying.

8. **Mixing inline styles with variables**: Use CSS classes exclusively. Remove any `style={{ color: '#ffffff' }}` from React components.

9. **Not preloading fonts**: Font loading blocks rendering. Preconnect to font CDN. Use `font-display: swap` in `@font-face`.

10. **Hardcoding font stack fallbacks**: Store complete font families in config: `"Montserrat, 'Trebuchet MS', sans-serif"`. Let tenants control fallbacks.

## References

- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Tailwind CSS: Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- **Related Skills**: `design-tokens`, `dark-mode`, `design-system-generator`, `color-system`
