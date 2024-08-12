import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'
import { name } from '@/../package.json'

import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'

const pinia = createPinia()
const app = createApp(App)

// Set vue-router
app.use(router)

// Set pinia and app name from package.json
app.use(pinia)
document.title = name.charAt(0).toLocaleUpperCase() + name.slice(1)
const appStore = useAppStore()
appStore.setName(name)

// Set vue-i18n
app.use(i18n)

app.mount('#app')
