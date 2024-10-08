import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { name } from '@/../package.json'
import VSwitch from '@lmiller1990/v-switch'

import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'

const pinia = createPinia()
const app = createApp(App)

// Set vue-router
app.use(router)

// Set pinia and app name from package.json
app.use(pinia)
const title = name.charAt(0).toLocaleUpperCase() + name.slice(1)
document.title = title
const appStore = useAppStore()
appStore.setName(title)
useUserStore().initAuth()

// Set vue-i18n
app.use(i18n)
app.component('v-switch', VSwitch)

export { app }

app.mount('#app')