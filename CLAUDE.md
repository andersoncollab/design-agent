# Design Agent — Agent Guidelines

## Overview

This repository contains **47 Agent Skills** for AI-powered design and product development across web, apps, graphics, and print. Skills follow the [Agent Skills specification](https://agentskills.io/specification.md) and are organized as Component, Interactive, or Workflow types.

## Repository Structure

```
design-agent/
├── .claude-plugin/marketplace.json   # One-click install manifest
├── skills/                           # 30 design skills
│   └── skill-name/
│       ├── SKILL.md                  # Required skill file (<500 lines)
│       ├── metadata.json             # Skill metadata
│       └── references/               # Optional: detailed docs
├── tools/integrations/               # API integration guides
├── research/                         # Curated design resources
├── CLAUDE.md                         # This file
└── README.md                         # Catalog + installation
```

## Skill Types

| Type | Purpose | Pattern |
|------|---------|---------|
| **Component** | Self-contained deliverable (template, spec, code) | Purpose → Key Concepts → Template → Examples → Pitfalls |
| **Interactive** | Multi-turn Q&A that adapts to user answers | Questions → Context synthesis → Numbered options → Execute |
| **Workflow** | Orchestrates multiple component/interactive skills | Phase sequence with decision points and checkpoints |

## Skill Anatomy

### Required Frontmatter
```yaml
---
name: skill-name
description: What this skill does and when to trigger it. 1-1024 chars.
version: 1.0.0
license: MIT
---
```

### Required Sections
1. **Purpose** — One paragraph: what + when + who
2. **When to Use** — Bullet list of trigger conditions
3. **Key Concepts** — Framework, mental models, reference data
4. **Instructions** — Step-by-step procedures
5. **Examples** — Real-world demonstrations
6. **Common Pitfalls** — Anti-patterns with corrective actions
7. **References** — Related skills, external resources

## API Integrations

Two live APIs are available. Keys stored in `.env` and `~/.claude.json`:

| API | Auth | Free Tier |
|-----|------|-----------|
| **Brandfetch** | Bearer token (`BRANDFETCH_API_KEY`) | Varies by plan |
| **remove.bg** | X-Api-Key header (`REMOVE_BG_API_KEY`) | 50 calls/month |

See `tools/integrations/` for full endpoint documentation.

## Design Resource Sites

| Resource | URL | What It Provides |
|----------|-----|------------------|
| Fontshare | fontshare.com | Free quality fonts with CDN links |
| Grainient | grainient.supply | 1000+ gradients and AI backgrounds |
| Bentogrids | bentogrids.com | Bento grid layout inspiration |
| Component Gallery | component.gallery | 60+ UI components, 95 design systems |
| Craftwork | craftwork.design | Curated website design inspiration |

## Writing Style

- Direct, instructional tone. Second person ("You are a design systems expert")
- Short paragraphs (2-4 sentences max). Bullet points over prose.
- Bold for key terms. Tables for reference data. Code blocks for examples.
- No emojis. Professional but opinionated — take a stance.
- Keep SKILL.md under 500 lines. Move detailed catalogs to `references/`.

## Quality Gates

Before releasing a skill:
- [ ] `name` matches directory exactly (kebab-case, 1-64 chars)
- [ ] Frontmatter has `name`, `description`, `version`
- [ ] SKILL.md < 500 lines
- [ ] Self-contained (defines own terms)
- [ ] Opinionated stance (not "here are some options")
- [ ] At least one concrete example
- [ ] At least one anti-pattern
- [ ] Skimmable (headings + bullets = 80% of value)

## MCP Integrations

| MCP Server | Tools Used | Skills That Use It |
|---|---|---|
| **Figma** | `get_design_context`, `get_variable_defs`, `get_code_connect_map` | `figma-pipeline`, `design-to-code`, `visual-audit` |
| **Canva** | `generate-design`, `export-design`, `search-designs` | `client-deliverables` |

## Cross-References

- **frontend-design** skill (Anthropic) — DFII framework, aesthetic execution
- **tailwind-design-system** — Design tokens, component variants
- **02-DESIGN-SYSTEM.md** template — Design system scaffolding with `{{VARIABLES}}`
- **AC Brand Standards** — `research/ac-design-standards.md`
- **W3C Design Tokens** — DTCG format spec (`design-tokens` skill)
