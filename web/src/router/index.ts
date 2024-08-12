import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/🗝️',
      name: 'Sign In',
      component: () => import('../views/SignInView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
