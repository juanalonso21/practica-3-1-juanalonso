<script setup lang="ts">
import PopupWindowManager from './components/PopupWindowManager.vue'
</script>

<template>
  <div id="app">
    <h1>Comunicación entre Ventanas</h1>
    <PopupWindowManager />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
}
</style>

<style scoped>
#app {
  text-align: center;
  color: #ffffff;
  background-color: #1a1a1a;
  min-height: 100vh;
  margin-top: 60px;
}
</style>
