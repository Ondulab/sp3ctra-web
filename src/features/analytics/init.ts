/**
 * Amplitude Analytics Initialization
 *
 * This module handles the loading and initialization of Amplitude analytics.
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

import { AMPLITUDE_CONFIG, isProduction } from "./config";

/**
 * Initialize Amplitude analytics
 *
 * - Only loads Amplitude library in production environment
 * - Automatically configures with GDPR-compliant settings
 * - Handles async script loading and initialization
 * - Provides debug logging for development
 *
 * @returns Promise that resolves when Amplitude is ready (production) or immediately (development)
 */
export function initAmplitude(): Promise<void> {
  return new Promise((resolve) => {
    const currentDomain = window.location.hostname;

    // Skip initialization in development/staging environments
    if (!isProduction()) {
      console.debug(
        `[Analytics] Development mode on domain: ${currentDomain} - Amplitude not loaded`
      );
      resolve();
      return;
    }

    // Load Amplitude library asynchronously
    const script = document.createElement("script");
    script.src = "https://cdn.amplitude.com/libs/analytics-browser-2.25.4-min.js.gz";
    script.async = true;

    script.onload = () => {
      if (window.amplitude) {
        // Initialize with production configuration
        window.amplitude.init(AMPLITUDE_CONFIG.apiKey, {
          autocapture: AMPLITUDE_CONFIG.autocapture,
          serverZone: AMPLITUDE_CONFIG.serverZone,
        });

        console.debug(`[Analytics] Amplitude initialized on production domain: ${currentDomain}`);
        resolve();
      } else {
        console.error("[Analytics] Amplitude failed to load");
        resolve();
      }
    };

    script.onerror = () => {
      console.error("[Analytics] Failed to load Amplitude script");
      resolve();
    };

    document.head.appendChild(script);
  });
}

/**
 * Check if Amplitude is ready for tracking
 * @returns true if Amplitude is loaded and ready
 */
export function isAmplitudeReady(): boolean {
  return typeof window !== "undefined" && Boolean(window.amplitude) && isProduction();
}

/**
 * Auto-initialize Amplitude when this module is imported
 * This allows simple usage: just import the module and it handles initialization
 *
 * @example
 * ```html
 * <script>
 *   import "@features/analytics/init";
 *   // Amplitude will be automatically initialized
 * </script>
 * ```
 */
if (typeof window !== "undefined") {
  // Auto-initialize on import (only in browser environment)
  initAmplitude().catch((error) => {
    console.error("[Analytics] Auto-initialization failed:", error);
  });
}
