# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code), Gemini Cli, Github Copilot when working with code in this repository.

---

## 🤖 LLM Workflow Instructions

**This section contains systematic workflows for AI assistants. Follow these checklists when working on tasks.**

### Before Starting Any Task

- [ ] Read the task requirements carefully
- [ ] Check `src/components/base/` for existing components before creating new ones
- [ ] Review `src/content/copy/` for approved messaging and vocabulary
- [ ] Scan recent git commits to understand current work patterns
- [ ] Identify if this is a new feature, enhancement, bug fix, or refactor

### Component Development Workflow

**When asked to create or modify UI components:**

1. **Discovery Phase**
   - [ ] Search for similar existing components
   - [ ] Check if base components (Button, Card, Input, Heading) can be composed
   - [ ] Review design tokens in Tailwind config
   - [ ] Verify brand colors and spacing scale

2. **Planning Phase**
   - [ ] Determine if this needs a new component or extends existing
   - [ ] List required variants (size, color, state variations)
   - [ ] Identify interaction states needed (default, hover, active, focus, disabled)
   - [ ] Plan responsive behavior (mobile-first breakpoints)

3. **Implementation Phase**
   - [ ] Use `tailwind-variants` for component variations
   - [ ] Include all interaction states with smooth transitions (150-300ms)
   - [ ] Add TypeScript types for props with `VariantProps`
   - [ ] Follow component structure pattern (see Technical Implementation Patterns)
   - [ ] Use semantic HTML elements
   - [ ] Apply design tokens (no hardcoded values)
   - [ ] **CRITICAL**: Use only Tailwind design tokens from `src/styles/global.css` - NO arbitrary values like `[#bababa]`, `[605px]`, etc.
   - [ ] **CRITICAL**: All text must come from `src/content/copy/` - NO hardcoded strings in components
   - [ ] Simplify HTML structure - remove unnecessary wrapper divs
   - [ ] Use semantic Tailwind classes (e.g., `text-muted`, `border-border`, `bg-surface`) instead of arbitrary hex values

4. **Validation Phase** (see Quality Gates below)
   - [ ] Test keyboard navigation
   - [ ] Verify WCAG AA contrast ratios
   - [ ] Check responsive behavior at all breakpoints
   - [ ] Ensure focus states are visible
   - [ ] Validate against brand guidelines

### Content Development Workflow

**When asked to create or modify content:**

1. **Content Source**
   - [ ] Check `src/content/copy/` for existing text
   - [ ] For new content, add to appropriate JSON file in copy/
   - [ ] Never hardcode UI copy in components

2. **Brand Compliance**
   - [ ] Use approved vocabulary (see Brand Consistency section)
   - [ ] Avoid prohibited terms: "scanner", "synthesizer"
   - [ ] Prefer technical precision: "dispositif", "instrument", "interface", "flux continu", "temps réel"
   - [ ] Match the tone: technical precision without jargon

3. **SEO Requirements**
   - [ ] Every page needs: title, description, OG tags, canonical URL
   - [ ] Add structured data (Schema.org) where applicable
   - [ ] Use semantic headings (H1 → H2 → H3 hierarchy)

### Feature Development Workflow

**When asked to build a new feature:**

1. **Architecture Review**
   - [ ] Determine if feature needs its own module in `src/features/`
   - [ ] Plan API integration (create `api.ts`)
   - [ ] Plan state management (create `store.ts` if needed)
   - [ ] Define TypeScript types (create `types.ts`)

2. **Integration**
   - [ ] Use Astro components for static content
   - [ ] Use Vue components for interactive features
   - [ ] Leverage Astro's automatic optimizations
   - [ ] Keep client-side JS minimal

3. **Testing Considerations**
   - [ ] Test across breakpoints (640px, 768px, 1024px, 1280px)
   - [ ] Verify mobile touch targets (min 44x44px)
   - [ ] Check performance impact (Lighthouse score target: 95+)

## 🚦 Quality Gates

**Before considering any task complete, verify these checkpoints:**

### Accessibility Checklist

- [ ] **Color Contrast**: All text meets WCAG AA (4.5:1 for normal, 3:1 for large text)
- [ ] **Keyboard Navigation**: All interactive elements accessible via Tab, Enter, Space
- [ ] **Focus States**: Visible focus indicators on all focusable elements
- [ ] **Semantic HTML**: Use correct elements (button, nav, article, header, etc.)
- [ ] **ARIA Labels**: Add where semantic HTML insufficient
- [ ] **Alt Text**: All images have descriptive alt attributes
- [ ] **Touch Targets**: Minimum 44x44px tap areas on mobile

### Performance Checklist

- [ ] **Images**: WebP format, responsive srcset, lazy loading
- [ ] **Fonts**: Preload critical fonts, use font-display: swap
- [ ] **CSS**: No unused Tailwind classes in production
- [ ] **JavaScript**: Code split, dynamic imports for heavy features
- [ ] **Assets**: Leveraging Astro's built-in optimization
- [ ] **Core Web Vitals**: FCP < 1.5s, LCP < 2.5s, CLS < 0.1

### Code Quality Checklist

- [ ] **TypeScript**: No `any` types, proper type definitions
- [ ] **Imports**: Clean, organized imports
- [ ] **Comments**: Document complex logic (not obvious code)
- [ ] **Naming**: Clear, descriptive variable/function names
- [ ] **Duplication**: No repeated code (use composition)
- [ ] **File Size**: Components under 250 lines (refactor if larger)

### Brand & Design Checklist

- [ ] **Colors**: Using CSS variables from design tokens (text-foreground, bg-surface, border-muted, etc.)
- [ ] **No Arbitrary Values**: All Tailwind classes use design tokens - NO arbitrary values like `[#bababa]` or `[605px]`
- [ ] **Text Content**: All copy from `src/content/copy/` - no hardcoded strings
- [ ] **Spacing**: Using spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
- [ ] **Typography**: Correct font families (Inter body, JetBrains Mono headings)
- [ ] **Border Radius**: Consistent values (8-12px via design tokens)
- [ ] **Animations**: Only simple transitions (150-300ms)
- [ ] **Vocabulary**: Following approved messaging (no "scanner", "synthesizer")
- [ ] **Simplified HTML**: Minimal wrapper divs, semantic structure

## 🌳 Decision Trees

**Use these decision trees to make consistent choices:**

### "Should I create a new component?"

```
Is there a similar component in src/components/base/?
├─ YES → Can I extend it with variants?
│  ├─ YES → Use tailwind-variants to add new variant
│  └─ NO → Check src/components/features/ for existing
│     ├─ EXISTS → Extend or compose
│     └─ NOT EXISTS → Create new component
└─ NO → Create new base component (if reusable) or feature component
```

### "Where should this code live?"

```
Is it a reusable UI primitive?
├─ YES → src/components/base/
└─ NO → Is it feature-specific?
   ├─ YES → Is it a complete feature with state?
   │  ├─ YES → src/features/{feature-name}/
   │  └─ NO → src/components/features/
   └─ NO → Is it layout-related?
      ├─ YES → src/components/layout/
      └─ NO → Ask for clarification
```

### "Should I ask the user or proceed?"

```
Is the requirement ambiguous?
├─ YES → ASK first
└─ NO → Is this a significant architectural decision?
   ├─ YES → ASK first
   └─ NO → Is this a destructive change (deleting code)?
      ├─ YES → ASK first
      └─ NO → PROCEED (following patterns)
```

### "Astro component or Vue component?"

```
Does it need client-side interactivity?
├─ NO → Use Astro component (better performance)
└─ YES → How much interactivity?
   ├─ MINIMAL (onclick, simple toggle) → Astro + minimal JS
   └─ COMPLEX (forms, state, real-time) → Vue component
```

## ❌ Explicit Boundaries

**What NOT to do (enforced constraints):**

### Never Do

- ❌ **Never** create custom animations beyond simple transitions (time sink, maintenance burden)
- ❌ **Never** use multiple component libraries (stick to base components + Tailwind)
- ❌ **Never** hardcode colors, spacing, or typography (use design tokens)
- ❌ **Never** use arbitrary values in Tailwind classes (e.g., `text-[#bababa]`, `w-[605px]`) - use design tokens only
- ❌ **Never** hardcode text strings in components - all copy must be in `src/content/copy/`
- ❌ **Never** use `any` type in TypeScript (use proper types or `unknown`)
- ❌ **Never** commit secrets or API keys (.env, credentials.json)
- ❌ **Never** use terms "scanner" or "synthesizer" in product copy
- ❌ **Never** skip accessibility features (keyboard nav, focus states, contrast)
- ❌ **Never** use stock photos (authentic visuals only)
- ❌ **Never** modify Tailwind config without updating design tokens
- ❌ **Never** create multiple font families beyond Inter and JetBrains Mono

### Always Do

- ✅ **Always** check existing patterns before creating new ones
- ✅ **Always** use semantic HTML first (button, nav, article, etc.)
- ✅ **Always** include all interaction states (default, hover, active, focus, disabled)
- ✅ **Always** use mobile-first responsive approach
- ✅ **Always** add TypeScript types for component props
- ✅ **Always** test keyboard navigation
- ✅ **Always** verify WCAG AA contrast ratios
- ✅ **Always** use tailwind-variants for component variations
- ✅ **Always** add content to `src/content/copy/` rather than hardcode
- ✅ **Always** use CSS variables for theme-related values

### When Uncertain

- 🤔 **Prefer** simplicity over cleverness
- 🤔 **Prefer** composition over duplication
- 🤔 **Prefer** existing patterns over new approaches
- 🤔 **Prefer** asking clarification over guessing
- 🤔 **Prefer** semantic HTML over div soup
- 🤔 **Prefer** CSS solutions over JavaScript
- 🤔 **Prefer** Astro components over Vue (unless interactivity needed)

---

## 📚 Reference Documentation

**The sections below contain reference material for understanding the codebase.**

## Project Overview

Sp3ctra is a multimedia instrument that converts gestures and drawings into real-time sound through a repurposed scanner device. This repository contains the marketing website showcasing the product, built with Astro for optimal performance and SEO.

## Development Commands

```bash
pnpm astro add partytown # PREFER intall dependencies with "astro add" command
pnpm install       # Install other dependencies
pnpm dev           # Start dev server at localhost:4321
pnpm build         # Build production site to ./dist/
pnpm preview       # Preview production build locally
```

## Tech Stack

- **Framework**: Astro 5 with Netlify adapter for SSG deployment
- **Styling**: Tailwind CSS 4 (utility-first approach)
- **Language**: TypeScript
- **Fonts**: Inter (body text), JetBrains Mono (titles and technical content)
- **Deployment**: Netlify (automated deployments)
- **Analytics**: Amplitude

## Architecture

### Component Organization

Components follow a **variant-based approach** using `tailwind-variants`:

```typescript
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: "bg-blue-500 px-4 py-2 text-white rounded-md",
  variants: {
    variant: {
      secondary: "bg-orange-500",
      ghost: "bg-transparent border",
    },
  },
});
```

Components are organized by purpose:

- `src/components/base/` - Reusable UI primitives (Button, Card, Input, Headings)
- `src/components/layout/` - Header, Footer, Navigation
- `src/components/features/` - Feature-specific components (hero, product, preorder, newsletter, contact)

### Content Management

**Text Content**: All UI copy is stored in `src/content/copy/` as JSON files, organized by language and page for i18n support.

**Blog Content**: Uses Astro Content Collections with frontmatter schema:

```markdown
---
title: "Event Title"
date: 2025-10-07
description: "Event description"
img: .jpg
tags: ["event"]
event:
  - date_start: 2025-10-18
  - date_end: 2026-01-01
  - location: "Location"
video: ...
---
```

### Feature Modules

Feature code organized in `src/features/` with modular structure:

```txt
features/
├── newsletter/
│   ├── api.ts      # API integration
│   ├── store.ts    # State management
│   └── types.ts    # Type definitions
├── contact/
└── analytics/
```

### Layouts

- `BaseLayout.astro` - Main layout with SEO meta tags (title, description, OG tags, canonical, structured data)
- `BlogLayout.astro` - Blog post layout

## Design System

### Brand Identity

- **Background**: Pure black for "technological product innovation" feel
- **Gradient**: Spectral gradient purple (#FF56D8) to blue (#508AFF), plus gold/copper accents
- **Typography**: Inter (400, 500, 600), JetBrains Mono (200, 400, 500, 600)

### Color Variables

Use Tailwind's foreground/background CSS variables for semantic colors:

- Primary: Spectral gradient base
- Accent: Interactive elements
- Background: Dark base
- Surface: Cards/elevated surfaces
- Text primary/secondary: High/medium contrast

## SEO Requirements

Every page must include complete SEO meta tags in BaseLayout:

- Title, description, OG tags
- Twitter card metadata
- Canonical URL
- Schema.org structured data

## Internationalization

Content is prepared for future i18n with:

- Language-organized JSON in `src/content/copy/{lang}/`
- Astro's built-in i18n routing support

---

## 🎯 Product Context

**The sections below provide brand, product, and business context for creating appropriate content.**

### Product Positioning

When creating content or components, understand the product positioning:

- **Innovation**: First device for real-time linear image and gesture capture
- **Technology**: 3465 RGB photosensitive sensors, <5ms latency, open-source SDK
- **Recognition**: "Lauréat AAP Innovation Sonore - Cité des Sciences 2025"
- **Applications**: Sound creation, visual arts, education, industry
- **Target Audiences**: Musicians, educators, researchers, engineers, tech enthusiasts, innovation labs

## Design Philosophy for Solo Development

### Core Principles

**Sophisticated Minimalism**: Design choices prioritize clarity, precision, and technological elegance over decorative elements. Every visual decision serves a functional purpose.

**Strategic Simplicity**: With one developer, focus on:

- High-impact, low-maintenance design patterns
- Reusable component architecture
- Utility-first CSS approach (Tailwind) for rapid iteration
- Systematic design tokens for consistency without overhead

### Visual Language

**Typography Hierarchy**:

- Use weight variation (400, 500, 600) rather than multiple font families
- JetBrains Mono for technical/innovative feel in headlines
- Inter for readability in body text
- Generous line-height (1.6-1.7) and strategic white space

**Color Strategy**:

- Pure black background (#000000) conveys technological precision
- Spectral gradient (purple #FF56D8 to blue #508AFF) represents the product's essence
- Gold/copper accents for "innovation sonore" recognition
- Semantic colors using CSS variables for maintainability

**Spacing System**:

- Use consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Generous margins between sections (64px+) for premium feel
- Avoid cramped layouts—white space is a feature, not waste

**Component Design**:

- Cards with subtle borders/shadows for depth without heaviness
- Consistent border-radius (8-12px) for modern but professional feel
- Hover states with smooth transitions (150-300ms)
- Focus states that respect accessibility without visual noise

### Solo Developer Best Practices

**Efficiency Without Compromise**:

1. **Use tailwind-variants** for component variations—minimal code, maximum flexibility
2. **Establish design tokens early** (colors, spacing, typography) in Tailwind config
3. **Create base components** (Button, Card, Heading, Input) before building features
4. **Document component props** with TypeScript types for self-documentation
5. **Use composition** over duplication—build complex UIs from simple primitives

**What to Avoid**:

- Custom animations beyond simple transitions (time sink, maintenance burden)
- Pixel-perfect positioning—use flexbox/grid with semantic spacing
- Over-engineered state management—start simple with Vue composition API
- Multiple component libraries—stick to your base components + Tailwind

**Quality Shortcuts That Work**:

- Use system fonts as fallbacks (font-display: swap)
- Optimize images once during build, not runtime
- Leverage Astro's automatic optimizations
- Use semantic HTML for free accessibility wins
- CSS variables for theme variations without complexity

### Visual Hierarchy Guidelines

**Information Architecture**:

1. **Hero section**: Clear value proposition + single primary CTA
2. **Feature sections**: 3-4 key benefits with icons/visuals
3. **Proof/Validation**: Recognition badge, testimonials (when available)
4. **Applications**: 4 cards showcasing use cases
5. **CTA sections**: Newsletter signup, partnerships, pre-order

**Contrast & Emphasis**:

- Headlines: Bold weight (600) + larger size
- Primary CTAs: High-contrast gradient buttons
- Secondary CTAs: Outlined or ghost buttons
- Body text: Medium-high contrast (400 weight)
- Labels/metadata: Lower contrast, smaller size

**Responsive Strategy**:

- Mobile-first approach (most traffic is mobile)
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Stack elements vertically on mobile, grid on desktop
- Touch-friendly tap targets (min 44x44px)

### Brand Consistency

**Vocabulary & Tone**:

- Refer to `src/content/copy/` for approved messaging
- Use technical precision without jargon
- Avoid terms: "scanner" (bureautique), "synthesizer" (limits perception)
- Prefer: "dispositif", "instrument", "interface", "flux continu", "temps réel"

**Imagery Guidelines**:

- Show the device in use (hands, gestures, human context)
- Use spectral gradient overlays to unify diverse images
- Avoid stock photos—authentic visuals only
- Dark backgrounds for consistency with brand

### Technical Implementation Patterns

**Component Structure Example**:

```vue
<script setup lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

// Define variants with tailwind-variants
const styles = tv({
  base: "rounded-lg transition-all duration-200",
  variants: {
    variant: {
      primary: "bg-gradient-to-r from-purple-500 to-blue-500",
      secondary: "bg-surface border border-border",
      ghost: "bg-transparent hover:bg-surface/50",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Type-safe props
interface Props extends VariantProps<typeof styles> {
  href?: string;
}

const { variant, size, href } = Astro.props;
</script>

<a href="{href}" class="{styles({" variant, size })}>
  <slot />
</a>
```

**Responsive Utilities**:

```html
<!-- Mobile-first approach -->
<div class="flex flex-col gap-4 md:flex-row md:gap-8">
  <!-- Content stacks on mobile, horizontal on desktop -->
</div>

<!-- Generous spacing on desktop -->
<section class="py-16 md:py-24 lg:py-32">
  <!-- Increases vertical padding on larger screens -->
</section>
```

**Accessibility Patterns**:

```html
<!-- Always include focus states -->
<button
  class="focus:ring-primary focus:ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2"
>
  Action
</button>

<!-- Semantic HTML -->
<article>
  <header>
    <h2>Title</h2>
  </header>
  <p>Content</p>
</article>
```

### Code Quality Examples: What to Avoid vs What to Use

**❌ WRONG - Arbitrary values and hardcoded text:**

```astro
<section class="relative w-full bg-black py-16 md:py-24">
  <div class="container mx-auto">
    <div class="border-t border-[#bababa] pt-6">
      <h2 class="font-['JetBrains_Mono'] text-xl text-white">SPÉCIFICATIONS TECHNIQUES</h2>
    </div>
    <div class="border-b border-[#333333] pb-3">
      <dt class="text-[#bababa]">Capteurs</dt>
      <dd class="text-white">3465 RGB 460 DPI</dd>
    </div>
    <span class="bg-[#1a1a1a] px-4 py-2 text-white"> Open Source </span>
  </div>
</section>
```

**✅ CORRECT - Design tokens and content from copy files:**

```astro
---
import copy from "@content/copy/fr.json";
const { title, specs, tags } = copy.technicalSpecs;
---

<section class="container py-16 md:py-24">
  <div class="border-muted border-t pt-6">
    <h2 class="text-foreground font-mono text-xl">
      {title}
    </h2>
  </div>
  <dl class="flex flex-col gap-4">
    {
      specs.map((spec) => (
        <div class="border-border border-b pb-3">
          <dt class="text-muted">{spec.label}</dt>
          <dd class="text-foreground">{spec.value}</dd>
        </div>
      ))
    }
  </dl>
  <div class="flex flex-wrap gap-3">
    {tags.map((tag) => <span class="bg-surface text-foreground px-4 py-2">{tag}</span>)}
  </div>
</section>
```

**Key improvements:**

- ❌ `border-[#bababa]` → ✅ `border-muted` (semantic token)
- ❌ `bg-[#1a1a1a]` → ✅ `bg-surface` (semantic token)
- ❌ `text-white` → ✅ `text-foreground` (semantic token)
- ❌ `font-['JetBrains_Mono']` → ✅ `font-mono` (font family token)
- ❌ Hardcoded "SPÉCIFICATIONS TECHNIQUES" → ✅ `{title}` from copy file
- ❌ `relative w-full` unnecessary wrappers → ✅ Simplified structure
- ❌ `mx-auto` when using container → ✅ `container` utility includes margins

**Available Design Tokens:**

```css
/* Colors - Use semantic class names */
text-foreground     /* White text */
text-muted          /* Dimmed white text */
bg-background       /* Pure black */
bg-surface          /* Dark gray surface */
border-border       /* Subtle white border */
border-muted        /* More visible border */

/* Typography */
font-sans           /* Inter */
font-mono           /* JetBrains Mono */

/* Border radius */
rounded-sm          /* 8px */
rounded-md          /* 12px */

/* Spacing already built into Tailwind */
gap-4, gap-8, py-16, px-4, etc.
```

## Landing Page Strategy

Refer to `docs/prompts/create-a-landing-page.prompt.md` for comprehensive guidance on:

- Hero section messaging and CTAs
- Section structure and information hierarchy
- Application showcases (4 cards: Sound Creation, Visual Arts, Education, Industry)
- Conversion optimization for newsletter signups, partnerships, and pre-orders

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

### Optimization Checklist

- [ ] Images: WebP format, responsive srcset, lazy loading
- [ ] Fonts: Subset only used characters, preload critical fonts
- [ ] CSS: Purge unused Tailwind classes in production
- [ ] JS: Code splitting, dynamic imports for heavy features
- [ ] Assets: Use Astro's built-in asset optimization
- [ ] Analytics: Load Amplitude asynchronously

## Error Handling & Edge Cases

**Form Validation**:

- Client-side validation with clear error messages
- Server-side validation on API endpoints
- Graceful error states with retry options

**Loading States**:

- Skeleton screens for content-heavy sections
- Inline spinners for form submissions
- Toast notifications for async operations

**Empty States**:

- Helpful messages when no content available
- Clear CTAs to guide users forward
- Maintain brand consistency in error/empty states

## Deployment & CI/CD

- **Automatic Deploys**: Push to `main` triggers Netlify build
- **Preview Deploys**: Every PR gets a preview URL
- **Environment Variables**: Set in Netlify dashboard, never in code
- **Build Command**: `pnpm build`
- **Publish Directory**: `dist`

## When in Doubt

1. **Check existing patterns**: Look at implemented components first
2. **Prioritize simplicity**: The best code is no code
3. **Mobile-first**: Start with mobile layout, enhance for desktop
4. **Accessibility**: Use semantic HTML, test with keyboard navigation
5. **Performance**: Defer non-critical resources, optimize images
6. **Brand consistency**: Review positioning document for vocabulary
