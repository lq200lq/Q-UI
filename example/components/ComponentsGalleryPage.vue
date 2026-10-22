<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  QAlert,
  QAvatar,
  QAvatarGroup,
  QText,
  QHeading,
  QContainer,
  QStack,
  QInline,
  QDivider,
  QSpacer,
  QButton,
  QLink,
  QCallout,
  QCard,
  QCheckbox,
  QCommandPalette,
  QConfirmDialog,
  QDropdownMenu,
  QContextMenu,
  QPopover,
  QHoverCard,
  QPagination,
  QStepper,
  type QStepperItem,
  QProgress,
  QProgressCircle,
  QField,
  QForm,
  QDatePicker,
  QDateRangePicker,
  type QDateRange,
  QTimePicker,
  QFileUpload,
  type QUploadFile,
  QSlider,
  QColorSwatch,
  QMentionInput,
  type QMentionOption,
  QIcon,
  QIconButton,
  QInput,
  QKbd,
  QSelect,
  QCombobox,
  QTextarea,
  type QSelectOption,
  QRadio,
  QRadioGroup,
  QSearch,
  QSwitch,
  QDrawer,
  QModal,
  QBreadcrumb,
  QBadge,
  QDescriptionList,
  QStat,
  QEmpty,
  QList,
  QListItem,
  QTree,
  type QTreeNode,
  QSkeleton,
  QSpinner,
  QTable,
  QTableBody,
  QTableHead,
  QTableRow,
  QTableTd,
  QTableTh,
  QTabs,
  QTag,
  QTooltip,
  type QBreadcrumbItem,
  type QCommandItem,
  type QDropdownItem,
  type QTabItem,
} from '../../src/components/q'
import { formRules, toast, useForm } from '../../src/composables'
import ExampleBlock from '../_shared/ExampleBlock.vue'
import * as snippets from './snippets'

const router = useRouter()
const name = ref('')
const email = ref('')
const underline = ref('')
const bio = ref('构建清晰、克制的文档工具界面。')
const notes = ref('')
const locale = ref<string | number>('zh')
const role = ref<string | number | null>(null)
const searchQuery = ref('设计')

const localeOptions: QSelectOption[] = [
  { value: 'zh', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語', disabled: true },
]

const roleOptions: QSelectOption[] = [
  { value: 'owner', label: '所有者' },
  { value: 'editor', label: '编辑者' },
  { value: 'viewer', label: '查看者' },
]

const assignee = ref<string | number | null>('ada')
const memberOptions: QSelectOption[] = [
  { value: 'ada', label: 'Ada Lovelace' },
  { value: 'alan', label: 'Alan Turing' },
  { value: 'grace', label: 'Grace Hopper' },
  { value: 'linus', label: 'Linus Torvalds' },
  { value: 'kate', label: 'Katherine Johnson' },
]
const loading = ref(false)
const modalOpen = ref(false)
const drawerOpen = ref(false)
const commandOpen = ref(false)
const popoverOpen = ref(false)
const {
  values: formValues,
  errors: formErrors,
  submitting: formSubmitting,
  handleSubmit: handleDemoForm,
  reset: resetDemoForm,
} = useForm({
  initialValues: { name: '', email: '' },
  rules: {
    name: formRules.required('请填写名称'),
    email: [formRules.required(), formRules.email()],
  },
})

const onDemoFormSubmit = handleDemoForm(async (values) => {
  await new Promise((r) => window.setTimeout(r, 600))
  toast({
    title: '表单已提交',
    description: `${values.name} · ${values.email}`,
    variant: 'success',
  })
})

const dueDate = ref<string | null>('2026-10-22')
const dateRange = ref<QDateRange>({ start: '2026-10-01', end: '2026-10-15' })
const startTime = ref<string | null>('09:30')
const uploadFiles = ref<QUploadFile[]>([])
const volume = ref(42)
const tagColor = ref<string | null>('#2383e2')
const mentionText = ref('请 @')
const mentionOptions: QMentionOption[] = [
  { id: 'ada', label: 'Ada Lovelace', description: '工程' },
  { id: 'alan', label: 'Alan Turing', description: '研究' },
  { id: 'grace', label: 'Grace Hopper', description: '编译器' },
  { id: 'linus', label: 'Linus Torvalds', description: '内核' },
]

const page = ref(1)
const step = ref('team')
const stepperItems: QStepperItem[] = [
  { value: 'basics', label: '基本信息', description: '名称与描述' },
  { value: 'team', label: '团队', description: '成员与权限' },
  { value: 'review', label: '确认', description: '检查并提交' },
]
const treeSelected = ref<string | null>('docs')
const treeExpanded = ref(['workspace', 'eng'])
const treeNodes: QTreeNode[] = [
  {
    key: 'workspace',
    label: '工作区',
    icon: 'folder',
    children: [
      { key: 'docs', label: '文档', icon: 'file' },
      {
        key: 'eng',
        label: '工程',
        icon: 'folder',
        children: [
          { key: 'api', label: 'API 设计', icon: 'file' },
          { key: 'rfc', label: 'RFC', icon: 'file', disabled: true },
        ],
      },
      { key: 'archive', label: '归档', icon: 'folder' },
    ],
  },
]
const confirmOpen = ref(false)
const alertVisible = ref(true)

const galleryCommands: QCommandItem[] = [
  {
    id: 'copy',
    label: '复制示例代码',
    icon: 'copy',
    group: '操作',
    shortcut: '⌘C',
  },
  {
    id: 'toast',
    label: '显示 Toast',
    icon: 'bell',
    group: '操作',
  },
  {
    id: 'layout',
    label: '打开布局壳',
    description: '跳转到 /example/layout',
    icon: 'sidebar',
    group: '导航',
  },
  {
    id: 'disabled',
    label: '不可用命令',
    icon: 'lock',
    group: '导航',
    disabled: true,
  },
]

function onGalleryCommand(item: QCommandItem) {
  if (item.id === 'layout') {
    void router.push('/example/layout')
    return
  }
  toast(`命令：${item.label}`)
}

const agree = ref(true)
const partial = ref(false)
const notify = ref(true)
const darkPreview = ref(false)
const themePref = ref('system')
const density = ref('comfortable')
const lastMenu = ref('')
const lastContext = ref('')
const activeId = ref('')
const tab = ref('overview')
const tabPills = ref('all')
const tags = ref(['设计', '工程', '发布'])

function removeTag(label: string) {
  tags.value = tags.value.filter((t) => t !== label)
  toast(`已移除「${label}」`)
}

const tabItems: QTabItem[] = [
  { value: 'overview', label: '概览' },
  { value: 'activity', label: '动态' },
  { value: 'settings', label: '设置', disabled: true },
]

const pillItems: QTabItem[] = [
  { value: 'all', label: '全部' },
  { value: 'mine', label: '我的' },
  { value: 'shared', label: '共享' },
]

const crumbs: QBreadcrumbItem[] = [
  { label: '工作区', to: '/example/layout' },
  { label: '文档', to: '/example/layout' },
  { label: '产品规格', current: true },
]

const navItems = [
  { id: 'q-text', label: 'QText' },
  { id: 'q-heading', label: 'QHeading' },
  { id: 'q-container', label: 'QContainer' },
  { id: 'q-stack-inline', label: 'QStack · QInline' },
  { id: 'q-divider', label: 'QDivider' },
  { id: 'q-spacer', label: 'QSpacer' },
  { id: 'q-button-variants', label: 'QButton · 变体' },
  { id: 'q-button-states', label: 'QButton · 尺寸与状态' },
  { id: 'q-link', label: 'QLink' },
  { id: 'q-icon-button', label: 'QIconButton' },
  { id: 'q-kbd', label: 'QKbd' },
  { id: 'q-field-input', label: 'QInput · QField' },
  { id: 'q-form', label: 'QForm' },
  { id: 'q-date-picker', label: 'QDatePicker' },
  { id: 'q-time-picker', label: 'QTimePicker' },
  { id: 'q-file-upload', label: 'QFileUpload' },
  { id: 'q-slider', label: 'QSlider' },
  { id: 'q-color-swatch', label: 'QColorSwatch' },
  { id: 'q-mention-input', label: 'QMentionInput' },
  { id: 'q-textarea', label: 'QTextarea' },
  { id: 'q-select', label: 'QSelect' },
  { id: 'q-combobox', label: 'QCombobox' },
  { id: 'q-search', label: 'QSearch' },
  { id: 'q-callout', label: 'QCallout · QAlert' },
  { id: 'q-checkbox-switch', label: 'QCheckbox · QSwitch' },
  { id: 'q-radio', label: 'QRadio' },
  { id: 'q-avatar', label: 'QAvatar' },
  { id: 'q-card', label: 'QCard' },
  { id: 'q-modal', label: 'QModal' },
  { id: 'q-drawer', label: 'QDrawer' },
  { id: 'q-command-palette', label: 'QCommandPalette' },
  { id: 'q-toast', label: 'QToast' },
  { id: 'q-confirm-dialog', label: 'QConfirmDialog' },
  { id: 'q-tooltip', label: 'QTooltip' },
  { id: 'q-dropdown-menu', label: 'QDropdownMenu' },
  { id: 'q-context-menu', label: 'QContextMenu' },
  { id: 'q-popover', label: 'QPopover' },
  { id: 'q-hover-card', label: 'QHoverCard' },
  { id: 'q-progress', label: 'QProgress' },
  { id: 'q-pagination', label: 'QPagination' },
  { id: 'q-stepper', label: 'QStepper' },
  { id: 'q-tabs', label: 'QTabs' },
  { id: 'q-breadcrumb', label: 'QBreadcrumb' },
  { id: 'q-list', label: 'QList' },
  { id: 'q-tree', label: 'QTree' },
  { id: 'q-table', label: 'QTable' },
  { id: 'q-badge', label: 'QBadge · QTag' },
  { id: 'q-empty', label: 'QEmpty' },
  { id: 'q-description-list', label: 'QDescriptionList' },
  { id: 'q-stat', label: 'QStat' },
  { id: 'q-skeleton', label: 'QSkeleton' },
  { id: 'q-spinner', label: 'QSpinner' },
  { id: 'q-icon', label: 'QIcon' },
] as const

const menuItems: QDropdownItem[] = [
  { label: '编辑' },
  { label: '复制' },
  { separator: true, label: '' },
  { label: '删除', danger: true },
]

const contextItems: QDropdownItem[] = [
  { label: '打开' },
  { label: '重命名' },
  { separator: true, label: '' },
  { label: '删除', danger: true },
]

function pretendSave() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
    toast({ title: '已保存', description: '更改已写入', variant: 'success' })
  }, 1200)
}

function onConfirmDelete() {
  confirmOpen.value = false
  toast({ title: '已删除', variant: 'warning' })
}

function onMenuSelect(item: QDropdownItem) {
  lastMenu.value = item.label
  toast(`选择了「${item.label}」`)
}

function onContextSelect(item: QDropdownItem) {
  lastContext.value = item.label
  toast(`右键：${item.label}`)
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  activeId.value = id
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  if (hash && navItems.some((item) => item.id === hash)) {
    activeId.value = hash
    requestAnimationFrame(() => scrollToSection(hash))
  } else {
    activeId.value = navItems[0]?.id ?? ''
  }

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const top = visible[0]
      if (top?.target.id) activeId.value = top.target.id
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
  )

  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="min-h-screen md:pl-56">
    <aside
      class="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r border-border bg-page md:flex"
      aria-label="组件目录"
    >
      <div class="shrink-0 border-b border-border px-4 py-4">
        <RouterLink
          to="/"
          class="-ml-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary"
        >
          <QIcon name="chevron-left" size="sm" />
          返回首页
        </RouterLink>
        <p class="mt-3 text-xs font-medium uppercase tracking-wide text-primary/40">
          目录
        </p>
      </div>
      <nav class="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <ul class="flex flex-col gap-0.5">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150"
              :class="
                activeId === item.id
                  ? 'bg-hover font-medium text-primary'
                  : 'text-primary/65 hover:bg-hover hover:text-primary'
              "
              :aria-current="activeId === item.id ? 'location' : undefined"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
    <header class="mb-10">
      <RouterLink
        to="/"
        class="-ml-1.5 mb-4 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary md:hidden"
      >
        <QIcon name="chevron-left" size="sm" />
        返回首页
      </RouterLink>
      <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
        Q 组件示例
      </h1>
      <p class="mt-2 text-base text-primary/70">
        预览在上，代码默认收起，可复制。图标全集见
        <RouterLink
          to="/example/icons"
          class="text-accent-1 transition-colors duration-150 hover:underline"
        >
          /example/icons
        </RouterLink>
      </p>
    </header>

    <!-- Mobile TOC -->
    <nav
      class="mb-8 overflow-x-auto border-b border-border pb-3 md:hidden"
      aria-label="组件目录"
    >
      <ul class="flex gap-1">
        <li v-for="item in navItems" :key="item.id" class="shrink-0">
          <a
            :href="`#${item.id}`"
            class="block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150"
            :class="
              activeId === item.id
                ? 'bg-hover font-medium text-primary'
                : 'text-primary/65 hover:bg-hover hover:text-primary'
            "
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <ExampleBlock
      id="q-text"
      title="QText"
      description="body / muted / caption / lead / code；可选 truncate / clamp"
      :code="snippets.text"
    >
      <div class="flex w-full max-w-lg flex-col gap-3">
        <QText>正文段落，用于说明与正文内容。</QText>
        <QText variant="muted">辅助说明，颜色更弱，适合描述与次要信息。</QText>
        <QText variant="caption">元信息 · caption</QText>
        <QText variant="lead">引导句，稍大一号，适合段落开场。</QText>
        <QText variant="code">token.primary</QText>
        <QText truncate class="max-w-xs">
          超长文本会被截断：这是一段用来演示 truncate 的很长很长的句子。
        </QText>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-heading"
      title="QHeading"
      description="h1–h4；可用 size 覆盖视觉层级"
      :code="snippets.heading"
    >
      <div class="flex w-full max-w-lg flex-col gap-3">
        <QHeading :level="1">页面标题</QHeading>
        <QHeading :level="2">区块标题</QHeading>
        <QHeading :level="3">小节标题</QHeading>
        <QHeading :level="4" muted>次级标题</QHeading>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-container"
      title="QContainer"
      description="sm / md / lg / xl / full；padding none–lg"
      :code="snippets.container"
    >
      <div class="w-full rounded-md border border-dashed border-border bg-hover/40 py-2">
        <QContainer size="sm" padding="md" class="rounded-md bg-surface py-3 shadow-sm">
          <QHeading :level="3">窄内容</QHeading>
          <QText variant="muted" class="mt-1">size=sm · 适合文章与设置表单。</QText>
        </QContainer>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-stack-inline"
      title="QStack · QInline"
      description="垂直 / 水平间距；gap xs–xl"
      :code="snippets.stackInline"
    >
      <div class="flex w-full max-w-md flex-col gap-5">
        <QStack gap="md">
          <QText>垂直堆叠第一项</QText>
          <QText variant="muted">第二项 · gap=md</QText>
          <QText variant="caption">第三项</QText>
        </QStack>
        <QInline gap="sm">
          <QButton size="sm">保存</QButton>
          <QButton size="sm" variant="secondary">取消</QButton>
          <QBadge variant="info">草稿</QBadge>
        </QInline>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-divider"
      title="QDivider"
      description="水平 / 垂直；可选中间标签"
      :code="snippets.divider"
    >
      <div class="flex w-full max-w-md flex-col">
        <QText>上方内容</QText>
        <QDivider />
        <QText>下方内容</QText>
        <QDivider label="或者" />
        <QInline gap="md" class="h-8">
          <QText variant="caption">左</QText>
          <QDivider orientation="vertical" />
          <QText variant="caption">右</QText>
        </QInline>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-spacer"
      title="QSpacer"
      description="在 flex 行内推开两侧内容"
      :code="snippets.spacer"
    >
      <QInline class="w-full max-w-md rounded-md border border-border px-3 py-2">
        <QText variant="caption">左</QText>
        <QSpacer />
        <QText variant="caption">右</QText>
      </QInline>
    </ExampleBlock>

    <ExampleBlock
      id="q-button-variants"
      title="QButton · 变体"
      description="primary / secondary / outline / ghost / danger"
      :code="snippets.buttonVariants"
    >
      <div class="flex flex-wrap gap-2">
        <QButton variant="primary">Primary</QButton>
        <QButton variant="secondary">Secondary</QButton>
        <QButton variant="outline">Outline</QButton>
        <QButton variant="ghost">Ghost</QButton>
        <QButton variant="danger">Danger</QButton>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-button-states"
      title="QButton · 尺寸与状态"
      description="sm / md、前后图标、loading、disabled"
      :code="snippets.buttonStates"
    >
      <div class="flex flex-wrap items-center gap-2">
        <QButton size="sm" icon="plus">Small</QButton>
        <QButton icon="plus" icon-right="chevron-down">Default</QButton>
        <QButton :loading="loading" icon="check" @click="pretendSave">
          {{ loading ? 'Saving…' : 'Save' }}
        </QButton>
        <QButton disabled>Disabled</QButton>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-link"
      title="QLink"
      description="路由 / 外链；default · muted · underline"
      :code="snippets.link"
    >
      <QInline gap="md" wrap>
        <QLink to="/example/layout">打开布局壳</QLink>
        <QLink href="https://example.com" external>外部链接</QLink>
        <QLink variant="muted" href="#">次要链接</QLink>
        <QLink variant="underline" href="#">下划线链接</QLink>
        <QLink disabled href="#">禁用</QLink>
      </QInline>
    </ExampleBlock>

    <ExampleBlock
      id="q-icon-button"
      title="QIconButton"
      description="仅图标；label 必填（aria-label）"
      :code="snippets.iconButton"
    >
      <div class="flex flex-wrap items-center gap-2">
        <QIconButton label="更多" name="more-horizontal" />
        <QIconButton label="设置" name="settings" variant="outline" />
        <QIconButton label="搜索" name="search" size="sm" />
        <QIconButton label="删除" name="trash" variant="danger" />
        <QIconButton label="加载中" name="loader" loading />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-kbd"
      title="QKbd"
      description="单键或组合键；solid / ghost"
      :code="snippets.kbd"
    >
      <div class="flex w-full max-w-lg flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <QKbd>⌘</QKbd>
          <QKbd>K</QKbd>
          <QKbd>/</QKbd>
          <QKbd>esc</QKbd>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <QKbd :keys="['⌘', 'K']" />
          <QKbd :keys="['Ctrl', 'Shift', 'P']" size="md" />
          <QKbd :keys="['⌥', '⌘', '←']" />
        </div>
        <p class="text-sm text-primary/65">
          按
          <QKbd variant="ghost">Esc</QKbd>
          关闭对话框，或
          <QKbd :keys="['⌘', 'K']" />
          打开命令面板。
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-field-input"
      title="QInput · QField"
      description="字段壳提供 label / 描述 / 错误；输入支持 bordered 与 underline"
      :code="snippets.fieldInput"
    >
      <div class="flex flex-col gap-5">
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="显示名称"
          description="会出现在个人资料中"
          required
        >
          <QInput
            :id="id"
            v-model="name"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="例如：Ada"
          />
        </QField>

        <QField
          v-slot="{ id, describedBy, invalid }"
          label="邮箱"
          error="请输入有效邮箱"
        >
          <QInput
            :id="id"
            v-model="email"
            type="email"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="you@example.com"
          />
        </QField>

        <QField label="Underline 变体">
          <QInput
            v-model="underline"
            variant="underline"
            placeholder="Notion 式下划线输入"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-form"
      title="QForm · useForm"
      description="表单壳 + 自研校验；提交时校验并展示字段错误"
      :code="snippets.form"
    >
      <QForm class="max-w-sm" @submit="onDemoFormSubmit">
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="名称"
          required
          :error="formErrors.name"
        >
          <QInput
            :id="id"
            v-model="formValues.name"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="例如：Ada"
          />
        </QField>
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="邮箱"
          required
          :error="formErrors.email"
        >
          <QInput
            :id="id"
            v-model="formValues.email"
            type="email"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="you@example.com"
          />
        </QField>
        <div class="flex items-center gap-2">
          <QButton type="submit" :loading="formSubmitting">
            保存
          </QButton>
          <QButton
            type="button"
            variant="secondary"
            size="sm"
            @click="resetDemoForm()"
          >
            重置
          </QButton>
        </div>
      </QForm>
    </ExampleBlock>

    <ExampleBlock
      id="q-date-picker"
      title="QDatePicker · QDateRangePicker"
      description="日历浮层；ISO 日期；范围点选与预览"
      :code="snippets.datePicker"
    >
      <div class="flex w-full max-w-sm flex-col gap-5">
        <QField label="截止日期">
          <QDatePicker v-model="dueDate" placeholder="选择日期" />
        </QField>
        <QField label="周期">
          <QDateRangePicker v-model="dateRange" />
        </QField>
        <p class="text-xs text-primary/55">
          单日 {{ dueDate ?? '空' }} · 范围
          {{ dateRange.start ?? '…' }} → {{ dateRange.end ?? '…' }}
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-time-picker"
      title="QTimePicker"
      description="时 / 分滚轮；可配置分钟步长；HH:mm"
      :code="snippets.timePicker"
    >
      <div class="w-full max-w-xs">
        <QField label="开始时间">
          <QTimePicker v-model="startTime" :minute-step="5" />
        </QField>
        <p class="mt-2 text-xs text-primary/55">
          当前：{{ startTime ?? '空' }}
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-file-upload"
      title="QFileUpload · QDropzone"
      description="点击或拖拽上传；多文件列表；大小限制 reject"
      :code="snippets.fileUpload"
    >
      <div class="w-full max-w-md">
        <QFileUpload
          v-model="uploadFiles"
          multiple
          accept="image/*,.pdf,.txt"
          :max-size="5 * 1024 * 1024"
          @reject="(reason) => toast({ title: reason, variant: 'warning' })"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-slider"
      title="QSlider"
      description="区间滑块；轨道与拇指贴合主题色"
      :code="snippets.slider"
    >
      <div class="w-full max-w-sm">
        <QSlider v-model="volume" label="音量" show-value :max="100" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-color-swatch"
      title="QColorSwatch"
      description="预设色板 + 自定义 hex；标签/主题色"
      :code="snippets.colorSwatch"
    >
      <div class="flex flex-wrap items-center gap-3">
        <QColorSwatch v-model="tagColor" />
        <QTag
          v-if="tagColor"
          :style="{
            backgroundColor: `${tagColor}22`,
            color: tagColor,
            borderColor: `${tagColor}55`,
          }"
        >
          标签预览
        </QTag>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-mention-input"
      title="QMentionInput"
      description="输入 @ 弹出提及列表；方向键 / Enter 选择"
      :code="snippets.mentionInput"
    >
      <div class="w-full max-w-md">
        <QField label="评论" description="试用 @ada 触发提及">
          <QMentionInput
            v-model="mentionText"
            :options="mentionOptions"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-textarea"
      title="QTextarea"
      description="bordered / underline；字数统计与 resize"
      :code="snippets.textarea"
    >
      <div class="flex w-full max-w-md flex-col gap-5">
        <QField label="简介" description="最多 120 字">
          <QTextarea
            v-model="bio"
            :rows="4"
            :maxlength="120"
            show-count
            placeholder="介绍一下你自己…"
          />
        </QField>
        <QField label="备注（Underline）">
          <QTextarea
            v-model="notes"
            variant="underline"
            placeholder="Notion 式多行备注"
            :rows="3"
            resize="none"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-select"
      title="QSelect"
      description="自定义 listbox；键盘导航、Teleport、勾选反馈"
      :code="snippets.select"
    >
      <div class="flex w-full max-w-sm flex-col gap-5">
        <QField label="默认语言">
          <QSelect
            v-model="locale"
            placeholder="选择语言"
            :options="localeOptions"
          />
        </QField>
        <QField label="角色" description="未选择时显示 placeholder">
          <QSelect
            v-model="role"
            size="sm"
            placeholder="选择角色"
            :options="roleOptions"
          />
        </QField>
        <QSelect
          model-value="en"
          disabled
          :options="localeOptions"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-combobox"
      title="QCombobox"
      description="可搜索选择；键盘导航、清空、Teleport 列表"
      :code="snippets.combobox"
    >
      <div class="w-full max-w-sm">
        <QField label="负责人" description="输入关键字过滤成员">
          <QCombobox
            v-model="assignee"
            placeholder="搜索成员…"
            :options="memberOptions"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-search"
      title="QSearch"
      description="前缀搜索图标；可清除；Esc 清空"
      :code="snippets.search"
    >
      <div class="w-full max-w-sm space-y-3">
        <QSearch
          v-model="searchQuery"
          size="sm"
          placeholder="搜索文档…"
        />
        <QSearch placeholder="中等尺寸" />
        <p class="text-xs text-primary/55">
          当前查询：
          <code class="font-mono text-accent-1">{{ searchQuery || '（空）' }}</code>
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-callout"
      title="QCallout · QAlert"
      description="Notion 式提示块；Alert 默认可关闭且 role=alert"
      :code="snippets.callout"
    >
      <div class="flex w-full max-w-lg flex-col gap-3">
        <QCallout variant="info" title="用法提示">
          顶栏搜索可过滤文档列表与表格。
        </QCallout>
        <QCallout variant="success" title="已同步">
          更改已保存到云端。
        </QCallout>
        <QCallout variant="warning">
          此页面包含未发布的草稿内容。
        </QCallout>
        <QCallout variant="danger" title="权限不足">
          你没有编辑此工作区的权限。
        </QCallout>
        <QAlert
          v-if="alertVisible"
          variant="warning"
          title="未保存的更改"
          @dismiss="alertVisible = false"
        >
          离开页面前请先保存。
        </QAlert>
        <QButton
          v-else
          size="sm"
          variant="secondary"
          @click="alertVisible = true"
        >
          重新显示 Alert
        </QButton>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-checkbox-switch"
      title="QCheckbox · QSwitch"
      description="复选框支持 indeterminate；开关支持左右标签"
      :code="snippets.checkboxSwitch"
    >
      <div class="flex w-full max-w-md flex-col gap-5">
        <QCheckbox
          v-model="agree"
          label="接受条款"
          description="可随时在设置中更改"
        />
        <QCheckbox v-model="partial" indeterminate label="部分选中" />
        <QCheckbox label="禁用" disabled />
        <div class="space-y-3 border-t border-border pt-4">
          <QSwitch
            v-model="notify"
            label="桌面通知"
            description="有人提及时提醒我"
            label-position="left"
          />
          <QSwitch v-model="darkPreview" label="紧凑右侧标签" />
          <QSwitch label="禁用" disabled />
        </div>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-radio"
      title="QRadio · QRadioGroup"
      description="options 快捷配置或插槽；支持横向排列"
      :code="snippets.radio"
    >
      <div class="flex w-full max-w-md flex-col gap-6">
        <QRadioGroup
          v-model="themePref"
          label="外观"
          description="选择工作区主题"
          :options="[
            { value: 'system', label: '跟随系统' },
            { value: 'light', label: '浅色' },
            { value: 'dark', label: '深色', disabled: true },
          ]"
        />
        <QRadioGroup
          v-model="density"
          label="密度"
          orientation="horizontal"
        >
          <QRadio value="comfortable" label="舒适" />
          <QRadio value="compact" label="紧凑" />
        </QRadioGroup>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-avatar"
      title="QAvatar · QAvatarGroup"
      description="图片 / 首字母 / 图标回退；堆叠与 +N"
      :code="snippets.avatar"
    >
      <div class="flex w-full max-w-lg flex-col gap-5">
        <div class="flex flex-wrap items-center gap-3">
          <QAvatar name="Ada Lovelace" color="purple" />
          <QAvatar name="Alan" color="blue" size="lg" />
          <QAvatar name="G" color="green" size="sm" />
          <QAvatar color="neutral" />
          <QAvatar src="https://invalid.example/x.png" name="Broken" color="orange" />
        </div>
        <QAvatarGroup
          size="md"
          :max="3"
          :items="[
            { name: 'Ada', color: 'purple' },
            { name: 'Alan', color: 'blue' },
            { name: 'Grace', color: 'green' },
            { name: 'Linus', color: 'orange' },
            { name: 'Kate', color: 'red' },
          ]"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-card"
      title="QCard"
      description="default / flat / elevated；可选 header / footer 插槽"
      :code="snippets.card"
    >
      <div class="grid gap-4 md:grid-cols-2">
        <QCard variant="default" padding="sm">
          <p class="text-sm text-primary/80">default · shadow-sm</p>
        </QCard>
        <QCard variant="flat" padding="sm">
          <p class="text-sm text-primary/80">flat · 无阴影</p>
        </QCard>
        <QCard variant="elevated" class="md:col-span-2">
          <template #header>
            <div class="flex items-center gap-2 text-sm font-medium">
              <QIcon name="file-text" size="sm" />
              带页眉 / 页脚
            </div>
          </template>
          <p class="text-sm text-primary/80">
            内容区使用主题 padding；分割线为
            <code class="font-mono text-xs text-accent-1">border-border</code>。
          </p>
          <template #footer>
            <div class="ml-auto flex items-center gap-2">
              <QButton variant="secondary" size="sm">取消</QButton>
              <QButton variant="primary" size="sm">确认</QButton>
            </div>
          </template>
        </QCard>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-modal"
      title="QModal"
      description="Teleport → #overlay-root；Esc / 遮罩关闭；焦点陷阱与滚动锁定"
      :code="snippets.modal"
    >
      <QButton variant="outline" icon="panel-right" @click="modalOpen = true">
        打开对话框
      </QButton>

      <QModal
        v-model:open="modalOpen"
        title="确认操作"
        description="此操作可在示例中随时关闭。"
      >
        <p class="text-sm text-primary/80">
          挂载于
          <code class="font-mono text-xs text-accent-1">#overlay-root</code>
          ，Tab 循环在面板内，关闭后焦点回到触发按钮。
        </p>
        <template #footer="{ close }">
          <div class="ml-auto flex items-center gap-2">
            <QButton variant="secondary" size="sm" @click="close">取消</QButton>
            <QButton variant="primary" size="sm" @click="close">确认</QButton>
          </div>
        </template>
      </QModal>
    </ExampleBlock>

    <ExampleBlock
      id="q-drawer"
      title="QDrawer"
      description="侧滑面板；motion-v 进出场；Esc / 遮罩 / 焦点陷阱"
      :code="snippets.drawer"
    >
      <QButton variant="outline" icon="panel-right" @click="drawerOpen = true">
        打开抽屉
      </QButton>

      <QDrawer
        v-model:open="drawerOpen"
        title="文档详情"
        description="从右侧滑入，适合详情与次级流程。"
        side="right"
        size="md"
      >
        <p class="text-sm text-primary/80">
          与
          <code class="font-mono text-xs text-accent-1">QModal</code>
          共用 overlay / a11y 约定，侧滑代替居中对话框。
        </p>
        <template #footer="{ close }">
          <div class="ml-auto flex items-center gap-2">
            <QButton variant="secondary" size="sm" @click="close">关闭</QButton>
            <QButton variant="primary" size="sm" @click="close">完成</QButton>
          </div>
        </template>
      </QDrawer>
    </ExampleBlock>

    <ExampleBlock
      id="q-command-palette"
      title="QCommandPalette"
      description="⌘K / Ctrl+K；过滤、方向键、Enter；Teleport 浮层"
      :code="snippets.commandPalette"
    >
      <div class="flex flex-wrap items-center gap-2">
        <QButton variant="outline" icon="search" @click="commandOpen = true">
          打开命令面板
        </QButton>
        <span class="inline-flex items-center gap-1.5 text-xs text-primary/50">
          或按
          <QKbd :keys="['⌘', 'K']" />
        </span>
      </div>

      <QCommandPalette
        v-model:open="commandOpen"
        :items="galleryCommands"
        @select="onGalleryCommand"
      />
    </ExampleBlock>

    <ExampleBlock
      id="q-toast"
      title="QToast"
      description="命令式 toast()；宿主 QToaster 已挂在 App 根部"
      :code="snippets.toastDemo"
    >
      <div class="flex flex-wrap gap-2">
        <QButton size="sm" variant="secondary" @click="toast('普通提示')">
          Default
        </QButton>
        <QButton
          size="sm"
          variant="secondary"
          @click="toast({ title: '成功', description: '设置已更新', variant: 'success' })"
        >
          Success
        </QButton>
        <QButton
          size="sm"
          variant="secondary"
          @click="toast({ title: '出错了', description: '请稍后重试', variant: 'error' })"
        >
          Error
        </QButton>
        <QButton
          size="sm"
          variant="secondary"
          @click="toast({ title: '注意', description: '还有未保存更改', variant: 'warning' })"
        >
          Warning
        </QButton>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-confirm-dialog"
      title="QConfirmDialog"
      description="基于 QModal 的确认框；danger 变体用于破坏性操作"
      :code="snippets.confirmDialog"
    >
      <QButton variant="danger" size="sm" @click="confirmOpen = true">
        删除项目
      </QButton>
      <QConfirmDialog
        v-model:open="confirmOpen"
        title="删除该项目？"
        description="删除后无法恢复。"
        variant="danger"
        confirm-text="删除"
        @confirm="onConfirmDelete"
      />
    </ExampleBlock>

    <ExampleBlock
      id="q-tooltip"
      title="QTooltip"
      description="悬停 / 聚焦显示；Teleport 到 #overlay-root"
      :code="snippets.tooltip"
    >
      <div class="flex flex-wrap items-center gap-3">
        <QTooltip content="编辑文档">
          <QIconButton label="编辑" name="edit" variant="outline" />
        </QTooltip>
        <QTooltip content="在下方显示" placement="bottom">
          <QButton size="sm" variant="secondary">Bottom</QButton>
        </QTooltip>
        <QTooltip content="保存更改" placement="right">
          <QButton size="sm" icon="check">保存</QButton>
        </QTooltip>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-dropdown-menu"
      title="QDropdownMenu"
      description="点击触发；Esc / 外侧关闭；方向键选择"
      :code="snippets.dropdown"
    >
      <div class="flex flex-wrap items-center gap-3">
        <QDropdownMenu :items="menuItems" @select="onMenuSelect">
          <template #default="{ toggle }">
            <QIconButton
              label="更多"
              name="more-horizontal"
              variant="outline"
              @click="toggle"
            />
          </template>
        </QDropdownMenu>
        <span v-if="lastMenu" class="text-sm text-primary/60">
          最近选择：{{ lastMenu }}
        </span>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-context-menu"
      title="QContextMenu"
      description="右键打开；指针定位；Esc / 外侧关闭；方向键选择"
      :code="snippets.contextMenu"
    >
      <div class="w-full max-w-md space-y-2">
        <QContextMenu :items="contextItems" @select="onContextSelect">
          <div
            class="rounded-md border border-dashed border-border bg-surface-secondary/40 px-6 py-10 text-center text-sm text-primary/60"
          >
            在此区域右键打开菜单
          </div>
        </QContextMenu>
        <p v-if="lastContext" class="text-sm text-primary/60">
          最近选择：{{ lastContext }}
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-popover"
      title="QPopover"
      description="锚定浮层；placement / align；外侧与 Esc 关闭"
      :code="snippets.popover"
    >
      <QPopover
        v-model:open="popoverOpen"
        title="分享"
        closable
        placement="bottom"
        align="start"
      >
        <template #trigger="{ toggle }">
          <QButton size="sm" variant="outline" icon="link" @click="toggle">
            分享
          </QButton>
        </template>
        <p>
          复制链接或邀请成员协作。适合轻量说明，不必开 Modal / Drawer。
        </p>
        <template #footer="{ close }">
          <QButton
            size="sm"
            variant="secondary"
            class="ml-auto"
            @click="
              () => {
                toast('已复制链接')
                close()
              }
            "
          >
            复制链接
          </QButton>
        </template>
      </QPopover>
    </ExampleBlock>

    <ExampleBlock
      id="q-hover-card"
      title="QHoverCard"
      description="悬停打开；延迟开关；可移入卡片保持"
      :code="snippets.hoverCard"
    >
      <QHoverCard title="Ada Lovelace" placement="bottom">
        <template #trigger>
          <button
            type="button"
            class="rounded-sm text-sm text-btn underline-offset-2 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn/40"
          >
            @ada
          </button>
        </template>
        <div class="flex items-start gap-3">
          <QAvatar name="Ada Lovelace" size="md" />
          <div class="min-w-0">
            <p class="text-sm font-medium text-primary">Ada Lovelace</p>
            <p class="mt-1 text-xs text-primary/60">
              数学家与早期程序员。关注计算与算法。
            </p>
          </div>
        </div>
      </QHoverCard>
    </ExampleBlock>

    <ExampleBlock
      id="q-progress"
      title="QProgress · QProgressCircle"
      description="线性 / 环形；变体色与 indeterminate"
      :code="snippets.progress"
    >
      <div class="flex w-full max-w-md flex-col gap-5">
        <QProgress label="存储空间" :value="72" show-value />
        <QProgress :value="40" variant="success" size="sm" label="上传完成" />
        <QProgress :value="85" variant="warning" show-value />
        <QProgress indeterminate label="同步中" size="sm" />
        <div class="flex flex-wrap items-end gap-6 pt-1">
          <QProgressCircle :value="64" label="完成度" />
          <QProgressCircle :value="28" variant="warning" :size="36" />
          <QProgressCircle :value="92" variant="success" :size="52" />
        </div>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-pagination"
      title="QPagination"
      description="省略号折叠；上一页 / 下一页；可选总页提示"
      :code="snippets.pagination"
    >
      <div class="flex w-full max-w-lg flex-col gap-4">
        <QPagination
          v-model:page="page"
          :total="48"
          :page-size="10"
          show-total
        />
        <QPagination
          v-model:page="page"
          :page-count="12"
          :sibling-count="0"
          size="md"
        />
        <p class="text-xs text-primary/55">当前页：{{ page }}</p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-stepper"
      title="QStepper"
      description="水平 / 垂直；可回退已完成步骤；当前与完成态"
      :code="snippets.stepper"
    >
      <div class="flex w-full max-w-2xl flex-col gap-8">
        <QStepper v-model="step" :items="stepperItems" />
        <QStepper
          v-model="step"
          :items="stepperItems"
          orientation="vertical"
          class="max-w-xs"
        />
        <div class="flex flex-wrap items-center gap-2">
          <QButton
            size="sm"
            variant="secondary"
            :disabled="step === 'basics'"
            @click="step = step === 'review' ? 'team' : 'basics'"
          >
            上一步
          </QButton>
          <QButton
            size="sm"
            :disabled="step === 'review'"
            @click="step = step === 'basics' ? 'team' : 'review'"
          >
            下一步
          </QButton>
          <span class="text-xs text-primary/55">当前：{{ step }}</span>
        </div>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-tabs"
      title="QTabs"
      description="underline / pills；方向键切换；具名插槽对应 tab value"
      :code="snippets.tabs"
    >
      <div class="flex flex-col gap-6">
        <QTabs v-model="tab" :items="tabItems">
          <template #overview>
            <p class="text-sm text-primary/70">概览内容面板。</p>
          </template>
          <template #activity>
            <p class="text-sm text-primary/70">动态内容面板。</p>
          </template>
        </QTabs>
        <QTabs v-model="tabPills" :items="pillItems" variant="pills" size="sm" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-breadcrumb"
      title="QBreadcrumb"
      description="链接 + 当前页；chevron 分隔"
      :code="snippets.breadcrumb"
    >
      <QBreadcrumb :items="crumbs" />
    </ExampleBlock>

    <ExampleBlock
      id="q-list"
      title="QList · QListItem"
      description="文档/设置列表行；支持 icon、描述、trailing"
      :code="snippets.list"
    >
      <QList>
        <QListItem
          title="产品规格"
          description="编辑于 2 小时前"
          icon="file-text"
          active
        >
          <template #trailing>
            <QIcon name="chevron-right" size="sm" class="text-primary/30" />
          </template>
        </QListItem>
        <QListItem
          title="设计系统"
          description="编辑于 昨天"
          icon="folder"
        />
        <QListItem
          title="已归档"
          description="不可用"
          icon="archive"
          disabled
        />
      </QList>
    </ExampleBlock>

    <ExampleBlock
      id="q-tree"
      title="QTree · QTreeItem"
      description="可展开目录树；选中态；受控 expanded"
      :code="snippets.tree"
    >
      <div class="w-full max-w-sm rounded-md border border-border bg-surface p-2">
        <QTree
          v-model="treeSelected"
          v-model:expanded="treeExpanded"
          :nodes="treeNodes"
        />
      </div>
      <p class="mt-2 text-xs text-primary/55">
        选中：{{ treeSelected ?? '无' }}
      </p>
    </ExampleBlock>

    <ExampleBlock
      id="q-table"
      title="QTable"
      description="Head / Body / Row / Th / Td；dense · flush"
      :code="snippets.table"
    >
      <QTable class="w-full max-w-lg">
        <QTableHead>
          <QTableRow :hoverable="false">
            <QTableTh>名称</QTableTh>
            <QTableTh>更新</QTableTh>
            <QTableTh align="right">状态</QTableTh>
          </QTableRow>
        </QTableHead>
        <QTableBody>
          <QTableRow active>
            <QTableTd>
              <span class="inline-flex items-center gap-2">
                <QIcon name="file-text" size="sm" class="text-primary/50" />
                产品规格
              </span>
            </QTableTd>
            <QTableTd muted>2 小时前</QTableTd>
            <QTableTd align="right">
              <QBadge variant="warning" dot>草稿</QBadge>
            </QTableTd>
          </QTableRow>
          <QTableRow>
            <QTableTd>
              <span class="inline-flex items-center gap-2">
                <QIcon name="folder" size="sm" class="text-primary/50" />
                设计系统
              </span>
            </QTableTd>
            <QTableTd muted>昨天</QTableTd>
            <QTableTd align="right">
              <QBadge variant="success" dot>已发布</QBadge>
            </QTableTd>
          </QTableRow>
          <QTableRow>
            <QTableTd>
              <span class="inline-flex items-center gap-2">
                <QIcon name="bookmark" size="sm" class="text-primary/50" />
                发布清单
              </span>
            </QTableTd>
            <QTableTd muted>上周五</QTableTd>
            <QTableTd align="right">
              <QBadge variant="info" dot>审阅中</QBadge>
            </QTableTd>
          </QTableRow>
        </QTableBody>
      </QTable>
    </ExampleBlock>

    <ExampleBlock
      id="q-badge"
      title="QBadge · QTag"
      description="状态徽标与可移除标签；soft / outline"
      :code="snippets.badge"
    >
      <div class="flex w-full max-w-lg flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <QBadge variant="neutral">默认</QBadge>
          <QBadge variant="info" dot>信息</QBadge>
          <QBadge variant="success" dot>成功</QBadge>
          <QBadge variant="warning" dot>警告</QBadge>
          <QBadge variant="danger" dot>危险</QBadge>
          <QBadge variant="purple" size="md">紫色</QBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <QTag
            v-for="label in tags"
            :key="label"
            :variant="label === '设计' ? 'purple' : label === '工程' ? 'info' : 'success'"
            dismissible
            @dismiss="removeTag(label)"
          >
            {{ label }}
          </QTag>
          <QTag appearance="outline" variant="neutral">大纲</QTag>
        </div>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-empty"
      title="QEmpty"
      description="空状态；可插 icon / action"
      :code="snippets.empty"
    >
      <QEmpty
        icon="users"
        title="还没有共享文档"
        description="邀请成员后，共享内容会出现在这里。"
      >
        <template #action>
          <QButton size="sm" variant="secondary" icon="plus">新建文档</QButton>
        </template>
      </QEmpty>
    </ExampleBlock>

    <ExampleBlock
      id="q-description-list"
      title="QDescriptionList"
      description="键值描述；stacked / horizontal"
      :code="snippets.descriptionList"
    >
      <div class="flex w-full max-w-md flex-col gap-6">
        <QDescriptionList
          layout="horizontal"
          :items="[
            { term: '状态', description: '已发布' },
            { term: '更新', description: '2 小时前' },
            { term: '所有者', description: 'Ada Lovelace' },
          ]"
        />
        <QDescriptionList
          :items="[
            { term: '工作区', description: 'Dev902' },
            { term: '计划', description: 'Pro' },
          ]"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-stat"
      title="QStat"
      description="克制的单项指标；避免仪表盘堆砌"
      :code="snippets.stat"
    >
      <QInline gap="xl">
        <QStat label="文档" :value="128" hint="本周 +12" />
        <QStat label="成员" :value="24" />
        <QStat label="存储" value="72%" muted hint="剩余 2.1 GB" />
      </QInline>
    </ExampleBlock>

    <ExampleBlock
      id="q-skeleton"
      title="QSkeleton"
      description="text / title / avatar / rect；默认 pulse"
      :code="snippets.skeleton"
    >
      <div class="w-full max-w-md space-y-4">
        <div class="flex items-center gap-3">
          <QSkeleton variant="avatar" />
          <div class="min-w-0 flex-1 space-y-2">
            <QSkeleton variant="title" width="40%" />
            <QSkeleton variant="text" width="70%" />
          </div>
        </div>
        <QSkeleton variant="rect" height="5rem" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-spinner"
      title="QSpinner"
      description="sm / md / lg；role=status"
      :code="snippets.spinner"
    >
      <QInline gap="md" align="center">
        <QSpinner size="sm" />
        <QSpinner />
        <QSpinner size="lg" label="同步中" />
        <QButton size="sm" loading>Saving</QButton>
      </QInline>
    </ExampleBlock>

    <ExampleBlock
      id="q-icon"
      title="QIcon"
      description="尺寸与颜色走主题 token；全集见图标墙"
      :code="snippets.icon"
    >
      <div class="mb-3 flex flex-wrap gap-3 text-primary">
        <QIcon name="plus" size="md" label="plus" />
        <QIcon name="search" size="md" label="search" />
        <QIcon name="drag-handle" size="md" label="drag-handle" />
        <QIcon name="check-circle" size="md" class="text-accent-3" label="ok" />
      </div>
      <RouterLink
        to="/example/icons"
        class="inline-flex items-center gap-1 text-sm text-accent-1 transition-colors duration-150 hover:underline"
      >
        查看全部图标
        <QIcon name="chevron-right" size="sm" />
      </RouterLink>
    </ExampleBlock>
    </div>
  </div>
</template>
