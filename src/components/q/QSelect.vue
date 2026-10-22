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
import QIcon from './QIcon.vue'

export type QSelectOption = {
  value: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    options: QSelectOption[]
    placeholder?: string
    size?: 'sm' | 'md'
    disabled?: boolean
    invalid?: boolean
    id?: string
    /** Match trigger width (default) or content */
    matchTrigger?: boolean
  }>(),
  {
    placeholder: '请选择',
    size: 'md',
    disabled: false,
    invalid: false,
    matchTrigger: true,
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
const triggerId = computed(() => props.id ?? autoId)
const listId = computed(() => `${triggerId.value}-listbox`)

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const listRef = useTemplateRef<HTMLElement>('listRef')
const activeIndex = ref(-1)
const coords = ref({ top: 0, left: 0, width: 0 })

useClickOutside(listRef, (event) => {
  if (!open.value) return
  const root = rootRef.value
  if (root && event.composedPath().includes(root)) return
  close()
})

const selected = computed(
  () => props.options.find((o) => o.value === modelValue.value) ?? null,
)

const enabledIndexes = computed(() =>
  props.options
    .map((opt, i) => ({ opt, i }))
    .filter(({ opt }) => !opt.disabled)
    .map(({ i }) => i),
)

const triggerClass = computed(() => {
  const size =
    props.size === 'sm'
      ? 'h-control-sm px-control-x-sm text-control-sm'
      : 'h-control-md px-control-x-md text-control-md'

  return [
    'q-select-trigger flex w-full items-center gap-2 rounded-md border bg-surface text-left transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40',
    size,
    props.invalid
      ? 'border-danger'
      : open.value
        ? 'border-primary/30'
        : 'border-border hover:border-primary/20',
    props.disabled
      ? 'cursor-not-allowed opacity-50'
      : 'cursor-pointer',
  ]
})

const listStyle = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  width: props.matchTrigger ? `${coords.value.width}px` : undefined,
  minWidth: `${coords.value.width}px`,
}))

async function updatePosition() {
  const trigger = triggerRef.value
  const list = listRef.value
  if (!trigger || !list) return

  const rect = trigger.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()
  const gap = 4

  let top = rect.bottom + gap
  let left = rect.left

  if (top + listRect.height > window.innerHeight - 8) {
    top = rect.top - listRect.height - gap
  }
  left = Math.min(Math.max(8, left), window.innerWidth - listRect.width - 8)

  coords.value = {
    top,
    left,
    width: rect.width,
  }
}

async function openList() {
  if (props.disabled) return
  show()
  const selectedIdx = props.options.findIndex(
    (o) => o.value === modelValue.value && !o.disabled,
  )
  activeIndex.value =
    selectedIdx >= 0 ? selectedIdx : (enabledIndexes.value[0] ?? -1)
  await nextTick()
  await updatePosition()
  listRef.value?.focus()
  scrollActiveIntoView()
}

function close() {
  hide()
  activeIndex.value = -1
}

function toggle() {
  if (open.value) close()
  else void openList()
}

function selectOption(opt: QSelectOption) {
  if (opt.disabled) return
  modelValue.value = opt.value
  emit('change', opt.value)
  close()
  triggerRef.value?.focus()
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
  const el = root.querySelector<HTMLElement>(
    `[data-select-index="${activeIndex.value}"]`,
  )
  el?.scrollIntoView({ block: 'nearest' })
}

function onListKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.focus()
      break
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Home':
      event.preventDefault()
      activeIndex.value = enabledIndexes.value[0] ?? -1
      scrollActiveIntoView()
      break
    case 'End': {
      event.preventDefault()
      const last = enabledIndexes.value[enabledIndexes.value.length - 1]
      activeIndex.value = last ?? -1
      scrollActiveIntoView()
      break
    }
    case 'Enter':
    case ' ': {
      event.preventDefault()
      const opt = props.options[activeIndex.value]
      if (opt) selectOption(opt)
      break
    }
    default:
      break
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  if (
    event.key === 'ArrowDown' ||
    event.key === 'ArrowUp' ||
    event.key === 'Enter' ||
    event.key === ' '
  ) {
    event.preventDefault()
    if (!open.value) void openList()
  }
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close()
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
</script>

<template>
  <div ref="rootRef" class="q-select relative w-full">
    <button
      :id="triggerId"
      ref="triggerRef"
      type="button"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="listId"
      aria-haspopup="listbox"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      :class="triggerClass"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <span
        class="min-w-0 flex-1 truncate"
        :class="selected ? 'text-primary' : 'text-primary/40'"
      >
        {{ selected?.label ?? placeholder }}
      </span>
      <QIcon
        name="chevron-down"
        size="sm"
        class="shrink-0 text-primary/40 transition-transform duration-150"
        :class="open ? 'rotate-180' : undefined"
      />
    </button>

    <Teleport :to="OVERLAY_ROOT">
      <div
        v-if="open"
        :id="listId"
        ref="listRef"
        role="listbox"
        tabindex="-1"
        class="q-select-list fixed z-[70] max-h-60 overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-md outline-none"
        :style="listStyle"
        @keydown="onListKeydown"
      >
        <button
          v-for="(opt, index) in options"
          :key="String(opt.value)"
          type="button"
          role="option"
          :data-select-index="index"
          :aria-selected="opt.value === modelValue"
          :disabled="opt.disabled"
          class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors duration-150"
          :class="[
            opt.disabled
              ? 'cursor-not-allowed text-primary/35'
              : 'text-primary',
            !opt.disabled && activeIndex === index ? 'bg-hover' : '',
            !opt.disabled && activeIndex !== index ? 'hover:bg-hover' : '',
          ]"
          @mouseenter="activeIndex = index"
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
