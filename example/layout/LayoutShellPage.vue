<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  QAlert,
  QAppShell,
  QAvatar,
  QAvatarGroup,
  QBadge,
  QBreadcrumb,
  QButton,
  QCallout,
  QCheckbox,
  QCommandPalette,
  QDrawer,
  QDropdownMenu,
  QDescriptionList,
  QEmpty,
  QIcon,
  QIconButton,
  QKbd,
  QList,
  QListItem,
  QNavItem,
  QPagination,
  QPopover,
  QProgress,
  QProgressCircle,
  QRadioGroup,
  QField,
  QSearch,
  QSelect,
  QSwitch,
  QTextarea,
  type QSelectOption,
  QSidebar,
  QSkeleton,
  QTable,
  QTableBody,
  QTableHead,
  QTableRow,
  QTableTd,
  QTableTh,
  QTabs,
  QTopbar,
  QTooltip,
  type QAvatarGroupItem,
  type QBadgeVariant,
  type QBreadcrumbItem,
  type QCommandItem,
  type QDropdownItem,
  type QTabItem,
} from '../../src/components/q'
import { toast as pushToast } from '../../src/composables'

const collapsed = ref(false)
const route = useRoute()
const router = useRouter()
const docTab = ref('all')
const docView = ref<'list' | 'table'>('list')
const docQuery = ref('')
const loadingDocs = ref(false)
const drawerOpen = ref(false)
const commandOpen = ref(false)
const membersOpen = ref(false)
const showDocsTip = ref(true)
const storageUsed = ref(72)
const syncing = ref(true)
const notifyDesktop = ref(true)
const notifyEmail = ref(false)
const shareAnalytics = ref(true)
const themePref = ref('system')
const digestFreq = ref('daily')
const workspaceBio = ref('面向文档与知识协作的内部工作区。')
const locale = ref<string | number>('zh')
const timezone = ref<string | number>('asia-shanghai')

const localeOptions: QSelectOption[] = [
  { value: 'zh', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語', disabled: true },
]

const timezoneOptions: QSelectOption[] = [
  { value: 'asia-shanghai', label: 'Asia/Shanghai (UTC+8)' },
  { value: 'utc', label: 'UTC' },
  { value: 'america-la', label: 'America/Los_Angeles' },
]

const currentUser = {
  name: 'Ada Lovelace',
  color: 'purple' as const,
}

const members: QAvatarGroupItem[] = [
  { name: 'Ada Lovelace', color: 'purple' },
  { name: 'Alan Turing', color: 'blue' },
  { name: 'Grace Hopper', color: 'green' },
  { name: 'Linus Torvalds', color: 'orange' },
  { name: 'Katherine Johnson', color: 'red' },
]

const userMenu: QDropdownItem[] = [
  { label: '账户设置' },
  { label: '偏好' },
  { separator: true, label: '' },
  { label: '退出登录', danger: true },
]

const pages = [
  {
    key: 'home',
    title: '概览',
    body: '这是布局壳示例的主内容区。侧栏可折叠，顶栏提供标题与操作。',
  },
  {
    key: 'docs',
    title: '文档',
    body: '列表、表格、骨架屏与空状态已接入文档页。',
  },
  {
    key: 'settings',
    title: '设置',
    body: '工作区与账户相关配置会放在这里。',
  },
] as const

type PageKey = (typeof pages)[number]['key']
const active = ref<PageKey>('home')

const current = computed(
  () => pages.find((p) => p.key === active.value) ?? pages[0],
)

const crumbs = computed<QBreadcrumbItem[]>(() => [
  { label: '工作区', to: '/example/layout' },
  { label: current.value.title, current: true },
])

const docTabs: QTabItem[] = [
  { value: 'all', label: '全部' },
  { value: 'recent', label: '最近' },
  { value: 'shared', label: '共享' },
]

type DocRow = {
  id: string
  title: string
  description: string
  updated: string
  status: string
  statusVariant: QBadgeVariant
  icon: 'file-text' | 'folder' | 'bookmark'
}

const allDocs: DocRow[] = [
  {
    id: '1',
    title: '产品规格',
    description: '编辑于 2 小时前',
    updated: '2 小时前',
    status: '草稿',
    statusVariant: 'warning',
    icon: 'file-text',
  },
  {
    id: '2',
    title: '设计系统',
    description: '编辑于 昨天',
    updated: '昨天',
    status: '已发布',
    statusVariant: 'success',
    icon: 'folder',
  },
  {
    id: '3',
    title: '发布清单',
    description: '编辑于 上周五',
    updated: '上周五',
    status: '审阅中',
    statusVariant: 'info',
    icon: 'bookmark',
  },
  {
    id: '4',
    title: 'API 约定',
    description: '编辑于 3 天前',
    updated: '3 天前',
    status: '已发布',
    statusVariant: 'success',
    icon: 'file-text',
  },
  {
    id: '5',
    title: '品牌素材',
    description: '编辑于 上周',
    updated: '上周',
    status: '草稿',
    statusVariant: 'warning',
    icon: 'folder',
  },
  {
    id: '6',
    title: '用户研究',
    description: '编辑于 上周',
    updated: '上周',
    status: '审阅中',
    statusVariant: 'info',
    icon: 'bookmark',
  },
  {
    id: '7',
    title: '路线图 Q4',
    description: '编辑于 本月',
    updated: '本月',
    status: '草稿',
    statusVariant: 'warning',
    icon: 'file-text',
  },
  {
    id: '8',
    title: '会议纪要',
    description: '编辑于 本月',
    updated: '本月',
    status: '已发布',
    statusVariant: 'success',
    icon: 'folder',
  },
  {
    id: '9',
    title: '无障碍清单',
    description: '编辑于 本月',
    updated: '本月',
    status: '审阅中',
    statusVariant: 'info',
    icon: 'bookmark',
  },
]

const recentDocs = allDocs.slice(0, 5)
const docPage = ref(1)
const docPageSize = 3

const scopedDocs = computed(() => {
  if (docTab.value === 'recent') return recentDocs
  if (docTab.value === 'shared') return [] as DocRow[]
  return allDocs
})

const filteredDocs = computed(() => {
  const q = docQuery.value.trim().toLowerCase()
  if (!q) return scopedDocs.value
  return scopedDocs.value.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q),
  )
})

const visibleDocs = computed(() => {
  const start = (docPage.value - 1) * docPageSize
  return filteredDocs.value.slice(start, start + docPageSize)
})

const hasDocQuery = computed(() => docQuery.value.trim().length > 0)

const selectedDoc = ref<string | null>('1')

const activeDoc = computed(
  () => allDocs.find((d) => d.id === selectedDoc.value) ?? null,
)

watch([docTab, docQuery], () => {
  docPage.value = 1
})

watch(docTab, () => {
  loadingDocs.value = true
  window.setTimeout(() => {
    loadingDocs.value = false
    selectedDoc.value = visibleDocs.value[0]?.id ?? null
  }, 650)
})

function onUserSelect(item: QDropdownItem) {
  pushToast(`「${item.label}」`)
}

function createDoc() {
  pushToast({ title: '已新建文档', variant: 'success' })
  active.value = 'docs'
  docTab.value = 'all'
}

function openDoc(id: string) {
  selectedDoc.value = id
  drawerOpen.value = true
}

function onSearchFocus() {
  if (active.value !== 'docs') active.value = 'docs'
}

const commandItems = computed<QCommandItem[]>(() => [
  {
    id: 'nav-home',
    label: '概览',
    description: '返回工作区概览',
    icon: 'home',
    group: '导航',
    keywords: ['home', '概览'],
  },
  {
    id: 'nav-docs',
    label: '文档',
    description: '浏览文档列表与表格',
    icon: 'file-text',
    group: '导航',
    keywords: ['docs', '文档'],
  },
  {
    id: 'nav-settings',
    label: '设置',
    description: '通知与隐私',
    icon: 'settings',
    group: '导航',
    keywords: ['settings', '设置'],
  },
  {
    id: 'nav-components',
    label: '组件示例',
    description: '打开组件画廊',
    icon: 'smile',
    group: '导航',
    keywords: ['gallery', 'components'],
    shortcut: 'G',
  },
  {
    id: 'action-new',
    label: '新建文档',
    description: '创建一篇新文档',
    icon: 'plus',
    group: '操作',
    keywords: ['new', 'create', '新建'],
  },
  {
    id: 'action-search',
    label: '聚焦搜索',
    description: '跳到文档并聚焦顶栏搜索',
    icon: 'search',
    group: '操作',
    keywords: ['search', '搜索'],
  },
  {
    id: 'view-list',
    label: '列表视图',
    icon: 'list',
    group: '视图',
    disabled: docView.value === 'list',
  },
  {
    id: 'view-table',
    label: '表格视图',
    icon: 'table',
    group: '视图',
    disabled: docView.value === 'table',
  },
  ...allDocs.map((doc) => ({
    id: `doc-${doc.id}`,
    label: doc.title,
    description: doc.status,
    icon: doc.icon,
    group: '文档',
    keywords: [doc.status, doc.description],
  })),
])

function onCommandSelect(item: QCommandItem) {
  switch (item.id) {
    case 'nav-home':
      active.value = 'home'
      break
    case 'nav-docs':
      active.value = 'docs'
      break
    case 'nav-settings':
      active.value = 'settings'
      break
    case 'nav-components':
      void router.push('/example/components')
      break
    case 'action-new':
      createDoc()
      break
    case 'action-search':
      active.value = 'docs'
      pushToast('可在顶栏搜索框输入关键词')
      break
    case 'view-list':
      active.value = 'docs'
      docView.value = 'list'
      break
    case 'view-table':
      active.value = 'docs'
      docView.value = 'table'
      break
    default:
      if (item.id.startsWith('doc-')) {
        const id = item.id.slice(4)
        active.value = 'docs'
        openDoc(id)
      }
  }
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

        <div class="flex flex-col gap-0.5">
          <QNavItem
            icon="home"
            label="概览"
            :active="active === 'home'"
            @click="active = 'home'"
          >
            概览
          </QNavItem>
          <QNavItem
            icon="file-text"
            label="文档"
            :active="active === 'docs'"
            @click="active = 'docs'"
          >
            文档
          </QNavItem>
          <QNavItem
            icon="settings"
            label="设置"
            :active="active === 'settings'"
            @click="active = 'settings'"
          >
            设置
          </QNavItem>
        </div>

        <template #footer="{ collapsed: c }">
          <QNavItem
            icon="smile"
            label="组件示例"
            to="/example/components"
          >
            组件示例
          </QNavItem>
          <p
            v-if="!c"
            class="mt-2 px-2.5 font-mono text-[10px] text-primary/40"
          >
            {{ route.path }}
          </p>
        </template>
      </QSidebar>
    </template>

    <template #topbar>
      <QTopbar>
        <template #left>
          <QBreadcrumb :items="crumbs" />
        </template>
        <template #right>
          <QSearch
            v-model="docQuery"
            size="sm"
            placeholder="搜索文档…"
            class="w-36 sm:w-48 md:w-56"
            aria-label="搜索文档"
            @focus="onSearchFocus"
          />
          <QTooltip content="命令面板 ⌘K">
            <QIconButton
              label="命令面板"
              name="layout"
              size="sm"
              variant="outline"
              @click="commandOpen = true"
            />
          </QTooltip>
          <QButton
            size="sm"
            variant="secondary"
            icon="plus"
            @click="createDoc"
          >
            新建
          </QButton>
          <QDropdownMenu :items="userMenu" @select="onUserSelect">
            <template #default="{ toggle }">
              <button
                type="button"
                class="rounded-full outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40"
                aria-label="账户菜单"
                @click="toggle"
              >
                <QAvatar
                  :name="currentUser.name"
                  :color="currentUser.color"
                  size="sm"
                />
              </button>
            </template>
          </QDropdownMenu>
        </template>
      </QTopbar>
    </template>

    <div class="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <h2 class="mb-2 font-heading text-2xl font-semibold text-primary">
        {{ current.title }}
      </h2>
      <p class="mb-6 text-sm leading-relaxed text-primary/75">
        {{ current.body }}
      </p>

      <div
        v-if="active === 'docs'"
        class="mb-6 rounded-lg border border-border bg-surface p-4 shadow-sm md:p-6"
      >
        <QAlert
          v-if="showDocsTip"
          class="mb-4"
          variant="info"
          title="提示"
          @dismiss="showDocsTip = false"
        >
          点击行可打开详情抽屉；顶栏搜索会过滤当前 Tab 下的文档。
        </QAlert>

        <div class="mb-3 flex items-center justify-end gap-1">
          <QTooltip content="列表视图">
            <QIconButton
              label="列表视图"
              name="list"
              size="sm"
              :variant="docView === 'list' ? 'outline' : 'ghost'"
              @click="docView = 'list'"
            />
          </QTooltip>
          <QTooltip content="表格视图">
            <QIconButton
              label="表格视图"
              name="table"
              size="sm"
              :variant="docView === 'table' ? 'outline' : 'ghost'"
              @click="docView = 'table'"
            />
          </QTooltip>
        </div>

        <QTabs v-model="docTab" :items="docTabs" size="sm">
          <template #all>
            <div v-if="loadingDocs" class="space-y-3 pt-1">
              <div v-for="n in 3" :key="n" class="flex items-center gap-3">
                <QSkeleton variant="avatar" />
                <div class="min-w-0 flex-1 space-y-2">
                  <QSkeleton variant="title" width="40%" />
                  <QSkeleton variant="text" width="70%" />
                </div>
              </div>
            </div>
            <QEmpty
              v-else-if="filteredDocs.length === 0"
              icon="search"
              :title="hasDocQuery ? '没有匹配的文档' : '暂无文档'"
              :description="
                hasDocQuery
                  ? `找不到与「${docQuery.trim()}」相关的结果`
                  : '新建一篇文档开始吧。'
              "
            >
              <template v-if="hasDocQuery" #action>
                <QButton size="sm" variant="secondary" @click="docQuery = ''">
                  清除搜索
                </QButton>
              </template>
            </QEmpty>
            <QTable v-else-if="docView === 'table'" flush>
              <QTableHead>
                <QTableRow :hoverable="false">
                  <QTableTh>名称</QTableTh>
                  <QTableTh>更新</QTableTh>
                  <QTableTh align="right">状态</QTableTh>
                </QTableRow>
              </QTableHead>
              <QTableBody>
                <QTableRow
                  v-for="doc in visibleDocs"
                  :key="doc.id"
                  :active="selectedDoc === doc.id"
                  class="cursor-pointer"
                  @click="openDoc(doc.id)"
                >
                  <QTableTd>
                    <span class="inline-flex items-center gap-2">
                      <QIcon :name="doc.icon" size="sm" class="text-primary/50" />
                      {{ doc.title }}
                    </span>
                  </QTableTd>
                  <QTableTd muted>{{ doc.updated }}</QTableTd>
                  <QTableTd align="right">
                    <QBadge :variant="doc.statusVariant" dot>{{ doc.status }}</QBadge>
                  </QTableTd>
                </QTableRow>
              </QTableBody>
            </QTable>
            <QList v-else>
              <QListItem
                v-for="doc in visibleDocs"
                :key="doc.id"
                :title="doc.title"
                :description="doc.description"
                :icon="doc.icon"
                :active="selectedDoc === doc.id"
                @click="openDoc(doc.id)"
              >
                <template #trailing>
                  <QBadge :variant="doc.statusVariant">{{ doc.status }}</QBadge>
                </template>
              </QListItem>
            </QList>
          </template>

          <template #recent>
            <div v-if="loadingDocs" class="space-y-3 pt-1">
              <div v-for="n in 2" :key="n" class="flex items-center gap-3">
                <QSkeleton variant="avatar" />
                <div class="min-w-0 flex-1 space-y-2">
                  <QSkeleton variant="title" width="45%" />
                  <QSkeleton variant="text" width="55%" />
                </div>
              </div>
            </div>
            <QEmpty
              v-else-if="filteredDocs.length === 0"
              icon="search"
              :title="hasDocQuery ? '没有匹配的文档' : '暂无最近文档'"
              :description="
                hasDocQuery
                  ? `找不到与「${docQuery.trim()}」相关的结果`
                  : '打开文档后会出现在这里。'
              "
            >
              <template v-if="hasDocQuery" #action>
                <QButton size="sm" variant="secondary" @click="docQuery = ''">
                  清除搜索
                </QButton>
              </template>
            </QEmpty>
            <QTable v-else-if="docView === 'table'" flush>
              <QTableHead>
                <QTableRow :hoverable="false">
                  <QTableTh>名称</QTableTh>
                  <QTableTh>更新</QTableTh>
                  <QTableTh align="right">状态</QTableTh>
                </QTableRow>
              </QTableHead>
              <QTableBody>
                <QTableRow
                  v-for="doc in visibleDocs"
                  :key="doc.id"
                  :active="selectedDoc === doc.id"
                  class="cursor-pointer"
                  @click="openDoc(doc.id)"
                >
                  <QTableTd>
                    <span class="inline-flex items-center gap-2">
                      <QIcon :name="doc.icon" size="sm" class="text-primary/50" />
                      {{ doc.title }}
                    </span>
                  </QTableTd>
                  <QTableTd muted>{{ doc.updated }}</QTableTd>
                  <QTableTd align="right">
                    <QBadge :variant="doc.statusVariant" dot>{{ doc.status }}</QBadge>
                  </QTableTd>
                </QTableRow>
              </QTableBody>
            </QTable>
            <QList v-else>
              <QListItem
                v-for="doc in visibleDocs"
                :key="doc.id"
                :title="doc.title"
                :description="doc.description"
                :icon="doc.icon"
                :active="selectedDoc === doc.id"
                @click="openDoc(doc.id)"
              >
                <template #trailing>
                  <QBadge :variant="doc.statusVariant">{{ doc.status }}</QBadge>
                </template>
              </QListItem>
            </QList>
          </template>

          <template #shared>
            <QEmpty
              v-if="!loadingDocs"
              icon="users"
              title="还没有共享文档"
              description="邀请成员后，共享内容会出现在这里。"
            >
              <template #action>
                <QButton size="sm" variant="secondary" icon="plus" @click="createDoc">
                  新建文档
                </QButton>
              </template>
            </QEmpty>
            <div v-else class="space-y-3 pt-1">
              <QSkeleton variant="rect" height="7rem" />
            </div>
          </template>
        </QTabs>

        <div
          v-if="docTab !== 'shared' && filteredDocs.length > docPageSize && !loadingDocs"
          class="mt-4 flex justify-end border-t border-border pt-3"
        >
          <QPagination
            v-model:page="docPage"
            :total="filteredDocs.length"
            :page-size="docPageSize"
            show-total
          />
        </div>
      </div>

      <div
        v-else-if="active === 'settings'"
        class="mb-6 space-y-4 rounded-lg border border-border bg-surface p-4 shadow-sm md:p-6"
      >
        <div>
          <h3 class="mb-1 font-heading text-sm font-semibold text-primary">
            通知
          </h3>
          <p class="mb-3 text-xs text-primary/55">控制工作区如何提醒你</p>
          <div class="space-y-3">
            <QSwitch
              v-model="notifyDesktop"
              label="桌面通知"
              description="有人评论或提及时弹出提醒"
              label-position="left"
            />
            <QSwitch
              v-model="notifyEmail"
              label="邮件摘要"
              description="每天汇总未读活动"
              label-position="left"
            />
          </div>
        </div>
        <div class="border-t border-border pt-4">
          <QRadioGroup
            v-model="digestFreq"
            label="邮件摘要频率"
            description="开启邮件摘要后生效"
            :disabled="!notifyEmail"
            :options="[
              { value: 'daily', label: '每天' },
              { value: 'weekly', label: '每周' },
              { value: 'off', label: '仅重要通知' },
            ]"
          />
        </div>
        <div class="border-t border-border pt-4">
          <QRadioGroup
            v-model="themePref"
            label="外观"
            orientation="horizontal"
            :options="[
              { value: 'system', label: '系统' },
              { value: 'light', label: '浅色' },
              { value: 'dark', label: '深色', disabled: true },
            ]"
          />
        </div>
        <div class="space-y-4 border-t border-border pt-4">
          <QField label="默认语言">
            <QSelect
              v-model="locale"
              placeholder="选择语言"
              :options="localeOptions"
            />
          </QField>
          <QField label="时区" description="影响通知与摘要发送时间">
            <QSelect
              v-model="timezone"
              size="sm"
              :options="timezoneOptions"
            />
          </QField>
          <QField
            label="工作区简介"
            description="显示在成员邀请与公开主页"
          >
            <QTextarea
              v-model="workspaceBio"
              :rows="3"
              :maxlength="160"
              show-count
              placeholder="用一两句话介绍这个工作区…"
            />
          </QField>
        </div>
        <div class="border-t border-border pt-4">
          <h3 class="mb-3 font-heading text-sm font-semibold text-primary">
            隐私
          </h3>
          <QCheckbox
            v-model="shareAnalytics"
            label="分享使用分析"
            description="帮助改进产品，不包含文档正文"
          />
        </div>
      </div>

      <div v-else class="space-y-4">
        <QCallout variant="info" title="用法提示">
          按
          <QKbd :keys="['⌘', 'K']" size="md" />
          打开命令面板；顶栏头像打开账户菜单。
        </QCallout>

        <div
          class="rounded-lg border border-border bg-surface p-4 shadow-sm md:p-5"
        >
          <div class="mb-4 flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-primary">工作区用量</p>
              <p class="mt-0.5 text-xs text-primary/55">本月存储与同步状态</p>
            </div>
            <QProgressCircle
              :value="storageUsed"
              :size="48"
              :stroke-width="3.5"
              variant="default"
              label="已用"
            />
          </div>
          <QProgress
            label="存储空间"
            :value="storageUsed"
            show-value
            class="mb-3"
          />
          <QProgress
            v-if="syncing"
            indeterminate
            size="sm"
            label="正在同步变更…"
          />
        </div>

        <div
          class="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-sm"
        >
          <div>
            <p class="text-sm font-medium text-primary">工作区成员</p>
            <p class="mt-0.5 text-xs text-primary/55">{{ members.length }} 人可访问</p>
          </div>
          <QPopover
            v-model:open="membersOpen"
            title="成员"
            closable
            placement="bottom"
            align="end"
          >
            <template #trigger="{ toggle }">
              <button
                type="button"
                class="rounded-md outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40"
                aria-label="查看成员"
                @click="toggle"
              >
                <QAvatarGroup :items="members" :max="4" size="sm" />
              </button>
            </template>
            <ul class="space-y-2">
              <li
                v-for="m in members"
                :key="m.name"
                class="flex items-center gap-2"
              >
                <QAvatar :name="m.name" :color="m.color" size="sm" />
                <span class="truncate text-sm text-primary">{{ m.name }}</span>
              </li>
            </ul>
            <template #footer="{ close }">
              <QButton size="sm" variant="secondary" class="ml-auto" @click="close">
                关闭
              </QButton>
            </template>
          </QPopover>
        </div>
      </div>
    </div>

    <QCommandPalette
      v-model:open="commandOpen"
      :items="commandItems"
      placeholder="搜索页面、文档或操作…"
      @select="onCommandSelect"
    />

    <QDrawer
      v-model:open="drawerOpen"
      :title="activeDoc?.title ?? '文档详情'"
      side="right"
      size="md"
    >
      <template v-if="activeDoc">
        <div class="mb-4 flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-md bg-hover text-primary/70"
          >
            <QIcon :name="activeDoc.icon" size="md" />
          </span>
          <QBadge :variant="activeDoc.statusVariant" dot>
            {{ activeDoc.status }}
          </QBadge>
        </div>
        <QDescriptionList
          class="mb-4"
          layout="horizontal"
          :items="[
            { term: '状态', description: activeDoc.status },
            { term: '更新', description: activeDoc.updated },
            { term: '摘要', description: activeDoc.description },
          ]"
        />
        <div>
          <p class="mb-1.5 text-xs font-medium text-primary/55">协作者</p>
          <QAvatarGroup :items="members.slice(0, 3)" size="sm" />
        </div>
      </template>
      <template #footer="{ close }">
        <QButton variant="secondary" size="sm" class="ml-auto" @click="close">
          关闭
        </QButton>
      </template>
    </QDrawer>
  </QAppShell>
</template>
