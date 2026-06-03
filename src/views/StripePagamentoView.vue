<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();

// Captura os parâmetros da URL
const paymentId = computed(() => route.query.payment_id);
const status = computed(() => route.query.status as string || 'desconhecido');

// Lógica de tradução do status
const paymentStatus = computed(() => {
    if (!paymentId.value) {
        return {
            title: "Sessão inválida",
            message: "A sessão de pagamento não foi encontrada. Por favor, tente novamente ou entre em contato com o suporte.",
            icon: "fa-solid fa-circle-xmark",
            statusClass: "danger"
        };
    }

    switch (status.value) {
        case 'approved':
            sessionStorage.removeItem('paymentlink');
            return {
                title: "Pagamento realizado com sucesso!",
                message: "Obrigado por sua compra! Você receberá um email confirmando o pagamento!",
                icon: "fa-solid fa-circle-check",
                statusClass: "success"
            };
        case 'pending':
            return {
                title: "Pagamento pendente",
                message: "Seu pagamento ainda está sendo processado. Você será notificado por e-mail assim que for confirmado.",
                icon: "fa-solid fa-hourglass-half",
                statusClass: "warning"
            };
        case 'rejected':
        case 'failure':
            return {
                title: "Pagamento recusado ou cancelado",
                message: "O pagamento não foi aprovado. Por favor, tente novamente.",
                icon: "fa-solid fa-circle-xmark",
                statusClass: "danger"
            };
        default:
            return {
                title: "Pagamento Cancelado",
                message: `Você cancelou o processo de pagamento. Nenhum valor foi cobrado. Se isso foi um engano, você pode tentar novamente clicando no botão abaixo. <br> Caso queira pagar depois, retorne ao site, faça login e clique em <strong>"Adquira Agora"</strong> na página inicial.`,
                icon: "fa-solid fa-circle-xmark",
                statusClass: "danger"
            };
    }
});

const tryAgain = () => {
    const pl = sessionStorage.getItem('paymentlink');
    if (pl) {
        window.location.href = pl;
    } else {
        window.location.href = '/';
    }
}
</script>

<template>
    <Layout>
        <main class="align-content-center page-size">
            <section class="container py-5" v-reveal="'bottom'">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <div class="p-5 shadow rounded-5 bg-light">
                            <i :class="[paymentStatus.icon, `text-${paymentStatus.statusClass}`]"
                                class="fa-4x mb-4"></i>

                            <h1 :class="[`text-${paymentStatus.statusClass}`]" class="fw-bold mb-3">
                                {{ paymentStatus.title }}
                            </h1>

                            <p class="fs-5 text-dark" v-html="paymentStatus.message"></p>

                            <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
                                <button class="btn btn-primary btn-lg rounded-pill px-5" @click="tryAgain"
                                    v-if="status !== 'approved'">Tentar
                                    Novamente</button>
                                <RouterLink to="/" class="btn btn-danger btn-lg rounded-pill px-5">
                                    Página inicial
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