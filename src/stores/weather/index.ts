import { defineStore } from 'pinia'
import axios from 'axios'

export interface WeatherData {
  temperature: number | null
  humidity?: number
  precipitation?: string | null
  country: string | null
  forecast?: {
    date: string
    temperature: number
    humidity: number
    precipitation: string | null
  }[]
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    userCities: JSON.parse(localStorage.getItem('userCities') || '[]'),
    cityWeatherData: {} as Record<string, WeatherData>
  }),
  actions: {
    async fetchWeatherDataForCities() {
      for (const city of this.userCities) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: city,
              appid: import.meta.env.VITE_APP_OPENWEATHER_API_KEY,
              units: 'metric'
            }
          })
          const { temp: temperature, humidity } = response.data.main
          const country = response.data.sys.country
          const precipitation = response.data.rain ? response.data.rain['1h'] : 'Brak'
          this.cityWeatherData[city] = { temperature, humidity, precipitation, country }
        } catch (error) {
          console.error('Error fetching weather data for city:', city, error)
        }
      }
    },
    async fetchWeeklyWeatherDataForCity(city: string) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            q: city,
            appid: import.meta.env.VITE_APP_OPENWEATHER_API_KEY,
            units: 'metric'
          }
        })
        const forecastData = response.data.list.map((forecast: any) => ({
          temperature: forecast.main.temp,
          humidity: forecast.main.humidity,
          precipitation: forecast.rain ? forecast.rain['3h'] : 'Brak',
          date: forecast.dt_txt
        }))
        if (this.cityWeatherData[city]) {
          // Aktualizuj istniejące dane miasta, dodając prognozę
          this.cityWeatherData[city].forecast = forecastData
        } else {
          // Utwórz nowe dane dla miasta, jeśli jeszcze nie istnieją
          this.cityWeatherData[city] = {
            temperature: 0,
            humidity: 0,
            precipitation: null,
            country: '',
            forecast: forecastData
          }
        }
      } catch (error) {
        console.error('Error fetching weekly weather data for city:', city, error)
      }
    },
    addUserCity(city: string) {
      if (!this.userCities.includes(city)) {
        this.userCities.push(city)
        localStorage.setItem('userCities', JSON.stringify(this.userCities))
        this.fetchWeatherDataForCities()
      }
    },
    removeUserCity(city: string) {
      this.userCities = this.userCities.filter((c: string) => c !== city)
      localStorage.setItem('userCities', JSON.stringify(this.userCities))
      delete this.cityWeatherData[city]
    }
  }
})
