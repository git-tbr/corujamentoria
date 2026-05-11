<script lang="ts" setup>
import Layout from '@/layouts/DefaultLayout.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
const contactData = ref({});
const isSubmitting = ref(false);

const handleContactSubmit = async () => {
    isSubmitting.value = true;

    console.log('submit');
}
</script>
<template>
    <Layout>
        <main>
            <section>
                <div class="container py-3 py-lg-5">
                    <div class="row mb-3">
                        <div class="col-12">
                            <h1 class="fw-bold ff-roboto text-success">
                                Contato
                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="pe-md-3">
                                <p class="fs-5 mb-3" v-reveal="'bottom'">
                                    Tire suas dúvidas! Preencha o formulário de contato a seguir. Dentro do período de 3
                                    a 5 dias enviaremos uma ressposta via email.
                                </p>
                                <p class="fs-5 mb-3" v-reveal="'bottom'">
                                    em caso de problemas técnicos, entre em contato pelo email: <a
                                        href="mailto:suporte@tbr.com.br" target="_blank" rel="norefer"
                                        class="text-primary">suporte@tbr.com.btr</a>
                                </p>
                                <ul class="list-unstyled">
                                    <li v-reveal="'bottom'">
                                        <a href="mailto:email@corujamentoria.com" target="_blank" rel="norefer"
                                            class="text-decoration-none text-dark fs-semibold fs-5">
                                            <FontAwesomeIcon icon="fa-solid fa-envelope" class="" />
                                            email@corujamentoria.com
                                        </a>
                                    </li>
                                    <li v-reveal="'bottom'">
                                        <a href="tel:5511947990277" target="_blank" rel="norefer"
                                            class="text-decoration-none text-dark fs-semibold fs-5">
                                            <FontAwesomeIcon icon="fa-solid fa-phone" class="me-2" /> +55 11 9 4799-0277
                                        </a>
                                    </li>
                                    <li v-reveal="'bottom'">
                                        <a href="//wa.me/5511947990277" target="_blank" rel="norefer"
                                            class="text-decoration-none text-dark fs-semibold fs-5">
                                            <FontAwesomeIcon icon="fa-brands fa-whatsapp" class="me-2" /> +55 11 9
                                            4799-0277
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="p-4 shadow rounded-4">
                                <form @submit.prevent="handleContactSubmit">
                                    <div class="row">
                                        <div class="col">
                                            <p class="fs-2 fw-semibold">
                                                Formulário de Contato
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <!-- nome -->
                                        <div class="col-12 mb-3">
                                            <div class="form-group">
                                                <label for="fullName" class="form-label fs-5">Nome</label>
                                                <input type="text" name="fullName" id="fullName" class="form-control rounded-4 fs-5">
                                            </div>
                                        </div>
                                        <!-- email -->
                                        <div class="col-12 mb-3">
                                            <div class="form-group">
                                                <label for="email" class="form-label fs-5">Email</label>
                                                <input type="email" name="email" id="email" class="form-control rounded-4 fs-5">
                                            </div>
                                        </div>
                                        <!-- celular -->
                                        <div class="col-12 mb-3">
                                            <div class="form-group">
                                                <label for="phone" class="form-label fs-5">Celular</label>
                                                <input type="tel" name="phone" id="phone" class="form-control rounded-4 fs-5">
                                            </div>
                                        </div>
                                        <!-- mensagem -->
                                        <div class="col-12 mb-3">
                                            <div class="form-group">
                                                <label for="message" class="form-label fs-5">Mensagem</label>
                                                <textarea name="message" id="message" class="form-control rounded-4 fs-5" rows="5"></textarea>
                                            </div>
                                        </div>
                                        <!-- submit -->
                                        <div class="col-12 d-grid">
                                            <button class="btn btn-success bg-gradient fs-5 rounded-4" :disabled="isSubmitting">
                                                {{ isSubmitting ? 'Enviando, por favor aguarde...' : 'Enviar' }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </Layout>
</template>