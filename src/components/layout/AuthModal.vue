<template>

  <div class="auth-modal" id="modal" :class="hiddenClass">
    <div
      class="auth-modal__center"
    >
      <div class="auth-modal__background" @click="toggleModalVisibility">
        <div class="auth-modal__background---position"></div>
      </div>

      <div
        class="auth-modal__main"
        @click.stop
      >
          <div class="auth-modal__main--header ">
            <p class="auth-modal__main--title">Twoje konto</p>
            <!-- Modal Close Button -->
            <div
              class="auth-modal__main--button modal-close  hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-200"
              @click="toggleModalVisibility"
            >
              Zamknij
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition ext-white text-white bg-blue-600"
                href="#"
                >Logowanie</a
              >
            </li>
          </ul>
          <login-form></login-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useModalStore } from '@/stores/modal/index'
import LoginForm from './LoginForm.vue'
export default {
  name: 'AuthModal',
  components: {
    LoginForm
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
.auth-modal{
  @include position(fixed, 0, 0, 0, 0);
  z-index: 10;
  overflow-y: auto;
  &__center{
    @include flex(wrap, center, center);
    min-height: 100vh
  }

  &__background{
    @include position(fixed, 0, 0, 0, 0);
    transition: opacity 0.2s ease-in-out;
    &---position{
      @include position(absolute, 0, 0, 0, 0);
      background-color: rgba(31, 29, 29, 0.3);
     
    }
  }
  &__main{
    background-color: $color-white;
    border-radius: 2%;
    text-align: left;
    overflow: hidden;
    transition: all;
    width: 50%;
    z-index: 10;
    padding: 3% 2%;
    &--header{
      @include flex(wrap, space-between, center);
      padding-bottom: 5%;      
    }
    &--title{
      font-size: 1.5rem;
      font-weight: bold;
    }
    &--button{
        cursor: pointer;
        z-index: 50;
        padding: 10px 20px;
        background-color: rgb(0, 112, 204);
        color: $color-white;
        border-radius: 2%;
    }
    
  }

}
  
</style>