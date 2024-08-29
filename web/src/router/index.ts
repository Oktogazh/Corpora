import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';

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
      component: () => import('../views/ForgotPwdRequestView.vue')
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
    },
    {
      path: '/account',
      name: 'Account',
      meta: { requiresAuth: true },
      components: {
        default: () => import('../views/AccountView.vue')
      }
    }
  ]
})

let isConnected = false;

onAuthStateChanged(auth, (user) => {
  const previouslyConnected = isConnected
  isConnected = user !== null;
  if (!isConnected && previouslyConnected) {
    router.push({ name: 'Home' })
  }
});

router.beforeEach((to, from, next) => {
  router.previousRoute = from
  if (to.meta.requiresAuth as boolean | undefined) {
    if (!isConnected) {
      next({ name: 'Log In' })
    }
  }
  next()
})

export default router
