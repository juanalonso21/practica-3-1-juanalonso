

<script setup lang="ts">
import UrlInspector from './components/UrlInspector.vue';
import NavigationTools from './components/NavigationTools.vue';
import RedirectionDemo from './components/RedirectionDemo.vue';

</script>

<template>
  <main class="app-container">
    <h1>Herramientas de Desarrollo Web</h1>
    <UrlInspector />
    <NavigationTools />
    <RedirectionDemo />
  </main>
</template>

<style>
body {
  background-color: #000000;
  color: #f0f0f0;
}

.app-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
</style>
