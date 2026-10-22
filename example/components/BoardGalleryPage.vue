<script setup lang="ts">
import { ref } from 'vue'
import {
  QBadge,
  QBoard,
  QBoardCard,
  QBoardColumn,
  QProperty,
  type QPropertyOption,
  type QPropertyPerson,
} from '../../src/components/q'
import { toast } from '../../src/composables'
import ExampleBlock from '../_shared/ExampleBlock.vue'
import ExampleGalleryShell from '../_shared/ExampleGalleryShell.vue'
import * as snippets from './snippets'

const propTitle = ref('组件库清单')
const statusOptions: QPropertyOption[] = [
  { value: 'todo', label: '待办', color: '#e8e7e4' },
  { value: 'doing', label: '进行中', color: '#f2994a' },
  { value: 'done', label: '完成', color: '#27ae60' },
]
const people: QPropertyPerson[] = [
  { id: 'ada', name: 'Ada' },
  { id: 'alan', name: 'Alan' },
]

const navItems = [
  { id: 'q-board', label: 'QBoard' },
  { id: 'q-property', label: 'QProperty' },
] as const
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

    <ExampleBlock
      id="q-property"
      title="QProperty"
      description="文本 / 选择 / 多人 / 日期属性行"
      :code="snippets.property"
    >
      <div class="w-full max-w-md rounded-md border border-border bg-surface px-3 py-2">
        <QProperty
          v-model="propTitle"
          label="标题"
          type="text"
          editable
        />
        <QProperty
          label="状态"
          type="select"
          model-value="doing"
          :options="statusOptions"
        />
        <QProperty label="负责人" type="people" :people="people" />
        <QProperty label="截止日期" type="date" model-value="2026-10-22" />
      </div>
    </ExampleBlock>
  </ExampleGalleryShell>
</template>
