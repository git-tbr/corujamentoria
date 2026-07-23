<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { useSiteStore } from '@/stores/website'
import { onMounted, ref, computed } from 'vue'
import { useAlert } from '@/services/alertService'
import { useRouter } from 'vue-router'

interface Course {
  courseid: number | string
  coursekey: string
  coursetype: string
  imagepath: string
  namecourse: string
  isSample: number
}

interface ExerciciosAcessados {
  total: number
  acertos: number
}

interface DashboardData {
  exercises: Record<string, number>
  accessedExercises: Record<string, ExerciciosAcessados>
  videos: Record<string, number>
  accessedVideos: Record<string, number>
}

const { showAlert } = useAlert()
const api = instance
const siteStore = useSiteStore()
const isLoading = ref(true)
const courses = ref<Course[]>([])
const router = useRouter()
const search = ref('')
const filterOrder = ref<'asc' | 'desc'>('asc')
const dashboard = ref<DashboardData | null>(null)

const fetchCourses = async () => {
  if (!siteStore.userId) {
    isLoading.value = false
    return
  }

  try {
    const response = await api.get(
      `/api/purchased-courses/list/${siteStore.company}/${siteStore.userId}`,
    )
    const data = response.data

    if (data.code === 0) {
      throw new Error(data.message || 'Erro desconhecido')
    }

    courses.value = data.courses || []
    dashboard.value = data.dashboard || null
  } catch (error: any) {
    await showAlert({
      title: 'Erro',
      message: error.message || 'Não foi possível carregar os cursos.',
      type: 'error',
    })
  } finally {
    isLoading.value = false
  }
}

const videoMetrics = computed(() => {
  if (!dashboard.value) return { total: 0, accessed: 0, percentage: 0 }

  const total = Object.values(dashboard.value.videos || {}).reduce((acc, v) => acc + v, 0)
  const accessed = Object.values(dashboard.value.accessedVideos || {}).reduce((acc, v) => acc + v, 0)
  const percentage = total > 0 ? Math.round((accessed / total) * 100) : 0

  return { total, accessed, percentage }
})

const courseProgressList = computed(() => {
  if (!dashboard.value || !courses.value.length) return []

  const { videos = {}, accessedVideos = {} } = dashboard.value

  return courses.value
    .filter((c) => (videos[c.courseid] || 0) > 0)
    .map((c) => {
      const total = videos[c.courseid] || 0
      const accessed = accessedVideos[c.courseid] || 0
      const percentage = total > 0 ? Math.min(100, Math.round((accessed / total) * 100)) : 0

      return {
        id: c.courseid,
        name: c.namecourse,
        total,
        accessed,
        percentage,
      }
    })
})

const exerciseMetrics = computed(() => {
  if (!dashboard.value) return { totalPlatform: 0, done: 0, correct: 0, errors: 0, percentageDone: 0, accuracy: 0 }

  const totalPlatform = Object.values(dashboard.value.exercises || {}).reduce((acc, v) => acc + v, 0)

  let done = 0
  let correct = 0

  Object.values(dashboard.value.accessedExercises || {}).forEach((item) => {
    done += item.total || 0
    correct += item.acertos || 0
  })

  const errors = Math.max(0, done - correct)
  const percentageDone = totalPlatform > 0 ? ((done / totalPlatform) * 100).toFixed(1) : '0'
  const accuracy = done > 0 ? Math.round((correct / done) * 100) : 0

  return {
    totalPlatform,
    done,
    correct,
    errors,
    percentageDone,
    accuracy,
  }
})

const cursosFiltrados = computed(() => {
  let lista = [...courses.value]

  //filtro de texto
  if (search.value) {
    lista = lista.filter((c) => c.namecourse.toLowerCase().includes(search.value.toLowerCase()))
  }

  //filtro de ordem
  lista.sort((a, b) => {
    const titleA = a.namecourse.toLowerCase()
    const titleB = b.namecourse.toLowerCase()
    if (filterOrder.value === 'asc') {
      return titleA.localeCompare(titleB)
    }
    return titleB.localeCompare(titleA)
  })

  return lista
})

const openCourse = (coursetype: string, coursekey: string) => {
  router.push({
    name: coursetype,
    params: {
      token: coursekey,
    },
  })
}

const isDashboardCollapsed = ref(false)
const toggleDashboard = () => {
  isDashboardCollapsed.value = !isDashboardCollapsed.value
}

//controle de animação
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0px'
  element.style.opacity = '0'
}

const enter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto' // Retorna para auto para não quebrar a responsividade se a janela redimensionar
}

const leave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px' // Define a altura atual antes de zerar
  element.style.opacity = '1'

  // Força o reflow do navegador para a transição funcionar do tamanho atual até zero
  element.offsetHeight

  element.style.height = '0px'
  element.style.opacity = '0'
}

onMounted(() => {
  fetchCourses()
  if (window.innerWidth < 768) {
    isDashboardCollapsed.value = true
  }
})
</script>

<template>
  <Layout>
    <main class="page-size bg-coruja">
      <section class="container py-3 py-lg-5">
        <div class="row mb-3" v-reveal="'bottom'">
          <div class="col">
            <h1 class="ff-roboto text-white text-center">Meus Cursos</h1>
            <hr class="border border-light mb-0" />
          </div>
        </div>

        <div class="row m-0 mb-4 align-items-center bg-light p-3 rounded shadow-sm" v-reveal="'bottom'">
          <div class="col-md-6 mb-3 mb-lg-0">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
              <input v-model="search" type="text" class="form-control border-start-0"
                placeholder="Pesquisar pelo nome do curso..." />
            </div>
          </div>
          <div class="col-md-3 mb-3 mb-lg-0">
            <select v-model="filterOrder" class="form-select">
              <option value="asc">Ordem: A - Z</option>
              <option value="desc">Ordem: Z - A</option>
            </select>
          </div>
          <div class="col-md-3 text-center text-md-end">
            <span class="badge bg-success px-3 py-2">
              {{ cursosFiltrados.length }} Curso(s) encontrado(s)
            </span>
          </div>
        </div>

        <!-- DASHBOARD -->
        <div v-if="!isLoading && dashboard" class="row mb-4" v-reveal="'bottom'">
          <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white">

              <!-- Cabeçalho (Clicável) -->
              <div class="d-flex justify-content-between align-items-center cursor-pointer select-none"
                :class="{ 'mb-0': isDashboardCollapsed, 'mb-4': !isDashboardCollapsed }"
                style="transition: margin-bottom 0.3s ease;" @click="toggleDashboard">
                <h4 class="fw-bold text-dark mb-0 fs-5 fs-md-4">
                  <font-awesome-icon icon="fa-solid fa-chart-line" class="me-2 text-primary" />
                  Seu Desempenho
                </h4>

                <button type="button"
                  class="btn btn-sm btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2"
                  @click.stop="toggleDashboard">
                  <span class="d-none d-sm-inline">
                    {{ isDashboardCollapsed ? 'Expandir' : 'Recolher' }}
                  </span>
                  <font-awesome-icon
                    :icon="isDashboardCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up'"
                    class="icon-chevron" />
                </button>
              </div>

              <!-- Conteúdo com Transição Smooth -->
              <Transition name="expand" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                @leave="leave">
                <div v-if="!isDashboardCollapsed" class="expand-wrapper">
                  <!-- Cards Resumo Visão Geral -->
                  <div class="row g-3 mb-4">
                    <!-- Aulas Assistidas -->
                    <div class="col-md-6">
                      <div class="p-3 border rounded-3 bg-light h-100">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="text-muted fw-bold">Aulas Assistidas</span>
                          <span class="badge bg-primary fs-6">{{ videoMetrics.percentage }}%</span>
                        </div>
                        <h3 class="fw-bold mb-1">{{ videoMetrics.accessed }} / {{ videoMetrics.total }}</h3>
                        <div class="progress mt-2" style="height: 8px;">
                          <div class="progress-bar bg-primary" role="progressbar"
                            :style="{ width: videoMetrics.percentage + '%' }"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Exercícios -->
                    <div class="col-md-6">
                      <div class="p-3 border rounded-3 bg-light h-100">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="text-muted fw-bold">Exercícios & Questões</span>
                          <span class="badge bg-info text-dark fs-6">{{ exerciseMetrics.accuracy }}% Precisão</span>
                        </div>
                        <h3 class="fw-bold mb-1">
                          {{ exerciseMetrics.done }}
                          <small class="fs-6 text-muted">de {{ exerciseMetrics.totalPlatform }} resolvidos</small>
                        </h3>
                        <div class="d-flex gap-2 mt-2">
                          <span class="badge bg-success-subtle text-success border border-success px-2 py-1">
                            ✓ {{ exerciseMetrics.correct }} acerto(s)
                          </span>
                          <span class="badge bg-danger-subtle text-danger border border-danger px-2 py-1">
                            ✗ {{ exerciseMetrics.errors }} erro(s)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Progresso por Curso -->
                  <h6 class="fw-bold text-secondary mb-3">Progresso por Curso</h6>
                  <div class="row g-3">
                    <div v-for="item in courseProgressList" :key="item.id" class="col-md-6 col-lg-4">
                      <div class="border p-2 px-3 rounded-3 bg-white h-100 d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                          <span class="fw-semibold text-truncate me-2" style="max-width: 70%;" :title="item.name">
                            {{ item.name }}
                          </span>
                          <small class="text-muted fw-bold">{{ item.accessed }}/{{ item.total }}</small>
                        </div>
                        <div class="progress" style="height: 6px;">
                          <div class="progress-bar bg-success" role="progressbar"
                            :style="{ width: item.percentage + '%' }"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

            </div>
          </div>
        </div>

        <div v-if="isLoading" class="text-center text-white" v-reveal="'bottom'">
          <p>Carregando cursos...</p>
        </div>

        <div v-else-if="cursosFiltrados.length > 0" class="row mb-3">
          <div class="col-md-4 col-lg-3 mb-4 to-up" v-for="course in cursosFiltrados" :key="course.courseid"
            @click="openCourse(course.coursetype, course.coursekey)" role="button">
            <div class="card rounded-4 p-3 shadow" v-reveal="'bottom'">
              <div class="card-image">
                <img :src="course.imagepath" :alt="course.namecourse" class="img-fluid w-100" />
              </div>
              <div class="sample bg-danger">
                <p class="text-light fw-bold text-center mb-0 py-2" v-if="course.isSample === 1">
                  <font-awesome-icon icon="fa-solid fa-lock" /> Amostra
                </p>
              </div>
              <div class="card-body align-content-center" style="min-height: 70px">
                <h5 class="card-title fw-bold text-darkGreen mb-0 text-center">
                  {{ course.namecourse }}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <!-- <i class="fas fa-folder-open fa-3x text-muted mb-3"></i> -->
          <p class="fs-5 text-muted">Nenhum simulado encontrado.</p>
        </div>
      </section>
    </main>
  </Layout>
</template>

<style>
.page-size {
  min-height: calc(100dvh - 76px);
}
</style>
