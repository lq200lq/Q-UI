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
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useClickOutside, useDisclosure } from '../../composables'
import QEmpty from './QEmpty.vue'
import QIcon from './QIcon.vue'
import type { QSelectOption } from './QSelect.vue'

const props = withDefaults(
  defineProps<{
    options: QSelectOption[]
    placeholder?: string
    size?: 'sm' | 'md'
    disabled?: boolean
    invalid?: boolean
    id?: string
    /** Allow clearing selection */
    clearable?: boolean
    emptyTitle?: string
  }>(),
  {
    placeholder: '搜索并选择…',
    size: 'md',
    disabled: false,
    invalid: false,
    clearable: true,
    emptyTitle: '没有匹配项',
  },
)

const modelValue = defineModel<string | number | null | undefined>('modelValue', {
  default: undefined,
})

const emit = defineEmits<{
  change: [value: string | number | null | undefined]
}>()

const { open, show, hide } = useDisclosure()
const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const listId = computed(() => `${inputId.value}-listbox`)

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const listRef = useTemplateRef<HTMLElement>('listRef')
const query = ref('')
const activeIndex = ref(-1)
const coords = ref({ top: 0, left: 0, width: 0 })

useClickOutside(listRef, (event) => {
  if (!open.value) return
  const root = rootRef.value
  if (root && event.composedPath().includes(root)) return
  close(true)
})

const selected = computed(
  () => props.options.find((o) => o.value === modelValue.value) ?? null,
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter((o) => o.label.toLowerCase().includes(q))
})

const enabledIndexes = computed(() =>
  filtered.value
    .map((opt, i) => ({ opt, i }))
    .filter(({ opt }) => !opt.disabled)
    .map(({ i }) => i),
)

const inputClass = computed(() => {
  const size =
    props.size === 'sm'
      ? 'h-control-sm pl-control-x-sm pr-16 text-control-sm'
      : 'h-control-md pl-control-x-md pr-16 text-control-md'

  return [
    'w-full rounded-md border bg-surface text-primary placeholder:text-primary/40 transition-colors duration-150',
    'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    size,
    props.invalid
      ? 'border-danger focus:border-danger'
      : open.value
        ? 'border-primary/30'
        : 'border-border focus:border-primary/30',
  ]
})

const listStyle = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  width: `${coords.value.width}px`,
  minWidth: `${coords.value.width}px`,
}))

watch(filtered, () => {
  activeIndex.value = enabledIndexes.value[0] ?? -1
})

async function updatePosition() {
  const root = rootRef.value
  const list = listRef.value
  if (!root || !list) return
  const rect = root.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()
  const gap = 4
  let top = rect.bottom + gap
  let left = rect.left
  if (top + listRect.height > window.innerHeight - 8) {
    top = rect.top - listRect.height - gap
  }
  left = Math.min(Math.max(8, left), window.innerWidth - listRect.width - 8)
  coords.value = { top, left, width: rect.width }
}

async function openList() {
  if (props.disabled) return
  show()
  if (!query.value && selected.value) {
    query.value = selected.value.label
  }
  const selectedIdx = filtered.value.findIndex(
    (o) => o.value === modelValue.value && !o.disabled,
  )
  activeIndex.value =
    selectedIdx >= 0 ? selectedIdx : (enabledIndexes.value[0] ?? -1)
  await nextTick()
  await updatePosition()
  inputRef.value?.focus()
  scrollActiveIntoView()
}

function close(commitLabel = false) {
  hide()
  activeIndex.value = -1
  if (commitLabel) {
    query.value = selected.value?.label ?? ''
  }
}

function selectOption(opt: QSelectOption) {
  if (opt.disabled) return
  modelValue.value = opt.value
  emit('change', opt.value)
  query.value = opt.label
  close()
  inputRef.value?.focus()
}

function clear() {
  modelValue.value = null
  emit('change', null)
  query.value = ''
  activeIndex.value = enabledIndexes.value[0] ?? -1
  inputRef.value?.focus()
  if (!open.value) void openList()
}

function move(delta: number) {
  const list = enabledIndexes.value
  if (list.length === 0) return
  const currentPos = list.indexOf(activeIndex.value)
  const nextPos =
    currentPos === -1
      ? 0
      : (currentPos + delta + list.length) % list.length
  activeIndex.value = list[nextPos]!
  scrollActiveIntoView()
}

function scrollActiveIntoView() {
  const root = listRef.value
  if (!root || activeIndex.value < 0) return
  root
    .querySelector<HTMLElement>(`[data-combo-index="${activeIndex.value}"]`)
    ?.scrollIntoView({ block: 'nearest' })
}

function onInput() {
  if (!open.value) void openList()
  else void updatePosition()
}

function onInputKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!open.value) void openList()
      else move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!open.value) void openList()
      else move(-1)
      break
    case 'Enter': {
      event.preventDefault()
      if (!open.value) {
        void openList()
        return
      }
      const opt = filtered.value[activeIndex.value]
      if (opt) selectOption(opt)
      break
    }
    case 'Escape':
      event.preventDefault()
      close(true)
      break
    default:
      break
  }
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close(true)
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('keydown', onDocKeydown, true)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
  } else {
    document.removeEventListener('keydown', onDocKeydown, true)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown, true)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})

watch(
  selected,
  (s) => {
    if (!open.value) query.value = s?.label ?? ''
  },
  { immediate: true },
)
</script>

<template>
  <div ref="rootRef" class="q-combobox relative w-full">
    <div class="relative">
      <input
        :id="inputId"
        ref="inputRef"
        v-model="query"
        type="text"
        role="combobox"
        :aria-expanded="open"
        :aria-controls="listId"
        aria-autocomplete="list"
        :aria-invalid="invalid || undefined"
        :disabled="disabled"
        :placeholder="placeholder"
        autocomplete="off"
        :class="inputClass"
        @focus="openList"
        @input="onInput"
        @keydown="onInputKeydown"
      />
      <div class="pointer-events-none absolute inset-y-0 right-1 flex items-center gap-0.5">
        <button
          v-if="clearable && (modelValue != null && modelValue !== '') && !disabled"
          type="button"
          class="pointer-events-auto inline-flex h-6 w-6 items-center justify-center rounded-sm text-primary/40 transition-colors duration-150 hover:bg-hover hover:text-primary"
          aria-label="清除"
          @mousedown.prevent
          @click="clear"
        >
          <QIcon name="x" size="sm" />
        </button>
        <QIcon
          name="chevron-down"
          size="sm"
          class="mr-1 text-primary/40 transition-transform duration-150"
          :class="open ? 'rotate-180' : undefined"
          aria-hidden="true"
        />
      </div>
    </div>

    <Teleport :to="OVERLAY_ROOT">
      <div
        v-if="open"
        :id="listId"
        ref="listRef"
        role="listbox"
        class="q-combobox-list fixed z-[70] max-h-60 overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-md outline-none"
        :style="listStyle"
      >
        <QEmpty
          v-if="filtered.length === 0"
          icon="search"
          :title="emptyTitle"
          class="!py-6"
        />
        <button
          v-for="(opt, index) in filtered"
          :key="String(opt.value)"
          type="button"
          role="option"
          :data-combo-index="index"
          :aria-selected="opt.value === modelValue"
          :disabled="opt.disabled"
          class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors duration-150"
          :class="[
            opt.disabled ? 'cursor-not-allowed text-primary/35' : 'text-primary',
            !opt.disabled && activeIndex === index ? 'bg-hover' : '',
            !opt.disabled && activeIndex !== index ? 'hover:bg-hover' : '',
          ]"
          @mouseenter="activeIndex = index"
          @mousedown.prevent
          @click="selectOption(opt)"
        >
          <span class="min-w-0 flex-1 truncate">{{ opt.label }}</span>
          <QIcon
            v-if="opt.value === modelValue"
            name="check"
            size="sm"
            class="shrink-0 text-accent-1"
          />
        </button>
      </div>
    </Teleport>
  </div>
</template>
