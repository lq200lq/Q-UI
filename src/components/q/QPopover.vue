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
import { useClickOutside } from '../../composables'
import QIconButton from './QIconButton.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    align?: 'start' | 'center' | 'end'
    disabled?: boolean
    closable?: boolean
    closeOnOutside?: boolean
    closeOnEsc?: boolean
  }>(),
  {
    placement: 'bottom',
    align: 'start',
    disabled: false,
    closable: false,
    closeOnOutside: true,
    closeOnEsc: true,
  },
)

const open = defineModel<boolean>('open', { default: false })

const titleId = useId()
const triggerWrapRef = useTemplateRef<HTMLElement>('triggerWrapRef')
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const coords = ref({ top: 0, left: 0 })

useClickOutside(panelRef, (event) => {
  if (!open.value || !props.closeOnOutside) return
  const trigger = triggerWrapRef.value
  if (trigger && event.composedPath().includes(trigger)) return
  close()
})

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

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
  open.value = false
}

async function openPanel() {
  if (props.disabled) return
  open.value = true
  await nextTick()
  await updatePosition()
  panelRef.value?.focus()
}

function toggle() {
  if (open.value) close()
  else void openPanel()
}

function onDocKeydown(event: KeyboardEvent) {
  if (!open.value || !props.closeOnEsc) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('keydown', onDocKeydown, true)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    void nextTick().then(updatePosition)
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

defineExpose({
  open: openPanel,
  hide: close,
  toggle,
})
</script>

<template>
  <div ref="triggerWrapRef" class="q-popover-trigger inline-flex">
    <slot
      name="trigger"
      :open="open"
      :toggle="toggle"
      :show="openPanel"
      :hide="close"
    />
  </div>

  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="panelRef"
      role="dialog"
      :aria-labelledby="title || $slots.title ? titleId : undefined"
      tabindex="-1"
      class="q-popover fixed z-[70] w-72 max-w-[calc(100vw-1rem)] overflow-hidden rounded-lg border border-border bg-surface text-primary shadow-md outline-none"
      :style="style"
    >
      <header
        v-if="title || $slots.title || closable"
        class="flex min-h-10 items-center gap-2 border-b border-border px-3"
      >
        <div
          :id="titleId"
          class="min-w-0 flex-1 font-heading text-sm font-semibold"
        >
          <slot name="title">{{ title }}</slot>
        </div>
        <QIconButton
          v-if="closable"
          label="关闭"
          name="x"
          size="sm"
          @click="close"
        />
      </header>

      <div class="px-3 py-3 text-sm text-primary/80">
        <slot :close="close" />
      </div>

      <footer
        v-if="$slots.footer"
        class="flex min-h-10 items-center gap-2 border-t border-border px-3"
      >
        <slot name="footer" :close="close" />
      </footer>
    </div>
  </Teleport>
</template>
