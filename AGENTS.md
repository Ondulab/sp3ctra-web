# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code), Gemini Cli, Github Copilot when working with code in this repository.

## Project Overview

Sp3ctra is a multimedia instrument that converts gestures and drawings into real-time sound through a repurposed scanner device. This repository contains the marketing website showcasing the product, built with Astro for optimal performance and SEO.

## Development Commands

```bash
pnpm install       # Install dependencies
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

## Product Context

When creating content or components, understand the product positioning:

- **Innovation**: First device for real-time linear image and gesture capture
- **Technology**: 3465 RGB photosensitive sensors, <5ms latency, open-source SDK
- **Recognition**: "Lauréat AAP Innovation Sonore - Cité des Sciences 2025"
- **Applications**: Sound creation, visual arts, education, industry
- **Target Audiences**: Musicians, educators, researchers, engineers, tech enthusiasts, innovation labs

## Landing Page Strategy

Refer to `docs/prompts/create-a-landing-page.prompt.md` for comprehensive guidance on:

- Hero section messaging and CTAs
- Section structure and information hierarchy
- Application showcases (4 cards: Sound Creation, Visual Arts, Education, Industry)
- Conversion optimization for newsletter signups, partnerships, and pre-orders
