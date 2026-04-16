<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import Logo from '@/assets/img/logo/logo.png'
import DoctorsCircle from '@/assets/img/home/doutores_circulo.png'
import DoctorsLaptop from '@/assets/img/home/doutores_laptop.png'
import PlaneBadge from '@/assets/img/home/plane_badge.png'
import DrJamil from '@/assets/img/home/dr_jamil.png'
import DraAna from '@/assets/img/home/dra_ana.png'
import DraBruna from '@/assets/img/home/dra_bruna.png'
import alineMonteiro from '@/assets/img/home/aline_monteiro.webp'
import andreaNoronha from '@/assets/img/home/andrea_noronha.webp'
import cintiaPerico from '@/assets/img/home/cintia_perico.webp'
import deboraVeiga from '@/assets/img/home/debora.webp'
import geirizaChantre from '@/assets/img/home/geiriza_chantre.webp'
import mariaLeticia from '@/assets/img/home/maria_leticia.webp'
import nidiaChicralla from '@/assets/img/home/nidia_chicralla.webp'
import rebecaSpinelli from '@/assets/img/home/rebeca.webp'
import sergioCabral from '@/assets/img/home/sergio_cabral.webp'
import garantido from '@/assets/img/home/garantido.png'
import noventaenove from '@/assets/img/home/99.png'

import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'

const conquista = [
    { id: 1, content: 'Material didático organizado e validado com o que realmente cai na prova;' },
    { id: 2, content: 'Mais de 150 aulas gravadas dividas por especialidades (Ginicologia e obstetrícia, Pediatria, Psiquiatria, Medicina Geral e Familia, Saúde Pública, Clínica Médica, Cirurgia);' },
    { id: 3, content: 'Banco de questões com mais de 2.500 questões comentadas discutidas e revisadas com todas as provas de PNA e equivalência, para o aluno fixar e entender as dinâmicas das provas;' },
    { id: 4, content: 'Resumos, tabelas e materiais de apoio exclusivos;' },
    { id: 5, content: 'Grupo de apoio ao vivo, único no mercado;' },
    { id: 6, content: 'Dois encontros semanais ao vivo para tirar dúvidas;' },
    { id: 7, content: 'Acompanhamento direto dos médicos com as maiores notas do processo;' },
];

const accordionList = [
    { id: 1, title: 'Materiais de Estudo Direcionado', content: 'Materiais de estudo elaborados por médicos não especialistas de cada área que trazem a visão do médico generalista, assim como é cobrado na prova. Portanto, entendemos as dificuldades do aprendizado para uma prova de medicina geral e direcionamos o estudo nesse sentido.' },
    { id: 2, title: 'Banco de Questões Comentadas', content: 'Acesso à cerca de 2.500 questões corrigidas pelos mentores e comentadas. Aqui você aprende não apenas a resposta certa, mas o porquê das demais alternativas estarem incorretas — acelerando o entendimento, e não apenas a memorização.' },
    { id: 3, title: 'Encontros Semanais Ao Vivo', content: 'Sessões ao vivo 5 meses antes da data da prova, com 2h de duração, duas vezes por semana com mentores aprovados e experientes, onde resolvemos questões, aprofundamos conteúdos, tiramos dúvidas em tempo real e atualizamos estratégias conforme o panorama das provas. A proximidade com quem já trilhou esse caminho torna seu processo mais claro, seguro e contínuo.' },
    { id: 4, title: 'Revisão Presencial Exclusiva', content: 'Desconto exclusivo para a Revisão intensiva, presencial ou online, e que fica gravada para acesso até o dia da prova, realizada poucos dias antes da prova, focada nos temas que historicamente mais caem e nos ajustes finais de desempenho. Uma experiência imersiva, direta, assertiva, com interação próxima entre mentor e aluno — o refinamento final para chegar confiante ao grande dia.' },
    { id: 5, title: 'Curso Segunda Fase', content: 'Formação à parte direcionada para quem avançou na equivalência e agora precisa dominar a prática médica exigida nas bancas. Treinamos elaboração de relatórios, comunicação médico-paciente, discussão clínica e raciocínio conforme o padrão português — com o mapeamento das bancas e exatamente como elas avaliam.' },
    { id: 6, title: 'Pré-Sabatina CoruJÁ', content: 'Para os que fazem a prova prática em dois dias oferecemos 1h de discussão estratégica pré-sabatina do segundo dia, nos moldes das bancas, para identificar pontos fortes, lacunas e ajustes finos. Um momento decisivo para testar conhecimento sob pressão real, receber feedback imediato e alinhar a performance para apresentar a melhor versão de si na prova.' }
];

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

const resultadosList = [
    { id: 1, img: garantido, text: `<strong>84% de aprovação</strong> na 1ª fase da prova de equivalência em 2024.` },
    { id: 2, img: garantido, text: `<strong>88% de aprovação</strong> na 1ª fase da prova de equivalência em 2025.` },
    { id: 3, img: noventaenove, text: `<strong>99% de aprovação</strong> na 2ª fase no mesmo ano.` },
    { id: 4, img: garantido, text: `Mentoria conduzida pelos médicos com as <strong>maiores notas já registradas no processo</strong>.` },
];

const modalVideo = ref<any>(null);
const currentPlayerUrl = ref<string>('');
const currentDoctorName = ref<string>('');
const depoimentosAgrupados = computed(() => {
    const size = 3
    const grupos = []
    for (let i = 0; i < depoimentosList.length; i += size) {
        grupos.push(depoimentosList.slice(i, i + size))
    }
    return grupos
})

const openTestimony = (videoKey: string, doctorName: string) => {
    currentDoctorName.value = doctorName;
    currentPlayerUrl.value = `https://cdn.tbr.com.br/player/?vod=1&video=${videoKey}&dual_audio=0`;
    modalVideo.value.showModal();
}

const closeModal = () => {
    modalVideo.value.close();
    currentPlayerUrl.value = '';
}
</script>
<template>
    <Layout>
        <main>
            <!-- hero -->
            <section id="hero">
                <div id="hero-mozaic"></div>
                <div id="hero-bg"></div>
                <div class="container py-5" id="hero-container">
                    <div class="row mb-3">
                        <div class="col-xl-6">
                            <!-- logo -->
                            <img :src="Logo" alt="Logo CoruJÁ" class="img-fluid mb-3">

                            <!-- content -->
                            <h1 class="text-white fw-semibold mb-3 ff-roboto">
                                Revalide seu diploma médico em Portugal com quem teve as maiores notas da história do
                                concurso.
                            </h1>

                            <h2 class="text-gold fw-semibold">
                                Tudo o que você precisa para se preparar com segurança, foco e resultados.
                            </h2>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <!-- mentoria -->
                        <div class="col-md-6 col-xl-3 mb-3 mb-xl-0" v-reveal="'bottom'">
                            <div class="p-4 bg-success rounded-5 shadow base-card">
                                <div class="top-aligned">
                                    <h2 class="text-gold text-center fw-bold mb-3">
                                        Mentoria 1ª Fase
                                    </h2>
                                    <ul class="list-unstyled text-white">
                                        <li>
                                            Mais de 150 aulas gravadas
                                        </li>
                                        <li>
                                            Mais de 2.300 questões comentadas
                                        </li>
                                        <li>
                                            Mais de 20 horas de encontros ao vivo
                                        </li>
                                        <li>
                                            45 encontros gravados de 2025
                                        </li>
                                        <li>
                                            Simulados no formato da prova
                                        </li>
                                        <li>
                                            2 Encontros semanais de mentoria
                                        </li>
                                        <li>
                                            Acompanhamento contínuo durante os 5 meses que antecedem a data da prova da
                                            primeira fase
                                        </li>
                                    </ul>
                                </div>
                                <div class="bottom-aligned">
                                    <ul class="list-unstyled text-center">
                                        <li class="text-gold fs-2 fw-bold">
                                            &euro; 988,90
                                        </li>
                                        <li class="text-white">
                                            em até 12x com juros
                                        </li>
                                        <li class="text-gold fs-2 fw-bold">
                                            &euro; 799,00 à vista
                                        </li>
                                    </ul>
                                    <div class="text-center">
                                        <RouterLink to="/mentoria" class="btn btn-danger rounded-4 px-4">Quero adquirir
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- revisão -->
                        <div class="col-md-6 col-xl-3 mb-3 mb-xl-0" v-reveal="'bottom'">
                            <div class="p-4 bg-success rounded-5 shadow base-card">
                                <div class="top-aligned">
                                    <h2 class="text-gold text-center fw-bold mb-3">
                                        Revisão Pré-Prova
                                    </h2>
                                    <ul class="list-unstyled text-white">
                                        <li>
                                            20 horas de revisão ao vivo on line
                                        </li>
                                        <li>
                                            Materiais disponível na plataforma para revisão contínua
                                        </li>
                                        <li>
                                            Bônus: Encontro presencial exclusivo para os 35 primeiros compradores
                                        </li>
                                        <li>
                                            Bônus: Mais de 20 horas de revisão gravadas da turma de 2025
                                        </li>
                                    </ul>
                                </div>
                                <div class="bottom-aligned">
                                    <ul class="list-unstyled text-center">
                                        <li class="text-gold fs-2 fw-bold">
                                            &euro; 290,00
                                        </li>
                                    </ul>
                                    <div class="text-center">
                                        <RouterLink to="/revisao" class="btn btn-danger rounded-4 px-4">Quero adquirir
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- manual -->
                        <div class="col-md-6 col-xl-3 mb-3 mb-xl-0" v-reveal="'bottom'">
                            <div class="p-4 bg-success rounded-5 shadow base-card">
                                <div class="top-aligned">
                                    <h2 class="text-gold text-center fw-bold mb-3">
                                        Manual Completo
                                    </h2>
                                    <ul class="list-unstyled text-white">
                                        <li>
                                            Material completo com os 8 fascículos exclusivos
                                        </li>
                                        <li>
                                            Disponivel on line para acesso imediato
                                        </li>
                                        <li>
                                            <ul>
                                                <li>Clínica Médica I</li>
                                                <li>Clínica Médica II</li>
                                                <li>Cirurgia</li>
                                                <li>Ginecologia e Obstetrícia</li>
                                                <li>Pediatria</li>
                                                <li>Psiquiatria</li>
                                                <li>Saúde Pública</li>
                                                <li>Medicina Geral e Familiar</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Mais de 2500 páginas com índice para fácil consulta
                                        </li>
                                    </ul>
                                </div>
                                <div class="bottom-aligned">
                                    <ul class="list-unstyled text-center">
                                        <li class="text-gold fs-2 fw-bold">
                                            &euro; 149,90
                                        </li>
                                    </ul>
                                    <div class="text-center">
                                        <RouterLink to="/ebook" class="btn btn-danger rounded-4 px-4">Quero adquirir
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
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

            <!-- vantagens -->
            <section>
                <div class="container py-3">
                    <div class="row">
                        <div class="col-lg-9 mx-auto">
                            <div class="accordion" id="accordionVantagens" v-reveal="'bottom'">
                                <div class="row mb-2" v-for="i in accordionList" :key="i.id">
                                    <div class="col-auto bg-black fs-1 text-white circle align-self-center">
                                        <p class="mb-0">{{ i.id }}</p>
                                    </div>
                                    <div class="col align-self-center">
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button bg-success text-white py-3 fw-semibold rounded-4 collapsed"
                                                type="button" data-bs-toggle="collapse"
                                                :data-bs-target="'#collapse' + i.id" aria-expanded="true"
                                                :aria-controls="'collapse' + i.id">
                                                {{ i.title }}
                                            </button>
                                        </h2>
                                        <div :id="'collapse' + i.id" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionVantagens">
                                            <div class="accordion-body border border-secondary-subtle rounded-4 py-3">
                                                {{ i.content }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- apresentação dos médicos -->
            <section>
                <div class="container-fluid bg-success">
                    <div class="container py-4">
                        <div class="row">
                            <div class="col-auto align-self-center d-none d-md-block">
                                <img :src="PlaneBadge" alt="Imagem da medalha do avião de papel" width="100">
                            </div>
                            <div class="col align-self-center">
                                <h1 class="text-dark fw-bold">
                                    Os médicos que obtiveram aprovação com as maiores notas do concurso - agora do seu
                                    lado.
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 px-0 align-self-center" v-reveal="'bottom'">
                            <img :src="DrJamil" alt="Dr Jamil Ribeiro Cade" class="w-100">
                        </div>
                        <div class="col-lg-6 p-3 p-xxl-5 align-self-center " v-reveal="'bottom'">
                            <h1 class="fw-bold mb-0">
                                Dr. Jamil Ribeiro Cade
                            </h1>
                            <div class="border border-success-subtle w-50 border-3 my-3"></div>
                            <p class="fs-5">
                                É clínico geral, cardiologista clínico e intervencionista, graduado pela Universidade
                                Federal do Espírito Santo, residência médica em Clínica Médica pela Universidade de São
                                Paulo e cardiologia clínica e intervencionista pelo Instituto do Coração (InCOR)
                                HC-FMUSP. Obteve os títulos de especialista de Clínica Médica, Cardiologia e Cardiologia
                                Intervencionista e doutor (PhD) em Cardiologia pela Universidade Federal de São Paulo e
                                Universidade do Porto.
                                <br>
                                <br>
                                É professor de medicina na Faculdade Santa Marcelina (quarto e sexto anos). Atua como
                                supervisor e coordenador da Cardiologia Intervencionista dos Hospitais Santa Marcelina e
                                Carlos Chagas, mentor dos cardiologistas intervencionistas em formação para a obtenção
                                do Título de Especialista.
                                <br>
                                <br>
                                Fez o processo de revalidação de medicina em Portugal, obtendo 19 em 20 valores em todo
                                o processo (notas máximas na segunda e terceira fases). Fundou os Corujinhas em 2024,
                                com elaboração de material inédito e focado, com resumos estratégicos e com uma didática
                                diferenciada, aprovando 84% em 2024 e 88% em 2025 e 99% na segunda fase.
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6 px-0 order-lg-2 align-self-center" v-reveal="'bottom'">
                            <img :src="DraAna" alt="Dra Ana Carolina Facundo" class="w-100">
                        </div>
                        <div class="col-lg-6 p-3 p-xxl-5 order-lg-1 align-self-center" v-reveal="'bottom'">
                            <h1 class="fw-bold mb-0">
                                Dra. Ana Carolina Facundo
                            </h1>
                            <div class="border border-success-subtle w-50 border-3 my-3"></div>
                            <p class="fs-5">
                                Médica de família e comunidade e geriatra, graduada pela Universidade de Pernambuco, com
                                especialização em Geriatria pela Universidade de Pernambuco, residência em Medicina de
                                Família e Comunidade (MFC) pela Universidade Federal de Pernambuco, especialização em
                                Preceptoria de Medicina de Família e Comunidade com Ênfase Clínica pela UNASUS/UFCSPA.
                                <br><br>
                                Possui título de especialista em MFC pela Sociedade Brasileira de Medicina de Família e
                                Comunidade. É supervisora do Programa Mais Médicos para o Brasil (PMMB), tutora da
                                Especialização em MFC para o PMMB e médica pesquisadora do Ministério da Saúde do
                                Brasil.
                                <br><br>
                                Médica revalidada em Portugal com 93 acertos no total de 120 questões na 1ª fase, nota
                                máxima na 2ª fase e nota superior à máxima atribuída a currículo na 3ª fase.
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6 px-0 align-self-center" v-reveal="'bottom'">
                            <img :src="DraBruna" alt="Dra Bruna Soares Bicalho" class="w-100">
                        </div>
                        <div class="col-lg-6 p-3 p-xxl-5 align-self-center" v-reveal="'bottom'">
                            <h1 class="fw-bold mb-0">
                                Dra. Bruna Soares Bicalho
                            </h1>
                            <div class="border border-success-subtle w-50 border-3 my-3"></div>
                            <p class="fs-5">
                                É Clínica Geral, Hematologista-Hemoterapeuta, graduada pela Universidade Federal de Juiz
                                de Fora (UFJF), com residência médica em Clínica Médica pelo Hospital Miguel Couto no
                                Rio de Janeiro e em Hematologia-Hemoterapia pela UFJF. Possui especialização em
                                Preceptoria em Saúde pela Universidade Federal do Rio Grande do Norte.
                                <br><br>
                                Atuou como médica e preceptora de residentes de Clínica Médica e Hematologia no Hospital
                                Universitário da UFJF. É diretora técnica de serviços de saúde em
                                Hematologia-Hemoterapia na cidade do Rio de Janeiro, Hospital Pró-Cardíaco e Samaritano
                                Botafogo, vinculados ao Hemocentro São Lucas Terapia Celular.
                                <br><br>
                                Fez o processo de revalidação do diploma médico em Portugal pela Faculdade de Lisboa,
                                obtendo 17 em 20 valores em todo o processo (nota máxima na terceira fase).
                                <br><br>
                                Será a mentora da 2ª fasena qual preparará você para as avaliações práticas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- por que a corujá é diferente -->
            <section class="circle-bg">
                <div class="container py-5">
                    <h1 class="text-success text-center fw-bold mb-3 ff-roboto" v-reveal="'bottom'">
                        Por que a CoruJÁ é diferente?
                    </h1>

                    <div class="row mb-3">
                        <div class="col-lg-9 mx-auto">
                            <div class="p-4 p-lg-5 bg-dark rounded-4">
                                <div class="row mb-3">
                                    <div class="col-lg-6 text-light">
                                        <ul class="list-unstyled fs-5">
                                            <li v-reveal="'bottom'" class="mb-3">
                                                <font-awesome-icon icon="fa-solid fa-thumbtack" class="text-success" />
                                                <br>
                                                Metodologia validada por quem já passou — aprovação de 84% em 2024 na
                                                primeira fase e 100% na segunda fase e com as melhores notas do processo
                                            </li>
                                            <li v-reveal="'bottom'" class="mb-3">
                                                <font-awesome-icon icon="fa-solid fa-clock" class="text-success" />
                                                <br>
                                                Encontros ao vivo com resolução de dúvidas e contato direto com os
                                                mentores (5 meses que antecedem a prova da primeira fase de
                                                Equivalência)
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-6 text-light">
                                        <ul class="list-unstyled fs-5">
                                            <li v-reveal="'bottom'" class="mb-3">
                                                <font-awesome-icon icon="fa-solid fa-lock" class="text-success" />
                                                <br>
                                                Estrutura completa: você não precisa buscar materiais fora
                                            </li>
                                            <li v-reveal="'bottom'" class="mb-3">
                                                <font-awesome-icon icon="fa-solid fa-user-group" class="text-success" />
                                                <br>
                                                Grupo de apoio contínuo para você não se sentir sozinho no processo
                                            </li>
                                            <li v-reveal="'bottom'" class="mb-3">
                                                <font-awesome-icon icon="fa-solid fa-ticket" class="text-success" />
                                                <br>
                                                Desconto no Curso de Revisão Pré-Prova da Primeira fase de Equivalência
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <p class="text-center">
                                            <RouterLink to="/mentoria"
                                                class="btn btn-danger rounded-pill px-4 fs-5 ff-roboto">
                                                Você não precisa estudar no escuro
                                            </RouterLink>
                                        </p>
                                        <p class="text-center text-light fs-5">
                                            Na <span class="fw-semibold">Mentoria,</span> você vai com um foco e
                                            material <br> exclusivo (teoria e questões) por um ano.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <h1 class="text-success fw-bold text-center ff-roboto">
                                Depoimentos
                            </h1>
                            <p class="fs-5 text-white text-center">
                                Confira os depoimentos de alunos e ex-alunos:
                            </p>
                        </div>
                    </div>

                    <div id="minhaGaleriaCarrossel" class="carousel slide" data-bs-ride="carousel">

                        <div class="carousel-indicators">
                            <button v-for="(grupo, index) in depoimentosAgrupados" :key="'ind-' + index" type="button"
                                data-bs-target="#minhaGaleriaCarrossel" :data-bs-slide-to="index"
                                :class="{ active: index === 0 }" :aria-current="index === 0"
                                :aria-label="'Slide ' + (index + 1)">
                            </button>
                        </div>

                        <div class="carousel-inner">
                            <div v-for="(grupo, index) in depoimentosAgrupados" :key="'grupo-' + index"
                                class="carousel-item" :class="{ active: index === 0 }" data-bs-interval="3000">

                                <div class="row g-3">
                                    <div class="col-md-4" v-for="i in grupo" :key="i.id">
                                        <div class="bg-dark rounded-4 position-relative">
                                            <img :src="i.img" :alt="i.name" class="w-100 rounded-top-4 mb-3">
                                            <p class="text-center text-success mb-0 fs-4 fw-bold px-3 ff-roboto">
                                                {{ i.name }}
                                            </p>
                                            <p class="text-center text-white fs-5 pb-3">
                                                {{ i.tipo }}
                                            </p>
                                            <font-awesome-icon icon="fa-solid fa-circle-play" role="button"
                                                class="play-icon" @click="openTestimony(i.videoKey, i.name)" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- resultados que comprovam -->
            <section class="bg-darkGreen">
                <div class="container py-5">
                    <div class="row mb-5">
                        <h1 class="text-lightGreen text-center fw-bold ff-roboto">
                            Resultados que comprovam
                        </h1>
                        <h1 class="text-lemonGreen fw-bold ff-roboto text-center display-4">
                            nosso método
                        </h1>
                    </div>

                    <div class="row py-5">
                        <div class="col-md-6 col-lg-3 mb-5 mb-lg-0" v-for="l in resultadosList" :key="l.id">
                            <div class="p-3 position-relative rounded-4 bg-white box-results">
                                <div class="icone">
                                    <img :src="l.img" alt="">
                                </div>
                                <p class="text-center fs-4" v-html="l.text"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Modal -->
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
        </main>
    </Layout>
</template>

<style scoped>
#hero {
    position: relative;
    min-height: 850px;
    background-color: #07301c;
    overflow: hidden;
}

#hero-mozaic,
#hero-bg {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: bottom right;
    ;
}

#hero-mozaic {
    z-index: 1;
}

#hero-bg {
    z-index: 2;
}

#hero-container {
    position: relative;
    z-index: 3;
}

.circle-bg {
    background-image: url(../assets/img/home/backgroundCircle.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.overflow-control {
    overflow: hidden;
}

@media (min-width: 993px) {
    .overflow-control {
        max-height: 420px;
        overflow-y: scroll
    }
}

@media (min-width: 1200px) {
    #hero-mozaic {
        background-image: url(../assets/img/home/mozaico.png);
        background-size: 50%;
    }

    #hero-bg {
        background-image: url(../assets/img/home/doutores.png);
        background-size: 65%;
    }

    .overflow-control {
        max-height: unset;
        overflow: hidden;
    }
}

@media (min-width: 1400px) {
    #hero-mozaic {
        background-size: 35vw;
    }

    #hero-bg {
        background-size: 80vh;
    }
}

.play-icon {
    position: absolute;
    left: 16px;
    top: 8px;
    font-size: 40px;
    color: #000000;
}

.position-relative {
    position: relative;
}

.custom-modal {
    border: none;
    border-radius: 1rem;
    padding: 0;
    width: 90%;
    max-width: 1140px;
    /* Equivalente ao modal-xl */
    background: #1a1a1a;
    /* Cor de fundo escura conforme seu tema */
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

/* Garante que o dialog centralize corretamente */
dialog[open] {
    display: block;
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>