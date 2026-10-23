# Q-UI

Vue 3 + Vite + Tailwind CSS（Notion Style）+ motion-v 脚手架。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## Examples

- 目录：`example/`（组件展示，不进业务逻辑）
- 布局壳：[http://localhost:5173/example/layout](http://localhost:5173/example/layout)
- 组件总览：[http://localhost:5173/example/components](http://localhost:5173/example/components)
- QIcon 图标墙：[http://localhost:5173/example/icons](http://localhost:5173/example/icons)

## 基建

- 浮层挂载：`#overlay-root`（`Teleport` 用 `OVERLAY_ROOT`）
- Composables：`useDisclosure`、`useClickOutside`
- 无障碍约定：[`docs/accessibility.md`](docs/accessibility.md)

## 主题

- `src/themes/default.css` — 当前默认主题（CSS 变量）
- 后续可新增 `src/themes/<name>.css`，在 `src/style.css` 中切换 import，或挂 `data-theme`
- `tailwind.config.cjs` — 映射 CSS 变量到 Tailwind utility（`bg-page`、`text-primary` 等）

## 其他

- `src/style.css` — Tailwind 入口
- `.cursor/rules/` — 前端开发规范（架构 / Vue / TS / 主题 / Motion / a11y）
- `.cursor/skills/notion-style` — 视觉风格技能
- `.cursor/skills/motion-vue` — Motion for Vue 动画技能
