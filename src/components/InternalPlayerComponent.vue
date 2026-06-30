<template>
  <div class="ratio ratio-16x9">
    <iframe ref="playerContainer" id="video-player" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'

const props = defineProps<{ videoKey: string }>()
const playerContainer = ref<any>(null)

const loadVideo = () => {
  if (props.videoKey && playerContainer.value) {
    playerContainer.value.src = `https://cdn.tbr.com.br/player/?vod=1&video=${props.videoKey}`
  }
}

watch(
  () => props.videoKey,
  async () => {
    await nextTick()
    loadVideo()
  },
)

onMounted(() => {
  loadVideo()
})
</script>

<style scoped></style>
