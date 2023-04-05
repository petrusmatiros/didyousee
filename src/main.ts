import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './style.css'

const app = createApp(App)
app.use(router as any)
app.use(createPinia())
app.mount('#app')
