import { useSiteStore } from '@/stores/website'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/mentoria',
      name: 'mentoria',
      component: () => import('@/views/MentoriaView.vue'),
    },
    {
      path: '/revisao',
      name: 'revisao',
      component: () => import('@/views/RevisaoView.vue'),
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: () => import('@/views/EbookView.vue'),
    },
    {
      path: '/contato',
      name: 'contato',
      component: () => import('@/views/ContatoView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroView.vue'),
    },
    {
      path: '/politica',
      name: 'politica',
      component: () => import('@/views/PolicyView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  },
})

router.beforeEach((to, from) => {
  const siteStore = useSiteStore()

  if (to.meta.requiresAuth && !siteStore.isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
