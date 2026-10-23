<script setup lang="ts">
import { computed, ref } from 'vue'
import { QIcon, QIconButton } from '../../src/components/q'
import { useDisclosure } from '../../src/composables'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    code: string
    /** Anchor id for in-page TOC jump */
    id?: string
    /** Start with code panel open */
    defaultOpen?: boolean
  }>(),
  {
    defaultOpen: false,
  },
)

const { open, toggle } = useDisclosure({
  initial: props.defaultOpen,
})

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const normalizedCode = computed(() =>
  props.code.replace(/^\n/, '').replace(/\n$/, ''),
)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(normalizedCode.value)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    console.warn('[ExampleBlock] clipboard write failed')
  }
}

function onToggleCode() {
  toggle()
}
</script>

<template>
  <section
    :id="id"
    class="example-block mb-10 scroll-mt-8"
  >
    <header class="mb-3">
      <h2 class="font-heading text-lg font-semibold text-primary">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-1 text-sm text-primary/60">
        {{ description }}
      </p>
    </header>

    <div class="overflow-hidden rounded-lg bg-surface shadow-sm">
      <!-- Preview -->
      <div class="p-4 md:p-6">
        <slot />
      </div>

      <!-- Code chrome -->
      <div class="border-t border-border">
        <div class="flex items-center gap-1 px-2 py-1.5">
          <button
            type="button"
            class="inline-flex flex-1 items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-primary/70 transition-colors duration-150 hover:bg-hover hover:text-primary"
            :aria-expanded="open"
            @click="onToggleCode"
          >
            <QIcon
              name="chevron-right"
              size="sm"
              class="transition-transform duration-150"
              :class="open ? 'rotate-90' : ''"
            />
            {{ open ? '收起代码' : '查看代码' }}
          </button>
          <QIconButton
            :label="copied ? '已复制' : '复制代码'"
            :name="copied ? 'check' : 'copy'"
            size="sm"
            :class="copied ? 'text-accent-3' : undefined"
            @click="copyCode"
          />
        </div>

        <div
          v-show="open"
          class="border-t border-border bg-page/80"
        >
          <pre
            class="max-h-80 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed text-primary/85 md:text-[13px]"
          ><code>{{ normalizedCode }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
