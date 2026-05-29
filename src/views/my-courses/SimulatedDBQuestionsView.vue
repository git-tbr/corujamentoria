<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { ref, onMounted, reactive } from 'vue';
import { useSiteStore } from '@/stores/website';
import { useAlert } from '@/services/alertService';
import { useRoute, useRouter } from 'vue-router';

const { showAlert } = useAlert();
const api = instance;
const siteStore = useSiteStore();
const route = useRoute();
const router = useRouter();

// --- ESTADO REATIVO ---
const exercicios = ref<any[]>([]);
const tituloSimulado = ref<any>(null);
const chaveSimulado = ref<string>('');
const respostasUsuario = ref<Record<number, number>>({});
const isSubmittingAnswer = ref(false); // Feedback de carregamento ao salvar resposta

// --- MÉTODOS DE BUSCA (API) ---
const fetchData = async (coursekey: string) => {
    try {
        // 1. Busca o Título do Simulado
        const resTitle = await api.post('/v1/simulate-title', {
            company: siteStore.company,
            key: coursekey
        });

        tituloSimulado.value = resTitle.data.cat_title;

        // 2. Busca as Questões
        const resQuestions = await api.post('/v1/simulate-questions', {
            company: siteStore.company,
            key: coursekey
        });

        // 3. Inicializa o array de exercícios
        exercicios.value = resQuestions.data.map((q: any) => ({
            ...q,
            verificada: false,
            acertou: false
        }));

        // 4. Recupera progresso local (opcional, já que agora salva no banco)
        loadLocalProgress();

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
};

// --- LÓGICA DO SIMULADO COM ENVIO PARA BACKEND ---
const verificarResposta = async (quest: any) => {
    const selecionada = respostasUsuario.value[quest.caq_id];

    if (!selecionada) {
        await showAlert({
            title: "Atenção",
            message: "Por favor, selecione uma alternativa antes de verificar.",
            type: "warning",
        });
        return;
    }

    isSubmittingAnswer.value = true;

    try {
        await api.post('/api/courses/save-simulate-answer', {
            question_id: quest.caq_id,
            answer: selecionada,
            userId: siteStore.userId
        });

        // Validação Local na Interface
        quest.verificada = true;
        quest.acertou = (selecionada == quest.caq_correct);

        saveLocalProgress();
    } catch (error) {
        console.error("Erro ao salvar resposta no servidor:", error);
        await showAlert({
            title: "Erro",
            message: "Erro ao salvar resposta. Verifique sua conexão.",
            type: "error",
        });
    } finally {
        isSubmittingAnswer.value = false;
    }
};

const clearHistory = async () => {
    const confirmou = await showAlert({
        title: "Atenção",
        message: "Deseja remover suas respostas para tentar novamente?",
        type: "warning",
        isConfirm: true
    });

    if (confirmou) {
        respostasUsuario.value = {};
        exercicios.value.forEach(q => {
            q.verificada = false;
            q.acertou = false;
        });
        localStorage.removeItem(`simulado_progress_${chaveSimulado.value}`);

        // --- limpar o histórico no servidor ---
        try {
            const response = await api.post('/api/courses/clear-simulate-history', {
                userId: siteStore.userId,
                assessmentKey: chaveSimulado.value,
                company: siteStore.company
            });

            if (response.data.code != 1) throw new Error(response.data.message);
            
            await showAlert({
                title: "Sucesso",
                message: response.data.message,
                type: "success",
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            await showAlert({
                title: "Erro",
                message: `Erro ao limpar histórico: ${errorMessage}`,
                type: "error",
            });
        }
    }
};

// --- HELPERS ---
const getLetra = (n: number) => ['A', 'B', 'C', 'D', 'E'][n - 1];
const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
const isCorrectPath = (quest: any, n: number) => quest.verificada && n == quest.caq_correct;

const saveLocalProgress = () => {
    const data = {
        respostas: respostasUsuario.value,
        verificadas: exercicios.value.filter(q => q.verificada).map(q => q.caq_id)
    };
    localStorage.setItem(`simulado_progress_${chaveSimulado.value}`, JSON.stringify(data));
};

const loadLocalProgress = () => {
    const saved = localStorage.getItem(`simulado_progress_${chaveSimulado.value}`);
    if (saved) {
        try {
            const { respostas, verificadas } = JSON.parse(saved);
            respostasUsuario.value = respostas;
            exercicios.value.forEach(q => {
                if (verificadas.includes(q.caq_id)) {
                    q.verificada = true;
                    q.acertou = (respostas[q.caq_id] == q.caq_correct);
                }
            });
        } catch (e) { console.error(e); }
    }
};

onMounted(() => {
    const token: string | null = route.params.token as string;
    chaveSimulado.value = token;
    fetchData(token);
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    })
});
</script>
<template>
    <Layout>
        <main class="blocked-main">

            <section class="bg-white pt-5 pb-5">
                <div class="container">
                    <div class="row mb-4 text-center">
                        <div class="col">
                            <h1 class="ff-roboto text-principal">BANCO DE QUESTÕES</h1>
                            <h2 v-if="tituloSimulado" class="h4 text-secondary">{{ tituloSimulado }}</h2>
                        </div>
                    </div>

                    <div class="row mb-4 justify-content-center">
                        <div class="col-auto">
                            <button class="btn btn-secondary btn-sm px-5" @click="router.go(-1)">Voltar</button>
                        </div>
                        <div class="col-auto">
                            <button @click="clearHistory" class="btn btn-danger btn-sm px-3">
                                <font-awesome-icon icon="fa-solid fa-trash-can" /> Limpar Histórico
                            </button>
                        </div>
                    </div>

                    <div v-if="exercicios.length > 0">
                        <div v-for="(quest, index) in exercicios" :key="quest.caq_id"
                            class="row mb-5 border-bottom pb-4">

                            <div
                                class="col-12 bg-secondary-subtle border-start border-4 border-success rounded p-2 mb-3">
                                <p class="fs-5 fw-bold mb-0">Questão {{ index + 1 }}</p>
                            </div>

                            <div class="col-12 mb-2">
                                <p class="mb-4" v-html="capitalize(quest.caq_title)"></p>

                                <div v-for="n in 5" :key="n" class="form-check p-3 mb-2 border rounded transition-all"
                                    :class="{
                                        'border-success bg-success-subtle fw-bold': isCorrectPath(quest, n),
                                        'border-danger bg-danger-subtle': quest.verificada && respostasUsuario[quest.caq_id] == n && !quest.acertou,
                                    }">
                                    <input class="form-check-input ms-0 me-3 border-secondary border-2" type="radio"
                                        :name="'question-' + quest.caq_id" :id="'a' + n + '-' + quest.caq_id" :value="n"
                                        v-model="respostasUsuario[quest.caq_id]" :disabled="quest.verificada">
                                    <label class="form-check-label" :for="'a' + n + '-' + quest.caq_id">
                                        {{ getLetra(n) }}) <span v-html="quest['caq_answer' + n]"></span>
                                    </label>
                                </div>

                                <div v-if="quest.verificada" class="mt-4">
                                    <div
                                        :class="['p-3 rounded-top text-white', quest.acertou ? 'bg-success' : 'bg-danger']">
                                        <p class="mb-0 fw-bold">
                                            {{ quest.acertou ? '✓ Correta' : '✗ Incorreta' }} - Alternativa correta: {{
                                            getLetra(quest.caq_correct) }}
                                        </p>
                                    </div>
                                    <div class="p-4 border border-top-0 rounded-bottom bg-white shadow-sm">
                                        <p class="fw-bold text-muted mb-2">Justificativa:</p>
                                        <div v-html="quest.caq_justification"></div>
                                        <hr>
                                        <p class="fw-bold text-success mb-2" v-if="quest.caq_clue">Dicas das Experts:</p>
                                        <div v-html="quest.caq_clue" ></div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mt-3 text-center">
                                <button v-if="!quest.verificada" class="btn btn-success px-5 py-2 rounded-pill"
                                    :disabled="isSubmittingAnswer" @click="verificarResposta(quest)">
                                    {{ isSubmittingAnswer ? 'SALVANDO...' : 'VERIFICAR RESPOSTA' }}
                                </button>
                                <div v-else class="text-muted fw-bold">
                                    <i class="fas fa-check-circle me-1"></i> Concluída
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-5">
                        <div class="spinner-border text-success"></div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style scoped>
.blocked-main{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>