---
name: design-to-code
description: End-to-end pipeline from design concept to production frontend code. Six phases: Brief (requirements) → Direction (visual identity) → Research (competitors) → System (design tokens) → Structure (layouts + components) → Build (production code). Supported stacks: React+Tailwind, Astro+Tailwind, Next.js+Tailwind, vanilla HTML+CSS. Output: design system CSS, Tailwind config, layout scaffold, page components. Trigger: "design a new site", "build from scratch", "create landing page", "redesign product", "implement design system".
version: 1.0.0
license: MIT
---

# Design-to-Code Skill

## Purpose

Design-to-Code is a 6-phase orchestration workflow that transforms a brief into production-ready frontend code. Unlike isolated design or code tasks, this skill integrates the full pipeline: gathering requirements, establishing visual direction, researching context, building a design system, structuring layouts, and generating code.

Each phase runs a focused companion skill (`aesthetic-direction`, `brand-research`, `design-system-generator`, etc.), creating a complete and coherent output. Result: a production scaffold ready for content and component additions, with design system and Tailwind configuration baked in.

## When to Use

- **New site from scratch**: No existing branding or design direction
- **Landing page creation**: Single-page promotional site with hero, features, CTA sections
- **Product redesign**: Rebuilding UI with new direction
- **Brand refresh**: Updating visual identity across web presence
- **Design handoff to dev**: Codifying designer intent into Tailwind config
- **Quick MVP**: Get a polished foundation fast (1-2 weeks)
- **Design system audit**: Establish system-first development practices

**Supported tech stacks**:
- React 18+ with Tailwind CSS 3.x+
- Astro 4.x+ with Tailwind CSS 4.x
- Next.js 14+ with Tailwind CSS
- Vanilla HTML5 + CSS with Tailwind CDN

## Key Concepts

### The Six Phases

1. **Brief** — Gather project requirements before designing
2. **Direction** — Run `aesthetic-direction` to establish visual identity
3. **Research** — Run `brand-research` on competitors for context
4. **System** — Run `design-system-generator` to create design tokens
5. **Structure** — Select layout via `bento-layout`, populate with `component-patterns`
6. **Build** — Generate production code with design system applied

### Phase Dependencies

```
Brief (input)
  ↓
Direction (aesthetic)
  ↓
Research (competitive context)
  ↓
System (design tokens)
  ↓
Structure (layouts + components)
  ↓
Build (production code)
  ↓
Output (scaffold ready for content)
```

### Design System Output Structure

Each phase generates artifacts that feed the next:

```
Phase: Brief → Direction → Research
  Output: Brand mood, target aesthetic, color inspirations, typeface recommendations

Phase: System
  Output: Design tokens (colors, typography scale, spacing scale, shadows, etc.)

Phase: Structure
  Output: Layout grid, component library specs, responsive breakpoints

Phase: Build
  Output: Complete codebase with system applied
```

### Supported Stack Patterns

**React + Tailwind** (Client-side SPA):
- CRA or Vite setup
- Tailwind config with design tokens as `theme` extensions
- Reusable component structure (src/components)

**Astro + Tailwind** (Static/Hybrid):
- `astro.config.mjs` with Tailwind integration
- Content collections for data-driven pages
- Astro layouts (`.astro` files)
- CSS modules or Tailwind classes

**Next.js + Tailwind** (Server-side + Static):
- App Router structure (src/app)
- Server/client component split
- `tailwind.config.ts` with design tokens
- Layout and page components

**Vanilla HTML + CSS**:
- Single HTML file or multi-page structure
- Tailwind CDN (not build-optimized, for demo/prototype only)
- Pure CSS custom properties for design tokens
- No framework overhead

## Instructions

### Phase 1: Brief (30 minutes)

Gather these inputs:

**Project Type**: Marketing site, SaaS dashboard, e-commerce, portfolio, blog?

**Industry/Vertical**: Fashion, fintech, healthcare, education, tech, nonprofits? (Industry context informs color, tone, component choices)

**Target Audience**: End users (customers, investors, employees)? Age range? Tech-savviness?

**Goals**: Drive signups? Showcase portfolio? Educate? Sell products? Inform goals informs CTA placement and messaging priority.

**Competitors**: Name 2-3 direct competitors. Will run `brand-research` on them next.

**Tech Stack**: React, Astro, Next.js, or vanilla? Why that choice?

**Launch Timeline**: When does this need to be live? Informs scope.

**Success Metrics**: Conversion rate? Engagement? Brand perception? Helps validate design choices.

### Phase 2: Direction (45 minutes)

Run the `aesthetic-direction` skill:

```
Instructions for aesthetic-direction:
- Input: Brief from Phase 1
- Output: Visual direction document with:
  - Aesthetic chosen (minimalist, maximalist, brutalist, playful, professional, etc.)
  - Mood board (3-5 reference sites or images)
  - Color palette inspirations (primary, secondary, accent)
  - Typeface recommendations (display, body, mono)
  - Key visual metaphor or brand voice
```

**Checkpoint**: Does visual direction align with audience and goals? Review with stakeholders.

### Phase 3: Research (45 minutes)

Run `brand-research` on each competitor listed in Brief:

```
Instructions for brand-research:
- Input: Competitor name or URL
- Output: Competitive analysis with:
  - Visual identity (colors, typography, key imagery)
  - Layout patterns (hero, features, CTA placement)
  - Component choices (buttons, cards, navigation style)
  - Content strategy (tone, messaging pillars)
  - What's working, what's weak
```

**Checkpoint**: Identify 3-5 design patterns you want to adopt or avoid. Note "striking distance" — how to differentiate visually from competitors.

### Phase 4: System (60 minutes)

Run `design-system-generator` with inputs from Phase 2 (Direction) and Phase 3 (Research):

```
Instructions for design-system-generator:
- Input: Aesthetic direction + competitive insights + tech stack
- Output: Complete design system with:
  - Color system (primary, secondary, accent, status colors for error/warning/success, grays for neutral)
  - Typography system (display scale H1-H6, body sizes, monospace)
  - Spacing scale (base unit 4px or 8px, then 2x, 3x, 4x, 6x, 8x multiples)
  - Component variants (button, card, input, navigation styles)
  - Tailwind config file with all tokens as CSS custom properties + Tailwind theme
  - Shadow, border-radius, and animation specs
```

**Checkpoint**: Does color system pass WCAG AA contrast? Is typography scale mathematically consistent (1.25x or 1.618x ratio)?

### Phase 5: Structure (60 minutes)

Choose a layout pattern and populate with components:

**Layout Selection** — Run `bento-layout`:
```
Choose from:
- 2×2 Equal (4 equal cards, good for features)
- 1 Large + 2-3 Small (emphasize hero section)
- 3-Column Magazine (large content + sidebar)
- Dashboard 4-Panel (metric cards)
- Asymmetric Showcase (varied card sizes)
```

**Component Population** — Run `component-patterns`:
```
Choose components to include:
- Navigation (header, hero)
- Feature cards (grid or bento)
- Call-to-action (button + input for email signup)
- Social proof (testimonials, stats)
- Footer
```

**Checkpoint**: Does layout work at 375px (mobile), 768px (tablet), 1440px (desktop)? Are components visually consistent?

### Phase 6: Build (120-180 minutes)

Generate production code scaffold:

**React + Tailwind Example**:
```typescript
// Directory structure
src/
  components/
    Button.tsx          // Reusable button with design tokens
    Card.tsx            // Reusable card component
    Hero.tsx
    Features.tsx
    Footer.tsx
  styles/
    design-tokens.css   // CSS custom properties from design system
    tailwind.css
  pages/
    Home.tsx
  tailwind.config.js

// tailwind.config.js applies design tokens
module.exports = {
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      // ... rest of palette from system
    },
    fontFamily: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    spacing: {
      // 4px base unit
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      4: '1rem',
      // ... etc
    },
  },
}
```

**Astro + Tailwind Example**:
```typescript
// Directory structure
src/
  layouts/
    BaseLayout.astro    // Wrapper with header, footer
  components/
    Button.astro
    Card.astro
    Hero.astro
  pages/
    index.astro

// src/styles/design-tokens.css with custom properties
:root {
  --color-primary: #0066ff;
  --font-display: 'Inter', sans-serif;
  --spacing-base: 1rem;
}
```

**Next.js + Tailwind Example**:
```typescript
// app/
//   layout.tsx         // Root layout with fonts, providers
//   page.tsx           // Home page
//   components/
//     Hero.tsx
//     Features.tsx
// tailwind.config.ts with design tokens
```

**Output files generated**:
1. **design-tokens.css** — CSS custom properties for colors, fonts, spacing, shadows
2. **tailwind.config.js/ts** — Theme extensions applying design tokens
3. **Layout.tsx/jsx** — Main layout wrapper with header, footer, sidebar
4. **Page.tsx/jsx** — Home page with hero, features, CTA sections
5. **Component files** — Reusable Button, Card, Input, etc.
6. **Fonts** — Links to Fontshare CDN for typographies chosen in Phase 2

**Checkpoint**: Does code compile? Do fonts load? Does Tailwind build without errors?

## Examples

### Example 1: SaaS Landing Page (React + Tailwind)

**Brief**:
- Type: Landing page for AI-powered document tool
- Industry: SaaS / Productivity
- Audience: Founders and product managers (technical, impatient)
- Competitors: Notion, Coda, AirtableForm

**Direction** (output from aesthetic-direction):
- Aesthetic: Minimalist + tech-forward
- Colors: Navy (#001F3F), accent teal (#17A2B8), white background
- Typography: Satoshi (display), Inter (body), JetBrains Mono (code)

**Research** (output from brand-research):
- Notion: Large hero with animated demo, feature grid, pricing table, FAQ
- Coda: Same structure but with in-page product showcase
- Takeaway: Product demo is key; minimize text, maximize video

**System** (output from design-system-generator):
```css
:root {
  /* Color system */
  --color-primary: #001F3F;
  --color-accent: #17A2B8;
  --color-accent-hover: #138496;
  --color-neutral-50: #F8F9FA;
  --color-neutral-100: #E9ECEF;
  --color-neutral-200: #DEE2E6;
  --color-neutral-700: #495057;
  --color-neutral-900: #212529;
  --color-success: #28A745;
  --color-error: #DC3545;
  --color-warning: #FFC107;

  /* Typography */
  --font-display: 'Satoshi', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px — 1.25x */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31px */
  --text-3xl: 2.441rem;  /* 39px */
  --text-4xl: 3.052rem;  /* 49px */

  /* Spacing (8px base) */
  --space-1: 0.25rem;  --space-2: 0.5rem;
  --space-3: 0.75rem;  --space-4: 1rem;
  --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;
  --space-24: 6rem;

  /* Surfaces */
  --radius-sm: 6px;  --radius-md: 8px;  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
}
```

**Structure** (from bento-layout + component-patterns):
- Hero (full-width, 80vh, image/video background)
- Features (3-column grid, icon + text cards)
- Demo section (video embed + side-by-side comparison)
- Pricing (3-tier card grid)
- FAQ (accordion component)
- CTA (email capture form)

**Build** (output code):
- React + Tailwind scaffold
- Hero.tsx with background video
- Features.tsx with 3-column grid
- Pricing.tsx with card variants (highlighted middle tier)
- FAQ.tsx with accordion state management
- tailwind.config.js with design tokens as theme

**Result**: Polished landing page scaffold ready for copy, real product screenshots, and custom integrations.

### Example 2: E-Commerce Product Page (Astro + Tailwind)

**Brief**:
- Type: E-commerce catalog + product pages
- Industry: Fashion/Apparel
- Audience: Customers aged 18-40, mobile-primary
- Competitors: Shopify premium themes

**Direction**:
- Aesthetic: Playful, photography-first
- Colors: Cream background, warm orange accent, deep charcoal text
- Typography: Clash Display (warm, rounded display), General Sans (readable body)

**System**:
- 8px base spacing unit
- Clash Display 1.333x scale (perfect fourth — warm but structured)
- Warm color palette (cream #FFF8F0, orange #E8871E, charcoal #2C3E50, sage #8BAA7C)
- Fontshare CDN: `https://api.fontshare.com/v2/css?f[]=clash-display@700,800&f[]=general-sans@400,500,700&display=swap`

**Structure**:
- Hero with hero image
- Product grid (3 columns at desktop, 1 at mobile)
- Product detail page with image carousel, size/color variants, reviews

**Build**:
- Astro with content collection for products
- Tailwind with design system applied
- Image optimization with Astro assets
- Add-to-cart logic (wired to Stripe or Shopify API)

**Result**: Full e-commerce scaffold with CMS-ready product pages.

### Example 3: Corporate Website (Next.js + Tailwind)

**Brief**:
- Type: Marketing website for B2B consulting firm
- Industry: Management Consulting
- Audience: CXOs and procurement managers
- Competitors: McKinsey, Bain, BCG

**Direction**:
- Aesthetic: Professional, corporate trust-building
- Colors: Navy blue, gold accent, light gray backgrounds
- Typography: Boska (serif display for trust), General Sans (body for readability)

**System**:
- Enterprise color palette (navy #2C3E50, gold #D4AF37)
- Conservative spacing (16px base)
- Service-specific card variants

**Structure**:
- Hero with company mission
- Services grid (4 offerings, bento-style with one featured)
- Case studies showcase
- Team profiles
- Contact form

**Build**:
- Next.js with App Router
- Server components for static content
- Dynamic case study pages
- Tailwind with corporate design system

**Result**: Trust-focused B2B site ready for case study additions and team updates.

## Phase Checklist

Use this checklist to track progress:

- [ ] **Phase 1: Brief** — Completed all inputs (type, industry, audience, goals, competitors, stack, timeline)
- [ ] **Phase 2: Direction** — Aesthetic chosen, mood board created, color + type recommendations made
- [ ] **Phase 3: Research** — Competitor sites analyzed, 3-5 design patterns identified, striking distance noted
- [ ] **Phase 4: System** — Design tokens defined, Tailwind config created, contrast verified (WCAG AA)
- [ ] **Phase 5: Structure** — Layout pattern chosen, components selected, responsive breakpoints tested
- [ ] **Phase 6: Build** — Code scaffold generated, fonts loading, Tailwind compiling, components rendering

**Go/No-Go**: Before Phase 6 build, confirm Phase 1-5 outputs are approved by stakeholders. Late changes to Brief or Direction cause rebuild overhead.

## Common Pitfalls

### Antipattern 1: Skipping Brief
**Bad**: Jump straight to aesthetic direction without understanding business goals.
**Good**: Spend 30 minutes on Phase 1. Brief informs all downstream decisions.

### Antipattern 2: Redesigning During Build
**Bad**: Change visual direction in Phase 6 after Tailwind config is set.
**Good**: Finalize Direction and System in Phases 2-4. Approve before writing code.

### Antipattern 3: Ignoring Design System
**Bad**: Generate code without tokens, then colors/spacing are hardcoded everywhere.
**Good**: Build design system first (Phase 4). Code applies tokens, making maintenance easy.

### Antipattern 4: No Responsive Testing
**Bad**: Design looks great at 1440px; mobile is broken (text too large, gaps huge, buttons not tappable).
**Good**: Test all layouts at 375px, 768px, 1440px during Phase 5. Use Tailwind responsive prefixes.

### Antipattern 5: Copy-Pasting Without Adaptation
**Bad**: Take competitor layout wholesale, apply your colors, ship it.
**Good**: Use competitor patterns as inspiration, but adapt to your brand and unique value prop.

### Antipattern 6: Skipping Competitive Research
**Bad**: Build site that looks like every other SaaS landing page.
**Good**: Run Phase 3 (Research) to understand competitive landscape and find visual differentiation.

### Antipattern 7: Incorrect Font Import
**Bad**: Import fonts from Google Fonts (slow CDN, privacy issues). Or fonts don't load at all.
**Good**: Use Fontshare CDN (fast, privacy-first, design-quality fonts).

## References

- **Related Skills**: `aesthetic-direction` (visual identity), `brand-research` (competitive analysis), `design-system-generator` (tokens + Tailwind config), `bento-layout` (grid patterns), `component-patterns` (reusable UI)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/docs) — theme customization, design tokens
- **Fontshare**: [fontshare.com](https://fontshare.com) — free quality fonts with CDN
- **React**: [React Docs](https://react.dev) — component patterns, hooks
- **Astro**: [Astro Docs](https://docs.astro.build) — content collections, static generation
- **Next.js**: [Next.js Docs](https://nextjs.org/docs) — App Router, server components
- **WCAG AA Contrast**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — validate all color pairs
- **Stack Rationale**: [Frontend Stack Comparison](https://2024.stateofjs.com/) — framework benchmarks and use cases
- **Related Skills**: `figma-pipeline`, `component-patterns`, `responsive-patterns`
