# UI Architect: Spacing, Margins & Padding — Refinement Guide

**Purpose:** Eliminate visual inconsistencies (irregular spacing, uneven margins/padding) and deliver a polished, cohesive interface. Use this alongside `docs/ui-architect-recommendations.md` and `docs/UI-ARCHITECT-RECOMMENDATIONS.md`.

**Scope:** Theme (`themes/frontier/`) + extended CSS (`assets/css/extended/`).

---

## 1. Single source of truth for spacing

### 1.1 Spacing scale (use everywhere)

| Token | Value | Use for |
|-------|--------|--------|
| `--space-2xs` | 0.25rem | Tight inline gaps (icons, badges) |
| `--space-xs` | 0.5rem | Inline spacing, small padding |
| `--space-sm` | 1rem | Between related blocks, card internal padding |
| `--space-md` | 1.5rem | Section padding, list spacing |
| `--space-lg` | 2.5rem | Section gaps, large blocks |
| `--space-xl` | 4rem | Major section separation |
| `--space-2xl` | 6rem | Hero-to-content, footer gap |

**Rule:** No raw `8px`, `12px`, `14px`, `24px`, `0.35rem`, etc. Use the closest token (e.g. `8px` → `--space-xs`, `24px` → `--space-md` or `--space-lg` per context).

### 1.3 Breakpoint convention

- **Mobile-first:** Use `min-width: 768px` and `min-width: 1024px` for tablet and desktop.
- **Mobile-only / tablet-and-below:** Use `max-width: 767px` (so 768px is first tablet) and `max-width: 1023px` (so 1024px is first desktop). The 1023px boundary is used for fixed bottom nav and player (variables.css), audio-player, scrollspy, and compact-desktop — keep this convention so layout doesn’t flicker at 1024px.

### 1.2 Content and layout padding

- **Horizontal content:** `--content-padding-mobile` / `--content-padding-tablet` / `--content-padding-desktop`
- **Home/hero:** `--home-padding-mobile` / `--home-padding-tablet` / `--home-padding-desktop`
- **Content vertical rhythm:** `--content-heading-after`, `--content-paragraph-after`, `--content-section-gap`, `--content-list-after`, `--content-list-margin-top` (see §2.2 in root UI-ARCHITECT-RECOMMENDATIONS.md)

---

## 2. Specific inconsistencies and fixes

### 2.1 Page header padding (conflict)

**Issue:** Two different definitions:

- `enterprise.css`: `.page-header { padding: var(--space-md) 0 0; }` — top only, no horizontal.
- `main.css`: `.page-header { padding: var(--content-padding-mobile) 0; }` with responsive overrides — horizontal from content padding.

**Fix:** Use one definition. Recommended: keep **vertical** padding from tokens and **horizontal** from content padding so list pages align with rest of layout.

```css
.page-header {
  padding: var(--space-md) 0;  /* or var(--content-padding-mobile) for top/bottom on mobile */
}
```

Use `var(--content-padding-mobile)` (and tablet/desktop) for **horizontal** only on the **container** or wrapper; for `.page-header` use vertical only so the title doesn’t get double horizontal padding. Prefer in `main.css`:  
`padding: var(--space-sm) 0` (mobile), then `var(--space-md) 0` (tablet), `var(--space-lg) 0` (desktop), and ensure the parent supplies horizontal padding.

### 2.2 Feed grid and feed card spacing

**Issue:** Two competing sources:

- `main.css`: `.feed-grid { gap: var(--space-sm); margin-top: var(--space-md); }`, `.feed-card { padding: var(--content-padding-mobile); ... }`
- `premium-hero.css`: `.feed-grid { gap: var(--space-md); margin-top: var(--space-md); }`, `.feed-card { padding: var(--space-md); ... }`

**Fix:** Define feed layout in **one** place (e.g. `main.css`). Use consistent tokens:

- Grid gap: `var(--space-md)` everywhere (including desktop at 1024px).
- Card padding: `var(--content-padding-mobile)` (and tablet/desktop) so cards match page content width. Homepage `.latest-feed .feed-card` should not override padding — let it inherit from main so desktop is consistent.

### 2.3 Raw pixel and rem values → tokens

Replace with design tokens:

| File | Current | Replace with |
|------|--------|--------------|
| `main.css` | `.post-meta-social { gap: 8px; }` | `gap: var(--space-xs);` |
| `main.css` | `#menu li + li { margin-inline-start: 8px }` | `margin-inline-start: var(--space-xs);` |
| `main.css` | `.site-header ... #theme-toggle { margin-top: 6px }` | `margin-top: var(--space-2xs);` |
| `main.css` | `.bottom-nav { bottom: 12px }` (375px) | `bottom: var(--space-sm);` |
| `main.css` | `.featured-project-tags { gap: 8px }` | `gap: var(--space-xs);` |
| `profile-layout.css` | `.profile-image { width: 130px; height: 130px }` | `width: var(--avatar-desktop); height: var(--avatar-desktop);` |
| `about-page.css` | `.post-header__about-photo img { width: 120px; height: 120px }` | `var(--about-photo-mobile)` (or dedicated token) |
| `premium-hero.css` | `.highlight { padding: 1.25rem }` | `padding: var(--space-md);` |
| `premium-hero.css` | `.hero-premium__cert { padding: 0.12rem 0.45rem }` | `padding: var(--space-2xs) var(--space-xs);` |
| `premium-hero.css` | `.care-step__icon { margin-bottom: 0.35rem }` | `margin-bottom: var(--space-2xs);` |
| `premium-hero.css` | `.care-step__desc { margin-top: 0.35rem }` | `margin-top: var(--space-2xs);` |
| `premium-hero.css` | `.care-step__word { margin-top: 0.15rem }` | `margin-top: var(--space-2xs);` |
| `premium-hero.css` | Hero buttons mobile `padding: 12px 20px` | `padding: var(--space-sm) var(--space-md);` |
| `premium-hero.css` | `.hero-metric__icon { width: 28px; height: 28px }` | Add `--metric-icon-size: 28px` in variables or use `var(--space-md)` (24px) / token |
| `premium-hero.css` | `.trust-badge { min-height: 28px }` | Tokenize as `--trust-badge-min-height: 28px` in variables (or use `--space-md` if acceptable) |

### 2.4 Duplicate .icon-fab rules

**Issue:** In `main.css`, `.icon-fab` is defined twice with conflicting values:

- First: `width: 56px; height: 56px; font-size: var(--text-xl); box-shadow: ...; margin-top: -30px`
- Second: `width: 48px; height: 48px; font-size: var(--text-lg); ... margin-top: -24px`

**Fix:** Keep one block. Prefer tokenized sizes, e.g. `min-width: var(--touch-target-min); min-height: var(--touch-target-min);` and a single negative margin token (e.g. `--fab-lift: -24px`) so the FAB sits consistently above the nav.

### 2.5 Footer inner gap (doc vs code)

**Resolved:** `variables.css` now sets `--footer-inner-gap: var(--space-md);` so footer rows have consistent separation. Root UI-ARCHITECT doc §2.2 matches.

### 2.6 Border radius

Use tokens instead of raw values: `4px` → `var(--radius-scrollbar)` or `var(--radius-2xs)`; `6px` → `var(--radius-xs)`; `8px` → `var(--radius-sm)`; `14px` → `var(--radius-sm)` or a dedicated token. Apply in `premium-hero.css`, `mermaid.css`, and any extended CSS.

### 2.7 Card and list vertical rhythm

- **List pages:** Use `--content-heading-after` for space below page title (e.g. `.page-header h1 { margin-bottom: var(--content-heading-after); }`).
- **Post/content:** Already using `--content-paragraph-after`, `--content-heading-after`, `--content-section-gap` in enterprise.css; ensure no component overrides with raw margins.

### 2.8 Single page (blog / project) desktop

- **Vertical rhythm:** One source in `main.css`: `.single-post .post-content > * + * { margin-top: var(--content-section-gap); }` so any two adjacent block-level siblings get the same gap. The first block has no top margin (`.single-post .post-content > *:first-child { margin-top: 0; }`); the last has no bottom margin so the gap before `.post-footer` comes from `.post-content` padding.
- **Block-level margins:** Headings, blockquote, lists, hr, tables, figures, `.post-content > div`, `.content-callout`, and `.highlight` use `margin-top: 0` and `margin-bottom: 0` (or equivalent) so they don’t double with the `* + *` rule. Hero/flow figures keep `margin-bottom: var(--space-xl)` for extra space below.
- **Blog and project singles** use the same layout and the same CSS; no section-specific overrides. Spacing is token-driven so `/blog/` and `/projects/` single pages feel consistent on desktop.

### 2.9 Projects list desktop alignment

- On desktop (1024px+), the **projects list** (`/projects/`) uses the **same content padding as the blog list and the rest of the site**: `--content-padding-desktop` for `.page-content` and `--content-block-padding-desktop` for `.page-content .content-callout`, so the intro panel, callouts, featured card, and feed cards share one content alignment. List-specific overrides in `compact-desktop.css` are **typography-only** (e.g. `--post-title-tablet`, `--content-body-tablet`) to keep the page compact without sacrificing alignment. Do not reintroduce tablet-level padding for projects list at desktop unless a deliberate exception is documented here.

---

## 3. Implementation checklist

- [x] Unify `.page-header` padding in one file (main.css) with vertical tokens only; container handles horizontal.
- [x] Unify `.feed-grid` gap and `.feed-card` padding (single source in main.css; premium-hero only overrides where needed).
- [x] Replace all raw spacing in §2.3 with tokens.
- [x] Consolidate `.icon-fab` to one block with tokens.
- [x] Set `--footer-inner-gap: var(--space-md)` (or keep sm) and align docs.
- [x] Projects list desktop: use same content padding as blog/site; compact-desktop typography-only.
- [ ] Replace raw border-radius and font-weight with `--radius-*` and `--fw-*` in extended CSS.
- [ ] Fix `card-category` indentation in enterprise.css (use 2 spaces for consistency).

---

## 4. Files to touch (summary)

| File | Changes |
|------|--------|
| `themes/frontier/assets/css/main.css` | page-header padding; feed-grid/card; post-meta-social/menu/theme-toggle/bottom-nav/featured-project-tags gap/margin; single .icon-fab block. |
| `themes/frontier/assets/css/variables.css` | Optional: --footer-inner-gap; --trust-badge-min-height; --metric-icon-size; --fab-lift. |
| `assets/css/extended/enterprise.css` | page-header if kept here; card-category indentation. |
| `assets/css/extended/profile-layout.css` | Avatar size → var(--avatar-desktop) and responsive tokens. |
| `assets/css/extended/about-page.css` | About photo size → token. |
| `assets/css/extended/premium-hero.css` | highlight/cert/care-step padding and margins; hero button padding; hero-metric icon/trust-badge sizes; radius/font-weight tokens. |

Implementing these will remove the main spacing and padding inconsistencies and make the interface feel cohesive and polished.
