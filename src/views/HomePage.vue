<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import { QIcon, QIconButton, QLogo, QTooltip } from '../components/q'
import {
  usePrefersReducedMotion,
  useTheme,
} from '../composables'

const { theme, toggleTheme } = useTheme()
const prefersReducedMotion = usePrefersReducedMotion()

const enter = computed(() =>
  prefersReducedMotion.value
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
      },
)

const themeLabel = computed(() =>
  theme.value === 'dark' ? '切换为亮色主题' : '切换为暗色主题',
)
</script>

<template>
  <div class="relative mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
    <div class="absolute right-4 top-4 md:right-6 md:top-6">
      <QTooltip :content="themeLabel">
        <QIconButton
          :label="themeLabel"
          :name="theme === 'dark' ? 'sun' : 'moon'"
          variant="ghost"
          size="sm"
          @click="toggleTheme"
        />
      </QTooltip>
    </div>

    <motion.header
      :initial="enter.initial"
      :animate="enter.animate"
      :transition="enter.transition"
      class="mb-10"
    >
      <div class="mb-5 flex items-center gap-2.5 text-primary">
        <QLogo class="h-10 w-10" decorative />
        <span class="font-heading text-2xl font-semibold tracking-tight">Q-UI</span>
      </div>
      <h1 class="font-heading text-3xl font-semibold text-primary md:text-4xl">
        Notion Style + Motion
      </h1>
      <p class="mt-3 text-base text-primary/80">
        Vue 3 · Tailwind · motion-v · Q 组件库
      </p>
    </motion.header>

    <motion.section
      :initial="enter.initial"
      :animate="enter.animate"
      :transition="
        prefersReducedMotion
          ? enter.transition
          : { duration: 0.2, delay: 0.05 }
      "
      class="rounded-lg border border-border bg-surface p-4 shadow-sm md:p-6"
    >
      <h2 class="mb-3 font-heading text-lg font-semibold text-primary">
        Examples
      </h2>
      <ul class="space-y-1 text-sm">
        <li>
          <RouterLink
            to="/example/page"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="file-text" size="sm" class="text-accent-1" />
            <span>页面示例</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
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
            <span>组件示例索引</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/components/core"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="layout" size="sm" class="text-accent-1" />
            <span>基础与反馈</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/components/forms"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="edit" size="sm" class="text-accent-1" />
            <span>表单</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/components/blocks"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="file-text" size="sm" class="text-accent-1" />
            <span>文档块</span>
            <QIcon name="chevron-right" size="sm" class="ml-auto text-primary/40" />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/example/components/board"
            class="flex items-center gap-2 rounded-md px-2 py-1.5 text-primary transition-colors duration-150 hover:bg-hover"
          >
            <QIcon name="table" size="sm" class="text-accent-1" />
            <span>看板</span>
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
        目录。导出索引见
        <code class="font-mono text-accent-1">src/components/q/README.md</code>。
      </p>
    </motion.section>
  </div>
</template>
