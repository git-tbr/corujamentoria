<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import { useSiteStore } from '@/stores/website';
import { ref, onMounted } from 'vue';
import { useAlert } from '@/services/alertService';
import api from '@/services/api';
import LogoBranca from '@/assets/img/logo/white_logo.png'

const { showAlert } = useAlert();
const siteStore = useSiteStore();

interface Course {
    course_id: number | string
    course_key: string
    course_type: string
    course_name: string
}

const courses = ref<Course>();
const isLoading = ref<boolean>(false);
const liveContainer = ref<HTMLElement | null>(null);
const noLiveContainer = ref<HTMLElement | null>(null);

//verificar se o usuário possui o curso revisão 2026
const checkCourse = async () => {
    console.log('consultar a lista de cursos via api');
}

onMounted(() => {
    if (document.getElementById('live')) {
        liveContainer.value = document.getElementById('live');
    }
    if (document.getElementById('no-live')) {
        noLiveContainer.value = document.getElementById('no-live');
    }
    if (liveContainer.value && noLiveContainer.value) {
        liveContainer.value.style.display = 'none';
        noLiveContainer.value.style.display = 'flex';
    }
    checkCourse();
})
</script>
<template>
    <Layout>
        <main class="page-size bg-coruja">
            <header class="header">
                <figure class="">
                    <img :src="LogoBranca" alt="LogoBranca" class="img-fluid">
                </figure>
                <h1 class="text-white">Revisão Pré-Prova 2026</h1>
            </header>
            <section class="main-revisao">
                <!-- player e chat - adicionados via iframe -->
                <section class="containerLive" id="live" style="background-color: aliceblue;">
                    <div class="player">
                        <iframe id="player-map-iframe" style="display: none;" src=""></iframe>
                        <iframe id="player-iframe" src="" frameborder="0" allow="autoplay; fullscreen"></iframe>
                    </div>
                    <div class="chat">
                        <iframe id="chat-iframe" src="" frameborder="0"></iframe>
                    </div>
                </section>
                <section class="containerLive" id="no-live">
                    <p class="text-white" :class="{ 'd-none': new Date() > new Date('2026-11-06') }">
                        O curso de revisão ainda não começou!
                        <br>
                        As aulas serão transmitidas ao vivo nos dias 06, 07 e 08 de novembro.
                    </p>
                    <p class="text-white" :class="{ 'd-none': new Date() > new Date('2026-11-08') }">
                        As aulas já aconteceram!<br>
                        Acesse o material na área do aluno.
                    </p>
                    <ul class="text-white">
                        <li :class="{ 'd-none': new Date() > new Date('2026-11-06') }">06/11 - 08h (Horário de Lisboa) |
                            05h
                            (Horário de Brasília)</li>
                        <li :class="{ 'd-none': new Date() > new Date('2026-11-07') }">07/11 - 08h (Horário de Lisboa) |
                            05h
                            (Horário de Brasília)</li>
                        <li :class="{ 'd-none': new Date() > new Date('2026-11-08') }">08/11 - 08h (Horário de Lisboa) |
                            05h
                            (Horário de Brasília)</li>
                    </ul>

                </section>
            </section>
        </main>
    </Layout>
</template>
<style>
.page-size {
    min-height: calc(100dvh - 76px);
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.header figure {
    display: block;
    padding: 0.5rem;
    width: 50%;
    max-width: 300px;
    height: auto;
    margin: 0 auto;
}

.header h1 {
    color: var(--cor-texto-claro);
    text-align: center;
}

.main-revisao {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    margin: 0 auto;
}

.containerLive {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
}

.containerLive .player {
    width: 70%;
    display: flex;
    flex-direction: column;
}

.containerLive .chat {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

#player-iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 4px;
}

#chat-iframe {
    width: 100%;
    height: 100%;
    min-height: 480px;
    border: 0;
    border-radius: 4px;
    background-color: aliceblue;
}

#no-live {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--cor-texto-claro);
}

#no-live p,
#no-live li {
    text-align: center;
    margin: 0.4rem;
    line-height: 1.25;
    font-size: 1.2rem;
}

ul {
    list-style-type: circle;
    padding: 0;
}

.containerLive-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    margin: 1rem auto;
}

.btn {
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: solid 1px var(--cor-texto-claro);
    box-sizing: border-box;
    box-shadow: 0 4px 2px var(--cor-texto-claro);
}

.btn-red {
    background-color: #c62828;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}

.btn-red:hover {
    background-color: #b71c1c;
}

.btn-green {
    background-color: #2e7d32;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}

.btn-green:hover {
    background-color: #1b5e20;
}

.d-none {
    display: none;
}

/* Media query para celulares */
@media screen and (max-width: 1400px) {
    .containerLive {
        flex-direction: column;
    }

    .containerLive .player,
    .containerLive .chat {
        width: 100%;
    }

    #chat-iframe {
        min-height: 480px;
    }
}
</style>