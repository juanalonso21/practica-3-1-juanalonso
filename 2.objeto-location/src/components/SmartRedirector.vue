<template>
  <div class="smart-redirector">
    <p>Comprobando entorno de navegación...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  if (window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http://', 'https://');
    return;
  }

  const userAgent = navigator.userAgent;

  if (userAgent.includes('Firefox')) {
    window.location.assign('/pagina-para-firefox');
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    window.location.assign('/pagina-para-chrome');
  }
});
</script>

<style scoped>
.smart-redirector {
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  color: #aaa;
}
</style>