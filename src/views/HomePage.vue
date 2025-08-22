
<template>
  <div class="page">
    <!-- <header class="site-header">
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
    </section> -->

    <section class="gallery">
      <div class="card" v-for="card in statusCards" :key="card.code" tabindex="0">
        <div class="image-wrap" :class="{ loaded: card.loaded }">
          <img :alt="String(card.code)" :src="card.img" loading="lazy" @load="card.loaded = true" />

          <div class="overlay">
            <div class="tag-row" v-if="card.tags?.length">
              <span class="tag" v-for="tag in card.tags" :key="tag">{{ tag }}</span>
            </div>

            <button class="go-btn" type="button">前往 ▷</button>

            <div class="meta">
              <span class="meta-item" v-if="card.meta?.stars">★ {{ card.meta.stars }}</span>
              <span class="meta-item" v-if="card.meta?.views">👁 {{ card.meta.views }}</span>
              <span class="meta-item" v-if="card.meta?.resolution">🖼 {{ card.meta.resolution }}</span>
              <span class="meta-item" v-if="card.meta?.size">{{ card.meta.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usage = 'https://http.cat/[status_code]'
const note = 'If you need an extension at the end of the URL just add .jpg.'

const statusCards = ref([
  { code: 100, title: 'Continue', img: 'src/assets/images/100.png', loaded: false, tags: ['自然背景','绿意'], meta: { stars: 218, views: 44482, resolution: '800x4500', size: '1.13 MB' } },
  { code: 101, title: 'Switching Protocols', img: 'src/assets/images/101.png', loaded: false, tags: ['少年奔跑','山间风景','群山之间'], meta: { stars: 318, views: 12843, resolution: '2400x1350', size: '913 KB' } },
  { code: 102, title: 'Processing', img: 'src/assets/images/102.png', loaded: false, tags: ['花海','黑金'], meta: { stars: 512, views: 99821, resolution: '3000x1800', size: '2.1 MB' } },
])

// 预加载前三张，后续可扩展
onMounted(() => {
  statusCards.value.forEach(item => {
    const image = new Image()
    image.onload = () => { item.loaded = true }
    image.src = item.img
  })
})

function copyUsage() {
  navigator.clipboard.writeText(usage)
}
</script>

<style scoped lang="scss">
// 变量
$color-primary: #cf2f34;
$color-card-bg: transparent;
$bg-color: #0f1115;
$shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
$shadow-lg: 0 6px 18px rgba(0,0,0,0.12);
$radius-lg: 20px;
$easing: 220ms ease;

// 混入
@mixin soft-hover {
  transition: transform 180ms ease, box-shadow 180ms ease;
  &:hover { transform: translateY(-2px); box-shadow: $shadow-lg; }
}
@mixin fade-move($fromY: 8px) {
  opacity: 0;
  transform: translateY($fromY);
  transition: opacity $easing, transform $easing;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 100vh;
  background: $bg-color;
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
  .logo-mark { font-size: 1.75rem; }
  .logo-text { font-size: 2rem; font-weight: 800; }
}

.usage {
  h2 { margin: 0.5rem 0 0.75rem; }
  .usage-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f2f2f2;
    border-radius: 8px;
    padding: 0.75rem;
    input {
      flex: 1;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      border: none;
      background: transparent;
      color: inherit;
      font-size: 0.95rem;
      &:focus { outline: none; }
    }
    .copy-btn { white-space: nowrap; }
  }
}

.note { margin-top: 0.5rem; }

.gallery {
  width: min(1280px, 92vw);
  margin: 0 auto;
  column-count: 3;
  column-gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  background: $color-card-bg;
  overflow: hidden;
  break-inside: avoid;
  margin-bottom: 1rem;
  border-radius: $radius-lg;
  @include soft-hover;

  &:focus-visible { outline: 2px solid $color-primary; outline-offset: 2px; }

  .image-wrap {
    position: relative;
    background: transparent;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
      transition: transform $easing;
    }
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.04) 100%);
      transform: translateX(-100%);
      animation: shimmer 1.1s ease-in-out infinite;
    }
    &.loaded::after { display: none; }
  }

  &:hover {
    .image-wrap img { transform: scale(1.03); }
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: 16px;
    pointer-events: none;

    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      @include fade-move(-8px);
    }
    .tag {
      pointer-events: auto;
      font-size: 12px;
      color: #fff;
      background: rgba(0,0,0,0.45);
      padding: 6px 10px;
      border-radius: 999px;
      backdrop-filter: blur(4px);
    }
    .go-btn {
      pointer-events: auto;
      justify-self: center;
      align-self: center;
      color: #222;
      background: rgba(255,255,255,0.94);
      border: none;
      border-radius: 999px;
      padding: 10px 18px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.18);
      @include fade-move(8px);
      transform: translateY(8px) scale(0.98);
      transition: opacity $easing, transform $easing, background 180ms ease;
      &:hover { background: #fff; }
      &:active { transform: translateY(0) scale(0.98); }
    }
    .meta {
      pointer-events: none;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      color: #fff;
      padding: 8px 12px;
      background: linear-gradient(180deg, rgba(204, 85, 85, 0) 0%, rgba(0,0,0,0.55) 85%);
      border-bottom-left-radius: $radius-lg;
      border-bottom-right-radius: $radius-lg;
      @include fade-move(8px);
      .meta-item { opacity: 0.9; }
    }

    // hover 联动
    .tag-row, .meta { opacity: 0; }
  }

  &:hover {
    .overlay {
      .tag-row, .meta { opacity: 1; transform: translateY(0); }
      .go-btn { opacity: 1; transform: translateY(0) scale(1); }
    }
  }
}

@keyframes shimmer { 100% { transform: translateX(100%); } }

.info { background: $color-primary; color: #fff; padding: 0.75rem 1rem; }
.code { font-size: 1.5rem; font-weight: 800; }
.title { font-size: 0.95rem; opacity: 0.95; }

@media (max-width: 900px) { .gallery { column-count: 2; } }
@media (max-width: 600px) { .gallery { column-count: 1; } }
</style>


