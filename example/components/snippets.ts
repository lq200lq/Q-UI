/** Source samples shown under each ExampleBlock (keep in sync with preview). */

export const text = `<QText>正文段落，用于说明与正文内容。</QText>
<QText variant="muted">辅助说明，颜色更弱。</QText>
<QText variant="caption">元信息 · caption</QText>
<QText variant="lead">引导句，稍大一号。</QText>
<QText variant="code">token.primary</QText>`

export const heading = `<QHeading :level="1">页面标题</QHeading>
<QHeading :level="2">区块标题</QHeading>
<QHeading :level="3">小节标题</QHeading>
<QHeading :level="4" muted>次级标题</QHeading>`

export const container = `<QContainer size="md" padding="md">
  <QHeading :level="2">内容区</QHeading>
  <QText variant="muted">居中限宽，带水平内边距。</QText>
</QContainer>`

export const stackInline = `<QStack gap="md">
  <QText>垂直堆叠第一项</QText>
  <QText variant="muted">第二项</QText>
</QStack>

<QInline gap="sm">
  <QButton size="sm">保存</QButton>
  <QButton size="sm" variant="secondary">取消</QButton>
</QInline>`

export const divider = `<QText>上方内容</QText>
<QDivider />
<QText>下方内容</QText>
<QDivider label="或者" />`

export const spacer = `<QInline class="w-full rounded-md border border-border px-3 py-2">
  <QText variant="caption">左</QText>
  <QSpacer />
  <QText variant="caption">右</QText>
</QInline>`

export const link = `<QLink to="/example/layout">打开布局壳</QLink>
<QLink href="https://example.com" external>外部链接</QLink>
<QLink variant="muted" href="#">次要链接</QLink>
<QLink variant="underline" href="#">下划线链接</QLink>`

export const buttonVariants = `<QButton variant="primary">Primary</QButton>
<QButton variant="secondary">Secondary</QButton>
<QButton variant="outline">Outline</QButton>
<QButton variant="ghost">Ghost</QButton>
<QButton variant="danger">Danger</QButton>`

export const buttonStates = `<QButton size="sm" icon="plus">Small</QButton>
<QButton icon="plus" icon-right="chevron-down">Default</QButton>
<QButton :loading="loading" icon="check" @click="save">
  Save
</QButton>
<QButton disabled>Disabled</QButton>`

export const iconButton = `<QIconButton label="更多" name="more-horizontal" />
<QIconButton label="设置" name="settings" variant="outline" />
<QIconButton label="搜索" name="search" size="sm" />
<QIconButton label="删除" name="trash" variant="danger" />
<QIconButton label="加载中" name="loader" loading />`

export const fieldInput = `<QField
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

<QField label="Underline 变体">
  <QInput
    v-model="value"
    variant="underline"
    placeholder="Notion 式下划线输入"
  />
</QField>`

export const textarea = `<QField label="简介" description="最多 120 字">
  <QTextarea
    v-model="bio"
    :rows="4"
    :maxlength="120"
    show-count
    placeholder="介绍一下你自己…"
  />
</QField>

<QTextarea
  v-model="notes"
  variant="underline"
  placeholder="Underline 多行"
  :rows="3"
  resize="none"
/>`

export const select = `<QField label="默认语言">
  <QSelect
    v-model="locale"
    placeholder="选择语言"
    :options="[
      { value: 'zh', label: '简体中文' },
      { value: 'en', label: 'English' },
      { value: 'ja', label: '日本語', disabled: true },
    ]"
  />
</QField>`

export const combobox = `<QField label="负责人">
  <QCombobox
    v-model="assignee"
    placeholder="搜索成员…"
    :options="memberOptions"
  />
</QField>`

export const popover = `<QPopover v-model:open="open" title="分享" closable placement="bottom" align="end">
  <template #trigger="{ toggle }">
    <QButton size="sm" variant="outline" @click="toggle">分享</QButton>
  </template>
  <p class="text-sm text-primary/80">复制链接或邀请成员协作。</p>
  <template #footer="{ close }">
    <QButton size="sm" variant="secondary" class="ml-auto" @click="close">
      完成
    </QButton>
  </template>
</QPopover>`

export const progress = `<QProgress label="存储空间" :value="72" show-value />
<QProgress :value="40" variant="success" size="sm" />
<QProgress indeterminate label="同步中" />
<QProgressCircle :value="64" label="完成度" />`

export const pagination = `<QPagination
  v-model:page="page"
  :total="48"
  :page-size="10"
  show-total
/>`

export const search = `<QSearch
  v-model="query"
  size="sm"
  placeholder="搜索文档…"
  class="w-56"
/>`

export const callout = `<QCallout variant="info" title="用法提示">
  顶栏搜索可过滤文档列表与表格。
</QCallout>

<QAlert
  variant="warning"
  title="未保存的更改"
  @dismiss="visible = false"
>
  离开页面前请先保存。
</QAlert>`

export const checkboxSwitch = `<QCheckbox
  v-model="agree"
  label="接受条款"
  description="可随时在设置中更改"
/>

<QCheckbox v-model="partial" indeterminate label="部分选中" />

<QSwitch
  v-model="notify"
  label="桌面通知"
  description="有人提及时提醒我"
  label-position="left"
/>`

export const kbd = `<QKbd>⌘</QKbd>
<QKbd>K</QKbd>
<QKbd :keys="['⌘', 'K']" />
<QKbd :keys="['Ctrl', 'Shift', 'P']" size="md" />
<span class="text-sm text-primary/60">
  按 <QKbd variant="ghost">Esc</QKbd> 关闭
</span>`

export const radio = `<QRadioGroup
  v-model="theme"
  label="外观"
  description="选择工作区主题"
  :options="[
    { value: 'system', label: '跟随系统' },
    { value: 'light', label: '浅色' },
    { value: 'dark', label: '深色', disabled: true },
  ]"
/>

<QRadioGroup v-model="density" label="密度" orientation="horizontal">
  <QRadio value="comfortable" label="舒适" />
  <QRadio value="compact" label="紧凑" />
</QRadioGroup>`

export const avatar = `<QAvatar name="Ada Lovelace" color="purple" />
<QAvatar name="Alan" color="blue" size="lg" />
<QAvatar src="https://invalid" name="Fallback" />

<QAvatarGroup
  :max="3"
  :items="[
    { name: 'Ada', color: 'purple' },
    { name: 'Alan', color: 'blue' },
    { name: 'Grace', color: 'green' },
    { name: 'Linus', color: 'orange' },
  ]"
/>`

export const commandPalette = `const open = ref(false)

<QButton @click="open = true">命令面板</QButton>

<QCommandPalette
  v-model:open="open"
  :items="[
    { id: 'docs', label: '打开文档', icon: 'file-text', group: '导航', shortcut: 'D' },
    { id: 'new', label: '新建文档', icon: 'plus', group: '操作' },
  ]"
  @select="onSelect"
/>
<!-- 默认监听 ⌘K / Ctrl+K -->`

export const card = `<QCard variant="elevated">
  <template #header>标题</template>
  内容
  <template #footer>
    <div class="ml-auto flex items-center gap-2">
      <QButton variant="secondary" size="sm">取消</QButton>
      <QButton variant="primary" size="sm">确认</QButton>
    </div>
  </template>
</QCard>`

export const modal = `const open = ref(false)

<QButton @click="open = true">打开对话框</QButton>

<QModal v-model:open="open" title="确认操作" description="此操作可在示例中随时关闭。">
  <p class="text-sm text-primary/80">支持 Esc、点遮罩、右上角关闭。</p>
  <template #footer="{ close }">
    <div class="ml-auto flex items-center gap-2">
      <QButton variant="secondary" size="sm" @click="close">取消</QButton>
      <QButton variant="primary" size="sm" @click="close">确认</QButton>
    </div>
  </template>
</QModal>`

export const drawer = `const open = ref(false)

<QButton icon="panel-right" @click="open = true">打开抽屉</QButton>

<QDrawer v-model:open="open" title="文档详情" side="right" size="md">
  <p class="text-sm text-primary/80">侧滑面板；Esc / 遮罩 / 关闭按钮。</p>
  <template #footer="{ close }">
    <QButton variant="secondary" size="sm" class="ml-auto" @click="close">
      关闭
    </QButton>
  </template>
</QDrawer>`

export const icon = `<QIcon name="plus" size="md" />
<QIcon name="search" class="text-primary/60" />
<QIcon name="check-circle" class="text-accent-3" label="完成" />`

export const toastDemo = `import { toast } from '@/composables'

toast('已保存')
toast({ title: '成功', description: '设置已更新', variant: 'success' })
toast({ title: '失败', description: '请稍后重试', variant: 'error' })`

export const confirmDialog = `const open = ref(false)

<QButton variant="danger" @click="open = true">删除</QButton>

<QConfirmDialog
  v-model:open="open"
  title="删除该项目？"
  description="删除后无法恢复。"
  variant="danger"
  confirm-text="删除"
  @confirm="onDelete"
/>`

export const tooltip = `<QTooltip content="编辑文档">
  <QIconButton label="编辑" name="edit" />
</QTooltip>`

export const dropdown = `<QDropdownMenu
  :items="[
    { label: '编辑' },
    { label: '复制' },
    { label: '删除', danger: true },
  ]"
  @select="onSelect"
>
  <template #default="{ toggle }">
    <QIconButton label="更多" name="more-horizontal" @click="toggle" />
  </template>
</QDropdownMenu>`

export const contextMenu = `<QContextMenu
  :items="[
    { label: '打开' },
    { label: '重命名' },
    { separator: true, label: '' },
    { label: '删除', danger: true },
  ]"
  @select="onSelect"
>
  <div class="rounded-md border border-dashed border-border p-8 text-center text-sm text-primary/60">
    在此区域右键
  </div>
</QContextMenu>`

export const tree = `<QTree
  v-model="selected"
  v-model:expanded="expanded"
  :nodes="[
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
          ],
        },
      ],
    },
  ]"
/>`

export const stepper = `<QStepper
  v-model="step"
  :items="[
    { value: 'basics', label: '基本信息', description: '名称与描述' },
    { value: 'team', label: '团队', description: '成员与权限' },
    { value: 'review', label: '确认', description: '检查并提交' },
  ]"
/>`

export const tabs = `const tab = ref('overview')

<QTabs
  v-model="tab"
  :items="[
    { value: 'overview', label: '概览' },
    { value: 'activity', label: '动态' },
  ]"
>
  <template #overview>概览内容</template>
  <template #activity>动态内容</template>
</QTabs>

<QTabs v-model="filter" :items="pillItems" variant="pills" size="sm" />`

export const breadcrumb = `<QBreadcrumb
  :items="[
    { label: '工作区', to: '/' },
    { label: '文档', to: '/docs' },
    { label: '产品规格', current: true },
  ]"
/>`

export const list = `<QList>
  <QListItem
    title="产品规格"
    description="编辑于 2 小时前"
    icon="file-text"
    active
  />
  <QListItem title="设计系统" description="编辑于 昨天" icon="folder" />
</QList>`

export const empty = `<QEmpty
  icon="users"
  title="还没有共享文档"
  description="邀请成员后，共享内容会出现在这里。"
>
  <template #action>
    <QButton size="sm" variant="secondary">新建</QButton>
  </template>
</QEmpty>`

export const skeleton = `<div class="flex items-center gap-3">
  <QSkeleton variant="avatar" />
  <div class="flex-1 space-y-2">
    <QSkeleton variant="title" width="40%" />
    <QSkeleton variant="text" width="70%" />
  </div>
</div>
<QSkeleton variant="rect" height="6rem" />`

export const spinner = `<QSpinner />
<QSpinner size="sm" />
<QSpinner size="lg" label="同步中" />
<QButton :loading="true">Saving</QButton>`

export const descriptionList = `<QDescriptionList
  layout="horizontal"
  :items="[
    { term: '状态', description: '已发布' },
    { term: '更新', description: '2 小时前' },
    { term: '所有者', description: 'Ada Lovelace' },
  ]"
/>`

export const stat = `<QInline gap="xl">
  <QStat label="文档" :value="128" hint="本周 +12" />
  <QStat label="成员" :value="24" />
  <QStat label="存储" value="72%" muted hint="剩余 2.1 GB" />
</QInline>`

export const badge = `<QBadge variant="success" dot>已发布</QBadge>
<QBadge variant="warning">草稿</QBadge>
<QBadge variant="info">审阅中</QBadge>
<QTag variant="purple" dismissible @dismiss="onRemove">设计</QTag>`

export const table = `<QTable>
  <QTableHead>
    <QTableRow :hoverable="false">
      <QTableTh>名称</QTableTh>
      <QTableTh>更新</QTableTh>
      <QTableTh align="right">状态</QTableTh>
    </QTableRow>
  </QTableHead>
  <QTableBody>
    <QTableRow>
      <QTableTd>产品规格</QTableTd>
      <QTableTd muted>2 小时前</QTableTd>
      <QTableTd align="right">
        <QBadge variant="warning" dot>草稿</QBadge>
      </QTableTd>
    </QTableRow>
  </QTableBody>
</QTable>`
