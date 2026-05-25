<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import { useSiteStore } from '@/stores/website';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAlert } from '@/services/alertService';
import api from '@/services/api';

const { showAlert } = useAlert();
const router = useRouter();
const siteStore = useSiteStore();

interface UpdateFormInterface {
    name: string;
    nacionality: string;
    cellphone: string;
    email: string;
    email_confirmation: string;    
    city: string;
    state: string;
    country: string;
    cpf: string;
    tin: string;
    country_document: string;
    profession: string;
}

const initialValue = (): UpdateFormInterface => ({
    name: '',
    nacionality: '',
    cellphone: '',
    email: '',
    email_confirmation: '',
    city: '',
    state: '',
    country: '',
    cpf: '',
    tin: '',
    country_document: '',
    profession: '',
});

const updateData = reactive(initialValue());
const isSubmitingUpdate = ref(false);
const isBrazilian = ref(true);
const emailCheckedClass = ref('');

//-- CPF MASK --
const cpfMask = () => {
    let value = updateData.cpf.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    updateData.cpf = value;
}

//-- COUNTRY CHANGE --
const countryChange = () => {
    isBrazilian.value = updateData.nacionality === 'Brasileiro(a)';
}

//-- VALIDATE EMAIL --
const validateEmail = () => {
    if (updateData.email !== updateData.email_confirmation) {
        emailCheckedClass.value = 'border-danger border-3';
    } else {
        emailCheckedClass.value = '';
    }
}

//-- TIN DESCRIPTION --
const showTinDescription = async () => {
    await showAlert({
        title: "TIN",
        message: "Taxpayer Identification Number - Documento de identificação tributária. Alguns exemplos: NIF, SSN, CUIT, RFC.",
        type: "success",
    });
}

//-- CANCEL SUBSCRIBE --
const cancelSubscribe = () => {
    router.push({ name: 'home' });
}

//-- CARREGAR OS DADOS DO USUÁRIO --
const getUserData = async () => {
    try {
        const response = await api.get(`/api/users/${siteStore.userId}`);
        const data = response.data;
        if(data.code == 0) throw new Error(data.message);
        const user = data.user;

        updateData.cellphone = user.u_phone;
        updateData.email = user.u_email;
        updateData.name = user.u_firstname + ' ' + user.u_lastname;
        updateData.city = user.u_city;
        updateData.state = user.u_state;
        updateData.country = user.u_country;
        updateData.cpf = user.u_cpf;
        updateData.tin = user.u_tin;
        updateData.profession = user.u_profession;
        updateData.nacionality = user.u_cpf != '' ? 'Brasileiro(a)' : 'Estrangeiro(a)';
        updateData.email_confirmation = user.u_email;
        
    } catch (error){
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';

        await showAlert({ 
            title: "Erro", 
            message: errorMessage, 
            type: "error" 
        });
    }
}

//-- SUBMIT FORM --
const updateSubmit = async () => {
    try {
        const response = await api.put(`/api/users/update/${siteStore.userId}`, updateData);
        const data = response.data;
        if(data.code == 0) throw new Error(data.message);
        await showAlert({ 
            title: "Sucesso", 
            message: data.message, 
            type: "success" 
        });
        router.push({ name: 'home' });
    } catch (error) {
        let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';

        await showAlert({ 
            title: "Erro", 
            message: errorMessage, 
            type: "error" 
        });
    }
}

onMounted(() => {
    getUserData();
})
</script>
<template>
    <Layout>
        <main>
            <section id="hero-subscribe">
                <div class="container-fluid py-3 py-lg-5" id="hero-container">
                    <div class="row">
                        <div class="col-xl-6 bg-light p-3 p-lg-5 mx-auto rounded-4 shadow">
                            <h1 class="text-center text-success ff-roboto fw-bold" v-reveal="'bottom'">
                                Dados Pessoais
                            </h1>
                            <hr class="border border-3 border-success">
                            <form @submit.prevent="updateSubmit">
                                <div class="row">
                                    <div class="col-lg-8 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="name" class="form-label">Nome completo</label>
                                            <input type="text" id="name"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.name" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="nacionality" class="form-label">Nacionalidade</label>
                                            <select id="nacionality" class="form-select bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.nacionality" @change="countryChange" required>
                                                <option value="" disabled>Selecione uma opção</option>
                                                <option value="Brasileiro(a)">Brasileiro(a)</option>
                                                <option value="Estrangeiro(a)">Estrangeiro(a)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 mb-2" v-if="isBrazilian" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="cpf" class="form-label">Informe seu CPF</label>
                                            <input type="text" id="cpf"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.cpf" @input="cpfMask">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-else v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="tin" class="form-label">Informe seu TIN (NIF, CUIT, SSN)
                                                <span class="text-danger" role="button"
                                                    @click="showTinDescription">(?)</span></label>
                                            <input type="text" class="form-control bg-secondary bg-opacity-10 p-2"
                                                id="tin" v-model="updateData.tin">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="cellphone" class="form-label">Celular</label>
                                            <input type="text" id="cellphone"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.cellphone" placeholder="+55 99 99999-9999"
                                                required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="email" class="form-label">E-mail</label>
                                            <input type="email" id="email"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.email" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="email_confirmation" class="form-label">Confirme seu
                                                e-mail</label>
                                            <input type="email" id="email_confirmation"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                :class="emailCheckedClass" v-model="updateData.email_confirmation"
                                                @input="validateEmail" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="profissao" class="form-label">Área de atuação</label>
                                            <input type="text" id="profissao"
                                                class="form-control bg-secondary bg-opacity-10 p-2" v-model="updateData.profession" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="city" class="form-label">Cidade</label>
                                            <input type="text" id="city"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.city" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="state" class="form-label">Estado</label>
                                            <input type="text" id="state"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.state" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="country" class="form-label">País</label>
                                            <input type="text" id="country"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="updateData.country" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" v-reveal="'bottom'">
                                    <div class="col-md-6 d-grid mb-2">
                                        <RouterLink class="btn btn-secondary btn-lg rounded-4" to="/">
                                            Cancelar
                                        </RouterLink>
                                    </div>
                                    <div class="col-md-6 d-grid mb-2">
                                        <button class="btn btn-success btn-lg rounded-4" type="submit">
                                            <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" spin
                                                v-if="isSubmitingUpdate" />
                                            {{ isSubmitingUpdate ? 'Processando...' : 'Salvar Alterações' }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>

<style scoped>
.input-group .btn {
    z-index: 0;
}

#hero-subscribe {
    background-image: url('@/assets/img/cadastro/hero.png');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>