<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue';
import api from '@/services/api'
import { useSiteStore } from '@/stores/website';
import { onMounted, ref } from 'vue';

const policyData = ref<string[]>([]);
const siteStore = useSiteStore();

const getPolicyData = async () => {
    try {
        const response = await api.get(`/v1/policy/${siteStore.company}`);
        policyData.value = response.data.p_text;
    } catch (error) {
        console.log(error);
    }
}

onMounted(()=>{
    getPolicyData();
})
</script>
<template>
    <Layout>
        <main>
            <section class="container py-3 py-lg-5">
                <h1 class="fw-bold">
                    Política de Privacidade
                </h1>
                <hr class="my-3 border border-2 border-dark">
                <div class="mb-3" v-html="policyData"></div>
            </section>
        </main>
    </Layout>
</template>