---
name: responsive-patterns
description: Responsive design patterns and breakpoint strategies for modern web. Mobile-first Tailwind CSS patterns, fluid typography with clamp(), container queries, responsive images (srcset, picture), touch targets, and viewport-aware layouts. Covers the 4 standard breakpoints (375/768/1024/1440), common layout shifts, and testing methodology. Trigger: "make responsive", "mobile layout", "breakpoint strategy", "fluid typography", "responsive images".
version: 1.0.0
license: MIT
---

# Responsive Design Patterns Skill

## Purpose

You are a responsive design specialist. This skill provides production-ready patterns for building layouts that work seamlessly from 320px mobile to 2560px ultrawide. Focus on Tailwind CSS mobile-first approach, fluid typography, container queries, responsive images, and touch-friendly interactions. Every layout you build must pass mobile-first design reviews with zero usability friction on small screens.

## When to Use

- Making any layout responsive
- Choosing breakpoint strategy for a new component
- Implementing fluid typography that scales smoothly
- Optimizing images for multiple screen sizes
- Fixing mobile usability issues or layout shifts
- Sizing touch targets for accessibility
- Building responsive navigation patterns
- Handling responsive tables, forms, or grids

## The Four Breakpoints

| Name | Width | Tailwind | Devices | Use Case |
|------|-------|----------|---------|----------|
| Mobile | 0-767px | default | iPhone, small Android | Base styles, hamburger nav, single-column |
| Tablet | 768-1023px | `md:` | iPad, large phones landscape | Two-column layouts, expanded nav, medium spacing |
| Desktop | 1024-1439px | `lg:` | Laptops, small monitors | Three-column layouts, full navigation, optimal reading |
| Large | 1440px+ | `xl:` | Desktop monitors, ultrawide | Four+ columns, maximum content width, expanded whitespace |

## Mobile-First Principle

Write base styles for mobile, then progressively enhance with `md:`, `lg:`, `xl:` prefixes. Never write desktop-first then attempt to "fix" mobile—this inverts complexity and creates override spaghetti.

```html
<!-- CORRECT: Mobile base, enhance up -->
<div class="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
  Content
</div>

<!-- WRONG: Desktop base, constrain down -->
<div class="text-2xl sm:text-xl xs:text-sm px-12 sm:px-8 xs:px-4">
  Content
</div>
```

## Fluid Typography with clamp()

Modern responsive typography scales continuously between breakpoints instead of jumping sizes. Use CSS `clamp()` for headings and body text.

### Formula for clamp()
```
clamp(min-size, preferred-size, max-size)
```

Calculate preferred size: `(max-size - min-size) / (max-vp-width - min-vp-width) * 100vw + offset`

### Production Examples

```css
/* Fluid heading: 24px at 375px → 48px at 1440px */
font-size: clamp(1.5rem, 1rem + 2.25vw, 3rem);

/* Fluid subheading: 18px at 375px → 32px at 1440px */
font-size: clamp(1.125rem, 0.75rem + 1.5vw, 2rem);

/* Fluid body: 16px at 375px → 18px at 1440px */
font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);

/* Fluid large text: 18px at 375px → 24px at 1440px */
font-size: clamp(1.125rem, 0.875rem + 1vw, 1.5rem);
```

Use Tailwind's `text-` utilities for defaults, then override with `style="font-size: clamp(...)"` for fluid scaling on critical elements.

## Touch Targets and Accessibility

Minimum 44×44px (WCAG 2.5.5 Level AAA). All interactive elements on mobile must be easily tappable.

```html
<!-- Button with proper touch target -->
<button class="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg bg-primary text-white">
  Tap Me
</button>

<!-- Link with proper spacing -->
<a href="/about" class="block py-3 px-4 hover:bg-gray-100">
  About
</a>

<!-- Form input -->
<input type="text" class="min-h-[44px] px-4 py-3 border border-gray-300 rounded-lg">
```

## Container Queries (Modern CSS)

Respond to parent container width instead of viewport width. Better for reusable components that work in different layouts.

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

Use in Tailwind with @tailwindcss/container-queries plugin.

## Production Patterns

### 1. Responsive Navigation

Hamburger menu on mobile, horizontal nav on desktop.

```html
<nav class="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
  <a href="/" class="text-lg font-bold text-gray-900">Logo</a>

  <!-- Mobile menu button -->
  <button
    id="menu-btn"
    class="md:hidden p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100"
    aria-label="Toggle menu"
    aria-expanded="false"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Desktop navigation -->
  <div class="hidden md:flex items-center gap-1 lg:gap-2">
    <a href="/about" class="px-3 py-2 text-sm lg:text-base hover:text-primary hover:bg-gray-50 rounded-lg">About</a>
    <a href="/services" class="px-3 py-2 text-sm lg:text-base hover:text-primary hover:bg-gray-50 rounded-lg">Services</a>
    <a href="/blog" class="px-3 py-2 text-sm lg:text-base hover:text-primary hover:bg-gray-50 rounded-lg">Blog</a>
    <a href="/contact" class="px-4 py-2 ml-2 bg-primary text-white text-sm lg:text-base rounded-lg hover:bg-primary-dark">Contact</a>
  </div>
</nav>

<!-- Mobile menu (hidden, shown via JS) -->
<div id="mobile-menu" class="hidden md:hidden flex flex-col gap-2 p-4 bg-gray-50 border-b border-gray-200">
  <a href="/about" class="block px-4 py-3 rounded-lg hover:bg-gray-200">About</a>
  <a href="/services" class="block px-4 py-3 rounded-lg hover:bg-gray-200">Services</a>
  <a href="/blog" class="block px-4 py-3 rounded-lg hover:bg-gray-200">Blog</a>
  <a href="/contact" class="block px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark">Contact</a>
</div>
```

### 2. Responsive Grid

Adapts from 1 column mobile to 2 tablet to 3 desktop.

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-16">
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 1</div>
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 2</div>
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 3</div>
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 4</div>
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 5</div>
  <div class="bg-white rounded-lg shadow p-6 md:p-8">Card 6</div>
</div>
```

### 3. Fluid Hero Section

Full-viewport mobile, contained desktop with properly sized headline.

```html
<section class="min-h-[80vh] md:min-h-[60vh] lg:min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-24">
  <div class="max-w-7xl mx-auto w-full">
    <h1
      class="font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8"
      style="font-size: clamp(1.875rem, 1.25rem + 3vw, 3.75rem);"
    >
      Transform Your Digital Presence
    </h1>
    <p
      class="text-gray-600 max-w-2xl mb-6 md:mb-8 lg:mb-10"
      style="font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);"
    >
      Build responsive, accessible websites that work on every device. Mobile-first design that converts.
    </p>
    <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
      <a href="/get-started" class="px-6 py-3 md:py-4 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium text-center min-h-[44px] flex items-center justify-center">
        Get Started
      </a>
      <a href="/learn" class="px-6 py-3 md:py-4 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium text-center min-h-[44px] flex items-center justify-center">
        Learn More
      </a>
    </div>
  </div>
</section>
```

### 4. Responsive Images with srcset

Serve appropriately sized images based on device width.

```html
<img
  src="/hero-800.jpg"
  srcset="
    /hero-400.jpg 400w,
    /hero-800.jpg 800w,
    /hero-1200.jpg 1200w,
    /hero-1600.jpg 1600w,
    /hero-2000.jpg 2000w
  "
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1200px) 85vw,
    1200px
  "
  alt="Hero image demonstrating responsive design"
  class="w-full h-auto object-cover rounded-lg"
  loading="lazy"
  decoding="async"
  width="1200"
  height="600"
>
```

### 5. Responsive Spacing Scale

Tighter on mobile, roomier on desktop.

```html
<section class="py-8 md:py-12 lg:py-16 xl:py-20 px-4 md:px-6 lg:px-8 xl:px-16">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-12">
      Features
    </h2>
    <div class="space-y-6 md:space-y-8 lg:space-y-12">
      <div class="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
        <div class="w-full md:w-1/3">Image</div>
        <div class="w-full md:w-2/3">Content</div>
      </div>
    </div>
  </div>
</section>
```

### 6. Responsive Table

Horizontal scroll on mobile, full table on desktop.

```html
<div class="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
  <table class="min-w-[600px] md:w-full border-collapse">
    <thead>
      <tr class="bg-gray-100 border-b border-gray-300">
        <th class="px-4 py-3 text-left text-sm font-semibold">Feature</th>
        <th class="px-4 py-3 text-left text-sm font-semibold">Mobile</th>
        <th class="px-4 py-3 text-left text-sm font-semibold">Desktop</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-200 hover:bg-gray-50">
        <td class="px-4 py-3 text-sm">Touch Target</td>
        <td class="px-4 py-3 text-sm">44×44px</td>
        <td class="px-4 py-3 text-sm">40×40px</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 7. Container Query Component

Adapts based on parent width, not viewport.

```html
<div class="@container">
  <div class="flex flex-col @[400px]:flex-row @[400px]:items-center gap-4 bg-white rounded-lg p-4 @[400px]:p-6">
    <img
      src="image.jpg"
      alt="Product"
      class="w-full @[400px]:w-48 h-48 object-cover rounded-lg flex-shrink-0"
    >
    <div class="flex-1">
      <h3 class="text-lg @[400px]:text-xl font-bold text-gray-900">Product Title</h3>
      <p class="text-sm @[400px]:text-base text-gray-600 mt-2">Product description and details here.</p>
      <button class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark min-h-[44px]">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

## Example: Responsive Product Grid

A grid component using container queries and fluid typography, adapts from 1-2 columns on mobile to 3-4 on desktop:

```html
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4 @sm:gap-6 @lg:gap-8">
    <article class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <!-- Image with aspect ratio to prevent shift -->
      <div class="aspect-square overflow-hidden bg-gray-200">
        <img
          src="product-800.jpg"
          srcset="product-400.jpg 400w, product-800.jpg 800w"
          alt="Product name"
          class="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>

      <!-- Content with fluid typography -->
      <div class="p-4 @sm:p-5 @lg:p-6">
        <h3
          class="font-bold text-gray-900 line-clamp-2"
          style="font-size: clamp(1rem, 0.9rem + 1vw, 1.25rem);"
        >
          Product Name
        </h3>
        <p class="text-gray-600 text-sm @sm:text-base mt-2 line-clamp-2">
          Brief product description
        </p>

        <!-- Price and button with touch target -->
        <div class="mt-4 flex items-center justify-between">
          <span class="text-lg @sm:text-xl font-bold text-gray-900">$99</span>
          <button class="min-h-[44px] min-w-[44px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm @sm:text-base">
            Add
          </button>
        </div>
      </div>
    </article>
    <!-- Repeat grid items -->
  </div>
</div>
```

Uses container queries (`@sm`, `@lg`) instead of viewport breakpoints, allowing the grid to adapt whether displayed full-width or in a sidebar. Fluid typography scales smoothly between breakpoints without jarring jumps.

## Common Pitfalls

1. **Desktop-first design then "fixing" mobile** — Inverts complexity, creates CSS override spaghetti. Always start with mobile constraints.

2. **Fixed pixel widths** — Avoid `width: 1200px`. Use `max-w-`, percentages, or Tailwind utilities. Breaks on smaller screens.

3. **Touch targets smaller than 44×44px** — Causes mobile usability failures. Google Search Console flags this. Always test with your actual hand on mobile.

4. **Missing viewport meta tag** — `<meta name="viewport" content="width=device-width, initial-scale=1">` is REQUIRED in `<head>`. Without it, Safari iOS scales everything.

5. **High-resolution images on mobile without srcset** — 4K images on a 375px phone waste 4MB+ of bandwidth. Always use srcset with appropriately sized variants.

6. **Hiding content on mobile with `display: none`** — Still downloads the DOM element and any child images. Use responsive loading or `<picture>` element instead.

7. **Ignoring safe areas on notched phones** — iPhone 14+ needs `env(safe-area-inset-*)` for critical content. Avoid placing CTA buttons in notch overlap.

```html
<!-- Safe area example -->
<div class="px-4" style="padding-left: max(1rem, env(safe-area-inset-left)); padding-right: max(1rem, env(safe-area-inset-right));">
  Content
</div>
```

## Testing Checklist

- [ ] Open DevTools (F12) → Device Toolbar (Cmd+Shift+M)
- [ ] Test at 375px (iPhone SE), 768px (iPad), 1024px (small laptop), 1440px (desktop)
- [ ] Verify no horizontal scroll at any breakpoint
- [ ] Check touch targets are ≥44×44px on mobile
- [ ] Inspect image sizes with Network tab (should be <150KB on mobile, <400KB on desktop)
- [ ] Test on real device if possible—DevTools doesn't replicate notches or safe areas
- [ ] Check landscape orientation on mobile
- [ ] Verify no layout shift when images load (use `aspect-ratio` or fixed dimensions)

## References

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Web.dev Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
- [MDN Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
- [WCAG 2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Web.dev Responsive Images](https://web.dev/responsive-images/)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- **Related Skills**: `bento-layout`, `component-patterns`, `design-tokens`
