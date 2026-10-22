<script setup lang="ts">
import {
  QBadge,
  QBoard,
  QBoardCard,
  QBoardColumn,
} from '../../src/components/q'
import { toast } from '../../src/composables'
import ExampleBlock from '../_shared/ExampleBlock.vue'
import ExampleGalleryShell from '../_shared/ExampleGalleryShell.vue'
import * as snippets from './snippets'

const navItems = [{ id: 'q-board', label: 'QBoard' }] as const
</script>

<template>
  <ExampleGalleryShell
    title="看板示例"
    description="Board、属性、筛选与数据库表"
    :nav-items="navItems"
  >
    <ExampleBlock
      id="q-board"
      title="QBoard · QBoardColumn · QBoardCard"
      description="横向看板列；卡片可挂 meta"
      :code="snippets.board"
    >
      <QBoard>
        <QBoardColumn title="待办" :count="2">
          <QBoardCard
            title="写规格"
            description="补齐验收标准"
            @click="toast('打开：写规格')"
          >
            <template #meta>
              <QBadge size="sm" variant="neutral">文档</QBadge>
            </template>
          </QBoardCard>
          <QBoardCard title="评审日历" @click="toast('打开：评审日历')" />
        </QBoardColumn>
        <QBoardColumn title="进行中" :count="1">
          <QBoardCard
            title="组件库"
            description="P2 文档块与看板"
            @click="toast('打开：组件库')"
          >
            <template #meta>
              <QBadge size="sm" variant="warning" dot>进行中</QBadge>
            </template>
          </QBoardCard>
        </QBoardColumn>
        <QBoardColumn title="完成" :count="1">
          <QBoardCard title="拆分示例页" @click="toast('打开：拆分示例页')" />
        </QBoardColumn>
      </QBoard>
    </ExampleBlock>
  </ExampleGalleryShell>
</template>
