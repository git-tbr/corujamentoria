<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import { RouterLink } from 'vue-router';
</script>

<template>
    <Layout>
        <main class="align-content-center page-size">
            <section class="container py-5" v-reveal="'bottom'">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <div class="p-5 shadow rounded-5 bg-light">
                            <h1 class="fw-bold mb-3 text-success">
                                Aguardando confirmação de pagamento
                            </h1>

                            <p class="fs-5 text-dark">O curso será liberado após a confirmação do pagamento. Verifique
                                seu email e acesse a área "Meus Cursos"</p>

                            <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
                                <RouterLink to="/" class="btn btn-danger btn-lg rounded-pill px-5">
                                    Página inicial
                                </RouterLink>
                                <RouterLink to="/meus-cursos" class="btn btn-primary btn-lg rounded-pill px-5">
                                    Meus cursos
                                </RouterLink>
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