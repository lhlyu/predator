import './styles/index.css'

import stores from './stores'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(stores)

app.mount('#app')
