---
name: onboarding-ux
description: User onboarding UX patterns — first-run experiences, setup wizards, empty states with CTAs, progressive disclosure, feature tours, tooltip sequences, activation milestones, and checklist-driven adoption for SaaS and apps. Trigger: "onboarding", "first-run experience", "empty state", "feature tour", "progressive disclosure", "setup wizard".
version: 1.0.0
license: MIT
---

# Onboarding UX

## Purpose

First impressions determine whether users stay or churn. Onboarding patterns guide new users from signup to their "aha moment" — the first time they experience real value.

## Key Concepts

**Time-to-value**: Minimize steps between signup and first meaningful action. Every unnecessary step is a drop-off point.

**Activation milestones**: Define 3-5 key actions that predict long-term retention (e.g., "created first project", "invited a teammate", "connected data source"). Track completion.

**Progressive disclosure**: Don't show everything at once. Reveal features as users need them. Start simple, expand with usage.

**Empty states**: Never show blank pages. Every empty state is a CTA opportunity: illustration + explanation + primary action button.

**Inline guidance**: Tooltips, coachmarks, and hotspots that point to features in context (not a separate tutorial).

## Patterns

### 1. Setup Wizard

Multi-step flow (3-5 steps maximum) with persistent progress indicator, skip option, and auto-save.

**Structure**:
- Step 1: Welcome (value prop, estimated time)
- Step 2: Role/use-case selection
- Step 3: Initial data import or configuration
- Step 4: Team invitation (optional)
- Step 5: Done screen with next actions

**Key behaviors**:
- Progress bar at top showing "Step X of 5"
- Back button (enabled after step 1), Skip option (if business allows)
- Save state client-side to survive page refresh
- Next button disabled until required fields filled
- No forced completion — user can skip and return later

**Code pattern** (React):
```tsx
function SetupWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const steps = ['Welcome', 'Role', 'Import', 'Team', 'Done'];

  const handleNext = () => {
    localStorage.setItem('setup_progress', JSON.stringify(formData));
    setStep(s => s + 1);
  };

  return (
    <div className="setup-container">
      <ProgressBar current={step} total={steps.length} />
      <StepContent step={step} data={formData} onChange={setFormData} />
      <div className="actions">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}>
          Back
        </button>
        <button onClick={() => skipWizard()}>Skip for now</button>
        <button onClick={handleNext} disabled={!isStepValid()}>
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
```

### 2. Onboarding Checklist

Persistent sidebar or collapsible banner showing 3-5 activation milestones with checkmarks.

**Structure**:
- Headline: "Welcome! Complete these to get started"
- List of 3-5 tasks with icons and descriptions
- Progress counter: "2 of 5 complete"
- Checkmarks on completion
- Celebration (confetti or success message) when all complete
- Dismissable after all items checked, or optionally sticky until dismissed

**Key behaviors**:
- Click task to navigate to that feature
- Auto-check when milestone is completed (tracked server-side)
- Show estimated time per task
- Allow dismissal if user chooses
- Highlight incomplete items with soft color/icon
- Show success state with visual celebration

**Code pattern** (React):
```tsx
function OnboardingChecklist({ tasks, onComplete }) {
  const completed = tasks.filter(t => t.done).length;
  const isAllDone = completed === tasks.length;

  return (
    <aside className="checklist">
      <h3>Get started in 5 minutes</h3>
      <progress value={completed} max={tasks.length} />
      <span>{completed} of {tasks.length} complete</span>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <input type="checkbox" checked={task.done} readOnly />
            <a href={task.link}>{task.title}</a>
            <span className="time">{task.time}</span>
          </li>
        ))}
      </ul>

      {isAllDone && <Confetti />}
    </aside>
  );
}
```

### 3. Empty States

Never show a blank page. Every empty state is a CTA opportunity.

**Components**:
- Illustration or icon (relevant to the section)
- Headline (e.g., "No projects yet")
- Description (explain what should be here and why)
- Primary action button (e.g., "Create your first project")
- Optional secondary action (e.g., "Import from CSV")

**Variants**:
- **First-time**: Educational tone, image, encouragement
- **No-results**: Search tips, filter suggestions, clear button
- **Error**: Explain what went wrong, recovery path
- **Permission denied**: Explain access level, suggest requesting upgrade

**Code pattern** (React):
```tsx
function EmptyState({ type, onAction }) {
  const states = {
    firstTime: {
      icon: Plus,
      headline: 'Create your first project',
      description: 'Projects help you organize and track all your work in one place.',
      cta: 'Create project'
    },
    noResults: {
      icon: Search,
      headline: 'No results found',
      description: 'Try adjusting your filters or search terms.',
      cta: 'Clear filters'
    }
  };

  const state = states[type];

  return (
    <div className="empty-state">
      <state.icon size={64} />
      <h2>{state.headline}</h2>
      <p>{state.description}</p>
      <button onClick={onAction} className="btn-primary">{state.cta}</button>
    </div>
  );
}
```

### 4. Feature Tour / Coachmark

Spotlight overlay highlighting UI element with tooltip explaining the feature.

**Structure**:
- Darkened background except for spotlight on target element
- Tooltip with headline, description, and navigation
- Progress: "Step 1 of 3"
- Skip all button, Next button
- Don't block critical actions (allow escape key)

**Key behaviors**:
- Scroll target element into view if needed
- Tooltip positioned adjacent to spotlight (smart placement)
- Step through 3-5 features max (longer tours cause abandonment)
- Skip option always visible
- Don't force tour before user can interact
- Allow replaying tour from help menu

**Code pattern** (React):
```tsx
function FeatureTour({ steps, onComplete }) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];

  return (
    <>
      <div className="tour-overlay" />
      <Spotlight element={step.selector} />
      <Tooltip
        position={step.position}
        headline={step.title}
        description={step.description}
        actions={
          <>
            <button onClick={() => onComplete()}>Skip all</button>
            <button onClick={() => setCurrent(c => c + 1)}>
              {current === steps.length - 1 ? 'Done' : 'Next'}
            </button>
          </>
        }
      />
    </>
  );
}
```

### 5. Tooltip Sequences

Contextual tips appearing on first interaction with a feature. Show once, mark as seen.

**Behavior**:
- Trigger on first hover/click of element
- Single tooltip per feature (don't stack)
- Dismiss on click outside or explicit close button
- Store dismissal in localStorage (per user, per feature)
- Small arrow pointing to element
- Limit to 2-3 sentences

**Code pattern** (React):
```tsx
function FeatureTip({ featureId, children, text }) {
  const [shown, setShown] = useState(() =>
    !localStorage.getItem(`tip_seen_${featureId}`)
  );

  const handleDismiss = () => {
    localStorage.setItem(`tip_seen_${featureId}`, 'true');
    setShown(false);
  };

  return (
    <div className="feature-with-tip" onMouseEnter={() => setShown(true)}>
      {children}
      {shown && (
        <Tooltip onDismiss={handleDismiss}>
          <p>{text}</p>
          <button onClick={handleDismiss}>Got it</button>
        </Tooltip>
      )}
    </div>
  );
}
```

### 6. Welcome Modal

Show once on first login. Brand moment + value proposition + single CTA.

**Structure**:
- Logo/brand mark
- Headline (e.g., "Welcome to [Product]")
- 2-3 bullet points (key benefits)
- Primary CTA (e.g., "Get started")
- Skip option or close button

**Key behaviors**:
- Show only to users where `onboarding_seen = false`
- Mark as seen after dismissal (never show again)
- No dark overlay (feels less intrusive than modal)
- Smooth slide-in from right or fade
- Don't trap focus (allow escape key)

**Code pattern** (React):
```tsx
function WelcomeModal({ user, onDismiss }) {
  const [visible, setVisible] = useState(user.onboarding_seen === false);

  const handleStart = async () => {
    await api.markOnboardingSeen(user.id);
    setVisible(false);
  };

  return visible ? (
    <div className="welcome-modal">
      <Logo />
      <h1>Welcome to Acme</h1>
      <ul>
        <li>Build projects in minutes</li>
        <li>Collaborate with your team</li>
        <li>Track progress in real-time</li>
      </ul>
      <button onClick={handleStart}>Get started</button>
      <button onClick={() => setVisible(false)}>Skip for now</button>
    </div>
  ) : null;
}
```

### 7. Contextual Education

Inline tips near complex features ("Pro tip: You can also drag and drop"). Dismissable.

**Structure**:
- Light background color (info/warning shade)
- Icon (lightbulb, info, or checkmark)
- Short text (1-2 sentences max)
- Close button (x) to dismiss
- Optional link to detailed docs

**Persistence**:
- Store dismissal state per feature per user
- Don't show again after dismissal
- Allow replaying from help/settings menu

## Activation Framework

| Stage | Goal | Pattern |
|-------|------|---------|
| Signup | Reduce friction | Minimal form, social login, progressive profiling |
| First session | Reach aha moment | Setup wizard → guided first action |
| First week | Build habit | Checklist, email nudges, empty state CTAs |
| First month | Expand usage | Feature tours for advanced features, contextual tips |
| Ongoing | Deepen adoption | What's new announcements, power user tips |

## Common Pitfalls

1. **Forced tours block interaction** — User can't use the product until tour completes. Make tours optional, skippable.
2. **Overwhelming feature overload** — Showing all features at signup. Use progressive disclosure instead.
3. **Blank empty states** — "No data found" with no next action. Always include illustration + explanation + CTA.
4. **Non-dismissable tutorials** — Returning users forced through intro again. Mark as seen and respect that.
5. **No way to replay** — Users want to revisit onboarding later. Add "Take a tour" link in settings/help.
6. **One-size-fits-all onboarding** — Same flow for all roles. Adapt based on use-case or role selection.
7. **Celebrating setup, not value** — "Setup complete!" confetti. Users care about their first success (project created, etc.).
8. **Too many steps** — Setup wizards >5 steps see dramatic drop-off. Keep to 3-5 maximum.
9. **No progress tracking** — Users don't know how many steps remain. Use progress bar, milestones.
10. **Onboarding not linked to metrics** — Don't track activation or time-to-value. Define and monitor milestones.

## Related Skills

- `form-design` — Signup and data entry flows
- `micro-interactions` — Feedback, transitions, celebrations
- `component-patterns` — Modals, tooltips, popovers
- `landing-page-patterns` — First impression and value communication

## References

- Appcues: https://www.appcues.com/blog/user-onboarding-ui-ux-patterns
- UserOnboard: https://www.useronboard.com
- Userguiding: https://userguiding.com/onboarding-patterns
