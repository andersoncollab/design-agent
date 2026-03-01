---
name: gsap-animations
description: GSAP animation patterns — timeline sequencing, ScrollTrigger scroll-linked animations, SplitText typography effects, SVG morphing, stagger animations, and performance optimization for production websites. Trigger: "GSAP", "GreenSock", "ScrollTrigger", "timeline animation", "text animation", "stagger animation".
version: 1.0.0
license: MIT
---

# GSAP Animations Skill

GSAP (GreenSock Animation Platform) is the industry standard for production web animations. Used on 11M+ sites including Apple, Google, Nike, and award-winning agencies. This skill covers timeline sequencing, scroll-linked effects, typography animations, and performance patterns for modern web applications.

## Installation & Setup

```bash
npm install gsap
npm install gsap-react-shim  # For React strict mode
```

### React Integration with useGSAP Hook

```typescript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedComponent() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".box", { x: 100, duration: 1 });
    },
    { scope: container }
  );

  return <div ref={container}><div className="box">Animate me</div></div>;
}
```

Key: `useGSAP` auto-cleans up animations on unmount. Always use scopes to isolate animations within components.

## Core Tween Methods

### gsap.to() / .from() / .fromTo()

```typescript
// .to(): animate FROM current TO values
gsap.to(".box", {
  x: 100,
  y: 50,
  opacity: 0.5,
  duration: 1,
  ease: "power2.out",
  onComplete: () => console.log("Done"),
});

// .from(): animate FROM values TO current state
gsap.from(".box", {
  opacity: 0,
  y: -20,
  duration: 0.8,
});

// .fromTo(): explicit start and end
gsap.fromTo(
  ".box",
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1, duration: 1 }
);

// Batch animate multiple elements
gsap.to(".card", {
  y: -10,
  opacity: 1,
  duration: 0.6,
  stagger: 0.15, // 150ms delay between each
});
```

Always specify `duration` explicitly (default 0.5s is rarely correct for production).

## Timeline Sequencing

Timelines chain multiple animations with precise control over timing and overlap.

```typescript
const tl = gsap.timeline({ paused: true });

// Sequential animations
tl.to(".hero-title", { opacity: 1, y: 0, duration: 0.8 })
  .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4") // Overlap 400ms
  .to(".hero-cta", { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
  .to(".scroll-hint", { opacity: 1, y: 5, duration: 0.5 }, "+=0.3"); // Gap of 300ms

// Position parameters
tl.to(".item", { x: 100 }, "0"); // 0ms (start of timeline)
tl.to(".item2", { x: 100 }, "<"); // Same start as previous
tl.to(".item3", { x: 100 }, ">"); // After previous ends
tl.to(".item4", { x: 100 }, "-=0.5"); // 500ms before previous ends

// Play/pause/reverse
tl.play();
tl.pause();
tl.reverse();
tl.seek(0.5); // Jump to 500ms
```

## ScrollTrigger: Scroll-Linked Animations

ScrollTrigger ties animations to scroll position. Essential for modern storytelling websites.

```typescript
gsap.registerPlugin(ScrollTrigger);

// Basic reveal on scroll
gsap.to(".section", {
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%", // When top of element hits 80% of viewport
    end: "top 20%", // Animation completes when hits 20%
    markers: true, // Debug markers
    scrub: 1, // Smooth scrub (1s deceleration)
  },
  opacity: 1,
  y: 0,
  duration: 1,
});

// Pin element during scroll range
gsap.timeline({
  scrollTrigger: {
    trigger: ".sticky-section",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: 0.6,
  },
})
  .to(".pin-content", { opacity: 1 })
  .to(".pin-content", { y: -50 }, 0.5)
  .to(".pin-content", { opacity: 0 });

// Toggle actions (play/pause/resume/reverse)
gsap.to(".fade-section", {
  scrollTrigger: {
    trigger: ".fade-section",
    toggleActions: "play pause resume reverse", // onEnter onLeave onEnterBack onLeaveBack
  },
  opacity: 1,
  y: 0,
});
```

### Batch ScrollTriggers for Performance

When animating many elements, batch creates a single ScrollTrigger per batch instead of per element:

```typescript
ScrollTrigger.batch(".card", {
  onEnter: (batch) =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: { each: 0.15 },
      duration: 0.8,
    }),
  onLeave: (batch) =>
    gsap.to(batch, { opacity: 0, y: 100, stagger: 0.15 }),
  onEnterBack: (batch) =>
    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 }),
  onLeaveBack: (batch) =>
    gsap.to(batch, { opacity: 0, y: 100, stagger: 0.15 }),
  start: "top 80%",
  duration: 0.8,
});
```

## Stagger Animations

Stagger adds sequential delay across multiple elements. Grid stagger is powerful for card layouts.

```typescript
// Simple stagger (linear delay)
gsap.from(".card", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.1, // 100ms between each
});

// Grid stagger (radiate from center/edges)
gsap.from(".grid-item", {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  stagger: {
    each: 0.08,
    grid: [4, 3], // 4 cols, 3 rows
    from: "center", // "edges", "start", "end", "random"
    axis: "y", // Stagger by rows first
  },
});

// Reverse stagger (last to first)
gsap.to(".list-item", {
  x: 20,
  duration: 0.5,
  stagger: {
    each: 0.05,
    from: "end",
  },
});
```

## SplitText: Character & Word Animation

SplitText splits text into individual chars, words, or lines for granular animation. Requires Club membership.

```typescript
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Split text
const split = new SplitText(".heading", { type: "chars,words" });

// Animate characters with stagger
gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  rotationZ: -10,
  duration: 0.6,
  stagger: 0.03,
});

// Word reveal (fade + slide)
const wordSplit = new SplitText(".paragraph", { type: "words" });
gsap.from(wordSplit.words, {
  opacity: 0,
  x: -20,
  duration: 0.4,
  stagger: 0.05,
});

// Cleanup (important!)
split.revert();
```

## SVG Morphing (MorphSVGPlugin)

MorphSVG animates between SVG path shapes. Requires Club membership.

```typescript
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

gsap.to("#shape", {
  morphSVG: "#targetShape",
  duration: 1,
  ease: "power2.inOut",
});

// Multiple shape morph
const tl = gsap.timeline({ repeat: -1 });
tl.to("#shape", { morphSVG: "#shape2", duration: 1 })
  .to("#shape", { morphSVG: "#shape3", duration: 1 })
  .to("#shape", { morphSVG: "#shape1", duration: 1 });
```

## Common Patterns

### Hero Text Reveal

```typescript
export function HeroReveal() {
  const container = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(".hero-title", { type: "chars" });
      const tl = gsap.timeline();

      tl.from(split.chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.04,
        ease: "back.out(1.7)",
      })
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".hero-cta", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.2");

      return () => split.revert();
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <h1 className="hero-title">Welcome to Motion</h1>
      <p className="hero-subtitle">Scroll to explore</p>
      <button className="hero-cta">Get Started</button>
    </div>
  );
}
```

### Scroll-Triggered Section Reveals

```typescript
export function ScrollReveal() {
  useGSAP(() => {
    gsap.utils.toArray(".reveal-section").forEach((element: any) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 20%",
          markers: false,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });
    });
  });

  return (
    <>
      <section className="reveal-section">Section 1</section>
      <section className="reveal-section">Section 2</section>
      <section className="reveal-section">Section 3</section>
    </>
  );
}
```

### Horizontal Scroll Section

```typescript
export function HorizontalScroll() {
  const container = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".panel") as Element[];

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-container",
          pin: true,
          scrub: 1,
          end: () => "+=" + container.current!.offsetWidth,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="horizontal-container">
      <div className="panel">Panel 1</div>
      <div className="panel">Panel 2</div>
      <div className="panel">Panel 3</div>
    </div>
  );
}
```

### Number Counter Animation

```typescript
export function Counter({ value }: { value: number }) {
  const counter = useRef({ val: 0 });

  useGSAP(() => {
    gsap.to(counter.current, {
      val: value,
      duration: 2,
      snap: { val: 1 },
      ease: "power2.out",
      onUpdate: () => {
        console.log(Math.round(counter.current.val));
      },
    });
  });

  return <div>{Math.round(counter.current.val)}</div>;
}
```

## Easing Reference

```typescript
// Standard eases (power, sine, exp, circ, back, elastic, bounce)
"power1.out", "power2.inOut", "power4.in",
"sine.out", "circ.inOut",
"back.out(1.7)", // Overshoot parameter
"elastic.out(1, 0.3)", // Amplitude & period
"bounce.out",

// Stepped animation
"steps(5)",

// Custom ease
CustomEase.create("myEase", "M0,0 C0.138,0 0.166,0.074 0.442,0.278...");
gsap.to(".box", { x: 100, ease: "myEase" });
```

## Performance Optimization

```typescript
// 1. Use transform (x/y) instead of left/top
gsap.to(".box", { x: 100 }); // Good
gsap.to(".box", { left: 100 }); // Bad (forces layout)

// 2. Instant property changes with gsap.set()
gsap.set(".element", { perspective: 1000 });

// 3. Minimize will-change (remove after animation)
gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => gsap.set(".box", { willChange: "transform" }),
  onComplete: () => gsap.set(".box", { willChange: "auto" }),
});

// 4. Batch ScrollTriggers for many elements
ScrollTrigger.batch(".card", {
  interval: 0.1,
  onEnter: (batch) =>
    gsap.to(batch, { opacity: 1, stagger: { each: 0.15 } }),
});

// 5. Use fastScrollEnd for mobile
ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
```

## Common Pitfalls

1. **Not cleaning up in React** — Use `useGSAP` or return cleanup function. Memory leaks cascade.
2. **Animating layout properties** — Never animate width/height/top/left. Use scaleX/scaleY, clip-path, or transform instead.
3. **Multiple ScrollTriggers without batching** — Creates DOM thrashing. Use `ScrollTrigger.batch()` for 10+ elements.
4. **Missing gsap.set() for initial state** — Causes FOUC (Flash of Unstyled Content). Always initialize: `gsap.set(".element", { opacity: 0 })` before animation.
5. **Animating display property** — Never animate display. Use opacity or scaleX instead.
6. **Using GSAP for simple hover states** — CSS is sufficient. Reserve GSAP for complex sequences and scroll effects.
7. **Not specifying duration** — GSAP defaults to 0.5s, which is rarely correct. Always be explicit.
8. **Forgetting to revert() SplitText** — Memory leak. Call `split.revert()` in cleanup.

## GSAP Plugin Reference

| Plugin | Purpose | License |
|--------|---------|---------|
| ScrollTrigger | Scroll-linked animations | Free |
| Flip | Smooth FLIP layout animations | Free |
| Observer | Gesture/scroll/wheel detection | Free |
| SplitText | Split text into chars/words/lines | Club |
| MorphSVG | SVG path morphing | Club |
| DrawSVG | SVG stroke animation | Club |
| ScrollSmoother | Smooth scroll behavior | Club |
| CustomEase | Custom easing curve editor | Club |

## Related Skills

- `motion-design` — Broader animation principles and UX motion
- `scroll-animations` — Specialized scroll-based animation patterns
- `micro-interactions` — Small, purposeful motion details
- `page-transitions` — Enter/exit animations for navigation
- `svg-animation` — SVG-specific techniques (paths, filters, masking)

## References

- GSAP Docs: https://gsap.com/docs/v3/
- ScrollTrigger Guide: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP Community: https://gsap.com/community/
- Easing Visualizer: https://gsap.com/docs/v3/Eases
