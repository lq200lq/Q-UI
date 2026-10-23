import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

export type ThemeId = 'default' | 'dark' | 'modern'
export type ThemeFamily = 'notion' | 'modern'

const STORAGE_KEY = 'dev902-theme'
const THEME_IDS: readonly ThemeId[] = ['default', 'dark', 'modern']

const theme = ref<ThemeId>('default')
let initialized = false

function isThemeId(value: string | null): value is ThemeId {
  return value !== null && (THEME_IDS as readonly string[]).includes(value)
}

function readStored(): ThemeId | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (isThemeId(raw)) return raw
  } catch {
    /* private mode */
  }
  return null
}

function preferDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

function resolveInitial(): ThemeId {
  return readStored() ?? (preferDark() ? 'dark' : 'default')
}

function applyDocumentTheme(next: ThemeId) {
  document.documentElement.setAttribute('data-theme', next)
}

/** Apply theme before Vue mounts to avoid a light flash. Call from main.ts. */
export function applyThemeEarly(): void {
  const next = resolveInitial()
  applyDocumentTheme(next)
  theme.value = next
}

function persist(next: ThemeId) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
}

function familyFromTheme(id: ThemeId): ThemeFamily {
  return id === 'modern' ? 'modern' : 'notion'
}

export function useTheme(): {
  theme: Ref<ThemeId>
  themeFamily: ComputedRef<ThemeFamily>
  setTheme: (next: ThemeId) => void
  setThemeFamily: (family: ThemeFamily) => void
  toggleTheme: () => void
} {
  onMounted(() => {
    if (initialized) return
    initialized = true
    const next = resolveInitial()
    theme.value = next
    applyDocumentTheme(next)
  })

  function setTheme(next: ThemeId) {
    theme.value = next
    applyDocumentTheme(next)
    persist(next)
  }

  const themeFamily = computed<ThemeFamily>(() => familyFromTheme(theme.value))

  function setThemeFamily(family: ThemeFamily) {
    if (family === 'modern') {
      setTheme('modern')
      return
    }
    /* Notion family: leave dark as-is; from modern return to Notion light */
    if (theme.value === 'modern') {
      setTheme('default')
    }
  }

  function toggleTheme() {
    if (theme.value === 'modern') return
    setTheme(theme.value === 'dark' ? 'default' : 'dark')
  }

  return { theme, themeFamily, setTheme, setThemeFamily, toggleTheme }
}
