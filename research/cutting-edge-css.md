# Cutting-Edge CSS Features (2026)

Reference for modern CSS capabilities used across design-agent skills.

## Scroll-Driven Animations
**Skill:** `scroll-animations`
**Status:** Chrome 115+, Edge 115+, Firefox 110+, Safari 18+

```css
.element {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

- `animation-timeline: scroll()` — animation tied to scroll position
- `animation-timeline: view()` — animation tied to element visibility
- `animation-range` — controls start/end of animation
- Runs on compositor thread (no jank)
- Feature detect: `@supports (animation-timeline: scroll())`

## View Transitions API
**Skill:** `page-transitions`
**Status:** Chrome 111+, Edge 111+, Safari 18+, Firefox behind flag

```css
@view-transition { navigation: auto; }
.card-image { view-transition-name: hero-image; }
```

- Cross-fade between page states (MPA or SPA)
- Shared element morphing via `view-transition-name`
- Pseudo-elements: `::view-transition-old()`, `::view-transition-new()`
- SPA: `document.startViewTransition(callback)`
- Feature detect: `if (document.startViewTransition)`

## Container Queries
**Skill:** `responsive-patterns`
**Status:** All modern browsers (Chrome 105+, Safari 16+, Firefox 110+)

```css
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

- Component-level responsive design (not viewport)
- `container-type: inline-size` or `size`
- `@container` queries check parent container dimensions
- Container query units: `cqw`, `cqh`, `cqi`, `cqb`

## CSS Nesting
**Status:** All modern browsers (Chrome 120+, Safari 17.2+, Firefox 117+)

```css
.card {
  background: white;
  & .title { font-size: 1.5rem; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  @media (width >= 768px) { padding: 2rem; }
}
```

## Anchor Positioning
**Status:** Chrome 125+, Edge 125+

```css
.tooltip {
  position: absolute;
  anchor-name: --trigger;
  top: anchor(--trigger bottom);
  left: anchor(--trigger center);
}
```

- Position elements relative to any other element (not just parent)
- Replaces JavaScript tooltip/popover positioning
- `position-try` for fallback positioning

## Color Functions
**Status:** Widely supported

```css
:root {
  --primary: oklch(65% 0.25 250);
  --primary-light: oklch(from var(--primary) calc(l + 0.15) c h);
}
```

- `oklch()` — Perceptually uniform color space
- `color-mix()` — Blend two colors
- `light-dark()` — Automatic dark mode value selection
- Relative color syntax: `oklch(from var(--color) l c h)`

## W3C Design Tokens (DTCG)
**Skill:** `design-tokens`
**Status:** First stable spec (October 2025)

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#3b82f6",
      "$description": "Brand primary blue"
    }
  }
}
```

- Vendor-neutral JSON format for design token interchange
- 15 token types (color, dimension, fontFamily, shadow, etc.)
- Alias references: `"$value": "{color.blue.500}"`
- Transforms to: CSS custom properties, Tailwind config, Figma variables
