<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import { useSiteStore } from '@/stores/website';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAlert } from '@/services/alertService';
import instance from '@/services/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { showAlert } = useAlert();
const api = instance;
const router = useRouter();
const siteStore = useSiteStore();

interface SubscribeFormInterface {
    name: string;
    nacionality: string;
    cellphone: string;
    email: string;
    email_confirmation: string;
    password: string;
    password_confirmation: string;
    profession: string;
    city: string;
    state: string;
    country: string;
    company: number;
    cpf: string;
    tin: string;
    country_document: string;
    contact_auth: boolean;
}

const initialValue = (): SubscribeFormInterface => ({
    name: '',
    nacionality: '',
    cellphone: '',
    email: '',
    email_confirmation: '',
    password: '',
    password_confirmation: '',
    profession: '',
    city: '',
    state: '',
    country: '',
    company: 0,
    cpf: '',
    tin: '',
    country_document: '',
    contact_auth: false,
});

const subscribeData = reactive(initialValue());
const isSubmitingCadastro = ref(false);
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const isBrazilian = ref(true);
const passCheckedClass = ref('');
const emailCheckedClass = ref('');

//-- CPF MASK --
const cpfMask = () => {
    let value = subscribeData.cpf.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    subscribeData.cpf = value;
}

//-- COUNTRY CHANGE --
const countryChange = () => {
    isBrazilian.value = subscribeData.nacionality === 'Brasileiro(a)';

    if (!isBrazilian.value) {
        subscribeData.cpf = '';
    }
}

//-- VALIDATE EMAIL --
const validateEmail = () => {
    if (subscribeData.email !== subscribeData.email_confirmation) {
        emailCheckedClass.value = 'border-danger border-3';
    } else {
        emailCheckedClass.value = '';
    }
}

//-- VALIDATE PASSWORD --
const validatePassword = () => {
    if (subscribeData.password !== subscribeData.password_confirmation) {
        passCheckedClass.value = 'border-danger border-3';
    } else {
        passCheckedClass.value = '';
    }
}

//-- PASSWORD VISIBILITY
const tooglePasswordVisibility = (field: string) => {
    if (field === 'password') {
        showPassword.value = !showPassword.value;
    } else {
        showPasswordConfirmation.value = !showPasswordConfirmation.value;
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

//-- SUBMIT FORM --
const subscribeSubmit = async () => {
    // todo
}

//-- GET COMPANY
onMounted(() => {
    subscribeData.company = siteStore.company;
})
</script>
<template>
    <Layout>
        <main>
            <section id="hero-subscribe">
                <div class="container-fluid py-3 py-lg-5" id="hero-container">
                    <div class="row">
                        <div class="col-xl-6 bg-light p-3 p-lg-5 ms-xl-5 rounded-4 shadow">
                            <h1 class="text-center text-success ff-roboto fw-bold" v-reveal="'bottom'">
                                Crie sua conta
                            </h1>
                            <hr class="border border-3 border-success">
                            <p class="fs-5 mb-3 text-center mb-3 mb-lg-4 ff-roboto" v-reveal="'bottom'">
                                Para se cadastrar, preencha os dados abaixo.
                            </p>
                            <form @submit.prevent="subscribeSubmit">
                                <div class="row">
                                    <div class="col-lg-8 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="name" class="form-label">Nome completo</label>
                                            <input type="text" id="name"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.name" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="nacionality" class="form-label">Nacionalidade</label>
                                            <select id="nacionality" class="form-select bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.nacionality" @change="countryChange" required>
                                                <option value="">Selecione uma opção</option>
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
                                                v-model="subscribeData.cpf" @input="cpfMask">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-else v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="tin" class="form-label">Informe seu TIN (NIF, CUIT, SSN)
                                                <span class="text-danger" role="button"
                                                    @click="showTinDescription">(?)</span></label>
                                            <input type="text" class="form-control bg-secondary bg-opacity-10 p-2"
                                                id="tin" v-model="subscribeData.tin">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="cellphone" class="form-label">Celular</label>
                                            <input type="text" id="cellphone"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.cellphone" placeholder="+55 99 99999-9999"
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
                                                v-model="subscribeData.email" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="email_confirmation" class="form-label">Confirme seu
                                                e-mail</label>
                                            <input type="email" id="email_confirmation"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                :class="emailCheckedClass" v-model="subscribeData.email_confirmation"
                                                @input="validateEmail" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="password" class="form-label">Senha</label>

                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'" id="password"
                                                    class="form-control bg-secondary bg-opacity-10 p-2 rounded-end-0"
                                                    v-model="subscribeData.password" required>
                                                <button
                                                    class="btn text-dark bg-light border border-1 rounded-2 rounded-start-0"
                                                    type="button" @click="tooglePasswordVisibility('password')">
                                                    <font-awesome-icon
                                                        :icon="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="password_confirmation" class="form-label">Confirme sua
                                                senha</label>
                                            <div class="input-group">
                                                <input :type="showPasswordConfirmation ? 'text' : 'password'"
                                                    id="password_confirmation"
                                                    class="form-control bg-secondary bg-opacity-10 p-2 rounded-end-0"
                                                    :class="passCheckedClass"
                                                    v-model="subscribeData.password_confirmation"
                                                    @input="validatePassword" required>
                                                <button
                                                    class="btn text-dark bg-light border border-1 rounded-2 rounded-start-0"
                                                    type="button" @click="tooglePasswordVisibility('confirmation')">
                                                    <font-awesome-icon
                                                        :icon="showPasswordConfirmation ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="profissao" class="form-label">Área de atuação</label>
                                            <input type="text" id="profissao"
                                                class="form-control bg-secondary bg-opacity-10 p-2" v-model="subscribeData.profession" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="city" class="form-label">Cidade</label>
                                            <input type="text" id="city"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.city" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="state" class="form-label">Estado</label>
                                            <input type="text" id="state"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.state" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-2" v-reveal="'bottom'">
                                        <div class="form-group">
                                            <label for="country" class="form-label">País</label>
                                            <input type="text" id="country"
                                                class="form-control bg-secondary bg-opacity-10 p-2"
                                                v-model="subscribeData.country" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col" v-reveal="'bottom'">
                                        <p class="fs-5">
                                            Ao me cadastrar, declaro que li e estou de acordo com os <RouterLink
                                                to="/politica" class="text-danger fw-semibold">termos e condições de uso
                                            </RouterLink> do site.
                                        </p>
                                    </div>
                                </div>

                                <div class="row" v-reveal="'bottom'">
                                    <div class="col-md-6 d-grid mb-2">
                                        <button class="btn btn-secondary btn-lg rounded-4" type="button"
                                            @click="cancelSubscribe">
                                            Cancelar
                                        </button>
                                    </div>
                                    <div class="col-md-6 d-grid mb-2">
                                        <button class="btn btn-success btn-lg rounded-4" type="submit">
                                            <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" spin
                                                v-if="isSubmitingCadastro" />
                                            {{ isSubmitingCadastro ? 'Processando...' : 'Finalizar Cadastro' }}
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