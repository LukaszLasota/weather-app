<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-between items-center py-5 px-4">
      
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Weather App
      </router-link>

    <!-- Hamburger Menu Button -->
    <button @click="toggleMenu" class="hamburger lg:hidden px-2 py-1">
      <div class="hamburger-box"></div>
    </button>

    <!-- Navigation Links -->
    <div :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen }" class="flex-col lg:flex lg:flex-row lg:items-center lg:w-auto w-full" id="nav-content">
      
      <ul class="flex flex-col lg:flex-row mt-1">
        
        <li class="lg:mb-0 mb-2">
          <router-link class="px-2 text-white" :to="{ name: 'about' }">O aplikacji</router-link>
        </li>
        
        <li v-if="!userStore.userLoggedIn" class="lg:mb-0 mb-2">
          <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Zaloguj się</a>
        </li>
        
        <li v-else class="lg:mb-0 mb-2">
          <a class="px-2 text-white" href="#" @click.prevent="signOut">Wyloguj</a>
        </li>
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
  data() {
    return {
      isMenuOpen: false,
    };
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
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
  /* height: 5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
  width: 100%;
}

li {
  margin: 0.5rem;
}

@media screen and (min-width: 768px) {
  header ul {
    flex-direction: row;
  }
}

#nav-content {
  transition: height 0.3s ease;
}

@media (max-width: 767px) {
  nav {
    flex-direction: column;
  }

  #nav-content.flex {
    align-items: center;
    width: 100%;
    height: auto;
  }
}



.hamburger {
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }
}

.hamburger-box,
.hamburger-box::before,
.hamburger-box::after {
  content: "";
  position: absolute;
  left: 0; /* Asegurate de que los pseudoelementos comiencen desde el borde izquierdo del contenedor */
  width: 100%;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

.hamburger-box {
  position: relative; /* Cambié a relative para que actúe como contenedor para los pseudoelementos */
  top: 9px; /* Ajustado para centrar la línea principal */
}

.hamburger-box::before {
  content: "";
  position: absolute;
  top: -10px; /* Distancia desde la línea principal al pseudoelemento superior */
}

.hamburger-box::after {
  content: "";
  position: absolute;
  bottom: -10px; /* Distancia desde la línea principal al pseudoelemento inferior */
}

.hamburger.active .hamburger-box {
  background-color: transparent; /* Hace que la línea principal desaparezca cuando está activa */
}

.hamburger.active .hamburger-box::before {
  transform: rotate(45deg);
  top: 0; /* Centra el pseudoelemento girado respecto al antiguo lugar de la línea principal */
}

.hamburger.active .hamburger-box::after {
  transform: rotate(-45deg);
  top: 0; /* Centra el pseudoelemento girado respecto al antiguo lugar de la línea principal */
}
</style>
