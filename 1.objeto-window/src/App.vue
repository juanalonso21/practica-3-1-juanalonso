<script setup lang="ts">
import WindowSizeDisplay from './components/WindowSizeDisplay.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import ScrollProgressBar from './components/ScrollProgressBar.vue'
</script>

<template>
  <ScrollProgressBar />
  <WindowSizeDisplay />
  <div class="contenedor-texto-principal">
    <p>Haz scroll para ver el boton</p>
  </div>
  <ScrollToTopButton />
</template>

<style scoped>
  .contenedor-texto-principal {
    height: 2000px; 
    padding-top: 50px;
  }
</style>
