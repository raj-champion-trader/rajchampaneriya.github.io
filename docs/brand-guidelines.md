# Visual Brand Guidelines — rajc.work

**Version:** 1.0  
**Date:** February 14, 2026  
**Purpose:** Define premium visual identity for elite enterprise architect positioning.

---

## Brand Positioning

rajc.work is the digital advisory presence of an Enterprise Architect who serves Fortune 500 clients. The visual identity must communicate:
- **Authority** — Commanding, not decorative
- **Premium** — Consulting-grade, not weekend-project
- **Trust** — Institutional credibility, not personal flair
- **Clarity** — Enterprise-grade information hierarchy

---

## Color System

### Light Mode — "Executive Clarity"

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand` | `hsl(215, 65%, 38%)` | Primary brand — Deep Strategic Blue |
| `--color-brand-dim` | `hsl(215, 40%, 55%)` | Muted brand for secondary elements |
| `--color-brand-glow` | `hsla(215, 65%, 38%, 0.12)` | Brand glow/shadow |
| `--color-bg` | `hsl(220, 20%, 97%)` | Page background — Cool Paper White |
| `--color-surface` | `hsl(220, 20%, 99%)` | Card/surface — Near White |
| `--color-surface-glass` | `hsla(220, 20%, 99%, 0.88)` | Glass panel |
| `--color-text-main` | `hsl(220, 30%, 12%)` | Primary text — Near Black |
| `--color-text-muted` | `hsl(220, 10%, 42%)` | Secondary text — Slate |
| `--color-border` | `hsla(220, 30%, 12%, 0.08)` | Borders |
| `--color-on-brand` | `hsl(0, 0%, 100%)` | Text on brand background (buttons, tags, badges) |
| `--color-accent-gold` | `hsl(42, 85%, 55%)` | Accent Gold — Premium highlight |

### Dark Mode — "Boardroom After Hours"

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand` | `hsl(215, 75%, 65%)` | Strategic Blue — lighter for contrast |
| `--color-brand-dim` | `hsl(215, 50%, 50%)` | Muted brand |
| `--color-brand-glow` | `hsla(215, 75%, 65%, 0.18)` | Brand glow |
| `--color-bg` | `hsl(220, 25%, 7%)` | Deep Navy/Charcoal |
| `--color-surface` | `hsl(220, 20%, 11%)` | Card surface |
| `--color-surface-glass` | `hsla(220, 20%, 11%, 0.85)` | Glass panel |
| `--color-text-main` | `hsl(220, 20%, 94%)` | Light text |
| `--color-text-muted` | `hsl(220, 12%, 65%)` | Muted light text |
| `--color-border` | `hsla(220, 20%, 94%, 0.08)` | Borders |
| `--color-on-brand` | `hsl(0, 0%, 100%)` | Text on brand background |
| `--color-accent-gold` | `hsl(42, 80%, 60%)` | Warm Gold accent |

### Legacy enterprise token mapping

To support legacy styles (`enterprise.css`) the following enterprise tokens now *derive* from the canonical Frontier tokens. Prefer `--color-*`, `--text-*`, `--space-*` tokens for all new work; treat the `--theme` / `--entry` set as legacy aliases.

| Enterprise token | Maps to Frontier token | Note |
|------------------|------------------------|------|
| `--theme`        | `var(--color-bg)`      | Page background |
| `--entry`        | `var(--color-surface)` | Card / surface |
| `--primary`      | `var(--color-text-main)` | Primary text |
| `--secondary`    | `var(--color-text-muted)` | Muted text |
| `--tertiary`     | `var(--color-border)`  | Borders |
| `--content`      | `var(--color-text-main)` | Post content |
| `--hljs-bg`      | `var(--code-bg)`       | Code block bg |
| `--link`         | `var(--color-brand)`   | Brand/link color |
| `--link-hover`   | `var(--color-brand-dim)` | Hover color |
| `--blue-bg`      | `var(--color-brand-glow)` | Badge/pill tint |
| `--blue-border`  | `var(--color-brand-glow)` | Badge border (use sparingly) |

> Guidance: Use Frontier tokens for consistency and to avoid token fragmentation. Only add new tokens to `variables.css` (Frontier) — do not create parallel enterprise tokens.

### Overlay & Backdrop tokens

| Token | Default | Usage |
|-------|---------|-------|
| `--overlay-backdrop-strength` | `0.85` | Global alpha (0–1) used by fullscreen/backdrop overlays (dialogs, Mermaid fullscreen). Tune for perceived depth; recommended range: 0.70–0.95. |
| `--overlay-bg` | `hsla(..., var(--overlay-backdrop-strength))` | Theme-aware overlay background — use `var(--overlay-bg)` for fullscreen overlays instead of hard-coded HSLA. |

> Design note: Lower values increase translucency and show more content beneath the overlay; higher values focus attention on the overlay content. Use conservatively to retain premium depth.

### Text and link roles

Use exactly two text roles for body and UI so colors stay consistent:

| Role | Token | Use for |
|------|--------|--------|
| Primary text | `--color-text-main` | Headings, body copy, primary labels |
| Secondary / muted | `--color-text-muted` | Meta (date, author), captions, hints, secondary labels |
| Links and accents | `--color-brand` | Inline links, nav links, tags, CTAs |
| Link hover | `--color-brand-dim` | Hover state for text links and footer/nav links |
| Text on brand | `--color-on-brand` | Button text when background is brand (e.g. primary button, tag hover) |

Do not use raw hex or `#fff` for “white on brand” — use `var(--color-on-brand)` so theme and future tweaks stay consistent.

### Hover and interactive states

- **Text links**: default `--color-brand`, hover `--color-brand-dim`.
- **Buttons with brand fill (e.g. primary, tag hover)**: text `--color-on-brand`.
- **Footer / nav links**: hover `--color-brand` (same as text links).

---

## Typography

### Font Stack
- **Headings & Body**: Inter (400, 500, 600, 700, 800)
- **Monospace**: JetBrains Mono (400, 700)

### Type Scale (Fluid)
| Token | Size | Usage |
|-------|------|-------|
| `--text-3xl` | `clamp(2rem, 1.8rem + 1vw, 2.5rem)` | Hero headline |
| `--text-2xl` | `clamp(1.5rem, 1.35rem + 0.75vw, 2rem)` | Section titles |
| `--text-xl` | `clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)` | Card titles |
| `--text-lg` | `clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)` | Subtitles |
| `--text-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | Body text |
| `--text-sm` | `clamp(0.875rem, 0.8rem + 0.375vw, 1rem)` | Meta text |
| `--text-xs` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` | Labels, badges |

### Heading Style
- Weight: 800 for h1, 700 for h2-h3, 600 for h4-h6
- Letter-spacing: -0.03em for h1, -0.02em for h2-h3
- Line-height: 1.1

---

## Code Block Styling

### Syntax Highlighting
- Style: `monokai` base with custom overrides
- Background: Slightly warmer than pure dark (`hsl(220, 18%, 13%)`)
- Border: Subtle 1px border with `--color-border`
- Border-radius: 12px
- Padding: 1.25rem
- Line numbers: Optional, off by default
- Font: JetBrains Mono at 0.9em

### Language-Specific Colors (Dark code blocks)
| Element | Color | Hex |
|---------|-------|-----|
| Keywords | Electric Blue | `#66d9ef` |
| Strings | Soft Green | `#a6e22e` |
| Comments | Muted Gray | `#75715e` |
| Numbers | Purple | `#ae81ff` |
| Functions | Yellow | `#e6db74` |
| Variables | White | `#f8f8f2` |
| Operators | Red/Pink | `#f92672` |
| JSON Keys | Light Blue | `#66d9ef` |
| JSON Values (strings) | Green | `#a6e22e` |
| JSON Values (numbers) | Purple | `#ae81ff` |

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | `0.25rem` | Smallest gaps, tight padding |
| `--space-xs` | `0.5rem` | Tight gaps, badge padding |
| `--space-sm` | `1rem` | Card padding, small gaps |
| `--space-md` | `1.5rem` | Section gaps, card margins |
| `--space-lg` | `2.5rem` | Major section separation |
| `--space-xl` | `4rem` | Hero padding, page sections |
| `--space-2xl` | `6rem` | Large section separation |

Use only these tokens (and content tokens like `--content-padding-mobile`, `--home-padding-*`) for margins, padding, and gaps. Avoid raw `rem`/`px` so the scale drives list pages, hero, about, and post content consistently.

### Blog Card Spacing Rules
- Feed grid gap: `var(--space-md)` (consistent 1.5rem between all cards)
- Card padding: `var(--space-md)` uniform
- Card border-radius: `var(--radius-md)` (16px)
- No extra `border-bottom` — use gap-based spacing only

---

## Component Patterns

### Glass Panel
```css
background: var(--color-surface-glass);
backdrop-filter: blur(16px);
border: 1px solid var(--color-border);
border-radius: 16px;
box-shadow: 0 2px 4px hsla(220, 20%, 10%, 0.05);
```

### Premium Buttons
- Primary: Brand color fill, `--color-on-brand` text, pill shape (border-radius: 100px)
- Outline: Transparent background, brand border, brand text
- Hover: Fill with `--color-brand`, text `--color-on-brand`; subtle translateY(-1px) with box-shadow increase

### Metric Cards
- Large number in brand color, bold weight
- Small label below in muted text
- Grouped in horizontal flex with even spacing

### Certification Badges
- Tiny inline pills with check icon
- Background: Brand glow color
- Border: Subtle brand border
- Text: Brand color, uppercase, 0.62rem

---

## Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `max-width: 480px` | Small phones (iPhone SE) |
| `max-width: 768px` | Tablets/large phones |
| `max-width: 1024px` | Small laptops |
| Default | Desktop |

---

## Dark/Light Mode

Both modes must feel equally premium. Dark mode is NOT an afterthought — many executives browse in dark mode. Ensure:
- Adequate contrast ratios (WCAG AA minimum)
- Gold/blue accent colors adjusted for dark backgrounds
- Glass panel effects visible in both modes
- Code blocks consistent across modes

---

## Accessibility and contrast

- **Target ratios**: At least **4.5:1** for normal text, **3:1** for large text (WCAG AA). Prefer higher where possible.
- **Token pairs**: When defining text-on-background (e.g. about page accents), list the pair and verify contrast. All `--about-accent-*-text` / `-number` vs `-bg` pairs in `variables.css` should meet these targets.
- **Avoid opacity for body-like text**: Do not rely on `opacity: 0.75` or similar for paragraph or label text; use a proper muted token or a darker/lighter accent variant so contrast is predictable.
