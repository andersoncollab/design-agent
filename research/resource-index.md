# Design Resource Index

Master reference for all external design resources used by skills in this repo.

## API-Integrated Resources

### Brandfetch
- **URL:** https://brandfetch.com
- **What:** Brand data for 44M+ companies — logos, colors, fonts, company info
- **API:** `GET https://api.brandfetch.io/v2/brands/{domain}`
- **Auth:** Bearer token
- **Free tier:** Available
- **Used by:** `brand-research`, `design-system-generator`, `brand-identity-system`
- **Integration doc:** `tools/integrations/brandfetch.md`

### remove.bg
- **URL:** https://www.remove.bg
- **What:** AI background removal for photos and product images
- **API:** `POST https://api.remove.bg/v1.0/removebg`
- **Auth:** X-Api-Key header
- **Free tier:** 50 calls/month
- **Used by:** `background-removal`, `brand-identity-system`
- **Integration doc:** `tools/integrations/remove-bg.md`

## CDN Resources (No API Key)

### Fontshare
- **URL:** https://fontshare.com
- **What:** Free quality fonts from Indian Type Foundry. Commercial use OK, no attribution.
- **CDN:** `https://api.fontshare.com/v2/css?f[]={font}@{weights}&display=swap`
- **Catalog:** 100+ fonts. Curated list in `skills/typography-pairing/references/fontshare-catalog.md`
- **Used by:** `typography-pairing`, `design-system-generator`, `brand-identity-system`
- **Integration doc:** `tools/integrations/fontshare.md`

## Inspiration & Reference Sites (No API)

### Grainient Supply
- **URL:** https://grainient.supply
- **What:** 1000+ gradients and AI-generated backgrounds
- **How to use:** Browse for gradient inspiration. CSS recipes in `skills/color-system/references/gradient-recipes.md`
- **Used by:** `color-system`

### Bentogrids
- **URL:** https://bentogrids.com
- **What:** Curated showcase of bento grid layouts from production sites (Vercel, Linear, Apple, Framer)
- **How to use:** Browse for layout patterns. Code implementations in `skills/bento-layout/references/bento-patterns.md`
- **Used by:** `bento-layout`, `design-to-code`

### Component Gallery
- **URL:** https://component.gallery
- **What:** 60 UI components cataloged across 95 design systems with 2,676 examples
- **How to use:** Reference for component patterns, states, and accessibility requirements
- **Coverage:** Accordion, carousel, modal, tabs, pagination, breadcrumb, toast, popover, tree view, rating, and more
- **Design systems included:** Shopify Polaris, IBM Carbon, Atlassian, Material, Elastic, Red Hat, Sainsbury's
- **Used by:** `component-patterns`, `design-to-code`

### Craftwork Design
- **URL:** https://craftwork.design/curated/websites/
- **What:** Curated website design inspiration organized by category
- **Categories:** Agency, Portfolio, Web3, AI, E-commerce, Finance, Marketing, Design Tools, SaaS, Productivity
- **Also offers:** Premium UI kits, illustrations, mockups, fonts, Figma/Webflow/Framer templates
- **Used by:** `aesthetic-direction`, `visual-audit`

## MCP-Integrated Tools

### Figma (via claude.ai MCP)
- **URL:** https://figma.com
- **What:** Design tool with MCP integration for reading designs, extracting tokens, generating code
- **Tools:** `get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`
- **Used by:** `design-to-code`, `visual-audit`, `design-system-generator`
- **Integration doc:** `tools/integrations/figma.md`

### Envato (via local MCP)
- **What:** Stock photos from Unsplash + Pexels via `search_stock_photos`
- **Used by:** Background and hero image sourcing during builds
- **Note:** Envato Market API != Envato Elements. Use `search_stock_photos` for free images.
