import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    userCities: JSON.parse(localStorage.getItem('userCities') || '[]'),
    cityWeatherData: {} as Record<
      string,
      { temperature: number; humidity: number; precipitation: string | null }
    >
  }),
  actions: {
    async fetchWeatherDataForCities() {
      for (const city of this.userCities) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: city,
              appid: 'b23125a077023719bae32ac6ea50d37f',
              units: 'metric'
            }
          })
          const { temp: temperature, humidity } = response.data.main
          const precipitation = response.data.rain ? response.data.rain['1h'] : 'Brak'
          this.cityWeatherData[city] = { temperature, humidity, precipitation }
        } catch (error) {
          console.error('Error fetching weather data for city:', city, error)
        }
      }
    },
    addUserCity(city: string) {
      this.userCities.push(city)
      localStorage.setItem('userCities', JSON.stringify(this.userCities))
      this.fetchWeatherDataForCities()
    },
    removeUserCity(city: string) {
      this.userCities = this.userCities.filter((c) => c !== city)
      localStorage.setItem('userCities', JSON.stringify(this.userCities))
      delete this.cityWeatherData[city]
    }
  }
})
