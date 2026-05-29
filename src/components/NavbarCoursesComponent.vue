<script setup lang="ts">
import { useSiteStore } from '@/stores/website';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/img/logo/logo.png';

const siteStore = useSiteStore();
const router = useRouter();
const fixedNavbar = ref<boolean>(false);

const onScroll = () => {
    fixedNavbar.value = window.scrollY > 56;
}

const logOut = () => {
    siteStore.logout();
    localStorage.removeItem('tokenJwt');
    window.location.href = '/';
}

onMounted(()=>{
    window.addEventListener('scroll', onScroll);
    if(localStorage.getItem('tokenJwt') == null){
        siteStore.logout()
    }
})

onUnmounted(()=>{
    window.removeEventListener('scroll', onScroll);
})
</script>

<template>    
    <header class="ff-roboto fw-semibold">
        <nav :class="['navbar navbar-expand-xl bg-light shadow', { 'fixed-top': fixedNavbar }]" data-bs-theme="light">
            <!-- caixa da navbar -->
            <div class="container">
                <!-- logo / brand -->
                <a href="/" class="navbar-brand">
                    <img :src="Logo" alt="Logo do site" height="45">
                </a>

                <!-- botão do menu -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigationBar"
                    aria-expanded="false" aria-label="Gatilho da barra de navegação">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- links -->
                <div id="navigationBar" class="collapse navbar-collapse">
                    <ul class="navbar-nav fw-bold ms-auto mb-2 mb-lg-0">
                        <li class="nav-item ms-lg-2">
                            <RouterLink class="nav-link" to="/meus-cursos">Meus Cursos</RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2 dropdown" v-if="siteStore.isAuthenticated">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Bem vindo(a), {{ siteStore.firstname }}
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="siteStore.role == 'usuario'">
                                    <a class="dropdown-item"
                                        :href="`//corujamentoria.com.br/adm/pre-login.php?email=${siteStore.email}&company=${siteStore.company}`">Administrativo</a>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/perfil">Perfil</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/">Página Inicial</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item" href="javascript:void(0)" @click="logOut">Sair</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>