# Figma MCP Integration

## Overview
Figma is available via the claude.ai Figma MCP server (already installed). Use it alongside design-agent skills for design-to-code workflows.

## Available MCP Tools

| Tool | Purpose |
|------|---------|
| `get_design_context` | Get code + screenshot + contextual hints from a Figma node |
| `get_screenshot` | Capture a screenshot of any Figma frame |
| `get_metadata` | Get file/node metadata |
| `get_figjam` | Read FigJam board content |
| `generate_diagram` | Create diagrams in FigJam |
| `get_variable_defs` | Get design token variables |
| `get_code_connect_map` | Get component-to-code mappings |

## URL Parsing
Extract `fileKey` and `nodeId` from Figma URLs:
- `figma.com/design/:fileKey/:fileName?node-id=:nodeId`
- Convert `-` to `:` in nodeId

## Design-to-Code Workflow

1. **Get design:** Call `get_design_context` with fileKey + nodeId
2. **Generate system:** Use `design-system-generator` skill to extract tokens
3. **Build layout:** Use `bento-layout` or `component-patterns` for structure
4. **Adapt code:** Map Figma output to project stack (React/Astro/Next.js)

## Skills That Cross-Reference This
- `design-to-code` — Imports from Figma as starting point
- `visual-audit` — Screenshots for comparison
- `design-system-generator` — Extract tokens from Figma variables
