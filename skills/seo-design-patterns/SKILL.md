---
name: seo-design-patterns
description: Design patterns that impact SEO — semantic HTML structure, heading hierarchy, structured data (JSON-LD), internal linking architecture, image SEO, Core Web Vitals design choices, and mobile-first indexing compliance. Trigger: "SEO design", "structured data", "semantic HTML", "heading hierarchy", "schema markup".
version: 1.0.0
license: MIT
---

## Purpose

Design decisions directly impact search rankings. This skill bridges the gap between visual design and SEO by covering the patterns search engines understand and reward: semantic HTML that structures information correctly, structured data that wins rich snippets, heading hierarchies that shape discoverability, and Core Web Vitals design choices that affect ranking signals. You are not an SEO strategist—you are a designer who understands how your HTML decisions and interaction patterns affect discoverability and search performance.

**Who uses it**: Front-end developers, product designers, design systems leads, SEO specialists designing new pages, content designers structuring information.

**When to use it**: Building new pages or sites, auditing designs for SEO impact, implementing rich snippets, designing navigation and internal linking architecture, optimizing for Core Web Vitals without sacrificing user experience.

---

## When to Use

- **New site or page launch**: Bake in semantic structure from day one. Don't retrofit later.
- **Redesign existing content**: Audit heading hierarchy, internal links, and structured data. Fix broken outline.
- **Rich snippet opportunity**: Article, FAQ, Product, HowTo, LocalBusiness—pick the right schema.
- **Navigation overhaul**: Design hub-and-spoke internal linking, breadcrumbs, related content patterns.
- **Image-heavy pages**: Optimize filenames, alt text, lazy loading, dimensions to prevent CLS.
- **Core Web Vitals optimization**: Optimize hero images (LCP), add explicit dimensions (CLS), lightweight interactions (INP).
- **Mobile redesign**: Ensure touch targets, readable fonts, no horizontal scroll, thumb-zone UX.

**Not for**: Meta description keyword stuffing. Schema markup spam. Buying backlinks. Pretending design choice X is an SEO solution when it isn't.

---

## Key Concepts

### Semantic HTML: Search Engines Read Structure, Not Pixels

Search engines parse your HTML landmark roles and heading outline to understand page structure. Visual design matters, but the code underneath matters more. One `<h1>`, logical nesting, semantic elements tell search engines what's important.

| Element | Role | Purpose | Rules |
|---------|------|---------|-------|
| `<h1>` | Page primary heading | Main topic of page | One per page only |
| `<h2>` | Major sections | Divides main topic | Multiple OK, must follow h1 |
| `<h3>` | Subsections | Details under h2 | Never skip from h1→h3 |
| `<main>` | banner | Primary content region | One per page |
| `<nav>` | navigation | Navigation links | Primary + secondary OK |
| `<article>` | — | Self-contained content | Use for blog posts, cards |
| `<section>` | region (if named) | Thematic grouping | Needs aria-label if not obvious |
| `<aside>` | complementary | Sidebar, related items | Related to main content |
| `<header>` | banner (if outside article) | Site header | Top of page |
| `<footer>` | contentinfo (if site-wide) | Site footer | Bottom of page |

**Implication**: Your heading hierarchy shapes the information architecture. Flat structure (all h2s) loses hierarchy. Multiple h1s confuses search engines about page focus.

---

### Structured Data (JSON-LD): Rich Snippets, Knowledge Panels, Featured Snippets

Structured data tells search engines the *type* of content and its *properties*. JSON-LD embedded in `<script type="application/ld+json">` is the standard.

**Common schemas your designer should know**:

| Schema | When to Use | Search Result | Example |
|--------|-------------|----------------|---------|
| **Organization** | Home page, about page | Knowledge panel with logo, contact, social | Name, logo, contact info, social profiles |
| **Article** | Blog posts, news, guides | Rich snippet with image, publication date, author | Headline, image, publish date, author, body |
| **FAQPage** | FAQ sections | Accordion snippets with Q&A visible in results | Questions, answers (HTML allowed) |
| **Product** | Product pages, reviews | Price, rating, availability in results | Name, price, rating, review count, image |
| **BreadcrumbList** | Multi-level navigation | Breadcrumb path in results | Breadcrumb trail (Home > Category > Page) |
| **HowTo** | Step-by-step guides | Expandable steps in results | Steps with descriptions, images, videos |
| **LocalBusiness** | Business sites | Map, hours, phone in Knowledge panel | Name, address, phone, hours, image |

**Rule**: One Organization schema per site. One primary schema per page (Article for blogs, Product for product pages, etc.).

---

### Heading Hierarchy: The Information Architecture Signal

Search engines use heading hierarchy to understand page structure. Google's algorithms rank content based on context established by headings.

**Correct hierarchy**:
```
<h1>Page Topic</h1>           <- Primary topic
  <h2>Main Section</h2>       <- Major subtopic
    <h3>Subsection</h3>       <- Detail under h2
  <h2>Another Section</h2>    <- Back to level 2
```

**Wrong—skipped levels**:
```
<h1>Page Topic</h1>
<h3>Subsection</h3>           <- WRONG: Should be h2
```

**Wrong—multiple h1s**:
```
<h1>Page Topic</h1>
<h1>Another Topic</h1>        <- WRONG: Confuses primary topic
```

**Impact on ranking**: Clear hierarchy signals topical relevance. If you have h1→h3 jump, search engines assume h2 content is missing or less important. Ambiguous hierarchy = lower ranking.

---

### Internal Linking: Hub-and-Spoke Architecture

How you structure links shapes how search engines crawl and understand your site.

**Hub-and-Spoke pattern**:
- **Pillar page** (hub): Comprehensive guide on broad topic (e.g., "Beginner's Guide to Coffee")
- **Cluster pages** (spokes): Deep dives on subtopics (e.g., "Coffee Brewing Methods", "Espresso Machines")
- **Links**: Pillar links to all clusters. Clusters link back to pillar and to related clusters.

**Result**: Pillar page ranks for broad keywords (high search volume, harder). Clusters rank for specific keywords (lower volume, easier). Together they dominate the topic space.

**Breadcrumb navigation**: Link hierarchy visible to users and search engines.
```
Home > Coffee > Espresso Machines
```

**Related content**: Link to contextually relevant pages.
```
"See also: Best Espresso Machines" → links to cluster page
```

---

### Image SEO: Filenames, Alt Text, Dimensions, Lazy Loading

Images are indexed. Optimize them.

**Filename**: Descriptive, hyphenated, lowercase. Search engines read filenames.
```
GOOD: espresso-machine-pulls-shot.jpg
BAD: IMG_12345.jpg
```

**Alt text formula**: "Action + Subject + Context" (20-125 characters, plain language)
```
GOOD: "Barista pulling espresso shot from chrome machine"
BAD: "espresso machine"
BAD: "Barista pulling espresso shot from a shiny chrome machine in a cozy cafe with warm lighting and wooden accents" (too verbose)
```

**Dimensions**: Explicit `width` and `height` prevent layout shift (CLS).
```html
<img src="espresso.jpg" alt="..." width="400" height="300" />
```

**Lazy loading**: Defer off-screen images. Improves LCP (page load speed).
```html
<img src="espresso.jpg" alt="..." loading="lazy" width="400" height="300" />
```

**Format**: Use next-gen formats (WebP, AVIF) with fallbacks.
```html
<picture>
  <source srcset="espresso.avif" type="image/avif">
  <source srcset="espresso.webp" type="image/webp">
  <img src="espresso.jpg" alt="..." width="400" height="300" />
</picture>
```

---

### Core Web Vitals: Design Decisions That Affect Ranking Signals

Three metrics that directly impact ranking:

| Metric | Measures | Design Impact | Target |
|--------|----------|---|---|
| **LCP** (Largest Contentful Paint) | Largest element visible | Hero image size, font loading | < 2.5s |
| **CLS** (Cumulative Layout Shift) | Unexpected movement | Image dimensions, loading states | < 0.1 |
| **INP** (Interaction to Next Paint) | Responsiveness | Interaction complexity, JS size | < 200ms |

**Design patterns for each**:

**LCP**: Hero image is often LCP. Optimize:
- Reduce hero image file size (use WebP/AVIF, compress)
- Load critical font early (`<link rel="preload">`)
- Avoid `<script>` before hero image

**CLS**: Image without explicit dimensions shifts layout on load. Fix:
- Always add `width` and `height` to images
- Reserve space for ads, embeds, iframes
- Avoid inserting content above the fold after load

**INP**: Heavy interactions (filters, search) slow interactivity. Fix:
- Debounce interactions (don't update on every keystroke)
- Use `requestAnimationFrame` for smooth animations
- Lazy-load JavaScript for below-fold features

---

### Mobile-First Indexing: Design for Mobile, Optimize for Desktop

Google indexes mobile version. **Checklist**: Touch targets ≥48px, font ≥16px, no horizontal scroll, thumb-zone nav.

---

## Instructions

### Pattern 1: Semantic Page Structure (HTML Landmark Template)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Site Name</title>
  <meta name="description" content="Page meta description (155-160 chars)">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/page/">

  <!-- Open Graph (social preview) -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page/">

  <!-- Structured Data (primary schema) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Page Title",
    "description": "Page meta description",
    "image": "https://example.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "Your Site" },
    "datePublished": "2024-01-15"
  }
  </script>
</head>
<body>
  <!-- Skip link (first element) -->
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

  <!-- Banner (logo, main nav) -->
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Logo</a>
      <ul>
        <li><a href="/products/">Products</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </nav>
  </header>

  <!-- Primary content -->
  <main id="main-content">
    <h1>Page Title (One per page)</h1>

    <article>
      <h2>Main Section</h2>
      <p>Content...</p>

      <h3>Subsection</h3>
      <p>Content...</p>
    </article>

    <section aria-labelledby="related-heading">
      <h2 id="related-heading">Related Articles</h2>
      <ul>
        <li><a href="/article-1/">Related Article 1</a></li>
        <li><a href="/article-2/">Related Article 2</a></li>
      </ul>
    </section>
  </main>

  <!-- Sidebar (optional) -->
  <aside aria-labelledby="sidebar-heading">
    <h2 id="sidebar-heading">About This Topic</h2>
    <p>Additional context...</p>
  </aside>

  <!-- Site footer -->
  <footer>
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/privacy/">Privacy</a></li>
        <li><a href="/terms/">Terms</a></li>
      </ul>
    </nav>
  </footer>
</body>
</html>
```

---

### Pattern 2: JSON-LD Structured Data Templates

**Article Schema** (blog posts, guides):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Brew the Perfect Espresso",
  "description": "Step-by-step guide to brewing espresso at home",
  "image": "https://example.com/espresso-guide.jpg",
  "author": {
    "@type": "Person",
    "name": "Jane Barista"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
</script>
```

**FAQ Schema** (accordion, Q&A sections):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I clean my espresso machine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a damp cloth and espresso cleaner..."
      }
    },
    {
      "@type": "Question",
      "name": "What grind size for espresso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fine, consistent grind..."
      }
    }
  ]
}
</script>
```

**Product Schema** (e-commerce):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Espresso Machine Pro",
  "image": "https://example.com/machine.jpg",
  "description": "Professional espresso machine",
  "brand": { "@type": "Brand", "name": "CoffeeTech" },
  "offers": {
    "@type": "Offer",
    "price": "599.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "ratingCount": 126
  }
}
</script>
```

**BreadcrumbList Schema** (navigation path):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Coffee",
      "item": "https://example.com/coffee/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Espresso Machines",
      "item": "https://example.com/coffee/espresso/"
    }
  ]
}
</script>
```

---

### Pattern 3: Breadcrumb Component with Schema

React breadcrumb with auto-generated schema: Embed BreadcrumbList JSON-LD via `JSON.stringify()`, render nav with items linked, slash separators. Schema position tracks navigation depth.

---

### Pattern 4: Internal Linking Architecture (Hub-and-Spoke)

**Site structure**:
```
/coffee/                          <- Pillar page: "The Complete Coffee Guide"
  ├── /coffee/brewing-methods/    <- Cluster: "Coffee Brewing Methods"
  ├── /coffee/espresso-machines/  <- Cluster: "Best Espresso Machines"
  ├── /coffee/grind-size-guide/   <- Cluster: "Coffee Grind Sizes"
  └── /coffee/water-temperature/  <- Cluster: "Water Temperature Guide"
```

**Pillar page links to all clusters**:
```html
<h2>Brewing Methods</h2>
<ul>
  <li><a href="/coffee/brewing-methods/">French Press, Pour Over, AeroPress</a></li>
  <li><a href="/coffee/espresso-machines/">Espresso Basics</a></li>
  <li><a href="/coffee/grind-size-guide/">How Grind Size Affects Taste</a></li>
</ul>
```

**Cluster pages link back to pillar**:
```html
<p>Want a complete coffee education? Read the <a href="/coffee/">complete coffee guide</a>.</p>
```

**Cluster pages link to related clusters**:
```html
<h3>Related Topics</h3>
<ul>
  <li><a href="/coffee/water-temperature/">Water Temperature for Espresso</a></li>
  <li><a href="/coffee/grind-size-guide/">Grind Size for Espresso</a></li>
</ul>
```

---

### Pattern 5: Image SEO Checklist

- Filename: descriptive, hyphenated, lowercase
- Alt: action + subject + context (20-125 chars)
- Width/height: prevent CLS
- Format: WebP/AVIF with JPG fallback
- Lazy load: `loading="lazy"` for off-screen images
- File size: <200KB content, <50KB thumbnails
- Compress without quality loss

---

### Pattern 6: Meta Tags and OG Template

Essential meta tags: title, description (155-160 chars), canonical, OG (title, description, image, type, url), Twitter Card. Always include viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

## Common Pitfalls

1. **Multiple h1s** — Confuses primary topic. **Fix**: One h1 only, use h2 for sections.
2. **Skipping heading levels** (h1→h3) — Breaks hierarchy. **Fix**: h1→h2→h3 only.
3. **No structured data** — Missing rich snippets. **Fix**: Add Article, Product, FAQ, or BreadcrumbList JSON-LD.
4. **Orphaned pages** — No internal links → low crawl. **Fix**: Link from pillar, breadcrumbs, related content.
5. **Missing alt text** — Images not indexed. **Fix**: Descriptive alt (action+subject+context).
6. **Images without dimensions** — Layout shift (CLS). **Fix**: Always add width/height.
7. **Keyword-stuffed meta descriptions** — Bad CTR. **Fix**: Natural language, 155-160 chars.
8. **No canonical URL** — Duplicate content penalty. **Fix**: Add canonical link on every page.
9. **Flat IA** — No topic clustering. **Fix**: Design hub-and-spoke (pillar→clusters).
10. **Client-side rendering** — Search engines see blanks. **Fix**: Use SSR/static generation.

---

## References

- **Google Search Central**: https://developers.google.com/search
- **Schema.org**: https://schema.org
- **Web.dev SEO Guide**: https://web.dev/learn/performance
- **Google Core Web Vitals**: https://web.dev/vitals/
- **Related Skills**: `accessibility-system`, `responsive-patterns`, `image-optimization`, `landing-page-patterns`
