<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useTemplateRef } from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'

const props = withDefaults(
  defineProps<{
    content: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    /** Delay before show (ms) */
    delay?: number
    disabled?: boolean
  }>(),
  {
    placement: 'top',
    delay: 200,
    disabled: false,
  },
)

const open = ref(false)
const triggerRef = useTemplateRef<HTMLElement>('triggerRef')
const tipRef = useTemplateRef<HTMLElement>('tipRef')
const coords = ref({ top: 0, left: 0 })
let showTimer: ReturnType<typeof setTimeout> | undefined

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

function clearTimer() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = undefined
  }
}

async function updatePosition() {
  const trigger = triggerRef.value
  const tip = tipRef.value
  if (!trigger || !tip) return

  const rect = trigger.getBoundingClientRect()
  const tipRect = tip.getBoundingClientRect()
  const gap = 8

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'bottom':
      top = rect.bottom + gap
      left = rect.left + rect.width / 2 - tipRect.width / 2
      break
    case 'left':
      top = rect.top + rect.height / 2 - tipRect.height / 2
      left = rect.left - tipRect.width - gap
      break
    case 'right':
      top = rect.top + rect.height / 2 - tipRect.height / 2
      left = rect.right + gap
      break
    case 'top':
    default:
      top = rect.top - tipRect.height - gap
      left = rect.left + rect.width / 2 - tipRect.width / 2
      break
  }

  const pad = 8
  left = Math.min(Math.max(pad, left), window.innerWidth - tipRect.width - pad)
  top = Math.min(Math.max(pad, top), window.innerHeight - tipRect.height - pad)

  coords.value = { top, left }
}

function show() {
  if (props.disabled || !props.content) return
  clearTimer()
  showTimer = setTimeout(async () => {
    open.value = true
    await nextTick()
    await updatePosition()
  }, props.delay)
}

function hide() {
  clearTimer()
  open.value = false
}

onUnmounted(clearTimer)
</script>

<template>
  <span
    ref="triggerRef"
    class="q-tooltip-trigger inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </span>

  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="tipRef"
      role="tooltip"
      class="q-tooltip pointer-events-none fixed z-[70] max-w-xs rounded-md border border-border bg-primary px-2 py-1 text-xs text-secondary shadow-sm"
      :style="style"
    >
      {{ content }}
    </div>
  </Teleport>
</template>
