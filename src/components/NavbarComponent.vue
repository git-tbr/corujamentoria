<script lang="ts" setup>
import { useSiteStore } from '@/stores/website'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Logo from '@/assets/img/logo/logo.png'

const siteStore = useSiteStore()
const fixedNavbar = ref<boolean>(false)
const actualRoute = ref<string>('')
const route = useRoute()
const router = useRouter()

const onScroll = () => {
    fixedNavbar.value = window.scrollY > 56
}

const logOut = () => {
    siteStore.logout()
    localStorage.removeItem('tokenJwt')
    router.push('/')
}

onMounted(() => {
    window.addEventListener('scroll', onScroll)
    actualRoute.value = route.name as string
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>
<template>
    <header class="shadow ff-roboto fw-semibold">
        <nav :class="['navbar navbar-expand-xl bg-light', { 'fixed-top': fixedNavbar }]" data-bs-theme="light">
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
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item ms-lg-2">
                            <RouterLink to="/"
                                :class="['nav-link', { 'text-success fw-semibold': actualRoute === 'home' }]">Home
                            </RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2">
                            <RouterLink to="/mentoria"
                                :class="['nav-link', { 'text-success fw-semibold': actualRoute === 'mentoria' }]">
                                Mentoria</RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2">
                            <RouterLink to="/revisao"
                                :class="['nav-link', { 'text-success fw-semibold': actualRoute === 'revisao' }]">Revisão
                            </RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2">
                            <RouterLink to="/ebook"
                                :class="['nav-link', { 'text-success fw-semibold': actualRoute === 'ebook' }]">Ebook
                            </RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2">
                            <RouterLink to="/contato"
                                :class="['nav-link', { 'text-success fw-semibold': actualRoute === 'contato' }]">Contato
                            </RouterLink>
                        </li>

                        <li class="nav-item ms-lg-2 dropdown" v-if="siteStore.isAuthenticated">
                            <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Bem vindo(a), {{ siteStore.firstname }}
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="siteStore.role == 'usuario'">
                                    <a href="javascript:alert('Em construção')" class="dropdown-item">Administrativo</a>
                                </li>
                                <li>
                                    <RouterLink to="/perfil" class="dropdown-item">Perfil</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/meus-cursos" class="dropdown-item">Meus Cursos</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="dropdown-item" @click="logOut">Sair</a>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item ms-lg-2 align-items-center d-flex mb-3 mb-lg-0" v-else>
                            <RouterLink to="/login" class="btn btn-success bg-gradient rounded-4 px-4">
                                Login
                            </RouterLink>
                        </li>
                        <li class="nav-item ms-lg-2 align-items-center d-flex" v-if="!siteStore.isAuthenticated">
                            <RouterLink to="/cadastro" class="btn btn-danger bg-gradient rounded-4 px-4">
                                Cadastro
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>