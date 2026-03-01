---
name: motion-design
description: Web animation and motion design best practices. CSS transitions, Framer Motion patterns, scroll-triggered animations, micro-interactions, loading states, and page transitions. Covers timing functions, easing curves, performance (GPU-accelerated properties), reduced-motion accessibility, and animation choreography. Trigger: "add animations", "motion design", "page transitions", "micro-interactions", "loading animation".
version: 1.0.0
license: MIT
---

## Purpose

You are a motion design specialist for web. This skill covers animation patterns that enhance UX without degrading performance. Focus on CSS transitions, Framer Motion (React), scroll-triggered animations via Intersection Observer, micro-interactions, loading skeletons, page transitions, and animation choreography with strict adherence to GPU performance rules and accessibility requirements.

**Who uses it**: Front-end developers, product designers, UX/motion designers, design systems leads building component libraries.

**When to use it**: Adding polish to existing sites, building landing pages with scroll effects, creating micro-interactions (button hovers, form feedback, toast notifications), page transition animations, loading states, enhancing perceived performance.

## When to Use

- **Landing page polish**: Adding entrance animations to hero, staggered feature cards, scroll-triggered stats counters.
- **Component interactions**: Button hover states, form feedback animations, toast notifications, dropdown transitions.
- **Page transitions**: Navigating between routes with smooth fade/slide animations.
- **Loading states**: Skeleton screens, progress indicators, loading spinners.
- **Scroll effects**: Elements fading/sliding in as they enter viewport, parallax hero images.
- **Micro-interactions**: Subtle feedback on user actions (click, focus, success).
- **Design system**: Defining animation tokens (durations, easing) for consistent motion language.

**Not for**: 3D animations (use Three.js). Complex interactive experiences. Heavy animations on low-end devices. Animation that compromises accessibility.

## Key Concepts

### The Animation Hierarchy

All animations on a page exist in a hierarchy of complexity and performance cost:

```
1. Entry animations (elements appearing)
2. Hover/Focus interactions (button scales, link underlines)
3. Scroll-triggered animations (parallax, fade-in on scroll)
4. Continuous animations (spinners, loaders)
```

Design constraint: Each level adds performance overhead. Minimize animations at lower levels first.

### GPU-Accelerated Properties (CRITICAL)

**Only animate these properties to avoid 60fps jank**:

- `transform` (translate, rotate, scale, skew)
- `opacity` (transparency)

**NEVER animate these** (trigger layout recalculation, cause paint thrashing):

- `width`, `height`, `margin`, `padding`
- `top`, `left`, `right`, `bottom` (use `transform: translate()` instead)
- `box-shadow`, `border`, `background` (if they change frequently)
- `font-size`, `line-height`

**Rule**: If you're animating anything except `transform` and `opacity`, you're doing it wrong. Use `transform: translateX()`, `translateY()`, `scale()`, `rotate()` instead.

### Timing & Easing Reference

Easing functions control acceleration/deceleration of animations:

| Timing Function | Cubic Bezier | When to Use | Example |
|-----------------|--------------|------------|---------|
| **ease-out** | (0, 0, 0.2, 1) | Elements **entering** the viewport (default) | Fade-in, slide-up entrance |
| **ease-in** | (0.4, 0, 1, 1) | Elements **leaving** the viewport | Fade-out, slide-down exit |
| **ease-in-out** | (0.4, 0, 0.2, 1) | Repositioning within page | Moving cards, shifting layouts |
| **linear** | (0, 0, 1, 1) | Progress bars, spinners, continuous motion | Loading spinners only |
| **spring** (Framer) | `spring(1, 100, 10, 0)` | Natural, bouncy feel | Button presses, interactions |

**Best practice**: Default to `ease-out` for entrances, `ease-in` for exits.

### Duration Guidelines

Animation timing must be perceptually correct:

| Animation Type | Duration | Reasoning |
|---|---|---|
| **Micro-interactions** | 150-300ms | Fast feedback (button scale, checkbox check) |
| **Page entrances** | 300-500ms | Visible but doesn't feel slow |
| **Page transitions** | 400-700ms | Smooth but not lingering |
| **Loading state** | 1-2s fade-in | Gives time to read "Loading..." text |

**Critical rule**: Never exceed 1000ms (1 second). If an animation takes >1s, users perceive it as broken or laggy.

### Reduced Motion Accessibility (WCAG 2.3.3)

**Mandatory**: Always include `@media (prefers-reduced-motion: reduce)` to disable or simplify animations. This is not optional.

Users with vestibular disorders, migraines, or other conditions enable this OS setting. Animations must respect it.

**Implementation**:
```css
/* Normal animation */
.element {
  transition: opacity 0.5s ease-out;
}

/* Reduced motion: remove animation */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
    opacity: 1;
  }
}
```

---

## Instructions

### Pattern 1: Fade-Up Entrance (CSS-Only)

Simplest entrance animation. Use for hero text, cards, sections.

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-up {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

**JavaScript trigger**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

---

### Pattern 2: Staggered Children Animation

Multiple elements animate sequentially with custom property delays.

```css
.stagger-container {
  display: grid;
  gap: 1rem;
}

.stagger-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  transition-delay: calc(var(--index) * 80ms);
}

.stagger-item.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .stagger-item {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

**HTML usage**:
```html
<div class="stagger-container">
  <div class="stagger-item" style="--index: 0">Item 1</div>
  <div class="stagger-item" style="--index: 1">Item 2</div>
  <div class="stagger-item" style="--index: 2">Item 3</div>
</div>
```

---

### Pattern 3: Scroll-Triggered with Intersection Observer

Standard pattern for scroll animations. Use for sections, cards, feature highlights.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,        // Trigger when 10% visible
  rootMargin: '0px 0px -50px 0px'  // Trigger 50px before bottom
});

document.querySelectorAll('[data-scroll-animate]').forEach(el => observer.observe(el));
```

**HTML**:
```html
<div class="fade-up" data-scroll-animate>Content that animates on scroll</div>
```

---

### Pattern 4: Framer Motion Entrance (React)

Production pattern for React components. Cleaner than CSS + JS.

```tsx
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0, stagger = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{
      duration: 0.5,
      ease: [0, 0, 0.2, 1],  // ease-out cubic bezier
      delay
    }}
  >
    {children}
  </motion.div>
);

// Usage with stagger
const StaggeredList = ({ items }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,  // 100ms between each child
        },
      },
    }}
  >
    {items.map((item, i) => (
      <motion.div
        key={i}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {item}
      </motion.div>
    ))}
  </motion.div>
);

export { FadeUp, StaggeredList };
```

---

### Pattern 5: Button Micro-Interaction (Tailwind)

Polish buttons with scale, shadow, and color feedback.

```html
<button class="px-4 py-2 rounded-lg bg-blue-500 text-white
               transform transition-all duration-200 ease-out
               hover:bg-blue-600 hover:scale-105 hover:shadow-lg
               active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
  Click me
</button>
```

**Breakdown**:
- `hover:scale-105`: Grow slightly on hover (5% larger)
- `active:scale-95`: Shrink on click (5% smaller, gives press feedback)
- `hover:shadow-lg`: Add shadow on hover (depth effect)
- `focus:ring-2`: Keyboard focus ring (accessibility)
- `disabled:hover:scale-100`: Don't scale when disabled

**Reduced motion version**:
```html
<button class="... transition-colors duration-200 ease-out hover:bg-blue-600
               [.no-motion_&]:hover:scale-100">
  Click me
</button>
```

---

### Pattern 6: Loading Skeleton

Pulse animation for loading states without blocking content.

```html
<div class="space-y-4 animate-pulse">
  <!-- Text skeleton -->
  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  <div class="h-4 bg-gray-200 rounded w-1/2"></div>

  <!-- Image skeleton -->
  <div class="h-32 bg-gray-200 rounded w-full"></div>

  <!-- Line skeleton -->
  <div class="h-3 bg-gray-200 rounded w-full"></div>
  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
</div>
```

**Custom pulse animation (Tailwind)** if default pulse is too slow:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
};
```

---

### Pattern 7: Page Transition with AnimatePresence (Framer Motion)

Smooth fade/slide between pages or route changes.

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
```

**How it works**:
- `initial`: Starting state (invisible, shifted right)
- `animate`: End state (visible, in place)
- `exit`: Exiting state (invisible, shifted left)
- `AnimatePresence mode="wait"`: Wait for exit animation before entering new page

---

### Pattern 8: Smooth Scroll (CSS)

Enable smooth scrolling across the page.

```css
html {
  scroll-behavior: smooth;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

## Examples

### Example 1: SaaS Landing Page with Staggered Cards

Hero (fade-up 300ms) + feature cards (staggered 80ms each) + button hover scale.

```tsx
const containerVariants = {
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {features.map((f, i) => (
    <motion.div key={i} variants={itemVariants} className="p-6 border rounded-lg">
      {f.title}
    </motion.div>
  ))}
</motion.div>
```

CTA button: `hover:scale-105 hover:shadow-lg active:scale-95` with `@media (prefers-reduced-motion: reduce) { ... }`

---

### Example 2: E-commerce Toast Notification

Image zoom on hover + cart button + fade-in/out toast with AnimatePresence.

```tsx
<motion.img whileHover={{ scale: 1.1 }} src={src} />

<motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd}>Add to Cart</motion.button>

<AnimatePresence>
  {showToast && (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
      Added to cart!
    </motion.div>
  )}
</AnimatePresence>
```

---

### Example 3: Page Transitions (React Router)

Smooth fade/slide between routes using AnimatePresence + location key.

```tsx
<AnimatePresence mode="wait">
  <motion.main
    key={location.pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

---

## Common Pitfalls

1. **Animating layout properties (width, left, margin)** — Causes 60Hz jank. Use `transform: translateX()` instead.

2. **No reduced-motion fallback** — WCAG violation. Always wrap in `@media (prefers-reduced-motion: reduce)`.

3. **Animations > 700ms** — Feels broken. Micro: 150-300ms. Entrances: 300-500ms. Transitions: 400-700ms max.

4. **Animating everything** — Motion overload, no hierarchy. Animate only critical paths (hero, primary CTAs).

5. **Not using will-change** — Causes paint thrashing on scroll. Use `will-change: transform, opacity` then reset to `auto`.

6. **Spring overshooting** — Unbounded springs clip off-screen. Use `damping: 10, stiffness: 100, mass: 1` to bound.

7. **No low-end device testing** — Smooth on MacBook Pro, janky on iPhone SE. Test on budget hardware.

## References

- **Framer Motion**: https://www.framer.com/motion/
- **Web.dev Animation Guide**: https://web.dev/animations-guide/
- **WCAG 2.3.3**: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- **Easing Functions**: https://easings.net/
- **Chrome DevTools Performance**: https://developer.chrome.com/docs/devtools/performance/
- **Related Skills**: `scroll-animations`, `page-transitions`
