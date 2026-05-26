<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import api from '@/services/api'
import WhiteAirplane from '@/assets/img/ebook/white_airplane.svg'
import { useSiteStore } from '@/stores/website';
import { reactive, ref } from 'vue';
import { vReveal } from '@/directives/vReveal';
import { RouterLink, useRouter } from 'vue-router';
import { useAlert } from '@/services/alertService';
const { showAlert } = useAlert();

const siteStore = useSiteStore();
const router = useRouter();

interface PasswordFormInterface {
    email: string;
    company: number;
}

const getInitialPasswordFormData = (): PasswordFormInterface => ({
    email: '',
    company: siteStore.company
});

const userPasswordForm = reactive(getInitialPasswordFormData());
const isSubmittingPassword = ref(false);

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
</script>

<template>
    <Layout>
        <main class="align-content-center page-size position-relative z-0" style="background-color: #146531;">
            <!-- recuperar senha -->
            <section id="recuperar-senha" class="container position-relative z-1 py-5" v-reveal="'bottom'">
                <div class="row">
                    <div class="col-lg-6 col-xl-4 mx-auto bg-white p-4 rounded-4 shadow">
                        <h2 class="ff-roboto text-success text-center">
                            Recuperar Senha
                        </h2>
                        <hr class="border border-2 border-success">
                        <p class="text-center ff-roboto mb-3">
                            Enviaremos um email com o link para redefinir sua senha.
                        </p>
                        <form class="pt-3" @submit.prevent="submitPassword">
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <div class="form-group">
                                        <label for="emailrecover" class="form-label">E-mail</label>
                                        <input type="email" name="emailrecover" id="emailrecover"
                                            v-model="userPasswordForm.email" class="form-control" placeholder="E-mail"
                                            required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-12">
                                    <p class="small mb-0">
                                        <RouterLink to="/login" class="">Cancelar</RouterLink>
                                    </p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col d-grid">
                                    <button type="submit" class="btn btn-success fs-5 px-5 rounded-pill">
                                        {{ isSubmittingPassword ? 'Por favor, aguarde...' : 'Recuperar' }}
                                    </button>
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