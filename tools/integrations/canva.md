# Canva MCP Integration

## Overview
Canva is available via the claude.ai Canva MCP server (remote, managed by Anthropic). Use it for AI-powered design generation, editing, and export alongside design-agent skills.

## Available MCP Tools

| Tool | Purpose |
|------|---------|
| `generate-design` | AI-generate a design from a text prompt |
| `generate-design-structured` | Generate with structured parameters |
| `create-design-from-candidate` | Create from a generation candidate |
| `search-designs` | Search existing Canva designs |
| `get-design` | Get design details |
| `get-design-pages` | Get pages within a design |
| `get-design-content` | Get design content/elements |
| `export-design` | Export to PNG, PDF, JPG, etc. |
| `get-export-formats` | List available export formats |
| `start-editing-transaction` | Begin editing a design |
| `perform-editing-operations` | Make changes to a design |
| `commit-editing-transaction` | Save editing changes |
| `upload-asset-from-url` | Upload an image asset |
| `list-brand-kits` | Get brand kit details |
| `resize-design` | Resize to different dimensions |
| `comment-on-design` | Add design feedback |

## Use Cases

- **Client Deliverables**: Generate branded presentations, social posts, ad creatives
- **Brand Kits**: Pull brand colors, fonts, logos from Canva brand kits
- **Export**: Generate PDF/PNG assets for client handoff
- **Social Content**: Create platform-specific social media designs

## Skills That Cross-Reference This
- `client-deliverables` — Export deliverables via Canva
- `social-media-design` — Generate social posts
- `ad-creative-design` — Generate ad creatives
