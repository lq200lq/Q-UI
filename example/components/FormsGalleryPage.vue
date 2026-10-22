<script setup lang="ts">
import { ref } from 'vue'
import {
  QButton,
  QCheckbox,
  QColorSwatch,
  QCombobox,
  QDatePicker,
  QDateRangePicker,
  type QDateRange,
  QField,
  QFileUpload,
  type QUploadFile,
  QForm,
  QInput,
  QMentionInput,
  type QMentionOption,
  QRadio,
  QRadioGroup,
  QSearch,
  QSelect,
  type QSelectOption,
  QSlider,
  QSwitch,
  QTag,
  QTextarea,
  QTimePicker,
} from '../../src/components/q'
import { formRules, toast, useForm } from '../../src/composables'
import ExampleBlock from '../_shared/ExampleBlock.vue'
import ExampleGalleryShell from '../_shared/ExampleGalleryShell.vue'
import * as snippets from './snippets'

const name = ref('')
const email = ref('')
const underline = ref('')
const bio = ref('构建清晰、克制的文档工具界面。')
const notes = ref('')
const locale = ref<string | number>('zh')
const role = ref<string | number | null>(null)
const searchQuery = ref('设计')
const agree = ref(true)
const notify = ref(true)
const themePref = ref('system')
const dueDate = ref<string | null>('2026-10-22')
const dateRange = ref<QDateRange>({ start: '2026-10-01', end: '2026-10-15' })
const startTime = ref<string | null>('09:30')
const uploadFiles = ref<QUploadFile[]>([])
const volume = ref(42)
const tagColor = ref<string | null>('#2383e2')
const mentionText = ref('请 @')
const assignee = ref<string | number | null>('ada')

const localeOptions: QSelectOption[] = [
  { value: 'zh', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語', disabled: true },
]

const roleOptions: QSelectOption[] = [
  { value: 'owner', label: '所有者' },
  { value: 'editor', label: '编辑者' },
  { value: 'viewer', label: '查看者' },
]

const memberOptions: QSelectOption[] = [
  { value: 'ada', label: 'Ada Lovelace' },
  { value: 'alan', label: 'Alan Turing' },
  { value: 'grace', label: 'Grace Hopper' },
]

const mentionOptions: QMentionOption[] = [
  { id: 'ada', label: 'Ada Lovelace', description: '工程' },
  { id: 'alan', label: 'Alan Turing', description: '研究' },
  { id: 'grace', label: 'Grace Hopper', description: '编译器' },
]

const {
  values: formValues,
  errors: formErrors,
  submitting: formSubmitting,
  handleSubmit: handleDemoForm,
  reset: resetDemoForm,
} = useForm({
  initialValues: { name: '', email: '' },
  rules: {
    name: formRules.required('请填写名称'),
    email: [formRules.required(), formRules.email()],
  },
})

const onDemoFormSubmit = handleDemoForm(async (values) => {
  await new Promise((r) => window.setTimeout(r, 600))
  toast({
    title: '表单已提交',
    description: `${values.name} · ${values.email}`,
    variant: 'success',
  })
})

const navItems = [
  { id: 'q-field-input', label: 'QInput · QField' },
  { id: 'q-form', label: 'QForm' },
  { id: 'q-textarea', label: 'QTextarea' },
  { id: 'q-select', label: 'QSelect' },
  { id: 'q-combobox', label: 'QCombobox' },
  { id: 'q-search', label: 'QSearch' },
  { id: 'q-checkbox-switch', label: 'QCheckbox · QSwitch' },
  { id: 'q-radio', label: 'QRadio' },
  { id: 'q-date-picker', label: 'QDatePicker' },
  { id: 'q-time-picker', label: 'QTimePicker' },
  { id: 'q-file-upload', label: 'QFileUpload' },
  { id: 'q-slider', label: 'QSlider' },
  { id: 'q-color-swatch', label: 'QColorSwatch' },
  { id: 'q-mention-input', label: 'QMentionInput' },
] as const
</script>

<template>
  <ExampleGalleryShell
    title="表单示例"
    description="输入、校验、日期时间、上传与提及"
    :nav-items="navItems"
  >
    <ExampleBlock
      id="q-field-input"
      title="QInput · QField"
      description="字段壳提供 label / 描述 / 错误；输入支持 bordered 与 underline"
      :code="snippets.fieldInput"
    >
      <div class="flex flex-col gap-5">
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="显示名称"
          description="会出现在个人资料中"
          required
        >
          <QInput
            :id="id"
            v-model="name"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="例如：Ada"
          />
        </QField>
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="邮箱"
          error="请输入有效邮箱"
        >
          <QInput
            :id="id"
            v-model="email"
            type="email"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="you@example.com"
          />
        </QField>
        <QField label="Underline 变体">
          <QInput
            v-model="underline"
            variant="underline"
            placeholder="Notion 式下划线输入"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-form"
      title="QForm · useForm"
      description="表单壳 + 自研校验；提交时校验并展示字段错误"
      :code="snippets.form"
    >
      <QForm class="max-w-sm" @submit="onDemoFormSubmit">
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="名称"
          required
          :error="formErrors.name"
        >
          <QInput
            :id="id"
            v-model="formValues.name"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="例如：Ada"
          />
        </QField>
        <QField
          v-slot="{ id, describedBy, invalid }"
          label="邮箱"
          required
          :error="formErrors.email"
        >
          <QInput
            :id="id"
            v-model="formValues.email"
            type="email"
            :aria-describedby="describedBy"
            :invalid="invalid"
            placeholder="you@example.com"
          />
        </QField>
        <div class="flex items-center gap-2">
          <QButton type="submit" :loading="formSubmitting">保存</QButton>
          <QButton
            type="button"
            variant="secondary"
            size="sm"
            @click="resetDemoForm()"
          >
            重置
          </QButton>
        </div>
      </QForm>
    </ExampleBlock>

    <ExampleBlock
      id="q-textarea"
      title="QTextarea"
      description="bordered / underline；字数统计与 resize"
      :code="snippets.textarea"
    >
      <div class="flex w-full max-w-md flex-col gap-5">
        <QField label="简介" description="最多 120 字">
          <QTextarea
            v-model="bio"
            :rows="4"
            :maxlength="120"
            show-count
            placeholder="介绍一下你自己…"
          />
        </QField>
        <QField label="备注（Underline）">
          <QTextarea
            v-model="notes"
            variant="underline"
            placeholder="Notion 式多行备注"
            :rows="3"
            resize="none"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-select"
      title="QSelect"
      description="自定义 listbox；键盘导航"
      :code="snippets.select"
    >
      <div class="flex w-full max-w-sm flex-col gap-5">
        <QField label="默认语言">
          <QSelect v-model="locale" :options="localeOptions" />
        </QField>
        <QField label="角色">
          <QSelect
            v-model="role"
            placeholder="选择角色"
            :options="roleOptions"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-combobox"
      title="QCombobox"
      description="可搜索选择；键盘导航、清空、Teleport 列表"
      :code="snippets.combobox"
    >
      <div class="w-full max-w-sm">
        <QField label="负责人" description="输入关键字过滤成员">
          <QCombobox
            v-model="assignee"
            placeholder="搜索成员…"
            :options="memberOptions"
          />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-search"
      title="QSearch"
      description="前缀搜索图标；可清除；Esc 清空"
      :code="snippets.search"
    >
      <div class="w-full max-w-sm">
        <QSearch v-model="searchQuery" placeholder="搜索文档…" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-checkbox-switch"
      title="QCheckbox · QSwitch"
      description="勾选与开关；贴合 Notion 克制样式"
      :code="snippets.checkboxSwitch"
    >
      <div class="flex flex-col gap-4">
        <QCheckbox v-model="agree">同意条款</QCheckbox>
        <QSwitch v-model="notify" label="接收通知" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-radio"
      title="QRadio · QRadioGroup"
      description="单选；组内互斥"
      :code="snippets.radio"
    >
      <QRadioGroup v-model="themePref" label="主题偏好">
        <QRadio value="system">跟随系统</QRadio>
        <QRadio value="light">浅色</QRadio>
        <QRadio value="dark">深色</QRadio>
      </QRadioGroup>
    </ExampleBlock>

    <ExampleBlock
      id="q-date-picker"
      title="QDatePicker · QDateRangePicker"
      description="日历浮层；ISO 日期；范围点选与预览"
      :code="snippets.datePicker"
    >
      <div class="flex w-full max-w-sm flex-col gap-5">
        <QField label="截止日期">
          <QDatePicker v-model="dueDate" placeholder="选择日期" />
        </QField>
        <QField label="周期">
          <QDateRangePicker v-model="dateRange" />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-time-picker"
      title="QTimePicker"
      description="时 / 分滚轮；可配置分钟步长；HH:mm"
      :code="snippets.timePicker"
    >
      <div class="w-full max-w-xs">
        <QField label="开始时间">
          <QTimePicker v-model="startTime" :minute-step="5" />
        </QField>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-file-upload"
      title="QFileUpload · QDropzone"
      description="点击或拖拽上传；多文件列表；大小限制 reject"
      :code="snippets.fileUpload"
    >
      <div class="w-full max-w-md">
        <QFileUpload
          v-model="uploadFiles"
          multiple
          accept="image/*,.pdf,.txt"
          :max-size="5 * 1024 * 1024"
          @reject="(reason) => toast({ title: reason, variant: 'warning' })"
        />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-slider"
      title="QSlider"
      description="区间滑块；轨道与拇指贴合主题色"
      :code="snippets.slider"
    >
      <div class="w-full max-w-sm">
        <QSlider v-model="volume" label="音量" show-value :max="100" />
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-color-swatch"
      title="QColorSwatch"
      description="预设色板 + 自定义 hex；标签/主题色"
      :code="snippets.colorSwatch"
    >
      <div class="flex flex-wrap items-center gap-3">
        <QColorSwatch v-model="tagColor" />
        <QTag
          v-if="tagColor"
          :style="{
            backgroundColor: `${tagColor}22`,
            color: tagColor,
            borderColor: `${tagColor}55`,
          }"
        >
          标签预览
        </QTag>
      </div>
    </ExampleBlock>

    <ExampleBlock
      id="q-mention-input"
      title="QMentionInput"
      description="输入 @ 弹出提及列表；方向键 / Enter 选择"
      :code="snippets.mentionInput"
    >
      <div class="w-full max-w-md">
        <QField label="评论" description="试用 @ada 触发提及">
          <QMentionInput v-model="mentionText" :options="mentionOptions" />
        </QField>
      </div>
    </ExampleBlock>
  </ExampleGalleryShell>
</template>
