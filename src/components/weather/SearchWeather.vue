<template>
  <div class="flex items-center justify-center w-full p-10">
    <div class="bg-white p-6 rounded shadow-md w-2/4">
      <input
        v-model="cityName"
        placeholder="Enter city name"
        class="w-full p-2 border rounded mb-2"
      />
      <button
        @click="searchCity"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { useWeatherStore } from '@/stores/weather' // Importuj useWeatherStore

export default defineComponent({
  data() {
    return {
      cityName: ''
    }
  },
  methods: {
    async searchCity() {
      const weatherStore = useWeatherStore() // Użyj useWeatherStore
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: this.cityName,
            appid: 'b23125a077023719bae32ac6ea50d37f'
          }
        })
        weatherStore.addUserCity(response.data.name) // Użyj metody addUserCity zamiast addCity
      } catch (error) {
        console.error('Error searching city:', error)
      }
    }
  }
})
</script>
