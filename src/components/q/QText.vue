<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * body — 正文
     * muted — 辅助说明
     * caption — 更小的元信息
     * lead — 段落引导句
     * code — 等宽片段
     */
    variant?: 'body' | 'muted' | 'caption' | 'lead' | 'code'
    /** Render as element; default follows variant */
    as?: 'p' | 'span' | 'div' | 'label'
    align?: 'left' | 'center' | 'right'
    truncate?: boolean
    /** Clamp to N lines (1–6); ignores truncate when set */
    clamp?: 1 | 2 | 3 | 4 | 5 | 6
  }>(),
  {
    variant: 'body',
    align: 'left',
    truncate: false,
  },
)

const tag = computed(() => {
  if (props.as) return props.as
  if (props.variant === 'code') return 'span'
  return 'p'
})

const rootClass = computed(() => {
  const variants = {
    body: 'font-body text-sm leading-relaxed text-primary',
    muted: 'font-body text-sm leading-relaxed text-primary/60',
    caption: 'font-body text-xs leading-normal text-primary/55',
    lead: 'font-body text-base leading-relaxed text-primary/80 md:text-lg',
    code: 'font-mono text-xs text-accent-1',
  } as const

  const align = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  } as const

  const clampClass = props.clamp
    ? [
        'overflow-hidden',
        props.clamp === 1
          ? 'line-clamp-1'
          : props.clamp === 2
            ? 'line-clamp-2'
            : props.clamp === 3
              ? 'line-clamp-3'
              : props.clamp === 4
                ? 'line-clamp-4'
                : props.clamp === 5
                  ? 'line-clamp-5'
                  : 'line-clamp-6',
      ]
    : props.truncate
      ? ['truncate']
      : []

  return [
    'q-text',
    variants[props.variant],
    align[props.align],
    ...clampClass,
  ]
})
</script>

<template>
  <component :is="tag" :class="rootClass">
    <slot />
  </component>
</template>
