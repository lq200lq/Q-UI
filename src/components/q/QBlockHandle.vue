<script setup lang="ts">
import QIcon from './QIcon.vue'

withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
  }>(),
  {
    label: '拖拽块',
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
  pointerdown: [event: PointerEvent]
}>()
</script>

<template>
  <button
    type="button"
    class="q-block-handle flex h-6 w-5 shrink-0 cursor-grab items-center justify-center rounded-sm text-primary/35 transition-colors duration-150 hover:bg-hover hover:text-primary active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
    :aria-label="label"
    :disabled="disabled"
    @click="emit('click', $event)"
    @pointerdown="emit('pointerdown', $event)"
  >
    <slot>
      <QIcon name="drag-handle" size="sm" />
    </slot>
  </button>
</template>
