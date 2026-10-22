<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    to?: string | Record<string, unknown>
    href?: string
    /** Open external links in new tab */
    external?: boolean
    variant?: 'default' | 'muted' | 'underline'
    disabled?: boolean
  }>(),
  {
    external: false,
    variant: 'default',
    disabled: false,
  },
)

const isExternal = computed(
  () =>
    props.external ||
    Boolean(props.href && /^https?:\/\//i.test(props.href)),
)

const tag = computed(() => {
  if (props.disabled) return 'span'
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const rootClass = computed(() => {
  const variants = {
    default:
      'text-accent-1 hover:underline underline-offset-2',
    muted:
      'text-primary/60 hover:text-primary hover:underline underline-offset-2',
    underline:
      'text-primary underline underline-offset-2 decoration-border hover:decoration-primary/40',
  } as const

  return [
    'q-link inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 rounded-sm',
    variants[props.variant],
    props.disabled ? 'cursor-not-allowed opacity-40 no-underline hover:no-underline' : 'cursor-pointer',
  ]
})
</script>

<template>
  <component
    :is="tag"
    :to="to && !disabled ? to : undefined"
    :href="href && !disabled ? href : undefined"
    :type="tag === 'button' ? 'button' : undefined"
    :target="isExternal && href && !disabled ? '_blank' : undefined"
    :rel="isExternal && href && !disabled ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled || undefined"
    :class="rootClass"
  >
    <slot />
    <QIcon
      v-if="isExternal && !disabled"
      name="external-link"
      size="sm"
      class="opacity-70"
      aria-hidden="true"
    />
  </component>
</template>
