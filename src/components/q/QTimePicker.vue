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
import QButton from './QButton.vue'

function parseTime(value: string | null | undefined): { h: number; m: number } | null {
  if (!value) return null
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h < 0 || h > 23 || min < 0 || min > 59) return null
  return { h, m: min }
}

function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const props = withDefaults(
  defineProps<{
    placeholder?: string
    size?: 'sm' | 'md'
    disabled?: boolean
    invalid?: boolean
    id?: string
    clearable?: boolean
    /** Minute step: 1 | 5 | 10 | 15 | 30 */
    minuteStep?: number
  }>(),
  {
    placeholder: '选择时间',
    size: 'md',
    disabled: false,
    invalid: false,
    clearable: true,
    minuteStep: 5,
  },
)

const modelValue = defineModel<string | null>('modelValue', { default: null })

const { open, show, hide } = useDisclosure()
const autoId = useId()
const triggerId = computed(() => props.id ?? autoId)
const panelId = computed(() => `${triggerId.value}-time`)

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const hourListRef = useTemplateRef<HTMLElement>('hourListRef')
const minuteListRef = useTemplateRef<HTMLElement>('minuteListRef')
const coords = ref({ top: 0, left: 0 })

const draftHour = ref(9)
const draftMinute = ref(0)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const step = Math.max(1, props.minuteStep)
  const list: number[] = []
  for (let m = 0; m < 60; m += step) list.push(m)
  return list
})

useClickOutside(panelRef, (event) => {
  if (!open.value) return
  const root = rootRef.value
  if (root && event.composedPath().includes(root)) return
  close()
})

const parsed = computed(() => parseTime(modelValue.value))
const hasValue = computed(() => Boolean(parsed.value))
const display = computed(() =>
  parsed.value
    ? formatTime(parsed.value.h, parsed.value.m)
    : props.placeholder,
)

const triggerClass = computed(() => {
  const size =
    props.size === 'sm'
      ? 'h-control-sm px-control-x-sm text-control-sm'
      : 'h-control-md px-control-x-md text-control-md'

  return [
    'q-time-picker-trigger flex w-full items-center gap-2 rounded-md border bg-surface text-left transition-colors duration-150',
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

function nearestMinute(m: number): number {
  const list = minutes.value
  let best = list[0]!
  let bestDist = Math.abs(m - best)
  for (const item of list) {
    const dist = Math.abs(m - item)
    if (dist < bestDist) {
      best = item
      bestDist = dist
    }
  }
  return best
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

function scrollSelectedIntoView() {
  const hourEl = hourListRef.value?.querySelector('[data-selected="true"]')
  const minuteEl = minuteListRef.value?.querySelector('[data-selected="true"]')
  hourEl?.scrollIntoView({ block: 'center' })
  minuteEl?.scrollIntoView({ block: 'center' })
}

async function openPanel() {
  if (props.disabled) return
  const current = parsed.value
  if (current) {
    draftHour.value = current.h
    draftMinute.value = nearestMinute(current.m)
  } else {
    const now = new Date()
    draftHour.value = now.getHours()
    draftMinute.value = nearestMinute(now.getMinutes())
  }
  show()
  await nextTick()
  await updatePosition()
  scrollSelectedIntoView()
  panelRef.value?.focus()
}

function close() {
  hide()
}

function toggle() {
  if (open.value) close()
  else void openPanel()
}

function confirm() {
  modelValue.value = formatTime(draftHour.value, draftMinute.value)
  close()
  triggerRef.value?.focus()
}

function clear(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  modelValue.value = null
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
  <div ref="rootRef" class="q-time-picker relative w-full">
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
      <QIcon name="clock" size="sm" class="shrink-0 text-primary/45" />
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
        aria-label="清除时间"
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
        aria-label="选择时间"
        tabindex="-1"
        class="q-time-picker-panel fixed z-[70] w-[200px] rounded-md border border-border bg-surface shadow-md outline-none"
        :style="style"
      >
        <div class="flex h-48">
          <div
            ref="hourListRef"
            class="flex-1 overflow-y-auto border-r border-border py-1"
            role="listbox"
            aria-label="小时"
          >
            <button
              v-for="h in hours"
              :key="h"
              type="button"
              role="option"
              class="flex w-full items-center justify-center py-1.5 text-sm transition-colors duration-150"
              :class="
                draftHour === h
                  ? 'bg-btn text-on-btn'
                  : 'text-primary hover:bg-hover'
              "
              :data-selected="draftHour === h ? 'true' : undefined"
              :aria-selected="draftHour === h"
              @click="draftHour = h"
            >
              {{ String(h).padStart(2, '0') }}
            </button>
          </div>
          <div
            ref="minuteListRef"
            class="flex-1 overflow-y-auto py-1"
            role="listbox"
            aria-label="分钟"
          >
            <button
              v-for="m in minutes"
              :key="m"
              type="button"
              role="option"
              class="flex w-full items-center justify-center py-1.5 text-sm transition-colors duration-150"
              :class="
                draftMinute === m
                  ? 'bg-btn text-on-btn'
                  : 'text-primary hover:bg-hover'
              "
              :data-selected="draftMinute === m ? 'true' : undefined"
              :aria-selected="draftMinute === m"
              @click="draftMinute = m"
            >
              {{ String(m).padStart(2, '0') }}
            </button>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 border-t border-border px-2 py-2">
          <QButton size="sm" variant="secondary" @click="close">取消</QButton>
          <QButton size="sm" @click="confirm">确定</QButton>
        </div>
      </div>
    </Teleport>
  </div>
</template>
