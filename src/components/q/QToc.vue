<script setup lang="ts">
export type QTocItem = {
  id: string
  label: string
  level?: 1 | 2 | 3
}

withDefaults(
  defineProps<{
    items: QTocItem[]
    title?: string
    activeId?: string | null
  }>(),
  {
    title: '目录',
    activeId: null,
  },
)

const emit = defineEmits<{
  select: [item: QTocItem]
}>()

function onSelect(item: QTocItem, event: MouseEvent) {
  event.preventDefault()
  const el = document.getElementById(item.id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  emit('select', item)
}
</script>

<template>
  <nav class="q-toc text-sm" :aria-label="title">
    <p
      v-if="title"
      class="mb-2 text-xs font-medium uppercase tracking-wide text-primary/40"
    >
      {{ title }}
    </p>
    <ul class="m-0 list-none space-y-0.5 p-0">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="block rounded-md py-1 text-primary/65 transition-colors duration-150 hover:bg-hover hover:text-primary"
          :class="[
            (item.level ?? 1) === 1 ? 'px-2 font-medium' : '',
            (item.level ?? 1) === 2 ? 'pl-5 pr-2' : '',
            (item.level ?? 1) >= 3 ? 'pl-8 pr-2 text-xs' : '',
            activeId === item.id ? 'bg-hover font-medium text-primary' : '',
          ]"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click="onSelect(item, $event)"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
