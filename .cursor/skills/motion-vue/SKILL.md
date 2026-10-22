---
name: motion-vue
description: >-
  Add Motion for Vue (motion-v) animations to Vue 3 projects — enter/exit,
  gestures, scroll, layout, variants, and useAnimate. Use when the user asks
  for motion, animation, transitions, micro-interactions, scroll effects,
  AnimatePresence, or references motion.dev / motion-v.
---

# Motion for Vue (Vue 3)

Official docs: https://motion.dev/docs/vue

Use **`motion-v`** (Motion for Vue). Do not use Framer Motion React APIs or `@vueuse/motion` unless the user explicitly asks.

## Install

```bash
npm install motion-v
```

### Vite + unplugin-vue-components (optional)

```ts
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [MotionResolver()],
    }),
  ],
})
```

`AnimatePresence` is **not** auto-imported — import it manually.

### Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['motion-v/nuxt'],
})
```

## Core import

```ts
import { motion, AnimatePresence, useScroll, useAnimate, useInView, useMotionValue } from 'motion-v'
```

## Workflow: adding motion to the project

1. Ensure `motion-v` is installed (and auto-import/Nuxt module if the project uses them).
2. Prefer declarative `motion.*` props over imperative JS for UI state animations.
3. Pick the smallest API that fits:
   - Enter / state change → `initial` + `animate` + `transition`
   - Hover / press → `whileHover` / `whilePress`
   - Scroll reveal → `whileInView` (+ `inViewOptions`)
   - Mount/unmount → `AnimatePresence` + `exit`
   - Shared element / list reorder → `layout` / `layoutId`
   - Manual sequences → `useAnimate`
4. Keep transitions short for tool UIs (`duration` ~0.15–0.3 or springs). Match existing design skills (e.g. notion-style) when both apply — no flashy scale/float if that style forbids it.
5. Prefer CSS for one-off color/border hover; use Motion when you need interruptible, gesture, layout, or orchestrated animations.

## Recipes

### Enter animation

```vue
<script setup>
import { motion } from 'motion-v'
</script>

<template>
  <motion.button
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.2 }"
  >
    Save
  </motion.button>
</template>
```

Disable enter animation: `:initial="false"`.

### Gestures

```vue
<motion.button
  :whileHover="{ backgroundColor: '#efedea' }"
  :whilePress="{ backgroundColor: '#e3e1db' }"
  :transition="{ duration: 0.15 }"
/>
```

Events: `@hoverStart`, `@hoverEnd`, `@press`, `@pressStart`, `@pressCancel`.

### Scroll-triggered

```vue
<motion.div
  :initial="{ opacity: 0, y: 24 }"
  :whileInView="{ opacity: 1, y: 0 }"
  :inViewOptions="{ once: true, amount: 0.3 }"
  :transition="{ duration: 0.35 }"
/>
```

### Scroll-linked

```vue
<script setup>
import { motion, useScroll } from 'motion-v'
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div class="progress" :style="{ scaleX: scrollYProgress }" />
</template>
```

### Exit + AnimatePresence

```vue
<script setup>
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
const show = ref(true)
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="show"
      key="panel"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    />
  </AnimatePresence>
</template>
```

Rules:
- Put `v-if` / `v-show` on **children**, not on `AnimatePresence`.
- Every direct child needs a stable unique `:key` (prefer `item.id`, not array index).
- Modes: `sync` (default), `wait`, `popLayout`.

### Layout / shared layout

```vue
<motion.div layout />
<motion.div layoutId="underline" />
```

Use `LayoutGroup` when mixing exit + layout list animations.

### Variants (orchestration)

```vue
<script setup>
import { motion } from 'motion-v'
import { stagger } from 'motion-v' // if available in project; else use delayChildren numbers

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', delayChildren: 0.08 },
  },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}
</script>

<template>
  <motion.ul initial="hidden" whileInView="visible" :variants="list">
    <motion.li v-for="n in 3" :key="n" :variants="item" />
  </motion.ul>
</template>
```

Dynamic variants via `:custom` + function variants.

### Custom / primitive components

```ts
import { motion, Motion } from 'motion-v'
// Do NOT call motion.create() inside template/setup that re-runs every render
const MotionCard = motion.create(Card)
```

```vue
<Motion as="button">Click</Motion>
<Motion as-child><button>Click</button></Motion>
```

### Imperative: useAnimate

```vue
<script setup>
import { onMounted } from 'vue'
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()

onMounted(() => {
  animate('li', { opacity: 1 }, { duration: 0.2 })
})
</script>

<template>
  <ul ref="scope">
    <li /><li />
  </ul>
</template>
```

### Performance

- Drive continuous values with `useMotionValue` + `:style`, not Vue `ref`, to avoid re-renders.
- Prefer transforming `x` / `y` / `scale` / `opacity` over layout-thrashing properties when possible.
- SSR: `motion` reflects `initial`/`animate` in server HTML (`:initial="false"` to bake final state).

## Transition defaults (sensible for product UI)

```ts
{ type: 'spring', stiffness: 400, damping: 30 }
// or
{ duration: 0.2, ease: 'easeOut' }
```

Nest per-property transitions when needed:

```vue
:animate="{ opacity: 1, transition: { duration: 0.15 } }"
```

## Do's

- Import from `motion-v`; use Vue 3 `<script setup>`.
- Bind objects with `:` — `:animate="{ ... }"`, not stringified JSON.
- Use `whileHover` / `whilePress` instead of unreliable CSS `:hover` for touch-aware gestures.
- Give `AnimatePresence` children stable keys.
- Reuse variants for parent → child orchestration.

## Don'ts

- Don't use React Framer Motion JSX/`motion/react` in Vue SFCs.
- Don't put `v-if` on `AnimatePresence` itself (breaks exit).
- Don't call `motion.create()` inside the template.
- Don't animate everything — prefer restraint; skip Motion for trivial color toggles.
- Don't fight an active design skill (e.g. notion-style forbidding scale/translate/heavy shadow) unless the user overrides.

## Example prompts this skill serves

- 「给首页加进入动画和滚动显现」
- 「列表删除加 exit 动画」
- 「按钮加按压缩放 / hover」
- 「用 motion-v 做共享布局下划线」

## Reference links

- Get started: https://motion.dev/docs/vue
- Motion component: https://motion.dev/docs/vue-motion-component
- AnimatePresence: https://motion.dev/docs/vue-animate-presence
- Animation / variants: https://motion.dev/docs/vue-animation
- useAnimate: https://motion.dev/docs/vue-use-animate
- Examples: https://examples.motion.dev/vue
