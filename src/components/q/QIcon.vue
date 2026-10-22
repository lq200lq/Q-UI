<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { icons, type IconName } from './icons'
import type { IconSizeToken } from './icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name: IconName
    /** px number, CSS length, or theme token sm|md|lg|xl */
    size?: number | string | IconSizeToken
    strokeWidth?: number | string
    /** When set, icon is exposed to AT; otherwise decorative */
    label?: string
  }>(),
  {
    size: 'md',
    strokeWidth: undefined,
    label: undefined,
  },
)

const attrs = useAttrs()

const SIZE_TOKEN_VARS: Record<IconSizeToken, string> = {
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
}

const resolvedSize = computed(() => {
  const { size } = props
  if (typeof size === 'number') return `${size}px`
  if (size in SIZE_TOKEN_VARS) return SIZE_TOKEN_VARS[size as IconSizeToken]
  if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`
  return size
})

const resolvedStroke = computed(() => {
  if (props.strokeWidth === undefined || props.strokeWidth === '') {
    return 'var(--icon-stroke)'
  }
  return String(props.strokeWidth)
})

const nodes = computed(() => {
  const def = icons[props.name]
  if (!def) {
    if (import.meta.env.DEV) {
      console.warn(`[QIcon] unknown icon name: "${String(props.name)}"`)
    }
    return []
  }
  return def
})

const a11y = computed(() => {
  if (props.label) {
    return {
      role: 'img' as const,
      'aria-label': props.label,
      'aria-hidden': undefined,
    }
  }
  return {
    role: undefined,
    'aria-label': undefined,
    'aria-hidden': true as const,
  }
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="resolvedSize"
    :height="resolvedSize"
    :stroke-width="resolvedStroke"
    class="q-icon inline-block shrink-0"
    v-bind="{ ...attrs, ...a11y }"
  >
    <template v-for="(node, i) in nodes" :key="i">
      <path v-if="node.tag === 'path'" :d="node.d" />
      <circle
        v-else-if="node.tag === 'circle'"
        :cx="node.cx"
        :cy="node.cy"
        :r="node.r"
      />
      <line
        v-else-if="node.tag === 'line'"
        :x1="node.x1"
        :y1="node.y1"
        :x2="node.x2"
        :y2="node.y2"
      />
      <polyline
        v-else-if="node.tag === 'polyline'"
        :points="node.points"
      />
      <polygon
        v-else-if="node.tag === 'polygon'"
        :points="node.points"
      />
      <rect
        v-else-if="node.tag === 'rect'"
        :x="node.x"
        :y="node.y"
        :width="node.width"
        :height="node.height"
        :rx="node.rx"
      />
    </template>
  </svg>
</template>
