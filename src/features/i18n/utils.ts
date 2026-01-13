/**
 * Language utility functions
 */

import type { Language, CopyContent } from "./types";
import { languageStore } from "./store";

/**
 * Load content for specified language
 */
export async function getCopy(lang: Language): Promise<CopyContent> {
  if (lang === "fr") {
    return (await import("../../content/copy/fr.json")).default as CopyContent;
  }
  return (await import("../../content/copy/en.json")).default as CopyContent;
}

/**
 * Initialize language detection and set initial state
 */
export function initializeLanguage(): Language {
  const lang = languageStore.detect();
  languageStore.set(lang);
  return lang;
}
