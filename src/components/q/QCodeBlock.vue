<script setup lang="ts">
import { computed, ref } from 'vue'
import QIconButton from './QIconButton.vue'

const props = withDefaults(
  defineProps<{
    code: string
    language?: string
    /** Show copy button */
    copyable?: boolean
  }>(),
  {
    language: '',
    copyable: true,
  },
)

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const label = computed(() => props.language || 'code')

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div
    class="q-code-block group relative overflow-hidden rounded-md border border-border bg-page"
  >
    <div
      class="flex items-center justify-between border-b border-border px-3 py-1.5"
    >
      <span class="text-[11px] font-medium uppercase tracking-wide text-primary/45">
        {{ label }}
      </span>
      <QIconButton
        v-if="copyable"
        :label="copied ? '已复制' : '复制代码'"
        :name="copied ? 'check' : 'copy'"
        size="sm"
        @click="copy"
      />
    </div>
    <pre
      class="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-primary"
    ><code>{{ code }}</code></pre>
  </div>
</template>
