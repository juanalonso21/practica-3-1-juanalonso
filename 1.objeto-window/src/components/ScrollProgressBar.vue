<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (scrollableHeight > 0) {
    scrollProgress.value = (window.scrollY / scrollableHeight) * 100
  } else {
    scrollProgress.value = 0
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #eee;
}

.progress-bar {
  height: 100%;
  background-color: #42b883;
  width: 0%;
}
</style>
