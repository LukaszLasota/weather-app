<template>
  <div class="p-6 bg-gray-100 flex flex-col items-center justify-center">
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-md">
      <span class="text-lg font-bold block text-center">Dzisiaj - {{ todayDate }}</span>
    </div>
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-md">
      <span v-if="weatherData.temperature" class="text-lg block text-center"
        >Temperatura: {{ weatherData.temperature }}°C</span
      >
    </div>
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-md">
      <span v-if="weatherData.country" class="text-lg font-bold block text-center"
        >{{ cityName }}, Kraj: {{ weatherData.country }}</span
      >
    </div>
    <ul class="mt-4 flex items-center justify-center flex-wrap gap-4">
      <li
        v-for="forecast in weatherData.forecast || []"
        :key="forecast.date"
        class="mb-2 bg-white p-4 rounded shadow-md"
      >
        <span class="block font-bold">{{ forecast.date }}</span>
        <span class="block">Temperatura: {{ forecast.temperature }}°C</span>
        <span class="block">Wilgotność: {{ forecast.humidity }}%</span>
        <span class="block">Opady: {{ forecast.precipitation }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather'

export default defineComponent({
  data() {
    return {
      todayDate: '',
      country: '',
      cityName: this.$route.params.cityName
    }
  },
  computed: {
    weatherData() {
      const weatherStore = useWeatherStore()
      if (typeof this.cityName === 'string') {
        const data = weatherStore.cityWeatherData[this.cityName] || {
          temperature: null,
          country: null,
          forecast: []
        }
        console.log('Weather Data: ', data) // Dodaj to
        return data
      }
      return { temperature: null, country: null }
    }
  },
  mounted() {
    this.setTodayDate()
    const weatherStore = useWeatherStore() // Uzyskaj dostęp do instancji sklepu
    weatherStore.fetchWeeklyWeatherDataForCity(this.cityName.toString()) // Użyj metody sklepu
  },
  methods: {
    setTodayDate() {
      const today = new Date()
      this.todayDate = today.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
})
</script>
