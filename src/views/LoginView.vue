<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import instance from '@/services/api'
import WhiteAirplane from '@/assets/img/ebook/white_airplane.svg'
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

const userLoginForm = reactive(getInitialLoginFormData());
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
</script>

<template>
    <Layout>
        <main class="align-content-center page-size position-relative z-0" style="background-color: #146531;">
            <!-- login -->
            <section class="container position-relative z-1 py-5" v-reveal="'bottom'">
                <div class="row">
                    <div class="col-lg-6 col-xl-4 mx-auto bg-white p-4 rounded-4 shadow">
                        <h2 class="ff-roboto text-success text-center">Login</h2>
                        <hr class="border border-2 border-success">
                        <p class="text-center ff-roboto mb-3">Acesse com o seu email e senha cadastrados
                        </p>
                        <form class="pt-3" @submit.prevent="submitLogin">
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="email" class="form-label">E-mail</label>
                                        <input type="email"
                                            class="form-control fs-5 rounded-4 bg-secondary bg-opacity-10" id="email"
                                            placeholder="E-mail" v-model="userLoginForm.email" required>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="password" class="form-label">Senha</label>
                                        <input type="password"
                                            class="form-control fs-5 rounded-4 bg-secondary bg-opacity-10" id="password"
                                            placeholder="Senha" v-model="userLoginForm.password" required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col-12">
                                    <p class="small mb-0">
                                        <RouterLink to="/recuperar-senha" class="">Esqueceu sua senha?
                                        </RouterLink>
                                    </p>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col d-grid">
                                    <button type="submit" class="btn btn-success btn-lg fs-5 px-5 rounded-pill">
                                        {{ isSubmittingLogin ? 'Por favor, aguarde...' : 'Entrar' }}
                                    </button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <p class="text-center">
                                        <RouterLink to="/cadastro" class="">Criar uma conta</RouterLink>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div style="position: absolute; bottom: 0; right: 0; z-index: -1;">
                <img :src="WhiteAirplane" alt="Avião branco" class="" style="max-height: 450px;" />
            </div>
        </main>
    </Layout>
</template>

<style>
.page-size {
    min-height: calc(100dvh - 337px);
}
</style>