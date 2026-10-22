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
import QIconButton from './QIconButton.vue'
import {
  addMonths,
  buildMonthGrid,
  formatDisplayDate,
  isBeforeDay,
  isSameDay,
  monthTitle,
  parseISODate,
  startOfMonth,
  toISODate,
  weekdayLabels,
} from './dateUtils'

export type QDateRange = {
  start: string | null
  end: string | null
}

const props = withDefaults(
  defineProps<{
    placeholder?: string
    size?: 'sm' | 'md'
    disabled?: boolean
    invalid?: boolean
    id?: string
    clearable?: boolean
    min?: string
    max?: string
  }>(),
  {
    placeholder: '开始日期 — 结束日期',
    size: 'md',
    disabled: false,
    invalid: false,
    clearable: true,
  },
)

const modelValue = defineModel<QDateRange>('modelValue', {
  default: () => ({ start: null, end: null }),
})

const { open, show, hide } = useDisclosure()
const autoId = useId()
const triggerId = computed(() => props.id ?? autoId)
const panelId = computed(() => `${triggerId.value}-range`)

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const coords = ref({ top: 0, left: 0 })
const hoverDay = ref<Date | null>(null)

const minDate = computed(() => parseISODate(props.min))
const maxDate = computed(() => parseISODate(props.max))

const viewMonth = ref(
  startOfMonth(parseISODate(modelValue.value.start) ?? new Date()),
)

const draftStart = ref<Date | null>(null)

useClickOutside(panelRef, (event) => {
  if (!open.value) return
  const root = rootRef.value
  if (root && event.composedPath().includes(root)) return
  close()
})

const display = computed(() => {
  const start = formatDisplayDate(modelValue.value.start)
  const end = formatDisplayDate(modelValue.value.end)
  if (start && end) return `${start} — ${end}`
  if (start) return `${start} — …`
  return props.placeholder
})

const hasValue = computed(
  () => Boolean(modelValue.value.start || modelValue.value.end),
)

const grid = computed(() => buildMonthGrid(viewMonth.value))
const weekdays = weekdayLabels()

const rangeStart = computed(() => {
  if (draftStart.value) return draftStart.value
  return parseISODate(modelValue.value.start)
})

const rangeEnd = computed(() => {
  if (draftStart.value && hoverDay.value) {
    return isBeforeDay(hoverDay.value, draftStart.value)
      ? draftStart.value
      : hoverDay.value
  }
  if (draftStart.value) return null
  return parseISODate(modelValue.value.end)
})

const previewStart = computed(() => {
  if (draftStart.value && hoverDay.value) {
    return isBeforeDay(hoverDay.value, draftStart.value)
      ? hoverDay.value
      : draftStart.value
  }
  return rangeStart.value
})

const triggerClass = computed(() => {
  const size =
    props.size === 'sm'
      ? 'h-control-sm px-control-x-sm text-control-sm'
      : 'h-control-md px-control-x-md text-control-md'

  return [
    'q-date-range-trigger flex w-full items-center gap-2 rounded-md border bg-surface text-left transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40',
    size,
    props.invalid
      ? 'border-danger'
      : open.value
        ? 'border-primary/30'
        : 'border-border hover:border-primary/20',
    props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
  ]
})

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

function inRange(day: Date): boolean {
  const start = previewStart.value
  const end = rangeEnd.value
  if (!start || !end) return false
  const a = isBeforeDay(start, end) ? start : end
  const b = isBeforeDay(start, end) ? end : start
  return (
    (isSameDay(day, a) || isBeforeDay(a, day)) &&
    (isSameDay(day, b) || isBeforeDay(day, b))
  )
}

function isEndpoint(day: Date): boolean {
  const start = previewStart.value
  const end = rangeEnd.value
  return Boolean(
    (start && isSameDay(day, start)) || (end && isSameDay(day, end)),
  )
}

async function updatePosition() {
  const trigger = triggerRef.value
  const panel = panelRef.value
  if (!trigger || !panel) return
  const rect = trigger.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()
  const gap = 4
  let top = rect.bottom + gap
  let left = rect.left
  if (top + panelRect.height > window.innerHeight - 8) {
    top = Math.max(8, rect.top - panelRect.height - gap)
  }
  left = Math.min(Math.max(8, left), window.innerWidth - panelRect.width - 8)
  coords.value = { top, left }
}

async function openPanel() {
  if (props.disabled) return
  draftStart.value = null
  hoverDay.value = null
  viewMonth.value = startOfMonth(
    parseISODate(modelValue.value.start) ?? new Date(),
  )
  show()
  await nextTick()
  await updatePosition()
  panelRef.value?.focus()
}

function close() {
  draftStart.value = null
  hoverDay.value = null
  hide()
}

function toggle() {
  if (open.value) close()
  else void openPanel()
}

function isDisabledDay(day: Date): boolean {
  if (minDate.value && isBeforeDay(day, minDate.value)) return true
  if (maxDate.value && isBeforeDay(maxDate.value, day)) return true
  return false
}

function selectDay(day: Date) {
  if (isDisabledDay(day)) return

  if (!draftStart.value) {
    draftStart.value = day
    hoverDay.value = day
    return
  }

  let start = draftStart.value
  let end = day
  if (isBeforeDay(end, start)) {
    const tmp = start
    start = end
    end = tmp
  }

  modelValue.value = { start: toISODate(start), end: toISODate(end) }
  draftStart.value = null
  hoverDay.value = null
  close()
  triggerRef.value?.focus()
}

function clear(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  modelValue.value = { start: null, end: null }
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    close()
    triggerRef.value?.focus()
  }
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
  <div ref="rootRef" class="q-date-range-picker relative w-full">
    <button
      :id="triggerId"
      ref="triggerRef"
      type="button"
      :class="triggerClass"
      :disabled="disabled"
      :aria-expanded="open"
      :aria-controls="panelId"
      :aria-invalid="invalid || undefined"
      @click="toggle"
    >
      <QIcon name="calendar" size="sm" class="shrink-0 text-primary/45" />
      <span
        class="min-w-0 flex-1 truncate"
        :class="hasValue ? 'text-primary' : 'text-primary/40'"
      >
        {{ display }}
      </span>
      <span
        v-if="clearable && hasValue && !disabled"
        role="button"
        tabindex="-1"
        class="rounded-sm p-0.5 text-primary/40 transition-colors duration-150 hover:bg-hover hover:text-primary"
        aria-label="清除日期范围"
        @click="clear"
      >
        <QIcon name="x" size="sm" />
      </span>
    </button>

    <Teleport :to="OVERLAY_ROOT">
      <div
        v-if="open"
        :id="panelId"
        ref="panelRef"
        role="dialog"
        aria-label="选择日期范围"
        tabindex="-1"
        class="q-date-range-panel fixed z-[70] w-[280px] rounded-md border border-border bg-surface p-3 shadow-md outline-none"
        :style="style"
      >
        <div class="mb-2 flex items-center gap-1">
          <QIconButton
            label="上个月"
            name="chevron-left"
            size="sm"
            @click="viewMonth = addMonths(viewMonth, -1)"
          />
          <div class="min-w-0 flex-1 text-center text-sm font-medium text-primary">
            {{ monthTitle(viewMonth) }}
          </div>
          <QIconButton
            label="下个月"
            name="chevron-right"
            size="sm"
            @click="viewMonth = addMonths(viewMonth, 1)"
          />
        </div>

        <p class="mb-2 text-center text-xs text-primary/50">
          {{ draftStart ? '再选择结束日期' : '选择开始日期' }}
        </p>

        <div class="mb-1 grid grid-cols-7 gap-0.5">
          <div
            v-for="label in weekdays"
            :key="label"
            class="py-1 text-center text-[11px] font-medium text-primary/45"
          >
            {{ label }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-0.5">
          <button
            v-for="(day, index) in grid"
            :key="index"
            type="button"
            class="flex h-8 items-center justify-center rounded-md text-sm transition-colors duration-150"
            :class="{
              'text-primary/30': day.getMonth() !== viewMonth.getMonth(),
              'bg-btn text-on-btn': isEndpoint(day),
              'bg-btn/15 text-primary': inRange(day) && !isEndpoint(day),
              'hover:bg-hover': !isDisabledDay(day) && !isEndpoint(day),
              'cursor-not-allowed opacity-40': isDisabledDay(day),
            }"
            :disabled="isDisabledDay(day)"
            @mouseenter="hoverDay = day"
            @click="selectDay(day)"
          >
            {{ day.getDate() }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
