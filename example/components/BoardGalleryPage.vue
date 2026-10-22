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
  QFilterBar,
  QSortMenu,
  type QSortOption,
  QViewTabs,
  type QViewTabItem,
  QDatabaseTable,
  type QDatabaseColumn,
  type QDatabaseRow,
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

const view = ref('table')
const filterQuery = ref('')
const sort = ref<string | null>('updated')
const viewItems: QViewTabItem[] = [
  { value: 'table', label: '表格' },
  { value: 'board', label: '看板' },
  { value: 'list', label: '列表' },
]
const sortOptions: QSortOption[] = [
  { value: 'updated', label: '最近更新' },
  { value: 'name', label: '名称' },
  { value: 'created', label: '创建时间' },
]

const dbSelected = ref<string | null>('1')
const dbColumns: QDatabaseColumn[] = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态', width: '100px' },
  { key: 'owner', label: '负责人', width: '100px' },
]
const dbRows: QDatabaseRow[] = [
  {
    id: '1',
    cells: { name: '产品规格', status: '进行中', owner: 'Ada' },
  },
  {
    id: '2',
    cells: { name: '设计系统', status: '待办', owner: 'Alan' },
  },
  {
    id: '3',
    cells: { name: '发布清单', status: '完成', owner: 'Grace' },
  },
]

const navItems = [
  { id: 'q-board', label: 'QBoard' },
  { id: 'q-property', label: 'QProperty' },
  { id: 'q-filter-bar', label: 'Filter · Sort · Views' },
  { id: 'q-database-table', label: 'QDatabaseTable' },
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

    <ExampleBlock
      id="q-filter-bar"
      title="QFilterBar · QSortMenu · QViewTabs"
      description="视图切换 + 搜索筛选 + 排序菜单"
      :code="snippets.filterBar"
    >
      <div class="w-full max-w-xl space-y-3">
        <QViewTabs v-model="view" :items="viewItems" />
        <QFilterBar v-model:query="filterQuery" placeholder="筛选任务…">
          <QSortMenu v-model="sort" :options="sortOptions" />
        </QFilterBar>
        <p class="text-xs text-primary/55">
          视图 {{ view }} · 查询「{{ filterQuery || '空' }}」 · 排序
          {{ sort }}
        </p>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-database-table"
      title="QDatabaseTable"
      description="在 Table 之上加选中与行操作"
      :code="snippets.databaseTable"
    >
      <div class="w-full max-w-xl overflow-hidden rounded-md border border-border">
        <QDatabaseTable
          v-model:selected-id="dbSelected"
          :columns="dbColumns"
          :rows="dbRows"
          @row-action="(row) => toast(`行操作：${row.cells.name}`)"
        />
      </div>
    </ExampleBlock>
  </ExampleGalleryShell>
</template>
