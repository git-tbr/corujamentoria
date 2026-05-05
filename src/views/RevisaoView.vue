<script lang="ts" setup>
import whiteLogo from '@/assets/img/revisao/white_logo.png'
import Layout from '@/layouts/DefaultLayout.vue'
import BlockJamil from '@/assets/img/revisao/block-jamil.png'
import BlockAna from '@/assets/img/revisao/block-ana.png'
import RevisaoPreProvaComponent from '@/components/RevisaoPreProvaComponent.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref } from 'vue'

//image gallery
import gallery1 from '@/assets/img/revisao/img_01.jpg'
import gallery2 from '@/assets/img/revisao/img_02.jpg'
import gallery3 from '@/assets/img/revisao/img_03.jpg'
import gallery4 from '@/assets/img/revisao/img_04.jpg'
import gallery5 from '@/assets/img/revisao/img_05.jpg'
import gallery6 from '@/assets/img/revisao/img_06.jpg'
import gallery7 from '@/assets/img/revisao/img_07.jpg'
import gallery8 from '@/assets/img/revisao/img_08.jpg'

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8]
const visibleRef = ref<any>(false)
const indexRef = ref<any>(0)
const showImg = (index: number) => {
    indexRef.value = index
    visibleRef.value = true
}

const onHide = () => {
    visibleRef.value = false
}

</script>
<template>
    <Layout>
        <main>
            <!-- hero -->
            <section id="hero_revisao" class="align-content-center">
                <div class="container">
                    <div class="row">
                        <div class="col" v-reveal="'bottom'">
                            <img :src="whiteLogo" alt="" height="auto" class="mb-3" style="max-width: 350px;">
                            <h1 class="display-4 text-light fw-bold mb-3 ff-roboto">
                                Curso Revisão Pré-Prova
                            </h1>
                            <p class="fs-5 text-white">
                                Curso transmitido do Porto / Portugal em
                                <br>
                                07, 08 e 09 de novembro de 2025
                            </p>
                            <p class="fw-semibold text-light fs-4">
                                Investimento: &euro;290,00
                            </p>
                            <RouterLink class="btn btn-light fs-4 px-4 rounded-4" to="/login">Acesse o conteúdo
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>

            <!-- componente -->
            <RevisaoPreProvaComponent />

            <!-- professores -->
            <section class="container-fluid bg-gradient-green" id="professors">
                <article class="container py-3 py-lg-5">
                    <div class="row">
                        <div class="col">
                            <h1 class="text-light fw-bold mb-lg-3 text-center" v-reveal="'bottom'">
                                Professores
                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 p-3" v-reveal="'bottom'">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 p-0 rounded-start-4 bg-dark">
                                        <img :src="BlockJamil" alt="Dr Jamil Ribeiro Cade" class="w-100 rounded-4">
                                    </div>
                                    <div class="col-lg-6 p-0 bg-dark d-flex flex-column-reverse rounded-top-end-50">
                                        <div class="p-3">
                                            <h5 class="fw-semibold text-center text-light">
                                                Dr. Jamil Ribeiro Cade
                                            </h5>
                                            <p class="text-center text-lg-start text-light small p-3">
                                                Clínico geral, cardiologista clínico e intervencionista.
                                                Professor de Medicina e Doutor (PhD) no Brasil e Portugal.Aprovado com
                                                19 em 20 valores na
                                                revalidação em Portugal.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 p-3" v-reveal="'bottom'">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 p-0 rounded-end-4 bg-dark order-lg-2">
                                        <img :src="BlockAna" alt="Dra Ana Carolina Facundo" class="w-100 rounded-4">
                                    </div>
                                    <div class="col-lg-6 p-0 bg-dark d-flex flex-column rounded-bottom-start-50 ">
                                        <div class="p-3">
                                            <h5 class="fw-semibold text-center text-light">
                                                Dra. Ana Carolina Facundo
                                            </h5>
                                            <p class="text-center text-lg-end text-light small p-3">
                                                Médica de Família e Geriatra.
                                                <br>
                                                Supervisora do PMMB e professora de pós-graduação em MFC.
                                                <br>
                                                Aprovada com 17 em 20 valores na revalidação em Portugal.
                                                <br>
                                                Atualmente exerce a medicina em Portugal como Clínica Geral.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            <!-- chamada e apresentação do preço -->
            <section style="background-color: #07301C;" class="position-relative">
                <div id="bg-paperplane"></div>
                <div class="container py-5">
                    <div class="row">
                        <div class="col-lg-6">
                            <p class="fs-1 text-gold mb-3 fw-semibold" v-reveal="'bottom'">
                                Estude e revise com quem mais entende da prova e dê o primeiro passo rumo à Medicina em
                                Portugal.
                            </p>
                            <p class="fs-3 text-white mb-3 fw-semibold" v-reveal="'bottom'">
                                Sua aprovação começa com clareza, suporte e um plano validado.
                            </p>
                            <p class="fs-5 text-light mb-3 fw-semibold" v-reveal="'bottom'">
                                INVESTIMENTO: € 290,00
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- galeria -->
            <section>
                <div class="container py-3 py-lg-5">
                    <div class="row" v-reveal="'bottom'">
                        <div class="col">
                            <h1 class="text-center fw-bold ff-roboto mb-5 text-success" v-reveal="'bottom'">
                                Galeria
                            </h1>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div v-for="(src, index) in images" :key="index" class="col-6 col-md-4 col-lg-3">
                            <img :src="src" class="img-fluid rounded-3 hover-up" @click="() => showImg(index)"
                                style="object-fit: cover; height: 200px; width: 100%; cursor: pointer;" />
                        </div>
                    </div>
                    <VueEasyLightbox :visible="visibleRef" :imgs="images" :index="indexRef" @hide="onHide" />
                </div>
            </section>
        </main>
    </Layout>
</template>

<style>
#hero_revisao {
    background-image: url(../assets/img/revisao/banner.png);
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 50vh;
}

.bg-gradient-green {
    background-color: #08311C;
    background: linear-gradient(30deg, #08311C 0%, #126530 50%, #08311C 100%);
}

#bg-paperplane {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: bottom right
}

.hover-up {
    transition: transform 0.3s ease;
}

.hover-up:hover {
    transform: translateY(-4px);
}

@media (min-width: 992px) {
    #bg-paperplane {
        background-image: url(../assets/img/home/paper-airplane.png);
        background-size: 50%;
    }
}

@media (min-width: 1200px) {
    #bg-paperplane {
        background-size: 45%;
    }

    .rounded-top-end-50 {
        border-top-right-radius: 100%;
    }

    .rounded-bottom-start-50 {
        border-bottom-left-radius: 100%;
    }
}

@media (min-width: 1400px) {
    #bg-paperplane {
        background-size: 30%;
    }
}
</style>