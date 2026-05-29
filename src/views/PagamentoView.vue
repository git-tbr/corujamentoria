<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSiteStore } from '@/stores/website';
import api from '@/services/api';
import { useAlert } from '@/services/alertService';

const { showAlert } = useAlert();

const router = useRouter();
const siteStore = useSiteStore();
const selectedCourse = ref<string>('');
const courseData = ref<any>({});
const userData = ref<any>({});

// variáveis de pagamento
const paymentType = ref<string>('vista');

// verifica se o usuário está logado e redireciona a pós o login
const getUserData = async () => {
    if (siteStore.isAuthenticated == false) {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    }

    try {
        const response = await api.get(`/api/users/${siteStore.userId}`);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        userData.value = data.user;
        console.log(userData.value)
    } catch (error) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';

        await showAlert({
            title: "Erro",
            message: errorMessage,
            type: "error",
        });
    }
}

// verifica se existe algum curso selecionado
const checkSelectedCourse = () => {
    if (sessionStorage.getItem('course') == null) {
        router.push({ name: 'home' });
    }

    selectedCourse.value = sessionStorage.getItem('course') as string;
}

// verifica se o pagamento está definido como true
const checkPaymentStatus = () => {
    let payment = sessionStorage.getItem('payment');

    if (payment == null || payment == 'false') {
        router.push({ name: 'home' });
    }
}

// carrega dados do curso que está sendo comprado
const getCourseData = async () => {
    try {
        const response = await api.get(`/api/courses/course/${selectedCourse.value}`);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        courseData.value = data.course;
        //aqui...
        console.log(courseData.value)

    } catch (error) {
        await showAlert({
            title: "Erro",
            message: error instanceof Error ? error.message : 'O curso não pôde ser carregado.',
            type: "error",
        });
    }
}

const moneyFormat = (value: number) => {
    let formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

    return formatter.format(value);
}

onMounted(() => {
    //verificar se o usuário está logado
    getUserData();

    //verificar se existe algum curso selecionado
    checkSelectedCourse();

    //verificar se o pagamento está definido como true
    checkPaymentStatus();

    //carregar dados do curso que está sendo comprado
    getCourseData();
})
</script>

<template>
    <Layout>
        <main class="page-size">
            <section class="container py-3 py-lg-5">
                <div class="row">
                    <div class="col-lg-9 mb-3 p-3">
                        <div class="row mb-4">
                            <div class="col-12 bg-light p-lg-4 rounded-4">
                                <div class="row mb-3">
                                    <div class="col-lg-4 mb-3 mb-lg-0">
                                        <img :src="courseData.i_path" alt="Miniatura do curso"
                                            class="img-fluid rounded-4">
                                    </div>
                                    <div class="col-lg-8">
                                        <p class="fs-4 mb-3 fw-semibold">
                                            {{ courseData.c_name }}
                                        </p>
                                        <p class="text-muted mb-3" v-html="courseData.c_description"></p>
                                        <p class="fw-semibold text-darkGreen mb-0 fw-semibold fs-4">
                                            {{ moneyFormat(courseData.c_value) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-12 bg-light p-lg-4 rounded-4">
                                <div class="row">
                                    <div class="col-12">
                                        <p class="fs-4 fw-semibold">
                                            Confirmação de Identidade
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 mb-3 mb-lg-0">
                                        <p class="text-muted mb-0">
                                            Nome do Aluno
                                        </p>
                                        <p class="fs-5 fw-semibold mb-0">
                                            {{ userData.u_firstname + ' ' + userData.u_lastname }}
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <p class="text-muted mb-0">
                                            E-mail
                                        </p>
                                        <p class="fs-5 fw-semibold mb-0">
                                            {{ userData.u_email }}
                                        </p>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col">
                                        <hr class="border-1 border-secondary my-0">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <RouterLink class="text-success fw-semibold text-decoration-none"
                                            :to="{ name: 'perfil', query: { redirect: router.currentRoute.value.fullPath } }">
                                            <font-awesome-icon icon="fa-solid fa-pencil" />
                                            Alterar dados cadastrais
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 bg-light p-lg-4 rounded-4">
                                <div class="row mb-3">
                                    <div class="col-12">
                                        <p class="fs-4 fw-semibold mb-0">
                                            Formas de Pagamento
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 mb-3 mb-lg-0">
                                        <div class="border border-secondary rounded-3 px-3 py-2">
                                            <div class="form-check d-flex align-items-center">
                                                <input class="form-check-input fs-5 border-secondary border"
                                                    type="radio" name="radioDefault" id="radioDefault1"
                                                    v-model="paymentType" checked>
                                                <label class="form-check-label ms-3 flex-fill" for="radioDefault1"
                                                    role="button">
                                                    <p class="fw-semibold mb-0">
                                                        Pagamento à vista
                                                    </p>
                                                    <p class="text-success mb-0">
                                                        Economize no pagamento à vista
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="border border-secondary rounded-3 px-3 py-2">
                                            <div class="form-check d-flex align-items-center">
                                                <input class="form-check-input fs-5 border-secondary border"
                                                    type="radio" name="radioDefault" id="radioDefault2"
                                                    v-model="paymentType">
                                                <label class="form-check-label ms-3 flex-fill" for="radioDefault2"
                                                    role="button">
                                                    <p class="fw-semibold mb-0">
                                                        Pagamento parcelado
                                                    </p>
                                                    <p class="text-success mb-0">
                                                        Parcelado em até 12x com juros
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-3 p-3">
                        <div class="p-4 bg-light rounded-4">
                            <div class="row">
                                <div class="col-12">
                                    <p class="fs-3 fw-semibold">
                                        Resumo do Pedido
                                    </p>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col-auto">
                                            <p class="text-muted mb-0">
                                                Subtotal
                                            </p>
                                        </div>
                                        <div class="col-auto">
                                            <p class="fw-semibold mb-0">
                                                {{ moneyFormat(courseData.c_value) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col-auto">
                                            <p class="text-success mb-0">
                                                Desconto
                                            </p>
                                        </div>
                                        <div class="col-auto">
                                            <p class="fw-semibold text-success mb-0">
                                                - {{ moneyFormat(courseData.c_value) }}
                                            </p>
                                        </div>
                                    </div>
                                    <hr class="border-1 border-secondary mb-2">
                                    <div class="row justify-content-between mb-3 mb-lg-5">
                                        <div class="col-auto">
                                            <p class="text-muted mb-0">
                                                Total
                                            </p>
                                        </div>
                                        <div class="col-auto">
                                            <p class="fw-semibold mb-0">
                                                {{ moneyFormat(courseData.c_value) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 d-grid mb-3">
                                            <button class="btn btn-success btn-lg rounded-4" @click="">
                                                Ir para o Pagamento
                                            </button>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted text-center">
                                                Ambiente de pagamento 100% seguro
                                            </p>
                                        </div>
                                    </div>
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
.page-size {
    min-height: calc(100dvh - (266px + 71px));
    background-color: #146531;
    background-image: url('@/assets/img/logo/white_airplane.svg');
    background-repeat: no-repeat;
    background-position: right bottom;
}
</style>