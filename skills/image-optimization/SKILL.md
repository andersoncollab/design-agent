---
name: image-optimization
description: Image optimization patterns for web performance — format selection (AVIF, WebP, JPEG), responsive srcset, lazy loading, blur-up placeholders, CDN strategies, and Core Web Vitals impact. Trigger: "image optimization", "responsive images", "image performance", "lazy loading images".
version: 1.0.0
license: MIT
---

# Image Optimization Skill

## Purpose

Image optimization is the single biggest performance lever for most websites. This skill covers format selection, responsive delivery, loading strategies, and integration with modern frameworks. Properly optimized images reduce file size by 50-80%, improve Core Web Vitals (LCP, CLS), and directly impact conversion rates and SEO rankings.

## When to Use

- **Building image-heavy pages**: Product galleries, portfolios, case studies, hero sections
- **Optimizing Core Web Vitals**: LCP (Largest Contentful Paint) is image-dominated for most sites
- **Responsive design implementation**: Serving different image sizes to mobile/tablet/desktop
- **Choosing image CDN strategy**: Cloudflare Images vs Imgix vs Cloudinary vs self-hosted
- **Performance audit**: Identifying images causing slowdown via DevTools or Lighthouse
- **Framework integration**: Next.js Image, Astro Image, vanilla HTML `<picture>` element

Trigger phrases: "how do I optimize images?", "responsive images srcset", "lazy loading", "image format", "Core Web Vitals image", "LCP optimization".

## Key Concepts

### Format Hierarchy

Use this decision tree for every image:

1. **AVIF** (best compression, 50% smaller than JPEG, 30% smaller than WebP)
   - Suitable for: Photographs, complex graphics, hero images
   - Browser support: 96% (2024+)
   - Quality: 50-65 (AVIF quality values are different than JPEG)
   - Fallback: Must provide WebP + JPEG
   - Tool: `ffmpeg -i input.jpg -vf scale=1920:-1 -c:v libaom-av1 -b:v 0 -crf 30 output.avif`

2. **WebP** (universal modern format, 95% support)
   - Suitable for: Photographs, illustrations, any general purpose
   - Browser support: 95% (all modern browsers)
   - Quality: 75-85
   - Fallback: JPEG always required for old browsers
   - Tool: `cwebp -q 80 input.jpg -o output.webp`

3. **JPEG** (universal fallback, always needed)
   - Suitable for: Photographs, complex colors
   - Quality: 80-90 (hero images 85+, thumbnails 75)
   - Always include as fallback in `<picture>` element
   - Tool: `jpegoptim --max=85 --strip-all input.jpg`

4. **PNG** (transparency only)
   - DO NOT use for photographs (5x larger than JPEG)
   - Use ONLY when transparency required
   - Always compress with `pngquant` or `optipng`
   - Alternative: PNG with WebP for modern browsers

5. **SVG** (icons, logos, scalable graphics)
   - Use for: Icons, logos, diagrams (vector graphics)
   - Much smaller than PNG for simple graphics
   - Animate with CSS/JS (no raster degradation)
   - Compress with SVGOMG (remove metadata, simplify paths)

**Never use GIF** — replace with WebP/AVIF video or PNG.

### Responsive Images

Serve different sizes to different devices. Three approaches:

#### 1. Responsive Srcset + Sizes (Recommended)

```html
<img
  src="image-480w.jpg"
  srcset="
    image-320w.jpg 320w,
    image-640w.jpg 640w,
    image-960w.jpg 960w,
    image-1280w.jpg 1280w,
    image-1920w.jpg 1920w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
  alt="Descriptive alt text"
  width="1920"
  height="1080"
/>
```

- **srcset**: List of image URLs and their width (e.g., `640w` = 640px wide)
- **sizes**: CSS media queries + viewport width. Tells browser which image to download
- **width/height**: Critical — prevents CLS shift when image loads
- Generate 4-6 sizes: 320w (mobile), 640w (mobile landscape), 960w (tablet), 1280w (tablet landscape), 1920w (desktop)

#### 2. Picture Element + Format Fallbacks

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Text" width="1920" height="1080" />
</picture>
```

- Combine with srcset for full responsiveness + format negotiation
- Browser uses first matching `<source>` (order matters)
- Always end with `<img>` for fallback

#### 3. Picture + Srcset + Sizes (Full Power)

```html
<picture>
  <source
    media="(max-width: 640px)"
    srcset="image-mobile.avif 1x, image-mobile-2x.avif 2x"
    type="image/avif"
  />
  <source
    srcset="image.avif 1x, image-2x.avif 2x"
    type="image/avif"
  />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Text" width="1920" height="1080" loading="lazy" />
</picture>
```

Art direction: Different crops at different breakpoints (portrait phone, landscape tablet, full desktop).

### Loading Strategies

| Strategy | When | Impact | Example |
|----------|------|--------|---------|
| **Eager (default)** | Above-fold, hero, LCP image | Fast LCP | Hero background |
| **Lazy** | Below-fold, thumbnails, carousel | Faster initial load | Product gallery cards |
| **Preload** | Critical images needed immediately | Very fast LCP | Hero image |

**Eager (no delay)**: Use for hero, header, LCP images.

```html
<img src="hero.jpg" alt="Hero" width="1920" height="600" />
```

**Lazy (native)**: Use for below-fold images, thumbnails, infinite scroll.

```html
<img src="thumbnail.jpg" alt="Thumbnail" loading="lazy" width="320" height="240" />
```

Native `loading="lazy"` works in 97% of browsers. Loads image only when near viewport.

**Preload**: Use for critical images to start downloading immediately.

```html
<link rel="preload" as="image" href="hero.jpg" imagesrcset="hero-320w.jpg 320w, hero-1920w.jpg 1920w" />
```

**Preload for LCP**: Combine with `fetchpriority="high"` to ensure hero image loads before other resources.

```html
<img
  src="hero.jpg"
  alt="Hero"
  fetchpriority="high"
  width="1920"
  height="600"
/>
```

### Preventing Layout Shift (CLS)

Always specify `width` and `height` to prevent Cumulative Layout Shift. Browser calculates aspect ratio from these.

```html
<!-- GOOD: Aspect ratio maintained, no shift -->
<img src="image.jpg" alt="Text" width="1920" height="1080" />

<!-- BAD: Browser doesn't know height, shifts when image loads -->
<img src="image.jpg" alt="Text" />
```

Without dimensions, the browser allocates zero height initially, then shifts content when image loads. This causes CLS penalty.

### Blur-Up Placeholder Technique

Load a small blurred image first, then swap to full image when it loads:

```html
<img
  src="image-640w.jpg"
  srcset="
    image-320w.jpg 320w,
    image-1920w.jpg 1920w
  "
  alt="Text"
  width="1920"
  height="1080"
  style="filter: blur(20px); opacity: 0.8;"
  onload="this.style.filter='none'; this.style.opacity='1';"
/>
```

Or use CSS + JavaScript:

```css
.image-placeholder {
  background: linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 25%, #e0e0e0 50%, #f0f0f0 50%, #f0f0f0 75%, #e0e0e0 75%);
  background-size: 20px 20px;
  filter: blur(10px);
}

.image-loaded {
  filter: blur(0);
  transition: filter 0.3s ease;
}
```

```js
const img = new Image();
img.onload = () => {
  originalImg.src = img.src;
  originalImg.classList.add('image-loaded');
};
img.src = fullSizeUrl;
```

**LQIP (Low Quality Image Placeholder)**: Encode tiny JPEG (50px wide) as base64 and inline:

```html
<img
  src="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  alt="Text"
  width="1920"
  height="1080"
/>
```

Then swap with full image on load.

### CDN and Auto-Format

Modern CDNs negotiate format and size via URL parameters:

**Cloudflare Images**:
```
https://example.com/image.jpg?format=webp&width=640&quality=85
```

**Imgix**:
```
https://example.imgix.net/image.jpg?w=640&q=85&auto=format
```

**Cloudinary**:
```
https://res.cloudinary.com/demo/image/upload/c_scale,w_640,q_auto,f_auto/image.jpg
```

CDNs handle all format conversion, responsive serving, and optimization. Offloads processing from your server.

### Core Web Vitals Impact

Images directly affect three Core Web Vitals:

1. **LCP (Largest Contentful Paint)** — Often an image. Optimize hero image with preload + eager loading.
2. **CLS (Cumulative Layout Shift)** — Caused by images without width/height. Always set dimensions.
3. **TTFB (Time to First Byte)** — CDN caching reduces server latency for images.

Use DevTools → Lighthouse → Performance to identify image bottlenecks.

### Framework Integration

**Next.js Image Component**:
```tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      priority // Equivalent to preload + fetchpriority="high"
      quality={85}
    />
  );
}
```

**Astro Image**:
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../images/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero"
  quality="high"
/>
```

**Vanilla HTML** (Production-ready):
```html
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img
    src="hero.jpg"
    alt="Hero image"
    width="1920"
    height="1080"
    fetchpriority="high"
    loading="eager"
  />
</picture>
```

## Quality Settings Reference

| Format | Hero Image | Product Photo | Thumbnail | Quality Value |
|--------|-----------|---------------|-----------|---------------|
| AVIF | 55 | 50 | 40 | Lower = better compression |
| WebP | 85 | 80 | 70 | Higher = better quality |
| JPEG | 90 | 85 | 75 | Standard quality values |

Test output with Lighthouse DevTools. Aim for "no noticeable degradation" at specified quality.

## Image Size Guidelines

Generate responsive sizes for common use cases:

| Use Case | Breakpoints | Widths |
|----------|------------|--------|
| Full-width hero | Mobile, tablet, desktop | 320w, 768w, 1920w |
| Two-column layout | Mobile, tablet, desktop | 320w, 400w, 960w |
| Three-column layout | Mobile, tablet, desktop | 320w, 350w, 640w |
| Thumbnail | All | 160w, 320w |
| Product image | Mobile, desktop | 480w, 1080w |

## Common Pitfalls

1. **No width/height specified** → CLS shift when image loads. Set dimensions always.
2. **Serving desktop images to mobile** → Wasted bandwidth. Use responsive srcset.
3. **Lazy loading the LCP image** → Slows Largest Contentful Paint. Use `priority` or `fetchpriority="high"`.
4. **Using PNG for photographs** → 5x larger than JPEG. PNG only for transparency.
5. **No `<picture>` fallback chain** → Old browsers fail. Always provide JPEG fallback.
6. **CDN without auto-format** → Users on old browsers get WebP (unsupported). Use format negotiation.
7. **No blur-up placeholder** → Perceived slowness. Use LQIP or dominant color background.
8. **Images in `<div>` instead of `<img>`** → No semantics, accessibility fail. Use `<img>` + alt text.
9. **Alt text too short or missing** → Accessibility and SEO suffer. Describe image content.
10. **Not preloading hero image** → Slow LCP. Add `<link rel="preload">` for critical images.

## Build Tools

### Sharp (Node.js)
```js
const sharp = require('sharp');

await sharp('input.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .toFormat('avif', { quality: 55 })
  .toFile('output.avif');
```

### Astro Assets Pipeline
Astro automatically optimizes images, generates responsive sizes, and provides TypeScript support.

### Next.js Image Component
Built-in optimization: format negotiation, responsive delivery, lazy loading, blur placeholder.

### ImageOptim (macOS)
GUI tool: Drag images, optim automatically compresses. No quality loss.

## References & Resources

- **Web.dev Image Optimization Guide**: https://web.dev/learn/images
- **Sharp Documentation**: https://sharp.pixelplumbing.com
- **MDN Responsive Images**: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **Core Web Vitals Guide**: https://web.dev/vitals
- **Cloudflare Images**: https://www.cloudflare.com/products/cloudflare-images/
- **WebP Specification**: https://developers.google.com/speed/webp
- **AVIF Format**: https://en.wikipedia.org/wiki/AVIF

## Related Skills

- `responsive-patterns` — Responsive design framework
- `landing-page-patterns` — Hero + CTA optimization
- `performance-audit` — Full page performance analysis
- `accessibility-system` — Alt text and image semantics
