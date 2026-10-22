<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import { QIcon } from '../components/q'
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
    <motion.header
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.2 }"
      class="mb-10"
    >
      <p class="mb-2 text-sm text-primary/60">Dev902</p>
      <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
        Notion Style + Motion
      </h1>
      <p class="mt-3 text-base text-primary/80">
        Vue 3 · Tailwind · motion-v · Q 组件库
      </p>
    </motion.header>

    <motion.section
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.2, delay: 0.05 }"
      class="rounded-lg border border-border bg-surface p-4 shadow-sm md:p-6"
    >
      <h2 class="mb-3 font-heading text-lg font-semibold text-primary">
        Examples
      </h2>
      <ul class="space-y-1 text-sm">
        <li>
          <RouterLink
            to="/example/layout"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="sidebar" size="sm" class="text-accent-1" />
            <span>布局壳</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/components"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="layout" size="sm" class="text-accent-1" />
            <span>全部组件示例</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/icons"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="smile" size="sm" class="text-accent-1" />
            <span>QIcon 图标墙</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
      </ul>

      <p class="mt-4 border-t border-border pt-4 text-sm text-primary/60">
        示例源码在
        <code class="font-mono text-accent-1">example/</code>
        目录。
      </p>
    </motion.section>
  </div>
</template>
