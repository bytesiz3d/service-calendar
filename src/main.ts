import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/base.scss'
import 'bootstrap'

import '@/common/Date.extensions'
import '@/common/Array.extensions'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
