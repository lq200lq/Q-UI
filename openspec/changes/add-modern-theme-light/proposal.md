# Proposal

## Why

The design system currently ships only Notion-identical light/dark tokens, so the product looks like a Notion clone even though components already consume semantic CSS variables via Tailwind. We need a coexisting **modern light** theme so we can compare and ship a more minimal, contemporary look without rewriting Q components or abandoning the token pipeline.

## What Changes

- Add a new light theme (`modern`) as CSS custom properties under `[data-theme='modern']`, reusing the same variable names as Notion themes
- Extend theme selection so users can choose Notion light, Notion dark, or Modern light (persisted)
- On Modern, hide or disable the light/dark (moon) toggle until a modern dark theme exists
- Expose a Notion vs Modern family control on Home (and optionally example demos) without changing Q component class recipes or `tailwind.config.cjs` mappings
- Leave Notion `default` / `dark` tokens and the notion-style skill constraints unchanged for this change

## Capabilities

### New Capabilities

- `theming`: Theme identity, persistence, `data-theme` application, and coexisting visual theme families (Notion vs Modern) with light/dark modes where available

### Modified Capabilities

- (none — no existing specs yet)

## Impact

- `src/themes/modern.css` (new)
- `src/composables/useTheme.ts` — widen `ThemeId`, selection APIs, toggle behavior when Modern is active
- `src/main.ts` — import modern theme CSS
- `src/views/HomePage.vue` (and possibly `example/page/PageDemoPage.vue`) — family switch UI; moon toggle policy on Modern
- No intended changes to Q components, Tailwind theme extend map, or dark Notion tokens
- Out of scope: `modern-dark`, redesign of component recipes, replacing Inter globally outside theme font tokens, relaxing notion-style forbidden classes for Notion themes
