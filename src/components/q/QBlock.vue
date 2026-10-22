<script setup lang="ts">
import { ref } from 'vue'
import QBlockHandle from './QBlockHandle.vue'

withDefaults(
  defineProps<{
    /** Show drag handle on hover / focus-within */
    draggableHandle?: boolean
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    draggableHandle: true,
    selected: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  handleClick: [event: MouseEvent]
  handlePointerdown: [event: PointerEvent]
}>()

const hovered = ref(false)
</script>

<template>
  <div
    class="q-block group relative rounded-md transition-colors duration-150"
    :class="[
      selected ? 'bg-active/80 ring-1 ring-border' : 'hover:bg-hover/50',
      disabled ? 'pointer-events-none opacity-50' : '',
    ]"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      v-if="draggableHandle"
      class="absolute -left-7 top-0.5 flex opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      :class="selected || hovered ? 'opacity-100' : ''"
    >
      <slot name="handle">
        <QBlockHandle
          :disabled="disabled"
          @click="emit('handleClick', $event)"
          @pointerdown="emit('handlePointerdown', $event)"
        />
      </slot>
    </div>

    <div class="q-block-content min-w-0 px-1 py-0.5">
      <slot />
    </div>
  </div>
</template>
