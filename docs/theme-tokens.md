# 主题 Tokens

源文件：`src/themes/*.css`（默认 `default.css`）。`tailwind.config.cjs` 只做 CSS 变量 → Tailwind 工具类映射，**不要**在 config 里写死色值。

切换主题：加载另一个 `src/themes/<name>.css`，或在 `<html>` 上设置 `data-theme="…"`（需对应选择器）。

## 颜色（RGB 通道）

变量形式为 `R G B`（无逗号），便于 Tailwind `rgb(var(--token) / <alpha>)`。

| Token | 用途 | Tailwind |
|-------|------|----------|
| `--color-primary` | 正文主色 | `text-primary` / `bg-primary` |
| `--color-secondary` | 次表面（白） | `secondary` |
| `--color-page` | 页面底 | `bg-page` |
| `--color-surface` | 卡片 / 浮层底 | `bg-surface` |
| `--color-hover` | 悬停底 | `bg-hover` |
| `--color-active` | 选中 / 按下底 | `bg-active` |
| `--color-border` | 边框 | `border-border` |
| `--color-btn` / `-hover` / `-active` | 主按钮 | `bg-btn` … |
| `--color-on-btn` | 主按钮上的字 | `text-on-btn` |
| `--color-danger` / … | 危险操作 | `bg-danger` … |
| `--color-accent-1`…`4` | 点缀（info / warn / success / purple） | `accent-1` … |

## 控件尺寸

| Token | 含义 | Tailwind |
|-------|------|----------|
| `--control-h-sm` / `md` | 控件高度 | `h-control-sm` / `h-control-md` |
| `--control-px-sm` / `md` | 水平内边距 | `px-control-x-sm` / `md` |
| `--control-text-sm` / `md` | 字号 | `text-control-sm` / `md` |

## App Shell

| Token | 含义 | Tailwind |
|-------|------|----------|
| `--sidebar-width` | 侧栏展开宽 | `w-sidebar` |
| `--sidebar-width-collapsed` | 侧栏收起宽 | `w-sidebar-collapsed` |
| `--topbar-height` | 顶栏高 | `h-topbar` |

## 字体 / 圆角 / 边框 / 阴影

- 字体：`--font-heading` / `--font-body` / `--font-mono` → `font-heading` / `font-body` / `font-mono`
- 圆角：`--radius-sm` … `--radius-lg` → `rounded-sm` … `rounded-lg`（组件库默认 `rounded-md`）
- 边框宽：`--border-width` … → `border` / `border-2` …
- 阴影：`--shadow-brutal*` 为可选硬阴影（Notion 气质少用大阴影）

## 图标（QIcon）

| Token | 含义 |
|-------|------|
| `--icon-size-sm` … `xl` | 默认尺寸阶梯 |
| `--icon-stroke` | 描边粗细 |
| `--icon-color` | 默认颜色 |

详见 [`q-icon.md`](./q-icon.md)。

## 约定

1. **改色 / 字体 / 圆角只动 `src/themes/*.css`**，再确认 Tailwind 映射是否已覆盖。
2. 组件内用语义类（`bg-surface`、`text-primary/60`、`border-border`），避免硬编码 `#hex`。
3. 动效时长优先 `duration-150`；尊重 `prefers-reduced-motion`（可用 `usePrefersReducedMotion()`）。
