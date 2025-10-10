/**
 * Amplitude Analytics Initialization
 *
 * This module handles the initialization of Amplitude analytics using the official npm package.
 * Only initializes in production environment (sp3ctra.io domain).
 *
 * @example
 * ```html
 * <script>
 *   import { initAmplitude } from "@features/analytics/init";
 *   initAmplitude();
 * </script>
 * ```
 */

import * as amplitude from "@amplitude/analytics-browser";
import { AMPLITUDE_CONFIG, isProduction } from "./config";

/**
 * Initialize Amplitude analytics
 *
 * - Only loads Amplitude library in production environment
 * - Automatically configures with GDPR-compliant settings
 * - Uses npm package to avoid CDN blocking by ad blockers
 * - Provides debug logging for development
 *
 * @returns Promise that resolves when Amplitude is ready (production) or immediately (development)
 */
export async function initAmplitude(): Promise<void> {
  const currentDomain = window.location.hostname;

  // Skip initialization in development/staging environments
  if (!isProduction()) {
    console.debug(
      `[Analytics] Development mode on domain: ${currentDomain} - Amplitude not loaded`
    );
    return;
  }

  try {
    // Initialize with production configuration
    await amplitude.init(AMPLITUDE_CONFIG.apiKey, {
      serverZone: AMPLITUDE_CONFIG.serverZone,
      autocapture: AMPLITUDE_CONFIG.autocapture,
    }).promise;

    console.debug(`[Analytics] Amplitude initialized on production domain: ${currentDomain}`);
  } catch (error) {
    console.error("[Analytics] Failed to initialize Amplitude:", error);
  }
}

/**
 * Check if Amplitude is ready for tracking
 * @returns true if Amplitude is loaded and ready
 */
export function isAmplitudeReady(): boolean {
  return typeof window !== "undefined" && isProduction();
}

/**
 * Get the Amplitude instance for custom tracking
 * @returns Amplitude instance or null if not initialized
 */
export function getAmplitude() {
  if (!isAmplitudeReady()) {
    return null;
  }
  return amplitude;
}

/**
 * Auto-initialize Amplitude when this module is imported in the browser
 */
if (typeof window !== "undefined") {
  initAmplitude().catch((error) => {
    console.error("[Analytics] Auto-initialization failed:", error);
  });
}
