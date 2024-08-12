import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'
import { name } from '@/../package.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
document.title = name
const appStore = useAppStore()
appStore.setName(name)

app.use(router)

app.mount('#app')
