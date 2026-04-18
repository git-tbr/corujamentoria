<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import Logo from '@/assets/img/logo/logo.png'
import DoctorsCircle from '@/assets/img/home/doutores_circulo.png'
import DoctorsLaptop from '@/assets/img/home/doutores_laptop.png'
import PlaneBadge from '@/assets/img/home/plane_badge.png'
import DrJamil from '@/assets/img/home/dr_jamil.png'
import DrJamilDetalhe from '@/assets/img/home/dr_jamil_detalhe.png'
import DraAna from '@/assets/img/home/dra_ana.png'
import DraAnaDetalhe from '@/assets/img/home/dra_ana_detalhe.png'
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
import EbookFundo from '@/assets/img/home/ebook_fundo.png'
import DraBrunaCirculo from '@/assets/img/home/dra_bruna_circulo.png'
import CorujaBranca from '@/assets/img/logo/coruja_branca.png'

import { RouterLink, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useAlert } from '@/services/alertService'

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

const paraQuemList = [
    { id: 1, content: 'Está se preparando para revalidar o diploma médico em Portugal ou se preparando para a PNA' },
    { id: 2, content: 'Acabou de se formar ou já atua há anos na medicina' },
    { id: 3, content: 'Mora no Brasil, Portugal ou em outros países de língua portuguesa ou não, mas que deseja acessar o mercado de Portugal e Europa' },
    { id: 4, content: 'Está perdido(a) no meio de tanto conteúdo e não sabe por onde começar' },
    { id: 5, content: 'Quer estudar com segurança e orientação de perto por quem já passou pelo processo' },
    { id: 6, content: 'Deseja atuar como médico em Portugal ou simplesmente se atualizar com as práticas da medicina portuguesa e europeia' },
];

const doctorsImages = [
    { id: 1, img: DrJamil, name: 'Dr. Jamil Ribeiro Cade' },
    { id: 2, img: DraBruna, name: 'Dra. Bruna Soares Bicalho' },
    { id: 3, img: DraAna, name: 'Dra. Ana Carolina Facundo' },
]

const modalVideo = ref<any>(null);
const currentPlayerUrl = ref<string>('');
const currentDoctorName = ref<string>('');
const { showAlert } = useAlert();
const router = useRouter();

const openCourse = async (curso: string) => {
    if (curso === 'revisao') {
        await showAlert({
            title: "Revisão Pré-Prova",
            message: "O curso ainda não está disponível para compra.",
            type: "error",
        });
        return;
    }

    router.push({ name: curso });
}

const depoimentosAgrupados = computed(() => {
    const size = 3
    const grupos = []
    for (let i = 0; i < depoimentosList.length; i += size) {
        grupos.push(depoimentosList.slice(i, i + size))
    }
    return grupos
});

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
                                <div class="row" v-reveal="'bottom'">
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
                            <h1 class="text-success fw-bold text-center ff-roboto" v-reveal="'bottom'">
                                Depoimentos
                            </h1>
                            <p class="fs-5 text-white text-center" v-reveal="'bottom'">
                                Confira os depoimentos de alunos e ex-alunos:
                            </p>
                        </div>
                    </div>

                    <div id="minhaGaleriaCarrossel" class="carousel slide" data-bs-ride="carousel" v-reveal="'bottom'">

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

            <!-- curso revisão pré-prova -->
            <section>
                <div class="container py-5">
                    <div class="row mb-3">
                        <div class="col">
                            <img :src="Logo" alt="" class="img-fluid">
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
                            <button type="button" class="btn btn-danger fs-5 rounded-4 px-4 btn-lg fw-semibold"
                                @click="openCourse('revisao')">
                                Quero garantir somente
                                <br>
                                a <span class="text-gold">Revisão Pré-Prova</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- professores -->
            <section class="bg-darkGreen">
                <div class="container py-5">
                    <h1 class="text-lemonGreen text-center mb-3 ff-roboto fw-bold" v-reveal="'bottom'">
                        Professores
                    </h1>
                    <div class="row justify-content-center" v-reveal="'bottom'">
                        <div class="col-md-6 col-lg-4 mb-3 mb-md-0">
                            <div class="m-1 rounded-4" style="background-color: #146531;">
                                <img :src="DrJamilDetalhe" alt="Dr Jamil Ribeiro Cade" class="w-100 rounded-top-4">
                                <p class="fs-2 text-lightGreen text-center mb-0 fw-semibold py-2">
                                    Dr. Jamil Ribeiro Cade
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-3 mb-md-0">
                            <div class="m-1 rounded-4" style="background-color: #02542D;">
                                <img :src="DraAnaDetalhe" alt="Dra Ana Carolina Facundo" class="w-100 rounded-top-4">
                                <p class="fs-2 text-lightGreen text-center mb-0 fw-semibold py-2">
                                    Dra. Ana Carolina Facundo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- segunda fase -->
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

                            <a href="https://wa.me/5511948308431" target="_blank"
                                class="btn btn-success bg-gradient btn-lg fs-5 py-3 px-5 rounded-4 border-light mb-3">
                                <font-awesome-icon icon="fa-brands fa-whatsapp" />
                                Garanta sua vaga para segunda fase agora!
                            </a>

                            <p class="fs-3 text-white mb-3 fw-semibold" v-reveal="'bottom'">
                                Vendas limitadas ao número de vagas
                            </p>

                            <div class="row g-3">
                                <div class="col-lg-6 d-grid">
                                    <div class="fs-4 text-center py-3 text-white rounded-4"
                                        style="background-color: #E3172A;">
                                        <span class="text-warning fw-bold">€ 249,00</span>
                                        <br>
                                        <small>para mentorado</small>
                                    </div>
                                </div>
                                <div class="col-lg-6 d-grid">
                                    <div class="fs-4 text-center py-3 text-white rounded-4"
                                        style="background-color: #E3172A;">
                                        <span class="text-warning fw-bold">€ 319,00</span>
                                        <br>
                                        <small>Para não mentorado</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ebook -->
            <section class="bg-black">
                <div class="container py-5">

                    <div class="row">
                        <div class="col-lg-6 mb-3 mb-lg-0 align-self-center" v-reveal="'bottom'">
                            <img :src="EbookFundo" alt="Ebook CoruJÁ" class="img-75">
                        </div>
                        <div class="col-lg-6 align-self-center" v-reveal="'bottom'">
                            <h1 class="fw-bold text-light mb-3 ff-roboto">
                                Materiais de Estudo
                            </h1>
                            <img :src="Logo" alt="" height="60" class="mb-3">
                            <h1 class="mb-3 fw-bold text-light ff-roboto">
                                Manual Completo
                            </h1>
                            <p class="fs-3 fw-semibold text-success mb-3" v-reveal="'bottom'">
                                Material Completo para Revalidação
                            </p>
                            <p class="fs-5 text-light mb-3" v-reveal="'bottom'">
                                Encontre os melhores materiais de estudo para sua preparação na reavaliação de diplomas
                                médicos em Portugal. Livros completos e atualizados escritos pelos profissioinais que
                                obtiveram as maiores notas do concurso.
                            </p>
                            <ul class="list-unstyled fs-5 text-light mb-3" v-reveal="'bottom'">
                                <li class="mb-1">
                                    <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success" />
                                    Atualizados constantemente
                                </li>
                                <li class="mb-1">
                                    <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success" />
                                    Desenvolvidos pelos melhores
                                </li>
                                <li class="mb-1">
                                    <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success" />
                                    Acesso imediato
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <p class="fs-5 text-light lh-0 mb-3" v-reveal="'bottom'">
                                Apresentamos os Manuais CoruJÁ: uma coleção inédita com 7 volumes que reúde o conteúdo
                                essencial das aulas ministradas pelo Dr. Jamil e Dra. Ana nas disciplinas mais cobradas
                                na prova de equivalência médica em Portugal.
                                <br>
                                Cada fascículo foi pensado para te guiar nos estudos de forma prática e objetiva, com
                                linguagem clara, foco no que realmente cai na prova e organizado por tema: Clínica
                                Médica I e II, Cirurgia, Pediatria, Ginecoligia e Obstetrícia, Medicina Geral e Familiar
                                (MGF) e Saúde Pública.
                                <br>
                                Ideal para acompanhar os encontors e revisar temas importantes e estruturar seu plano de
                                estudos com clareza e estratégia.
                                <br>
                                Um material completo, direto ao ponto, feito por quem já passou pela prova e sabe
                                exatamente o que você precisa esturdar para conquistar sua aprovação.
                                <br>
                                Seja vem-vindo(a) ao CoruJÁ. Estudar com propósito é o primeiro passo para viver seu
                                sonho em Portugal.
                            </p>
                            <p class="text-end fs-5 text-light">
                                Autor(es)
                                <br>
                                Ana Carolina Facundo e Jamil Ribeiro Cade
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto mx-auto d-grid" v-reveal="'bottom'">
                            <button type="button" class="btn btn-danger fs-5 rounded-4 px-4 btn-lg fw-semibold"
                                @click="openCourse('ebook')">
                                Quero garantir somente
                                <br>
                                o <span class="text-gold">Manual Completo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- para quem é? -->
            <section style="background-color: #15152C;">
                <div class="container py-5">
                    <div class="row">
                        <div class="col">
                            <h1 class="display-5 text-lemonGreen text-center ff-roboto fw-bold mb-0"
                                v-reveal="'bottom'">
                                Para quem é?
                            </h1>
                            <p class="fs-2 text-light text-center mb-3 ff-roboto" v-reveal="'bottom'">
                                Essa mentoria é pra você que:
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 col-lg-4" v-for="pq in paraQuemList" :key="pq.id" v-reveal="'bottom'">
                            <div class="p-3 position-relative border border-secondary rounded-4 align-content-center mb-3"
                                style="min-height: 200px">
                                <font-awesome-icon icon="fa-solid fa-circle-check"
                                    class="text-success icon-left-top fs-1" />
                                <p class="fs-4 text-light text-center">
                                    {{ pq.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- segunda fase -->
            <section>
                <div class="container py-5">
                    <div class="row">
                        <div class="col-md-6 mb-3 mb-md-0 align-self-center" v-reveal="'bottom'">
                            <img :src="DraBrunaCirculo" alt="" class="img-75">
                        </div>
                        <div class="col-md-6 align-self-center">
                            <img :src="Logo" alt="" height="60" class="mb-3" v-reveal="'bottom'" />
                            <h1 class="fw-bold text-success ff-roboto mb-3" v-reveal="'bottom'">
                                Mentoria CoruJÁ Segunda Fase
                            </h1>
                            <p class="fs-2 lh-1 text-danger mb-3" v-reveal="'bottom'">
                                Prepare-se para a Prova Prática e Sabatina com quem teve as maiores notas da história no
                                processo.
                            </p>
                            <p class="fs-5" v-reveal="'bottom'">
                                Chega de estudar sem saber o que cada banca quer.
                                Na Mentoria Segunda Fase CoruJÁ, você segue um plano validado por médicos aprovados com
                                exelência - em bancas diferentes - e com tudo direcionado para a sua apresentação do
                                relatório médico e sabatina.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- chamada segunda fase -->
            <section class="bg-darkGreen">
                <div class="container py-5">
                    <div class="row">
                        <div class="col-md-auto order-md-last align-self-center mb-3 mb-md-0" v-reveal="'bottom'">
                            <img :src="CorujaBranca" alt="" width="200" class="d-block mx-auto">
                        </div>
                        <div class="col align-self-center order-md-first" v-reveal="'bottom'">
                            <p class="fs-4 fw-semibold text-white mb-3">
                                CoruJÁ Mentoria 2ª Fase é Online e em Tempo Real. Após os encontros, os materiais ficam
                                gravados e disponíveis para consulta até o final das provas.
                                <br>
                                Método Validado com 99% de aprovação na Segunda Fase.
                            </p>
                            <p class="text-center">
                                <a href="https://wa.me/5511948308431" target="_blank"
                                    class="btn btn-lg btn-danger bg-gradient border border-light rounded-4 fs-5 py-3 px-5">
                                    <font-awesome-icon icon="fa-brands fa-whatsapp" />
                                    Quero garantir minha vaga
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- os médicos com as maiores notas -->
            <section class="bg-dark">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 px-0 position-relative" v-for="img in doctorsImages" :key="img.id"
                            v-reveal="'bottom'">
                            <img :src="img.img" alt="" class="img-fluid">
                            <p
                                class="text-center text-light fw-semibold ff-roboto fs-5 mb-0 bg-success bg-gradient rounded-4 bg-opacity-50 p-3 text-over-img">
                                {{ img.name }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="container py-5">
                    <h1 class="display-4 text-center text-lemonGreen ff-roboto fw-bold mb-3" v-reveal="'bottom'">
                        Os médicos com as maiores notas - agora do seu lado
                    </h1>
                    <div class="row">
                        <div class="col-md-6 align-self-center" v-reveal="'bottom'">
                            <p class="fs-5 text-light mb-3">
                                Na Mentoria Segunda Fase CoruJÁ, você tem encontros com 3 médicos aprovados, cada um em
                                uma banca diferente, incluindo:
                            </p>
                            <ul class="text-light mb-3 fs-5">
                                <li class="mb-1">
                                    Universidade de Lisboa
                                </li>
                                <li class="mb-1">
                                    Universidade do Porto
                                </li>
                            </ul>
                            <ul class="list-unstyled text-light mb-3 fs-5">
                                <li class="mb-1">
                                    Três estilos.
                                </li>
                                <li class="mb-1">
                                    Três bancas.
                                </li>
                                <li class="mb-3">
                                    Três experiências reais.
                                </li>
                                <li class="mb-1 fw-semibold">
                                    Você aprende exatamente o que cada banca valoriza.
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6 align-self-center" v-reveal="'bottom'">
                            <ul class="list-unstyled text-light mb-3 mb-md-5 fs-5">
                                <li class="mb-3">
                                    <font-awesome-icon icon="fa-solid fa-angle-right" class="text-success fs-3" />
                                    Quer treinar com profissionais que conhecem as bancas "por dentro", com professores
                                    de semiologia médica com foco em Portugal.
                                </li>
                                <li class="mb-3">
                                    <font-awesome-icon icon="fa-solid fa-angle-right" class="text-success fs-3" />
                                    Mentores aprovados com as maiores notas do processo médico e que já dominaram as
                                    bancas nas mais diversas universidades médicas de Portugal.
                                </li>
                            </ul>
                            <a href="https://wa.me/5511948308431" target="_blank"
                                class="btn btn-lg btn-danger bg-gradient border border-light rounded-4 fs-5 py-3 px-5">
                                <font-awesome-icon icon="fa-brands fa-whatsapp" />
                                Quero garantir minha vaga
                            </a>
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

.text-over-img {
    position: absolute;
    bottom: 3%;
    width: 90%;
    left: 5%;

}

.icon-left-top {
    position: absolute;
    top: -6px;
    left: -10px;
}

.circle-bg {
    background-image: url(../assets/img/home/backgroundCircle.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

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

#bg-paperplane {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: bottom right
}

@media (min-width: 992px) {
    #bg-paperplane {
        background-image: url(../assets/img/home/paper-airplane.png);
        background-size: 50%;
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

    #bg-paperplane {
        background-size: 45%;
    }
}

@media (min-width: 1400px) {
    #hero-mozaic {
        background-size: 35vw;
    }

    #hero-bg {
        background-size: 80vh;
    }

    #bg-paperplane {
        background-size: 40%;
    }
}

.play-icon {
    position: absolute;
    left: 16px;
    top: 8px;
    font-size: 40px;
    color: #000000;
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