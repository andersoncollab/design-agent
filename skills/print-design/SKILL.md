---
name: print-design
description: Print-ready design specs for business collateral (business cards, letterhead, envelopes, flyers, brochures, postcards, posters, banners, table tents). Covers exact dimensions with bleed, DPI, CMYK color mode, font embedding, file formats, paper stock guidance, and technical requirements for print vendors.
version: 1.0.0
license: MIT
---

# Print Design Skill

## Purpose

Print design is unforgiving. A misaligned bleed ruins a $5,000 print run. RGB colors shift to muddy CMYK. Hairline strokes disappear at press. A design that looks perfect on screen becomes a disaster in print. This skill provides exact dimensions, technical specifications, and vendor-agnostic requirements so you hand off files that print flawlessly on first try—no reprints, no cost overruns, no excuses.

## When to Use

- **Business collateral**: Business cards, letterhead, envelopes, branded folders
- **Marketing materials**: Flyers, brochures (bi-fold, tri-fold), postcards
- **Large format**: Posters, banners, vehicle wraps
- **Branded environments**: Table tents, signage, packaging inserts
- **Financial/legal documents**: Reports, certificates, formal correspondence
- **Event materials**: Programs, tickets, badges, invitations
- **Handoff to print vendor**: Spec exact requirements in brief, avoid back-and-forth
- **Brand guidelines documentation**: Provide print specs for partners/vendors

Trigger phrases: "print design", "print-ready file", "bleed requirements", "CMYK color", "300 DPI", "print dimensions", "what is trim size", "safe margin print", "font embedding", "PDF/X-1a".

## Key Concepts

### DPI (Dots Per Inch)
- **72 DPI**: Screen display (web, email)
- **150 DPI**: Low-quality prints (internal documents, drafts)
- **200 DPI**: Acceptable for small prints (business cards, labels)
- **300 DPI**: Professional print standard (all marketing collateral)
- **600 DPI**: High-quality offset printing (fine art, premium packaging)

**Rule**: Always design at 300 DPI minimum. Scaling up a 150 DPI file to 300 DPI pixelates and loses crispness.

### Color Modes
- **RGB**: Red-Green-Blue (screen display). Vibrant but unpredictable in print.
- **CMYK**: Cyan-Magenta-Yellow-Black (print ink). Duller than RGB but reproducible.
- **Spot colors**: Single ink (expensive but precise). Used for logos, branded items.

**Rule**: Design in CMYK. Never send RGB files to print. If starting in RGB, convert to CMYK in design software (not in PDF export—lose control).

### Bleed & Safe Margins
- **Bleed**: Extra 0.125" (1/8") on all sides that gets trimmed away. Prevents white edges from paper shift during cutting.
- **Trim line**: Where the cutter stops. Your actual final size.
- **Safe margin**: 0.25" (1/4") inset from trim. All critical content (text, logos) must be inside safe margin.

**Example**:
```
Business Card:
- Design size (trim): 3.5" × 2"
- With bleed: 3.75" × 2.25" (add 0.125" all sides)
- Safe margin: 0.25" inset (logo/text at least 0.25" from any edge)
```

### Font Embedding & Outlining
- **Embedded fonts**: Font file included in PDF (safe).
- **Outlined fonts**: Text converted to vector shapes (safest, vendor prefers).
- **Linked fonts**: Software looks for font file on system (risky—vendor may not have font).

**Rule**: Always outline fonts before PDF export. In Adobe, Select All → Type → Create Outlines.

### File Formats for Print
| Format | Use Case | Pros | Cons |
|--------|----------|------|------|
| PDF/X-1a | Standard for offset printing | Industry standard, reliable CMYK | No transparency support |
| PDF/X-4 | Modern print with transparency | Supports gradients, effects | Requires PDF 1.7 reader |
| AI (Adobe Illustrator) | Design source file | Editable, lossless | Requires Adobe software |
| INDD (InDesign) | Magazine/book design | Multi-page, linked assets | Requires Adobe, asset management |
| EPS | Legacy vector format | Universal support | Outdated, avoid for new projects |

**Rule**: Export as PDF/X-1a or PDF/X-4 (vendor specifies). Provide InDesign/Illustrator file as backup.

### Paper Stock Basics
| Weight | Feel | Use Case | Cost |
|--------|------|----------|------|
| 80# text/20# bond | Thin, crease easily | Letterhead, internal memos | Budget |
| 100# text/28# bond | Standard smooth | Most brochures, flyers | Standard |
| 110# text/32# bond | Heavier, premium feel | Upscale marketing, cards | Premium |
| 14pt C2S | Cardstock, thick (0.014") | Business cards, postcards | Premium |
| 16pt C2S | Extra thick (0.016") | Premium cards, invitations | Very premium |

**Finishes**:
- **Uncoated**: Natural texture, absorbs ink (brochures, business cards)
- **Matte**: Smooth, no gloss (professional, hides fingerprints)
- **Gloss**: Shiny, vibrant colors (brochures, photo-heavy materials)
- **Soft touch**: Matte but textured (premium feel, expensive)

## Standard Dimensions

### Business Cards
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Trim size | 3.5×2 | 89×51 | Standard US |
| With bleed | 3.75×2.25 | 95×57 | Add 0.125" all sides |
| Safe margin | 0.25" inset | 6mm inset | Logo/text must be inside |

**Design rules**:
- High contrast (dark text on light, or vice versa)
- Logo top-left or center
- QR code at bottom-right (1" square maximum)
- Avoid thin text (<0.5pt stroke)

### Letterhead
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Standard | 8.5×11 | 216×279 | US Letter |
| Margins | 0.5-0.75" | 12.7-19mm | Top/bottom |
| Header area | 1-1.5" tall | 25-38mm | Logo + company info |

**Design rules**:
- Logo + company name in top 1-1.5"
- Contact info at bottom (phone, email, address, website)
- Avoid full bleeds (leaves white edge at bottom if misaligned)
- Use watermark logo at 5-10% opacity in center (optional branding)

### #10 Envelope
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Trim size | 9.5×4.125 | 241×105 | Standard US business |
| Return address | 0.5×1.5" | 12.7×38mm | Top-left corner |
| Main address | 4×1.5" | 102×38mm | Center-right |

**Design rules**:
- Return address top-left (0.5" from left, 0.5" from top)
- Main address centered vertically, 4" from left
- Avoid printing on flap or back (ink bleeds unpredictably)
- Use standard fonts (readable by mail scanners)

### Flyer
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Trim size | 8.5×11 | 216×279 | Standard US Letter |
| With bleed | 8.75×11.25 | 222×286 | Add 0.125" all sides |
| Safe margin | 0.25" inset | 6.4mm inset | Critical content inside |

**Design rules**:
- Hero image top (60% of flyer)
- Headline below image (bold, >36pt)
- Body copy in middle (readable, left-aligned)
- CTA button at bottom (high contrast)
- Contact info footer (small, but visible)

### Tri-Fold Brochure
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Flat size | 11×8.5 | 279×216 | Landscape, 3 panels |
| Per panel | 3.667×8.5 | 93×216 | Each panel is 1/3 |
| With bleed | 11.25×8.75 | 286×222 | Add 0.125" all sides |
| Safe margin | 0.25" inset | 6.4mm inset | Per panel |
| Fold lines | 3.667", 7.333" | Mark with light blue line | Software folds info |

**Panel breakdown**:
1. **Front cover** (right panel): Logo, headline, hook image
2. **Inside left** (left panel): Contact info, CTA
3. **Inside center** (center panel): Main content, 3-4 sections
4. **Inside right** (right panel of inside): More content, testimonials
5. **Back cover** (left panel back): Company logo, address, small image
6. **Mailing info** (center back panel): If used for mailing, leave blank for address

**Design rules**:
- Fold lines should NOT cross critical text
- Keep key info off center fold (2-3mm bleed)
- Inside center panel is where fold happens—account for text wrapping

### Bi-Fold Brochure
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Flat size | 11×17 | 279×432 | Landscape, 2 panels |
| Per panel | 5.5×17 | 140×432 | Each panel is 1/2 |
| With bleed | 11.25×17.25 | 286×439 | Add 0.125" all sides |

**Panel breakdown** (printed double-sided):
1. **Front cover** (right panel front): Logo, headline, image
2. **Inside left** (left panel inside): Main content, 3-4 sections
3. **Inside center** (right panel inside): More content, CTA
4. **Back cover** (left panel back): Company info, contact

### Postcard
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Trim size | 6×4 | 152×102 | Standard postcard |
| With bleed | 6.25×4.25 | 159×108 | Add 0.125" all sides |
| Safe margin | 0.25" inset | 6.4mm inset | Critical content inside |
| Address side | Right half, bottom 2" | — | USPS requirements |

**Design rules**:
- Divided into front (image) and back (copy + address zone)
- Address zone: right half, bottom 2" must be plain (no graphics)
- Keep main copy on left side
- Use bold, high-contrast colors
- Postage stamp area: 1"×1.1" top-right (blank)

### Poster
| Size | Inches | Millimeters | Notes |
|------|--------|-------------|-------|
| 18×24 | — | 457×610 | Small poster |
| 24×36 | — | 610×914 | Standard lobby/transit |
| 27×40 | — | 686×1016 | Movie-style |

**Design rules**:
- Impact at distance: headline >60pt, bold sans-serif
- Color contrast high (avoid light text on light backgrounds)
- Image fills 70% (text only 30%)
- QR code or URL at bottom for calls-to-action
- Avoid fine details (unreadable from 10+ feet away)

### Retractable Banner (Roll-Up)
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Standard | 33×80 | 840×2032 | Width × height |
| Stand width | 32.75" | 832mm | Fits in stand |
| Safe margin | 1" inset | 25.4mm | Account for stand edges |

**Design rules**:
- Width is constant; height fills with repeating message (if vertical scroll)
- Avoid thin text (<1.5pt)
- Logo at top and bottom (visible when rolled up)
- Bleed: add 0.5" beyond stand footprint (safety)

### Vinyl Banner
| Dimension | Feet | Meters | Notes |
|-----------|-----|--------|-------|
| Small | 3×6 | 0.9×1.8 | Vehicle, window |
| Medium | 4×8 | 1.2×2.4 | Building exterior |
| Large | 10×20 | 3×6 | Billboard, event |

**Design rules**:
- DPI: 72 DPI acceptable (viewed from distance)
- Fonts >36pt (readable from 20+ feet)
- Grommets: 1 per foot of banner edge (design around grommet holes)
- Wind loading: avoid large solid color areas that catch wind

### Table Tent (Tent Card)
| Dimension | Inches | Millimeters | Notes |
|-----------|--------|-------------|-------|
| Trim size | 4×6 | 102×152 | Folded in half |
| Flat size | 4×12 | 102×305 | Before folding |
| With bleed | 4.25×12.25 | 108×311 | Add 0.125" all sides |
| Fold line | 6" from left | 152mm | Center fold |

**Design rules**:
- Print both sides (front = what people see, back = flip side content)
- Fold line centered; no critical text on fold
- Top section (when folded): eye-catching image/headline
- Bottom section: supporting copy, QR code, contact

## CMYK Color Reference

### Common Colors (Hex to CMYK)
| Hex Color | RGB | CMYK | Use Case |
|-----------|-----|------|----------|
| #000000 | 0,0,0 | 0,0,0,100 | Black (use 100% K, not CMYK mix) |
| #FFFFFF | 255,255,255 | 0,0,0,0 | White (paper) |
| #0066CC | 0,102,204 | 100,50,0,20 | Brand blue |
| #FF6600 | 255,102,0 | 0,60,100,0 | Brand orange |
| #00CC66 | 0,204,102 | 100,0,50,20 | Brand green |
| #FF0000 | 255,0,0 | 0,100,100,0 | Pure red (avoid—shifts to orange) |

**Rule**: Always convert hex to CMYK in design software. Don't estimate. Bright RGB colors (pure red, green, blue) shift significantly to duller CMYK.

## Font Requirements

### Embedded vs. Outlined
1. **Embedded** (PDF standard): Font file included in PDF (15-20% file size increase).
   - Pro: Vendor sees exact font
   - Con: Requires licensing agreement for some proprietary fonts
2. **Outlined** (vector conversion): Text converted to shapes (design-only, uneditable).
   - Pro: No font licensing issues; guaranteed appearance
   - Con: Cannot edit text after conversion

**Best practice**: Outline fonts before export. In Adobe: Select All → Type → Create Outlines.

### Font Sizing
- **Body text**: 8pt minimum (readable in print), 10-12pt recommended
- **Headlines**: 24pt minimum (readable at arm's length)
- **Fine print**: 6pt minimum (barely readable, avoid if possible)
- **Contrast**: Dark text on light (or vice versa), never same-color text/background

### Sans-Serif Fonts for Print (Reliable)
- **Helvetica Neue** (classic, universal)
- **Roboto** (modern, open-source)
- **Inter** (web + print, clean)
- **Futura** (geometric, premium)
- **Garamond** (serif, classic elegant)

**Avoid**: Script fonts (unreadable at small sizes), very thin weights (<300 weight), novelty fonts.

## File Format Specifications

### PDF/X-1a (Standard for Offset Printing)
```
Specifications:
- PDF version: 1.3
- Color: CMYK or Grayscale (no RGB)
- Fonts: All embedded or outlined
- Transparency: NOT supported (flatten before export)
- Bleed: Include 0.125" bleed box
- Resolution: Minimum 300 DPI

Export from Adobe Illustrator/InDesign:
1. File > Export > Adobe PDF
2. Format: PDF/X-1a:2001
3. Compress: Highest quality
4. Bleeds/Marks: Include bleeds checkbox ✓
5. Marks: Include crop/bleed marks ✓
```

### PDF/X-4 (Modern Print with Effects)
```
Specifications:
- PDF version: 1.7
- Color: CMYK + spot colors
- Transparency: SUPPORTED (preserved)
- Fonts: All embedded or outlined
- Bleed: Include 0.125" bleed box
- Resolution: Minimum 300 DPI

Better for: Designs with gradients, drop shadows, transparency
```

### Adobe Illustrator (.AI)
```
Provide as backup source file
- Layers unlocked (for vendor edits)
- Fonts embedded in file (Illustrator option)
- Document color mode: CMYK
- Final export: Save As PDF/X-1a (for print)
```

### Adobe InDesign (.INDD)
```
For multi-page projects (brochures, magazines, catalogs)
- Include all linked files/fonts (Package function)
- Color mode: CMYK
- Final export: PDF/X-1a with bleed
- Package folder includes: INDD file + Links folder + Fonts folder
```

## Handoff Checklist

Before sending files to print vendor:

- [ ] All dimensions at 300 DPI
- [ ] Color mode: CMYK (confirmed in software)
- [ ] Fonts: All outlined or embedded in PDF
- [ ] Bleed: 0.125" added all sides, bleed box defined
- [ ] Safe margin: Critical content 0.25" inside trim line
- [ ] File format: PDF/X-1a or PDF/X-4 (ask vendor preference)
- [ ] Crop/registration marks: Included in PDF export
- [ ] Previewed at print scale (100% zoom)
- [ ] No RGB colors (verify CMYK only)
- [ ] Transparency flattened (if PDF/X-1a)
- [ ] Filename: Descriptive + version (e.g., "BusinessCard_Final_v3.pdf")
- [ ] Spec sheet provided: Quantity, paper stock, finish, folding/cutting instructions

## Examples

### Example 1: Business Card Print Package
**Client**: Tech startup (SaaS)

**File deliverables**:
1. `BusinessCard_Front_v1.ai` (Illustrator source)
2. `BusinessCard_Final_v1.pdf` (PDF/X-1a for printing)

**Specs to vendor**:
- Trim: 3.5" × 2" (89mm × 51mm)
- Bleed: 3.75" × 2.25" (0.125" all sides)
- DPI: 300 minimum
- Color mode: CMYK
- Paper: 14pt C2S cardstock, matte finish
- Quantity: 5,000
- Cutting: Standard guillotine
- Notes: Logo top-left, QR code bottom-right

### Example 2: Tri-Fold Brochure
**Client**: Marketing agency

**File deliverables**:
1. `Brochure_TriFold_v2.indd` (InDesign source + fonts folder)
2. `Brochure_TriFold_Final_v2.pdf` (PDF/X-1a)

**Specs**:
- Flat size: 11" × 8.5" (with 0.125" bleed = 11.25" × 8.75")
- Fold lines: 3.667" and 7.333" from left
- DPI: 300 minimum
- Paper: 100# text, uncoated
- Finishing: Standard tri-fold, no varnish
- Quantity: 10,000

### Example 3: Poster (24×36)
**Client**: Event promotion

**File deliverables**:
1. `Poster_24x36_Final_v1.pdf` (PDF/X-1a)

**Specs**:
- Dimensions: 24" × 36" (no bleed for posters, print edge-to-edge)
- DPI: 150 minimum (lower acceptable for distance viewing)
- Color mode: CMYK
- Paper: 10mil poster stock, gloss
- Quantity: 250
- Notes: QR code at 2" size (readable from 15+ feet)

## Common Pitfalls

### Antipattern 1: Uploading RGB File to Printer
**Bad**: Designer sends RGB JPG. Colors shift to muddy, desaturated CMYK at press.
**Good**: Always convert to CMYK in design software BEFORE export. Confirm CMYK mode in PDF settings.

### Antipattern 2: No Bleed Specified
**Bad**: Final print has white edge around design (color doesn't extend to trim).
**Good**: Add 0.125" bleed on all sides. Extend all background colors/images beyond trim line.

### Antipattern 3: Fonts Not Outlined
**Bad**: Vendor doesn't have custom font installed. Text substitutes with Times New Roman.
**Good**: Always outline fonts before PDF export (Type → Create Outlines in Adobe).

### Antipattern 4: Thin Strokes & Hairlines
**Bad**: 0.5pt border disappears at press. 1pt text becomes illegible.
**Good**: Minimum 1.5pt for strokes, 8pt for body text, 10pt+ recommended.

### Antipattern 5: Text Too Close to Fold
**Bad**: Tri-fold brochure: text centered on middle fold, gets cut in half.
**Good**: Keep critical text 0.25" away from fold lines. Test by printing at home and folding.

### Antipattern 6: Ignored Safe Margin
**Bad**: Logo designed at image edge. When guillotine shifts 1mm, logo gets cropped.
**Good**: All critical content inside 0.25" safe margin from trim line (vendor tolerance is ±1/8").

### Antipattern 7: Brightness/Contrast Crushed
**Bad**: Design at 100% brightness on screen. Print comes out dark/muddy.
**Good**: Print test pages to physical printer before sending to offset. Adjust gamma/levels.

### Antipattern 8: Wrong File Format
**Bad**: Send RGB JPEG to offset printer (requires CMYK PDF/X-1a).
**Good**: Ask vendor for file requirements upfront. Standard is PDF/X-1a or PDF/X-4.

### Antipattern 9: Grayscale Used Instead of Black
**Bad**: Design uses 50% gray (K=50). Prints as speckled gray, not smooth.
**Good**: Use 100% black (K=100) for text/shapes. Grayscale only for photography.

### Antipattern 10: No Specification Sheet
**Bad**: Send PDF with no instructions. Vendor prints on glossy instead of matte, wrong size.
**Good**: Provide brief spec sheet: paper stock, trim size, finish, quantity, die-cuts, folding.

## References

- **Print Industry Standards**: [FOGRA Standards for Print](https://www.fogra.org/) — official color standards
- **PDF/X Specification**: [PDF/X Official Spec](https://www.iso.org/standard/51502.html) — ISO 15930
- **Printer's Grammar Guide**: [Print Finishing Terminology](https://www.spiedigital.org/)
- **Paper Stock Guide**: [Mohawk Fine Papers](https://www.mohawkfine.com/) — paper recommendations
- **Font Embedding**: [Adobe - Embedding Fonts](https://helpx.adobe.com/indesign/using/fonts.html)
- **Design for Print** (Book): "The Printed World" by Johanna Drucker — comprehensive print design theory
- **Related Skills**: `brand-identity-system`, `design-tokens`, `client-deliverables`
