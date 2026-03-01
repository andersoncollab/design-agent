---
name: page-transitions
description: Seamless page navigation transitions using the View Transitions API. Covers cross-fade, slide, morph (shared element transitions), and framework integrations for Next.js, Astro, and vanilla MPA. Trigger: "add page transitions", "smooth navigation", "view transitions", "shared element morph", "page navigation animation".
version: 1.0.0
license: MIT
---

## Purpose

You are a page transition specialist. This skill covers the browser-native View Transitions API for animating between page states without JavaScript animation libraries. Handles cross-fade, slide, and shared element morphing transitions. Works with both SPA (single-page apps) and MPA (multi-page apps) architectures, with framework-specific integrations for Next.js, Astro, and vanilla HTML.

**Who**: Frontend developers, interaction designers, web performance engineers.

**When**: Adding smooth page navigation, implementing shared element transitions (card expand to detail), preventing jarring layout shifts on route changes, enhancing user perception of app responsiveness.

## When to Use

- New SPA/MPA with smooth navigation requirement
- E-commerce product list → detail page (shared hero image)
- Multi-step form/wizard (sequential slide transition)
- Mobile app-like web experience
- Progressive enhancement (fallback for older browsers)
- Reducing perceived latency during navigation

## Key Concepts

### View Transitions API Fundamentals

The View Transitions API is a browser-native mechanism for animating DOM updates. Here's what happens:

1. **Capture**: Browser takes a screenshot of current DOM state (`::view-transition-old`)
2. **Update**: JavaScript updates the DOM (route change, component state change)
3. **Capture Again**: Browser takes screenshot of new state (`::view-transition-new`)
4. **Animate**: Browser cross-fades between old and new screenshots using CSS animations

This happens automatically — no manual animation code needed.

### MPA vs SPA

**MPA (Multi-Page App)**: Traditional website with full page reloads. Browser handles navigation. Use `@view-transition` CSS at-rule for automatic transitions on all navigation.

**SPA (Single-Page App)**: Client-side routing with DOM updates (React, Vue, Svelte). Use `document.startViewTransition()` to wrap state updates with transition animation.

### Shared Element Transitions

**The Key Innovation**: Give the same `view-transition-name` CSS property to an element on both pages. The browser automatically morphs between them.

Example: Product card on list page → same image on detail page. Both elements get `view-transition-name: product-hero`. Browser morphs position, size, and appearance from list to detail state.

### Pseudo-Elements Reference

| Pseudo-Element | What It Is | Use Case |
|---|---|---|
| `::view-transition-old(name)` | Screenshot of outgoing element | Customize exit animation |
| `::view-transition-new(name)` | Screenshot of incoming element | Customize enter animation |
| `::view-transition-group(name)` | Container holding old + new | Animate position/scale |
| `::view-transition-image-pair(name)` | Holds both old and new | Morph animations |

### Browser Support & Fallback

View Transitions API is supported in Chrome 111+, Edge 111+, Opera 97+. Firefox and Safari coming soon (as of Feb 2026).

**Fallback strategy**: Always check `if (document.startViewTransition)` before using. If unsupported, fall back to instant navigation.

## Instructions

### Step 1: Basic Cross-Fade (MPA)

For multi-page apps, enable automatic transitions via CSS:

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}
```

**What this does**: Every navigation (click, form submit) gets a 300ms fade transition.

**Add to**: Global stylesheet (base.css or main.css).

### Step 2: Slide Transition (Sequential Navigation)

For wizards and multi-step flows:

```css
::view-transition-old(root) { animation: slide-out-left 0.4s ease-out; }
::view-transition-new(root) { animation: slide-in-right 0.4s ease-out; }

@keyframes slide-out-left { to { transform: translateX(-100%); opacity: 0; } }
@keyframes slide-in-right { from { transform: translateX(100%); opacity: 0; } }
```

### Step 3: Shared Element Morph (Card to Detail)

E-commerce example: Product card image on list page morphs to hero on detail page.

**List Page:**
```html
<a href="/products/123">
  <img src="/products/123.jpg" style="view-transition-name: product-hero;" alt="Product" />
  <p>Product Name</p>
</a>
```

**Detail Page:**
```html
<img src="/products/123.jpg" style="view-transition-name: product-hero;" alt="Product" class="hero-large" />
<h1>Product Name</h1>
```

**CSS for morph animation:**
```css
::view-transition-old(product-hero) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(product-hero) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }
```

The browser automatically handles position and size morphing. You only animate opacity.

**Important**: `view-transition-name` must be unique per page. Two elements on the same page with the same name will break the transition.

### Step 4: SPA Navigation with document.startViewTransition()

For React, Vue, or Svelte, wrap route changes:

```typescript
const navigate = (path: string) => {
  if (!document.startViewTransition) {
    router.push(path);
    return;
  }
  document.startViewTransition(() => router.push(path));
};
```

**React component:**
```tsx
<button onClick={() => navigate(`/products/${id}`)}>
  <img style={{ viewTransitionName: `product-${id}` }} src={image} alt={title} />
</button>
```

### Step 5: Astro View Transitions

Astro has a built-in component that handles all navigation automatically:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <img
      src={productImage}
      transition:name={`product-${productId}`}
      alt="Product"
    />
  </body>
</html>
```

**How it works**: The `<ViewTransitions />` component intercepts all `<a>` navigation and wraps with `startViewTransition()`.

**Global transition animation** (applies to all routes):

```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<style>
  ::view-transition-old(root) {
    animation: fade-out 0.3s ease-out;
  }

  ::view-transition-new(root) {
    animation: fade-in 0.3s ease-in;
  }

  @keyframes fade-out { to { opacity: 0; } }
  @keyframes fade-in { from { opacity: 0; } }
</style>
```

### Step 6: Next.js Integration

Next.js doesn't have built-in View Transitions yet. Implement in a router wrapper:

```typescript
'use client';
export function useViewTransition() {
  const router = useRouter();
  return (href: string) => {
    if (!document.startViewTransition) return router.push(href);
    document.startViewTransition(() => router.push(href));
  };
}
```

Add to `app/layout.css`:
```css
::view-transition-old(root) { animation: fade-out 0.3s ease-out; }
::view-transition-new(root) { animation: fade-in 0.3s ease-in; }
```

### Step 7: Reduced Motion Support (Mandatory)

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
```

This ensures transitions complete instantly for users who prefer reduced motion (accessibility requirement).

## Transition Type Selection Guide

| Type | Use Case | Duration | Direction |
|---|---|---|---|
| **Cross-fade** | Default between unrelated pages | 200-300ms | Neutral |
| **Slide left/right** | Sequential (wizard, onboarding) | 300-400ms | Forward → left out, right in |
| **Slide up** | Modal/sheet open | 300ms | Up in |
| **Morph** | Same element on both pages | 300-500ms | Morphs automatically |
| **Zoom** | Expand (gallery, preview) | 300-400ms | Center outward |
| **Blur to sharp** | Focus transitions | 300ms | Blur ↔ sharp |

## Examples

### Example 1: E-Commerce Product List → Detail

**List Page (Astro):**
```astro
---
import { ViewTransitions } from 'astro:transitions';
const products = await getProducts();
---

<html>
  <head>
    <ViewTransitions />
    <style>
      ::view-transition-old(root) { animation: fade-out 0.3s ease-out; }
      ::view-transition-new(root) { animation: fade-in 0.3s ease-in; }
      @keyframes fade-out { to { opacity: 0; } }
      @keyframes fade-in { from { opacity: 0; } }
    </style>
  </head>
  <body>
    <div class="grid grid-cols-3 gap-4">
      {products.map(p => (
        <a href={`/product/${p.id}`} class="group">
          <img
            src={p.image}
            transition:name={`hero-${p.id}`}
            class="w-full h-48 object-cover rounded"
            alt={p.name}
          />
          <p class="mt-2">{p.name}</p>
        </a>
      ))}
    </div>
  </body>
</html>
```

**Detail Page (Astro):**
```astro
---
import { ViewTransitions } from 'astro:transitions';
const { id } = Astro.params;
const product = await getProduct(id);
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <img
      src={product.image}
      transition:name={`hero-${id}`}
      class="w-full h-96 object-cover rounded-lg"
      alt={product.name}
    />
    <h1>{product.name}</h1>
    <p>{product.description}</p>
  </body>
</html>
```

**Result**: When clicking a product, the image morphs smoothly from list size to detail size. Surrounding content fades in.

### Example 2: Multi-Step Form (Slide Transitions)

For wizards, use slide transitions to show progression:

```css
::view-transition-old(root) { animation: slide-out-left 0.4s ease-out; }
::view-transition-new(root) { animation: slide-in-right 0.4s ease-out; }

@keyframes slide-out-left { to { transform: translateX(-100%); opacity: 0; } }
@keyframes slide-in-right { from { transform: translateX(100%); opacity: 0; } }
```

Each form step slides left as next step enters from right, creating sense of linear progression.

## Common Pitfalls

### Pitfall 1: Duplicate view-transition-name on Same Page

**Problem**: Two elements with the same `view-transition-name` on one page. Browser doesn't know which to morph.

**Fix**: Ensure each `view-transition-name` is globally unique per navigation event.

```html
<!-- Bad: two images with same name -->
<img style="view-transition-name: hero" src="a.jpg" />
<img style="view-transition-name: hero" src="b.jpg" />

<!-- Good: unique names -->
<img style="view-transition-name: hero-main" src="a.jpg" />
<img style="view-transition-name: hero-secondary" src="b.jpg" />
```

### Pitfall 2: Transitions Too Slow

**Problem**: Duration > 500ms feels sluggish. Navigation feels unresponsive.

**Fix**: Keep transitions between 200-400ms. Longer than 500ms feels like lag.

```css
/* Bad */ animation: fade-out 800ms;
/* Good */ animation: fade-out 300ms;
```

### Pitfall 3: No Fallback for Unsupported Browsers

**Problem**: Code crashes on Firefox/Safari (no View Transitions support).

**Fix**: Always check `document.startViewTransition` existence before using.

```typescript
/* Bad */
document.startViewTransition(() => navigate(path));

/* Good */
if (document.startViewTransition) {
  document.startViewTransition(() => navigate(path));
} else {
  navigate(path); // Instant fallback
}
```

### Pitfall 4: Morphing Highly Different Aspect Ratios

**Problem**: Morph between 200px tall card image and 600px tall detail image. Result looks distorted/stretched.

**Fix**: Avoid morphing between drastically different sizes. If required, combine morph with fade:

```css
::view-transition-old(product) {
  animation: fade-out 0.3s;
}

::view-transition-new(product) {
  animation: fade-in 0.3s;
}

/* Browser handles size morph automatically, fade masks awkwardness */
```

### Pitfall 5: Missing prefers-reduced-motion Handling

**Problem**: Users with motion sensitivity get disorienting transitions. Accessibility fail.

**Fix**: Respect `prefers-reduced-motion: reduce` by making animations instant.

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.01ms !important;
  }
}
```

### Pitfall 6: Using Transitions for Every UI Interaction

**Problem**: Transitions on hover, click, focus, modal open, etc. Feels overwhelming.

**Fix**: Reserve transitions for **page-level navigation only**. Use CSS for micro-interactions.

```typescript
/* Bad: transition on every click */
button.addEventListener('click', () => {
  document.startViewTransition(() => { /* ... */ });
});

/* Good: transition only on link navigation */
a.addEventListener('click', (e) => {
  if (e.target.hasAttribute('href')) {
    document.startViewTransition(() => navigate(e.target.href));
  }
});
```

### Pitfall 7: Layout Shift During Transition

**Problem**: Transition captures old layout, updates DOM, new layout different sizes. Visible jank.

**Fix**: Ensure both old and new pages have same layout dimensions. Use CSS `view-transition-skip` if needed.

```css
/* Skip transition for elements that change layout */
.sidebar { view-transition-skip: skip; }
```

## References

- **MDN View Transitions API**: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- **Chrome DevTools View Transitions**: https://developer.chrome.com/docs/web-platform/view-transitions/
- **Astro View Transitions**: https://docs.astro.build/en/guides/view-transitions/
- **WebAIM: Accessibility and Motion**: https://webaim.org/articles/media/
- **Related Skills**: `motion-design`, `scroll-animations`, `dark-mode` (theme transitions)
