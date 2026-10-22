<script setup lang="ts">
import { computed, useId } from 'vue'
import QLabel from './QLabel.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    required?: boolean
    /** Associate with control id; auto-generated when omitted */
    inputId?: string
  }>(),
  {
    required: false,
  },
)

const autoId = useId()
const controlId = computed(() => props.inputId ?? autoId)
const descriptionId = computed(() =>
  props.description ? `${controlId.value}-desc` : undefined,
)
const errorId = computed(() => (props.error ? `${controlId.value}-err` : undefined))
const describedBy = computed(() =>
  [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined,
)
</script>

<template>
  <div class="q-field w-full">
    <QLabel v-if="label" :html-for="controlId" :required="required">
      {{ label }}
    </QLabel>
    <div
      :data-invalid="error ? '' : undefined"
    >
      <slot
        :id="controlId"
        :described-by="describedBy"
        :invalid="Boolean(error)"
      />
    </div>
    <p
      v-if="description && !error"
      :id="descriptionId"
      class="mt-1.5 text-xs text-primary/55"
    >
      {{ description }}
    </p>
    <p
      v-if="error"
      :id="errorId"
      class="mt-1.5 text-xs text-danger"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
