<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { ref, onMounted, computed, shallowRef, onBeforeUnmount, watch, nextTick } from 'vue'
import { useSiteStore } from '@/stores/website'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/services/alertService'

import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js'

interface Chapter {
  id: number
  chapter: string
}

const { showAlert } = useAlert()

// --- PDF TEMPLATE REFS ---
const pdfNameEl = ref<HTMLDivElement | null>(null)
const pdfField = ref<HTMLDivElement | null>(null)
const pdfContainer = ref<HTMLDivElement | null>(null)

// --- ESTADOS DO PDF ---
const pdfDocument = shallowRef<any | null>(null)
const filterChapters = ref<number>(1)
const actualPage = ref<number>(1)
const totalPages = ref<number>(0)
const pdfExtended = ref<boolean>(false)

// --- INSTÂNCIAS ---
const api = instance
const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()

// --- ESTADO REATIVO ---
const ebook = ref<string>('')
const loading = ref<boolean>(true)
const RESOLUTION_FACTOR = 4
const isLargeScreen = ref<boolean>(window.innerWidth >= 992)

// --- CURSO ---
const courseHash = ref<string>('')

// --- CAPÍTULOS ---
const chapters = ref<Chapter[]>([
  { id: 1, chapter: 'Cardiologia' },
  { id: 2, chapter: 'Nefrologia' },
  { id: 3, chapter: 'Neurologia e Otorrino' },
  { id: 4, chapter: 'Pneumologia' },
  { id: 5, chapter: 'Endocrinologia' },
  { id: 6, chapter: 'Gastroenterologia' },
  { id: 7, chapter: 'Hematologia' },
  { id: 8, chapter: 'Infectologia' },
  { id: 9, chapter: 'Reumatologia e Ortopedia' },
  { id: 10, chapter: 'Cirurgia' },
  { id: 11, chapter: 'Pediatria' },
  { id: 12, chapter: 'Ginecologia e Obstetrícia' },
  { id: 13, chapter: 'Medicina Geral e Familiar' },
  { id: 14, chapter: 'Saúde Pública' },
  { id: 15, chapter: 'Psiquiatria' },
])

const updateScreenSize = (): void => {
  isLargeScreen.value = window.innerWidth >= 992
}

// --- BUSCA CONTEÚDO DO EBOOK ---
const fetchEbook = async (courseToken: string, chapterId: number): Promise<void> => {
  loading.value = true
  try {
    const res = await api.get(`/api/purchased-courses/ebook/${courseToken}/${chapterId}`)
    const data = res.data

    if (data.code != 1) throw new Error(data.message)

    ebook.value = data.ebookUrl || ''
    if (ebook.value) {
      loading.value = false
      await nextTick()
      await loadPdfDocument()
    } else {
      loading.value = false
    }
  } catch (error) {
    console.error('Erro ao carregar módulos:', error)
    showAlert({
      title: 'Erro',
      message: 'Não foi possível carregar o conteúdo do ebook.',
      type: 'error',
    })
    loading.value = false
  }
}

// --- MONITORAMENTO DA TROCA DE CAPÍTULO ---
watch(filterChapters, async (newCapId) => {
  actualPage.value = 1
  if (courseHash.value) {
    await fetchEbook(courseHash.value, newCapId)
  }
})

// --- PRÓXIMA PÁGINA ---
const nextPage = (): void => {
  if (actualPage.value < totalPages.value) {
    actualPage.value++
    renderPage(actualPage.value)
  }
}

// --- PÁGINA ANTERIOR ---
const previousPage = (): void => {
  if (actualPage.value > 1) {
    actualPage.value--
    renderPage(actualPage.value)
  }
}

// --- CHANGE PAGE ---
const changePage = (newPage: number): void => {
  actualPage.value = newPage
  renderPage(newPage)
}

// --- SEARCH PAGE ---
const searchPage = (): void => {
  if (actualPage.value < 1) {
    actualPage.value = 1
  }

  if (actualPage.value > totalPages.value) {
    actualPage.value = totalPages.value
  }

  changePage(actualPage.value)
}

// --- NAVEGAÇÃO POR TECLAS ---
const handleKeyDown = (event: KeyboardEvent): void => {
  if (!pdfDocument.value) return
  if (event.key === 'ArrowRight') nextPage()
  if (event.key === 'ArrowLeft') previousPage()
}

// --- CARREGAR A PÁGINA ---
const renderPage = async (pageNumber: number): Promise<void> => {
  const containerEl = pdfContainer.value
  const fieldEl = pdfField.value
  const nameEl = pdfNameEl.value

  if (!pdfDocument.value || !containerEl || !fieldEl) {
    console.error('Documento PDF não carregado ou Template Refs indisponíveis.')
    return
  }

  containerEl.innerHTML = ''
  fieldEl.classList.remove('d-none')
  let containerWidth = containerEl.offsetWidth

  if (containerWidth === 0) {
    console.warn(
      'Contêiner ainda tem largura 0. Pode haver um problema de CSS ou tempo de renderização.',
    )

    const fieldWidth = fieldEl.offsetWidth
    if (fieldWidth > 0) {
      console.log(`Usando largura do pai (pdfField): ${fieldWidth}`)
      containerWidth = fieldWidth
    } else {
      console.error('Nenhum contêiner possui largura definida. Verifique o CSS!')
      fieldEl.classList.add('d-none')
      return
    }
  }

  try {
    const page = await pdfDocument.value.getPage(pageNumber)

    const viewport = page.getViewport({ scale: 1.0 })
    const baseScale = containerWidth / viewport.width
    const finalScale = baseScale * RESOLUTION_FACTOR
    const scaledViewport = page.getViewport({ scale: finalScale })

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) throw new Error('Não foi possível obter o contexto 2D do Canvas.')

    canvas.width = scaledViewport.width
    canvas.height = scaledViewport.height

    canvas.style.width = `${containerWidth}px`
    canvas.style.height = 'auto'
    canvas.style.marginBottom = '0px'

    canvas.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      console.log(`Clique direito bloqueado na Página ${pageNumber}!`)
    })

    containerEl.appendChild(canvas)

    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
    }

    await page.render(renderContext).promise

    fieldEl.classList.remove('d-none')
    if (nameEl) nameEl.innerHTML = 'Manual Corujá'
  } catch (error) {
    console.error(`Erro ao renderizar a página ${pageNumber}:`, error)
    fieldEl.classList.add('d-none')
    if (nameEl) {
      nameEl.innerHTML = `<p class="fs-4 text-center text-danger mb-0">Erro ao renderizar a página ${pageNumber} do arquivo.</p>`
    }
  }
}

// --- CARREGAR O DOCUMENTO PDF ATUAL ---
const loadPdfDocument = async (): Promise<void> => {
  const name = 'Manual Corujá'
  const path = ebook.value
  const nameEl = pdfNameEl.value
  const fieldEl = pdfField.value

  if (!path) return

  if (!pdfContainer.value || !fieldEl) {
    console.error('Template Refs não estão prontas.')
    return
  }

  if (nameEl) nameEl.innerHTML = 'Carregando documento...'
  pdfContainer.value.innerHTML = 'Carregando documento...'
  fieldEl.classList.remove('d-none')

  const loadingTask = pdfjsLib.getDocument({
    url: path,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
    cMapPacked: true,
  })

  try {
    const pdf = await loadingTask.promise
    pdfDocument.value = pdf
    totalPages.value = pdf.numPages

    await renderPage(actualPage.value)
  } catch (error) {
    console.error('Erro ao carregar o PDF:', error)
    if (nameEl) {
      nameEl.innerHTML = `<p class="fs-4 text-center text-danger mb-0">Erro ao carregar o arquivo: ${name}</p>`
    }
    fieldEl.classList.add('d-none')
  }
}

onMounted(async () => {
  const token = route.params.token as string
  courseHash.value = token
  await fetchEbook(token, 1)

  window.addEventListener('resize', updateScreenSize)
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Layout>
    <main class="page-size bg-coruja">
      <div ref="pdfNameEl" class="d-none"></div>

      <section class="container py-3">
        <div class="row m-0 mb-3 align-items-center bg-light p-3 rounded shadow-sm" v-reveal="'bottom'">
          <div class="col-md-auto d-flex align-items-center">
            <button @click="router.go(-1)" class="btn btn-success btn-sm me-3 text-principal fw-bold">
              <font-awesome-icon icon="fa-solid fa-arrow-left" /> Voltar
            </button>
            <h4 class="mb-0 fw-bold">Manual Completo</h4>
          </div>
          <div class="col d-flex align-items-center justify-content-center gap-2">
            <button @click="previousPage" class="btn btn-success btn-sm">
              <font-awesome-icon icon="fa-solid fa-angle-left" />
            </button>
            <input type="number" class="border" min="1" :max="totalPages" v-model="actualPage" @keyup="searchPage"
              name="pageNumber" id="pageNumber" />
            <button @click="nextPage" class="btn btn-success btn-sm">
              <font-awesome-icon icon="fa-solid fa-angle-right" />
            </button>
          </div>
          <div class="col-auto ms-auto">
            <p class="mb-0">Capítulo:</p>
          </div>
          <div class="col-auto">
            <select v-model="filterChapters" class="form-select">
              <option v-for="v in chapters" :key="v.id" :value="v.id">
                {{ v.chapter }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary"></div>
          <p class="mt-2 text-muted">Carregando módulos...</p>
        </div>

        <div v-else-if="ebook.length > 0" class="row">
          <div ref="pdfField" class="col-12" id="pdfField">
            <div ref="pdfContainer" class="w-100" id="pdfContainer"></div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <font-awesome-icon icon="fa-solid fa-folder-open" size="3x" class="text-muted mb-3" />
          <p class="fs-5 text-muted">Nenhum conteúdo disponível para este curso ainda.</p>
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
</style>
