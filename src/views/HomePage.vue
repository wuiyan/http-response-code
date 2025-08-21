<script setup>
import { ref, onMounted } from 'vue'

const usage = 'https://http.cat/[status_code]'
const note = 'If you need an extension at the end of the URL just add .jpg.'

const statusCards = ref([
  { code: 100, title: 'Continue', img: 'https://http.cat/100.jpg' },
  { code: 101, title: 'Switching Protocols', img: 'https://http.cat/101.jpg' },
  { code: 102, title: 'Processing', img: 'https://http.cat/102.jpg' },
])

// 预加载前三张，后续可扩展
onMounted(() => {
  statusCards.value.forEach(item => {
    const image = new Image()
    image.src = item.img
  })
})

function copyUsage() {
  navigator.clipboard.writeText(usage)
}
</script>

<template>
  <div class="page">
    <header class="site-header">
      <div class="logo">
        <span class="logo-mark">=^.^=</span>
        <span class="logo-text">HTTP Cats</span>
      </div>
    </header>

    <section class="usage">
      <h2>Usage:</h2>
      <div class="usage-input">
        <input readonly :value="usage" aria-label="Usage" />
        <button class="copy-btn" type="button" @click="copyUsage">复制</button>
      </div>
      <p class="note">
        <strong>Note:</strong>
        {{ note }}
      </p>
    </section>

    <section class="gallery">
      <div class="card" v-for="card in statusCards" :key="card.code">
        <div class="image-wrap">
          <img :alt="String(card.code)" :src="card.img" loading="lazy" />
        </div>
        <div class="info">
          <div class="code">{{ card.code }}</div>
          <div class="title">{{ card.title }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.site-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo-mark {
  font-size: 1.75rem;
}
.logo-text {
  font-size: 2rem;
  font-weight: 800;
}

.usage h2 {
  margin: 0.5rem 0 0.75rem;
}
.usage-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 0.75rem;
}
.usage-input input {
  flex: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 0.95rem;
}
.usage-input input:focus { outline: none; }
.copy-btn { white-space: nowrap; }

.note { margin-top: 0.5rem; }

.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
.image-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #eee;
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.info {
  background: #cf2f34;
  color: #fff;
  padding: 0.75rem 1rem;
}
.code {
  font-size: 1.5rem;
  font-weight: 800;
}
.title {
  font-size: 0.95rem;
  opacity: 0.95;
}

@media (max-width: 900px) {
  .gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .gallery { grid-template-columns: 1fr; }
}
</style>


