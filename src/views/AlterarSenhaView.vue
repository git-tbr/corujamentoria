<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import api from '@/services/api'
import { useSiteStore } from '@/stores/website';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/services/alertService';
const { showAlert } = useAlert();

const siteStore = useSiteStore();
const router = useRouter();
const route = useRoute();

interface PassRecoveryFormInterface {
    email: string;
    company: number;
    password: string;
    password_confirmation: string;
    token: string;
}

const getInitialpassRecoveryFormInterface = (): PassRecoveryFormInterface => ({
    email: '',
    company: 0,
    password: '',
    password_confirmation: '',
    token: ''
});

const passRecoveryForm = reactive(getInitialpassRecoveryFormInterface());
const isSubmittingPassRecovery = ref(false);
const seePassword = ref(false);
const seeConfirmPassword = ref(false);
const passChecked = ref('');

const submitPassRecovery = async () => {
    if(passRecoveryForm.password !== passRecoveryForm.password_confirmation){
        return showAlert({ title: "Erro", message: "As senhas não coincidem.", type: "error" });
    }
    isSubmittingPassRecovery.value = true;
    try {
        const response = await api.post('/reset-password', passRecoveryForm);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        await showAlert({
            title: "Sucesso!",
            message: data.message,
            type: "success",
        });

        Object.assign(passRecoveryForm, getInitialpassRecoveryFormInterface());
        router.push({ name: 'login' });

    } catch (error: unknown) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
        await showAlert({
            title: "Erro",
            message: errorMessage,
            type: "error",
        });
    } finally {
        isSubmittingPassRecovery.value = false;
    }
}

const passwordVisibility = (field: string) => {
    if(field === 'password'){
        seePassword.value = !seePassword.value;
    }else{
        seeConfirmPassword.value = !seeConfirmPassword.value;
    }
}

const passCheck = () => {
    if(passRecoveryForm.password === passRecoveryForm.password_confirmation){
        passChecked.value = '';
    }else{
        passChecked.value = 'border-danger border-3';
    }
}

const getEmail = async (recoverCode: string) => {
    try {
        const response = await api.get(`/user-email/${recoverCode}`);
        const data = response.data;
        if (data.code != 1) {
            throw new Error(data.message);
        }
        passRecoveryForm.email = data.email;
    } catch (error) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
        await showAlert({
            title: "Erro",
            message: errorMessage,
            type: "error",
        });
        router.push({ name: 'home' });
    }
}

onMounted(() => {
    const token: string | null = route.params.token as string;
    passRecoveryForm.token = token;
    passRecoveryForm.company = siteStore.company;
    getEmail(token);
})
</script>

<template>
    <Layout>
        <main class="align-content-center page-size position-relative z-0" style="background-color: #146531;">
            <section class="container position-relative z-1 py-5" v-reveal="'bottom'">
                <div class="row mb-3">
                    <div class="col-lg-6 col-xl-4 mx-auto bg-white p-4 rounded-4 shadow">
                        <h1 class="ff-roboto text-success text-center">
                            Redefinição de senha
                        </h1>
                        <hr class="border border-2 border-success">
                        <p class="text-center ff-roboto mb-3">
                            Preencha os campos abaixo para redefinir sua senha.
                        </p>
                        <form class="pt-3" @submit.prevent="submitPassRecovery">
                            <div class="row mb-3">
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="email" class="form-label">E-mail</label>
                                        <input type="email" class="form-control fs-5 rounded-4 bg-secondary bg-opacity-10" id="email"
                                            placeholder="E-mail" v-model="passRecoveryForm.email" required readonly>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="password" class="form-label">Senha</label>
                                        <div class="input-group">
                                            <input :type="seePassword ? 'text' : 'password'"
                                                class="form-control rounded-start-4 fs-5 bg-secondary bg-opacity-10" placeholder="Insira sua nova senha"
                                                aria-describedby="btn-password" v-model="passRecoveryForm.password"
                                                required>
                                            <button class="btn btn-light rounded-end-4 border" type="button" id="btn-password"
                                                @click="passwordVisibility('password')">
                                                <font-awesome-icon icon="fa-regular fa-eye-slash" v-if="seePassword" />
                                                <font-awesome-icon icon="fa-regular fa-eye" v-else />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="password_confirmation" class="form-label">Confirme sua Senha</label>
                                        <div class="input-group">
                                            <input :type="seeConfirmPassword ? 'text' : 'password'"
                                                :class="['form-control rounded-start-4 fs-5 bg-secondary bg-opacity-10', passChecked]" placeholder="Repita sua nova senha"
                                                aria-describedby="btn-confirmPassword" v-model="passRecoveryForm.password_confirmation" @input="passCheck"
                                                required>
                                            <button class="btn btn-light rounded-end-4 border" type="button" id="btn-confirmPassword"
                                                @click="passwordVisibility('confirm-password')">
                                                <font-awesome-icon icon="fa-regular fa-eye-slash" v-if="seeConfirmPassword" />
                                                <font-awesome-icon icon="fa-regular fa-eye" v-else />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col d-grid">
                                    <button type="submit" class="btn btn-success fs-5 px-5 rounded-pill">
                                        {{ isSubmittingPassRecovery ? 'Por favor, aguarde...' : 'Redefinir Senha' }}
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
    min-height: calc(100dvh - 320px);
}
</style>