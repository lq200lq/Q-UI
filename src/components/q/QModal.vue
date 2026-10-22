<script setup lang="ts">
import { computed, onUnmounted, useId, useTemplateRef, watch } from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useBodyScrollLock, useFocusTrap } from '../../composables'
import QIconButton from './QIconButton.vue'

const props = withDefaults(
  defineProps<{
    /** Dialog title (also drives aria-labelledby when no title slot) */
    title?: string
    description?: string
    size?: 'sm' | 'md' | 'lg'
    /** Show header close (X) button */
    closable?: boolean
    closeOnOverlay?: boolean
    closeOnEsc?: boolean
  }>(),
  {
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
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  } as const
  return map[props.size]
})

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
    <div
      v-if="open"
      class="q-modal-root fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        class="absolute inset-0 bg-primary/25 transition-opacity duration-150"
        aria-hidden="true"
        @click="onOverlayClick"
      />

      <div
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title || $slots.title ? titleId : undefined"
        :aria-describedby="description || $slots.description ? descId : undefined"
        tabindex="-1"
        class="q-modal relative z-10 flex w-full flex-col overflow-hidden rounded-lg border border-border bg-surface text-primary shadow-md outline-none"
        :class="sizeClass"
      >
        <header
          v-if="title || $slots.title || closable"
          class="flex min-h-12 shrink-0 items-center gap-2 border-b border-border px-4 md:px-6"
        >
          <div :id="titleId" class="min-w-0 flex-1 font-heading text-base font-semibold">
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

        <div class="px-4 py-4 md:px-6">
          <p
            v-if="description || $slots.description"
            :id="descId"
            class="mb-3 text-sm text-primary/70"
          >
            <slot name="description">{{ description }}</slot>
          </p>
          <slot />
        </div>

        <footer
          v-if="$slots.footer"
          class="flex min-h-12 shrink-0 items-center gap-2 border-t border-border px-4 md:px-6"
        >
          <slot name="footer" :close="requestClose" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>
