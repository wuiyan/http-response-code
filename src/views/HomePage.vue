<template>
  <div class="flex flex-col gap-5 min-h-screen pt-20">
    <!-- 顶栏 -->
    <nav class="fixed top-0 left-0 w-full z-30 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100">
      <div class="max-w-[1280px] mx-auto flex items-center justify-between px-4 h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" class="h-8 w-8" />
          <span class="font-bold text-lg text-black-700">HTTP 图鉴</span>
        </div>
        <div class="flex items-center gap-2">
          <!-- 搜索按钮与输入框 -->
          <div class="relative">
            <button
              class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-blue-100 transition"
              @click="showSearch = !showSearch"
              aria-label="搜索"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <transition name="fade">
              <input
                v-if="showSearch"
                v-model="search"
                type="text"
                placeholder="搜索状态码或描述…"
                class="absolute right-0 top-0 w-48 px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow transition z-10"
                @blur="showSearch = false"
                ref="searchInput"
              />
            </transition>
          </div>
          <!-- GitHub 图标 -->
          <a
            href="https://github.com/wuiyan/http-response-code"
            target="_blank"
            rel="noopener"
            class="ml-2 text-gray-600 hover:text-gray-900 transition"
            title="GitHub"
          >
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .268.18.579.688.481C19.135 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>

    <!-- header 简介 -->
    <header class="w-[92vw] max-w-[1280px] mx-auto mb-4 text-center mt-20">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">HTTP 响应码图鉴</h1>
      <p class="text-gray-600 text-base">
        本站以图文方式展示常见 HTTP 响应状态码，点击卡片可查看更多详情，帮助你快速了解每个状态码的含义与用途。
      </p>
    </header>

    <!-- 图片网格流 -->
    <section class="w-[92vw] max-w-[1280px] mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <router-link
            v-for="card in filteredCards"
            :key="card.code"
            :to="{ name: 'detail', params: { code: card.code }, query: { title: card.title } }"
            class="flex flex-col bg-transparent overflow-hidden rounded-2xl shadow-sm group"
        >
          <div class="relative w-full aspect-square overflow-hidden">
            <!-- 图片 -->
            <img
                :alt="String(card.code)"
                :src="card.img"
                loading="lazy"
                @load="card.loaded = true"
                class="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            />

            <!-- 占位符骨架 -->
            <div
                v-show="!card.loaded"
                class="absolute inset-0 bg-gray-200 animate-pulse pointer-events-none"
            ></div>

            <!-- overlay 按钮：只在 PC 端显示 -->
            <div class="hidden md:grid absolute inset-0 place-items-center p-4">
              <span
                  class="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out bg-white/90 text-gray-800 rounded-full px-5 py-2 shadow-lg"
              >
                前往 ▷
              </span>
            </div>
          </div>

          <!-- 卡片底部标题 -->
          <div class="text-center bg-blue-300/40 text-base text-gray-800 pt-2 pb-2">
            {{ card.code }} {{ card.title }}
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>  
import { ref, computed, onMounted, watch ,nextTick } from 'vue'

const search = ref('')
const showSearch = ref(false)
const searchInput = ref(null)

const statusCards = ref([
  { code: 100, title: 'Continue', img: '/images/100.png', loaded: false},
  { code: 101, title: 'Switching Protocols', img: '/images/101.png', loaded: false},
  { code: 102, title: 'Processing', img: '/images/102.png', loaded: false},
  { code: 103, title: 'Early Hints', img: '/images/103.png', loaded: false},
  { code: 200, title: 'OK', img: '/images/200.png', loaded: false},
  { code: 201, title: 'Created', img: '/images/201.png', loaded: false},
  { code: 202, title: 'Accepted', img: '/images/202.png', loaded: false},
  { code: 203, title: 'Non-Authoritative Information', img: '/images/203.png', loaded: false},
  { code: 204, title: 'No Content', img: '/images/204.png', loaded: false},
  { code: 205, title: 'Reset Content', img: '/images/205.png', loaded: false},
  { code: 206, title: 'Partial Content', img: '/images/206.png', loaded: false},
  { code: 207, title: 'Multi-Status', img: '/images/207.png', loaded: false},
  { code: 208, title: 'Already Reported', img: '/images/208.png', loaded: false},
  { code: 226, title: 'IM Used', img: '/images/226.png', loaded: false},
  { code: 300, title: 'Multiple Choices', img: '/images/300.png', loaded: false},
  { code: 301, title: 'Moved Permanently', img: '/images/301.png', loaded: false},
  { code: 302, title: 'Found', img: '/images/302.png', loaded: false},
  { code: 303, title: 'See Other', img: '/images/303.png', loaded: false},
  { code: 304, title: 'Not Modified', img: '/images/304.png', loaded: false},
  { code: 307, title: 'Temporary Redirect', img: '/images/307.png', loaded: false},
  { code: 308, title: 'Permanent Redirect', img: '/images/308.png', loaded: false},
  { code: 400, title: 'Bad Request', img: '/images/400.png', loaded: false},
  { code: 401, title: 'Unauthorized', img: '/images/401.png', loaded: false},
  { code: 402, title: 'Payment Required', img: '/images/402.png', loaded: false},
  { code: 403, title: 'Forbidden', img: '/images/403.png', loaded: false},
  { code: 404, title: 'Not Found', img: '/images/404.png', loaded: false},
  { code: 405, title: 'Method Not Allowed', img: '/images/405.png', loaded: false},
  { code: 406, title: 'Not Acceptable', img: '/images/406.png', loaded: false},
  { code: 407, title: 'Proxy Authentication Required', img: '/images/407.png', loaded: false},
  { code: 408, title: 'Request Timeout', img: '/images/408.png', loaded: false},
  { code: 409, title: 'Conflict', img: '/images/409.png', loaded: false},
  { code: 410, title: 'Gone', img: '/images/410.png', loaded: false},
  { code: 411, title: 'Length Required', img: '/images/411.png', loaded: false},
  { code: 412, title: 'Precondition Failed', img: '/images/412.png', loaded: false},
  { code: 413, title: 'Payload Too Large', img: '/images/413.png', loaded: false},
  { code: 414, title: 'URI Too Long', img: '/images/414.png', loaded: false},
  { code: 415, title: 'Unsupported Media Type', img: '/images/415.png', loaded: false},
  { code: 416, title: 'Range Not Satisfiable', img: '/images/416.png', loaded: false},
  { code: 417, title: 'Expectation Failed', img: '/images/417.png', loaded: false},
  { code: 418, title: "I'm a teapot", img: '/images/418.png', loaded: false},
  { code: 421, title: 'Misdirected Request', img: '/images/421.png', loaded: false},
  { code: 422, title: 'Unprocessable Entity', img: '/images/422.png', loaded: false},
  { code: 423, title: 'Locked', img: '/images/423.png', loaded: false},
  { code: 424, title: 'Failed Dependency', img: '/images/424.png', loaded: false},
  { code: 425, title: 'Too Early', img: '/images/425.png', loaded: false},
  { code: 426, title: 'Upgrade Required', img: '/images/426.png', loaded: false},
  { code: 428, title: 'Precondition Required', img: '/images/428.png', loaded: false},
  { code: 429, title: 'Too Many Requests', img: '/images/429.png', loaded: false},
  { code: 431, title: 'Request Header Fields Too Large', img: '/images/431.png', loaded: false},
  { code: 451, title: 'Unavailable For Legal Reasons', img: '/images/451.png', loaded: false},
  { code: 500, title: 'Internal Server Error', img: '/images/500.png', loaded: false},
  { code: 501, title: 'Not Implemented', img: '/images/501.png', loaded: false},
  { code: 502, title: 'Bad Gateway', img: '/images/502.png', loaded: false},
  { code: 503, title: 'Service Unavailable', img: '/images/503.png', loaded: false},
  { code: 504, title: 'Gateway Timeout', img: '/images/504.png', loaded: false},
  { code: 505, title: 'HTTP Version Not Supported', img: '/images/505.png', loaded: false},
  { code: 507, title: 'Insufficient Storage', img: '/images/507.png', loaded: false},
  { code: 508, title: 'Loop Detected', img: '/images/508.png', loaded: false},
  { code: 510, title: 'Not Extended', img: '/images/510.png', loaded: false},
  { code: 511, title: 'Network Authentication Required', img: '/images/511.png', loaded: false}
])

const filteredCards = computed(() => {
  if (!search.value.trim()) return statusCards.value
  const s = search.value.trim().toLowerCase()
  return statusCards.value.filter(card =>
    String(card.code).includes(s) ||
    card.title.toLowerCase().includes(s)
  )
})


// 搜索框自动聚焦
watch(showSearch, (val) => {
  if (val) {
    nextTick(() => {
      searchInput.value && searchInput.value.focus()
    })
  }
})


// 懒加载
const imgs = ref([]) // 用来存放每个图片的 DOM

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          observer.unobserve(img)
        }
      })
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  imgs.value.forEach(img => observer.observe(img))
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>