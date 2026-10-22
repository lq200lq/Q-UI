# Q 设计系统

Notion Style 原语，统一从本目录的 `index.ts` 导入：

```ts
import { QButton, QAppShell, type QTabItem } from '@/components/q'
```

路径按项目别名调整；示例页用相对路径 `../../src/components/q`。

主题与字体只改 `src/themes/*.css`。浮层 Teleport 到 `#overlay-root`。动效用 `motion-v`，时长优先 `duration-150`。

---

## 导出索引

### 排版 / 布局

`QText` · `QHeading` · `QContainer` · `QStack` · `QInline` · `QDivider` · `QSpacer`

### 操作

`QButton` · `QIconButton` · `QLink` · `QKbd` · `QIcon`（`icons` / `iconNames` / `IconName`）

### 表单

`QInput` · `QTextarea` · `QSearch` · `QLabel` · `QField` · `QForm`  
`QCheckbox` · `QRadio` · `QRadioGroup` · `QSwitch` · `QSelect` · `QCombobox`  
`QDatePicker` · `QDateRangePicker` · `QTimePicker`  
`QFileUpload` · `QDropzone` · `QSlider` · `QColorSwatch` · `QMentionInput`  
`DEFAULT_COLOR_SWATCHES`

### 反馈

`QSpinner` · `QSkeleton` · `QBadge` · `QTag` · `QAlert` · `QCallout`  
`QTooltip` · `QToaster`（配合 `toast()` / `useToast`）

### 浮层

`QCard` · `QModal` · `QConfirmDialog` · `QDrawer` · `QPopover` · `QHoverCard`  
`QDropdownMenu` · `QContextMenu` · `QCommandPalette`

### 导航 / 壳

`QAppShell` · `QSidebar` · `QNavItem` · `QTopbar` · `QTabs` · `QBreadcrumb`  
`QPagination` · `QStepper`

### 数据展示

`QAvatar` · `QAvatarGroup` · `QEmpty` · `QList` · `QListItem`  
`QTable` · `QTableHead` · `QTableBody` · `QTableRow` · `QTableTh` · `QTableTd`  
`QTree` · `QTreeItem` · `QDescriptionList` · `QProgress` · `QProgressCircle` · `QStat`

### 文档块

`QBlock` · `QBlockHandle` · `QEditableTitle` · `QInlineEditable`  
`QSlashMenu` · `QBlockToolbar` · `QCover` · `QPageIcon`  
`QCalloutBlock` · `QToggle` · `QQuote` · `QCodeBlock` · `QBookmark` · `QEmbed`  
`QImageBlock` · `QVideoBlock` · `QDividerBlock` · `QToc`

### 看板 / 数据库感

`QBoard` · `QBoardColumn` · `QBoardCard` · `QProperty`  
`QFilterBar` · `QSortMenu` · `QViewTabs` · `QDatabaseTable`

类型与组件同文件导出（如 `QSelectOption`、`QSlashMenuItem`、`QTreeNode`）。完整清单见 [`docs/component-library-checklist.md`](../../../docs/component-library-checklist.md)。

---

## 配套

| 能力 | 位置 |
|------|------|
| Composables | `src/composables/`（`useDisclosure`、`useFocusTrap`、`useTheme`…） |
| 主题 tokens | [`docs/theme-tokens.md`](../../../docs/theme-tokens.md) |
| 无障碍 | [`docs/accessibility.md`](../../../docs/accessibility.md) |
| 图标 | [`docs/q-icon.md`](../../../docs/q-icon.md) |
| 示例 | `/example/page` · `/example/layout` · `/example/components/*` |
