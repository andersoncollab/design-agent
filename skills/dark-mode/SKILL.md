---
name: dark-mode
description: Dark mode implementation with CSS custom properties, Tailwind dark variant, system preference detection, and manual toggle. Covers color mapping (not inversion), contrast requirements, image adaptation, shadow replacement, and the dark mode color system (surface hierarchy, reduced saturation, elevated brightness for text). Trigger: "add dark mode", "dark theme", "light/dark toggle", "dark mode colors", "theme switching".
version: 1.0.0
license: MIT
---

## Purpose

You are a dark mode implementation specialist. This skill covers CSS custom properties for theme tokens, Tailwind's `dark:` variant, system preference detection via `prefers-color-scheme`, manual toggle with localStorage, color mapping strategies, image adaptation, and WCAG contrast requirements for dark backgrounds.

**Who**: Product designers, web developers, design systems leads.

**When**: Adding dark mode to web projects, fixing dark mode contrast issues, implementing system preference detection, adapting images/shadows for dark.

## When to Use

- New project with theme requirement
- Legacy site modernization
- Dark mode audit (contrast failures, unmaintained)
- Theme switching with localStorage persistence
- Image/media looks broken in dark mode
- System preference detection and auto-switching
- SaaS dashboard with per-user theme preference

## Key Concepts

### Color Mapping, Not Inversion

Dark mode is **not** `filter: invert(1)`. It's a mapped color system:

- **Backgrounds**: Use layered grays `#0F172A` not `#000000`
- **Text**: Use off-white `#E5E7EB` not pure white
- **Primary colors**: Reduce saturation 10-20% on dark
- **Accent colors**: Increase brightness for visibility

Pure black causes eye strain halation. Highly saturated colors vibrate on dark backgrounds.

### Surface Hierarchy (4 Levels)

| Level | Light | Dark | Use |
|-------|-------|------|-----|
| Background | #FFFFFF | #0F172A | Page |
| Surface 1 | #F8FAFC | #1E293B | Cards, panels |
| Surface 2 | #F1F5F9 | #334155 | Elevated, dropdowns |
| Surface 3 | #E2E8F0 | #475569 | Borders, dividers |
| Text Primary | #0F172A | #F1F5F9 | Headlines |
| Text Secondary | #64748B | #94A3B8 | Body |
| Text Muted | #94A3B8 | #64748B | Captions |

Each level needs 2-3 steps of contrast from neighbors.

### Contrast Requirements

Dark mode requires **higher** contrast than light mode:

- **Body text**: 7:1 (WCAG AAA), not 4.5:1
- **Large text**: 4.5:1
- **UI borders**: 3:1 minimum

Light-on-dark fatigues eyes more than dark-on-light.

### Shadow Replacement

Shadows are invisible on dark backgrounds. Replace with:

- Subtle borders (`border-slate-700`)
- Background elevation (next surface level)
- Glow effects (`ring-1 ring-white/5`)

Never rely on shadows in dark mode for depth cues.

---

## Instructions

### Step 1: Define Color System

```css
:root {
  --bg: #FFFFFF;
  --surface: #F8FAFC;
  --surface-elevated: #F1F5F9;
  --surface-border: #E2E8F0;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --primary: #3B82F6;
  --accent: #FB923C;
}

[data-theme="dark"] {
  --bg: #0F172A;
  --surface: #1E293B;
  --surface-elevated: #334155;
  --surface-border: #475569;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --primary: #60A5FA;        /* Lighter + less saturated */
  --accent: #FDBA74;         /* Lighter orange */
}
```

For each light color, generate dark variant by: (1) shifting to lighter shade, (2) reducing saturation 10-20%, (3) testing contrast.

### Step 2: Prevent Flash of Wrong Theme (FOWT)

Add this script to `<head>` **before** CSS loads. Prevents brief white flash when user prefers dark mode:

```html
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    var isDark = stored === 'dark' ||
                 (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

**Critical**: Must run in `<head>`, before `</head>` closes. Runs synchronously before any paint.

### Step 3: Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // Toggle via .dark
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: 'var(--surface)', elevated: 'var(--surface-elevated)' },
        content: { DEFAULT: 'var(--text-primary)', secondary: 'var(--text-secondary)' },
      },
    },
  },
};
```

Use in templates:
```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <div className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 p-6">
    <h3 className="dark:text-white">Title</h3>
  </div>
</div>
```

### Step 4: Theme Switcher (React)

```typescript
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-2 rounded-lg dark:bg-gray-800">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### Step 5: System Preference Detection

```typescript
useEffect(() => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {  // Only if no manual override
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}, []);
```

### Step 6: Image Adaptation

**Option A: CSS filter**
```css
.dark img:not([data-no-dim]) { filter: brightness(0.85) contrast(1.05); }
```

**Option B: Picture element**
```html
<picture>
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="/logo-light.svg" alt="Logo">
</picture>
```

### Step 7: Shadow Replacement

```css
/* Light mode: shadows work */
.card { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }

/* Dark mode: use borders instead */
.dark .card {
  box-shadow: none;
  border: 1px solid var(--surface-border);
}
```

---

## Examples

### Example 1: SaaS Dashboard

```tsx
function Dashboard() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <nav className="bg-slate-50 dark:bg-slate-800">
        <h1>Dashboard</h1>
        <ThemeToggle />
      </nav>
      <div className="grid grid-cols-3 gap-6 p-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 p-6">
            <h3 className="dark:text-white">Metric {i}</h3>
            <p className="dark:text-slate-400">Value</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Marketing Site with Image Adaptation

```html
<picture>
  <source srcset="/hero-dark.jpg" media="(prefers-color-scheme: dark)">
  <img src="/hero-light.jpg" alt="Hero">
</picture>
```

### Example 3: Blog with Reading Comfort

```css
.dark article {
  color: #E8E6E1;     /* Warm white */
  line-height: 1.8;   /* Relaxed spacing */
}
.dark article img { filter: brightness(0.82) saturate(1.15); }
```

---

## Common Pitfalls

### ❌ Pitfall 1: Pure Black Backgrounds

**Problem**: `#000000` causes halation (white text bleeds). Harsh on eyes.

**Fix**: Use `#0F172A` (slate-900) instead.

```css
/* Bad */ --bg: #000000;
/* Good */ --bg: #0F172A;
```

### ❌ Pitfall 2: Pure White Text

**Problem**: `#FFFFFF` causes eye strain and flicker on dark.

**Fix**: Use `#F1F5F9` (slate-100) instead.

```css
/* Bad */ --text: #FFFFFF;
/* Good */ --text: #F1F5F9;
```

### ❌ Pitfall 3: Shadows Don't Work in Dark Mode

**Problem**: Shadows invisible on dark backgrounds.

**Fix**: Replace with borders or elevation (next surface level).

```css
/* Bad */ .dark .card { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
/* Good */ .dark .card { border: 1px solid var(--surface-border); }
```

### ❌ Pitfall 4: Flash of Wrong Theme (FOWT)

**Problem**: Theme script runs after CSS loads. White flash before dark mode.

**Fix**: Add theme detection to `<head>` before any CSS loads.

```html
<head>
  <script>(function() {
    var isDark = localStorage.getItem('theme') === 'dark' ||
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
  })();</script>
  <link rel="stylesheet" href="styles.css">
</head>
```

### ❌ Pitfall 5: Not Adapting Images

**Problem**: Bright photos jarring on dark backgrounds.

**Fix**: Use CSS filter or `<picture>` with dark variants.

```css
.dark img { filter: brightness(0.85) contrast(1.05); }
```

### ❌ Pitfall 6: Oversaturated Colors Vibrate

**Problem**: `#FF0000` (100% saturation) vibrates on dark backgrounds.

**Fix**: Reduce saturation 10-20% for dark mode.

```css
/* Bad */ --primary: #FF0000;
/* Good */ --primary: #FF6B6B;
```

### ❌ Pitfall 7: Using `filter: invert(1)`

**Problem**: Inverting breaks images, videos, logos. Lazy approach.

**Fix**: Map colors explicitly with CSS variables.

```css
/* Never */ * { filter: invert(1); }
/* Correct */ body { background: #0F172A; color: #F1F5F9; }
```

---

## References

- **Material Design Dark Theme**: https://m3.material.io/styles/color/dark-theme
- **Apple Human Interface Guidelines — Dark Mode**: https://developer.apple.com/design/human-interface-guidelines/dark-mode
- **Tailwind Dark Mode Documentation**: https://tailwindcss.com/docs/dark-mode
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **MDN prefers-color-scheme**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- **Related Skills**: `color-system`, `design-tokens`, `accessibility-system`
