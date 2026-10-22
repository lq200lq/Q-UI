# 组件库清单（Notion Style · Vue 3）

面向文档 / 工具类产品的完整前端组件库规划。勾选表示「需要封装」；实现时优先 **P0 → P1 → P2**。

命名建议：`Q` 前缀（如 `QButton`），放在 `src/components/q/`；业务组件另放 `src/components/<domain>/`。

---

## P0 · 基础原语（先做）

### 排版与布局

- [x] `QText` — 正文 / 辅助 / caption / lead / code
- [x] `QHeading` — h1–h4，对齐主题字号
- [ ] `QContainer` — 页面最大宽度与水平内边距
- [ ] `QStack` / `QInline` — 垂直 / 水平间距布局
- [ ] `QDivider` — 分割线
- [ ] `QSpacer` — 弹性空白（可选）

### 操作

- [x] `QButton` — primary / secondary / outline / ghost / danger；sm / md；loading / disabled
- [x] `QIconButton` — 仅图标 + `aria-label`
- [ ] `QLink` — 文内链接 / 外部链接样式
- [x] `QKbd` — 快捷键展示（工具产品常见）

### 表单输入

- [x] `QInput` — 单行输入（含 bordered / underline 变体，贴合 Notion）
- [x] `QSearch` — 搜索框（图标 + 清除）
- [x] `QTextarea`
- [x] `QLabel` + `QField` — 标签、错误文案、描述的统一字段壳
- [x] `QCheckbox`
- [x] `QRadio` / `QRadioGroup`
- [x] `QSwitch`
- [x] `QSelect`（轻量自定义 listbox）
- [ ] `QCombobox` / 可搜索选择（P1 也可）

### 反馈

- [ ] `QSpinner` / `QSkeleton`
- [x] `QBadge` / `QTag`
- [x] `QAlert` / `QCallout` — info / success / warning / danger（Notion 风格 callout）
- [x] `QTooltip`
- [x] `QToast`（`toast()` + `QToaster`）

### 浮层与容器

- [x] `QCard`
- [x] `QModal` / `QDialog`（含遮罩、焦点陷阱、Esc）→ `QModal.vue`
- [x] `QConfirmDialog` — 基于 QModal
- [x] `QDrawer`（侧栏面板；`QSheet` 可后续做底部变体）
- [x] `QPopover`
- [x] `QDropdownMenu`
- [ ] `QContextMenu`（P1，Notion 右键感强）

---

## P1 · 数据与导航（产品骨架）

### 导航

- [x] `QTabs`
- [x] `QBreadcrumb`
- [x] `QTopbar`（配合 `QAppShell`）
- [x] `QSidebar` + `QNavItem`（可折叠侧栏）
- [x] `QAppShell` — 应用布局壳
- [x] `QPagination`
- [ ] `QStepper` / 步骤条（流程页）

### 数据展示

- [x] `QAvatar` + `QAvatarGroup`
- [x] `QEmpty` — 空状态
- [x] `QTable` + Head / Body / Row / Th / Td
- [x] `QList` / `QListItem`（文档列表、设置列表）
- [x] `QSkeleton`
- [ ] `QTree` / `QTreeItem`（目录树、页面树）
- [ ] `QDescriptionList` — 键值描述列表
- [x] `QProgress` / `QProgressCircle`
- [ ] `QStat` — 简单指标（慎用，避免仪表盘堆砌）

### 表单增强

- [ ] `QForm` — 与校验库（如 VeeValidate / 自研）的薄封装
- [ ] `QDatePicker` / `QDateRangePicker`
- [ ] `QTimePicker`
- [ ] `QFileUpload` / `QDropzone`
- [ ] `QSlider`
- [ ] `QColorSwatch` / 轻量取色（主题/标签色）
- [ ] `QMentionInput`（`@` 提及，文档产品 P1–P2）

### 覆盖层进阶

- [x] `QCommandPalette` — ⌘K 命令面板（工具产品高价值）
- [ ] `QConfirmDialog` — 危险操作确认（基于 Modal）
- [ ] `QHoverCard`

---

## P2 · 文档 / Notion 气质专项

### 块与编辑体验

- [ ] `QBlock` — 块容器（hover 高亮、左侧拖拽手柄 ⋮⋮）
- [ ] `QBlockHandle` — Drag Handle Illusion
- [ ] `QEditableTitle` — 页面标题就地编辑
- [ ] `QInlineEditable` — 单元格 / 属性就地编辑
- [ ] `QSlashMenu` — `/` 命令菜单
- [ ] `QBlockToolbar` — 选区浮动工具条
- [ ] `QCover` / `QPageIcon` — 封面与页面图标

### 内容块

- [ ] `QCalloutBlock`（已有 Alert 时可复用变体）
- [ ] `QToggle` / 折叠块
- [ ] `QQuote`
- [ ] `QCodeBlock` + 复制按钮
- [ ] `QBookmark` / 链接预览卡
- [ ] `QEmbed`（可选）
- [ ] `QImageBlock` / `QVideoBlock`
- [ ] `QDividerBlock`（含「窄/全宽」）
- [ ] `QToc` — 目录

### 看板 / 数据库感（若产品需要）

- [ ] `QBoard` / `QBoardColumn` / `QBoardCard`
- [ ] `QProperty` — 文本 / 选择 / 多人 / 日期等属性渲染
- [ ] `QFilterBar` / `QSortMenu` / `QViewTabs`
- [ ] `QDatabaseTable`（在 Table 之上加属性与行操作）

---

## 配套 · 非「组件」但要一起设计

### Composables（建议同步沉淀）

- [x] `useDisclosure` — 开关（Modal / Popover）→ `src/composables/useDisclosure.ts`
- [ ] `useControllable` — 受控 / 非受控统一
- [x] `useFocusTrap` — `src/composables/useFocusTrap.ts`（含打开聚焦 / 关闭回焦）
- [x] `useBodyScrollLock` — `src/composables/useBodyScrollLock.ts`
- [x] `useClickOutside` — `src/composables/useClickOutside.ts`
- [x] `useHotkey` — `src/composables/useHotkey.ts`
- [x] `useToast` / `toast()` — `src/composables/useToast.ts`
- [ ] `useMediaQuery` / `usePrefersReducedMotion`
- [ ] `useListKeyboard` — 列表方向键与 Enter

### 基础设施

- [ ] 主题 tokens 文档（对应 `src/themes/`）
- [x] `QIcon` — 见独立文档 [`q-icon.md`](./q-icon.md)（已实现）
- [x] 门户挂载点 — `index.html` → `#overlay-root`（`src/constants/overlay.ts`）
- [x] 无障碍约定 — [`accessibility.md`](./accessibility.md)
- [x] Story / Playground — `example/` 路由（`/example/components` · `/example/icons`）

---

## 建议落地顺序（精简版）

1. **QButton · QInput · QField · QCard · QModal · QToast · QTooltip**
2. **QDropdownMenu · QTabs · QSidebar · QTable · QEmpty · QSkeleton**
3. **QCommandPalette · QBlock(+QBlockHandle) · QCallout · QTree · QConfirmDialog**
4. 再按产品形态补编辑器块 / 看板 / 日期与上传

---

## 刻意不做 / 少做（保持 Notion 气质）

- 重阴影、大圆角、渐变营销组件
- 花哨图表套件（除非产品核心是数据可视化）
- 与 `motion-v` 重复的第二套动画封装（动效直接按技能约束写在组件内）

---

## 进度统计（可选自填）

| 分组 | 合计约 | 已完成 |
|------|--------|--------|
| P0 基础原语 | ~30 | 0 |
| P1 数据与导航 | ~25 | 0 |
| P2 文档专项 | ~20 | 0 |
| Composables / 基建 | ~12 | 0 |
