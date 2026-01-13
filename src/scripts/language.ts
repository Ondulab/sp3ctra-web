/**
 * Client-side language initialization and content updates
 * Handles dynamic content switching when language changes
 */

import { languageStore } from "@features/i18n/store";
import { getCopy } from "@features/i18n/utils";
import type { CopyContent } from "@features/i18n/types";

// Initialize language on page load
const initialLang = languageStore.detect();
languageStore.set(initialLang);

// Load initial content and update page
loadAndUpdateContent(initialLang);

// Subscribe to language changes
languageStore.subscribe(async (lang) => {
  await loadAndUpdateContent(lang);
});

async function loadAndUpdateContent(lang: "fr" | "en") {
  const copy = await getCopy(lang);
  updateAllContent(copy);
}

function updateAllContent(copy: CopyContent) {
  updateHero(copy.hero);
  updateButtons(copy.buttons);
  updateValueProposition(copy.valueProposition);
  updateTechnicalSpecs(copy.technicalSpecs);
  updateNews(copy.news);
  updateResearch(copy.research);
  updateAbout(copy.about);
  updateFAQ(copy.faq);
  updateFooter(copy);
  updateSEO(copy.seo);
}

function updateHero(data: CopyContent["hero"]) {
  const section = document.querySelector('[data-section="hero"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  const subtitle = section.querySelector('[data-content="subtitle"]');
  const recognition = section.querySelector('[data-content="recognition"]');

  if (title) title.textContent = data.title;
  if (subtitle) subtitle.textContent = data.subtitle;
  if (recognition) recognition.textContent = data.recognition;
}

function updateButtons(buttons: CopyContent["buttons"]) {
  // Update Hero buttons
  const buttonQuote = document.querySelector('[data-content="button-quote"]');
  const buttonMore = document.querySelector('[data-content="button-more"]');
  if (buttonQuote) buttonQuote.textContent = buttons.quote;
  if (buttonMore) buttonMore.textContent = buttons.more;

  // Update Footer buttons
  const footerQuoteButton = document.querySelector(
    '[data-section="footer"] [data-content="button-quote"]'
  );
  if (footerQuoteButton) footerQuoteButton.textContent = buttons.quote;
}

function updateValueProposition(data: CopyContent["valueProposition"]) {
  const section = document.querySelector('[data-section="valueProposition"]');
  if (!section) return;

  const brand = section.querySelector('[data-content="brand"]');
  const text = section.querySelector('[data-content="text"]');
  const highlight = section.querySelector('[data-content="highlight"]');
  const ending = section.querySelector('[data-content="ending"]');

  if (brand) brand.textContent = data.brand;
  if (text) text.textContent = data.text;
  if (highlight) highlight.textContent = data.highlight;
  if (ending) ending.textContent = data.ending;
}

function updateTechnicalSpecs(data: CopyContent["technicalSpecs"]) {
  const section = document.querySelector('[data-section="technicalSpecs"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  if (title) title.textContent = data.title;

  // Update specs
  data.specs.forEach((spec: { label: string; value: string }, index: number) => {
    const label = section.querySelector(`[data-content="spec-label-${index}"]`);
    const value = section.querySelector(`[data-content="spec-value-${index}"]`);
    if (label) label.textContent = spec.label;
    if (value) value.textContent = spec.value;
  });

  // Update tags
  data.tags.forEach((tag: string, index: number) => {
    const tagEl = section.querySelector(`[data-content="tag-${index}"]`);
    if (tagEl) tagEl.textContent = tag;
  });
}

function updateNews(data: CopyContent["news"]) {
  const section = document.querySelector('[data-section="news"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  if (title) title.textContent = data.sectionTitle;

  // Update expo2025 content
  const expo = data.expo2025;
  const category = section.querySelector('[data-content="expo-category"]');
  const expoTitle = section.querySelector('[data-content="expo-title"]');
  const description = section.querySelector('[data-content="expo-description"]');
  const dates = section.querySelector('[data-content="expo-dates"]');
  const location = section.querySelector('[data-content="expo-location"]');
  const linkText = section.querySelector('[data-content="expo-link-text"]');

  if (category) category.textContent = expo.category;
  if (expoTitle) expoTitle.textContent = expo.title;
  if (description) description.textContent = expo.description;
  if (dates) dates.textContent = expo.dates;
  if (location) location.textContent = expo.location;
  if (linkText) linkText.textContent = expo.linkText;
}

function updateResearch(data: CopyContent["research"]) {
  const section = document.querySelector('[data-section="research"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  const description = section.querySelector('[data-content="description"]');

  if (title) title.textContent = data.title;
  if (description) description.textContent = data.description;

  // Update items
  data.items.forEach((item: { title: string; image: string }, index: number) => {
    const itemTitle = section.querySelector(`[data-content="item-title-${index}"]`);
    if (itemTitle) itemTitle.textContent = item.title;
  });
}

function updateAbout(data: CopyContent["about"]) {
  const section = document.querySelector('[data-section="about"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  const subtitle = section.querySelector('[data-content="subtitle"]');

  if (title) title.textContent = data.title;
  if (subtitle) subtitle.textContent = data.subtitle;

  // Update paragraphs
  data.paragraphs.forEach((paragraph: string, index: number) => {
    const p = section.querySelector(`[data-content="paragraph-${index}"]`);
    if (p) p.textContent = paragraph;
  });
}

function updateFAQ(data: CopyContent["faq"]) {
  const section = document.querySelector('[data-section="faq"]');
  if (!section) return;

  const title = section.querySelector('[data-content="title"]');
  const subtitle = section.querySelector('[data-content="subtitle"]');

  if (title) title.textContent = data.title;
  if (subtitle) subtitle.textContent = data.subtitle;

  // Update questions
  data.questions.forEach((item: { question: string; answer: string }, index: number) => {
    const question = section.querySelector(`[data-content="question-${index}"]`);
    const answer = section.querySelector(`[data-content="answer-${index}"]`);
    if (question) question.textContent = item.question;
    if (answer) answer.textContent = item.answer;
  });
}

function updateFooter(copy: CopyContent) {
  const footer = document.querySelector('[data-section="footer"]');
  if (!footer) return;

  // Update contact email subject and body
  const emailLink = footer.querySelector('[data-content="email"]') as HTMLAnchorElement;
  if (emailLink) {
    const subject = encodeURIComponent(copy.contact.subject);
    const body = encodeURIComponent(copy.contact.body);
    emailLink.href = `mailto:${copy.contact.mail}?subject=${subject}&body=${body}`;
  }

  // Update button labels
  const demoButton = footer.querySelector('[data-content="button-demo"]');
  const quoteButton = footer.querySelector('[data-content="button-quote"]');
  if (demoButton) demoButton.textContent = copy.buttons.demo;
  if (quoteButton) quoteButton.textContent = copy.buttons.quote;
}

function updateSEO(data: CopyContent["seo"]) {
  // Update document title
  document.title = data.title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", data.description);
  }

  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogTitle) ogTitle.setAttribute("content", data.title);
  if (ogDescription) ogDescription.setAttribute("content", data.description);
}
