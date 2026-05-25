<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSiteStore } from '@/stores/website';
import api from '@/services/api';
import { useAlert } from '@/services/alertService';

const { showAlert } = useAlert();

const router = useRouter();
const siteStore = useSiteStore();
const selectedCourse = ref<string>('');
const courseData = ref<any>({});

const getUserData = () => {
    if (siteStore.isAuthenticated == false) {
        router.push({ name: 'login' });
    }
}

const checkSelectedCourse = () => {
    if (sessionStorage.getItem('course') == null) {
        router.push({ name: 'home' });
    }

    selectedCourse.value = sessionStorage.getItem('course') as string;
}

const checkPaymentStatus = () => {
    if (sessionStorage.payment == null || sessionStorage.payment == false || sessionStorage.payment == 'false') {
        router.push({ name: 'home' });
    }
}

const getCourseData = async () => {
    try {
        const response = await api.get(`/v1/courses/${selectedCourse.value}`);
        const data = response.data;

        if (data.code == 0) {
            throw new Error(data.message);
        }

        courseData.value = data.course;
        console.log(courseData.value);//aqui
        
    } catch (error) {
        await showAlert({
            title: "Erro",
            message: error instanceof Error ? error.message : 'O curso não pôde ser carregado.',
            type: "error",
        });
    }
}

onMounted(() => {
    //verificar se o usuário está logado
    getUserData();

    //verificar se existe algum curso selecionado
    checkSelectedCourse();

    //verificar se o pagamento está definido como true
    checkPaymentStatus();

    //carregar dados do curso que está sendo comprado
    getCourseData();
})
</script>

<template>
    <Layout>
        <main>

        </main>
    </Layout>
</template>

<style scoped></style>