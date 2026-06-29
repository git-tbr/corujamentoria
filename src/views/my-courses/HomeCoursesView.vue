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

const { showAlert } = useAlert()
const api = instance
const siteStore = useSiteStore()
const isLoading = ref(true)
const courses = ref<Course[]>([])
const router = useRouter()
const search = ref('')
const filterOrder = ref<'asc' | 'desc'>('asc')
//coursetype

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

onMounted(() => {
  fetchCourses()
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

        <div
          class="row m-0 mb-4 align-items-center bg-light p-3 rounded shadow-sm"
          v-reveal="'bottom'"
        >
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
              <input
                v-model="search"
                type="text"
                class="form-control border-start-0"
                placeholder="Pesquisar pelo nome do curso..."
              />
            </div>
          </div>
          <div class="col-md-3">
            <select v-model="filterOrder" class="form-select">
              <option value="asc">Ordem: A - Z</option>
              <option value="desc">Ordem: Z - A</option>
            </select>
          </div>
          <div class="col-md-3 text-md-end">
            <span class="badge bg-success px-3 py-2">
              {{ cursosFiltrados.length }} Curso(s) encontrado(s)
            </span>
          </div>
        </div>

        <div v-if="isLoading" class="text-center text-white" v-reveal="'bottom'">
          <p>Carregando cursos...</p>
        </div>

        <div v-else-if="cursosFiltrados.length > 0" class="row mb-3" v-reveal="'bottom'">
          <div
            class="col-md-4 col-lg-3 mb-4 to-up"
            v-for="course in cursosFiltrados"
            :key="course.courseid"
            @click="openCourse(course.coursetype, course.coursekey)"
            role="button"
          >
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
