<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { QIcon } from '../../src/components/q'
import { componentGalleries } from '../_shared/galleryNav'
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
    <RouterLink
      to="/"
      class="-ml-1.5 mb-4 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary"
    >
      <QIcon name="chevron-left" size="sm" />
      返回首页
    </RouterLink>

    <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
      Q 组件示例
    </h1>
    <p class="mt-2 text-base text-primary/70">
      示例已按主题拆页，避免单页过长。图标全集见
      <RouterLink
        to="/example/icons"
        class="text-accent-1 transition-colors duration-150 hover:underline"
      >
        /example/icons
      </RouterLink>
    </p>

    <ul class="mt-8 space-y-2">
      <li v-for="g in componentGalleries" :key="g.to">
        <RouterLink
          :to="g.to"
          class="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3 transition-colors duration-150 hover:bg-hover"
        >
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-primary">{{ g.label }}</p>
            <p class="mt-0.5 text-xs text-primary/55">{{ g.description }}</p>
          </div>
          <QIcon
            name="chevron-right"
            size="sm"
            class="mt-0.5 shrink-0 text-primary/35"
          />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
