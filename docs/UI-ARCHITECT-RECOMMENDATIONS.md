# UI Architect Recommendations — Unified Premium Experience

**Purpose:** Address reported fragmented visual experience with concrete, actionable changes. Goal: polished, premium feel through consistent tokens and patterns.

**Scope:** Theme (`themes/frontier/`) + site extended CSS (`assets/css/extended/`). PaperMod is inactive; focus on Frontier and extended files only.

---

## 1. Color system (text, primary, secondary, tertiary)

### 1.1 Text colors

**Issue:** Mismatched text colors — some components use raw hex/hsl or legacy tokens (`--primary`, `--secondary`) instead of the canonical pair.

**Canonical tokens (use these everywhere):**
- **Primary text:** `--color-text-main` (headings, body, labels)
- **Secondary/muted:** `--color-text-muted` (meta, captions, hints)
- **Links & accents:** `--color-brand` (default) → `--color-brand-dim` (hover)
- **On brand (buttons/tags):** `--color-on-brand`

**Actions:**
- **Search & replace:** Any `color: var(--primary)` → `var(--color-text-main)`; `var(--secondary)` → `var(--color-text-muted)`; `var(--tertiary)` → `var(--color-border)`. Prefer doing this in `enterprise.css` and any extended file that still uses legacy names.
- **Avoid opacity for text hierarchy:** Use `--color-text-muted` instead of `opacity: 0.7` on body-like text so contrast stays predictable (WCAG). Reserve opacity for icons/decorative elements only.

### 1.2 Primary / secondary / tertiary palette

**Issue:** “Primary, secondary, tertiary” in the codebase map to **semantic roles**, not three distinct hues:
- **Primary** = main text → `--color-text-main`
- **Secondary** = muted text → `--color-text-muted`
- **Tertiary** = borders / dividers → `--color-border`
- **Brand** = links, CTAs, accents → `--color-brand` (and `--color-brand-dim`, `--color-brand-dark`)

**Actions:**
- Do **not** introduce new “secondary/tertiary” hue tokens. Keep the single brand hue (`--hue-brand: 215`) and use semantic tokens above.
- In Mermaid/JS theme config, `secondaryColor`/`tertiaryColor` are already mapped to brand/border in `baseof.html`; leave as-is.
- **About page accents** (blue, orange, purple, green, gray) are intentional for sections; keep using `--about-accent-*` tokens. Ensure no ad-hoc hex in new components.

---

## 2. Spacing (margins, padding, footer gaps)

### 2.1 Spacing scale (single source of truth)

**Tokens:** `--space-2xs` (0.25rem) → `--space-xs` (0.5rem) → `--space-sm` (1rem) → `--space-md` (1.5rem) → `--space-lg` (2.5rem) → `--space-xl` (4rem) → `--space-2xl` (6rem).

**Actions:**
- **Replace raw spacing:** Any `margin: 8px`, `padding: 12px`, `gap: 0.5rem`, `margin-top: 24px`, etc. with the closest token (e.g. `8px` → `--space-xs`, `12px` → between `--space-xs` and `--space-sm`; prefer `--space-sm` for consistency, or add `--space-s` only if you introduce a new scale step in `variables.css`).
- **Content padding:** Use `--content-padding-mobile` / `--content-padding-tablet` / `--content-padding-desktop` for horizontal content; `--home-padding-*` for home container.

### 2.2 Content spacing scale (semantic tokens)

**Purpose:** Consistent vertical rhythm in post/about content so headings, paragraphs, lists, and sections feel cohesive.

**Semantic tokens (in `variables.css`):**

| Token | Maps to | Use for |
|-------|--------|--------|
| `--content-heading-after` | `var(--space-sm)` | Space below H2/H3 (before paragraph or list). |
| `--content-section-gap` | `var(--space-lg)` | Space above a new major section (e.g. H2 that follows `hr`). |
| `--content-paragraph-after` | `var(--space-md)` | Margin below paragraphs; keeps paragraph → list and list → next block even. |
| `--content-list-after` | `var(--space-md)` | Margin below lists (e.g. contact links). |
| `--content-list-margin-top` | `var(--space-sm)` | Margin above lists so they don’t sit flush under a paragraph. |
| `--footer-inner-gap` | `var(--space-md)` | Vertical gap between footer rows (social, email, tagline). |

**Rule of thumb:** New content blocks (custom shortcodes, new about sections) should use these tokens for margins/padding so the site stays consistent. Prefer these over raw `--space-*` in `.post-content` and `.page-content` where vertical rhythm matters.

### 2.3 Main content bottom spacing and footer

**Issue:** Inconsistent gap between main content and footer; mobile bottom nav/player overlap concerns.

**Current:**
- `main` (via `.app-layout`) has `padding-bottom: var(--main-bottom-spacing)` (8.75rem) — reserve for bottom nav + player on mobile; do not use to reduce content–footer gap on desktop.
- `.site-footer` has `margin-top: var(--footer-gap)` (default `var(--space-xl)`; on desktop 1024px+ overridden to `var(--space-lg)` in `main.css`).
- `.site-footer-inner` uses `gap: var(--footer-inner-gap)` for separation between social row, email row, and tagline.

**Actions:**
- **Footer gap:** `--footer-gap` in `variables.css` controls margin above the footer; desktop override in `main.css` at `min-width: 1024px` sets `--footer-gap: var(--space-lg)` for a less stark transition.
- **Footer inner gap:** Use `--footer-inner-gap` in `footer.css` for `.site-footer-inner` so spacing between rows is tunable in one place.
- Keep `--main-bottom-spacing` as the single control for “space reserved above bottom nav/player” on mobile only.

---

## 3. Border radius

**Canonical tokens:** `--radius-2xs` (3px), `--radius-scrollbar` (4px), `--radius-xs` (6px), `--radius-sm` (8px), `--radius-card` (10px), `--radius-md` (16px), `--radius-lg` (32px), `--radius-pill` (100px).

**Issue:** Many files use hardcoded `border-radius: 4px`, `6px`, `8px`, `14px`, `28px`, etc.

**Actions:**
- **premium-hero.css:**  
  - `border-radius: 4px` → `var(--radius-scrollbar)` or `var(--radius-2xs)` (cert badges, inline code).  
  - `border-radius: 6px` → `var(--radius-xs)` (hero-metric__icon, care-step letter wrap 14px → use `var(--radius-sm)` or a new token only if you need “between xs and sm”).  
  - `border-radius: 14px` (care-step__letter-wrap) → e.g. `var(--radius-sm)` (8px) or add `--radius-card-small: 14px` in variables and use it for this and any similar chip.
- **mermaid.css:** Replace all `border-radius: 4px`, `6px`, `8px` with `var(--radius-2xs)`, `var(--radius-xs)`, `var(--radius-sm)`.
- **featured-project.css:** Already uses `var(--radius-sm)`; no change.
- **pros-cons.css:** `border-radius: 1px` → `var(--radius-2xs)` or leave as 1px only if intentionally hairline; otherwise document.

---

## 4. Borders, shadows, and elevation

### 4.1 Borders

**Canonical:** `--color-border` (and alias `--border: var(--color-border)`).

**Actions:**
- Use one of the two consistently site-wide; recommend `var(--color-border)` for new code and gradually replace `var(--border)` with `var(--color-border)` (or vice versa) so one convention wins.
- Replace raw `hsla(220, …)` borders with `var(--color-border)` or theme-aware tokens (e.g. filter chips use `--filter-chip-border`).

### 4.2 Shadows

**Tokens:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`.

**Issue:** Ad-hoc shadows in `premium-hero.css`, `mermaid.css`, `care-teaser`, etc. (e.g. `0 6px 20px var(--color-brand-glow), 0 2px 6px hsla(215, 65%, 38%, 0.2)`).

**Actions:**
- **Button/card hover:** Prefer a single “elevated” shadow token. Consider adding to `variables.css`:  
  `--shadow-hover: 0 6px 20px var(--color-brand-glow), 0 2px 6px hsla(var(--hue-brand), 65%, 38%, 0.2);`  
  and use it for primary CTA and card hovers (light mode); dark mode override with same structure using dark brand values.
- **premium-hero.css:** Replace duplicated hover shadows with `var(--shadow-hover)` (after defining it) or at least `var(--shadow-md)` for consistency.
- **mermaid.css:** Replace `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` with `var(--shadow-sm)` (and theme-aware if needed).

---

## 5. Height, width, min/max dimensions

**Issue:** Magic numbers for heights/widths (e.g. `height: 260px`, `min-height: 28px`, `min-height: 56px`) scattered across files.

**Actions:**
- **variables.css:** Already defines `--metric-item-max`, `--player-info-max`, `--touch-target-min`, `--avatar-*`, `--bottom-nav-*`. Add tokens for repeated values:
  - e.g. `--featured-img-height: 260px` and `--featured-img-height-mobile: 180px` (used in `featured-project.css`).
  - `--trust-badge-min-height: 28px` (premium-hero trust badges).
- **bottom-nav.css:** `min-height: 56px` → tokenize as `--bottom-nav-height: 56px` in variables and use it for nav bar and any “space reserved” calculations.
- Use `max-width: 100%` for responsive media; avoid new magic max-widths for content — use `--measure-*`, `--container-*`, or `--trust-badges-max` etc.

---

## 6. Opacity

**Issue:** Inconsistent use of opacity (e.g. `opacity: 0.6`, `0.85`, `0.95`) for text, icons, and overlays.

**Actions:**
- **Text:** Do not rely on opacity for body/meta text; use `--color-text-muted` (and ensure contrast).
- **Icons / decorative:** If you keep opacity, centralize: add tokens in `variables.css`, e.g.  
  `--opacity-icon: 0.9;`  
  `--opacity-icon-muted: 0.7;`  
  Use them in footer icons, nav icons, hero metric icons, etc.
- **Overlays:** Already have `--overlay-backdrop-strength` and `--overlay-bg`; use them for all fullscreen overlays.

---

## 7. Font weight

**Issue:** Raw `font-weight: 500`, `600`, `700`, `800` across many files without a single scale.

**Current in variables:** `--font-weight-heading: 700`. Brand guidelines: h1 800, h2–h3 700, h4–h6 600.

**Actions:**
- **variables.css:** Add semantic font-weight tokens, e.g.  
  `--fw-normal: 400;`  
  `--fw-medium: 500;`  
  `--fw-semibold: 600;`  
  `--fw-bold: 700;`  
  `--fw-extrabold: 800;`  
  and set `--font-weight-heading: var(--fw-bold);`.
- **Replace raw font-weight in CSS:** In `premium-hero.css`, `about-page.css`, `scrollspy.css`, `profile-layout.css`, `enterprise.css`, `mermaid.css`, etc., replace numeric values with tokens (e.g. `font-weight: 700` → `font-weight: var(--fw-bold)`). This gives one place to tune “all bold labels” or “all semibold meta” later.

---

## 8. Hover states

**Rule (from brand guidelines):**
- **Text links:** default `--color-brand`, hover `--color-brand-dim`.
- **Nav links:** muted or brand when active; hover `--color-brand`.
- **Primary buttons:** text `--color-on-brand`; hover background `--color-brand-dark` or `--color-brand-dim`.
- **Outline buttons:** default `--color-brand`; hover `--color-brand-dim` (or inverse).
- **Cards / chips:** hover border/background using brand tokens; optional `translateY(-1px)` or `-2px` and shadow increase. Use `var(--transition-fast)` or `var(--transition-medium)`.

**Actions:**
- **footer.css:** `.site-footer-link:hover` and `.site-footer-tagline a:hover` use `color: var(--color-brand)`. Per guidelines, hover should be `--color-brand-dim` for link-like behavior; optionally keep brand for “active” emphasis. Recommend: set to `var(--color-brand-dim)` and use `var(--transition-fast)`.
- **premium-hero.css:** `.btn-outline:hover` already uses brand + on-brand; `.trust-badge:hover` uses brand — OK. Ensure all link-like elements in extended CSS use the same pair (brand / brand-dim) and transition token.
- **featured-project.css:** Card hover uses `--color-brand` for title and `var(--shadow-lg)`; active state uses `transition-duration: 0.18s` → replace with `var(--transition-fast)`.
- Avoid any global `a:hover { opacity: 0.7 }`; use explicit color/background per context.

---

## 9. Implementation priority

| Priority | Area | Action |
|----------|------|--------|
| P0 | Tokens | Add `--fw-*`, `--opacity-icon*`, `--shadow-hover`, `--footer-gap` (optional), `--featured-img-height*` in variables.css. |
| P1 | premium-hero.css | Replace hardcoded radii, shadows, hsla() borders/shadows, transition duration, and font-weight with tokens. |
| P1 | footer.css | Align link hover to `--color-brand-dim`; use transition token. |
| P2 | featured-project.css | Use `var(--transition-fast)` for active state; tokenize image heights. |
| P2 | mermaid.css | Use radius and shadow tokens; reduce raw padding/margin where tokens exist. |
| P2 | about-page.css, scrollspy.css, profile-layout.css, enterprise.css | Replace raw font-weight with `--fw-*`. |
| P3 | Stub/deprecated files | Remove or empty `header-fixes.css`, `menu-separator.css`, `post-meta.css`, `animations.css` if fully moved to theme. |
| P3 | Border alias | Standardize on `--color-border` or `--border` site-wide and document in brand-guidelines.md. |

---

## 10. Files to touch (checklist)

- **themes/frontier/assets/css/variables.css** — add tokens (font-weight, opacity, shadow-hover, footer-gap, featured heights).
- **themes/frontier/assets/css/main.css** — use new tokens where base styles exist (e.g. headings font-weight).
- **assets/css/extended/premium-hero.css** — full token pass (radii, shadows, transitions, font-weight, borders).
- **assets/css/extended/footer.css** — hover color + transition.
- **assets/css/extended/featured-project.css** — transition + height tokens.
- **assets/css/extended/mermaid.css** — radii, shadows, optional padding/margin tokens.
- **assets/css/extended/about-page.css**, **scrollspy.css**, **profile-layout.css**, **enterprise.css** — font-weight tokens.
- **docs/brand-guidelines.md** — add section referencing this doc and new tokens (font-weight, opacity, shadow-hover).

---

*Document generated from UI Architect review. Implement in order P0 → P1 → P2 → P3 for a cohesive, premium feel.*
