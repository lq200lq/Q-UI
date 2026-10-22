import { onMounted, ref, type Ref } from 'vue'

export type ThemeId = 'default' | 'dark'

const STORAGE_KEY = 'dev902-theme'

const theme = ref<ThemeId>('default')
let initialized = false

function readStored(): ThemeId | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'default' || raw === 'dark') return raw
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

/** Apply theme before Vue mounts to avoid a light flash. Call from main.ts. */
export function applyThemeEarly(): void {
  const next = readStored() ?? (preferDark() ? 'dark' : 'default')
  document.documentElement.setAttribute('data-theme', next)
  theme.value = next
}

function persist(next: ThemeId) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
}

export function useTheme(): {
  theme: Ref<ThemeId>
  setTheme: (next: ThemeId) => void
  toggleTheme: () => void
} {
  onMounted(() => {
    if (initialized) return
    initialized = true
    const next = readStored() ?? (preferDark() ? 'dark' : 'default')
    theme.value = next
    document.documentElement.setAttribute('data-theme', next)
  })

  function setTheme(next: ThemeId) {
    theme.value = next
    document.documentElement.setAttribute('data-theme', next)
    persist(next)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'default' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
