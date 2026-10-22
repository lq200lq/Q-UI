/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './example/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'accent-1': 'rgb(var(--color-accent-1) / <alpha-value>)',
        'accent-2': 'rgb(var(--color-accent-2) / <alpha-value>)',
        'accent-3': 'rgb(var(--color-accent-3) / <alpha-value>)',
        'accent-4': 'rgb(var(--color-accent-4) / <alpha-value>)',
        page: 'rgb(var(--color-page) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        hover: 'rgb(var(--color-hover) / <alpha-value>)',
        active: 'rgb(var(--color-active) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        btn: 'rgb(var(--color-btn) / <alpha-value>)',
        'btn-hover': 'rgb(var(--color-btn-hover) / <alpha-value>)',
        'btn-active': 'rgb(var(--color-btn-active) / <alpha-value>)',
        'on-btn': 'rgb(var(--color-on-btn) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        'danger-hover': 'rgb(var(--color-danger-hover) / <alpha-value>)',
        'danger-active': 'rgb(var(--color-danger-active) / <alpha-value>)',
        'on-danger': 'rgb(var(--color-on-danger) / <alpha-value>)',
      },
      height: {
        'control-sm': 'var(--control-h-sm)',
        'control-md': 'var(--control-h-md)',
        topbar: 'var(--topbar-height)',
      },
      width: {
        'control-sm': 'var(--control-h-sm)',
        'control-md': 'var(--control-h-md)',
        sidebar: 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
      },
      minHeight: {
        'control-sm': 'var(--control-h-sm)',
        'control-md': 'var(--control-h-md)',
        topbar: 'var(--topbar-height)',
      },
      minWidth: {
        sidebar: 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
      },
      fontSize: {
        'control-sm': ['var(--control-text-sm)', { lineHeight: '1.25' }],
        'control-md': ['var(--control-text-md)', { lineHeight: '1.25' }],
      },
      padding: {
        'control-x-sm': 'var(--control-px-sm)',
        'control-x-md': 'var(--control-px-md)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
        2: 'var(--border-width-2)',
        3: 'var(--border-width-3)',
        4: 'var(--border-width-4)',
      },
      boxShadow: {
        brutal: 'var(--shadow-brutal)',
        'brutal-md': 'var(--shadow-brutal-md)',
        'brutal-lg': 'var(--shadow-brutal-lg)',
      },
      /* QIcon size tokens — e.g. w-icon-md h-icon-md */
      spacing: {
        'icon-sm': 'var(--icon-size-sm)',
        'icon-md': 'var(--icon-size-md)',
        'icon-lg': 'var(--icon-size-lg)',
        'icon-xl': 'var(--icon-size-xl)',
      },
    },
  },
  plugins: [],
}
