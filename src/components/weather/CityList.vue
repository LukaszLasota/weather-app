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
          class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-stretch"
        >
          Usuń
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather/index'

export default defineComponent({
  setup() {
    const weatherStore = useWeatherStore()

    const userCities = computed(() => weatherStore.userCities)
    const cityWeatherData = computed(() => weatherStore.cityWeatherData)

    const removeCity = (city: string) => {
      weatherStore.removeUserCity(city)
    }

    return {
      userCities,
      cityWeatherData,
      removeCity
    }
  },
  mounted() {
    useWeatherStore().fetchWeatherDataForCities()
  }
})
</script>
