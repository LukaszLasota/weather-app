<template>
  <div class="p-2 bg-blue-100 min-h-screen flex flex-col items-center justify-center">
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-2xl text-center">
      <span class="text-lg font-bold">
        Pogoda dla: {{ cityName }} Kraj: {{ weatherData.country }}
      </span>
    </div>
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-2xl text-center">
      <span v-if="weatherData.temperature" class="text-lg block text-center">
        Temperatura: {{ weatherData.temperature }}°C
      </span>
    </div>
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-2xl text-center">
      <span v-if="weatherData.humidity" class="text-lg block text-center">
        Wilgotność: {{ weatherData.humidity }}%
      </span>
    </div>
    <div class="mb-4 p-4 bg-white rounded shadow-md w-full max-w-2xl text-center">
      <span v-if="weatherData.precipitation" class="text-lg block text-center">
        Opady: {{ weatherData.precipitation }}
      </span>
    </div>
    <div class="mb-4 p-1 bg-white rounded shadow-md w-full max-w-2xl text-center">
      <div class="grid grid-cols-4 text-center">
        <div class="p-2 font-bold">Data</div>
        <div class="p-2 font-bold">Temperatura</div>
        <div class="p-2 font-bold">Wilgotność</div>
        <div class="p-2 font-bold">Opady</div>
        <div
          v-for="forecast in weatherData.forecast || []"
          :key="forecast.date"
          class="col-span-4 grid grid-cols-4"
        >
          <div class="p-1 md:p-2">{{ forecast.date }}</div>
          <div class="p-2">{{ forecast.temperature }}°C</div>
          <div class="p-2">{{ forecast.humidity }}%</div>
          <div class="p-2">{{ forecast.precipitation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWeatherStore } from '@/stores/weather'

export default defineComponent({
  data() {
    return {
      cityName: this.$route.params.cityName,
      intervalId: null as number | null 
    }
  },
  computed: {
    weatherData() {
      const weatherStore = useWeatherStore()
      if (typeof this.cityName === 'string') {
        return (
          weatherStore.cityWeatherData[this.cityName] || {
            temperature: null,
            country: null,
            forecast: []
          }
        )
      }
      return { temperature: null, country: null, forecast: [] }
    }
  },
  mounted() {
  const weatherStore = useWeatherStore()
  
  // Sprawdzamy, czy cityName jest stringiem
  if (typeof this.cityName === 'string') {
    weatherStore.fetchWeeklyWeatherDataForCity(this.cityName)
    this.intervalId = weatherStore.startSingleCityDataRefresh(this.cityName)
  } else {
    // obsłuż sytuację, gdy cityName nie jest stringiem, np. wyświetl błąd lub coś innego
    console.error('cityName is not a string:', this.cityName)
  }
},
beforeUnmount() {
  if (this.intervalId !== null) {
    clearInterval(this.intervalId)
  }
}
})
</script>
