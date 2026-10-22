<script setup lang="ts">
import { computed, onUnmounted, useId, useTemplateRef, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useBodyScrollLock, useFocusTrap } from '../../composables'
import QIconButton from './QIconButton.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    side?: 'left' | 'right'
    size?: 'sm' | 'md' | 'lg'
    closable?: boolean
    closeOnOverlay?: boolean
    closeOnEsc?: boolean
  }>(),
  {
    side: 'right',
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
  },
)

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  close: []
}>()

const titleId = useId()
const descId = useId()
const panelRef = useTemplateRef<HTMLElement>('panelRef')

useBodyScrollLock(open)
useFocusTrap(panelRef, open)

const sizeClass = computed(() => {
  const map = {
    sm: 'w-full max-w-xs',
    md: 'w-full max-w-sm',
    lg: 'w-full max-w-md',
  } as const
  return map[props.size]
})

const sideClass = computed(() =>
  props.side === 'left'
    ? 'left-0 border-r border-border'
    : 'right-0 border-l border-border',
)

const slideX = computed(() => (props.side === 'left' ? '-100%' : '100%'))

const slideTransition = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }

function requestClose() {
  if (!open.value) return
  open.value = false
  emit('close')
}

function onOverlayClick() {
  if (props.closeOnOverlay) requestClose()
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape' && props.closeOnEsc) {
    event.stopPropagation()
    requestClose()
  }
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('keydown', onKeydown, true)
  } else {
    document.removeEventListener('keydown', onKeydown, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown, true)
})
</script>

<template>
  <Teleport :to="OVERLAY_ROOT">
    <AnimatePresence>
      <motion.div
        v-if="open"
        key="q-drawer-overlay"
        class="q-drawer-overlay fixed inset-0 z-50 bg-primary/25"
        aria-hidden="true"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.15 }"
        @click="onOverlayClick"
      />
    </AnimatePresence>

    <AnimatePresence>
      <motion.aside
        v-if="open"
        key="q-drawer-panel"
        role="presentation"
        class="q-drawer fixed inset-y-0 z-[51] flex max-h-full flex-col bg-surface text-primary shadow-md"
        :class="[sizeClass, sideClass]"
        :initial="{ x: slideX }"
        :animate="{ x: 0 }"
        :exit="{ x: slideX }"
        :transition="slideTransition"
      >
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title || $slots.title ? titleId : undefined"
          :aria-describedby="description || $slots.description ? descId : undefined"
          tabindex="-1"
          class="flex h-full min-h-0 flex-col outline-none"
        >
          <header
            v-if="title || $slots.title || closable"
            class="flex min-h-12 shrink-0 items-center gap-2 border-b border-border px-4 md:px-5"
          >
            <div
              :id="titleId"
              class="min-w-0 flex-1 font-heading text-base font-semibold"
            >
              <slot name="title">{{ title }}</slot>
            </div>
            <QIconButton
              v-if="closable"
              label="关闭"
              name="x"
              size="sm"
              @click="requestClose"
            />
          </header>

          <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5">
            <p
              v-if="description || $slots.description"
              :id="descId"
              class="mb-3 text-sm text-primary/70"
            >
              <slot name="description">{{ description }}</slot>
            </p>
            <slot :close="requestClose" />
          </div>

          <footer
            v-if="$slots.footer"
            class="flex min-h-12 shrink-0 items-center gap-2 border-t border-border px-4 md:px-5"
          >
            <slot name="footer" :close="requestClose" />
          </footer>
        </div>
      </motion.aside>
    </AnimatePresence>
  </Teleport>
</template>
