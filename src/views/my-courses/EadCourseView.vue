<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { ref, onMounted, computed } from 'vue'
import { useSiteStore } from '@/stores/website'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/services/alertService'

const { showAlert } = useAlert()

// --- INSTÂNCIAS ---
const api = instance
const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()

// --- ESTADO REATIVO ---
const modulos = ref<any[]>([])
const courseName = ref<string>('')
const loading = ref(true)
const search = ref('')
const filterOrder = ref<'asc' | 'desc'>('asc')

// --- CURSO ---
const courseHash = ref('')

// --- BUSCA DA LISTA DE MÓDULOS ---
const fetchModulos = async (courseToken: string) => {
  loading.value = true
  try {
    const res = await api.get(`/api/purchased-courses/ead/modules/${courseToken}`)
    const data = res.data

    if (data.code != 1) throw new Error(data.message)

    courseName.value = data.course
    modulos.value = data.modules || []
  } catch (error) {
    console.error('Erro ao carregar módulos:', error)
    showAlert({
      title: 'Erro',
      message: 'Não foi possível carregar os módulos do curso.',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

// --- LÓGICA DE FILTRAGEM ---
const modulosFiltrados = computed(() => {
  let lista = [...modulos.value]

  // Filtro de Texto pelo título do módulo
  if (search.value) {
    lista = lista.filter((m) => m.m_name.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Ordenação
  lista.sort((a, b) => {
    const titleA = a.m_name.toLowerCase()
    const titleB = b.m_name.toLowerCase()
    if (filterOrder.value === 'asc') return titleA.localeCompare(titleB)
    return titleB.localeCompare(titleA)
  })

  return lista
})

// --- NAVEGAÇÃO ---
const irParaModulo = async (moduleId: number) => {
  router.push({ name: 'modulo', params: { moduleToken: moduleId, courseToken: courseHash.value } })
}

onMounted(() => {
  const token = route.params.token as string
  courseHash.value = token
  //const userId = siteStore.userId
  if (token) fetchModulos(token)
})
</script>

<template>
  <Layout>
    <main class="page-size bg-coruja">
      <section class="container py-3 py-lg-5">
        <div class="row mb-3" v-reveal="'bottom'">
          <div class="col">
            <h1 class="ff-roboto text-white text-center">Módulos do Curso: {{ courseName }}</h1>
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
            <span class="badge bg-principal px-3 py-2">
              {{ modulosFiltrados.length }} módulo(s) encontrado(s)
            </span>
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary"></div>
          <p class="mt-2 text-muted">Carregando módulos...</p>
        </div>

        <div v-else-if="modulosFiltrados.length > 0" class="row g-4">
          <div v-for="modulo in modulosFiltrados" :key="modulo.module_id" class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow hover-up">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-success-subtle text-success rounded-pill p-3 me-3">
                    <font-awesome-icon icon="fa-solid fa-book-open" />
                  </div>
                  <div>
                    <h5 class="card-title mb-0 fw-bold">{{ modulo.m_name }}</h5>
                    <!-- <small class="text-muted">{{ modulo.total_lessons || 0 }} aulas</small> -->
                  </div>
                </div>
                <p class="card-text text-muted small">
                  Acesse o conteúdo deste módulo para ver as videoaulas e materiais complementares.
                </p>
              </div>
              <div class="card-footer bg-transparent border-0 p-4 pt-0">
                <button @click="irParaModulo(modulo.m_id)" class="btn btn-success w-100 rounded-pill bg-gradient">
                  ESTUDAR AGORA
                  <font-awesome-icon icon="fa-solid fa-play" class="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <font-awesome-icon icon="fa-solid fa-folder-open" size="3x" class="text-muted mb-3" />
          <p class="fs-5 text-muted">Nenhum módulo disponível para este curso ainda.</p>
        </div>
      </section>
    </main>
  </Layout>
</template>

<style scoped>
.hover-up {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-up:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.bg-principal {
  background-color: #28a745;
}

.pointer {
  cursor: pointer;
}

.page-size {
  min-height: calc(100vh - 68px);
}

/* .bg-gradient-diagonal {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
} */
</style>
