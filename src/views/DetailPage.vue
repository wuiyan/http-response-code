<template>
  <div class="detail-page">
    <div class="toolbar">
      <button type="button" @click="goBack">返回</button>
    </div>

    <div class="content" v-if="code">
      <h1>HTTP {{ code }}</h1>
      <img v-if="imageSrc" :src="imageSrc" :alt="String(code)" />

      <!-- 渲染 Markdown HTML -->
      <div v-if="htmlContent" v-html="htmlContent"></div>
      <div v-else>加载中...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const router = useRouter()

// 当前状态码
const code = ref(route.params.code)

// 图片路径
const imageSrc = ref('')

// Markdown 渲染
const mdText = ref('')
const htmlContent = ref('')
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// 预加载所有 Markdown 文件（懒加载）
const mdModules = import.meta.glob('@/assets/content/*.md', { as: 'raw' })
// 预加载所有图片
const imgModules = import.meta.glob('@/assets/images/*.png', { eager: true, import: 'default' })

// 加载内容
async function loadContent(newCode) {
  if (!newCode) return

  code.value = newCode

  // 加载 Markdown 文件
  const mdKey = `/src/assets/content/${newCode}.md`
  if (mdModules[mdKey]) {
    try {
      mdText.value = await mdModules[mdKey]()
    } catch (e) {
      console.error('加载 Markdown 失败:', e)
      mdText.value = `未找到文档：${newCode}`
    }
  } else {
    mdText.value = `未找到文档：${newCode}`
  }

  // 渲染 HTML
  htmlContent.value = md.render(mdText.value)

  // 加载图片
  const imgKey = `/src/assets/images/${newCode}.png`
  imageSrc.value = imgModules[imgKey] || ''
}

// 监听路由变化
watch(
  () => route.params.code,
  (newCode) => loadContent(newCode),
  { immediate: true }
)

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
.content img { max-width: min(100%, 720px); height: auto; display: block; margin-bottom: 16px; }
</style>
