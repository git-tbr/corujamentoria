<script lang="ts" setup>
import DoctorsCircle from '@/assets/img/home/doutores_circulo.png'
import DoctorsLaptop from '@/assets/img/home/doutores_laptop.png'
import garantido from '@/assets/img/home/garantido.png'
import noventaenove from '@/assets/img/home/99.png'
import DrJamil from '@/assets/img/mentoria/dr_jamil.webp'
import DraAna from '@/assets/img/mentoria/dra_ana.webp'
import DraBruna from '@/assets/img/mentoria/dra_bruna.webp'
import BgSemicircle from '@/assets/img/home/background_semicircle.png'
import DoctorsStanding from '@/assets/img/home/doctors_standing.png'

import Layout from '@/layouts/DefaultLayout.vue'
import Logo from '@/assets/img/logo/logo.png'
import { useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/website'

const router = useRouter()
const siteStore = useSiteStore()

const setPaymentAndRedirect = () => {
    const courseKey = siteStore.mentoria
    sessionStorage.setItem('payment', 'true')
    sessionStorage.setItem('course', courseKey)
    router.push('/pagamento')
}

const conquista = [
    { id: 1, content: 'Material didático organizado e validado com o que realmente cai na prova;' },
    { id: 2, content: 'Mais de 150 aulas gravadas dividas por especialidades (Ginicologia e obstetrícia, Pediatria, Psiquiatria, Medicina Geral e Familia, Saúde Pública, Clínica Médica, Cirurgia);' },
    { id: 3, content: 'Banco de questões com mais de 2.500 questões comentadas discutidas e revisadas com todas as provas de PNA e equivalência, para o aluno fixar e entender as dinâmicas das provas;' },
    { id: 4, content: 'Resumos, tabelas e materiais de apoio exclusivos;' },
    { id: 5, content: 'Grupo de apoio ao vivo, único no mercado;' },
    { id: 6, content: 'Dois encontros semanais ao vivo para tirar dúvidas;' },
    { id: 7, content: 'Acompanhamento direto dos médicos com as maiores notas do processo;' },
];

const resultadosList = [
    { id: 1, img: garantido, text: `<strong>84% de aprovação</strong> na 1ª fase da prova de equivalência em 2024.` },
    { id: 2, img: garantido, text: `<strong>88% de aprovação</strong> na 1ª fase da prova de equivalência em 2025.` },
    { id: 3, img: noventaenove, text: `<strong>99% de aprovação</strong> na 2ª fase no mesmo ano.` },
    { id: 4, img: garantido, text: `Mentoria conduzida pelos médicos com as <strong>maiores notas já registradas no processo</strong>.` },
];

const doctorsImages = [
    { id: 1, img: DrJamil, name: 'Dr. Jamil Ribeiro Cade', content: 'Clínico geral, cardiologista clínico e intervencionista. \n Doutor (PhD) pela UNIFESP e UPorto. Aprovado com 19 em 20 valores com notas máximas na revalidação em Portugal.' },
    { id: 2, img: DraAna, name: 'Dra. Ana Carolina Facundo', content: 'Médica de família e comunidade, geriatra, e supervisora do Programa Mais Médicos. \n Aprovada com 17 em 20 valores; nota máxima na segunda fase e nota máxima atribuída em currículo na terceira fase.' },
    { id: 3, img: DraBruna, name: 'Dra. Bruna Soares Bicalho', content: 'Clínica geral e hematologista-hemoterapeuta. \n Aprovada na revalidação em Portugal com nota 17 em 20 valores, com nota máxima na terceira fase.' },
];
</script>
<template>
    <Layout>
        <main>
            <!-- hero -->
            <section id="hero" class="align-content-center">
                <div id="hero-mozaic"></div>
                <div id="hero-bg"></div>
                <div class="container py-5" id="hero-container">
                    <div class="row mb-3">
                        <div class="col-lg-8">
                            <!-- logo -->
                            <img :src="Logo" alt="Logo CoruJÁ" class="img-fluid mb-3">

                            <!-- content -->
                            <h3 class="text-white fw-semibold mb-3 ff-roboto">
                                Revalide seu diploma médico em Portugal com quem teve as maiores notas da história do
                                concurso.
                            </h3>

                            <p class="fs-4 text-white mb-3">
                                Chega de estudar no escuro. Com a CoruJÁ Mentoria, você segue um plano validado por
                                médicos que já passaram — e com excelência.
                            </p>

                            <p class="fs-4 text-gold fw-semibold mb-3">
                                Tudo o que você precisa para se preparar com segurança, foco e resultados.
                            </p>

                            <div class="row text-light">
                                <div class="col-auto align-self-center">
                                    <i class="fa-solid fa-credit-card fa-2x"></i>
                                </div>
                                <div class="col align-self-center">
                                    <p class="fs-2 fw-bold mb-0">
                                        € 799,00 à vista
                                    </p>
                                </div>
                            </div>
                            <p class="fs-5 text-light">
                                pagamento em real em até 12x com juros.
                            </p>
                            <p class="pt-3 small text-light">
                                *** o valor do curso em real varia de acordo com a cotação do euro
                            </p>
                            <button class="btn btn-danger btn-lg px-5 fs-5 fw-semibold rounded-4"
                                @click="setPaymentAndRedirect">
                                ADQUIRA AGORA!
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- sobre nós -->
            <section class="">
                <div class="container py-3">
                    <div class="row">
                        <div class="col-md-6 mb-3 mb-lg-0 align-self-center">
                            <img :src="DoctorsCircle" alt="Doutores Jamil Cade e Ana Facundo" class="img-75"
                                v-reveal="'bottom'">
                        </div>
                        <div class="col-md-6 align-self-center">
                            <h1 class="text-success ff-roboto fw-semibold mb-3" v-reveal="'bottom'">
                                Quem Somos?
                            </h1>
                            <p class="fs-5" v-reveal="'bottom'">
                                A <span class="fw-semibold">CoruJÁ Mentoria</span> nasceu da experiência de dois médicos
                                brasileiros que enfrentaram e venceram o processo de revalidação médica em Portugal,
                                atingindo as maiores notas da história.
                                <br>
                                <br>
                                Transformamos a nossa trajetória em um método exclusivo que já aprovou 84% na primeira
                                fase em 2024 e 88% em 2025. Já na segunda fase, aprovamos 99%.
                                <br>
                                <br>
                                <span class="text-success fw-semibold">Criamos a mentoria que gostaríamos de ter
                                    tido
                                    quando estávamos do outro lado.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- o que você conquista  -->
            <section>
                <div class="container py-3">
                    <div class="row">
                        <div class="col-md-6 align-self-center order-md-2">
                            <img :src="DoctorsLaptop" alt="Doutores Jamil Cade e Ana Facundo" class="img-75"
                                v-reveal="'bottom'">
                        </div>
                        <div class="col-md-6 align-self-center">
                            <h1 class="text-success ff-roboto fw-semibold mb-3">
                                O que você conquista com a CoruJÁ?
                            </h1>
                            <ul class="list-unstyled fs-5 mb-3 order-md-1">
                                <li class="mb-2" v-reveal="'bottom'" v-for="item in conquista" :key="item.id">
                                    <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success" />
                                    {{ item.content }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- resultados que comprovam -->
            <section class="bg-darkGreen">
                <div class="container py-5">
                    <div class="row mb-5" v-reveal="'bottom'">
                        <h1 class="text-lightGreen text-center fw-bold ff-roboto">
                            Resultados que comprovam
                        </h1>
                        <h1 class="text-lemonGreen fw-bold ff-roboto text-center display-4">
                            nosso método
                        </h1>
                    </div>

                    <div class="row py-5">
                        <div class="col-md-6 col-lg-3 mb-3 mb-lg-0" v-for="l in resultadosList" :key="l.id">
                            <div class="p-3 position-relative rounded-4 bg-white box-results" v-reveal="'bottom'">
                                <div class="icone d-none d-lg-block">
                                    <img :src="l.img" alt="">
                                </div>
                                <p class="text-center fs-4 d-none d-lg-block" v-html="l.text"></p>
                                <div class="row d-lg-none">
                                    <div class="col-auto align-self-center bg-lemonGreen p-3 rounded-circle ms-1">
                                        <img :src="l.img" alt="" width="80">
                                    </div>
                                    <div class="col align-self-center">
                                        <p class="text-center fs-4" v-html="l.text"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- quem está por trás da corujá -->
            <section class="bg-darkGreen">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h1 class="text-lightGreen text-center fw-bold ff-roboto display-4" v-reveal="'bottom'">
                                Quem está por trás
                            </h1>
                            <p class="display-4 text-center text-lemonGreen ff-roboto fw-bold mb-5" v-reveal="'bottom'">
                                da CoruJÁ?
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4" v-for="img in doctorsImages" :key="img.id">
                            <div class="row mb-3" v-reveal="'bottom'">
                                <div class="position-relative">
                                    <img :src="img.img" alt="" class="w-100 rounded-4">
                                    <p
                                        class="text-center text-light fw-semibold ff-roboto fs-5 mb-0 bg-success bg-gradient rounded-4 bg-opacity-50 p-3 text-over-img">
                                        {{ img.name }}
                                    </p>
                                </div>
                            </div>
                            <div class="row mb-3" v-reveal="'bottom'">
                                <div class="col">
                                    <p class="text-light fs-5 text-center preserve-break" v-html="img.content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- call to action -->
            <section class="bg-lightGreen">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 py-5 align-self-center" v-reveal="'bottom'">
                            <h1 class="text-darkGreen fw-bold mb-3" v-reveal="'bottom'">
                                Sua aprovação começa com clareza, suporte e um plano validado.
                            </h1>
                            <p class="fs-3 mb-3" v-reveal="'bottom'">
                                Chega de perder tempo com materiais soltos e inseguranças do processo.
                            </p>
                            <p class="fs-3 mb-3 fw-semibold" v-reveal="'bottom'">
                                Estude com quem mais entende da prova e dê o primeiro passo rumo à medicina em Portugal.
                            </p>
                            <button class="btn btn-danger btn-lg px-5 fs-5 fw-semibold rounded-4"
                                @click="setPaymentAndRedirect">
                                ADQUIRA AGORA!
                            </button>
                        </div>
                        <div class="col-lg-6 align-self-end d-none d-lg-block position-relative">
                            <img :src="BgSemicircle" alt="" class="w-75 z-0"
                                style="position: absolute; top: 0; right: 0;">
                            <img :src="DoctorsStanding" alt="" class="w-75 pt-5 d-block ms-auto z-1"
                                style="position: relative; bottom: 0; right: 0;">
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>