<script setup lang="ts">
import WindowSizeDisplay from './components/WindowSizeDisplay.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import ScrollProgressBar from './components/ScrollProgressBar.vue'
</script>

<template>
  <ScrollProgressBar />
  <WindowSizeDisplay />
  <div style="height: 2000px; padding-top: 50px;">
    <p>Scroll down to see the button</p>
  </div>
  <ScrollToTopButton />
</template>

<style scoped>
</style>
