import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/🗝️',
      name: 'Sign In',
      component: () => import('../views/HomePage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
