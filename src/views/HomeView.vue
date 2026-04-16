<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import Logo from '@/assets/img/logo/logo.png'
import DoctorsCircle from '@/assets/img/home/doutores_circulo.png'
import DoctorsLaptop from '@/assets/img/home/doutores_laptop.png'
import PlaneBadge from '@/assets/img/home/plane_badge.png'
import DrJamil from '@/assets/img/home/dr_jamil.png'
import DraAna from '@/assets/img/home/dra_ana.png'
import DraBruna from '@/assets/img/home/dra_bruna.png'
import { RouterLink } from 'vue-router'

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
]

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
                        <div class="col-md-6 px-0" v-reveal="'bottom'">
                            <img :src="DrJamil" alt="Dr Jamil Ribeiro Cade" class="w-100">
                        </div>
                        <div class="col-md-6 p-3 p-md-5" v-reveal="'bottom'">
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
                        <div class="col-md-6 px-0 order-md-2" v-reveal="'bottom'">
                            <img :src="DraAna" alt="Dra Ana Carolina Facundo" class="w-100">
                        </div>
                        <div class="col-md-6 p-3 p-md-5 order-md-1" v-reveal="'bottom'">
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
                        <div class="col-md-6 px-0" v-reveal="'bottom'">
                            <img :src="DraBruna" alt="Dra Bruna Soares Bicalho" class="w-100">
                        </div>
                        <div class="col-md-6 p-3 p-md-5" v-reveal="'bottom'">
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
                    <h1 class="text-success text-center fw-bold mb-3" v-reveal="'bottom'">
                        Por que a CoruJÁ é diferente?
                    </h1>

                    <div class="row">
                        <div class="col-lg-9 mx-auto bg-dark rounded-4">
                            <div class="p-3">
                                <div class="row mb-3">
                                    <div class="col-lg-6 text-light">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore necessitatibus
                                        deserunt placeat hic expedita nisi enim, animi quam a repellendus quia,
                                        molestiae possimus voluptates sit nesciunt? Ad nemo ducimus maxime.
                                    </div>
                                    <div class="col-lg-6 text-light">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ullam
                                        eveniet doloribus iusto quas, provident architecto culpa, voluptatum
                                        exercitationem nemo quasi accusamus! Commodi architecto quo ducimus ea impedit?
                                        In, voluptate.
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <p class="text-center">
                                            <RouterLink to="/mentoria" class="btn btn-danger rounded-pill px-4 fs-5">
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
                </div>
            </section>
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
    background-position: bottom center;
    background-size: cover;
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
}

@media (min-width: 1400px) {
    #hero-mozaic {
        background-size: 35vw;
    }

    #hero-bg {
        background-size: 80vh;
    }
}
</style>