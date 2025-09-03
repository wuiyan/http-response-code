<template>
  <div class="min-h-screen bg-blue-50 py-8 px-4 flex justify-center">
    <div class="w-full max-w-4xl h-full bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-2">
          HTTP {{ code }} {{ title }}
        </h1>
      </div>
      <div v-if="code" class="flex flex-col items-center flex-1">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="String(code)"
          class="max-w-lg w-full rounded-xl shadow mb-8 bg-gray-100 object-contain"
        />

        <article v-if="htmlContent" v-html="htmlContent" 
          class="prose prose-blue w-full max-w-none prose-pre:bg-blue-100/70 prose-code:text-black" >
        </article>
        <div v-else class="text-gray-500 text-center">加载中...</div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const router = useRouter()

const code = ref(route.params.code)
const title = ref(route.query.title)

const imageSrc = ref('')
const mdText = ref('')
const htmlContent = ref('')
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const mdModules = import.meta.glob('@/assets/content/*.md', { as: 'raw' })
const imgModules = import.meta.glob('@/assets/images/*.png', { eager: true, import: 'default' })

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
      mdText.value = `文档编写中：${newCode}`
    }
  } else {
    mdText.value = `文档编写中：${newCode}`
  }
  htmlContent.value = md.render(mdText.value)

  // 加载图片
  const imgKey = `/src/assets/images/${newCode}.png`
  imageSrc.value = imgModules[imgKey] || ''
}

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