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
      path: '/login',
      name: 'Log In',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/forgot-password',
      name: 'Forgot Password',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('../views/LogInView.vue')
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
