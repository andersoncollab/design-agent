---
name: micro-interactions
description: Micro-interaction design patterns — hover effects, button click feedback, toggle animations, form validation motion, toast notifications, skeleton-to-content transitions, and scroll-triggered reveals with CSS and Framer Motion. Trigger: "micro-interaction", "hover effect", "button animation", "toggle animation", "form animation", "loading skeleton".
version: 1.0.0
license: MIT
---

# Micro-Interactions Skill

## Purpose

Micro-interactions are the small animations and transitions that make interfaces feel alive and responsive. Every click, hover, and state change is an opportunity to provide visual feedback and confirm user actions. The difference between a flat, unresponsive interface and a polished product often comes down to these subtle moments of motion.

This skill covers the core patterns, timing guidelines, and implementation strategies for micro-interactions across web applications. The goal: communicate state changes, provide affordance feedback, and create delight through purposeful animation.

## Key Concepts

### Feedback Loop: Trigger → Rules → Feedback → Loops/Modes

Every micro-interaction follows this four-part cycle:

1. **Trigger**: What initiates the interaction (hover, click, form submission, scroll, data load)
2. **Rules**: The logic that governs what happens next (validation rules, loading states, permission checks)
3. **Feedback**: The visual/auditory response that confirms the action (animation, color change, icon, sound)
4. **Loops/Modes**: Repeated cycles or alternative states (loading → success → idle, or expanding → collapsing)

Example: Button click → Validation check → If valid: spin spinner, if invalid: shake + error text. Loop: spinner → checkmark → fade.

### Timing Guidelines

Respect these duration ranges for different interaction types:

- **Hover effects**: 150–200ms (fast enough to feel instant, slow enough to notice)
- **Button feedback** (ripple, scale, color): 100–150ms (immediate, snappy)
- **Toggle/Switch animations**: 200–300ms (spring-like, engaging)
- **Form validation feedback**: 150–250ms (slide-in errors, fade-in checks)
- **Toast/snackbar notifications**: 300–400ms (enter), 200–300ms (exit)
- **Modal/drawer transitions**: 250–350ms (open/close)
- **Page transitions**: 300–500ms (full-page navigation, not micro, but reference)

**Rule**: Never exceed 500ms for UI feedback. Longer animations feel sluggish and interrupt user flow. Very short durations (<100ms) can feel jarring.

### Easing Curves

Choose easing strategically to reinforce motion intent:

- **ease-out** (decelerate): Use for enter animations and state reveals. Fast start, gentle stop signals arrival.
- **ease-in** (accelerate): Use for exit animations and dismissals. Gentle start, fast finish signals departure.
- **ease-in-out** (smooth): Use for moves and transitions between states. Balanced symmetry.
- **Never use linear**: Linear easing feels robotic and mechanical. Always prefer curves.

**Material Design standard** (recommended):
```css
cubic-bezier(0.4, 0, 0.2, 1)  /* ease-out: Standard Material */
cubic-bezier(0.4, 0, 0.6, 1)  /* ease-in-out: Emphasis */
cubic-bezier(0.3, 0, 0.8, 0.15) /* decelerate: Emphasized easing */
```

### Reduced Motion Support

Always respect the `prefers-reduced-motion` media query. Never assume animation support. Rule:

1. **Reduce** opacity and scale animations to instant or 50ms
2. **Remove** complex choreography, keep state changes
3. **Never remove the state change itself** — animations should never be the only way to communicate state

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance: Animate Only Composited Properties

To avoid jank and layout thrashing, animate only properties that bypass layout recalculation:

- ✅ Safe: `transform` (translate, scale, rotate), `opacity`
- ❌ Avoid: `width`, `height`, `margin`, `padding`, `left`, `top`, `right`, `bottom` (all trigger layout)

This is the single biggest performance win. A `transform: translateY(-4px)` is 60fps. A `top: -4px` is not.

---

## Patterns with Code Examples

### 1. Button Interactions

**Press-down scale + loading state** (Framer Motion):

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  animate={{ backgroundColor: isSuccess ? '#10b981' : '#3b82f6' }}
  transition={{ duration: 0.15 }}
>
  {isLoading ? <Spinner /> : isSuccess ? <CheckIcon /> : 'Submit'}
</motion.button>
```

**CSS hover + active states**:

```css
button {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
button:hover { transform: scale(1.02); }
button:active { transform: scale(0.97); }
```

### 2. Hover Effects

**Card lift + shadow** (CSS):

```css
.card {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s ease;
  transform: translateY(0);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}
```

**Image zoom** (CSS):

```css
.image-container {
  overflow: hidden;
}
.image-container img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.image-container:hover img {
  transform: scale(1.05);
}
```

**Underline slide** (CSS):

```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-link:hover::after {
  width: 100%;
}
```

### 3. Toggle/Switch Animations

**Thumb slide with spring** (Framer):

```jsx
<motion.button
  animate={{ backgroundColor: checked ? '#3b82f6' : '#d1d5db' }}
  transition={{ duration: 0.2 }}
>
  <motion.div
    animate={{ x: checked ? 24 : 0 }}
    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
    className="w-6 h-6 bg-white rounded-full"
  />
</motion.button>
```

**CSS version**:

```css
.toggle {
  transition: background-color 0.2s ease;
}
.toggle::after {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle.checked::after {
  transform: translateX(24px);
}
```

### 4. Form Validation Animations

**Shake on error + error message** (Framer):

```jsx
<motion.div
  animate={{ x: error ? [-8, 8, -8, 0] : 0 }}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
>
  <input className={error ? 'border-red-500' : 'border-gray-300'} />
  <AnimatePresence>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="text-red-500 text-sm mt-2"
      >
        {error}
      </motion.p>
    )}
  </AnimatePresence>
</motion.div>
```

**Floating label on focus** (CSS):

```css
.form-label {
  position: absolute;
  top: 12px;
  transition: transform 0.2s ease, color 0.2s ease;
  transform-origin: left top;
}
.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  transform: translateY(-20px) scale(0.85);
  color: #3b82f6;
}
```

### 5. Toast Notifications

**Slide-in + auto-dismiss + drag-to-close** (Framer):

```jsx
<motion.div
  initial={{ x: 400, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 400, opacity: 0 }}
  transition={{ duration: 0.3 }}
  drag="x"
  onDragEnd={(e, { offset }) => {
    if (offset.x > 100) onDismiss();
  }}
>
  {message}
</motion.div>
```

**CSS with progress bar**:

```css
.toast {
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast::after {
  animation: progress 4s linear forwards;
}
@keyframes slideInRight {
  from { transform: translateX(400px); }
  to { transform: translateX(0); }
}
@keyframes progress {
  from { width: 100%; }
  to { width: 0; }
}
```

### 6. Skeleton Loading Transitions

**Shimmer gradient** (CSS):

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Skeleton → Content crossfade** (Framer):

```jsx
<motion.div animate={{ opacity: isLoading ? 1 : 0 }}>
  <Skeleton />
</motion.div>
<motion.div animate={{ opacity: isLoading ? 0 : 1 }}>
  {content}
</motion.div>
```

### 7. Scroll-Triggered Reveals

**Fade-up on enter viewport** (Framer + Intersection Observer):

```jsx
const [isVisible, setIsVisible] = useState(false);
useEffect(() => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) setIsVisible(true);
  }).observe(ref.current);
}, []);

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isVisible ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5 }}
/>
```

**Stagger children reveals** (Framer):

```jsx
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

---

## Common Pitfalls

1. **Animations too slow (>500ms)**: Feels sluggish and blocks user flow. Keep UI feedback snappy.
2. **No reduced-motion support**: Fails accessibility compliance and frustrates users with vestibular disorders.
3. **Animating layout properties**: Using `left`, `width`, `margin` causes jank. Always use `transform`.
4. **Animation without purpose**: Movement for movement's sake adds clutter, not delight. Every animation should communicate something.
5. **Inconsistent timing across the app**: Some buttons 100ms, others 400ms. Standardize durations by interaction type.
6. **Missing hover states entirely**: No visual feedback on interactive elements feels dead and non-responsive.
7. **No loading feedback on buttons**: Users click twice when there's no spinner or state change. Always show loading state.
8. **Choregraphed animations that are too complex**: More than 3 elements animating together becomes distracting.
9. **Opacity fades on text**: Hard to read during transition. Prefer state color changes or scale.
10. **No exit animations**: Elements should leave with the same care they arrived with.

---

## References & Related Skills

- **Material Design Motion**: https://m3.material.io/styles/motion/overview
- **Framer Motion Docs**: https://www.framer.com/motion/
- **MDN CSS Transitions**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions
- **Web.dev: Building performant animations**: https://web.dev/animations-guide/

**Related Skills**:
- `motion-design` — Page-level transitions and choreography
- `component-patterns` — Reusable component structure for micro-interactions
- `scroll-animations` — Scroll-based motion and parallax
- `form-design` — Validation UX and form state management
- `dark-mode` — Micro-interaction considerations in theme switching
