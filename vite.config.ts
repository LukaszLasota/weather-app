import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'import.meta.env.VUE_APP_API_KEY': JSON.stringify(process.env.VUE_APP_API_KEY),
    'import.meta.env.VUE_APP_AUTH_DOMAIN': JSON.stringify(process.env.VUE_APP_AUTH_DOMAIN),
    'import.meta.env.VUE_APP_PROJECT_ID': JSON.stringify(process.env.VUE_APP_PROJECT_ID),
    'import.meta.env.VUE_APP_STORAGE_BUCKET': JSON.stringify(process.env.VUE_APP_STORAGE_BUCKET),
    'import.meta.env.VUE_APP_MESSAGING_SENDER_ID': JSON.stringify(
      process.env.VUE_APP_MESSAGING_SENDER_ID
    ),
    'import.meta.env.VUE_APP_APP_ID': JSON.stringify(process.env.VUE_APP_APP_ID),
    'import.meta.env.VUE_APP_MEASUREMENT_ID': JSON.stringify(process.env.VUE_APP_MEASUREMENT_ID),
    'import.meta.env.VUE_APP_WEATHER_API_KEY': JSON.stringify(process.env.VUE_APP_WEATHER_API_KEY)
  }
})
