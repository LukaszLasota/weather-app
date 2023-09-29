import { defineStore } from 'pinia'
import { auth } from '@/includes/firebase'

export interface UserState {
  userLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userLoggedIn: false
  }),
  actions: {
    async authenticate(values: { email: string; password: string }) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
