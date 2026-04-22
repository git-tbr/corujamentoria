<script lang="ts" setup>
import whiteLogo from '@/assets/img/revisao/white_logo.png'
import Layout from '@/layouts/DefaultLayout.vue'
</script>
<template>
    <Layout>
        <main>
            <!-- hero -->
            <section id="hero_revisao" class="align-content-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <img :src="whiteLogo" alt="" height="150" class="mb-3">
                            <h1 class="display-4 text-light fw-bold mb-3 ff-roboto">
                                Curso Revisão Pré-Prova
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style>
#hero_revisao {
    background-image: url(../assets/img/revisao/banner.png);
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 50vh;
}
</style>