---
name: bento-layout
description: Production Tailwind CSS Grid bento layout patterns for component showcases, dashboards, portfolios, and hero sections. Use when designing grid-based layouts with irregular card sizes and asymmetric arrangements. Trigger: "bento grid", "feature showcase grid", "dashboard layout", "portfolio grid layout".
version: 1.0.0
license: MIT
---

# Bento Layout Skill

## Purpose

Bento layouts create visually dynamic, asymmetric grid layouts using CSS Grid. Unlike uniform grids, bento boxes vary in size (1 column × 1 row, 2 columns × 1 row, 1 column × 2 rows, etc.) to highlight key content and create visual hierarchy. This skill provides production-ready Tailwind CSS Grid patterns for React, Astro, and HTML.

## When to Use

- **Feature showcases**: Highlight 6-12 features with varied emphasis
- **Dashboard overviews**: Combine large metric cards, charts, and small stat boxes
- **Portfolio grids**: Display projects with hero project taking 2×2 space
- **Pricing comparisons**: Emphasize premium tier in larger cell
- **Team/About sections**: Mix large team photos with small role cards
- **Hero sections**: Large hero block + supporting content cards
- **Stats/metrics sections**: Varied-size KPI cards with visual impact
- **Blog/content homepages**: Large featured post + 8-12 smaller cards

Trigger phrases: "asymmetric grid", "varied-size cards", "emphasize one item larger", "dashboard-style layout", "visual hierarchy grid".

## Key Concepts

### CSS Grid Fundamentals
- **Grid templates**: `grid-template-columns` and `grid-template-rows` define cell sizes
- **Span**: `col-span-*` and `row-span-*` make cells occupy multiple tracks
- **Gap**: `gap-*` creates consistent spacing
- **Responsive**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) to collapse bento to single column on mobile

### Common Bento Patterns
1. **2×2 Equal**: 4 equal-size cells (2 cols × 2 rows) — good for 4 features
2. **1 Large + 2 Small**: 1 cell spans 2×2, rest are 1×1 — highlight hero
3. **L-Shape Hero**: Large cell top-left, 2 cells right, 2 below
4. **Dashboard 4-Panel**: Large widget (2×2) + 3 single widgets
5. **3-Column Magazine**: Large + 2 cols of smaller cards
6. **Asymmetric Showcase**: Mix of 1×1, 1×2, 2×1, 2×2 cells
7. **Metrics Bar**: 1 row of stat boxes (1×1) + content below
8. **Masonry-style**: Varied heights, staggered fill (CSS Columns, not Grid)

### Responsive Strategy
- **Mobile** (default): Single column stack (`.col-span-1`)
- **Tablet** (md: 768px): 2-3 columns, maintain visual hierarchy
- **Desktop** (lg: 1024px): Full bento pattern
- **Large** (xl: 1280px): Optional fine-tuning

## Instructions

### Step 1: Choose a Pattern
Select from `references/bento-patterns.md` based on your content count and emphasis:
- 4 items → 2×2 Equal
- 5-6 items → 1 Large + 2-3 Small
- 8-10 items → 3-Column Magazine or Asymmetric
- 12+ items → Dashboard or Masonry

### Step 2: Define the Grid Structure
Use Tailwind Grid utilities:
```
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
```

### Step 3: Apply Spans to Cells
Large cells use `col-span-*` and `row-span-*`:
```html
<div class="col-span-2 row-span-2">Hero Item</div>
<div class="col-span-1">Small Item</div>
```

Reset spans on mobile:
```html
<div class="col-span-2 md:col-span-2 lg:col-span-2 row-span-2 md:row-span-2 lg:row-span-2">
  Hero Item
</div>
```

### Step 4: Style Cards
Apply consistent card styling (rounded corners, shadows, hover effects):
```html
<div class="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
  Content
</div>
```

### Step 5: Test Responsiveness
- Inspect at 375px (mobile), 768px (tablet), 1024px (desktop)
- Verify single-column stack on mobile
- Confirm text readability at all breakpoints
- Check gaps don't exceed content width on small screens

## Examples

### Example 1: Feature Showcase (2×2 + 2 small)
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- Hero Feature (spans 2×2) -->
  <div class="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6">
    <h3 class="text-2xl font-bold text-white">Hero Feature</h3>
    <p class="text-blue-100">Main highlight with large visual impact</p>
  </div>

  <!-- Feature 2 (1×1) -->
  <div class="rounded-lg bg-white p-4 shadow-md">
    <h4 class="font-semibold">Feature 2</h4>
  </div>

  <!-- Feature 3 (1×1) -->
  <div class="rounded-lg bg-white p-4 shadow-md">
    <h4 class="font-semibold">Feature 3</h4>
  </div>

  <!-- Feature 4 (1×1) -->
  <div class="rounded-lg bg-white p-4 shadow-md">
    <h4 class="font-semibold">Feature 4</h4>
  </div>

  <!-- Feature 5 (1×1) -->
  <div class="rounded-lg bg-white p-4 shadow-md">
    <h4 class="font-semibold">Feature 5</h4>
  </div>
</div>
```

**Mobile responsiveness** (reset to col-span-1 on small screens):
```html
<div class="col-span-2 md:col-span-2 lg:col-span-2 row-span-2 md:row-span-2 lg:row-span-2">
  Hero Feature
</div>
```

### Example 2: Dashboard 4-Panel
```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Large metric (2×2) -->
  <div class="col-span-2 row-span-2 rounded-lg bg-blue-50 p-6 border border-blue-200">
    <h3 class="text-sm font-medium text-gray-600">Revenue</h3>
    <p class="text-4xl font-bold text-blue-600 mt-2">$45.2K</p>
  </div>

  <!-- Small metrics (1×1 each) -->
  <div class="rounded-lg bg-white p-4 border border-gray-200">
    <h4 class="text-xs font-medium text-gray-500">Users</h4>
    <p class="text-2xl font-bold text-gray-900 mt-1">1,234</p>
  </div>

  <div class="rounded-lg bg-white p-4 border border-gray-200">
    <h4 class="text-xs font-medium text-gray-500">Conversion</h4>
    <p class="text-2xl font-bold text-green-600 mt-1">3.2%</p>
  </div>

  <div class="rounded-lg bg-white p-4 border border-gray-200">
    <h4 class="text-xs font-medium text-gray-500">Avg. Order</h4>
    <p class="text-2xl font-bold text-gray-900 mt-1">$156</p>
  </div>

  <div class="rounded-lg bg-white p-4 border border-gray-200">
    <h4 class="text-xs font-medium text-gray-500">Growth</h4>
    <p class="text-2xl font-bold text-orange-600 mt-1">+12%</p>
  </div>
</div>
```

### Example 3: Portfolio Grid (L-Shape)
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- Large portfolio item top-left (2×2) -->
  <div class="col-span-2 row-span-2 rounded-lg overflow-hidden shadow-lg">
    <img src="hero-project.jpg" alt="Hero project" class="w-full h-full object-cover">
  </div>

  <!-- Projects on right (1×1 each) -->
  <div class="rounded-lg overflow-hidden shadow-md">
    <img src="project-2.jpg" alt="Project 2" class="w-full h-40 object-cover">
  </div>

  <div class="rounded-lg overflow-hidden shadow-md">
    <img src="project-3.jpg" alt="Project 3" class="w-full h-40 object-cover">
  </div>

  <!-- Projects below (1×1 each) -->
  <div class="rounded-lg overflow-hidden shadow-md">
    <img src="project-4.jpg" alt="Project 4" class="w-full h-40 object-cover">
  </div>

  <div class="rounded-lg overflow-hidden shadow-md">
    <img src="project-5.jpg" alt="Project 5" class="w-full h-40 object-cover">
  </div>
</div>
```

## Common Pitfalls

### Antipattern 1: Uniform Grids
**Bad** (defeats purpose of bento):
```html
<div class="grid grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <!-- all equal size -->
</div>
```
**Good**: Use spans to vary sizes and create emphasis.

### Antipattern 2: Not Testing Mobile
**Bad**: Bento layout on desktop works fine, but on mobile all items stack unevenly.
**Good**: Reset `col-span` and `row-span` on small breakpoints:
```html
<div class="col-span-2 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2">
```

### Antipattern 3: Too Many Cells
**Bad**: 20+ items in one bento grid becomes chaotic.
**Good**: Break into multiple grids or use pagination for large datasets.

### Antipattern 4: No Responsive Strategy
**Bad**: Fixed grid-cols-4 at all breakpoints.
**Good**: Use breakpoint prefixes to adjust column count:
```html
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

### Antipattern 5: Ignoring Gap Alignment
**Bad**: Gaps too large (gap-8) relative to card padding, makes content feel disconnected.
**Good**: Gap should be 1/2 to 1 times your card padding (padding-4 + gap-4 or gap-6).

### Antipattern 6: Text Overflow in Spanned Cells
**Bad**: 2×2 cell with long text doesn't wrap properly.
**Good**: Use `line-clamp-*` or `truncate` on long text in constrained cells:
```html
<h3 class="font-bold line-clamp-2">Long Title Here</h3>
```

## References

- **Bento Grid Inspiration**: [bentogrids.com](https://www.bentogrids.com/) — 600+ real-world examples
- **Tailwind CSS Grid**: [Tailwind Grid Docs](https://tailwindcss.com/docs/grid-column)
- **CSS Grid Spec**: [MDN CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- **Real-world examples**: Vercel, Linear, Apple, Framer, Notion homepages
- **Responsive Grid**: [Web Design Patterns - Responsive Grids](https://www.smashingmagazine.com/2018/04/grid-layout-tips-tricks/)
- **Related Skills**: `responsive-patterns`, `component-patterns`, `landing-page-patterns`
