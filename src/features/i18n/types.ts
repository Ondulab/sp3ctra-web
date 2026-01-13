/**
 * Language types and interfaces for i18n support
 */

export type Language = "fr" | "en";

export interface LanguageState {
  current: Language;
  available: Language[];
}

export interface SEOContent {
  title: string;
  description: string;
  structuredDescription?: string;
  ogImage?: string;
  canonicalURL?: string;
}

export interface ButtonLabels {
  demo: string;
  quote: string;
  more: string;
}

export interface ContactInfo {
  mail: string;
  subject: string;
  body: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  recognition: string;
}

export interface ValuePropositionContent {
  brand: string;
  text: string;
  highlight: string;
  ending: string;
}

export interface NewsContent {
  sectionTitle: string;
  expo2025: {
    badge: string;
    category: string;
    title: string;
    description: string;
    dates: string;
    location: string;
    access: string;
    imageAlt: string;
    link: string;
    linkText: string;
  };
}

export interface TechnicalSpecsContent {
  title: string;
  imageAlt: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
  tags: string[];
}

export interface ResearchContent {
  title: string;
  description: string;
  items: Array<{
    title: string;
    image: string;
  }>;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface FAQContent {
  title: string;
  subtitle: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface CopyContent {
  seo: SEOContent;
  buttons: ButtonLabels;
  contact: ContactInfo;
  hero: HeroContent;
  valueProposition: ValuePropositionContent;
  news: NewsContent;
  technicalSpecs: TechnicalSpecsContent;
  liveMedia?: any;
  research: ResearchContent;
  about: AboutContent;
  faq: FAQContent;
}
