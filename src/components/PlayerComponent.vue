<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const props = defineProps<{
  videoKey: string // Aceita ID/URL do YouTube ou Vimeo
}>()

const playerContainer = ref<HTMLElement | null>(null)
let player: Plyr | null = null

// Tipo para ajudar no controle dos providers
type VideoProvider = 'youtube' | 'vimeo' | null

interface VideoInfo {
  id: string | null | undefined
  provider: VideoProvider
}

// Função unificada para descobrir o provedor e o ID do vídeo
const getVideoInfo = (url: string): VideoInfo => {
  if (!url) return { id: null, provider: null }
  const trimmed = url.trim()

  // 1. Verificação de ID direto do YouTube (11 caracteres)
  if (trimmed.length === 11) {
    return { id: trimmed, provider: 'youtube' }
  }

  // 2. Verificação de ID direto do Vimeo (apenas números, geralmente 8 a 11 dígitos)
  if (/^\d+$/.test(trimmed)) {
    return { id: trimmed, provider: 'vimeo' }
  }

  // 3. Regex para URL do YouTube
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:[?&#].*)?$/
  const youtubeMatch = trimmed.match(youtubeRegex)
  if (youtubeMatch) {
    return { id: youtubeMatch[1], provider: 'youtube' }
  }

  // 4. Regex para URL do Vimeo
  const vimeoRegex =
    /^(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:[?]*.*)$/
  const vimeoMatch = trimmed.match(vimeoRegex)
  if (vimeoMatch) {
    return { id: vimeoMatch[3], provider: 'vimeo' }
  }

  return { id: null, provider: null }
}

const loadVideo = () => {
  const { id: videoId, provider } = getVideoInfo(props.videoKey)

  if (!videoId || !provider) {
    console.error('ID ou Provedor de vídeo inválido:', props.videoKey)
    return
  }

  // Se já existir um player, destrói antes de criar um novo
  if (player) {
    player.destroy()
  }

  // Inicializa o Plyr
  player = new Plyr('#plyr-target', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'settings', 'fullscreen'],
    youtube: {
      noCookie: true,
      rel: 0,
      modestbranding: 1,
    },
    vimeo: {
      byline: false,
      portrait: false,
      title: false,
      transparent: false,
    },
  })

  player.on('ready', () => console.log(`Player pronto para ${provider}. ID:`, videoId))
}

// Função para dar Play/Pause ao clicar na camada de proteção
const togglePlay = () => {
  if (player) {
    player.togglePlay()
  }
}

// Monitora a troca da prop videoKey
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

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<template>
  <div class="plyr-wrapper">
    <div class="video-shield" @click="togglePlay"></div>
    <div :key="videoKey" ref="playerContainer">
      <div
        id="plyr-target"
        :data-plyr-provider="getVideoInfo(videoKey).provider"
        :data-plyr-embed-id="getVideoInfo(videoKey).id"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.video-shield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* Deixamos os 60px inferiores livres para a barra de controles do Plyr */
  height: calc(100% - 60px);
  z-index: 2;
  /* Fica acima do iframe */
  background: transparent;
  cursor: pointer;
}

.plyr-wrapper {
  position: relative; /* Adicionado para garantir o posicionamento absoluto do shield */
  width: 100%;
  height: 100%;
}

/* Garante que o Plyr preencha o container ratio-16x9 do Bootstrap */
:deep(.plyr) {
  height: 100%;
}
</style>
