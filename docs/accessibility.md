# 无障碍约定（a11y）

面向 Notion Style 文档 / 工具 UI。实现浮层与表单时按此执行；Cursor rule：`.cursor/rules/accessibility-ux.mdc`。

---

## 焦点

- 可交互控件必须有可见焦点：优先 `focus-visible:outline`（已用于 `QButton` / `QIconButton`）
- **禁止** `outline-none` 且无替代样式
- 打开 Modal / Dialog：焦点移入面板；关闭后焦点回到触发器（`useFocusTrap` 已处理）
- 打开期间 Tab 不逃出面板（`useFocusTrap`）

## 键盘

| 场景 | 按键 |
|------|------|
| 关闭浮层 | `Escape` |
| 激活按钮 / 菜单项 | `Enter` / `Space` |
| 菜单 / 列表 | `ArrowUp` / `ArrowDown`（`useListKeyboard`） |
| 对话框默认钮 | 可选 `Enter` 提交（需明确文档） |

## ARIA 速查

- `QIconButton`：必填可视等价的 `aria-label`
- 装饰性 `QIcon`：默认 `aria-hidden`；单独表意时传 `label`
- 弹层：`role="dialog"` + `aria-modal="true"` + `aria-labelledby`（标题 id）
- 菜单：`role="menu"` / `menuitem`；列表框另议
- 字段错误：`aria-invalid` + `aria-describedby` 指向错误文案（`QField` 已提供槽位）

## 浮层挂载

- 所有 Teleport 目标统一为 **`#overlay-root`**（见 `index.html`、`src/constants/overlay.ts`）
- 不要挂到 `body` 随意节点，避免层叠与焦点管理分裂

## 动效

- 尊重 `prefers-reduced-motion`：强动效减弱或关闭（`usePrefersReducedMotion()`；示例页入场动画已跟随）
- 交互反馈优先颜色变化（`bg-hover` / `bg-active`），避免位移 / 缩放

## 主题

- 亮 / 暗切换不改变语义 token 名称；只换 `data-theme`
- 切换控件须有可读 `aria-label`（如「切换为暗色主题」）

## 检查清单（PR）

- [ ] 键盘可完成主路径（开 / 关 / 提交）
- [ ] 焦点环可见
- [ ] 图标按钮有 `aria-label`
- [ ] 错误信息与控件关联
- [ ] 浮层走 `#overlay-root`
- [ ] 强动效在 `prefers-reduced-motion` 下减弱或关闭
- [ ] 主题切换后对比度仍可读（抽查正文 / 边框 / 主按钮）
