<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Importação do PDF.js
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const router = useRouter();
const route = useRoute();
const api = instance;
const loading = ref(true);
const renderingPdf = ref(false);

const courseHash = ref('');
const moduleHash = ref<number>();
const moduloInfo = ref<any>(null);
const conteudos = ref<any[]>([]);

const selectedMaterialUrl = ref<string | null>(null);
const selectedMaterialName = ref<string | null>(null);

const pdfCanvasContainer = ref<HTMLElement | null>(null);
const fetchConteudoModulo = async (courseT: string, moduleT: number) => {
    loading.value = true;
    try {
        const res = await api.get(`/v1/course-ead-module-materials/${courseT}/${moduleT}`);
        if (res.data.code === 1) {
            moduloInfo.value = res.data.module;
            conteudos.value = res.data.materials;
            if (conteudos.value.length > 0) {
                const primeiro = conteudos.value[0];
                selectedMaterialUrl.value = primeiro.a_path;
                selectedMaterialName.value = primeiro.a_name;
            }
        }
    } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
    } finally {
        loading.value = false;
        await nextTick();
        if(selectedMaterialUrl.value){
            renderPdfToCanvas(selectedMaterialUrl.value);
        }
    }
}

const abrirMaterial = async (url: string, name: string) => {
    if (selectedMaterialUrl.value === url) return;

    selectedMaterialUrl.value = url;
    selectedMaterialName.value = name;
    
    await nextTick();
    renderPdfToCanvas(url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- LÓGICA DE CONVERSÃO PDF -> CANVAS (IMAGEM) ---
const renderPdfToCanvas = async (url: string) => {
    if (!pdfCanvasContainer.value && !url) return;
    
    renderingPdf.value = true;
    const container = document.getElementById('canvas-wrapper');
    if (container) container.innerHTML = ''; // Limpa visualização anterior

    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        
        // Renderiza todas as páginas (ou você pode limitar as primeiras para performance)
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            
            const viewport = page.getViewport({ scale: 1.0 }); // Ajuste de qualidade/zoom

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.className = "pdf-page-canvas shadow mb-4 w-100";
            
            // Impede clique direito no canvas individual
            canvas.oncontextmenu = (e) => e.preventDefault();

            container?.appendChild(canvas);

            const renderContext: any = {
                canvasContext: context!,
                viewport: viewport
            };
            await page.render(renderContext).promise;
        }
    } catch (error) {
        console.error("Erro na renderização:", error);
    } finally {
        renderingPdf.value = false;
    }
}

const returnToModule = () => {
    router.push({ name: 'modulo', params: { moduleToken: moduleHash.value, courseToken: courseHash.value }});
}

onMounted(() => {
    const courseToken = route.params.courseToken as string;
    const moduleToken = parseInt(route.params.moduleToken as string);
    courseHash.value = courseToken;
    moduleHash.value = moduleToken;
    if (courseToken && moduleToken) fetchConteudoModulo(courseToken, moduleToken);
})
</script>

<template>
    <Layout>
        <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
            <div class="spinner-border text-primary"></div>
        </div>

        <main v-else>
            <header class="bg-darkGreen text-white py-3 px-4 shadow">
                <div class="container">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-md-auto d-flex align-items-center">
                            <button @click="returnToModule" class="btn btn-light btn-sm me-3 text-principal fw-bold">
                                <font-awesome-icon icon="fa-solid fa-arrow-left" /> Voltar
                            </button>
                            <h4 class="mb-0 fw-bold">{{ moduloInfo }}</h4>
                        </div>
                        <!-- <div class="col-md-auto">
                            <div class="col-md-auto d-flex align-items-center gap-3 bg-white bg-opacity-10 p-2 rounded shadow-sm">
                                <div class="d-flex align-items-center me-2">
                                    <input 
                                        type="number" 
                                        v-model.number="tempoInicial" 
                                        @change="atualizarTempoInicial"
                                        class="form-control form-control-sm me-2 text-center" 
                                        style="width: 60px;"
                                        :disabled="timerAtivo"
                                    >
                                    <span class="fw-bold fs-5 font-monospace text-white">{{ formatarTempo(tempoRestante) }}</span>
                                </div>

                                <div class="btn-group shadow-sm">
                                    <button v-if="!timerAtivo" @click="iniciarTimer" class="btn btn-success btn-sm">
                                        <font-awesome-icon icon="fa-solid fa-play" />
                                    </button>
                                    <button v-else @click="pausarTimer" class="btn btn-warning btn-sm text-white">
                                        <font-awesome-icon icon="fa-solid fa-pause" />
                                    </button>
                                    <button @click="redefinirTimer" class="btn btn-outline-light btn-sm">
                                        <font-awesome-icon icon="fa-solid fa-rotate-right" />
                                    </button>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </header>

            <section class="container py-4">
                <div class="row g-4">
                    <div class="col-12 mb-3">
                        <div v-if="selectedMaterialUrl" class="card border-0 shadow-sm overflow-hidden">
                            <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                                <h6 class="mb-0">
                                    <font-awesome-icon icon="fa-solid fa-image" class="me-2 text-info" />
                                    Visualizando: {{ selectedMaterialName }}
                                </h6>
                            </div>
                            
                            <!-- CONTAINER DO CANVAS -->
                            <div class="pdf-viewer-canvas-container p-3 bg-secondary" @contextmenu.prevent>
                                <div v-if="renderingPdf" class="text-center py-5 text-white">
                                    <div class="spinner-grow text-light mb-2"></div>
                                    <p>Convertendo documento...</p>
                                </div>
                                <div id="canvas-wrapper" class="d-flex flex-column align-items-center">
                                    <!-- Os elementos <canvas> serão injetados aqui -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lista de Materiais -->
                <div class="row mb-5">
                    <p class="fw-bold mb-3 fs-5 text-muted">Materiais do Módulo:</p>
                    <div v-for="material in conteudos" :key="material.m_id" class="col-md-6 mb-3">
                        <div class="card h-100 border-1 shadow-sm hover-card" 
                             :class="{'active-material': selectedMaterialUrl === material.a_path}"
                             @click="abrirMaterial(material.a_path, material.a_name)">
                            <div class="card-body d-flex align-items-center">
                                <div class="icon-circle bg-danger-subtle text-danger me-3">
                                    <font-awesome-icon icon="fa-solid fa-file-pdf" size="lg" />
                                </div>
                                <div>
                                    <h6 class="mb-0 fw-bold">{{ material.a_name }}</h6>
                                    <small>{{ selectedMaterialUrl === material.a_path ? 'Aberto agora' : 'Clique para visualizar'}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style scoped>
/* Proteção contra seleção de texto e arraste */
.pdf-viewer-canvas-container {
    width: 100%;
    min-height: 600px;
    max-height: 80vh;
    overflow-y: auto;
    user-select: none; 
    -webkit-user-select: none;
}

#canvas-wrapper {
    width: 100%;
}

/* Estilização das "páginas" */
:deep(.pdf-page-canvas) {
    max-width: 100%;
    height: auto !important;
    background-color: white;
}

.active-material {
    background-color: #dc3545 !important;
    color: white !important;
}

.active-material h6 {
    color: white !important;
}

.hover-card:hover {
    border-left: 4px solid #dc3545 !important;
    cursor: pointer;
}
</style>