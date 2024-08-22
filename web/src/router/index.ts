import { createRouter, createWebHistory, onBeforeRouteUpdate, type RouteLocationNormalizedGeneric } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';

let isConnected = false;

onAuthStateChanged(auth, (user) => {
  isConnected = user !== null;
});


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import('../views/HomeView.vue'),
        footer: () => import('../components/AppFooter.vue'),
        sidebar: () => import('../components/HomeSidebar.vue')
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
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/changelog',
      name: 'Change Log',
      components: {
        default: () => import('../views/ChangeLogView.vue'),
        footer: () => import('../components/AppFooter.vue')
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      meta: { requiresAuth: true },
      components: {
        default: () => import('../views/SettingsView.vue')
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth as boolean | undefined) {
    if (!isConnected) {
      next({ name: 'Log In' })
    }
  }
  next()
})

export default router
