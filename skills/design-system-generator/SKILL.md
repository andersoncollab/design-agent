---
name: design-system-generator
description: Complete design system wizard (5 phases). Walks through discovery, aesthetic direction, typography, color system, and tokens/components. Outputs production-ready design tokens, CSS variables, Tailwind config, type scale table, color palette, spacing/radius/shadow systems, component token reference, and 02-DESIGN-SYSTEM.md template. Trigger: "build design system", "create design system", "design system from scratch", "system design walkthrough".
version: 1.0.0
license: MIT
---

## Purpose

You are a design systems architect. This skill orchestrates the complete process of building a cohesive, scalable design system from brand strategy to production tokens. Instead of designing ad-hoc, you'll establish systematic, documented design decisions that front-end developers can implement immediately and designers can extend predictably.

A complete design system includes:
- **Design decisions** (aesthetic direction, typography philosophy)
- **Design tokens** (colors, spacing, type scale, shadows, radius)
- **CSS infrastructure** (variables, Tailwind extensions, dark mode)
- **Component definitions** (anatomy, props, variants, accessibility)
- **Documentation** (living specs that stay current)

**Who uses it**: Design systems leads, product designers starting projects, design agencies scaling to multiple clients, teams needing consistency at scale.

**When to use it**: Before you write a single design file. At project kickoff. When designing for scale.

## When to Use

- **Greenfield project**: No design system exists. You're starting from scratch.
- **Design system overhaul**: Current system is fragmented or outdated. Time to rebuild.
- **Multi-product company**: Each product needs distinct visual identity, but they should share typography, colors, spacing systems.
- **Agency scaling**: Going from 3-5 clients to 20+. Need template-based system design for speed.
- **Handoff to developers**: Design must translate to production tokens, not just beautiful Figma files.
- **Design system docs**: Need living documentation that developers actually use.

**Not for**: Component implementation (that's front-end work). Design critique or iteration. Icon systems (separate skill). Animation specification (separate skill).

## Key Concepts

### The 5 Phases

Design system generation follows this sequence:

```
Phase 1: Discovery
  ↓ What do we know about audience, business, constraints?
Phase 2: Aesthetic Direction
  ↓ What visual language tells our brand story?
Phase 3: Typography
  ↓ How do we create hierarchy and personality through type?
Phase 4: Color System
  ↓ What colors support our aesthetic and ensure accessibility?
Phase 5: Tokens & Components
  ↓ What are the atomic building blocks (spacing, radius, shadows)?
```

Each phase answers specific questions and produces outputs that feed the next phase.

### Design Tokens vs. Design Decisions

**Design decision**: "We want a warm, editorial aesthetic that communicates authority through generous whitespace and high-quality photography."

**Design tokens**: The concrete values that implement that decision:
- `--font-display: 'Clash Display', sans-serif`
- `--color-primary-500: #3B82F6`
- `--spacing-base: 16px`
- `--radius-sm: 4px`
- `--shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1)`

### Token Organization

Tokens are organized hierarchically:

```
Global (colors, typography, spacing)
  └─ Component (button variants, card states)
    └─ Instance (specific component with specific variant)
```

For example:
- **Global**: `--color-primary-500` (the blue value)
- **Component**: `--button-primary-bg` (uses global, sets button background)
- **Instance**: `.btn-primary` (applies component token with specific behavior)

### CSS Custom Properties (Variables)

All tokens get exported as CSS custom properties for maximum flexibility:

```css
/* Global tokens */
:root {
  --color-primary-500: #3B82F6;
  --font-display: 'Clash Display';
  --spacing-base: 16px;
}

/* Component tokens */
:root {
  --button-primary-bg: var(--color-primary-500);
  --button-primary-text: #FFFFFF;
  --button-padding: var(--spacing-base);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: #60A5FA;  /* Lighter for dark backgrounds */
    --button-primary-text: #1E3A8A;
  }
}
```

### Tailwind Integration

Tokens extend Tailwind config so developers use familiar utilities:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          500: '#3B82F6',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
      },
      spacing: {
        base: '16px',
      },
    },
  },
};
```

Then developers use: `<div className="bg-primary-500 font-display p-base">...</div>`

### Documentation Living System

The design system should be living, version-controlled documentation:
- **Figma file**: Source of truth for visual design
- **design-system.md** (or similar): Conceptual overview
- **tokens.json**: Machine-readable token export
- **tailwind.config.js**: Developer-ready token config
- **component-specs.md**: Detailed component definitions

---

## Instructions

### Phase 1: Discovery (30 min)

**Goal**: Understand project context so aesthetic direction aligns with business.

**Questions to ask**:

1. **Project Scope**
   - What are we building? (Website, app, brand identity, multi-product system?)
   - Who is the audience? (B2B, B2C, enterprise, consumers?)
   - What's the budget? (Impacts aesthetic complexity)

2. **Current State**
   - Do existing brand guidelines exist?
   - What's the competitive landscape? (Run `brand-research` on 3-5 competitors)
   - What's working in current design? What's broken?

3. **Goals**
   - Why does this system need to exist?
   - What problem does it solve? (Consistency? Speed? Scalability?)
   - Success metric: "We'll know this works when..." (faster handoff? fewer design debates?)

**Output**: 1-page discovery brief answering these questions.

---

### Phase 2: Aesthetic Direction (30-45 min)

**Goal**: Align team on visual language before making design decisions.

**Action**: Run the `aesthetic-direction` skill.

**Input**: Discovery brief answers (project type, audience, brand personality).

**Output**: Chosen aesthetic direction + complete design brief with:
- Visual characteristics
- Reference websites
- Color temperature and mood
- Typography approach
- Layout philosophy

**Save this**. It's your north star for all future decisions.

---

### Phase 3: Typography (20-30 min)

**Goal**: Establish type scale, font pairing, and hierarchy system.

**Action**: Run the `typography-pairing` skill.

**Input**: Aesthetic direction.

**Output**: Production-ready font pair with:
- Fontshare CDN import URLs
- CSS custom properties for type scale
- Line heights and letter spacing recommendations
- Tailwind font configuration

**Example output**:

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap');

:root {
  /* Type scale (Major Third 1.25) */
  --text-xs: 12.8px;
  --text-sm: 16px;
  --text-base: 16px;
  --text-lg: 18.75px;
  --text-xl: 23.44px;
  --text-2xl: 29.3px;
  --text-3xl: 36.6px;

  /* Fonts */
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Line heights */
  --leading-display: 1.1;
  --leading-body: 1.6;
}
```

---

### Phase 4: Color System (30-45 min)

**Goal**: Generate accessible, cohesive color palette aligned with aesthetic.

**Action**: Run the `color-system` skill.

**Input**:
- Aesthetic direction (color mood)
- Type of harmony (complementary, analogous, triadic, monochromatic)

**Output**: Production-ready color system with:
- Primary, secondary, accent color families (10-tone scale each)
- Semantic colors (success, warning, error, info)
- Neutral colors (grays for text, backgrounds)
- CSS custom properties for all colors
- WCAG contrast ratio validation
- Dark mode variants
- Tailwind color configuration

**Example output**:

```css
:root {
  /* Primary palette (60%) */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-500: #3B82F6;
  --color-primary-900: #1E3A8A;

  /* Secondary palette (30%) */
  --color-secondary-500: #FB923C;
  --color-secondary-900: #7C2D12;

  /* Accent palette (10%) */
  --color-accent-500: #A855F7;
  --color-accent-900: #581C87;

  /* Semantic colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #0EA5E9;

  /* Surfaces */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F3F4F6;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: #60A5FA;  /* Lighter for contrast */
    --color-bg-primary: #0F172A;
    --color-text-primary: #F1F5F9;
  }
}
```

---

### Phase 5: Tokens & Components (45-60 min)

**Goal**: Define atomic tokens and component specifications.

**Step 1: Spacing Scale**

Create a base spacing scale (usually 4px, 8px, or 16px base):

```css
:root {
  --spacing-xs: 4px;      /* Micro spacing */
  --spacing-sm: 8px;      /* Tight spacing */
  --spacing-md: 16px;     /* Base spacing */
  --spacing-lg: 24px;     /* Generous spacing */
  --spacing-xl: 32px;     /* Large sections */
  --spacing-2xl: 48px;    /* Full-screen sections */
  --spacing-3xl: 64px;    /* Hero sections */
}
```

**Step 2: Border Radius System**

Create a radius scale (usually 2-6 steps):

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;       /* Subtle roundness */
  --radius-md: 8px;       /* Standard roundness */
  --radius-lg: 12px;      /* Soft roundness */
  --radius-xl: 16px;      /* Rounded */
  --radius-full: 9999px;  /* Pill shape */
}
```

**Step 3: Shadow System** — Define 5 elevation levels (`sm` through `2xl`) plus `inner` and `focus` special effects using `rgba(0,0,0,x)` values.

**Step 4: Responsive Breakpoints** — Use Tailwind's mobile-first defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

**Step 5: Component Tokens** — Define CSS custom properties for button (padding, radius, variants), card (padding, radius, shadow), and input (padding, focus states, font-size 16px to prevent iOS zoom).

**Step 6: Create Tailwind Config** — Extend `tailwind.config.js` with `colors`, `fontFamily`, `fontSize`, `spacing`, `borderRadius`, and `boxShadow` entries mirroring all tokens.

> See `references/token-templates.md` for shadow system, breakpoints, component tokens, and Tailwind config code.

---

### Step 7: Compile Design System Document

Use the `02-DESIGN-SYSTEM.md` template from `antigravity-build-templates/templates/`.

Output sections:
1. **Aesthetic Direction** — Phase 2 summary
2. **Typography System** — Font pair, type scale, line heights, usage guidelines
3. **Color System** — Palette table, semantic colors, WCAG validation, dark mode
4. **Spacing & Layout** — Spacing scale, breakpoints, grid philosophy
5. **Component Library** — Button (variants, sizes, states), Card, Input, all others
6. **CSS Variables** — Full token export
7. **Tailwind Configuration** — tailwind.config.js excerpt
8. **Implementation Guide** — How to use CSS vars, Tailwind classes, dark mode, extensions

---

## Examples

### Example 1: SaaS Design System (4-week project)

B2B HR tech — "modern + trustworthy". Aesthetic: Neo-Brutalism. Fonts: Cabinet Grotesk (display) + Inter (body). Colors: Teal primary, Purple secondary, Coral accent. Tokens: 16px base spacing, 8px radius, generous button padding. 4-week timeline: discovery → type/color → tokens → implementation review.

### Example 2: Luxury Brand System (Fewer tokens, more refined)

High-end jewelry — "premium + minimal". Aesthetic: Luxury/Refined. Fonts: Boska serif (display) + Erode (body). Colors: Deep Navy + Gold accent. Tokens: 24px base spacing, 2px radius, minimal shadows. ~40 total tokens — luxury means fewer, more curated choices; every token is intentional.

> See `references/token-templates.md` for full example walkthroughs.

---

## Common Pitfalls

### ❌ Pitfall 1: Building a Huge Token System When You Need Simplicity

**Problem**: You create 200 tokens with every possible variant. Designers get lost. Developers don't use it. System dies.

**Fix**: **Start minimal, expand only when needed**. For first version:
- 1 primary color + 5-7 shades
- 2 fonts (display + body)
- 1 spacing scale (8 values: xs-3xl)
- 1 radius scale (4 values)
- 1 shadow scale (4 values)
- Total: ~40 tokens

Add complexity only when proven necessary.

### ❌ Pitfall 2: Tokens Without Semantic Meaning

**Problem**: You name colors `--color-500`, `--color-600`. Developers don't know when to use what. System falls apart.

**Fix**: **Use semantic names that explain purpose**:
```css
/* Bad */
--color-blue-500: #3B82F6;
--color-gray-100: #F3F4F6;

/* Good */
--color-primary-500: #3B82F6;       /* Main brand color */
--color-bg-secondary: #F3F4F6;      /* Secondary backgrounds */
--color-text-muted: #6B7280;        /* Disabled or secondary text */
--button-primary-bg: var(--color-primary-500);  /* Button backgrounds */
```

Semantic tokens answer: "When do I use this?"

### ❌ Pitfall 3: Not Testing Dark Mode Early

**Problem**: You build light mode, then try to add dark mode at end. Colors fail contrast checks. You rebuild.

**Fix**: **Design dark mode simultaneously**. For every light token, create a dark variant:

```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #111827;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0F172A;
    --color-text-primary: #F1F5F9;
  }
}
```

Test contrast in both modes from the start.

### ❌ Pitfall 4: Mixing Design System with Component Implementation

**Problem**: You write component CSS in the design system docs. Developers implement differently. System splits into two versions.

**Fix**: **Separate concerns**:
- **Design System** = Tokens only (colors, spacing, fonts, shadows)
- **Component Implementation** = How to use tokens (button.css, card.css)

Design system tells you *what* values to use. Components show *where* to use them.

### ❌ Pitfall 5: No Version Control on Design System

**Problem**: You update a color, Figma changes, CSS doesn't. Codebase has three versions. Nobody knows which is truth.

**Fix**: **Version your design system**:
- **Figma is source of truth** for visual decisions
- **tokens.json** (version-controlled) is source of truth for technical values
- **Automated sync**: Use tools like Figma Tokens or Style Dictionary to sync Figma → code
- **CHANGELOG**: Document every breaking change

### ❌ Pitfall 6: Not Considering Component States

**Problem**: You define button colors for normal state only. What about hover? Focus? Disabled? Loaded state? System is incomplete.

**Fix**: **Define all component states**:

```css
:root {
  /* Button primary normal state */
  --button-primary-bg: var(--color-primary-500);
  --button-primary-text: #FFFFFF;

  /* Button primary hover state */
  --button-primary-bg-hover: var(--color-primary-600);

  /* Button primary focus state */
  --button-primary-shadow-focus: 0 0 0 3px rgba(59,130,246,0.1);

  /* Button primary disabled state */
  --button-primary-bg-disabled: var(--color-gray-300);
  --button-primary-text-disabled: var(--color-gray-500);
}
```

All interactive states must be designed and tokenized.

---

## References

- **`aesthetic-direction`** skill — Pick visual direction (Phase 2 prerequisite)
- **`typography-pairing`** skill — Font selection (Phase 3)
- **`color-system`** skill — Palette generation (Phase 4)
- **`brand-research`** skill — Competitive context for discovery
- **`02-DESIGN-SYSTEM.md`** template — Document template (use for Phase 5 output)
- **Figma Tokens plugin**: https://www.figmatokens.com/ (sync design → code)
- **Style Dictionary**: https://amzn.github.io/style-dictionary/ (token generation)
- **Component Gallery**: https://component.gallery/ (reference component specs)
- **Tailwind Docs**: https://tailwindcss.com/docs (for config reference)
- **W3C Design Tokens**: https://www.designtokens.org/ (token standardization)
- **Related Skills**: `design-tokens`, `component-patterns`, `app-design-system`

