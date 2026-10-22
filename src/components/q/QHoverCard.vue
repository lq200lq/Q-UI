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

const props = withDefaults(
  defineProps<{
    title?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    align?: 'start' | 'center' | 'end'
    disabled?: boolean
    openDelay?: number
    closeDelay?: number
  }>(),
  {
    placement: 'bottom',
    align: 'start',
    disabled: false,
    openDelay: 200,
    closeDelay: 150,
  },
)

const open = defineModel<boolean>('open', { default: false })

const titleId = useId()
const triggerWrapRef = useTemplateRef<HTMLElement>('triggerWrapRef')
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const coords = ref({ top: 0, left: 0 })
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

function clearTimers() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

async function updatePosition() {
  const trigger = triggerWrapRef.value
  const panel = panelRef.value
  if (!trigger || !panel) return

  const rect = trigger.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()
  const gap = 6
  const pad = 8

  let top = 0
  let left = 0

  const alignX = () => {
    if (props.align === 'end') return rect.right - panelRect.width
    if (props.align === 'center')
      return rect.left + rect.width / 2 - panelRect.width / 2
    return rect.left
  }

  const alignY = () => {
    if (props.align === 'end') return rect.bottom - panelRect.height
    if (props.align === 'center')
      return rect.top + rect.height / 2 - panelRect.height / 2
    return rect.top
  }

  switch (props.placement) {
    case 'top':
      top = rect.top - panelRect.height - gap
      left = alignX()
      break
    case 'left':
      top = alignY()
      left = rect.left - panelRect.width - gap
      break
    case 'right':
      top = alignY()
      left = rect.right + gap
      break
    case 'bottom':
    default:
      top = rect.bottom + gap
      left = alignX()
      break
  }

  left = Math.min(
    Math.max(pad, left),
    window.innerWidth - panelRect.width - pad,
  )
  top = Math.min(
    Math.max(pad, top),
    window.innerHeight - panelRect.height - pad,
  )

  coords.value = { top, left }
}

function close() {
  clearTimers()
  open.value = false
}

async function openPanel() {
  if (props.disabled) return
  clearTimers()
  open.value = true
  await nextTick()
  await updatePosition()
}

function scheduleOpen() {
  if (props.disabled) return
  clearTimers()
  if (open.value) return
  openTimer = setTimeout(() => {
    void openPanel()
  }, props.openDelay)
}

function scheduleClose() {
  clearTimers()
  closeTimer = setTimeout(() => {
    open.value = false
  }, props.closeDelay)
}

watch(open, (v) => {
  if (v) {
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    void nextTick().then(updatePosition)
  } else {
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }
})

onUnmounted(() => {
  clearTimers()
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})

defineExpose({
  open: openPanel,
  hide: close,
})
</script>

<template>
  <div
    ref="triggerWrapRef"
    class="q-hover-card-trigger inline-flex"
    @mouseenter="scheduleOpen"
    @mouseleave="scheduleClose"
    @focusin="scheduleOpen"
    @focusout="scheduleClose"
  >
    <slot name="trigger" :open="open" />
  </div>

  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="panelRef"
      role="dialog"
      :aria-labelledby="title || $slots.title ? titleId : undefined"
      class="q-hover-card fixed z-[70] w-72 max-w-[calc(100vw-1rem)] overflow-hidden rounded-lg border border-border bg-surface text-primary shadow-md outline-none"
      :style="style"
      @mouseenter="scheduleOpen"
      @mouseleave="scheduleClose"
    >
      <header
        v-if="title || $slots.title"
        class="flex min-h-10 items-center gap-2 border-b border-border px-3"
      >
        <div
          :id="titleId"
          class="min-w-0 flex-1 font-heading text-sm font-semibold"
        >
          <slot name="title">{{ title }}</slot>
        </div>
      </header>

      <div class="px-3 py-3 text-sm text-primary/80">
        <slot />
      </div>

      <footer
        v-if="$slots.footer"
        class="flex min-h-10 items-center gap-2 border-t border-border px-3"
      >
        <slot name="footer" />
      </footer>
    </div>
  </Teleport>
</template>
