<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass" >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="toggleModalVisibility">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"   @click.stop
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Twoje konto</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-200" @click="toggleModalVisibility">
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
    // Dodajemy globalny nasłuchiwacz zdarzeń, gdy komponent jest montowany
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    // Usuwamy nasłuchiwacz zdarzeń, gdy komponent jest niszczony, aby uniknąć wycieków pamięci
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>
