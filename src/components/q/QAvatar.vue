<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    src?: string
    /** Used for alt text and initials fallback */
    name?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg'
    /** Soft tint when showing initials */
    color?: 'neutral' | 'blue' | 'green' | 'orange' | 'purple' | 'red'
  }>(),
  {
    size: 'md',
    color: 'neutral',
  },
)

const imgFailed = ref(false)

watch(
  () => props.src,
  () => {
    imgFailed.value = false
  },
)

const showImage = computed(() => Boolean(props.src) && !imgFailed.value)

const initials = computed(() => {
  const raw = (props.name ?? '').trim()
  if (!raw) return ''
  const parts = raw.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
  }
  return raw.slice(0, 2).toUpperCase()
})

const sizeClass = computed(() => {
  const map = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  } as const
  return map[props.size]
})

const colorClass = computed(() => {
  const map = {
    neutral: 'bg-active text-primary/70',
    blue: 'bg-accent-1/20 text-accent-1',
    green: 'bg-accent-3/20 text-accent-3',
    orange: 'bg-accent-2/20 text-accent-2',
    purple: 'bg-accent-4/20 text-accent-4',
    red: 'bg-danger/15 text-danger',
  } as const
  return map[props.color]
})

const iconSize = computed(() => (props.size === 'lg' ? 'md' : 'sm'))
</script>

<template>
  <span
    class="q-avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium select-none"
    :class="[sizeClass, showImage ? 'bg-hover' : colorClass]"
    :title="name || alt || undefined"
    role="img"
    :aria-label="alt || name || 'Avatar'"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="alt || name || ''"
      class="h-full w-full object-cover"
      draggable="false"
      @error="imgFailed = true"
    />
    <span v-else-if="initials" aria-hidden="true">{{ initials }}</span>
    <QIcon
      v-else
      name="user"
      :size="iconSize"
      class="opacity-60"
      aria-hidden="true"
    />
  </span>
</template>
