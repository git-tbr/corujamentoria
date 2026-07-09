<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import GlobalDialog from './components/GlobalDialog.vue'

// const router = useRouter();

// const getIpAdress = async () => {
//   const response = await fetch('https://api.ipify.org?format=json');
//   const data = await response.json();
//   return data.ip;
// }//remover após a atualização

onMounted(() => {
  // getIpAdress().then((ip) => {
  //   if (ip !== '191.13.130.133') {
  //     router.push({ name: 'manutencao' })
  //   }
  // });//remover após a atualização

  setTimeout(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('is-loading');
  }, 100);
})
</script>

<template>
  <RouterView />
  <GlobalDialog />
</template>