<script setup lang="ts">
import { computed } from 'vue'
import QAvatar from './QAvatar.vue'
import QBadge from './QBadge.vue'
import QInlineEditable from './QInlineEditable.vue'
import { formatDisplayDate } from './dateUtils'

export type QPropertyType = 'text' | 'select' | 'people' | 'date'

export type QPropertyPerson = {
  id: string
  name: string
  src?: string
}

export type QPropertyOption = {
  value: string
  label: string
  color?: string
}

const props = withDefaults(
  defineProps<{
    label: string
    type?: QPropertyType
    /** text value */
    modelValue?: string | null
    options?: QPropertyOption[]
    people?: QPropertyPerson[]
    editable?: boolean
  }>(),
  {
    type: 'text',
    modelValue: null,
    editable: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const selectedOption = computed(() =>
  props.options?.find((o) => o.value === props.modelValue),
)

const displayDate = computed(() => formatDisplayDate(props.modelValue))

function onTextCommit(value: string) {
  emit('update:modelValue', value || null)
}
</script>

<template>
  <div class="q-property grid grid-cols-[100px_1fr] items-start gap-3 py-1.5">
    <div class="truncate pt-0.5 text-xs font-medium text-primary/45">
      {{ label }}
    </div>
    <div class="min-w-0 text-sm text-primary">
      <template v-if="type === 'text'">
        <QInlineEditable
          v-if="editable"
          :model-value="modelValue ?? ''"
          empty-label="空"
          @update:model-value="onTextCommit"
        />
        <span v-else :class="modelValue ? '' : 'text-primary/35'">
          {{ modelValue || '空' }}
        </span>
      </template>

      <template v-else-if="type === 'select'">
        <QBadge
          v-if="selectedOption"
          size="sm"
          :style="
            selectedOption.color
              ? {
                  backgroundColor: `${selectedOption.color}22`,
                  color: selectedOption.color,
                  borderColor: `${selectedOption.color}55`,
                }
              : undefined
          "
        >
          {{ selectedOption.label }}
        </QBadge>
        <span v-else class="text-primary/35">空</span>
      </template>

      <template v-else-if="type === 'people'">
        <div v-if="people?.length" class="flex flex-wrap items-center gap-1.5">
          <span
            v-for="person in people"
            :key="person.id"
            class="inline-flex items-center gap-1 rounded-md bg-hover px-1.5 py-0.5 text-xs"
          >
            <QAvatar :name="person.name" :src="person.src" size="sm" />
            {{ person.name }}
          </span>
        </div>
        <span v-else class="text-primary/35">空</span>
      </template>

      <template v-else-if="type === 'date'">
        <span :class="displayDate ? '' : 'text-primary/35'">
          {{ displayDate || '空' }}
        </span>
      </template>

      <slot />
    </div>
  </div>
</template>
