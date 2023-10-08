import './assets/main.css'

import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { auth } from './includes/firebase'

import VeeValidatePlugin from './includes/validation'

let app: VueApp | null = null

import { useUserStore } from '@/stores/user/index'

import BaseCard from './components/ui/BaseCard.vue'



app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('base-card', BaseCard)
app.provide('auth', auth)
app.use(VeeValidatePlugin)

const userStore = useUserStore()
userStore.initialize() 

app.mount('#app')
 