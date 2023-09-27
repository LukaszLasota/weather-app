<template>
  <app-header></app-header>

  <router-view></router-view>
</template>
<script lang="ts">
import AppHeader from './components/layout/AppHeader.vue';

export default{
  components: {
    AppHeader
  }
}

</script>
<style scoped>

</style>
