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
      path: '/🗝🚪',
      name: 'Sign In',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/🚀📝',
      name: 'Change Log',
      components: {
        default: () => import('../views/ChangeLogView.vue'),
        footer: () => import('../components/AppFooter.vue')
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
