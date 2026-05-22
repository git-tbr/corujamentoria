<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import instance from '@/services/api'
import { useSiteStore } from '@/stores/website';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { vReveal } from '@/directives/vReveal';
import { RouterLink, useRoute } from 'vue-router';
import { useAlert } from '@/services/alertService';
const { showAlert } = useAlert();

const api = instance;
const siteStore = useSiteStore();
const router = useRouter();
const route = useRoute();

/*
async function testeDeBotao() {
    await showAlert({
        title: "Sucesso!",
        message: "Teste de alerta",
        type: "info",
    });
    
    const confirmou = await showAlert({
        title: "Tem certeza?",
        message: "Você deseja excluir este registro permanentemente?",
        type: "error",
        isConfirm: true
    });    

    if (confirmou) {
        alert("Registro excluído com sucesso!");
    } else {
        alert("Operação cancelada.");
    }
}
*/

interface LoginFormInterface {
    email: string;
    password: string;
    company: number;
    redirect: string;
    course: string | null;
}

const getInitialLoginFormData = (): LoginFormInterface => ({
    email: '',
    password: '',
    company: siteStore.company,
    redirect: '',
    course: ''
});

interface PasswordFormInterface {
    email: string;
    company: number;
}

const getInitialPasswordFormData = (): PasswordFormInterface => ({
    email: '',
    company: siteStore.company
});

const userLoginForm = reactive(getInitialLoginFormData());
const userPasswordForm = reactive(getInitialPasswordFormData());
const isSubmittingLogin = ref(false);
const isSubmittingPassword = ref(false);


const submitLogin = async () => {
    isSubmittingLogin.value = true;
    userLoginForm.redirect = sessionStorage.getItem('payment') ? 'payment' : 'home';
    userLoginForm.course = sessionStorage.getItem('course') ? sessionStorage.getItem('course') : '';

    try {
        const response = await api.post('/login', userLoginForm);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        siteStore.login(data.user);
        localStorage.setItem('tokenJwt', data.token);
        Object.assign(userLoginForm, getInitialLoginFormData());

        if (sessionStorage.getItem('payment') == 'true' && sessionStorage.getItem('course') != '') {
            await showAlert({
                title: "Sucesso!",
                message: data.message,
                type: "success",
            });

            sessionStorage.removeItem('payment');
            sessionStorage.removeItem('course');

            sessionStorage.setItem('paymentlink', data.link);

            window.location.href = data.link;
            return;
        }

        await showAlert({
            title: "Sucesso!",
            message: data.message,
            type: "success",
        });

        router.push({ name: 'home' });

    } catch (error: unknown) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';

        await showAlert({
            title: "Erro",
            message: errorMessage,
            type: "error",
        });
    } finally {
        isSubmittingLogin.value = false;
    }
}

const submitPassword = async () => {
    isSubmittingPassword.value = true;
    try {
        const response = await api.post('/recover-password', userPasswordForm);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        Object.assign(userPasswordForm, getInitialPasswordFormData());
        await showAlert({
            title: "Sucesso!",
            message: data.message,
            type: "success",
        });

        router.push({ name: 'home' });

    } catch (error: unknown) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
        await showAlert({
            title: "Erro",
            message: errorMessage,
            type: "error",
        });
    } finally {
        isSubmittingPassword.value = false;
    }
}

const recoverMode = computed(() => {
    return route.hash === '#recuperar-senha';
});
</script>

<template>
    <Layout>
        <main class="align-content-center page-size">
            <!-- login -->
            <section class="container py-5" v-reveal="'bottom'" v-if="!recoverMode">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="ff-teko text-white text-center">LOGIN</h1>
                        <p class="text-center text-white fs-4">Entre com seu email e senha cadastrados.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-xl-4 mx-auto">
                        <form class="text-light" @submit.prevent="submitLogin">
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <input type="email" class="form-control fs-5 rounded-0" id="email"
                                            placeholder="E-mail" v-model="userLoginForm.email" required>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <input type="password" class="form-control fs-5 rounded-0" id="password"
                                            placeholder="Senha" v-model="userLoginForm.password" required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-12">
                                    <p class="small mb-0">
                                        <RouterLink to="/login#recuperar-senha" class="text-light">Esqueceu sua senha?
                                        </RouterLink>
                                    </p>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-auto mx-auto">
                                    <button type="submit" class="btn btn-principal fs-5 px-5 rounded-pill">
                                        {{ isSubmittingLogin ? 'Por favor, aguarde...' : 'Entrar' }}
                                    </button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <p class="text-center">
                                        <RouterLink to="/cadastro" class="text-light">Criar uma conta</RouterLink>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- <section id="bg-login">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <h1 class="display-4 fw-bold mb-4">Bem-vindo de volta!</h1>
                            <p class="fs-5 mb-4">Faça login para acessar sua conta e continuar sua jornada.</p>
                            <form @submit.prevent="handleLogin">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" id="email" class="form-control" v-model="loginData.email"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Senha</label>
                                    <input type="password" id="password" class="form-control"
                                        v-model="loginData.password" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg w-100">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section> -->

            <!-- recuperar senha -->
            <section id="recuperar-senha" class="container py-5" v-reveal="'bottom'" v-else>
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="ff-teko text-white text-center">
                            RECUPERAR SENHA
                        </h1>
                        <p class="text-center text-white fs-4">
                            Enviaremos um email com o link para redefinir sua senha.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-xl-4 mx-auto">
                        <form class="text-light" @submit.prevent="submitPassword">
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <input type="email" name="emailrecover" id="emailrecover"
                                            v-model="userPasswordForm.email" class="form-control" placeholder="E-mail"
                                            required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-12">
                                    <p class="small mb-0">
                                        <RouterLink to="/login" class="text-light">Cancelar</RouterLink>
                                    </p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-auto mx-auto">
                                    <button type="submit" class="btn btn-principal fs-5 px-5 rounded-pill">
                                        {{ isSubmittingPassword ? 'Por favor, aguarde...' : 'Recuperar' }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style>
.page-size {
    min-height: calc(100dvh - 337px);
}
</style>