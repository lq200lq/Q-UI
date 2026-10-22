<script setup lang="ts">
withDefaults(
  defineProps<{
    cite?: string
  }>(),
  {},
)
</script>

<template>
  <blockquote
    class="q-quote border-l-4 border-border py-1 pl-4 text-sm leading-relaxed text-primary/80"
  >
    <div class="text-primary">
      <slot />
    </div>
    <footer
      v-if="cite || $slots.cite"
      class="mt-2 text-xs text-primary/50"
    >
      <cite class="not-italic">
        <slot name="cite">{{ cite }}</slot>
      </cite>
    </footer>
  </blockquote>
</template>
