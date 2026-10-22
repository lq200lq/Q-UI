export type IconNode =
  | { tag: 'path'; d: string }
  | { tag: 'circle'; cx: number; cy: number; r: number }
  | { tag: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { tag: 'polyline'; points: string }
  | { tag: 'polygon'; points: string }
  | { tag: 'rect'; x: number; y: number; width: number; height: number; rx?: number }

export type IconSizeToken = 'sm' | 'md' | 'lg' | 'xl'
