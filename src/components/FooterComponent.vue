<script setup lang="ts">
import LogoFooter from '@/assets/img/logo/white_logo.png'

</script>

<template>
    <footer class="bg-success text-white">
        <div class="container py-3">
            <div class="row py-3">
                <div class="col-md-6 col-lg-3 align-self-center p-3">
                    <img :src="LogoFooter" alt="Logo do site" class="img-fluid w-100" />
                </div>

                <div class="col-md-auto ms-auto p-3">
                    <h5 class="fw-bold">Páginas</h5>
                    <ul class="list-unstyled d-flex flex-column gap-1">
                        <li>
                            <RouterLink to="/" class="text-white text-decoration-none">Home</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/mentoria" class="text-white text-decoration-none">Mentoria</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/revisao" class="text-white text-decoration-none">Revisão</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/ebook" class="text-white text-decoration-none">Ebook</RouterLink>
                        </li>
                    </ul>
                </div>

                <div class="col-md-auto ms-lg-3 p-3">
                    <h5 class="fw-bold">Entre em contato</h5>
                    <ul class="list-unstyled d-flex flex-column gap-1">
                        <li>
                            <a href="tel:+5511947990277" class="text-white text-decoration-none">+55 11 94799-0277</a>
                        </li>
                        <li>
                            <a href="mailto:email@corujamentoria.com"
                                class="text-white text-decoration-none">email@corujamentoria.com</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-auto ms-lg-3 p-3">
                    <h5 class="fw-bold">Redes Sociais</h5>
                    <ul class="list-unstyled d-flex flex-column gap-1">
                        <li>
                            <a href="https://www.instagram.com/coruja_mentoria" target="_blank"
                                rel="noopener noreferrer" class="text-white text-decoration-none">
                                <font-awesome-icon icon="fa-brands fa-instagram" size="lg" />
                            </a>
                        </li>
                        <li>
                            <RouterLink to="/politica" class="text-decoration-none text-white">
                                Política de Privacidade
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row py-3 justify-content-between">
                <div class="col-md-auto">
                    <p class="mb-0">&copy; CoruJÁ Mentoria 2026 - Todos os direitos reservados</p>
                </div>
                <div class="col-md-auto">
                    <p class="mb-0">
                        Desenvolvido por
                        <a href="https://tbr.com.br" target="_blank" rel="noopener noreferrer"
                            class="text-white fw-semibold text-decoration-none">TBR Produções</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>