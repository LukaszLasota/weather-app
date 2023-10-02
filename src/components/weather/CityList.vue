<template>
  <div>
    <ul>
      <li v-for="city in userCities" :key="city">{{ city }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWeatherStore } from '@/stores/weather/index'

export default defineComponent({
  data() {
    return {
      userCities: useWeatherStore().userCities
    }
  }
})
</script>
