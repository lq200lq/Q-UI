<script setup lang="ts">
import QIconButton from './QIconButton.vue'
import QTable from './QTable.vue'
import QTableBody from './QTableBody.vue'
import QTableHead from './QTableHead.vue'
import QTableRow from './QTableRow.vue'
import QTableTd from './QTableTd.vue'
import QTableTh from './QTableTh.vue'

export type QDatabaseColumn = {
  key: string
  label: string
  width?: string
}

export type QDatabaseRow = {
  id: string
  cells: Record<string, string>
}

withDefaults(
  defineProps<{
    columns: QDatabaseColumn[]
    rows: QDatabaseRow[]
    /** Selected row id */
    selectedId?: string | null
    showRowActions?: boolean
  }>(),
  {
    selectedId: null,
    showRowActions: true,
  },
)

const emit = defineEmits<{
  'update:selectedId': [id: string | null]
  rowClick: [row: QDatabaseRow]
  rowAction: [row: QDatabaseRow]
}>()

function onRowClick(row: QDatabaseRow) {
  emit('update:selectedId', row.id)
  emit('rowClick', row)
}

function onAction(row: QDatabaseRow, event: MouseEvent) {
  event.stopPropagation()
  emit('rowAction', row)
}
</script>

<template>
  <QTable class="q-database-table w-full">
    <QTableHead>
      <QTableRow :hoverable="false">
        <QTableTh
          v-for="col in columns"
          :key="col.key"
          :style="col.width ? { width: col.width } : undefined"
        >
          {{ col.label }}
        </QTableTh>
        <QTableTh v-if="showRowActions" align="right" class="w-10">
          <span class="sr-only">操作</span>
        </QTableTh>
      </QTableRow>
    </QTableHead>
    <QTableBody>
      <QTableRow
        v-for="row in rows"
        :key="row.id"
        :active="selectedId === row.id"
        @click="onRowClick(row)"
      >
        <QTableTd v-for="col in columns" :key="col.key">
          <slot
            :name="`cell-${col.key}`"
            :row="row"
            :value="row.cells[col.key]"
          >
            {{ row.cells[col.key] ?? '' }}
          </slot>
        </QTableTd>
        <QTableTd v-if="showRowActions" align="right">
          <QIconButton
            label="行操作"
            name="more-horizontal"
            size="sm"
            @click="onAction(row, $event)"
          />
        </QTableTd>
      </QTableRow>
    </QTableBody>
  </QTable>
</template>
