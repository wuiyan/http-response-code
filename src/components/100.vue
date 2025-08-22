<template>
    <section class="http-status">
        <h2>HTTP 100 Continue</h2>
        <p>
            <strong>100 Continue</strong> 是一个临时响应，表示到目前为止一切正常，客户端应继续请求或忽略该响应（如果请求已完成）。
        </p>
        <p>
            详细说明请参考
            <a
                href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/100"
                target="_blank"
                rel="noopener noreferrer"
            >
                MDN 文档
            </a>
            。
        </p>
    </section>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.http-status {
    padding: 1rem;
}
.http-status h2 {
    margin-bottom: 0.5rem;
}
</style>