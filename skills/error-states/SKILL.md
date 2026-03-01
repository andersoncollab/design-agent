---
name: error-states
description: Error and empty state design patterns — 404/500 error pages, empty states with CTAs, offline mode indicators, permission denied screens, timeout recovery, partial failure handling, and graceful degradation for resilient user experiences. Trigger: "error state", "404 page", "empty state", "offline mode", "error page", "graceful degradation".
version: 1.0.0
license: MIT
---

# Error States and Empty States Design Skill

## Purpose

Every app breaks. The question is whether it breaks gracefully. Error states are a design opportunity — they maintain trust, guide recovery, and can even delight. This skill covers every error and empty state pattern a production app needs.

## Key Concepts

**Error Hierarchy**

Errors cascade from broad to specific:

1. **Page-level** (404, 500): Full page unavailable
2. **Section-level** (failed API, partial load): One feature broken, rest of page works
3. **Component-level** (form validation, inline errors): Single field or button feedback
4. **System-level** (offline, maintenance): Infrastructure issue affecting all pages

**Recovery Principle**

Every error must offer at least one clear action. Never dead-end the user. If there's nothing they can do, they need to know that. If there is something, surface it immediately.

**Tone Guidelines**

- Friendly but not cutesy
- Acknowledge the problem clearly
- Explain what happened (briefly, in user terms)
- Offer specific next steps
- No "Oops!", "Whoops!", or other fluff on serious errors (lost data, payment failure)
- For minor errors: can be slightly lighter in tone

## Pattern Catalog

### 1. 404 Not Found

**When to use**: User navigates to a URL that doesn't exist. Always return HTTP 200 for the page, but include HTTP 404 in the response header or as metadata.

**Structure**:
- Simple, calm illustration (not cartoon)
- "Page not found" heading (H1)
- 1-2 sentence explanation ("The page you're looking for might have been moved or deleted.")
- Search bar with placeholder "Search or browse [domain]"
- Primary CTA: "Go to home page"
- Secondary: Show 3-5 popular/recently visited pages
- Never include: "Error 404" prominently, technical jargon

**Code pattern** (React):
```tsx
<div className="error-container">
  <svg className="error-illustration" />
  <h1>Page not found</h1>
  <p>The page you're looking for might have been moved or deleted.</p>
  <SearchInput placeholder="Search..." />
  <Button onClick={() => navigate('/')}>Go to home page</Button>
  <div className="popular-pages">
    {suggestedPages.map(page => (
      <Link key={page.id} to={page.url}>{page.title}</Link>
    ))}
  </div>
</div>
```

### 2. 500 Server Error

**When to use**: Server crashed, database down, or unhandled exception. Return proper HTTP 500 status.

**Structure**:
- Calm illustration (tools, server, etc. — not explosion)
- "Something went wrong" heading
- "We're looking into it. Our team has been notified." (assurance that help is coming)
- Timestamp shown ("Error occurred at 2:34 PM")
- Retry button (with cooldown if needed)
- Support contact: "Need immediate help? Contact support@domain.com"
- Never include: Stack traces, error codes like "ERR_CONNECTION_REFUSED", exception names

**Code pattern** (React):
```tsx
<div className="error-container error-500">
  <svg className="error-illustration" />
  <h1>Something went wrong</h1>
  <p>We're looking into it. Our team has been notified.</p>
  <p className="timestamp">Error occurred at {formatTime(Date.now())}</p>
  <Button onClick={retryAction}>Try again</Button>
  <a href="mailto:support@domain.com">Contact support</a>
</div>
```

### 3. Empty States (Three Variants)

**A. First-Time Empty** (user has no data yet)

Structure:
- Welcoming illustration (not generic)
- "No [items] yet" heading
- "Create your first [item] to get started"
- Primary CTA: "Create [item]"
- Optional: Brief walkthrough or onboarding link

```tsx
<div className="empty-state empty-state-first">
  <svg className="illustration" />
  <h2>No tasks yet</h2>
  <p>Create your first task to get started.</p>
  <Button onClick={openCreateForm}>Create task</Button>
  <Link to="/help/getting-started">View tutorial</Link>
</div>
```

**B. No Results** (search or filter returned nothing)

Structure:
- Search/filter illustration
- "No results for [query]"
- 2-3 specific suggestions:
  - "Check spelling"
  - "Try different keywords"
  - "Expand your filters"
- Tertiary action: "Clear all filters" button (if filters applied)

```tsx
<div className="empty-state empty-state-no-results">
  <svg className="illustration" />
  <h2>No results for "{query}"</h2>
  <ul className="suggestions">
    <li>Check your spelling</li>
    <li>Try a different search term</li>
    <li>Broaden your filters</li>
  </ul>
  {hasFilters && (
    <Button onClick={clearFilters} variant="secondary">Clear all filters</Button>
  )}
</div>
```

**C. Cleared Empty** (user completed all items, all notifications read, etc.)

Structure:
- Positive illustration (checkmark, celebration, calm)
- Positive message: "All caught up", "No pending notifications", "Great work!"
- Optional: What's next? "Check back later or explore [feature]"

```tsx
<div className="empty-state empty-state-cleared">
  <svg className="checkmark-illustration" />
  <h2>All caught up</h2>
  <p>No new notifications right now.</p>
  <Link to="/explore">Explore recommendations</Link>
</div>
```

### 4. Offline Mode

**When to use**: Network is unavailable but user is trying to interact with the app.

**Structure**:
- Banner at top of page: "You're offline. Changes will sync when reconnected."
- Show cached/last-known content in read-only mode
- Disable all actions that require network (submit buttons, API calls)
- Queue writes locally; sync on reconnection
- Optional: Show "Last updated at [time]" to indicate stale data

**Code pattern** (React):
```tsx
{isOffline && (
  <div className="offline-banner" role="status">
    <WarningIcon />
    <p>You're offline. Changes will sync when reconnected.</p>
    <span className="last-updated">Last updated {lastSyncTime}</span>
  </div>
)}

<div className={isOffline ? 'read-only' : ''}>
  {/* Content here */}
  <Button disabled={isOffline} onClick={save}>Save</Button>
</div>
```

**On reconnection**: Check network, validate queued changes, sync to server. Show "Syncing..." then success/failure feedback.

### 5. Permission Denied

**When to use**: User lacks authorization to view resource or perform action.

**Structure**:
- Lock or restricted illustration
- "You don't have access" heading
- Explain what permission is needed (e.g., "Admin access required", "This workspace requires an invitation")
- "Request access" button (sends notification to owner/admin)
- "Go back" or navigation link
- Never block with no option: always offer request or contact admin

```tsx
<div className="error-container permission-denied">
  <LockIcon className="illustration" />
  <h1>You don't have access</h1>
  <p>This workspace requires admin permissions.</p>
  <Button onClick={requestAccess}>Request access</Button>
  <Button onClick={goBack} variant="secondary">Go back</Button>
</div>
```

### 6. Timeout and Slow Loading

**When to use**: API call taking longer than expected, or network latency.

**Timeline**:
- 0-2s: Show subtle loading indicator (spinner, skeleton)
- 2-10s: Still loading, no message needed (users expect this)
- 10s: Show "Taking longer than expected" message + continue spinner
- 30s: Offer "Retry" button
- 60s: Escalate to "Try again later" or "Contact support"

```tsx
const LoadingWithTimeout = ({ isLoading, elapsed }) => {
  if (!isLoading) return null;

  if (elapsed < 10000) {
    return <Spinner />;
  }

  if (elapsed < 30000) {
    return (
      <div className="loading-delayed">
        <Spinner />
        <p>Taking longer than expected...</p>
      </div>
    );
  }

  if (elapsed < 60000) {
    return (
      <div className="loading-delayed">
        <Spinner />
        <p>Still loading...</p>
        <Button onClick={retry}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="error-container">
      <h3>Taking too long</h3>
      <p>Please try again later or contact support.</p>
      <Button onClick={retry}>Try again</Button>
    </div>
  );
};
```

### 7. Partial Failure

**When to use**: One API call failed, but the page/section can still render with other data.

**Principle**: Load what you can. Never blank an entire page for a single component failure.

**Structure**:
- Render all successful sections normally
- For failed section: inline error card with retry button
- Show which specific section failed ("Comments couldn't load" not "Error")
- Per-section retry, not full-page retry

```tsx
<div className="dashboard">
  <Overview data={overview} />

  {commentsFailed ? (
    <ErrorCard
      title="Comments couldn't load"
      action={() => retryComments()}
    />
  ) : (
    <Comments data={comments} />
  )}

  <Analytics data={analytics} />
</div>
```

### 8. Maintenance Mode

**When to use**: Planned maintenance or emergency shutdown. Return HTTP 503 Service Unavailable.

**Structure**:
- Full-page, branded layout (use brand colors/logo)
- "We'll be back shortly" heading
- If known: "Expected downtime until [time]"
- Link to status page (e.g., status.domain.com)
- Optional: Email signup to notify when back up
- Reassuring tone; this is temporary

```tsx
<div className="maintenance-page">
  <BrandLogo />
  <h1>We'll be back shortly</h1>
  <p>We're performing scheduled maintenance.</p>
  {estimatedTime && (
    <p>Expected to complete by {estimatedTime}</p>
  )}
  <a href="https://status.domain.com" target="_blank">
    Check status page
  </a>
  <EmailNotificationForm />
</div>
```

### 9. Rate Limiting

**When to use**: User is hitting API rate limits (too many requests).

**Structure**:
- Non-hostile tone: "You're doing that too fast"
- Show wait time: "Try again in 15 seconds"
- Auto-retry countdown or manual retry button
- Educational link: "Learn about rate limits"

```tsx
<div className="error-container rate-limit">
  <h2>You're doing that too fast</h2>
  <p>Try again in <Countdown seconds={retryAfter} /> seconds</p>
  <Button disabled={!retryReady} onClick={retry}>
    {retryReady ? 'Try again' : 'Waiting...'}
  </Button>
</div>
```

### 10. Form Validation Errors

**When to use**: User submitted invalid form data.

**Structure**:
- Error summary at top (lists all errors with anchor links to fields)
- Inline errors below each field:
  - Red border on input
  - Error icon
  - Specific, actionable message (not "Invalid")
- Don't clear valid fields when there's an error
- Focus first invalid field

```tsx
<Form onSubmit={handleSubmit}>
  {Object.keys(errors).length > 0 && (
    <ErrorSummary className="error-summary" role="alert">
      <p>Please fix the following:</p>
      <ul>
        {Object.entries(errors).map(([field, message]) => (
          <li key={field}>
            <a href={`#${field}`}>{message}</a>
          </li>
        ))}
      </ul>
    </ErrorSummary>
  )}

  <Field
    id="email"
    label="Email"
    error={errors.email}
    className={errors.email ? 'field-error' : ''}
  />

  <Button type="submit">Submit</Button>
</Form>
```

## Component Template

Reusable error state component:

```tsx
interface ErrorStateProps {
  variant: 'notfound' | '500' | 'empty' | 'offline' | 'permission' | 'maintenance';
  title: string;
  description: string;
  illustration?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  variant,
  title,
  description,
  illustration,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className={`error-state error-state-${variant}`}>
      {illustration && <div className="illustration">{illustration}</div>}
      <h1>{title}</h1>
      <p>{description}</p>
      {primaryAction && (
        <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
      )}
      {secondaryAction && (
        <Button onClick={secondaryAction.onClick} variant="secondary">
          {secondaryAction.label}
        </Button>
      )}
    </div>
  );
};
```

## Common Pitfalls to Avoid

1. **Generic error with no recovery** — "Something went wrong" with no action button. Always offer next steps.

2. **Exposing technical details** — Stack traces, error codes (ERR_NETWORK), exception names visible to users. Log these server-side, show friendly messages client-side.

3. **Blank white page on error** — No UX, user thinks app is broken. Always show *something* — even a loading indicator is better than white space.

4. **No offline handling** — App fails silently when network is down. Queue actions, show offline banner, serve cached data.

5. **Cute tone on serious errors** — "Oops!" when user lost data is patronizing. Save the personality for minor UI errors.

6. **Full-page error for component failure** — One API failed? Don't blank the whole page. Load what you can, show error inline for failed section.

7. **No retry mechanism** — User sees error, no button to try again. Always provide manual retry if auto-retry isn't available.

8. **Wrong HTTP status codes** — Returning 200 for a 404 page breaks SEO and API clients. Return proper codes: 404, 500, 503, etc.

9. **Blocking user with no alternative** — Permission denied with no "Request access" button leaves user stuck. Always offer a path forward.

10. **No progress indication on slow loads** — Spinner for 60+ seconds with no update makes users think app is frozen. Update message or offer cancel/contact support.

## Related Skills

- `component-patterns`: Reusable UI component structure
- `onboarding-ux`: First-time user experience
- `form-design`: Input validation and error feedback
- `agentic-ui`: AI-assisted UI error recovery
- `accessibility`: ARIA labels for error messages and status updates

## References

- Material Design Empty States: https://m3.material.io/design/communication/empty-states
- Microcopy Guidelines: https://www.microcopy.me
- HTTP Status Codes: https://www.rfc-editor.org/rfc/rfc7231#section-6
- A List Apart: Designing for the Moments When It All Falls Apart
