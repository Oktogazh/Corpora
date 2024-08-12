import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '🏠',
      component: () => import('../pages/HomePage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
