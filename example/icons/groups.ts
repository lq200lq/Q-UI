import type { IconName } from '../../src/components/q'

export type IconGroup = {
  title: string
  names: IconName[]
}

/** 与 docs/q-icon.md 分组对齐，便于示例页展示 */
export const iconGroups: IconGroup[] = [
  {
    title: '操作',
    names: [
      'plus',
      'minus',
      'check',
      'x',
      'search',
      'trash',
      'archive',
      'edit',
      'pencil',
      'copy',
      'clipboard',
      'filter',
      'sort',
      'more-horizontal',
      'more-vertical',
      'drag-handle',
      'external-link',
      'upload',
      'download',
      'paperclip',
    ],
  },
  {
    title: '导航与结构',
    names: [
      'chevron-down',
      'chevron-right',
      'chevron-left',
      'chevron-up',
      'home',
      'settings',
      'sliders',
      'menu',
      'sidebar',
      'panel-left',
      'panel-right',
    ],
  },
  {
    title: '文档 / 块类型',
    names: [
      'file',
      'file-text',
      'folder',
      'folder-open',
      'image',
      'video',
      'link',
      'code',
      'quote',
      'list',
      'list-ordered',
      'heading',
      'table',
      'layout',
      'bookmark',
      'toggle',
      'smile',
    ],
  },
  {
    title: '反馈与状态',
    names: [
      'info',
      'alert-circle',
      'alert-triangle',
      'check-circle',
      'loader',
      'eye',
      'eye-off',
      'lock',
      'unlock',
    ],
  },
  {
    title: '用户与协作',
    names: [
      'user',
      'users',
      'bell',
      'message-square',
      'at-sign',
      'calendar',
      'clock',
    ],
  },
]
