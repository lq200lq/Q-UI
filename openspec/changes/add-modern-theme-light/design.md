# Design

## Context

See proposal.md for motivation. Today themes are a flat `ThemeId = 'default' | 'dark'`: CSS files set variables under `[data-theme='…']`, `useTheme` persists the id and sets `data-theme` early in `main.ts`, and Home/PageDemo expose only a sun/moon toggle. Q components already use semantic Tailwind utilities mapped from those CSS variables (`tailwind.config.cjs`); almost no hardcoded Notion hex remains in components.

## Goals / Non-Goals

**Goals:**

- Add `modern` as a third `data-theme` value with a full light token set sharing names with Notion themes
- Keep Notion `default` / `dark` behavior intact
- Extend `useTheme` so callers can set Modern and select theme family without breaking existing `toggleTheme` on Notion
- Wire a small family control + moon-toggle policy on surfaces that already theme-switch

**Non-Goals:**

- Introducing `modern-dark` or a full `family` + `mode` data model split in v1 (ids stay flat: `default` | `dark` | `modern`)
- Changing Q component recipes, Tailwind extend maps, or notion-style skill forbidden classes
- Perfect typography branding beyond what `--font-heading` / `--font-body` in the modern theme file can express
- Migrating storage key or renaming historical `default` id

## Decisions

### 1. Flat ThemeId, not family+mode yet

- **Choice:** `ThemeId = 'default' | 'dark' | 'modern'`; keep storage key `dev902-theme`.
- **Why:** Matches existing API and localStorage; only one new id for Phase 1. Family+mode can map onto these ids later when `modern-dark` lands.
- **Alternatives:** `data-theme="modern-light"` + rename Notion ids — more churn for no v1 benefit. Nested `data-family` / `data-mode` — cleaner long-term but overkill before a second modern mode exists.

### 2. Modern tokens = same variable names, new values

- **Choice:** New `src/themes/modern.css` under `[data-theme='modern']` overrides the same `--color-*`, `--radius-*`, `--font-*`, `--bg-page-pattern`, `--icon-stroke`, etc. Import it from `main.ts` alongside existing theme CSS.
- **Why:** Zero Tailwind/config/component churn; coexistence is the point of the token pipeline.
- **Starter direction (implementer may tune within “minimal contemporary light”):** near-white page (no or negligible dot pattern), near-black primary text, cooler borders, slightly larger radii (e.g. 8 / 12 for default / lg), near-black or restrained primary button, optional font stack change via `--font-*` only.
- **Alternatives:** Duplicate Tailwind color keys per theme — rejected (breaks single utility vocabulary).

### 3. Moon toggle policy B on Modern

- **Choice:** When `theme === 'modern'`, hide or disable the light/dark control; `toggleTheme` no-ops (or is not bound) so it cannot jump to Notion `dark`.
- **Why:** Spec forbids switching away from Modern via the moon control; honest UX until `modern-dark` exists.
- **Alternatives:** Toggle to Notion dark (abandons family); invent fake modern dark (out of scope).

### 4. Family control maps Modern ↔ Notion light

- **Choice:** Expose Notion | Modern. Selecting Modern → `setTheme('modern')`. Selecting Notion while on Modern → `setTheme('default')`. Selecting Notion while already on `dark` stays on dark (family already Notion).
- **Why:** Satisfies “return to Notion light from Modern” without inventing mode state. Optional helpers (`themeFamily`, `setThemeFamily`) can derive from `ThemeId` for cleaner UI.
- **Where:** HomePage required; PageDemo optional but recommended for parity with existing moon control.

### 5. Early apply + validation

- **Choice:** Extend `readStored` to accept `'modern'`; unknown values fall through to existing preferDark / default logic. `applyThemeEarly` unchanged in call sites.
- **Why:** Avoid flash and honor persistence for the new id.

## Risks / Trade-offs

- [Modern has no dark] → Moon control hidden/disabled; document in UI tooltip if useful. Mitigated by deferring `modern-dark` to a later change.
- [Leaving Notion as `default` id] → Slightly confusing vs “notion” naming. Mitigation: UI labels say “Notion”; keep id for compatibility.
- [Font choice in modern.css] → Wrong pick feels generic. Mitigation: set expressive `--font-*` in modern only; iterate without touching components.
- [Home-only family control] → Example galleries stay Notion unless PageDemo updated. Mitigation: mirror control on PageDemo in the same change if low cost.

## Migration Plan

- Additive CSS + composable widening; no data migration beyond accepting a new stored string.
- Rollback: remove modern.css import and UI; old `default`/`dark` storage values remain valid.

## Open Questions

- Exact Modern palette hex/RGB values and display font pair (safe to tune during apply without changing specs).
- Whether example shells beyond PageDemo need the family control (defer unless a gallery already owns theme switching).
