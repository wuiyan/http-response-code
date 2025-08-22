<template>
  <div class="detail-page">
    <div class="toolbar">
      <button type="button" @click="goBack">返回</button>
      <router-link to="/">首页</router-link>
    </div>
    <div class="content" v-if="code">
      <h1>HTTP {{ code }}</h1>
      <img :src="imageSrc" :alt="String(code)" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const code = computed(() => route.params.code)
const imageSrc = computed(() => `src/assets/images/${code.value}.png`)

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.replace('/')
  }
}
</script>

<style scoped>
.detail-page { padding: 16px; }
.toolbar { display: flex; gap: 12px; margin-bottom: 16px; }
.content img { max-width: min(100%, 720px); height: auto; display: block; }
</style>