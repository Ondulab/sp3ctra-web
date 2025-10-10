/**
 * Analytics utility functions for Amplitude event tracking
 *
 * @example
 * ```ts
 * import { trackEvent } from "@features/analytics/utils";
 *
 * // Simple event
 * trackEvent("Button Clicked");
 *
 * // Event with properties
 * trackEvent("Newsletter Signup", {
 *   source: "hero",
 *   buttonText: "Get Early Access"
 * });
 * ```
 */

import { track } from "@amplitude/analytics-browser";
import { isProduction } from "./config";
import { isAmplitudeReady } from "./init";
import type { EventProperties } from "./types";

/**
 * Track a custom event with Amplitude
 *
 * This function safely checks if Amplitude is initialized and if we're in production
 * before tracking. Events are only sent in production environment.
 * Can be called from client-side code (Astro components, scripts).
 *
 * @param eventName - Name of the event to track (e.g., "Button Clicked")
 * @param eventProperties - Optional properties to attach to the event
 *
 * @example
 * ```ts
 * trackEvent("Pre-order Clicked", { section: "hero" });
 * ```
 */
export function trackEvent(eventName: string, eventProperties?: EventProperties): void {
  // Only track events in production environment
  if (!isProduction()) {
    console.debug(`[Analytics] Development mode - event not sent: ${eventName}`, eventProperties);
    return;
  }

  // Check if Amplitude is ready for tracking
  if (isAmplitudeReady()) {
    track(eventName, eventProperties);
    console.debug(`[Analytics] Event tracked: ${eventName}`, eventProperties);
  } else {
    console.debug(
      `[Analytics] Event skipped (Amplitude not initialized): ${eventName}`,
      eventProperties
    );
  }
}
