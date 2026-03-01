---
name: social-media-design
description: Complete platform specs and production templates for Instagram, Facebook, LinkedIn, TikTok, X/Twitter, Pinterest, and YouTube. Use for dimension-accurate creatives, safe zone guidelines, and responsive social preview cards. Trigger: "social post", "instagram story", "tiktok video", "linkedin carousel", "platform-specific dimensions".
version: 1.0.0
license: MIT
---

# Social Media Design Skill

## Purpose

Social media platforms each demand unique dimensions, aspect ratios, and text constraints. Creating content at the wrong size tanks engagement—cropped logos, unreadable text, awkward spacing. This skill provides exact platform specifications, safe zones, file requirements, and production-ready Tailwind CSS preview templates so you never ship suboptimal social creatives again.

## When to Use

- **Platform-specific creatives**: Designing posts, stories, or video for any major social platform
- **Multi-platform campaigns**: Creating the same content in platform-native formats
- **Social media calendars**: Pre-flight check before scheduling posts across networks
- **Brand consistency**: Ensuring logos, text, and CTAs stay visible across platforms
- **Team handoff**: Specifying exact dimensions and safe zones to freelance designers
- **Content calendars**: Batch-creating social content at correct sizes upfront
- **Paid social**: Meta Ads, LinkedIn ads, TikTok ads require precise specs to avoid auto-cropping

Trigger phrases: "what size for instagram", "facebook post dimensions", "linkedin story", "tiktok upload", "x header image", "youtube thumbnail", "safe zone", "text limits per platform".

## Key Concepts

### Safe Zones
Most platforms crop content in different contexts (feed, story, ads, mobile). Content outside safe zones may be hidden. Always keep logos, text, and CTAs inside the safe zone—usually 10-20% inset from edges.

### Aspect Ratios
Aspect ratio is width:height. `1080x1080 = 1:1 square`, `1080x1920 = 9:16 tall`, `1200x628 = 1.91:1 wide`. Always design AT the platform ratio—scaling distorts images.

### Text Overlay Limits
Meta formally retired the strict 20% text penalty in 2021, but images with excessive text still see reduced reach algorithmically. Best practice: keep text coverage under 20% for maximum distribution. Other platforms (Pinterest, LinkedIn) have their own thresholds documented below.

### File Formats & Size
- **JPG**: Best for photos, ~200-500KB
- **PNG**: Transparent backgrounds needed? Use PNG (~300KB)
- **MP4/WebM**: Video format, H.264 codec recommended
- **GIF**: Animated, limit to 5-10MB for instant loading

### Mobile-First Reality
85% of social traffic is mobile. Design for mobile first—desktop just gets extra breathing room.

## Platform Specifications

### Instagram
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Feed Post | 1080×1080 | 1:1 | 100×100 to 980×980 | 17% | JPG/PNG | 8MB |
| Story | 1080×1920 | 9:16 | 100×100 to 980×1820 | 17% | JPG/PNG/MP4 | 100MB |
| Reel | 1080×1920 | 9:16 | Safe to edges | 17% | MP4 | 4GB |
| Carousel (per slide) | 1080×1080 | 1:1 | 100×100 to 980×980 | 17% | JPG/PNG | 8MB |
| Profile Picture | 320×320 | 1:1 | Full crop | — | JPG/PNG | 4MB |

**Design Rules**:
- Use **Helvetica Neue, Roboto, or San Francisco** for body text (min 24pt)
- Keep subject (person/product) in center zone (300-780px horizontal, 300-1620px vertical for stories)
- Avoid thin strokes (<2px) in UI elements—they vanish on mobile
- CTAs in bottom 20% for stories (swipe-up hotspot)

### Facebook
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Feed Post | 1200×630 | 1.91:1 | 50px inset | 20% | JPG/PNG | 4MB |
| Story | 1080×1920 | 9:16 | 54×54 to 1026×1866 | 17% | JPG/PNG/MP4 | 4GB |
| Cover Photo | 820×312 | 2.62:1 | Center 50% | 20% | JPG/PNG | 8MB |
| Event Cover | 1920×1005 | 1.91:1 | 200px inset | 20% | JPG/PNG | 4MB |
| Profile Picture | 320×320 | 1:1 | Full frame | — | JPG/PNG | 4MB |

**Design Rules**:
- Headline text should be >60pt for readability in feed
- Product/subject must fit in center 50% to avoid mobile crop
- Use dark text on light backgrounds for 4.5:1 contrast minimum
- Stories support video up to 120 seconds

### LinkedIn
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Feed Post | 1200×627 | 1.91:1 | 100px inset | 20% | JPG/PNG | 10MB |
| Carousel | 1080×1080 | 1:1 | 100px inset | 20% | JPG/PNG | 10MB per |
| Article Cover | 1200×644 | 1.86:1 | 100px inset | 20% | JPG/PNG | 10MB |
| Company Cover | 1128×191 | 5.9:1 | 100px inset on sides | — | JPG/PNG | 4MB |
| Profile Picture | 400×400 | 1:1 | Full frame | — | JPG/PNG | 10MB |
| Document | 1200×1200+ | 1:1+ | 100px inset | — | PDF/JPG/PNG | 100MB |

**Design Rules**:
- LinkedIn users are on desktop (60%+) but design for mobile-first anyway
- Use professional sans-serif: Inter, Montserrat, or system fonts
- Carousel cards should tell a story sequentially—make the first card a hook
- Video min 120×120px, max 15GB, auto-plays muted (no audio needed)

### TikTok
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| In-Feed Video | 1080×1920 | 9:16 | 100×200 inset | 17% | MP4/WebM | 287.6MB |
| Thumbnail | 1920×1080 | 16:9 | — | — | JPG/PNG | 1MB |
| Profile Picture | 200×200 | 1:1 | Full frame | — | JPG/PNG | — |
| TopView Video | 1080×1920 | 9:16 | — | — | MP4 | 287.6MB |

**Design Rules**:
- TikTok = full-screen vertical. Aspect ratio is 9:16 ALWAYS.
- Captions/text should be >30pt for readability during quick scroll
- Motion graphics > static. Text animations hold attention +0.5sec per slide
- Audio is CRITICAL—mute text overlays that explain all audio content
- Trending sounds get 3-5x more plays than original audio

### X / Twitter
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Post Image | 1600×900 | 16:9 | 100px inset | 20% | JPG/PNG/GIF | 5MB |
| Header Banner | 1500×500 | 3:1 | Center 1000×400 | — | JPG/PNG | 5MB |
| Profile Picture | 400×400 | 1:1 | Full frame | — | JPG/PNG | 2MB |
| GIF | 1600×900 | 16:9 | — | — | GIF | 15MB |

**Design Rules**:
- Twitter crops images aggressively on mobile—keep focal point center
- Text should be >20pt for tweets, >24pt for quote retweets
- Use high contrast (white text on dark background or vice versa)
- Gifs support looping; keep under 5MB for instant loading

### Pinterest
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Pin | 1000×1500 | 2:3 | 100px inset | 10% | JPG/PNG | 20MB |
| Board Cover | 600×600 | 1:1 | 50px inset | 20% | JPG/PNG | 5MB |
| Rich Pin | 1000×1500 | 2:3 | 100px inset | 10% | JPG/PNG | 20MB |
| Idea Pin (video) | 1080×1920 | 9:16 | — | — | MP4 | 500MB |

**Design Rules**:
- Tall pins (2:3) outperform wide pins 2-3x on Pinterest
- Pins with faces get 40% more saves if face is centered, emotion visible
- Text overlay should be <10% of image to avoid "spam pin" classification
- Use bold, contrasting colors—Pins scroll fast

### YouTube
| Type | Dimensions | Aspect | Safe Zone | Max Text | File Format | Max Size |
|------|-----------|--------|-----------|----------|-------------|----------|
| Thumbnail | 1280×720 | 16:9 | 60px inset | High contrast title | JPG/PNG | 2MB |
| Channel Banner | 2560×1440 | 16:9 | Center 1546×423 | — | JPG/PNG | 6MB |
| Community Post | 1200×675 | 16:9 | 100px inset | 20% | JPG/PNG | — |
| Video | varies | 16:9 or 9:16 | — | — | MP4/WebM | — |

**Design Rules**:
- Thumbnails display at 320×180 on desktop feeds—text must be readable at that size
- Use primary color + yellow/red for CTAs (highest eye-draw)
- Faces in thumbnails get 30% more clicks if emotion is clear
- Channel banner spans 16:9 but displays different crops on desktop/mobile/TV (safe zone = center)
- Text in thumbnails: max 2-3 words, >40pt

## Design Rules: Universal

### Text-to-Image Ratio
- **Optimal**: 10-15% text coverage (measured in pixels)
- **Safe**: 15-20% (Facebook/LinkedIn allow up to 20%)
- **Penalty zone**: >20% (algorithms across platforms reduce reach — Meta retired its hard rule in 2021 but still penalizes algorithmically)
- **Tool**: `(text pixels) / (total image pixels)` = ratio

### CTA Placement
- **Stories**: Bottom 15% (safe tap zone)
- **Feed posts**: Bottom 20% for "Tap Bio" CTAs
- **Carousels**: First slide hook, last slide CTA
- **Videos**: On-screen text at 2-3 seconds, repeat at 50%, end with CTA

### Brand Consistency Across Platforms
1. Logo placement: Top-left or center (never crop)
2. Color palette: Use 3-5 colors max per platform
3. Typography: Use same font family, 2-3 weights max
4. Margin/padding: Consistent inset from safe zones

## Production Templates

### Responsive Social Card (Tailwind CSS)
```html
<div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
  <!-- Social platform indicator -->
  <div class="px-4 py-2 bg-gray-100 flex items-center justify-between">
    <span class="text-xs font-semibold text-gray-600">Instagram Feed Post</span>
    <span class="text-xs text-gray-500">1080×1080</span>
  </div>

  <!-- Preview container (1:1 aspect ratio for Instagram) -->
  <div class="bg-gray-200 aspect-square flex items-center justify-center overflow-hidden">
    <img src="preview.jpg" alt="Instagram post preview" class="w-full h-full object-cover">
  </div>

  <!-- Specs panel -->
  <div class="p-4 space-y-2 text-sm">
    <div class="flex justify-between">
      <span class="font-semibold text-gray-700">Dimensions</span>
      <span class="text-gray-600">1080×1080 (1:1)</span>
    </div>
    <div class="flex justify-between">
      <span class="font-semibold text-gray-700">Max Text</span>
      <span class="text-gray-600">17%</span>
    </div>
    <div class="flex justify-between">
      <span class="font-semibold text-gray-700">Format</span>
      <span class="text-gray-600">JPG/PNG (8MB max)</span>
    </div>
    <div class="border-t pt-2 mt-2">
      <p class="text-xs text-gray-600 font-mono">Safe zone: 100×100 to 980×980</p>
    </div>
  </div>
</div>
```

### Multi-Platform Preview Grid
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <!-- Instagram 1:1 -->
  <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
    <img src="ig-square.jpg" alt="Instagram" class="w-full h-full object-cover">
  </div>

  <!-- Instagram Story 9:16 -->
  <div class="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
    <img src="ig-story.jpg" alt="Story" class="w-full h-full object-cover">
  </div>

  <!-- Facebook 1.91:1 -->
  <div class="aspect-[1.91/1] bg-gray-100 rounded-lg overflow-hidden">
    <img src="fb-wide.jpg" alt="Facebook" class="w-full h-full object-cover">
  </div>

  <!-- LinkedIn 1:1 -->
  <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
    <img src="li-square.jpg" alt="LinkedIn" class="w-full h-full object-cover">
  </div>

  <!-- TikTok 9:16 -->
  <div class="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
    <img src="tk-tall.jpg" alt="TikTok" class="w-full h-full object-cover">
  </div>

  <!-- X/Twitter 16:9 -->
  <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
    <img src="x-wide.jpg" alt="X" class="w-full h-full object-cover">
  </div>

  <!-- Pinterest 2:3 -->
  <div class="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
    <img src="pin-tall.jpg" alt="Pinterest" class="w-full h-full object-cover">
  </div>

  <!-- YouTube 16:9 -->
  <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
    <img src="yt-thumb.jpg" alt="YouTube" class="w-full h-full object-cover">
  </div>
</div>
```

## Examples

### Example 1: Instagram Post + Story from Single Asset
**Scenario**: You have a product photo. Create feed post + story variants.

**Feed Post** (1080×1080):
1. Start with 1200×1200 source image (larger = cleaner downsampling)
2. Crop to 1080×1080 center
3. Add logo in top-left (within safe zone 100×100 to 980×980)
4. Overlay text at bottom with 15% coverage max
5. Export as JPG (high quality, ~300KB)

**Story** (1080×1920):
1. Resize source to 1080 width
2. Create 1920px tall canvas (9:16)
3. Center product vertically (leave 200px top + 200px bottom for UI)
4. Add logo top-left (80×80px max)
5. Add CTA button mockup at bottom (within bottom 20%)
6. Export JPG/PNG

Both use identical color palette, logo, and typography—only layout differs.

### Example 2: LinkedIn Carousel Campaign
**Scenario**: 5-slide thought leadership carousel about "AI in Marketing"

**Slide 1** (1080×1080 = hook):
- Headline: "3 ways AI is changing marketing in 2026" (white text, dark blue background)
- No other text—pure hook

**Slides 2-4** (1080×1080 = explanations):
- Each slide: 1 insight + supporting stat + icon
- Text centered, 18pt body, 28pt headline
- Consistent color—alternate between brand colors for visual rhythm

**Slide 5** (1080×1080 = CTA):
- Recap headline
- "Learn more" button graphic
- Company logo + link

All images designed at exact 1080×1080 (no scaling).

### Example 3: YouTube Thumbnail
**Scenario**: SaaS product tutorial video

**Requirements**:
- Text: "How to Scale Your Agency" (bold, yellow text, 60pt)
- Image: Person pointing at screen (face visible, emotion clear)
- Color contrast: Thumbnail displays at 320×180—must be readable

**Design**:
1. Start with 1280×720 canvas
2. Place face image at left (60% of frame)
3. Add text block right (yellow on dark background, >50pt)
4. Add arrow pointing to key UI (red stroke, 3px)
5. Export JPG, verify at 320×180 crop

## Common Pitfalls

### Antipattern 1: Same Creative Across All Platforms
**Bad**: One 1080×1080 image copied to Instagram, Facebook, LinkedIn, Twitter (looks cropped/wrong aspect on each).
**Good**: Design native versions for each platform's dimensions. Use templates to speed up.

### Antipattern 2: Text in Safe Zone Edge
**Bad**: Logo at edge of frame—gets cropped on mobile or zoomed view.
**Good**: Logo must be minimum 100px inset on all sides (check platform's safe zone).

### Antipattern 3: Thin Strokes & Small Type
**Bad**: 1px hairline borders, 12pt text. Fine on desktop, invisible on mobile.
**Good**: Minimum 2px strokes, 18pt body text (20pt+ for headlines).

### Antipattern 4: Ignoring Text-to-Image Ratio
**Bad**: 40% text coverage (full paragraphs on image). Meta penalizes reach, Pinterest flags as spam.
**Good**: Limit text to 10-17% (1-2 short lines max per platform).

### Antipattern 5: RGB Colors in Exported Files
**Bad**: Export as RGB JPG, Platform converts unpredictably.
**Good**: Export all social files in sRGB or Adobe RGB for consistent color (JPG handles RGB fine).

### Antipattern 6: Forgetting Video Aspect Ratio
**Bad**: Upload 16:9 video to TikTok (9:16). Letterboxes with black bars.
**Good**: TikTok = 9:16 ALWAYS. Film vertical or shoot at 1:1 and add safe margins.

### Antipattern 7: No Safe Zone Testing
**Bad**: Design at home, upload, see logo cut off on some devices.
**Good**: Download platform's specs, outline safe zone in Figma, design within bounds, test preview before posting.

## References

- **Meta Social Assets**: [Facebook Brand Assets](https://www.facebook.com/brandresources/) — official specs
- **Instagram Specs**: [Instagram Help Center - Image & Video Specs](https://help.instagram.com/1631821640426723)
- **LinkedIn Media Guide**: [LinkedIn Content Best Practices](https://business.linkedin.com/en-us/marketing-solutions/linkedin-pages/audience-insights-for-pages)
- **TikTok Creator Handbook**: [TikTok for Business](https://www.tiktok.com/business/en/blog)
- **X/Twitter Specs**: [Twitter Media Policy](https://help.twitter.com/en/using-twitter/twitter-media-best-practices)
- **Pinterest Best Practices**: [Pinterest Business — Specs & Best Practices](https://business.pinterest.com/en/)
- **YouTube Creator Specs**: [YouTube Thumbnail & Banner Guide](https://support.google.com/youtube/answer/183805)
- **Design Tools**: Figma, Adobe XD (build responsive artboards at exact dimensions)
- **Related Skills**: `ad-creative-design`, `client-deliverables`
