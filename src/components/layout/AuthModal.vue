<template>
  <div class="auth-modal" id="modal" :class="hiddenClass">
    <div class="auth-modal__center">
      <div class="auth-modal__background" @click="toggleModalVisibility">
        <div class="auth-modal__background-position"></div>
      </div>

      <div class="auth-modal__main" @click.stop>
        <div class="auth-modal__main-header">
          <p class="auth-modal__main-title">Twoje konto</p>

          <div
            class="auth-modal__main-button modal-close hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-200"
            @click="toggleModalVisibility"
          >
            Zamknij
          </div>
        </div>

        <ul class="auth-modal__main-tabs">
          <li class="auth-modal__main-tab">
            <a class="auth-modal__main-tab-link" :class="{ 'auth-modal__main-tab-link--active': activeTab === 'login' }" href="#" @click.prevent="switchTabs('login')">Logowanie</a>
          </li>
          <li class="auth-modal__main-tab">
            <a class="auth-modal__main-tab-link" :class="{ 'auth-modal__main-tab-link--active': activeTab === 'register' }" href="#" @click.prevent="switchTabs('register')">Rejestracja</a>
          </li>
        </ul>
        <login-form v-if="activeTab === 'login'"></login-form>
        <register-form v-else></register-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useModalStore } from '@/stores/modal/index'
import LoginForm from './LoginForm.vue'
type TabName = 'login' | 'register';
export default {
  name: 'AuthModal',
  components: {
    LoginForm
  },
  data() {
    return {
      activeTab: 'login' as TabName,
    }
  },
  computed: {
    hiddenClass() {
      return this.modalStore.hiddenClass
    },
    modalStore() {
      return useModalStore()
    }
  },
  methods: {
    switchTabs(tabName: TabName) {
      this.activeTab = tabName;
    },
    toggleModalVisibility() {
      this.modalStore.toggle()
    },
    handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.toggleModalVisibility()
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>
<style scoped lang="scss">
.auth-modal {
  @include position(fixed, 0, 0, 0, 0);
  z-index: 10;
  overflow-y: auto;
  &__center {
    @include flex(wrap, center, center);
    min-height: 100vh;
  }

  &__background {
    @include position(fixed, 0, 0, 0, 0);
    transition: opacity 0.2s ease-in-out;
    &---position {
      @include position(absolute, 0, 0, 0, 0);
      background-color: rgba(31, 29, 29, 0.3);
    }
  }
  &__main {
    background-color: $color-white;
    border-radius: 2%;
    text-align: left;
    overflow: hidden;
    transition: all;
    width: 40%;
    z-index: 10;
    padding: 3% 2%;
    @media screen and (max-width: $xx-large) {
      width: 60%;
    }
    @media screen and (max-width: $x-large) {
      width: 70%;
    }
    @media screen and (max-width: $medium) {
      width: 90%;
    }

    &-header {
      @include flex(wrap, space-between, center);
      padding-bottom: 5%;
    }
    &-title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    &-button {
      cursor: pointer;
      z-index: 50;
      padding: 10px 20px;
      background-color: $button-color;
      color: $color-white;
      border-radius: $medium-radius;
    }
    &-tabs {
      @include flex(wrap, center, center);
      margin: 0 auto 4%;
      width: 70%;
    }
    &-tab {
      @include flex(wrap, center, center);
      width: 50%;
      text-align: center;
    }
    &-tab-link {
      display: block;
      border-radius: $medium-radius;
      padding: 10px 15px;
      color: $color-white;
      background-color: $button-color;
      transition: all 0.5s;
      width: 80%;
    }
  }
}
</style>
