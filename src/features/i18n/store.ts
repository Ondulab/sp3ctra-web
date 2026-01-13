/**
 * Reactive language state management
 * Handles language detection, persistence, and subscription
 */

import type { Language } from "./types";

let currentLanguage: Language = "en";
const subscribers = new Set<(lang: Language) => void>();

export const languageStore = {
  /**
   * Get current language
   */
  get: (): Language => currentLanguage,

  /**
   * Set language and notify subscribers
   */
  set: (lang: Language) => {
    currentLanguage = lang;
    localStorage.setItem("sp3ctra-lang", lang);
    document.documentElement.lang = lang;
    subscribers.forEach((callback) => callback(lang));
  },

  /**
   * Subscribe to language changes
   * @returns Unsubscribe function
   */
  subscribe: (callback: (lang: Language) => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  /**
   * Detect language with priority:
   * 1. localStorage
   * 2. navigator.language
   * 3. Default to English
   */
  detect: (): Language => {
    // Priority 1: localStorage
    const stored = localStorage.getItem("sp3ctra-lang");
    if (stored === "fr" || stored === "en") return stored;

    // Priority 2: navigator.language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("fr")) return "fr";

    // Priority 3: default
    return "en";
  },
};
