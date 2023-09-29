import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { auth } from './includes/firebase'

import VeeValidatePlugin from './includes/validation'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('auth', auth)
app.use(VeeValidatePlugin)

app.mount('#app')
