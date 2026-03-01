---
name: typography-animation
description: Kinetic typography and text animation patterns — character-by-character reveals, word-by-word effects, typewriter animations, text morphing, variable font axis animation, headline stagger effects, and text mask/clip techniques. Trigger: "text animation", "kinetic typography", "typewriter effect", "text reveal", "animated text", "variable font animation".
version: 1.0.0
license: MIT
---

# Typography Animation Skill

## Purpose

Typography animation is the highest-impact motion on any page — it's what users read first. From subtle character reveals to dramatic kinetic type, these patterns create memorable first impressions. This skill covers every text animation technique from CSS-only to GSAP SplitText.

## Key Concepts

### Text Splitting

Break text into spans per character, word, or line for individual animation.

**Libraries**:
- **GSAP SplitText** (best): Industry standard, handles nested HTML, automatic cleanup, performance optimized. `new SplitText('.heading', { type: 'chars,words,lines' })`
- **Splitting.js** (free): Lightweight (~4kb), works with CSS, no timeline dependency. `Splitting({ by: 'chars' })`
- **Manual JS split**: Regex split + `createElement` loop, full control, no dependency

### Reveal Patterns

Standard effects and their implementations:

1. **Fade up**: Opacity (0 → 1) + translateY (20px → 0). Best for elegant transitions.
2. **Slide in**: TranslateX (-100px → 0) + opacity, or clip-path reveal. Best for directional emphasis.
3. **Blur resolve**: filter: blur(8px) → blur(0) with opacity fade. Feels like focusing a camera.
4. **Scale up**: transform: scale(0.5) → 1 with origin point. Best for pop/emphasis.
5. **Rotate in**: rotateX(90deg) → 0 or rotateY/rotateZ. Best for 3D emphasis (avoid on mobile).

### Timing Guidelines

- **Character stagger**: 20-40ms (fast/elegant), 50-80ms (medium), 100ms+ (dramatic). Never exceed 150ms per character.
- **Word stagger**: 80-150ms between words. Allows reading pace to match animation.
- **Line stagger**: 150-300ms between lines. Works well for block headlines.
- **Rule**: Total animation duration should not exceed 2-3 seconds or users will wait too long.

### Variable Font Animation

Animate `font-variation-settings` for weight (`wght`), width (`wdth`), slant (`slnt`), optical size (`opsz`). Creates morphing effects impossible with static fonts.

**CSS Setup**:
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght,wdth,opsz@100..900,75..100,8..144&display=swap');

h1 {
  font-family: 'Roboto Flex', sans-serif;
  font-variation-settings: 'wght' 400, 'wdth' 100, 'opsz' 44;
}

@property --weight {
  syntax: '<number>';
  initial-value: 400;
  inherits: false;
}

@keyframes wghtWave {
  0% { --weight: 400; }
  50% { --weight: 700; }
  100% { --weight: 400; }
}
```

Use `@property` for smooth CSS interpolation of numeric axes.

### Performance Best Practices

- **Split on mount**: Text splitting causes reflow. Do it once on component initialization.
- **Animate transforms only**: Use `transform: translateX/Y/Z, scale, rotate`. Avoid animating `width`, `height`, `left`, `right` (causes reflow every frame).
- **Will-change**: Add `will-change: transform, opacity` before animation, remove after completion.
- **Accessibility**: Never split without preserving semantic meaning:
  - Add `aria-label="Full text here"` on parent container
  - Add `aria-hidden="true"` on child spans
  - Ensure text is still selectable (user can copy)
- **Reduced motion**: Always provide a fallback. Use `prefers-reduced-motion` media query.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Patterns with Code

### 1. Character Reveal — CSS + JS

Split text into character spans, stagger opacity + translateY with CSS `animation-delay`.

**HTML Output** (after split):
```html
<h1 aria-label="Hello World">
  <span class="char" style="animation-delay: 0ms;">H</span>
  <span class="char" style="animation-delay: 30ms;">e</span>
  <span class="char" style="animation-delay: 60ms;">l</span>
  <!-- ... -->
</h1>
```

**CSS**:
```css
@keyframes charReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.char {
  display: inline-block;
  animation: charReveal 0.6s ease-out forwards;
}
```

**JS** (Vanilla):
```javascript
function animateCharacters(selector, stagger = 30) {
  const element = document.querySelector(selector);
  const text = element.textContent;
  const chars = text.split('');

  element.innerHTML = chars
    .map((char, i) =>
      `<span class="char" style="animation-delay: ${i * stagger}ms;">${char}</span>`
    )
    .join('');
}

animateCharacters('h1');
```

### 2. Typewriter Effect — CSS Only

Single-line text with blinking cursor. Uses `steps()` timing function.

**HTML**:
```html
<h1 class="typewriter">Web design is alive.</h1>
```

**CSS**:
```css
.typewriter {
  width: 0;
  border-right: 3px solid #000;
  overflow: hidden;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

@keyframes type {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  0%, 50% { border-right-color: #000; }
  51%, 100% { border-right-color: transparent; }
}

.typewriter {
  animation: type 4s steps(28, end), blink 0.75s step-end infinite;
}
```

**Note**: Only works for single-line text. For multiline, use JS character reveal instead.

### 3. Word-by-Word Fade Up — Framer Motion

Perfect for hero headlines and subheadings.

**React**:
```jsx
import { motion } from 'framer-motion';

export function WordReveal({ text }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.h1 variants={container} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

### 4. Line-by-Line Reveal with Clip-Path

Dramatic hero effect. Each line slides up from below.

**HTML**:
```html
<h1 class="headline">
  <div class="line"><span>Design is not</span></div>
  <div class="line"><span>just how it looks.</span></div>
  <div class="line"><span>It's how it works.</span></div>
</h1>
```

**CSS**:
```css
.line {
  overflow: hidden;
  height: 1.2em;
}

.line span {
  display: block;
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.line:nth-child(1) span { animation-delay: 0.1s; }
.line:nth-child(2) span { animation-delay: 0.3s; }
.line:nth-child(3) span { animation-delay: 0.5s; }
```

### 5. Text Blur Resolve

Characters start blurred, resolve to sharp focus.

**CSS**:
```css
@keyframes blurResolve {
  0% {
    filter: blur(8px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.char {
  display: inline-block;
  animation: blurResolve 1.2s ease-out forwards;
}
```

### 6. Variable Font Weight Wave

Animate `wght` axis across characters in a wave pattern.

**HTML** (post-split):
```html
<h1 aria-label="Wave effect" style="font-family: 'Roboto Flex'">
  <span style="animation-delay: 0ms;">H</span>
  <span style="animation-delay: 60ms;">e</span>
  <span style="animation-delay: 120ms;">l</span>
  <!-- ... -->
</h1>
```

**CSS**:
```css
@property --wght {
  syntax: '<number>';
  initial-value: 400;
  inherits: false;
}

@keyframes wghtWave {
  0%, 100% { --wght: 400; font-variation-settings: 'wght' var(--wght); }
  50% { --wght: 800; font-variation-settings: 'wght' var(--wght); }
}

h1 span {
  animation: wghtWave 1s ease-in-out infinite;
}
```

### 7. Scramble/Decode Effect

Characters cycle through random glyphs before settling. Cyberpunk aesthetic.

**JS**:
```javascript
async function scrambleText(selector, duration = 800) {
  const el = document.querySelector(selector);
  const originalText = el.textContent;
  const chars = originalText.split('');
  const glyphs = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    const scrambled = chars
      .map((char, i) => {
        if (progress > (i / chars.length)) return char;
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');

    el.textContent = scrambled;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.textContent = originalText;
    }
  }

  animate();
}

scrambleText('h1', 600);
```

### 8. Text Mask with Animated Gradient

`background-clip: text` with animated gradient background.

**HTML**:
```html
<h1 class="gradient-text">Animated gradient text</h1>
```

**CSS**:
```css
.gradient-text {
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient 6s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 9. GSAP SplitText Integration

Industry-standard library for complex text animations.

**React**:
```jsx
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(SplitText);

export function GSAPTextAnimation() {
  const headingRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(headingRef.current, { type: 'chars,words' });

    gsap.from(split.chars, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: 'back.out',
    });

    return () => split.revert();
  }, []);

  return <h1 ref={headingRef}>Complex text animation with GSAP</h1>;
}
```

### 10. Scroll-Triggered Text Reveal

Text reveals as user scrolls into view using GSAP ScrollTrigger.

**React**:
```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function ScrollRevealText() {
  const headingRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(headingRef.current, { type: 'lines' });
    gsap.from(split.lines, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      opacity: 0, y: 30, stagger: 0.08,
    });
    return () => split.revert();
  }, []);

  return <h1 ref={headingRef}>Scroll to reveal</h1>;
}
```

## Variable Fonts for Animation

Recommended variable fonts optimized for animation:

| Font | Axes | Best For | CDN |
|------|------|----------|-----|
| Inter | wght (100-900) | Weight waves, emphasis | Google Fonts |
| Roboto Flex | wght, wdth, opsz, GRAD | Comprehensive morphing | Google Fonts |
| Source Sans 3 | wght (200-900) | Elegant weight transitions | Google Fonts |
| Fraunces | wght, opsz, SOFT, WONK | Display/serif morphing | Google Fonts |
| Recursive | wght, slnt, CASL, CRSV, MONO | Extreme versatility | Google Fonts |

Import all axes:
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght,wdth,opsz@100..900,75..100,8..144&display=swap');
```

## Common Pitfalls

1. **Splitting without accessibility**: Characters become unreadable to screen readers. Always add `aria-label` on parent.

2. **Typewriter on multiline text**: CSS `width` animation doesn't work. Use JS character reveal instead.

3. **Animating `font-weight` without variable font**: Causes FOUT (Flash of Unstyled Text) between static weights. Always use variable fonts for weight animation.

4. **Character stagger too slow** (>100ms per char): Users wait forever to read. Use 30-80ms for best UX.

5. **Text animation replays on every scroll**: Add flag to track `hasAnimated` or use IntersectionObserver with `once: true`.

```javascript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      animateText();
      observer.unobserve(entry.target);
    }
  },
  { threshold: 0.5 }
);
observer.observe(element);
```

6. **No reduced-motion fallback**: Always detect `prefers-reduced-motion` and skip animation gracefully.

7. **Splitting in SSR** (Next.js, etc.): Causes hydration mismatch. Split only on mount in `useEffect`, never in render.

## References

- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) · [Splitting.js](https://splitting.js.org) · [Variable Fonts (web.dev)](https://web.dev/variable-fonts/)
- **Related Skills**: `typography-pairing`, `gsap-animations`, `motion-design`, `scroll-animations`
