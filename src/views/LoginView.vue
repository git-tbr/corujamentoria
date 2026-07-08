<script setup lang="ts">
import Layout from '@/layouts/DefaultLayout.vue'
import api from '@/services/api'
import WhiteAirplane from '@/assets/img/ebook/white_airplane.svg'
import { useSiteStore } from '@/stores/website'
import { reactive, ref, onMounted } from 'vue'
import { vReveal } from '@/directives/vReveal'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/services/alertService'
const { showAlert } = useAlert()

const siteStore = useSiteStore()
const router = useRouter()
const route = useRoute()
const returnTo = ref<string>('/')
const showPassword = ref<boolean>(false)

interface LoginFormInterface {
  email: string
  password: string
  company: number
}

const getInitialLoginFormData = (): LoginFormInterface => ({
  email: '',
  password: '',
  company: siteStore.company,
})

const userLoginForm = reactive(getInitialLoginFormData())
const isSubmittingLogin = ref(false)

const submitLogin = async () => {
  isSubmittingLogin.value = true

  try {
    const response = await api.post('/login', userLoginForm)
    const data = response.data

    if (data.code != 1) {
      throw new Error(data.message)
    }

    siteStore.login(data.user)
    localStorage.setItem('tokenJwt', data.token)
    Object.assign(userLoginForm, getInitialLoginFormData())
    isSubmittingLogin.value = false

    if (returnTo.value == 'pagamento') {
      await showAlert({
        title: 'Sucesso!',
        message: data.message,
        type: 'success',
      })

      router.push({ name: 'pagamento' })
    } else {
      let confirm = await showAlert({
        title: 'Sucesso!',
        message: data.message + ' ' + 'Acessar os cursos agora?',
        type: 'success',
        isConfirm: true
      })

      if (confirm) {
        router.push({ name: 'meus-cursos' })
      } else {
        router.push({ name: 'home' })
      }
    }

  } catch (error: any) {
    await showAlert({
      title: 'Erro de autenticação',
      message: error.message,
      type: 'error',
    })

    isSubmittingLogin.value = false
    return
  }
}

const tooglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  if (route.query.redirect) {
    returnTo.value = route.query.redirect as string
  } else {
    returnTo.value = 'home'
  }
})
</script>

<template>
  <Layout>
    <main class="align-content-center page-size position-relative z-0" style="background-color: #146531">
      <!-- login -->
      <section class="container position-relative z-1 py-5" v-reveal="'bottom'">
        <div class="row">
          <div class="col-lg-6 col-xl-4 mx-auto bg-white p-4 rounded-4 shadow">
            <h2 class="ff-roboto text-success text-center">Login</h2>
            <hr class="border border-2 border-success" />
            <p class="text-center ff-roboto mb-3">Acesse com o seu email e senha cadastrados</p>
            <form class="pt-3" @submit.prevent="submitLogin">
              <div class="row">
                <div class="col-12 mb-3">
                  <div class="form-group">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" class="form-control fs-5 rounded-4 bg-secondary bg-opacity-10" id="email"
                      placeholder="E-mail" v-model="userLoginForm.email" required />
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <div class="form-group">
                    <label for="password" class="form-label">Senha</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" id="password"
                        class="form-control bg-secondary bg-opacity-10 p-2 rounded-end-0"
                        v-model="userLoginForm.password" required />
                      <button class="btn text-dark bg-light border border-1 rounded-2 rounded-start-0" type="button"
                        @click="tooglePasswordVisibility()">
                        <font-awesome-icon :icon="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <p class="small mb-0">
                    <RouterLink to="/recuperar-senha" class="">Esqueceu sua senha? </RouterLink>
                  </p>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col d-grid">
                  <button type="submit" class="btn btn-success btn-lg fs-5 px-5 rounded-pill">
                    {{ isSubmittingLogin ? 'Por favor, aguarde...' : 'Entrar' }}
                  </button>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <p class="text-center">
                    <RouterLink :to="{ name: 'cadastro', query: { redirect: returnTo } }" class="">
                      Criar uma conta
                    </RouterLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div style="position: absolute; bottom: 0; right: 0; z-index: -1">
        <img :src="WhiteAirplane" alt="Avião branco" class="" style="max-height: 450px" />
      </div>
    </main>
  </Layout>
</template>

<style>
.page-size {
  min-height: calc(100dvh - 337px);
}
</style>
