<template>
  <div class="p-6">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <li
        v-for="city in userCities"
        :key="city"
        class="bg-white p-4 rounded shadow-md flex flex-col items-start"
      >
        <div class="mb-2">
          <div class="font-bold text-lg mb-1">{{ city }}</div>
          <div>Temperatura: {{ cityWeatherData[city]?.temperature }}°C</div>
          <div>Wilgotność: {{ cityWeatherData[city]?.humidity }}%</div>
          <div>Opady: {{ cityWeatherData[city]?.precipitation }}</div>
        </div>
        <button
          @click="removeCity(city)"
          class="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-stretch"
        >
          Usuń
        </button>
        <router-link
          :to="{ name: 'cityDetail', params: { cityName: city } }"
          class="inline-block mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
        >
          Zobacz więcej szczegółów
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather/index'

export default defineComponent({
  data() {
    const weatherStore = useWeatherStore()
    return {
      weatherStore
    }
  },
  computed: {
    userCities() {
      return this.weatherStore.userCities
    },
    cityWeatherData() {
      return this.weatherStore.cityWeatherData
    }
  },
  methods: {
    removeCity(city: string) {
      this.weatherStore.removeUserCity(city)
    }
  },
  mounted() {
    this.weatherStore.fetchWeatherDataForCities()
  }
})
</script>
