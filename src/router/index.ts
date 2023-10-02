import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user/index'
import HomeView from '../pages/HomeView.vue'
import About from '../pages/AboutView.vue'
import Chart from '../pages/ChartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'text-yellow-500',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/:cityName',
      name: 'cityDetail',
      component: Chart
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log("Global Guard");

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})
export default router
