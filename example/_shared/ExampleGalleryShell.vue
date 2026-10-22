<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { QIcon } from '../../src/components/q'
import { componentGalleries } from './galleryNav'

const props = defineProps<{
  title: string
  description?: string
  navItems?: ReadonlyArray<{ id: string; label: string }>
}>()

const route = useRoute()
const activeId = ref('')
let observer: IntersectionObserver | undefined

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeId.value = id
  history.replaceState(null, '', `#${id}`)
}

function bindObserver(ids: ReadonlyArray<string>) {
  observer?.disconnect()
  if (ids.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const top = visible[0]
      if (top?.target.id) activeId.value = top.target.id
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
  )

  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
}

onMounted(async () => {
  await nextTick()
  const ids = props.navItems?.map((i) => i.id) ?? []
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  if (hash && document.getElementById(hash)) {
    activeId.value = hash
    document.getElementById(hash)?.scrollIntoView()
  } else if (ids[0]) {
    activeId.value = ids[0]
  }
  bindObserver(ids)
})

watch(
  () => props.navItems,
  async (items) => {
    await nextTick()
    bindObserver(items?.map((i) => i.id) ?? [])
  },
)

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="min-h-screen" :class="navItems?.length ? 'md:pl-56' : ''">
    <aside
      v-if="navItems?.length"
      class="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r border-border bg-page md:flex"
      aria-label="组件目录"
    >
      <div class="shrink-0 border-b border-border px-4 py-4">
        <RouterLink
          to="/example/components"
          class="-ml-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary"
        >
          <QIcon name="chevron-left" size="sm" />
          组件索引
        </RouterLink>
        <p class="mt-3 text-xs font-medium uppercase tracking-wide text-primary/40">
          本页目录
        </p>
      </div>
      <nav class="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <ul class="flex flex-col gap-0.5">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150"
              :class="
                activeId === item.id
                  ? 'bg-hover font-medium text-primary'
                  : 'text-primary/65 hover:bg-hover hover:text-primary'
              "
              :aria-current="activeId === item.id ? 'location' : undefined"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <header class="mb-8">
        <RouterLink
          to="/example/components"
          class="-ml-1.5 mb-4 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary"
        >
          <QIcon name="chevron-left" size="sm" />
          组件索引
        </RouterLink>
        <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
          {{ title }}
        </h1>
        <p v-if="description" class="mt-2 text-base text-primary/70">
          {{ description }}
        </p>

        <nav class="mt-5 flex flex-wrap gap-1.5" aria-label="示例分类">
          <RouterLink
            v-for="g in componentGalleries"
            :key="g.to"
            :to="g.to"
            class="rounded-md px-2.5 py-1 text-sm transition-colors duration-150"
            :class="
              route.path === g.to
                ? 'bg-active font-medium text-primary'
                : 'text-primary/60 hover:bg-hover hover:text-primary'
            "
          >
            {{ g.label }}
          </RouterLink>
        </nav>
      </header>

      <nav
        v-if="navItems?.length"
        class="mb-8 flex gap-2 overflow-x-auto pb-1 md:hidden"
        aria-label="本页目录（移动）"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="shrink-0 rounded-md border border-border px-2.5 py-1 text-xs transition-colors duration-150"
          :class="
            activeId === item.id
              ? 'border-primary/20 bg-hover font-medium text-primary'
              : 'text-primary/60 hover:bg-hover'
          "
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <slot />
    </div>
  </div>
</template>
