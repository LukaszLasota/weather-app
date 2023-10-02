import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    userCities: JSON.parse(localStorage.getItem('userCities') || '[]') // Odczytaj dane przy inicjalizacji
  }),
  actions: {
    addUserCity(city: string) {
      this.userCities.push(city)
      localStorage.setItem('userCities', JSON.stringify(this.userCities)) // Zapisz dane przy dodaniu miasta
    }
  }
})
