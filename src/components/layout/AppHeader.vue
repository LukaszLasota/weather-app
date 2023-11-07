<template>
  <header class="header">
    <nav class="header__nav">
      <h1 class="header__title">
        <router-link
          :to="{ name: 'home' }"
          class="header__link"
          exact-active-class="header__link--active"
        >
          Weather App
        </router-link>
      </h1>

      <button
        class="header__hamburger"
        @click="toggleMenu"
        :class="{ 'header__hamburger--active': isMenuOpen }"
        aria-label="Menu"
      >
        <span class="header__hamburger--container" tabindex="-1">
          <span class="header__hamburger--bars"></span>
        </span>
      </button>

      <ul :class="{ 'menu-open': isMenuOpen }" class="header__list">
        <li class="header__item">
          <router-link :to="{ name: 'about' }" class="header__link">O aplikacji</router-link>
        </li>

        <li v-if="!userStore.userLoggedIn" class="header__item header__item--mb">
          <a href="#" @click.prevent="toggleAuthModal" class="header__link">Zaloguj się</a>
        </li>

        <li v-else class="header__item header__item--mb">
          <a href="#" @click.prevent="signOut" class="header__link">Wyloguj</a>
        </li>
      </ul>
    </nav>
    <teleport to="body">
      <auth-modal></auth-modal>
    </teleport>
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
      isMenuOpen: false
    }
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
      this.isMenuOpen = !this.isMenuOpen
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

<style scoped lang="scss">
.header {
  width: 100%;
  position: relative;
  background-color: $header-color;
  &__nav {
    position: relative;
    width: 90%;
    margin: auto;
    padding: 15px 0;
    @include flex(wrap, space-between, center);
  }

  &__title {
    display: flex;
    width: 15%;
    @media screen and (max-width: $medium) {
      width: 50%;
    }
    a {
      color: white;
      margin: 0;
    }
  }
  &__list {
    list-style: none;
    margin: 0;
    padding: 15px 0 0;
    width: 80%;
    transition: all 1s ease-in-out;
    @include flex(wrap, flex-end, center);
    display: flex;

    @media screen and (max-width: $medium) {
      display: none;
    }
  }

  &__list.menu-open {
    display: flex;
  }

  &__item {
    color: $color-white;
    padding: 5px 10px 10px;
    @media screen and (max-width: $medium) {
      width: 100%;
    }
  }

  @media screen and (max-width: $medium) {
    &__hamburger {
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;
      cursor: pointer;

      &:focus {
        & > .header__hamburger-container {
          box-shadow: 0 0 2px 2px #51a7e8;
        }
      }

      &,
      &--container {
        &:focus {
          outline: none;
        }
      }

      &--container {
        display: flex;
        align-items: center;
        position: relative;
        width: 35px;
        height: 30px;
      }

      &--bars {
        position: absolute;
        width: 35px;
        height: 2px;
        background-color: #ffffff;
        transition: transform 220ms ease-in-out;

        &::before,
        &::after {
          display: block;
          position: absolute;
          width: 35px;
          height: 2px;
          background-color: #ffffff;
          content: '';
        }

        &::before {
          top: -12px;
          transition:
            top 100ms 250ms ease-in,
            transform 220ms ease-in-out;
        }

        &::after {
          bottom: -12px;
          transition:
            bottom 100ms 250ms ease-in,
            transform 220ms ease-in-out;
        }
      }
    }

    &__hamburger--active {
      .header__hamburger--bars {
        transform: rotate(225deg);
        transition: transform 220ms 120ms ease-in-out;

        &::before {
          top: 0;
          transition: top 100ms ease-out;
        }

        &::after {
          bottom: 0;
          transform: rotate(-90deg);
          transition:
            bottom 100ms ease-out,
            transform 220ms 120ms ease-in-out;
        }
      }
    }
  }
}
</style>
