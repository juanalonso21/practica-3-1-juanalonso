<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Reactive reference to the length of the history stack
const historyLength = ref<number>(0)

const updateHistoryLength = () => {
  historyLength.value = history.length
}

onMounted(() => {
  updateHistoryLength()
  // Listen for popstate events to keep the length up‑to‑date when user navigates
  window.addEventListener('popstate', updateHistoryLength)
})

// Navigation methods
const goBack = () => {
  history.back()
}

const goForward = () => {
  history.forward()
}

const goTo = (pages: number) => {
  history.go(pages)
}
</script>

<template>
  <div class="history-controls">
    <p class="history-length">
      Páginas en el historial de sesión: {{ historyLength }}
    </p>
    <button class="btn back" @click="goBack">Atrás</button>
    <button class="btn forward" @click="goForward">Adelante</button>
    <button class="btn go-two" @click="goTo(-2)">Ir 2 páginas atrás</button>
  </div>
</template>

<style scoped>
.history-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #555;
  background-color: #222;
}

.history-length {
  font-weight: bold;
  color: #fff;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  background-color: #ddd;
  border: 1px solid #999;
  border-radius: 4px;
  cursor: pointer;
}
</style>
