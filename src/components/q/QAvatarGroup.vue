<script setup lang="ts">
import { computed } from 'vue'
import QAvatar from './QAvatar.vue'

export type QAvatarGroupItem = {
  name?: string
  src?: string
  alt?: string
  color?: 'neutral' | 'blue' | 'green' | 'orange' | 'purple' | 'red'
}

const props = withDefaults(
  defineProps<{
    items: QAvatarGroupItem[]
    size?: 'sm' | 'md' | 'lg'
    /** Max avatars before +N overflow chip */
    max?: number
  }>(),
  {
    size: 'md',
    max: 4,
  },
)

const visible = computed(() => props.items.slice(0, props.max))
const overflow = computed(() => Math.max(0, props.items.length - props.max))

const overlapClass = computed(() => {
  const map = {
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5',
  } as const
  return map[props.size]
})

const overflowClass = computed(() => {
  const map = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  } as const
  return map[props.size]
})
</script>

<template>
  <div
    class="q-avatar-group inline-flex items-center"
    :class="overlapClass"
    role="group"
  >
    <QAvatar
      v-for="(item, i) in visible"
      :key="`${item.name ?? item.src ?? i}`"
      :name="item.name"
      :src="item.src"
      :alt="item.alt"
      :color="item.color"
      :size="size"
      class="ring-2 ring-surface"
    />
    <span
      v-if="overflow > 0"
      class="relative inline-flex shrink-0 items-center justify-center rounded-full bg-active font-medium text-primary/60 ring-2 ring-surface select-none"
      :class="overflowClass"
      :aria-label="`还有 ${overflow} 人`"
    >
      +{{ overflow }}
    </span>
  </div>
</template>
