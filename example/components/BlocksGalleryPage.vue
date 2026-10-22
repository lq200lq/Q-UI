<script setup lang="ts">
import { ref } from 'vue'
import {
  QBlock,
  QBlockHandle,
  QBlockToolbar,
  type QBlockToolbarItem,
  QButton,
  QCalloutBlock,
  QCodeBlock,
  QCover,
  QEditableTitle,
  QInlineEditable,
  QInput,
  QPageIcon,
  QQuote,
  QSlashMenu,
  type QSlashMenuItem,
  QToggle,
  QBookmark,
} from '../../src/components/q'
import { toast } from '../../src/composables'
import ExampleBlock from '../_shared/ExampleBlock.vue'
import ExampleGalleryShell from '../_shared/ExampleGalleryShell.vue'
import * as snippets from './snippets'

const pageTitle = ref('产品规格')
const cellStatus = ref('进行中')
const slashOpen = ref(false)
const slashQuery = ref('')
const slashAnchor = ref<HTMLElement | null>(null)
const slashMenuRef = ref<{ positionNear: (el: HTMLElement | null) => void } | null>(
  null,
)
const toolbarOpen = ref(false)
const coverSrc = ref(
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
)
const pageEmoji = ref('📄')
const toggleOpen = ref(true)
const sampleCode = `function greet(name: string) {
  return \`Hello, \${name}\`
}`

const slashItems: QSlashMenuItem[] = [
  {
    key: 'text',
    label: '文本',
    description: '普通段落',
    icon: 'file-text',
    keywords: ['text'],
  },
  {
    key: 'heading',
    label: '标题',
    description: '大标题',
    icon: 'heading',
    keywords: ['h1'],
  },
  {
    key: 'todo',
    label: '待办',
    description: '勾选列表',
    icon: 'check',
    keywords: ['todo'],
  },
  {
    key: 'code',
    label: '代码',
    description: '代码块',
    icon: 'code',
    keywords: ['code'],
  },
]

const toolbarItems = ref<QBlockToolbarItem[]>([
  { key: 'heading', label: '标题', icon: 'heading', active: true },
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'sep', label: '', icon: 'minus', separator: true },
  { key: 'link', label: '链接', icon: 'link' },
  { key: 'comment', label: '评论', icon: 'message-square' },
])

function openSlashDemo() {
  slashQuery.value = ''
  slashOpen.value = true
  void slashMenuRef.value?.positionNear(slashAnchor.value)
}

function onSlashSelect(item: QSlashMenuItem) {
  toast(`插入「${item.label}」`)
}

function toggleToolbarDemo() {
  toolbarOpen.value = !toolbarOpen.value
}

function onToolbarAction(item: QBlockToolbarItem) {
  toolbarItems.value = toolbarItems.value.map((t) =>
    t.key === item.key && !t.separator ? { ...t, active: !t.active } : t,
  )
  toast(item.label)
}

const navItems = [
  { id: 'q-block-handle', label: 'QBlockHandle' },
  { id: 'q-block', label: 'QBlock' },
  { id: 'q-editable-title', label: 'QEditableTitle' },
  { id: 'q-inline-editable', label: 'QInlineEditable' },
  { id: 'q-slash-menu', label: 'QSlashMenu' },
  { id: 'q-block-toolbar', label: 'QBlockToolbar' },
  { id: 'q-cover', label: 'QCover · QPageIcon' },
  { id: 'q-callout-block', label: 'QCalloutBlock' },
  { id: 'q-toggle', label: 'QToggle' },
  { id: 'q-quote', label: 'QQuote' },
  { id: 'q-code-block', label: 'QCodeBlock' },
  { id: 'q-bookmark', label: 'QBookmark' },
] as const
</script>

<template>
  <ExampleGalleryShell
    title="文档块示例"
    description="编辑块、内容块、封面与斜杠命令"
    :nav-items="navItems"
  >
    <ExampleBlock
      id="q-block-handle"
      title="QBlockHandle"
      description="Drag Handle Illusion；grab 光标"
      :code="snippets.blockHandle"
    >
      <div
        class="flex items-center gap-2 rounded-md border border-border px-3 py-2"
      >
        <QBlockHandle />
        <span class="text-sm text-primary/70">悬停块左侧会出现此手柄</span>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-block"
      title="QBlock"
      description="块容器；hover 高亮；左侧拖拽手柄"
      :code="snippets.block"
    >
      <div class="ml-8 w-full max-w-lg space-y-1">
        <QBlock>
          <p class="text-sm leading-relaxed text-primary">
            这是一个文档块。悬停显示左侧手柄。
          </p>
        </QBlock>
        <QBlock selected>
          <p class="text-sm leading-relaxed text-primary">
            选中态块会保留高亮与手柄。
          </p>
        </QBlock>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-editable-title"
      title="QEditableTitle"
      description="点击就地编辑页面标题；Enter 提交 / Esc 取消"
      :code="snippets.editableTitle"
    >
      <div class="w-full max-w-lg">
        <QEditableTitle v-model="pageTitle" placeholder="无标题" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-inline-editable"
      title="QInlineEditable"
      description="单元格 / 属性就地编辑"
      :code="snippets.inlineEditable"
    >
      <div class="flex items-center gap-3 text-sm text-primary/70">
        <span>状态</span>
        <QInlineEditable v-model="cellStatus" empty-label="设置状态" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-slash-menu"
      title="QSlashMenu"
      description="/ 命令菜单；过滤与键盘选择"
      :code="snippets.slashMenu"
    >
      <div class="space-y-3">
        <div ref="slashAnchor" class="flex flex-wrap items-center gap-2">
          <QButton size="sm" variant="outline" @click="openSlashDemo">
            打开 / 菜单
          </QButton>
          <QInput
            v-model="slashQuery"
            size="sm"
            placeholder="过滤命令…"
            class="max-w-[160px]"
            @focus="openSlashDemo"
          />
        </div>
        <QSlashMenu
          ref="slashMenuRef"
          v-model:open="slashOpen"
          :query="slashQuery"
          :items="slashItems"
          @select="onSlashSelect"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-block-toolbar"
      title="QBlockToolbar"
      description="选区浮动工具条；Esc 关闭"
      :code="snippets.blockToolbar"
    >
      <QButton size="sm" variant="outline" @click="toggleToolbarDemo">
        {{ toolbarOpen ? '关闭工具条' : '显示工具条' }}
      </QButton>
      <QBlockToolbar
        v-model:open="toolbarOpen"
        :x="320"
        :y="220"
        :items="toolbarItems"
        @action="onToolbarAction"
      />
    </ExampleBlock>

    <ExampleBlock
      id="q-cover"
      title="QCover · QPageIcon"
      description="页面封面与可点击页面图标"
      :code="snippets.cover"
    >
      <div
        class="w-full max-w-xl overflow-hidden rounded-md border border-border"
      >
        <QCover
          :src="coverSrc"
          @change="toast('更换封面')"
          @remove="coverSrc = ''"
        />
        <div class="relative px-4 pb-4">
          <QPageIcon
            class="-mt-8"
            :emoji="pageEmoji"
            @click="pageEmoji = pageEmoji === '📄' ? '✨' : '📄'"
          />
        </div>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-callout-block"
      title="QCalloutBlock"
      description="文档块式 callout；emoji 可点换"
      :code="snippets.calloutBlock"
    >
      <div class="w-full max-w-lg">
        <QCalloutBlock
          :emoji="pageEmoji === '📄' ? '💡' : '✨'"
          title="提示"
          @icon-click="pageEmoji = pageEmoji === '📄' ? '✨' : '📄'"
        >
          文档块式 callout，点击左侧 emoji 可更换。
        </QCalloutBlock>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-toggle"
      title="QToggle"
      description="折叠块（非开关；开关见表单页 QSwitch）"
      :code="snippets.toggle"
    >
      <div class="w-full max-w-lg">
        <QToggle v-model:open="toggleOpen" title="展开查看详情">
          这里是折叠块内容，适合放补充说明或次要段落。
        </QToggle>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-quote"
      title="QQuote"
      description="引用块；左侧细线分隔"
      :code="snippets.quote"
    >
      <div class="w-full max-w-lg">
        <QQuote cite="— Ada Lovelace">诗意科学将把我们带到多远。</QQuote>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-code-block"
      title="QCodeBlock"
      description="代码块；一键复制"
      :code="snippets.codeBlock"
    >
      <div class="w-full max-w-lg">
        <QCodeBlock language="ts" :code="sampleCode" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-bookmark"
      title="QBookmark"
      description="链接预览卡；可选缩略图"
      :code="snippets.bookmark"
    >
      <div class="w-full max-w-lg">
        <QBookmark
          url="https://www.notion.com"
          title="Notion"
          description="The AI workspace that works for you."
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
        />
      </div>
    </ExampleBlock>
  </ExampleGalleryShell>
</template>
