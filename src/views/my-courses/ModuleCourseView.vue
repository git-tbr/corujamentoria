<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import PlayerComponent from '@/components/PlayerComponent.vue'
import InternalPlayerComponent from '@/components/InternalPlayerComponent.vue'
import instance from '@/services/api'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/website'
import { useAlert } from '@/services/alertService'

const { showAlert } = useAlert()

// --- INSTÂNCIAS ---
const api = instance
const route = useRoute()
const router = useRouter()
const siteStore = useSiteStore()

// --- ESTADO REATIVO ---
const loading = ref(true)
const courseName = ref<string>('')
const moduloInfo = ref<any>(null)
const conteudos = ref<any[]>([]) // Lista de vídeos
const videoAtual = ref<any>(null)
const watchedVideos = ref<number[]>([]) //array de vídeos assistidos

// --- CURSO ---
const courseHash = ref<string>('')
const moduleHash = ref<number>()

// --- BUSCA DE DADOS ---
const fetchConteudoModulo = async (courseT: string, moduleT: number) => {
  loading.value = true
  try {
    const res = await api.get(
      `/api/purchased-courses/ead/${courseT}/module/${moduleT}/user/${siteStore.userId}`,
    )

    if (res.data.code === 1) {
      moduloInfo.value = res.data.module
      courseName.value = res.data.course
      conteudos.value = res.data.videos // Array de vídeos
      watchedVideos.value = res.data.watched ?? [] // Array de vídeos assistidos

      // Define o primeiro vídeo como padrão ao carregar
      if (conteudos.value.length > 0) {
        videoAtual.value = conteudos.value[0]
      }

      if (res.data.last) {
        let lastVideoId = res.data.last.v_id
        let lastVideo = conteudos.value.find((video) => video.v_id === lastVideoId || video.id === lastVideoId)

        if (lastVideo) {
          videoAtual.value = lastVideo
        }
      }
      //salvarVideoAcessado()
    }
  } catch (error) {
    console.error('Erro ao carregar conteúdo:', error)
  } finally {
    loading.value = false
  }
}

// --- AÇÕES ---
const selecionarVideo = (video: any) => {
  videoAtual.value = video
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const irParaExercicios = () => {
  router.push({
    name: 'exercicios',
    params: { courseToken: courseHash.value, moduleToken: moduleHash.value },
  })
}

const irParaMateriais = () => {
  router.push({
    name: 'materiais',
    params: { courseToken: courseHash.value, moduleToken: moduleHash.value },
  })
}

const toModules = () => {
  router.push({ name: 'ead', params: { token: courseHash.value } })
}

const salvarVideoAcessado = async () => {
  try {
    //post para salvar o usuário e o vídeo no banco de dados
    const res = await api.post(`/api/courses/course-ead-accessed-video`, {
      userid: siteStore.userId,
      videokey: videoAtual.value.v_key,
    })
    if (res.data.code != 1) throw new Error(res.data.message)
  } catch (error) {
    console.error('Erro ao salvar vídeo acessado:', error)
  }
}

const markAsConcluded = () => {
  if (!watchedVideos.value.includes(videoAtual.value.v_id)) {
    watchedVideos.value.push(videoAtual.value.v_id)
    salvarVideoAcessado()
  }
}

onMounted(() => {
  const courseToken: string | null = route.params.courseToken as string
  const moduleToken: number | null = parseInt(route.params.moduleToken as string) as number

  courseHash.value = courseToken
  moduleHash.value = moduleToken
  if (courseToken && moduleToken) fetchConteudoModulo(courseToken, moduleToken)
})
</script>

<template>
  <Layout>
    <div v-if="loading" class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary"></div>
    </div>

    <main v-else class="page-size bg-coruja">
      <header class="bg-darkGreen text-white py-3 px-4 shadow">
        <div class="container">
          <div class="d-flex align-items-center py-2">
            <button @click="toModules" class="btn btn-light btn-sm me-3 text-principal fw-bold">
              <font-awesome-icon icon="fa-solid fa-arrow-left" />
              Voltar
            </button>
            <h4 class="mb-0 fw-bold">{{ courseName }}: {{ moduloInfo }}</h4>
          </div>
        </div>
      </header>

      <div class="container align-content-center py-3 py-lg-4">
        <div class="row g-0 bg-white">
          <div class="col-lg-9 border fullSize">
            <div class="shadow-lg bg-black">
              <div v-if="videoAtual">
                <PlayerComponent v-if="videoAtual.v_type != 'i'" :video-key="videoAtual.v_key" />
                <InternalPlayerComponent v-else :video-key="videoAtual.v_key" />
              </div>
              <div v-else class="d-flex align-items-center justify-content-center text-white">
                <p>Selecione uma aula para começar.</p>
              </div>
            </div>

            <div class="p-4">
              <div class="row">
                <div class="col mb-3 mb-lg-0">
                  <h3 class="fw-bold">{{ videoAtual?.v_title || 'Título do vídeo' }}</h3>
                </div>
                <div class="col-lg-auto d-grid">
                  <button @click="markAsConcluded" class="btn btn-success">
                    Marcar aula como assistida
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-muted">{{ videoAtual?.v_synopsis || '' }}</p>
                </div>
              </div>


            </div>
          </div>

          <div class="col-lg-3 bg-white border fullSize" style="overflow-y: auto">
            <div class="p-3 border-bottom bg-light border-top">
              <h6 class="mb-0 fw-bold">Conteúdo do Módulo</h6>
            </div>

            <div class="list-group list-group-flush" style="max-height: calc(700px - 168px); overflow-y: auto">
              <button v-for="(video, index) in conteudos" :key="video.id" @click="selecionarVideo(video)"
                class="list-group-item list-group-item-action border-bottom p-3 transition" :class="{
                  'active-video': videoAtual?.v_id === video.v_id
                }">
                <div class="d-flex align-items-center">
                  <div class="me-3 small text-muted">{{ index + 1 }}</div>
                  <div class="flex-grow-1">
                    <p class="mb-0 small fw-bold text-dark">
                      <font-awesome-icon v-if="watchedVideos.includes(video.v_id)" icon="fa-solid fa-circle-check"
                        class="text-success me-2" />
                      {{ video.v_title }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <!-- adicional -->
            <div class="p-3 bg-light border-top border-bottom small fw-bold text-secondary text-uppercase">
              Recursos Extras
            </div>

            <!-- <button @click="irParaExercicios" class="list-group-item list-group-item-action p-3">
                <div class="d-flex align-items-center text-principal">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-3" />
                  <div>
                    <p class="mb-0 fw-bold">Exercícios de Fixação</p>
                    <span class="small text-muted">Teste seus conhecimentos</span>
                  </div>
                </div>
              </button> -->

            <button @click="irParaMateriais" class="list-group-item list-group-item-action p-3 border-bottom">
              <div class="d-flex align-items-center text-principal">
                <font-awesome-icon icon="fa-solid fa-file-pdf" class="me-3" />
                <div>
                  <p class="mb-0 fw-bold">Materiais Anexos</p>
                  <span class="small text-muted">Conteúdo em PDF</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>
.fullSize {
  height: 700px;
}

@media (max-width: 992px) {
  .fullSize {
    height: auto;
  }
}

.active-video {
  background-color: #f0f7ff !important;
  border-left: 4px solid #0d6efd !important;
}

.transition {
  transition: all 0.2s ease;
}

.list-group-item:hover:not(.active-video) {
  background-color: #f8f9fa;
}

/* Custom Scrollbar para a lista lateral */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.page-size {
  min-height: calc(100vh - 68px);
}
</style>
