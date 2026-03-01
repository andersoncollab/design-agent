---
name: spacing-layout-system
description: Spacing systems and CSS layout architecture — 4px/8px spacing scales, CSS Grid advanced patterns, Flexbox composition, whitespace strategy, section rhythm, auto-layout principles, and subgrid for complex nested layouts. Trigger: "spacing system", "layout system", "CSS Grid", "grid layout", "whitespace", "spacing scale", "subgrid".
version: 1.0.0
license: MIT
---

# Spacing & Layout System

## Purpose

Spacing is the most underrated design skill. Consistent spacing creates visual hierarchy, rhythm, and professionalism. Combined with modern CSS Grid and Flexbox, spacing systems are the foundation every layout is built on. This skill covers spacing tokens, advanced grid patterns, and layout composition.

## Key Concepts

### Spacing Scales & Tokens

**4px base grid**: All spacing as multiples of 4px.

Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px

Token mapping: `space-1` through `space-32`

```css
:root {
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

Tailwind equivalents: `p-1` through `p-32` (with 4px base).

### 8px Grid for Layout

- **Macro spacing** (sections, containers): 8px multiples (8, 16, 24, 32, 40, 48, 56, 64, 80, 96...)
- **Micro spacing** (padding, gaps, borders): 4px multiples (4, 8, 12, 16, 20, 24...)
- Rule: Use 8px for section rhythm, 4px for component internals.

### Whitespace Types

| Type | Range | Use |
|------|-------|-----|
| Micro | 4-12px | Between related elements (icon + label, link + border) |
| Component | 16-24px | Padding inside components, gaps between small elements |
| Section | 32-64px | Between related content blocks (cards in a row, article + sidebar) |
| Module | 64-128px | Between distinct sections (hero + features, features + CTA) |

More whitespace = more premium feel. Dark, dense interfaces need less. High-end products use more.

### CSS Grid

Modern 2D layout engine. Key properties:

- `grid-template-columns`: Define column tracks (e.g., `1fr 2fr` or `repeat(auto-fit, minmax(300px, 1fr))`)
- `grid-template-rows`: Define row tracks
- `grid-template-areas`: Named areas for semantic layout (header, sidebar, main, footer)
- `gap`: Space between grid items (use instead of margin)
- `auto-fill` / `auto-fit`: Auto-create tracks to fit container
- `minmax(min, max)`: Flexible track sizing
- Fractional units (`fr`): Proportional space distribution
- Subgrid: Child inherits parent's grid structure

### Subgrid Pattern

Child grid inherits parent's column/row tracks. Perfect for card alignment.

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-auto-rows: auto;
}

.card-title { grid-column: 1; }
.card-image { grid-column: 1; }
.card-cta { grid-column: 1; }
/* All card internals align to parent grid columns */
```

### Flexbox vs Grid

| Pattern | Use | Tech |
|---------|-----|------|
| Single row/column | Nav, button groups, inline elements | Flexbox |
| 2D layout | Page structure, card grids, dashboards | CSS Grid |
| Spacing between flex items | Gaps in rows/columns | `gap` property |
| Alignment | Centered text, aligned buttons | Flexbox align-items |

Don't use Flexbox for page layout. Don't use Grid for simple rows.

### Container Queries

Component-level responsive layout. Component reshapes based on its container width, not viewport.

```css
.card-section {
  container-type: inline-size;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
```

## Instructions with Code

### 1. Spacing Token System

CSS custom properties + Tailwind config integration:

```css
/* styles/spacing.css */
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}

.section {
  padding: var(--space-6) var(--space-8);
  gap: var(--space-4);
}
```

### 2. CSS Grid Page Layout

Header, sidebar, main, footer with named areas:

```css
body {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 0;
}

header { grid-area: header; }
aside { grid-area: sidebar; }
main { grid-area: main; }
footer { grid-area: footer; }
```

### 3. Auto-Responsive Card Grid

No media queries needed:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
}
```

Adjust `minmax()` min value for desired card width. Container handles responsiveness.

### 4. Subgrid Card Layout

Align titles, descriptions, CTAs across multiple cards:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto auto 1fr auto;
}

.card-title { grid-row: 1; }
.card-desc { grid-row: 2; }
.card-body { grid-row: 3; }
.card-cta { grid-row: 4; align-self: end; }
```

All CTAs align at bottom, titles at top, descriptions middle — without manual height fixing.

### 5. Holy Grail Layout

Sticky header, sticky sidebar, scrollable main:

```css
body {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  height: 100vh;
}

header {
  grid-column: 1 / -1;
  position: sticky;
  top: 0;
  z-index: 100;
}

aside {
  position: sticky;
  top: 60px;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}

main {
  overflow-y: auto;
}
```

### 6. Flexbox Component Patterns

Navigation bar:

```css
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
}
```

Vertical stack:

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

Media object (image + text):

```css
.media {
  display: flex;
  gap: 1rem;
}

.media-image {
  flex-shrink: 0;
  width: 80px;
}

.media-content {
  flex: 1;
}
```

### 7. Section Spacing System

Consistent vertical rhythm between page sections:

```css
section {
  padding: var(--space-12) var(--space-8);
}

section + section {
  margin-top: var(--space-16);
  border-top: 1px solid #eee;
  padding-top: var(--space-12);
}
```

Or use a wrapper rhythm class:

```css
.section-rhythm {
  display: grid;
  gap: var(--space-16);
  padding: var(--space-16) 0;
}

.section-rhythm > * {
  padding: 0 var(--space-8);
}
```

### 8. Container Query Layout

Component responsive to its container, not viewport:

```css
.card-container {
  container-type: inline-size;
  padding: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 100px 1fr;
  }
  .card-image {
    grid-row: 1 / 3;
  }
}
```

## Layout Decision Matrix

| Pattern | Use Case | Best Tech | Notes |
|---------|----------|-----------|-------|
| Page scaffold | Header/sidebar/main/footer | CSS Grid + named areas | Use `grid-template-areas` for semantic structure |
| Card grid | Responsive equal cards | CSS Grid + `auto-fit` + `minmax()` | No media queries needed |
| Card alignment | Align internals across cards | CSS Subgrid | Titles, descriptions, CTAs all align vertically |
| Nav/toolbar | Horizontal item row | Flexbox | Use `gap` and `justify-content` |
| Stack (vertical) | Vertical list of elements | Flexbox column or Grid | Flexbox for simple, Grid for complex |
| Media object | Image + text side by side | Flexbox or Grid | Flexbox: 2 items. Grid: more complex layout |
| Dashboard | KPI cards + charts | CSS Grid | Use `grid-template-columns: repeat(4, 1fr)` |
| Masonry | Pinterest-style uneven | CSS columns or Grid masonry | `column-count` or `grid-auto-rows: 200px` |

## Common Pitfalls

1. **Arbitrary spacing**: Using 12px here, 15px there, 18px elsewhere. Use tokens always.
2. **Flexbox for 2D**: Using Flexbox for page layout instead of CSS Grid. Grid is designed for this.
3. **Margin for spacing**: Using `margin` instead of `gap`. Gap is cleaner, no margin collapsing issues.
4. **No tokens**: Hardcoded rem/px everywhere. Always extract to CSS custom properties.
5. **Equal spacing everywhere**: No visual hierarchy. Use larger gaps between unrelated sections, smaller gaps between related items.
6. **Fixed-width grids**: Grids that break on resize. Use `auto-fit`, `minmax()`, and relative units.
7. **Mixing spacing systems**: Some 4px, some 5px, some 10px. Commit to one scale.
8. **Not using minmax()**: Cards that don't resize properly. Always pair `auto-fit` with `minmax(min-width, 1fr)`.
9. **Neglecting section rhythm**: Inconsistent gaps between sections. Create a deliberate vertical rhythm.
10. **Overusing subgrid**: Subgrid is powerful but adds complexity. Use only when alignment across cards is critical.

## References

- Every Layout (heydonworks.com) — comprehensive spacing and layout patterns
- CSS Grid MDN (developer.mozilla.org/CSS_grid_layout) — official spec and examples
- CSS Subgrid MDN — advanced grid alignment
- Container Queries spec — component-level responsive design

## Related Skills

- `responsive-patterns` — Mobile-first breakpoints and viewport strategies
- `bento-layout` — Grid-based dashboard and portfolio layouts
- `design-tokens` — Token systems for color, typography, shadows
- `dashboard-patterns` — KPI cards, charts, data visualization layout
