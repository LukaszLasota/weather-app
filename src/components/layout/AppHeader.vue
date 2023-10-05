<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Weather App
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">O aplikacji</router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Zaloguj się</a>
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Wyloguj</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <auth-modal></auth-modal>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user/index'
import { useModalStore } from '@/stores/modal/index'
import AuthModal from './AuthModal.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AuthModal
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    modalStore() {
      return useModalStore()
    }
  },
  methods: {
    async signOut() {
      await this.userStore.signOut()
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    },
    toggleAuthModal() {
      this.modalStore.toggle()
    }
  }
})
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  /* background-color: #3d008d; */
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
