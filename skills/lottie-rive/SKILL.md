---
name: lottie-rive
description: Lottie and Rive vector animation integration — After Effects to Lottie export, Rive interactive state machines, React/web player setup, animation triggers, lazy loading, and performance budgets for production use. Trigger: "Lottie", "Rive", "vector animation", "After Effects animation", "animated illustration", "loading animation".
version: 1.0.0
license: MIT
---

# Lottie and Rive Vector Animation Integration

## Purpose

Lottie and Rive render designer-created vector animations in the browser at any resolution without quality loss. Lottie plays After Effects exports. Rive adds interactivity with state machines. Together they replace GIFs, video, and CSS for complex animations like loading states, onboarding illustrations, and micro-interactions.

## Key Concepts

### Lottie Format
- JSON file exported from After Effects via Bodymovin plugin
- Renders as SVG, Canvas, or HTML
- Lightweight (typically 5–50KB vs MB for GIF/video)
- Playback-only; no interaction unless driven by React state changes
- Mature ecosystem: LottieFiles marketplace, extensive plugin support

### Rive Format
- Binary .riv file from rive.app editor
- Supports interactive state machines (transitions based on input: hover, click, scroll, data binding)
- Smaller file size than Lottie (10–30KB typical)
- GPU-accelerated via custom WebGL renderer with Canvas fallback
- Single source of truth: design and interaction live in Rive editor

### When to Use Which
- **Lottie**: Playback-only animations (loading spinners, success/error states, illustrations, hero sequences)
- **Rive**: Interactive animations (buttons responding to hover, toggles with feedback, characters reacting to input, branching narratives)
- **Hybrid**: Rive for primary interactive element, Lottie for secondary or decorative animations on the same page

### File Size Budgets
- Target <50KB per Lottie file (uncompressed JSON)
- Target <30KB per Rive file (binary format already optimized)
- Above-fold animations: preload via `<link rel="preload">`
- Below-fold: lazy load with IntersectionObserver
- Mobile: Consider disabling complex animations on low-end devices (device memory API)

### Renderer Options
- **Lottie**: SVG (best quality, slower on complex animations), Canvas (faster, lower quality), HTML (fastest, limited feature set)
- **Rive**: WebGL (default, GPU-accelerated, best performance), Canvas (fallback for older browsers, still good)

## Instructions with Code

### 1. Lottie React Setup

Use `@lottiefiles/dotlottie-react` for modern projects (DotLottie format with playback controls built-in):

```typescript
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LoadingSpinner() {
  return (
    <DotLottieReact
      src="https://cdn.example.com/spinner.lottie"
      loop
      autoplay
      width={64}
      height={64}
    />
  );
}
```

For legacy projects or full control, use `lottie-react`:

```typescript
import Lottie from 'lottie-react';
import animationData from '@/assets/success.json';

export function SuccessAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop={false}
      autoplay
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice', progressiveLoad: true }}
      style={{ width: 200, height: 200 }}
    />
  );
}
```

### 2. Lottie Playback Control

Play, pause, seek, and loop programmatically:

```typescript
import { useRef } from 'react';
import Lottie from 'lottie-react';

export function ControlledAnimation() {
  const lottieRef = useRef(null);

  const handlePlay = () => lottieRef.current?.play();
  const handlePause = () => lottieRef.current?.pause();
  const handleSeek = (frame: number) => lottieRef.current?.goToAndStop(frame, true);
  const handlePlaySegment = () => {
    // Play frames 10–50 once
    lottieRef.current?.playSegments([[10, 50]], true);
  };

  return (
    <div>
      <Lottie ref={lottieRef} animationData={animationData} loop={false} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={() => handleSeek(0)}>Reset</button>
      <button onClick={handlePlaySegment}>Play Segment</button>
    </div>
  );
}
```

### 3. Lottie Scroll-Triggered Animation

Play animation as element scrolls into view:

```typescript
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

export function ScrollTriggeredAnimation() {
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && lottieRef.current) {
          lottieRef.current.play();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <Lottie ref={lottieRef} animationData={animationData} autoplay={false} loop={false} />
    </div>
  );
}
```

### 4. Rive React Setup

Use `@rive-app/react-canvas` for interactive animations:

```typescript
import { useRive, Layout, Fit, useRiveEventListener } from '@rive-app/react-canvas';

export function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.example.com/button.riv',
    stateMachines: 'ButtonStateMachine',
    layout: new Layout({ fit: Fit.Contain }),
    autoplay: true,
  });

  return (
    <div style={{ width: 200, height: 100 }}>
      <RiveComponent />
    </div>
  );
}
```

### 5. Rive State Machines

Control state machine inputs from React:

```typescript
import { useRive, Layout, Fit } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';

export function HoverButton() {
  const { rive, RiveComponent } = useRive({
    src: 'button.riv',
    stateMachines: 'ButtonStateMachine',
    autoplay: true,
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!rive) return;

    // Set boolean input on state machine
    const inputs = rive.stateMachineInputs('ButtonStateMachine');
    const isHoveredInput = inputs?.find((i) => i.propertyName === 'isHovered');
    if (isHoveredInput) {
      isHoveredInput.value = isHovered;
    }
  }, [rive, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <RiveComponent />
    </div>
  );
}
```

### 6. Rive Interactive Button with Press Action

Trigger state machine actions:

```typescript
import { useRive } from '@rive-app/react-canvas';

export function ClickableButton() {
  const { rive, RiveComponent } = useRive({
    src: 'animated-button.riv',
    stateMachines: 'ButtonStateMachine',
    autoplay: true,
  });

  const handleClick = () => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs('ButtonStateMachine');
    const triggerInput = inputs?.find((i) => i.propertyName === 'onPress');
    if (triggerInput && 'fire' in triggerInput) {
      triggerInput.fire();
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <RiveComponent />
    </div>
  );
}
```

### 7. Lazy Loading Pattern for Below-Fold Animations

Dynamic import + IntersectionObserver:

```typescript
import { Suspense, lazy, useRef, useEffect, useState } from 'react';

const LazyLottie = lazy(() => import('lottie-react'));

export function LazyAnimationSection() {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: 200 }}>
      {shouldLoad && (
        <Suspense fallback={<div>Loading animation...</div>}>
          <LazyLottie animationData={animationData} autoplay loop />
        </Suspense>
      )}
    </div>
  );
}
```

### 8. Accessibility: Reduced Motion & ARIA Labels

Respect `prefers-reduced-motion` and provide alt text:

```typescript
import { useEffect, useState } from 'react';

export function AccessibleAnimation() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <div role="img" aria-label="Success state">✓</div>;
  }

  return (
    <div role="img" aria-label="Success animation playing">
      <Lottie animationData={animationData} autoplay loop={false} />
    </div>
  );
}
```

## Common Use Cases

| Use Case | Recommended | Why |
|----------|-------------|-----|
| Loading spinner | Lottie | Simple loop, no interaction, 5–10KB |
| Success/error state | Lottie | One-shot playback, clear feedback |
| Onboarding illustration | Lottie | Sequenced playback, designer-controlled timing |
| Interactive button | Rive | State machine responds to hover/click, smaller file |
| Animated icon (multiple states) | Rive | Toggle between states, compact file size |
| Hero illustration | Rive | Scroll/mouse-position reactive, engaging |
| Animated logo | Lottie | Brand animation, autoplay loop, no complexity |
| Form field state | Rive | Error, focus, filled states in one file |
| Character animation | Rive | Branching animations, data-driven input |

## Asset Pipeline

### Lottie Workflow
1. **Design in After Effects**: Use shape layers, no raster/video
2. **Export**: Bodymovin plugin → Export → .json or .lottie (compressed format)
3. **Optimize**: Upload to lottiefiles.com → auto-optimization or manually remove unused layers
4. **Host**: CDN (Cloudflare, AWS, your own) → reference in React component
5. **Monitor**: Check file size; if >50KB, consider simplification or splitting into segments

### Rive Workflow
1. **Design in rive.app editor**: Draw shapes, create state machine with inputs/triggers
2. **Export**: Download .riv file (binary format, auto-optimized)
3. **Host**: CDN → reference in React component
4. **Test**: Verify state machine inputs respond correctly; use DevTools to inspect inputs

### Optimization Tactics
- Remove unused layers, groups, and effects in editor
- Flatten character rigs (avoid complex parenting)
- Use shape layers instead of masks (Lottie)
- Minimize keyframe density (sample every 2–3 frames instead of every frame)
- Trim timeline to used ranges only
- For Rive: Use simpler shapes, fewer state machine inputs
- Test on device: Use Chrome DevTools Network throttle to measure impact

## Common Pitfalls

1. **Lottie files with embedded raster images**: Defeats the purpose; inspect .json and remove embedded base64 images. Defeats vector benefits, massive file size.

2. **Not lazy loading below-fold animations**: All animations load immediately, blocking initial render. Use IntersectionObserver for anything below the fold.

3. **Using Lottie when CSS animation would suffice**: Simple spinner or fade? Use CSS. Lottie adds 30–50KB overhead.

4. **Missing reduced-motion support**: Users with `prefers-reduced-motion: reduce` see jerky animations or seizure triggers. Always provide static fallback.

5. **Auto-playing complex animations on mobile**: Battery drain, CPU spike, poor UX. Either reduce animation complexity on mobile or disable autoplay on low-end devices.

6. **Not setting explicit width/height**: Causes layout shift (CLS) when animation loads. Always set container dimensions.

7. **Using SVG renderer for many simultaneous Lotties**: SVG DOM manipulation is slow. Switch to Canvas for >3 simultaneous animations.

8. **State machine inputs not wired correctly**: Test inputs in Rive editor first; verify propertyName matches exactly when accessing from React.

## References

- **LottieFiles**: https://lottiefiles.com (marketplace, documentation, optimization)
- **Rive Docs**: https://rive.app/docs (state machines, WebGL, performance)
- **Airbnb Lottie**: https://airbnb.io/lottie/ (original Lottie spec, mobile SDKs)
- **DotLottie Spec**: https://dotlottie.io (compressed Lottie format)
- **React Lottie**: https://github.com/LottieFiles/lottie-react
- **Rive React**: https://github.com/rive-app/rive-react

## Related Skills

- `motion-design`: Choreography, timing, easing principles
- `micro-interactions`: Feedback, state changes, user delight
- `icon-systems`: Iconography, scalability, consistency
- `gsap-animations`: Timeline-based animations for complex sequences
- `performance-optimization`: CLS, lazy loading, metrics
