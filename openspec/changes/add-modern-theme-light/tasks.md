# Tasks

## 1. Modern theme tokens

- [x] 1.1 Add `src/themes/modern.css` with `[data-theme='modern']` defining the same semantic CSS variables as Notion themes (colors, radius, fonts, page pattern, icon stroke, control sizing as needed) using a minimal contemporary light palette; verify in DevTools that switching `data-theme` to `modern` changes `--color-page` / `--color-primary` / `--radius` from Notion values
- [x] 1.2 Import `./themes/modern.css` from `src/main.ts` next to existing theme imports; verify the file loads (no missing import / build error) via `npm run build` or Vite start

## 2. Theme selection API

- [x] 2.1 Widen `ThemeId` to include `'modern'`, accept it in `readStored` / `setTheme` / `applyThemeEarly`, and treat unknown stored values as missing; verify setting `modern` updates `document.documentElement.dataset.theme` and survives reload via localStorage `dev902-theme`
- [x] 2.2 Make `toggleTheme` a no-op when active theme is `modern` (Notion `default` ↔ `dark` unchanged); verify calling toggle on modern leaves `data-theme="modern"`
- [x] 2.3 Optionally expose derived `themeFamily` / `setThemeFamily` helpers (`notion` | `modern`) mapping per design.md; verify selecting modern family sets `modern` and selecting notion family from modern sets `default`

## 3. UI controls

- [x] 3.1 On `HomePage.vue`, add a Notion | Modern family control wired to theme selection; verify clicking Modern applies modern tokens and Notion returns to `default`
- [x] 3.2 On `HomePage.vue`, hide or disable the sun/moon control when theme is `modern` (tooltip optional); verify the control cannot switch to `dark` while on modern, and still toggles `default` ↔ `dark` on Notion
- [x] 3.3 Mirror family control + moon policy on `example/page/PageDemoPage.vue` for parity; verify the same behaviors on that page

## 4. Integration check

- [x] 4.1 Manually walk: Notion light → Modern → Notion light → Notion dark → Modern; confirm persistence across refresh and that Q surfaces using semantic utilities (page, button, card border/radius) visibly change under Modern without editing Q components; run `npm run build` and fix any type errors from `ThemeId` widening
