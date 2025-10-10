# Amplitude Analytics

Event tracking and analytics for Sp3ctra web with Amplitude.

## Overview

- **Production-Only Tracking**: Events only sent from `sp3ctra.io` domain
- **GDPR Compliant**: EU server zone for European data storage
- **Auto-tracking**: Page views and clicks tracked automatically via autocapture
- **Custom Events**: Track user interactions with simple API
- **NPM Package**: Uses `@amplitude/analytics-browser` to avoid ad blocker issues
- **Performance**: Bundled with app code, no CDN blocking concerns

## Why NPM Package Instead of CDN?

We use the npm package (`@amplitude/analytics-browser`) instead of loading from CDN because:

- **Ad Blocker Resistant**: Ad blockers often block `cdn.amplitude.com` URLs (ERR_BLOCKED_BY_CLIENT)
- **Reliability**: No external CDN dependency or network issues
- **Performance**: Bundled with your app code, cached as part of your bundle
- **Type Safety**: Full TypeScript support out of the box

The CDN approach (`<script src="https://cdn.amplitude.com/...">`) is blocked by privacy extensions and ad blockers, causing analytics to fail silently in production.

## Environment Filtering

Analytics events are **only sent in production** (`sp3ctra.io` domain). This ensures:

- **Clean Data**: No development/testing noise in analytics
- **Performance**: Amplitude not loaded in development
- **Privacy**: No tracking during development

### Behavior by Environment

**Production (`sp3ctra.io`):**

- ✅ Amplitude library loaded and initialized
- ✅ Events tracked and sent to Amplitude
- ✅ Autocapture enabled (page views, sessions, clicks)

**Development/Staging (other domains):**

- ❌ Amplitude library not loaded (saves bandwidth)
- ❌ Events not sent (logged to console for debugging)
- ✅ Debug information available in browser console

```typescript
// Production filtering is handled automatically
trackEvent("Button Clicked"); // Only sent in production

// Check environment manually if needed
import { isProduction } from "./config";
if (isProduction()) {
  // Code that should only run in production
}
```

## Architecture

### Direct Loading (No Partytown)

Amplitude loads directly in the main thread using the npm package because:

- **Ad Blocker Compatibility**: NPM package bundled with app code isn't blocked
- **Partytown Incompatibility**: Symbol serialization issues in Web Workers
- **Lightweight**: ~50KB gzipped when bundled
- **Reliability**: No CDN dependency or network issues

See [Partytown trade-offs](https://partytown.qwik.dev/trade-offs) for more details.

## Initialization

The analytics module uses automatic initialization via `init.ts`:

```typescript
// Automatic initialization (preferred)
import "@features/analytics/init";

// Manual initialization (if needed)
import { initAmplitude } from "@features/analytics/init";
await initAmplitude();
```

The initialization script:

- Only loads Amplitude in production (`sp3ctra.io`)
- Handles async script loading and error handling
- Provides debug logging for development
- Auto-initializes when imported

## Configuration

**File:** `config.ts`

```typescript
export const PRODUCTION_DOMAIN = "sp3ctra.io";

export const AMPLITUDE_CONFIG: AmplitudeConfig = {
  apiKey: "cb661ff47aa34afbb754b401e8d15a59", // Public browser key (safe to commit)
  serverZone: "EU", // GDPR compliant
  autocapture: true, // Auto-track page views & clicks
  productionDomain: PRODUCTION_DOMAIN, // Only track on this domain
};
```

**Security Note:** Browser API keys are safe to commit - they're public and write-only.

## Usage

### Track Custom Events

```typescript
import { trackEvent } from "@features/analytics/utils";

// Simple event
trackEvent("Newsletter Signup");

// Event with properties
trackEvent("Pre-order Clicked", {
  section: "hero",
  productName: "sp3ctra",
  price: 299,
});
```

### In Astro Components

```astro
---
// MyComponent.astro
---

<button id="cta-button">Pre-order Now</button>

<script>
  import { trackEvent } from "@features/analytics/utils";

  document.getElementById("cta-button")?.addEventListener("click", () => {
    trackEvent("CTA Clicked", {
      section: "hero",
      buttonText: "Pre-order Now",
    });
  });
</script>
```

### In Client-Side Scripts

```typescript
// src/scripts/my-script.ts
import { trackEvent } from "@features/analytics/utils";

export function initMyFeature() {
  // ... your code
  trackEvent("Feature Initialized", { featureName: "myFeature" });
}
```

## Testing

### 1. Browser Console Test

Open browser console and run:

```javascript
// Check if Amplitude is loaded
console.log(window.amplitude);

// Track a test event
window.amplitude?.track("Console Test", { test: true });
```

### 2. Network Tab Verification

After tracking an event, check Network tab for:

1. **Config Request** (on page load):
   - `GET sr-client-cfg.eu.amplitude.com/config/...`
   - Status: `200 OK`

2. **Event Request** (after tracking):
   - `POST api.eu.amplitude.com/2/httpapi`
   - Status: `200 OK`
   - Response: `{"code":200,...}`

✅ **Both requests = Working correctly**

### 3. Amplitude Dashboard

1. Visit [analytics.amplitude.com](https://analytics.amplitude.com/)
2. Navigate to **Events → Live Feed**
3. Events appear within 30-60 seconds (not instant)

## Common Events to Track

```typescript
// User engagement
trackEvent("Newsletter Signup", { source: "footer" });
trackEvent("Contact Form Submitted", { topic: "partnership" });

// Product interest
trackEvent("Pre-order Clicked", { section: "hero" });
trackEvent("Video Played", { videoId: "demo" });

// Navigation
trackEvent("External Link Clicked", { url: "github.com/..." });
trackEvent("Documentation Opened", { page: "quickstart" });
```

## Event Naming Conventions

**Best Practices:**

- ✅ Use Title Case: `"Button Clicked"`
- ✅ Be descriptive: `"Newsletter Signup"` not `"Signup"`
- ✅ Use past tense: `"Video Played"` not `"Play Video"`
- ✅ Keep consistent: Choose a pattern and stick to it

**Properties:**

- Use camelCase: `{ buttonText: "..." }`
- Keep values simple: strings, numbers, booleans
- Avoid nested objects

## Troubleshooting

### Events not appearing in dashboard?

- **Wait 60 seconds** - Events aren't instant
- Verify API key in `config.ts` matches your Amplitude project
- Check `serverZone: "EU"` matches your project region
- Disable browser ad blockers (may block analytics)
- Check browser console for errors

### "amplitude is not defined" error?

- Ensure you're using `trackEvent()` utility, not `window.amplitude` directly
- Wait for page to fully load before tracking events
- Check that `BaseLayout.astro` includes the Amplitude script

### No network requests to Amplitude?

- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+F5)
- Check browser console for script loading errors
- Verify `BaseLayout.astro` includes Amplitude initialization

### TypeScript errors?

- Ensure you're importing types: `import type { EventProperties } from "@features/analytics/types"`
- Run `pnpm astro check` to verify types

## File Structure

```txt
src/features/analytics/
├── config.ts      # Amplitude configuration (API key, server zone, environment detection)
├── init.ts        # Amplitude initialization using @amplitude/analytics-browser
├── types.ts       # TypeScript type definitions
├── utils.ts       # Event tracking utilities (trackEvent)
├── examples.ts    # Usage examples and testing scenarios
└── README.md      # This file
```

## Resources

- [Amplitude Browser SDK Docs](https://www.docs.developers.amplitude.com/data/sdks/browser-2/)
- [Amplitude Event Tracking Guide](https://help.amplitude.com/hc/en-us/articles/360032842391)
- [Astro Client-Side Scripts](https://docs.astro.build/en/guides/client-side-scripts/)
