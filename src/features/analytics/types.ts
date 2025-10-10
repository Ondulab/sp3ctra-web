/**
 * Type definitions for Amplitude Analytics integration
 */

/**
 * Autocapture configuration options
 */
export interface AutocaptureConfig {
  /** Track marketing attribution (UTM params, referrers) */
  attribution?: boolean;
  /** Track page views */
  pageViews?: boolean;
  /** Track session start/end */
  sessions?: boolean;
  /** Track form interactions */
  formInteractions?: boolean;
  /** Track file downloads */
  fileDownloads?: boolean;
  /** Track element clicks and changes */
  elementInteractions?: boolean;
}

/**
 * Amplitude configuration object
 */
export interface AmplitudeConfig {
  /** Amplitude API key (public browser key) */
  apiKey: string;
  /** Server zone for data storage (EU for GDPR compliance) */
  serverZone: "US" | "EU";
  /** Enable automatic event tracking */
  autocapture: boolean | AutocaptureConfig;
  /** Production domain for event filtering (optional) */
  productionDomain?: string;
}

/**
 * Custom event properties type
 * Use this for tracking custom user interactions
 */
export type EventProperties = Record<string, string | number | boolean | null | undefined>;
