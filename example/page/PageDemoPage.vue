<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import {
  QAppShell,
  QAvatar,
  QBlock,
  QBookmark,
  QBreadcrumb,
  QButton,
  QCalloutBlock,
  QCodeBlock,
  QCover,
  QDividerBlock,
  QEditableTitle,
  QIconButton,
  QNavItem,
  QPageIcon,
  QProperty,
  type QPropertyOption,
  type QPropertyPerson,
  QQuote,
  QSidebar,
  QSlashMenu,
  type QSlashMenuItem,
  QText,
  QToc,
  type QTocItem,
  QToggle,
  QTopbar,
  QTooltip,
  QTree,
  type QTreeNode,
} from '../../src/components/q'
import {
  toast,
  usePrefersReducedMotion,
  useTheme,
} from '../../src/composables'

const { theme, toggleTheme } = useTheme()
const prefersReducedMotion = usePrefersReducedMotion()
const themeLabel = computed(() =>
  theme.value === 'dark' ? '切换为亮色主题' : '切换为暗色主题',
)
const pageEnter = computed(() =>
  prefersReducedMotion.value
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
      },
)

const collapsed = ref(false)
const pageTitle = ref('产品规格')
const pageEmoji = ref('📄')
const coverSrc = ref(
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80',
)
const selectedBlock = ref<string | null>('intro')
const toggleOpen = ref(true)
const slashOpen = ref(false)
const slashQuery = ref('')
const slashAnchor = ref<HTMLElement | null>(null)
const slashMenuRef = ref<{
  positionNear: (el: HTMLElement | null) => void
} | null>(null)
const treeSelected = ref<string | null>('spec')
const treeExpanded = ref(['workspace', 'product'])
const tocActive = ref('intro')

const statusOptions: QPropertyOption[] = [
  { value: 'draft', label: '草稿', color: '#f2994a' },
  { value: 'review', label: '评审中', color: '#2383e2' },
  { value: 'done', label: '已发布', color: '#27ae60' },
]
const people: QPropertyPerson[] = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'alan', name: 'Alan Turing' },
]

const crumbs = computed(() => [
  { label: '工作区', to: '/example/layout' },
  { label: '产品', to: '/example/page' },
  { label: pageTitle.value || '无标题', current: true },
])

const treeNodes: QTreeNode[] = [
  {
    key: 'workspace',
    label: '工作区',
    icon: 'folder',
    children: [
      {
        key: 'product',
        label: '产品',
        icon: 'folder',
        children: [
          { key: 'spec', label: '产品规格', icon: 'file-text' },
          { key: 'roadmap', label: '路线图', icon: 'file' },
        ],
      },
      { key: 'eng', label: '工程笔记', icon: 'file-text' },
    ],
  },
]

const slashItems: QSlashMenuItem[] = [
  {
    key: 'text',
    label: '文本',
    description: '普通段落',
    icon: 'file-text',
  },
  {
    key: 'callout',
    label: '高亮',
    description: 'Callout 块',
    icon: 'info',
  },
  {
    key: 'code',
    label: '代码',
    description: '代码块',
    icon: 'code',
  },
  {
    key: 'quote',
    label: '引用',
    description: '引用块',
    icon: 'quote',
  },
]

const tocItems: QTocItem[] = [
  { id: 'intro', label: '概述', level: 1 },
  { id: 'goals', label: '目标', level: 2 },
  { id: 'scope', label: '范围', level: 1 },
  { id: 'api', label: '接口约定', level: 1 },
]

const sampleCode = `type Page = {
  id: string
  title: string
  icon?: string
}`

function openSlash() {
  slashQuery.value = ''
  slashOpen.value = true
  void slashMenuRef.value?.positionNear(slashAnchor.value)
}

function onSlashSelect(item: QSlashMenuItem) {
  toast({ title: `插入「${item.label}」`, variant: 'success' })
}

function onTreeSelect(key: string) {
  treeSelected.value = key
  if (key === 'spec') {
    pageTitle.value = '产品规格'
    pageEmoji.value = '📄'
  } else if (key === 'roadmap') {
    pageTitle.value = '路线图'
    pageEmoji.value = '🗺️'
  } else if (key === 'eng') {
    pageTitle.value = '工程笔记'
    pageEmoji.value = '⚙️'
  }
}

function cycleEmoji() {
  const set = ['📄', '✨', '🎯', '🧩']
  const i = set.indexOf(pageEmoji.value)
  pageEmoji.value = set[(i + 1) % set.length]!
}
</script>

<template>
  <QAppShell v-model:collapsed="collapsed">
    <template #sidebar>
      <QSidebar>
        <template #brand="{ collapsed: c }">
          <RouterLink
            to="/"
            class="flex min-w-0 items-center gap-2 rounded-md px-1 py-1 text-primary transition-colors duration-150 hover:bg-hover"
            :class="c ? 'justify-center' : undefined"
          >
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-btn text-xs font-semibold text-on-btn"
            >
              Q
            </span>
            <span v-if="!c" class="truncate font-heading text-sm font-semibold">
              Dev902
            </span>
          </RouterLink>
        </template>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-0.5">
            <QNavItem icon="home" label="概览" to="/example/layout">
              概览
            </QNavItem>
            <QNavItem icon="file-text" label="页面" active>
              页面
            </QNavItem>
          </div>

          <div v-if="!collapsed" class="px-1">
            <p
              class="mb-1.5 px-1.5 text-[11px] font-medium uppercase tracking-wide text-primary/40"
            >
              页面树
            </p>
            <QTree
              v-model="treeSelected"
              v-model:expanded="treeExpanded"
              :nodes="treeNodes"
              label="页面树"
              @select="onTreeSelect"
            />
          </div>
        </div>

        <template #footer>
          <QNavItem icon="layout" label="组件示例" to="/example/components">
            组件示例
          </QNavItem>
        </template>
      </QSidebar>
    </template>

    <template #topbar>
      <QTopbar>
        <template #left>
          <QBreadcrumb :items="crumbs" />
        </template>
        <template #right>
          <QTooltip :content="themeLabel">
            <QIconButton
              :label="themeLabel"
              :name="theme === 'dark' ? 'sun' : 'moon'"
              variant="ghost"
              size="sm"
              @click="toggleTheme"
            />
          </QTooltip>
          <QTooltip content="分享">
            <QButton size="sm" variant="outline" icon="link" @click="toast('已复制链接')">
              分享
            </QButton>
          </QTooltip>
          <QAvatar name="Ada Lovelace" color="purple" size="sm" />
        </template>
      </QTopbar>
    </template>

    <div class="relative min-h-full bg-surface">
      <QCover
        :src="coverSrc"
        height="md"
        @change="toast('更换封面')"
        @remove="coverSrc = ''"
      />

      <motion.div
        class="relative mx-auto max-w-3xl px-4 pb-16 md:px-8"
        :initial="pageEnter.initial"
        :animate="pageEnter.animate"
        :transition="pageEnter.transition"
      >
        <div class="flex items-end gap-2">
          <QPageIcon
            class="-mt-8"
            :emoji="pageEmoji"
            @click="cycleEmoji"
          />
          <div class="mb-1 ml-auto hidden sm:block">
            <QIconButton
              label="更多"
              name="more-horizontal"
              variant="ghost"
              size="sm"
              @click="toast('页面菜单')"
            />
          </div>
        </div>

        <div class="mt-2">
          <QEditableTitle v-model="pageTitle" placeholder="无标题" />
        </div>

        <div class="mt-4 max-w-md border-y border-border py-1">
          <QProperty
            label="状态"
            type="select"
            model-value="review"
            :options="statusOptions"
          />
          <QProperty label="负责人" type="people" :people="people" />
          <QProperty label="截止日期" type="date" model-value="2026-11-01" />
        </div>

        <div class="mt-8 flex gap-10">
          <div class="min-w-0 flex-1 space-y-1">
            <div ref="slashAnchor" class="mb-4 flex flex-wrap items-center gap-2">
              <QButton size="sm" variant="secondary" icon="plus" @click="openSlash">
                添加块
              </QButton>
              <QText variant="caption" class="text-primary/45">
                或输入 / 打开斜杠菜单（示意）
              </QText>
            </div>

            <QSlashMenu
              ref="slashMenuRef"
              v-model:open="slashOpen"
              :query="slashQuery"
              :items="slashItems"
              @select="onSlashSelect"
            />

            <QBlock
              id="intro"
              :selected="selectedBlock === 'intro'"
              @click="selectedBlock = 'intro'"
            >
              <QText>
                这份规格描述 Dev902 文档工具的核心页面体验：封面、属性与可组合内容块。侧栏页面树可切换文档，标题与图标可就地编辑。
              </QText>
            </QBlock>

            <QBlock
              id="goals"
              :selected="selectedBlock === 'goals'"
              @click="
                () => {
                  selectedBlock = 'goals'
                  tocActive = 'goals'
                }
              "
            >
              <QCalloutBlock emoji="🎯" title="目标">
                用真实页面把 Q 组件串起来，验证交互一致性，而不是再堆孤立 demo。
              </QCalloutBlock>
            </QBlock>

            <QDividerBlock width="narrow" />

            <QBlock
              id="scope"
              :selected="selectedBlock === 'scope'"
              @click="
                () => {
                  selectedBlock = 'scope'
                  tocActive = 'scope'
                }
              "
            >
              <QToggle v-model:open="toggleOpen" title="范围与非目标">
                <QText variant="caption">
                  包含：页面壳、属性行、常见内容块。不包含：协同光标、完整富文本内核、真拖拽排序。
                </QText>
              </QToggle>
            </QBlock>

            <QBlock>
              <QQuote cite="— 组件库约定">
                主题色与字体只改 themes；组件内只用语义 token。
              </QQuote>
            </QBlock>

            <QBlock
              id="api"
              :selected="selectedBlock === 'api'"
              @click="
                () => {
                  selectedBlock = 'api'
                  tocActive = 'api'
                }
              "
            >
              <QCodeBlock language="ts" :code="sampleCode" />
            </QBlock>

            <QBlock>
              <QBookmark
                url="https://www.notion.com"
                title="Notion"
                description="文档工具气质参考：内容优先、弱装饰。"
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
              />
            </QBlock>
          </div>

          <aside class="sticky top-6 hidden w-40 shrink-0 lg:block">
            <QToc
              :items="tocItems"
              :active-id="tocActive"
              @select="
                (item) => {
                  tocActive = item.id
                  selectedBlock = item.id
                }
              "
            />
          </aside>
        </div>
      </motion.div>
    </div>
  </QAppShell>
</template>
