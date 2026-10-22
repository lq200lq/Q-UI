<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useClickOutside } from '../../composables'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'

export type QSlashMenuItem = {
  key: string
  label: string
  description?: string
  icon?: IconName
  keywords?: string[]
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: QSlashMenuItem[]
    open?: boolean
    query?: string
  }>(),
  {
    open: false,
    query: '',
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  select: [item: QSlashMenuItem]
}>()

const menuRef = useTemplateRef<HTMLElement>('menuRef')
const activeIndex = ref(0)
const coords = ref({ top: 0, left: 0 })

useClickOutside(menuRef, () => {
  if (props.open) emit('update:open', false)
})

const filtered = computed(() => {
  const q = props.query.trim().toLowerCase()
  if (!q) return props.items
  return props.items.filter((item) => {
    const hay = [item.label, item.description, ...(item.keywords ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
})

const enabled = computed(() =>
  filtered.value
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !item.disabled),
)

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  minWidth: '240px',
}))

async function positionNear(el: HTMLElement | null) {
  if (!el) return
  const rect = el.getBoundingClientRect()
  coords.value = {
    top: Math.min(rect.bottom + 4, window.innerHeight - 280),
    left: Math.min(Math.max(8, rect.left), window.innerWidth - 260),
  }
  await nextTick()
  menuRef.value?.focus()
}

function select(item: QSlashMenuItem) {
  if (item.disabled) return
  emit('select', item)
  emit('update:open', false)
}

function move(delta: number) {
  const list = enabled.value
  if (list.length === 0) return
  const current = list.findIndex(({ i }) => i === activeIndex.value)
  const next =
    current === -1
      ? 0
      : (current + delta + list.length) % list.length
  activeIndex.value = list[next]!.i
}

function onKeydown(event: KeyboardEvent) {
  if (!props.open) return
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      emit('update:open', false)
      break
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Enter': {
      event.preventDefault()
      const item = filtered.value[activeIndex.value]
      if (item) select(item)
      break
    }
    default:
      break
  }
}

watch(
  () => props.open,
  async (v) => {
    if (v) {
      activeIndex.value = enabled.value[0]?.i ?? 0
      document.addEventListener('keydown', onKeydown, true)
    } else {
      document.removeEventListener('keydown', onKeydown, true)
    }
  },
)

watch(
  () => props.query,
  () => {
    activeIndex.value = enabled.value[0]?.i ?? 0
  },
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown, true)
})

defineExpose({ positionNear })
</script>

<template>
  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="menuRef"
      role="listbox"
      tabindex="-1"
      aria-label="斜杠命令"
      class="q-slash-menu fixed z-[70] max-h-72 overflow-auto rounded-md border border-border bg-surface py-1 shadow-md outline-none"
      :style="style"
    >
      <p
        v-if="filtered.length === 0"
        class="px-3 py-2 text-sm text-primary/50"
      >
        无匹配命令
      </p>
      <button
        v-for="(item, index) in filtered"
        :key="item.key"
        type="button"
        role="option"
        class="flex w-full items-center gap-2.5 px-2.5 py-1.5 text-left transition-colors duration-150"
        :class="[
          item.disabled
            ? 'cursor-not-allowed text-primary/35'
            : 'text-primary',
          !item.disabled && activeIndex === index ? 'bg-hover' : '',
          !item.disabled && activeIndex !== index ? 'hover:bg-hover' : '',
        ]"
        :disabled="item.disabled"
        :aria-selected="activeIndex === index"
        @mouseenter="activeIndex = index"
        @click="select(item)"
      >
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-hover text-primary/60"
        >
          <QIcon v-if="item.icon" :name="item.icon" size="md" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-medium">{{ item.label }}</span>
          <span
            v-if="item.description"
            class="block truncate text-xs text-primary/50"
          >
            {{ item.description }}
          </span>
        </span>
      </button>
    </div>
  </Teleport>
</template>
