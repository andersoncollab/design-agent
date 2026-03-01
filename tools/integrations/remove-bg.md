# remove.bg API Integration

## Overview
AI-powered background removal for images. Supports photos, product shots, and creative assets.

## Authentication
- **Method:** API key header
- **Header:** `X-Api-Key: {REMOVE_BG_API_KEY}`
- **Get key:** https://www.remove.bg/api

## Endpoints

### Remove Background
```
POST https://api.remove.bg/v1.0/removebg
```

**Input options:**
- `image_file` — Multipart file upload
- `image_url` — URL to image

**Parameters:**
| Param | Values | Default |
|-------|--------|---------|
| `size` | `preview`, `small`, `regular`, `medium`, `hd`, `4k`, `auto` | `auto` |
| `type` | `auto`, `person`, `product`, `car` | `auto` |
| `format` | `png`, `jpg`, `webp`, `zip` | `png` |
| `bg_color` | Hex code (e.g., `#FF0000`) | transparent |
| `bg_image_url` | URL to replacement background | none |

### Check Account
```
GET https://api.remove.bg/v1.0/account
```

## Examples

### File upload
```bash
curl -s -o output.png \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -F "image_file=@photo.jpg" \
  -F "size=auto" \
  https://api.remove.bg/v1.0/removebg
```

### URL input
```bash
curl -s -o output.png \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -F "image_url=https://example.com/photo.jpg" \
  -F "size=auto" \
  https://api.remove.bg/v1.0/removebg
```

### With replacement background
```bash
curl -s -o output.png \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -F "image_file=@photo.jpg" \
  -F "bg_color=#FFFFFF" \
  https://api.remove.bg/v1.0/removebg
```

## Limits

| Input Resolution | Rate Limit |
|-----------------|------------|
| Up to 1 MP | 500/min |
| 2 MP | 250/min |
| 4 MP | 125/min |
| 10 MP | 50/min |
| 25 MP | 20/min |

**Max output:** PNG (10MP), JPG/WebP/ZIP (50MP)
**Free tier:** 50 calls/month

## Response Headers
- `X-RateLimit-Limit` — Current rate limit
- `X-Credits-Charged` — Credits consumed
- `Retry-After` — Wait time if rate limited

## Skills That Use This
- `background-removal` — Primary consumer
- `brand-identity-system` — Asset processing step
