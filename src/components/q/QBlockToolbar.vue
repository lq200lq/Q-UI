<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'
import QTooltip from './QTooltip.vue'

export type QBlockToolbarItem = {
  key: string
  label: string
  icon: IconName
  active?: boolean
  disabled?: boolean
  separator?: boolean
}

const props = withDefaults(
  defineProps<{
    items: QBlockToolbarItem[]
    open?: boolean
    /** Anchor rect from selection; when omitted use x/y */
    x?: number
    y?: number
  }>(),
  {
    open: false,
    x: 0,
    y: 0,
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  action: [item: QBlockToolbarItem]
}>()

const barRef = useTemplateRef<HTMLElement>('barRef')
const coords = ref({ top: 0, left: 0 })

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

async function updatePosition() {
  const bar = barRef.value
  if (!bar) {
    coords.value = {
      top: Math.max(8, props.y - 44),
      left: Math.max(8, props.x),
    }
    return
  }
  const rect = bar.getBoundingClientRect()
  let top = props.y - rect.height - 8
  let left = props.x - rect.width / 2
  top = Math.max(8, top)
  left = Math.min(
    Math.max(8, left),
    window.innerWidth - rect.width - 8,
  )
  coords.value = { top, left }
}

function onAction(item: QBlockToolbarItem) {
  if (item.disabled || item.separator) return
  emit('action', item)
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open) {
    emit('update:open', false)
  }
}

watch(
  () => [props.open, props.x, props.y] as const,
  async ([v]) => {
    if (v) {
      await nextTick()
      await updatePosition()
      document.addEventListener('keydown', onDocKeydown, true)
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    } else {
      document.removeEventListener('keydown', onDocKeydown, true)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown, true)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="barRef"
      role="toolbar"
      aria-label="选区工具条"
      class="q-block-toolbar fixed z-[70] flex items-center gap-0.5 rounded-md border border-border bg-surface p-1 shadow-md"
      :style="style"
    >
      <template v-for="(item, index) in items" :key="item.key || index">
        <div
          v-if="item.separator"
          role="separator"
          class="mx-0.5 h-4 w-px bg-border"
        />
        <QTooltip v-else :content="item.label" placement="top">
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-sm transition-colors duration-150"
            :class="[
              item.disabled
                ? 'cursor-not-allowed text-primary/30'
                : item.active
                  ? 'bg-active text-primary'
                  : 'text-primary/70 hover:bg-hover hover:text-primary',
            ]"
            :disabled="item.disabled"
            :aria-label="item.label"
            :aria-pressed="item.active || undefined"
            @click="onAction(item)"
          >
            <QIcon :name="item.icon" size="sm" />
          </button>
        </QTooltip>
      </template>
    </div>
  </Teleport>
</template>
