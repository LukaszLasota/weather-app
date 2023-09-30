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
    initialize() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.userLoggedIn = true
        } else {
          this.userLoggedIn = false
        }
      })
    },
    async authenticate(values: { email: string; password: string }) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
      console.log(this.userLoggedIn)
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
      console.log(this.userLoggedIn)
    }
  }
})
