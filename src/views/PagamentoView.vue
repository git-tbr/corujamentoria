<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/website'
import api from '@/services/api'
import { useAlert } from '@/services/alertService'

const { showAlert } = useAlert()

const router = useRouter()
const siteStore = useSiteStore()
const selectedCourse = ref<string>('')
const courseData = ref<any>({})
const coursePrices = ref<any>({})
const userData = ref<any>({})
const isLoadingUserData = ref<boolean>(false)
const isLoadingCourseData = ref<boolean>(false)
const isLoadingPaymentData = ref<boolean>(false)

interface Coupon {
  id: number;
  code: string;
  discount: number;
}

// variáveis de pagamento
const paymentType = ref<string>('vista')
const isBrazilian = ref<boolean>(true)
const subTotal = ref<number>(0)
const discount = ref<number>(0)
const total = ref<number>(0)
const initialCouponValue = (): Coupon => ({
  id: 0,
  code: '',
  discount: 0
})
const coupon = reactive(initialCouponValue());

// verifica se o usuário está logado e redireciona a pós o login
async function getUserData() {
  isLoadingUserData.value = true

  if (siteStore.isAuthenticated == false) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
  }

  try {
    const response = await api.get(`/api/users/${siteStore.userId}`)
    const data = response.data

    if (data.code == 0) {
      throw new Error(data.message)
    }

    userData.value = data.user

    //console.log(userData.value);//remover depois
    if (userData.value.u_country !== 'Brasil') {
      isBrazilian.value = false
    }
    isLoadingUserData.value = false
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'

    await showAlert({
      title: 'Erro',
      message: errorMessage,
      type: 'error',
    })
  }
}

// verifica se existe algum curso selecionado
const checkSelectedCourse = () => {
  if (sessionStorage.getItem('course') == null) {
    router.push({ name: 'home' })
  }

  selectedCourse.value = sessionStorage.getItem('course') as string
}

// verifica se o pagamento está definido como true
const checkPaymentStatus = () => {
  let payment = sessionStorage.getItem('payment')

  if (payment == null || payment == 'false') {
    router.push({ name: 'home' })
  }
}

// carrega dados do curso que está sendo comprado
const getCourseData = async () => {
  isLoadingCourseData.value = true

  try {
    const response = await api.get(`/api/courses/course/${selectedCourse.value}`)
    const data = response.data

    if (data.code == 0) {
      throw new Error(data.message)
    }

    courseData.value = data.course
    coursePrices.value = data.prices

    //console.log(courseData.value, coursePrices.value);//remover depois

    isLoadingCourseData.value = false
    paymentTypeChange('vista')
  } catch (error) {
    await showAlert({
      title: 'Erro',
      message: error instanceof Error ? error.message : 'O curso não pôde ser carregado.',
      type: 'error',
    })
  }
}

const moneyFormat = (value: number) => {
  let formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  })

  return formatter.format(value)
}

// altera os valores conforme a forma de pagamento
const paymentTypeChange = (tipo: string = paymentType.value) => {
  paymentType.value = tipo

  coursePrices.value.find((price: any) => {
    if (price.gpk_type == paymentType.value) {
      subTotal.value = price.gpk_price
    } else if (price.gpk_type == paymentType.value) {
      subTotal.value = price.gpk_price
    } else if (price.gpk_type == paymentType.value) {
      subTotal.value = price.gpk_price
    }

    discount.value = subTotal.value * coupon.discount / 100;
    total.value = subTotal.value - discount.value;
  })
}

// realiza o pagamento
const handlePayment = async () => {
  const isBr = isBrazilian.value
  const type = paymentType.value

  if (!isBr && type === 'prazo') {
    showAlert({
      title: 'Opção Indisponível',
      message: 'O pagamento parcelado não está disponível para usuários fora do Brasil.',
      type: 'warning',
    })
    return
  }

  if (isBr && type === 'assinatura') {
    showAlert({
      title: 'Opção Indisponível',
      message: 'O pagamento em assinatura não está disponível para usuários do Brasil.',
      type: 'warning',
    })
    return
  }

  isLoadingPaymentData.value = true

  try {
    const response = await api.post(`/payment-price-generic`, {
      coursehash: selectedCourse.value,
      paymenttype: paymentType.value,
      userid: siteStore.userId,
      companyid: siteStore.company,
      coupon: coupon.id,
    })

    const data = response.data
    if (data.code == 0) {
      throw new Error(data.message)
    }

    // console.log(data)
    window.location.href = data.link
  } catch (error) {
    await showAlert({
      title: 'Erro',
      message:
        error instanceof Error ? error.message : 'Ocorreu um erro ao gerar o link de pagamento.',
      type: 'error',
    })
  }
}

//verificar a existência do cupom e aplicar o desconto
const searchCoupon = async () => {
  if (coupon.code == '') {
    await showAlert({
      title: 'Atenção',
      message: 'O cupom não pode ser vazio',
      type: 'warning',
    })
    return;
  }
  try {
    const response = await api.get(`/coupon/${siteStore.company}/${coupon.code}`);
    const data = response.data;

    if (data.code != 1) {
      coupon.code = '';
      coupon.id = 0;
      coupon.discount = 0;
      throw new Error(data.message);
    }

    coupon.id = data.coupon.id;
    coupon.discount = data.coupon.discount;

    paymentTypeChange()
  } catch (error) {
    await showAlert({
      title: 'Atenção',
      message: 'O cupom informado não está disponível ou expirou.',
      type: 'warning',
    })
  }
}

onMounted(() => {
  //verificar se o usuário está logado
  getUserData()

  //verificar se existe algum curso selecionado
  checkSelectedCourse()

  //verificar se o pagamento está definido como true
  checkPaymentStatus()

  //carregar dados do curso que está sendo comprado
  getCourseData()
})
</script>

<template>
  <Layout>
    <main class="page-size">
      <!-- carregamento de dados -->
      <section class="container" v-if="isLoadingUserData || isLoadingCourseData">
        <div class="row pt-5">
          <div class="col-12">
            <div class="d-flex justify-content-center text-light fs-3">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
              &nbsp; Carregando...
            </div>
          </div>
        </div>
      </section>
      <!-- conteúdo da página -->
      <section class="container py-3 py-lg-5" v-else>
        <div class="row">
          <div class="col-lg-9 mb-3 p-3">

            <div class="row mb-4 px-3 px-lg-0">
              <div class="col-12 bg-light p-3 p-lg-4 rounded-4">
                <div class="row">
                  <div class="col-lg-3 mb-3 mb-lg-0">
                    <img :src="courseData.i_path" alt="Miniatura do curso" class="img-fluid rounded-4" />
                  </div>
                  <div class="col-lg-9">
                    <p class="fs-4 mb-3 fw-bold">
                      {{ courseData.c_name }}
                    </p>
                    <p class="text-muted mb-3" v-html="courseData.c_description"></p>
                    <p class="text-darkGreen mb-0 fw-bold fs-4">
                      {{ moneyFormat(courseData.c_value) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4 px-3 px-lg-0">
              <div class="col-12 bg-light p-3 p-lg-4 rounded-4">
                <div class="row">
                  <div class="col-12">
                    <p class="fs-4 fw-semibold">
                      <font-awesome-icon icon="fa-solid fa-shield-halved" class="text-success" />
                      Confirmação de Identidade
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 mb-3 mb-lg-0">
                    <p class="text-muted mb-0">Nome do Aluno</p>
                    <p class="fs-5 fw-semibold mb-0">
                      {{ userData.u_firstname + ' ' + userData.u_lastname }}
                    </p>
                  </div>
                  <div class="col-lg-6">
                    <p class="text-muted mb-0">E-mail</p>
                    <p class="fs-5 fw-semibold mb-0">
                      {{ userData.u_email }}
                    </p>
                  </div>
                </div>
                <div class="row py-2">
                  <div class="col">
                    <hr class="border-1 border-secondary my-0" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <RouterLink class="text-success fw-semibold text-decoration-none" :to="{
                      name: 'perfil',
                      query: { redirect: router.currentRoute.value.fullPath },
                    }">
                      <font-awesome-icon icon="fa-solid fa-pencil" />
                      Alterar dados cadastrais
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3 px-3 px-lg-0">
              <div class="col-12 bg-light p-3 p-lg-4 rounded-4">
                <div class="row mb-3">
                  <div class="col-12">
                    <p class="fs-4 fw-semibold mb-0">Formas de Pagamento</p>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-6 mb-3 mb-lg-0">
                    <div class="border border-secondary rounded-3 px-3 py-2">
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input fs-5 border-secondary border" type="radio" id="pagamentoavista"
                          value="vista" v-model="paymentType" @click="paymentTypeChange('vista')" />
                        <label class="form-check-label ms-3 flex-fill" for="pagamentoavista" role="button">
                          <p class="fw-semibold mb-0">Pagamento à vista com desconto</p>
                          <p class="text-success mb-0">Economize no pagamento à vista</p>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6" v-if="isBrazilian">
                    <div class="border border-secondary rounded-3 px-3 py-2">
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input fs-5 border-secondary border" type="radio" id="pagamentoaprazo"
                          value="prazo" v-model="paymentType" @click="paymentTypeChange('prazo')" />
                        <label class="form-check-label ms-3 flex-fill" for="pagamentoaprazo" role="button">
                          <p class="fw-semibold mb-0">Pagamento parcelado (sem desconto)</p>
                          <p class="text-success mb-0">Parcelado em até 12x com juros</p>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6" v-else>
                    <div class="border border-secondary rounded-3 px-3 py-2">
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input fs-5 border-secondary border" type="radio"
                          id="pagamentoassinatura" value="assinatura" v-model="paymentType"
                          @click="paymentTypeChange('assinatura')" />
                        <label class="form-check-label ms-3 flex-fill" for="pagamentoassinatura" role="button">
                          <p class="fw-semibold mb-0">Pagamento em assinatura</p>
                          <p class="text-success mb-0">Pagamento mensal</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 align-self-end mb-3 mb-lg-0">
                    <label for="coupon_input" class="form-label">Caso possua um cupom, insira aqui:</label>
                    <input type="text" v-model="coupon.code" id="coupon_input" class="form-control p-2">
                  </div>
                  <div class="col-lg-auto align-self-end d-grid">
                    <button class="btn btn-success px-5 py-2 rounded-4" type="button" @click="searchCoupon">Aplicar
                      Cupom</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col-lg-3 mb-3 p-3">
            <div class="p-4 bg-light rounded-4">
              <div class="row">
                <div class="col-12">
                  <p class="fs-3 fw-semibold">Resumo do Pedido</p>
                  <div class="row justify-content-between mb-2">
                    <div class="col-auto">
                      <p class="text-muted mb-0">Subtotal</p>
                    </div>
                    <div class="col-auto">
                      <p class="fw-semibold mb-0">
                        {{ moneyFormat(subTotal) }}
                      </p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-2">
                    <div class="col-auto">
                      <p class="text-success mb-0">Desconto</p>
                    </div>
                    <div class="col-auto">
                      <p class="fw-semibold text-success mb-0">- {{ moneyFormat(discount) }}</p>
                    </div>
                  </div>
                  <hr class="border-1 border-secondary mb-2" />
                  <div class="row justify-content-between mb-3 mb-lg-5">
                    <div class="col-auto">
                      <p class="text-muted mb-0">Total</p>
                    </div>
                    <div class="col-auto">
                      <p class="fw-semibold mb-0">
                        {{ moneyFormat(total) }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 d-grid mb-3">
                      <button class="btn btn-success btn-lg rounded-4" @click="handlePayment">
                        <font-awesome-icon icon="fa-solid fa-lock" />
                        {{ isLoadingPaymentData ? 'Processando...' : 'Ir para o pagamento' }}
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="text-muted text-center">
                        <font-awesome-icon icon="fa-solid fa-user-shield" />
                        Ambiente de pagamento 100% seguro
                      </p>
                    </div>
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
.page-size {
  min-height: calc(100dvh - (266px + 71px));
  background-color: #146531;
  background-image: url('@/assets/img/logo/white_airplane.svg');
  background-repeat: no-repeat;
  background-position: right bottom;
}
</style>
