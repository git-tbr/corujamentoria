<script setup lang="ts">
import alineMonteiro from '@/assets/img/home/aline_monteiro.webp'
import andreaNoronha from '@/assets/img/home/andrea_noronha.webp'
import cintiaPerico from '@/assets/img/home/cintia_perico.webp'
import deboraVeiga from '@/assets/img/home/debora.webp'
import geirizaChantre from '@/assets/img/home/geiriza_chantre.webp'
import mariaLeticia from '@/assets/img/home/maria_leticia.webp'
import nidiaChicralla from '@/assets/img/home/nidia_chicralla.webp'
import rebecaSpinelli from '@/assets/img/home/rebeca.webp'
import sergioCabral from '@/assets/img/home/sergio_cabral.webp'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ref } from 'vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const depoimentosList = [
    { id: 1, name: 'DRA. ALINE MONTEIRO', videoKey: 'yA3baoN7p2q9VfLc', img: alineMonteiro, tipo: 'Aluna CoruJÁ' },
    { id: 2, name: 'DRA. ANDRÉA NORONHA', videoKey: 'HzSrtNIm9ybzUL0P', img: andreaNoronha, tipo: 'Aluna CoruJÁ' },
    { id: 3, name: 'DRA. CÍNTIA PERICO', videoKey: 'Qzzlnnbp7rCi8xpz', img: cintiaPerico, tipo: 'Aluna CoruJÁ' },
    { id: 4, name: 'DRA. DÉBORA VEIGA', videoKey: 'X2ySnvT1wFUim2uv', img: deboraVeiga, tipo: 'Aluna CoruJÁ' },
    { id: 5, name: 'DRA. GEIRIZA CHANTRE', videoKey: 'OK6UXigw69H6M5hb', img: geirizaChantre, tipo: 'Aluna CoruJÁ' },
    { id: 6, name: 'DRA. MARIA LETÍCIA', videoKey: 'pIF4TbCOcePiHkGp', img: mariaLeticia, tipo: 'Médica validada em Portugal' },
    { id: 7, name: 'DRA. NIDIA CHICRALLA', videoKey: 'LrUDNUwclZLgdS3o', img: nidiaChicralla, tipo: 'Aluna CoruJÁ' },
    { id: 8, name: 'DRA. REBECA SPINELLI', videoKey: 'SQVOdX4MQEDF9gBn', img: rebecaSpinelli, tipo: 'Aluna CoruJÁ' },
    { id: 9, name: 'DR. SÉRGIO CABRAL', videoKey: '5RAc5SiHPF8mcU3G', img: sergioCabral, tipo: 'Aluno CoruJÁ' },
];

const modalVideo = ref<any>(null);
const currentPlayerUrl = ref<string>('');
const currentDoctorName = ref<string>('');

const openPlayer = (videoKey: string, doctorName: string) => {
    currentDoctorName.value = doctorName;
    currentPlayerUrl.value = `https://cdn.tbr.com.br/player/?vod=1&video=${videoKey}&dual_audio=0`;
    modalVideo.value.showModal();
}

const closeModal = () => {
    modalVideo.value.close();
    currentPlayerUrl.value = '';
    currentDoctorName.value = '';
}

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
    <swiper :modules="modules" :slides-per-view="1" :space-between="20" :loop="true" :autoplay="{ delay: 5000 }"
        :navigation="true" :pagination="{ clickable: true }" :breakpoints="{
            '768': { slidesPerView: 2 },
            '1024': { slidesPerView: 3 }
        }" class="pb-5">
        <swiper-slide v-for="item in depoimentosList" :key="item.id" v-reveal="'bottom'">
            <div class="card-depoimento h-100" role="button" @click="openPlayer(item.videoKey, item.name)">
                <img :src="item.img" :alt="item.name" class="w-100 border border-white rounded-top-4">
                <div class="py-3 text-center rounded-bottom-4 border border-white bg-transparent">
                    <p class="fs-5 fw-semibold mb-0" style="color: #14AE5C">
                        {{ item.name }}
                    </p>
                    <p class="small text-white fw-light mb-0">
                        {{ item.tipo }}
                    </p>
                </div>
            </div>
        </swiper-slide>
    </swiper>

    <dialog ref="modalVideo" class="custom-modal">
        <div class="modal-content-wrapper">
            <div class="modal-header-custom">
                <h2 class="fw-semibold">{{ currentDoctorName }}</h2>
                <button type="button" class="btn-close-custom" @click="closeModal">&times;</button>
            </div>

            <div class="modal-body">
                <iframe v-if="currentPlayerUrl" id="player" :src="currentPlayerUrl" frameborder="0"
                    class="d-block mx-auto" style="aspect-ratio: 16 / 9; width: 100%;" allowfullscreen></iframe>
            </div>

            <div class="text-end mt-3">
                <button type="button" class="btn btn-light" @click="closeModal">Fechar</button>
            </div>
        </div>
    </dialog>
</template>

<style scoped>
.custom-modal {
    border: none;
    border-radius: 1rem;
    padding: 0;
    width: 90%;
    max-width: 1140px;
    background: #1a1a1a;
    color: white;
}

.custom-modal::backdrop {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
}

.modal-content-wrapper {
    padding: 1.5rem;
}

.modal-header-custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.btn-close-custom {
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
}

dialog[open] {
    display: block;
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>