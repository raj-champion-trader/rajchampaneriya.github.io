# UI Architect Recommendations: Unified Visual Experience

**Goal:** Eliminate fragmented visuals and deliver a polished, premium feel across the About page and Landing page in light theme by unifying primary, secondary, and tertiary color usage.

---

## 1. Root Cause Summary

| Issue | Cause |
|-------|--------|
| **Mismatched palettes** | About page uses a separate Tailwind-style hex palette (`--about-accent-*`) that does not derive from Frontier’s canonical hue (215 blue, 220 neutrals). Landing uses Frontier tokens; About uses different blues/oranges/greens/purples. |
| **Two “blues” in light theme** | Main brand: `hsl(215, 65%, 38%)`. About blue: `#1e40af` / `#2563eb` — same intent, different source, so they can feel like two systems. |
| **Hardcoded values** | `premium-hero.css` uses raw `hsla(220, …)` and `hsl(215, …)` in many places instead of design tokens, so future theme changes don’t propagate. |
| **Legacy semantic clash** | `--primary` / `--secondary` / `--tertiary` are mapped to text/border roles in `enterprise.css`; any leftover expectation of “primary = brand color” can cause confusion. |

---

## 2. Concrete Recommendations

### 2.1 Single source of truth for light theme colors

- **Primary (brand / CTAs / headings):** Use only `--color-brand` and `--color-brand-dim`. Do not introduce a second blue (e.g. about-accent-blue-*) that is not derived from `--hue-brand` (215).
- **Secondary (body / supporting text):** Use `--color-text-main` for primary text, `--color-text-muted` for secondary. No new “secondary” hex values.
- **Tertiary (borders / dividers / subtle UI):** Use `--color-border`. Surfaces: `--color-bg`, `--color-surface`, `--color-surface-glass`.

**Action:** Derive all About page accent colors from the same hue family or from explicit design tokens (see §2.2).

### 2.2 Unify About page accent palette (light theme)

- **Option A (recommended):** Define about accents in `variables.css` using the same hue base and token pattern:
  - Blue: already aligned with brand — use `--color-brand`, `--color-brand-glow`, `--color-brand-dark` for about blue steps/cards; add a single `--about-accent-blue-*` set that references these (e.g. `--about-accent-blue-bg: var(--color-brand-glow)`).
  - Orange / Green / Purple: define as HSL with explicit hue values that sit in a compatible palette (e.g. 25 orange, 160 green, 270 purple) and use the same lightness/saturation rules as the rest of the theme. Prefer tokens like `--about-accent-orange-bg` that are set once in `:root` and `[data-theme="light"]` / `[data-theme="dark"]` so they stay in sync.
- **Option B:** If you keep distinct hex values for about accents, ensure the **blue** accent is exactly the same as `--color-brand` (and on-brand surfaces use `--color-brand-glow`) so the About page doesn’t introduce a second blue.

**Action:** In `variables.css`, for `[data-theme="light"]`, set `--about-accent-blue-bg`, `-border`, `-text`, `-number` to values derived from `--color-brand` / `--color-brand-glow` (or the same HSL). In `about-page.css`, use only these variables (no local hex).

### 2.3 Replace hardcoded HSL in premium-hero and extended CSS

- **premium-hero.css:** Replace `hsla(220, 20%, 50%, 0.08)`, `hsla(220, 30%, 12%, …)`, `hsla(var(--hue-brand), 65%, 38%, 0.15)` with tokens such as `var(--color-border)`, `var(--color-brand-glow)`, or new tokens (e.g. `--hero-divider`) defined in `variables.css`.
- **Care-step gradients:** Use tokens for the gradient colors (e.g. `--care-clarity-start`, `--care-clarity-end`) so light/dark and future palette changes are in one place.

**Action:** Add a small set of hero-specific tokens in `variables.css` (light + dark), then in `premium-hero.css` replace every raw `hsl`/`hsla` with a variable.

### 2.4 Document primary / secondary / tertiary usage

- In `variables.css` (or a short `docs/brand-guidelines.md`), state clearly:
  - **Primary (brand):** `--color-brand` — CTAs, links, section headings, key accents.
  - **Secondary:** `--color-text-main` (body), `--color-text-muted` (supporting).
  - **Tertiary:** `--color-border` — borders, dividers, subtle backgrounds only.
- Deprecate use of `--primary` / `--secondary` / `--tertiary` for “first/second/third color” in new components; use `--color-brand`, `--color-text-*`, `--color-border` instead.

**Action:** Add a short comment block at the top of `variables.css` (or create `docs/brand-guidelines.md`) with the above and point `enterprise.css` to it.

### 2.5 Light-theme polish checklist

- [ ] About page blue accents use the same blue as the landing hero (token-driven).
- [ ] No hex blues (#1e40af, #2563eb, etc.) in About light theme unless they are aliases of `--color-brand` / `--color-brand-dark`.
- [ ] Hero metrics strip, trust badges, and care-step cards use only design tokens (no raw hsl in extended CSS).
- [ ] Pagination, footer, and profile buttons that rely on `--tertiary` get a visible but subtle background (e.g. `--color-surface` or a dedicated token) if `--color-border` is too faint in light mode.

---

## 3. Implementation Order

1. **Unify About blue with brand** — In `variables.css`, set light-theme `--about-accent-blue-*` from brand tokens; ensure About page uses them.
2. **Tokenize premium-hero** — Add hero/care tokens, replace all raw HSL in `premium-hero.css`.
3. **Derive remaining About accents from a single palette** — Define orange/green/purple/gray in `variables.css` with consistent saturation/lightness for light theme.
4. **Document and deprecate** — Add brand-guidelines comment and any small docs update.

---

## 4. Files to Touch

| File | Changes |
|------|--------|
| `themes/frontier/assets/css/variables.css` | Add/about accent tokens derived from brand; add hero/care tokens; add usage comment. |
| `assets/css/extended/about-page.css` | Use only tokenized about accents (no new hex). |
| `assets/css/extended/premium-hero.css` | Replace raw `hsl`/`hsla` with variables. |
| `assets/css/extended/enterprise.css` | Optional: tighten comment pointing to brand guidelines. |

This gives you one canonical palette for light theme, token-driven hero and about sections, and a clear rule set for primary/secondary/tertiary so the experience feels cohesive and premium.
