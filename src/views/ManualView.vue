<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import ManualLogo from '@/assets/img/ebook/logo.svg'
import CorujaMosaic from '@/assets/img/ebook/coruja.svg'
import WhiteAirplane from '@/assets/img/ebook/white_airplane.svg'
import { defineProduct } from '@/services/FunctionsService';
import { useAlert } from '@/services/alertService'
import { useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/website';

const { showAlert } = useAlert();
const router = useRouter();
const siteStore = useSiteStore();

const definePurchaseItem = (courseKey: string) => {
    let returnData = defineProduct(courseKey);

    if (returnData === 0) {
        showAlert({
            title: "Revisão Pré-Prova",
            message: "O curso ainda não está disponível para compra.",
            type: "error",
        });
        return;
    }
    
    router.push({ name: returnData as string });
}

</script>
<template>
    <Layout>
        <main>
            <!-- hero -->
            <section class="position-relative d-flex flex-direction-column align-items-center"
                style="background-color: #100f0f; min-height: 576px;">
                <div class="container position-relative z-1">
                    <div class="row mb-3">
                        <div class="col-lg-6">
                            <img :src="ManualLogo" alt="Manual Completo CoruJÁ" class="img-fluid mb-3" />
                            <h1 class="text-light fw-normal">O Guia Completo da <br> Equivalência e PNA</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <button class="btn btn-success btn-lg px-5 py-3 fs-4 rounded-4"
                                @click="definePurchaseItem(siteStore.ebook)">Comprar o Manual</button>
                        </div>
                    </div>
                </div>
                <img :src="CorujaMosaic" alt="Coruja Mosaico" class="position-absolute bottom-0 end-0 d-none d-xl-block"
                    style="max-height: 576px;" />
            </section>

            <section class="" style="background-color: #146531">
                <div class="container position-relative py-3 py-lg-5 z-1">
                    <div class="row">
                        <div class="col text-white fs-4 fw-normal">
                            <h1 class="mb-3 fw-bold ff-roboto display-4 text-center text-lg-start">
                                Sobre o Ebook
                            </h1>
                            <p class="">
                                Apresentamos os Manuais CoruJÁ: uma coleção inédita com <b>7 volumes</b> que reúde o
                                conteúdo
                                essencial das aulas ministradas pelo Dr. Jamil e Dra. Ana nas disciplinas mais cobradas
                                na prova de equivalência médica em Portugal.
                            </p>
                            <p class="">
                                Cada fascículo foi pensado para te guiar nos estudos de forma prática e objetiva, com
                                linguagem clara, foco no que realmente cai na prova e organizado por tema: <b>Clínica
                                    Médica I e II, Cirurgia, Pediatria, Ginecoligia e Obstetrícia, Medicina Geral e
                                    Familiar
                                    (MGF) e Saúde Pública.</b>
                            </p>
                            <p class="">
                                Ideal para acompanhar os encontors e revisar temas importantes e estruturar seu plano de
                                estudos com clareza e estratégia.
                            </p>
                            <p class="">
                                Um material completo, direto ao ponto, feito por quem já passou pela prova e sabe
                                exatamente o que você precisa esturdar para conquistar sua aprovação.
                            </p>
                            <p class="">
                                <b>Seja bem-vindo(a) ao CoruJÁ. Estudar com propósito é o primeiro passo para viver seu
                                    sonho em Portugal.</b>
                            </p>
                            <p class="fs-semibold text-end">
                                Autor(es)
                                <br>
                                Ana Carolina Facundo e Jamil Ribeiro Cade
                            </p>
                        </div>
                    </div>
                    <div style="position: absolute; bottom: 0; right: 0; z-index: -1;">
                        <img :src="WhiteAirplane" alt="Avião branco" class="" style="max-height: 500px;" />
                    </div>
                </div>
            </section>

            <section v-if="!siteStore.isAuthenticated">
                <div class="container py-3 py-lg-5">
                    <div class="row">
                        <div class="col">
                            <p class="display-4 access-title text-center fw-bold ff-roboto">
                                Acesse o Manual Completo
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto mx-auto">
                            <RouterLink to="/login" class="btn btn-danger btn-lg fs-1 px-5 py-2 rounded-4">
                                Fazer Login
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style scoped>
.access-title {
    font-weight: 700;
    background: linear-gradient(0deg, #2da95b, #124324);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>