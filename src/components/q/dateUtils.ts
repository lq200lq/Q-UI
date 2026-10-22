/** Local calendar helpers (no timezone shift via UTC midnight). */

export function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  const date = new Date(y, mo - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== mo - 1 ||
    date.getDate() !== d
  ) {
    return null
  }
  return date
}

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isBeforeDay(a: Date, b: Date): boolean {
  const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return aa < bb
}

export function clampDay(date: Date, min?: Date | null, max?: Date | null): Date {
  let next = date
  if (min && isBeforeDay(next, min)) next = min
  if (max && isBeforeDay(max, next)) next = max
  return new Date(next.getFullYear(), next.getMonth(), next.getDate())
}

export function formatDisplayDate(value: string | null | undefined): string {
  const date = parseISODate(value)
  if (!date) return ''
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'] as const

export function weekdayLabels(): readonly string[] {
  return WEEKDAYS
}

/** Monday-first month grid (6×7). */
export function buildMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month)
  const weekday = (first.getDay() + 6) % 7 // Mon=0
  const start = new Date(first)
  start.setDate(first.getDate() - weekday)

  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

export function monthTitle(month: Date): string {
  return `${month.getFullYear()}年${month.getMonth() + 1}月`
}
