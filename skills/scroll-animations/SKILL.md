---
name: scroll-animations
description: CSS scroll-driven animations using the Scroll-driven Animations spec. Replaces JavaScript scroll handlers with pure CSS animation-timeline. Covers scroll() and view() timelines, animation-range, scroll-snap patterns, parallax, progress bars, reveal-on-scroll entrance animations, and sticky header effects. Production-ready in Chrome 115+, Edge 115+, Firefox 110+, Safari 18+ (2026). Includes @supports feature detection, IntersectionObserver fallback, and mandatory prefers-reduced-motion accessibility. Trigger: "scroll animations", "scroll-driven", "parallax CSS", "progress bar", "reveal on scroll", "sticky effects".
version: 1.0.0
license: MIT
---

## Purpose

You are a scroll animation specialist building next-generation animations using the native Scroll-driven Animations spec. This skill covers pure CSS animations linked to scroll position or element visibility—no JavaScript scroll event handlers needed. Focus on `animation-timeline: scroll()` for container-linked animations (progress bars, parallax) and `animation-timeline: view()` for viewport-linked animations (entrance effects, intersection-triggered reveals). All patterns run on the compositor thread with zero jank. Target modern browsers (2026+) with graceful fallbacks via `@supports` and IntersectionObserver.

**Who uses it**: Front-end developers building high-performance sites, landing pages with scroll effects, dashboards with progress tracking, galleries with parallax.

**When to use it**: Replacing JavaScript scroll event handlers, building progress indicators, parallax hero images, staggered reveal-on-scroll effects, sticky header shrink animations, horizontal scroll galleries with snap points.

## When to Use

- **Progress indicators**: Scroll position progress bar (reads article depth).
- **Parallax effects**: Hero background moving slower than scroll (no jank, pure CSS).
- **Reveal-on-scroll**: Cards/sections fading in as they enter viewport.
- **Entrance animations**: Staggered text reveals tied to scroll progress.
- **Sticky headers**: Header padding/color changing as you scroll past threshold.
- **Horizontal scrolling**: Snap-to-section galleries with CSS `scroll-snap-*`.
- **Element exit effects**: Fade-out or scale-down as element leaves viewport.
- **Landing pages**: Hero scroll effects, section transitions.

**Not for**: 3D scroll animations (use Three.js). Animations on IE11 (use IntersectionObserver fallback). Touch/trackpad sensitivity concerns (test on mobile).

## Key Concepts

### Timeline Types: scroll() vs view()

**`animation-timeline: scroll()`** — Animation linked to scroll position of a scroll container.
- Progresses as user scrolls (0% = top, 100% = bottom)
- Used for: progress bars, horizontal scroll position tracking, parallax
- Example: Scroll through article, progress bar grows proportionally

**`animation-timeline: view()`** — Animation linked to an element's position *within* the viewport.
- Progresses as element enters/exits viewport (0% = off-screen, 100% = fully visible or exited)
- Used for: reveal-on-scroll, intersection-triggered entrances, exit animations
- Example: Card appears, fades in as it scrolls into view, fades out as it scrolls away

### animation-range Property

Controls when animation starts/ends relative to scroll position:

| Value | Behavior |
|-------|----------|
| `entry 0% entry 100%` | Trigger when element enters viewport, animate through entry phase |
| `entry 50% cover 50%` | Start when element is 50% visible, end when it covers 50% of viewport |
| `exit 0% exit 100%` | Trigger as element exits, complete when fully off-screen |
| `0px 200px` | Start animation at scroll pos 0, end at 200px |
| *(default: full range)* | Animation progresses across entire scroll timeline |

### Compositor Performance (CRITICAL)

Scroll-driven animations run on the compositor thread — **no JavaScript execution, no paint, no layout recalculation**. Only `transform` and `opacity` are compositor-safe:

**Safe to animate**:
- `transform: translateX/Y/Z, rotateX/Y/Z, scale, skew`
- `opacity`

**NEVER animate** (causes paint jank even in scroll-driven mode):
- `width`, `height`, `margin`, `padding`
- `top`, `left`, `right`, `bottom` (use `transform: translate()` instead)
- `background`, `border`, `box-shadow`

### Browser Support & Feature Detection

**2026 Support**:
- Chrome 115+ ✓
- Edge 115+ ✓
- Firefox 110+ ✓
- Safari 18+ ✓
- Older browsers: Use `@supports` to conditionally apply, fallback to IntersectionObserver

**Detection pattern**:
```css
@supports (animation-timeline: scroll()) {
  /* Scroll-driven animation code */
}
@supports not (animation-timeline: scroll()) {
  /* Fallback: static display or IntersectionObserver */
}
```

### Reduced Motion Requirement

Users with vestibular disorders or migraines enable `prefers-reduced-motion: reduce`. Scroll animations MUST be disabled or simplified:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Instructions

### Pattern 1: Scroll Progress Bar

Article progress indicator—bar grows from 0% to 100% as you scroll through the page.

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--color-primary);
  transform-origin: left;
  animation: grow-progress linear;
  animation-timeline: scroll();
  z-index: 999;
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    animation: none;
    transform: scaleX(1);
  }
}
```

**HTML**:
```html
<div class="progress-bar"></div>
<article>Content here...</article>
```

---

### Pattern 2: Fade-In Reveal on Scroll (view() Timeline)

Cards fade in and slide up as they enter the viewport.

```css
.reveal-card {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal-fade linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal-fade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-card {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**HTML**:
```html
<div class="reveal-card">Card 1</div>
<div class="reveal-card">Card 2</div>
<div class="reveal-card">Card 3</div>
```

---

### Pattern 3: Parallax Without JavaScript

Hero background moves slower than scroll—classic parallax effect without jank.

```css
.parallax-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%; /* Taller to prevent bottom cutoff */
  background: url('hero.jpg') center / cover no-repeat;
  animation: parallax linear;
  animation-timeline: scroll(nearest);
}

@keyframes parallax {
  from { transform: translateY(-100px); }
  to { transform: translateY(100px); }
}

@media (prefers-reduced-motion: reduce) {
  .parallax-bg {
    animation: none;
    transform: none;
  }
}
```

**HTML**:
```html
<section class="parallax-section">
  <div class="parallax-bg"></div>
  <div class="relative z-10 text-white text-center pt-40">
    <h1>Hero Title</h1>
  </div>
</section>
```

---

### Pattern 4: Scroll-Snap Horizontal Gallery

Cards snap to position as you scroll horizontally. Pure CSS, no JavaScript.

```css
.scroll-gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem;
  gap: 1rem;
  padding: 1rem;
}

.scroll-gallery-card {
  flex: 0 0 calc(100vw - 2rem);
  scroll-snap-align: center;
  scroll-snap-stop: always;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
  .scroll-gallery-card {
    flex: 0 0 calc(50vw - 1.5rem);
  }
}

@media (min-width: 1024px) {
  .scroll-gallery-card {
    flex: 0 0 calc(25vw - 1.25rem);
  }
}
```

**HTML**:
```html
<div class="scroll-gallery">
  <div class="scroll-gallery-card">Card 1</div>
  <div class="scroll-gallery-card">Card 2</div>
  <div class="scroll-gallery-card">Card 3</div>
</div>
```

---

### Pattern 5: Sticky Header with Scroll-Linked Shrink

Header padding shrinks as you scroll, compacting the nav bar.

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: shrink-header linear both;
  animation-timeline: scroll();
  animation-range: 0px 200px;
}

@keyframes shrink-header {
  from {
    padding-block: 1.5rem;
    font-size: 1.25rem;
  }
  to {
    padding-block: 0.5rem;
    font-size: 1rem;
  }
}

.header nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .header {
    animation: none;
    padding-block: 1rem;
  }
}
```

---

### Pattern 6: Element Exit Animation

Elements fade out and scale down as they scroll away (exit animation).

```css
.exit-animation {
  animation: fade-exit linear both;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}

@keyframes fade-exit {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .exit-animation {
    animation: none;
    opacity: 1;
    transform: scale(1);
  }
}
```

---

### Fallback Strategy: Feature Detection + IntersectionObserver

For browsers without scroll-driven animations support, detect and fall back:

```css
@supports (animation-timeline: scroll()) {
  /* Modern scroll-driven animation */
  .progress-bar {
    animation: grow-progress linear;
    animation-timeline: scroll();
  }
}

@supports not (animation-timeline: scroll()) {
  /* Fallback: use IntersectionObserver in JavaScript */
  .progress-bar {
    display: none; /* Or static implementation */
  }
}
```

**JavaScript fallback** (IntersectionObserver for view-based animations):

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-scroll-animate]').forEach(el => {
  observer.observe(el);
});
```

```css
.reveal-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Examples

### Example 1: Landing Page with Scroll Effects

Hero section + progress bar + staggered card reveals + parallax + sticky header.

```html
<!-- Progress Bar (scroll-driven) -->
<div class="progress-bar"></div>

<!-- Sticky Header (scroll-shrink) -->
<header class="header">
  <nav>Navigation</nav>
</header>

<!-- Hero (parallax background) -->
<section class="parallax-section">
  <div class="parallax-bg"></div>
  <h1 class="relative z-10">Hero Title</h1>
</section>

<!-- Features (reveal on scroll) -->
<section class="py-20">
  <div class="grid grid-cols-3 gap-8">
    <div class="reveal-card">Feature 1</div>
    <div class="reveal-card">Feature 2</div>
    <div class="reveal-card">Feature 3</div>
  </div>
</section>

<!-- Gallery (horizontal scroll with snap) -->
<section class="py-20">
  <div class="scroll-gallery">
    <div class="scroll-gallery-card">Gallery 1</div>
    <div class="scroll-gallery-card">Gallery 2</div>
    <div class="scroll-gallery-card">Gallery 3</div>
  </div>
</section>
```

---

### Example 2: Blog Article with Progress Tracking

Article layout with sticky progress bar, section headings reveal as you scroll, and exit animation for footer.

```html
<div class="progress-bar"></div>

<article class="max-w-2xl mx-auto py-12">
  <h1 class="reveal-card">Article Title</h1>

  <section class="my-12">
    <h2 class="reveal-card">Section 1</h2>
    <p>Content...</p>
  </section>

  <section class="my-12">
    <h2 class="reveal-card">Section 2</h2>
    <p>Content...</p>
  </section>

  <footer class="exit-animation py-8 border-t">
    <p>Related articles...</p>
  </footer>
</article>
```

---

## Common Pitfalls

1. **Animating layout properties** — Use `transform`/`opacity` only. Never `width`, `height`, `margin`, `padding`.
2. **No `@supports` fallback** — Wrap in `@supports (animation-timeline: scroll())` with IntersectionObserver fallback.
3. **Missing `prefers-reduced-motion`** — Always disable/simplify animations for vestibular disorder users.
4. **Confusing `scroll()` and `view()`** — `scroll()` = container progress (progress bars). `view()` = element visibility (reveal-on-scroll).
5. **Not setting `animation-range`** — Defaults to full range. Explicitly set `entry 0% entry 100%` etc.
6. **Parallax too large** — Keep 50-150px offset. 300px+ is disorienting on trackpad/touch.
7. **Non-compositor properties** — Don't animate `box-shadow`, `border`, `background-color` on scroll.
8. **Over-animation** — Reserve scroll effects for hero and key sections. Not everything.

## References

- **MDN Scroll-driven Animations**: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline
- **Chrome Developers Blog**: https://developer.chrome.com/blog/scroll-driven-animations/
- **W3C Spec**: https://drafts.csswg.org/scroll-animations-1/
- **Related Skills**: `motion-design`, `responsive-patterns`
