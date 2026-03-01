# Brandfetch API Integration

## Overview
Pull any company's brand identity — logos, colors, fonts, company info — from 44M+ brands worldwide.

## Authentication
- **Method:** Bearer token
- **Header:** `Authorization: Bearer {BRANDFETCH_API_KEY}`
- **Get key:** https://brandfetch.com/developers

## Endpoints

### Get Brand by Domain
```
GET https://api.brandfetch.io/v2/brands/{domain}
```
**Example:** `GET https://api.brandfetch.io/v2/brands/apple.com`

**Response includes:**
- `logos[]` — SVG, PNG, icon variants (light/dark themes)
- `colors[]` — Hex codes with brightness values
- `fonts[]` — Font family names and origins
- `images[]` — Banner images and brand materials
- `company` — Name, industry, founded year, employees, location
- `links[]` — Social media and website URLs
- `description` — Company description

### Search Brands
```
GET https://api.brandfetch.io/v2/search/{query}
```
Returns matching brands with domains for follow-up lookups.

### Alternative Identifiers
```
GET https://api.brandfetch.io/v2/brands/domain/{domain}
GET https://api.brandfetch.io/v2/brands/ticker/{ticker}
```

## Usage in Skills

### Competitor Research
```bash
curl -s -H "Authorization: Bearer $BRANDFETCH_API_KEY" \
  "https://api.brandfetch.io/v2/brands/competitor.com" | jq '.colors, .fonts'
```

### Client Onboarding
Pull existing brand assets when starting a new client project:
```bash
curl -s -H "Authorization: Bearer $BRANDFETCH_API_KEY" \
  "https://api.brandfetch.io/v2/brands/clientdomain.com"
```

## Rate Limits
Varies by plan. Free tier available for testing.

## Skills That Use This
- `brand-research` — Primary consumer
- `design-system-generator` — Competitor analysis step
- `brand-identity-system` — Competitive landscape
