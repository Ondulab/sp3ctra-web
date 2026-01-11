<!-- markdownlint-disable MD040 -->

# AGENTS.md

> Single Source of Truth for AI assistants. Ignore conflicting `CLAUDE.md` or `GEMINI.md`.

## 🤖 AI Context

**Astro MCP Server**: Use `mcp_astro_docs_search_astro_docs` tool for up-to-date Astro APIs.
**Fallback docs**: [llms.txt](https://docs.astro.build/llms.txt) | [llms-full.txt](https://docs.astro.build/llms-full.txt)

---

## 🚀 Quick Reference

| Category    | Value                                            |
| ----------- | ------------------------------------------------ |
| **Stack**   | Astro 5 + Tailwind CSS 4 + TypeScript            |
| **Run**     | `pnpm dev` \| `pnpm build`                       |
| **Add pkg** | `pnpm astro add <integration>` (not manual edit) |
| **Content** | `src/content/copy/fr.json` (never hardcode text) |
| **Tokens**  | `src/styles/global.css` @theme block             |
| **Icons**   | `@lucide/astro` (UI) \| `astro-icon` (custom)    |
| **Docs**    | `specs/{number}-{name}/` (never root)            |

### Key Paths

```
src/components/base/     → Reusable UI primitives (Button, Heading)
src/components/features/ → Page sections (Hero, News)
src/features/            → Complex logic + state (analytics/)
src/constants/           → Shared data (specs.ts, eventImages.ts)
```

---

## 📐 Architecture Rules

### ✅ DO

- Text → `content/copy/fr.json`
- Colors/gradients → `global.css` tokens (`bg-gradient-primary`)
- Shared data → `src/constants/` files
- UI icons → `import { Icon } from '@lucide/astro'`
- Props → `tailwind-variants` (`tv`)

### ❌ DON'T

- Hardcode text in components
- Use arbitrary Tailwind values (`bg-[#123456]`, `from-purple-500`)
- Inline SVG strings
- Use `any` type
- Create docs in root (use `specs/`)

---

## 🌳 Decision Trees

### Where to put code?

```
New code → Reusable UI?
  → Yes: src/components/base/
  → No: Has complex logic/state?
    → Yes: src/features/{name}/
    → No: src/components/features/
```

### New component or variant?

```
Requirement → Similar component exists?
  → Yes: Same structure? → Add variant (props)
  → No: Create new (compose existing base components)
```

---

## 🚦 Quality Gates

**Before committing, verify:**

- [ ] No hardcoded text (use `copy.section.key`)
- [ ] No arbitrary colors (use tokens)
- [ ] Semantic HTML (`<nav>`, `<main>`, `<button>`)
- [ ] Focus states on interactive elements
- [ ] Images use `<Image>` from `astro:assets`
- [ ] No `any` types

---

## 🎨 Styling Tokens

```css
/* Text */     text-foreground | text-muted
/* Background */ bg-background | bg-surface
/* Borders */  border-border | border-muted
/* Fonts */    font-mono (headings) | font-sans (body)
/* Gradients */ bg-gradient-primary | text-gradient-primary
```

---

## 📝 Naming Conventions

| Type       | Convention | Example             |
| ---------- | ---------- | ------------------- |
| Components | PascalCase | `FeatureCard.astro` |
| Utilities  | camelCase  | `formatDate.ts`     |
| CSS        | kebab-case | `section-header`    |

**Vocabulary**: ✅ "Dispositif", "Instrument", "Interface" · ❌ "Scanner", "Synthesizer"

---

## 📚 Extended Documentation

For detailed architecture history and completed improvements, see:

- [specs/000-architecture/completed-improvements.md](specs/000-architecture/completed-improvements.md)

---

## ⚠️ Astro-Specific Tips

- **Verify APIs**: Content Collections, Actions, and Sessions have changed — check MCP before using
- **Use `astro add`**: For integrations like `astro add tailwind`, `astro add react`
- **Server-first**: Prefer `.astro` components over client-side frameworks when possible
- **Images**: Always use `<Image>` from `astro:assets` for optimization
