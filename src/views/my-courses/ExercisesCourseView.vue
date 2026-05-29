<script setup lang="ts">
import Layout from '@/layouts/CoursesLayout.vue'
import instance from '@/services/api'
import { ref, onMounted } from 'vue';
import { useSiteStore } from '@/stores/website';
import { useAlert } from '@/services/alertService';
import { useRoute, useRouter } from 'vue-router';

const { showAlert } = useAlert();
const api = instance;
const siteStore = useSiteStore();
const route = useRoute();
const router = useRouter();
const courseHash = ref<string>('');
const moduleHash = ref<number>();

// --- ESTADO REATIVO ---
const exercicios = ref<any[]>([]);
const moduloNome = ref<string>('');
const respostasUsuario = ref<Record<number, number>>({});
const isSubmitting = ref(false);
const carregando = ref(true);

// --- MÉTODOS DE BUSCA (API) ---
const fetchData = async (courseT: string, moduleT: number) => {
    try {
        carregando.value = true;
        const res = await api.get(`/v1/course-ead-module-exercises/${courseT}/${moduleT}`);

        moduloNome.value = res.data.module;
        exercicios.value = res.data.exercises.map((q: any) => ({
            ...q,
            verificada: false
        }));
    } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
        showAlert({ title: "Erro", message: "Não foi possível carregar os exercícios.", type: "error" });
    } finally {
        carregando.value = false;
    }
};

// --- LÓGICA DE ENVIO DO FORMULÁRIO COMPLETO ---
const enviarFormulario = async () => {
    const totalRespondidas = Object.keys(respostasUsuario.value).length;
    if (totalRespondidas < exercicios.value.length) {
        const confirm = await showAlert({
            title: "Atenção",
            message: "Você não respondeu todas as questões. Deseja enviar assim mesmo?",
            type: "warning",
            isConfirm: true
        });
        if (!confirm) return;
    }

    isSubmitting.value = true;

    try {
        const respostasCorretasGabarito = exercicios.value.reduce((acc, quest) => {
            const id = quest.a_id || quest.caq_id;
            const correta = quest.a_correct || quest.a_correct || quest.caq_correct;
            acc[id] = correta;
            return acc;
        }, {} as Record<number, number>);

        const response = await api.post('/api/courses/save-exercises-answer', {
            userId: siteStore.userId,
            company: siteStore.company,
            respostas: respostasUsuario.value,
            gabarito: respostasCorretasGabarito,
            course: courseHash.value,
            module: moduleHash.value
        });

        const dataApi = response.data.data;

        exercicios.value.forEach(q => {
            const idQuestao = q.a_id || q.caq_id;
            const infoAdicional = dataApi.justificativa.find((j: any) => j.a_id === idQuestao);

            if (infoAdicional) {
                q.justificativa = infoAdicional.a_justification;
                q.dica = infoAdicional.a_clue;
            }
            q.verificada = true;
        });

        await showAlert({
            title: "Resultado",
            message: `Você acertou ${dataApi.corretas} de ${dataApi.total} (${dataApi.porcentagem}%). Verifique as justificativas abaixo.`,
            type: "success",
        });

    } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        showAlert({ title: "Erro", message: "Falha ao enviar respostas.", type: "error" });
    } finally {
        isSubmitting.value = false;
    }
};

// --- HELPERS ---
const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const returnToModule = () => {
    router.push({ name: 'modulo', params: { moduleToken: moduleHash.value, courseToken: courseHash.value } });
}

const tryAgain = () => {
    respostasUsuario.value = {};
    exercicios.value.forEach(q => q.verificada = false);
}

onMounted(() => {
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    const courseToken: string | null = route.params.courseToken as string;
    const moduleToken: number | null = parseInt(route.params.moduleToken as string) as number;

    courseHash.value = courseToken;
    moduleHash.value = moduleToken;
    if (courseToken && moduleToken) fetchData(courseToken, moduleToken);
});
</script>

<template>
    <Layout>
        <main class="bg-secondary-subtle main-size">
            <header class="bg-gradient-diagonal text-white py-3 px-4 shadow mb-3">
                <div class="container">
                    <div class="d-flex align-items-center py-2">
                        <button @click="returnToModule" class="btn btn-light btn-sm me-3 text-principal fw-bold">
                            <font-awesome-icon icon="fa-solid fa-arrow-left" /> Voltar
                        </button>
                        <h4 class="mb-0 fw-bold">{{ moduloNome }}</h4>
                    </div>
                </div>
            </header>

            <section class="container my-3 bg-white rounded-4 p-5 shadow-sm">
                <div class="row text-center mb-4">
                    <div class="col">
                        <h1 class="ff-teko text-principal">Exercício de Fixação</h1>
                        <hr class="border-3 border-primary w-25 mx-auto">
                        <h3 class="h4">Módulo {{ moduloNome }}</h3>
                        <p class="text-muted">Escolha uma das opções em cada questão e clique em "enviar" para
                            finalizar.</p>
                    </div>
                </div>

                <!-- Lista de Exercícios -->
                <div v-if="!carregando && exercicios.length > 0">
                    <form @submit.prevent="enviarFormulario">
                        <div v-for="(quest, index) in exercicios" :key="quest.a_id || quest.caq_id"
                            class="mb-5 p-4 border rounded shadow-sm bg-light">
                            <p class="fs-5 fw-bold mb-3">
                                {{ index + 1 }}. <span v-html="capitalize(quest.a_question || quest.caq_title)"></span>
                            </p>

                            <!-- Alternativas -->
                            <div v-for="n in 4" :key="n"
                                class="form-check p-2 mb-2 border rounded bg-white transition-all" :class="{
                                    'border-success bg-success-subtle': quest.verificada && (quest.a_correct || quest.caq_correct) == n,
                                    'border-danger bg-danger-subtle': quest.verificada && respostasUsuario[quest.a_id || quest.caq_id] == n && (quest.a_correct || quest.caq_correct) != n
                                }">
                                <input class="form-check-input ms-2" type="radio"
                                    :name="'quest-' + (quest.a_id || quest.caq_id)"
                                    :id="'alt-' + n + '-' + (quest.a_id || quest.caq_id)" :value="n"
                                    v-model="respostasUsuario[quest.a_id || quest.caq_id]" :disabled="quest.verificada">
                                <label class="form-check-label ms-2"
                                    :for="'alt-' + n + '-' + (quest.a_id || quest.caq_id)">
                                    <span v-html="quest['a_answer' + n] || quest['caq_answer' + n]"></span>
                                </label>
                            </div>

                            <!-- feedback -->
                            <div v-if="quest.verificada" class="mt-3 animate__animated animate__fadeIn">
                                <div v-if="quest.dica" class="alert alert-info border-0 shadow-sm mb-2">
                                    <strong><font-awesome-icon icon="fa-solid fa-lightbulb" /> Dica:</strong>
                                    <span v-html="quest.dica"></span>
                                </div>

                                <div v-if="quest.justificativa"
                                    class="alert alert-light border-start border-4 border-primary shadow-sm">
                                    <strong><font-awesome-icon icon="fa-solid fa-circle-info" /> Justificativa:</strong>
                                    <span v-html="quest.justificativa"></span>
                                </div>

                                <!-- Indicador visual rápido -->
                                <div v-if="respostasUsuario[quest.a_id || quest.caq_id] == (quest.a_correct || quest.caq_correct)"
                                    class="text-success fw-bold">
                                    <font-awesome-icon icon="fa-solid fa-check-circle" /> Você acertou!
                                </div>
                                <div v-else class="text-danger fw-bold">
                                    <font-awesome-icon icon="fa-solid fa-circle-xmark" /> Você marcou a opção incorreta.
                                </div>
                            </div>
                        </div>

                        <!-- Botões de Ação -->
                        <div class="row mt-5">
                            <div class="col-4 d-grid">
                                <button type="button" class="btn btn-secondary fw-bold py-3"
                                    @click="returnToModule">Voltar / Cancelar</button>
                            </div>
                            <div class="col-4 d-grid">
                                <button type="button" class="btn btn-primary fw-bold py-3"
                                    @click="tryAgain">Tentar novamente</button>
                            </div>
                            <div class="col-4 d-grid">
                                <button type="submit" class="btn btn-success fw-bold py-3" :disabled="isSubmitting">
                                    {{ isSubmitting ? 'ENVIANDO...' : 'FINALIZAR E ENVIAR' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Estado Vazio ou Carregando -->
                <div v-else-if="!carregando" class="text-center py-5">
                    <p class="fs-4">Ainda não há exercícios disponíveis para este módulo.</p>
                </div>
                <div v-else class="text-center py-5">
                    <div class="spinner-border text-primary"></div>
                    <p>Carregando questões...</p>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style scoped>
.main-size {
    min-height: calc(100vh - 76px);
}
</style>