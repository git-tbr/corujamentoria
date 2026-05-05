<script setup lang="ts">
import Logo from '@/assets/img/logo/logo.png'
import DoctorsCircle from '@/assets/img/home/doutores_circulo.png'
import { defineProduct } from '@/services/FunctionsService';

</script>

<template>
    <section>
        <div class="container py-5">
            <div class="row mb-3">
                <div class="col">
                    <img :src="Logo" alt="" class="img-fluid" v-reveal="'bottom'">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0 align-self-center">
                    <h1 class="text-success ff-roboto fw-semibold mb-3" v-reveal="'bottom'">
                        Curso de Revisão Pré-Prova
                    </h1>

                    <h2 class="text-danger fw-semibold mb-3 ff-roboto" v-reveal="'bottom'">
                        Três dias de revisão, mais de 20 horas de aula
                    </h2>

                    <p class="fs-5" v-reveal="'bottom'">
                        Vagas presenciais <span class="fw-semibold">LIMITADAS!!!</span>
                    </p>

                    <ul class="list-unstyled fs-5 mb-3" v-reveal="'bottom'">
                        <li class="mb-2 fs-5">
                            <font-awesome-icon icon="fa-solid fa-ticket" class="text-success" />
                            Vagas online com transmissão simultânea
                        </li>
                        <li class="mb-2 fs-5">
                            <font-awesome-icon icon="fa-solid fa-clock" class="text-success" />
                            8:00h às 18h30 (Horário de Lisboa)
                        </li>
                        <li class="mb-2 fs-5">
                            <font-awesome-icon icon="fa-solid fa-clock" class="text-success" />
                            5:00h às 15h30 (Horário de Brasília)
                        </li>
                    </ul>

                    <p class="fs-5 fw-bold mb-3" v-reveal="'bottom'">
                        Data da revisão uma semana antes da data da prova
                    </p>

                    <p class="fs-5" v-reveal="'bottom'">
                        O curso ficará gravado e disponível para acesso posterior
                    </p>
                </div>
                <div class="col-md-6 align-self-center">
                    <img :src="DoctorsCircle" alt="Doutores Jamil Cade e Ana Facundo" class="img-75"
                        v-reveal="'bottom'">
                </div>
            </div>

            <div class="row mb-3">
                <p class="text-center mb-3 fs-1 text-success fw-bold" v-reveal="'bottom'">
                    Programação
                </p>

                <div class="col-md-4 mb-3 mb-md-0" v-reveal="'bottom'">
                    <div
                        class="p-4 program-card position-relative bg-success bg-gradient rounded-4 shadow align-content-center">
                        <div class="bg-program-card">
                            Dia 1
                        </div>
                        <ul class="list-unstyled fs-5 text-white" v-reveal="'bottom'">
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Manhã: Clínica Médica 1
                            </li>
                            <li class="mb-1">
                                Até 8h - Chegada dos alunos
                            </li>
                            <li class="mb-1">
                                8h até 8h30 - Boas-vindas
                            </li>
                            <li class="mb-1">
                                8h30 - inicío das atividades
                            </li>
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Tarde: GO e Psiquiatria
                            </li>
                            <li class="mb-1">
                                13h até 14h30 - Almoço
                            </li>
                            <li class="mb-1">
                                14h30 - Retorno às atividades
                            </li>
                            <li class="mb-1">
                                18h30 - Término das atividades
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0" v-reveal="'bottom'">
                    <div
                        class="p-4 program-card position-relative bg-success bg-gradient rounded-4 shadow align-content-center">
                        <div class="bg-program-card">
                            Dia 2
                        </div>
                        <ul class="list-unstyled fs-5 text-white" v-reveal="'bottom'">
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Manhã: Clínica Médica 2
                            </li>
                            <li class="mb-1">
                                Até 8h - Chegada dos alunos
                            </li>
                            <li class="mb-1">
                                8h - início das atividades
                            </li>
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Tarde: Pediatria
                            </li>
                            <li class="mb-1">
                                13h até 14h30 - Almoço
                            </li>
                            <li class="mb-1">
                                14h30 - Retorno às atividades
                            </li>
                            <li class="mb-1">
                                18h30 - Término das atividades
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0" v-reveal="'bottom'">
                    <div
                        class="p-4 program-card position-relative bg-success bg-gradient rounded-4 shadow align-content-center">
                        <div class="bg-program-card">
                            Dia 3
                        </div>
                        <ul class="list-unstyled fs-5 text-white" v-reveal="'bottom'">
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Manhã: Cirurgia
                            </li>
                            <li class="mb-1">
                                Até 8h - Chegada dos alunos
                            </li>
                            <li class="mb-1">
                                8h - início das atividades
                            </li>
                            <li class="mb-1 fw-semibold ff-roboto fs-3 text-gold">
                                Tarde: SP e MFG
                            </li>
                            <li class="mb-1">
                                13h até 14h30 - Almoço
                            </li>
                            <li class="mb-1">
                                14h30 - Retorno às atividades
                            </li>
                            <li class="mb-1">
                                18h30 - Término das atividades
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-auto mx-auto d-grid" v-reveal="'bottom'">
                    <button type="button" class="btn btn-danger fs-5 rounded-4 px-5 btn-lg fw-semibold"
                        @click="defineProduct('revisao')">
                        Adquirir o Curso de Revisão
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.program-card {
    min-height: 315px;
}

.bg-program-card {
    position: absolute;
    color: #ffffff52;
    font-size: 4rem;
    font-style: italic;
    font-weight: 700;
    bottom: 1.5rem;
    right: 1rem;
    rotate: calc(270deg);
    transform-origin: left bottom;
    translate: calc(105%);
}
</style>