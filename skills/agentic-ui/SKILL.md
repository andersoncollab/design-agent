---
name: agentic-ui
description: Design patterns for AI-powered interfaces beyond chat. Intent previews, autonomy controls, task decomposition UI, streaming states, tool call cards, confidence indicators, and error recovery. Trigger: "AI interface pattern", "agentic UI", "autonomy control", "intent preview".
version: 1.0.0
license: MIT
---

## Purpose

You are designing AI-native interfaces for a 2026+ world where every app is AI-powered. This skill provides production-ready patterns for intent preview (showing users what AI will do before execution), autonomy controls (letting users choose between manual/supervised/autonomous AI actions), task decomposition UI (breaking goals into steps), streaming states, tool call transparency, confidence indicators, and error recovery. Most AI features in production apps aren't chat — they're inline suggestions, auto-completions, smart defaults, and automated workflows. This skill is your toolkit.

**Who uses it**: Product designers building AI features, frontend developers implementing agentic UX, design systems leads establishing AI component patterns.

**When to use it**: Adding AI to a non-chat app, building trust in autonomous AI features, designing multi-step AI workflows, showing AI reasoning to users.

## When to Use

- **Trust-building features**: Users hesitate about AI autonomy. Need patterns that show AI intent before execution.
- **Multi-step AI workflows**: AI breaks a goal into steps. Need visual patterns for task decomposition, progress, and user approval.
- **Inline AI features**: Suggestions, auto-completions, smart defaults embedded in existing UI (not a chat interface).
- **Autonomous actions**: AI executes independently (send email, move tasks, generate content). Need undo, monitoring, and transparency.
- **Tool usage transparency**: AI calls APIs, searches the web, accesses databases. Need to show what tools are used and what data flows.
- **Error recovery**: AI makes mistakes differently than systems (wrong, not broken). Need recovery paths without blank screens.
- **Streaming text**: AI generates text token-by-token. Need loading state animations and stop controls.

## Key Concepts

### Beyond Chat

Chat is just one AI interaction pattern. Most AI in production apps takes other forms: inline suggestions, auto-completions, smart defaults, generated content, automated workflows. Each needs different UI than chat.

### The Trust Spectrum

Users need varying levels of control over AI actions:

```
Manual ←────────────→ Autonomous

Manual:      "AI suggests, human executes"
Supervised:  "AI executes, human approves"
Autonomous:  "AI executes, human monitors"
```

Never force users into full autonomy. Let them choose per-feature and adjust as trust grows.

### Progressive Disclosure of AI Capabilities

Build trust before expanding. Start with one simple, reliable feature. Add a second feature users ask for. Unlock autonomy controls as users build trust. Expand to multi-step workflows later.

### Streams and Tokens

When AI generates text token-by-token:
- Show text appearing in real-time (1-2ms per token for natural feel)
- Add animated cursor/caret at insertion point
- Provide stop button so users can interrupt
- Never show blank loading screens

### Confidence and Uncertainty

AI outputs vary in reliability:
- **High confidence** (95%+): Output with no caveats
- **Medium confidence** (70-95%): Output with highlighted uncertain sections
- **Low confidence** (<70%): Draft with "verify" prompts and manual fallback option

---

## Instructions

### 9 Core Patterns

#### Pattern 1: Intent Preview

Show what AI will do (action, description, affected items) with Approve/Edit/Cancel buttons before executing. Components: Icon, Title, Description, Items list (optional), Approve/Edit/Cancel buttons. Example: "AI will move 3 tasks to Sprint 12 and assign to @sarah". Builds trust.

```tsx
<IntentPreview
  icon={<MoveIcon />}
  title="Move tasks to Sprint 12"
  description="3 tasks will be moved and assigned to Sarah"
  items={['Fix login bug', 'Update API docs', 'Add tests']}
  onApprove={execute}
  onEdit={openEditor}
  onCancel={dismiss}
/>
```

#### Pattern 2: Autonomy Control Dial

Segmented control letting users choose comfort level: Manual (review only) → Supervised (approve before send) → Autonomous (monitor after). Per-feature granularity. Persistent preference. Example: 4-level slider for email responses (Manual, Draft & Wait, Send & Notify, Fully Auto).

```tsx
<AutonomyControl
  label="Email responses"
  levels={['Manual', 'Draft & Wait', 'Send & Notify', 'Fully Auto']}
  current={2}
  onChange={setLevel}
/>
```

#### Pattern 3: Task Decomposition UI

AI breaks goal into steps. Show status (pending/in_progress/complete) with checkmarks, spinners, per-step approve/reject buttons. Progress visualization. Example: User says "Plan my product launch", AI generates: 1) Research competitors (complete), 2) Draft press release (in progress), 3) Create social calendar (pending).

```tsx
<TaskPlan steps={[
  { id: 1, text: 'Research competitor launches', status: 'complete' },
  { id: 2, text: 'Draft press release', status: 'in_progress' },
  { id: 3, text: 'Create social media calendar', status: 'pending' },
]} />
```

#### Pattern 4: Streaming Text with Stop

Show text appearing token-by-token with animated cursor. Include "Stop generating" button. Use CSS blink animation for cursor effect. Never show blank loading screens.

```css
.streaming-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: currentColor;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
```

#### Pattern 5: Tool Call Cards

Collapsible cards showing tool usage (web search, API call, DB query). Display: tool name, input, output, duration, status. Shows transparency. Example: "Web Search", input="latest React 19 features", output="Found 5 results", duration="1.2s", status="complete".

#### Pattern 6: Confidence Indicator

Ring progress showing AI confidence: High (95%+, green) / Medium (70-95%, yellow) / Low (<70%, red). Communicates uncertainty visually. Example: 78% confidence ring with text "Press release draft is good, but verify positioning".

#### Pattern 7: AI Loading States

Differentiate operations: "Thinking..." (processing), "Searching..." (API), "Generating..." (LLM), "Reviewing..." (validation). Each state sets expectation for duration. Use specific icons/labels per state.

#### Pattern 8: Error Recovery in AI Flows

On AI failure, provide 3+ paths: "Try different approach", "Do manually", "Edit and resubmit". Never blank screen. Show what went wrong (specific, not generic "error occurred").

```tsx
<AIErrorRecovery
  error="Could not generate subject line. Try different approach?"
  onRetry={...}
  onManualFallback={...}
  onEdit={...}
/>
```

#### Pattern 9: Citations & Sources

Inline numbered citations with hover previews. Link to sources. Show what AI referenced. Example: "The web is growing at 5% annually [1]", hover reveals source + preview.

---

## Examples

### Example: AI Task Manager Feature

User says "Plan my product launch". AI response includes:

1. **Task Decomposition UI** — Shows 4 steps (research, draft, calendar, email schedule) with status badges
2. **Autonomy Control** — User chooses "Send & Notify" for email scheduling (supervised mode)
3. **Intent Preview** — Before execution: "I'll schedule 5 follow-up emails. Approve?"
4. **Tool Transparency** — Shows: Web Search (7 results, 1.2s), Document Generation (250 words, 2.3s)
5. **Confidence Indicator** — "78% confidence. Press release draft is good, but verify competitive positioning"
6. **Error Recovery** — If step fails: "Couldn't generate email subjects. Try again? Do manually? Edit and resubmit?"

All patterns work together. User maintains control. Transparency builds trust. Trust enables autonomy.

---

## Common Pitfalls

### ❌ Pitfall 1: Treating Every AI Interaction as Chat

**Problem**: Chat interface for everything. Users type, wait, take action. Slow.

**Fix**: Use inline patterns. Suggestion appears in-context, not in sidebar. User clicks "Use this" instead of asking. Auto-completions appear while typing (no round-trip).

### ❌ Pitfall 2: No Loading State Differentiation

**Problem**: All AI states show "Thinking..." with spinning dots. User doesn't know if searching the web (slow) or computing (fast).

**Fix**: Use specific states: "Analyzing your request..." / "Searching the web..." / "Generating content..." / "Checking for issues..."

### ❌ Pitfall 3: Autonomous AI Without Undo

**Problem**: AI sends email, moves task, posts content. User realizes mistake 30 seconds later. Too late.

**Fix**: Every AI action must be reversible for 5 minutes. Show "Undo" button (not buried). Log AI actions. For critical actions, require approval (Intent Preview pattern).

### ❌ Pitfall 4: Hiding AI Reasoning

**Problem**: AI output appears with no explanation. User doesn't know why. Erodes trust.

**Fix**: Show AI thinking: Citations for claims, Tool calls it made, Confidence level, Steps in reasoning, Links to sources.

### ❌ Pitfall 5: Binary Autonomy (On/Off)

**Problem**: Users either turn AI fully on or fully off. No middle ground.

**Fix**: Use Trust Spectrum. Manual → Supervised → Autonomous. Let users choose per-feature. Autonomy increases with trust.

### ❌ Pitfall 6: No Error Recovery Path

**Problem**: AI fails. Error message appears. User is stuck.

**Fix**: Always provide 3+ recovery options. Retry with different approach, Manual fallback, User edits and resubmits, Escalate to human. Never dead-end.

### ❌ Pitfall 7: Streaming Text Without Stop Button

**Problem**: AI generates text, user wants to stop it, no button visible. User watches helplessly as text keeps coming.

**Fix**: Always show "Stop generating" button while streaming. Make it visible and easy to click.

---

## References

- **component-patterns** — UI component specs (buttons, cards, modals)
- **motion-design** — Animations for loading states and transitions
- **accessibility-system** — ARIA labels for AI loading states, confidence indicators
- **Anthropic Human Interface Guidelines** — https://docs.anthropic.com/claude/hig
- **Apple HIG: Machine Learning** — https://developer.apple.com/design/human-interface-guidelines/machine-learning/overview
- **Vercel AI SDK patterns** — https://sdk.vercel.ai/docs
- **OpenAI UI patterns** — ChatGPT interface and tool use cards
