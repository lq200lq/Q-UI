# QIcon

统一图标入口。Notion Style 下使用**线性、细描边、低装饰**图标；业务侧禁止直接内联散落 SVG，一律走 `QIcon`。

建议路径：`src/components/q/QIcon.vue` + `src/components/q/icons/`（或 `src/icons/` 注册表）。

---

## 目标

- [x] 单一组件 `QIcon`，通过 `name` 选用图标 — `src/components/q/QIcon.vue`
- [x] 尺寸 / 描边 / 默认色跟主题 token（`--icon-size-*`、`--icon-stroke`、`--icon-color` + `text-*`）
- [x] 可访问：装饰性默认 `aria-hidden`；有语义时传 `label`
- [x] 显式注册表（`icons/registry.ts`）；新增图标只改注册表

---

## API（建议）

```vue
<QIcon name="plus" />
<QIcon name="search" :size="16" class="text-primary/60" />
<QIcon name="trash" label="删除" :stroke-width="1.75" />
```

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `name` | `IconName`（字符串联合） | 必填 | 图标键，类型约束防拼写错误 |
| `size` | `number \| string` | `16` | px；也可用 `sm` / `md` / `lg` 映射 |
| `strokeWidth` | `number` | `1.75` | 贴合 Notion 细线感（勿用过粗） |
| `label` | `string` | — | 有值时 `role="img"` + `aria-label`；无则 `aria-hidden` |
| `class` | — | — | 用 Tailwind 控色：`text-primary`、`text-accent-1` 等 |

尺寸映射建议：

| Token | px |
|-------|-----|
| `sm` | 14 |
| `md` | 16 |
| `lg` | 20 |
| `xl` | 24 |

---

## 视觉约定

- 默认 `currentColor`，颜色跟父级文字 / utility
- viewBox 统一 `0 0 24 24`，`fill="none"`，`stroke="currentColor"`
- 圆角端点：`stroke-linecap="round"` / `stroke-linejoin="round"`
- **禁止**：填充实心营销风、渐变描边、随意多色图标（品牌 Logo 除外，另开 `QLogo`）
- 与 Notion Style 一致：避免 oversized 装饰图标堆在首屏

---

## 目录与注册

```
src/components/q/
  QIcon.vue
  icons/
    index.ts          # IconName + 注册表
    plus.ts           # 或 plus.vue / plus.svg
    search.ts
    ...
```

```ts
// icons/index.ts（示意）
export const icons = {
  plus: Plus,
  search: Search,
  trash: Trash,
  // ...
} as const

export type IconName = keyof typeof icons
```

可选方案：

1. **自建 SVG 注册表**（可控、与设计稿一一对应）— 推荐长期
2. **封装 Lucide Vue**（启动快，`name` 映射到 lucide 组件）— 适合脚手架期
3. 二者混合：常用自建，冷门走 Lucide，最终都经 `QIcon`

---

## 无障碍

- [ ] 纯装饰（按钮内另有文字）：不传 `label`，`aria-hidden="true"`
- [ ] `QIconButton` 内图标：由按钮的 `aria-label` 负责，图标仍 `aria-hidden`
- [ ] 单独表达含义的图标：传 `label`（如状态列只有图标）

---

## 首批图标清单（P0）

按产品常用勾选补齐：

### 操作

- [x] `plus` / `minus`
- [x] `check` / `x`（关闭、清除）
- [x] `search`
- [x] `trash` / `archive`
- [x] `edit` / `pencil`
- [x] `copy` / `clipboard`
- [x] `filter` / `sort`
- [x] `more-horizontal` / `more-vertical`（⋮ 菜单）
- [x] `drag-handle`（⋮⋮ 块拖拽，Notion 关键）
- [x] `external-link`
- [x] `upload` / `download`
- [x] `paperclip`

### 导航与结构

- [x] `chevron-down` / `chevron-right` / `chevron-left` / `chevron-up`
- [x] `home`
- [x] `settings` / `sliders`
- [x] `menu` / `sidebar`
- [x] `panel-left` / `panel-right`

### 文档 / 块类型

- [x] `file` / `file-text` / `folder` / `folder-open`
- [x] `image` / `video` / `link`
- [x] `code` / `quote` / `list` / `list-ordered`
- [x] `heading` / `table` / `layout`
- [x] `bookmark` / `toggle`（折叠）
- [x] `smile`（页面图标入口；`emoji` 可后续别名）

### 反馈与状态

- [x] `info` / `alert-circle` / `alert-triangle` / `check-circle`
- [x] `loader`（可旋转，或交给 `QSpinner`）
- [x] `eye` / `eye-off`
- [x] `lock` / `unlock`
- [ ] `star` / `heart`（若产品需要，克制使用）

### 用户与协作

- [x] `user` / `users`
- [x] `bell`
- [x] `message-square` / `at-sign`
- [x] `calendar` / `clock`

---

## 与其它组件的关系

| 组件 | 关系 |
|------|------|
| `QIconButton` | 内部只用 `QIcon` + 必填 `aria-label` |
| `QButton` | 支持 `icon` / `icon-right` slot 或 `icon` prop → `QIcon` |
| `QEmpty` / `QAlert` | 状态图示走 `QIcon`，不用位图插画（除非单独设计） |
| `QBlockHandle` | 固定 `drag-handle` 图标 + hover 显现 |

---

## 实现检查清单

- [x] `IconName` 类型导出，错误 name 在编译期拦截
- [x] 未知 `name` 开发环境 `console.warn`，渲染空 SVG
- [x] 全量图标墙：`example/icons/` → 路由 `/example/icons`
- [x] 新增流程：改 `icons/registry.ts` → 更新本清单
- [ ] 不在业务 SFC 中绕过 `QIcon`（靠 rule / CR）

## 主题 Token

定义于 `src/themes/default.css`：

| Token | 用途 |
|-------|------|
| `--icon-size-sm/md/lg/xl` | `size="sm"` 等映射 |
| `--icon-stroke` | 默认描边（1.75） |
| `--icon-color` | 文档用；组件默认 `text-primary` + `currentColor` |

Tailwind：`w-icon-md` / `h-icon-md` 等 spacing 别名已映射。换主题时改上述变量即可，无需改组件。

---

## 相关

- 总清单：[`component-library-checklist.md`](./component-library-checklist.md)
- 视觉：`.cursor/skills/notion-style`
- 主题：`src/themes/default.css`
