import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import('../views/HomeView.vue'),
        footer: () => import('../components/AppFooter.vue')
      }
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/changelog',
      name: 'Change Log',
      components: {
        default: () => import('../views/ChangeLogView.vue'),
        footer: () => import('../components/AppFooter.vue')
      }
    }
  ]
})

export default router
