<template>
  <div class="p-6 w-full">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <li
        v-for="city in userCities"
        :key="city"
        class="bg-white p-5 rounded shadow-2xl flex flex-col items-start my-4"
      >
        <div class="mb-2 w-full">
          <h2 class="font-bold text-xl mb-1 text-center">{{ city }}</h2>
          <p class="font-bold text-lg mb-1 text-center">
            Temperatura: {{ cityWeatherData[city]?.temperature }}°C
          </p>
          <p class="font-bold text-lg mb-1 text-center">
            Wilgotność: {{ cityWeatherData[city]?.humidity }}%
          </p>
          <p class="font-bold text-lg mb-1 text-center">
            Opady: {{ cityWeatherData[city]?.precipitation }}
          </p>
        </div>
        <button
          @click="removeCity(city)"
          class="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-stretch w-3/4 mx-auto"
        >
          Usuń
        </button>
        <router-link
          :to="{ name: 'cityDetail', params: { cityName: city } }"
          class="inline-block mt-5 bg-blue-500 text-white px-4 py-2 mb-5 rounded hover:bg-blue-600 text-center w-3/4 mx-auto"
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
