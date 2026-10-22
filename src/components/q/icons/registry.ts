import type { IconNode } from './types'

/** 24×24 lucide-style outlines — register here; consume only via QIcon */
export const icons = {
  // —— 操作 ——
  plus: [
    { tag: 'path', d: 'M5 12h14' },
    { tag: 'path', d: 'M12 5v14' },
  ],
  minus: [{ tag: 'path', d: 'M5 12h14' }],
  check: [{ tag: 'path', d: 'M20 6 9 17l-5-5' }],
  x: [
    { tag: 'path', d: 'M18 6 6 18' },
    { tag: 'path', d: 'm6 6 12 12' },
  ],
  search: [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ],
  trash: [
    { tag: 'path', d: 'M3 6h18' },
    { tag: 'path', d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' },
    { tag: 'path', d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' },
    { tag: 'line', x1: 10, y1: 11, x2: 10, y2: 17 },
    { tag: 'line', x1: 14, y1: 11, x2: 14, y2: 17 },
  ],
  archive: [
    { tag: 'rect', x: 2, y: 3, width: 20, height: 5, rx: 1 },
    { tag: 'path', d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8' },
    { tag: 'path', d: 'M10 12h4' },
  ],
  edit: [
    { tag: 'path', d: 'M12 20h9' },
    { tag: 'path', d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' },
  ],
  pencil: [
    { tag: 'path', d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' },
    { tag: 'path', d: 'm15 5 4 4' },
  ],
  copy: [
    { tag: 'rect', x: 9, y: 9, width: 13, height: 13, rx: 2 },
    { tag: 'path', d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' },
  ],
  clipboard: [
    { tag: 'rect', x: 8, y: 2, width: 8, height: 4, rx: 1 },
    { tag: 'path', d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' },
  ],
  filter: [
    { tag: 'polygon', points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' },
  ],
  sort: [
    { tag: 'path', d: 'm3 16 4 4 4-4' },
    { tag: 'path', d: 'M7 20V4' },
    { tag: 'path', d: 'm21 8-4-4-4 4' },
    { tag: 'path', d: 'M17 4v16' },
  ],
  'more-horizontal': [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 19, cy: 12, r: 1 },
    { tag: 'circle', cx: 5, cy: 12, r: 1 },
  ],
  'more-vertical': [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'circle', cx: 12, cy: 19, r: 1 },
  ],
  'drag-handle': [
    { tag: 'circle', cx: 9, cy: 8, r: 1 },
    { tag: 'circle', cx: 15, cy: 8, r: 1 },
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 16, r: 1 },
    { tag: 'circle', cx: 15, cy: 16, r: 1 },
  ],
  'external-link': [
    { tag: 'path', d: 'M15 3h6v6' },
    { tag: 'path', d: 'M10 14 21 3' },
    { tag: 'path', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
  ],
  upload: [
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
    { tag: 'polyline', points: '17 8 12 3 7 8' },
    { tag: 'line', x1: 12, y1: 3, x2: 12, y2: 15 },
  ],
  download: [
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
    { tag: 'polyline', points: '7 10 12 15 17 10' },
    { tag: 'line', x1: 12, y1: 15, x2: 12, y2: 3 },
  ],
  paperclip: [
    {
      tag: 'path',
      d: 'm21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48',
    },
  ],

  // —— 导航 ——
  'chevron-down': [{ tag: 'path', d: 'm6 9 6 6 6-6' }],
  'chevron-right': [{ tag: 'path', d: 'm9 18 6-6-6-6' }],
  'chevron-left': [{ tag: 'path', d: 'm15 18-6-6 6-6' }],
  'chevron-up': [{ tag: 'path', d: 'm18 15-6-6-6 6' }],
  home: [
    { tag: 'path', d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { tag: 'polyline', points: '9 22 9 12 15 12 15 22' },
  ],
  settings: [
    { tag: 'path', d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  sliders: [
    { tag: 'line', x1: 4, y1: 21, x2: 4, y2: 14 },
    { tag: 'line', x1: 4, y1: 10, x2: 4, y2: 3 },
    { tag: 'line', x1: 12, y1: 21, x2: 12, y2: 12 },
    { tag: 'line', x1: 12, y1: 8, x2: 12, y2: 3 },
    { tag: 'line', x1: 20, y1: 21, x2: 20, y2: 16 },
    { tag: 'line', x1: 20, y1: 12, x2: 20, y2: 3 },
    { tag: 'line', x1: 2, y1: 14, x2: 6, y2: 14 },
    { tag: 'line', x1: 10, y1: 8, x2: 14, y2: 8 },
    { tag: 'line', x1: 18, y1: 16, x2: 22, y2: 16 },
  ],
  menu: [
    { tag: 'line', x1: 4, y1: 12, x2: 20, y2: 12 },
    { tag: 'line', x1: 4, y1: 6, x2: 20, y2: 6 },
    { tag: 'line', x1: 4, y1: 18, x2: 20, y2: 18 },
  ],
  sidebar: [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
  ],
  'panel-left': [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
  ],
  'panel-right': [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M15 3v18' },
  ],

  // —— 文档 ——
  file: [
    { tag: 'path', d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' },
    { tag: 'path', d: 'M14 2v4a2 2 0 0 0 2 2h4' },
  ],
  'file-text': [
    { tag: 'path', d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' },
    { tag: 'path', d: 'M14 2v4a2 2 0 0 0 2 2h4' },
    { tag: 'path', d: 'M10 9H8' },
    { tag: 'path', d: 'M16 13H8' },
    { tag: 'path', d: 'M16 17H8' },
  ],
  folder: [
    { tag: 'path', d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9l-.81-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z' },
  ],
  'folder-open': [
    { tag: 'path', d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2' },
  ],
  image: [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'circle', cx: 9, cy: 9, r: 2 },
    { tag: 'path', d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' },
  ],
  video: [
    { tag: 'path', d: 'm16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5' },
    { tag: 'rect', x: 2, y: 6, width: 14, height: 12, rx: 2 },
  ],
  link: [
    { tag: 'path', d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
    { tag: 'path', d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
  ],
  code: [
    { tag: 'polyline', points: '16 18 22 12 16 6' },
    { tag: 'polyline', points: '8 6 2 12 8 18' },
  ],
  quote: [
    { tag: 'path', d: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z' },
    { tag: 'path', d: 'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z' },
  ],
  list: [
    { tag: 'path', d: 'M3 12h.01' },
    { tag: 'path', d: 'M3 18h.01' },
    { tag: 'path', d: 'M3 6h.01' },
    { tag: 'path', d: 'M8 12h13' },
    { tag: 'path', d: 'M8 18h13' },
    { tag: 'path', d: 'M8 6h13' },
  ],
  'list-ordered': [
    { tag: 'path', d: 'M10 12h11' },
    { tag: 'path', d: 'M10 18h11' },
    { tag: 'path', d: 'M10 6h11' },
    { tag: 'path', d: 'M4 10h1v4' },
    { tag: 'path', d: 'M4 6h2v2H4z' },
    { tag: 'path', d: 'M4 18h1.5a1.5 1.5 0 0 0 0-3H5a1.5 1.5 0 0 1 0-3H6' },
  ],
  heading: [
    { tag: 'path', d: 'M6 12h12' },
    { tag: 'path', d: 'M6 4v16' },
    { tag: 'path', d: 'M18 4v16' },
  ],
  table: [
    { tag: 'path', d: 'M12 3v18' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'M3 15h18' },
  ],
  layout: [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'M9 21V9' },
  ],
  bookmark: [
    { tag: 'path', d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z' },
  ],
  toggle: [
    { tag: 'rect', x: 1, y: 5, width: 22, height: 14, rx: 7 },
    { tag: 'circle', cx: 16, cy: 12, r: 3 },
  ],
  smile: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M8 14s1.5 2 4 2 4-2 4-2' },
    { tag: 'line', x1: 9, y1: 9, x2: 9.01, y2: 9 },
    { tag: 'line', x1: 15, y1: 9, x2: 15.01, y2: 9 },
  ],

  // —— 反馈 ——
  info: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 16v-4' },
    { tag: 'path', d: 'M12 8h.01' },
  ],
  'alert-circle': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 12, y1: 8, x2: 12, y2: 12 },
    { tag: 'line', x1: 12, y1: 16, x2: 12.01, y2: 16 },
  ],
  'alert-triangle': [
    { tag: 'path', d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' },
    { tag: 'path', d: 'M12 9v4' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  'check-circle': [
    { tag: 'path', d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' },
    { tag: 'path', d: 'm9 11 3 3L22 4' },
  ],
  loader: [{ tag: 'path', d: 'M21 12a9 9 0 1 1-6.219-8.56' }],
  eye: [
    { tag: 'path', d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  'eye-off': [
    { tag: 'path', d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' },
    { tag: 'path', d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242' },
    { tag: 'path', d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' },
    { tag: 'path', d: 'm2 2 20 20' },
  ],
  lock: [
    { tag: 'rect', x: 3, y: 11, width: 18, height: 11, rx: 2 },
    { tag: 'path', d: 'M7 11V7a5 5 0 0 1 10 0v4' },
  ],
  unlock: [
    { tag: 'rect', x: 3, y: 11, width: 18, height: 11, rx: 2 },
    { tag: 'path', d: 'M7 11V7a5 5 0 0 1 9.9-1' },
  ],

  // —— 用户 ——
  user: [
    { tag: 'path', d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 12, cy: 7, r: 4 },
  ],
  users: [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'path', d: 'M22 21v-2a4 4 0 0 0-3-3.87' },
    { tag: 'path', d: 'M16 3.13a4 4 0 0 1 0 7.75' },
  ],
  bell: [
    { tag: 'path', d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' },
    { tag: 'path', d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' },
  ],
  'message-square': [
    { tag: 'path', d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  ],
  'at-sign': [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94' },
  ],
  calendar: [
    { tag: 'path', d: 'M8 2v4' },
    { tag: 'path', d: 'M16 2v4' },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 10h18' },
  ],
  clock: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'polyline', points: '12 6 12 12 16 14' },
  ],
  sun: [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'm4.93 4.93 1.41 1.41' },
    { tag: 'path', d: 'm17.66 17.66 1.41 1.41' },
    { tag: 'path', d: 'M2 12h2' },
    { tag: 'path', d: 'M20 12h2' },
    { tag: 'path', d: 'm6.34 17.66-1.41 1.41' },
    { tag: 'path', d: 'm19.07 4.93-1.41 1.41' },
  ],
  moon: [
    {
      tag: 'path',
      d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z',
    },
  ],
} as const satisfies Record<string, IconNode[]>

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]
