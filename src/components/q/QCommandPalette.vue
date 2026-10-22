<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  useId,
  useTemplateRef,
  watch,
} from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useBodyScrollLock, useFocusTrap, useHotkey } from '../../composables'
import QEmpty from './QEmpty.vue'
import QIcon from './QIcon.vue'
import QKbd from './QKbd.vue'
import type { IconName } from './icons'

export type QCommandItem = {
  id: string
  label: string
  description?: string
  icon?: IconName
  keywords?: string[]
  shortcut?: string
  disabled?: boolean
  /** Group heading; items sharing a group render together */
  group?: string
}

const props = withDefaults(
  defineProps<{
    items: QCommandItem[]
    placeholder?: string
    emptyTitle?: string
    emptyDescription?: string
    /** Register ⌘K / Ctrl+K to toggle (default true) */
    hotkey?: boolean
    closeOnSelect?: boolean
  }>(),
  {
    placeholder: '搜索命令…',
    emptyTitle: '没有匹配的命令',
    emptyDescription: '试试其他关键词',
    hotkey: true,
    closeOnSelect: true,
  },
)

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  select: [item: QCommandItem]
  close: []
}>()

const titleId = useId()
const query = ref('')
const activeIndex = ref(0)
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const listRef = useTemplateRef<HTMLElement>('listRef')

useBodyScrollLock(open)
useFocusTrap(panelRef, open)

useHotkey(
  ['meta+k', 'ctrl+k'],
  () => {
    open.value = !open.value
  },
  { enabled: () => props.hotkey, ignoreInputs: false },
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.items

  return props.items.filter((item) => {
    const hay = [
      item.label,
      item.description ?? '',
      item.group ?? '',
      ...(item.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
})

const groups = computed(() => {
  const map = new Map<string, QCommandItem[]>()
  for (const item of filtered.value) {
    const key = item.group?.trim() || '命令'
    const list = map.get(key) ?? []
    list.push(item)
    map.set(key, list)
  }
  return [...map.entries()].map(([heading, items]) => ({ heading, items }))
})

const flatEnabled = computed(() =>
  filtered.value.filter((item) => !item.disabled),
)

watch(filtered, () => {
  activeIndex.value = 0
})

watch(open, async (v) => {
  if (v) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
    document.addEventListener('keydown', onPanelKeydown, true)
  } else {
    document.removeEventListener('keydown', onPanelKeydown, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onPanelKeydown, true)
})

function requestClose() {
  if (!open.value) return
  open.value = false
  emit('close')
}

function selectItem(item: QCommandItem) {
  if (item.disabled) return
  emit('select', item)
  if (props.closeOnSelect) requestClose()
}

function moveActive(delta: number) {
  const list = flatEnabled.value
  if (list.length === 0) return
  const next = (activeIndex.value + delta + list.length) % list.length
  activeIndex.value = next
  scrollActiveIntoView()
}

async function scrollActiveIntoView() {
  await nextTick()
  const root = listRef.value
  if (!root) return
  const el = root.querySelector<HTMLElement>(`[data-cmd-index="${activeIndex.value}"]`)
  el?.scrollIntoView({ block: 'nearest' })
}

function onPanelKeydown(event: KeyboardEvent) {
  if (!open.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    requestClose()
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
    return
  }

  if (event.key === 'Enter') {
    const item = flatEnabled.value[activeIndex.value]
    if (!item) return
    event.preventDefault()
    selectItem(item)
  }
}

function flatIndexOf(item: QCommandItem) {
  return flatEnabled.value.findIndex((i) => i.id === item.id)
}

function isActive(item: QCommandItem) {
  const idx = flatIndexOf(item)
  return idx >= 0 && idx === activeIndex.value
}
</script>

<template>
  <Teleport :to="OVERLAY_ROOT">
    <AnimatePresence>
      <motion.div
        v-if="open"
        key="q-cmd-overlay"
        class="fixed inset-0 z-50 bg-primary/25"
        aria-hidden="true"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.15 }"
        @click="requestClose"
      />
    </AnimatePresence>

    <AnimatePresence>
      <motion.div
        v-if="open"
        key="q-cmd-panel"
        class="fixed inset-0 z-[51] flex items-start justify-center px-4 pt-[12vh] pointer-events-none"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 6 }"
        :transition="{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }"
      >
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          class="q-command-palette pointer-events-auto flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border bg-surface text-primary shadow-md outline-none"
          @click.stop
        >
          <h2 :id="titleId" class="sr-only">命令面板</h2>

          <div class="flex items-center gap-2 border-b border-border px-3">
            <QIcon name="search" size="md" class="shrink-0 text-primary/40" />
            <input
              ref="inputRef"
              v-model="query"
              type="search"
              class="h-12 w-full min-w-0 bg-transparent text-sm text-primary placeholder:text-primary/40 outline-none appearance-none [&::-webkit-search-cancel-button]:hidden"
              :placeholder="placeholder"
              autocomplete="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-controls="q-command-list"
            />
            <QKbd class="hidden shrink-0 sm:inline">esc</QKbd>
          </div>

          <div
            id="q-command-list"
            ref="listRef"
            class="max-h-[min(20rem,50vh)] overflow-y-auto p-1.5"
            role="listbox"
            aria-label="命令列表"
          >
            <QEmpty
              v-if="filtered.length === 0"
              icon="search"
              :title="emptyTitle"
              :description="emptyDescription"
              class="!py-8"
            />

            <div
              v-for="group in groups"
              :key="group.heading"
              class="mb-1 last:mb-0"
            >
              <div
                class="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-primary/40"
              >
                {{ group.heading }}
              </div>
              <button
                v-for="item in group.items"
                :key="item.id"
                type="button"
                role="option"
                :data-cmd-index="flatIndexOf(item)"
                :aria-selected="isActive(item)"
                :disabled="item.disabled"
                class="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors duration-150"
                :class="[
                  item.disabled
                    ? 'cursor-not-allowed opacity-40'
                    : isActive(item)
                      ? 'bg-active'
                      : 'hover:bg-hover',
                ]"
                @mouseenter="
                  () => {
                    const i = flatIndexOf(item)
                    if (i >= 0) activeIndex = i
                  }
                "
                @click="selectItem(item)"
              >
                <span
                  v-if="item.icon"
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-hover text-primary/65"
                >
                  <QIcon :name="item.icon" size="sm" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium">
                    {{ item.label }}
                  </span>
                  <span
                    v-if="item.description"
                    class="mt-0.5 block truncate text-xs text-primary/50"
                  >
                    {{ item.description }}
                  </span>
                </span>
                <QKbd v-if="item.shortcut" class="shrink-0">
                  {{ item.shortcut }}
                </QKbd>
              </button>
            </div>
          </div>

          <div
            class="flex items-center gap-3 border-t border-border px-3 py-2 text-[11px] text-primary/45"
          >
            <span class="inline-flex items-center gap-1">
              <QKbd variant="ghost">↑↓</QKbd>
              导航
            </span>
            <span class="inline-flex items-center gap-1">
              <QKbd variant="ghost">↵</QKbd>
              选择
            </span>
            <span class="ml-auto hidden items-center gap-1.5 sm:inline-flex">
              <QKbd :keys="['⌘', 'K']" />
              开关
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>
