<template>
  <div class="flex items-center justify-center p-1 pt-5 md:p-10 w-full md:w-2/4 lg:w-1/2 ">
    <div class="bg-white p-6 rounded shadow-md w-full shadow-2xl">
      <input
        v-model.trim="cityName"
        placeholder="Wpisz nazwę miasta"
        class="w-full p-2 border rounded mb-2"
        @keyup.enter="searchCity"
      />
      <button
        @click="searchCity"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Szukaj
      </button>
      <!-- Dodaj komunikat o błędzie -->
      <div v-if="errorMessage" class="mt-2 text-red-500">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { useWeatherStore } from '@/stores/weather'

export default defineComponent({
  data() {
    return {
      cityName: '',
      errorMessage: ''
    }
  },
  methods: {
    async searchCity() {
      const weatherStore = useWeatherStore()

      // Sprawdź, czy miasto jest już na liście
      const cityNameLower = this.cityName.trim().toLowerCase()
      if (
        weatherStore.userCities.map((city: string) => city.toLowerCase()).includes(cityNameLower)
      ) {
        this.errorMessage = 'To miasto zostało już dodane'
        return
      }

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: this.cityName,
            appid: import.meta.env.VITE_APP_OPENWEATHER_API_KEY
          }
        })
        weatherStore.addUserCity(response.data.name)
        this.errorMessage = ''
      } catch (error) {
        console.error('Error searching city:', error)
        this.errorMessage = 'Nie znaleziono miasta'
      }
    }
  }
})
</script>
