<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { QIcon, iconNames, type IconName } from '../../src/components/q'
import { iconGroups } from './groups'

const query = ref('')
const copied = ref<string | null>(null)

const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return iconGroups
  return iconGroups
    .map((g) => ({
      ...g,
      names: g.names.filter((n) => n.includes(q)),
    }))
    .filter((g) => g.names.length > 0)
})

const visibleCount = computed(() =>
  filteredGroups.value.reduce((n, g) => n + g.names.length, 0),
)

async function copyName(name: IconName) {
  const snippet = `<QIcon name="${name}" />`
  try {
    await navigator.clipboard.writeText(snippet)
    copied.value = name
    window.setTimeout(() => {
      if (copied.value === name) copied.value = null
    }, 1200)
  } catch {
    console.warn('[IconGallery] clipboard write failed')
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <header class="mb-8">
      <RouterLink
        to="/"
        class="mb-4 inline-flex items-center gap-1 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary rounded-md px-1.5 py-0.5 -ml-1.5"
      >
        <QIcon name="chevron-left" size="sm" />
        返回首页
      </RouterLink>
      <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
        QIcon 图标墙
      </h1>
      <p class="mt-2 text-base text-primary/70">
        共 {{ iconNames.length }} 个 · 当前显示 {{ visibleCount }} 个 · 点击复制
        <code class="font-mono text-sm text-accent-1">&lt;QIcon name="…" /&gt;</code>
      </p>
    </header>

    <div class="mb-8">
      <label class="sr-only" for="icon-search">搜索图标</label>
      <div
        class="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 transition-colors duration-150 focus-within:border-primary/30"
      >
        <QIcon name="search" size="sm" class="text-primary/50" />
        <input
          id="icon-search"
          v-model="query"
          type="search"
          placeholder="按名称筛选…"
          class="w-full bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none"
        />
      </div>
    </div>

    <div class="mb-10 flex flex-wrap items-end gap-6 rounded-lg border border-border bg-surface p-4 md:p-6">
      <p class="w-full text-sm font-medium text-primary">尺寸 token</p>
      <div
        v-for="s in (['sm', 'md', 'lg', 'xl'] as const)"
        :key="s"
        class="flex flex-col items-center gap-1 text-primary"
      >
        <QIcon name="smile" :size="s" />
        <span class="font-mono text-xs text-primary/60">{{ s }}</span>
      </div>
      <div class="flex flex-col items-center gap-1 text-accent-1">
        <QIcon name="check-circle" size="lg" />
        <span class="font-mono text-xs">accent-1</span>
      </div>
      <div class="flex flex-col items-center gap-1 text-accent-2">
        <QIcon name="alert-triangle" size="lg" />
        <span class="font-mono text-xs">accent-2</span>
      </div>
    </div>

    <section
      v-for="group in filteredGroups"
      :key="group.title"
      class="mb-10"
    >
      <h2 class="mb-3 font-heading text-lg font-semibold text-primary">
        {{ group.title }}
        <span class="ml-2 text-sm font-normal text-primary/50">{{ group.names.length }}</span>
      </h2>
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <li v-for="name in group.names" :key="name">
          <button
            type="button"
            class="flex w-full flex-col items-center gap-2 rounded-md border border-border bg-surface px-3 py-4 text-primary transition-colors duration-150 hover:bg-hover active:bg-active"
            :aria-label="`复制 ${name}`"
            @click="copyName(name)"
          >
            <QIcon :name="name" size="lg" />
            <span class="font-mono text-xs text-primary/70">{{ name }}</span>
            <span
              class="h-4 text-[10px] text-accent-3"
              :class="copied === name ? 'opacity-100' : 'opacity-0'"
            >
              已复制
            </span>
          </button>
        </li>
      </ul>
    </section>

    <p
      v-if="filteredGroups.length === 0"
      class="rounded-md border border-border bg-surface px-4 py-8 text-center text-sm text-primary/60"
    >
      没有匹配「{{ query }}」的图标
    </p>
  </div>
</template>
