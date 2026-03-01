# Design Agent

47 Agent Skills for design and product development across web, apps, graphics, and print. Built for Anderson Collaborative.

## Installation

```bash
# Clone
git clone https://github.com/andersoncollaborative/design-agent.git

# Or install as Claude Code plugin
/plugin marketplace add andersoncollaborative/design-agent
/plugin install design-skills
```

## API Keys

Copy `.env.example` to `.env` and add your keys:
- **Brandfetch** — Brand data (logos, colors, fonts): [Get key](https://brandfetch.com/developers)
- **remove.bg** — Background removal: [Get key](https://www.remove.bg/api)

## Skills

### Web Design
| Skill | Type | Description |
|-------|------|-------------|
| `brand-research` | Component | Pull any brand's identity via Brandfetch API |
| `aesthetic-direction` | Interactive | Guided aesthetic selection with 15+ directions |
| `typography-pairing` | Component | Fontshare font pairings by mood |
| `color-system` | Component | Color palettes + gradient recipes |
| `bento-layout` | Component | Bento grid patterns with production code |
| `component-patterns` | Component | 60+ UI component best practices |
| `motion-design` | Component | Web animation patterns (CSS, Framer Motion, scroll) |
| `responsive-patterns` | Component | Breakpoint strategies, fluid type, container queries |
| `dark-mode` | Component | Dark mode system with theme tokens and toggle |
| `background-removal` | Component | remove.bg API integration |
| `icon-systems` | Component | Icon library selection, sizing scales, accessibility |
| `image-optimization` | Component | Format selection, responsive srcset, lazy loading, CWV |
| `seo-design-patterns` | Component | Semantic HTML, structured data, heading hierarchy |
| `micro-interactions` | Component | Hover effects, button feedback, toggle animations |
| `form-design` | Component | Input patterns, validation, multi-step wizards |
| `i18n-rtl` | Component | Internationalization, RTL layouts, logical properties |
| `white-label-systems` | Component | Multi-tenant theming, dynamic brand switching |
| `design-qa` | Component | Visual regression testing, pre-launch checklists |
| `design-handoff` | Workflow | Dev handoff specs, annotations, asset export |
| `gsap-animations` | Component | GSAP timelines, ScrollTrigger, SplitText, stagger |
| `lottie-rive` | Component | After Effects Lottie + Rive interactive animations |
| `navigation-patterns` | Component | Navbars, sidebars, bottom tabs, command palettes |
| `onboarding-ux` | Component | First-run experience, empty states, feature tours |
| `error-states` | Component | 404/500 pages, offline mode, graceful degradation |
| `data-visualization` | Component | Chart selection, D3/Recharts, color for data |
| `typography-animation` | Component | Kinetic type, text reveals, variable fonts |
| `spacing-layout-system` | Component | 4px grid, CSS Grid/Subgrid, section rhythm |

### Product & App Design
| Skill | Type | Description |
|-------|------|-------------|
| `figma-pipeline` | Workflow | Figma MCP → production code pipeline |
| `landing-page-patterns` | Component | High-conversion page patterns with CRO psychology |
| `email-design` | Component | Email templates for Gmail, Outlook, Apple Mail, Yahoo |
| `dashboard-patterns` | Component | Data viz, KPI cards, admin panel layouts |
| `scroll-animations` | Component | CSS scroll-driven animations (animation-timeline) |
| `accessibility-system` | Component | Deep a11y system: focus, ARIA, keyboard, testing |
| `design-tokens` | Component | W3C DTCG format for vendor-neutral token interchange |
| `page-transitions` | Component | View Transitions API patterns for seamless navigation |
| `app-design-system` | Interactive | Design system wizard for apps (nav, state, forms) |
| `agentic-ui` | Component | AI interface patterns: intent preview, autonomy dial |

### Graphics
| Skill | Type | Description |
|-------|------|-------------|
| `social-media-design` | Component | Social creative templates for all platforms |
| `ad-creative-design` | Component | Paid ad creative patterns and specs |

### Print
| Skill | Type | Description |
|-------|------|-------------|
| `print-design` | Component | Print-ready specs (business cards, brochures, signage) |

### Workflows
| Skill | Type | Description |
|-------|------|-------------|
| `design-system-generator` | Interactive | Full design system creation wizard |
| `visual-audit` | Workflow | Audit existing site's design quality |
| `design-critique` | Component | 8-dimension design quality scoring framework |
| `design-to-code` | Workflow | End-to-end concept → production code |
| `brand-identity-system` | Workflow | Complete brand identity from scratch |
| `competitive-design-intel` | Workflow | Automated competitive design analysis |
| `client-deliverables` | Workflow | Agency deliverable generation (PDFs, reports, guides) |

## MCP Integrations

| MCP Server | What It Enables |
|---|---|
| **Figma** | Design extraction, token sync, Code Connect mapping |
| **Canva** | AI design generation, editing, export |
| **Brandfetch** | Brand identity data for any domain |

## External Resources

| Resource | URL | Type |
|----------|-----|------|
| Fontshare | fontshare.com | Free fonts (CDN) |
| Grainient | grainient.supply | Gradients + backgrounds |
| Bentogrids | bentogrids.com | Layout inspiration |
| Component Gallery | component.gallery | UI component reference |
| Craftwork | craftwork.design | Website design inspiration |
| Brandfetch | brandfetch.com | Brand data API |
| remove.bg | remove.bg | Background removal API |
| W3C Design Tokens | tr.designtokens.org | Token interchange spec |

## License

MIT
