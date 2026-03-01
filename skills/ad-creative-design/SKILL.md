---
name: ad-creative-design
description: Paid ad creative specs for Google Display, Meta Feed/Stories/Carousel, LinkedIn, TikTok, and more. Covers dimensions, text limits, visual hierarchy, CTA placement, and asset requirements for Performance Max and programmatic campaigns. Trigger: "ad creative", "display ads", "facebook ad", "google ads", "tiktok ads", "responsive display ad", "ad copy limits".
version: 1.0.0
license: MIT
---

# Ad Creative Design Skill

## Purpose

Paid ad platforms have ruthless auto-cropping, strict text limits, and algorithmic penalization for poor design. A creative that performs well on Facebook bombs on TikTok Ads. A Google Responsive Display Ad at the wrong size tanks impression share. This skill provides exact specs, visual hierarchy rules, CTA patterns, and platform-specific copy integration so your ads pass quality review AND hit performance targets.

## When to Use

- **Performance Max campaigns** (Google, Meta): Need multiple asset dimensions and formats
- **Paid social scaling**: Facebook/Instagram/TikTok ads with copy + image integration
- **Retargeting creatives**: Ads for warm audiences with high brand awareness
- **Lead gen landing pages**: Multi-size ads driving to optimized forms
- **E-commerce product ads**: Meta Catalog feeds + dynamic creative optimization
- **B2B/SaaS campaigns**: LinkedIn ads with multi-image carousel sequences
- **Video ad production**: TikTok/YouTube pre-roll with specific safe zones
- **A/B testing creative**: Multiple sizes/formats for the same campaign
- **Team handoff**: Specifying exact dimension requirements to freelancers

Trigger phrases: "what size for google ads", "facebook ad specs", "text character limit", "responsive display ad dimensions", "ad creative best practices", "tiktok ad requirements", "linkedin ad specs", "cta button design for ads".

## Key Concepts

### Visual Hierarchy in Ads
Ads have 1-2 seconds to grab attention. Use:
- **F-Pattern**: Eyes scan left → right → down → left → right (best for text-heavy ads)
- **Z-Pattern**: Top-left → top-right → bottom-left → bottom-right (best for product focus)
- **Focal Point**: Central subject with supporting text/CTA around it
- **Contrast**: High contrast between subject and background (4.5:1 text:bg minimum)

### Text on Image Limits
- **Google Ads**: Max 20% text coverage (measured by pixel area). Over 20% = lower impression share
- **Meta**: Max 20% text, but <5% text = preferred (higher delivery)
- **LinkedIn**: No text limit, but keep readable on mobile
- **TikTok**: Text optional—focus on video motion/sound

### Aspect Ratios
Ads are delivered at multiple sizes in one campaign. A 16:9 video ad might be cropped to 1:1 (square) on mobile. Always test multiple aspect ratios.

### File Sizes & Specs
- **JPG/PNG**: Compressed to <500KB per image (mobile loading)
- **MP4 Video**: H.264 codec, AAC audio, max 15MB per clip
- **GIF**: If animating, keep <10MB
- **WebP**: Modern browsers; fallback to JPG for older devices

### Copy Integration
Ads are often copy + image. Headlines and descriptions have character limits PER PLATFORM. Always spec the copy requirements when handing off to copywriter.

## Platform Specifications

### Google Display Network (GDN)

#### Standard IAB Sizes
| Name | Dimensions | Aspect | Use Case | Text Limit | File Size |
|------|-----------|--------|----------|-----------|-----------|
| Medium Rectangle | 300×250 | 1.2:1 | Blog sidebars, content sites | 20% max | 150KB |
| Half Page | 300×600 | 1:2 | Sidebar, mobile | 20% max | 150KB |
| Leaderboard | 728×90 | 8:1 | Top/bottom web pages | 20% max | 150KB |
| Wide Skyscraper | 160×600 | 1:3.75 | Sidebar ads | 20% max | 150KB |
| Large Rectangle | 336×280 | 1.2:1 | Sidebar, content | 20% max | 150KB |
| Mobile Banner | 320×50 | 6.4:1 | Mobile top banner | Text only | 50KB |

#### Responsive Display Ads
- **Images**: Multiple sizes auto-resized (logo, image, image + logo combos)
- **Logo**: 128×128 recommended (used across sizes)
- **Large image**: 1200×628 or 1:1.91 aspect preferred
- **Square image**: 600×600 or 1:1 aspect
- **Text limit**: Headline 30 chars max, description 90 chars max

#### Performance Max
- **Image requirements**: Provide 3 different images (square, portrait, landscape)
- **Video**: Optional; if provided, min 10 seconds, max 30 seconds
- **Logo**: 1:1 or wider aspect, 128×128 min
- **Text specs**: Headline (up to 30 chars), Long headline (90 chars), Description (90 chars)
- **Aspect variations**: Platform auto-crops to 16:9, 1:1, 4:3, 3:4, 9:16

**Design Rules**:
- GDN ads are contextual (appear next to relevant content), not behavioral—design for brand awareness, not urgency
- Simplicity wins—avoid animation unless it adds clarity
- Logo prominent (top-left or center)
- CTA text should be on button or clear UI element

### Meta (Facebook, Instagram, Audience Network)

#### Feed Ads
| Platform | Dimensions | Aspect | Text Limit | Video Max | Copy Limits |
|----------|-----------|--------|-----------|-----------|------------|
| Facebook Feed | 1200×628 | 1.91:1 | <5% preferred | 240 seconds | Headline 25ch, Desc 97ch, CTA 17ch |
| Instagram Feed | 1080×1080 | 1:1 | <5% preferred | 60 seconds | Headline 25ch, Desc 300ch, CTA 17ch |
| Audience Network | 728×90 or 300×250 | Varies | <5% preferred | 15 seconds | Limited copy |

#### Stories/Reels Ads
- **Dimensions**: 1080×1920 (9:16, full screen)
- **Duration**: 5-15 seconds recommended (auto-plays muted)
- **Text**: Max 125 characters onscreen
- **CTA**: Bottom 20% reserved for swipe-up/link button
- **Audio**: Include captions or text overlay (muted by default)
- **Video format**: MP4, H.264, AAC, max 15MB

#### Carousel Ads
- **Per card**: 1080×1080 (1:1) or 1200×628 (1.91:1)
- **Cards**: 2-10 cards per carousel
- **Text per card**: Headline 25ch, description 97ch (each card has its own copy)
- **Headline copy**: First card's headline is CRITICAL (determines clickthrough)
- **Video**: Can mix video cards with image cards

#### Collection Ads
- **Cover image**: 1200×628 (1.91:1)
- **Product tiles**: 500×500 min (auto-cropped to 1:1)
- **Text limit**: Product title 60ch, description 300ch per product

**Design Rules**:
- Keep text-to-image <5% (Meta rewards minimal text creatives)
- Use brand colors consistently across all ads in campaign
- Test video vs. static (video gets 3-5x higher CTR)
- Captions on video (80% watch muted)
- CTA button must be clickable zone (min 44×44px)
- Avoid cluttered layouts—whitespace aids readability

### LinkedIn

#### Single Image Ads
- **Dimensions**: 1200×627 (1.91:1)
- **Logo placement**: Top-left (80×80 max)
- **Headline**: 200 characters max
- **Description**: 300 characters max
- **CTA button**: 2-40 characters (e.g., "Learn More", "Sign Up")

#### Carousel Ads
- **Per card**: 1200×627 (1.91:1) or 1080×1080 (1:1)
- **Cards**: 2-10 cards
- **First card**: Headline only (hook), no description
- **Subsequent cards**: Full copy (headline + description)
- **Last card**: CTA-focused ("Download now", "Register")

#### Video Ads
- **Dimensions**: 1920×1080 (16:9) or 1080×1920 (9:16)
- **Duration**: 15 seconds recommended (max 30 seconds for awareness)
- **Format**: MP4, H.264
- **Captions**: Required (LinkedIn B2B users browse muted)
- **Thumbnail**: Custom 1200×627 recommended

#### Message Ads
- **Format**: Text only (click opens Messenger)
- **Headline**: 200 chars
- **Body**: 300 chars
- **CTA buttons**: Up to 2 buttons, 25 chars each

**Design Rules**:
- LinkedIn users are on desktop 60% of the time—but design mobile-first
- Professionalism > flashy design. Use clean typography (Inter, Roboto)
- White space and padding make dense content readable
- Video auto-plays with sound OFF—captions are mandatory

### TikTok Ads

#### In-Feed Video Ads
- **Dimensions**: 1080×1920 (9:16, full-screen vertical)
- **Duration**: 9-60 seconds (15-21 seconds optimal for conversion)
- **Format**: MP4, H.264, AAC audio
- **File size**: Max 500MB
- **Text overlay**: Max 5 lines, 20pt+ font
- **Captions**: Auto-generated (optional overlay)

#### Branded Effects
- **Duration**: 10-60 seconds
- **Asset type**: AR effect (requires TikTok Creative Center)
- **Reach**: Partners' videos using your branded audio/effect

#### TopView Ads
- **Duration**: 5 seconds (pre-roll style)
- **Format**: MP4, vertical (9:16)
- **Placement**: First ad shown when app opens
- **Text limit**: Minimal (motion-first)

**Design Rules**:
- TikTok = vertical 9:16 ALWAYS. Never 16:9.
- Motion > static. Text animations should be dynamic, not plain
- Authentic > polished. Overly produced ads underperform on TikTok
- Sound is critical (even if muted, motion suggests audio)
- Trending sounds/music increase reach 3-5x
- UGC (user-generated content style) creatives outperform branded content
- CTAs subtle (trending sounds + motion tell story better than "Click here")

### YouTube

#### Skippable In-Stream Ads
- **Duration**: Min 12 seconds (users skip at 5 sec)
- **Format**: MP4, 1920×1080 (16:9)
- **Thumbnail**: 1280×720 (auto-generated, but custom recommended)
- **Text limit**: Headline 25ch, Description 35ch (appears at 5-sec mark)

#### Non-Skippable In-Stream Ads
- **Duration**: 6-20 seconds (bumper ads are 6 sec)
- **Format**: MP4, 1920×1080
- **Copy**: Headline only (20 chars max)

#### Bumper Ads
- **Duration**: 6 seconds exactly
- **Format**: MP4, 1920×1080
- **Text**: Logo + 1 line headline (ultra-short)
- **Best for**: Brand awareness (no click expectation)

#### Discovery Ads (Search/YouTube Home)
- **Thumbnail**: 1280×720 (must be readable at 400×225)
- **Headline**: 40 characters max
- **Description**: 100 characters max
- **Aspect**: 16:9 video or still image

**Design Rules**:
- First 3 seconds are critical (no skip frame)—show logo/product immediately
- Muted playback (80%+ view with sound off)—captions mandatory
- High contrast text (minimum 4.5:1)
- Call-to-action button at 5-second mark (for skippable ads)

## Visual Hierarchy Rules

### F-Pattern (Text-Heavy Ads)
Best for headline + description + CTA stacked vertically:
```
┌─────────────────┐
│ HEADLINE        │  ← Eye enters top-left
├─────────────────┤
│ DESCRIPTION     │  ← Scans right
│ DESCRIPTION     │  ← Down to content
├─────────────────┤
│     [CTA]       │  ← Bottom CTA
└─────────────────┘
```

### Z-Pattern (Product Focus)
Best for hero product image with supporting text:
```
┌─────────────────┐
│ LOGO      [CTA] │  ← Eye: top-left to top-right
│    PRODUCT      │
│     IMAGE       │  ← Down center
│                 │
│ HEADLINE        │  ← Bottom-left to bottom-right
│ [LEARN MORE]    │
└─────────────────┘
```

### Focal Point (Single Dominant Element)
Center subject with supporting info around edges:
- Product image/person in center (60% of frame)
- Text/CTA in corners/edges
- High contrast background

## CTA Design Guidelines

### Button Specifications
- **Minimum size**: 44×44px (Apple's standard for touch targets)
- **Contrast**: Text on button must be 4.5:1 (white on brand color, or vice versa)
- **Visibility**: Must be in bottom 20% of ad (easy tap zone)
- **Font**: Bold, sans-serif (Helvetica, Roboto, Inter), 14-18pt

### Effective CTA Copy
- **Action-oriented**: "Download", "Learn More", "Sign Up" (not "Click Here")
- **Short**: 2-4 words max (25 characters total)
- **Benefit-driven**: "Start Free Trial" > "Click" (implies value)
- **Urgency optional**: "Claim 50% Off" (strong for conversions, weaker for brand)

### CTA Placement by Platform
| Platform | Position | Context |
|----------|----------|---------|
| Google Display | Center or bottom-right | Static button graphic |
| Meta Feed | Button below text (auto-generated) | Platform renders CTA |
| Meta Stories | Bottom 15% (swipe-up) | Full-width tap zone |
| LinkedIn | Button auto-placed | Platform choice |
| TikTok | Implied in copy/sound | No explicit CTA button |
| YouTube | Bottom-right at 5 sec | Companion banner or button |

## Asset Checklists

### Single Image Campaign
- [ ] Image at platform dimension (don't resize)
- [ ] Text <5% of image area (measure in Figma)
- [ ] Logo visible and unclipped
- [ ] CTA button (if graphic) has 4.5:1 contrast
- [ ] Focal point in center 50% (mobile crop safety)
- [ ] Export as JPG, <300KB
- [ ] Copy provided: headline (30 chars), description (97 chars), CTA (17 chars)

### Carousel Campaign
- [ ] Each card designed at exact platform dimension
- [ ] First card is compelling hook (no CTA)
- [ ] Cards 2-4 tell progression or provide details
- [ ] Final card strong CTA focus
- [ ] All cards same color palette + typography
- [ ] Copy unique per card (headlines + descriptions)

### Video Campaign
- [ ] Opens with 1-2 second hook (logo or product)
- [ ] Motion throughout (cuts every 2-3 seconds)
- [ ] Captions on all dialogue/audio
- [ ] CTA at 5 seconds (YouTube) or final 3 seconds (TikTok)
- [ ] Muted playback test (watch without audio)
- [ ] File format: MP4, H.264, AAC, max size per platform
- [ ] Aspect ratio correct (9:16 for TikTok/Stories, 16:9 for YouTube)

## Examples

### Example 1: Google Performance Max (Multi-Size)
**Campaign Goal**: Lead generation (B2B SaaS)

**Assets to provide**:
1. **Square logo** (128×128): Company logo, transparent background
2. **Landscape image** (1200×628): Office/team photo + bold headline text overlay
3. **Portrait image** (600×900): Product screenshot or feature callout
4. **Square image** (600×600): Testimonial quote or stat graphic

**Copy specs**:
- Headline: "Boost Your Sales Pipeline" (30 chars max)
- Long headline: "Free AI-powered CRM for growing teams" (90 chars max)
- Description: "Get 50% more qualified leads without extra marketing spend. Used by 1000+ agencies." (90 chars max)
- Business name: "Leadflow CRM" (auto-filled)

**Design rules**:
- All images use same color scheme (brand blue + white)
- Logo visible on all sizes
- Testimonial image highly readable at 600×600 (large text)
- CTA button integrated (Google auto-generates, but designer should show placement in mockup)

### Example 2: Meta Carousel Ad (5 Cards)
**Campaign Goal**: Product education (fitness app)

**Card 1 - Hook** (1080×1080):
- Large product logo (centered)
- Text: "Lose 30 lbs in 90 Days—Guaranteed or Money Back"
- No other text (pure hook)

**Cards 2-4 - Features** (1080×1080 each):
- Card 2: "AI-powered workouts personalized to YOU"
  - Image: Fitness tracker interface mockup
  - Copy: Headline + 1-2 sentence description
- Card 3: "Track nutrition without counting calories"
  - Image: App nutrition interface
  - Copy: Headline + description
- Card 4: "Join 50K+ members in our private community"
  - Image: Community testimonial screenshot
  - Copy: Quote + description

**Card 5 - CTA** (1080×1080):
- Bold "Start Your 7-Day Free Trial" text
- Offer visual (calendar widget showing 7 days)
- Button color: high contrast (brand color)

**All cards**:
- Text <5% of image area (mostly images, minimal text)
- Consistent color palette (brand primary + white)
- Unified sans-serif typography

### Example 3: YouTube Skippable In-Stream Ad (15 sec)
**Campaign Goal**: App install (fitness app)

**Storyboard**:
- 0-1 sec: Logo appears (center), voice "Tired of generic workouts?"
- 1-3 sec: Cut to app interface (fitness plan on phone screen)
- 3-5 sec: Cut to person using app (motion, energy)
- 5 sec: Headline appears "Your Personal AI Coach" + CTA button "Download Now"
- 5-15 sec: Testimonial/results montage (keep motion high)
- 14-15 sec: Logo + CTA button lingers

**Technical specs**:
- Format: MP4, H.264, AAC
- Duration: 15 seconds
- Resolution: 1920×1080 (16:9)
- Captions: On (appears at 2-3 sec and CTA moment)
- Text on screen: <20% coverage
- Audio: Music + voiceover (upbeat, energetic)
- CTA button: Placeholder at 5-sec and 14-sec mark (platform renders)

## Common Pitfalls

### Antipattern 1: Ignoring Platform Text Limits
**Bad**: 45% text overlay on Google Display ad (image full of words).
**Good**: Max 20% text (measured by pixel area). Spec: "5 lines, 16pt, white text on dark background".

### Antipattern 2: Same Creative for All Platforms
**Bad**: 1200×628 image used on TikTok (wrong aspect, looks squeezed).
**Good**: Design platform-native formats. TikTok = 9:16. Facebook Feed = 1.91:1. LinkedIn = 1.91:1.

### Antipattern 3: Weak CTA Placement
**Bad**: CTA button buried in middle of ad, same color as background.
**Good**: Bottom 20%, high-contrast color, min 44×44px, action verb ("Learn More" not "Submit").

### Antipattern 4: Video Without Captions
**Bad**: Video auto-plays muted; no captions; sound-dependent dialogue.
**Good**: Always add captions. Test video muted before upload. If dialogue is critical, use on-screen text.

### Antipattern 5: Overly Polished Design for TikTok
**Bad**: Glossy, heavily produced ad. Low views, high CPM.
**Good**: TikTok rewards authentic, user-generated-style content. Slight grain, authentic voice, trending sounds.

### Antipattern 6: Ignoring Safe Zones
**Bad**: Logo at image corner, cropped on mobile or narrow displays.
**Good**: Logo/focal point in center 50% of frame. Provide 100px safe zone on all sides (minimum).

### Antipattern 7: RGB Images in Ads
**Bad**: Image exported as RGB, color shifts when platform converts.
**Good**: Export as sRGB JPG (JPG handles RGB fine; consistency across platforms).

### Antipattern 8: Dynamic Copy Not Tested
**Bad**: "Learn more about {product_name}" but variable doesn't populate correctly.
**Good**: Spec all copy with variable names and test with real data before launch.

### Antipattern 9: No Mobile Crop Test
**Bad**: Desktop design looks perfect; mobile crops out product image.
**Good**: Use Figma's mobile viewport guides. Resize to 375×812 and verify focal point visible.

## References

- **Google Ads Specs**: [Google Ads Dimensions & Specs](https://support.google.com/google-ads/answer/6002620)
- **Meta Ads Library**: [Meta Ads Manager Specs](https://www.facebook.com/business/help/308640981290338)
- **LinkedIn Ad Specs**: [LinkedIn Advertising Specs](https://www.linkedin.com/help/lms/answer/a422721)
- **TikTok Ads Guide**: [TikTok for Business - Ad Specs](https://ads.tiktok.com/help/article?aid=9663)
- **YouTube Ads**: [YouTube Advertising Specs](https://support.google.com/youtube/answer/6375649)
- **Design Best Practices**: Nielsen Norman Group - [Designing Effective Ads](https://www.nngroup.com/articles/ads/)
- **Video Production**: Wistia - [Video Best Practices for Web](https://wistia.com/learning)
- **Related Skills**: `social-media-design`, `landing-page-patterns`, `client-deliverables`
