---
name: icon-systems
description: Icon design system patterns — selection criteria, sizing scales, accessibility labels, sprite optimization, and implementation across Lucide, Heroicons, and custom SVG libraries. Trigger: "icon system", "icon library", "SVG icons", "icon accessibility".
version: 1.0.0
license: MIT
---

# Icon Systems Skill

## Purpose

Icon systems provide a foundational design language for interfaces. This skill covers the selection, implementation, and optimization of icon libraries across web and app projects. It establishes sizing tokens, accessibility patterns, and performance best practices that scale from small UI icons to large illustration systems.

## When to Use

- **Library selection**: Choosing between Lucide, Heroicons, Phosphor, Material Symbols, or custom SVG sets
- **Design system establishment**: Defining sizing scales, color inheritance, and spacing rules for icons
- **Accessibility compliance**: Labeling meaningful icons, hiding decorative icons, ensuring keyboard and screen reader support
- **Performance optimization**: Minimizing bundle size through tree-shaking, sprite sheets, and lazy loading
- **Brand consistency**: Building custom icon libraries or extending existing ones with brand-specific icons

## Key Concepts

### Icon Libraries — Comparison Matrix

| Library | Grid | Stroke | Count | Best For | Tree-shake |
|---------|------|--------|-------|----------|-----------|
| **Lucide** | 24px | 1.5px | 1500+ | General React/Vue/Svelte | Yes |
| **Heroicons** | 24px/20px | 1.5px/2px | 300+ | Tailwind projects | Yes |
| **Phosphor** | 256px viewBox | Variable | 800+ | Weight variation, playful | Yes |
| **Material Symbols** | Variable font | 20px | 2500+ | Enterprise, extensive | Font-based |
| **Custom SVG** | Variable | Variable | Domain-specific | Brand-specific | Manual |

**Selection Decision Tree**:
1. Tailwind project with Headless UI? → **Heroicons** (native integration, optimized for Tailwind)
2. General React/Vue/Svelte without Tailwind? → **Lucide** (consistent 24px grid, reliable)
3. Need multiple weights (thin/light/bold/black)? → **Phosphor** (6 weights per icon)
4. Enterprise or Material Design spec? → **Material Symbols** (variable font, 2500+ icons)
5. Need domain-specific or brand icons? → **Custom SVG** (build your own or extend existing)

### Sizing Scale

Establish consistent sizing using CSS custom properties and map to Tailwind utilities.

```css
/* Icon sizing tokens */
--icon-xs: 12px;  /* w-3 in Tailwind */
--icon-sm: 16px;  /* w-4 */
--icon-md: 20px;  /* w-5 */
--icon-lg: 24px;  /* w-6 */
--icon-xl: 32px;  /* w-8 */
--icon-2xl: 48px; /* w-12 */
```

**Usage patterns**:
- **UI elements** (buttons, nav): `icon-md` (20px) or `icon-lg` (24px)
- **Form inputs** (labels, hints): `icon-sm` (16px)
- **Hero sections** (illustrations): `icon-2xl` (48px) or larger
- **Card headers**: `icon-lg` (24px)
- **Inline text** (badges, tags): `icon-xs` (12px)

### Optical Alignment

Mathematical center (50% offset) is often visually misaligned for icons. Adjust with transform.

```tsx
/* Pointed shapes (arrows, carets) need visual centering */
<ArrowRight className="w-6 h-6" style={{ transform: 'translateY(0.5px)' }} />

/* Circular icons center mathematically */
<Circle className="w-6 h-6" />
```

### Icon Types

- **Outlined**: Hollow stroke, default style. Use for primary UI, navigation, general iconography
- **Filled**: Solid fill, active state indicator, emphasis. Use sparingly to avoid visual weight
- **Duotone**: Two-color illustration, visual interest. Use for empty states, feature highlights
- **Animated**: Micro-interactions, state feedback. Use on hover, loading, transitions

### Color Inheritance

Use `currentColor` for stroke and fill to inherit text color from parent.

```tsx
/* Icon inherits text color */
<span className="text-blue-600">
  <CheckIcon className="w-5 h-5" /> {/* blue-600 */}
</span>

/* Override with explicit color */
<CheckIcon className="w-5 h-5 text-green-600" />
```

### Performance Patterns

**SVG Inline** (recommended for most cases):
- Full color control, animation support
- No HTTP request overhead
- Tree-shake unused icons
- Import individual icons: `import { ChevronDown } from 'lucide-react'`

**SVG Sprite Sheet** (optimization for many icons):
- Single HTTP request, use `<use>` element
- Smaller total bundle for 50+ icons
- Limited color control (CSS filters workaround)
- Trade-off: build complexity vs bundle size

**Icon Font** (avoid for new projects):
- Historical approach (web fonts)
- Poor accessibility, loading performance issues
- Use only for backward compatibility
- Prefer SVG for modern projects

**Tree-shaking Guidelines**:
```tsx
// GOOD: Import only what you use
import { ChevronDown, Settings } from 'lucide-react'

// AVOID: Import entire library
import * as Icons from 'lucide-react' // Entire library in bundle
```

## Accessibility Patterns

### Decorative Icons

Icons that add visual polish but don't convey meaning should be hidden from screen readers.

```tsx
<button className="flex items-center gap-2">
  <ChevronDown className="w-5 h-5" aria-hidden="true" />
  <span>Menu</span>
</button>
```

### Meaningful Icons

Icons that convey essential information need accessible labels.

```tsx
{/* Option 1: aria-label on icon */}
<button aria-label="Download file">
  <Download className="w-6 h-6" />
</button>

{/* Option 2: title element inside SVG */}
<svg className="w-6 h-6">
  <title>Download</title>
  <use href="#download-icon" />
</svg>

{/* Option 3: Combination with text (most accessible) */}
<button>
  <Download className="w-5 h-5" aria-hidden="true" />
  <span>Download</span>
</button>
```

### Icon-only Buttons

Must have visible label or aria-label. Add clear focus indicator.

```tsx
<button
  aria-label="Close modal"
  className="p-2 rounded hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500"
>
  <X className="w-5 h-5" />
</button>
```

### SVG Title Element

For complex SVG icons, use `<title>` for context.

```tsx
<svg viewBox="0 0 24 24" className="w-6 h-6">
  <title>Success state with checkmark</title>
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
</svg>
```

## Implementation Patterns

### Lucide React Setup

```bash
npm install lucide-react
```

```tsx
import { ChevronDown, Settings, AlertCircle } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center gap-4">
      <h1>Dashboard</h1>
      <button className="p-2">
        <Settings className="w-5 h-5" aria-hidden="true" />
      </button>
    </header>
  )
}
```

### Heroicons Setup

```bash
npm install @heroicons/react
```

```tsx
import { ChevronDownIcon, CogIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

export function NavItem({ active }) {
  return (
    <button className={active ? 'text-blue-600' : 'text-gray-600'}>
      {active && <CheckIcon className="w-5 h-5" aria-hidden="true" />}
      <span>Active State</span>
    </button>
  )
}
```

### Custom SVG Icon Component

```tsx
interface IconProps {
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}

export function CustomIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" />
    </svg>
  )
}
```

### Animated Icon on Interaction

```tsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion() {
  const [open, setOpen] = useState(false)

  return (
    <button onClick={() => setOpen(!open)} className="w-full">
      <div className="flex items-center justify-between">
        <span>Accordion Title</span>
        <ChevronDown
          className="w-5 h-5 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        />
      </div>
      {open && <div>Content goes here</div>}
    </button>
  )
}
```

## Common Pitfalls

1. **Using `<img>` tags for icons**: No color control, no a11y, extra HTTP requests. Always use SVG or icon components.

2. **Importing entire icon library**: `import * as Icons from 'lucide-react'` loads all 1500+ icons. Use tree-shaking: import individual icons only.

3. **Missing aria-label on meaningful icons**: Icon-only buttons and critical information icons need labels for screen reader users.

4. **Inconsistent sizing**: Mixing px values (`width: 20px`) instead of sizing tokens. Always use the scale (icon-sm, icon-md, etc.).

5. **Fixed colors instead of currentColor**: Icons that can't inherit text color are inflexible. Use `stroke="currentColor"` in custom SVG.

6. **No focus indicator on icon buttons**: Icon-only buttons need visible focus rings. Add `focus-visible:ring-2` in Tailwind.

7. **Decorative icons not hidden**: Adding `aria-hidden="true"` to purely visual icons reduces screen reader clutter and improves UX.

8. **SVG viewBox mismatches**: Custom SVGs with inconsistent viewBox values (e.g., 24px vs 256px) break sizing consistency. Standardize on 24x24.

## Related Skills

- `component-patterns`: Button components, icon button patterns, state management
- `accessibility-system`: WCAG guidelines, screen reader testing, keyboard navigation
- `design-tokens`: CSS custom properties, sizing scales, color inheritance
- `performance-optimization`: Bundle analysis, tree-shaking, lazy loading

## References

- Lucide Icons: https://lucide.dev
- Heroicons: https://heroicons.com
- Phosphor Icons: https://phosphoricons.com
- Material Symbols: https://fonts.google.com/icons
- WCAG Icons & Images: https://www.w3.org/WAI/test-evaluate/non-text-content/
- CSS-Tricks SVG: https://css-tricks.com/svg/
