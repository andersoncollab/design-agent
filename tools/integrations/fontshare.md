# Fontshare CDN Integration

## Overview
Free, quality fonts from Indian Type Foundry (ITF). No API key needed — use CDN links directly.

## CDN Usage

### Single font
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

### Multiple fonts
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">
```

### CSS @import
```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
```

## URL Pattern
```
https://api.fontshare.com/v2/css?f[]={font-name}@{weights}&display=swap
```

- Font names use kebab-case: `clash-display`, `general-sans`, `cabinet-grotesk`
- Weights: `100` through `900` (comma-separated)
- Add `display=swap` for performance

## Licensing
All Fontshare fonts are free for personal AND commercial use. No attribution required.

## Skills That Use This
- `typography-pairing` — Primary consumer (curated pairings)
- `design-system-generator` — Font selection step
- `brand-identity-system` — Typography system

## Full Font Catalog
See `skills/typography-pairing/references/fontshare-catalog.md` for the complete curated list with CDN links.
