# Gradient & Texture CSS Recipes

15+ production-ready CSS gradients and background textures from grainient.supply and custom recipes. Copy-paste ready. All use standard CSS (no images required).

---

## Linear Gradients

### Recipe 1: Classic Linear (Left to Right)

```css
.gradient-linear {
  background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
}
```

**Properties**:
- Direction: 90deg (horizontal)
- From: Blue
- To: Purple
- Use case: Hero section, header gradient

**Variants**:
```css
/* Diagonal (135deg) */
.gradient-diagonal {
  background: linear-gradient(135deg, #3B82F6, #EC4899);
}

/* Vertical (180deg) */
.gradient-vertical {
  background: linear-gradient(180deg, #FDB022, #FF4D7D);
}

/* Reverse (270deg) */
.gradient-reverse {
  background: linear-gradient(270deg, #10B981, #06B6D4);
}
```

---

### Recipe 2: Multi-Stop Linear Gradient

```css
.gradient-multi-stop {
  background: linear-gradient(
    90deg,
    #FF6B6B 0%,
    #FFD93D 33%,
    #6BCB77 66%,
    #4D96FF 100%
  );
}
```

**Properties**:
- 4 color stops at equal intervals (0%, 33%, 66%, 100%)
- Creates rainbow effect
- Use case: Playful headers, pride/diversity branding, colorful CTAs

**Smooth color stops** (unevenly distributed):
```css
.gradient-smooth {
  background: linear-gradient(
    90deg,
    #667EEA 0%,
    #764BA2 25%,
    #F093FB 75%,
    #4FD1C6 100%
  );
}
```

---

## Radial Gradients

### Recipe 3: Radial Gradient (Circle)

```css
.gradient-radial-circle {
  background: radial-gradient(circle, #FF6B6B 0%, #FF6B6B 30%, transparent 100%);
}
```

**Properties**:
- Shape: circle (or ellipse)
- Center color: Red
- Fades to transparent at edge
- Use case: Spotlight effect, vignette, glow behind text

**With explicit position**:
```css
.gradient-radial-positioned {
  background: radial-gradient(
    circle at 30% 20%,
    #FDB022 0%,
    #FF4D7D 50%,
    transparent 100%
  );
}
```

---

### Recipe 4: Radial Gradient (Ellipse)

```css
.gradient-radial-ellipse {
  background: radial-gradient(ellipse at center, #667EEA 0%, #764BA2 100%);
}
```

**Properties**:
- Shape: ellipse (wider than tall)
- Center: center (50% 50%)
- Use case: Background for wide screens, wallpaper effect

---

## Conic Gradients

### Recipe 5: Conic Gradient (Rainbow Wheel)

```css
.gradient-conic-rainbow {
  background: conic-gradient(
    from 0deg,
    red, yellow, lime, cyan, blue, magenta, red
  );
}
```

**Properties**:
- Rotation around a center point (like a color wheel)
- Colors sweep in circle
- Use case: Color selector wheels, decorative circular elements, pie chart backgrounds

**With specific angles**:
```css
.gradient-conic-sunset {
  background: conic-gradient(
    from 0deg at 50% 50%,
    #FF6B6B 0deg,
    #FDB022 90deg,
    #FFD93D 180deg,
    #FF6B6B 360deg
  );
}
```

---

## Mesh Gradients (Complex)

### Recipe 6: Organic Mesh Gradient (3 Colors)

```css
.gradient-mesh-organic {
  background:
    radial-gradient(ellipse at 20% 50%, #FF6B6B 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, #4D96FF 0%, transparent 50%),
    radial-gradient(ellipse at 40% 0%, #FFD93D 0%, transparent 50%),
    linear-gradient(135deg, #F8F9FA, #E0E7FF);
  background-attachment: fixed;
}
```

**Properties**:
- Layered radial gradients with different positions
- Creates organic, flowing effect
- `background-attachment: fixed` keeps gradient fixed on scroll (optional)
- Use case: Hero background, product page, premium branding

---

### Recipe 7: Mesh Gradient (Blending Technique)

```css
.gradient-mesh-blend {
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(77, 150, 255, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 0%, rgba(255, 217, 61, 0.4) 0%, transparent 50%),
    linear-gradient(135deg, #F3F4F6, #E5E7EB);
  background-blend-mode: multiply;
}
```

**Properties**:
- Semi-transparent radial gradients
- `background-blend-mode: multiply` creates color mixing effect
- More subtle than Recipe 6
- Use case: Modern SaaS background, elegant branding

---

## Grain & Noise Textures

### Recipe 8: SVG Noise Filter (Performance)

```css
.texture-grain {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  background-image:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0.3"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.1"/></svg>');
  background-size: 100px 100px;
}
```

**Properties**:
- SVG `feTurbulence` filter creates fractal noise
- Opacity 0.1 = subtle grain
- `baseFrequency` controls grain size (0.1-1.0)
- Use case: Add texture to gradients, reduce plastic look, premium effect

**Adjust grain intensity**:
```css
/* Subtle grain */
opacity: 0.05;

/* Medium grain */
opacity: 0.15;

/* Heavy grain */
opacity: 0.3;
```

---

### Recipe 9: CSS Noise (No SVG)

```css
.texture-noise-css {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  background-image:
    radial-gradient(2px 2px at 20% 30%, white, rgba(255, 255, 255, 0)),
    radial-gradient(2px 2px at 60% 70%, white, rgba(255, 255, 255, 0)),
    radial-gradient(1px 1px at 50% 50%, white, rgba(255, 255, 255, 0)),
    radial-gradient(1px 1px at 80% 10%, white, rgba(255, 255, 255, 0)),
    radial-gradient(2px 2px at 90% 60%, white, rgba(255, 255, 255, 0));
  background-repeat: repeat;
  background-size: 200% 200%;
}
```

**Properties**:
- Multiple radial gradients create noise pattern
- All white, fading to transparent
- Layer over solid/gradient background
- Use case: Lightweight grain without SVG

---

## Glassmorphism Effects

### Recipe 10: Glassmorphism (Frosted Glass)

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
```

**Properties**:
- Semi-transparent white background
- `backdrop-filter: blur(10px)` blurs content behind element
- Thin border for definition
- Use case: Overlay cards, modals, navigation, premium feel

**Dark mode variant**:
```css
.glass-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

### Recipe 11: Glassmorphism with Gradient

```css
.glass-gradient {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
```

**Properties**:
- Gradient frosted glass
- Stronger blur (20px)
- Shadow for depth
- Use case: Premium cards, modal overlays, modern UI

---

## Aurora & Glow Effects

### Recipe 12: Aurora Gradient (Northern Lights)

```css
.gradient-aurora {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(0, 255, 150, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 0%, rgba(100, 200, 255, 0.2) 0%, transparent 50%),
    linear-gradient(180deg, #0A0E27, #1A1A3E);
  background-attachment: fixed;
}
```

**Properties**:
- Multiple radial gradients with purple, cyan, green
- Layered on dark background
- Creates flowing aurora effect
- `background-attachment: fixed` keeps gradient fixed on scroll
- Use case: Hero sections, premium backgrounds, sci-fi/futuristic feel

---

### Recipe 13: Glowing Orb (With Animation)

```css
.gradient-orb {
  position: relative;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.5) 0%, transparent 70%);
  border-radius: 50%;
  width: 300px;
  height: 300px;
  filter: blur(40px);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
```

**Properties**:
- Radial gradient in circle
- Heavy blur creates glow
- Animation adds breathing effect
- Use case: Background decoration, hover effects, attention-grabbing

---

## Background Blend Modes

### Recipe 14: Multiply Blend (Color Mixing)

```css
.blend-multiply {
  background:
    url('data:image/svg+xml;...') center/cover,
    linear-gradient(135deg, #FF6B6B, #4D96FF);
  background-blend-mode: multiply;
}
```

**Blend modes**:
- `multiply`: Darkens, emphasizes colors
- `screen`: Lightens, bleaches colors
- `overlay`: Combines multiply + screen
- `lighten`: Keeps lighter pixels
- `darken`: Keeps darker pixels
- `difference`: Creates high contrast
- `hue`: Applies hue without changing lightness

---

### Recipe 15: Overlay Blend (Advanced)

```css
.blend-overlay {
  background: linear-gradient(135deg, #FF6B6B, #4D96FF);
  background-image:
    url('data:image/png;base64,...'),
    linear-gradient(135deg, #667EEA, #764BA2);
  background-blend-mode: overlay;
}
```

**Properties**:
- Image layer + gradient layer
- `overlay` blend mode creates effect of lighting
- Use case: Photos with color overlay, artistic effects

---

## Complete Examples (Copy-Paste Ready)

### Complete Example 1: Hero Section Background

```html
<style>
  .hero {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(255, 107, 107, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(77, 150, 255, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 0%, rgba(255, 217, 61, 0.4) 0%, transparent 50%),
      linear-gradient(135deg, #F3F4F6, #E5E7EB);
    z-index: -1;
  }

  .hero h1 {
    color: #1F2937;
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
  }
</style>

<section class="hero">
  <h1>Welcome to Our Site</h1>
</section>
```

---

### Complete Example 2: Card with Glassmorphism

```html
<style>
  .card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .card h3 {
    color: #000;
    margin-top: 0;
  }

  .card p {
    color: #4B5563;
    line-height: 1.6;
  }

  .card button {
    background: linear-gradient(135deg, #3B82F6, #8B5CF6);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
</style>

<div class="card">
  <h3>Premium Feature</h3>
  <p>Unlock advanced capabilities with our premium plan.</p>
  <button>Learn More</button>
</div>
```

---

### Complete Example 3: Animated Aurora Background

```html
<style>
  .aurora-bg {
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(0, 255, 150, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 0%, rgba(100, 200, 255, 0.2) 0%, transparent 50%),
      linear-gradient(180deg, #0A0E27, #1A1A3E);
    background-attachment: fixed;
    animation: shift 10s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes shift {
    0%, 100% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
  }

  .content {
    position: relative;
    color: white;
    padding: 40px;
    text-align: center;
  }
</style>

<div class="aurora-bg"></div>
<div class="content">
  <h1>Aurora Effects</h1>
  <p>Premium sci-fi aesthetic</p>
</div>
```

---

## Performance Tips

1. **Use CSS gradients** over images for smaller file size
2. **Avoid too many gradients** — 3 layers max for performance
3. **Use `background-attachment: fixed`** sparingly (slower on mobile)
4. **SVG noise** is lighter than PNG textures
5. **Test on mobile** — complex gradients can lag on low-end devices

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Linear Gradient | ✓ | ✓ | ✓ | ✓ |
| Radial Gradient | ✓ | ✓ | ✓ | ✓ |
| Conic Gradient | ✓ | ✓ | ✓ (15+) | ✓ |
| backdrop-filter | ✓ | ✗ | ✓ | ✓ |
| background-blend-mode | ✓ | ✓ | ✓ | ✓ |
| feTurbulence (SVG) | ✓ | ✓ | ✓ | ✓ |

---

## Related Tools

- **Grainient**: https://grainient.supply/ (visual gradient builder)
- **Gradient Generator**: https://cssgradient.io/
- **Aurora Gradient Tool**: https://www.gradient-animator.com/
- **Glassmorphism Generator**: https://glassmorphism.com/
- **Color Blend Mode Tester**: https://caniuse.com/css-background-blend-mode
