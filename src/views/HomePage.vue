<template>
  <div class="flex flex-col gap-5 min-h-screen pt-8">
    <!-- header 简介 -->
    <header class="w-[92vw] max-w-[1280px] mx-auto mb-4 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">HTTP 响应码图鉴</h1>
      <p class="text-gray-600 text-base">
        本站以图文方式展示常见 HTTP 响应状态码，点击卡片可查看更多详情，帮助你快速了解每个状态码的含义与用途。
      </p>
    </header>
    <!-- 图片网格流 -->
    <section class="w-[92vw] max-w-[1280px] mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="card in statusCards"
          :key="card.code"
          tabindex="0"
          class="flex flex-col bg-transparent overflow-hidden mb-4 rounded-2xl transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg group"
        >
          <div class="relative overflow-hidden bg-transparent">
            <img
              :alt="String(card.code)"
              :src="card.img"
              loading="lazy"
              @load="card.loaded = true"
              class="w-full h-auto object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            />

            <!-- overlay 按钮 -->
            <div class="absolute inset-0 grid place-items-center p-4">
              <router-link
                :to="{ name: 'detail', params: { code: card.code }, query: { title: card.title } }"
                class="opacity-0 translate-y-2 scale-95 transition-all duration-200 ease-in-out bg-white/95 text-gray-800 rounded-full px-5 py-2 shadow-lg group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 hover:bg-white"
              >
                前往 ▷
              </router-link>
            </div>
          </div>
          <div class="text-center bg-blue-300/40 text-base text-gray-800 pt-2 pb-2">
            {{ card.code }} {{ card.title }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>  
import { ref, onMounted } from 'vue'

const statusCards = ref([
  { code: 100, title: 'Continue', img: 'src/assets/images/100.png', loaded: false},
  { code: 101, title: 'Switching Protocols', img: 'src/assets/images/101.png', loaded: false},
  { code: 102, title: 'Processing', img: 'src/assets/images/102.png', loaded: false},
  { code: 103, title: 'Early Hints', img: 'src/assets/images/103.png', loaded: false},
  { code: 200, title: 'OK', img: 'src/assets/images/200.png', loaded: false},
  { code: 201, title: 'Created', img: 'src/assets/images/201.png', loaded: false},
  { code: 202, title: 'Accepted', img: 'src/assets/images/202.png', loaded: false},
  { code: 203, title: 'Non-Authoritative Information', img: 'src/assets/images/203.png', loaded: false},
  { code: 204, title: 'No Content', img: 'src/assets/images/204.png', loaded: false},
  { code: 205, title: 'Reset Content', img: 'src/assets/images/205.png', loaded: false},
  { code: 206, title: 'Partial Content', img: 'src/assets/images/206.png', loaded: false},
  { code: 207, title: 'Multi-Status', img: 'src/assets/images/207.png', loaded: false},
  { code: 208, title: 'Already Reported', img: 'src/assets/images/208.png', loaded: false},
  { code: 226, title: 'IM Used', img: 'src/assets/images/226.png', loaded: false},
  { code: 300, title: 'Multiple Choices', img: 'src/assets/images/300.png', loaded: false},
  { code: 301, title: 'Moved Permanently', img: 'src/assets/images/301.png', loaded: false},
  { code: 302, title: 'Found', img: 'src/assets/images/302.png', loaded: false},
  { code: 303, title: 'See Other', img: 'src/assets/images/303.png', loaded: false},
  { code: 304, title: 'Not Modified', img: 'src/assets/images/304.png', loaded: false},
  { code: 307, title: 'Temporary Redirect', img: 'src/assets/images/307.png', loaded: false},
  { code: 308, title: 'Permanent Redirect', img: 'src/assets/images/308.png', loaded: false},
  { code: 400, title: 'Bad Request', img: 'src/assets/images/400.png', loaded: false},
  { code: 401, title: 'Unauthorized', img: 'src/assets/images/401.png', loaded: false},
  { code: 403, title: 'Forbidden', img: 'src/assets/images/403.png', loaded: false},
  { code: 404, title: 'Not Found', img: 'src/assets/images/404.png', loaded: false},
  { code: 405, title: 'Method Not Allowed', img: 'src/assets/images/405.png', loaded: false},
  { code: 408, title: 'Request Timeout', img: 'src/assets/images/408.png', loaded: false},
  { code: 409, title: 'Conflict', img: 'src/assets/images/409.png', loaded: false},
  { code: 410, title: 'Gone', img: 'src/assets/images/410.png', loaded: false},
  { code: 418, title: "I'm a teapot (RFC 2324)", img: 'src/assets/images/418.png', loaded: false},
  { code: 429, title: 'Too Many Requests', img: 'src/assets/images/429.png', loaded: false},
  { code: 500, title: 'Internal Server Error', img: 'src/assets/images/500.png', loaded: false},
  { code: 501, title: 'Not Implemented', img: 'src/assets/images/501.png', loaded: false},
  { code: 502, title: 'Bad Gateway', img: 'src/assets/images/502.png', loaded: false},
  { code: 503, title: 'Service Unavailable', img: 'src/assets/images/503.png', loaded: false},
  { code: 504, title: 'Gateway Timeout', img: 'src/assets/images/504.png', loaded: false},
  { code: 505, title: 'HTTP Version Not Supported', img: 'src/assets/images/505.png', loaded: false},
  { code: 507, title: 'Insufficient Storage', img: 'src/assets/images/507.png', loaded: false},
  { code: 508, title: 'Loop Detected', img: 'src/assets/images/508.png', loaded: false},
  { code: 510, title: 'Not Extended', img: 'src/assets/images/510.png', loaded: false},
  { code: 511, title: 'Network Authentication Required', img: 'src/assets/images/511.png', loaded: false}
])

// 预加载前8张，后续可扩展
onMounted(() => {
  statusCards.value.slice(0, 8).forEach(item => {
    const image = new Image()
    image.onload = () => { item.loaded = true }
    image.src = item.img
  })
})

</script>



