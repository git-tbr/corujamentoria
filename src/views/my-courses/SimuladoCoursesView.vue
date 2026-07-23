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
const simulados = ref<any[]>([])
const loading = ref(true)
const search = ref('')
const filterOrder = ref<'asc' | 'desc'>('asc')

// --- CURSO ---
const courseHash = ref('')

// --- BUSCA DA LISTA DE SIMULADOS ---
const fetchSimulados = async (courseToken: string) => {
  loading.value = true
  try {
    const res = await api.get(`/api/purchased-courses/simulate/list/${courseToken}`)
    const data = res.data
    if (data.code != 1) throw new Error(data.message)
    simulados.value = data.simulates
  } catch (error) {
    console.error('Erro ao carregar simulados:', error)
  } finally {
    loading.value = false
  }
}

// --- LÓGICA DE FILTRAGEM ---
const simuladosFiltrados = computed(() => {
  let lista = [...simulados.value]

  // Filtro de Texto
  if (search.value) {
    lista = lista.filter((s) => s.cat_title.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Ordenação A-Z / Z-A
  lista.sort((a, b) => {
    const titleA = a.cat_title.toLowerCase()
    const titleB = b.cat_title.toLowerCase()
    if (filterOrder.value === 'asc') return titleA.localeCompare(titleB)
    return titleB.localeCompare(titleA)
  })

  return lista
})

// --- NAVEGAÇÃO ---
const irParaSimulado = async (key: string) => {
  router.push({ name: 'banco-de-questoes', params: { token: key } })
}

onMounted(() => {
  const token = route.params.token as string
  courseHash.value = token
  const userId = siteStore.userId
  if (token) fetchSimulados(token)
})
</script>

<template>
  <Layout>
    <main class="page-size bg-coruja">
      <section class="container py-3 py-lg-5">
        <div class="row mb-3" v-reveal="'bottom'">
          <div class="col">
            <h1 class="ff-roboto text-white text-center">Simulados</h1>
            <hr class="border border-light mb-0" />
          </div>
        </div>

        <div class="row mb-4 m-0 align-items-center bg-light p-3 rounded shadow-sm">
          <div class="col-md-6 mb-3 mb-md-0">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
              <input v-model="search" type="text" class="form-control border-start-0"
                placeholder="Pesquisar simulado pelo título..." />
            </div>
          </div>
          <div class="col-md-3 mb-3 mb-md-0">
            <select v-model="filterOrder" class="form-select">
              <option value="asc">Ordem: A - Z</option>
              <option value="desc">Ordem: Z - A</option>
            </select>
          </div>
          <div class="col-md-3 text-center text-md-end">
            <span class="badge bg-principal px-3 py-2">
              {{ simuladosFiltrados.length }} simulado(s) encontrado(s)
            </span>
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-success"></div>
          <p class="mt-2 text-muted">Carregando simulados...</p>
        </div>

        <div v-else-if="simuladosFiltrados.length > 0" class="row g-4">
          <div v-for="item in simuladosFiltrados" :key="item.cat_id" class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 rounded-4 shadow hover-up">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-success-subtle text-success rounded-pill p-3 me-3">
                    <font-awesome-icon icon="fa-solid fa-file" />
                  </div>
                  <h5 class="card-title mb-0 fw-bold">{{ item.cat_title }}</h5>
                </div>
                <p class="card-text text-muted small">
                  Clique no botão abaixo para acessar as questões e testar seus conhecimentos.
                </p>
              </div>
              <div class="card-footer bg-transparent border-0 p-4 pt-0">
                <button @click="irParaSimulado(item.cat_key)" class="btn btn-success w-100 rounded-pill bg-gradient">
                  ACESSAR
                  <font-awesome-icon icon="fa-solid fa-chevron-right" class="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
          <p class="fs-5 text-muted">Nenhum simulado encontrado.</p>
        </div>
      </section>
    </main>
  </Layout>
</template>

<style scoped>
.hover-up {
  transition: transform 0.3s ease;
}

.hover-up:hover {
  transform: translateY(-5px);
}

.bg-principal {
  background-color: #28a745;
  /* Ajuste para a cor do seu projeto */
}
</style>
