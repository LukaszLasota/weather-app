<template>
  <main class="container mx-auto flex flex-wrap justify-start items-center py-5 px-4">
    <div class="in-h-screen flex items-center justify-center w-full" v-if="!userStore.userLoggedIn">
      <h2 class="font-bold text-xl mb-1 text-center">You must be logged in to select city</h2>
    </div>
    <template v-else>
      <div class="flex flex-wrap items-center justify-center w-full">
        <h2 class="font-bold text-xl mb-1 text-center">
          Jestes zalogowany, dodaj miasta dla których chcesz sledzić prognozę pogody
        </h2>
        <search-weather></search-weather>
        <city-list></city-list>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { useUserStore } from '@/stores/user/index'
import { useWeatherStore } from '@/stores/weather'

import SearchWeather from '../components/weather/SearchWeather.vue'
import CityList from '../components/weather/CityList.vue'

export default defineComponent({
  components: {
    SearchWeather,
    CityList
  },
  computed: {
    userStore() {
      return useUserStore()
    }
  }
})
</script>
