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
    courseid: number | string
    coursekey: string
    coursetype: string
    imagepath: string
    namecourse: string
    isSample: number
    courseorder: number
}

const courses = ref<Course[]>([]);
const hasAccessToRevision2026 = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const liveContainer = ref<boolean>(false);
const player = ref<HTMLIFrameElement | null>(null);
const playerMap = ref<HTMLIFrameElement | null>(null);
const chat = ref<HTMLIFrameElement | null>(null);

//verificar se o usuário possui o curso revisão 2026
const checkCourse = async () => {
    try {
        isLoading.value = true;
        const response = await api.get(`/api/purchased-courses/list/${siteStore.company}/${siteStore.userId}`);
        const data = response.data;
        if (data.code === 0) {
            throw new Error(data.message || 'Erro desconhecido');
        }
        courses.value = data.courses || [];

        hasAccessToRevision2026.value = courses.value.some(
            (course) => course.coursekey === 'b260e77c79b4ffd48bfdad48293a4e7c'
        );
        if (hasAccessToRevision2026.value) {
            console.log('Usuário possui o curso revisão 2026');
            liveCheck();
        }
    } catch (error: any) {
        await showAlert({
            title: 'Erro',
            message: error.message || 'Não foi possível carregar os cursos.',
            type: 'error',
        });
    } finally {
        isLoading.value = false;
    }
}

const liveCheck = async () => {
    try {
        //const response = await api.get('./masterclass/src/api/live.php');
        fetch('//localhost:8080/src/api/live.php', {
            method: 'GET',
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await response.json();
            if (data.status !== "success") {
                throw new Error(data.message || 'Erro desconhecido');
            }

            const userData = {
                name: siteStore.firstname + ' ' + siteStore.lastname,
                email: siteStore.email
            };

            //dados do usuário
            let userDatas = {
                name: userData.name,
                email: userData.email
            };
            let userDatasStringify = JSON.stringify(userDatas);
            let userDataBtoa = btoa(userDatasStringify);

            //player e chat devem ser exibidos;
            liveContainer.value = data.vivo === 1;
            console.log(data);

            if (playerMap.value) {
                playerMap.value.src = `https://player.verto.ia.br/corujamasterclass?data=${userDataBtoa}`;
            }
            if (player.value) {
                player.value.src = `https://player.tbr.srv.br/?type=webrtc&source=${data.pagina}`;
            }
            if (chat.value) {
                //condiguração do chat
                const todayDate = new Date();
                const cY: number | string = todayDate.getFullYear();
                let cM: number | string = todayDate.getMonth() + 1;
                if (cM < 10) cM = `0${cM}`;
                let cD: number | string = todayDate.getDate();
                if (cD < 10) cD = `0${cD}`;
                const dateNow: string = `${cY}-${cM}-${cD}`;
                const chatCssUrl: string = '//corujamentoria.com.br/masterclass/src/css/chat.css';
                const param: string = btoa(chatCssUrl);
                const idChat: string = `${data.pagina}-${dateNow}`;
                const userName: string = encodeURIComponent(userData.name);
                chat.value.src = `https://chat.tbrplay.com.br/${idChat}?user.name=${userName}&css=${param}`;
            }


        })
    } catch (error) {

    }
}

const checkDate = (comparisonDate: string) => {
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    if (date === comparisonDate) {
        return true;
    }
    return false;
}

onMounted(() => {
    checkCourse();
})
</script>
<template>
    <Layout>
        <main class="page-size bg-coruja-container">
            <header class="header">
                <figure class="">
                    <img :src="LogoBranca" alt="LogoBranca" class="img-fluid">
                </figure>
                <h1 class="text-white">Revisão Pré-Prova 2026</h1>
            </header>
            <section class="main-revisao">
                <!-- player e chat - adicionados via iframe -->
                <section class="containerLive" id="live" v-if="liveContainer" style="background-color: aliceblue;">
                    <div class="player">
                        <iframe id="player-map-iframe" style="display: none;" ref="playerMap" src=""></iframe>
                        <iframe id="player-iframe" ref="player" src="" frameborder="0"
                            allow="autoplay; fullscreen"></iframe>
                    </div>
                    <div class="chat">
                        <iframe id="chat-iframe" ref="chat" src="" frameborder="0"></iframe>
                    </div>
                </section>
                <section class="containerLive" id="no-live" v-else>
                    <p class="text-white" :class="{ 'd-none': checkDate('2026-11-06') }">
                        O curso de revisão ainda não começou!
                        <br>
                        As aulas serão transmitidas ao vivo nos dias 06, 07 e 08 de novembro.
                    </p>
                    <p class="text-white" :class="{ 'd-none': !checkDate('2026-11-08') }">
                        As aulas já aconteceram!<br>
                        Acesse o material na área do aluno.
                    </p>
                    <ul class="text-white">
                        <li :class="{ 'd-none': !checkDate('2026-11-06') }">06/11 - 08h (Horário de Lisboa) |
                            05h
                            (Horário de Brasília)</li>
                        <li :class="{ 'd-none': !checkDate('2026-11-07') }">07/11 - 08h (Horário de Lisboa) |
                            05h
                            (Horário de Brasília)</li>
                        <li :class="{ 'd-none': !checkDate('2026-11-08') }">08/11 - 08h (Horário de Lisboa) |
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
    min-height: calc(100dvh - 337px);
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