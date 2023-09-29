import { defineStore } from 'pinia'

export interface ModalState {
  isOpen: boolean
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    isOpen: false
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    }
  },
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
})
