export type GalleryNavItem = {
  to: string
  label: string
  description: string
}

/** Top-level example galleries under /example/components/* */
export const componentGalleries: GalleryNavItem[] = [
  {
    to: '/example/components/core',
    label: '基础与反馈',
    description: '排版、按钮、浮层、数据展示',
  },
  {
    to: '/example/components/forms',
    label: '表单',
    description: '输入、校验、日期时间、上传',
  },
  {
    to: '/example/components/blocks',
    label: '文档块',
    description: '编辑块、内容块、封面与目录',
  },
  {
    to: '/example/components/board',
    label: '看板',
    description: 'Board、属性、筛选与数据库表',
  },
]
