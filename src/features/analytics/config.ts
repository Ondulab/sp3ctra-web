/**
 * Amplitude Analytics Configuration
 *
 * API key is hardcoded as per Amplitude's recommendation for browser analytics.
 * Server zone is set to EU for GDPR compliance.
 * Only tracks events in production environment for data quality.
 */

import type { AmplitudeConfig } from "./types";

/**
 * Production domain for Amplitude event filtering
 * Only events from this domain will be sent to Amplitude
 */
export const PRODUCTION_DOMAIN = "sp3ctra.io";

/**
 * Check if current environment is production based on domain
 * @param hostname - Current window.location.hostname (optional, defaults to current)
 * @returns true if running on production domain
 */
export const isProduction = (hostname?: string): boolean => {
  if (typeof window === "undefined") return false;
  const currentDomain = hostname || window.location.hostname;
  return currentDomain === PRODUCTION_DOMAIN;
};

export const AMPLITUDE_CONFIG: AmplitudeConfig = {
  apiKey: "cb661ff47aa34afbb754b401e8d15a59",
  serverZone: "EU",
  autocapture: true,
  productionDomain: PRODUCTION_DOMAIN,
};
