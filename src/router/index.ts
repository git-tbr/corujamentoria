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
      path: '/manual',
      name: 'manual',
      component: () => import('@/views/ManualView.vue'),
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
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      component: () => import('@/views/RecuperarSenhaView.vue'),
    },
    {
      path: '/alterar-senha/:token',
      name: 'alterar-senha',
      component: () => import('@/views/AlterarSenhaView.vue'),
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
    {
      path: '/pagamento',
      name: 'pagamento',
      component: () => import('@/views/PagamentoView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/views/PerfilView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/meus-cursos',
      name: 'meus-cursos',
      redirect: '/meus-cursos/cursos',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'cursos',
          name: 'cursos',
          component: () => import('@/views/my-courses/HomeCoursesView.vue'),
        },
        {
          path: 'simulado/:token',
          name: 'simulado',
          component: () => import('@/views/my-courses/SimuladoCoursesView.vue'),
        },
        {
          path: 'simulados/banco-de-questoes/:token',
          name: 'banco-de-questoes',
          component: () => import('@/views/my-courses/SimulatedDBQuestionsView.vue'),
        },
        {
          path: 'ead/:token',
          name: 'ead',
          component: () => import('@/views/my-courses/EadCourseView.vue'),
        },
        {
          path: 'ead/:courseToken/modulo/:moduleToken',
          name: 'modulo',
          component: () => import('@/views/my-courses/ModuleCourseView.vue'),
        },
        {
          path: 'ebook/:token',
          name: 'ebook',
          component: () => import('@/views/my-courses/EbookCourseView.vue'),
        },
        {
          path: 'ead/:courseToken/modulo/:moduleToken/exercicios',
          name: 'exercicios',
          component: () => import('@/views/my-courses/ExercisesCourseView.vue'),
        },
        {
          path: 'ead/:courseToken/modulo/:moduleToken/materiais',
          name: 'materiais',
          component: () => import('@/views/my-courses/MaterialsCourseView.vue'),
        }
      ],
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

  if (to.meta.requiresAuth && !siteStore.isAuthenticated && localStorage.getItem('tokenJwt') == null) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
