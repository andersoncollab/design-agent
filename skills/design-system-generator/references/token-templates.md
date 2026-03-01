# Design System Generator — Token Templates & Examples

## Phase 5 Extended Token Templates

### Step 3: Shadow System

Create depth levels using shadows:

```css
:root {
  /* Elevation levels */
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25);

  /* Special effects */
  --shadow-inner: inset 0 2px 4px 0 rgba(0,0,0,0.05);
  --shadow-focus: 0 0 0 3px rgba(59,130,246,0.1);  /* Blue focus ring */
}
```

### Step 4: Responsive Breakpoints

Define screen size tiers:

```css
/* Mobile-first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

Tailwind defaults work well here.

### Step 5: Component Tokens

Define patterns for common components:

```css
/* Button tokens */
:root {
  --button-padding-x: var(--spacing-md);
  --button-padding-y: var(--spacing-sm);
  --button-padding: var(--button-padding-y) var(--button-padding-x);
  --button-font-size: 16px;
  --button-border-radius: var(--radius-md);
  --button-font-weight: 500;
  --button-transition: all 150ms ease-in-out;

  /* Button variants */
  --button-primary-bg: var(--color-primary-500);
  --button-primary-text: #FFFFFF;
  --button-primary-border: var(--color-primary-500);

  --button-secondary-bg: var(--color-gray-100);
  --button-secondary-text: var(--color-gray-900);
  --button-secondary-border: var(--color-gray-300);
}

/* Card tokens */
:root {
  --card-padding: var(--spacing-lg);
  --card-border-radius: var(--radius-lg);
  --card-background: var(--color-bg-primary);
  --card-border-color: var(--color-gray-200);
  --card-shadow: var(--shadow-md);
}

/* Input tokens */
:root {
  --input-padding: var(--spacing-sm) var(--spacing-md);
  --input-border-radius: var(--radius-md);
  --input-border-color: var(--color-gray-300);
  --input-focus-border-color: var(--color-primary-500);
  --input-focus-shadow: var(--shadow-focus);
  --input-background: var(--color-bg-primary);
  --input-font-size: 16px;  /* Prevents zoom on iOS */
}
```

### Step 6: Create Tailwind Config

Extend tailwind.config.js with all tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          900: '#1E3A8A',
        },
        secondary: {
          50: '#FEF3C7',
          500: '#FB923C',
          900: '#7C2D12',
        },
      },
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
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
      },
    },
  },
};
```

---

## Examples

### Example 1: SaaS Design System (4-week project)

**Discovery**: B2B HR tech, targeting enterprises, need "modern + trustworthy"

**Phase 2 - Aesthetic**: Neo-Brutalism (rounded forms + primary colors + generous space)

**Phase 3 - Typography**:
```css
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=inter@400,500,700&display=swap');

:root {
  --font-display: 'Cabinet Grotesk', sans-serif;  /* Bold, geometric */
  --font-body: 'Inter', -apple-system, sans-serif; /* Clean, legible */
}
```

**Phase 4 - Color**:
```
Primary: Teal #06B6D4 (professional, modern)
Secondary: Purple #8B5CF6 (accessible, friendly)
Accent: Coral #FF6B6B (CTA, alerts)
Neutrals: Gray scale for backgrounds
```

**Phase 5 - Tokens**:
```css
--spacing-base: 16px (comfortable breathing room)
--radius-md: 8px (rounded, friendly)
--button-padding: 12px 24px (generous, easy to click)
```

**Timeline**:
- Week 1: Phases 1-2 (discovery, aesthetic)
- Week 2: Phases 3-4 (type, color)
- Week 3: Phase 5 (tokens, component specs)
- Week 4: Implementation review, Figma + code sync

---

### Example 2: Luxury Brand System (Fewer tokens, more refined)

**Discovery**: High-end jewelry, targeting affluent consumers, need "premium + minimal"

**Phase 2 - Aesthetic**: Luxury/Refined (serif, minimal, gold accents)

**Phase 3 - Typography**:
```css
@import url('https://api.fontshare.com/v2/css?f[]=boska@700&f[]=erode@400,500&display=swap');

:root {
  --font-display: 'Boska', serif;  /* Elegant, tradition */
  --font-body: 'Erode', sans-serif; /* Minimal, refined */
}
```

**Phase 4 - Color**:
```
Primary: Deep Navy #0F172A (luxury, serious)
Accent: Gold #D4AF37 (precious, luxury signifier)
Neutrals: Creams, whites, subtle grays
```

**Phase 5 - Tokens** (minimal, intentional):
```css
--spacing-base: 24px (more generous than typical)
--radius-md: 2px (subtle, refined)
--shadow-md: minimal (premium=understated)
```

**Token count**: ~40 tokens (vs 80-100 for tech products)
- Luxury = fewer options (more curated)
- Every token represents a choice, not an default
