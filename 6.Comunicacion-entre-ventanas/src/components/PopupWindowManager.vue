iero<script setup lang="ts">
import { ref, computed } from 'vue'

const popupWindow = ref<WindowProxy | null>(null)

const openPopup = () => {
  const url = 'https://franparra.com' // URL_DE_PRUEBA
  const features = 'width=600,height=400'
  const newWindow = window.open(url, '_blank', features)
  if (newWindow) {
    popupWindow.value = newWindow
  } else {
    console.warn('Popup blocked by browser')
  }
}

const closePopup = () => {
  if (popupWindow.value && !popupWindow.value.closed) {
    popupWindow.value.close()
  }
  popupWindow.value = null
}

const isOpen = computed(() => popupWindow.value !== null && !popupWindow.value.closed)

defineExpose({
  popupWindow
})
</script>

<template>
  <div>
    <button @click="openPopup" :disabled="isOpen">Abrir Popup</button>
    <button @click="closePopup" :disabled="!isOpen">Cerrar Popup</button>
    <p>Estado: {{ isOpen ? 'Abierto' : 'Cerrado' }}</p>
  </div>
</template>

<style scoped>
button {
  margin: 5px;
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #444;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

p {
  margin-top: 20px;
  color: #ffffff;
}
</style>
