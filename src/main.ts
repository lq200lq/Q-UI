import { createApp } from 'vue'
import './themes/default.css'
import './themes/dark.css'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { applyThemeEarly } from './composables/useTheme'

applyThemeEarly()

createApp(App).use(router).mount('#app')
